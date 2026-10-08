// Launch videos, one per project (made with the /brag skill; files live in public/videos).
// Adding a video: drop `<slug>.mp4` and `<slug>.jpg` into public/videos and add the slug here.

export type LaunchVideo = {
  src: string;
  poster: string;
  /** Display length, e.g. "0:24". */
  duration: string;
  seconds: number;
  width: number;
  height: number;
};

const make = (slug: string, seconds: number): LaunchVideo => ({
  src: `/videos/${slug}.mp4`,
  poster: `/videos/${slug}.jpg`,
  seconds,
  duration: `0:${String(Math.round(seconds)).padStart(2, "0")}`,
  width: 1920,
  height: 1080,
});

export const videos: Readonly<Record<string, LaunchVideo | undefined>> = {
  grademind: make("grademind", 23.84),
  prysm: make("prysm", 23.57),
  "ahal-ai": make("ahal-ai", 23.57),
  driftcheck: make("driftcheck", 23.85),
  minchal: make("minchal", 23.71),
};

export const getVideo = (slug: string): LaunchVideo | undefined => videos[slug];

/** The soundtrack is CC BY 4.0, so it is credited wherever a video plays. */
export const musicCredit = {
  text: "Music: “Happy Beats / Business Moves” by ende.app, CC BY 4.0",
  href: "https://ende.app/en",
} as const;
