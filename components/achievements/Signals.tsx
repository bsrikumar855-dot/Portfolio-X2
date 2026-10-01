import { achievements } from "@/data/achievements";
import { CountUp } from "./CountUp";

/** Selected Signals: verified results only, rendered from data/achievements.ts. Designed for a dark section. */
export function Signals() {
  return (
    <ul className="border-b rule">
      {achievements.map((a) => (
        <li key={a.label + a.value} className="grid grid-cols-12 items-baseline gap-x-4 gap-y-3 border-t rule py-8 md:py-12">
          <p className="display numeral col-span-12 text-numeral md:col-span-5">
            {a.kind === "rank" ? <CountUp value={a.value} /> : a.value}
          </p>
          <div className="col-span-12 md:col-span-4 md:col-start-6">
            <h3 className="display text-title">{a.label}</h3>
            <p className="mt-3 max-w-[46ch] text-body text-dark-secondary">{a.detail}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
