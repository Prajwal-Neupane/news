import React from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

const Profile = async () => {
  const session = await getServerSession(authOptions);
  return <div>Profile</div>;
};

export default Profile;
