import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudy } from "@/components/case-study/CaseStudy";
import { getProject, projects } from "@/data/projects";
import { caseStudyGraph, jsonLd } from "@/lib/seo";

type Params = { slug: string };

export const dynamicParams = false;
export const generateStaticParams = (): Params[] => projects.map((p) => ({ slug: p.slug }));

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const p = getProject((await params).slug);
  if (!p) return {};
  return {
    title: `${p.title}: ${p.category} case study`,
    description: `${p.title}: ${p.description} A case study by Shreekumar B covering context, approach, system, build and learnings.`,
    alternates: { canonical: `/work/${p.slug}` },
    openGraph: { title: `${p.title} | Shreekumar B`, description: p.description, type: "article", url: `/work/${p.slug}`, authors: ["Shreekumar B"] },
    twitter: { title: `${p.title} | Shreekumar B`, description: p.description },
  };
}

export default async function ProjectPage({ params }: { params: Promise<Params> }) {
  const project = getProject((await params).slug);
  if (!project) notFound();
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(caseStudyGraph(project)) }} />
      <CaseStudy project={project} />
    </>
  );
}
