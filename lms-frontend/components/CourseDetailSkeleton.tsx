const PAPER = "#FBFAF7";
const RULE = "#E7E4DC";
const THUMB_BG = "#F1EEE5";

export default function CourseDetailSkeleton() {
  return (
    <div className="min-h-screen animate-pulse" style={{ background: PAPER }}>
      <div className="h-14 border-b" style={{ borderColor: RULE }} />
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-10 grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
        <div className="lg:col-span-3 flex flex-col gap-7">
          <div className="rounded-[22px] aspect-video" style={{ background: THUMB_BG }} />

          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full flex-shrink-0" style={{ background: THUMB_BG }} />
            <div className="flex flex-col gap-2">
              <div className="h-3 w-20 rounded-full" style={{ background: THUMB_BG }} />
              <div className="h-3 w-16 rounded-full" style={{ background: THUMB_BG }} />
            </div>
          </div>

          <div className="h-8 w-3/4 rounded-lg" style={{ background: RULE }} />

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full" style={{ background: THUMB_BG }} />
            <div className="flex flex-col gap-2">
              <div className="h-2.5 w-14 rounded-full" style={{ background: THUMB_BG }} />
              <div className="h-3 w-24 rounded-full" style={{ background: THUMB_BG }} />
            </div>
          </div>

          <div className="flex gap-6 border-b pb-3" style={{ borderColor: RULE }}>
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-3 w-16 rounded-full" style={{ background: THUMB_BG }} />
            ))}
          </div>

          <div className="flex flex-col gap-2.5">
            <div className="h-3.5 w-full rounded-full" style={{ background: THUMB_BG }} />
            <div className="h-3.5 w-5/6 rounded-full" style={{ background: THUMB_BG }} />
            <div className="h-3.5 w-4/6 rounded-full" style={{ background: THUMB_BG }} />
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="rounded-[22px] border overflow-hidden" style={{ borderColor: RULE }}>
            <div className="aspect-video" style={{ background: THUMB_BG }} />
            <div className="p-6 flex flex-col gap-4">
              <div className="h-4 w-2/3 rounded-full" style={{ background: THUMB_BG }} />
              <div className="h-7 w-1/2 rounded-full" style={{ background: THUMB_BG }} />
              <div className="h-11 w-full rounded-xl" style={{ background: THUMB_BG }} />
              <div className="h-11 w-full rounded-xl" style={{ background: THUMB_BG }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}