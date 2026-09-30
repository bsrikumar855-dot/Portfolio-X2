export type Experiment = {
  id: string;
  title: string;
  note: string;
  tags: readonly string[];
  todo?: boolean;
  span: "wide" | "tall" | "square";
};

export const experiments: readonly Experiment[] = [
  {
    id: "LAB 001",
    title: "VAYU",
    note: "Team Ragnarok's submission for ISRO Bharat Antariksh Hackathon 2026, PS-3: surface AQI and HCHO hotspot identification.",
    tags: ["ISRO BAH 2026", "Submission"],
    span: "wide",
  },
  {
    id: "LAB 002",
    title: "Buy or Wait?",
    note: "An AI financial-affordability agent built with Claude Code for HackerRank Orchestrate. Global rank #51.",
    tags: ["Agent", "Claude Code"],
    span: "tall",
  },
  {
    id: "LAB 003",
    title: "Aquaverse",
    note: "A predictive analytics backend for fish and shrimp aquaculture in Tamil Nadu: water-quality forecasting, pond digital twins and a guardrailed advisory LLM.",
    tags: ["Aquaculture", "FastAPI", "Forecasting"],
    span: "square",
  },
  {
    id: "LAB 004",
    title: "PRYSM",
    note: "A continuous AI compliance operating system: an LLM gateway with a tamper-evident evidence trail. Built by Team Ragnarok.",
    tags: ["Compliance", "LLM gateway"],
    span: "wide",
  },
];
