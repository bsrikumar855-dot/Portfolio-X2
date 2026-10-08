"use client";

import { useEffect, useState, type ReactNode } from "react";
import { PageTransition } from "@/components/motion/PageTransition";
import { click, initSound } from "@/lib/sound";
import { ReadyContext } from "@/lib/motion/ready";
import { Cursor } from "./Cursor";
import { Preloader } from "./Preloader";

/** Client shell: preloader, ready signal for reveals, page transition and cursor. */
export function AppShell({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  useEffect(() => initSound(), []);
  // A soft click for any link or button the visitor presses.
  useEffect(() => {
    const down = (e: PointerEvent) => {
      if ((e.target as Element | null)?.closest("a[href], button")) click();
    };
    document.addEventListener("pointerdown", down, { passive: true });
    return () => document.removeEventListener("pointerdown", down);
  }, []);
  return (
    <ReadyContext.Provider value={ready}>
      <PageTransition>{children}</PageTransition>
      <Preloader onDone={() => setReady(true)} />
      <Cursor />
    </ReadyContext.Provider>
  );
}
