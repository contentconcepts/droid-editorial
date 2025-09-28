import { NextResponse } from "next/server";

type Params = {
  params: {
    token: string;
  };
};

export async function GET(_: Request, { params }: Params): Promise<Response> {
  return NextResponse.json(
    {
      message: "Download endpoint not yet implemented.",
      token: params.token,
      nextSteps: "Validate token expiry, stream edited file from Blob storage, optionally revoke token.",
    },
    { status: 501 }
  );
}
