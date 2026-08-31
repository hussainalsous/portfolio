import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Badge } from "@/components/ui/Badge";
import { ContactMethods } from "@/components/contact/ContactMethods";
import { ContactForm } from "@/components/contact/ContactForm";
import { contactContent } from "@/data/contact";

export function Contact() {
  return (
    <Section id="contact">
      <Container>
        <div className="grid gap-16 lg:grid-cols-12 lg:items-start lg:gap-x-16">
          <Reveal className="flex flex-col gap-6 lg:col-span-5">
            <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              {contactContent.eyebrow}
            </span>
            <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              {contactContent.heading}
            </h2>
            <p className="max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
              {contactContent.paragraph}
            </p>

            <div className="flex flex-col gap-3">
              <p className="text-sm font-medium text-foreground">
                {contactContent.availabilityStatement}
              </p>
              <div className="flex flex-wrap gap-2">
                {contactContent.availabilityTags.map((tag) => (
                  <Badge key={tag}>{tag}</Badge>
                ))}
              </div>
            </div>

            <ContactMethods />
          </Reveal>

          <Reveal delayMs={100} className="lg:col-span-7">
            <div className="rounded-3xl border border-border bg-surface/40 p-8 md:p-10">
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
