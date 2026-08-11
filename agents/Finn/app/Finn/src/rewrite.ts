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

/** Banned-term counts, so a rejection can be based on what an edit ADDS rather
 * than what it inherits from the text it replaces. */
function countTerms(text: string, banned: string[]): Map<string, number> {
  const m = new Map<string, number>();
  for (const f of scanBannedTerms(text, banned)) m.set(f.term, f.count);
  return m;
}

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

// Plain HTML that is always safe to emit. Anything else must already be
// imported by the file the block is going into.
const SAFE_HTML_TAGS = new Set([
  'section', 'div', 'p', 'h2', 'h3', 'h4', 'ul', 'ol', 'li', 'a', 'span',
  'strong', 'em', 'br', 'img', 'hr',
]);

/** Reads the components a file imports, so a block can be held to what is
 * already available rather than adding import lines. */
export function importedComponentsOf(source: string): string[] {
  const names: string[] = [];
  for (const m of source.matchAll(/import\s+(?:\{([^}]*)\}|(\w+))\s+from\s+["'][^"']+["']/g)) {
    const named = (m[1] ?? m[2] ?? '').split(',').map((x) => x.trim().split(/\s+as\s+/).pop()?.trim() ?? '');
    for (const n of named) if (n && /^[A-Z]/.test(n)) names.push(n);
  }
  return Array.from(new Set(names));
}

/** The checks that buy a block its exemption from the no-JSX rule. Returns a
 * reason string when the block is unsafe, or null when it passes. The pull
 * request's preview build remains the real backstop. */
export function validateBlock(anchor: string, proposed: string, imported: string[]): string | null {
  if (!proposed.startsWith(anchor) && !proposed.endsWith(anchor)) {
    return 'a block must keep the anchor text intact at the start or end';
  }
  const block = proposed.startsWith(anchor) ? proposed.slice(anchor.length) : proposed.slice(0, -anchor.length);

  // A SectionAngle is a coloured wedge transitioning one section into the next.
  // When the anchor IS one, a model that inserts after it has to emit a second
  // divider to repair the colour run, which leaves a duplicate line and a wedge
  // in the wrong place. Refuse it: the fix is to anchor on the other side, not to
  // compensate. Enforced here rather than in the prompt because the prompt did
  // not hold.
  if (/<\s*SectionAngle/.test(anchor) && /<\s*SectionAngle/.test(block)) {
    return 'block adds another SectionAngle beside the divider it is anchored to; use position "before" so the new section sits above the divider instead';
  }

  if (/<\s*(script|iframe|object|embed)\b/i.test(block)) return 'block contains a script or embed tag';
  if (/dangerouslySetInnerHTML/.test(block)) return 'block uses dangerouslySetInnerHTML';
  if (/\son[A-Z]\w*\s*=/.test(block)) return 'block attaches an event handler';

  // Every element must be plain HTML or already imported by this file.
  const allowed = new Set([...SAFE_HTML_TAGS, ...imported]);
  const used = new Set<string>();
  for (const m of block.matchAll(/<\s*([A-Za-z][A-Za-z0-9.]*)/g)) used.add(m[1]!);
  const unknown = [...used].filter((t) => !allowed.has(t) && !allowed.has(t.split('.')[0]!));
  if (unknown.length) return `block uses ${unknown.join(', ')}, which this file does not import`;

  // Tags must balance, or the file will not parse.
  for (const tag of used) {
    if (SAFE_HTML_TAGS.has(tag) && ['br', 'img', 'hr'].includes(tag)) continue;
    const open = (block.match(new RegExp(`<\\s*${tag}(\\s|>|/)`, 'g')) ?? []).length;
    const close = (block.match(new RegExp(`</\\s*${tag}\\s*>`, 'g')) ?? []).length;
    const self = (block.match(new RegExp(`<\\s*${tag}[^>]*/>`, 'g')) ?? []).length;
    if (open - self !== close) return `block has unbalanced <${tag}> tags (${open - self} open, ${close} closed)`;
  }
  if ((block.match(/\{/g) ?? []).length !== (block.match(/\}/g) ?? []).length) {
    return 'block has unbalanced braces';
  }
  return null;
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
  /** Components already imported by the target file. A block may only use these,
   * which removes any need to add import lines and the risk of breaking them. */
  importedComponents?: string[];
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

    // Never ship a fix that INTRODUCES a banned term. Deliberately differential:
    // an edit inherits whatever was already in the text it replaces, and judging
    // the replacement as a whole made any paragraph containing a banned term
    // permanently uneditable. /our-story cites "top-25 CDN Solutions Provider" —
    // a real award whose name contains a banned marketing phrase — so appending a
    // sentence to that paragraph was refused for a term the edit did not add.
    const before = countTerms(currentText, spec.bannedWords);
    const after = countTerms(proposedText, spec.bannedWords);
    const added = [...after.keys()].filter((t) => (after.get(t) ?? 0) > (before.get(t) ?? 0));
    if (added.length) { reject(`proposed text adds banned term(s): ${added.join(', ')}`); continue; }
    if (countEmDashes(proposedText) > countEmDashes(currentText)) { reject('proposed text adds an em/en-dash'); continue; }

    // Guard against the model "helpfully" rewriting code. A replacement that
    // changes the shape of the surrounding syntax is not a copy edit.
    // new_section is the one exception: it inserts markup on purpose, and pays
    // for that exemption with validateBlock's own checks below.
    const isBlock = String(e.category) === 'new_section';
    if (!isBlock && (/[<>{}]/.test(currentText) || /[<>{}]/.test(proposedText))) {
      reject('edit touches JSX or expression syntax, not plain copy'); continue;
    }
    if (isBlock) {
      const problem = validateBlock(currentText, proposedText, ctx.importedComponents ?? []);
      if (problem) { reject(problem); continue; }
    }

    // Finn cannot run `next build` (no checkout or node_modules in the AgentCore
    // container), so the one realistic build-breaker is checked directly here.
    // Skipped for blocks: they span lines and contain quotes by design, and
    // validateBlock covers them instead.
    if (!isBlock) {
      const conflict = delimiterConflict(source, currentText, proposedText);
      if (conflict) { reject(conflict); continue; }
    }

    claimed.add(currentText);
    accepted.push({
      pageId,
      route,
      filePath,
      field,
      currentText,
      proposedText,
      rationale,
      category: (['voice', 'seo', 'factual', 'new_section'].includes(String(e.category)) ? String(e.category) : 'voice') as ProposedEdit['category'],
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
