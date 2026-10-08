import { Play } from "lucide-react";

/** Small "has a launch video" marker for project rows. */
export function VideoBadge({ duration }: { duration: string }) {
  return (
    <span className="flex items-center gap-2">
      <Play aria-hidden className="size-3 fill-current" />
      Launch video · {duration}
    </span>
  );
}
