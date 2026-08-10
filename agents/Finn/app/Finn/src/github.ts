import { getGithubToken } from './secrets.js';

// Finn's only write to the website repo is a branch plus a pull request. It
// never pushes to the base branch, and it never uses the GitHub contents API to
// overwrite a file blind the way Claire's publish route does.

const API = 'https://api.github.com';

const REPO = process.env.FINN_SITE_REPO ?? 'audcomp-ai/aud_new_website';
const BASE_BRANCH = process.env.FINN_SITE_BASE_BRANCH ?? 'main';

async function gh(path: string, init?: RequestInit, requireToken = true): Promise<Record<string, unknown>> {
  const token = await getGithubToken();
  if (requireToken && !token) {
    throw new Error('wilfred/agent-credentials has no FINN_GITHUB_TOKEN — add a fine-grained PAT scoped to the website repo (contents:write, pull_requests:write) before opening PRs');
  }
  const res = await fetch(`${API}${path}`, {
    ...init,
    headers: {
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(init?.body ? { 'Content-Type': 'application/json' } : {}),
      ...init?.headers,
    },
  });
  if (!res.ok) {
    throw new Error(`GitHub ${init?.method ?? 'GET'} ${path} failed (${res.status}): ${(await res.text()).slice(0, 300)}`);
  }
  return res.status === 204 ? {} : ((await res.json()) as Record<string, unknown>);
}

/** Reads a file from the base branch. This — not the Firecrawl markdown — is
 * what proposals must be matched against: the crawl returns rendered output,
 * and a swap has to match the TSX source byte-for-byte to be appliable. */
export async function getFileContent(filePath: string, ref = BASE_BRANCH): Promise<string> {
  const json = await gh(
    `/repos/${REPO}/contents/${encodeURI(filePath)}?ref=${encodeURIComponent(ref)}`,
    undefined,
    false // public repo reads work unauthenticated; the token only raises the rate limit
  );
  const content = json.content;
  if (typeof content !== 'string') throw new Error(`No file content returned for ${filePath}`);
  return Buffer.from(content, 'base64').toString('utf8');
}

async function getBaseSha(): Promise<string> {
  const json = await gh(`/repos/${REPO}/git/ref/heads/${encodeURIComponent(BASE_BRANCH)}`, undefined, false);
  const object = json.object as { sha?: string } | undefined;
  if (!object?.sha) throw new Error(`Could not resolve head of ${BASE_BRANCH}`);
  return object.sha;
}

export async function createBranch(branch: string): Promise<void> {
  await gh(`/repos/${REPO}/git/refs`, {
    method: 'POST',
    body: JSON.stringify({ ref: `refs/heads/${branch}`, sha: await getBaseSha() }),
  });
}

/** Commits one file onto the branch. Reads the blob's current sha on that
 * branch so successive commits in the same run stack instead of clobbering. */
export async function commitFile(
  branch: string,
  filePath: string,
  content: string,
  message: string
): Promise<void> {
  let sha: string | undefined;
  try {
    const existing = await gh(
      `/repos/${REPO}/contents/${encodeURI(filePath)}?ref=${encodeURIComponent(branch)}`,
      undefined,
      false
    );
    sha = typeof existing.sha === 'string' ? existing.sha : undefined;
  } catch {
    sha = undefined; // new file
  }
  await gh(`/repos/${REPO}/contents/${encodeURI(filePath)}`, {
    method: 'PUT',
    body: JSON.stringify({
      message,
      content: Buffer.from(content, 'utf8').toString('base64'),
      branch,
      ...(sha ? { sha } : {}),
    }),
  });
}

export async function openPullRequest(branch: string, title: string, body: string): Promise<string> {
  const json = await gh(`/repos/${REPO}/pulls`, {
    method: 'POST',
    body: JSON.stringify({ title, body, head: branch, base: BASE_BRANCH }),
  });
  const url = json.html_url;
  if (typeof url !== 'string') throw new Error('GitHub did not return a PR url');
  return url;
}

export function repoSlug(): string {
  return REPO;
}

/** Every static page file on the base branch. Dynamic segments are skipped —
 * Finn must not guess which concrete route a `[param]` file renders — and
 * app/claire/** is excluded outright: Claire is deliberately left untouched. */
export async function listPageFiles(ref = BASE_BRANCH): Promise<string[]> {
  const json = await gh(
    `/repos/${REPO}/git/trees/${encodeURIComponent(ref)}?recursive=1`,
    undefined,
    false
  );
  const tree = Array.isArray(json.tree)
    ? (json.tree as Array<{ path?: string; type?: string }>)
    : [];
  return tree
    .filter((t) => t.type === 'blob' && typeof t.path === 'string')
    .map((t) => t.path as string)
    .filter((path) =>
      /^app\/(?:.*\/)?page\.tsx$/.test(path) &&
      !path.includes('[') &&
      !path.startsWith('app/claire/')
    )
    .sort();
}
