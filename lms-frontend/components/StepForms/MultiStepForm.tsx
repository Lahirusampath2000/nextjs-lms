"use client";
import React, { useState } from "react";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import api from "@/lib/axios";

const STEP_LABELS = ["Details", "Media", "Confirm"];

// ---- Design tokens — match CourseCard.tsx / AllCourse.tsx / course detail page ----
const INK = "#14213D";
const PAPER = "#FBFAF7";
const RULE = "#E7E4DC";
const MUTE = "#9A968A";
const BODY = "#6B675C";
const SIGNAL = "#2F6B4F";
const ERROR_BG = "#FBEDE9";
const ERROR_BORDER = "#F0D5CC";
const ERROR_TEXT = "#B4432F";
const SUCCESS_BG = "#EAF2ED";
const SUCCESS_BORDER = "#CFE0D5";

/** Step tracker built from the same "stamp" motif as the course grade badge,
 *  so the form reads as part of the same product as the catalogue. */
function StepStamp({
  number,
  label,
  state,
}: {
  number: number;
  label: string;
  state: "done" | "current" | "upcoming";
}) {
  const look =
    state === "done"
      ? { bg: SIGNAL, border: SIGNAL, text: PAPER }
      : state === "current"
      ? { bg: "#FFFFFF", border: INK, text: INK }
      : { bg: "#F1EEE5", border: "#F1EEE5", text: MUTE };

  return (
    <div className="flex flex-col items-center gap-1.5">
      <div
        className="relative w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300"
        style={{ background: look.bg, border: `2px solid ${look.border}` }}
      >
        {state === "done" && (
          <div className="absolute inset-[3px] rounded-full border border-dashed" style={{ borderColor: `${look.text}55` }} />
        )}
        {state === "done" ? (
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 16 16">
            <path d="M3 8l3.5 3.5L13 5" stroke={look.text} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) : (
          <span className="font-data text-xs font-semibold" style={{ color: look.text }}>
            {number}
          </span>
        )}
      </div>
      <span
        className="font-data text-[10px] font-medium uppercase tracking-widest"
        style={{ color: state === "upcoming" ? MUTE : INK }}
      >
        {label}
      </span>
    </div>
  );
}

function MultiStepForm() {
  const [step, setStep] = useState(1); // form step state
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const [formData, setFormData] = useState({
    course_name: "",
    description: "",
    grade: "",
  });

  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> // handle form input change
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const isStepValid = formData.course_name.trim() !== "" && formData.grade.trim() !== ""; // validate step1 form

  const nextStep = () => {
    if (step === 1 && !isStepValid) {
      setErrorMsg("Course name and grade are required."); // throw error if name and grade empty
      return;
    }
    setErrorMsg("");
    if (step < 3) setStep(step + 1); // if success go to next step
  };

  const prevStep = () => {
    setErrorMsg("");
    if (step > 1) setStep(step - 1); // redirect previous step if not error
  };

  // handle submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setErrorMsg("");
    setSuccessMsg("");
    setSubmitting(true);

    try {
      const payload = new FormData();
      payload.append("course_name", formData.course_name);
      payload.append("description", formData.description);
      payload.append("grade", formData.grade);

      if (videoFile) {
        payload.append("video", videoFile);
      }

      if (thumbnailFile) {
        payload.append("thumbnail", thumbnailFile);
      }

      const res = await api.post(`${process.env.NEXT_PUBLIC_API_URL}/api/courses`, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setSuccessMsg(`Course published. Course code: ${res.data.course?.course_code}`);

      setFormData({
        course_name: "",
        description: "",
        grade: "",
      });

      setVideoFile(null);
      setThumbnailFile(null);
      setStep(1);
    } catch (error: any) {
      setErrorMsg(error.response?.data?.message || "Failed to create course. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center font-sans px-4 py-12" style={{ background: PAPER }}>
      {/* Self-contained font import — matches AllCourse.tsx / course detail page. */}
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=IBM+Plex+Mono:wght@500;600&display=swap");
        .font-display {
          font-family: "Space Grotesk", ui-sans-serif, system-ui, sans-serif;
        }
        .font-data {
          font-family: "IBM Plex Mono", ui-monospace, monospace;
        }
      `}</style>

      <div
        className="relative z-10 w-full max-w-lg rounded-[22px] border p-8 md:p-9"
        style={{ borderColor: RULE, background: "#FFFFFF", boxShadow: "0 28px 54px -30px rgba(20,33,61,0.25)" }}
      >
        <p className="font-data text-[11px] font-medium uppercase tracking-[0.22em]" style={{ color: SIGNAL }}>
          Teacher tools
        </p>
        <h2 className="font-display text-2xl font-semibold tracking-tight mt-1.5" style={{ color: INK }}>
          Add a new course
        </h2>
        <p className="text-sm mt-1.5 mb-7" style={{ color: BODY }}>
          {step === 1 && "Tell students what they'll learn."}
          {step === 2 && "Add a video and a thumbnail — both optional."}
          {step === 3 && "Review everything before you publish."}
        </p>

        {/* Step progress */}
        <div className="flex items-center mb-8">
          {STEP_LABELS.map((label, idx) => {
            const stepNum = idx + 1;
            const state = step > stepNum ? "done" : step === stepNum ? "current" : "upcoming";
            return (
              <React.Fragment key={label}>
                <StepStamp number={stepNum} label={label} state={state} />
                {stepNum < STEP_LABELS.length && (
                  <div
                    className="flex-1 h-px mx-2 mb-5 transition-colors duration-300"
                    style={{ background: step > stepNum ? SIGNAL : RULE }}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>

        {errorMsg && (
          <p
            className="text-sm mb-5 rounded-xl p-3"
            style={{ color: ERROR_TEXT, background: ERROR_BG, border: `1px solid ${ERROR_BORDER}` }}
          >
            {errorMsg}
          </p>
        )}
        {successMsg && (
          <p
            className="text-sm mb-5 rounded-xl p-3"
            style={{ color: SIGNAL, background: SUCCESS_BG, border: `1px solid ${SUCCESS_BORDER}` }}
          >
            {successMsg}
          </p>
        )}

        {step === 1 && <Step1 formData={formData} handleChange={handleChange} />}

        {step === 2 && (
          <Step2
            videoFile={videoFile}
            thumbnailFile={thumbnailFile}
            setVideoFile={setVideoFile}
            setThumbnailFile={setThumbnailFile}
          />
        )}

        {step === 3 && <Step3 formData={formData} videoFile={videoFile} thumbnailFile={thumbnailFile} />}

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          {step > 1 ? (
            <button
              onClick={prevStep}
              disabled={submitting}
              className="h-11 px-5 rounded-xl text-sm font-semibold border transition-all duration-200 disabled:opacity-50 cursor-pointer active:scale-[0.98]"
              style={{ background: "#FFFFFF", color: INK, borderColor: RULE }}
            >
              Previous
            </button>
          ) : (
            <span />
          )}

          {step < 3 ? (
            <button
              onClick={nextStep}
              className="h-11 px-6 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer active:scale-[0.98] hover:brightness-110"
              style={{ background: INK, color: PAPER }}
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="h-11 px-6 rounded-xl text-sm font-semibold transition-all duration-200 disabled:opacity-50 cursor-pointer active:scale-[0.98] hover:brightness-110"
              style={{ background: INK, color: PAPER }}
            >
              {submitting ? "Publishing…" : "Publish course"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default MultiStepForm;