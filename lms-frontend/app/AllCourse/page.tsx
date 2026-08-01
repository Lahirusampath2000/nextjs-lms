"use client";
import { useEffect, useMemo, useState } from "react";
import api from "@/lib/axios";
import CourseCard, { CourseCardSkeleton } from "@/components/CourseCard";

interface Course {
  id: number;
  teacher_id: number;
  teacher_name?: string;
  course_name: string;
  course_code: string;
  description: string;
  grade: string;
  video_url: string | null;
  thumbnail_url: string | null;
  created_at?: string;
  price?: number;
  original_price?: number;
  rating?: number;
  rating_count?: number;
}

type SortOption = "newest" | "oldest" | "name";
const PAGE_SIZE = 9;

// ---- Design tokens ----
const INK = "#14213D";
const PAPER = "#FBFAF7";
const RULE = "#E7E4DC";
const MUTE = "#9A968A";
const BODY = "#6B675C";
const SIGNAL = "#2F6B4F";

export default function AllCourse() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [selectedGrades, setSelectedGrades] = useState<string[]>([]);
  const [videoOnly, setVideoOnly] = useState(false);
  const [sort, setSort] = useState<SortOption>("newest");
  const [page, setPage] = useState(1);

  useEffect(() => {
    api
      .get(`${process.env.NEXT_PUBLIC_API_URL}/api/courses`)
      .then((res) => setCourses(res.data.courses))
      .catch(() => setError("Failed to load courses. Please try again."))
      .finally(() => setLoading(false));
  }, []);

  const grades = Array.from(new Set(courses.map((c) => c.grade))).sort(
    (a, b) => Number(a) - Number(b)
  );

  const toggleGrade = (g: string) => {
    setPage(1);
    setSelectedGrades((prev) =>
      prev.includes(g) ? prev.filter((x) => x !== g) : [...prev, g]
    );
  };

  const filtered = useMemo(() => {
    const result = courses.filter((c) => {
      const q = search.toLowerCase();
      const matchesSearch =
        !q ||
        c.course_name.toLowerCase().includes(q) ||
        c.description?.toLowerCase().includes(q) ||
        c.course_code.toLowerCase().includes(q);
      const matchesGrade =
        selectedGrades.length === 0 || selectedGrades.includes(c.grade);
      const matchesVideo = !videoOnly || !!c.video_url;
      return matchesSearch && matchesGrade && matchesVideo;
    });

    const sorted = [...result];
    if (sort === "newest") {
      sorted.sort(
        (a, b) => new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime()
      );
    } else if (sort === "oldest") {
      sorted.sort(
        (a, b) => new Date(a.created_at || 0).getTime() - new Date(b.created_at || 0).getTime()
      );
    } else if (sort === "name") {
      sorted.sort((a, b) => a.course_name.localeCompare(b.course_name));
    }
    return sorted;
  }, [courses, search, selectedGrades, videoOnly, sort]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const paginated = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const runSearch = () => {
    setPage(1);
    setSearch(searchInput);
  };

  const clearFilters = () => {
    setSelectedGrades([]);
    setVideoOnly(false);
    setSearchInput("");
    setSearch("");
    setPage(1);
  };

  const hasActiveFilters = selectedGrades.length > 0 || videoOnly || !!search;

  return (
    <div className="min-h-screen" style={{ background: PAPER }}>
      {/* Self-contained font import — move to your root font loader if you'd
          rather not @import at runtime. */}
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=IBM+Plex+Mono:wght@500;600&display=swap");
        .font-display {
          font-family: "Space Grotesk", ui-sans-serif, system-ui, sans-serif;
        }
        .font-data {
          font-family: "IBM Plex Mono", ui-monospace, monospace;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-6 md:px-10 pt-8 pb-10 md:pt-10 md:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-10 xl:gap-14 items-start">
          {/* ---------------- Left rail: heading + search + filters ---------------- */}
          <aside className="flex flex-col gap-9 lg:sticky lg:top-10">
            <div>
              <p
                className="font-data text-[11px] font-medium uppercase tracking-[0.22em]"
                style={{ color: SIGNAL }}
              >
                Learning hub
              </p>
              <h1
                className="font-display text-[34px] font-semibold leading-[1.05] tracking-tight mt-2"
                style={{ color: INK }}
              >
                Browse
                <br />
                courses
              </h1>
              <p className="text-sm leading-relaxed mt-3 max-w-[26ch]" style={{ color: BODY }}>
                {loading
                  ? "Loading the full catalogue…"
                  : `Discover ${courses.length} course${courses.length === 1 ? "" : "s"} from our teachers.`}
              </p>
            </div>

            {/* Search */}
            <div className="flex flex-col gap-2.5">
              <div className="relative">
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
                  style={{ color: MUTE }}
                  fill="none"
                  viewBox="0 0 16 16"
                >
                  <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.4" />
                  <path d="M10.5 10.5L13 13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                </svg>
                <input
                  type="text"
                  placeholder="Search for courses…"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && runSearch()}
                  className="w-full pl-9 pr-3 h-11 bg-white border rounded-xl text-sm placeholder:text-gray-400 outline-none focus:ring-2 transition-all"
                  style={{ borderColor: RULE, color: INK, boxShadow: "none" }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = SIGNAL)}
                  onBlur={(e) => (e.currentTarget.style.borderColor = RULE)}
                />
              </div>
              <button
                onClick={runSearch}
                className="h-11 text-white text-sm font-semibold rounded-xl transition-all duration-200 active:scale-[0.98] hover:brightness-110 cursor-pointer"
                style={{ background: INK }}
              >
                Search
              </button>
            </div>

            {/* Filters */}
            <div className="flex flex-col gap-6 pt-6 border-t" style={{ borderColor: RULE }}>
              <div className="flex items-center justify-between">
                <span
                  className="font-data text-[11px] font-medium uppercase tracking-[0.2em]"
                  style={{ color: MUTE }}
                >
                  Filters
                </span>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="text-xs font-semibold hover:underline cursor-pointer"
                    style={{ color: SIGNAL }}
                  >
                    Clear all
                  </button>
                )}
              </div>

              <div className="flex flex-col gap-2.5">
                <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: MUTE }}>
                  Grade
                </p>
                <div className="flex flex-wrap gap-2">
                  {grades.map((g) => {
                    const active = selectedGrades.includes(g);
                    return (
                      <button
                        key={g}
                        onClick={() => toggleGrade(g)}
                        className="px-3 h-8 rounded-full text-xs font-semibold border transition-colors cursor-pointer"
                        style={
                          active
                            ? { background: INK, borderColor: INK, color: PAPER }
                            : { background: "transparent", borderColor: RULE, color: BODY }
                        }
                      >
                        Grade {g}
                      </button>
                    );
                  })}
                  {grades.length === 0 && !loading && (
                    <p className="text-xs" style={{ color: MUTE }}>
                      No grades yet.
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-2.5">
                <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: MUTE }}>
                  Format
                </p>
                <button
                  onClick={() => {
                    setVideoOnly((v) => !v);
                    setPage(1);
                  }}
                  className="flex items-center gap-2.5 text-sm cursor-pointer select-none"
                  style={{ color: BODY }}
                >
                  <span
                    className="w-4 h-4 rounded-[5px] border flex items-center justify-center flex-shrink-0 transition-colors"
                    style={
                      videoOnly
                        ? { background: SIGNAL, borderColor: SIGNAL }
                        : { background: "transparent", borderColor: RULE }
                    }
                  >
                    {videoOnly && (
                      <svg viewBox="0 0 12 12" className="w-2.5 h-2.5" fill="none">
                        <path d="M2 6l2.5 2.5L10 3" stroke="#FBFAF7" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </span>
                  Video lessons included
                </button>
              </div>
            </div>
          </aside>

          {/* ---------------- Results ---------------- */}
          <div className="flex flex-col gap-6 min-w-0">
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <span className="text-xs" style={{ color: MUTE }}>
                {!loading && `${filtered.length} ${filtered.length === 1 ? "course" : "courses"} found`}
              </span>
              <select
                value={sort}
                onChange={(e) => {
                  setSort(e.target.value as SortOption);
                  setPage(1);
                }}
                className="text-xs font-semibold bg-white border rounded-lg px-2.5 py-1.5 outline-none cursor-pointer"
                style={{ borderColor: RULE, color: BODY }}
              >
                <option value="newest">Newest first</option>
                <option value="oldest">Oldest first</option>
                <option value="name">Name (A–Z)</option>
              </select>
            </div>

            {error ? (
              <p
                className="text-sm rounded-xl px-4 py-3 inline-block"
                style={{ color: "#B4432F", background: "#FBEDE9", border: "1px solid #F0D5CC" }}
              >
                {error}
              </p>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-6">
                  {loading
                    ? Array.from({ length: 6 }).map((_, i) => <CourseCardSkeleton key={i} />)
                    : paginated.length === 0
                    ? (
                      <div className="col-span-full flex flex-col items-center justify-center py-24 gap-4 text-center">
                        <div
                          className="w-16 h-16 rounded-2xl flex items-center justify-center"
                          style={{ background: "#F1EEE5" }}
                        >
                          <svg className="w-8 h-8" style={{ color: "#D9D4C6" }} fill="none" viewBox="0 0 32 32">
                            <rect x="4" y="5" width="24" height="20" rx="3" stroke="currentColor" strokeWidth="1.5" />
                            <path d="M9 13h14M9 19h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm font-semibold" style={{ color: INK }}>
                            {search ? `No courses match "${search}"` : "No courses match these filters"}
                          </p>
                          <p className="text-xs mt-1" style={{ color: MUTE }}>
                            Try adjusting your search or clearing filters.
                          </p>
                        </div>
                        {hasActiveFilters && (
                          <button
                            onClick={clearFilters}
                            className="px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer hover:brightness-110"
                            style={{ background: INK, color: PAPER }}
                          >
                            Clear filters
                          </button>
                        )}
                      </div>
                    )
                    : paginated.map((course) => <CourseCard key={course.id} course={course} />)
                  }
                </div>

                {!loading && pageCount > 1 && (
                  <div className="flex items-center justify-center gap-1.5 pt-4">
                    <button
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="h-9 px-3 rounded-lg text-xs font-semibold border disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
                      style={{ color: BODY, borderColor: RULE }}
                    >
                      Prev
                    </button>
                    {Array.from({ length: pageCount }).map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setPage(i + 1)}
                        className="w-9 h-9 rounded-lg text-xs font-semibold border transition-colors cursor-pointer"
                        style={
                          currentPage === i + 1
                            ? { background: INK, borderColor: INK, color: PAPER }
                            : { color: BODY, borderColor: RULE }
                        }
                      >
                        {i + 1}
                      </button>
                    ))}
                    <button
                      onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
                      disabled={currentPage === pageCount}
                      className="h-9 px-3 rounded-lg text-xs font-semibold border disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
                      style={{ color: BODY, borderColor: RULE }}
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}