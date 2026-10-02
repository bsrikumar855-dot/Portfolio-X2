"use client";

import { useSyncExternalStore } from "react";
import { themeSwitch } from "@/lib/sound";
import { getTheme, getThemeServer, setTheme, subscribeTheme } from "@/lib/theme";

type Props = { className?: string; variant?: "text" | "icon" };

/** Switches between the classic paper palette and the neon-green palette. `icon` is the compact nav key. */
export function ThemeToggle({ className, variant = "text" }: Props) {
  const theme = useSyncExternalStore(subscribeTheme, getTheme, getThemeServer);
  const neon = theme === "neon";
  const swatch = (
    <span aria-hidden className="flex size-3.5 overflow-hidden rounded-full border border-current">
      <span className="w-1/2" style={{ background: "#f2f0eb" }} />
      <span className="w-1/2" style={{ background: neon ? "#39ff14" : "#8b2635" }} />
    </span>
  );
  const label = `THEME ${neon ? "NEON" : "CLASSIC"}`;
  return (
    <button
      type="button"
      aria-pressed={neon}
      aria-label={`Theme: ${neon ? "neon green" : "classic"}. Switch theme`}
      onClick={() => {
        setTheme(neon ? "classic" : "neon");
        themeSwitch(!neon);
      }}
      className={
        variant === "icon"
          ? `group relative place-items-center border border-current/25 !text-current transition-colors hover:border-current size-8 ${className ?? "grid"}`
          : `meta items-center gap-2 !text-current ${className ?? "inline-flex"}`
      }
    >
      {swatch}
      {variant === "icon" ? (
        <span aria-hidden className="meta pointer-events-none absolute right-0 top-full z-10 mt-2 whitespace-nowrap bg-ink px-2 py-1 !text-bg opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
          {label}
        </span>
      ) : (
        label
      )}
    </button>
  );
}
