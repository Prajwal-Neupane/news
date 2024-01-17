import React from "react";
import Post from "@/components/Post";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

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
  try {
    // Fetch the author's posts from the server
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/authors/${name}`, {
      cache: "no-store",
    });

    // Extract the posts from the response
    const [author] = await res.json();
    const { posts } = author;

    return posts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
};

const Dashboard = async () => {
  let posts: PostType[] = [];

  // Get the user's session
  const session = await getServerSession(authOptions);
  const name = session?.user?.name;

  // Redirect to login if the user is not authenticated
  if (!session) {
    redirect("/login");
  }

  // Fetch posts for the authenticated user
  if (name) {
    posts = await getPosts(name);
  }

  return (
    <div>
      <h1 className="text-center font-bold text-2xl">My Posts</h1>
      <div className="mt-8 flex flex-col flex-wrap gap-6">
        {posts && posts.length > 0 ? (
          // Render each post using the Post component
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
