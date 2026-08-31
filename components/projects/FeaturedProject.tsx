import type { ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { ProjectPreview } from "./ProjectPreview";
import { cn } from "@/lib/utils";
import type { Project } from "@/data/projects";

type FeaturedProjectProps = {
  project: Project;
  /** 1-based position, rendered as the editorial index ("01", "02", ...). */
  index: number;
  /** Bespoke preview visual (e.g. a pipeline diagram) for this project. */
  preview?: ReactNode;
};

const disabledActionClasses =
  "inline-flex items-center gap-2 rounded-md border border-dashed border-border px-5 py-3 text-sm font-medium text-muted-foreground";

/**
 * An editorial case-study block: index, title, subtitle, a large preview
 * visual, a one-paragraph description, a compact tech-stack line, and
 * actions. Deeper detail (capabilities, technical highlights, full stack)
 * stays in the project data for a future case-study page rather than
 * rendering here — this is a curated homepage preview, not documentation.
 *
 * DOM order is index/title → visual → description/stack/actions, so mobile
 * (which stacks in source order) reads in that exact sequence; the lg+
 * grid re-places the visual beside the text without reordering the markup.
 */
export function FeaturedProject({ project, index, preview }: FeaturedProjectProps) {
  return (
    <article className="rounded-3xl border border-border bg-surface/40 p-8 md:p-10 lg:p-12">
      <div className="flex flex-col gap-8 lg:grid lg:grid-cols-12 lg:auto-rows-min lg:items-start lg:gap-x-14 lg:gap-y-10">
        <div className="flex flex-col gap-3 lg:col-span-5 lg:col-start-1 lg:row-start-1">
          <span className="font-mono text-sm text-accent">
            {String(index).padStart(2, "0")}
          </span>
          <h3 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {project.name}
          </h3>
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            {project.category}
          </p>
        </div>

        <div className="lg:col-span-7 lg:col-start-6 lg:row-span-2 lg:row-start-1 lg:self-center">
          <ProjectPreview preview={project.preview}>{preview}</ProjectPreview>
        </div>

        <div className="flex flex-col gap-6 lg:col-span-5 lg:col-start-1 lg:row-start-2">
          <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
            {project.summary}
          </p>

          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground/80">
            {project.stackHighlight.join(" · ")}
          </p>

          <div className="flex flex-wrap items-center gap-4">
            {project.caseStudyHref ? (
              <Button href={project.caseStudyHref} variant="primary">
                View Case Study →
              </Button>
            ) : (
              <span aria-disabled="true" className={disabledActionClasses}>
                Case Study — Coming Soon
              </span>
            )}

            {project.githubHref ? (
              <Button href={project.githubHref} variant="secondary">
                GitHub ↗
              </Button>
            ) : (
              <span aria-disabled="true" className={cn(disabledActionClasses, "text-muted-foreground/70")}>
                Source — Private
              </span>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
