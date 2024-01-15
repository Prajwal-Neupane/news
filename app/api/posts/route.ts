import prisma from "@/prisma/client";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

export const POST = async (req: Request) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }
  try {
    const { title, content, links, categories, imageUrl, publicId } =
      await req.json();
    const authorEmail = session?.user?.email as string;
    if (!title || !content) {
      return NextResponse.json(
        { message: "Fields are required" },
        { status: 500 }
      );
    }
    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        links,
        catName: categories,
        imageUrl,
        publicId,
        authorEmail,
      },
    });
    return NextResponse.json(newPost);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error creating post" },
      { status: 500 }
    );
  }
};

export const GET = async (req: Request) => {
  try {
    const posts = await prisma.post.findMany({
      include: { author: { select: { name: true } } },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error fetching all posts" },
      { status: 500 }
    );
  }
};
