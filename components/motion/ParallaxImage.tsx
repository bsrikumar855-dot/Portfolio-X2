"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { MQ } from "@/lib/motion/tokens";
import { cn } from "@/lib/utils/cn";

type Props = { children: ReactNode; className?: string; distance?: number };

/** Gentle scroll-linked drift, one ScrollTrigger per image, reduced on mobile, off with reduced motion. */
export function ParallaxImage({ children, className, distance = 7 }: Props) {
  const box = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let revert = () => {};
    let cancelled = false;
    import("@/lib/motion/gsap").then(({ getGsap }) => {
      if (cancelled) return;
      const { gsap } = getGsap();
      const mm = gsap.matchMedia();
      mm.add(
      { ok: MQ.motionOk, small: MQ.mobile },
      (ctx) => {
        const { ok, small } = ctx.conditions as { ok: boolean; small: boolean };
        if (!ok || !inner.current || !box.current) return;
        const d = small ? distance * 0.4 : distance;
        gsap.fromTo(
          inner.current,
          { yPercent: -d },
          {
            yPercent: d,
            ease: "none",
            scrollTrigger: { trigger: box.current, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      },
      box,
      );
      revert = () => mm.revert();
    });
    return () => {
      cancelled = true;
      revert();
    };
  }, [distance]);

  return (
    <div ref={box} className={cn("relative overflow-hidden", className)}>
      <div ref={inner} className="absolute inset-x-0 -inset-y-[9%] will-change-transform">
        {children}
      </div>
    </div>
  );
}
