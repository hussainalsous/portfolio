import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionProps = {
  id?: string;
  children: ReactNode;
  className?: string;
  /** Set false for sections that manage their own vertical rhythm (e.g. a full-viewport hero). */
  padded?: boolean;
};

/** Shared vertical rhythm + anchor id for top-level homepage sections. */
export function Section({ id, children, className, padded = true }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(padded && "py-24 md:py-32", className)}
    >
      {children}
    </section>
  );
}
