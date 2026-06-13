"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-bold text-indigo-600"
          >
            MyApp
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
              href="/about"
              className="text-gray-700 hover:text-indigo-600 transition"
            >
              About
            </Link>

            <Link
              href="/services"
              className="text-gray-700 hover:text-indigo-600 transition"
            >
              Services
            </Link>

            <Link
              href="/contact"
              className="text-gray-700 hover:text-indigo-600 transition"
            >
              Contact
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