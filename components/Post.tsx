// Importing necessary modules and components
import Image from "next/image";
import Link from "next/link";
import { RiLinksFill } from "react-icons/ri";

import DeleteButton from "./DeleteButton";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// Defining the properties expected by the Post component
interface PostProps {
  id: string;
  author: string;
  published: string;
  title: string;
  content: string;
  thumbnail?: string;
  links?: string[];
  category?: string;
}

// Post component definition
const Post = async ({
  id,
  author,
  published,
  title,
  content,
  thumbnail,
  links,
  category,
}: PostProps) => {
  // Fetching the server session using NextAuth
  const session = await getServerSession(authOptions);

  // Formatting the date for display
  const dateObject = new Date(published);
  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
  };
  const formattedDate = dateObject.toLocaleString("en-US", options);

  // Checking if the logged-in user is the author of the post
  const loggedIn = session && session?.user?.name === author;

  return (
    <div className="border-b-2 pb-4 border-black">
      {/* Displaying post information */}
      <div>
        <p className="text-xl">
          Posted by: <span className="font-bold">{author}</span> on{" "}
          <span className="font-semibold">{formattedDate}</span>
        </p>
      </div>

      {/* Displaying post thumbnail or a placeholder if not available */}
      <div className="w-full h-80 relative">
        {thumbnail ? (
          <Image
            className="object-cover rounded-md mt-3 object-center"
            src={thumbnail || ""}
            alt="someimages"
            fill
          />
        ) : (
          <div>No thumbnail</div>
        )}
      </div>

      {/* Displaying post category if available */}
      {category && <button className="btn md:text-xl mt-8">{category}</button>}

      {/* Displaying post title and content */}
      <h1 className="text-3xl font-semibold mt-3 w-fit">{title}</h1>
      <p className="text-xl mt-3">{content}</p>

      {/* Displaying links associated with the post if available */}
      {links && links.length > 0
        ? links.map((link, index) => (
            <div
              className="flex items-center gap-1 mt-3 md:text-xl"
              key={index}
            >
              <RiLinksFill className="text-dark font-semibold hover:underline hover:cursor-pointer hover:scale-y-105 transition-all" />
              <Link
                href={link}
                className="text-dark font-semibold hover:underline hover:cursor-pointer hover:scale-y-105 transition-all max-w-full overflow-hidden text-ellipsis"
              >
                {link}
              </Link>
            </div>
          ))
        : ""}

      {/* Displaying edit and delete buttons if the user is logged in and is the author */}
      {loggedIn && (
        <div className="mt-3 flex gap-3">
          <Link
            href={`/edit/${id}`}
            className="bg-[#004225] hover:shadow-xl transition-all text-white px-3 py-2 rounded-md md:text-xl text-center"
          >
            Edit
          </Link>
          <DeleteButton postId={id} />
        </div>
      )}
    </div>
  );
};

// Exporting the Post component as the default export
export default Post;
