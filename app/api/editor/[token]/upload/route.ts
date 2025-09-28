import { NextResponse } from "next/server";

type Params = {
  params: {
    token: string;
  };
};

export async function POST(_: Request, { params }: Params): Promise<Response> {
  return NextResponse.json(
    {
      message: "Editor upload endpoint not yet implemented.",
      token: params.token,
      nextSteps: "Validate token, store edited file, revoke token, trigger delivery email.",
    },
    { status: 501 }
  );
}
