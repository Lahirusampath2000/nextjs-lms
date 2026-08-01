import {
  HiOutlineBookOpen,
  HiOutlineDocumentText,
  HiOutlineQuestionMarkCircle,
  HiOutlineChartBar,
  HiOutlinePlayCircle,
  HiOutlineTrophy,
} from "react-icons/hi2";
import { INK, PAPER, RULE, BODY, THUMB_BG, CARD_HOVER_SHADOW } from "@/lib/theme";
import SectionHeading from "@/components/SectionHeading";

const FEATURES = [
  {
    icon: HiOutlineBookOpen,
    title: "Structured courses",
    desc: "Expertly organised content with clear milestones so you always know where you're headed.",
  },
  {
    icon: HiOutlineDocumentText,
    title: "Past papers",
    desc: "A full library of past exam papers organised by subject, grade, and year for targeted revision.",
  },
  {
    icon: HiOutlineQuestionMarkCircle,
    title: "Quizzes",
    desc: "Topic-by-topic quizzes with instant feedback so you can test yourself after every lesson.",
  },
  {
    icon: HiOutlineChartBar,
    title: "Performance analytics",
    desc: "Detailed breakdowns of scores, time spent, and weak areas — so you study smarter, not harder.",
  },
  {
    icon: HiOutlinePlayCircle,
    title: "Video tutorials",
    desc: "High-quality teacher-recorded videos you can pause, rewind, and rewatch as many times as you need.",
  },
  {
    icon: HiOutlineTrophy,
    title: "Student ranking",
    desc: "See how you stack up on the leaderboard by subject and grade — friendly competition that drives results.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-20 md:py-24 px-6 lg:px-12" style={{ background: PAPER }}>
      <div className="w-full max-w-7xl mx-auto">
        <SectionHeading
          align="center"
          eyebrow="Everything you need"
          title="Built for how students actually learn"
          description="Every feature was designed around real classroom challenges — not just a feature checklist."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className={`group rounded-[22px] border p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[${CARD_HOVER_SHADOW}]`}
              style={{ borderColor: RULE, background: "#FFFFFF" }}
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-transform duration-200 group-hover:scale-105"
                style={{ background: THUMB_BG }}
              >
                <Icon className="w-5 h-5" style={{ color: INK }} />
              </div>
              <h3 className="font-display text-sm font-bold mb-2" style={{ color: INK }}>
                {title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: BODY }}>
                {desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}