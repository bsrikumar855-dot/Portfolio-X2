import { Magnetic } from "@/components/motion/Magnetic";
import { StaggerText } from "@/components/motion/StaggerText";
import { site } from "@/data/site";
import { DetectorHero } from "./DetectorHero";

export function Hero() {
  return (
    <section id="top" className="relative flex min-h-[100svh] flex-col pt-[calc(var(--nav-h)+1.25rem)]">
      <div className="wrap flex flex-1 flex-col">
        <DetectorHero />

        <div aria-hidden className="ruler mt-6" />
        <div className="grid grid-cols-12 items-end gap-x-6 gap-y-8 pb-8 pt-8 md:pb-10">
          <StaggerText delay={0.5} className="col-span-12 md:col-span-6">
            <p className="lead max-w-[30ch] md:max-w-[36ch]">
              Full-system builder shipping AI products end to end: models, backends, interfaces and the infrastructure between them.
            </p>
          </StaggerText>

          <StaggerText delay={0.85} className="col-span-12 md:col-span-5 md:col-start-8">
            <div className="flex flex-wrap items-center gap-x-8 gap-y-5 md:justify-end">
              <Magnetic>

                <a href="#work" className="meta inline-flex items-center bg-ink px-5 py-4 !text-bg transition-colors duration-200 hover:bg-accent">
                VIEW SELECTED WORK
              </a>

              </Magnetic>
              <a href="#contact" className="meta link-u !text-ink">
                LET&rsquo;S CONNECT
              </a>
              <a href={site.resume} download="Shreekumar-B-Resume.pdf" className="meta link-u !text-ink">
                RESUME ↓
              </a>
            </div>
          </StaggerText>
        </div>
      </div>
    </section>
  );
}
