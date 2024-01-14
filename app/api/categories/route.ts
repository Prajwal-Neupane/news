import prisma from "@/prisma/client";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  try {
    const data = await prisma.category.findMany();

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error while fetching categories" },
      { status: 401 }
    );
  }
};
