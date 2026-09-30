import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { site } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/work", "/about", "/experiments", "/contact", ...projects.map((p) => `/work/${p.slug}`)];
  return routes.map((r) => ({
    url: `${site.url}${r}`,
    changeFrequency: "monthly",
    priority: r === "" ? 1 : r.startsWith("/work/") ? 0.8 : 0.6,
  }));
}
