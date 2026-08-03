import React, { useEffect, useState } from "react";
import { HiOutlineVideoCamera } from "react-icons/hi2";
import { getGradeStamp } from "@/components/gradeStyle";

interface Step3Props {
  formData: {
    course_name: string;
    description: string;
    grade: string;
  };
  videoFile: File | null;
  thumbnailFile: File | null;
}

// ---- Design tokens — match CourseCard.tsx / AllCourse.tsx / course detail page ----
const INK = "#14213D";
const PAPER = "#FBFAF7";
const RULE = "#E7E4DC";
const MUTE = "#9A968A";
const BODY = "#6B675C";
const THUMB_BG = "#F1EEE5";
const SIGNAL = "#2F6B4F";

function useObjectUrl(file: File | null) {
  const [url, setUrl] = useState<string | null>(null);
  useEffect(() => {
    if (!file) {
      setUrl(null);
      return;
    }
    const next = URL.createObjectURL(file);
    setUrl(next);
    return () => URL.revokeObjectURL(next);
  }, [file]);
  return url;
}

function Row({ label, value, valueColor }: { label: string; value: string; valueColor?: string }) {
  return (
    <div className="flex items-center justify-between text-xs py-2 border-b last:border-b-0" style={{ borderColor: "#EDEAE1" }}>
      <span style={{ color: MUTE }}>{label}</span>
      <span className="font-semibold truncate max-w-[65%] text-right" style={{ color: valueColor ?? BODY }}>
        {value}
      </span>
    </div>
  );
}

function Step3({ formData, videoFile, thumbnailFile }: Step3Props) {
  const thumbnailUrl = useObjectUrl(thumbnailFile);
  const stamp = getGradeStamp(formData.grade || "1");

  return (
    <div className="space-y-5">
      <p className="text-sm" style={{ color: BODY }}>
        This is how your course will appear in the catalogue.
      </p>

      {/* Card preview — mirrors CourseCard.tsx */}
      <div className="rounded-[20px] border overflow-hidden" style={{ borderColor: RULE, background: "#FFFFFF" }}>
        <div className="relative h-36 overflow-hidden" style={{ background: THUMB_BG }}>
          {thumbnailUrl ? (
            <img src={thumbnailUrl} alt="Thumbnail preview" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <svg className="w-9 h-9" style={{ color: "#D9D4C6" }} fill="none" viewBox="0 0 32 32">
                <rect x="3" y="5" width="26" height="20" rx="3" stroke="currentColor" strokeWidth="1.5" />
                <path d="M8 13h16M8 19h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
          )}

          <div
            className="absolute top-3 left-3 w-11 h-11 rounded-full flex flex-col items-center justify-center"
            style={{ background: stamp.bg, border: "2px solid rgba(251,250,247,0.95)" }}
          >
            <span className="font-data text-[9px] font-bold leading-none" style={{ color: stamp.text }}>
              {formData.grade || "—"}
            </span>
          </div>

          {videoFile && (
            <div
              className="absolute top-3 right-3 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold"
              style={{ background: "rgba(20,33,61,0.75)", color: PAPER }}
            >
              <HiOutlineVideoCamera className="w-3 h-3" />
              Video
            </div>
          )}
        </div>

        <div className="p-4 flex flex-col gap-1.5">
          <span className="font-data text-[10px] tracking-widest uppercase" style={{ color: MUTE }}>
            Course code · auto-generated
          </span>
          <h3 className="font-display text-base font-semibold leading-snug" style={{ color: INK }}>
            {formData.course_name || "Untitled course"}
          </h3>
          <p className="text-xs leading-relaxed line-clamp-2" style={{ color: BODY }}>
            {formData.description || "No description added yet."}
          </p>
        </div>
      </div>

      {/* Raw details */}
      <div className="rounded-2xl border px-4" style={{ borderColor: RULE, background: "#F6F4EE" }}>
        <Row label="Grade" value={formData.grade ? `Grade ${formData.grade}` : "Not set"} />
        <Row label="Video" value={videoFile ? videoFile.name : "None attached"} valueColor={videoFile ? SIGNAL : BODY} />
        <Row
          label="Thumbnail"
          value={thumbnailFile ? thumbnailFile.name : "None attached"}
          valueColor={thumbnailFile ? SIGNAL : BODY}
        />
      </div>

      <p className="text-xs leading-relaxed" style={{ color: MUTE }}>
        Your course code is assigned automatically the moment you publish.
      </p>
    </div>
  );
}

export default Step3;