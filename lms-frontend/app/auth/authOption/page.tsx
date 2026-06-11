"use client"
import React from 'react'
import {useRouter} from "next/navigation";

function AuthOption() {
    const router = useRouter();



  return (
    <div className="min-h-screen flex font-sans overflow-hidden">
        {/* ── Left Panel ── */}
        <div className="relative w-1/2 flex flex-col items-center justify-center px-12 py-16 bg-gradient-to-br from-indigo-50 via-indigo-100 to-violet-100 group transition-all duration-500 hover:from-indigo-100 hover:via-indigo-200 hover:to-violet-200">
            {/* ── decorative bubbles ── */}
            <div className="absolute -top-16 -left-16 w-64 h-64 rounded-full bg-indigo-200/40 pointer-events-none" />
            <div className="absolute bottom-8 right-8 w-40 h-40 rounded-full bg-violet-200/30 pointer-events-none" />

        </div>


    </div>
  )
}

export default AuthOption