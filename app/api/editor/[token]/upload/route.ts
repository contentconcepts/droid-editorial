import { NextResponse } from "next/server";

type Params = {
  params: Promise<{
    token: string;
  }>;
};

export async function POST(_: Request, { params }: Params): Promise<Response> {
  const { token } = await params;
  return NextResponse.json(
    {
      message: "Editor upload endpoint not yet implemented.",
      token: token,
      nextSteps: "Validate token, store edited file, revoke token, trigger delivery email.",
    },
    { status: 501 }
  );
}
