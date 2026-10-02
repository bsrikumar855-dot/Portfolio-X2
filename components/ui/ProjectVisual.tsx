import Image from "next/image";
import type { Project } from "@/data/projects";
import { ProjectSchematic } from "@/components/projects/ProjectSchematic";
import { cn } from "@/lib/utils/cn";

type Props = {
  project: Project;
  index: number;
  className?: string;
  sizes?: string;
  priority?: boolean;
  tone?: "light" | "dark";
};

/**
 * A real screenshot when data provides one. Otherwise a typographic cover built only from the project's
 * own facts: its headline number or principle, its stack and its category. It does not imitate a screenshot.
 */
export function ProjectVisual({ project, index, className, sizes = "(min-width: 1024px) 40vw, 100vw", priority, tone = "light" }: Props) {
  if (project.image) {
    return (
      <div className={cn("relative h-full w-full", className)}>
        <Image src={project.image} alt={`${project.title} screenshot`} fill sizes={sizes} priority={priority} className="object-cover" />
      </div>
    );
  }
  const dark = tone === "dark";
  const metric = project.metrics[0];
  return (
    <div
      role="img"
      aria-label={`${project.title} system schematic: ${project.sections.system.diagram?.steps.map((x) => x.label).join(", then ") ?? project.category}`}
      className={cn("relative h-full w-full overflow-hidden [container-type:size]", dark ? "dark-zone" : "bg-tint text-ink", className)}
    >
      <svg aria-hidden viewBox="0 0 400 300" preserveAspectRatio="xMinYMax slice" className="absolute inset-0 h-full w-full">
        <text x="-6" y="318" fontSize="250" fontWeight="500" letterSpacing="-12" className={dark ? "fill-dark-rule" : "fill-rule"} fontFamily="var(--font-geist-sans), sans-serif">
          {String(index + 1).padStart(2, "0")}
        </text>
      </svg>
      <span className="meta absolute left-4 top-4">{project.title}</span>

      <div className="absolute inset-x-4 bottom-4 top-12 [@container(min-height:420px)]:bottom-28">
        <ProjectSchematic project={project} dark={dark} />
      </div>

      <div className="absolute inset-x-4 bottom-4 hidden items-end justify-between gap-4 [@container(min-height:420px)]:flex">
        {metric ? (
          <p className="min-w-0">
            <span className="numeral block text-[clamp(2rem,22cqh,6rem)] font-medium uppercase leading-[0.9]">{metric.value}</span>
            <span className="meta mt-1 block">{metric.label}</span>
          </p>
        ) : (
          <p className="max-w-[16ch] text-[clamp(1.1rem,9cqh,2rem)] font-medium leading-[1.05] tracking-[-0.02em]">{project.principle ?? project.description}</p>
        )}
        <p className="meta hidden text-right [@container(min-width:520px)]:block">{project.technologies.slice(0, 3).join(" · ")}</p>
      </div>
    </div>
  );
}
