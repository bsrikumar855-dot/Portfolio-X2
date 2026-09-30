import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const ogSize = { width: 1200, height: 630 } as const;

const row = { display: "flex", justifyContent: "space-between", fontSize: 24, letterSpacing: 2, color: "#5F5C57" } as const;

/** Typographic social card in the site palette. */
export function renderOg(title: string, kicker: string) {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#F2F0EB", color: "#111", padding: 72 }}>
        <div style={row}>
          <span>{kicker.toUpperCase()}</span>
          <span>{site.wordmark}</span>
        </div>
        <div style={{ fontSize: 132, fontWeight: 600, letterSpacing: -6, lineHeight: 0.92, textTransform: "uppercase", display: "flex" }}>{title}</div>
        <div style={row}>
          <span>{site.disciplines}</span>
          <span style={{ color: "#8B2635" }}>{site.location.toUpperCase()}</span>
        </div>
      </div>
    ),
    ogSize,
  );
}
