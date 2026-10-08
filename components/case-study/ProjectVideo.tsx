"use client";

import { Play } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import type { LaunchVideo } from "@/data/videos";

/**
 * Launch video for a case study. Shows the poster frame in a viewfinder frame; nothing is downloaded until
 * the visitor presses play (preload is off), so it costs the page nothing.
 */
export function ProjectVideo({ video, title }: { video: LaunchVideo; title: string }) {
  const [on, setOn] = useState(false);
  return (
    <div className="relative aspect-[16/9] w-full bg-dark">
      {on ? (
        <video
          className="h-full w-full"
          src={video.src}
          poster={video.poster}
          controls
          autoPlay
          playsInline
          preload="auto"
          aria-label={`${title} launch video`}
        />
      ) : (
        <button
          type="button"
          onClick={() => setOn(true)}
          aria-label={`Play the ${title} launch video, ${video.duration}`}
          data-cursor="PLAY"
          className="group absolute inset-0 block h-full w-full text-left"
        >
          <Image src={video.poster} alt="" fill sizes="(min-width: 1480px) 1420px, 100vw" priority className="object-cover" />
          <span
            aria-hidden
            className="meta absolute bottom-4 right-4 flex items-center gap-3 bg-[#151515] px-4 py-3 !text-[#F2F0EB] transition-colors duration-200 group-hover:bg-[#8B2635] md:bottom-8 md:right-8 md:px-6 md:py-4"
          >
            <Play className="size-4 fill-current md:size-5" />
            Play launch video · {video.duration}
          </span>
        </button>
      )}
    </div>
  );
}
