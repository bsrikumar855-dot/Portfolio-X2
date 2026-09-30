"use client";

import { motion } from "framer-motion";
import { Children, type ReactNode } from "react";
import { duration, ease, stagger, travel } from "@/lib/motion/tokens";
import { useReveal } from "@/lib/motion/useReveal";

type Props = { children: ReactNode; className?: string; itemClassName?: string; delay?: number };

/** Fades and lifts each direct child in turn. Small travel, opacity + transform only. */
export function StaggerText({ children, className, itemClassName, delay = 0 }: Props) {
  const { ref, show, reduce } = useReveal();
  const y = travel(false, 24);
  return (
    <div ref={ref} className={className}>
      {Children.map(children, (child, i) => (
        <motion.div
          data-reveal
          className={itemClassName}
          initial={reduce ? false : { opacity: 0, y }}
          animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y }}
          transition={{ duration: duration.standard * 1.4, ease: ease.out, delay: delay + i * stagger.list }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
}
