import { Client } from 'pg';
import { getSupabaseDbUrl } from './secrets.js';

// Same access pattern as Sam and LeadPipeline: a fresh pg Client per call,
// always closed in a finally. No pooling — AgentCore containers are short-lived
// and a pool outlives the invocation that created it.

async function withClient<T>(fn: (client: Client) => Promise<T>): Promise<T> {
  const client = new Client({ connectionString: await getSupabaseDbUrl() });
  await client.connect();
  try {
    return await fn(client);
  } finally {
    await client.end();
  }
}

// ---------------------------------------------------------------- voice spec

export interface VoiceSpec {
  id: string;
  version: number;
  positioning: string;
  bannedWords: string[];
  rules: string[];
}

/** The one active spec. Throws if none is active — Finn must never fall back to
 * an implicit house style, because a silent default is how two agents drift. */
export async function getActiveVoiceSpec(): Promise<VoiceSpec> {
  return withClient(async (client) => {
    const result = await client.query(
      `select id, version, positioning, banned_words, rules
         from wilfred.site_voice_spec where is_active limit 1`
    );
    const row = result.rows[0];
    if (!row) throw new Error('No active row in wilfred.site_voice_spec — activate a version before running Finn');
    return {
      id: row.id,
      version: row.version,
      positioning: row.positioning,
      bannedWords: row.banned_words ?? [],
      rules: Array.isArray(row.rules) ? row.rules : [],
    };
  });
}

/** Machine-proposed specs land inactive by design; a human activates them. */
export async function insertProposedVoiceSpec(
  positioning: string,
  bannedWords: string[],
  rules: string[],
  notes: string
): Promise<{ id: string; version: number }> {
  return withClient(async (client) => {
    const result = await client.query(
      `insert into wilfred.site_voice_spec (version, positioning, banned_words, rules, source, notes, is_active)
       select coalesce(max(version), 0) + 1, $1, $2, $3::jsonb, 'learned', $4, false
         from wilfred.site_voice_spec
       returning id, version`,
      [positioning, bannedWords, JSON.stringify(rules), notes]
    );
    return { id: result.rows[0].id, version: result.rows[0].version };
  });
}

// -------------------------------------------------------------------- pages

export interface SitePageRow {
  id: string;
  route: string;
  filePath: string | null;
  contentHash: string;
}

export async function getPageByRoute(route: string): Promise<SitePageRow | null> {
  return withClient(async (client) => {
    const result = await client.query(
      `select id, route, file_path, content_hash from wilfred.site_pages where route = $1`,
      [route]
    );
    const row = result.rows[0];
    return row ? { id: row.id, route: row.route, filePath: row.file_path, contentHash: row.content_hash } : null;
  });
}

export interface PageScores {
  voice?: number | null;
  seo?: number | null;
  aeo?: number | null;
  content?: number | null;
  technical?: number | null;
}

export async function upsertPage(page: {
  route: string;
  url: string;
  filePath: string | null;
  contentHash: string;
  markdown: string;
  metadata: Record<string, unknown>;
  scores?: PageScores;
  issues?: unknown[];
}): Promise<string> {
  return withClient(async (client) => {
    const s = page.scores ?? {};
    const audited = page.scores ? 'now()' : 'null';
    const result = await client.query(
      `insert into wilfred.site_pages
         (route, url, file_path, content_hash, markdown, metadata,
          voice_score, seo_score, aeo_score, content_score, technical_score,
          issues, last_crawled_at, last_audited_at)
       values ($1, $2, $3, $4, $5, $6::jsonb, $7, $8, $9, $10, $11, $12::jsonb, now(), ${audited})
       on conflict (route) do update set
         url = excluded.url,
         file_path = coalesce(excluded.file_path, wilfred.site_pages.file_path),
         content_hash = excluded.content_hash,
         markdown = excluded.markdown,
         metadata = excluded.metadata,
         voice_score = coalesce(excluded.voice_score, wilfred.site_pages.voice_score),
         seo_score = coalesce(excluded.seo_score, wilfred.site_pages.seo_score),
         aeo_score = coalesce(excluded.aeo_score, wilfred.site_pages.aeo_score),
         content_score = coalesce(excluded.content_score, wilfred.site_pages.content_score),
         technical_score = coalesce(excluded.technical_score, wilfred.site_pages.technical_score),
         issues = excluded.issues,
         last_crawled_at = now(),
         last_audited_at = coalesce(excluded.last_audited_at, wilfred.site_pages.last_audited_at)
       returning id`,
      [
        page.route, page.url, page.filePath, page.contentHash, page.markdown,
        JSON.stringify(page.metadata),
        s.voice ?? null, s.seo ?? null, s.aeo ?? null, s.content ?? null, s.technical ?? null,
        JSON.stringify(page.issues ?? []),
      ]
    );
    return result.rows[0].id;
  });
}

// ------------------------------------------------------------------- drafts

export interface ProposedEdit {
  pageId: string | null;
  route: string;
  filePath: string;
  field: string;
  currentText: string | null;
  proposedText: string;
  rationale: string;
  category: 'voice' | 'seo' | 'factual' | 'new_page';
  severity: 'high' | 'medium' | 'low';
  matchCount: number | null;
  /** 'instruction' = a human asked for this in chat, so it is auto-approved and
   * shown first. 'audit' = Finn proposed it unprompted and it needs approving. */
  origin?: 'audit' | 'instruction';
  chatMessageId?: string | null;
}

export async function insertDrafts(edits: ProposedEdit[]): Promise<number> {
  if (!edits.length) return 0;
  return withClient(async (client) => {
    let inserted = 0;
    for (const e of edits) {
      await client.query(
        `insert into wilfred.site_content_drafts
           (page_id, route, file_path, field, current_text, proposed_text,
            rationale, category, severity, match_count, origin, chat_message_id,
            status, reviewed_at)
         values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12,
                 case when $11 = 'instruction' then 'approved' else 'pending' end,
                 case when $11 = 'instruction' then now() else null end)`,
        [e.pageId, e.route, e.filePath, e.field, e.currentText, e.proposedText,
         e.rationale, e.category, e.severity, e.matchCount,
         e.origin ?? 'audit', e.chatMessageId ?? null]
      );
      inserted += 1;
    }
    return inserted;
  });
}

export interface DraftRow {
  id: string;
  route: string;
  filePath: string;
  field: string;
  currentText: string | null;
  proposedText: string;
  category: string;
}

export async function getApprovedDrafts(ids: string[]): Promise<DraftRow[]> {
  return withClient(async (client) => {
    const result = await client.query(
      `select id, route, file_path, field, current_text, proposed_text, category
         from wilfred.site_content_drafts
        where id = any($1::uuid[]) and status = 'approved'
        order by file_path`,
      [ids]
    );
    return result.rows.map((r) => ({
      id: r.id, route: r.route, filePath: r.file_path, field: r.field,
      currentText: r.current_text, proposedText: r.proposed_text, category: r.category,
    }));
  });
}

export async function markDraftsShipped(ids: string[], prUrl: string): Promise<void> {
  await withClient(async (client) => {
    await client.query(
      `update wilfred.site_content_drafts
          set status = 'shipped', pr_url = $2, shipped_at = now()
        where id = any($1::uuid[])`,
      [ids, prUrl]
    );
  });
}

export async function markDraftsFailed(ids: string[], note: string): Promise<void> {
  await withClient(async (client) => {
    await client.query(
      `update wilfred.site_content_drafts
          set status = 'failed', failure_note = $2
        where id = any($1::uuid[])`,
      [ids, note]
    );
  });
}

// --------------------------------------------- wilfred platform shared tables

export async function insertTokenUsage(
  action: string,
  model: string,
  inputTokens: number,
  outputTokens: number,
  costUsd: number
): Promise<void> {
  await withClient(async (client) => {
    await client.query(
      `insert into wilfred.token_usage (agent, action, model, input_tokens, output_tokens, cost_usd)
       values ('finn', $1, $2, $3, $4, $5)`,
      [action, model, inputTokens, outputTokens, costUsd]
    );
  });
}

export async function getTodaySpendUsd(): Promise<number> {
  return withClient(async (client) => {
    const result = await client.query(
      `select coalesce(sum(cost_usd), 0)::float8 as spend
         from wilfred.token_usage
        where agent = 'finn' and created_at::date = current_date`
    );
    return result.rows[0]?.spend ?? 0;
  });
}

export interface ModelHealth {
  failures: number;
  openUntil: Date | null;
}

export async function getModelHealth(modelId: string): Promise<ModelHealth | null> {
  return withClient(async (client) => {
    const result = await client.query(
      `select failures, open_until from wilfred.model_health where model_id = $1`,
      [modelId]
    );
    const row = result.rows[0];
    if (!row) return null;
    return { failures: row.failures, openUntil: row.open_until ? new Date(row.open_until) : null };
  });
}

export async function recordModelFailure(modelId: string, cooldownMs: number): Promise<void> {
  await withClient(async (client) => {
    await client.query(
      `insert into wilfred.model_health (model_id, failures, open_until, updated_at)
       values ($1, 1, now() + $2 * interval '1 millisecond', now())
       on conflict (model_id) do update
         set failures = wilfred.model_health.failures + 1,
             open_until = now() + $2 * interval '1 millisecond',
             updated_at = now()`,
      [modelId, cooldownMs]
    );
  });
}

export async function recordModelSuccess(modelId: string): Promise<void> {
  await withClient(async (client) => {
    await client.query(
      `insert into wilfred.model_health (model_id, failures, open_until, updated_at)
       values ($1, 0, null, now())
       on conflict (model_id) do update
         set failures = 0, open_until = null, updated_at = now()`,
      [modelId]
    );
  });
}

export async function logProtectionEvent(
  eventType: 'budget_blocked' | 'breaker_skip' | 'model_failover' | 'guardrail_blocked',
  serviceKey: string,
  details: string
): Promise<void> {
  try {
    await withClient(async (client) => {
      await client.query(
        `insert into wilfred.protection_events (agent, event_type, service_key, details)
         values ('finn', $1, $2, $3)`,
        [eventType, serviceKey, details]
      );
    });
  } catch (err) {
    console.error('logProtectionEvent failed', err);
  }
}

// ------------------------------------------------------------------- chat

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  imageUrl: string | null;
  createdAt: string;
}

/** The conversation for one page, oldest first. Scoped per route because the
 * page source is the shared context that makes "make that shorter" resolvable. */
export async function getChatThread(route: string, limit = 40): Promise<ChatMessage[]> {
  return withClient(async (client) => {
    const result = await client.query(
      `select id, role, content, image_url, created_at
         from wilfred.site_chat_messages
        where route = $1
        order by created_at desc
        limit $2`,
      [route, limit]
    );
    return result.rows
      .map((r) => ({
        id: r.id as string,
        role: r.role as 'user' | 'assistant',
        content: r.content as string,
        imageUrl: r.image_url as string | null,
        createdAt: new Date(r.created_at).toISOString(),
      }))
      .reverse();
  });
}

export async function appendChatMessage(
  route: string,
  role: 'user' | 'assistant',
  content: string,
  imageUrl: string | null = null,
  userId: string | null = null
): Promise<string> {
  return withClient(async (client) => {
    const result = await client.query(
      `insert into wilfred.site_chat_messages (route, role, content, image_url, user_id)
       values ($1, $2, $3, $4, $5) returning id`,
      [route, role, content, imageUrl, userId]
    );
    return result.rows[0].id as string;
  });
}

/** Edits already queued for this page but NOT yet merged, so the source on disk
 * does not reflect them. The chat prompt needs these: without them the model
 * believes its own last reply ("I changed X to Y") and tries to edit text that
 * is not in the file yet. */
export async function getStagedEdits(route: string): Promise<Array<{ id: string; field: string; currentText: string | null; proposedText: string }>> {
  return withClient(async (client) => {
    const result = await client.query(
      `select id, field, current_text, proposed_text
         from wilfred.site_content_drafts
        where route = $1 and status in ('pending', 'approved')
        order by created_at`,
      [route]
    );
    return result.rows.map((r) => ({
      id: r.id as string,
      field: r.field as string,
      currentText: r.current_text as string | null,
      proposedText: r.proposed_text as string,
    }));
  });
}

/** A refinement targets the same original span as an earlier queued edit, so the
 * earlier one must step aside — otherwise open_pr would try to apply both to the
 * same text and the second would fail the exactly-once check at apply time. */
export async function supersedeDrafts(route: string, currentTexts: string[]): Promise<number> {
  if (!currentTexts.length) return 0;
  return withClient(async (client) => {
    const result = await client.query(
      `update wilfred.site_content_drafts
          set status = 'rejected',
              review_note = 'Superseded by a later instruction in chat'
        where route = $1 and current_text = any($2::text[])
          and status in ('pending', 'approved')`,
      [route, currentTexts]
    );
    return result.rowCount ?? 0;
  });
}
