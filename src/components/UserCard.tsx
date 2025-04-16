import prisma from "@/lib/prisma";
import { MoreHorizontal } from "lucide-react";
import React from "react";

const UserCard = async ({ type }: { type: "admin" | "student" | "doctor" }) => {
  const objectMap: Record<typeof type, any> = {
    admin: prisma.admin,
    student: prisma.student,
    doctor: prisma.doctor,
  };

  const data = await objectMap[type].count();
  return (
    <div className="rounded-2xl min-w-[130px] odd:bg-lamaSky even:bg-lamaPurple p-5 flex-1">
      <div className="flex items-center justify-between">
        <span className="text-[10px] bg-white px-2 py-1 rounded-full text-sky-500">
          12-1-2004
        </span>
        <MoreHorizontal className=" text-white cursor-pointer" />
      </div>
      <h1 className="text-2xl font-semibold my-4">{data}</h1>
      <h2 className="capitalize text-sm font-medium text-gray-500">{type}s</h2>
    </div>
  );
};

export default UserCard;
