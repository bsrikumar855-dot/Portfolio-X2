"use client";

import { ArrowDown } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { site } from "@/data/site";
import { duration, ease, stagger } from "@/lib/motion/tokens";
import { soft, tick } from "@/lib/sound";
import { useReveal } from "@/lib/motion/useReveal";
import { cn } from "@/lib/utils/cn";

const rows = [["BUILDING", "DIGITAL"], ["SYSTEMS", "THAT", "MATTER"]] as const;
const words: readonly string[] = rows.flat();
const rowSize = ["md:text-[11.5cqw]", "md:text-[8.9cqw]"] as const;

const corner = "pointer-events-none absolute size-7 border-ink";

type WordProps = {
  text: string;
  i: number;
  show: boolean;
  reduce: boolean;
  lit: boolean;
  onEnter: (i: number) => void;
  onLeave: () => void;
};

function Word({ text, i, show, reduce, lit, onEnter, onLeave }: WordProps) {
  return (
    <span className="relative inline-block" onPointerEnter={() => onEnter(i)} onPointerLeave={onLeave}>
      <span className="inline-block overflow-hidden py-[0.06em] -my-[0.06em] align-bottom">
        <motion.span
          data-reveal
          className="inline-block will-change-transform"
          initial={reduce ? false : { y: "115%" }}
          animate={show ? { y: "0%" } : { y: "115%" }}
          transition={{ duration: duration.dramatic, ease: ease.out, delay: 0.1 + i * stagger.text }}
        >
          {text}
        </motion.span>
      </span>
      {/* Detection box: corner brackets plus a token tag. */}
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute -inset-x-[0.05em] -inset-y-[0.02em] transition-opacity duration-200",
          lit ? "opacity-100" : "opacity-0",
        )}
      >
        <span className="absolute inset-0 border border-accent/45" />
        <span className="absolute -left-px -top-px size-3 border-l-2 border-t-2 border-accent" />
        <span className="absolute -right-px -top-px size-3 border-r-2 border-t-2 border-accent" />
        <span className="absolute -bottom-px -left-px size-3 border-b-2 border-l-2 border-accent" />
        <span className="absolute -bottom-px -right-px size-3 border-b-2 border-r-2 border-accent" />
        <span className="meta absolute -top-[1.35rem] max-md:hidden left-0 bg-accent px-1.5 py-px !text-bg">T{String(i + 1).padStart(2, "0")}</span>
      </span>
    </span>
  );
}

/**
 * The hero: the headline set as a poster inside a scanner viewfinder. A scan line sweeps the frame,
 * detection boxes lock onto every word, then hovering a word "reads" it in the HUD.
 */
export function DetectorHero() {
  const { ref, show, reduce } = useReveal<HTMLDivElement>(true);
  const [active, setActive] = useState<number | null>(null);
  const [found, setFound] = useState(false);

  useEffect(() => {
    if (!show || reduce) return;
    const a = window.setTimeout(() => {
      setFound(true);
      tick();
    }, 1500);
    const b = window.setTimeout(() => setFound(false), 3400);
    return () => {
      window.clearTimeout(a);
      window.clearTimeout(b);
    };
  }, [show, reduce]);

  const enter = (i: number) => {
    setActive(i);
    soft();
  };
  const word = active === null ? null : words[active];

  return (
    <div ref={ref} className="relative flex flex-1 flex-col justify-center [container-type:inline-size]">
      {/* Viewfinder corners */}
      <span aria-hidden className={cn(corner, "left-0 top-0 border-l-2 border-t-2")} />
      <span aria-hidden className={cn(corner, "right-0 top-0 border-r-2 border-t-2")} />
      <span aria-hidden className={cn(corner, "bottom-0 left-0 border-b-2 border-l-2")} />
      <span aria-hidden className={cn(corner, "bottom-0 right-0 border-b-2 border-r-2")} />

      {/* HUD */}
      <p className="meta absolute left-0 top-0 max-w-[calc(100%-5rem)] pl-11 pt-1.5">{site.disciplines}</p>
      <p className="meta absolute right-0 top-0 hidden pr-11 pt-1.5 md:block">{site.location.toUpperCase()}</p>
      <p aria-hidden className="meta absolute bottom-0 left-0 max-w-[calc(100%-5rem)] pb-1.5 pl-11 !text-ink">
        {word ? (
          <>
            <span className="text-accent">READ</span> &ldquo;{word}&rdquo; <span className="text-accent">▸</span> {word.length} CHARS{" "}
            <span className="text-accent">✓</span>
          </>
        ) : (
          <>
            <span className="text-accent">MODEL READS</span> ▸ <span className="text-accent">ARITHMETIC DECIDES</span>
          </>
        )}
      </p>
      <a href="#work" className="meta group absolute bottom-0 right-0 hidden items-center gap-3 pb-1.5 pr-11 !text-ink md:flex">
        SCROLL TO EXPLORE
        <ArrowDown aria-hidden size={14} className="transition-transform duration-300 group-hover:translate-y-1" />
        <span className="numeral">01 / 07</span>
      </a>

      {/* Scan line: sweeps the frame once. */}
      {!reduce && (
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 h-[2px] bg-accent"
          initial={{ top: "0%", opacity: 0 }}
          animate={show ? { top: ["0%", "100%"], opacity: [1, 1, 0] } : { top: "0%", opacity: 0 }}
          transition={{ duration: 1.3, delay: 0.5, ease: ease.inOut, times: [0, 0.92, 1] }}
        />
      )}

      <h1 aria-label="Building digital systems that matter" className="display flex flex-col gap-5 py-16 md:gap-8 md:py-20">
        {rows.map((row, r) => (
          <span
            key={r}
            className={cn(
              "flex flex-wrap gap-x-[0.2em] text-[15cqw] leading-[0.92] md:justify-between md:flex-nowrap",
              rowSize[r],
            )}
          >
            {row.map((w, j) => {
              const n = rows.slice(0, r).flat().length + j;
              return <Word key={w} text={w} i={n} show={show} reduce={reduce} lit={active === n || found} onEnter={enter} onLeave={() => setActive(null)} />;
            })}
          </span>
        ))}
      </h1>
    </div>
  );
}
