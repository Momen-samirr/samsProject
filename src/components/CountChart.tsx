import { MoreHorizontal } from "lucide-react";
import React from "react";
import StudentChart from "./StudentChart";
import prisma from "@/lib/prisma";

const CountChart = async () => {
  const data = await prisma.student.groupBy({
    by: ["gender"],
    _count: true,
  });

  const boys = data.find((d) => d.gender === "MALE")?._count || 0;
  const girls = data.find((d) => d.gender === "FEMALE")?._count || 0;
  return (
    <div className="rounded-xl bg-white p-5 h-full">
      {/* Title */}
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold">Students</h1>
        <MoreHorizontal />
      </div>
      {/* Chart */}
      <div className="relative w-full h-[75%]">
        <StudentChart boys={boys} girls={girls} />
      </div>
      {/* Bottom */}
      <div className="flex justify-center gap-16">
        <div className="flex flex-col gap-1">
          <div className="w-5 h-5 rounded-full bg-lamaSky" />
          <h1 className="font-bold">{boys}</h1>
          <h2 className="text-xs text-gray-500">
            Boys ({Math.round((boys / (boys + girls)) * 100)}%)
          </h2>
        </div>
        <div className="flex flex-col gap-1">
          <div className="w-5 h-5 rounded-full bg-lamaPurple" />
          <h1 className="font-bold">{girls}</h1>
          <h2 className="text-xs text-gray-500">
            Girls ({Math.round((boys / (boys + girls)) * 100)}%)
          </h2>
        </div>
      </div>
    </div>
  );
};

export default CountChart;
