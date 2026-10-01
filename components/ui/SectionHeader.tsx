import type { ReactNode } from "react";
import { RevealText } from "@/components/motion/RevealText";

type Props = {
  index: string;
  label: string;
  title: readonly string[];
  aside?: ReactNode;
  level?: "h1" | "h2";
  className?: string;
};

/** Numbered section opener: rule, mono index, oversized masked title. */
export function SectionHeader({ index, label, title, aside, level = "h2", className }: Props) {
  return (
    <div className={className}>
      <div aria-hidden className="ruler mb-6" />
      <div className="meta flex items-center justify-between gap-6">
        <span>
          <span className="numeral">{index}</span> / {label}
        </span>
        {aside}
      </div>
      <RevealText as={level} text={title.join(" ")} className="display h-section mt-6 md:mt-10" immediate={level === "h1"} />
    </div>
  );
}
