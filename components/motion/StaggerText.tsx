"use client";

import { motion } from "framer-motion";
import { Children, type ReactNode } from "react";
import { ease, stagger } from "@/lib/motion/tokens";
import { useReveal } from "@/lib/motion/useReveal";

type Props = { children: ReactNode; className?: string; itemClassName?: string; delay?: number };

/** Single fade-up (12px, 500ms) per direct child, in sequence. Reveals once. */
export function StaggerText({ children, className, itemClassName, delay = 0 }: Props) {
  const { ref, show, reduce } = useReveal();
  return (
    <div ref={ref} className={className}>
      {Children.map(children, (child, i) => (
        <motion.div
          data-reveal
          className={itemClassName}
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.5, ease: ease.out, delay: delay + i * stagger.list }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
}
