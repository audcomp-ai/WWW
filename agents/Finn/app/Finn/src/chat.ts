import type { Message, ContentBlock, ImageFormat } from '@aws-sdk/client-bedrock-runtime';
import type { VoiceSpec, ProposedEdit, ChatMessage } from './db.js';
import { routeAndInvoke } from './finn-router.js';
import { renderSpec } from './voice-spec.js';
import { validateEdits } from './rewrite.js';

// Instruction-led editing. The human says what they want; Finn produces exactly
// that and nothing else. This is the inverse of propose_edits, where Finn picks
// what to change — and it exists because "your proposal is secondary" is the
// correct priority for someone editing their own website.

// Long threads are the main way this gets expensive, and old turns stop being
// useful quickly since the page source is re-sent every time anyway.
const MAX_HISTORY_TURNS = 10;

// The source is re-sent on every turn rather than relied on from history: it can
// change between turns (a merged PR), and a stale copy would produce edits whose
// currentText no longer matches.
const MAX_SOURCE_CHARS = 24_000;

const CHAT_TOOL_SCHEMA = {
  type: 'object',
  properties: {
    reply: {
      type: 'string',
      description: 'Your reply to the user. Say what you changed, or ask a question if the instruction is ambiguous. Mention anything else you noticed here rather than editing it.',
    },
    edits: {
      type: 'array',
      description: 'Only the changes the user asked for. Empty if you need clarification first.',
      items: {
        type: 'object',
        properties: {
          field: { type: 'string', description: 'Where this lives, e.g. metadata.description, Hero.subtitle' },
          currentText: { type: 'string', description: 'The exact existing string from the source, copied character for character, without surrounding quotes.' },
          proposedText: { type: 'string', description: 'The replacement string.' },
          rationale: { type: 'string', description: 'Which part of the request this satisfies.' },
          category: { type: 'string', enum: ['voice', 'seo', 'factual'] },
          severity: { type: 'string', enum: ['high', 'medium', 'low'] },
        },
        required: ['field', 'currentText', 'proposedText', 'rationale', 'category', 'severity'],
      },
    },
  },
  required: ['reply', 'edits'],
} as const;

function imageFormatFromContentType(contentType: string): ImageFormat | null {
  if (contentType.includes('png')) return 'png';
  if (contentType.includes('jpeg') || contentType.includes('jpg')) return 'jpeg';
  if (contentType.includes('webp')) return 'webp';
  if (contentType.includes('gif')) return 'gif';
  return null;
}

/** Fetches a screenshot from its signed Storage URL and turns it into a Bedrock
 * image block. Returns null on any failure — a broken image must degrade to a
 * text-only turn, never take the whole request down. */
async function fetchImageBlock(imageUrl: string): Promise<ContentBlock | null> {
  try {
    const res = await fetch(imageUrl);
    if (!res.ok) return null;
    const contentType = res.headers.get('content-type') ?? '';
    const format = imageFormatFromContentType(contentType);
    if (!format) return null;
    const bytes = new Uint8Array(await res.arrayBuffer());
    if (!bytes.length || bytes.length > 4_500_000) return null; // Bedrock caps image size
    return { image: { format, source: { bytes } } };
  } catch {
    return null;
  }
}

export interface StagedEdit {
  field: string;
  currentText: string | null;
  proposedText: string;
}

function renderStaged(staged: StagedEdit[]): string {
  if (!staged.length) return '';
  return [
    '--- ALREADY QUEUED FOR THIS PAGE (staged, NOT yet in the source above) ---',
    ...staged.map((e) => `- ${e.field}\n    source still says: ${JSON.stringify(e.currentText)}\n    queued to become:  ${JSON.stringify(e.proposedText)}`),
    '--- END QUEUED ---',
    '',
    'These are pending changes. The SOURCE still contains the "source still says"',
    'text, not the queued replacement. If the user asks you to refine one of these',
    '(for example "make that shorter"), your currentText MUST be the original',
    '"source still says" text, and your proposedText is the new final wording. The',
    'queued edit will be replaced by yours. Never use the queued replacement text',
    'as currentText: it does not exist in the file.',
    '',
  ].join('\n');
}

function buildSystemPreamble(route: string, filePath: string, source: string, spec: VoiceSpec, hasImage: boolean, staged: StagedEdit[] = []): string {
  return [
    `You are Finn, editing the copy on Audcomp's website. Page: ${route} (${filePath}).`,
    '',
    'THE USER\'S INSTRUCTION IS THE OBJECTIVE. Do what they asked, and only what',
    'they asked. You are not reviewing this page; they are directing you.',
    '',
    'If something else on the page is wrong, say so in `reply`. Do NOT put it in',
    '`edits`. Unrequested changes are the single most annoying thing you can do.',
    '',
    'If the instruction is ambiguous, or you cannot find the section they mean,',
    'return an empty `edits` list and ask a specific question in `reply`. Guessing',
    'is worse than asking.',
    '',
    renderSpec(spec),
    '',
    'The voice spec is a CONSTRAINT, not a second agenda: whatever you write must',
    'obey it, but it does not license changes the user did not ask for.',
    '',
    hasImage
      ? 'A screenshot is attached. Use it ONLY to work out WHICH section the user means. The text you put in currentText must be copied from the SOURCE below, never transcribed from the image. Rendered text differs from source text: the source may contain HTML entities (&apos;) and JSX tags (<br />) where the screenshot shows plain characters.'
      : '',
    '',
    '--- PAGE SOURCE (Next.js App Router, TypeScript + JSX) ---',
    source.slice(0, MAX_SOURCE_CHARS),
    '--- END SOURCE ---',
    '',
    renderStaged(staged),
    'HARD REQUIREMENTS for every edit, a violation makes it unusable:',
    '1. currentText must be copied from the source EXACTLY, character for character.',
    '   Do not include the surrounding quote marks or the JSX attribute name.',
    '2. currentText must appear EXACTLY ONCE in the file. If a phrase repeats,',
    '   extend it with surrounding text until it is unique.',
    '3. Change ONLY human-readable copy. Never touch an import, component name,',
    '   prop name, href, className, image path, or any identifier.',
    '4. Never introduce a banned term. Never use an em-dash or en-dash.',
    '5. Do not invent statistics, awards, certifications, or client names.',
  ].filter(Boolean).join('\n');
}

export interface ChatOutcome {
  reply: string;
  accepted: ProposedEdit[];
  rejected: Array<{ field: string; reason: string; currentText: string }>;
}

export async function runChat(params: {
  route: string;
  filePath: string;
  source: string;
  pageId: string | null;
  spec: VoiceSpec;
  history: ChatMessage[];
  message: string;
  imageUrl?: string;
  chatMessageId?: string | null;
  staged?: StagedEdit[];
}): Promise<ChatOutcome> {
  const { route, filePath, source, pageId, spec, history, message, imageUrl } = params;

  const imageBlock = imageUrl ? await fetchImageBlock(imageUrl) : null;
  const preamble = buildSystemPreamble(route, filePath, source, spec, imageBlock !== null, params.staged ?? []);

  // Converse requires strictly alternating user/assistant turns. History is
  // trimmed to the most recent turns and forced to start on a user turn.
  const trimmed = history.slice(-MAX_HISTORY_TURNS * 2);
  while (trimmed.length && trimmed[0]?.role !== 'user') trimmed.shift();

  const messages: Message[] = [];
  for (const h of trimmed) {
    const last = messages[messages.length - 1];
    if (last && last.role === h.role) {
      // Collapse consecutive same-role turns rather than letting Converse reject
      // the whole request.
      last.content = [...(last.content ?? []), { text: h.content }];
      continue;
    }
    messages.push({ role: h.role, content: [{ text: h.content }] });
  }

  // The current turn: preamble + instruction (+ screenshot). The preamble rides
  // on the latest user turn rather than a system block so the page source is
  // always the freshest thing the model sees.
  const currentContent: ContentBlock[] = [{ text: `${preamble}\n\n--- USER INSTRUCTION ---\n${message}` }];
  if (imageBlock) currentContent.push(imageBlock);

  if (messages.length && messages[messages.length - 1]?.role === 'user') {
    messages[messages.length - 1]!.content = [
      ...(messages[messages.length - 1]!.content ?? []),
      ...currentContent,
    ];
  } else {
    messages.push({ role: 'user', content: currentContent });
  }

  // Guardrail stays ON: unlike auditing, this path authors copy that can reach
  // the website.
  const result = await routeAndInvoke('expert', '', 'submit_chat_response', CHAT_TOOL_SCHEMA as unknown as Record<string, unknown>, { messages });

  const raw = Array.isArray(result.edits) ? (result.edits as Array<Record<string, unknown>>) : [];
  const outcome = validateEdits(raw, {
    source, route, filePath, pageId, spec,
    origin: 'instruction',
    chatMessageId: params.chatMessageId ?? null,
  });

  return {
    reply: String(result.reply ?? '').trim() || 'Done.',
    accepted: outcome.accepted,
    rejected: outcome.rejected,
  };
}
