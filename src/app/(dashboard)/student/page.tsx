import Announcement from "@/components/Announcement";
import CalendarRe from "@/components/CalendarRe";
import LessonsCalender from "@/components/LessonsCalender";
import React from "react";

const StudentRoute = () => {
  return (
    <div className="flex flex-col xl:flex-row gap-5 p-5">
      {/* Left Side */}
      <div className="w-full xl:w-2/3">
        <div className="h-full bg-white rounded-xl p-5">
          <h1 className="font-semibold">(2A)</h1>
          <LessonsCalender />
        </div>
      </div>
      {/* Right Side */}
      <div className="w-full xl:w-1/3 flex flex-col gap-3">
        <CalendarRe />
        <Announcement />
      </div>
    </div>
  );
};

export default StudentRoute;
