"use client";

import { useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { useReady } from "./ready";

/** Single source of truth for "should this element be revealed yet". */
export function useReveal<T extends HTMLElement = HTMLDivElement>(immediate = false) {
  const ref = useRef<T>(null);
  const ready = useReady();
  const inView = useInView(ref, { once: true, margin: "0px 0px -8% 0px" });
  const reduce = useReducedMotion() ?? false;
  return { ref, show: reduce || (ready && (immediate || inView)), reduce };
}
