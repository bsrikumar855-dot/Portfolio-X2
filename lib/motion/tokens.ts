// Central motion constants (seconds). Micro 180-250ms, standard 400-500ms, reveal 600-800ms.
export const duration = { micro: 0.2, standard: 0.45, reveal: 0.7, row: 0.7, transition: 0.32 } as const;

export const ease = {
  out: [0.22, 1, 0.36, 1],
  inOut: [0.76, 0, 0.24, 1],
} as const satisfies Record<string, readonly [number, number, number, number]>;

export const stagger = { text: 0.075, list: 0.06, menu: 0.07, row: 0.08 } as const;

export const MQ = {
  motionOk: "(prefers-reduced-motion: no-preference)",
  mobile: "(max-width: 767px)",
} as const;
