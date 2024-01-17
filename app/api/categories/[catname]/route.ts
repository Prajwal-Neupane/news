// Importing Prisma client and NextResponse module
import prisma from "@/prisma/client";
import { NextResponse } from "next/server";

// Handling GET request with parameters
export const GET = async (
  req: Request,
  { params }: { params: { catname: string } }
) => {
  // Extracting the category name from the parameters
  const catName = params.catname;

  try {
    // Fetching category and its associated posts from the database using Prisma
    const posts = await prisma.category.findMany({
      where: { catName },
      include: {
        posts: { include: { author: true }, orderBy: { createdAt: "desc" } },
      },
    });

    // Returning a JSON response with the fetched data
    return NextResponse.json(posts);
  } catch (error) {
    // Logging the error for debugging purposes
    console.log(error);

    // Returning an error response with a status of 500 (Internal Server Error)
    return NextResponse.json(
      { message: "Error getting categories posts" },
      { status: 500 }
    );
  }
};
