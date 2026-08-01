"use client";

import { useState } from "react";
import { HiOutlineEnvelope } from "react-icons/hi2";
import { INK } from "@/lib/theme";

export default function NewsletterCTA() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    // TODO: wire to your newsletter/subscription API
    setSubmitted(true);
    setEmail("");
  };

  return (
    <section className="px-6 lg:px-12">
      <div className="w-full max-w-7xl mx-auto py-4">
        <div
          className="relative overflow-hidden rounded-[28px] px-8 py-12 md:px-14 md:py-14 flex flex-col md:flex-row items-center justify-between gap-6"
          style={{ background: "linear-gradient(120deg, #14213D 0%, #1C3B32 55%, #2F6B4F 100%)" }}
        >
          <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-white/10 pointer-events-none" />
          <div className="absolute -bottom-12 right-10 w-48 h-48 rounded-full bg-white/10 pointer-events-none" />

          <div className="relative flex items-center gap-4 text-center md:text-left flex-col md:flex-row">
            <span className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center flex-shrink-0">
              <HiOutlineEnvelope className="w-6 h-6 text-white" />
            </span>
            <div>
              <h3 className="font-display text-xl md:text-2xl font-bold text-white tracking-tight">
                Stay updated
              </h3>
              <p className="text-sm text-white/70 mt-1 max-w-sm">
                Subscribe for new courses, past papers, and platform updates — no spam.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="relative flex w-full md:w-auto gap-2 max-w-md">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 h-11 px-4 rounded-xl bg-white/95 text-sm text-gray-800 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-white/60 focus-visible:outline-none"
            />
            <button
              type="submit"
              className="h-11 px-5 text-sm font-semibold rounded-xl transition-all duration-200 whitespace-nowrap cursor-pointer active:scale-[0.98] hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              style={{ background: "#FBFAF7", color: INK }}
            >
              {submitted ? "Subscribed ✓" : "Subscribe"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}