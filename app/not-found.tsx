import { RevealText } from "@/components/motion/RevealText";
import { ArrowLink } from "@/components/ui/ArrowLink";

export default function NotFound() {
  return (
    <section className="wrap flex min-h-[100svh] flex-col justify-between pb-16 pt-[calc(var(--nav-h)+3rem)]">
      <p className="meta">ERROR / 404</p>
      <RevealText
        as="h1"
        immediate
        lines={["404 —", "THIS PAGE", "DOESN’T EXIST."]}
        className="display text-[12vw] md:text-[min(10vw,16svh)]"
      />
      <div>
        <ArrowLink href="/">BACK HOME</ArrowLink>
      </div>
    </section>
  );
}
