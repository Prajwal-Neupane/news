"use client";
import React from "react";
interface DeleteProps {
  postId: number;
}
// const deleteSinglePost = async (postId: number) => {
//   const res = await fetch(`${process.env.NEXTAUTH_URL}/posts/${postId}`);
//   if (res.ok) {
//     const response = await res.json();
//     console.log(response);
//   }
// };
const handleDelete = async (postId: number) => {
  const response = await fetch(
    `${process.env.NEXTAUTH_URL}/api/posts/${postId}`,
    { method: "DELETE" }
  );
  if (response.ok) {
    const res = await response.json();
    console.log(res);
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
