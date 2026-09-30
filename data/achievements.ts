export type Achievement = {
  label: string;
  value: string;
  detail: string;
  kind: "rank" | "win" | "finalist" | "submission";
};

export const achievements: readonly Achievement[] = [
  {
    label: "HackerRank Orchestrate",
    value: "#51",
    detail: "Global rank, score 70.7/100. “Buy or Wait?”, an AI financial-affordability agent built with Claude Code.",
    kind: "rank",
  },
  {
    label: "HackerRank Orchestrate",
    value: "#209",
    detail: "Global rank, earlier round.",
    kind: "rank",
  },
  {
    label: "Crowdera UI/UX Hackathon",
    value: "Winner",
    detail: "For Vidiyal, a donation and crisis-response platform.",
    kind: "win",
  },
  {
    label: "HackXelerate 26'",
    value: "Finalist",
    detail: "National-level hackathon. Team Lead for Minchal, a photo-first electricity bill attribution tool.",
    kind: "finalist",
  },
  {
    label: "ISRO Bharat Antariksh Hackathon 2026",
    value: "VAYU",
    detail: "PS-3, Surface AQI & HCHO hotspot identification. A Team Ragnarok submission, not a win.",
    kind: "submission",
  },
];
