import { experiments } from "@/data/experiments";
import { cn } from "@/lib/utils/cn";

const span = { wide: "md:col-span-7", tall: "md:col-span-5", square: "md:col-span-5" } as const;
const height = { wide: "md:min-h-[20rem]", tall: "md:min-h-[26rem]", square: "md:min-h-[20rem]" } as const;

/** Irregular hairline grid. Only real experiments. */
export function Lab({ level: H = "h3" }: { level?: "h2" | "h3" }) {
  return (
    <ul className="grid grid-cols-1 gap-px border rule bg-rule md:grid-cols-12">
      {experiments.map((e) => (
        <li key={e.id} className={cn("flex min-h-[15rem] flex-col justify-between bg-bg p-5 md:p-7", span[e.span], height[e.span])}>
          <p className="meta flex justify-between">
            <span className="numeral">{e.id}</span>
            <span>{e.tags.join(" · ")}</span>
          </p>
          <div>
            <H className={cn("display text-[clamp(2rem,4vw,3.5rem)]", e.todo && "text-secondary")}>{e.title}</H>
            <p className="mt-4 max-w-[44ch] text-secondary">{e.note}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
