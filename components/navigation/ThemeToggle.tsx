"use client";

import { useSyncExternalStore } from "react";
import { tick } from "@/lib/sound";
import { getTheme, getThemeServer, setTheme, subscribeTheme } from "@/lib/theme";

/** Switches between the classic paper palette and the neon-green palette. */
export function ThemeToggle({ className }: { className?: string }) {
  const theme = useSyncExternalStore(subscribeTheme, getTheme, getThemeServer);
  const neon = theme === "neon";
  return (
    <button
      type="button"
      aria-pressed={neon}
      aria-label={`Theme: ${neon ? "neon green" : "classic"}. Switch theme`}
      onClick={() => {
        setTheme(neon ? "classic" : "neon");
        tick();
      }}
      className={`meta inline-flex items-center gap-2 !text-current ${className ?? ""}`}
    >
      <span aria-hidden className="flex size-3.5 overflow-hidden rounded-full border border-current">
        <span className="w-1/2" style={{ background: "#f2f0eb" }} />
        <span className="w-1/2" style={{ background: neon ? "#39ff14" : "#8b2635" }} />
      </span>
      THEME {neon ? "NEON" : "CLASSIC"}
    </button>
  );
}
