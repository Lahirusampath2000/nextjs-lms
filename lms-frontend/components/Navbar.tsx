"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="absolute top-0 left-0 right-0 z-50 bg-transparent">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-bold text-indigo-600"
          >
            LMS
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/"
              className="text-gray-700 hover:text-indigo-600 transition"
            >
              Home
            </Link>

            <Link
              href="#"
              className="text-gray-700 hover:text-indigo-600 transition"
            >
              Tutors
            </Link>

            <Link
              href="/AllCourse"
              className="text-gray-700 hover:text-indigo-600 transition"
            >
              Courses
            </Link>

            <Link
              href="/contact"
              className="text-gray-700 hover:text-indigo-600 transition"
            >
              My Course
            </Link>
            <Link
              href="#"
              className="text-gray-700 hover:text-indigo-600 transition"
            >
              Support
            </Link>
          </div>

          {/* Login Button */}
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition">
            Login
          </button>
        </div>
      </div>
    </nav>
  );
}