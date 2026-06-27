"use client";
import { useEffect, useState } from "react";
import api from "@/lib/axios";
import CourseCard, { CourseCardSkeleton } from "@/components/CourseCard";

interface Course {
  id: number;
  teacher_id: number;
  course_name: string;
  course_code: string;
  description: string;
  grade: string;
  video_url: string | null;
  thumbnail_url: string | null;
  created_at?: string;
}

export default function AllCourse() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [gradeFilter, setGradeFilter] = useState("all");

  useEffect(() => {
    api.get(`${process.env.NEXT_PUBLIC_API_URL}/api/courses`)
      .then((res) => setCourses(res.data.courses))
      .catch(() => setError("Failed to load courses. Please try again."))
      .finally(() => setLoading(false));
  }, []);

  const grades = Array.from(new Set(courses.map((c) => c.grade))).sort(
    (a, b) => Number(a) - Number(b)
  );

  const filtered = courses.filter((c) => {
    const matchesSearch =
      c.course_name.toLowerCase().includes(search.toLowerCase()) ||
      c.description?.toLowerCase().includes(search.toLowerCase()) ||
      c.course_code.toLowerCase().includes(search.toLowerCase());
    const matchesGrade = gradeFilter === "all" || c.grade === gradeFilter;
    return matchesSearch && matchesGrade;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50/40 via-white to-violet-50/40 font-sans">

      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-indigo-100 to-violet-100 px-6 py-14 md:px-12">
        <div className="absolute -top-16 -left-16 w-64 h-64 rounded-full bg-indigo-200/30 pointer-events-none" />
        <div className="absolute -bottom-10 right-8 w-48 h-48 rounded-full bg-violet-200/20 pointer-events-none" />
        <div className="relative max-w-5xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest text-indigo-400 mb-2">Learning Hub</p>
          <h1 className="text-3xl font-bold text-indigo-950 tracking-tight mb-1">All Courses</h1>
          <p className="text-sm text-gray-500 mb-8 max-w-sm">
            Browse the full catalogue and jump into any subject at your own pace.
          </p>
          <div className="relative max-w-md">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" viewBox="0 0 16 16">
              <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.4" />
              <path d="M10.5 10.5L13 13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
            <input
              type="text"
              placeholder="Search courses…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 h-10 bg-white border border-white/80 rounded-xl text-sm text-gray-800 placeholder:text-gray-400 shadow-sm outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300 transition-all"
            />
          </div>
        </div>
      </div>

      {/* Grade filters */}
      <div className="max-w-5xl mx-auto px-6 md:px-12 py-6 flex flex-wrap items-center gap-2">
        <button
          onClick={() => setGradeFilter("all")}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer ${
            gradeFilter === "all"
              ? "bg-indigo-950 text-white"
              : "bg-white text-gray-600 border border-gray-200 hover:border-indigo-300 hover:text-indigo-700"
          }`}
        >
          All grades
        </button>
        {grades.map((g) => (
          <button
            key={g}
            onClick={() => setGradeFilter(g)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer ${
              gradeFilter === g
                ? "bg-indigo-950 text-white"
                : "bg-white text-gray-600 border border-gray-200 hover:border-indigo-300 hover:text-indigo-700"
            }`}
          >
            Grade {g}
          </button>
        ))}
        {!loading && (
          <span className="ml-auto text-xs text-gray-400">
            {filtered.length} {filtered.length === 1 ? "course" : "courses"}
          </span>
        )}
      </div>

      {/* Grid */}
      <div className="max-w-5xl mx-auto px-6 md:px-12 pb-16">
        {error ? (
          <p className="text-sm text-red-500 bg-red-50 border border-red-100 rounded-xl px-4 py-3 inline-block">
            {error}
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {loading
              ? Array.from({ length: 6 }).map((_, i) => <CourseCardSkeleton key={i} />)
              : filtered.length === 0
              ? (
                <div className="col-span-full flex flex-col items-center justify-center py-24 gap-4 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center">
                    <svg className="w-8 h-8 text-indigo-300" fill="none" viewBox="0 0 32 32">
                      <rect x="4" y="5" width="24" height="20" rx="3" stroke="currentColor" strokeWidth="1.5" />
                      <path d="M9 13h14M9 19h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-700">
                      {search ? `No courses match "${search}"` : "No courses available yet"}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {search ? "Try a different search term." : "Check back soon — courses will appear here."}
                    </p>
                  </div>
                </div>
              )
              : filtered.map((course) => <CourseCard key={course.id} course={course} />)
            }
          </div>
        )}
      </div>
    </div>
  );
}