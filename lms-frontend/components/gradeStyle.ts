export interface GradeStyle {
  bg: string;
  text: string;
  dot: string;
  border: string;
}

export interface GradeStamp {
  bg: string;
  text: string;
}

// Single source of truth for the four-accent theme — signal green /
// sunbeam / coral / ink — used for every grade indicator in the app:
// the circular stamp on CourseCard and the course detail hero, and the
// pill chip in list/meta rows. Keep the order below stable so a given
// grade always resolves to the same color everywhere.
const STAMP_PALETTE: GradeStamp[] = [
  { bg: "#2F6B4F", text: "#FBFAF7" }, // Signal green
  { bg: "#F0B429", text: "#14213D" }, // Sunbeam
  { bg: "#E8604C", text: "#FBFAF7" }, // Coral
  { bg: "#14213D", text: "#FBFAF7" }, // Ink
];

const PILL_PALETTE: GradeStyle[] = [
  { bg: "bg-[#EAF2ED]", text: "text-[#2F6B4F]", dot: "bg-[#2F6B4F]", border: "border-[#CFE0D5]" }, // Signal green
  { bg: "bg-[#FDF3DC]", text: "text-[#92650E]", dot: "bg-[#F0B429]", border: "border-[#F5DFA0]" }, // Sunbeam
  { bg: "bg-[#FCEAE7]", text: "text-[#C24632]", dot: "bg-[#E8604C]", border: "border-[#F4C6BC]" }, // Coral
  { bg: "bg-[#EEF0F4]", text: "text-[#14213D]", dot: "bg-[#14213D]", border: "border-[#D7DBE4]" }, // Ink
];

/** Deterministic index shared by both palettes so a grade never drifts between them. */
function gradeIndex(grade: string): number {
  const n = parseInt(grade, 10);
  if (Number.isFinite(n)) {
    return ((n % STAMP_PALETTE.length) + STAMP_PALETTE.length) % STAMP_PALETTE.length;
  }
  // Non-numeric grade labels still get a stable, deterministic color.
  const code = grade.charCodeAt(0) || 0;
  return code % STAMP_PALETTE.length;
}

export const getGradeStyle = (grade: string): GradeStyle =>
  PILL_PALETTE[gradeIndex(grade)] ?? PILL_PALETTE[3];

export const getGradeStamp = (grade: string): GradeStamp =>
  STAMP_PALETTE[gradeIndex(grade)] ?? STAMP_PALETTE[3];