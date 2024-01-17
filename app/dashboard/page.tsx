import React from "react";
// import { postData } from "@/postData";
import Post from "@/components/Post";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Link from "next/link";
import DeleteButton from "@/components/DeleteButton";
interface PostType {
  id: string;
  author: string;
  title: string;
  content: string;
  imageUrl: string;
  category: string;
  createdAt: string;
  updatedAt: string;
  links: string[];
}

const getPosts = async (name: string) => {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/authors/${name}`, {
    cache: "no-store",
  });
  // const response = await res.json();
  // const posts = response[0].posts;
  // console.log(posts)
  const [author] = await res.json();
  const { posts } = author;
  return posts;
};

const Dashboard = async () => {
  let posts = [];
  const session = await getServerSession(authOptions);
  const name = session?.user?.name;

  if (!session) {
    redirect("/login");
  }
  if (name) {
    posts = await getPosts(name);
  }

  return (
    <div>
      <h1 className="text-center font-bold text-2xl">My Posts</h1>
      <div className="mt-8 flex flex-col flex-wrap gap-6">
        {posts && posts.length > 0 ? (
          posts.map((post: PostType) => (
            <div key={post.id}>
              <Post
                category={post.category}
                links={post.links}
                id={post.id}
                author={name ? name : ""}
                title={post.title}
                content={post.content}
                published={post.createdAt}
                thumbnail={post.imageUrl}
                key={post.id}
              />
            </div>
          ))
        ) : (
          <div>
            <h1>No Post Available</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
