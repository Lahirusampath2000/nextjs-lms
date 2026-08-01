"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";
import CourseCard, { CourseCardSkeleton } from "@/components/CourseCard";
import SectionHeading from "@/components/SectionHeading";
import { MUTE, THUMB_BG, PAPER } from "@/lib/theme";

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

export default function PopularCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get(`${process.env.NEXT_PUBLIC_API_URL}/api/courses`)
      .then((res) => setCourses(res.data.courses || []))
      .catch((err) => console.error("Failed to load courses:", err))
      .finally(() => setLoading(false));
  }, []);

  const featured = courses.slice(0, 4);

  return (
    <section className="py-16 md:py-20 px-6 lg:px-12" style={{ background: PAPER }}>
      <div className="w-full max-w-7xl mx-auto">
        <SectionHeading
          eyebrow="Course catalogue"
          title="Popular courses"
          action={{ label: "View all courses", href: "/AllCourse" }}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => <CourseCardSkeleton key={i} />)
          ) : featured.length === 0 ? (
            <div className="col-span-full flex flex-col items-center justify-center py-16 gap-3 text-center">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: THUMB_BG }}>
                <svg className="w-7 h-7" style={{ color: "#D9D4C6" }} fill="none" viewBox="0 0 32 32">
                  <rect x="4" y="5" width="24" height="20" rx="3" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M9 13h14M9 19h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
              <p className="text-sm font-medium" style={{ color: MUTE }}>
                No courses published yet.
              </p>
            </div>
          ) : (
            featured.map((course) => <CourseCard key={course.id} course={course} />)
          )}
        </div>

        <div className="sm:hidden mt-8 text-center">
          <a href="/AllCourse" className="text-sm font-semibold" style={{ color: "#2F6B4F" }}>
            View all courses →
          </a>
        </div>
      </div>
    </section>
  );
}