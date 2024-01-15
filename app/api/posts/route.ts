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
    const authorEmail = session.user?.email as string;

    if (!title || !content) {
      return NextResponse.json(
        { message: "Fields are required" },
        { status: 500 }
      );
    }

    // Fetch the user by email to get the user ID
    const user = await prisma.user.findUnique({
      where: {
        email: authorEmail,
      },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 500 });
    }

    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        links,
        catName: categories,
        imageUrl,
        publicId,
        userId: user.id, // Set the user ID instead of email
      },
    });

    return NextResponse.json(newPost);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error creating post" },
      { status: 500 }
    );
  }
};

export const GET = async (req: Request) => {
  try {
    const posts = await prisma.post.findMany({
      include: {
        author: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Map the result to a simpler structure if needed
    const simplifiedPosts = posts.map((post) => ({
      id: post.id,
      title: post.title,
      content: post.content,
      author: post.author?.name || "Unknown Author",
      createdAt: post.createdAt,
      links: post.links,
      category: post.catName,
      imageUrl: post.imageUrl,
      publicId: post.publicId,
      updatedAt: post.updatedAt,
    }));

    return NextResponse.json(simplifiedPosts, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error fetching all posts" },
      { status: 500 }
    );
  }
};
