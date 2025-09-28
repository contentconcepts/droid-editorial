import { NextResponse } from "next/server";

type Params = {
  params: Promise<{
    orderId: string;
  }>;
};

export async function POST(_: Request, { params }: Params): Promise<Response> {
  const { orderId } = await params;
  return NextResponse.json(
    {
      message: "Manager assignment endpoint not yet implemented.",
      orderId: orderId,
      nextSteps: "Lookup order, generate editor token, update status, notify editor.",
    },
    { status: 501 }
  );
}
