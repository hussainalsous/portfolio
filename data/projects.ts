/**
 * Data-driven project catalog. Add future projects as additional `Project`
 * entries — the presentation components (FeaturedProject / ProjectCard)
 * read from this shape without needing changes.
 */

export type TechCategory =
  | "Web"
  | "Mobile"
  | "Backend"
  | "Data & AI"
  | "Automation"
  | "Computer Vision";

export type TechStackGroup = {
  category: TechCategory;
  items: string[];
};

export type ProjectPoint = {
  title: string;
  description: string;
};

/**
 * How a project's preview panel should render.
 * - "custom": the call site supplies a bespoke visual (e.g. a pipeline
 *   diagram) as children to <ProjectPreview>.
 * - "image": a real screenshot/mockup, once one exists in `public/`.
 * - "placeholder": a clean, honest placeholder — used when no visual exists yet.
 */
export type ProjectPreviewData =
  | { kind: "custom" }
  | { kind: "image"; src: string; alt: string }
  | { kind: "placeholder"; label: string };

export type Project = {
  slug: string;
  name: string;
  /** Short label shown as the subtitle under the title, e.g. the project's domain. */
  category: string;
  /** Featured projects get the large editorial treatment; others get a compact card. */
  featured: boolean;
  /** Strong, concise positioning statement — the homepage description. */
  summary: string;
  /** What problem the project solves. Not shown on the homepage card; reserved for a future case-study page. */
  problem: string;
  /** What the platform does, user-facing. Not shown on the homepage card; reserved for a future case-study page. */
  capabilities: ProjectPoint[];
  /** Why the project is technically interesting, engineering-facing. Not shown on the homepage card; reserved for a future case-study page. */
  highlights: ProjectPoint[];
  /** Full stack, grouped — for a future detailed case-study view. */
  techStack: TechStackGroup[];
  /** A short, ordered subset of `techStack` for the homepage's compact "Tech stack" line. */
  stackHighlight: string[];
  preview: ProjectPreviewData;
  /** Left undefined until a real case study exists — the UI handles that state honestly. */
  caseStudyHref?: string;
  /** Left undefined until the repository is public — the UI handles that state honestly. */
  githubHref?: string;
};

const talento: Project = {
  slug: "talento",
  name: "Talento",
  category: "AI-Powered Recruitment Platform",
  featured: true,
  summary:
    "A smart recruitment platform that uses AI-powered semantic understanding and vector search to connect candidates with relevant job opportunities.",
  problem:
    "Traditional recruitment tools filter by keywords and miss what a CV or job description actually means — Talento matches on meaning instead.",
  capabilities: [
    {
      title: "Semantic Job Matching",
      description:
        "Matches candidates to roles by meaning rather than keywords, using vector embeddings of CVs and job descriptions.",
    },
    {
      title: "AI-Powered CV Analysis",
      description:
        "Parses and evaluates candidate CVs automatically, surfacing relevant experience, strengths, and gaps.",
    },
    {
      title: "Skill-Gap & Course Recommendations",
      description:
        "Detects the gap between a candidate's skills and a target role, then suggests relevant courses to close it.",
    },
    {
      title: "AI-Assisted CV Generation",
      description:
        "Helps candidates build stronger CVs with AI-assisted structure and content suggestions.",
    },
    {
      title: "Role-Based Multi-User Platform",
      description:
        "Separate, permissioned experiences for candidates, employers, and administrators across web and mobile.",
    },
  ],
  highlights: [
    {
      title: "Vector Search with Qdrant",
      description:
        "CV and job embeddings are indexed in Qdrant, enabling fast semantic similarity search at the core of the matching engine.",
    },
    {
      title: "Automated AI Workflows with n8n",
      description:
        "n8n orchestrates the LLM-driven pipelines behind CV parsing, analysis, and recommendation generation.",
    },
    {
      title: "Laravel API Architecture",
      description:
        "A Laravel backend exposes a structured REST API consumed by both the React web app and the Flutter mobile app.",
    },
    {
      title: "Redis-Backed Performance",
      description:
        "Redis caches high-frequency queries and session data to keep search and matching responsive.",
    },
    {
      title: "Shared Web + Mobile Ecosystem",
      description:
        "One backend and matching engine power both the React web application and the Flutter mobile app.",
    },
  ],
  techStack: [
    { category: "Web", items: ["React"] },
    { category: "Mobile", items: ["Flutter"] },
    { category: "Backend", items: ["Laravel", "MySQL"] },
    { category: "Data & AI", items: ["Qdrant", "Redis", "LLMs"] },
    { category: "Automation", items: ["n8n"] },
  ],
  stackHighlight: ["React", "Laravel", "Flutter", "Qdrant", "Redis", "n8n"],
  preview: { kind: "custom" },
};

const presentationAnalyzer: Project = {
  slug: "presentation-skills-analyzer",
  name: "Presentation Skills Analyzer",
  category: "Real-Time Computer Vision System",
  featured: true,
  summary:
    "A computer vision system that analyzes presentation behavior in real time, including eye contact, hand gestures, and body language.",
  problem:
    "Presentation skills are hard to self-assess without a coach watching and giving feedback. This system analyzes eye contact, gestures, and body language in real time, so presenters can get feedback while they practice.",
  capabilities: [
    {
      title: "Eye Contact Tracking",
      description:
        "Tracks gaze and eye contact patterns in real time using facial landmark detection.",
    },
    {
      title: "Hand Gesture Recognition",
      description:
        "Detects hand positions and gestures to flag expressive or distracting movement.",
    },
    {
      title: "Body Language Analysis",
      description:
        "Reads posture and body movement to give feedback on overall presentation presence.",
    },
  ],
  highlights: [
    {
      title: "MediaPipe Landmark Detection",
      description:
        "Uses MediaPipe's face and hand landmark models to track key points frame by frame.",
    },
    {
      title: "OpenCV Video Pipeline",
      description:
        "Processes live video frames with OpenCV for real-time computer vision analysis.",
    },
    {
      title: "NumPy-Based Signal Analysis",
      description:
        "Uses NumPy to analyze landmark movement over time and surface behavioral patterns.",
    },
  ],
  techStack: [
    { category: "Computer Vision", items: ["Python", "OpenCV", "MediaPipe", "NumPy"] },
  ],
  stackHighlight: ["Python", "OpenCV", "MediaPipe", "NumPy"],
  preview: { kind: "custom" },
};

export const projects: Project[] = [talento, presentationAnalyzer];

export const featuredProjects = projects.filter((project) => project.featured);
export const secondaryProjects = projects.filter((project) => !project.featured);
