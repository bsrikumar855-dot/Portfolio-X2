import type { Metadata } from "next";
import { About } from "@/components/about/About";
import { Signals } from "@/components/achievements/Signals";
import { jsonLd, profilePage } from "@/lib/seo";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHeader } from "@/components/ui/SectionHeader";

export const metadata: Metadata = {
  title: "About",
  alternates: { canonical: "/about" },
  openGraph: { title: "About | Shreekumar B", url: "/about", images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Shreekumar B: Full-System Builder & AI Engineer" }], type: "profile" },
  description:
    "Shreekumar B is a full-system builder in Coimbatore, studying AI & Data Science and leading Team Ragnarok.",
};

export default function AboutPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(profilePage) }} />
      <PageHeader index="05" label="About" title={["About"]} />
      <div className="wrap pb-24 md:pb-40">
        <About level="h2" />
      </div>
      <section className="dark-zone py-24 md:py-40">
        <div className="wrap">
          <SectionHeader index="04" label="Selected Signals" title={["Selected", "Signals"]} />
          <div className="mt-12 md:mt-20">
            <Signals />
          </div>
        </div>
      </section>
    </>
  );
}
