"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import type Lenis from "lenis";

/**
 * Inertial scrolling for desktop pointers. Off for touch and reduced motion, loads after first paint,
 * keeps native scrolling underneath (so find-in-page, keyboard and anchors still work), and drives ScrollTrigger.
 */
export function SmoothScroll() {
  const pathname = usePathname();
  const lenis = useRef<Lenis | null>(null);

  useEffect(() => {
    if (!matchMedia("(hover: hover) and (pointer: fine)").matches || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    let off = false;
    (async () => {
      const [{ default: LenisCtor }, { getGsap }] = await Promise.all([import("lenis"), import("@/lib/motion/gsap")]);
      if (off) return;
      const instance = new LenisCtor({ lerp: 0.1, anchors: true });
      lenis.current = instance;
      const { ScrollTrigger } = getGsap();
      instance.on("scroll", ScrollTrigger.update);
      const tick = (t: number) => {
        instance.raf(t);
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    })();
    return () => {
      off = true;
      cancelAnimationFrame(raf);
      lenis.current?.destroy();
      lenis.current = null;
    };
  }, []);

  // New page: start at the top, immediately.
  useEffect(() => {
    lenis.current?.scrollTo(0, { immediate: true });
  }, [pathname]);

  return null;
}
