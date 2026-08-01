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


const INK = "#14213D";

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
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-transform duration-300 ${
          showNavbar ? "translate-y-0" : "-translate-y-full"
        } ${
          isHome
            ? "bg-transparent border-transparent"
            : "bg-white/95 backdrop-blur-sm border-b"
        }`}
        style={!isHome ? { borderColor: "#E7E4DC" } : undefined}
      >
        <nav className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16 gap-6">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 flex-shrink-0">
              <span
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: isHome ? "rgba(255,255,255,0.2)" : INK }}
              >
                <HiOutlineAcademicCap className="w-4 h-4 text-white" />
              </span>

              <span
                className="font-display text-base font-bold tracking-tight"
                style={{ color: isHome ? "#FFFFFF" : INK }}
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
                    isHome ? "text-white hover:bg-white/10" : "hover:bg-[#EAF2ED]"
                  }`}
                  style={!isHome ? { color: "#6B675C" } : undefined}
                  onMouseEnter={(e) => {
                    if (!isHome) e.currentTarget.style.color = INK;
                  }}
                  onMouseLeave={(e) => {
                    if (!isHome) e.currentTarget.style.color = "#6B675C";
                  }}
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
                  className={`w-full pl-9 pr-3 h-9 rounded-lg text-sm outline-none transition-shadow focus:ring-2 ${
                    isHome
                      ? "bg-white/10 border border-white/20 text-white placeholder:text-white/70 focus:ring-white/30"
                      : "bg-gray-50 border placeholder:text-gray-400 focus:ring-[#2F6B4F]/25 focus:border-[#2F6B4F]"
                  }`}
                  style={!isHome ? { borderColor: "#E7E4DC" } : undefined}
                />
              </div>
            </div>

            {/* Auth */}
            <div className="hidden md:flex items-center gap-2 flex-shrink-0">
              <Link
                href="/auth/authOption"
                className="text-sm font-medium px-3 py-2"
                style={{ color: isHome ? "#FFFFFF" : "#6B675C" }}
              >
                Login
              </Link>

              <Link
                href="/auth/authOption"
                className="text-sm font-semibold px-4 py-2 rounded-lg transition-all hover:brightness-110"
                style={
                  isHome
                    ? { background: "#FFFFFF", color: INK }
                    : { background: INK, color: "#FBFAF7" }
                }
              >
                Register
              </Link>
            </div>

            {/* Mobile */}
            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden p-2"
              style={{ color: isHome ? "#FFFFFF" : "#6B675C" }}
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

 
      {!isHome && <div aria-hidden className="h-16" />}
    </>
  );
}