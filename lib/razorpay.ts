import Razorpay from "razorpay";
import { requireEnv } from "./env";

let cached: Razorpay | null = null;

export function getRazorpayClient(): Razorpay {
  if (!cached) {
    const key_id = requireEnv("RAZORPAY_KEY_ID");
    const key_secret = requireEnv("RAZORPAY_KEY_SECRET");
    cached = new Razorpay({ key_id, key_secret });
  }
  return cached;
}
