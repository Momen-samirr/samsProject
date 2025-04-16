import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { Prisma } from "@prisma/client";
import React from "react";

const Announcement = async () => {
  const { sessionClaims, userId } = await auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;

  const roleCondition = {
    doctor: { lectures: { some: { doctorId: userId! } } },
    students: { students: { some: { id: userId! } } },
  };

  const data = await prisma.announcement.findMany({
    take: 3,
    orderBy: { date: "desc" },
    where: {
      ...(role !== "admin" && {
        OR: [
          { classId: null },
          { class: roleCondition[role as keyof typeof roleCondition] || {} },
        ],
      }),
    },
  });
  return (
    <div className="bg-white p-5 rounded-xl">
      {/* Title */}
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-lg">Announcement</h1>
        <span className="text-gray-500">View All</span>
      </div>
      <div className="flex flex-col gap-3 mt-5">
        {data?.map((announcement) => (
          <div
            key={announcement?.id}
            className="bg-lamaSkyLight rounded-md p-5"
          >
            <div className="flex items-center justify-between">
              <h2 className="font-medium">{announcement?.title}</h2>
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-400 bg-white rounded-md px-1 py-1">
                  {new Intl.DateTimeFormat("en-US").format(announcement?.date)}
                </span>
                {announcement?.classId ? (
                  ""
                ) : (
                  <span className="text-sm text-gray-500">General</span>
                )}
              </div>
            </div>
            <p className="text-sm text-gray-400 mt-1">
              {announcement?.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Announcement;
