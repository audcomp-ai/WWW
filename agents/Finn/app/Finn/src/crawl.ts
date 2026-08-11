import { createHash } from 'node:crypto';
import { getFirecrawlKey } from './secrets.js';

// Ported from Claire's app/api/claire/crawl/route.ts in aud_new_website —
// same Firecrawl v1 endpoints and the same raw-fetch approach used by
// packages/enrichment/src/website-enrichment.ts. No SDK dependency.

const FIRECRAWL_BASE = 'https://api.firecrawl.dev/v1';

// Rendered pages are for scoring only. A hard cap keeps a single bloated page
// from dominating the token bill for a 40-page audit.
const MAX_MARKDOWN_CHARS = 20_000;

export interface ScrapedPage {
  markdown: string;
  metadata: Record<string, unknown>;
  links: string[];
}

async function firecrawl(path: string, body: Record<string, unknown>): Promise<Record<string, unknown>> {
  const key = await getFirecrawlKey();
  const res = await fetch(`${FIRECRAWL_BASE}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    throw new Error(`Firecrawl ${path} failed (${res.status}): ${(await res.text()).slice(0, 300)}`);
  }
  return (await res.json()) as Record<string, unknown>;
}

export async function scrapePage(url: string): Promise<ScrapedPage> {
  const json = await firecrawl('/scrape', {
    url,
    formats: ['markdown'],
    onlyMainContent: true,
    timeout: 30_000,
  });
  const data = (json.data ?? {}) as Record<string, unknown>;
  return {
    markdown: String(data.markdown ?? '').slice(0, MAX_MARKDOWN_CHARS),
    metadata: (data.metadata ?? {}) as Record<string, unknown>,
    links: Array.isArray(data.links) ? (data.links as string[]) : [],
  };
}

/** Enumerates every URL on the site. */
export async function mapSite(url: string): Promise<string[]> {
  const json = await firecrawl('/map', { url });
  return Array.isArray(json.links) ? (json.links as string[]) : [];
}

export function hashContent(markdown: string, metadata: Record<string, unknown>): string {
  // Title and description are part of the identity: an SEO-only edit changes no
  // body copy, and a body-only hash would skip the page on the next audit.
  const title = String(metadata.title ?? '');
  const description = String(metadata.description ?? '');
  return createHash('sha256').update(`${title}\n${description}\n${markdown}`).digest('hex');
}

/** Absolute URL -> site-relative route. Returns null for anything off-site. */
export function urlToRoute(url: string, siteUrl: string): string | null {
  try {
    const parsed = new URL(url);
    const base = new URL(siteUrl);
    if (parsed.host !== base.host) return null;
    const path = parsed.pathname.replace(/\/+$/, '');
    return path === '' ? '/' : path;
  } catch {
    return null;
  }
}

/** Route -> App Router source file. `/` is app/page.tsx, `/x/y` is app/x/y/page.tsx.
 * Returns null for dynamic segments — Finn must not guess which concrete route a
 * `[param]` file renders, and editing copy inside one is out of scope. */
export function routeToFilePath(route: string): string | null {
  if (route === '/') return 'app/page.tsx';
  const clean = route.replace(/^\/+|\/+$/g, '');
  if (!clean) return 'app/page.tsx';
  if (/[[\]]/.test(clean)) return null;
  if (!/^[a-zA-Z0-9\-_/]+$/.test(clean)) return null;
  return `app/${clean}/page.tsx`;
}

/** Inverse of routeToFilePath: app/about/page.tsx -> /about, app/page.tsx -> / */
export function filePathToRoute(filePath: string): string | null {
  const match = /^app\/(.*)page\.tsx$/.exec(filePath);
  if (!match) return null;
  const segment = (match[1] ?? '').replace(/\/$/, '');
  return segment === '' ? '/' : `/${segment}`;
}
