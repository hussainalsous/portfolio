/**
 * Contact section content — real information only. No invented social
 * links (LinkedIn, X, personal site, etc.) beyond what's listed here.
 */

export type ContactMethodKey = "email" | "phone" | "location" | "github";

export type ContactMethod = {
  key: ContactMethodKey;
  label: string;
  value: string;
  /** Omitted for methods with no meaningful action (e.g. location). */
  href?: string;
  external?: boolean;
};

export type ContactContent = {
  eyebrow: string;
  heading: string;
  paragraph: string;
  availabilityStatement: string;
  /** Short, compact — rendered as badges, not a bulleted "freelancer landing page" list. */
  availabilityTags: string[];
  methods: ContactMethod[];
};

export const contactContent: ContactContent = {
  eyebrow: "Contact",
  heading: "Let's Work Together",
  paragraph:
    "Have an idea, a project, or an opportunity in mind? I'm always open to meaningful conversations about building intelligent software and solving challenging technical problems.",
  availabilityStatement: "Open to opportunities and collaborations.",
  availabilityTags: [
    "Full-Time",
    "Freelance",
    "AI & Computer Vision",
    "Full-Stack Development",
    "Technical Collaboration",
  ],
  methods: [
    {
      key: "email",
      label: "Email",
      value: "hussainalsous@gmail.com",
      href: "mailto:hussainalsous@gmail.com",
    },
    {
      key: "phone",
      label: "Phone",
      value: "+963 937 820 315",
      href: "tel:+963937820315",
    },
    {
      key: "location",
      label: "Location",
      value: "Damascus, Syria",
    },
    {
      key: "github",
      label: "GitHub",
      value: "github.com/hussainalsous",
      href: "https://github.com/hussainalsous",
      external: true,
    },
  ],
};
