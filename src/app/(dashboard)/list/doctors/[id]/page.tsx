import Announcement from "@/components/Announcement";
import CalendarRe from "@/components/CalendarRe";
import LessonsCalender from "@/components/LessonsCalender";
import Performance from "@/components/Performance";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const SingleDoctorPage = () => {
  return (
    <div className="flex flex-col flex-1 gap-5 p-5 xl:flex-row">
      {/* Left Side */}
      <div className="w-full xl:w-2/3">
        {/* Top */}
        <div className="flex flex-col gap-5 lg:flex-row">
          <div className="bg-lamaSky flex flex-1 gap-3 py-6 px-3 rounded-md">
            <div className="w-1/3">
              <Image
                src={
                  "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                }
                alt="photo"
                width={145}
                height={145}
                className="w-36 h-36 rounded-full object-cover"
              />
            </div>
            <div className="w-2/3">
              <div className="flex flex-col gap-3">
                <h1 className="text-2xl font-semibold">Dr. Rawan Mohmed</h1>
                <p className="text-gray-500 text-xs">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
                <div className="flex justify-center items-center gap-3 flex-wrap text-xs font-medium">
                  <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-3">
                    <Image src="/blood.png" alt="" width={14} height={14} />
                    <span>A+</span>
                  </div>
                  <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-3">
                    <Image src="/date.png" alt="" width={14} height={14} />
                    <span>January 2025</span>
                  </div>
                  <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-3">
                    <Image src="/mail.png" alt="" width={14} height={14} />
                    <span>user@gmail.com</span>
                  </div>
                  <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-3">
                    <Image src="/phone.png" alt="" width={14} height={14} />
                    <span>+1 234 567</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-1 flex-wrap gap-3 justify-between">
            <div className="bg-white p-3 rounded-md flex gap-3 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
              <Image
                src="/singleAttendance.png"
                alt=""
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <div className="">
                <h1 className="text-xl font-semibold">90%</h1>
                <span className="text-sm text-gray-400">Attendance</span>
              </div>
            </div>
            <div className="bg-white p-3 rounded-md flex gap-3 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
              <Image
                src="/singleAttendance.png"
                alt=""
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <div className="">
                <h1 className="text-xl font-semibold">90%</h1>
                <span className="text-sm text-gray-400">Attendance</span>
              </div>
            </div>
            <div className="bg-white p-3 rounded-md flex gap-3 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
              <Image
                src="/singleAttendance.png"
                alt=""
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <div className="">
                <h1 className="text-xl font-semibold">90%</h1>
                <span className="text-sm text-gray-400">Attendance</span>
              </div>
            </div>
            <div className="bg-white p-3 rounded-md flex gap-3 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
              <Image
                src="/singleAttendance.png"
                alt=""
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <div className="">
                <h1 className="text-xl font-semibold">90%</h1>
                <span className="text-sm text-gray-400">Attendance</span>
              </div>
            </div>
          </div>
        </div>
        {/* Bottom */}
        <div className="mt-5 bg-white rounded-md p-3 h-[800px]">
          <h1 className="text-xl font-semibold">Doctor Schedule</h1>
          <LessonsCalender />
        </div>
      </div>
      {/* Right Side */}
      <div className="w-full xl:w-1/3 flex flex-col gap-3">
        <div className="bg-white rounded-md h-[195px] ">
          <h1 className="text-xl font-semibold p-3">Shortcuts</h1>
          <div className="flex flex-wrap gap-3 text-xs text-gray-500 mt-3">
            <Link className="p-3 ml-3 rounded-md bg-lamaSkyLight" href="/">
              Teacher&apos;s Classes
            </Link>
            <Link className="p-3 ml-3 rounded-md bg-lamaPurpleLight" href="/">
              Teacher&apos;s Students
            </Link>
            <Link className="p-3 ml-3 rounded-md bg-lamaYellowLight" href="/">
              Teacher&apos;s Lessons
            </Link>
            <Link className="p-3 ml-3 rounded-md bg-pink-50" href="/">
              Teacher&apos;s Exams
            </Link>
            <Link className="p-3 rounded-md bg-lamaSkyLight" href="/">
              Teacher&apos;s Assignments
            </Link>
          </div>
        </div>
        <div>
          <Performance />
        </div>
        <CalendarRe />
      </div>
    </div>
  );
};

export default SingleDoctorPage;
