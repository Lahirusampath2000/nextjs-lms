"use client";
import React, { useState } from "react";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import api from "@/lib/axios";

interface AddCourseFormProps{

}

const STEP_LABELS =["Details", "Media", "Confirm"] //form step labels defined here

function MultiStepForm() {
  const [step, setStep] = useState(1); //form step state
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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>  //handle form input change
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const isStepValid= formData.course_name.trim() !=="" && formData.grade.trim() !==""; //validate step1 form 

  const nextStep = ()=>{
    if(step === 1 && !isStepValid){
        setErrorMsg("course name and grade required")  //throw error if name and grade empty
        return;
    }
    setErrorMsg("")
    if(step<3) setStep(step+1)  //if success go to next step
  }

  const prevStep=()=>{
    setErrorMsg("")
    if(step>1)  setStep(step-1)  //redirect previous step if not error
  }

  //handle submit
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

    const res = await api.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/courses`,
      payload,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    setSuccessMsg(
      `Course created successfully. Course code: ${res.data.course?.course_code}`
    );

    setFormData({
      course_name: "",
      description: "",
      grade: "",
    });

    setVideoFile(null);
    setThumbnailFile(null);
    setStep(1);

  } catch (error: any) {
    setErrorMsg(
      error.response?.data?.message || "Failed to create course"
    );
  } finally {
    setSubmitting(false);
  }
};

return (
    <div className="min-h-screen flex items-center justify-center font-sans relative overflow-hidden bg-gradient-to-br from-indigo-50 via-indigo-100 to-violet-100 px-4 py-12">
      {/* ── decorative bubbles ── */}
      <div className="absolute -top-16 -left-16 w-64 h-64 rounded-full bg-indigo-200/40 pointer-events-none" />
      <div className="absolute bottom-8 right-8 w-56 h-56 rounded-full bg-fuchsia-200/30 pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-40 h-40 rounded-full bg-violet-200/30 pointer-events-none" />
 
      <div className="relative z-10 w-full max-w-md bg-white/90 backdrop-blur-sm rounded-2xl shadow-md p-8 border border-white/60">
        {/* ── header ── */}
        <h2 className="text-2xl font-bold text-indigo-950 tracking-tight mb-1">
          Add a New Course
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          {step === 1 && "Tell us about your course."}
          {step === 2 && "Upload a video and thumbnail."}
          {step === 3 && "Review everything before you publish."}
        </p>
 
        {/* ── step progress ── */}
        <div className="flex items-center mb-7">
          {STEP_LABELS.map((label, idx) => {
            const stepNum = idx + 1;
            const isComplete = step > stepNum;
            const isCurrent = step === stepNum;
 
            return (
              <React.Fragment key={label}>
                <div className="flex flex-col items-center gap-1.5">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-300 ${
                      isComplete
                        ? "bg-indigo-950 text-white"
                        : isCurrent
                        ? "bg-white text-indigo-950 border-2 border-indigo-950"
                        : "bg-indigo-100 text-indigo-300"
                    }`}
                  >
                    {isComplete ? (
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    ) : (
                      stepNum
                    )}
                  </div>
                  <span
                    className={`text-[11px] font-medium ${
                      isCurrent ? "text-indigo-950" : "text-gray-400"
                    }`}
                  >
                    {label}
                  </span>
                </div>
                {stepNum < STEP_LABELS.length && (
                  <div
                    className={`flex-1 h-0.5 mx-2 mb-4 rounded-full transition-all duration-300 ${
                      step > stepNum ? "bg-indigo-950" : "bg-indigo-100"
                    }`}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
 
        {errorMsg && (
          <p className="text-sm text-red-600 mb-4 bg-red-50 border border-red-100 rounded-lg p-2.5">
            {errorMsg}
          </p>
        )}
        {successMsg && (
          <p className="text-sm text-emerald-700 mb-4 bg-emerald-50 border border-emerald-100 rounded-lg p-2.5">
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
 
        {step === 3 && (
          <Step3
            formData={formData}
            videoFile={videoFile}
            thumbnailFile={thumbnailFile}
          />
        )}
 
        {/* ── navigation ── */}
        <div className="flex justify-between mt-7">
          {step > 1 ? (
            <button
              onClick={prevStep}
              disabled={submitting}
              className="py-2 px-4 rounded-md text-indigo-950 font-medium border border-indigo-200 hover:bg-indigo-50 transition-colors duration-300 disabled:opacity-50 cursor-pointer"
            >
              Previous
            </button>
          ) : (
            <span />
          )}
 
          {step < 3 ? (
            <button
              onClick={nextStep}
              className="bg-indigo-950 text-white py-2 px-5 rounded-md hover:bg-indigo-800 transition-colors duration-300 cursor-pointer"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="bg-indigo-950 text-white py-2 px-5 rounded-md hover:bg-indigo-800 transition-colors duration-300 disabled:opacity-50 cursor-pointer"
            >
              {submitting ? "Submitting..." : "Submit"}
            </button>
          )}
        </div>
      </div>
    </div>
  );


}

export default MultiStepForm