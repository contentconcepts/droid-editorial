import { createPool, sql } from "@vercel/postgres";
import { requireEnv } from "./env";

let cachedPool: ReturnType<typeof createPool> | null = null;

function getPool() {
  if (!cachedPool) {
    const connectionString = requireEnv("POSTGRES_URL");
    cachedPool = createPool({ connectionString });
  }
  return cachedPool;
}

export const query = sql;

export async function withTransaction<T>(handler: () => Promise<T>) {
  const pool = getPool();
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const result = await handler();
    await client.query("COMMIT");
    return result;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

export const db = {
  get pool() {
    return getPool();
  },
};
