import type { Metadata } from "next";
import { ProjectList } from "@/components/projects/ProjectList";
import { PageHeader } from "@/components/ui/PageHeader";
import { jsonLd, workList } from "@/lib/seo";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Selected Work",
  alternates: { canonical: "/work" },
  openGraph: { title: "Selected Work | Shreekumar B", url: "/work", images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Shreekumar B: AI & Frontend Developer" }] },
  description:
    "Five projects by Shreekumar B: AI exam grading, compliance, engineering risk, post-deploy verification and a national-finalist consumer AI.",
};

export default function WorkPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(workList) }} />
      <PageHeader
        index="02"
        label="Selected Work"
        title={["Selected", "Work"]}
        intro="Five projects, one through-line: a deterministic core with an LLM language layer."
      />
      <div className="pb-24 md:pb-40">
        <ProjectList items={projects} level="h2" />
      </div>
    </>
  );
}
