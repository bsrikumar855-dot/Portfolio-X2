import type { DiagramStep } from "@/data/projects";
import { cn } from "@/lib/utils/cn";

type Props = { caption: string; steps: readonly DiagramStep[] };

const kindLabel = { core: "Deterministic core", llm: "LLM language layer" } as const;

/** Architecture diagram from data: solid fill = deterministic core, dashed = LLM layer, hairline = neutral step. */
export function SystemDiagram({ caption, steps }: Props) {
  const legend = (["core", "llm"] as const).filter((k) => steps.some((s) => s.kind === k));
  return (
    <figure className="mt-10">
      <figcaption className="meta mb-5">Diagram · {caption}</figcaption>
      <ol className="max-w-[40rem]">
        {steps.map((s, i) => (
          <li key={s.label}>
            {i > 0 && <span aria-hidden className="ml-6 block h-5 w-px bg-ink/40" />}
            <div
              className={cn(
                "flex items-start gap-4 border px-4 py-4 md:px-5",
                s.kind === "core" && "border-ink bg-ink text-bg",
                s.kind === "llm" && "border-dashed border-ink",
                !s.kind && "rule",
              )}
            >
              <span className={cn("meta numeral pt-0.5", s.kind === "core" && "!text-bg/70")}>{String(i + 1).padStart(2, "0")}</span>
              <div>
                <p className="font-medium tracking-[-0.01em]">{s.label}</p>
                {s.note && <p className={cn("mt-1 text-[0.95rem]", s.kind === "core" ? "text-bg/75" : "text-secondary")}>{s.note}</p>}
              </div>
            </div>
          </li>
        ))}
      </ol>
      {legend.length > 0 && (
        <p className="meta mt-5 flex flex-wrap gap-x-6 gap-y-1">
          {legend.map((k) => (
            <span key={k} className="flex items-center gap-2">
              <span aria-hidden className={cn("inline-block h-2.5 w-4 border border-ink", k === "core" ? "bg-ink" : "border-dashed")} />
              {kindLabel[k]}
            </span>
          ))}
        </p>
      )}
    </figure>
  );
}
