import { Fragment, type CSSProperties } from "react";
import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils/cn";

/**
 * The project's real architecture, drawn as a live schematic. A red signal passes through each stage in
 * turn. Built only from `sections.system.diagram`, so it never shows anything that is not in the data.
 * Vertical in small cards, horizontal (with notes) in wide containers.
 */
export function ProjectSchematic({ project, dark }: { project: Project; dark: boolean }) {
  const steps = project.sections.system.diagram?.steps;
  if (!steps) return null;
  const n = steps.length;
  return (
    <div
      aria-hidden
      className="flex h-full w-full flex-col justify-center [@container(min-width:640px)]:flex-row [@container(min-width:640px)]:items-center"
    >
      {steps.map((s, i) => (
        <Fragment key={s.label}>
          {i > 0 && (
            <div className="flex shrink-0 items-center justify-center [@container(min-width:640px)]:w-8">
              <span className="block h-2 w-px bg-current opacity-40 [@container(min-width:640px)]:h-px [@container(min-width:640px)]:w-full" />
            </div>
          )}
          <div
            style={{ "--i": i, "--n": n } as CSSProperties}
            className={cn(
              "relative flex min-h-0 min-w-0 flex-1 flex-col justify-center overflow-hidden border px-2.5 py-1 [@container(min-width:640px)]:min-h-[8rem] [@container(min-width:640px)]:px-4 [@container(min-width:640px)]:py-4",
              s.kind === "core" && (dark ? "border-transparent bg-bg text-dark" : "border-transparent bg-ink text-bg"),
              s.kind === "llm" && "border-dashed border-current/70",
              !s.kind && "border-current/30",
            )}
          >
            <span className="meta block truncate !text-current [@container(min-width:640px)]:whitespace-normal">{s.label}</span>
            {s.note && (
              <span className="mt-1.5 hidden text-[0.8125rem] leading-snug opacity-70 [@container(min-width:640px)]:block">{s.note}</span>
            )}
            <span className="schem-bar absolute inset-x-0 bottom-0 h-[3px] origin-left bg-accent" />
          </div>
        </Fragment>
      ))}
    </div>
  );
}
