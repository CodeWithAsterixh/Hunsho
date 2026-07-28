"use client";

// Browser-only (HTMLVideoElement, canvas). Intended for the frame extractor
// admin tool — a one-time content-production step per product video, not
// something that should run in every visitor's browser. SpinViewer and
// ScrollFrameStory both expect a pre-built array of frame URLs; this is
// what produces that array from a raw video file.

export interface ExtractFramesOptions {
  frameCount: number;
  /** Skip this fraction of the video at the start (0-1) — avoids fade-in/black frames */
  trimStart?: number;
  /** Skip this fraction of the video at the end (0-1) — avoids fade-out/black frames */
  trimEnd?: number;
  mimeType?: "image/jpeg" | "image/png" | "image/webp";
  /** 0-1, only applies to jpeg/webp */
  quality?: number;
  onProgress?: (completed: number, total: number) => void;
}

export interface ExtractedFrame {
  index: number;
  dataUrl: string;
  timestampSeconds: number;
}

export async function extractFramesFromVideo(
  source: File | Blob | string,
  options: ExtractFramesOptions,
): Promise<ExtractedFrame[]> {
  const {
    frameCount,
    trimStart = 0,
    trimEnd = 0,
    mimeType = "image/jpeg",
    quality = 0.9,
    onProgress,
  } = options;

  if (frameCount < 1) throw new Error("frameCount must be at least 1.");

  const isObjectSource = typeof source !== "string";
  const videoUrl = isObjectSource ? URL.createObjectURL(source) : source;

  const video = document.createElement("video");
  video.src = videoUrl;
  video.muted = true;
  video.playsInline = true;
  video.preload = "auto";
  if (!isObjectSource) video.crossOrigin = "anonymous"; // only matters for remote URLs, not local file uploads

  try {
    await new Promise<void>((resolve, reject) => {
      video.onloadedmetadata = () => resolve();
      video.onerror = () => reject(new Error("Failed to load video — check the file is a supported format."));
    });

    const duration = video.duration;
    if (!isFinite(duration) || duration <= 0) {
      throw new Error("Video has no readable duration.");
    }

    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas 2D context unavailable in this browser.");

    const usableStart = duration * trimStart;
    // Small safety margin off the exact end timestamp — seeking to the
    // literal last frame is flaky (sometimes black) in some browsers.
    const usableEnd = Math.max(usableStart, duration * (1 - trimEnd) - 0.05);
    const usableDuration = usableEnd - usableStart;

    const frames: ExtractedFrame[] = [];

    for (let i = 0; i < frameCount; i++) {
      const t =
        frameCount === 1
          ? usableStart
          : usableStart + (usableDuration * i) / (frameCount - 1);

      await seekTo(video, t);
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL(mimeType, quality);
      frames.push({ index: i, dataUrl, timestampSeconds: t });
      onProgress?.(i + 1, frameCount);
    }

    return frames;
  } finally {
    if (isObjectSource) URL.revokeObjectURL(videoUrl);
  }
}

function seekTo(video: HTMLVideoElement, time: number): Promise<void> {
  return new Promise((resolve, reject) => {
    const onSeeked = () => {
      video.removeEventListener("seeked", onSeeked);
      video.removeEventListener("error", onError);
      resolve();
    };
    const onError = () => {
      video.removeEventListener("seeked", onSeeked);
      video.removeEventListener("error", onError);
      reject(new Error(`Failed to seek video to ${time.toFixed(2)}s.`));
    };
    video.addEventListener("seeked", onSeeked);
    video.addEventListener("error", onError);
    video.currentTime = time;
  });
}

/** Triggers a browser download for a single extracted frame. */
export function downloadFrame(frame: ExtractedFrame, filenamePrefix: string, ext = "jpg") {
  const a = document.createElement("a");
  a.href = frame.dataUrl;
  a.download = `${filenamePrefix}-${String(frame.index + 1).padStart(3, "0")}.${ext}`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

/** Triggers sequential downloads for every frame, with a small delay between each (browsers throttle/block rapid-fire simultaneous downloads). */
export async function downloadAllFrames(
  frames: ExtractedFrame[],
  filenamePrefix: string,
  ext = "jpg",
) {
  for (const frame of frames) {
    downloadFrame(frame, filenamePrefix, ext);
    await new Promise((r) => setTimeout(r, 150));
  }
}
