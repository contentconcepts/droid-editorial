import { createClient } from "@vercel/blob";
import { requireEnv } from "./env";

type BlobClient = ReturnType<typeof createClient>;

let cachedClient: BlobClient | null = null;

export function getBlobClient(): BlobClient {
  if (!cachedClient) {
    const token = requireEnv("BLOB_READ_WRITE_TOKEN");
    cachedClient = createClient({ token });
  }
  return cachedClient;
}
