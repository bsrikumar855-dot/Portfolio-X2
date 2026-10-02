import { projects, type Project } from "@/data/projects";
import { skills } from "@/data/skills";
import { site } from "@/data/site";

const abs = (path: string): string => new URL(path, site.url).toString().replace(/\/$/, "");

export const personId = `${abs("/")}#person`;

export const person = {
  "@type": "Person",
  "@id": personId,
  name: site.name,
  url: abs("/"),
  image: site.portrait ? abs(site.portrait) : undefined,
  email: `mailto:${site.email}`,
  jobTitle: "Full-System Builder and AI Engineer",
  description: site.description,
  homeLocation: { "@type": "Place", name: "Coimbatore, India" },
  address: { "@type": "PostalAddress", addressLocality: "Coimbatore", addressCountry: "IN" },
  sameAs: [site.github, site.linkedin],
  alumniOf: { "@type": "CollegeOrUniversity", name: site.education.school },
  knowsAbout: skills.flatMap((g) => g.items),
} as const;

const website = {
  "@type": "WebSite",
  "@id": `${abs("/")}#website`,
  url: abs("/"),
  name: site.name,
  description: site.description,
  inLanguage: "en",
  publisher: { "@id": personId },
} as const;

/** Site-wide graph: the person and the website. */
export const siteGraph = { "@context": "https://schema.org", "@graph": [person, website] } as const;

/** About page: a ProfilePage whose main entity is the person. */
export const profilePage = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  url: abs("/about"),
  name: `About ${site.name}`,
  mainEntity: { "@id": personId },
} as const;

/** Case study: a CreativeWork by the person, with breadcrumbs. */
export function caseStudyGraph(p: Project) {
  const url = abs(`/work/${p.slug}`);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CreativeWork",
        "@id": `${url}#work`,
        url,
        name: p.title,
        headline: `${p.title}: ${p.description}`,
        description: p.description,
        genre: p.category,
        keywords: p.technologies.join(", "),
        author: { "@id": personId },
        creator: { "@id": personId },
        inLanguage: "en",
        isPartOf: { "@id": `${abs("/")}#website` },
        ...(p.links[0] ? { sameAs: p.links.map((l) => l.href) } : {}),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: abs("/") },
          { "@type": "ListItem", position: 2, name: "Work", item: abs("/work") },
          { "@type": "ListItem", position: 3, name: p.title, item: url },
        ],
      },
    ],
  };
}

/** Work index: an ordered list of the selected projects. */
export const workList = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Selected Work",
  itemListElement: projects.map((p, i) => ({ "@type": "ListItem", position: i + 1, url: abs(`/work/${p.slug}`), name: p.title })),
} as const;

export const jsonLd = (data: unknown): string => JSON.stringify(data).replace(/</g, "\\u003c");
