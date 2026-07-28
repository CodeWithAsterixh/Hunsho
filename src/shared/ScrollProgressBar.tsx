"use client";

import { useEffect, useState } from "react";
import { useScroll, useSpring, motion } from "motion/react";

/**
 * Thin progress bar fixed to the top of the viewport, tracking scroll position.
 *
 * Any section that sits on a dark background can opt into inverting the bar
 * color (so it stays visible) by adding a `data-progress-invert` attribute:
 *
 *   <section data-progress-invert>...</section>
 *
 * This keeps the component decoupled from any specific page's section IDs.
 */
export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, mass: 0.5 });
  const [onDarkSection, setOnDarkSection] = useState(false);

  useEffect(() => {
    const invertTargets = () =>
      Array.from(document.querySelectorAll<HTMLElement>("[data-progress-invert]"));

    const handleScroll = () => {
      const targets = invertTargets();
      if (targets.length === 0) {
        setOnDarkSection(false);
        return;
      }
      const overlapping = targets.some((el) => {
        const rect = el.getBoundingClientRect();
        return rect.top <= 0 && rect.bottom >= 2;
      });
      setOnDarkSection(overlapping);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] origin-left z-[100] transition-colors duration-300"
      style={{
        scaleX,
        backgroundColor: onDarkSection ? "#ffffff" : "var(--color-accent)",
      }}
    />
  );
}
