"use client";

import { FaBook, FaFileAlt, FaQuestionCircle, FaChartBar, FaPlayCircle, FaTrophy, FaShieldAlt } from "react-icons/fa";

const features = [
  {
    icon: <FaBook className="w-5 h-5 text-indigo-600" />,
    title: "Structured courses",
    desc: "Expertly organised content with clear milestones so you always know where you're headed.",
  },
  {
    icon: <FaFileAlt className="w-5 h-5 text-indigo-600" />,
    title: "Past papers",
    desc: "Access a full library of past exam papers organised by subject, grade, and year for targeted revision.",
  },
  {
    icon: <FaQuestionCircle className="w-5 h-5 text-indigo-600" />,
    title: "Quizzes",
    desc: "Topic-by-topic quizzes with instant feedback so you can test yourself after every lesson.",
  },
  {
    icon: <FaChartBar className="w-5 h-5 text-indigo-600" />,
    title: "Performance analytics",
    desc: "Detailed breakdowns of scores, time spent, and weak areas — so you study smarter, not harder.",
  },
  {
    icon: <FaPlayCircle className="w-5 h-5 text-indigo-600" />,
    title: "Video tutorials",
    desc: "High-quality teacher-recorded videos you can pause, rewind, and rewatch as many times as you need.",
  },
  {
    icon: <FaTrophy className="w-5 h-5 text-indigo-600" />,
    title: "Student ranking",
    desc: "See how you stack up on the leaderboard by subject and grade — friendly competition that drives results.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-24 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">

        {/* heading */}
        <div className="text-center mb-16">
          <p className="text-xs font-semibold text-indigo-500 tracking-widest uppercase mb-3">
            Everything you need
          </p>
          <h2 className="text-4xl font-bold text-gray-900 tracking-tight">
            Built for how students actually learn
          </h2>
          <p className="mt-4 text-gray-500 max-w-xl mx-auto text-sm leading-relaxed">
            Every feature was designed around real classroom challenges — not just a feature checklist.
          </p>
        </div>

        {/* cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-md hover:-translate-y-1 transition-all duration-200 group"
            >
              <div className="w-11 h-11 bg-indigo-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-indigo-100 group-hover:scale-110 transition-all duration-200">
                {f.icon}
              </div>
              <h3 className="text-sm font-semibold text-gray-900 mb-2">{f.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}