"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { capabilities } from "@/data/skills";
import { cn } from "@/lib/utils/cn";

/** "What I build": editorial rows that expand on click or keyboard. One open at a time. */
export function Capabilities() {
  const [open, setOpen] = useState(0);
  return (
    <ul className="border-b rule">
      {capabilities.map((c, i) => {
        const isOpen = open === i;
        return (
          <li key={c.title} className="border-t rule">
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`cap-${i}`}
                onClick={() => {
                  setOpen(isOpen ? -1 : i);
                }}
                className="group grid w-full grid-cols-12 items-baseline gap-x-4 gap-y-2 py-7 text-left md:py-10"
              >
                <span aria-hidden className="meta numeral col-span-2 md:col-span-1">{String(i + 1).padStart(2, "0")}</span>
                <span
                  className={cn(
                    "display text-h3 col-span-9 transition-transform duration-[400ms] ease-out md:col-span-6",
                    isOpen && "md:translate-x-1.5",
                  )}
                >
                  {c.title}
                </span>
                <span className="col-span-9 col-start-3 text-body font-normal text-secondary md:col-span-4 md:col-start-8">{c.summary}</span>
                <Plus
                  aria-hidden
                  size={18}
                  className={cn("col-start-12 row-start-1 justify-self-end transition-transform duration-[400ms]", isOpen && "rotate-45 text-accent")}
                />
              </button>
            </h3>
            <div
              id={`cap-${i}`}
              role="region"
              aria-label={c.title}
              className={cn("grid transition-[grid-template-rows] duration-[400ms] ease-out", isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}
            >
              <div className="overflow-hidden">
                <div className={cn("grid grid-cols-12 gap-x-4 gap-y-4 pb-10 transition-opacity duration-[400ms]", isOpen ? "opacity-100" : "opacity-0")}>
                  <p className="col-span-10 col-start-3 max-w-[56ch] text-body text-prose md:col-span-5 md:col-start-2">{c.detail}</p>
                  <p className="meta col-span-10 col-start-3 md:col-span-4 md:col-start-8">Seen in: {c.proof}</p>
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
