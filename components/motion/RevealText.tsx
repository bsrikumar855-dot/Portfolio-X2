"use client";

import { motion } from "framer-motion";
import { duration, ease, stagger } from "@/lib/motion/tokens";
import { useReveal } from "@/lib/motion/useReveal";
import { cn } from "@/lib/utils/cn";

type Tag = "h1" | "h2" | "h3" | "p" | "div" | "span";

type Props = {
  /** Each entry is one masked line. */
  lines: readonly string[];
  as?: Tag;
  id?: string;
  className?: string;
  /** One class for every line, or one per line. */
  lineClassName?: string | readonly string[];
  delay?: number;
  /** Ignore scroll position and reveal as soon as the page is ready. */
  immediate?: boolean;
};

/** Masked line reveal: each line slides up out of its own clip. */
export function RevealText({ lines, as = "div", id, className, lineClassName, delay = 0, immediate }: Props) {
  const { ref, show, reduce } = useReveal(immediate);
  const Tag = as as "div";
  return (
    <Tag ref={ref} id={id} className={className}>
      {lines.map((line, i) => (
        <span key={line + i} className={cn("block overflow-hidden py-[0.06em] -my-[0.06em]", typeof lineClassName === "string" ? lineClassName : lineClassName?.[i])}>
          <motion.span
            data-reveal
            className="block will-change-transform"
            initial={reduce ? false : { y: "115%" }}
            animate={show ? { y: "0%" } : { y: "115%" }}
            transition={{ duration: duration.dramatic, ease: ease.out, delay: delay + i * stagger.text }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
