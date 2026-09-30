"use client";

import { useEffect, useRef, useState } from "react";
import { tick } from "@/lib/sound";
import { cn } from "@/lib/utils/cn";

const marks = [
  { id: "top", label: "Index", dark: false },
  { id: "work", label: "Work", dark: false },
  { id: "capabilities", label: "What I build", dark: false },
  { id: "signals", label: "Signals", dark: true },
  { id: "about", label: "About", dark: false },
  { id: "lab", label: "Lab", dark: false },
  { id: "contact", label: "Contact", dark: true },
] as const;

/**
 * Mark-sheet rail on the right edge: one box per section, ticked off in red as you pass it.
 * Doubles as wayfinding: each box jumps to its section.
 */
export function SheetRail() {
  const [active, setActive] = useState(0);
  const prev = useRef(0);
  useEffect(() => {
    if (active > prev.current) tick();
    prev.current = active;
  }, [active]);

  useEffect(() => {
    let raf = 0;
    const measure = () => {
      raf = 0;
      const line = window.innerHeight * 0.45;
      let cur = 0;
      marks.forEach((m, i) => {
        const el = document.getElementById(m.id);
        if (el && el.getBoundingClientRect().top <= line) cur = i;
      });
      setActive(cur);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const onDark = marks[active]?.dark ?? false;

  return (
    <nav
      aria-label="Sheet progress"
      className={cn("fixed right-3 top-1/2 z-40 hidden -translate-y-1/2 transition-colors duration-300 min-[1100px]:block", onDark ? "text-on-dark" : "text-ink")}
    >
      <ol className="flex flex-col gap-2.5">
        {marks.map((m, i) => {
          const done = i <= active;
          return (
            <li key={m.id}>
              <a
                href={`#${m.id}`}
                aria-current={i === active ? "location" : undefined}
                aria-label={m.label}
                className="group/rail relative flex size-[18px] items-center justify-center border border-current/60 transition-colors hover:border-current"
              >
                <svg aria-hidden viewBox="0 0 24 20" className="h-2.5 w-3 overflow-visible">
                  <path
                    d="M2 11 C 5 13, 7.5 16, 9 18 C 13 9, 17.5 4, 22.5 1.5"
                    pathLength="1"
                    strokeLinecap="round"
                    className={cn(
                      "fill-none stroke-accent stroke-[2.5] [stroke-dasharray:1] transition-[stroke-dashoffset] duration-500 ease-out",
                      onDark && "!stroke-on-dark",
                      done ? "[stroke-dashoffset:0]" : "[stroke-dashoffset:1]",
                    )}
                  />
                </svg>
                <span className="meta pointer-events-none absolute right-full mr-3 whitespace-nowrap bg-bg px-1.5 py-0.5 !text-ink opacity-0 transition-opacity duration-200 group-hover/rail:opacity-100 group-focus-visible/rail:opacity-100">
                  {String(i + 1).padStart(2, "0")} {m.label}
                </span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
