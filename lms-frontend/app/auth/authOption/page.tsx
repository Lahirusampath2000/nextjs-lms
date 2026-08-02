"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { HiOutlineAcademicCap, HiOutlineUserGroup, HiOutlineArrowRight } from "react-icons/hi2";
import { INK, PAPER, RULE, MUTE, BODY, SIGNAL, THUMB_BG } from "@/lib/theme";

function AuthOption() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex font-sans overflow-hidden" style={{ background: PAPER }}>
      {/* ── Left Panel: Student ── */}
      <div
        className="relative w-1/2 flex flex-col items-center justify-center px-12 py-16 group transition-all duration-500"
        style={{ background: PAPER }}
      >
        {/* decorative blobs */}
        <div className="absolute -top-16 -left-16 w-64 h-64 rounded-full pointer-events-none" style={{ background: "#14213D0D" }} />
        <div className="absolute bottom-8 right-8 w-40 h-40 rounded-full pointer-events-none" style={{ background: "#14213D0D" }} />

        {/* divider */}
        <div className="absolute top-0 right-0 w-px h-full" style={{ background: RULE }} />

        <div className="relative flex flex-col items-center text-center gap-6 z-10">
          <div
            className="w-40 h-40 rounded-2xl flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-300"
            style={{ background: THUMB_BG, border: `1px solid ${RULE}` }}
          >
            <img
              src="/authOption/student-join.jpg"
              alt="Student Icon"
              className="w-24 h-24 object-contain"
            />
          </div>

          <div>
            <span
              className="inline-flex items-center gap-1.5 font-data text-[11px] font-medium uppercase tracking-[0.22em] mb-3"
              style={{ color: SIGNAL }}
            >
              <HiOutlineAcademicCap className="w-3.5 h-3.5" />
              For students
            </span>
            <h2 className="font-display text-2xl font-bold tracking-tight mb-2" style={{ color: INK }}>
              Join as a Student
            </h2>
            <p className="text-sm leading-relaxed max-w-xs" style={{ color: MUTE }}>
              Access curated courses, track your progress, and learn at your own pace.
            </p>
          </div>

          <button
            className="h-11 px-6 inline-flex items-center gap-2 text-sm font-semibold rounded-xl transition-all duration-200 active:scale-[0.98] hover:brightness-110 cursor-pointer"
            style={{ background: INK, color: "#FFFFFF" }}
            onClick={() => router.push("/auth/register?role=student")}
          >
            Join as a Student
            <HiOutlineArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ── Right Panel: Teacher ── */}
      <div
        className="relative w-1/2 flex flex-col items-center justify-center px-12 py-16 group transition-all duration-500"
        style={{ background: "linear-gradient(135deg, #F4F1E8 0%, #ECF3EE 100%)" }}
      >
        {/* decorative blobs */}
        <div className="absolute -top-12 -right-12 w-56 h-56 rounded-full pointer-events-none" style={{ background: "#2F6B4F14" }} />
        <div className="absolute bottom-4 left-4 w-44 h-44 rounded-full pointer-events-none" style={{ background: "#2F6B4F14" }} />

        <div className="relative flex flex-col items-center text-center gap-6 z-10">
          <div
            className="w-40 h-40 rounded-2xl flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-300"
            style={{ background: "#FFFFFF", border: `1px solid ${RULE}` }}
          >
            <img
              src="/authOption/teacher-join.jpg"
              alt="Teacher Icon"
              className="w-24 h-24 object-contain"
            />
          </div>

          <div>
            <span
              className="inline-flex items-center gap-1.5 font-data text-[11px] font-medium uppercase tracking-[0.22em] mb-3"
              style={{ color: SIGNAL }}
            >
              <HiOutlineUserGroup className="w-3.5 h-3.5" />
              For educators
            </span>
            <h2 className="font-display text-2xl font-bold tracking-tight mb-2" style={{ color: INK }}>
              Join as a Teacher
            </h2>
            <p className="text-sm leading-relaxed max-w-xs" style={{ color: MUTE }}>
              Create lessons, manage your students, and deliver impactful education.
            </p>
          </div>

          <button
            className="h-11 px-6 inline-flex items-center gap-2 text-sm font-semibold rounded-xl transition-all duration-200 active:scale-[0.98] hover:brightness-110 cursor-pointer"
            style={{ background: INK, color: "#FFFFFF" }}
            onClick={() => router.push("/auth/register?role=teacher")}
          >
            Continue as Teacher
            <HiOutlineArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ── Centre OR badge ── */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center"
          style={{ background: "#FFFFFF", border: `1px solid ${RULE}`, boxShadow: "0 8px 24px -8px rgba(20,33,61,0.18)" }}
        >
          <span className="font-data text-xs font-bold" style={{ color: MUTE }}>
            OR
          </span>
        </div>
      </div>

      {/* ── Sign in link ── */}
      <div className="absolute bottom-6 left-0 right-0 text-center z-20">
        <p className="text-sm" style={{ color: MUTE }}>
          Already have an account?{" "}
          <a href="/auth/login" className="font-semibold hover:underline" style={{ color: SIGNAL }}>
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}

export default AuthOption;