import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { ProjectPreview } from "./ProjectPreview";
import type { Project } from "@/data/projects";

/**
 * Compact presentation for non-flagship projects. Not currently rendered
 * (Talento is the only project so far) but ready for future entries in
 * data/projects.ts without any changes to the section that renders it.
 */
export function ProjectCard({ project }: { project: Project }) {
  const techPreview = project.techStack.flatMap((group) => group.items).slice(0, 4);

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface/40 transition-colors hover:border-border-strong">
      <ProjectPreview preview={project.preview} className="rounded-none border-0 border-b" />

      <div className="flex flex-1 flex-col gap-3 p-6">
        <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          {project.category}
        </span>
        <h3 className="text-lg font-semibold text-foreground">{project.name}</h3>
        <p className="text-sm leading-relaxed text-muted-foreground">{project.summary}</p>

        <div className="mt-auto flex flex-wrap gap-2 pt-2">
          {techPreview.map((item) => (
            <Badge key={item}>{item}</Badge>
          ))}
        </div>

        {project.caseStudyHref ? (
          <Link
            href={project.caseStudyHref}
            className="text-sm font-medium text-accent transition-colors hover:text-accent-hover"
          >
            View project →
          </Link>
        ) : (
          <span className="text-sm text-muted-foreground/70">Case study coming soon</span>
        )}
      </div>
    </article>
  );
}
