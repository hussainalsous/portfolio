import type { NavLink } from "@/data/site";

/**
 * Footer-specific content only. Brand name/positioning comes from
 * `siteConfig` and the email/GitHub links come from `contactContent` —
 * neither is duplicated here.
 */
export type FooterContent = {
  navLinks: NavLink[];
  copyright: string;
  techStatement: string;
};

export const footerContent: FooterContent = {
  navLinks: [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ],
  copyright: "© 2026 Hussain Alsous. All rights reserved.",
  techStatement: "Built with Next.js & TypeScript",
};
