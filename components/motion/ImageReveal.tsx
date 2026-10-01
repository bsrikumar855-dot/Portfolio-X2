"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { duration, ease } from "@/lib/motion/tokens";
import { useReveal } from "@/lib/motion/useReveal";
import { cn } from "@/lib/utils/cn";

type Props = { children: ReactNode; className?: string; delay?: number; from?: "bottom" | "left" };

const closed = { bottom: "inset(100% 0% 0% 0%)", left: "inset(0% 100% 0% 0%)" } as const;

/** Clip-path reveal with a slight settle on the content. No blur. */
export function ImageReveal({ children, className, delay = 0, from = "bottom" }: Props) {
  const { ref, show, reduce } = useReveal();
  return (
    <motion.div
      ref={ref}
      data-reveal
      className={cn("overflow-hidden", className)}
      initial={reduce ? false : { clipPath: closed[from] }}
      animate={{ clipPath: show ? "inset(0% 0% 0% 0%)" : closed[from] }}
      transition={{ duration: duration.reveal, ease: ease.inOut, delay }}
    >
      <motion.div
        className="h-full w-full"
        initial={reduce ? false : { scale: 1.12 }}
        animate={{ scale: show ? 1 : 1.12 }}
        transition={{ duration: duration.reveal * 1.2, ease: ease.out, delay }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
