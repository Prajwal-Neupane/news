"use client";
import React from "react";
import toast from "react-hot-toast";
interface DeleteProps {
  postId: string;
}

const handleDelete = async (postId: string) => {
  const deleteImage = async (publicId: string) => {
    const res = await fetch("/api/removeImage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ publicId }),
    });
  };
  // console.log("NEXTAUTH_URL:", process.env.NEXTAUTH_URL);
  // const apiEndpoint = `${process.env.NEXTAUTH_URL}/api/posts/${postId}`;
  // console.log("API Endpoint:", apiEndpoint);

  const response = await fetch(`/api/posts/${postId}`, {
    cache: "reload",
    method: "DELETE",
  });
  if (response.ok) {
    const post = await response.json();
    const { publicId } = post;
    await deleteImage(publicId);
    toast.success("Post deleted successfully");
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
