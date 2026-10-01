/** Words that keep their capitals when a SHOUTING string is turned into readable case. */
const KEEP = new Set(["AI", "IST", "UI", "UX", "OCR", "LLM", "PDF", "ISRO", "CBSE", "VAYU", "PRYSM"]);

/** "AI / FRONTEND / PRODUCT ENGINEERING" -> "AI / Frontend / Product Engineering". Casing only, never copy. */
export function titleCase(s: string): string {
  return s.replace(/[A-Za-z][A-Za-z']*/g, (w) => (KEEP.has(w) ? w : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()));
}

/** "AVAILABLE FOR OPPORTUNITIES" -> "Available for opportunities". */
export function sentenceCase(s: string): string {
  return s.replace(/[A-Za-z][A-Za-z']*/g, (w, i: number) => (KEEP.has(w) ? w : i === 0 ? w.charAt(0).toUpperCase() + w.slice(1).toLowerCase() : w.toLowerCase()));
}
