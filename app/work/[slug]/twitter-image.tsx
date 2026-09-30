import { getProject, projects } from "@/data/projects";
import { ogSize, renderOg } from "@/lib/og";

export const alt = "Shreekumar B case study";
export const size = ogSize;
export const contentType = "image/png";
export const generateStaticParams = () => projects.map((p) => ({ slug: p.slug }));

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const p = getProject((await params).slug);
  return renderOg(p?.title ?? "Case study", p ? p.category : "Case study");
}
