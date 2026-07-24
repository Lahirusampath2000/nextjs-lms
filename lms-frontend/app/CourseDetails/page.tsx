"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import api from "@/lib/axios";

interface Course {
  id: number;
  teacher_id: number;
  teacher_name: string;
  course_name: string;
  course_code: string;
  description: string;
  grade: string;
  video_url: string | null;
  thumbnail_url: string | null;
  created_at?: string;
}

const gradeStyleMap: Record<string, { bg: string; text: string; dot: string; border: string }> = {
  "1":  { bg: "bg-violet-50",  text: "text-violet-700",  dot: "bg-violet-400",  border: "border-violet-100"  },
  "2":  { bg: "bg-indigo-50",  text: "text-indigo-700",  dot: "bg-indigo-400",  border: "border-indigo-100"  },
  "3":  { bg: "bg-blue-50",    text: "text-blue-700",    dot: "bg-blue-400",    border: "border-blue-100"    },
  "4":  { bg: "bg-fuchsia-50", text: "text-fuchsia-700", dot: "bg-fuchsia-400", border: "border-fuchsia-100" },
  "5":  { bg: "bg-purple-50",  text: "text-purple-700",  dot: "bg-purple-400",  border: "border-purple-100"  },
  "6":  { bg: "bg-violet-50",  text: "text-violet-700",  dot: "bg-violet-400",  border: "border-violet-100"  },
  "7":  { bg: "bg-indigo-50",  text: "text-indigo-700",  dot: "bg-indigo-400",  border: "border-indigo-100"  },
  "8":  { bg: "bg-blue-50",    text: "text-blue-700",    dot: "bg-blue-400",    border: "border-blue-100"    },
  "9":  { bg: "bg-fuchsia-50", text: "text-fuchsia-700", dot: "bg-fuchsia-400", border: "border-fuchsia-100" },
  "10": { bg: "bg-purple-50",  text: "text-purple-700",  dot: "bg-purple-400",  border: "border-purple-100"  },
  "11": { bg: "bg-violet-50",  text: "text-violet-700",  dot: "bg-violet-400",  border: "border-violet-100"  },
  "12": { bg: "bg-indigo-50",  text: "text-indigo-700",  dot: "bg-indigo-400",  border: "border-indigo-100"  },
};
const fallbackGrade = { bg: "bg-indigo-50", text: "text-indigo-700", dot: "bg-indigo-400", border: "border-indigo-100" };
const getGradeStyle = (grade: string) => gradeStyleMap[grade] ?? fallbackGrade;

function Skeleton() {
  return (
    <div className="min-h-screen bg-white animate-pulse">
      <div className="h-14 bg-gray-50 border-b border-gray-100" />
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-10 grid grid-cols-1 lg:grid-cols-5 gap-10">
        <div className="lg:col-span-3 flex flex-col gap-5">
          <div className="aspect-video bg-gray-100 rounded-2xl" />
          <div className="h-5 w-28 bg-gray-100 rounded-full" />
          <div className="h-8 w-3/4 bg-gray-200 rounded-lg" />
          <div className="flex flex-col gap-2">
            <div className="h-3.5 w-full bg-gray-100 rounded-full" />
            <div className="h-3.5 w-5/6 bg-gray-100 rounded-full" />
            <div className="h-3.5 w-4/6 bg-gray-100 rounded-full" />
          </div>
        </div>
        <div className="lg:col-span-2">
          <div className="bg-gray-50 rounded-2xl h-80" />
        </div>
      </div>
    </div>
  );
}

function CourseThumbnail({ src, alt }: { src: string | null; alt: string }) {
  const [errored, setErrored] = useState(false);

  if (src && !errored) {
    return (
      <img
        src={src}
        alt={alt}
        onError={() => setErrored(true)}
        className="w-full h-full object-cover"
      />
    );
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-indigo-50 via-white to-violet-50">
      <div className="w-16 h-16 rounded-2xl bg-indigo-100/80 flex items-center justify-center">
        <svg className="w-8 h-8 text-indigo-300" fill="none" viewBox="0 0 32 32">
          <rect x="3" y="5" width="26" height="20" rx="3" stroke="currentColor" strokeWidth="1.5" />
          <path d="M8 13h16M8 19h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>
      <p className="text-xs text-gray-400 font-medium">No preview available</p>
    </div>
  );
}

function LockedVideo() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4 bg-gradient-to-br from-gray-900 via-indigo-950 to-gray-900 relative">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.12) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      <div className="relative flex flex-col items-center gap-3 text-center px-8">
        <div className="w-14 h-14 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
          <svg className="w-7 h-7 text-white/70" fill="none" viewBox="0 0 28 28">
            <rect x="7" y="12" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
            <path d="M10 12V9a4 4 0 018 0v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
        <div>
          <p className="text-white font-semibold text-sm">Video locked</p>
          <p className="text-white/50 text-xs mt-1 max-w-[220px] leading-relaxed">
            Enroll in this course to watch all lessons.
          </p>
        </div>
      </div>
    </div>
  );
}

function TeacherAvatar({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0].toUpperCase())
    .join("");
  return (
    <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
      <span className="text-xs font-bold text-indigo-700">{initials}</span>
    </div>
  );
}

export default function CourseDetailPage() {
  const router = useRouter();
  const params = useParams();
  const courseId = params?.id as string;

  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cartAdded, setCartAdded] = useState(false);

  // TODO: replace with real enrollment status from your auth/enrollment API
  const isEnrolled = false;

  useEffect(() => {
    if (!courseId) return;
    api
      .get(`${process.env.NEXT_PUBLIC_API_URL}/api/courses/${courseId}`)
      .then((res) => setCourse(res.data.course))
      .catch(() => setError("Course not found."))
      .finally(() => setLoading(false));
  }, [courseId]);

  const handleAddToCart = () => {
    // TODO: wire to your cart logic
    setCartAdded(true);
    setTimeout(() => setCartAdded(false), 2000);
  };

  const handleBuyNow = () => {
    // TODO: wire to your checkout/payment flow
    router.push(`/checkout/${courseId}`);
  };

  if (loading) return <Skeleton />;

  if (error || !course) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-center px-6">
          <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center">
            <svg className="w-7 h-7 text-red-300" fill="none" viewBox="0 0 28 28">
              <circle cx="14" cy="14" r="10" stroke="currentColor" strokeWidth="1.5" />
              <path d="M14 9v6M14 18v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          <div>
            <p className="font-semibold text-gray-800 text-sm">{error || "Something went wrong"}</p>
            <p className="text-xs text-gray-400 mt-1">This course might have been removed.</p>
          </div>
          <button
            onClick={() => router.push("/courses")}
            className="px-5 py-2 bg-indigo-950 text-white text-sm font-semibold rounded-lg hover:bg-indigo-800 transition-colors cursor-pointer"
          >
            Back to courses
          </button>
        </div>
      </div>
    );
  }

  const gs = getGradeStyle(course.grade);
  const thumbnailSrc = course.thumbnail_url
    ? `${process.env.NEXT_PUBLIC_API_URL}${course.thumbnail_url}`
    : null;
  const videoSrc = course.video_url
    ? `${process.env.NEXT_PUBLIC_API_URL}${course.video_url}`
    : null;

  // shared CTA block used in both mobile and desktop
  const CTAButtons = (
    <div className="flex flex-col gap-2">
      <button
        onClick={handleBuyNow}
        className="w-full h-11 bg-indigo-950 hover:bg-indigo-800 active:scale-[0.98] text-white text-sm font-semibold rounded-xl transition-all duration-200 cursor-pointer"
      >
        Buy now
      </button>
      <button
        onClick={handleAddToCart}
        className={`w-full h-11 text-sm font-semibold rounded-xl border transition-all duration-200 cursor-pointer active:scale-[0.98] ${
          cartAdded
            ? "bg-green-50 text-green-700 border-green-200"
            : "bg-white text-indigo-950 border-gray-200 hover:border-indigo-300 hover:bg-indigo-50/50"
        }`}
      >
        {cartAdded ? (
          <span className="flex items-center justify-center gap-1.5">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 16 16">
              <path d="M3 8l3.5 3.5L13 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Added to cart
          </span>
        ) : (
          "Add to cart"
        )}
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-white font-sans">

      {/* Sticky breadcrumb */}
      <nav className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 md:px-10 h-14 flex items-center gap-2 text-sm">
          <button
            onClick={() => router.push("/courses")}
            className="flex items-center gap-1.5 text-gray-400 hover:text-indigo-700 transition-colors cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 16 16">
              <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            All courses
          </button>
          <svg className="w-3 h-3 text-gray-200" fill="none" viewBox="0 0 12 12">
            <path d="M4 2l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="text-gray-600 font-medium truncate max-w-[200px] md:max-w-sm">
            {course.course_name}
          </span>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 md:px-10 py-10 grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">

        {/* ── LEFT: main content ── */}
        <div className="lg:col-span-3 flex flex-col gap-7">

          {/* Media */}
          <div className="rounded-2xl overflow-hidden border border-gray-100 aspect-video bg-gray-50">
            {isEnrolled && videoSrc ? (
              <video
                src={videoSrc}
                controls
                poster={thumbnailSrc ?? undefined}
                className="w-full h-full object-cover"
              />
            ) : videoSrc && !isEnrolled ? (
              <LockedVideo />
            ) : (
              <CourseThumbnail src={thumbnailSrc} alt={course.course_name} />
            )}
          </div>

          {/* Grade + code */}
          <div className="flex items-center gap-3 flex-wrap">
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${gs.bg} ${gs.text} ${gs.border}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${gs.dot}`} />
              Grade {course.grade}
            </span>
            <span className="text-[11px] font-mono text-gray-400 tracking-widest uppercase">
              {course.course_code}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-2xl md:text-3xl font-bold text-gray-950 leading-tight tracking-tight -mt-2">
            {course.course_name}
          </h1>

          {/* Instructor */}
          <div className="flex items-center gap-3 pb-6 border-b border-gray-100 -mt-2">
            <TeacherAvatar name={course.teacher_name || "Unknown"} />
            <div className="flex flex-col">
              <span className="text-[10px] text-gray-400 uppercase tracking-widest font-medium">Instructor</span>
              <span className="text-sm font-semibold text-gray-800">{course.teacher_name || "Unknown"}</span>
            </div>
          </div>

          {/* About */}
          <div className="flex flex-col gap-2">
            <h2 className="text-sm font-bold text-gray-900 tracking-tight">About this course</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              {course.description || "No description has been provided for this course yet."}
            </p>
          </div>

          {/* What you'll learn */}
          <div className="rounded-2xl border border-indigo-100 bg-indigo-50/40 p-6 flex flex-col gap-4">
            <h2 className="text-sm font-bold text-indigo-950 tracking-tight">What you'll learn</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6">
              {[
                "Core concepts for Grade " + course.grade,
                "Exercises and practice problems",
                "Teacher-guided walkthroughs",
                "Progress tracking and assessments",
                "Certificate on completion",
                "Lifetime access to materials",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-xs text-gray-700">
                  <svg className="w-3.5 h-3.5 mt-0.5 text-indigo-400 flex-shrink-0" fill="none" viewBox="0 0 14 14">
                    <path d="M2.5 7l3 3 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Mobile CTAs */}
          <div className="lg:hidden">{CTAButtons}</div>
        </div>

        {/* ── RIGHT: sticky purchase card ── */}
        <div className="lg:col-span-2 lg:sticky lg:top-20">
          <div className="rounded-2xl border border-gray-100 overflow-hidden shadow-sm">

            {/* Thumbnail in card */}
            <div className="aspect-video bg-gray-50 overflow-hidden">
              <CourseThumbnail src={thumbnailSrc} alt={course.course_name} />
            </div>

            <div className="p-6 flex flex-col gap-5">

              <div>
                <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-0.5">Course</p>
                <h3 className="text-sm font-bold text-gray-900 leading-snug">{course.course_name}</h3>
              </div>

              {/* Meta */}
              <div className="flex flex-col gap-3 text-xs border-t border-gray-50 pt-4">

                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Instructor</span>
                  <div className="flex items-center gap-1.5">
                    <TeacherAvatar name={course.teacher_name || "Unknown"} />
                    <span className="font-semibold text-gray-800">{course.teacher_name || "Unknown"}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Grade</span>
                  <span className={`font-semibold px-2 py-0.5 rounded-full border ${gs.bg} ${gs.text} ${gs.border} text-[11px]`}>
                    Grade {course.grade}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Course code</span>
                  <span className="font-mono font-medium text-gray-600 tracking-wider text-[11px]">
                    {course.course_code}
                  </span>
                </div>

                {course.created_at && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Published</span>
                    <span className="font-medium text-gray-600">
                      {new Date(course.created_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Video lessons</span>
                  <span className={`font-medium ${course.video_url ? "text-indigo-600" : "text-gray-400"}`}>
                    {course.video_url ? "Included" : "Not available"}
                  </span>
                </div>
              </div>

              {/* Desktop CTAs */}
              <div className="hidden lg:block">{CTAButtons}</div>

              <p className="text-[11px] text-gray-400 text-center">
                Instant access · Secure checkout
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}