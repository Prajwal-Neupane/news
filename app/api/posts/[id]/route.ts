import prisma from "@/prisma/client";
import { NextResponse } from "next/server";

export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const singlePost = await prisma.post.findFirst({
      where: { id: params.id },
    });
    return NextResponse.json(singlePost, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching single post" },
      { status: 500 }
    );
  }
};
