import Image from "next/image";
import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils/cn";

type Props = {
  project: Project;
  index: number;
  className?: string;
  sizes?: string;
  priority?: boolean;
  tone?: "light" | "dark";
};

/** Real image when data provides one, otherwise a typographic placeholder that says so. */
export function ProjectVisual({ project, index, className, sizes = "(min-width: 1024px) 40vw, 100vw", priority, tone = "light" }: Props) {
  if (project.image) {
    return (
      <div className={cn("relative h-full w-full", className)}>
        <Image src={project.image} alt={`${project.title} screenshot`} fill sizes={sizes} priority={priority} className="object-cover" />
      </div>
    );
  }
  const dark = tone === "dark";
  return (
    <div
      role="img"
      aria-label={`${project.title}: placeholder, screenshot to be added`}
      className={cn("relative h-full w-full overflow-hidden [container-type:size]", dark ? "dark-zone" : "bg-tint text-ink", className)}
    >
      <svg aria-hidden viewBox="0 0 400 300" preserveAspectRatio="xMinYMax slice" className="absolute inset-0 h-full w-full">
        <text x="-6" y="318" fontSize="250" fontWeight="500" letterSpacing="-12" className={dark ? "fill-dark-rule" : "fill-rule"} fontFamily="var(--font-geist-sans), sans-serif">
          {String(index + 1).padStart(2, "0")}
        </text>
      </svg>
      <span className={cn("absolute inset-x-5 top-[38%] h-px", dark ? "bg-dark-rule" : "bg-rule")} />
      <span className={cn("absolute inset-y-5 left-[62%] w-px", dark ? "bg-dark-rule" : "bg-rule")} />
      <span className="meta absolute left-4 top-4">{project.title}</span>
      <span className="meta absolute bottom-4 right-4 text-right">PLACEHOLDER — add screenshot</span>
    </div>
  );
}
