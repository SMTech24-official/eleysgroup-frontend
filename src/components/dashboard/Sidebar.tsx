"use client";
import Link from "next/link";
import React, { useState } from "react";
import { RiHome5Line } from "react-icons/ri";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { FcMenu } from "react-icons/fc";
import { RxCross2 } from "react-icons/rx";
import { usePathname } from "next/navigation";
import { MdOutlineDashboard } from "react-icons/md";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

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
                href={"/dashboard"}
                className={`flex items-center space-x-2 p-2 rounded hover:bg-gray-700 hover:text-white hover:border-none w-full font-semibold ${
                  pathname === "/dashboard" ? "bg-white text-primary" : "border border-white text-white"
                }`}
              >
                All Helpers
              </Link>
            </li>
            <li className="flex gap-4 justify-start items-center">
              <HiOutlineUserGroup size={24} />
              <Link
                href={"/dashboard/add-helpers"}
                className={`flex items-center font-s space-x-2 p-2 rounded hover:bg-gray-700 hover:text-white hover:border-none w-full font-semibold ${
                  pathname === "/dashboard/add-helpers" ? "bg-white text-primary" : "border border-white text-white"
                }`}
              >
                Add Helpers
              </Link>
            </li>
            <li className="flex gap-4 justify-start items-center">
              <RiHome5Line size={24} />
              <Link
                href={"/"}
                className={`flex items-center font-s space-x-2 p-2 rounded text-primary hover:bg-gray-700 hover:text-white hover:border-none w-full font-semibold bg-white`}
              >
                Back To home
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
