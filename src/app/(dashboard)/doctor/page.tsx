import Announcement from "@/components/Announcement";
import BigCalanderContainer from "@/components/BigCalanderContainer";
import LessonsCalender from "@/components/LessonsCalender";
import { auth } from "@clerk/nextjs/server";
import React from "react";

const DoctorRoute = async () => {
  const { userId, sessionClaims } = await auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;
  return (
    <div className="flex flex-col xl:flex-row gap-5 p-5 flex-1">
      {/* Left Side */}
      <div className="w-full xl:w-2/3 ">
        <div className="bg-white h-full p-5 rounded-lg">
          <h1 className="font-semibold text-lg">Shudle</h1>
          <BigCalanderContainer type="doctorId" id={userId!} />
        </div>
      </div>
      {/* Right Side */}
      <div className="w-full xl:w-1/3">
        <Announcement />
      </div>
    </div>
  );
};

export default DoctorRoute;

// postgresql://sams_owner:npg_8DYZxBViXNA9@ep-quiet-forest-a5dc1bhi-pooler.us-east-2.aws.neon.tech/sams?sslmode=require
