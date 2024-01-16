import prisma from "@/prisma/client";
import { NextResponse } from "next/server";

export const GET = async (
  req: Request,
  { params }: { params: { name: string } }
) => {
  try {
    const name = params.name;
    const posts = await prisma.user.findMany({
      where: { name },
      include: {
        posts: { orderBy: { createdAt: "desc" } },
      },
    });
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json({
      message: "Failed to fetch posts by author email",
    });
  }
};
