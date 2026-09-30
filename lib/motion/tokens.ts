// Central motion constants. Micro 150-250ms, standard 300-500ms, dramatic 700-1200ms.
export const duration = { micro: 0.2, standard: 0.45, dramatic: 0.95, transition: 0.45 } as const;

export const ease = {
  out: [0.16, 1, 0.3, 1],
  inOut: [0.76, 0, 0.24, 1],
} as const satisfies Record<string, readonly [number, number, number, number]>;

export const stagger = { text: 0.09, list: 0.06, menu: 0.07 } as const;

/** Travel distances shrink on small screens. */
export const travel = (isMobile: boolean, full = 40): number => (isMobile ? full * 0.5 : full);

export const MQ = {
  motionOk: "(prefers-reduced-motion: no-preference)",
  mobile: "(max-width: 767px)",
} as const;
