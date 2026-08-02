"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HiOutlineBookOpen,
  HiOutlineMagnifyingGlass,
  HiOutlineArrowRightOnRectangle,
  HiBars3,
  HiXMark,
} from "react-icons/hi2";
import { getUser, logout } from "@/lib/auth";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Courses", href: "/AllCourse" },
  { label: "Tutors", href: "#" },
  { label: "My Courses", href: "/contact" },
  { label: "Support", href: "#" },
];


const INK = "#14213D";
const PAPER = "#FBFAF7";
const RULE = "#E7E4DC";
const MUTE = "#9A968A";
const BODY = "#6B675C";
const SIGNAL = "#2F6B4F";
const THUMB_BG = "#F1EEE5";
const ERROR_TEXT = "#B4432F";

function Logo({ light }: { light: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
      <span
        className="relative w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
        style={
          light
            ? { background: PAPER, border: "2px solid rgba(251,250,247,0.5)" }
            : { background: INK, border: "2px solid rgba(20,33,61,0.12)" }
        }
      >
        <span
          className="absolute inset-[2.5px] rounded-full border border-dashed"
          style={{ borderColor: light ? "rgba(20,33,61,0.35)" : "rgba(251,250,247,0.45)" }}
        />
        <HiOutlineBookOpen className="w-3.5 h-3.5" style={{ color: light ? INK : PAPER }} />
      </span>
      <span
        className="font-display text-base font-semibold tracking-tight"
        style={{ color: light ? PAPER : INK }}
      >
        EduLMS
      </span>
    </Link>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [user, setUser] = useState<ReturnType<typeof getUser>>(null);
  const pathname = usePathname();

  const isHome = pathname === "/";
  const isActive = (href: string) =>
    href !== "#" && (pathname === href || (href !== "/" && pathname.startsWith(href)));

  useEffect(() => {
    setUser(getUser());
  }, [pathname]);

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
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const linkIdle = isHome ? "rgba(251,250,247,0.75)" : MUTE;
  const linkStrong = isHome ? PAPER : INK;

  return (
    <>
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=IBM+Plex+Mono:wght@500;600&display=swap");
        .font-display {
          font-family: "Space Grotesk", ui-sans-serif, system-ui, sans-serif;
        }
        .font-data {
          font-family: "IBM Plex Mono", ui-monospace, monospace;
        }
      `}</style>

      <header
        className={`fixed top-0 left-0 w-full z-50 transition-transform duration-300 ${
          showNavbar ? "translate-y-0" : "-translate-y-full"
        } ${isHome ? "bg-transparent" : "border-b"}`}
        style={!isHome ? { background: PAPER, borderColor: RULE } : undefined}
      >
        <nav className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16 gap-6">
            <Logo light={isHome} />

            {/* Desktop links */}
            <div className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((l) => {
                const active = isActive(l.href);
                return (
                  <Link
                    key={l.label}
                    href={l.href}
                    className="relative px-3 py-2 font-data text-xs font-semibold uppercase tracking-widest transition-colors"
                    style={{ color: active ? linkStrong : linkIdle }}
                    onMouseEnter={(e) => {
                      if (!active) e.currentTarget.style.color = linkStrong;
                    }}
                    onMouseLeave={(e) => {
                      if (!active) e.currentTarget.style.color = linkIdle;
                    }}
                  >
                    {l.label}
                    {active && (
                      <span
                        className="absolute left-3 right-3 -bottom-px h-0.5 rounded-full"
                        style={{ background: SIGNAL }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>
            <div className="hidden md:flex items-center flex-1 max-w-xs">
              <div className="relative w-full">
                <HiOutlineMagnifyingGlass
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
                  style={{ color: MUTE }}
                />
                <input
                  type="text"
                  placeholder="Search courses…"
                  className="w-full pl-9 pr-3 h-9 rounded-xl text-sm outline-none border transition-colors placeholder:text-gray-400"
                  style={{ background: "#FFFFFF", borderColor: RULE, color: INK }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = SIGNAL)}
                  onBlur={(e) => (e.currentTarget.style.borderColor = RULE)}
                />
              </div>
            </div>

            {/* Auth */}
            <div className="hidden md:flex items-center gap-2.5 flex-shrink-0">
              {user ? (
                <>
                  <div
                    className="flex items-center gap-2 rounded-full pl-1.5 pr-3 py-1"
                    style={{
                      background: isHome ? "transparent" : THUMB_BG,
                      border: isHome ? `1px solid rgba(251,250,247,0.4)` : "none",
                    }}
                  >
                    <span
                      className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0"
                      style={{ background: isHome ? PAPER : INK, color: isHome ? INK : PAPER }}
                    >
                      {user.name?.charAt(0).toUpperCase()}
                    </span>
                    <span className="text-xs font-semibold" style={{ color: isHome ? PAPER : INK }}>
                      {user.name?.split(" ")[0]}
                    </span>
                  </div>
                  <button
                    onClick={logout}
                    className="flex items-center gap-1.5 text-xs font-semibold rounded-lg px-3 py-1.5 border transition-colors cursor-pointer"
                    style={{
                      color: isHome ? PAPER : MUTE,
                      borderColor: isHome ? "rgba(251,250,247,0.4)" : RULE,
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = ERROR_TEXT)}
                    onMouseLeave={(e) => (e.currentTarget.style.color = isHome ? PAPER : MUTE)}
                  >
                    <HiOutlineArrowRightOnRectangle className="w-3.5 h-3.5" />
                    Sign out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/auth/login"
                    className="font-data text-xs font-semibold uppercase tracking-widest px-3 py-2"
                    style={{ color: isHome ? PAPER : BODY }}
                  >
                    Log in
                  </Link>
                  <Link
                    href="/auth/authOption"
                    className="text-sm font-semibold px-4 h-9 flex items-center rounded-xl transition-all duration-200 active:scale-[0.98] hover:brightness-110"
                    style={isHome ? { background: PAPER, color: INK } : { background: INK, color: PAPER }}
                  >
                    Register
                  </Link>
                </>
              )}
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden p-2"
              style={{ color: isHome ? PAPER : BODY }}
              aria-label={open ? "Close menu" : "Open menu"}
            >
              {open ? <HiXMark className="w-5 h-5" /> : <HiBars3 className="w-5 h-5" />}
            </button>
          </div>

          {/* Mobile panel */}
          {open && (
            <div
              className="lg:hidden pb-5 flex flex-col gap-1 border-t"
              style={{
                borderColor: isHome ? "rgba(251,250,247,0.25)" : RULE,
                background: isHome ? "transparent" : PAPER,
              }}
            >
              <div className="flex flex-col gap-1 pt-3">
                {NAV_LINKS.map((l) => {
                  const active = isActive(l.href);
                  return (
                    <Link
                      key={l.label}
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="font-data text-xs font-semibold uppercase tracking-widest px-2 py-2.5 rounded-lg"
                      style={{ color: active ? linkStrong : linkIdle }}
                    >
                      {l.label}
                    </Link>
                  );
                })}
              </div>

              <div className="h-px my-2" style={{ background: isHome ? "rgba(251,250,247,0.2)" : RULE }} />

              {user ? (
                <div className="flex items-center justify-between px-2 py-1">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold"
                      style={{ background: isHome ? PAPER : INK, color: isHome ? INK : PAPER }}
                    >
                      {user.name?.charAt(0).toUpperCase()}
                    </span>
                    <span className="text-sm font-semibold" style={{ color: isHome ? PAPER : INK }}>
                      {user.name?.split(" ")[0]}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      setOpen(false);
                      logout();
                    }}
                    className="flex items-center gap-1.5 text-xs font-semibold rounded-lg px-3 py-1.5 border cursor-pointer"
                    style={{
                      color: isHome ? PAPER : MUTE,
                      borderColor: isHome ? "rgba(251,250,247,0.4)" : RULE,
                    }}
                  >
                    <HiOutlineArrowRightOnRectangle className="w-3.5 h-3.5" />
                    Sign out
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2 px-2 pt-1">
                  <Link
                    href="/auth/login"
                    onClick={() => setOpen(false)}
                    className="font-data text-xs font-semibold uppercase tracking-widest px-3 py-2"
                    style={{ color: isHome ? PAPER : BODY }}
                  >
                    Log in
                  </Link>
                  <Link
                    href="/auth/authOption"
                    onClick={() => setOpen(false)}
                    className="text-sm font-semibold px-4 h-9 flex items-center rounded-xl"
                    style={isHome ? { background: PAPER, color: INK } : { background: INK, color: PAPER }}
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          )}
        </nav>
      </header>

      {!isHome && <div aria-hidden className="h-16" />}
    </>
  );
}