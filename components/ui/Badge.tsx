import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type BadgeProps = {
  children: ReactNode;
  className?: string;
};

/** Small mono-font identity tag — used for role/specialization labels, not decoration. */
export function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-border px-3 py-1",
        "font-mono text-xs tracking-wide text-muted-foreground",
        className
      )}
    >
      {children}
    </span>
  );
}
