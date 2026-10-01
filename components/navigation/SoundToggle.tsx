"use client";

import { Volume2, VolumeX } from "lucide-react";
import { useSound } from "@/components/ui/SoundProvider";

/** Opt-in sound switch. Everything is synthesized, nothing downloads. */
export function SoundToggle({ className }: { className?: string }) {
  const { enabled, toggle } = useSound();
  const Icon = enabled ? Volume2 : VolumeX;
  return (
    <button
      type="button"
      aria-pressed={enabled}
      onClick={toggle}
      data-sound="none"
      data-sound-hover="none"
      className={`meta caps inline-flex min-h-11 min-w-11 items-center gap-2 whitespace-nowrap !text-current ${className ?? ""}`}
    >
      <Icon aria-hidden size={14} />
      Sound {enabled ? "on" : "off"}
    </button>
  );
}
