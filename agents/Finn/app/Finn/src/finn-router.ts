import { BedrockRuntimeClient, ConverseCommand, ApplyGuardrailCommand } from '@aws-sdk/client-bedrock-runtime';
import type { Message } from '@aws-sdk/client-bedrock-runtime';
import {
  insertTokenUsage, getTodaySpendUsd, getModelHealth,
  recordModelFailure, recordModelSuccess, logProtectionEvent,
} from './db.js';

// Finn's copy of Sam's wilfred-router: budget gate -> tier routing -> invoke
// with forced tool use -> circuit-breaker failover -> token accounting.
//
// One deliberate difference from Sam: no Teams notification. Sam alerts through
// Microsoft Graph, which needs GRAPH_* credentials in the secret. Finn edits
// website copy and has no business holding mailbox credentials, so protection
// events go to wilfred.protection_events (already surfaced in AIOS) and stderr
// instead. If Teams alerts are wanted later, route them through Sam rather than
// giving Finn its own Graph access.

export type Tier = 'junior' | 'expert';

interface ModelSpec {
  id: string;
  inUsdPerM: number;
  outUsdPerM: number;
}

// Junior = cheap scoring pass over every page. Expert = the actual rewriting.
const MODELS: Record<Tier, ModelSpec> = {
  junior: { id: 'us.anthropic.claude-haiku-4-5-20251001-v1:0', inUsdPerM: 1.0, outUsdPerM: 5.0 },
  expert: { id: 'us.anthropic.claude-sonnet-4-5-20250929-v1:0', inUsdPerM: 3.0, outUsdPerM: 15.0 },
};

const REGION = 'ca-central-1';

// Finn's own ceiling, separate from Sam's, so a runaway site audit can never
// starve outbound email drafting of budget.
const DAILY_CAP_USD = Number(process.env.FINN_DAILY_CAP_USD ?? '5');

const GUARDRAIL_ID = process.env.WILFRED_GUARDRAIL_ID;
const GUARDRAIL_VERSION = process.env.WILFRED_GUARDRAIL_VERSION ?? 'DRAFT';

class GuardrailBlockError extends Error {
  constructor(where: 'input' | 'output', reasons: string[] = []) {
    const detail = reasons.length ? ` (${reasons.join(', ')})` : '';
    super(`Blocked by Audcomp content policy on ${where}${detail}.`);
    this.name = 'GuardrailBlockError';
  }
}

function guardrailReasons(assessment: {
  topicPolicy?: { topics?: Array<{ name?: string }> };
  contentPolicy?: { filters?: Array<{ type?: string }> };
  wordPolicy?: { managedWordLists?: unknown[] };
}): string[] {
  return [
    ...(assessment.topicPolicy?.topics ?? []).map((t) => `topic:${t.name}`),
    ...(assessment.contentPolicy?.filters ?? []).map((f) => `content:${f.type}`),
    ...((assessment.wordPolicy?.managedWordLists?.length ?? 0) ? ['profanity'] : []),
  ];
}

// State lives in wilfred.model_health, not memory — a container recycle would
// otherwise reset a breaker that tripped seconds earlier.
const BREAKER_THRESHOLD = 3;
const BREAKER_COOLDOWN_MS = 60_000;

async function isOpen(id: string): Promise<boolean> {
  try {
    const health = await getModelHealth(id);
    if (!health || !health.openUntil) return false;
    return health.failures >= BREAKER_THRESHOLD && Date.now() < health.openUntil.getTime();
  } catch {
    return false; // never block a model on a health-read failure
  }
}

async function assertWithinBudget(): Promise<void> {
  let spent = 0;
  try {
    spent = await getTodaySpendUsd();
  } catch {
    return; // never block work on a budget-read failure
  }
  if (spent >= DAILY_CAP_USD) {
    const details = `Finn has hit the daily model budget: $${spent.toFixed(2)} of $${DAILY_CAP_USD.toFixed(2)}. Site audits are blocked until tomorrow (UTC). Raise FINN_DAILY_CAP_USD to lift it.`;
    await logProtectionEvent('budget_blocked', 'finn-daily-cap', details).catch(() => {});
    throw new Error(details);
  }
}

async function invokeModel(
  spec: ModelSpec,
  prompt: string,
  toolName: string,
  inputSchema: Record<string, unknown>,
  useGuardrail: boolean,
  messages?: Message[]
): Promise<Record<string, unknown>> {
  const client = new BedrockRuntimeClient({ region: REGION });
  const response = await client.send(
    new ConverseCommand({
      modelId: spec.id,
      // A caller supplying `messages` owns the whole conversation (history, and
      // image blocks for screenshots). `prompt` remains the single-turn path.
      messages: messages ?? [{ role: 'user', content: [{ text: prompt }] }],
      toolConfig: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- JSON-Schema object is DocumentType-compatible at runtime.
        tools: [{ toolSpec: { name: toolName, inputSchema: { json: inputSchema as any } } }],
        toolChoice: { tool: { name: toolName } },
      },
      // Deliberately NO guardrailConfig here. That would scan the INPUT, which
      // for Finn is Audcomp's own page source plus Finn's own instruction
      // preamble — so it flags the site's real credentials as "invented" and
      // reads the rules preamble as a PROMPT_ATTACK. Both are false positives by
      // construction. The guardrail is applied to the OUTPUT only, below, where
      // it is judging copy Finn actually wrote.
    })
  );

  const usage = response.usage;
  if (usage) {
    const inTok = usage.inputTokens ?? 0;
    const outTok = usage.outputTokens ?? 0;
    const costUsd = (inTok / 1_000_000) * spec.inUsdPerM + (outTok / 1_000_000) * spec.outUsdPerM;
    void insertTokenUsage(toolName, spec.id, inTok, outTok, costUsd).catch((err) => console.error('token usage log failed', err));
  }

  if (response.stopReason === 'guardrail_intervened') {
    const inputAssessments = Object.values(response.trace?.guardrail?.inputAssessment ?? {});
    throw new GuardrailBlockError('input', inputAssessments.flatMap(guardrailReasons));
  }

  const content = response.output?.message?.content ?? [];
  const toolUseBlock = content.find((block) => block.toolUse !== undefined);
  if (!toolUseBlock?.toolUse?.input) {
    throw new Error('Bedrock did not return a tool-use response');
  }
  const result = toolUseBlock.toolUse.input as Record<string, unknown>;

  // Converse's output filter does not scan tool-use content, so the generated
  // copy gets its own guardrail pass.
  if (GUARDRAIL_ID && useGuardrail) await assertOutputAllowed(client, result);
  return result;
}

async function assertOutputAllowed(client: BedrockRuntimeClient, payload: Record<string, unknown>): Promise<void> {
  const text = JSON.stringify(payload).slice(0, 20_000);
  if (!text) return;
  const resp = await client.send(
    new ApplyGuardrailCommand({
      guardrailIdentifier: GUARDRAIL_ID!,
      guardrailVersion: GUARDRAIL_VERSION,
      source: 'OUTPUT',
      content: [{ text: { text } }],
    })
  );
  if (resp.action === 'GUARDRAIL_INTERVENED') {
    throw new GuardrailBlockError('output', (resp.assessments ?? []).flatMap(guardrailReasons));
  }
}

/** Budget -> route to tier -> invoke with circuit-breaker failover. */
/** `guardrail` defaults to true and MUST stay true for anything Finn authors
 * that could reach the website. It is turned off only for auditing, which reads
 * existing page copy and returns a report: the guardrail's denied topics (e.g.
 * "Unauthorized guarantees") describe things Audcomp must not *say*, and an
 * audit that quotes an offending sentence in order to flag it would otherwise be
 * blocked for reporting the very problem it exists to find. Audit output is
 * scores and issue text stored for human review; it is never published. */
export async function routeAndInvoke(
  tier: Tier,
  prompt: string,
  toolName: string,
  inputSchema: Record<string, unknown>,
  opts: { guardrail?: boolean; messages?: Message[] } = {}
): Promise<Record<string, unknown>> {
  const useGuardrail = opts.guardrail !== false;
  await assertWithinBudget();

  const preferred = MODELS[tier];
  const fallback = MODELS[tier === 'expert' ? 'junior' : 'expert'];
  const order = (await isOpen(preferred.id)) ? [fallback, preferred] : [preferred, fallback];

  let lastErr: unknown;
  for (const spec of order) {
    if (spec !== order[order.length - 1] && (await isOpen(spec.id))) continue; // skip open unless last resort
    try {
      const result = await invokeModel(spec, prompt, toolName, inputSchema, useGuardrail, opts.messages);
      await recordModelSuccess(spec.id).catch((err) => console.error('recordModelSuccess failed', err));
      if (spec.id !== preferred.id) {
        const details = `${preferred.id} was unavailable; Finn used ${spec.id} instead.`;
        await logProtectionEvent('model_failover', spec.id, details).catch(() => {});
      }
      return result;
    } catch (err) {
      if (err instanceof GuardrailBlockError) {
        // Every model shares the guardrail — failing over would just block again.
        await logProtectionEvent('guardrail_blocked', GUARDRAIL_ID ?? 'guardrail', err.message).catch(() => {});
        throw err;
      }
      await recordModelFailure(spec.id, BREAKER_COOLDOWN_MS).catch((e) => console.error('recordModelFailure failed', e));
      lastErr = err;
      console.error(`Finn: model ${spec.id} failed, failing over`, err);
    }
  }
  throw lastErr instanceof Error ? lastErr : new Error('All models failed');
}
