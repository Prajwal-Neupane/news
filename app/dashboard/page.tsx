import React from "react";
import { postData } from "@/postData";
import Post from "@/components/Post";

const Dashboard = () => {
  return (
    <div>
      <h1 className="text-center font-bold text-2xl">My Posts</h1>
      <div className="mt-8 flex flex-col flex-wrap gap-6">
        {postData && postData.length > 0 ? (
          postData.map((post) => (
            <Post
              category={post.category}
              links={post.links}
              id={post.id}
              author={post.author}
              title={post.title}
              content={post.content}
              published={post.published}
              thumbnail={post.thumbnail}
              key={post.id}
            />
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
