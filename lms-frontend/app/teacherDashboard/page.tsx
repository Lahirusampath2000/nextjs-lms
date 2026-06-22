import React, {useEffect, useState} from 'react'
import {useRouter} from "next/navigation";
import { getUser} from "@/lib/auth";
import api from "@/lib/axios";

interface Course{
  id: number;
  course_name: string;
  course_code: string;
  description: string;
  grade: string;
  thumbnail_url: string | null;
  video_url: string | null;
  created_at: string;
}

function TeacherDashboard() {
  const router = useRouter();
  const user = getUser();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");








  return (
    <div>page</div>
  )
}

export default TeacherDashboard