"use client"
import React from 'react'
import {useRouter} from "next/navigation";

function AuthOption() {
    const router = useRouter();



  return (
    <div className="min-h-screen flex font-sans overflow-hidden">
        {/* ── Left Panel student section── */}
        <div className="relative w-1/2 flex flex-col items-center justify-center px-12 py-16 bg-gradient-to-br from-indigo-50 via-indigo-100 to-violet-100 group transition-all duration-500 hover:from-indigo-100 hover:via-indigo-200 hover:to-violet-200">
            {/* ── decorative bubbles ── */}
            <div className="absolute -top-16 -left-16 w-64 h-64 rounded-full bg-indigo-200/40 pointer-events-none" />
            <div className="absolute bottom-8 right-8 w-40 h-40 rounded-full bg-violet-200/30 pointer-events-none" />

            {/* ── divider lines ── */}
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-white/20 to-white/80 pointer-events-none" />
            <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-white/20 to-white/80 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-white/20 to-white/80 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-full h-1 bg-gradient-to-r from-white/20 to-white/80 pointer-events-none" />
            <div className="relative flex flex-col items-center text-center gap-6 z-10">    
            <div className="w-40 h-40 rounded-2xl bg-white shadow-md flex items-center justify-center overflow-hidden group-hover:scale-110 transition-transform duration-300">
                <img
                    src="/authOption/student-join.jpg"
                    alt="Student Icon"
                    className="w-30 h-30 object-contain"
                />
            </div>
             <div>
                <h2 className="text-2xl font-bold text-indigo-950 tracking-tight mb-2">
                Join as a Student
                </h2>
                <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
                Access curated courses, track your progress, and learn at your own pace.
                </p>
            </div>
            <button
                className="bg-indigo-950 text-white py-2 px-4 rounded-md hover:bg-indigo-800 transition-colors duration-300"
                onClick={()=>router.push("auth/register?role=student")}
            >
                Join as a Student 
            </button>
            
            </div>

        </div>
        {/* ── Right Panel teacher section── */}
        <div className="relative w-1/2 flex flex-col items-center justify-center px-12 py-16 bg-gradient-to-br from-violet-50 via-purple-100 to-fuchsia-100 group transition-all duration-500 hover:from-violet-100 hover:via-purple-200 hover:to-fuchsia-200">
        {/* ── decorative bubbles ── */}
        <div className="absolute -top-12 -right-12 w-56 h-56 rounded-full bg-fuchsia-200/30 pointer-events-none" />
        <div className="absolute bottom-4 left-4 w-44 h-44 rounded-full bg-violet-200/30 pointer-events-none" />
 

        </div>


    </div>
  )
}

export default AuthOption