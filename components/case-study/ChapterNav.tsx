"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils/cn";

type Props = { chapters: readonly { id: string; label: string }[]; bodyId: string };

/**
 * Sticky chapter indicator. Desktop: vertical list in the left column. Mobile: a bar under the nav.
 * Active chapter and progress are both driven by ScrollTrigger. Renders as two grid items.
 */
export function ChapterNav({ chapters, bodyId }: Props) {
  const [active, setActive] = useState(0);
  const barX = useRef<HTMLSpanElement>(null);
  const barY = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let revert = () => {};
    let cancelled = false;
    import("@/lib/motion/gsap").then(({ getGsap }) => {
    if (cancelled) return;
    const { gsap, ScrollTrigger } = getGsap();
    const ctx = gsap.context(() => {
      chapters.forEach((c, i) => {
        ScrollTrigger.create({
          trigger: `#${c.id}`,
          start: "top 45%",
          end: "bottom 45%",
          onToggle: (self) => self.isActive && setActive(i),
        });
      });
      ScrollTrigger.create({
        trigger: `#${bodyId}`,
        start: "top 45%",
        end: "bottom 60%",
        onUpdate: (self) => {
          if (barX.current) barX.current.style.transform = `scale(${self.progress}, 1)`;
          if (barY.current) barY.current.style.transform = `scale(1, ${self.progress})`;
        },
      });
    });
    revert = () => ctx.revert();
    });
    return () => {
      cancelled = true;
      revert();
    };
  }, [chapters, bodyId]);

  const current = chapters[active];
  const total = String(chapters.length).padStart(2, "0");

  return (
    <>
      <div className="sticky top-[var(--nav-h)] z-30 -mx-[var(--gutter)] col-span-12 border-b rule bg-bg/95 px-[var(--gutter)] md:hidden">
        <p className="meta flex h-11 items-center justify-between !text-ink">
          <span className="numeral">
            {String(active + 1).padStart(2, "0")} / {total}
          </span>
          <span>{current?.label}</span>
        </p>
        <span ref={barX} aria-hidden className="absolute bottom-0 left-0 h-px w-full origin-left bg-accent" style={{ transform: "scale(0, 1)" }} />
      </div>

      <aside aria-label="Chapters" className="sticky top-[calc(var(--nav-h)+2rem)] hidden self-start md:col-span-3 md:block">
        <div className="relative pl-5">
          <span aria-hidden className="absolute bottom-0 left-0 top-0 w-px bg-rule" />
          <span ref={barY} aria-hidden className="absolute bottom-0 left-0 top-0 w-px origin-top bg-accent" style={{ transform: "scale(1, 0)" }} />
          <ol className="space-y-3">
            {chapters.map((c, i) => (
              <li key={c.id}>
                <a
                  href={`#${c.id}`}
                  aria-current={active === i ? "location" : undefined}
                  className={cn("meta flex gap-3 transition-colors duration-200 hover:!text-ink", active === i && "!text-ink")}
                >
                  <span className="numeral">{String(i + 1).padStart(2, "0")}</span>
                  {c.label}
                </a>
              </li>
            ))}
          </ol>
        </div>
      </aside>
    </>
  );
}
