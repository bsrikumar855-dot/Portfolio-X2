import { ArrowUpRight } from "lucide-react";
import { RevealText } from "@/components/motion/RevealText";
import { StaggerText } from "@/components/motion/StaggerText";
import { isTodo, site } from "@/data/site";
import { sentenceCase } from "@/lib/utils/case";

/** Dramatic close. Also the body of /contact, where `page` makes it the h1 and clears the fixed nav. */
export function Contact({ page = false }: { page?: boolean }) {
  const missing = isTodo(site.email);
  const cta = "display group flex items-center gap-3 text-h3 md:text-h2";
  const link = "link-u inline-flex min-h-11 items-center !text-bg";
  return (
    <section id="contact" className={`dark-zone ${page ? "min-h-[100svh] pt-[calc(var(--nav-h)+4rem)]" : "pt-24 md:pt-40"}`}>
      <div className="wrap pb-24 md:pb-32">
        <p className="meta flex justify-between">
          <span>
            <span className="numeral">07</span> / Contact
          </span>
          <span className="hidden sm:inline">{sentenceCase(site.availability)}</span>
        </p>
        <RevealText
          as={page ? "h1" : "h2"}
          text="Let’s make something worth remembering."
          immediate={page}
          className="display h-hero mt-8 max-w-[14ch] md:mt-12"
        />

        <StaggerText className="mt-14 md:mt-24 md:pl-[calc(100%/12*4)]" delay={0.1}>
          {missing ? (
            <p className={cta}>
              <span>{site.email}</span>
              <span className="meta self-start">Add the address in data/site.ts</span>
            </p>
          ) : (
            <a className={cta} href={`mailto:${site.email}`} data-cursor="WRITE" data-sound="confirm">
              <span className="link-u [overflow-wrap:anywhere]">{site.email}</span>
              <ArrowUpRight aria-hidden className="size-[0.7em] shrink-0 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
            </a>
          )}
          <ul className="mt-10 flex flex-wrap gap-x-10 gap-y-2 text-small font-medium">
            <li>
              <a className={link} href={site.resume} download="Shreekumar-B-Resume.pdf" data-cursor="PDF" data-sound="confirm">
                Resume ↓
              </a>
            </li>
            <li>
              <a className={link} href={site.github} target="_blank" rel="noopener noreferrer">
                GitHub ↗
              </a>
            </li>
            <li>
              <a className={link} href={site.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn ↗
              </a>
            </li>
          </ul>
        </StaggerText>
      </div>
    </section>
  );
}
