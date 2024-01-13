"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Image from "next/image";
import { IoAddCircle } from "react-icons/io5";

const Navbar = () => {
  const { status, data: session } = useSession();
  const [popUp, setPopUp] = useState<boolean>(false);

  return (
    <div className="flex justify-between border-b pb-4 mb-4 relative">
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
          <div className="flex items-center gap-8">
            <Link
              href={"/create-post"}
              className="flex gap-2 bg-green-700 px-2 py-2 rounded-lg items-center"
            >
              <IoAddCircle size={20} color="white" />
              <p className="font-semibold text-white">Create</p>
            </Link>
            <Image
              onClick={() => setPopUp(!popUp)}
              className="rounded-full hover:cursor-pointer"
              src={(session?.user?.image as string) || ""}
              width={40}
              height={40}
              alt="userImage"
            />
            {popUp && (
              <div className="absolute z-30 right-0 top-16 flex flex-col  text-right bg-green-400 px-3 py-4 rounded-md transition-all duration-300 shadow-2xl">
                <h1 className="text-dark text-xl font-semibold">
                  {session?.user?.name}
                </h1>
                <p className="font-semibold">{session?.user?.email}</p>
                <Link
                  onClick={() => setPopUp(!popUp)}
                  href={"/dashboard"}
                  className="text-[16px] mt-1 hover:underline hover:cursor-pointer"
                >
                  Dashboard
                </Link>
                <button onClick={() => signOut()} className="btn mt-3 ">
                  Sign Out
                </button>
              </div>
            )}
          </div>
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
