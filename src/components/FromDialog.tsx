"use client";

import { ShieldCloseIcon } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import React, { useState } from "react";
// import DoctorForm from "./forms/DoctorForm";
// import StudentForm from "./forms/StudentForm";

const DoctorForm = dynamic(() => import("./forms/DoctorForm"), {
  loading: () => <h1>Loading...</h1>,
});

const StudentForm = dynamic(() => import("./forms/StudentForm"), {
  loading: () => <h1>Loading...</h1>,
});

const forms: {
  [key: string]: (type: "create" | "update", data?: any) => JSX.Element;
} = {
  doctor: (type, data) => <DoctorForm type={type} data={data} />,
  student: (type, data) => <StudentForm type={type} data={data} />,
};
const FromDialog = ({
  tableName,
  requestType,
  data,
  id,
}: {
  tableName:
    | "doctor"
    | "student"
    | "parent"
    | "subject"
    | "class"
    | "lesson"
    | "exam"
    | "assignment"
    | "result"
    | "attendance"
    | "event"
    | "announcement";
  requestType: "create" | "update" | "delete";
  data?: any;
  id?: number;
}) => {
  const size = requestType === "create" ? "w-8 h-8" : "w-7 h-7";
  const backgroundColor =
    requestType === "create"
      ? "bg-lamaSky"
      : requestType === "update"
      ? "bg-lamaSky"
      : "bg-lamaPurpleLight";
  const [open, setOpen] = useState(false);

  const Form = () => {
    return requestType === "delete" ? (
      <form action="" className="p-5 flex flex-col gap-5">
        <span>Are you sure you want to delete this {tableName}?</span>
        <button className="bg-red-600 py-3 px-3 rounded-md self-center text-white w-max">
          Delete
        </button>
      </form>
    ) : requestType === "create" || requestType === "update" ? (
      forms[tableName](requestType, data)
    ) : (
      "Form Not Found"
    );
  };
  return (
    <>
      <button
        className={`${size} flex items-center justify-center rounded-full ${backgroundColor}`}
        onClick={() => setOpen(!false)}
      >
        <Image
          src={`/${requestType}.png`}
          width={16}
          height={16}
          alt={`${requestType}`}
        />
      </button>
      {open && (
        <div className="absolute w-screen h-screen left-0 top-0 bg-black bg-opacity-60 z-200 flex items-center justify-center">
          <div className="bg-white p-5 rounded-md relative w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%]">
            <Form />
            <div
              className="absolute top-5 right-5 cursor-pointer"
              onClick={() => setOpen(false)}
            >
              <ShieldCloseIcon />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FromDialog;
