"use client";
import React, { useState } from "react";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";

interface AddCourseFormProps{
    teacherId:string;
}

const STEP_LABELS =["Details", "Media", "Confirm"] //form step labels defined here