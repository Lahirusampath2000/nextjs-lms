"use client";

import Image from "next/image";
import Link from "next/link";
import {
  HiOutlineBookOpen,
  HiOutlineAcademicCap,
  HiOutlineDocumentText,
  HiOutlineArrowRight,
} from "react-icons/hi2";
import { INK, PAPER, RULE, MUTE, BODY, SIGNAL, THUMB_BG, CARD_HOVER_SHADOW } from "@/lib/theme";

const VALUE_CARDS = [
  {
    icon: HiOutlineBookOpen,
    title: "Structured Courses",
    desc: "Expertly organised content with clear milestones so you always know where you're headed.",
  },
  {
    icon: HiOutlineDocumentText,
    title: "Past Papers",
    desc: "A full library of past exam papers organised by subject, grade, and year for targeted revision.",
  },
  {
    icon: HiOutlineAcademicCap,
    title: "Expert Tutors",
    desc: "Learn from industry experts who are passionate about teaching and your success.",
  },
];

export default function Herosection() {
  return (
    <section className="w-full font-sans" style={{ background: PAPER }}>
      {/* Hero banner */}
      <div className="relative w-full overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/home/hero-img.jpg"
            alt="Student learning online"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          {/* Ink wash, on-brand instead of a generic gray/indigo mix */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#14213D]/90 via-[#14213D]/72 to-[#14213D]/35" />
        </div>

        <div className="relative w-full max-w-7xl mx-auto px-6 lg:px-12 min-h-[80vh] flex flex-col justify-center">
          <p
            className="font-data text-[11px] font-medium uppercase tracking-[0.25em] mb-5"
            style={{ color: "#8FD4B0" }}
          >
            Learn · Grow · Succeed
          </p>

          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-bold text-white leading-[1.05] tracking-tight max-w-3xl">
            Learn Without Limits
          </h1>

          <p className="mt-6 text-lg text-white/75 max-w-xl leading-relaxed">
            Unlock your potential with expert-led courses, comprehensive study
            materials, and a learning experience built around real classrooms
            — not a features checklist.
          </p>

          <div className="mt-10 flex items-center gap-4">
            <Link
              href="/AllCourse"
              className="h-12 px-7 inline-flex items-center gap-2 text-sm font-semibold rounded-xl transition-all duration-200 active:scale-[0.98] hover:brightness-110"
              style={{ background: PAPER, color: INK }}
            >
              Browse Courses
              <HiOutlineArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/auth/authOption"
              className="h-12 px-6 inline-flex items-center text-sm font-semibold rounded-xl border border-white/25 text-white transition-colors hover:bg-white/10"
            >
              Get started free
            </Link>
          </div>
        </div>
      </div>

      {/* Value cards */}
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-12 py-16 md:py-20 grid grid-cols-1 md:grid-cols-3 gap-6">
        {VALUE_CARDS.map(({ icon: Icon, title, desc }) => (
          <div
            key={title}
            className={`group rounded-[22px] border p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[${CARD_HOVER_SHADOW}]`}
            style={{ borderColor: RULE, background: "#FFFFFF" }}
          >
            <span
              className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-colors"
              style={{ background: THUMB_BG }}
            >
              <Icon className="w-6 h-6" style={{ color: INK }} />
            </span>

            <h3 className="font-display text-lg font-bold mb-2.5" style={{ color: INK }}>
              {title}
            </h3>

            <p className="text-sm leading-relaxed mb-6" style={{ color: BODY }}>
              {desc}
            </p>

            <span
              className="inline-flex items-center gap-2 text-sm font-semibold group-hover:gap-3 transition-all"
              style={{ color: SIGNAL }}
            >
              Explore Now
              <HiOutlineArrowRight className="w-4 h-4" />
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}