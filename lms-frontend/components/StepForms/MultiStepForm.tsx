"use client";
import React, { useState } from "react";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import api from "@/lib/axios";

interface AddCourseFormProps{
    teacherId:string;
}

const STEP_LABELS =["Details", "Media", "Confirm"] //form step labels defined here

function MultiStepForm({teacherId}:AddCourseFormProps) {
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

    payload.append("teacher_id", teacherId);
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


}