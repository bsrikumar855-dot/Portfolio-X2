"use client";

import type { ReactNode } from "react";
import { TransitionLink } from "./TransitionLink";
import { soft } from "@/lib/sound";
import { cn } from "@/lib/utils/cn";

type Props = { href: string; cursor?: string; children: ReactNode; className?: string };

/**
 * Hover shell for editorial rows. Sets the `group` that drives every hover and focus state
 * (image scale, title nudge, arrow, accent line) and the cursor label. Effects are CSS transform/opacity only.
 */
export function ProjectHover({ href, cursor = "VIEW", children, className }: Props) {
  return (
    <TransitionLink href={href} onMouseEnter={() => soft()} data-cursor={cursor} className={cn("group relative block", className)}>
      {children}
    </TransitionLink>
  );
}
