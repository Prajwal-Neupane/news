import prisma from "@/prisma/client";
import { NextResponse } from "next/server";

export const GET = async (
  req: Request,
  { params }: { params: { catname: string } }
) => {
  const catName = params.catname;
  try {
    const posts = await prisma.category.findMany({
      where: { catName },
      include: {
        posts: { include: { author: true }, orderBy: { createdAt: "desc" } },
      },
    });
    return NextResponse.json(posts);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error getting categories posts" },
      { status: 500 }
    );
  }
};
