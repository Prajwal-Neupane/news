"use client";
import Link from "next/link";
import React from "react";
import { useSession, signOut } from "next-auth/react";

const Navbar = () => {
  const { status } = useSession();
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
        {status === "authenticated" ? (
          <button onClick={() => signOut()} className="btn md:text-xl">
            Sign Out
          </button>
        ) : (
          <Link href={"/login"}>
            <button className="btn md:text-xl">Login</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
