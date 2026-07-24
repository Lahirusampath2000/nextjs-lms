export default function LockedVideo() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4 bg-gradient-to-br from-gray-900 via-indigo-950 to-gray-900 relative">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.12) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      <div className="relative flex flex-col items-center gap-3 text-center px-8">
        <div className="w-14 h-14 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
          <svg className="w-7 h-7 text-white/70" fill="none" viewBox="0 0 28 28">
            <rect x="7" y="12" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
            <path d="M10 12V9a4 4 0 018 0v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
        <div>
          <p className="text-white font-semibold text-sm">Video locked</p>
          <p className="text-white/50 text-xs mt-1 max-w-[220px] leading-relaxed">
            Enroll in this course to watch all lessons.
          </p>
        </div>
      </div>
    </div>
  );
}