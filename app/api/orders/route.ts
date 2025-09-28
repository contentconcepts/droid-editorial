import { NextResponse } from "next/server";

export async function POST(): Promise<Response> {
  return NextResponse.json(
    {
      message: "Order creation endpoint not yet implemented.",
      nextSteps: "Validate payload, upload files to Blob storage, persist order, trigger email.",
    },
    { status: 501 }
  );
}
