import prisma from "@/prisma/client";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const { title, content, links, categories, imageUrl, publicId } =
      await req.json();
    const authorEmail = "author1@gmail.com";
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
