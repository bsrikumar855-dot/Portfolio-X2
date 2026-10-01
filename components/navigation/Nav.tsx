"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { TransitionLink } from "@/components/motion/TransitionLink";
import { nav, site } from "@/data/site";
import { cn } from "@/lib/utils/cn";
import { sentenceCase } from "@/lib/utils/case";
import { MobileMenu } from "./MobileMenu";
import { SoundToggle } from "./SoundToggle";
import { ThemeToggle } from "./ThemeToggle";
import { StatusDot } from "@/components/ui/StatusDot";

const sectionKeys = nav.map((n) => n.section);

export function Nav() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [section, setSection] = useState("");
  const [open, setOpen] = useState(false);
  const onDark = pathname === "/contact" && !scrolled;
  const menuBtn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let raf = 0;
    const measure = () => {
      raf = 0;
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
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,color] duration-300",
          onDark ? "text-on-dark" : "text-ink",
          scrolled ? "border-rule bg-bg/95" : "border-transparent bg-transparent",
        )}
      >
        <div className="wrap flex h-[var(--nav-h)] items-center justify-between gap-6">
          <TransitionLink href="/" onClick={toTop} className="display text-title" aria-label={`${site.wordmark} home`}>
            {site.wordmark}
          </TransitionLink>

          <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
            {nav.map((n) => {
              const cls = "meta caps link-u py-1 !text-current";
              const active = activeKey === n.key;
              return isHome ? (
                <a key={n.key} href={`#${n.section}`} className={cls} data-active={active} aria-current={active ? "location" : undefined}>
                  {n.label}
                </a>
              ) : (
                <TransitionLink key={n.key} href={n.route} className={cls} data-active={active} aria-current={active ? "page" : undefined}>
                  {n.label}
                </TransitionLink>
              );
            })}
          </nav>

          <div className="flex items-center gap-6">
            <div className="hidden lg:block">
              <ThemeToggle />
            </div>
            <div className="hidden lg:block">
              <SoundToggle />
            </div>
            <span className="meta hidden items-center gap-2 !text-current xl:flex">
              <StatusDot />
              {sentenceCase(site.availability)}
            </span>
            <button
              ref={menuBtn}
              type="button"
              data-sound="open"
              className="meta caps -mr-2 inline-flex min-h-11 min-w-11 items-center justify-center !text-current lg:hidden"
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
