import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className="flex justify-between border-b pb-4 mb-4">
      <div className="flex flex-col gap-4">
        <Link href={"/"}>
          {" "}
          <h1 className="md:text-5xl text-4xl tracking-tighter text-dark font-bold">
            Tech News
          </h1>
        </Link>

        <p className="md:text-xl text-sm flex flex-col">
          Exploring Tomorrow&apos;s Innovations, <span>One Byte at a Time</span>{" "}
        </p>
      </div>
      <div>
        <Link href={"/login"}>
          <button className="btn md:text-xl">Login</button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
