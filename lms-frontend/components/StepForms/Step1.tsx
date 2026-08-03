import React from "react";
import { getGradeStamp } from "@/components/gradeStyle";

interface Step1Props {
  formData: {
    course_name: string;
    description: string;
    grade: string;
  };
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
}

// ---- Design tokens — match CourseCard.tsx / AllCourse.tsx / course detail page ----
const INK = "#14213D";
const RULE = "#E7E4DC";
const MUTE = "#9A968A";
const BODY = "#6B675C";
const SIGNAL = "#2F6B4F";

const GRADES = Array.from({ length: 12 }, (_, i) => String(i + 1));

function Step1({ formData, handleChange }: Step1Props) {
  // Grade is picked from a row of stamps rather than a <select>, so
  // selecting reuses the same synthetic-event shape the parent expects.
  const selectGrade = (g: string) => {
    handleChange({
      target: { name: "grade", value: g },
    } as unknown as React.ChangeEvent<HTMLSelectElement>);
  };

  return (
    <div className="space-y-6">
      <div>
        <label
          htmlFor="course_name"
          className="block font-data text-[11px] font-medium uppercase tracking-[0.18em] mb-2"
          style={{ color: MUTE }}
        >
          Course name
        </label>
        <input
          id="course_name"
          type="text"
          name="course_name"
          value={formData.course_name}
          onChange={handleChange}
          placeholder="e.g. Introduction to Algebra"
          className="w-full h-11 px-3.5 bg-white border rounded-xl text-sm outline-none transition-colors placeholder:text-gray-400"
          style={{ borderColor: RULE, color: INK }}
          onFocus={(e) => (e.currentTarget.style.borderColor = SIGNAL)}
          onBlur={(e) => (e.currentTarget.style.borderColor = RULE)}
        />
      </div>

      <div>
        <label
          htmlFor="description"
          className="block font-data text-[11px] font-medium uppercase tracking-[0.18em] mb-2"
          style={{ color: MUTE }}
        >
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="What will students learn in this course?"
          rows={4}
          className="w-full p-3.5 bg-white border rounded-xl text-sm outline-none resize-none transition-colors placeholder:text-gray-400"
          style={{ borderColor: RULE, color: INK }}
          onFocus={(e) => (e.currentTarget.style.borderColor = SIGNAL)}
          onBlur={(e) => (e.currentTarget.style.borderColor = RULE)}
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-2.5">
          <span
            className="font-data text-[11px] font-medium uppercase tracking-[0.18em]"
            style={{ color: MUTE }}
          >
            Grade
          </span>
          {formData.grade && (
            <span className="text-xs font-semibold" style={{ color: SIGNAL }}>
              Grade {formData.grade} selected
            </span>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {GRADES.map((g) => {
            const active = formData.grade === g;
            const stamp = getGradeStamp(g);
            return (
              <button
                key={g}
                type="button"
                onClick={() => selectGrade(g)}
                aria-pressed={active}
                className="relative w-11 h-11 rounded-full flex items-center justify-center font-data text-sm font-bold transition-all duration-200 cursor-pointer"
                style={{
                  background: active ? stamp.bg : "#FFFFFF",
                  color: active ? stamp.text : BODY,
                  border: `2px solid ${active ? stamp.bg : RULE}`,
                  transform: active ? "scale(1.06)" : "scale(1)",
                }}
              >
                {active && (
                  <span
                    className="absolute inset-[4px] rounded-full border border-dashed pointer-events-none"
                    style={{ borderColor: `${stamp.text}55` }}
                  />
                )}
                {g}
              </button>
            );
          })}
        </div>
      </div>

      <p className="text-xs leading-relaxed pt-1" style={{ color: MUTE }}>
        A unique course code is generated automatically once you publish.
      </p>
    </div>
  );
}

export default Step1;