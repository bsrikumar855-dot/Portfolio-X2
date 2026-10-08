"use client";

import { useEffect, useRef, useState } from "react";

const BASE = 30; // idle reticle size
const BIG = 58; // reticle size over large targets
const PAD = 7; // breathing room when locked onto an element
const ARM = 11; // length of each bracket arm

const arm = "absolute left-0 top-0 will-change-transform";
const SELECTOR = "[data-cursor], a[href], button, [role='button'], summary";

/**
 * Viewfinder cursor, echoing the hero. Idle: four corner brackets and a precise centre dot. Over a link or
 * button the brackets lock onto the element like a detection box. Over very large targets (project rows) it
 * stays a small reticle and shows the label tag. Pressing squeezes it like a shutter. Desktop pointers only;
 * never mounted for touch or reduced motion, and never required for operation.
 */
export function Cursor() {
  const root = useRef<HTMLDivElement>(null);
  const corners = useRef<(HTMLSpanElement | null)[]>([]);
  const dot = useRef<HTMLSpanElement>(null);
  const tag = useRef<HTMLSpanElement>(null);
  const [label, setLabel] = useState("");

  useEffect(() => {
    const ok = matchMedia("(hover: hover) and (pointer: fine)").matches && !matchMedia("(prefers-reduced-motion: reduce)").matches;
    const rootEl = root.current;
    if (!ok || !rootEl) return;
    document.documentElement.classList.add("has-cursor");

    const m = { x: -200, y: -200 };
    const cur = { x: -200, y: -200, w: BASE, h: BASE };
    let mode: "free" | "lock" | "big" = "free";
    let el: Element | null = null;
    let pressed = false;
    let raf = 0;

    const target = () => {
      if (mode === "lock" && el?.isConnected) {
        const r = el.getBoundingClientRect();
        return { x: r.left - PAD, y: r.top - PAD, w: Math.max(BASE, r.width + PAD * 2), h: Math.max(BASE, r.height + PAD * 2) };
      }
      const s = mode === "big" ? BIG : BASE;
      return { x: m.x - s / 2, y: m.y - s / 2, w: s, h: s };
    };

    // The loop only runs while something is still moving, then goes to sleep (no idle frames, no idle style work).
    const tick = () => {
      raf = 0;
      const t = target();
      const squeeze = pressed ? 5 : 0;
      const k = mode === "free" ? 0.38 : 0.24;
      const tx = t.x + squeeze;
      const ty = t.y + squeeze;
      const tw = t.w - squeeze * 2;
      const th = t.h - squeeze * 2;
      cur.x += (tx - cur.x) * k;
      cur.y += (ty - cur.y) * k;
      cur.w += (tw - cur.w) * k;
      cur.h += (th - cur.h) * k;
      const settling = Math.abs(tx - cur.x) > 0.2 || Math.abs(ty - cur.y) > 0.2 || Math.abs(tw - cur.w) > 0.2 || Math.abs(th - cur.h) > 0.2;
      if (!settling) {
        cur.x = tx;
        cur.y = ty;
        cur.w = tw;
        cur.h = th;
      }
      const { x, y, w, h } = cur;
      const c = corners.current;
      if (c[0]) c[0].style.transform = `translate3d(${x}px, ${y}px, 0)`;
      if (c[1]) c[1].style.transform = `translate3d(${x + w - ARM}px, ${y}px, 0)`;
      if (c[2]) c[2].style.transform = `translate3d(${x}px, ${y + h - ARM}px, 0)`;
      if (c[3]) c[3].style.transform = `translate3d(${x + w - ARM}px, ${y + h - ARM}px, 0)`;
      if (dot.current) dot.current.style.transform = `translate3d(${m.x - 2}px, ${m.y - 2}px, 0)`;
      if (tag.current) tag.current.style.transform = `translate3d(${x}px, ${y - 24}px, 0)`;
      if (settling) wake();
    };
    const wake = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const setMode = (next: typeof mode) => {
      mode = next;
      rootEl.dataset.mode = next;
      wake();
    };

    const move = (e: MouseEvent) => {
      m.x = e.clientX;
      m.y = e.clientY;
      wake();
      if (rootEl.dataset.visible !== "1") {
        // First movement: appear in place instead of flying in from off-screen.
        cur.x = m.x - BASE / 2;
        cur.y = m.y - BASE / 2;
        rootEl.dataset.visible = "1";
      }
    };
    const evaluate = (t: Element | null) => {
      rootEl.dataset.tone = t?.closest(".dark-zone") ? "dark" : "light";
      el = t?.closest(SELECTOR) ?? null;
      if (!el) {
        setMode("free");
        setLabel("");
        return;
      }
      const r = el.getBoundingClientRect();
      setLabel((el as HTMLElement).dataset.cursor ?? "");
      setMode(r.width > 380 || r.height > 240 ? "big" : "lock");
    };
    let scrolling = false;
    let idle = 0;
    const over = (e: MouseEvent) => {
      if (!scrolling) evaluate(e.target as Element | null);
    };
    const onScrollEnd = () => {
      scrolling = true;
      window.clearTimeout(idle);
      idle = window.setTimeout(() => {
        scrolling = false;
        if (m.x >= 0) evaluate(document.elementFromPoint(m.x, m.y));
      }, 150);
    };
    const down = () => {
      pressed = true;
      rootEl.dataset.pressed = "1";
      wake();
    };
    const up = () => {
      pressed = false;
      delete rootEl.dataset.pressed;
      wake();
    };
    const leave = () => delete rootEl.dataset.visible;

    wake();
    window.addEventListener("mousemove", move, { passive: true });
    // A locked reticle follows its element while the page scrolls under a still mouse.
    window.addEventListener("scroll", wake, { passive: true });
    window.addEventListener("scroll", onScrollEnd, { passive: true });
    document.addEventListener("mouseover", over, { passive: true });
    window.addEventListener("mousedown", down, { passive: true });
    window.addEventListener("mouseup", up, { passive: true });
    document.documentElement.addEventListener("mouseleave", leave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", move);
      window.removeEventListener("scroll", wake);
      window.removeEventListener("scroll", onScrollEnd);
      window.clearTimeout(idle);
      document.removeEventListener("mouseover", over);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      document.documentElement.removeEventListener("mouseleave", leave);
      document.documentElement.classList.remove("has-cursor");
    };
  }, []);

  return (
    <div ref={root} aria-hidden className="reticle" data-mode="free" data-tone="light">
      <span ref={(n) => void (corners.current[0] = n)} className={`${arm} border-l-2 border-t-2`} style={{ width: ARM, height: ARM }} />
      <span ref={(n) => void (corners.current[1] = n)} className={`${arm} border-r-2 border-t-2`} style={{ width: ARM, height: ARM }} />
      <span ref={(n) => void (corners.current[2] = n)} className={`${arm} border-b-2 border-l-2`} style={{ width: ARM, height: ARM }} />
      <span ref={(n) => void (corners.current[3] = n)} className={`${arm} border-b-2 border-r-2`} style={{ width: ARM, height: ARM }} />
      <span ref={dot} className="absolute left-0 top-0 size-1 rounded-full bg-current" />
      <span ref={tag} className="meta absolute left-0 top-0 whitespace-nowrap bg-accent px-1.5 py-px !text-bg" style={{ opacity: label ? 1 : 0 }}>
        {label}
      </span>
    </div>
  );
}
