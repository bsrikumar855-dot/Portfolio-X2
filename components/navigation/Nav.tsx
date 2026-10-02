"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { TransitionLink } from "@/components/motion/TransitionLink";
import { StatusDot } from "@/components/ui/StatusDot";
import { nav, site } from "@/data/site";
import { cn } from "@/lib/utils/cn";
import { MobileMenu } from "./MobileMenu";
import { SoundToggle } from "./SoundToggle";
import { ThemeToggle } from "./ThemeToggle";

const sectionKeys = nav.map((n) => n.section);

const corner = "absolute size-2 border-accent opacity-0 transition-[opacity,transform] duration-300 ease-out group-hover/logo:translate-x-0 group-hover/logo:translate-y-0 group-hover/logo:opacity-100 group-focus-visible/logo:opacity-100";

/**
 * The nav is a measuring tape. A red playhead rides along the tape as the page scrolls, so the tape doubles
 * as a scrollbar. Links are numbered and roll on hover; the logo gets viewfinder brackets; toggles are compact keys.
 */
export function Nav() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [section, setSection] = useState("");
  const [open, setOpen] = useState(false);
  const onDark = pathname === "/contact" && !scrolled;
  const menuBtn = useRef<HTMLButtonElement>(null);
  const header = useRef<HTMLElement>(null);

  useEffect(() => {
    let raf = 0;
    const measure = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      header.current?.style.setProperty("--p", String(max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0));
      setScrolled(window.scrollY > 24);
      if (!isHome) return;
      const line = window.innerHeight * 0.4;
      let current = "";
      for (const id of sectionKeys) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      setSection(current);
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
  }, [isHome, pathname]);

  const activeKey = isHome ? section : (nav.find((n) => pathname.startsWith(n.route))?.key ?? (pathname.startsWith("/work") ? "work" : ""));

  const toTop = (e: React.MouseEvent) => {
    if (isHome) {
      e.preventDefault();
      window.scrollTo({ top: 0 });
    }
  };

  return (
    <>
      <header
        ref={header}
        style={{ "--p": 0 } as CSSProperties}
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,color] duration-300",
          onDark ? "text-on-dark" : "text-ink",
          scrolled ? "border-rule bg-bg/95" : "border-transparent bg-transparent",
        )}
      >
        {/* The tape, with the playhead that tracks scroll position. */}
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[10px] [container-type:inline-size]">
          <span className="tape absolute inset-0" style={{ WebkitMaskSize: "auto 10px", maskSize: "auto 10px" }} />
          <span className="absolute left-0 top-0 h-[16px] w-px bg-accent" style={{ transform: "translateX(calc(var(--p) * 100cqw))" }}>
            <span className="absolute -left-[4px] top-[16px] size-0 border-x-[4px] border-t-[6px] border-x-transparent border-t-accent" />
          </span>
        </div>

        <div className="wrap grid h-[var(--nav-h)] grid-cols-2 items-center gap-6 pt-1.5 md:grid-cols-[1fr_auto_1fr]">
          <TransitionLink
            href="/"
            onClick={toTop}
            aria-label={`${site.wordmark} home`}
            className="group/logo relative -mx-3 justify-self-start px-3 py-2 font-medium tracking-[-0.02em]"
          >
            {site.wordmark}
            <span aria-hidden className={cn(corner, "left-0 top-0 -translate-x-1 -translate-y-1 border-l border-t")} />
            <span aria-hidden className={cn(corner, "right-0 top-0 translate-x-1 -translate-y-1 border-r border-t")} />
            <span aria-hidden className={cn(corner, "bottom-0 left-0 -translate-x-1 translate-y-1 border-b border-l")} />
            <span aria-hidden className={cn(corner, "bottom-0 right-0 translate-x-1 translate-y-1 border-b border-r")} />
          </TransitionLink>

          <nav aria-label="Primary" className="hidden items-center gap-9 md:flex">
            {nav.map((n, i) => {
              const active = activeKey === n.key;
              const cls = "group meta relative flex items-baseline gap-2 py-2 !text-current";
              const inner = (
                <>
                  <span className={cn("numeral transition-colors duration-200", active ? (onDark ? "font-semibold" : "text-accent") : "opacity-70")}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="relative block overflow-hidden">
                    <span className="block transition-transform duration-300 ease-out group-hover:-translate-y-full">{n.label}</span>
                    <span aria-hidden className="absolute inset-x-0 top-full block transition-transform duration-300 ease-out group-hover:-translate-y-full">
                      {n.label}
                    </span>
                  </span>
                  <span
                    aria-hidden
                    className={cn(
                      "absolute inset-x-0 bottom-0 h-px origin-left transition-transform duration-300 ease-out group-hover:scale-x-100",
                      onDark ? "bg-current" : "bg-accent",
                      active ? "scale-x-100" : "scale-x-0",
                    )}
                  />
                </>
              );
              return isHome ? (
                <a key={n.key} href={`#${n.section}`} className={cls} aria-current={active ? "location" : undefined}>
                  {inner}
                </a>
              ) : (
                <TransitionLink key={n.key} href={n.route} className={cls} aria-current={active ? "page" : undefined}>
                  {inner}
                </TransitionLink>
              );
            })}
          </nav>

          <div className="flex items-center justify-self-end gap-2">
            <span className="meta mr-2 hidden h-8 items-center gap-2 border border-current/25 px-3 !text-current xl:flex">
              <StatusDot />
              {site.availability}
            </span>
            <ThemeToggle variant="icon" className="hidden md:grid" />
            <SoundToggle variant="icon" className="hidden md:grid" />
            <button
              ref={menuBtn}
              type="button"
              className="meta h-9 border border-current/30 px-3 !text-current md:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen(true)}
            >
              MENU
            </button>
          </div>
        </div>
      </header>
      <MobileMenu
        open={open}
        onClose={() => {
          setOpen(false);
          menuBtn.current?.focus();
        }}
        activeKey={activeKey}
        isHome={isHome}
      />
    </>
  );
}
