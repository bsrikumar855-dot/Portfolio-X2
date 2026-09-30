"use client";

import { motion } from "framer-motion";
import { duration, ease } from "@/lib/motion/tokens";
import { useReveal } from "@/lib/motion/useReveal";

type Props = {
  text: string;
  as?: "h2" | "h3" | "p" | "div";
  className?: string;
  delay?: number;
  /** Seconds between words. */
  step?: number;
};

/** Word-level reveal for longer statements. Reads as one paragraph to assistive tech. */
export function SplitText({ text, as = "p", className, delay = 0, step = 0.025 }: Props) {
  const { ref, show, reduce } = useReveal();
  const Tag = as as "div";
  const words = text.split(" ");
  return (
    <Tag ref={ref} className={className}>
      {words.map((w, i) => (
        <span key={w + i} className="inline-block overflow-hidden align-bottom py-[0.08em] -my-[0.08em]">
          <motion.span
            data-reveal
            className="inline-block will-change-transform"
            initial={reduce ? false : { y: "110%" }}
            animate={show ? { y: "0%" } : { y: "110%" }}
            transition={{ duration: duration.dramatic * 0.8, ease: ease.out, delay: delay + i * step }}
          >
            {w}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
