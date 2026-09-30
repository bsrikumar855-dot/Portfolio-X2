"use client";

import Link from "next/link";
import type { ComponentProps, MouseEvent } from "react";
import { useTransitionNav } from "./PageTransition";

type Props = ComponentProps<typeof Link>;

/** next/link that routes through the page transition for plain left-clicks on internal paths. */
export function TransitionLink({ href, onClick, ...rest }: Props) {
  const go = useTransitionNav();
  const handle = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    const target = typeof href === "string" ? href : (href.pathname ?? "");
    const plain = !(e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0);
    if (!go || !plain || e.defaultPrevented || !target.startsWith("/") || target.startsWith("/#")) return;
    e.preventDefault();
    go(target);
  };
  return <Link href={href} onClick={handle} {...rest} />;
}
