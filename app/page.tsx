import Categories from "@/components/Categories";
import Post from "@/components/Post";
import Image from "next/image";
import { postData } from "@/postData";

export default function Home() {
  return (
    <div>
      <Categories />
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
          <div> No Data Available</div>
        )}
      </div>
    </div>
  );
}
