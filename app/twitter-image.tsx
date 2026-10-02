import { ogSize, renderOg } from "@/lib/og";

export const alt = "Shreekumar B: Full-System Builder & AI Engineer";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOg("Building digital systems that matter", "Portfolio");
}
