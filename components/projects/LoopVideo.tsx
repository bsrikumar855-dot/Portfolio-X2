"use client";

import { useEffect, useRef } from "react";

type Props = { src: string; poster: string };

/**
 * A muted, looping preview for a project card. Nothing loads until the card is near the viewport, it plays
 * only while visible, and it stays a still poster for reduced motion and data-saver. Decorative: the card's own
 * link text names the project.
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
        if (entry.isIntersecting) {
          if (!loaded) {
            loaded = true;
            v.poster = poster;
            if (!still) v.src = src;
          }
          if (!still) void v.play().catch(() => {});
        } else if (!still) {
          v.pause();
        }
      },
      { rootMargin: "300px 0px", threshold: 0.15 },
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
