// Importing Prisma client and NextResponse module
import prisma from "@/prisma/client";
import { NextResponse } from "next/server";

// Handling GET request
export const GET = async (req: Request) => {
  try {
    // Fetching all categories from the database using Prisma
    const data = await prisma.category.findMany();

    // Returning a JSON response with the fetched data and a status of 200 (OK)
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    // Logging the error for debugging purposes
    console.log(error);

    // Returning an error response with a status of 401 (Unauthorized)
    return NextResponse.json(
      { message: "Error while fetching categories" },
      { status: 401 }
    );
  }
};
