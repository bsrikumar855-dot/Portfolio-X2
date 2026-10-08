import { ArrowUpRight } from "lucide-react";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { ProjectHover } from "@/components/motion/ProjectHover";
import { RevealText } from "@/components/motion/RevealText";
import { ProjectVisual } from "@/components/ui/ProjectVisual";
import { VideoBadge } from "@/components/ui/VideoBadge";
import { getVideo } from "@/data/videos";
import type { Project } from "@/data/projects";

type Props = { items: readonly Project[]; level?: "h2" | "h3" };

/** Selected Work: a large editorial index, not a card grid. */
export function ProjectList({ items, level = "h3" }: Props) {
  return (
    <ol className="border-b rule">
      {items.map((p, i) => (
        <li key={p.slug} className="border-t rule">
          <ProjectHover href={`/work/${p.slug}`}>
            <article className="wrap grid12 gap-y-6 py-8 md:py-12">
              <div className="order-first col-span-12 md:order-none md:col-span-4 md:col-start-9 md:row-span-2 md:row-start-1 lg:col-span-3 lg:col-start-10">
                <ImageReveal className="aspect-[4/3] w-full">
                  <div className="h-full w-full transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] md:group-hover:-translate-x-[1.5%] md:group-hover:-translate-y-[1.5%] md:group-hover:scale-[1.07] md:group-focus-visible:scale-[1.07]">
                    <ProjectVisual project={p} index={i} tone={i % 2 === 0 ? "light" : "dark"} sizes="(min-width: 1024px) 26vw, (min-width: 768px) 33vw, 100vw" />
                  </div>
                </ImageReveal>
              </div>

              <div className="col-span-2 md:col-span-1 md:col-start-1 md:row-start-1">
                <p className="numeral text-[clamp(1.5rem,2.6vw,2.25rem)] font-medium leading-none text-secondary md:text-ink">{String(i + 1).padStart(2, "0")}</p>
                <svg aria-hidden viewBox="0 0 24 20" className="mt-3 h-4 w-5 overflow-visible">
                  <path d="M2 11 C 5 13, 7.5 16, 9 18 C 13 9, 17.5 4, 22.5 1.5" pathLength="1" strokeLinecap="round" className="fill-none stroke-accent stroke-[1.75] [stroke-dasharray:1] [stroke-dashoffset:1] transition-[stroke-dashoffset] duration-500 ease-out group-hover:[stroke-dashoffset:0] group-focus-visible:[stroke-dashoffset:0]" />
                </svg>
              </div>

              <div className="col-span-10 md:col-span-7 md:col-start-2 md:row-start-1 lg:col-span-5">
                <div className="transition-transform duration-500 ease-out md:group-hover:translate-x-3 md:group-focus-visible:translate-x-3">
                  <span className="relative inline-block max-w-full">
                    <RevealText as={level} lines={[p.title]} className="display text-[clamp(2.5rem,5.4vw,5.25rem)]" />
                    <svg aria-hidden viewBox="0 0 100 10" preserveAspectRatio="none" className="pointer-events-none absolute -bottom-2 left-0 hidden h-3 w-full overflow-visible transition-[clip-path] duration-500 ease-out [clip-path:inset(-30%_100%_-30%_-2%)] md:block md:group-hover:[clip-path:inset(-30%_-2%_-30%_-2%)] md:group-focus-visible:[clip-path:inset(-30%_-2%_-30%_-2%)]">
                      <path d="M1 6.5 C 18 2.5, 40 8.5, 62 4.5 S 92 5.5, 99 3" fill="none" stroke="var(--color-accent)" strokeWidth="2.5" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
                    </svg>
                  </span>
                </div>
                <p className="mt-4 max-w-[46ch] text-secondary md:mt-6">{p.description}</p>
                <p className="meta mt-5">{p.technologies.join(" · ")}</p>
              </div>

              <div className="meta col-span-12 grid grid-cols-2 gap-x-6 gap-y-3 md:col-span-7 md:col-start-2 md:row-start-2 md:grid-cols-3 md:self-end lg:col-span-3 lg:col-start-7 lg:row-start-1 lg:grid-cols-1 lg:self-start">
                <div>
                  <span className="sr-only">Category</span>
                  <span className="text-ink">{p.category}</span>
                </div>
                <div>
                  <span className="sr-only">Role</span>
                  <span>
                    {p.role}
                  </span>
                </div>
                <div className="col-span-2 transition-colors duration-300 md:col-span-1 md:group-hover:text-accent md:group-focus-visible:text-accent">
                  <span className="sr-only">Status</span>
                  <span className="flex items-center gap-2">
                    {p.status}
                  </span>
                </div>
                {getVideo(p.slug) && (
                  <div className="col-span-2 md:col-span-3 lg:col-span-1">
                    <VideoBadge duration={getVideo(p.slug)!.duration} />
                  </div>
                )}
                <div className="col-span-2 flex items-center gap-2 !text-ink md:col-span-3 lg:col-span-1 lg:pt-4">
                  <span className="border-b border-current pb-1">VIEW CASE STUDY</span>
                  <ArrowUpRight
                    aria-hidden
                    size={14}
                    className="transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-1 group-focus-visible:-translate-y-0.5 group-focus-visible:translate-x-1"
                  />
                </div>
              </div>
            </article>
          </ProjectHover>
        </li>
      ))}
    </ol>
  );
}
