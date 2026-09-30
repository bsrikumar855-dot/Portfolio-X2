"use client";

import { useEffect, useState } from "react";
import { site } from "@/data/site";

const fmt = new Intl.DateTimeFormat("en-GB", { timeZone: site.timezone, hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false });

/** Live IST clock. Renders a stable placeholder until mounted, so there is no hydration mismatch. */
export function ISTClock() {
  const [now, setNow] = useState<string | null>(null);
  useEffect(() => {
    const tick = () => setNow(fmt.format(new Date()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);
  return (
    <span className="numeral">
      {now ?? "--:--:--"} IST
    </span>
  );
}
