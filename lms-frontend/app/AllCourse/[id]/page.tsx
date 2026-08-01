"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import api from "@/lib/axios";
import { getGradeStyle, getGradeStamp } from "@/components/gradeStyle";
import LockedVideo from "@/components/LockedVideo";
import CourseDetailSkeleton from "@/components/CourseDetailSkeleton";
import { HiStar } from "react-icons/hi2";

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
  // Optional — render only if/when the API sends them, no fabricated data.
  price?: number;
  original_price?: number;
  instructor_bio?: string;
  rating?: number;
  rating_count?: number;
}

type Tab = "overview" | "curriculum" | "instructor";

// ---- Design tokens — identical to CourseCard.tsx and AllCourse.tsx so the
// catalogue, the card, and this page read as one product. ----
const INK = "#14213D";
const PAPER = "#FBFAF7";
const RULE = "#E7E4DC";
const MUTE = "#9A968A";
const BODY = "#6B675C";
const THUMB_BG = "#F1EEE5";
const SIGNAL = "#2F6B4F";

const TABS: { id: Tab; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "curriculum", label: "Curriculum" },
  { id: "instructor", label: "Instructor" },
];

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
    <div className="w-full h-full flex items-center justify-center" style={{ background: THUMB_BG }}>
      <svg className="w-12 h-12" style={{ color: "#D9D4C6" }} fill="none" viewBox="0 0 32 32">
        <rect x="3" y="5" width="26" height="20" rx="3" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 13h16M8 19h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </div>
  );
}

function TeacherAvatar({ name, size = "md" }: { name: string; size?: "sm" | "md" }) {
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase() ?? "")
    .join("");
  const dims = size === "sm" ? "w-9 h-9" : "w-12 h-12";
  return (
    <div
      className={`${dims} rounded-full flex items-center justify-center flex-shrink-0`}
      style={{ background: INK }}
    >
      <span className="font-data text-xs font-semibold" style={{ color: PAPER }}>
        {initials || "?"}
      </span>
    </div>
  );
}

/** The circular grade "stamp" from CourseCard, reused here as the page's
 *  hero badge so the catalogue and the detail page share one signature. */
function GradeStamp({ grade, size = 64 }: { grade: string; size?: number }) {
  const stamp = getGradeStamp(grade);
  return (
    <div
      className="relative flex flex-col items-center justify-center rounded-full flex-shrink-0 shadow-[0_10px_20px_-6px_rgba(20,33,61,0.35)]"
      style={{ width: size, height: size, background: stamp.bg, border: "3px solid rgba(251,250,247,0.95)" }}
    >
      <div
        className="absolute inset-[5px] rounded-full border border-dashed"
        style={{ borderColor: `${stamp.text}55` }}
      />
      <span
        className="font-data text-[7px] font-medium uppercase tracking-[0.18em] leading-none"
        style={{ color: stamp.text }}
      >
        Grade
      </span>
      <span className="font-display text-lg font-bold leading-none mt-0.5" style={{ color: stamp.text }}>
        {grade}
      </span>
    </div>
  );
}

function RatingRow({ rating, count }: { rating: number; count?: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <HiStar
            key={i}
            className="w-3.5 h-3.5"
            style={{ color: i < Math.round(rating) ? "#F0B429" : RULE }}
          />
        ))}
      </div>
      <span className="font-data text-xs font-semibold" style={{ color: INK }}>
        {rating.toFixed(1)}
      </span>
      {typeof count === "number" && (
        <span className="text-xs" style={{ color: MUTE }}>
          ({count})
        </span>
      )}
    </div>
  );
}

/** Ticket-stub style divider — the page's one deliberate flourish, echoing
 *  the report-card motif without adding new decoration elsewhere. */
function Perforation() {
  return (
    <div className="relative h-px" style={{ background: RULE }}>
      <span
        className="absolute -left-6 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full"
        style={{ background: PAPER, border: `1px solid ${RULE}` }}
      />
      <span
        className="absolute -right-6 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full"
        style={{ background: PAPER, border: `1px solid ${RULE}` }}
      />
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
  const [tab, setTab] = useState<Tab>("overview");
  const [shareCopied, setShareCopied] = useState(false);

  // TODO: replace with real enrollment status from your auth/enrollment API
  const isEnrolled = false;

  useEffect(() => {
    if (!courseId) return;
    api
      .get(`${process.env.NEXT_PUBLIC_API_URL}/api/coursesDetails/${courseId}`)
      .then((res) => setCourse(res.data.course))
      .catch((err) => {
        console.error("Failed to load course:", err);
        setError("Course not found or failed to load.");
      })
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

  const handleShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title: course?.course_name, url });
        return;
      } catch {
        // user cancelled or share failed — fall through to copy
      }
    }
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      await navigator.clipboard.writeText(url);
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2000);
    }
  };

  if (loading) return <CourseDetailSkeleton />;

  if (error || !course) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: PAPER }}>
        <div className="flex flex-col items-center gap-4 text-center px-6">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: "#FBEDE9" }}>
            <svg className="w-7 h-7" style={{ color: "#E8604C" }} fill="none" viewBox="0 0 28 28">
              <circle cx="14" cy="14" r="10" stroke="currentColor" strokeWidth="1.5" />
              <path d="M14 9v6M14 18v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          <div>
            <p className="font-display font-semibold text-sm" style={{ color: INK }}>
              {error || "Something went wrong"}
            </p>
            <p className="text-xs mt-1" style={{ color: MUTE }}>
              This course might have been removed.
            </p>
          </div>
          <button
            onClick={() => router.push("/AllCourse")}
            className="px-5 py-2 text-sm font-semibold rounded-lg transition-colors cursor-pointer hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            style={{ background: INK, color: PAPER }}
          >
            Back to courses
          </button>
        </div>
      </div>
    );
  }

  const stamp = getGradeStamp(course.grade);
  const gs = getGradeStyle(course.grade);
  const thumbnailSrc = course.thumbnail_url
    ? `${process.env.NEXT_PUBLIC_API_URL}${course.thumbnail_url}`
    : null;
  const videoSrc = course.video_url
    ? `${process.env.NEXT_PUBLIC_API_URL}${course.video_url}`
    : null;
  const hasDiscount =
    typeof course.price === "number" &&
    typeof course.original_price === "number" &&
    course.original_price > course.price;
  const discountPct = hasDiscount
    ? Math.round(100 - (course.price! / course.original_price!) * 100)
    : null;

  const inclusions = [
    course.video_url ? "On-demand video lessons" : "Written lesson materials",
    `Core concepts for Grade ${course.grade}`,
    "Exercises and practice problems",
    "Teacher-guided walkthroughs",
    "Certificate on completion",
    "Lifetime access to materials",
  ];

  const CTAButtons = (
    <div className="flex flex-col gap-2">
      <button
        onClick={handleBuyNow}
        className="w-full h-11 text-sm font-semibold rounded-xl transition-all duration-200 active:scale-[0.98] hover:brightness-110 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
        style={{ background: INK, color: PAPER }}
      >
        Buy now
      </button>
      <button
        onClick={handleAddToCart}
        className="w-full h-11 text-sm font-semibold rounded-xl border transition-all duration-200 cursor-pointer active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
        style={
          cartAdded
            ? { background: "#EAF2ED", color: SIGNAL, borderColor: "#CFE0D5" }
            : { background: "#FFFFFF", color: INK, borderColor: RULE }
        }
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
    <div className="min-h-screen font-sans" style={{ background: PAPER }}>
      {/* Self-contained font import — matches AllCourse.tsx. Worth moving to
          your root font loader so it's only fetched once per session. */}
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=IBM+Plex+Mono:wght@500;600&display=swap");
        .font-display {
          font-family: "Space Grotesk", ui-sans-serif, system-ui, sans-serif;
        }
        .font-data {
          font-family: "IBM Plex Mono", ui-monospace, monospace;
        }
      `}</style>

      <nav className="border-b" style={{ background: PAPER, borderColor: RULE }}>
        <div className="max-w-6xl mx-auto px-6 md:px-10 h-14 flex items-center gap-2 text-sm">
          <button
            onClick={() => router.push("/AllCourse")}
            className="flex items-center gap-1.5 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded-md"
            style={{ color: MUTE }}
            onMouseEnter={(e) => (e.currentTarget.style.color = SIGNAL)}
            onMouseLeave={(e) => (e.currentTarget.style.color = MUTE)}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 16 16">
              <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            All courses
          </button>
          <svg className="w-3 h-3" style={{ color: RULE }} fill="none" viewBox="0 0 12 12">
            <path d="M4 2l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="font-medium truncate max-w-[200px] md:max-w-sm" style={{ color: BODY }}>
            {course.course_name}
          </span>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 md:px-10 py-10 grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
        <div className="lg:col-span-3 flex flex-col gap-7">
          <div className="rounded-[22px] overflow-hidden border aspect-video" style={{ borderColor: RULE, background: THUMB_BG }}>
            {isEnrolled && videoSrc ? (
              <video
                src={videoSrc}
                controls
                poster={thumbnailSrc ?? undefined}
                className="w-full h-full object-cover"
              />
            ) : videoSrc && !isEnrolled ? (
              <LockedVideo thumbnailSrc={thumbnailSrc} onEnrollClick={handleBuyNow} />
            ) : (
              <CourseThumbnail src={thumbnailSrc} alt={course.course_name} />
            )}
          </div>

          <div className="flex items-center gap-4">
            <GradeStamp grade={course.grade} />
            <div className="flex flex-col gap-1.5">
              <span className="font-data text-[10px] font-medium tracking-[0.2em] uppercase" style={{ color: MUTE }}>
                {course.course_code}
              </span>
              {typeof course.rating === "number" && (
                <RatingRow rating={course.rating} count={course.rating_count} />
              )}
            </div>
          </div>

          <h1 className="font-display text-2xl md:text-3xl font-semibold leading-tight tracking-tight -mt-2" style={{ color: INK }}>
            {course.course_name}
          </h1>

          <div className="flex items-center gap-3 -mt-2">
            <TeacherAvatar name={course.teacher_name || "Unknown"} />
            <div className="flex flex-col">
              <span className="font-data text-[10px] uppercase tracking-widest font-medium" style={{ color: MUTE }}>
                Instructor
              </span>
              <span className="text-sm font-semibold" style={{ color: BODY }}>
                {course.teacher_name || "Unknown"}
              </span>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b" style={{ borderColor: RULE }}>
            <div className="flex gap-6">
              {TABS.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className="relative pb-3 font-data text-xs font-semibold uppercase tracking-widest transition-colors cursor-pointer focus-visible:outline-none"
                  style={{ color: tab === t.id ? INK : MUTE }}
                >
                  {t.label}
                  {tab === t.id && (
                    <span className="absolute left-0 right-0 -bottom-px h-0.5 rounded-full" style={{ background: SIGNAL }} />
                  )}
                </button>
              ))}
            </div>
          </div>

          {tab === "overview" && (
            <div className="flex flex-col gap-7">
              <div className="flex flex-col gap-2">
                <h2 className="font-display text-sm font-bold tracking-tight" style={{ color: INK }}>
                  About this course
                </h2>
                <p className="text-sm leading-relaxed" style={{ color: BODY }}>
                  {course.description || "No description has been provided for this course yet."}
                </p>
              </div>

              <div className="rounded-2xl border p-6 flex flex-col gap-4" style={{ borderColor: RULE, background: "#F6F4EE" }}>
                <h2 className="font-display text-sm font-bold tracking-tight" style={{ color: INK }}>
                  This course includes
                </h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6">
                  {inclusions.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-xs" style={{ color: BODY }}>
                      <svg className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: SIGNAL }} fill="none" viewBox="0 0 14 14">
                        <path d="M2.5 7l3 3 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {tab === "curriculum" && (
            <div className="flex flex-col items-center justify-center gap-3 py-14 text-center">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: THUMB_BG }}>
                <svg className="w-6 h-6" style={{ color: "#D9D4C6" }} fill="none" viewBox="0 0 24 24">
                  <path d="M4 5h16M4 12h16M4 19h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
              <p className="font-display text-sm font-semibold" style={{ color: INK }}>
                Curriculum coming soon
              </p>
              <p className="text-xs max-w-xs" style={{ color: MUTE }}>
                The lesson-by-lesson breakdown for this course hasn&apos;t been published yet.
              </p>
            </div>
          )}

          {tab === "instructor" && (
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <TeacherAvatar name={course.teacher_name || "Unknown"} />
                <div className="flex flex-col">
                  <span className="text-sm font-semibold" style={{ color: INK }}>
                    {course.teacher_name || "Unknown"}
                  </span>
                  <span className="text-xs" style={{ color: MUTE }}>
                    Course instructor
                  </span>
                </div>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: BODY }}>
                {course.instructor_bio || "No additional instructor details have been provided yet."}
              </p>
            </div>
          )}

          <div className="lg:hidden">{CTAButtons}</div>
        </div>

        <div className="lg:col-span-2 lg:sticky lg:top-20">
          <div className="rounded-[22px] border overflow-hidden" style={{ borderColor: RULE, background: "#FFFFFF" }}>
            <div className="aspect-video overflow-hidden" style={{ background: THUMB_BG }}>
              <CourseThumbnail src={thumbnailSrc} alt={course.course_name} />
            </div>

            <div className="p-6 flex flex-col gap-5">
              <div>
                <p className="font-data text-[10px] uppercase tracking-widest mb-0.5" style={{ color: MUTE }}>
                  Course
                </p>
                <h3 className="font-display text-sm font-bold leading-snug" style={{ color: INK }}>
                  {course.course_name}
                </h3>
              </div>

              {typeof course.price === "number" && (
                <div className="flex items-center gap-2 pt-1">
                  <span className="font-data text-2xl font-bold" style={{ color: INK }}>
                    LKR {course.price.toLocaleString()}
                  </span>
                  {hasDiscount && (
                    <>
                      <span className="font-data text-sm line-through" style={{ color: MUTE }}>
                        LKR {course.original_price!.toLocaleString()}
                      </span>
                      <span
                        className="text-xs font-semibold px-1.5 py-0.5 rounded-md"
                        style={{ color: SIGNAL, background: "#EAF2ED" }}
                      >
                        {discountPct}% off
                      </span>
                    </>
                  )}
                </div>
              )}

              <Perforation />

              <div className="flex flex-col gap-3 text-xs">
                <div className="flex items-center justify-between">
                  <span style={{ color: MUTE }}>Instructor</span>
                  <div className="flex items-center gap-1.5">
                    <TeacherAvatar name={course.teacher_name || "Unknown"} size="sm" />
                    <span className="font-semibold" style={{ color: BODY }}>
                      {course.teacher_name || "Unknown"}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span style={{ color: MUTE }}>Grade</span>
                  <span
                    className={`font-semibold px-2 py-0.5 rounded-full border ${gs.bg} ${gs.text} ${gs.border} text-[11px]`}
                  >
                    Grade {course.grade}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span style={{ color: MUTE }}>Course code</span>
                  <span className="font-data font-medium tracking-wider text-[11px]" style={{ color: BODY }}>
                    {course.course_code}
                  </span>
                </div>

                {course.created_at && (
                  <div className="flex items-center justify-between">
                    <span style={{ color: MUTE }}>Published</span>
                    <span className="font-medium" style={{ color: BODY }}>
                      {new Date(course.created_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <span style={{ color: MUTE }}>Video lessons</span>
                  <span className="font-medium" style={{ color: course.video_url ? SIGNAL : MUTE }}>
                    {course.video_url ? "Included" : "Not available"}
                  </span>
                </div>
              </div>

              <div className="hidden lg:block">{CTAButtons}</div>

              <button
                onClick={handleShare}
                className="flex items-center justify-center gap-1.5 text-xs font-semibold transition-colors cursor-pointer focus-visible:outline-none"
                style={{ color: MUTE }}
                onMouseEnter={(e) => (e.currentTarget.style.color = SIGNAL)}
                onMouseLeave={(e) => (e.currentTarget.style.color = MUTE)}
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 16 16">
                  <path
                    d="M11.5 5.5a1.75 1.75 0 100-3.5 1.75 1.75 0 000 3.5zM4.5 9.75a1.75 1.75 0 100-3.5 1.75 1.75 0 000 3.5zM11.5 14a1.75 1.75 0 100-3.5 1.75 1.75 0 000 3.5z"
                    stroke="currentColor"
                    strokeWidth="1.3"
                  />
                  <path d="M6 8.4l4-2.15M6 7.25l4 2.15" stroke="currentColor" strokeWidth="1.3" />
                </svg>
                {shareCopied ? "Link copied" : "Share this course"}
              </button>

              <p className="font-data text-[10px] tracking-wide text-center" style={{ color: MUTE }}>
                Instant access · Secure checkout
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}