import LoginButtons from "@/components/LoginButtons";
import React from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

const LoginPage = async () => {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/dashboard");
  }
  return (
    <div className="flex flex-col items-center w-full">
      <h1 className="text-3xl font-bold mb-10 mt-10">Login</h1>
      <LoginButtons />
    </div>
  );
};

export default LoginPage;
