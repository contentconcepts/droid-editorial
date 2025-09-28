import { Resend } from "resend";
import { requireEnv } from "./env";

let cached: Resend | null = null;

export function getResendClient(): Resend {
  if (!cached) {
    cached = new Resend(requireEnv("RESEND_API_KEY"));
  }
  return cached;
}
