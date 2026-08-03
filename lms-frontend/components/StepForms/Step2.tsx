import React, { useEffect, useState } from "react";
import { HiOutlineCloudArrowUp, HiOutlineFilm, HiOutlineXMark } from "react-icons/hi2";

interface Step2Props {
  videoFile: File | null;
  thumbnailFile: File | null;
  setVideoFile: (file: File | null) => void;
  setThumbnailFile: (file: File | null) => void;
}

// ---- Design tokens — match CourseCard.tsx / AllCourse.tsx / course detail page ----
const INK = "#14213D";
const RULE = "#E7E4DC";
const MUTE = "#9A968A";
const SIGNAL = "#2F6B4F";
const THUMB_BG = "#F1EEE5";

function useObjectUrl(file: File | null) {
  const [url, setUrl] = useState<string | null>(null);
  useEffect(() => {
    if (!file) {
      setUrl(null);
      return;
    }
    const next = URL.createObjectURL(file);
    setUrl(next);
    return () => URL.revokeObjectURL(next);
  }, [file]);
  return url;
}

function formatSize(bytes: number) {
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function Step2({ videoFile, thumbnailFile, setVideoFile, setThumbnailFile }: Step2Props) {
  const thumbnailUrl = useObjectUrl(thumbnailFile);

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVideoFile(e.target.files?.[0] ?? null);
    e.target.value = "";
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setThumbnailFile(e.target.files?.[0] ?? null);
    e.target.value = "";
  };

  return (
    <div className="space-y-6">
      {/* Video */}
      <div>
        <label
          className="block font-data text-[11px] font-medium uppercase tracking-[0.18em] mb-2"
          style={{ color: MUTE }}
        >
          Course video
        </label>

        {videoFile ? (
          <div
            className="flex items-center gap-3 rounded-xl border p-3.5"
            style={{ borderColor: RULE, background: "#FFFFFF" }}
          >
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: THUMB_BG }}
            >
              <HiOutlineFilm className="w-5 h-5" style={{ color: SIGNAL }} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold truncate" style={{ color: INK }}>
                {videoFile.name}
              </p>
              <p className="font-data text-[11px]" style={{ color: MUTE }}>
                {formatSize(videoFile.size)}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setVideoFile(null)}
              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors cursor-pointer hover:brightness-95"
              style={{ background: THUMB_BG }}
              aria-label="Remove video"
            >
              <HiOutlineXMark className="w-4 h-4" style={{ color: MUTE }} />
            </button>
          </div>
        ) : (
          <label
            htmlFor="video-upload"
            className="flex flex-col items-center justify-center gap-2 rounded-[18px] border-2 border-dashed p-7 cursor-pointer transition-colors duration-200 hover:brightness-[0.98]"
            style={{ borderColor: RULE, background: THUMB_BG }}
          >
            <HiOutlineCloudArrowUp className="w-7 h-7" style={{ color: MUTE }} />
            <span className="text-sm font-semibold" style={{ color: INK }}>
              Click to upload a video
            </span>
            <span className="font-data text-[11px]" style={{ color: MUTE }}>
              MP4, MOV up to 200MB
            </span>
            <input
              id="video-upload"
              type="file"
              accept="video/*"
              onChange={handleVideoChange}
              className="hidden"
            />
          </label>
        )}
      </div>

      {/* Thumbnail */}
      <div>
        <label
          className="block font-data text-[11px] font-medium uppercase tracking-[0.18em] mb-2"
          style={{ color: MUTE }}
        >
          Course thumbnail
        </label>

        {thumbnailFile && thumbnailUrl ? (
          <div className="relative w-full h-40 rounded-[18px] overflow-hidden group" style={{ background: THUMB_BG }}>
            <img src={thumbnailUrl} alt="Thumbnail preview" className="w-full h-full object-cover" />
            <label
              htmlFor="thumbnail-upload"
              className="absolute inset-0 flex items-center justify-center bg-[#14213D]/0 group-hover:bg-[#14213D]/40 transition-colors duration-200 cursor-pointer"
            >
              <span className="text-white text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                Change thumbnail
              </span>
              <input
                id="thumbnail-upload"
                type="file"
                accept="image/*"
                onChange={handleThumbnailChange}
                className="hidden"
              />
            </label>
            <button
              type="button"
              onClick={() => setThumbnailFile(null)}
              className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full flex items-center justify-center transition-colors cursor-pointer hover:brightness-110"
              style={{ background: "rgba(20,33,61,0.75)" }}
              aria-label="Remove thumbnail"
            >
              <HiOutlineXMark className="w-4 h-4" style={{ color: "#FBFAF7" }} />
            </button>
          </div>
        ) : (
          <label
            htmlFor="thumbnail-upload"
            className="flex flex-col items-center justify-center gap-2 rounded-[18px] border-2 border-dashed p-7 cursor-pointer transition-colors duration-200 hover:brightness-[0.98]"
            style={{ borderColor: RULE, background: THUMB_BG }}
          >
            <svg className="w-7 h-7" style={{ color: MUTE }} fill="none" viewBox="0 0 24 24">
              <path
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14M14 8h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-sm font-semibold" style={{ color: INK }}>
              Click to upload a thumbnail
            </span>
            <span className="font-data text-[11px]" style={{ color: MUTE }}>
              PNG, JPG recommended
            </span>
            <input
              id="thumbnail-upload"
              type="file"
              accept="image/*"
              onChange={handleThumbnailChange}
              className="hidden"
            />
          </label>
        )}
      </div>

      <p className="text-xs leading-relaxed" style={{ color: MUTE }}>
        Both are optional — you can add or replace them later from the course dashboard.
      </p>
    </div>
  );
}

export default Step2;