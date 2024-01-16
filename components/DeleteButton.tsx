"use client";
import React from "react";
interface DeleteProps {
  postId: string;
}

const handleDelete = async (postId: string) => {
  // console.log("NEXTAUTH_URL:", process.env.NEXTAUTH_URL);
  // const apiEndpoint = `${process.env.NEXTAUTH_URL}/api/posts/${postId}`;
  // console.log("API Endpoint:", apiEndpoint);

  const response = await fetch(`/api/posts/${postId}`, {
    cache: "reload",
    method: "DELETE",
  });
  if (response.ok) {
    const res = await response.json();

    return res;
  }
};

const DeleteButton = ({ postId }: DeleteProps) => {
  return (
    <button
      onClick={() => handleDelete(postId)}
      className=" text-center bg-[#B80000] text-white px-3 py-2 rounded-md md:text-xl hover:shadow-xl transition-all"
    >
      Delete
    </button>
  );
};

export default DeleteButton;
