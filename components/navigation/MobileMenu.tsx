"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";
import { TransitionLink } from "@/components/motion/TransitionLink";
import { SoundToggle } from "./SoundToggle";
import { ThemeToggle } from "./ThemeToggle";
import { StatusDot } from "@/components/ui/StatusDot";
import { nav, site } from "@/data/site";
import { sentenceCase } from "@/lib/utils/case";
import { duration, ease, stagger } from "@/lib/motion/tokens";

type Props = { open: boolean; onClose: () => void; activeKey: string; isHome: boolean };

const FOCUSABLE = 'a[href], button:not([disabled])';

/** Full-screen editorial menu: staggered lines, focus trapped, Escape to close, scroll locked. */
export function MobileMenu({ open, onClose, activeKey, isHome }: Props) {
  const box = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const close = useRef(onClose);
  useEffect(() => {
    close.current = onClose;
  });

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const items = () => Array.from(box.current?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? []);
    items()[0]?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") return close.current();
      if (e.key !== "Tab") return;
      const list = items();
      const first = list[0];
      const last = list[list.length - 1];
      if (!first || !last) return;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    // Leaving the mobile breakpoint closes the menu.
    const mq = matchMedia("(min-width: 1024px)");
    const onMq = () => mq.matches && close.current();
    mq.addEventListener("change", onMq);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={box}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="dark-zone fixed inset-0 z-[60] flex flex-col justify-between p-[var(--gutter)] lg:hidden"
          initial={reduce ? { opacity: 0 } : { clipPath: "inset(0% 0% 100% 0%)" }}
          animate={reduce ? { opacity: 1 } : { clipPath: "inset(0% 0% 0% 0%)" }}
          exit={reduce ? { opacity: 0 } : { clipPath: "inset(0% 0% 100% 0%)" }}
          transition={{ duration: duration.standard, ease: ease.inOut }}
        >
          <div className="flex h-[calc(var(--nav-h)-var(--gutter))] items-center justify-between">
            <span className="display text-title">{site.wordmark}</span>
            <button type="button" data-sound="close" className="meta caps -mr-2 inline-flex min-h-11 min-w-11 items-center justify-center !text-bg" onClick={onClose}>
              Close
            </button>
          </div>

          <nav aria-label="Menu">
            <ul className="space-y-1">
              {nav.map((n, i) => (
                <li key={n.key} className="overflow-hidden">
                  <motion.div
                    initial={reduce ? false : { y: "110%" }}
                    animate={{ y: "0%" }}
                    exit={reduce ? undefined : { y: "110%" }}
                    transition={{ duration: duration.reveal, ease: ease.out, delay: 0.15 + i * stagger.menu }}
                  >
                    {isHome ? (
                      <a
                        href={`#${n.section}`}
                        onClick={onClose}
                        aria-current={activeKey === n.key ? "location" : undefined}
                        className="display flex min-h-11 items-baseline gap-4 py-2 text-hero"
                      >
                        <span className="meta w-6 shrink-0">{String(i + 1).padStart(2, "0")}</span>
                        {n.label}
                      </a>
                    ) : (
                      <TransitionLink
                        href={n.route}
                        onClick={onClose}
                        aria-current={activeKey === n.key ? "page" : undefined}
                        className="display flex min-h-11 items-baseline gap-4 py-2 text-hero"
                      >
                        <span className="meta w-6 shrink-0">{String(i + 1).padStart(2, "0")}</span>
                        {n.label}
                      </TransitionLink>
                    )}
                  </motion.div>
                </li>
              ))}
            </ul>
          </nav>

          <div className="space-y-1">
            <p className="meta flex items-center gap-2 !text-bg">
              <StatusDot />
              {sentenceCase(site.availability)}
            </p>
            <div>
              <ThemeToggle />
            </div>
            <div>
              <SoundToggle />
            </div>
            <p className="meta">{site.location}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
