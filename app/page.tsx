import { About } from "@/components/about/About";
import { Signals } from "@/components/achievements/Signals";
import { Capabilities } from "@/components/capabilities/Capabilities";
import { Contact } from "@/components/contact/Contact";
import { Lab } from "@/components/experiments/Lab";
import { MeasureTape } from "@/components/ui/MeasureTape";
import { SheetRail } from "@/components/navigation/SheetRail";
import { Hero } from "@/components/hero/Hero";
import { ProjectList } from "@/components/projects/ProjectList";
import { Stack } from "@/components/stack/Stack";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { projects } from "@/data/projects";

const pad = "py-24 md:py-32";

export const metadata = { alternates: { canonical: "/" } };

export default function Home() {
  return (
    <>
      <SheetRail />
      <Hero />

      <section id="work" className={pad}>
        <div className="wrap">
          <SectionHeader index="02" label="Selected Work" title={["Selected", "Work"]} aside={<span className="numeral">05 PROJECTS</span>} />
          <p className="lead mt-10 max-w-[34ch] text-secondary md:ml-[calc(100%/12*4)] md:mt-14">
            Five projects, one through-line: a deterministic core with an LLM language layer.
          </p>
        </div>
        <div className="mt-14 md:mt-24">
          <ProjectList items={projects} />
        </div>
        <div className="wrap mt-10 flex justify-end">
          <ArrowLink href="/work">ALL PROJECTS</ArrowLink>
        </div>
      </section>

      <MeasureTape />

      <section id="capabilities" className={pad}>
        <div className="wrap">
          <SectionHeader index="03" label="Capabilities" title={["What", "I build"]} />
        </div>
        <div className="mt-14 md:mt-24">
          <div className="wrap">
            <Capabilities />
          </div>
        </div>
        <div className="wrap mt-24 md:mt-40">
          <h3 className="meta mb-8 !text-ink">Stack</h3>
          <Stack />
        </div>
      </section>

      <section id="signals" className="dark-zone py-24 md:py-40">
        <div className="wrap">
          <SectionHeader index="04" label="Selected Signals" title={["Selected", "Signals"]} />
          <div className="mt-12 md:mt-20">
            <Signals />
          </div>
        </div>
      </section>

      <section id="about" className={pad}>
        <div className="wrap">
          <SectionHeader index="05" label="About" title={["About"]} />
          <div className="mt-12 md:mt-20">
            <About />
          </div>
        </div>
      </section>

      <section id="lab" className="pb-24 md:pb-40">
        <div className="wrap">
          <SectionHeader index="06" label="Lab" title={["The Lab"]} aside={<ArrowLink href="/experiments" className="!pb-0.5">ALL EXPERIMENTS</ArrowLink>} />
          <div className="mt-12 md:mt-20">
            <Lab />
          </div>
        </div>
      </section>

      <Contact />
    </>
  );
}
