"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AiFillGold } from "react-icons/ai";
import { CiLogout } from "react-icons/ci";
import { FaHome } from "react-icons/fa";
import { FaFaceLaugh, FaPersonRifle } from "react-icons/fa6";
import { FcMenu } from "react-icons/fc";
import { MdMedicalServices, MdOutlineDashboard } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { Button } from "../ui/button";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  // console.log(pathname);
  // const router = useRouter();

  return (
    <div className="relative h-full">
      {/* Sidebar toggle button for smaller screens */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-2 right-4 lg:hidden p-2 m-3 border rounded-md focus:outline-none focus:ring"
      >
        {isOpen ? <RxCross2 /> : <FcMenu />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed flex flex-col justify-between lg:static top-0 left-0 bg-primary text-white p-4 transition-transform transform lg:translate-x-0 z-50 lg:w-[300px] h-screen overflow-hidden overflow-y-auto ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-4 font-bold text-lg">Dashboard</div>
        <nav className="flex flex-col h-full justify-between">
          {" "}
          <div>
            <ul className="space-y-2">
              <li className="flex gap-4 justify-start items-center">
                <FaPersonRifle size={24} />
                <Link
                  href={"/dashboard/edit-propfile"}
                  className={`flex items-center  space-x-2 p-2 rounded hover:bg-gray-700 hover:text-white hover:border-none w-full font-semibold 
                  ${
                    pathname === "/dashboard/edit-propfile" ? "bg-white text-primary" : "border border-white text-white"
                  }
                `}
                >
                  Edit Profile
                </Link>
              </li>{" "}
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
                <MdMedicalServices size={24} />
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
                <MdMedicalServices size={24} />
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
                <AiFillGold size={24} />
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
                <AiFillGold size={24} />
                <Link
                  href={"/dashboard/all-slots"}
                  className={`flex items-center  space-x-2 p-2 rounded hover:bg-gray-700 hover:text-white hover:border-none w-full font-semibold 
                  ${pathname === "/dashboard/all-slots" ? "bg-white text-primary" : "border border-white text-white"}
                `}
                >
                  All Slots
                </Link>
              </li>
              <li className="flex gap-4 justify-start items-center">
                <FaFaceLaugh size={24} />
                <Link
                  href={"/dashboard/add-reviews"}
                  className={`flex items-center  space-x-2 p-2 rounded hover:bg-gray-700 hover:text-white hover:border-none w-full font-semibold 
                  ${pathname === "/dashboard/add-reviews" ? "bg-white text-primary" : "border border-white text-white"}
                `}
                >
                  Add Reviews
                </Link>
              </li>
              <li className="flex gap-4 justify-start items-center">
                <FaFaceLaugh size={24} />
                <Link
                  href={"/dashboard/all-reviews"}
                  className={`flex items-center  space-x-2 p-2 rounded hover:bg-gray-700 hover:text-white hover:border-none w-full font-semibold 
                  ${pathname === "/dashboard/all-reviews" ? "bg-white text-primary" : "border border-white text-white"}
                `}
                >
                  All Reviews
                </Link>
              </li>
              {/* lgoout button  */}
            </ul>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex gap-4 justify-start items-center">
              <FaHome size={24} />
              <Button
                onClick={() => {
                  window.location.href = "/";
                }}
                // variant={"destructive"}
                className={`flex items-center  space-x-2 p-2 rounded hover:bg-gray-700 hover:text-white hover:border-none w-full font-semibold 
                  ${pathname === "/dashboard/logout" ? "bg-white text-primary" : "border border-white text-white"}
                `}
              >
                Back to Home
              </Button>
            </div>
            <div className="flex gap-4 justify-start items-center">
              <CiLogout size={24} />
              <Button
                onClick={() => {
                  localStorage.removeItem("accessToken");
                  window.location.href = "/login";
                }}
                variant={"destructive"}
                className={`flex items-center  space-x-2 p-2 rounded hover:bg-gray-700 hover:text-white hover:border-none w-full font-semibold 
                  ${pathname === "/dashboard/logout" ? "bg-white text-primary" : "border border-white text-white"}
                `}
              >
                Logout
              </Button>
            </div>
          </div>
        </nav>
      </div>

      {/* Overlay for small screens */}
      {isOpen && <div className="fixed inset-0 bg-black opacity-50 lg:hidden" onClick={() => setIsOpen(false)}></div>}
    </div>
  );
};

export default Sidebar;
