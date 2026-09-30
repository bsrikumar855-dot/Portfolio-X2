import { ArrowUpRight } from "lucide-react";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { PenMark } from "@/components/motion/PenMark";
import { ParallaxImage } from "@/components/motion/ParallaxImage";
import { RevealText } from "@/components/motion/RevealText";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { ProjectVisual } from "@/components/ui/ProjectVisual";
import { chapters, nextProject, projects, type Project, type Section } from "@/data/projects";
import { isTodo } from "@/data/site";
import { ChapterNav } from "./ChapterNav";
import { SystemDiagram } from "./SystemDiagram";

const BODY_ID = "case-body";
const chapterList = chapters.map((c) => ({ id: c.key, label: c.label }));

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="meta">{label}</dt>
      <dd className={`mt-2 ${isTodo(value) ? "meta !text-accent" : "text-[1.0625rem]"}`}>{value}</dd>
    </div>
  );
}

function Body({ s, isResult, project }: { s: Section; isResult?: boolean; project: Project }) {
  return (
    <div className="space-y-6 text-[1.1875rem] leading-[1.6]">
      {s.paragraphs?.map((p, i) => (
        <p key={p} className={`max-w-[58ch] ${i === 0 ? "text-ink" : "text-secondary"}`}>
          {p}
        </p>
      ))}
      {s.diagram && <SystemDiagram {...s.diagram} />}
      {s.bullets && (
        <ul className="border-b rule text-[1.0625rem]">
          {s.bullets.map((b) => (
            <li key={b} className="border-t rule py-3.5">
              {b}
            </li>
          ))}
        </ul>
      )}
      {isResult && project.metrics.length > 0 && (
        <dl className="grid grid-cols-2 gap-6 border-t rule pt-6">
          {project.metrics.map((m) => (
            <div key={m.label}>
              <dd className="numeral text-[clamp(3rem,7vw,5.5rem)] font-medium uppercase leading-none">{m.value}</dd>
              <dt className="meta mt-3">{m.label}</dt>
            </div>
          ))}
        </dl>
      )}
      {s.todo && <p className="meta border border-dashed border-accent p-4 !text-accent">{s.todo}</p>}
    </div>
  );
}

export function CaseStudy({ project }: { project: Project }) {
  const index = projects.findIndex((p) => p.slug === project.slug);
  const next = nextProject(project.slug);
  const nextIndex = projects.findIndex((p) => p.slug === next.slug);

  return (
    <article>
      <header className="wrap pb-12 pt-[calc(var(--nav-h)+3rem)] md:pb-20 md:pt-[calc(var(--nav-h)+5rem)]">
        <p className="meta flex justify-between">
          <span>
            <span className="numeral">{String(index + 1).padStart(2, "0")}</span> / {String(projects.length).padStart(2, "0")} · {project.category}
          </span>
        </p>
        <RevealText as="h1" lines={[project.title]} immediate className="display mt-8 text-[clamp(3.25rem,15vw,15rem)] md:mt-12" />
        {project.principle && (
          <p className="mt-8 max-w-[24ch] text-[clamp(1.5rem,3.2vw,2.75rem)] font-medium leading-[1.1] tracking-[-0.03em] md:mt-12">
            <span className="meta mb-3 block">Through-line</span>
            <span className="relative inline-block pb-[0.25em]">
              {project.principle}
              <PenMark variant="underline" delay={0.9} className="absolute bottom-0 left-0 h-[0.22em] w-full" />
            </span>
          </p>
        )}
        <dl className={`mt-12 grid grid-cols-2 gap-x-6 gap-y-6 border-t rule pt-6 md:mt-16 ${project.team ? "md:grid-cols-4" : "md:grid-cols-3"}`}>
          <Meta label="Category" value={project.category} />
          <Meta label="Role" value={project.role} />
          {project.team && <Meta label="Team" value={project.team} />}
          <Meta label="Status" value={project.status} />
        </dl>
        {project.links.length > 0 && (
          <ul className="mt-8 flex gap-6">
            {project.links.map((l) => (
              <li key={l.href}>
                <a href={l.href} target="_blank" rel="noopener noreferrer" className="meta link-u inline-flex items-center gap-2 !text-ink">
                  {l.label.toUpperCase()}
                  <ArrowUpRight aria-hidden size={14} />
                </a>
              </li>
            ))}
          </ul>
        )}
      </header>

      <div className="wrap">
        <ImageReveal className="aspect-[4/3] w-full md:aspect-[16/8]">
          <ParallaxImage className="h-full w-full">
            <ProjectVisual project={project} index={index} tone="dark" sizes="100vw" priority />
          </ParallaxImage>
        </ImageReveal>
      </div>

      <div id={BODY_ID} className="wrap grid12 mt-12 gap-y-0 pb-24 md:mt-24 md:pb-36">
        <ChapterNav chapters={chapterList} bodyId={BODY_ID} />
        <div className="col-span-12 md:col-span-8 md:col-start-5">
          {chapters.map((c, i) => (
            <section key={c.key} id={c.key} aria-labelledby={`${c.key}-h`} className="scroll-mt-32 border-t rule py-12 first:border-t-0 first:pt-2 md:py-20 md:first:pt-0">
              <h2 id={`${c.key}-h`} className="mb-8 flex items-baseline gap-4 md:mb-10">
                <span className="meta numeral">{String(i + 1).padStart(2, "0")}</span>
                <span className="display text-[clamp(1.9rem,4vw,3.5rem)]">{c.label}</span>
              </h2>
              <Body s={project.sections[c.key]} isResult={c.key === "result"} project={project} />
            </section>
          ))}
        </div>
      </div>

      <aside aria-label="Next project" className="dark-zone">
        <ArrowLink
          href={`/work/${next.slug}`}
          arrow={false}
          data-cursor="OPEN"
          className="group !block !border-0 !pb-0"
        >
          <span className="wrap block py-14 md:py-24">
            <span className="meta flex justify-between">
              <span>NEXT PROJECT</span>
              <span className="numeral">{String(nextIndex + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}</span>
            </span>
            <span className="display mt-8 flex items-center justify-between gap-6 text-[clamp(2.75rem,11vw,10rem)] transition-transform duration-500 ease-out group-hover:translate-x-3">
              {next.title}
              <ArrowUpRight aria-hidden className="size-[0.6em] shrink-0 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
            </span>
          </span>
        </ArrowLink>
      </aside>
    </article>
  );
}
