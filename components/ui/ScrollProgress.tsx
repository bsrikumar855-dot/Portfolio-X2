"use client";

import { motion, useReducedMotion, useScroll } from "framer-motion";

/** 2px accent progress bar pinned to the top of the page. transform: scaleX only. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const reduce = useReducedMotion();
  if (reduce) return null;
  return <motion.div aria-hidden className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-[2px] origin-left bg-accent" style={{ scaleX: scrollYProgress }} />;
}
