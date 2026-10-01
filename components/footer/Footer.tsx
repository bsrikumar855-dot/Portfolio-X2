import { site } from "@/data/site";
import { titleCase } from "@/lib/utils/case";
import { ISTClock } from "./ISTClock";

export function Footer() {
  return (
    <footer className="dark-zone border-t rule">
      <div className="wrap grid12 gap-y-8 py-10 md:py-14">
        <div className="col-span-12 md:col-span-4">
          <p className="display text-title">{site.wordmark}</p>
          <p className="meta mt-3">{titleCase(site.disciplines)}</p>
        </div>
        <ul className="col-span-12 flex gap-8 text-small font-medium md:col-span-4 md:col-start-6">
          <li>
            <a className="link-u !text-bg" href={site.resume} download="Shreekumar-B-Resume.pdf" data-sound="confirm">
              Resume
            </a>
          </li>
          <li>
            <a className="link-u !text-bg" href={site.github} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </li>
          <li>
            <a className="link-u !text-bg" href={site.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </li>
        </ul>
        <div className="meta col-span-12 space-y-1 md:col-span-3 md:col-start-10 md:text-right">
          <p>{site.location}</p>
          <p>
            <ISTClock />
          </p>
        </div>
      </div>
      <div className="wrap border-t rule py-5">
        <p className="meta">© Shreekumar B. All rights reserved.</p>
      </div>
    </footer>
  );
}
