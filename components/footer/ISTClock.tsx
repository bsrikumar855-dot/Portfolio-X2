"use client";

import { useEffect, useState } from "react";
import { site } from "@/data/site";

const fmt = new Intl.DateTimeFormat("en-GB", { timeZone: site.timezone, hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false });

/**
 * Live IST clock. The server renders a real time (never "--:--:--"); the client text is allowed to differ
 * on hydration, then the interval takes over on mount.
 */
export function ISTClock() {
  const [now, setNow] = useState(() => fmt.format(new Date()));
  useEffect(() => {
    const tick = () => setNow(fmt.format(new Date()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);
  return (
    <span className="numeral" suppressHydrationWarning>
      {now} IST
    </span>
  );
}
