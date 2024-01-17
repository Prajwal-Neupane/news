import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import NextAuth from "next-auth/next";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
