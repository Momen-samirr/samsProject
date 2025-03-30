"use client";

import Image from "next/image";
import React from "react";

import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";

const data = [
  { name: "Group A", value: 92, fill: "#C3EBFA" },
  { name: "Group B", value: 8, fill: "#B8B6FF" },
];

const Performance = () => {
  return (
    <div className="bg-white p-5 rounded-md h-80 relative">
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-xl">Performance</h1>
        {/* <Image src={"moreDark.png"} alt="" width={16} height={16} /> */}
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            dataKey="value"
            startAngle={180}
            endAngle={0}
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={70}
            fill="#8884d8"
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Performance;
