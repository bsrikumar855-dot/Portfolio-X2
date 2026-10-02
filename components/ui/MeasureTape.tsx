"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { achievements } from "@/data/achievements";
import { projects } from "@/data/projects";

type Reading = { value: string; label: string };

/** Every reading comes from the data files: the signals plus each project's numeric metrics. */
const readings: readonly Reading[] = [
  ...achievements.map((a) => ({ value: a.value, label: a.label })),
  ...projects.flatMap((p) => p.metrics.filter((m) => /^\d/.test(m.value)).map((m) => ({ value: m.value, label: `${p.title}: ${m.label}` }))),
];

/**
 * A measuring tape that slides sideways as the page scrolls. Verified results hang off it like readings.
 * With reduced motion it stops sliding and becomes a horizontally scrollable strip.
 */
export function MeasureTape() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], ["6%", "-62%"]);

  return (
    <section
      ref={ref}
      aria-label="Readings"
      tabIndex={reduce ? 0 : undefined}
      className={reduce ? "overflow-x-auto py-10" : "overflow-hidden py-12 md:py-20"}
    >
      <motion.ul style={reduce ? undefined : { x }} className="relative flex w-max items-start gap-[16vw] pb-2 pr-[16vw] md:gap-[11vw]">
        <span aria-hidden className="tape absolute inset-x-0 top-0 h-[22px]" />
        {readings.map((r) => (
          <li key={r.label + r.value} className="relative shrink-0 border-l border-accent pl-5 pt-10 md:pl-7">
            <p className="numeral display text-[clamp(3.25rem,9vw,8rem)] leading-[0.85]">{r.value}</p>
            <p className="meta mt-3 max-w-[22ch]">{r.label}</p>
          </li>
        ))}
      </motion.ul>
    </section>
  );
}
