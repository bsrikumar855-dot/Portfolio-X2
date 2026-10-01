import { RevealText } from "@/components/motion/RevealText";
import { ArrowLink } from "@/components/ui/ArrowLink";

export default function NotFound() {
  return (
    <section className="wrap flex min-h-[100svh] flex-col justify-between pb-16 pt-[calc(var(--nav-h)+3rem)]">
      <p className="meta">Error / 404</p>
      <RevealText as="h1" immediate text="404 — This page doesn’t exist." className="display h-hero max-w-[16ch]" />
      <div>
        <ArrowLink href="/">Back home</ArrowLink>
      </div>
    </section>
  );
}
