# Shreekumar B — Portfolio

Next.js (App Router) · TypeScript strict · Tailwind v4 · Framer Motion (components, page transition) · GSAP + ScrollTrigger (scroll).

```bash
npm install
npm run dev        # http://localhost:3000
npm run lint && npm run typecheck && npm run build
```

## Content lives in `data/`

| File | What |
| --- | --- |
| `site.ts` | Identity, links, `email`, `portrait` (null = monogram), site URL |
| `projects.ts` | The five Selected Work entries and every case-study section. Add or swap a project here only, the UI does not change |
| `achievements.ts` | Selected Signals |
| `skills.ts` | Stack columns and Capabilities |
| `experiments.ts` | Lab |

## Open TODOs (all visible on the site)

- `data/site.ts`: optional `portrait` file in `public/images`.
- `data/projects.ts`: optional real screenshots (`image: "/projects/<file>"`; covers are shown until then), the GradeMIND hackathon outcome, project links (only PRYSM and DriftCheck have one), and `team` names where you want them shown.
- `NEXT_PUBLIC_SITE_URL`: final domain (defaults to the existing portfolio URL).

## Motion

Primitives in `components/motion/`, constants in `lib/motion/tokens.ts`. Only transform, opacity and clip-path animate. `prefers-reduced-motion` disables the preloader, cursor, page transition and parallax, and everything renders in its final state.
