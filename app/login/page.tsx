import LoginButtons from "@/components/LoginButtons";
import React from "react";

const LoginPage = () => {
  return (
    <div className="flex flex-col items-center w-full">
      <h1 className="text-3xl font-bold mb-10 mt-10">Login</h1>
      <LoginButtons />
    </div>
  );
};

export default LoginPage;
