import { skills } from "@/data/skills";

/** Editorial columns. No logos, no percentages. */
export function Stack() {
  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-12 border-t rule pt-6 md:grid-cols-3 lg:grid-cols-5">
      {skills.map((group) => (
        <section key={group.label} aria-label={group.label}>
          <h3 className="meta caps !text-ink">{group.label}</h3>
          <ul className="mt-5 space-y-2 text-body text-prose md:mt-6">
            {group.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
