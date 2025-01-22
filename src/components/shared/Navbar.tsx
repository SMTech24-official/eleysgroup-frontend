"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NavLink = [
  {
    path: "/",
    label: "Home",
  },
  {
    path: "/testimonials",
    label: "Testimonials",
  },
  {
    path: "/contact",
    label: "Contact",
  },
];

export function Navbar() {
  const pathName = usePathname();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen((prev) => !prev);
  };

  return (
    <header
      className={`${
        pathName === "/" || pathName === "testimonials" ? " fixed top-0 " : ""
      }  w-full z-50 backdrop-blur-md`}
    >
      <div className="container flex h-[120px] items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-primary">Logoipsum</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {NavLink?.map((link) => (
            <Link
              key={link?.path}
              href={link?.path}
              className={`${
                pathName === "/" || pathName === "testimonials"
                  ? " text-white"
                  : "text-black"
              } text-lg transition-colors hover:text-primary hover:border-b hover:border-primary ${
                link?.path === pathName
                  ? "border-b-2 border-primary text-primary"
                  : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {pathName === "/" || pathName === "testimonials" ? (
          <div className="flex items-center space-x-4">
            <Button
              variant="secondary"
              className="hidden md:flex bg-primary text-foreground hover:bg-primary px-2 py-4"
            >
              Book Appointment
            </Button>

            <Button
              onClick={toggleDrawer}
              variant="outline"
              className="md:hidden"
              size="icon"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="18" y2="18" />
              </svg>
            </Button>
          </div>
        ) : (
          <div className="flex items-center space-x-4 md:hidden">
            <Button
              onClick={toggleDrawer}
              variant="outline"
              className="md:hidden z-50"
              size="icon"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="18" y2="18" />
              </svg>
            </Button>
          </div>
        )}

        {/* Mobile menu */}
        {isDrawerOpen && (
          <div className="absolute top-0 left-0 w-full h-screen bg-white flex flex-col items-center justify-center md:hidden transition-transform transform translate-x-0 duration-300 ease-in-out">
            <button
              className="absolute top-10 right-4 text-white bg-black p-2 w-10 h-10 rounded-full"
              onClick={() => setIsDrawerOpen(false)}
            >
              &times;
            </button>
            <nav className="flex flex-col items-center gap-6">
              {NavLink?.map((link) => (
                <Link
                  key={link?.path}
                  href={link?.path}
                  className={`${
                    pathName === "/" || pathName === "testimonials"
                      ? " text-black"
                      : "text-black"
                  } text-lg transition-colors hover:text-primary hover:border-b hover:border-primary ${
                    link?.path === pathName
                      ? "border-b-2 border-primary text-primary"
                      : ""
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <Button
              variant="secondary"
              className="bg-primary mt-5 text-foreground hover:bg-primary px-2 py-4"
            >
              Book Appointment
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}
