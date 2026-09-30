"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { capabilities } from "@/data/skills";
import { soft } from "@/lib/sound";
import { cn } from "@/lib/utils/cn";

/** "What I build": editorial rows that expand on hover, focus or click. One open at a time. */
export function Capabilities() {
  const [open, setOpen] = useState(0);
  return (
    <ul className="border-b rule">
      {capabilities.map((c, i) => {
        const isOpen = open === i;
        return (
          <li key={c.title} className="border-t rule" onMouseEnter={() => matchMedia("(hover: hover)").matches && setOpen(i)}>
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`cap-${i}`}
                onClick={() => {
                  soft();
                  setOpen(isOpen ? -1 : i);
                }}
                className="group grid w-full grid-cols-12 items-baseline gap-x-4 py-6 text-left md:py-8"
              >
                <span className="meta numeral col-span-2 md:col-span-1">{String(i + 1).padStart(2, "0")}</span>
                <span
                  className={cn(
                    "display col-span-9 text-[clamp(1.85rem,4.6vw,4rem)] transition-transform duration-500 ease-out md:col-span-6",
                    isOpen && "md:translate-x-3",
                  )}
                >
                  {c.title}
                </span>
                <span className="col-span-9 col-start-3 mt-2 text-secondary md:col-span-4 md:col-start-8 md:mt-0">{c.summary}</span>
                <Plus
                  aria-hidden
                  size={18}
                  className={cn("col-start-12 row-start-1 justify-self-end transition-transform duration-300", isOpen && "rotate-45 text-accent")}
                />
              </button>
            </h3>
            <div
              id={`cap-${i}`}
              role="region"
              aria-label={c.title}
              className={cn("grid transition-[grid-template-rows] duration-500 ease-out", isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}
            >
              <div className="overflow-hidden">
                <div className={cn("grid grid-cols-12 gap-x-4 pb-8 transition-opacity duration-500", isOpen ? "opacity-100" : "opacity-0")}>
                  <p className="col-span-10 col-start-3 max-w-[52ch] md:col-span-5 md:col-start-2">{c.detail}</p>
                  <p className="meta col-span-10 col-start-3 mt-4 md:col-span-4 md:col-start-8 md:mt-0">
                    Seen in: {c.proof}
                  </p>
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
