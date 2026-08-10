import type { VoiceSpec, ProposedEdit } from './db.js';
import { routeAndInvoke } from './finn-router.js';
import { renderSpec, deSlop, scanBannedTerms, countEmDashes } from './voice-spec.js';
import { getFileContent } from './github.js';

// Drafting a brand-new page is the one case with no existing text to match, so
// the exactly-once rule does not apply. Instead the guard is that the page must
// be built only from components that already exist in the repo — an invented
// import is the fastest way to break the build.

// A real page from the repo is passed in as the structural example rather than
// described in prose. Matching an existing file is far more reliable than
// following a specification of one.
const EXAMPLE_PAGE = 'app/managed-it-services/page.tsx';

const ALLOWED_COMPONENTS = [
  'Hero', 'ServiceCard', 'CTABanner', 'SectionAngle', 'AnimatedSection', 'CountUp',
];

const PAGE_TOOL_SCHEMA = {
  type: 'object',
  properties: {
    title: { type: 'string', description: 'Next.js metadata title.' },
    description: { type: 'string', description: 'Next.js metadata description.' },
    source: { type: 'string', description: 'The complete contents of the new page.tsx file.' },
    summary: { type: 'string', description: 'What the page covers and who it is for.' },
  },
  required: ['title', 'description', 'source', 'summary'],
} as const;

export interface DraftedPage {
  filePath: string;
  source: string;
  summary: string;
  warnings: string[];
}

export async function draftPage(
  route: string,
  filePath: string,
  brief: string,
  spec: VoiceSpec
): Promise<DraftedPage> {
  const example = await getFileContent(EXAMPLE_PAGE).catch(() => '');

  const prompt = [
    `Draft a new page for Audcomp's marketing website at route ${route}.`,
    `It will be saved as ${filePath}.`,
    '',
    renderSpec(spec),
    '',
    `## Brief\n${brief}`,
    '',
    example
      ? `--- EXAMPLE OF AN EXISTING PAGE IN THIS REPO (${EXAMPLE_PAGE}) ---\n${example}\n--- END EXAMPLE ---`
      : '',
    '',
    'Write the complete file. Requirements:',
    `1. Import ONLY components that already exist: ${ALLOWED_COMPONENTS.join(', ')}.`,
    '   Never invent a component or a path. Match the example\'s import style exactly.',
    '2. Export `metadata` with a title and description, exactly as the example does.',
    '3. Reuse the example\'s structure and prop names. Do not introduce new props.',
    '4. Use only image paths that appear in the example, or omit the image entirely.',
    '5. Every claim must be truthful and supported by the brief. Invent no statistics,',
    '   awards, client names, or certifications.',
    '6. Obey the voice spec. No banned terms. No em-dashes or en-dashes.',
  ].filter(Boolean).join('\n');

  const result = await routeAndInvoke('expert', prompt, 'submit_new_page', PAGE_TOOL_SCHEMA as unknown as Record<string, unknown>);

  const source = deSlop(String(result.source ?? ''));
  const warnings: string[] = [];

  if (!source.includes('export const metadata')) warnings.push('page does not export metadata');
  if (!/export default function/.test(source)) warnings.push('page has no default export component');

  // Flag any import of something not known to exist. This is advisory: the real
  // gate is the build that runs before any PR opens.
  for (const match of source.matchAll(/import\s+(?:\{([^}]*)\}|(\w+))\s+from\s+["']([^"']+)["']/g)) {
    const from = match[3] ?? '';
    if (!from.startsWith('@/components/')) continue;
    const named = (match[1] ?? match[2] ?? '')
      .split(',')
      .map((s) => s.trim().split(/\s+as\s+/)[0]?.trim() ?? '')
      .filter(Boolean);
    for (const n of named) {
      if (!ALLOWED_COMPONENTS.includes(n)) warnings.push(`imports unverified component "${n}" from ${from}`);
    }
  }

  const banned = scanBannedTerms(source, spec.bannedWords);
  if (banned.length) warnings.push(`contains banned term(s): ${banned.map((b) => b.term).join(', ')}`);
  if (countEmDashes(source)) warnings.push('contains an em/en-dash');

  return { filePath, source, summary: String(result.summary ?? ''), warnings };
}

/** A new page is stored as a single draft row with no currentText — the PR job
 * creates the file rather than swapping a string inside one. */
export function newPageDraft(route: string, filePath: string, page: DraftedPage): ProposedEdit {
  return {
    pageId: null,
    route,
    filePath,
    field: 'new_file',
    currentText: null,
    proposedText: page.source,
    rationale: page.summary + (page.warnings.length ? ` [warnings: ${page.warnings.join('; ')}]` : ''),
    category: 'new_page',
    severity: 'medium',
    matchCount: null,
  };
}
