import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { NodeNetwork } from "@/components/ui/NodeNetwork";
import { Portrait } from "@/components/hero/Portrait";
import { siteConfig } from "@/data/site";

export function Hero() {
  const { name, positioning, supportingStatement, roleTags, cta } = siteConfig;

  return (
    <section
      id="home"
      className="relative isolate flex min-h-[88dvh] items-center overflow-hidden"
    >
      {/* Background treatment: a faint accent glow + drifting node graph. Kept subtle by design. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,var(--accent-soft),transparent)]"
      />
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-40">
        <NodeNetwork className="h-full w-full" />
      </div>

      <Container>
        <div className="grid gap-12 py-20 md:py-24 lg:grid-cols-12 lg:items-center lg:gap-14">
          <div className="flex flex-col items-start gap-7 lg:col-span-8">
            <div className="flex flex-wrap gap-2">
              {roleTags.map((tag) => (
                <Badge key={tag.label}>{tag.label}</Badge>
              ))}
            </div>

            <div className="flex flex-col gap-5">
              <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl md:text-6xl">
                {name}
              </h1>
              <p className="max-w-xl text-xl font-medium text-foreground/90 sm:text-2xl">
                {positioning}
              </p>
              <p className="max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
                {supportingStatement}
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Button href={cta.primary.href} variant="primary">
                {cta.primary.label}
              </Button>
              <Button href={cta.secondary.href} variant="secondary">
                {cta.secondary.label}
              </Button>
            </div>
          </div>

          <div className="flex justify-center lg:col-span-4 lg:justify-end">
            <Portrait name={name} className="max-w-56 sm:max-w-64 lg:max-w-72" />
          </div>
        </div>
      </Container>
    </section>
  );
}
