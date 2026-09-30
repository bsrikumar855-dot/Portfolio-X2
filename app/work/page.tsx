import type { Metadata } from "next";
import { ProjectList } from "@/components/projects/ProjectList";
import { PageHeader } from "@/components/ui/PageHeader";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Selected Work",
  description:
    "Five projects by Shreekumar B: AI exam grading, compliance, engineering risk, post-deploy verification and a national-finalist consumer AI.",
};

export default function WorkPage() {
  return (
    <>
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
