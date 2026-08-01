"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import api from "@/lib/axios";
import SectionHeading from "@/components/SectionHeading";
import { INK, PAPER, RULE, MUTE, THUMB_BG, CARD_HOVER_SHADOW } from "@/lib/theme";

interface Teacher {
  id: number;
  name: string;
  subject?: string;
  avatar?: string;
}

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase() ?? "")
    .join("");
}

function TeacherCardSkeleton() {
  return (
    <div className="rounded-[22px] border overflow-hidden animate-pulse" style={{ borderColor: RULE }}>
      <div className="h-40" style={{ background: THUMB_BG }} />
      <div className="p-4 flex flex-col gap-2">
        <div className="h-3.5 w-2/3 rounded-full" style={{ background: "#EDEAE1" }} />
        <div className="h-3 w-1/2 rounded-full" style={{ background: "#EDEAE1" }} />
      </div>
    </div>
  );
}

function TeacherCard({ teacher }: { teacher: Teacher }) {
  return (
    <div
      className={`group rounded-[22px] border overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[${CARD_HOVER_SHADOW}]`}
      style={{ borderColor: RULE, background: "#FFFFFF" }}
    >
      <div className="relative h-40" style={{ background: THUMB_BG }}>
        {teacher.avatar ? (
          <Image
            src={teacher.avatar}
            alt={teacher.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="font-display text-2xl font-bold" style={{ color: INK }}>
              {getInitials(teacher.name)}
            </span>
          </div>
        )}
      </div>
      <div className="p-4">
        <p className="font-display text-sm font-bold" style={{ color: INK }}>
          {teacher.name}
        </p>
        <p className="font-data text-[10px] uppercase tracking-widest mt-1" style={{ color: MUTE }}>
          {teacher.subject || "Instructor"}
        </p>
      </div>
    </div>
  );
}

export default function Teachers() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get(`${process.env.NEXT_PUBLIC_API_URL}/api/teachers`)
      .then((res) => setTeachers(res.data.teachers || []))
      .catch((err) => console.error("Failed to load teachers:", err))
      .finally(() => setLoading(false));
  }, []);

  const featured = teachers.slice(0, 4);

  return (
    <section className="py-16 md:py-20 px-6 lg:px-12" style={{ background: PAPER }}>
      <div className="w-full max-w-7xl mx-auto">
        <SectionHeading
          eyebrow="Our team"
          title="Meet our expert tutors"
          action={{ label: "View all tutors", href: "#" }}
        />

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <TeacherCardSkeleton key={i} />
            ))}
          </div>
        ) : featured.length === 0 ? (
          <p className="text-sm py-10 text-center" style={{ color: MUTE }}>
            No tutors to show yet.
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {featured.map((t) => (
              <TeacherCard key={t.id} teacher={t} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}