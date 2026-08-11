import type { VoiceSpec } from './db.js';
import { routeAndInvoke } from './finn-router.js';

/** Copied from Sam's bedrock-draft.ts. The prompt bans em-dashes, but models
 * comply loosely, so the guarantee is enforced in code on the way out. */
export function deSlop(text: string): string {
  return text.replace(/\s*[—–]\s*/g, ', ');
}

export interface VoiceFinding {
  term: string;
  count: number;
}

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/** Deterministic banned-term scan. Exact and free — there is no reason to pay a
 * model to notice the word "streamline". Multi-word phrases match across
 * collapsed whitespace; single words match on a word boundary so "elevate"
 * does not fire inside "elevator". */
export function scanBannedTerms(text: string, bannedWords: string[]): VoiceFinding[] {
  const findings: VoiceFinding[] = [];
  for (const term of bannedWords) {
    const pattern = term.trim().includes(' ')
      ? escapeRegExp(term.trim()).replace(/\\?\s+/g, '\\s+')
      : `\\b${escapeRegExp(term.trim())}\\w*\\b`;
    const matches = text.match(new RegExp(pattern, 'gi'));
    if (matches?.length) findings.push({ term, count: matches.length });
  }
  return findings;
}

/** Em/en-dashes are a separate rule from the banned word list. */
export function countEmDashes(text: string): number {
  return (text.match(/[—–]/g) ?? []).length;
}

/** The spec block every Finn prompt embeds, so scoring and rewriting are held
 * to exactly the same standard. */
export function renderSpec(spec: VoiceSpec): string {
  return [
    'AUDCOMP VOICE SPEC (version ' + spec.version + ')',
    '',
    'Positioning: ' + spec.positioning,
    '',
    'Rules:',
    ...spec.rules.map((r, i) => `${i + 1}. ${r}`),
    '',
    'BANNED words and phrases — never use any of these, in any casing or inflection:',
    spec.bannedWords.join(', '),
  ].join('\n');
}

const SPEC_TOOL_SCHEMA = {
  type: 'object',
  properties: {
    positioning: { type: 'string', description: 'One paragraph describing what Audcomp is and does, in Audcomp\'s own voice.' },
    bannedWords: { type: 'array', items: { type: 'string' }, description: 'Words and phrases the site should never use.' },
    rules: { type: 'array', items: { type: 'string' }, description: 'Concrete, checkable style rules.' },
    notes: { type: 'string', description: 'What changed versus the current spec and why.' },
  },
  required: ['positioning', 'bannedWords', 'rules', 'notes'],
} as const;

export interface LearnedSpec {
  positioning: string;
  bannedWords: string[];
  rules: string[];
  notes: string;
}

/** Proposes a voice spec from real page copy. The result is written inactive —
 * see insertProposedVoiceSpec. The current spec is passed in deliberately: the
 * site is known to be off-spec today (the homepage meta says "streamline"), so
 * learning from the pages alone would launder existing drift into the standard. */
export async function learnVoiceSpec(samples: Array<{ route: string; markdown: string }>, current: VoiceSpec): Promise<LearnedSpec> {
  const prompt = [
    'You are defining the written voice standard for Audcomp\'s marketing website.',
    '',
    'Below is the CURRENT approved spec, then real copy from several live pages.',
    '',
    renderSpec(current),
    '',
    '--- LIVE PAGE COPY ---',
    ...samples.map((s) => `\n## ${s.route}\n${s.markdown.slice(0, 4000)}`),
    '--- END ---',
    '',
    'Propose the voice spec this site SHOULD be held to. Keep what is genuinely',
    'Audcomp about the live copy: its subject matter, its Canadian and Ontario',
    'grounding, its concrete service detail.',
    '',
    'Do NOT adopt a habit merely because the live pages do it. The current pages',
    'contain marketing filler and banned words; that is the problem being solved,',
    'not evidence of house style. Never remove a term from the banned list just',
    'because the site currently uses it.',
    '',
    'Every rule must be concrete enough that a reviewer can tell whether a given',
    'sentence passes or fails it.',
  ].join('\n');

  const result = await routeAndInvoke('expert', prompt, 'submit_voice_spec', SPEC_TOOL_SCHEMA as unknown as Record<string, unknown>);

  const bannedWords = Array.isArray(result.bannedWords) ? (result.bannedWords as string[]) : [];
  // The seeded list is a floor, not a starting point to negotiate down from:
  // Sam enforces it on outbound email, and the user asked for one shared spec.
  const merged = Array.from(new Set([...current.bannedWords, ...bannedWords].map((w) => w.trim()).filter(Boolean)));

  return {
    positioning: deSlop(String(result.positioning ?? current.positioning)),
    bannedWords: merged,
    rules: Array.isArray(result.rules) ? (result.rules as string[]).map(String) : current.rules,
    notes: String(result.notes ?? ''),
  };
}
