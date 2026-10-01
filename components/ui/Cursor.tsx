"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Desktop-only follower. A dot that grows on links and shows a label on elements with data-cursor.
 * Never mounted on touch or with reduced motion, and never required for operation.
 */
export function Cursor() {
  const [label, setLabel] = useState("");
  const [grown, setGrown] = useState(false);
  const [visible, setVisible] = useState(false);
  const pos = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ok = matchMedia("(hover: hover) and (pointer: fine)").matches && !matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!ok) return;
    document.documentElement.classList.add("has-cursor");

    let x = 0, y = 0, cx = 0, cy = 0, raf = 0;
    const tick = () => {
      cx += (x - cx) * 0.22;
      cy += (y - cy) * 0.22;
      if (pos.current) pos.current.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      raf = requestAnimationFrame(tick);
    };
    const move = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      setVisible(true);
    };
    const over = (e: MouseEvent) => {
      const el = (e.target as Element | null)?.closest<HTMLElement>("[data-cursor], a, button");
      setGrown(!!el);
      setLabel(el?.dataset.cursor ?? "");
    };
    const leave = () => setVisible(false);
    raf = requestAnimationFrame(tick);
    window.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("mouseover", over, { passive: true });
    document.documentElement.addEventListener("mouseleave", leave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", over);
      document.documentElement.removeEventListener("mouseleave", leave);
      document.documentElement.classList.remove("has-cursor");
    };
  }, []);

  const size = label ? 88 : grown ? 44 : 10;
  return (
    <div ref={pos} aria-hidden className="pointer-events-none fixed left-0 top-0 z-[300]" style={{ opacity: visible ? 1 : 0 }}>
      <div
        className="flex items-center justify-center rounded-full transition-[width,height,background-color,border-color] duration-300 ease-out"
        style={{
          width: size,
          height: size,
          transform: "translate(-50%, -50%)",
          background: label ? "var(--color-accent)" : grown ? "transparent" : "#fff",
          border: grown && !label ? "1px solid #fff" : "1px solid transparent",
          mixBlendMode: label ? "normal" : "difference",
        }}
      >
        {label && <span className="meta caps !text-bg">{label}</span>}
      </div>
    </div>
  );
}
