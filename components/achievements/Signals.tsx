import { achievements } from "@/data/achievements";

/** Selected Signals: verified results only, rendered from data/achievements.ts. Designed for a dark section. */
export function Signals() {
  return (
    <ul className="border-b rule">
      {achievements.map((a) => (
        <li key={a.label + a.value} className="grid grid-cols-12 items-baseline gap-x-4 gap-y-3 border-t rule py-7 md:py-10">
          <p className="numeral col-span-12 text-[clamp(3.25rem,9vw,8.5rem)] font-medium uppercase leading-[0.85] tracking-[-0.05em] md:col-span-5">
            {a.value}
          </p>
          <div className="col-span-12 md:col-span-4 md:col-start-6">
            <h3 className="text-[1.25rem] font-medium tracking-[-0.01em]">{a.label}</h3>
            <p className="mt-2 max-w-[42ch] text-dark-secondary">{a.detail}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
