import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudy } from "@/components/case-study/CaseStudy";
import { getProject, projects } from "@/data/projects";

type Params = { slug: string };

export const dynamicParams = false;
export const generateStaticParams = (): Params[] => projects.map((p) => ({ slug: p.slug }));

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const p = getProject((await params).slug);
  if (!p) return {};
  return {
    title: `${p.title} case study`,
    description: `${p.title}: ${p.description}`,
    openGraph: { title: `${p.title} | Shreekumar B`, description: p.description, type: "article" },
  };
}

export default async function ProjectPage({ params }: { params: Promise<Params> }) {
  const project = getProject((await params).slug);
  if (!project) notFound();
  return <CaseStudy project={project} />;
}
