import CreatePostForm from "@/components/CreatePostForm";
import React from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

const CreatePost = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }
  return (
    <div>
      <h1 className="text-center text-3xl font-bold">Create Post</h1>
      <CreatePostForm />
    </div>
  );
};

export default CreatePost;
