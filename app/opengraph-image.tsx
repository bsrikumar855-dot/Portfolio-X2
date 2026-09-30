import { ogSize, renderOg } from "@/lib/og";

export const alt = "Shreekumar B — AI & Frontend Developer";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOg("Building digital systems that matter", "Portfolio");
}
