import Link from "next/link";
import { Mail, Code2 } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/data/site";
import { contactContent } from "@/data/contact";
import { footerContent } from "@/data/footer";

const linkClasses =
  "rounded-sm text-sm text-muted-foreground transition-colors hover:text-foreground " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent " +
  "focus-visible:ring-offset-2 focus-visible:ring-offset-background";

const CONNECT_ICONS = { email: Mail, github: Code2 } as const;

/**
 * The portfolio's quiet closing signature — not another section to
 * explore. Smaller vertical rhythm than the major content sections
 * (Section's py-24/32 would make it compete with Contact), a hairline
 * top border for separation, and a faint surface tint rather than the
 * Contact panel's bordered-card treatment.
 */
export function Footer() {
  const connectMethods = contactContent.methods.filter(
    (method) => method.key === "email" || method.key === "github"
  );

  return (
    <footer className="border-t border-border bg-surface/30">
      <Container>
        <div className="flex flex-col gap-12 py-14 md:py-16 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
          <div className="flex max-w-xs flex-col gap-3">
            <span className="text-lg font-semibold tracking-tight text-foreground">
              {siteConfig.name}
            </span>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {siteConfig.positioning}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-12 sm:gap-20">
            <nav aria-label="Footer navigation">
              <h3 className="mb-4 font-mono text-xs uppercase tracking-widest text-muted-foreground/70">
                Navigation
              </h3>
              <ul className="flex flex-col gap-3">
                {footerContent.navLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={linkClasses}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <h3 className="mb-4 font-mono text-xs uppercase tracking-widest text-muted-foreground/70">
                Connect
              </h3>
              <ul className="flex flex-col gap-3">
                {connectMethods.map((method) => {
                  const Icon = CONNECT_ICONS[method.key as keyof typeof CONNECT_ICONS];
                  return (
                    <li key={method.key}>
                      <a
                        href={method.href}
                        target={method.external ? "_blank" : undefined}
                        rel={method.external ? "noopener noreferrer" : undefined}
                        className={cn("inline-flex items-center gap-2", linkClasses)}
                      >
                        <Icon className="h-4 w-4" aria-hidden="true" />
                        {method.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-border" />

        <div className="flex flex-col items-center gap-3 py-8 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <p className="font-mono text-xs text-muted-foreground/70">{footerContent.copyright}</p>
          <p className="font-mono text-xs text-muted-foreground/70">{footerContent.techStatement}</p>
        </div>
      </Container>
    </footer>
  );
}
