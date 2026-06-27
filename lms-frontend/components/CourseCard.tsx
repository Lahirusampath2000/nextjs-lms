"use client";
import { useRouter } from "next/navigation";

const gradeStyleMap: Record<string, { bg: string; text: string; dot: string }> = {
  "1":  { bg: "bg-violet-50",  text: "text-violet-700",  dot: "bg-violet-400"  },
  "2":  { bg: "bg-indigo-50",  text: "text-indigo-700",  dot: "bg-indigo-400"  },
  "3":  { bg: "bg-blue-50",    text: "text-blue-700",    dot: "bg-blue-400"    },
  "4":  { bg: "bg-fuchsia-50", text: "text-fuchsia-700", dot: "bg-fuchsia-400" },
  "5":  { bg: "bg-purple-50",  text: "text-purple-700",  dot: "bg-purple-400"  },
  "6":  { bg: "bg-violet-50",  text: "text-violet-700",  dot: "bg-violet-400"  },
  "7":  { bg: "bg-indigo-50",  text: "text-indigo-700",  dot: "bg-indigo-400"  },
  "8":  { bg: "bg-blue-50",    text: "text-blue-700",    dot: "bg-blue-400"    },
  "9":  { bg: "bg-fuchsia-50", text: "text-fuchsia-700", dot: "bg-fuchsia-400" },
  "10": { bg: "bg-purple-50",  text: "text-purple-700",  dot: "bg-purple-400"  },
  "11": { bg: "bg-violet-50",  text: "text-violet-700",  dot: "bg-violet-400"  },
  "12": { bg: "bg-indigo-50",  text: "text-indigo-700",  dot: "bg-indigo-400"  },
};
const fallback = { bg: "bg-indigo-50", text: "text-indigo-700", dot: "bg-indigo-400" };
const gradeStyle = (grade: string) => gradeStyleMap[grade] ?? fallback;

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
  const gs = gradeStyle(course.grade);

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

      <div className="px-5 pb-5">
        <button
          onClick={() => router.push(`/courses/${course.id}`)}
          className="w-full h-9 bg-indigo-950 hover:bg-indigo-800 active:scale-[0.98] text-white text-sm font-semibold rounded-lg transition-all duration-200 cursor-pointer"
        >
          View Course
        </button>
      </div>
    </div>
  );
}