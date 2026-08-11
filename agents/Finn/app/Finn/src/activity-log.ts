import { Client } from 'pg';
import { getSupabaseDbUrl } from './secrets.js';

/** Writes one row to wilfred.activity_log — read by AIOS's Overview/Agents/Daily
 * Log tabs. The 'finn' discriminator is what makes Finn visible alongside Sam
 * and Scout there. */
export async function logActivity(
  action: string,
  details?: string,
  metadata?: Record<string, unknown>
): Promise<void> {
  const client = new Client({ connectionString: await getSupabaseDbUrl() });
  await client.connect();
  try {
    await client.query(
      `insert into wilfred.activity_log (agent, action, details, metadata) values ($1, $2, $3, $4)`,
      ['finn', action, details ?? null, metadata ? JSON.stringify(metadata) : null]
    );
  } finally {
    await client.end();
  }
}
