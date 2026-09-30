export type SkillGroup = { label: string; items: readonly string[] };

export const skills: readonly SkillGroup[] = [
  { label: "Frontend", items: ["Next.js", "React", "TypeScript", "Tailwind", "shadcn/ui"] },
  { label: "Backend", items: ["Node.js", "FastAPI", "Python"] },
  { label: "Data", items: ["PostgreSQL", "Supabase", "MongoDB", "SQLite", "ChromaDB"] },
  { label: "AI", items: ["LLMs", "RAG", "OCR", "YOLO", "Agentic systems"] },
  { label: "Tools", items: ["Git", "GitHub", "Figma", "Claude Code"] },
];

export type Capability = { title: string; summary: string; detail: string; proof: string };

export const capabilities: readonly Capability[] = [
  {
    title: "Frontend Engineering",
    summary: "Interfaces that feel considered at every state.",
    detail:
      "Next.js and React with TypeScript, composed from a small set of tokens and motion primitives. Motion carries meaning, and every screen holds up without it.",
    proof: "GradeMIND · PRYSM",
  },
  {
    title: "AI Products",
    summary: "Language models with a hard boundary around them.",
    detail:
      "Decision logic stays deterministic and testable. The LLM handles reading and language. That split is treated as an architecture and trust requirement, not a preference.",
    proof: "GradeMIND · PRYSM · AHAL AI",
  },
  {
    title: "Product Engineering",
    summary: "From spec to something people can use.",
    detail:
      "Spec-driven builds, tests that enforce the architecture, and claims verified against the real repository state instead of summaries.",
    proof: "PRYSM · AHAL AI",
  },
  {
    title: "Interaction Design",
    summary: "Structure, timing and restraint.",
    detail:
      "Type-led layouts, considered hover and transition states, and a Crowdera UI/UX Hackathon win.",
    proof: "Crowdera UI/UX win",
  },
  {
    title: "Rapid Prototyping",
    summary: "Working systems inside 24 hours.",
    detail:
      "Hackathon-tested: Minchal took a national final at HackXelerate 26', and DriftCheck went from idea to a published npm package with 91 passing tests.",
    proof: "DriftCheck · Minchal",
  },
];
