"use client";

import { useState, type ReactNode } from "react";
import { PageTransition } from "@/components/motion/PageTransition";
import { ReadyContext } from "@/lib/motion/ready";
import { Cursor } from "./Cursor";
import { Preloader } from "./Preloader";
import { ScrollProgress } from "./ScrollProgress";
import { SoundProvider } from "./SoundProvider";

/** Client shell: sound, preloader, ready signal for reveals, page transition, progress bar and cursor. */
export function AppShell({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  return (
    <SoundProvider>
      <ReadyContext.Provider value={ready}>
        <ScrollProgress />
        <PageTransition>{children}</PageTransition>
        <Preloader onDone={() => setReady(true)} />
        <Cursor />
      </ReadyContext.Provider>
    </SoundProvider>
  );
}
