"use client";

import { useSyncExternalStore } from "react";
import { getSound, getSoundServer, setSound, subscribeSound } from "@/lib/sound";

type Props = { className?: string; variant?: "text" | "icon" };

/** Sound switch. Everything is synthesized, nothing downloads. `icon` is the compact nav key. */
export function SoundToggle({ className, variant = "text" }: Props) {
  const on = useSyncExternalStore(subscribeSound, getSound, getSoundServer);
  const bars = (
    <span aria-hidden className="flex h-3 items-end gap-[2px]">
      {[5, 9, 6, 11].map((h, i) => (
        <span key={i} className="w-[2px] bg-current transition-opacity" style={{ height: on ? h : 3, opacity: on ? 1 : 0.5 }} />
      ))}
    </span>
  );
  const label = `SOUND ${on ? "ON" : "OFF"}`;
  return (
    <button
      type="button"
      aria-pressed={on}
      aria-label={variant === "icon" ? `Sound ${on ? "on" : "off"}. Toggle sound` : undefined}
      onClick={() => setSound(!on)}
      className={
        variant === "icon"
          ? `group relative place-items-center border border-current/25 !text-current transition-colors hover:border-current size-8 ${className ?? "grid"}`
          : `meta items-center gap-2 !text-current ${className ?? "inline-flex"}`
      }
    >
      {bars}
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
