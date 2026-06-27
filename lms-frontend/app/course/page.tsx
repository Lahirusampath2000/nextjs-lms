import React from 'react'
import MultiStepForm from '@/components/StepForms/MultiStepForm'
import { getUser } from "@/lib/auth";

const user = getUser();

function addCourse() {
  return (
    
          <MultiStepForm />
        
  )
}

export default addCourse