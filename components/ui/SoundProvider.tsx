"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import type { SoundName } from "@/lib/sound/engine";

type Engine = typeof import("@/lib/sound/engine");
type SoundApi = { enabled: boolean; toggle: () => void; play: (name: SoundName) => void };

const KEY = "sk-sound";
const noop = () => {};
const SoundContext = createContext<SoundApi>({ enabled: false, toggle: noop, play: noop });
export const useSound = (): SoundApi => useContext(SoundContext);

const INTERACTIVE = "a[href], button:not([disabled]), [role='button']";
const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Opt-in UI sound. Off by default, never before a gesture. The engine is a dynamic import that only
 * loads once sound is switched on (or, for a saved ON, on the first click or key press).
 * Hover and click sounds are delegated: any link or button gets them, `data-sound` / `data-sound-hover` override.
 */
export function SoundProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(false);
  const engine = useRef<Engine | null>(null);
  const on = useRef(false);

  const load = useCallback(async (): Promise<Engine> => {
    engine.current ??= await import("@/lib/sound/engine");
    return engine.current;
  }, []);

  const play = useCallback((name: SoundName) => {
    if (on.current) engine.current?.play(name);
  }, []);

  const activate = useCallback(
    async (persist: boolean) => {
      const eng = await load();
      eng.init();
      eng.setEnabled(true);
      on.current = true;
      setEnabled(true);
      if (persist) {
        try {
          localStorage.setItem(KEY, "1");
        } catch {}
        eng.play("confirm");
      }
    },
    [load],
  );

  const toggle = useCallback(() => {
    if (on.current) {
      engine.current?.setEnabled(false);
      on.current = false;
      setEnabled(false);
      try {
        localStorage.setItem(KEY, "0");
      } catch {}
    } else {
      void activate(true);
    }
  }, [activate]);

  // Restore a saved ON (never under reduced motion). Audio still waits for the first gesture.
  useEffect(() => {
    let saved = false;
    try {
      saved = localStorage.getItem(KEY) === "1" && !reduced();
    } catch {}
    if (!saved) return;
    const arm = () => {
      void activate(false);
    };
    window.addEventListener("pointerdown", arm, { once: true });
    window.addEventListener("keydown", arm, { once: true });
    return () => {
      window.removeEventListener("pointerdown", arm);
      window.removeEventListener("keydown", arm);
    };
  }, [activate]);

  // Delegated hover + click sounds. Mouse hover only: touch has no hover.
  useEffect(() => {
    const over = (e: PointerEvent) => {
      if (!on.current || e.pointerType !== "mouse") return;
      const el = (e.target as Element | null)?.closest<HTMLElement>(INTERACTIVE);
      if (!el || (e.relatedTarget instanceof Node && el.contains(e.relatedTarget))) return;
      const kind = el.dataset.soundHover ?? "tick";
      if (kind !== "none") play(kind as SoundName);
    };
    const click = (e: MouseEvent) => {
      if (!on.current) return;
      const el = (e.target as Element | null)?.closest<HTMLElement>(INTERACTIVE);
      if (!el) return;
      const kind = el.dataset.sound ?? "click";
      if (kind !== "none") play(kind as SoundName);
    };
    document.addEventListener("pointerover", over);
    document.addEventListener("click", click);
    return () => {
      document.removeEventListener("pointerover", over);
      document.removeEventListener("click", click);
    };
  }, [play]);

  const value = useMemo(() => ({ enabled, toggle, play }), [enabled, toggle, play]);
  return <SoundContext.Provider value={value}>{children}</SoundContext.Provider>;
}
