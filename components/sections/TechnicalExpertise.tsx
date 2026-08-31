import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ExpertiseDomainCard } from "@/components/expertise/ExpertiseDomainCard";
import { expertiseDomains } from "@/data/expertise";
import { cn } from "@/lib/utils";

/**
 * Internal-divider classes for a fixed 2x2 grid (sm:grid-cols-2), keyed by
 * index: mobile stacks all four with a top divider; sm+ adds a left divider
 * for the right column and keeps the top divider for the second row. Sized
 * for exactly the four domains this section defines.
 */
const dividerClasses = ["", "border-t sm:border-t-0 sm:border-l", "border-t", "border-t sm:border-l"];

export function TechnicalExpertise() {
  return (
    <Section id="expertise">
      <Container>
        <Reveal className="flex flex-col gap-4">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Technical Expertise
          </h2>
          <p className="max-w-2xl text-muted-foreground">
            The tools and technologies I use to turn intelligent ideas into
            production-ready systems.
          </p>
        </Reveal>

        <Reveal delayMs={100} className="mt-12">
          <div className="overflow-hidden rounded-3xl border border-border bg-surface/40">
            <div className="grid grid-cols-1 sm:grid-cols-2">
              {expertiseDomains.map((domain, index) => (
                <ExpertiseDomainCard
                  key={domain.slug}
                  domain={domain}
                  index={index}
                  className={cn("border-border", dividerClasses[index])}
                />
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
