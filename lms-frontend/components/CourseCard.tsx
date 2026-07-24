"use client";
import { useRouter } from "next/navigation";
import { getGradeStyle } from "./gradeStyle";

export interface CourseCardProps {
  course: {
    id: number;
    teacher_id: number;
    course_name: string;
    course_code: string;
    description: string;
    grade: string;
    video_url: string | null;
    thumbnail_url: string | null;
    created_at?: string;
  };
}

export function CourseCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden animate-pulse">
      <div className="h-44 bg-gray-100" />
      <div className="p-5 flex flex-col gap-3">
        <div className="h-3 w-20 bg-gray-100 rounded-full" />
        <div className="h-4 w-3/4 bg-gray-200 rounded-full" />
        <div className="h-3 w-full bg-gray-100 rounded-full" />
        <div className="h-3 w-5/6 bg-gray-100 rounded-full" />
        <div className="mt-2 h-9 bg-gray-100 rounded-lg" />
      </div>
    </div>
  );
}

export default function CourseCard({ course }: CourseCardProps) {
  const router = useRouter();
  const gs = getGradeStyle(course.grade);

  const handleBuyNow = () => {
    router.push(`/courses/${course.id}?action=buy`);
  };

  return (
    <div className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg hover:shadow-indigo-100/60 hover:-translate-y-1 transition-all duration-300 flex flex-col">
      <div className="relative h-44 overflow-hidden bg-gray-100">
        {course.thumbnail_url && (
          <img
            src={`${process.env.NEXT_PUBLIC_API_URL}${course.thumbnail_url}`}
            alt={course.course_name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        )}
        <div className={`absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${gs.bg} ${gs.text}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${gs.dot}`} />
          Grade {course.grade}
        </div>
      </div>

      <div className="p-5 flex flex-col gap-2 flex-1">
        <span className="text-[11px] font-mono font-medium text-gray-400 tracking-widest uppercase">
          {course.course_code}
        </span>
        <h3 className="text-base font-bold text-gray-900 leading-snug tracking-tight line-clamp-2">
          {course.course_name}
        </h3>
        <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 flex-1">
          {course.description || "No description provided for this course."}
        </p>
      </div>

      <div className="px-5 pb-5 flex gap-2">
        <button
          onClick={() => router.push(`/AllCourse/${course.id}`)}
          className="flex-1 h-9 bg-white hover:bg-gray-50 active:scale-[0.98] text-indigo-950 text-sm font-semibold rounded-lg border border-gray-200 hover:border-indigo-200 transition-all duration-200 cursor-pointer"
        >
          View Course
        </button>
        <button
          onClick={handleBuyNow}
          className="flex-1 h-9 bg-indigo-950 hover:bg-indigo-800 active:scale-[0.98] text-white text-sm font-semibold rounded-lg transition-all duration-200 cursor-pointer"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
}