"use client";

import { useEffect, useState, type ReactNode } from "react";
import { PageTransition } from "@/components/motion/PageTransition";
import { initSound } from "@/lib/sound";
import { ReadyContext } from "@/lib/motion/ready";
import { Cursor } from "./Cursor";
import { Preloader } from "./Preloader";

/** Client shell: preloader, ready signal for reveals, page transition and cursor. */
export function AppShell({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  useEffect(() => initSound(), []);
  return (
    <ReadyContext.Provider value={ready}>
      <PageTransition>{children}</PageTransition>
      <Preloader onDone={() => setReady(true)} />
      <Cursor />

    </ReadyContext.Provider>
  );
}
