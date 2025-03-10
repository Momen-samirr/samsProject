import Announcement from "@/components/Announcement";
import LessonsCalender from "@/components/LessonsCalender";
import React from "react";

const DoctorRoute = () => {
  return (
    <div className="flex flex-col xl:flex-row gap-5 p-5 flex-1">
      {/* Left Side */}
      <div className="w-full xl:w-2/3 ">
        <div className="bg-white h-full p-5 rounded-lg">
          <h1 className="font-semibold text-lg">Shudle</h1>
          <LessonsCalender />
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
