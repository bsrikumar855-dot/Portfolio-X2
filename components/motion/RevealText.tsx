"use client";

import { motion } from "framer-motion";
import { Fragment, useLayoutEffect, useRef, useState } from "react";
import { duration, ease, stagger } from "@/lib/motion/tokens";
import { useReveal } from "@/lib/motion/useReveal";

type Tag = "h1" | "h2" | "h3" | "p" | "div" | "span";

type Props = {
  text: string;
  as?: Tag;
  id?: string;
  className?: string;
  delay?: number;
  /** Ignore scroll position and reveal as soon as the page is ready. */
  immediate?: boolean;
};

/**
 * Masked line reveal for headings. The text wraps naturally; words that land on the same rendered
 * line rise together, lines stagger. Real spaces stay between words, and the whole string is the
 * accessible name while the split spans are hidden from assistive tech.
 */
export function RevealText({ text, as = "div", id, className, delay = 0, immediate }: Props) {
  const { ref, show, reduce } = useReveal(immediate);
  const Tag = as as "div";
  const words = text.split(" ");
  const spans = useRef<(HTMLSpanElement | null)[]>([]);
  const [lineOf, setLineOf] = useState<number[]>(() => words.map(() => 0));

  useLayoutEffect(() => {
    const tops: number[] = [];
    const next = spans.current.map((el) => {
      const t = el?.offsetTop ?? 0;
      let idx = tops.findIndex((x) => Math.abs(x - t) < 4);
      if (idx < 0) idx = tops.push(t) - 1;
      return idx;
    });
    setLineOf((prev) => (prev.length === next.length && prev.every((v, i) => v === next[i]) ? prev : next));
  }, [text]);

  return (
    <Tag ref={ref} id={id} className={className} aria-label={text}>
      <span aria-hidden="true">
        {words.map((w, i) => (
          <Fragment key={w + i}>
            <span
              ref={(el) => {
                spans.current[i] = el;
              }}
              className="inline-block overflow-hidden align-bottom py-[0.1em] -my-[0.1em]"
            >
              <motion.span
                data-reveal
                className="inline-block"
                initial={reduce ? false : { y: "110%" }}
                animate={show ? { y: "0%" } : { y: "110%" }}
                transition={{ duration: duration.reveal, ease: ease.out, delay: delay + (lineOf[i] ?? 0) * stagger.text }}
              >
                {w}
              </motion.span>
            </span>
            {i < words.length - 1 ? " " : ""}
          </Fragment>
        ))}
      </span>
    </Tag>
  );
}
