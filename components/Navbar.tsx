import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className="flex justify-between border-b pb-4 mb-4">
      <div className="flex flex-col gap-4">
        <Link href={"/"}>
          {" "}
          <h1 className="text-5xl tracking-tighter text-dark font-bold">
            Tech News
          </h1>
        </Link>

        <p className="text-xl flex flex-col">
          Exploring Tomorrow&apos;s Innovations, <span>One Byte at a Time</span>{" "}
        </p>
      </div>
      <div>
        <Link href={"/login"}>
          <button className="text-xl  bg-dark hover:bg-light  text-white px-4 py-2 rounded-md hover:scale-105 transition-all duration-300">
            Sign In
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
