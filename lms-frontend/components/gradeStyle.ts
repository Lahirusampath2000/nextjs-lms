export interface GradeStyle {
  bg: string;
  text: string;
  dot: string;
  border: string;
}

const gradeStyleMap: Record<string, GradeStyle> = {
  "1":  { bg: "bg-violet-50",  text: "text-violet-700",  dot: "bg-violet-400",  border: "border-violet-100"  },
  "2":  { bg: "bg-indigo-50",  text: "text-indigo-700",  dot: "bg-indigo-400",  border: "border-indigo-100"  },
  "3":  { bg: "bg-blue-50",    text: "text-blue-700",    dot: "bg-blue-400",    border: "border-blue-100"    },
  "4":  { bg: "bg-fuchsia-50", text: "text-fuchsia-700", dot: "bg-fuchsia-400", border: "border-fuchsia-100" },
  "5":  { bg: "bg-purple-50",  text: "text-purple-700",  dot: "bg-purple-400",  border: "border-purple-100"  },
  "6":  { bg: "bg-violet-50",  text: "text-violet-700",  dot: "bg-violet-400",  border: "border-violet-100"  },
  "7":  { bg: "bg-indigo-50",  text: "text-indigo-700",  dot: "bg-indigo-400",  border: "border-indigo-100"  },
  "8":  { bg: "bg-blue-50",    text: "text-blue-700",    dot: "bg-blue-400",    border: "border-blue-100"    },
  "9":  { bg: "bg-fuchsia-50", text: "text-fuchsia-700", dot: "bg-fuchsia-400", border: "border-fuchsia-100" },
  "10": { bg: "bg-purple-50",  text: "text-purple-700",  dot: "bg-purple-400",  border: "border-purple-100"  },
  "11": { bg: "bg-violet-50",  text: "text-violet-700",  dot: "bg-violet-400",  border: "border-violet-100"  },
  "12": { bg: "bg-indigo-50",  text: "text-indigo-700",  dot: "bg-indigo-400",  border: "border-indigo-100"  },
};

const fallbackGrade: GradeStyle = {
  bg: "bg-indigo-50",
  text: "text-indigo-700",
  dot: "bg-indigo-400",
  border: "border-indigo-100",
};

export const getGradeStyle = (grade: string): GradeStyle =>
  gradeStyleMap[grade] ?? fallbackGrade;