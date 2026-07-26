"use client";

import Image from "next/image";
import Link from "next/link";
import { Playfair_Display } from "next/font/google";
import {
  HiOutlineBookOpen,
  HiOutlineAcademicCap,
  HiOutlineDocumentText,
  HiOutlineMagnifyingGlass,
  HiOutlineArrowRight,
} from "react-icons/hi2";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["700"],
});

const VALUE_CARDS = [
  {
    icon: HiOutlineBookOpen,
    title: "Structured Courses",
    desc: "Expertly organised content with clear milestones so you always know where you're headed.",
  },
  {
    icon: HiOutlineDocumentText,
    title: "Past Papers",
    desc: "Access a full library of past exam papers organised by subject, grade, and year for targeted revision.",
  },
  {
    icon: HiOutlineAcademicCap,
    title: "Expert Tutors",
    desc: "Learn from industry experts who are passionate about teaching and your success.",
  },
];

function Herosection() {
  return (
    <section className="w-full bg-white font-sans">
      {/* Hero Banner */}
      <div className="relative w-full overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/home/hero-img.jpg"
            alt="Student learning online"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-gray-950/90 via-gray-950/75 to-indigo-950/40" />
        </div>

        {/* Hero Content */}
        <div className="relative w-full max-w-[1440px] mx-auto px-6 lg:px-12 min-h-[88vh] flex flex-col justify-center">
          <span className="inline-block w-fit text-xs font-semibold uppercase tracking-[0.25em] text-indigo-100 bg-white/10 border border-white/20 rounded-full px-4 py-2 mb-6 backdrop-blur-sm">
            Learn • Grow • Succeed
          </span>

          <h1
            className={`${playfair.className} text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.05] tracking-tight max-w-3xl`}
          >
            Learn Without Limits
          </h1>

          <p className="mt-6 text-lg md:text-xl text-gray-200 max-w-xl leading-relaxed">
            Unlock your potential with expert-led courses, comprehensive study
            materials, and an engaging learning experience designed to help you
            achieve academic excellence.
          </p>

          {/* Search */}
          {/* <form
            className="mt-10 flex flex-col sm:flex-row gap-3 max-w-xl"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="relative flex-1">
              <HiOutlineMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

              <input
                type="text"
                placeholder="What do you want to learn?"
                className="w-full h-14 pl-12 pr-4 rounded-xl bg-white text-gray-800 placeholder:text-gray-400 outline-none shadow-lg focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            <Link
              href="/AllCourse"
              className="h-14 px-8 flex items-center justify-center bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-xl whitespace-nowrap"
            >
              Browse Courses
            </Link>
          </form> */}
        </div>
      </div>

      {/* Value Cards */}
      <div className="w-full max-w-[1440px] mx-auto px-6 lg:px-12 py-20 md:py-24 grid grid-cols-1 md:grid-cols-3 gap-6">
        {VALUE_CARDS.map(({ icon: Icon, title, desc }) => (
          <div
            key={title}
            className="group bg-gray-50 rounded-2xl p-7 hover:bg-indigo-50 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
          >
            <span className="w-12 h-12 rounded-xl bg-white shadow flex items-center justify-center mb-5">
              <Icon className="w-6 h-6 text-indigo-600" />
            </span>

            <h3 className="text-lg font-bold text-gray-900 mb-3">{title}</h3>

            <p className="text-gray-600 leading-relaxed mb-6">{desc}</p>

            <span className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 group-hover:gap-3 transition-all">
              Explore Now
              <HiOutlineArrowRight className="w-4 h-4" />
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Herosection;