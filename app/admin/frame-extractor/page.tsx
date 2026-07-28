"use client";

import { useState, useRef } from "react";
import {
  extractFramesFromVideo,
  downloadAllFrames,
  type ExtractedFrame,
} from "@/lib/video-to-frames";
import { MagneticButton } from "@/src/shared/MagneticButton";

// INTERNAL TOOL — not linked from customer-facing nav, and has no access
// control yet (see PRD build-status notes: no auth system exists). Fine to
// leave open while the team is the only one who knows the URL, but needs
// real access control before this goes anywhere public-facing.
export default function FrameExtractorPage() {
  const [file, setFile] = useState<File | null>(null);
  const [frameCount, setFrameCount] = useState(24);
  const [trimStart, setTrimStart] = useState(0);
  const [trimEnd, setTrimEnd] = useState(0);
  const [status, setStatus] = useState<"idle" | "working" | "done" | "error">("idle");
  const [progress, setProgress] = useState({ completed: 0, total: 0 });
  const [frames, setFrames] = useState<ExtractedFrame[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExtract = async () => {
    if (!file) return;
    setStatus("working");
    setErrorMessage("");
    setFrames([]);
    try {
      const result = await extractFramesFromVideo(file, {
        frameCount,
        trimStart: trimStart / 100,
        trimEnd: trimEnd / 100,
        onProgress: (completed, total) => setProgress({ completed, total }),
      });
      setFrames(result);
      setStatus("done");
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : "Extraction failed.");
      setStatus("error");
    }
  };

  const filenamePrefix = file ? file.name.replace(/\.[^/.]+$/, "") : "frame";

  return (
    <div className="section section--surface !pt-32">
      <div className="container max-w-3xl">
        <span className="eyebrow mb-4">Internal Tool</span>
        <h1 className="mb-3">Video → Frame Extractor</h1>
        <p className="lead mb-10">
          Upload a raw product video, extract an evenly spaced frame sequence,
          and download it for use in <code>SpinViewer</code> or{" "}
          <code>ScrollFrameStory</code>. Runs entirely in your browser — the
          video never leaves your machine.
        </p>

        <div className="card mb-8">
          <label htmlFor="video-upload">Video file</label>
          <input
            ref={fileInputRef}
            id="video-upload"
            type="file"
            accept="video/*"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            className="field !h-auto py-3"
          />

          <div className="grid sm:grid-cols-3 gap-4 mt-6">
            <div>
              <label htmlFor="frame-count">Frame count</label>
              <input
                id="frame-count"
                type="number"
                min={1}
                max={240}
                value={frameCount}
                onChange={(e) => setFrameCount(Number(e.target.value))}
                className="field"
              />
              <p className="text-xs text-[var(--color-text-secondary)] mt-1 mb-0">
                24–48 for SpinViewer, 60+ for a longer ScrollFrameStory
              </p>
            </div>
            <div>
              <label htmlFor="trim-start">Trim start (%)</label>
              <input
                id="trim-start"
                type="number"
                min={0}
                max={49}
                value={trimStart}
                onChange={(e) => setTrimStart(Number(e.target.value))}
                className="field"
              />
            </div>
            <div>
              <label htmlFor="trim-end">Trim end (%)</label>
              <input
                id="trim-end"
                type="number"
                min={0}
                max={49}
                value={trimEnd}
                onChange={(e) => setTrimEnd(Number(e.target.value))}
                className="field"
              />
            </div>
          </div>

          <MagneticButton
            variant="primary"
            size="lg"
            className="mt-6"
            disabled={!file || status === "working"}
            onClick={handleExtract}
          >
            {status === "working"
              ? `Extracting… ${progress.completed}/${progress.total}`
              : "Extract Frames"}
          </MagneticButton>

          {status === "error" && (
            <p className="text-sm mt-4 mb-0 text-[var(--color-alert)]">{errorMessage}</p>
          )}
        </div>

        <div className="card !bg-[var(--color-surface-raised)] mb-10">
          <span className="step-index mb-2 block">
            <em>Before you upload:</em> crop the source video itself.
          </span>
          <p className="text-sm text-[var(--color-text-secondary)] mb-0">
            This tool extracts frames from whatever video you give it — it
            doesn't crop to the relevant body part per the PRD's photography
            brief (rings/bracelets → hand, earrings → ear, necklaces →
            collarbone-to-neck only). Do that crop at shoot/edit time, before
            this step.
          </p>
        </div>

        {frames.length > 0 && (
          <>
            <div className="flex items-center justify-between mb-4">
              <h2 className="mb-0">{frames.length} frames extracted</h2>
              <MagneticButton
                variant="accent"
                onClick={() => downloadAllFrames(frames, filenamePrefix)}
              >
                Download All
              </MagneticButton>
            </div>
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
              {frames.map((frame) => (
                <div
                  key={frame.index}
                  className="relative aspect-square bg-[var(--color-surface-raised)] overflow-hidden border border-[var(--color-border)]"
                >
                  <img
                    src={frame.dataUrl}
                    alt={`Frame ${frame.index + 1}`}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <span className="absolute bottom-1 right-1 font-mono text-[9px] bg-[var(--color-surface)]/90 px-1">
                    {frame.index + 1}
                  </span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
