"use client";

import { motion } from "framer-motion";
import { penPaths as paths, type PenVariant } from "./penPaths";
import { useReveal } from "@/lib/motion/useReveal";
import { cn } from "@/lib/utils/cn";

type Props = {
  variant: PenVariant;
  className?: string;
  delay?: number;
  /** Stroke width in px, constant however the mark is stretched. */
  width?: number;
};

/** A red-pen mark that draws itself once it scrolls into view. Fully drawn when motion is reduced. */
export function PenMark({ variant, className, delay = 0, width = 2.5 }: Props) {
  const { ref, show, reduce } = useReveal<HTMLSpanElement>();
  const p = paths[variant];
  return (
    <motion.span
      ref={ref}
      aria-hidden
      className={cn("pointer-events-none", className)}
      initial={reduce ? false : { clipPath: "inset(-20% 100% -20% -5%)" }}
      animate={{ clipPath: show ? "inset(-20% -5% -20% -5%)" : "inset(-20% 100% -20% -5%)" }}
      transition={{ duration: 0.75, ease: [0.65, 0, 0.35, 1], delay }}
    >
      <svg viewBox={p.viewBox} preserveAspectRatio="none" className="h-full w-full overflow-visible">
        <path
          d={p.d}
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth={width}
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </motion.span>
  );
}
