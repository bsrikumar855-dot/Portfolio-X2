// Selected Work: exactly these five, in this order. To change the list, edit only this file.

export type DiagramKind = "llm" | "core";
export type DiagramStep = { label: string; note?: string; kind?: DiagramKind };

export type Section = {
  paragraphs?: readonly string[];
  bullets?: readonly string[];
  diagram?: { caption: string; steps: readonly DiagramStep[] };
  todo?: string;
};

export type SectionKey =
  | "context"
  | "approach"
  | "system"
  | "build"
  | "challenges"
  | "result"
  | "learnings";

export type Project = {
  slug: string;
  title: string;
  category: string;
  role: string;
  team?: string;
  description: string;
  technologies: readonly string[];
  /** Path under /public. null renders the labelled placeholder. */
  image: string | null;
  featured: boolean;
  status: string;
  principle?: string;
  metrics: readonly { label: string; value: string }[];
  links: readonly { label: string; href: string }[];
  sections: Record<SectionKey, Section>;
};

export const chapters: readonly { key: SectionKey; label: string }[] = [
  { key: "context", label: "Context" },
  { key: "approach", label: "Approach" },
  { key: "system", label: "System" },
  { key: "build", label: "Build" },
  { key: "challenges", label: "Challenges" },
  { key: "result", label: "Result" },
  { key: "learnings", label: "Learnings" },
];

export const projects: readonly Project[] = [
  {
    slug: "grademind",
    title: "GradeMIND",
    category: "AI / Education",
    role: "Builder",
    description: "Handwritten answer-sheet grading where the model reads and arithmetic decides every mark.",
    technologies: ["FastAPI", "Next.js 14", "PaddleOCR", "EasyOCR", "Tesseract", "Gemini Vision"],
    image: null,
    featured: true,
    status: "Hackathon build · CBSE-grade next",
    principle: "The model reads, arithmetic decides.",
    metrics: [{ label: "OCR engines fused", value: "3" }],
    links: [],
    sections: {
      context: {
        paragraphs: [
          "GradeMIND is a handwritten answer-sheet grader, built for a national hackathon.",
          "Marking is a trust problem. A mark has to be explainable and repeatable, and a language model's numeric output is neither.",
        ],
      },
      approach: {
        paragraphs: [
          "The model reads. Arithmetic decides. Every mark traces to a criterion ID, an evidence span and deterministic arithmetic, and never to an LLM numeric output.",
          "This is the same deterministic core and LLM language layer split used across PRYSM and AHAL AI, applied to grading.",
        ],
      },
      system: {
        paragraphs: ["Noisy handwritten scans go through three OCR engines and Gemini Vision. Scores are computed by code."],
        diagram: {
          caption: "The boundary between reading and deciding",
          steps: [
            { label: "Three OCR engines", note: "PaddleOCR, EasyOCR and Tesseract, fused by confidence voting" },
            { label: "Gemini Vision", note: "Reads noisy handwritten scans", kind: "llm" },
            { label: "Question segmentation", note: "Splits the sheet by question" },
            { label: "ScoreComputer", note: "Deterministic arithmetic, tied to criterion ID and evidence span", kind: "core" },
            { label: "Annotated PDF", note: "Every mark traced to an evidence span" },
          ],
        },
      },
      build: {
        bullets: [
          "Three OCR engines fused by confidence voting, with Gemini Vision for noisy handwritten scans",
          "Question segmentation and annotated-PDF output tracing every mark to an evidence span",
          "Deterministic scorer with reproducibility tests",
          "Atomic job-state persistence with resume and cache reuse",
          "Human-override preservation",
        ],
      },
      challenges: {
        bullets: [
          "Keeping numeric authority out of the model while still using it to read.",
          "A production-readiness audit exposed fabricated agent results and a score-desync bug. A six-phase remediation plan now gates real student data behind human review.",
        ],
      },
      result: {
        paragraphs: ["Built for a national hackathon. Next step: CBSE-grade production."],
      },
      learnings: {
        paragraphs: [
          "Verify against real state, not summaries. The audit only mattered because it checked what the agents had actually produced.",
        ],
      },
    },
  },
  {
    slug: "prysm",
    title: "PRYSM",
    category: "AI / Compliance",
    role: "Team Lead",
    team: "Team Ragnarok",
    description: "A continuous AI compliance operating system: an LLM gateway with a tamper-evident evidence trail.",
    technologies: ["Fastify", "Next.js", "FastAPI", "Postgres / RLS", "BullMQ"],
    image: null,
    featured: true,
    status: "Current build",
    principle: "Deterministic core, LLM language layer.",
    metrics: [
      { label: "Architecture decision records", value: "11" },
      { label: "Services in the M0 monorepo", value: "5" },
    ],
    links: [{ label: "GitHub", href: "https://github.com/bsrikumar855-dot/PRYSM" }],
    sections: {
      context: {
        paragraphs: [
          "PRYSM is a multi-tenant compliance platform, built by Team Ragnarok. It turns AI regulations into versioned controls and enforces them inline through an LLM gateway.",
          "It began as a GST, ROC and statutory audit-intelligence platform: FastAPI, React, Groq with LLaMA 3.3, an 18-point deterministic compliance rule engine, ChromaDB and ReportLab. The current version is the operating system that grew from it.",
        ],
      },
      approach: {
        paragraphs: [
          "Compliance cannot rest on a model's say-so, so the design rules are written down in 11 ADRs. LLM findings never close a control: a human has to confirm. Every obligation must cite exact source text, and code checks the citation. Tenant isolation is enforced twice, with Postgres RLS and in the application layer.",
        ],
      },
      system: {
        diagram: {
          caption: "How a control is enforced",
          steps: [
            { label: "Versioned controls", note: "AI regulations turned into controls, each citing exact source text", kind: "core" },
            { label: "LLM gateway", note: "Enforces controls inline on language-model calls", kind: "llm" },
            { label: "Human confirmation", note: "An LLM finding never closes a control on its own", kind: "core" },
            { label: "Hash-chained evidence trail", note: "Tamper-evident and verifiable offline", kind: "core" },
          ],
        },
      },
      build: {
        bullets: [
          "M0 monorepo: pnpm and Turbo with uv, five services, Drizzle and SQL migrations, Valkey, OpenTelemetry",
          "CI gates for wording rules and TODO tracking",
          "LLM gateway and hash-chained evidence trail",
          "11 ADRs recording the design rules",
          "First version: 18-point deterministic compliance rule engine on FastAPI, React, Groq/LLaMA 3.3, ChromaDB and ReportLab",
        ],
      },
      challenges: {
        bullets: [
          "Multi-tenant isolation that does not rest on one layer: Postgres RLS plus app-layer checks.",
          "Keeping LLM findings advisory. They never close a control without human confirmation.",
          "Making obligations checkable: each one must cite exact source text, and code verifies the citation.",
          "An evidence trail that can be verified offline, which is why it is hash-chained.",
        ],
      },
      result: {
        paragraphs: [
          "The M0 foundation is built: a five-service monorepo with migrations, Valkey, OpenTelemetry and CI gates, governed by 11 ADRs. The platform itself is still being architected.",
        ],
      },
      learnings: {
        paragraphs: ["Trust is an architecture decision. Deciding where the model may speak, and where it may not, comes first."],
      },
    },
  },
  {
    slug: "ahal-ai",
    title: "AHAL AI",
    category: "AI / Developer Tools",
    role: "Designer",
    description: "An engineering risk intelligence platform that gates every LLM-proposed change behind deterministic AST verification.",
    technologies: ["Multi-agent", "Tree-sitter", "GitHub webhooks"],
    image: null,
    featured: true,
    status: "Design and whitepaper",
    principle: "No LLM judges an LLM.",
    metrics: [],
    links: [],
    sections: {
      context: {
        paragraphs: [
          "AHAL AI is an engineering risk intelligence platform. It predicts the blast radius of a pull request, diagnoses production root causes, and stages autonomous remediation.",
        ],
      },
      approach: {
        paragraphs: [
          "Every LLM-proposed change is gated behind deterministic Tree-sitter and AST verification. There is no LLM-judges-LLM step anywhere in the loop. This is the deterministic core and LLM language layer split applied to code changes.",
        ],
      },
      system: {
        diagram: {
          caption: "Where the LLM stops and verification starts",
          steps: [
            { label: "Multi-agent repository ingestion", note: "Triggered by GitHub webhooks", kind: "llm" },
            { label: "LLM-proposed change", note: "Remediation is proposed, never trusted", kind: "llm" },
            { label: "Tree-sitter / AST verification", note: "Deterministic gate on every proposed change", kind: "core" },
            { label: "Staged autonomous remediation", note: "Only verified changes proceed" },
          ],
        },
      },
      build: {
        bullets: [
          "PR blast-radius prediction",
          "Production root-cause diagnosis",
          "Staged autonomous remediation",
          "Multi-agent repository ingestion with GitHub webhook automation",
          "Technical whitepaper, benchmarked against a competing multi-agent code-review system",
        ],
      },
      challenges: {
        bullets: [
          "Letting an LLM propose changes without letting it approve them: every proposal goes through deterministic Tree-sitter and AST verification.",
          "Ingesting a whole repository across multiple agents, then reacting to GitHub webhooks as changes arrive.",
          "Showing the design holds up by benchmarking it against a competing multi-agent code-review system.",
        ],
      },
      result: {
        paragraphs: ["Designed the platform and authored the technical whitepaper, benchmarking the design against a competing multi-agent code-review system."],
      },
      learnings: {
        paragraphs: ["A verifier that shares the generator's failure modes is not a verifier. Determinism is what makes the gate worth having."],
      },
    },
  },
  {
    slug: "driftcheck",
    title: "DriftCheck",
    category: "Developer Tools / CLI",
    role: "Creator",
    description: "An open-source CLI that verifies a live deployment actually works, catching failures a green build hides.",
    technologies: ["TypeScript", "Node.js", "npm", "GitHub Actions"],
    image: null,
    featured: true,
    status: "Published on npm",
    metrics: [{ label: "Tests passing", value: "91" }],
    links: [{ label: "npm", href: "https://www.npmjs.com/package/@shreekumar007/driftcheck" }],
    sections: {
      context: {
        paragraphs: [
          "A green build does not mean a working deployment. DriftCheck is an open-source CLI for post-deploy verification: it checks that the live deployment actually works.",
        ],
      },
      approach: {
        paragraphs: [
          "Test the thing users reach, not the thing CI built. DriftCheck runs against the deployed site and is itself tested against a deliberately broken one.",
        ],
      },
      system: {
        diagram: {
          caption: "What a green build can hide",
          steps: [
            { label: "Green build", note: "CI passes" },
            { label: "Live deployment", note: "Can still be broken" },
            { label: "DriftCheck", note: "Verifies the live deployment actually works", kind: "core" },
          ],
        },
      },
      build: {
        bullets: [
          "Published to npm as @shreekumar007/driftcheck",
          "TypeScript and Node.js CLI",
          "CI on GitHub Actions",
          "A deliberately broken Vercel fixture used as a negative test",
          "91 passing tests",
        ],
      },
      challenges: {
        bullets: ["Proving the tool fails when it should: the broken Vercel fixture exists so the negative case is tested, not assumed."],
      },
      result: { paragraphs: ["Published on npm with CI and 91 passing tests."] },
      learnings: {
        paragraphs: ["A verifier needs a negative test. Without a known-broken target, a pass means nothing."],
      },
    },
  },
  {
    slug: "minchal",
    title: "Minchal",
    category: "AI / Consumer",
    role: "Team Lead",
    description: "Photo-first electricity bill attribution: which household appliance is driving the bill.",
    technologies: ["Gemini"],
    image: null,
    featured: true,
    status: "National finalist · HackXelerate 26'",
    principle: "Extract, calculate, then explain.",
    metrics: [{ label: "HackXelerate 26'", value: "Finalist" }],
    links: [],
    sections: {
      context: {
        paragraphs: [
          "Minchal estimates which household appliance is driving an electricity bill, from photographed bills and appliance nameplates alone. Built as Team Lead at HackXelerate 26', a national-level hackathon, where it reached the finals.",
        ],
      },
      approach: {
        paragraphs: [
          "A three-step pipeline with the model at both ends and arithmetic in the middle: Gemini extracts, deterministic code calculates, Gemini explains. It is the same deterministic core and LLM language layer split, in a consumer product.",
        ],
      },
      system: {
        diagram: {
          caption: "Gemini at the edges, arithmetic in the middle",
          steps: [
            { label: "Gemini extract", note: "Reads the photographed bill and appliance nameplates", kind: "llm" },
            { label: "Deterministic calculate", note: "Estimates which appliance drives the bill", kind: "core" },
            { label: "Gemini explain", note: "Puts the result into plain language", kind: "llm" },
          ],
        },
      },
      build: {
        bullets: [
          "Gemini-extract, deterministic-calculate, Gemini-explain pipeline",
          "Input from photographs only: a bill and appliance nameplates",
        ],
      },
      challenges: {
        bullets: [
          "Attributing a bill to one appliance from photographs alone: a bill and appliance nameplates are the only inputs.",
          "Keeping the model out of the arithmetic. Gemini reads and explains, deterministic code calculates.",
        ],
      },
      result: { paragraphs: ["National finalist at HackXelerate 26'."] },
      learnings: {
        paragraphs: ["Let the model read and explain. Keep the numbers in code."],
      },
    },
  },
];

export const getProject = (slug: string): Project | undefined => projects.find((p) => p.slug === slug);

export const nextProject = (slug: string): Project => {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length] as Project;
};
