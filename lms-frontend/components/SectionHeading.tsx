import Link from "next/link";
import { HiOutlineArrowRight } from "react-icons/hi2";
import { INK, MUTE, SIGNAL } from "@/lib/theme";
interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  action?: { label: string; href: string };
}

/**
 * The eyebrow + title + optional "view all" link pattern repeated across
 * PopularCourses, FeaturesSection, and Teachers. Centralizing it means
 * every section's heading is guaranteed to share the same type scale,
 * spacing, and link treatment instead of drifting apart over time.
 */
export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  action,
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <div
      className={`flex ${centered ? "flex-col items-center text-center" : "items-end justify-between gap-6 flex-wrap"} mb-10`}
    >
      <div className={centered ? "max-w-xl" : ""}>
        <p
          className="font-data text-[11px] font-medium uppercase tracking-[0.22em] mb-2"
          style={{ color: SIGNAL }}
        >
          {eyebrow}
        </p>
        <h2
          className="font-display text-2xl md:text-3xl font-semibold tracking-tight"
          style={{ color: INK }}
        >
          {title}
        </h2>
        {description && (
          <p className="text-sm leading-relaxed mt-3" style={{ color: MUTE }}>
            {description}
          </p>
        )}
      </div>

      {action && !centered && (
        <Link
          href={action.href}
          className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold transition-all whitespace-nowrap group"
          style={{ color: SIGNAL }}
        >
          {action.label}
          <HiOutlineArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      )}
    </div>
  );
}