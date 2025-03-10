"use client";
import { MoreHorizontal } from "lucide-react";
import React from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Sat",
    present: 60,
    absent: 40,
  },
  {
    name: "Sun",
    present: 70,
    absent: 60,
  },
  {
    name: "Mon",
    present: 90,
    absent: 75,
  },
  {
    name: "Tue",
    present: 90,
    absent: 75,
  },
  {
    name: "Wed",
    present: 90,
    absent: 75,
  },
  {
    name: "Thu",
    present: 90,
    absent: 75,
  },
];
const AttendanceChart = () => {
  return (
    <div className="bg-white h-full rounded-xl p-5">
      {/* Title */}
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-lg">Attentance</h1>
        <MoreHorizontal />
      </div>
      {/* Chart */}
      <div className="w-full h-[90%]">
        <ResponsiveContainer>
          <BarChart width={500} height={300} data={data} barSize={20}>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#ddd"
            />
            <XAxis
              dataKey="name"
              axisLine={false}
              tick={{ fill: "#d1d5db" }}
              tickLine={false}
            />
            <YAxis
              axisLine={false}
              tick={{ fill: "#d1d5db" }}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{ borderRadius: "10px", borderColor: "lightgray" }}
            />
            <Legend
              align="left"
              verticalAlign="top"
              wrapperStyle={{ paddingTop: "20px", paddingBottom: "40px" }}
            />
            <Bar
              dataKey="present"
              fill="#A7E4FA"
              legendType="circle"
              radius={[10, 10, 0, 0]}
            />
            <Bar
              dataKey="absent"
              fill="#B8B6FF"
              legendType="circle"
              radius={[10, 10, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AttendanceChart;
