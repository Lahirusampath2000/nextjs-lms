"use client";
import { useState } from "react";
import React from "react";
import api from "@/lib/axios";
import { useRouter } from "next/navigation";
import { saveAuth } from "@/lib/auth";
import {
  HiOutlineEnvelope,
  HiOutlineLockClosed,
  HiOutlineEye,
  HiOutlineEyeSlash,
  HiOutlineShieldCheck,
  HiOutlineCalendarDays,
  HiOutlineTrophy,
  HiOutlineArrowRight,
} from "react-icons/hi2";
import { INK, PAPER, RULE, MUTE, BODY, SIGNAL, THUMB_BG } from "@/lib/theme";

function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await api.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/login`,
        { email, password }
      );
      const { token, user } = res.data;
      saveAuth(token, user);
      if (user.role === "teacher") {
        router.push("/teacherDashboard");
      } else {
        router.push("/studentDashboard");
      }
    } catch (error: any) {
      setError(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex font-sans" style={{ background: PAPER }}>
      {/* ── Left Brand Panel ── */}
      <div
        className="hidden lg:flex w-[48%] flex-col justify-center px-14 py-16 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #14213D 0%, #1C3B32 60%, #2F6B4F 100%)" }}
      >
        <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-white/10 pointer-events-none" />
        <div className="absolute -bottom-16 -right-10 w-56 h-56 rounded-full bg-white/10 pointer-events-none" />

        <p
          className="font-data text-[11px] font-medium uppercase tracking-[0.25em] mb-5 relative"
          style={{ color: "#8FD4B0" }}
        >
          Welcome back
        </p>

        <h2 className="font-display text-4xl font-bold text-white leading-[1.1] tracking-tight mb-4 relative max-w-sm">
          Pick up right where you left off.
        </h2>
        <p className="text-sm text-white/70 leading-relaxed mb-12 max-w-xs relative">
          Your courses, progress, and lessons are all waiting for you.
        </p>

        <div className="flex flex-col gap-4 relative">
          {[
            { icon: HiOutlineShieldCheck, text: "Your progress is saved" },
            { icon: HiOutlineCalendarDays, text: "Resume scheduled lessons" },
            { icon: HiOutlineTrophy, text: "View your achievements" },
          ].map((f) => (
            <div key={f.text} className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                <f.icon className="w-5 h-5 text-white" />
              </span>
              <span className="text-sm font-medium text-white/85">{f.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Right Form Panel ── */}
      <div className="flex-1 flex items-center justify-center px-8 py-16">
        <div className="w-full max-w-md">
          <div
            className="rounded-[24px] border p-10 sm:p-12"
            style={{
              borderColor: RULE,
              background: "#FFFFFF",
              boxShadow: "0 24px 60px -28px rgba(20,33,61,0.18)",
            }}
          >
            <p
              className="font-data text-[11px] font-medium uppercase tracking-[0.22em] mb-3"
              style={{ color: SIGNAL }}
            >
              Sign in
            </p>
            <h1 className="font-display text-3xl font-bold tracking-tight mb-9" style={{ color: INK }}>
              Welcome back
            </h1>

            <form onSubmit={login} className="flex flex-col gap-5">
              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium" style={{ color: BODY }}>
                  Email address
                </label>
                <div className="relative">
                  <HiOutlineEnvelope
                    className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                    style={{ color: MUTE }}
                  />
                  <input
                    type="email"
                    placeholder="alex@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full h-12 pl-10 pr-3 text-sm rounded-xl outline-none transition-all"
                    style={{ background: THUMB_BG, border: `1px solid ${RULE}`, color: INK }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = SIGNAL)}
                    onBlur={(e) => (e.currentTarget.style.borderColor = RULE)}
                  />
                </div>
              </div>

              {/* Password */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-medium" style={{ color: BODY }}>
                    Password
                  </label>
                  <a href="/forgot-password" className="text-xs hover:underline" style={{ color: SIGNAL }}>
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <HiOutlineLockClosed
                    className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                    style={{ color: MUTE }}
                  />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full h-12 pl-10 pr-10 text-sm rounded-xl outline-none transition-all"
                    style={{ background: THUMB_BG, border: `1px solid ${RULE}`, color: INK }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = SIGNAL)}
                    onBlur={(e) => (e.currentTarget.style.borderColor = RULE)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 cursor-pointer"
                    style={{ color: MUTE }}
                    tabIndex={-1}
                  >
                    {showPassword ? <HiOutlineEyeSlash className="w-4 h-4" /> : <HiOutlineEye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {error && (
                <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="mt-2 h-12 text-sm font-semibold rounded-xl transition-all duration-200 active:scale-[0.98] hover:brightness-110 inline-flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                style={{ background: INK, color: "#FFFFFF" }}
              >
                {loading ? "Signing in..." : "Sign in"}
                {!loading && <HiOutlineArrowRight className="w-4 h-4" />}
              </button>
            </form>

            <p className="text-sm text-center mt-6" style={{ color: MUTE }}>
              Don't have an account?{" "}
              <a href="/auth/authOption" className="font-semibold hover:underline" style={{ color: SIGNAL }}>
                Create account
              </a>
            </p>
          </div>

          <p className="text-xs text-center mt-6 leading-relaxed" style={{ color: MUTE }}>
            By signing in you agree to our{" "}
            <a href="#" className="hover:underline" style={{ color: SIGNAL }}>
              Terms
            </a>{" "}
            and{" "}
            <a href="#" className="hover:underline" style={{ color: SIGNAL }}>
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;