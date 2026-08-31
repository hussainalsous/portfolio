import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SystemLayers } from "@/components/about/SystemLayers";
import { aboutContent } from "@/data/about";

export function About() {
  return (
    <Section id="about">
      <Container>
        <div className="grid gap-14 lg:grid-cols-12 lg:items-start lg:gap-x-16">
          <Reveal className="flex flex-col gap-6 lg:col-span-5">
            <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              {aboutContent.eyebrow}
            </span>
            <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              {aboutContent.heading.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>
            <p className="max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
              {aboutContent.paragraph}
            </p>
          </Reveal>

          <Reveal delayMs={100} className="lg:col-span-7">
            <SystemLayers />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
