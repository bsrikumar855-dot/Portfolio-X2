import { ArrowUpRight } from "lucide-react";
import { ProjectHover } from "@/components/motion/ProjectHover";
import { RevealText } from "@/components/motion/RevealText";
import { RowReveal } from "@/components/motion/RowReveal";
import { ProjectVisual } from "@/components/ui/ProjectVisual";
import type { Project } from "@/data/projects";

type Props = { items: readonly Project[]; level?: "h2" | "h3" };

/** Selected Work: a large editorial index, not a card grid. Three type styles per row: display, body, mono. */
export function ProjectList({ items, level = "h3" }: Props) {
  return (
    <ol className="border-b rule">
      {items.map((p, i) => (
        <li key={p.slug} className="border-t rule">
          <RowReveal index={i}>
            <ProjectHover href={`/work/${p.slug}`}>
              <article className="wrap grid12 gap-y-6 py-10 md:py-14">
                <div className="order-first col-span-12 md:order-none md:col-span-4 md:col-start-9 md:row-span-2 md:row-start-1 lg:col-span-3 lg:col-start-10">
                  <div className="aspect-[4/3] w-full overflow-hidden">
                    <div className="h-full w-full transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03] group-focus-visible:scale-[1.03]">
                      <ProjectVisual project={p} index={i} tone={i % 2 === 0 ? "light" : "dark"} sizes="(min-width: 1024px) 26vw, (min-width: 768px) 33vw, 100vw" />
                    </div>
                  </div>
                </div>

                <div className="col-span-2 md:col-span-1 md:col-start-1 md:row-start-1">
                  <p className="display numeral text-h3 text-secondary transition-[transform,color] duration-300 ease-out group-hover:translate-x-1 group-hover:text-ink group-focus-visible:translate-x-1 group-focus-visible:text-ink">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <svg aria-hidden viewBox="0 0 24 20" className="mt-3 h-4 w-5 overflow-visible transition-transform duration-300 ease-out group-hover:translate-x-1 group-focus-visible:translate-x-1">
                    <path d="M2 11 C 5 13, 7.5 16, 9 18 C 13 9, 17.5 4, 22.5 1.5" pathLength="1" strokeLinecap="round" className="fill-none stroke-accent stroke-[1.75] [stroke-dasharray:1] [stroke-dashoffset:1] transition-[stroke-dashoffset] duration-500 ease-out group-hover:[stroke-dashoffset:0] group-focus-visible:[stroke-dashoffset:0]" />
                  </svg>
                </div>

                <div className="col-span-10 md:col-span-7 md:col-start-2 md:row-start-1 lg:col-span-5">
                  <div className="transition-transform duration-300 ease-out group-hover:translate-x-1.5 group-focus-visible:translate-x-1.5">
                    <span className="relative inline-block max-w-full pb-2">
                      <RevealText as={level} text={p.title} className="display text-project" />
                      <span aria-hidden className="pointer-events-none absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 bg-accent transition-transform duration-[350ms] ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100" />
                    </span>
                  </div>
                  <p className="mt-4 max-w-[46ch] text-body text-prose md:mt-6">{p.description}</p>
                  <p className="meta mt-5 max-w-[52ch]">{p.technologies.join(" · ")}</p>
                </div>

                <div className="meta col-span-12 grid grid-cols-2 gap-x-6 gap-y-3 md:col-span-7 md:col-start-2 md:row-start-2 md:grid-cols-3 md:self-end lg:col-span-3 lg:col-start-7 lg:row-start-1 lg:grid-cols-1 lg:self-start">
                  <div>
                    <span className="sr-only">Category</span>
                    <span className="text-ink">{p.category}</span>
                  </div>
                  <div>
                    <span className="sr-only">Role</span>
                    <span>{p.role}</span>
                  </div>
                  <div className="col-span-2 transition-colors duration-300 group-hover:text-accent group-focus-visible:text-accent md:col-span-1">
                    <span className="sr-only">Status</span>
                    <span>{p.status}</span>
                  </div>
                  <div className="col-span-2 flex items-center gap-2 !text-ink md:col-span-3 lg:col-span-1 lg:pt-4">
                    <span className="border-b border-current pb-1">View case study</span>
                    <ArrowUpRight
                      aria-hidden
                      size={14}
                      className="transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-1 group-focus-visible:-translate-y-0.5 group-focus-visible:translate-x-1"
                    />
                  </div>
                </div>
              </article>
            </ProjectHover>
          </RowReveal>
        </li>
      ))}
    </ol>
  );
}
