import Announcement from "@/components/Announcement";
import BigCalanderContainer from "@/components/BigCalanderContainer";
import CalendarRe from "@/components/CalendarRe";
import LessonsCalender from "@/components/LessonsCalender";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import React from "react";

const StudentRoute = async () => {
  const { userId } = await auth();
  const classItem = await prisma.class.findMany({
    where: {
      students: {
        some: {
          id: userId!,
        },
      },
    },
  });
  return (
    <div className="flex flex-col xl:flex-row gap-5 p-5">
      {/* Left Side */}
      <div className="w-full xl:w-2/3">
        <div className="h-full bg-white rounded-xl p-5">
          <h1 className="font-semibold">(2A)</h1>
          <BigCalanderContainer type="classId" id={classItem[0].id!} />
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
