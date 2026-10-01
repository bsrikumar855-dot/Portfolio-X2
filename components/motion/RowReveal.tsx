"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { duration, ease, stagger } from "@/lib/motion/tokens";
import { useReveal } from "@/lib/motion/useReveal";

const closed = "inset(100% 0% 0% 0%)";
const open = "inset(-4% -4% -4% -4%)";

/** Row scroll-in: clip-path rises from the bottom, 700ms, staggered by row index. Reveals once. */
export function RowReveal({ children, index = 0, className }: { children: ReactNode; index?: number; className?: string }) {
  const { ref, show, reduce } = useReveal();
  return (
    <motion.div
      ref={ref}
      data-reveal
      className={className}
      initial={reduce ? false : { clipPath: closed }}
      animate={{ clipPath: show ? open : closed }}
      transition={{ duration: duration.row, ease: ease.out, delay: Math.min(index, 4) * stagger.row }}
    >
      {children}
    </motion.div>
  );
}
