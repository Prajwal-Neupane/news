import Image from "next/image";
import React from "react";
import { FaGithub, FaGoogle } from "react-icons/fa";

const LoginButtons = () => {
  return (
    <div>
      <div className="flex gap-4 border-2 rounded-lg items-center hover:shadow-xl transition-all duration-300  px-3 py-3 mb-5 hover:cursor-pointer hover:bg-slate-200/70 ">
        {/* <FaGithub size={30} color="green" />{" "} */}
        <Image src={"/github-icon-1.svg"} alt="google" width={30} height={30} />
        <p className="text-xl">Login with Github</p>
      </div>
      <div className="flex gap-4 border-2 rounded-lg items-center hover:shadow-xl transition-all duration-300  px-3 py-3 mb-5 hover:cursor-pointer hover:bg-slate-200/70 ">
        {/* <FaGoogle size={30} /> */}
        <Image src={"/google-g-2015.svg"} alt="google" width={30} height={30} />
        <p className="text-xl">Login with Google</p>
      </div>
    </div>
  );
};

export default LoginButtons;
