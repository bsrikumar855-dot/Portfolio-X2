"use client";

import { useSyncExternalStore } from "react";
import { getSound, getSoundServer, setSound, subscribeSound } from "@/lib/sound";

/** Opt-in sound switch. Everything is synthesized, nothing downloads. */
export function SoundToggle({ className }: { className?: string }) {
  const on = useSyncExternalStore(subscribeSound, getSound, getSoundServer);
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={() => setSound(!on)}
      className={`meta inline-flex items-center gap-2 !text-current ${className ?? ""}`}
    >
      <span aria-hidden className="flex h-3 items-end gap-[2px]">
        {[5, 9, 6, 11].map((h, i) => (
          <span key={i} className="w-[2px] bg-current transition-opacity" style={{ height: on ? h : 3, opacity: on ? 1 : 0.5 }} />
        ))}
      </span>
      SOUND {on ? "ON" : "OFF"}
    </button>
  );
}
