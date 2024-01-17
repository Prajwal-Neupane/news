// Importing Prisma client, NextResponse module, getServerSession, and authOptions
import prisma from "@/prisma/client";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

// Handling POST request
export const POST = async (req: Request) => {
  // Retrieving the user session
  const session = await getServerSession(authOptions);

  // Checking if the user is authenticated
  if (!session) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  try {
    // Extracting data from the request body
    const { title, content, links, categories, imageUrl, publicId } =
      await req.json();

    // Retrieving the user's email from the session
    const authorEmail = session.user?.email as string;

    // Checking if required fields are present
    if (!title || !content) {
      return NextResponse.json(
        { message: "Fields are required" },
        { status: 500 }
      );
    }

    // Fetching the user by email to get the user ID
    const user = await prisma.user.findUnique({
      where: {
        email: authorEmail,
      },
    });

    // Checking if the user exists
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 500 });
    }

    // Creating a new post in the database
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

    // Returning the newly created post
    return NextResponse.json(newPost);
  } catch (error) {
    // Logging the error for debugging purposes
    console.error(error);

    // Returning an error response with a status of 500 (Internal Server Error)
    return NextResponse.json(
      { message: "Error creating post" },
      { status: 500 }
    );
  }
};

// Handling GET request
export const GET = async (req: Request) => {
  try {
    // Fetching all posts from the database with author details
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

    // Mapping the result to a simpler structure if needed
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

    // Returning a JSON response with the fetched posts
    return NextResponse.json(simplifiedPosts, { status: 200 });
  } catch (error) {
    // Logging the error for debugging purposes
    console.error(error);

    // Returning an error response with a status of 500 (Internal Server Error)
    return NextResponse.json(
      { message: "Error fetching all posts" },
      { status: 500 }
    );
  }
};
