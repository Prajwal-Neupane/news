import Categories from "@/components/Categories";
import Post from "@/components/Post";
import Image from "next/image";
import { postData } from "@/postData";

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

const getAllPosts = async () => {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/posts`, {
      cache: "no-cache",
    });
    if (res.ok) {
      const posts = await res.json();

      return posts;
    }
  } catch (error) {
    console.log(error);
  }
};

export default async function Home() {
  const posts = await getAllPosts();
  return (
    <div>
      <Categories />
      <div className="mt-8 flex flex-col flex-wrap gap-6">
        {posts && posts.length > 0 ? (
          posts.map((post: PostType) => (
            <Post
              category={post.category}
              links={post.links}
              id={post.id}
              author={post.author}
              title={post.title}
              content={post.content}
              published={post.createdAt}
              thumbnail={post.imageUrl}
              key={post.id}
            />
          ))
        ) : (
          <div> No Data Available</div>
        )}
      </div>
    </div>
  );
}
