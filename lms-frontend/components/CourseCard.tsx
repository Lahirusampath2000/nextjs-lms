"use client";
import { useRouter } from "next/navigation";
import { HiOutlineVideoCamera, HiStar, HiOutlineUser } from "react-icons/hi2";

export interface CourseCardProps {
  course: {
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
    // The following are render only if/when the API sends them, no fabricated data.
    price?: number;
    original_price?: number;
    rating?: number;
    rating_count?: number;
  };
}

// ---- Design tokens ----
const INK = "#14213D";
const PAPER = "#FBFAF7";
const RULE = "#E7E4DC";
const MUTE = "#9A968A";
const BODY = "#6B675C";
const THUMB_BG = "#F1EEE5";

const STAMP_PALETTE = [
  { bg: "#2F6B4F", text: "#FBFAF7" }, // Signal green
  { bg: "#F0B429", text: "#14213D" }, // Sunbeam
  { bg: "#E8604C", text: "#FBFAF7" }, // Coral
  { bg: "#14213D", text: "#FBFAF7" }, // Ink
];

function getStamp(grade: string) {
  const n = parseInt(grade, 10);
  const idx = Number.isFinite(n)
    ? ((n % STAMP_PALETTE.length) + STAMP_PALETTE.length) % STAMP_PALETTE.length
    : (grade.charCodeAt(0) || 0) % STAMP_PALETTE.length;
  return STAMP_PALETTE[idx];
}

export function CourseCardSkeleton() {
  return (
    <div
      className="rounded-[22px] border overflow-hidden animate-pulse"
      style={{ borderColor: RULE, background: "#FFFFFF" }}
    >
      <div className="h-56" style={{ background: THUMB_BG }} />
      <div className="p-5 flex flex-col gap-3">
        <div className="h-3 w-24 rounded-full" style={{ background: "#EDEAE1" }} />
        <div className="h-5 w-3/4 rounded-full" style={{ background: RULE }} />
        <div className="h-3 w-1/2 rounded-full" style={{ background: "#EDEAE1" }} />
        <div
          className="flex items-center justify-between pt-4 mt-2 border-t"
          style={{ borderColor: "#EDEAE1" }}
        >
          <div className="h-4 w-16 rounded-full" style={{ background: "#EDEAE1" }} />
          <div className="h-9 w-24 rounded-xl" style={{ background: "#EDEAE1" }} />
        </div>
      </div>
    </div>
  );
}

function RatingRow({ rating, count }: { rating: number; count?: number }) {
  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <HiStar
            key={i}
            className="w-3.5 h-3.5"
            style={{ color: i < Math.round(rating) ? "#F0B429" : "#E7E4DC" }}
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

export default function CourseCard({ course }: CourseCardProps) {
  const router = useRouter();
  const stamp = getStamp(course.grade);
  const hasDiscount =
    typeof course.price === "number" &&
    typeof course.original_price === "number" &&
    course.original_price > course.price;

  const handleBuyNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/AllCourse/${course.id}?action=buy`);
  };

  const goToDetails = () => router.push(`/AllCourse/${course.id}`);

  return (
    <div
      onClick={goToDetails}
      className="group relative rounded-[22px] border overflow-hidden flex flex-col cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_54px_-24px_rgba(20,33,61,0.35)]"
      style={{ borderColor: RULE, background: "#FFFFFF" }}
    >
      {/* Thumbnail */}
      <div className="relative h-56 overflow-hidden" style={{ background: THUMB_BG }}>
        {course.thumbnail_url ? (
          <img
            src={`${process.env.NEXT_PUBLIC_API_URL}${course.thumbnail_url}`}
            alt={course.course_name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg className="w-12 h-12" style={{ color: "#D9D4C6" }} fill="none" viewBox="0 0 32 32">
              <rect x="3" y="5" width="26" height="20" rx="3" stroke="currentColor" strokeWidth="1.5" />
              <path d="M8 13h16M8 19h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
        )}

        {/* Signature element: report-card grade stamp */}
        <div
          className="absolute top-4 left-4 z-10 w-[58px] h-[58px] rounded-full flex flex-col items-center justify-center shadow-[0_10px_20px_-6px_rgba(20,33,61,0.45)] transition-transform duration-300 group-hover:scale-[1.07]"
          style={{ background: stamp.bg, border: "3px solid rgba(251,250,247,0.95)" }}
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
            {course.grade}
          </span>
        </div>

        {course.video_url && (
          <div
            className="absolute top-4 right-4 inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold backdrop-blur-sm"
            style={{ background: "rgba(20,33,61,0.75)", color: PAPER }}
          >
            <HiOutlineVideoCamera className="w-3 h-3" />
            Video
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col gap-2.5 flex-1">
        <span
          className="font-data text-[10px] font-medium tracking-[0.2em] uppercase"
          style={{ color: MUTE }}
        >
          {course.course_code}
        </span>
        <h3
          className="font-display text-[19px] font-semibold leading-snug tracking-tight line-clamp-2 min-h-[3.1rem]"
          style={{ color: INK }}
        >
          {course.course_name}
        </h3>

        <div className="flex items-center gap-1.5 text-xs" style={{ color: BODY }}>
          <HiOutlineUser className="w-3.5 h-3.5 flex-shrink-0" style={{ color: MUTE }} />
          <span className="truncate">{course.teacher_name || "Unknown instructor"}</span>
        </div>

        {typeof course.rating === "number" && (
          <RatingRow rating={course.rating} count={course.rating_count} />
        )}

        {/* Footer: price + actions */}
        <div
          className="flex items-center justify-between gap-2 pt-4 mt-2 border-t"
          style={{ borderColor: "#EDEAE1" }}
        >
          <div className="flex items-baseline gap-1.5 min-w-0">
            {typeof course.price === "number" ? (
              <>
                <span className="font-data text-sm font-bold whitespace-nowrap" style={{ color: INK }}>
                  LKR {course.price.toLocaleString()}
                </span>
                {hasDiscount && (
                  <span
                    className="font-data text-xs line-through whitespace-nowrap"
                    style={{ color: MUTE }}
                  >
                    LKR {course.original_price!.toLocaleString()}
                  </span>
                )}
              </>
            ) : (
              <span className="text-xs font-semibold" style={{ color: MUTE }}>
                View for pricing
              </span>
            )}
          </div>
          <button
            onClick={handleBuyNow}
            className="flex-shrink-0 h-9 px-4 text-white text-xs font-semibold rounded-xl transition-all duration-200 active:scale-[0.97] hover:brightness-110 cursor-pointer"
            style={{ background: INK }}
          >
            Buy now
          </button>
        </div>
      </div>
    </div>
  );
}