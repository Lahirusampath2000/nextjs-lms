"use client";
import {useState, useEffect} from "react";
import React from 'react'
import axios from "axios";

function Student() {

    const [students, setStudents] = useState([]);

    // get all students
    const getStudents=async()=>{
        try{
            const res=await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/students`);
            setStudents(res.data);
        }catch(error){
            console.log(error);
        }
    }

    useEffect(()=>{
        getStudents();
    },[])


  return (
    <div className="container mx-auto">
        <table className="table-auto">
            <thead>
                <tr>
                    <th className="px-4 py-2">Name</th>
                    <th className="px-4 py-2">Grade</th>
                    <th className="px-4 py-2">Email</th>
                    <th className="px-4 py-2">Phone no</th>
                    <th className="px-4 py-2">Action</th>
                </tr>

            </thead>
            <tbody>
                {students.map((value, key)=>(
                    <tr key={key}>
                     <td>{value.name}</td>
                    <td>{value.grade}</td>
                    <td>{value.email}</td>
                    <td>{value.phone }</td> 
                    <td></td>

                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}

export default Student