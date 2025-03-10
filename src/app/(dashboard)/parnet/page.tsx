import Announcement from "@/components/Announcement";
import LessonsCalender from "@/components/LessonsCalender";
import React from "react";

const ParentRoute = () => {
  return (
    <div className="flex flex-col gap-5 p-5 xl:flex-row flex-1">
      <div className="w-full xl:w-2/3">
        <div className="h-full bg-white p-5 rounded-lg">
          <h1 className="font-semibold text-lg">Shudle</h1>
          <LessonsCalender />
        </div>
      </div>
      <div className="w-full xl:w-1/3">
        <Announcement />
      </div>
    </div>
  );
};

export default ParentRoute;
