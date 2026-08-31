import { DomainGlyph } from "./DomainGlyph";
import { cn } from "@/lib/utils";
import type { ExpertiseDomain } from "@/data/expertise";

type ExpertiseDomainCardProps = {
  domain: ExpertiseDomain;
  /** 0-based position, rendered as the editorial index ("01", "02", ...). */
  index: number;
  className?: string;
};

/**
 * One cell of the Technical Expertise spec-sheet: index, title, a one-line
 * capability statement, and a typographic technology list — no badges, no
 * progress bars. Hover is a quiet background tint + left accent bar, not a
 * transform; there's nothing to click, so no focus/keyboard handling is
 * needed here.
 */
export function ExpertiseDomainCard({ domain, index, className }: ExpertiseDomainCardProps) {
  return (
    <div
      className={cn(
        "group relative flex flex-col gap-6 p-8 transition-colors duration-300 hover:bg-surface-hover lg:p-10",
        className
      )}
    >
      <span
        aria-hidden="true"
        className="absolute inset-y-0 left-0 w-0.5 bg-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />

      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-2">
          <span className="font-mono text-sm text-accent">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            {domain.title}
          </h3>
        </div>
        <DomainGlyph
          variant={domain.glyph}
          className="h-12 w-12 shrink-0 text-muted-foreground/50 transition-colors duration-300 group-hover:text-accent/70"
        />
      </div>

      <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">{domain.blurb}</p>

      <ul className="flex flex-col gap-2.5 pt-2">
        {domain.technologies.map((tech) => (
          <li key={tech} className="flex items-center gap-2.5">
            <span aria-hidden="true" className="h-1 w-1 shrink-0 rounded-full bg-accent/70" />
            <span className="font-mono text-sm text-foreground/80">{tech}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
