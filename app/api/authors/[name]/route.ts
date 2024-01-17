// Importing Prisma client and NextResponse module
import prisma from "@/prisma/client";
import { NextResponse } from "next/server";

// Handling GET request
export const GET = async (
  req: Request,
  { params }: { params: { name: string } }
) => {
  try {
    // Extracting the author's name from the request parameters
    const name = params.name;

    // Fetching posts by author's name from the database
    const posts = await prisma.user.findMany({
      where: { name },
      include: {
        posts: { orderBy: { createdAt: "desc" } },
      },
    });

    // Returning a JSON response with the fetched posts
    return NextResponse.json(posts);
  } catch (error) {
    // Handling errors and returning an error response
    return NextResponse.json({
      message: "Failed to fetch posts by author name",
    });
  }
};
