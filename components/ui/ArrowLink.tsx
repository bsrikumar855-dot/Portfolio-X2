import { ArrowRight } from "lucide-react";
import type { ComponentProps } from "react";
import { TransitionLink } from "@/components/motion/TransitionLink";
import { cn } from "@/lib/utils/cn";

type Props = ComponentProps<typeof TransitionLink> & { arrow?: boolean };

/** Mono call-to-action with an arrow that steps forward on hover. */
export function ArrowLink({ children, className, arrow = true, ...rest }: Props) {
  return (
    <TransitionLink
      className={cn("group inline-flex min-h-11 items-center gap-3 border-b border-current text-small font-medium !text-current", className)}
      {...rest}
    >
      {children}
      {arrow && <ArrowRight aria-hidden size={16} className="transition-transform duration-200 ease-out group-hover:translate-x-1" />}
    </TransitionLink>
  );
}
