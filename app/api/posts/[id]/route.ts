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

export const PUT = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const { title, content, links, categories, imageUrl, publicId } =
      await req.json();
    if (!title || !content) {
      return NextResponse.json(
        { message: "Fields are required" },
        { status: 201 }
      );
    }
    const updatePost = await prisma.post.update({
      data: {
        title,
        content,
        links,
        catName: categories,
        imageUrl,
        publicId,
      },
      where: { id: params.id },
    });
    return NextResponse.json(updatePost);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Failed to update post" });
  }
};
