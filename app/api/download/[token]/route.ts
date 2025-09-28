import { NextResponse } from "next/server";

type Params = {
  params: Promise<{
    token: string;
  }>;
};

export async function GET(_: Request, { params }: Params): Promise<Response> {
  const { token } = await params;
  return NextResponse.json(
    {
      message: "Download endpoint not yet implemented.",
      token: token,
      nextSteps: "Validate token expiry, stream edited file from Blob storage, optionally revoke token.",
    },
    { status: 501 }
  );
}
