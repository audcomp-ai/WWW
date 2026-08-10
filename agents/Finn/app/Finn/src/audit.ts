import type { VoiceSpec } from './db.js';
import { routeAndInvoke } from './finn-router.js';
import { renderSpec, scanBannedTerms, countEmDashes } from './voice-spec.js';

// Scoring criteria ported from Claire's AUDIT_PROMPT in
// app/api/claire/audit/route.ts, with two changes: a fifth "voice" dimension
// scored against the shared spec, and forced tool use instead of asking for
// "ONLY JSON" and hoping JSON.parse survives it.

export interface PageIssue {
  severity: 'high' | 'medium' | 'low';
  category: 'Voice' | 'SEO' | 'AEO' | 'Content' | 'Technical';
  message: string;
}

export interface AuditResult {
  scores: { voice: number; seo: number; aeo: number; content: number; technical: number };
  issues: PageIssue[];
}

const AUDIT_TOOL_SCHEMA = {
  type: 'object',
  properties: {
    voiceScore: { type: 'integer', minimum: 0, maximum: 100 },
    seoScore: { type: 'integer', minimum: 0, maximum: 100 },
    aeoScore: { type: 'integer', minimum: 0, maximum: 100 },
    contentScore: { type: 'integer', minimum: 0, maximum: 100 },
    technicalScore: { type: 'integer', minimum: 0, maximum: 100 },
    issues: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          severity: { type: 'string', enum: ['high', 'medium', 'low'] },
          category: { type: 'string', enum: ['Voice', 'SEO', 'AEO', 'Content', 'Technical'] },
          message: { type: 'string' },
        },
        required: ['severity', 'category', 'message'],
      },
    },
  },
  required: ['voiceScore', 'seoScore', 'aeoScore', 'contentScore', 'technicalScore', 'issues'],
} as const;

function clamp(v: unknown): number {
  const n = Math.round(Number(v));
  if (!Number.isFinite(n)) return 0;
  return Math.min(100, Math.max(0, n));
}

export async function auditPage(
  route: string,
  markdown: string,
  metadata: Record<string, unknown>,
  spec: VoiceSpec
): Promise<AuditResult> {
  const title = String(metadata.title ?? '');
  const description = String(metadata.description ?? '');

  // Deterministic findings first — these are facts, not opinions, so they are
  // handed to the model as established rather than left for it to rediscover.
  const haystack = `${title}\n${description}\n${markdown}`;
  const banned = scanBannedTerms(haystack, spec.bannedWords);
  const emDashes = countEmDashes(haystack);

  const prompt = [
    `Audit this page from Audcomp's marketing website: ${route}`,
    '',
    renderSpec(spec),
    '',
    '--- ALREADY DETECTED (exact string matching, treat as established fact) ---',
    banned.length
      ? `Banned terms present: ${banned.map((b) => `"${b.term}" x${b.count}`).join(', ')}`
      : 'No banned terms found.',
    `Em/en-dashes present: ${emDashes}`,
    '--- END ---',
    '',
    `## Page title\n${title}`,
    `## Meta description\n${description}`,
    `## Page content (markdown)\n${markdown}`,
    '',
    'Score 0-100 on five dimensions:',
    '- voice: adherence to the spec above. Any banned term or em-dash caps this below 60.',
    '- seo: title and meta quality, heading hierarchy, keyword usage, internal linking.',
    '- aeo: question-based headings, concise 40-60 word answer paragraphs, FAQ structure, entity clarity.',
    '- content: depth, specificity, proof, clear single call to action.',
    '- technical: heading structure, link text quality, image alt text signals.',
    '',
    'List concrete issues. Each message must name the specific offending text, not a general observation.',
  ].join('\n');

  // Junior tier: this runs once per page across the whole site, so it is the
  // one call that must stay cheap. Rewriting escalates to expert.
  const result = await routeAndInvoke('junior', prompt, 'submit_page_audit', AUDIT_TOOL_SCHEMA as unknown as Record<string, unknown>, { guardrail: false });

  const modelIssues = Array.isArray(result.issues) ? (result.issues as PageIssue[]) : [];

  // Re-assert the deterministic findings as issues regardless of what the model
  // reported — a missed banned word is the one failure mode that matters here.
  const factual: PageIssue[] = [
    ...banned.map((b) => ({
      severity: 'high' as const,
      category: 'Voice' as const,
      message: `Banned term "${b.term}" appears ${b.count} time(s).`,
    })),
    ...(emDashes > 0
      ? [{ severity: 'medium' as const, category: 'Voice' as const, message: `${emDashes} em/en-dash(es) present; the spec forbids them.` }]
      : []),
  ];

  return {
    scores: {
      voice: banned.length || emDashes ? Math.min(59, clamp(result.voiceScore)) : clamp(result.voiceScore),
      seo: clamp(result.seoScore),
      aeo: clamp(result.aeoScore),
      content: clamp(result.contentScore),
      technical: clamp(result.technicalScore),
    },
    issues: [...factual, ...modelIssues],
  };
}

// ---------------------------------------------------------------- source mode

// The new site has no deployment, so pages are audited from their TSX source
// rather than a rendered crawl. That also removes a whole class of drift: the
// text being scored is the exact text propose_edits will swap.

/** Pulls human-readable copy out of a TSX file so the deterministic banned-term
 * scan runs on prose only. Without this, `className="... flex-1 ..."` and import
 * paths would be scanned as if they were sentences. The heuristic: real copy has
 * a capital letter or sentence punctuation, several words, and some length —
 * Tailwind class strings and paths have none of those. */
export function extractCopy(source: string): string {
  const found: string[] = [];

  const looksLikeProse = (raw: string): boolean => {
    const text = raw.trim();
    if (text.length < 12) return false;
    if (text.split(/\s+/).length < 3) return false;
    if (/^[./#]|^https?:|^[a-z0-9-]+\/[a-z0-9-]/.test(text)) return false; // paths, urls
    if (!/[A-Z]|[,.!?;]/.test(text)) return false;                          // class strings
    if (/^[a-z0-9\s:_-]+$/.test(text) && !/[,.!?;]/.test(text)) return false;
    return true;
  };

  for (const m of source.matchAll(/"([^"\\]*(?:\\.[^"\\]*)*)"/g)) if (looksLikeProse(m[1] ?? '')) found.push(m[1]!);
  for (const m of source.matchAll(/'([^'\\]*(?:\\.[^'\\]*)*)'/g)) if (looksLikeProse(m[1] ?? '')) found.push(m[1]!);
  for (const m of source.matchAll(/>([^<>{}]+)</g))               if (looksLikeProse(m[1] ?? '')) found.push(m[1]!.trim());

  return Array.from(new Set(found)).join('\n');
}

/** Reads the Next.js metadata block, which is where the SEO copy lives. */
export function extractMetadata(source: string): { title: string; description: string } {
  const title = /title:\s*["'`]([^"'`]+)["'`]/.exec(source)?.[1] ?? '';
  const description = /description:\s*\n?\s*["'`]([^"'`]+)["'`]/.exec(source)?.[1] ?? '';
  return { title, description };
}

export async function auditSource(
  route: string,
  filePath: string,
  source: string,
  spec: VoiceSpec
): Promise<AuditResult> {
  const { title, description } = extractMetadata(source);
  const copy = extractCopy(source);

  const haystack = `${title}\n${description}\n${copy}`;
  const banned = scanBannedTerms(haystack, spec.bannedWords);
  const emDashes = countEmDashes(haystack);

  const prompt = [
    `Audit the copy on this page of Audcomp's marketing website: ${route}`,
    `Source file: ${filePath}`,
    '',
    renderSpec(spec),
    '',
    '--- ALREADY DETECTED (exact string matching, treat as established fact) ---',
    banned.length
      ? `Banned terms present: ${banned.map((b) => `"${b.term}" x${b.count}`).join(', ')}`
      : 'No banned terms found.',
    `Em/en-dashes present: ${emDashes}`,
    '--- END ---',
    '',
    `## Page title\n${title || '(none found)'}`,
    `## Meta description\n${description || '(none found)'}`,
    `## Visible copy extracted from the source\n${copy.slice(0, 18_000)}`,
    '',
    'Score 0-100 on five dimensions:',
    '- voice: adherence to the spec above. Any banned term or em-dash caps this below 60.',
    '- seo: title and meta description quality, keyword usage, heading and link copy.',
    '- aeo: question-shaped headings, concise 40-60 word answer paragraphs, entity clarity.',
    '- content: depth, specificity, proof, one clear call to action.',
    '- technical: heading and link text quality, alt-text-worthy copy, structure.',
    '',
    'Judge ONLY the copy. This is source code, so ignore imports, component names,',
    'props, class names and file paths entirely — they are not content.',
    'Each issue message must quote the specific offending text.',
  ].join('\n');

  const result = await routeAndInvoke('junior', prompt, 'submit_page_audit', AUDIT_TOOL_SCHEMA as unknown as Record<string, unknown>, { guardrail: false });
  const modelIssues = Array.isArray(result.issues) ? (result.issues as PageIssue[]) : [];

  const factual: PageIssue[] = [
    ...banned.map((b) => ({
      severity: 'high' as const,
      category: 'Voice' as const,
      message: `Banned term "${b.term}" appears ${b.count} time(s).`,
    })),
    ...(emDashes > 0
      ? [{ severity: 'medium' as const, category: 'Voice' as const, message: `${emDashes} em/en-dash(es) present; the spec forbids them.` }]
      : []),
    ...(!title ? [{ severity: 'high' as const, category: 'SEO' as const, message: 'No metadata title found in the source.' }] : []),
    ...(!description ? [{ severity: 'high' as const, category: 'SEO' as const, message: 'No metadata description found in the source.' }] : []),
  ];

  return {
    scores: {
      voice: banned.length || emDashes ? Math.min(59, clamp(result.voiceScore)) : clamp(result.voiceScore),
      seo: clamp(result.seoScore),
      aeo: clamp(result.aeoScore),
      content: clamp(result.contentScore),
      technical: clamp(result.technicalScore),
    },
    issues: [...factual, ...modelIssues],
  };
}
