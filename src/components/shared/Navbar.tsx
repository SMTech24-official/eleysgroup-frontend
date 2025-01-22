"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Navbar() {
  return (
    <header className="fixed top-0 w-full z-50 border-b bg-background/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-pink-500">Logoipsum</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/" className="text-sm font-medium transition-colors hover:text-pink-500">
            Home
          </Link>
          <Link href="/testimonials" className="text-sm font-medium transition-colors hover:text-pink-500">
            Testimonials
          </Link>
          <Link href="/contact" className="text-sm font-medium transition-colors hover:text-pink-500">
            Contact
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <Button variant="secondary" className="hidden md:flex bg-pink-500 text-white hover:bg-pink-600">
            Book Appointment
          </Button>

          <Button variant="outline" className="md:hidden" size="icon">
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
      </div>
    </header>
  )
}

