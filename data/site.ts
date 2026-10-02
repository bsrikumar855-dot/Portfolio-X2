export const site = {
  name: "Shreekumar B",
  wordmark: "SHREEKUMAR.B",
  title: "Shreekumar B — Full-System Builder & AI Engineer",
  description:
    "Shreekumar B is a full-system builder and AI engineer in Coimbatore, India. He designs and ships AI products end to end, from models and backends to interfaces and infrastructure, with a deterministic core and an LLM language layer.",
  // Only deployed URL known today. Replace with the final domain.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://main.intro-3ve.pages.dev",
  positioning: "Full-System Builder · AI Engineer · Product Engineer",
  disciplines: "AI / SYSTEMS / PRODUCT ENGINEERING",
  location: "Coimbatore, India",
  timezone: "Asia/Kolkata",
  email: "bsrikumar855@gmail.com",
  resume: "/Shreekumar-B-Resume.pdf",
  github: "https://github.com/bsrikumar855-dot",
  linkedin: "https://linkedin.com/in/shreekumar-b-103922381",
  previousPortfolio: "https://main.intro-3ve.pages.dev",
  education: {
    degree: "B.Tech, Artificial Intelligence & Data Science",
    school: "Sri Shakthi Institute of Engineering and Technology",
    city: "Coimbatore",
    expected: "2029",
  },
  role: "Team Lead, Team Ragnarok",
  availability: "AVAILABLE FOR OPPORTUNITIES",
  // Set to a real file in /public only when one exists.
  portrait: "/images/portrait.jpg" as string | null,
} as const;

export const nav = [
  { key: "work", label: "WORK", route: "/work", section: "work" },
  { key: "about", label: "ABOUT", route: "/about", section: "about" },
  { key: "lab", label: "LAB", route: "/experiments", section: "lab" },
  { key: "contact", label: "CONTACT", route: "/contact", section: "contact" },
] as const;

export const isTodo = (v: string): boolean => v.startsWith("TODO");
