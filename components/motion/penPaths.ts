/** Hand-drawn stroke paths shared by animated marks. */
export const penPaths = {
  underline: { viewBox: "0 0 100 10", d: "M1 6.5 C 18 2.5, 40 8.5, 62 4.5 S 92 5.5, 99 3" },
  circle: {
    viewBox: "0 0 100 40",
    d: "M55 3.5 C 22 0.5, 3 11, 5 22 C 8 35, 40 39.5, 68 36.5 C 94 33, 99.5 19, 88 9.5 C 79 3.5, 58 2, 34 5.5",
  },
  box: { viewBox: "0 0 100 40", d: "M3 6 C 30 3, 70 4.5, 97 2.5 C 98.5 14, 97.5 26, 98 37 C 70 38.5, 30 36, 2 38 C 3.5 26, 1.5 14, 3 6 C 3.5 4.5, 6 3.5, 9 4" },
  tick: { viewBox: "0 0 24 20", d: "M2 11 C 5 13, 7.5 16, 9 18 C 13 9, 17.5 4, 22.5 1.5" },
} as const;

export type PenVariant = keyof typeof penPaths;
