import prisma from "@/lib/prisma";
import React from "react";
import LessonsCalender from "./LessonsCalender";
import { adjustScheduleToCurrentWeek } from "@/lib/utitlies";

const BigCalanderContainer = async ({
  type,
  id,
}: {
  type: "doctorId" | "classId";
  id: string | number;
}) => {
  const dataRes = await prisma.lecture.findMany({
    where: {
      ...(type === "doctorId"
        ? { doctorId: id as string }
        : { classId: id as number }),
    },
  });

  const data = dataRes?.map((lecture) => ({
    title: lecture.name,
    start: lecture.startTime,
    end: lecture.endTime,
  }));

  const schedule = adjustScheduleToCurrentWeek(data);
  return (
    <div>
      <LessonsCalender data={schedule} />
    </div>
  );
};

export default BigCalanderContainer;
