import prisma from "@/prisma/client";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

// GET Route: Fetch a single post by ID
export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const singlePost = await prisma.post.findFirst({
      where: { id: params.id },
    });

    // Respond with the post details in JSON format
    return NextResponse.json(singlePost, { status: 200 });
  } catch (error) {
    // Respond with an error message in JSON format
    return NextResponse.json(
      { message: "Error fetching single post" },
      { status: 500 }
    );
  }
};

// PUT Route: Update an existing post
export const PUT = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  // Check user authentication
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  try {
    const { title, content, links, categories, imageUrl, publicId } =
      await req.json();

    // Validate required fields
    if (!title || !content) {
      return NextResponse.json(
        { message: "Fields are required" },
        { status: 201 }
      );
    }

    // Update the post in the database
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

    // Respond with the updated post details in JSON format
    return NextResponse.json(updatePost, { status: 201 });
  } catch (error) {
    console.log(error);

    // Respond with an error message in JSON format
    return NextResponse.json({ message: "Failed to update post" });
  }
};

// DELETE Route: Delete a post by ID
export const DELETE = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  // Check user authentication
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  try {
    // Delete the post from the database
    const response = await prisma.post.delete({ where: { id: params.id } });

    // Respond with a success message in JSON format
    return NextResponse.json(response);
  } catch (error) {
    console.log(error);

    // Respond with an error message in JSON format
    return NextResponse.json({ message: "Failed to delete post" });
  }
};
