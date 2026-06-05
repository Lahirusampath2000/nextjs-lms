"use client";
import {useState, useEffect} from "react";
import React from 'react'
import axios from "axios";

type studentType={
    id:number,
    name:string,
    grade:string,
    email:string,
    phone:string
}

function Student() {

    const [students, setStudents] = useState<studentType[]>([]);
    const [name, setName] = useState<string>("");
    const [grade, setGrade] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [phone, setPhone] = useState<string>("");

    // get all students
    const getStudents=async()=>{
        try{
            const res=await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/students`);
            setStudents(res.data.students);
        }catch(error){
            console.log(error);
        }
    }

    //add student
    const addStudent = async (e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        try{
            const payload={name,grade,email,phone};
            const res=await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/students`,payload);
            getStudents(); 
            setName("");    //reset form
            setGrade("");
            setEmail("");
            setPhone("");

        }catch(error){
            console.log(error);
        }
    }

    //delete student
    const deleteStudent=async(id:number)=>{
        try{
            const res=await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/students/${id}`);
            getStudents();

        }catch(error){
            console.log(error);
        }
    }



    //useEffect
    useEffect(()=>{
        getStudents();
    },[])
    


  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center gap-8">

    {/* FORM SECTION */}
    <div className="w-full max-w-2xl bg-white shadow-lg rounded-xl p-6 mt-8">
      <form className="space-y-4" onSubmit={addStudent}>

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
           className="w-full border border-gray-300 p-2 rounded text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
          placeholder="Grade"
           className="w-full border border-gray-300 p-2 rounded text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
           className="w-full border border-gray-300 p-2 rounded text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone"
           className="w-full border border-gray-300 p-2 rounded text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Save Student
        </button>

      </form>
    </div>

    {/* TABLE SECTION */}
    <div className="w-full max-w-5xl bg-white shadow-lg rounded-xl overflow-hidden">

      <table className="w-full border-collapse text-left">

        <thead className="bg-gray-100 border-b">
          <tr>
            <th className="px-6 py-4 text-sm font-semibold text-gray-700">Name</th>
            <th className="px-6 py-4 text-sm font-semibold text-gray-700">Grade</th>
            <th className="px-6 py-4 text-sm font-semibold text-gray-700">Email</th>
            <th className="px-6 py-4 text-sm font-semibold text-gray-700">Phone</th>
            <th className="px-6 py-4 text-sm font-semibold text-gray-700">Action</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {students.map((student, index) => (
            <tr key={index} className="hover:bg-gray-50 transition">
              <td className="px-6 py-4 text-gray-800">{student.name}</td>
              <td className="px-6 py-4 text-gray-800">{student.grade}</td>
              <td className="px-6 py-4 text-gray-800">{student.email}</td>
              <td className="px-6 py-4 text-gray-800">{student.phone}</td>
              <td className="px-6 py-4">
                {/* <button className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600">
                  Edit
                </button> */}
                <button className="px-3 ml-2 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600" 
                onClick={()=>deleteStudent(student.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}   
        </tbody>

      </table>
    </div>

  </div>
  )
}

export default Student