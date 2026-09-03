/**
 * Data-driven content for the "Technical Expertise" section. Four fixed
 * domains, each with a short capability blurb and a curated technology
 * list — only things actually used in the projects/data this portfolio
 * already describes, not an aspirational stack.
 */

export type DomainGlyphVariant = "ai" | "vision" | "fullstack" | "data";

export type ExpertiseDomain = {
  slug: string;
  title: string;
  glyph: DomainGlyphVariant;
  /** One-line capability statement — what the domain enables, not a task list. */
  blurb: string;
  technologies: string[];
};

export const expertiseDomains: ExpertiseDomain[] = [
  {
    slug: "full-stack",
    title: "Full-Stack Engineering",
    glyph: "fullstack",
    blurb: "Shipping complete products — from interface to database, across web and mobile.",
    technologies: [
      "React",
      "Next.js",
      "Laravel",
      "React Native",
      "REST APIs",
      "Authentication",
      "Backend Architecture",
    ],
  },
  {
    slug: "automation",
    title: "Workflow Automation & LLM Integration",
    glyph: "ai",
    blurb: "Wiring services together and adding language-aware steps where they save real work.",
    technologies: [
      "n8n",
      "LLM APIs",
      "Prompt Design",
      "Webhooks",
      "Workflow Orchestration",
    ],
  },
  {
    slug: "computer-vision",
    title: "Computer Vision",
    glyph: "vision",
    blurb: "Reading visual signals in real time — faces, hands, and motion as data.",
    technologies: [
      "OpenCV",
      "MediaPipe",
      "Image Processing",
      "Face & Hand Tracking",
      "Real-Time Vision",
    ],
  },
  {
    slug: "data-infra",
    title: "Data & Infrastructure",
    glyph: "data",
    blurb: "The services and data layers that keep automated systems fast and reliable.",
    technologies: ["MySQL", "Redis", "Qdrant", "Docker", "Supabase"],
  },
];
