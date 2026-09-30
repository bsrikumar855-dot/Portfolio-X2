import { ArrowRight } from "lucide-react";
import type { ComponentProps } from "react";
import { TransitionLink } from "@/components/motion/TransitionLink";
import { cn } from "@/lib/utils/cn";

type Props = ComponentProps<typeof TransitionLink> & { arrow?: boolean };

/** Mono call-to-action with an arrow that steps forward on hover. */
export function ArrowLink({ children, className, arrow = true, ...rest }: Props) {
  return (
    <TransitionLink
      className={cn("group meta inline-flex items-center gap-3 border-b border-current pb-1.5 !text-current", className)}
      {...rest}
    >
      {children}
      {arrow && <ArrowRight aria-hidden size={14} className="transition-transform duration-300 ease-out group-hover:translate-x-1.5" />}
    </TransitionLink>
  );
}
