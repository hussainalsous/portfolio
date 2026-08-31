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
    slug: "ai-ml",
    title: "AI & Machine Learning",
    glyph: "ai",
    blurb: "Building systems that understand, represent, and match information.",
    technologies: [
      "LLMs",
      "Embeddings",
      "Semantic Search",
      "Vector Databases",
      "AI Agents",
      "NLP",
      "Resume / Job Matching",
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
      "Computer Vision",
    ],
  },
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
    slug: "data-infra",
    title: "Data & Infrastructure",
    glyph: "data",
    blurb: "The services and data layers that keep intelligent systems fast and reliable.",
    technologies: ["MySQL", "Redis", "Qdrant", "Docker", "n8n", "Supabase"],
  },
];
