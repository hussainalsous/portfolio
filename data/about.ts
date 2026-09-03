/**
 * Content for the About section. Kept data-driven like the rest of the
 * site — the section communicates how the work is approached (systems
 * thinking), not a biography.
 */

export type SystemLayer = {
  title: string;
  description: string;
};

export type AboutContent = {
  eyebrow: string;
  /** Rendered as separate lines — a deliberate editorial break, not just text wrap. */
  heading: string[];
  paragraph: string;
  layers: SystemLayer[];
  /** The outcome the three layers connect toward, closing the spine visual. */
  closingLabel: string;
};

export const aboutContent: AboutContent = {
  eyebrow: "01 / About",
  heading: ["Building systems,", "not just interfaces."],
  paragraph:
    "I approach software as a connected system. From interfaces and APIs to data and the automated workflows that tie them together, I focus on making every layer work together — not shipping isolated features.",
  layers: [
    {
      title: "Full-Stack Engineering",
      description:
        "I work across the whole product — interfaces, APIs, backend services, databases, and the architecture that ties every layer together.",
    },
    {
      title: "Workflow Automation",
      description:
        "I use n8n to connect services and automate processes, adding LLM-powered steps — parsing, matching, generation — where they save real work.",
    },
    {
      title: "Computer Vision",
      description:
        "I build systems that interpret visual signals in real time — gesture, motion, and facial cues turned into interactive feedback.",
    },
  ],
  closingLabel: "Real Products",
};
