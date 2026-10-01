"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { site } from "@/data/site";
import { ease } from "@/lib/motion/tokens";
import { titleCase } from "@/lib/utils/case";

const COUNT_MS = 600;

/** Typographic preloader. Counts to 100, then lifts away with a clip-path exit into the hero. */
export function Preloader({ onDone }: { onDone: () => void }) {
  const [pct, setPct] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [gone, setGone] = useState(false);
  const done = useRef(onDone);

  useEffect(() => {
    if (document.documentElement.hasAttribute("data-skip-preload")) {
      done.current(); // CSS already hides the overlay for this visit
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const step = (t: number) => {
      const p = Math.min(1, (t - t0) / COUNT_MS);
      setPct(Math.round(100 * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(step);
      else setLeaving(true);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  if (gone) return null;
  return (
    <motion.div
      className="preloader dark-zone fixed inset-0 z-[100] flex flex-col justify-between p-[var(--gutter)]"
      role="status"
      aria-label="Loading"
      initial={false}
      animate={{ clipPath: leaving ? "inset(0% 0% 100% 0%)" : "inset(0% 0% 0% 0%)" }}
      transition={{ duration: 0.55, ease: ease.inOut }}
      onAnimationStart={() => {
        if (leaving) window.setTimeout(() => done.current(), 120);
      }}
      onAnimationComplete={() => {
        if (leaving) {
          try {
            sessionStorage.setItem("sk-pre", "1");
          } catch {}
          setGone(true);
        }
      }}
    >
      <span className="meta">{titleCase(site.disciplines)}</span>
      <div className="flex items-end justify-between gap-6">
        <span className="display text-hero">{site.wordmark}</span>
        <span className="display numeral text-hero">
          {String(pct).padStart(3, "0")}
        </span>
      </div>
    </motion.div>
  );
}
