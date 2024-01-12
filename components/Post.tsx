import Image from "next/image";
import Link from "next/link";
import React from "react";
import { RiLinksFill } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
import DeleteButton from "./DeleteButton";
interface PostProps {
  id: number;
  author: string;
  published: string;
  title: string;
  content: string;
  thumbnail?: string;
  links?: string[];
  category?: string;
}

const Post = ({
  id,
  author,
  published,
  title,
  content,
  thumbnail,
  links,
  category,
}: PostProps) => {
  const loggedIn = true;
  return (
    <div className=" border-b-2 pb-4 border-black ">
      <div>
        <p className="text-xl">
          Posted by: <span className="font-bold">{author}</span> on{" "}
          <span className="font-semibold">{published}</span>
        </p>
      </div>
      <div className="w-full h-80 relative">
        {thumbnail ? (
          <Image
            className="object-cover rounded-md mt-3 object-center"
            src={thumbnail || ""}
            alt="someimages"
            //   height={500}

            //   width={500}
            fill
          />
        ) : (
          <div> No thumbnail </div>
        )}
      </div>
      {category && <button className="btn md:text-xl mt-8">{category}</button>}

      <h1 className="text-3xl font-semibold mt-3 w-fit">{title}</h1>
      <p className="text-xl mt-3">{content}</p>
      {links && links.length > 0
        ? links.map((link, index) => (
            <div
              className="flex items-center gap-1 mt-3 md:text-xl "
              key={index}
            >
              <RiLinksFill className="text-dark font-semibold hover:underline hover:cursor-pointer hover:scale-y-105 transition-all " />{" "}
              <Link
                href={link}
                className="text-dark font-semibold hover:underline hover:cursor-pointer hover:scale-y-105 transition-all max-w-full overflow-hidden text-ellipsis "
              >
                {link}
              </Link>
            </div>
          ))
        : ""}
      {loggedIn && (
        <div className="mt-3 flex gap-3">
          <Link
            href={`/edit/${id}`}
            className="  bg-[#004225] hover:shadow-xl transition-all text-white px-3 py-2 rounded-md md:text-xl  text-center"
          >
            Edit
          </Link>
          <DeleteButton />
        </div>
      )}
    </div>
  );
};

export default Post;
