"use client";

import { useEffect, useRef } from "react";

type Props = { src: string; poster: string };

/**
 * A muted, looping preview for a project card. A small silent file loads only when the card is near the
 * viewport and plays only while at least half visible, so at most one or two decode at once. It stays a still
 * poster for reduced motion and data-saver. Decorative: the card's own link text names the project.
 */
export function LoopVideo({ src, poster }: Props) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const still =
      matchMedia("(prefers-reduced-motion: reduce)").matches ||
      (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData === true;
    let loaded = false;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        if (entry.isIntersecting && !loaded) {
          loaded = true;
          v.poster = poster;
          if (!still) v.src = src;
        }
        if (still) return;
        if (entry.intersectionRatio >= 0.5) void v.play().catch(() => {});
        else v.pause();
      },
      { rootMargin: "250px 0px", threshold: [0, 0.5] },
    );
    io.observe(v);
    return () => io.disconnect();
  }, [src, poster]);

  return (
    <video
      ref={ref}
      aria-hidden
      tabIndex={-1}
      muted
      loop
      playsInline
      preload="none"
      disablePictureInPicture
      disableRemotePlayback
      className="h-full w-full bg-tint object-cover"
    />
  );
}
