"use client";
import { MoreHorizontal, PresentationIcon } from "lucide-react";
import React from "react";
import {
  RadialBarChart,
  RadialBar,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Total",
    count: 106,
    fill: "white",
  },
  {
    name: "Girls",
    count: 53,
    fill: "#B8B6FF",
  },
  {
    name: "Boys",
    count: 53,
    fill: "#A7E4FA",
  },
];
const StudentChart = () => {
  return (
    <div className="rounded-xl bg-white p-5 h-full">
      {/* Title */}
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold">Students</h1>
        <MoreHorizontal />
      </div>
      {/* Chart */}
      <div className="relative w-full h-[75%]">
        <ResponsiveContainer>
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="40%"
            outerRadius="100%"
            barSize={32}
            data={data}
          >
            <RadialBar background dataKey="count" />
          </RadialBarChart>
        </ResponsiveContainer>
        <PresentationIcon className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      </div>
      {/* Bottom */}
      <div className="flex justify-center gap-16">
        <div className="flex flex-col gap-1">
          <div className="w-5 h-5 rounded-full bg-lamaSky" />
          <h1 className="font-bold">Boys</h1>
          <h2 className="text-xs text-gray-500">(16)</h2>
        </div>
        <div className="flex flex-col gap-1">
          <div className="w-5 h-5 rounded-full bg-lamaPurple" />
          <h1 className="font-bold">Girls</h1>
          <h2 className="text-xs text-gray-500">(16)</h2>
        </div>
      </div>
    </div>
  );
};

export default StudentChart;
