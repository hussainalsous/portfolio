/**
 * Single source of truth for site-wide identity content.
 * Sections should read from here rather than hardcoding copy,
 * so the same facts (name, role, CTAs) never drift out of sync.
 */

export type RoleTag = {
  label: string;
};

export type NavLink = {
  label: string;
  href: string;
};

export type SiteConfig = {
  name: string;
  /** Short professional positioning shown directly under the name in the hero. */
  positioning: string;
  /** One or two sentence supporting statement, elaborating on the positioning. */
  supportingStatement: string;
  /** Compact identity tags rendered as badges (not a full skills wall). */
  roleTags: RoleTag[];
  cta: {
    primary: { label: string; href: string };
    secondary: { label: string; href: string };
  };
  /**
   * Primary site navigation. "About" has no section yet — the link is
   * inert (scrolls nowhere) until that section exists, same as the Hero's
   * existing CTAs pointing at #contact before a Contact section exists.
   */
  navLinks: NavLink[];
};

export const siteConfig: SiteConfig = {
  name: "Hussain Alsous",
  positioning:
    "Full-Stack Engineer building web, mobile, and computer vision products, automated with n8n and LLMs.",
  supportingStatement:
    "I design and build full-stack web and mobile products — including real-time computer vision systems — and connect them with automated workflows, using n8n to orchestrate processes and LLMs to add intelligent, language-aware steps where they add real value.",
  roleTags: [
    { label: "Full-Stack Development" },
    { label: "Computer Vision" },
    { label: "Workflow Automation (n8n)" },
    { label: "LLM Integration" },
  ],
  cta: {
    primary: { label: "View Projects", href: "#projects" },
    secondary: { label: "Contact Me", href: "#contact" },
  },
  navLinks: [
    { label: "Home", href: "#home" },
    { label: "Projects", href: "#projects" },
    { label: "Expertise", href: "#expertise" },
    { label: "About", href: "#about" },
  ],
};
