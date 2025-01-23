"use client";
import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import calenderIcon from "@/assets/icons/calendar.svg";
import Image from "next/image";
import Link from "next/link";

const BookComponent = () => {
  const [openItem, setOpenItem] = useState<string | null>(null);

  return (
    <div className="container">
      <div className="grid lg:grid-cols-12 grid-cols-1 gap-6">
        <div className="lg:col-span-4 flex gap-5 flex-col">
          <h2 className="text-[#636363] text-2xl font-semibold leading-[140%]">
            Book by Provider
          </h2>
          <Link href={"/book-appointment/doctor-profile"}>
            <div className="flex p-4 px-6 bg-white justify-between items-center self-stretch">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex-shrink-0"></div>
                <div>
                  <p className="text-[#1A1A1A] text-2xl font-medium leading-[140%]">
                    William Johnson, PT
                  </p>
                  <p className="text-[#3D3D3D] text-base font-normal leading-[160%]">
                    Consultant - Cardiology
                  </p>
                </div>
              </div>
            </div>
          </Link>
        </div>
        <div className="lg:col-span-8">
          <h2 className="text-[#636363] text-2xl font-semibold">
            Book by Service/Class
          </h2>
          <div>
            <Accordion
              type="single"
              collapsible
              className="w-full"
              onValueChange={(value) => setOpenItem(value)}
            >
              {appointmentData.map((item) => (
                <AccordionItem
                  className="bg-white mt-5 p-2 rounded-md [&[data-state=open]]:bg-[#f6edf4]"
                  key={item.id}
                  value={item.id.toString()}
                >
                  <AccordionTrigger className="no-underline hover:no-underline">
                    <div className="flex items-start justify-start flex-col">
                      <h2>{item?.title}</h2>
                      {openItem !== item.id.toString() ? (
                        <div className="flex items-center justify-center gap-5">
                          30 Mins{" "}
                          <span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="8"
                              height="8"
                              viewBox="0 0 8 8"
                              fill="none"
                            >
                              <circle cx="4" cy="4" r="4" fill="#FF9CE7" />
                            </svg>
                          </span>
                          <p>Consultant - {item.consultant}</p>
                        </div>
                      ) : (
                        <p>Consultant - {item.consultant}</p>
                      )}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent
                    className={`${
                      // conditionlay background color based on the open or close state
                      openItem === item.id.toString()
                        ? "bg-[#f6edf4]"
                        : "bg-white"
                    }`}
                  >
                    <div>
                      <div className="flex items-center  gap-5">
                        <p className="text-[#04090D] text-lg font-medium leading-[150%]">
                          {item?.dateRange}
                        </p>
                        <Image src={calenderIcon} alt="calender" />
                      </div>
                      <div>
                        {item.appointments.map((appointment) => (
                          <div
                            className="flex items-center gap-2 j"
                            key={appointment.id}
                          >
                            <div className="flex items-center gap-1 mt-5">
                              <p className="text-[#04090D] text-lg font-medium ">
                                {appointment?.date}
                              </p>
                              <p className="text-[#04090D] text-lg font-medium ">
                                {appointment?.day}
                              </p>
                            </div>
                            <div className="grid grid-cols-4 gap-5 mt-5">
                              {appointment.timeSlots.map((timeSlot) => (
                                <button
                                  key={timeSlot.id}
                                  className={`p-4 rounded-md ${
                                    timeSlot.status === "Available"
                                      ? "bg-[#F7F7F7] text-[#04090D]"
                                      : "bg-[#F7F7F7] text-[#BDBDBD]"
                                  }`}
                                >
                                  <span className="text-lg font-medium leading-[150%]">
                                    {timeSlot.time}
                                  </span>
                                </button>
                              ))}
                            </div>{" "}
                          </div>
                        ))}{" "}
                        <button className="p-4 rounded-md bg-primary text-[#04090D] text-lg font-medium leading-[150%]">
                          Available
                        </button>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookComponent;

const appointmentData = [
  {
    id: 1,
    title: "Thirty Minute Appointment",
    consultant: "Cardiology",
    dateRange: "Jan 19 — 25, 2025",
    appointments: [
      {
        id: 1,
        date: "21-01-2025",
        day: "Tue",
        timeSlots: [
          { id: 1, time: "18:00-18:59", status: "Available", price: "$250" },
          { id: 2, time: "18:00-18:59", status: "Unavailable", price: null },
          { id: 3, time: "18:00-18:59", status: "Unavailable", price: null },
          { id: 4, time: "18:00-18:59", status: "Unavailable", price: null },
        ],
      },
    ],
  },
  {
    id: 2,
    title: "Thirty Minute Appointment",
    consultant: "Dermatology",
    dateRange: "Feb 1 — 7, 2025",
    appointments: [
      {
        id: 2,
        date: "02-02-2025",
        day: "Sun",
        timeSlots: [
          { id: 5, time: "10:00-10:59", status: "Available", price: "$200" },
          { id: 6, time: "11:00-11:59", status: "Unavailable", price: null },
          { id: 7, time: "12:00-12:59", status: "Unavailable", price: null },
          { id: 8, time: "13:00-13:59", status: "Unavailable", price: null },
        ],
      },
    ],
  },
  {
    id: 3,
    title: "Standard Appointment",
    consultant: "Orthopedics",
    dateRange: "Feb 10 — 16, 2025",
    appointments: [
      {
        id: 3,
        date: "11-02-2025",
        day: "Tue",
        timeSlots: [
          { id: 9, time: "14:00-14:59", status: "Available", price: "$300" },
          { id: 10, time: "15:00-15:59", status: "Unavailable", price: null },
          { id: 11, time: "16:00-16:59", status: "Unavailable", price: null },
          { id: 12, time: "17:00-17:59", status: "Unavailable", price: null },
        ],
      },
    ],
  },
  {
    id: 4,
    title: "Consultation",
    consultant: "Pediatrics",
    dateRange: "Feb 20 — 26, 2025",
    appointments: [
      {
        id: 4,
        date: "22-02-2025",
        day: "Thu",
        timeSlots: [
          { id: 13, time: "08:00-08:59", status: "Available", price: "$180" },
          { id: 14, time: "09:00-09:59", status: "Unavailable", price: null },
          { id: 15, time: "10:00-10:59", status: "Unavailable", price: null },
          { id: 16, time: "11:00-11:59", status: "Unavailable", price: null },
        ],
      },
    ],
  },
  {
    id: 5,
    title: "Ergonomics Assessment",
    consultant: "Neurology",
    dateRange: "Mar 1 — 7, 2025",
    appointments: [
      {
        id: 5,
        date: "03-03-2025",
        day: "Mon",
        timeSlots: [
          { id: 17, time: "18:00-18:59", status: "Available", price: "$350" },
          { id: 18, time: "19:00-19:59", status: "Unavailable", price: null },
          { id: 19, time: "20:00-20:59", status: "Unavailable", price: null },
          { id: 20, time: "21:00-21:59", status: "Unavailable", price: null },
        ],
      },
    ],
  },
  {
    id: 6,
    title: "Initial Evaluation",
    consultant: "Oncology",
    dateRange: "Mar 10 — 16, 2025",
    appointments: [
      {
        id: 6,
        date: "12-03-2025",
        day: "Wed",
        timeSlots: [
          { id: 21, time: "09:00-09:59", status: "Available", price: "$400" },
          { id: 22, time: "10:00-10:59", status: "Unavailable", price: null },
          { id: 23, time: "11:00-11:59", status: "Unavailable", price: null },
          { id: 24, time: "12:00-12:59", status: "Unavailable", price: null },
        ],
      },
    ],
  },
  {
    id: 7,
    title: "Dry Needling",
    consultant: "Radiology",
    dateRange: "Mar 20 — 26, 2025",
    appointments: [
      {
        id: 7,
        date: "23-03-2025",
        day: "Thu",
        timeSlots: [
          { id: 25, time: "07:00-07:59", status: "Available", price: "$250" },
          { id: 26, time: "08:00-08:59", status: "Unavailable", price: null },
          { id: 27, time: "09:00-09:59", status: "Unavailable", price: null },
          { id: 28, time: "10:00-10:59", status: "Unavailable", price: null },
        ],
      },
    ],
  },
  {
    id: 8,
    title: "Thirty Minute Appointment",
    consultant: "Psychiatry",
    dateRange: "Apr 1 — 7, 2025",
    appointments: [
      {
        id: 8,
        date: "04-04-2025",
        day: "Fri",
        timeSlots: [
          { id: 29, time: "10:00-10:59", status: "Available", price: "$200" },
          { id: 30, time: "11:00-11:59", status: "Unavailable", price: null },
          { id: 31, time: "12:00-12:59", status: "Unavailable", price: null },
          { id: 32, time: "13:00-13:59", status: "Unavailable", price: null },
        ],
      },
    ],
  },
  {
    id: 9,
    title: "Thirty Minute Appointment",
    consultant: "Urology",
    dateRange: "Apr 10 — 16, 2025",
    appointments: [
      {
        id: 9,
        date: "12-04-2025",
        day: "Sun",
        timeSlots: [
          { id: 33, time: "09:00-09:59", status: "Available", price: "$300" },
          { id: 34, time: "10:00-10:59", status: "Unavailable", price: null },
          { id: 35, time: "11:00-11:59", status: "Unavailable", price: null },
          { id: 36, time: "12:00-12:59", status: "Unavailable", price: null },
        ],
      },
    ],
  },
  {
    id: 10,
    title: "Thirty Minute Appointment",
    consultant: "Gastroenterology",
    dateRange: "Apr 20 — 26, 2025",
    appointments: [
      {
        id: 10,
        date: "22-04-2025",
        day: "Tue",
        timeSlots: [
          { id: 37, time: "14:00-14:59", status: "Available", price: "$280" },
          { id: 38, time: "15:00-15:59", status: "Unavailable", price: null },
          { id: 39, time: "16:00-16:59", status: "Unavailable", price: null },
          { id: 40, time: "17:00-17:59", status: "Unavailable", price: null },
        ],
      },
    ],
  },
];
