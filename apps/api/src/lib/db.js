import pg from 'pg';
import { env } from '../config/env.js';

const { Pool } = pg;

export const pool = new Pool({
  connectionString: env.postgresUrl
});

export async function withTenant(client, tenantId) {
  await client.query('SET app.current_tenant = $1', [String(tenantId)]);
}
