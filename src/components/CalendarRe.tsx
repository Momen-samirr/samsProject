"use client";
import React, { useState } from "react";
import Calendar from "react-calendar";
type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const events = [
  {
    id: 1,
    title: "Text ",
    time: "10:00 PM - 3:00 PM",
    description: "Test Text Here",
  },
  {
    id: 2,
    title: "Text",
    time: "10:00 PM - 3:00 PM",
    description: "Test Text Here",
  },
  {
    id: 3,
    title: "Text",
    time: "10:00 PM - 3:00 PM",
    description: "Test Text Here",
  },
];
const CalendarRe = () => {
  const [value, onChange] = useState<Value>(new Date());
  return (
    <div className="bg-white p-5 rounded-xl">
      {/* <Calendar onChange={onChange} value={value} /> */}
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-lg my-5">Events</h1>
        <span className="text-lamaPurple">View</span>
      </div>
      <div className="flex flex-col gap-3">
        {events?.map((event) => (
          <div
            key={event?.id}
            className="p-5 rounded-xl border-2 border-gray-100 border-t-4 odd:border-t-lamaSky even:border-t-lamaPurple"
          >
            <div className="flex items-center justify-between">
              <h1 className="font-semibold text-gray-600">{event.title}</h1>
              <span className="text-gray-300 text-xs">{event.time}</span>
            </div>
            <p className="mt-2 text-gray-400 text-sm">{event.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarRe;
