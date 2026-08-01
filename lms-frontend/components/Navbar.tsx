"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HiOutlineAcademicCap,
  HiOutlineMagnifyingGlass,
  HiBars3,
  HiXMark,
} from "react-icons/hi2";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Courses", href: "/AllCourse" },
  { label: "Tutors", href: "#" },
  { label: "My Courses", href: "/contact" },
  { label: "Support", href: "#" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const pathname = usePathname();

  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setShowNavbar(false);
        setOpen(false);
      } else {
        setShowNavbar(true);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-transform duration-300 ${
        showNavbar ? "translate-y-0" : "-translate-y-full"
      } ${
        isHome
          ? "bg-transparent border-transparent"
          : "bg-white/95 backdrop-blur-sm border-b border-gray-100"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16 gap-6">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <span
              className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                isHome ? "bg-white/20" : "bg-indigo-950"
              }`}
            >
              <HiOutlineAcademicCap className="w-4 h-4 text-white" />
            </span>

            <span
              className={`text-base font-bold tracking-tight ${
                isHome ? "text-white" : "text-indigo-950"
              }`}
            >
              EduLearn
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  isHome
                    ? "text-white hover:bg-white/10"
                    : "text-gray-600 hover:text-indigo-950 hover:bg-indigo-50/70"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Search */}
          <div className="hidden md:flex items-center flex-1 max-w-xs">
            <div className="relative w-full">
              <HiOutlineMagnifyingGlass
                className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${
                  isHome ? "text-white/70" : "text-gray-400"
                }`}
              />

              <input
                type="text"
                placeholder="Search courses..."
                className={`w-full pl-9 pr-3 h-9 rounded-lg text-sm outline-none ${
                  isHome
                    ? "bg-white/10 border border-white/20 text-white placeholder:text-white/70"
                    : "bg-gray-50 border border-gray-200 placeholder:text-gray-400"
                }`}
              />
            </div>
          </div>

          {/* Auth */}
          <div className="hidden md:flex items-center gap-2 flex-shrink-0">
            <Link
              href="/auth/authOption"
              className={`text-sm font-medium px-3 py-2 ${
                isHome
                  ? "text-white"
                  : "text-gray-600 hover:text-indigo-950"
              }`}
            >
              Login
            </Link>

            <Link
              href="/auth/authOption"
              className={`text-sm font-semibold px-4 py-2 rounded-lg ${
                isHome
                  ? "bg-white text-indigo-950"
                  : "bg-indigo-950 text-white"
              }`}
            >
              Register
            </Link>
          </div>

          {/* Mobile */}
          <button
            onClick={() => setOpen(!open)}
            className={`lg:hidden p-2 ${
              isHome ? "text-white" : "text-gray-500"
            }`}
          >
            {open ? (
              <HiXMark className="w-5 h-5" />
            ) : (
              <HiBars3 className="w-5 h-5" />
            )}
          </button>

        </div>
      </nav>
    </header>
  );
}