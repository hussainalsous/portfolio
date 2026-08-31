import { Mail, Phone, MapPin, Code2, type LucideIcon } from "lucide-react";
import { contactContent, type ContactMethod } from "@/data/contact";

const ICONS: Record<ContactMethod["key"], LucideIcon> = {
  email: Mail,
  phone: Phone,
  location: MapPin,
  github: Code2,
};

/**
 * Email and GitHub are real links (GitHub opens in a new tab safely);
 * phone uses tel:; location has no href since there's no meaningful
 * action for it. The negative margin enlarges the tap target without
 * shifting the visible layout — helps on mobile.
 */
export function ContactMethods() {
  return (
    <ul className="flex flex-col gap-3">
      {contactContent.methods.map((method) => {
        const Icon = ICONS[method.key];

        const content = (
          <>
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-border bg-surface transition-colors duration-200 group-hover:border-border-strong">
              <Icon
                className="h-4 w-4 text-muted-foreground transition-colors duration-200 group-hover:text-accent"
                aria-hidden="true"
              />
            </span>
            <span className="flex flex-col gap-0.5">
              <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                {method.label}
              </span>
              <span className="text-sm text-foreground transition-colors duration-200 group-hover:text-accent sm:text-base">
                {method.value}
              </span>
            </span>
          </>
        );

        return (
          <li key={method.key}>
            {method.href ? (
              <a
                href={method.href}
                target={method.external ? "_blank" : undefined}
                rel={method.external ? "noopener noreferrer" : undefined}
                className="group -m-2 flex items-center gap-4 rounded-lg p-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                {content}
              </a>
            ) : (
              <div className="-m-2 flex items-center gap-4 p-2">{content}</div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
