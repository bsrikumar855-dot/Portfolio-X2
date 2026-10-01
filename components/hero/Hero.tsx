import { ArrowRight } from "lucide-react";
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
            <p className="lead max-w-[34ch] text-prose md:max-w-[38ch]">
              AI builder and frontend developer creating ambitious products, interfaces and intelligent systems.
            </p>
          </StaggerText>

          <StaggerText delay={0.85} className="col-span-12 md:col-span-5 md:col-start-8">
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4 md:justify-end">
              <a href="#work" className="btn btn-solid">
                View selected work
                <ArrowRight aria-hidden size={16} className="btn-arrow" />
              </a>
              <a href="#contact" className="link-u text-small font-medium text-ink">
                Let&rsquo;s connect
              </a>
              <a href={site.resume} download="Shreekumar-B-Resume.pdf" data-sound="confirm" className="link-u text-small font-medium text-ink">
                Resume ↓
              </a>
            </div>
          </StaggerText>
        </div>
      </div>
    </section>
  );
}
