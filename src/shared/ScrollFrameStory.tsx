"use client";

import { useRef, useState, useEffect } from "react";
import { useScroll, useMotionValueEvent, AnimatePresence, motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { extractFramesFromVideo } from "@/lib/video-to-frames";

export interface ScrollFrameChapter {
  eyebrow?: string;
  title: string;
  body: string;
}

interface ScrollFrameStoryProps {
  /**
   * Ordered sequence of pre-built frame image URLs.
   * Optional when `videoSrc` is provided — frames will be extracted
   * client-side from the video on mount.
   */
  frames?: string[];
  /**
   * URL (relative or absolute) of a video file to extract frames from.
   * Runs entirely in the browser via HTMLVideoElement + canvas.
   * When supplied, this takes precedence over any `frames` prop.
   */
  videoSrc?: string;
  /** Number of frames to extract when using `videoSrc`. Defaults to 60. */
  videoFrameCount?: number;
  chapters: ScrollFrameChapter[];
  alt: string;
  className?: string;
}

/**
 * A tall pinned section: as the visitor scrolls through it, scroll progress
 * (not drag, unlike SpinViewer) drives which frame is shown and which text
 * chapter is active beside it. Frames come from /admin/frame-extractor
 * (lib/video-to-frames.ts), same as SpinViewer — currently wired to the
 * placeholder generator until that footage exists.
 */
export function ScrollFrameStory({
  frames: framesProp,
  videoSrc,
  videoFrameCount = 60,
  chapters,
  alt,
  className,
}: ScrollFrameStoryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [frameIndex, setFrameIndex] = useState(0);
  const [chapterIndex, setChapterIndex] = useState(0);
  const [extracting, setExtracting] = useState(!!videoSrc);
  // Seed with prop frames (or a single blank placeholder so the grid never collapses)
  const [frames, setFrames] = useState<string[]>(
    framesProp && framesProp.length > 0 ? framesProp : ["data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="],
  );
  const prefersReducedMotion = useReducedMotion();

  // Client-side frame extraction when a videoSrc is provided.
  useEffect(() => {
    if (!videoSrc) return;
    let cancelled = false;
    extractFramesFromVideo(videoSrc, { frameCount: videoFrameCount })
      .then((extracted) => {
        if (!cancelled) {
          setFrames(extracted.map((f) => f.dataUrl));
          setExtracting(false);
        }
      })
      .catch(() => {
        // Fall back to whatever frames were provided (or placeholder)
        if (!cancelled) setExtracting(false);
      });
    return () => { cancelled = true; };
  }, [videoSrc, videoFrameCount]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const clamped = Math.min(1, Math.max(0, latest));
    setFrameIndex(Math.min(frames.length - 1, Math.floor(clamped * frames.length)));
    setChapterIndex(Math.min(chapters.length - 1, Math.floor(clamped * chapters.length)));
  });

  // Reduced-motion: skip the pin/scrub entirely and render as a plain
  // static section (first frame, first chapter) rather than forcing a
  // scroll-locked experience on visitors who've asked to avoid one.
  if (prefersReducedMotion) {
    return (
      <div className={cn("container grid lg:grid-cols-2 gap-10 items-center", className)}>
        <div className="relative aspect-square bg-[var(--color-surface-raised)] overflow-hidden border border-[var(--color-border)]">
          <img src={frames[0]} alt={alt} className="absolute inset-0 w-full h-full object-cover" />
        </div>
        <div>
          {chapters.map((ch, i) => (
            <div key={i} className={i > 0 ? "mt-8" : undefined}>
              {ch.eyebrow && <span className="eyebrow mb-3">{ch.eyebrow}</span>}
              <h3 className="mb-2">{ch.title}</h3>
              <p className="text-[var(--color-text-secondary)]">{ch.body}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={cn("relative", className)}
      style={{ height: `${chapters.length * 120}vh` }}
    >
      <div className="sticky top-0 h-[100svh] flex items-center overflow-hidden">
        <div className="container grid lg:grid-cols-2 gap-10 lg:gap-16 items-center w-full">
          <div className="relative aspect-square bg-[var(--color-surface-raised)] overflow-hidden border border-[var(--color-border)] order-2 lg:order-1">
            <img
              src={frames[frameIndex]}
              alt={alt}
              draggable={false}
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Skeleton shimmer shown while frames are being extracted from the video */}
            {extracting && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[var(--color-surface-raised)]/90 backdrop-blur-sm">
                <div className="h-1 w-32 rounded-full bg-[var(--color-border)] overflow-hidden">
                  <div
                    className="h-full rounded-full bg-[var(--color-accent)]"
                    style={{
                      animation: "scroll-frame-story-loading 1.4s ease-in-out infinite",
                    }}
                  />
                </div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--color-text-secondary)]">Loading frames…</span>
              </div>
            )}
          </div>

          <div className="order-1 lg:order-2 min-h-[220px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={chapterIndex}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: [0.19, 1, 0.22, 1] }}
              >
                {chapters[chapterIndex].eyebrow && (
                  <span className="eyebrow mb-4">{chapters[chapterIndex].eyebrow}</span>
                )}
                <h2 className="mb-4">{chapters[chapterIndex].title}</h2>
                <p className="lead">{chapters[chapterIndex].body}</p>
              </motion.div>
            </AnimatePresence>

            <div className="flex gap-2 mt-8">
              {chapters.map((_, i) => (
                <span
                  key={i}
                  className={cn(
                    "h-px flex-1 transition-colors duration-300",
                    i === chapterIndex ? "bg-[var(--color-accent)]" : "bg-[var(--color-border)]",
                  )}
                  aria-hidden="true"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
