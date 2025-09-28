import { NextResponse } from "next/server";

type Params = {
  params: {
    orderId: string;
  };
};

export async function POST(_: Request, { params }: Params): Promise<Response> {
  return NextResponse.json(
    {
      message: "Manager assignment endpoint not yet implemented.",
      orderId: params.orderId,
      nextSteps: "Lookup order, generate editor token, update status, notify editor.",
    },
    { status: 501 }
  );
}
