import type { VoiceSpec, ProposedEdit } from './db.js';
import { routeAndInvoke } from './finn-router.js';
import { renderSpec, deSlop, scanBannedTerms, countEmDashes } from './voice-spec.js';
import type { PageIssue } from './audit.js';

// The site has no CMS: copy lives inline in ~40 hand-written app/*/page.tsx
// files. Finn therefore never regenerates a file. It emits field-level string
// swaps, and every swap must match the source EXACTLY ONCE or it is discarded.
// That single rule is what makes machine edits safe on hand-written TSX.

// Source files are small (the largest page is ~150 lines), so the whole file
// fits in the prompt and the model can see real syntax rather than a summary.
const MAX_SOURCE_CHARS = 24_000;

const REWRITE_TOOL_SCHEMA = {
  type: 'object',
  properties: {
    edits: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          field: { type: 'string', description: 'Where this lives, e.g. metadata.description, Hero.subtitle, subServices[3].description' },
          currentText: { type: 'string', description: 'The exact existing string from the source, copied character for character, without surrounding quotes.' },
          proposedText: { type: 'string', description: 'The replacement string.' },
          rationale: { type: 'string', description: 'Why the change is needed, naming the rule it fixes.' },
          category: { type: 'string', enum: ['voice', 'seo', 'factual'] },
          severity: { type: 'string', enum: ['high', 'medium', 'low'] },
        },
        required: ['field', 'currentText', 'proposedText', 'rationale', 'category', 'severity'],
      },
    },
  },
  required: ['edits'],
} as const;

function occurrences(haystack: string, needle: string): number {
  if (!needle) return 0;
  return haystack.split(needle).length - 1;
}

/** The realistic way a copy swap breaks a TypeScript build: the replacement
 * contains the very quote character that delimits the string literal it sits
 * in, terminating it early. Rather than banning apostrophes outright (which
 * would block "Audcomp's"), look at what actually delimits this occurrence and
 * only reject a conflict with that character. Returns null when safe. */
function delimiterConflict(source: string, currentText: string, proposedText: string): string | null {
  if (/[\r\n]/.test(proposedText)) return 'replacement spans multiple lines';
  if (proposedText.includes('\\')) return 'replacement contains a backslash';

  const idx = source.indexOf(currentText);
  if (idx < 0) return null; // uniqueness is checked separately
  const before = source[idx - 1];
  const after = source[idx + currentText.length];

  for (const quote of ['"', "'", '`'] as const) {
    // Only treat it as the delimiter when the occurrence is bracketed by it.
    if ((before === quote || after === quote) && proposedText.includes(quote)) {
      return `replacement contains ${quote} which delimits this string literal`;
    }
  }
  // A JSX text node is not quote-delimited, but a brace would open an expression.
  return null;
}

export interface RewriteOutcome {
  accepted: ProposedEdit[];
  rejected: Array<{ field: string; reason: string; currentText: string }>;
}

export async function proposeEdits(
  route: string,
  filePath: string,
  source: string,
  pageId: string | null,
  spec: VoiceSpec,
  issues: PageIssue[]
): Promise<RewriteOutcome> {
  const prompt = [
    `You are rewriting copy on Audcomp's marketing website. Page route: ${route}`,
    `Source file: ${filePath}`,
    '',
    renderSpec(spec),
    '',
    issues.length
      ? `--- ISSUES FOUND IN THE AUDIT ---\n${issues.map((i) => `[${i.severity}/${i.category}] ${i.message}`).join('\n')}\n--- END ---`
      : '(No audit issues supplied.)',
    '',
    '--- SOURCE FILE (Next.js App Router page, TypeScript + JSX) ---',
    source.slice(0, MAX_SOURCE_CHARS),
    '--- END SOURCE ---',
    '',
    'Propose copy changes as a list of exact string replacements.',
    '',
    'HARD REQUIREMENTS, a violation makes the edit unusable:',
    '1. currentText must be copied from the source EXACTLY, character for character,',
    '   including punctuation and internal spacing. Do not include the surrounding',
    '   quote marks, and do not include the JSX attribute name.',
    '2. currentText must appear EXACTLY ONCE in the file. If a phrase repeats,',
    '   extend it with enough surrounding text to become unique, or skip it.',
    '3. Change ONLY human-readable copy: string literals and JSX text. Never touch',
    '   an import, component name, prop name, href, className, image path, variable,',
    '   or any identifier. If a string is a URL, a path, or a CSS class, leave it.',
    '4. proposedText must obey the voice spec above. Never introduce a banned term.',
    '   Never use an em-dash or en-dash; use a comma or a full stop.',
    '5. Preserve meaning. Do not invent statistics, awards, certifications, client',
    '   names, or capabilities that are not already in the source.',
    '',
    'Prefer a small number of high-value changes over rewriting everything. If the',
    'copy already meets the spec, return an empty list.',
  ].join('\n');

  const result = await routeAndInvoke('expert', prompt, 'submit_copy_edits', REWRITE_TOOL_SCHEMA as unknown as Record<string, unknown>);
  const raw = Array.isArray(result.edits) ? (result.edits as Array<Record<string, unknown>>) : [];

  return validateEdits(raw, { source, route, filePath, pageId, spec });
}

export interface ValidateContext {
  source: string;
  route: string;
  filePath: string;
  pageId: string | null;
  spec: VoiceSpec;
  /** Where the edit came from. Chat-authored edits are auto-approved upstream;
   * this only tags the row so the review UI can order them. */
  origin?: 'audit' | 'instruction';
  chatMessageId?: string | null;
}

/** The single gate every machine-authored edit passes through, whichever path
 * produced it — the site audit or a chat instruction. These checks are the
 * reason it is safe to let a model edit hand-written TSX, so there is exactly
 * one implementation of them on purpose: a second, drifting copy is how that
 * guarantee quietly rots. */
export function validateEdits(
  raw: Array<Record<string, unknown>>,
  ctx: ValidateContext
): RewriteOutcome {
  const { source, route, filePath, pageId, spec } = ctx;
  const accepted: ProposedEdit[] = [];
  const rejected: RewriteOutcome['rejected'] = [];
  const claimed = new Set<string>();

  for (const e of raw) {
    const field = String(e.field ?? '').trim();
    const currentText = String(e.currentText ?? '');
    const proposedText = deSlop(String(e.proposedText ?? '')).trim();
    const rationale = String(e.rationale ?? '').trim();

    const reject = (reason: string) => rejected.push({ field: field || '(unnamed)', reason, currentText });

    if (!currentText || !proposedText) { reject('empty currentText or proposedText'); continue; }
    if (currentText === proposedText) { reject('no-op: proposed text is identical'); continue; }

    // The rule the whole design rests on.
    const count = occurrences(source, currentText);
    if (count === 0) { reject('currentText does not appear in the source file'); continue; }
    if (count > 1) { reject(`currentText appears ${count} times; must be unique`); continue; }

    // Two edits claiming the same span would make application order-dependent.
    if (claimed.has(currentText)) { reject('duplicate: another edit already targets this exact string'); continue; }

    // Never ship a fix that reintroduces the problem.
    const introduced = scanBannedTerms(proposedText, spec.bannedWords);
    if (introduced.length) { reject(`proposed text uses banned term(s): ${introduced.map((b) => b.term).join(', ')}`); continue; }
    if (countEmDashes(proposedText)) { reject('proposed text still contains an em/en-dash'); continue; }

    // Guard against the model "helpfully" rewriting code. A replacement that
    // changes the shape of the surrounding syntax is not a copy edit.
    if (/[<>{}]/.test(currentText) || /[<>{}]/.test(proposedText)) { reject('edit touches JSX or expression syntax, not plain copy'); continue; }

    // Finn cannot run `next build` (no checkout or node_modules in the AgentCore
    // container), so the one realistic build-breaker is checked directly here.
    const conflict = delimiterConflict(source, currentText, proposedText);
    if (conflict) { reject(conflict); continue; }

    claimed.add(currentText);
    accepted.push({
      pageId,
      route,
      filePath,
      field,
      currentText,
      proposedText,
      rationale,
      category: (['voice', 'seo', 'factual'].includes(String(e.category)) ? String(e.category) : 'voice') as ProposedEdit['category'],
      severity: (['high', 'medium', 'low'].includes(String(e.severity)) ? String(e.severity) : 'medium') as ProposedEdit['severity'],
      matchCount: 1,
      origin: ctx.origin ?? 'audit',
      chatMessageId: ctx.chatMessageId ?? null,
    });
  }

  return { accepted, rejected };
}

/** Applies accepted swaps to source text. Re-checks uniqueness at apply time —
 * a draft approved days ago may be stale if the file moved on since. */
export function applyEdits(
  source: string,
  edits: Array<{ currentText: string | null; proposedText: string }>
): { content: string; failures: string[] } {
  let content = source;
  const failures: string[] = [];
  for (const edit of edits) {
    if (!edit.currentText) { failures.push('edit has no currentText'); continue; }
    const count = occurrences(content, edit.currentText);
    if (count !== 1) {
      failures.push(`"${edit.currentText.slice(0, 60)}..." matched ${count} times at apply time (expected 1)`);
      continue;
    }
    const conflict = delimiterConflict(content, edit.currentText, edit.proposedText);
    if (conflict) {
      failures.push(`"${edit.currentText.slice(0, 60)}...": ${conflict}`);
      continue;
    }
    content = content.replace(edit.currentText, edit.proposedText);
  }
  return { content, failures };
}
