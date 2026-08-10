import { SecretsManagerClient, GetSecretValueCommand } from '@aws-sdk/client-secrets-manager';

const SECRET_NAME = 'wilfred/agent-credentials';
const REGION = 'ca-central-1';

let cached: Record<string, string> | null = null;

/** Loads wilfred/agent-credentials once per process — the same blob Sam and
 * LeadPipeline read. Finn needs three keys: the Supabase connection string,
 * the existing Firecrawl key, and its own scoped GitHub token. */
async function loadSecrets(): Promise<Record<string, string>> {
  if (cached) return cached;
  const client = new SecretsManagerClient({ region: REGION });
  const response = await client.send(new GetSecretValueCommand({ SecretId: SECRET_NAME }));
  cached = JSON.parse(response.SecretString ?? '{}') as Record<string, string>;
  return cached;
}

export async function getSupabaseDbUrl(): Promise<string> {
  const secret = await loadSecrets();
  const url = secret.SUPABASE_DB_URL;
  if (!url) throw new Error('wilfred/agent-credentials secret has no SUPABASE_DB_URL key');
  return url;
}

/** Already present in the secret — LeadPipeline's website enrichment uses it. */
export async function getFirecrawlKey(): Promise<string> {
  const secret = await loadSecrets();
  const key = secret.FIRECRAWL_API_KEY;
  if (!key) throw new Error('wilfred/agent-credentials secret has no FIRECRAWL_API_KEY key');
  return key;
}

/** Finn's own fine-grained PAT, scoped to the website repo with contents:write
 * + pull_requests:write and nothing else. Deliberately NOT the token Claire's
 * publish route uses — Finn only ever pushes a branch and opens a PR, so a
 * leak of this token cannot reach the site's default branch. Returns null when
 * unset so crawling and proposing still work without it; only open_pr fails. */
export async function getGithubToken(): Promise<string | null> {
  const secret = await loadSecrets();
  return secret.FINN_GITHUB_TOKEN || null;
}
