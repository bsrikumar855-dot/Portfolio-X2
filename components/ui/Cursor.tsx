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

    const tick = () => {
      const t = target();
      const squeeze = pressed ? 5 : 0;
      const k = mode === "free" ? 0.38 : 0.24;
      cur.x += (t.x + squeeze - cur.x) * k;
      cur.y += (t.y + squeeze - cur.y) * k;
      cur.w += (t.w - squeeze * 2 - cur.w) * k;
      cur.h += (t.h - squeeze * 2 - cur.h) * k;
      const { x, y, w, h } = cur;
      const c = corners.current;
      if (c[0]) c[0].style.transform = `translate3d(${x}px, ${y}px, 0)`;
      if (c[1]) c[1].style.transform = `translate3d(${x + w - ARM}px, ${y}px, 0)`;
      if (c[2]) c[2].style.transform = `translate3d(${x}px, ${y + h - ARM}px, 0)`;
      if (c[3]) c[3].style.transform = `translate3d(${x + w - ARM}px, ${y + h - ARM}px, 0)`;
      if (dot.current) dot.current.style.transform = `translate3d(${m.x - 2}px, ${m.y - 2}px, 0)`;
      if (tag.current) tag.current.style.transform = `translate3d(${x}px, ${y - 24}px, 0)`;
      raf = requestAnimationFrame(tick);
    };

    const setMode = (next: typeof mode) => {
      mode = next;
      rootEl.dataset.mode = next;
    };

    const move = (e: MouseEvent) => {
      m.x = e.clientX;
      m.y = e.clientY;
      if (rootEl.dataset.visible !== "1") {
        // First movement: appear in place instead of flying in from off-screen.
        cur.x = m.x - BASE / 2;
        cur.y = m.y - BASE / 2;
        rootEl.dataset.visible = "1";
      }
    };
    const over = (e: MouseEvent) => {
      const t = e.target as Element | null;
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
    const down = () => {
      pressed = true;
      rootEl.dataset.pressed = "1";
    };
    const up = () => {
      pressed = false;
      delete rootEl.dataset.pressed;
    };
    const leave = () => delete rootEl.dataset.visible;

    raf = requestAnimationFrame(tick);
    window.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("mouseover", over, { passive: true });
    window.addEventListener("mousedown", down, { passive: true });
    window.addEventListener("mouseup", up, { passive: true });
    document.documentElement.addEventListener("mouseleave", leave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", move);
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
