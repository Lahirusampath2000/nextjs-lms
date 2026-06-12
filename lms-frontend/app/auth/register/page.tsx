"use client";
import { useState } from "react";
import React from "react";
import { useSearchParams } from "next/navigation";
import api from "@/lib/axios";

function Register() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [grade, setGrade] = useState<string>("");

  //read role from query params
  const searchParams = useSearchParams();
  const role = searchParams.get("role")||"student";

  const register = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = { name, email, password, role, grade: role === "student" ? grade : null };
      const res = await api.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/register`,
        payload
      );
      alert("Registration successful");
      console.log(res.data);
    } catch (error:any) {
      console.error(error);
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex font-sans">

      {/* ── Left Panel ── */}
      <div className="hidden lg:flex w-[60%] bg-gradient-to-br from-indigo-50 via-indigo-100 to-violet-100 flex-col justify-center px-14 py-16 relative overflow-hidden">

        {/* Decorative blobs */}
        <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-indigo-200/40" />
        <div className="absolute -bottom-10 -right-10 w-52 h-52 rounded-full bg-violet-200/40" />

        {/* Headline */}
        <h2 className="text-3xl font-bold text-indigo-950 leading-snug tracking-tight mb-4 relative">
          Learn at your<br />own pace.
        </h2>
        <p className="text-sm text-gray-500 leading-relaxed mb-12 max-w-xs relative">
          Join thousands of students and unlock structured courses, live lessons, and progress tracking.
        </p>

        {/* Feature list */}
        <div className="flex flex-col gap-4 relative">
          {[
            { icon: "📚", text: " curated courses" },
            { icon: "🎯", text: "Personalised learning paths" },
            { icon: "📊", text: "Track your progress" },
          ].map((f) => (
            <div key={f.text} className="flex items-center gap-3">
              <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center text-base shadow-sm">
                {f.icon}
              </div>
              <span className="text-sm font-medium text-gray-700">{f.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Right Form Panel ── */}
      <div className="flex-1 bg-white flex items-center justify-center px-8 py-16">
        <div className="w-full max-w-sm">

          {/* Header */}
          <h1 className="text-xl font-bold text-gray-900 tracking-tight mb-1">
            Create your account
          </h1>
          <p className="text-sm text-gray-500 mb-8">
            Already have one?{" "}
            <a href="/login" className="text-indigo-600 font-medium hover:underline">
              Sign in
            </a>
          </p>

          <form onSubmit={register} className="flex flex-col gap-4">

            {/* Name */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-gray-600">Full name</label>
              <input
                type="text"
                placeholder="Alex Johnson"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="h-10 px-3 text-sm bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder:text-gray-400 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 focus:bg-white transition-all"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-gray-600">Email address</label>
              <input
                type="email"
                placeholder="alex@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-10 px-3 text-sm bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder:text-gray-400 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 focus:bg-white transition-all"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-gray-600">Password</label>
              <input
                type="password"
                placeholder="Min. 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-10 px-3 text-sm bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder:text-gray-400 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 focus:bg-white transition-all"
              />
            </div>

            {/* Grade */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-gray-600">Grade</label>
              <select
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                required
                className="h-10 px-3 text-sm bg-gray-50 border border-gray-200 rounded-lg text-gray-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 focus:bg-white transition-all cursor-pointer appearance-none"
              >
                <option value="" disabled>Select your grade</option>
                {["Grade 6", "Grade 7", "Grade 8", "Grade 9", "Grade 10", "Grade 11", "Grade 12"].map((g) => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="mt-2 h-10 bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white text-sm font-semibold rounded-lg transition-all cursor-pointer"
            >
              Create account
            </button>

          </form>

          <p className="text-xs text-gray-400 text-center mt-5 leading-relaxed">
            By registering you agree to our{" "}
            <a href="#" className="text-indigo-500 hover:underline">Terms</a>{" "}
            and{" "}
            <a href="#" className="text-indigo-500 hover:underline">Privacy Policy</a>.
          </p>

        </div>
      </div>

    </div>
  );
}

export default Register;