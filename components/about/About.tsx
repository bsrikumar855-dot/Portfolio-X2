import Image from "next/image";
import { StaggerText } from "@/components/motion/StaggerText";
import { site } from "@/data/site";

const columns = [
  {
    title: "What I build",
    body: "Products where AI meets interface: exam grading, AI compliance, engineering risk, developer tooling and consumer energy.",
  },
  {
    title: "What I care about",
    body: "Deterministic trust boundaries. A hard line between decision logic and the LLM language layer, treated as an architecture and safety requirement, and claims that hold up when checked.",
  },
  {
    title: "How I work",
    body: "Spec-driven and test-enforced. I verify what agents and collaborators report against the real repository state instead of trusting summaries.",
  },
  {
    title: "What I'm exploring",
    body: "Taking GradeMIND toward CBSE-grade production, and PRYSM as a continuous compliance operating system.",
  },
] as const;

export function About({ level: H = "h3" }: { level?: "h2" | "h3" }) {
  return (
    <div>
      <div className="grid12 gap-y-10">
        <StaggerText className="col-span-12 lg:col-span-9">
          <p className="display text-statement">
            I&apos;m Shreekumar, an AI and frontend-focused builder interested in turning difficult technical problems into products people can actually use.
          </p>
        </StaggerText>
        <div className="col-span-12 lg:col-span-3 lg:col-start-10 lg:row-start-1">
          <div className="relative aspect-[4/5] w-2/3 bg-tint lg:w-full">
            {site.portrait ? (
              <Image src={site.portrait} alt="Portrait of Shreekumar B" fill sizes="(min-width: 1024px) 20vw, 60vw" className="object-cover object-[50%_25%]" />
            ) : (
              <svg aria-hidden viewBox="0 0 200 250" className="absolute inset-0 h-full w-full">
                <text x="6" y="236" fontSize="150" fontWeight="500" letterSpacing="-8" className="fill-rule" fontFamily="var(--font-instrument), sans-serif">
                  SB
                </text>
              </svg>
            )}
            {/* Viewfinder brackets, echoing the hero */}
            <span aria-hidden className="pointer-events-none absolute -left-2 -top-2 size-5 border-l-2 border-t-2 border-accent" />
            <span aria-hidden className="pointer-events-none absolute -right-2 -top-2 size-5 border-r-2 border-t-2 border-accent" />
            <span aria-hidden className="pointer-events-none absolute -bottom-2 -left-2 size-5 border-b-2 border-l-2 border-accent" />
            <span aria-hidden className="pointer-events-none absolute -bottom-2 -right-2 size-5 border-b-2 border-r-2 border-accent" />
          </div>
        </div>
      </div>

      <StaggerText className="mt-20 grid gap-x-6 gap-y-12 border-t rule pt-8 md:mt-28 md:grid-cols-2 lg:grid-cols-4" itemClassName="">
        {columns.map((c) => (
          <div key={c.title}>
            <H className="display text-title">{c.title}</H>
            <p className="mt-3 max-w-[38ch] text-body text-prose">{c.body}</p>
          </div>
        ))}
      </StaggerText>

      <dl className="mt-20 grid gap-x-6 gap-y-8 border-t rule pt-8 md:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <dt className="meta">Education</dt>
          <dd className="mt-3 text-body">
            {site.education.degree}
            <br />
            <span className="text-secondary">
              {site.education.school}, {site.education.city}. Expected {site.education.expected}.
            </span>
          </dd>
        </div>
        <div>
          <dt className="meta">Role</dt>
          <dd className="mt-3 text-body">{site.role}</dd>
        </div>
        <div>
          <dt className="meta">Based in</dt>
          <dd className="mt-3 text-body">{site.location}</dd>
        </div>
      </dl>
    </div>
  );
}
