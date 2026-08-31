import type { ReactNode } from "react";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { FeaturedProject } from "@/components/projects/FeaturedProject";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { TalentoPipelineDiagram } from "@/components/projects/TalentoPipelineDiagram";
import { PresentationAnalyzerVisual } from "@/components/projects/PresentationAnalyzerVisual";
import { featuredProjects, secondaryProjects } from "@/data/projects";

/** Bespoke preview visuals, keyed by project slug, for featured projects that have one. */
const featuredPreviews: Record<string, ReactNode> = {
  talento: <TalentoPipelineDiagram />,
  "presentation-skills-analyzer": <PresentationAnalyzerVisual />,
};

export function Projects() {
  return (
    <Section id="projects">
      <Container>
        <Reveal className="flex flex-col gap-4">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Featured Projects
          </h2>
          <p className="max-w-2xl text-muted-foreground">
            Selected systems I&apos;ve designed and built, combining AI, software
            engineering, and computer vision.
          </p>
        </Reveal>

        <div className="mt-12 flex flex-col gap-16">
          {featuredProjects.map((project, index) => (
            <Reveal key={project.slug}>
              <FeaturedProject
                project={project}
                index={index + 1}
                preview={featuredPreviews[project.slug]}
              />
            </Reveal>
          ))}
        </div>

        {secondaryProjects.length > 0 && (
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {secondaryProjects.map((project, index) => (
              <Reveal key={project.slug} delayMs={index * 80}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        )}
      </Container>
    </Section>
  );
}
