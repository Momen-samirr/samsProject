import Announcement from "@/components/Announcement";
import AttendanceChart from "@/components/AttendanceChart";
import CalendarRe from "@/components/CalendarRe";
import MoneyChart from "@/components/MoneyChart";
import StudentChart from "@/components/StudentChart";
import UserCard from "@/components/UserCard";
import React from "react";

const AdminRoute = () => {
  return (
    <div className="p-5 flex flex-col gap-5 md:flex-row">
      {/* Left side */}
      <div className="w-full lg:w-2/3 flex flex-col gap-6">
        {/* User Cards */}
        <div className="flex justify-between gap-5 flex-wrap">
          <UserCard type="student" />
          <UserCard type="doctor" />
          <UserCard type="parent" />
          <UserCard type="stuff" />
        </div>
        {/* Middel Charts */}
        <div className="flex flex-col lg:flex-row gap-5">
          {/* Student Chart */}
          <div className="w-full lg:w-1/3 h-[450px]">
            <StudentChart />
          </div>
          {/* Attendace Chart */}
          <div className="w-full lg:w-2/3 h-[450px]">
            <AttendanceChart />
          </div>
        </div>
        {/* Bottom Chart */}
        <div className="w-full h-[500px]">
          <MoneyChart />
        </div>
      </div>
      {/* Right Side */}
      <div className="w-full lg:w-1/3 flex flex-col gap-6">
        <CalendarRe />
        <Announcement />
      </div>
    </div>
  );
};

export default AdminRoute;
