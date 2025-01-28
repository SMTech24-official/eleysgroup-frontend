"use client";
import Link from "next/link";
import React, { useState } from "react";
import { FcMenu } from "react-icons/fc";
import { RxCross2 } from "react-icons/rx";
import { usePathname } from "next/navigation";
import { MdOutlineDashboard } from "react-icons/md";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  // console.log(pathname);

  return (
    <div className="relative">
      {/* Sidebar toggle button for smaller screens */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-2 right-4 lg:hidden p-2 m-3 border rounded-md focus:outline-none focus:ring"
      >
        {isOpen ? <RxCross2 /> : <FcMenu />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed lg:static top-0 left-0 bg-primary text-white p-4 transition-transform transform lg:translate-x-0 z-50 lg:w-[300px] h-screen overflow-hidden overflow-y-auto ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-4 font-bold text-lg">Dashboard</div>

        <nav className="flex flex-col justify-between">
          <ul className="space-y-2">
            <li className="flex gap-4 justify-start items-center">
              <MdOutlineDashboard size={24} />
              <Link
                href={"/dashboard/all-appointments"}
                className={`flex items-center  space-x-2 p-2 rounded hover:bg-gray-700 hover:text-white hover:border-none w-full font-semibold 
                  ${
                    pathname === "/dashboard/all-appointments"
                      ? "bg-white text-primary"
                      : "border border-white text-white"
                  }
                `}
              >
                All Appointments
              </Link>
            </li>{" "}
            <li className="flex gap-4 justify-start items-center">
              <MdOutlineDashboard size={24} />
              <Link
                href={"/dashboard/create-service"}
                className={`flex items-center  space-x-2 p-2 rounded hover:bg-gray-700 hover:text-white hover:border-none w-full font-semibold 
                  ${
                    pathname === "/dashboard/create-service"
                      ? "bg-white text-primary"
                      : "border border-white text-white"
                  }
                `}
              >
                Create Services
              </Link>
            </li>{" "}
            <li className="flex gap-4 justify-start items-center">
              <MdOutlineDashboard size={24} />
              <Link
                href={"/dashboard/all-services"}
                className={`flex items-center  space-x-2 p-2 rounded hover:bg-gray-700 hover:text-white hover:border-none w-full font-semibold 
                  ${pathname === "/dashboard/all-services" ? "bg-white text-primary" : "border border-white text-white"}
                `}
              >
                All Services
              </Link>
            </li>
            <li className="flex gap-4 justify-start items-center">
              <MdOutlineDashboard size={24} />
              <Link
                href={"/dashboard/create-slots"}
                className={`flex items-center  space-x-2 p-2 rounded hover:bg-gray-700 hover:text-white hover:border-none w-full font-semibold 
                  ${pathname === "/dashboard/create-slots" ? "bg-white text-primary" : "border border-white text-white"}
                `}
              >
                Create Slots
              </Link>
            </li>{" "}
            <li className="flex gap-4 justify-start items-center">
              <MdOutlineDashboard size={24} />
              <Link
                href={"/dashboard/all-slots"}
                className={`flex items-center  space-x-2 p-2 rounded hover:bg-gray-700 hover:text-white hover:border-none w-full font-semibold 
                  ${pathname === "/dashboard/all-slots" ? "bg-white text-primary" : "border border-white text-white"}
                `}
              >
                All Slots
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Overlay for small screens */}
      {isOpen && <div className="fixed inset-0 bg-black opacity-50 lg:hidden" onClick={() => setIsOpen(false)}></div>}
    </div>
  );
};

export default Sidebar;
