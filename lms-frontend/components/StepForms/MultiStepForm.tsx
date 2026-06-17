"use client";
import React, { useState } from "react";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";

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


}