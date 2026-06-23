"use client"
import React,{useEffect, useState} from 'react'
import api from "@/lib/axios";

function AllCourse() {

    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchCourses=async()=>{
        try{
            const res= await api.get(`${process.env.NEXT_PUBLIC_API_URL}/api/courses`);
            setCourses(res.data.courses);
            setLoading(false);
        }catch(err){
            setError("Failed to load courses.");
        }finally{
            setLoading(false);
        }
    }









  return (
    <div>AllCourse</div>
  )
}

export default AllCourse