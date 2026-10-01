"use client";

import { useEffect, useRef } from "react";

/**
 * Counts a number up once, the first time it scrolls into view. The final text is in the DOM from the
 * start (screen readers, no-JS); the visible copy is only rewritten after hydration, and never under reduced motion.
 */
export function CountUp({ value, className }: { value: string; className?: string }) {
  const el = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const node = el.current;
    const m = /^(\D*)(\d+)(\D*)$/.exec(value);
    if (!node || !m || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const [, pre = "", digits = "0", post = ""] = m;
    const end = Number(digits);
    let raf = 0;
    node.textContent = pre + "0" + post;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const step = (t: number) => {
          const p = Math.min(1, (t - t0) / 900);
          node.textContent = pre + Math.round(end * (1 - Math.pow(1 - p, 3))) + post;
          if (p < 1) raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
      },
      { threshold: 0.6 },
    );
    io.observe(node);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      node.textContent = value;
    };
  }, [value]);
  return (
    <span className={className}>
      <span className="sr-only">{value}</span>
      <span ref={el} aria-hidden="true">
        {value}
      </span>
    </span>
  );
}
