import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getRazorpayClient } from "@/lib/razorpay";
import { getResendClient } from "@/lib/mail";
import { put } from "@vercel/blob";

export async function GET() {
  const health = {
    status: "healthy",
    timestamp: new Date().toISOString(),
    services: {
      database: "unknown",
      razorpay: "unknown", 
      resend: "unknown",
      blob: "unknown"
    }
  };

  try {
    // Test database connection
    await db.pool.query("SELECT 1");
    health.services.database = "connected";
  } catch (error) {
    health.services.database = "error";
    health.status = "degraded";
  }

  try {
    // Test Razorpay connection
    const razorpay = getRazorpayClient();
    await razorpay.orders.fetch("dummy");
    health.services.razorpay = "connected";
  } catch (error) {
    // Expected to fail with dummy ID, but connection works
    if (error.message?.includes("No such order")) {
      health.services.razorpay = "connected";
    } else {
      health.services.razorpay = "error";
      health.status = "degraded";
    }
  }

  try {
    // Test Resend connection
    const resend = getResendClient();
    await resend.domains.list();
    health.services.resend = "connected";
  } catch (error) {
    health.services.resend = "error";
    health.status = "degraded";
  }

  try {
    // Test Blob storage
    const testBlob = await put("health-check.txt", "test", {
      access: "public",
    });
    health.services.blob = "connected";
  } catch (error) {
    health.services.blob = "error";
    health.status = "degraded";
  }

  return NextResponse.json(health, {
    status: health.status === "healthy" ? 200 : 207
  });
}
