'use client'

import React from 'react'
import { useEffect, useState } from 'react'
import api from '../lib/axios'

interface teacherType{
    id:number;
    name:string;
    email:string;
    phone:string;
}

function Teachers() {

    const [teachers, setTeachers] = useState([]);

    const getTeachers=async()=>{
        try{
            const res=await api.get(`${process.env.NEXT_PUBLIC_API_URL}/api/teachers`);
            setTeachers(res.data.teachers);
        }catch(error){
            console.log(error);
        }
    }

    useEffect(()=>{
        getTeachers();
    },[])

  return (
    <div>Teachers</div>
  )
}

export default Teachers