"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { nav } from "@/data/site";
import { projects } from "@/data/projects";
import { useSound } from "@/components/ui/SoundProvider";
import { duration, ease } from "@/lib/motion/tokens";

type Phase = "idle" | "cover" | "reveal";
type Navigate = (href: string) => void;

const TransitionContext = createContext<Navigate | null>(null);
export const useTransitionNav = (): Navigate | null => useContext(TransitionContext);

const labelFor = (href: string): { index: string; title: string } => {
  const path = href.split(/[?#]/)[0] ?? "/";
  const slug = path.startsWith("/work/") ? path.slice(6) : null;
  if (slug) {
    const i = projects.findIndex((p) => p.slug === slug);
    const p = projects[i];
    if (p) return { index: String(i + 1).padStart(2, "0"), title: p.title };
  }
  if (path === "/") return { index: "00", title: "Index" };
  const item = nav.find((n) => n.route === path);
  return { index: "", title: item ? item.label.charAt(0) + item.label.slice(1).toLowerCase() : "" };
};

const variants: Variants = {
  idle: { clipPath: "inset(100% 0% 0% 0%)", transition: { duration: 0 } },
  cover: { clipPath: "inset(0% 0% 0% 0%)", transition: { duration: duration.transition, ease: ease.inOut } },
  reveal: { clipPath: "inset(0% 0% 100% 0%)", transition: { duration: duration.transition + 0.04, ease: ease.inOut } },
};

/**
 * Signature interaction. The current page is covered by a curtain that carries the destination's
 * name, the route changes underneath, then the curtain lifts to reveal the new page.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const { play } = useSound();
  const [phase, setPhase] = useState<Phase>("idle");
  const [label, setLabel] = useState({ index: "", title: "" });
  const target = useRef<string | null>(null);
  const fallback = useRef<number | undefined>(undefined);

  const navigate = useCallback<Navigate>(
    (href) => {
      const path = href.split(/[?#]/)[0] ?? href;
      if (reduce || phase !== "idle" || path === pathname) {
        router.push(href);
        return;
      }
      play("whoosh");
      target.current = href;
      setLabel(labelFor(href));
      setPhase("cover");
    },
    [reduce, phase, pathname, router, play],
  );

  // New route is mounted: lift the curtain.
  useEffect(() => {
    if (phase === "cover" && target.current === "arrived") {
      window.clearTimeout(fallback.current);
      setPhase("reveal");
    }
  }, [pathname, phase]);

  const onComplete = (def: unknown) => {
    if (def === "cover" && target.current && target.current !== "arrived") {
      router.push(target.current);
      target.current = "arrived";
      // Safety net if the route never changes.
      fallback.current = window.setTimeout(() => setPhase("reveal"), 2500);
    }
    if (def === "reveal") {
      target.current = null;
      setPhase("idle");
    }
  };

  const value = useMemo(() => navigate, [navigate]);

  return (
    <TransitionContext.Provider value={value}>
      {children}
      <motion.div
        aria-hidden
        className="dark-zone fixed inset-0 z-[90] flex flex-col justify-between p-[var(--gutter)]"
        style={{ pointerEvents: phase === "idle" ? "none" : "auto", clipPath: "inset(100% 0% 0% 0%)" }}
        variants={variants}
        initial={false}
        animate={phase}
        onAnimationComplete={onComplete}
      >
        <span className="meta">{label.index ? `Project ${label.index}` : "Shreekumar B"}</span>
        <span className="display h-hero">{label.title}</span>
      </motion.div>
    </TransitionContext.Provider>
  );
}
