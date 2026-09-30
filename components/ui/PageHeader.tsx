import { RevealText } from "@/components/motion/RevealText";
import { site } from "@/data/site";

type Props = { index: string; label: string; title: readonly string[]; intro?: string };

/** Top of an inner page. Owns the page's h1. */
export function PageHeader({ index, label, title, intro }: Props) {
  return (
    <header className="wrap pb-16 pt-[calc(var(--nav-h)+3.5rem)] md:pb-24 md:pt-[calc(var(--nav-h)+6rem)]">
      <p className="meta flex justify-between gap-6">
        <span>
          <span className="numeral">{index}</span> / {label}
        </span>
        <span className="hidden sm:inline">{site.location}</span>
      </p>
      <RevealText as="h1" lines={title} className="display h-page mt-8 md:mt-12" immediate />
      {intro && <p className="lead mt-10 max-w-[38ch] text-secondary md:mt-14">{intro}</p>}
    </header>
  );
}
