"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUser, logout } from "@/lib/auth";
import api from "@/lib/axios";
import { getGradeStamp } from "@/components/gradeStyle";
import {
  HiOutlineBookOpen,
  HiOutlinePlus,
  HiOutlineUserGroup,
  HiOutlineChartBar,
  HiOutlineVideoCamera,
  HiOutlinePhoto,
  HiOutlineChevronRight,
  HiOutlineArrowRightOnRectangle,
} from "react-icons/hi2";

interface Course {
  id: number;
  course_name: string;
  course_code: string;
  description: string;
  grade: string;
  thumbnail_url: string | null;
  video_url: string | null;
  created_at: string;
}

// ---- Design tokens — match CourseCard.tsx / AllCourse.tsx / course detail page / add-course form ----
const INK = "#14213D";
const PAPER = "#FBFAF7";
const RULE = "#E7E4DC";
const MUTE = "#9A968A";
const BODY = "#6B675C";
const SIGNAL = "#2F6B4F";
const THUMB_BG = "#F1EEE5";
const ERROR_BG = "#FBEDE9";
const ERROR_BORDER = "#F0D5CC";
const ERROR_TEXT = "#B4432F";

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-[20px] border p-5" style={{ borderColor: RULE, background: "#FFFFFF" }}>
      <p className="font-data text-[11px] font-medium uppercase tracking-[0.18em] mb-1.5" style={{ color: MUTE }}>
        {label}
      </p>
      <p className="font-display text-3xl font-bold tracking-tight" style={{ color: INK }}>
        {value}
      </p>
    </div>
  );
}

function TeacherDashboard() {
  const router = useRouter();
  // user must be read inside useEffect — localStorage doesn't exist on the server,
  // so calling getUser() at render time causes a hydration mismatch.
  const [user, setUser] = useState<ReturnType<typeof getUser>>(null);
  const [mounted, setMounted] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const currentUser = getUser();
    setUser(currentUser);
    setMounted(true);

    if (!currentUser) {
      router.push("/auth/login");
      return;
    }
    if (currentUser.role !== "teacher") {
      router.push("/studentDashboard");
      return;
    }
    fetchCourses(currentUser.id);
  }, []);

  const fetchCourses = async (userId: number) => {
    try {
      const res = await api.get(`${process.env.NEXT_PUBLIC_API_URL}/api/courses/${userId}`);
      setCourses(res.data.courses || []);
    } catch (err: any) {
      setError("Failed to load courses.");
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) return null;

  const gradesTaught = new Set(courses.map((c) => c.grade)).size;

  const quickActions = [
    {
      icon: <HiOutlinePlus className="w-5 h-5" />,
      label: "New course",
      desc: "Create and publish a course",
      action: () => router.push("/course"),
      enabled: true,
    },
    {
      icon: <HiOutlineUserGroup className="w-5 h-5" />,
      label: "Students",
      desc: "View enrolled students",
      action: () => {},
      enabled: false,
    },
    {
      icon: <HiOutlineChartBar className="w-5 h-5" />,
      label: "Analytics",
      desc: "Track course performance",
      action: () => {},
      enabled: false,
    },
  ];

  return (
    <div className="min-h-screen font-sans" style={{ background: PAPER }}>
      {/* Self-contained font import — matches the rest of the product. */}
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=IBM+Plex+Mono:wght@500;600&display=swap");
        .font-display {
          font-family: "Space Grotesk", ui-sans-serif, system-ui, sans-serif;
        }
        .font-data {
          font-family: "IBM Plex Mono", ui-monospace, monospace;
        }
      `}</style>

      {/* ── Navbar ── */}
      <nav className="border-b" style={{ borderColor: RULE, background: PAPER }}>
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div
              className="relative w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: INK, border: "2px solid rgba(20,33,61,0.12)" }}
            >
              <div
                className="absolute inset-[2.5px] rounded-full border border-dashed"
                style={{ borderColor: "rgba(251,250,247,0.45)" }}
              />
              <HiOutlineBookOpen className="w-3.5 h-3.5" style={{ color: PAPER }} />
            </div>
            <span className="font-display text-sm font-semibold tracking-tight" style={{ color: INK }}>
              EduLMS
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div
              className="hidden sm:flex items-center gap-2 rounded-full pl-1.5 pr-3 py-1"
              style={{ background: THUMB_BG }}
            >
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0"
                style={{ background: INK, color: PAPER }}
              >
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <span className="text-xs font-semibold" style={{ color: INK }}>
                {user?.name}
              </span>
              <span
                className="font-data text-[10px] uppercase tracking-widest"
                style={{ color: MUTE }}
              >
                Teacher
              </span>
            </div>
            <button
              onClick={logout}
              className="flex items-center gap-1.5 text-xs font-semibold rounded-lg px-3 py-1.5 border transition-colors duration-200 cursor-pointer"
              style={{ color: MUTE, borderColor: RULE }}
              onMouseEnter={(e) => (e.currentTarget.style.color = ERROR_TEXT)}
              onMouseLeave={(e) => (e.currentTarget.style.color = MUTE)}
            >
              <HiOutlineArrowRightOnRectangle className="w-3.5 h-3.5" />
              Sign out
            </button>
          </div>
        </div>
      </nav>

      {/* ── Main content ── */}
      <main className="max-w-6xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <p
              className="font-data text-[11px] font-medium uppercase tracking-[0.22em] mb-1.5"
              style={{ color: SIGNAL }}
            >
              Teacher portal
            </p>
            <h1 className="font-display text-2xl font-semibold tracking-tight" style={{ color: INK }}>
              Good to see you, {user?.name?.split(" ")[0]}
            </h1>
            <p className="text-sm mt-1" style={{ color: BODY }}>
              Manage your courses and reach your students.
            </p>
          </div>
          <button
            onClick={() => router.push("/course")}
            className="flex items-center gap-2 h-11 px-5 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer active:scale-[0.98] hover:brightness-110 self-start sm:self-auto"
            style={{ background: INK, color: PAPER }}
          >
            <HiOutlinePlus className="w-4 h-4" />
            Add course
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
          <StatCard label="Total courses" value={courses.length} />
          <StatCard label="With video" value={courses.filter((c) => c.video_url).length} />
          <div className="hidden sm:block">
            <StatCard label="Grades taught" value={gradesTaught} />
          </div>
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {quickActions.map((item) => (
            <button
              key={item.label}
              onClick={item.enabled ? item.action : undefined}
              disabled={!item.enabled}
              className="group flex items-center gap-4 rounded-[20px] border p-5 text-left transition-all duration-200"
              style={{
                borderColor: RULE,
                background: "#FFFFFF",
                opacity: item.enabled ? 1 : 0.6,
                cursor: item.enabled ? "pointer" : "not-allowed",
              }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: THUMB_BG, color: INK }}
              >
                {item.icon}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-display text-sm font-semibold truncate" style={{ color: INK }}>
                    {item.label}
                  </p>
                  {!item.enabled && (
                    <span
                      className="font-data text-[9px] font-semibold uppercase tracking-widest px-1.5 py-0.5 rounded-full flex-shrink-0"
                      style={{ color: MUTE, background: THUMB_BG }}
                    >
                      Soon
                    </span>
                  )}
                </div>
                <p className="text-xs truncate" style={{ color: BODY }}>
                  {item.desc}
                </p>
              </div>
              {item.enabled && (
                <HiOutlineChevronRight
                  className="w-4 h-4 ml-auto flex-shrink-0 transition-colors duration-200"
                  style={{ color: RULE }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Course list */}
        <div className="rounded-[22px] border overflow-hidden" style={{ borderColor: RULE, background: "#FFFFFF" }}>
          <div
            className="flex items-center justify-between px-6 py-4 border-b"
            style={{ borderColor: "#EDEAE1" }}
          >
            <h2 className="font-display text-sm font-semibold" style={{ color: INK }}>
              Your courses
            </h2>
            <button
              onClick={() => router.push("/course")}
              className="text-xs font-semibold hover:underline cursor-pointer"
              style={{ color: SIGNAL }}
            >
              + Add new
            </button>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-16 gap-3">
              <div
                className="w-6 h-6 rounded-full animate-spin"
                style={{ border: `2px solid ${RULE}`, borderTopColor: SIGNAL }}
              />
              <p className="text-sm" style={{ color: MUTE }}>
                Loading courses…
              </p>
            </div>
          ) : error ? (
            <div className="p-6">
              <p
                className="text-sm rounded-xl px-4 py-3"
                style={{ color: ERROR_TEXT, background: ERROR_BG, border: `1px solid ${ERROR_BORDER}` }}
              >
                {error}
              </p>
            </div>
          ) : courses.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 gap-4">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: THUMB_BG }}>
                <HiOutlineBookOpen className="w-7 h-7" style={{ color: "#D9D4C6" }} />
              </div>
              <div className="text-center">
                <p className="text-sm font-semibold mb-1" style={{ color: INK }}>
                  No courses yet
                </p>
                <p className="text-xs mb-4" style={{ color: MUTE }}>
                  Create your first course to get started.
                </p>
                <button
                  onClick={() => router.push("/course")}
                  className="text-xs font-semibold py-2 px-4 rounded-lg transition-colors cursor-pointer hover:brightness-110"
                  style={{ background: INK, color: PAPER }}
                >
                  Create a course
                </button>
              </div>
            </div>
          ) : (
            <div>
              {courses.map((course) => {
                const stamp = getGradeStamp(course.grade);
                return (
                  <div
                    key={course.id}
                    onClick={() => router.push(`/AllCourse/${course.id}`)}
                    className="flex items-center gap-4 px-6 py-4 border-b last:border-b-0 transition-colors duration-200 cursor-pointer hover:bg-[#FAF8F2]"
                    style={{ borderColor: "#EDEAE1" }}
                  >
                    {/* Thumbnail or grade stamp */}
                    <div
                      className="relative w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 flex items-center justify-center"
                      style={{ background: THUMB_BG }}
                    >
                      {course.thumbnail_url ? (
                        <img
                          src={`${process.env.NEXT_PUBLIC_API_URL}${course.thumbnail_url}`}
                          alt={course.course_name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <HiOutlinePhoto className="w-5 h-5" style={{ color: "#D9D4C6" }} />
                      )}
                      <div
                        className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center"
                        style={{ background: stamp.bg, border: "2px solid #FFFFFF" }}
                      >
                        <span className="font-data text-[9px] font-bold leading-none" style={{ color: stamp.text }}>
                          {course.grade}
                        </span>
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold truncate" style={{ color: INK }}>
                        {course.course_name}
                      </p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs" style={{ color: MUTE }}>
                          Grade {course.grade}
                        </span>
                        <span style={{ color: RULE }}>·</span>
                        <span
                          className="font-data text-[11px] tracking-wider"
                          style={{ color: MUTE }}
                        >
                          {course.course_code}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      {course.video_url && (
                        <span
                          className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold rounded-full px-2.5 py-1"
                          style={{ background: "rgba(20,33,61,0.9)", color: PAPER }}
                        >
                          <HiOutlineVideoCamera className="w-3 h-3" />
                          Video
                        </span>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          router.push(`/AllCourse/${course.id}`);
                        }}
                        className="text-xs font-semibold border rounded-lg px-3 py-1.5 transition-colors cursor-pointer"
                        style={{ color: BODY, borderColor: RULE }}
                      >
                        View
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default TeacherDashboard;