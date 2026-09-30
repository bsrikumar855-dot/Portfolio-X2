import { ArrowUpRight } from "lucide-react";
import { RevealText } from "@/components/motion/RevealText";
import { StaggerText } from "@/components/motion/StaggerText";
import { isTodo, site } from "@/data/site";

const lines = ["LET’S MAKE", "SOMETHING", "WORTH", "REMEMBERING."] as const;

/** Dramatic close. Also the body of /contact, where `page` makes it the h1 and clears the fixed nav. */
export function Contact({ page = false }: { page?: boolean }) {
  const missing = isTodo(site.email);
  const cta = "display group flex items-center gap-3 text-[clamp(1.9rem,6.6vw,5.5rem)]";
  return (
    <section id="contact" className={`dark-zone ${page ? "min-h-[100svh] pt-[calc(var(--nav-h)+4rem)]" : "pt-24 md:pt-36"}`}>
      <div className="wrap pb-20 md:pb-28">
        <p className="meta flex justify-between">
          <span>
            <span className="numeral">07</span> / CONTACT
          </span>
          <span className="hidden sm:inline">{site.availability}</span>
        </p>
        <RevealText
          as={page ? "h1" : "h2"}
          lines={lines}
          immediate={page}
          className="display mt-10 text-[13vw] md:mt-16 md:text-[min(10.4vw,17svh)]"
        />

        <StaggerText className="mt-14 md:mt-24 md:pl-[calc(100%/12*4)]" delay={0.1}>
          {missing ? (
            <p className={cta}>
              <span>{site.email}</span>
              <span className="meta self-start">Add the address in data/site.ts</span>
            </p>
          ) : (
            <a className={cta} href={`mailto:${site.email}`} data-cursor="WRITE">
              <span className="link-u break-all">{site.email}</span>
              <ArrowUpRight aria-hidden className="size-[0.7em] shrink-0 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
            </a>
          )}
          <ul className="meta mt-10 flex flex-wrap gap-x-10 gap-y-3">
            <li>
              <a className="link-u !text-bg" href={site.resume} download="Shreekumar-B-Resume.pdf" data-cursor="PDF">
                RESUME ↓
              </a>
            </li>
            <li>
              <a className="link-u !text-bg" href={site.github} target="_blank" rel="noopener noreferrer">
                GITHUB ↗
              </a>
            </li>
            <li>
              <a className="link-u !text-bg" href={site.linkedin} target="_blank" rel="noopener noreferrer">
                LINKEDIN ↗
              </a>
            </li>
          </ul>
        </StaggerText>
      </div>
    </section>
  );
}
