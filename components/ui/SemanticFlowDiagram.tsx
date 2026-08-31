import { DiagramNode } from "@/components/ui/DiagramNode";
import { DocIcon } from "@/components/ui/DocIcon";

const VECTOR_DOTS = [
  { x: 90, y: 20, r: 2.5 },
  { x: 140, y: 15, r: 2 },
  { x: 55, y: 55, r: 2 },
  { x: 170, y: 60, r: 2.5 },
  { x: 30, y: 100, r: 2 },
  { x: 150, y: 120, r: 2 },
  { x: 65, y: 135, r: 2.5 },
  { x: 175, y: 30, r: 1.75 },
  { x: 40, y: 30, r: 1.75 },
];

/**
 * The Hero's brand visual: a distilled, abstract read of how Talento-style
 * systems work — CV/Job → Embedding → Vector Space → Semantic Match. Not
 * project-specific data, just the shape of the idea. Static SVG + one CSS
 * dash animation (shared with the Talento diagram, neutralized under
 * prefers-reduced-motion), no canvas or JS animation loop.
 */
export function SemanticFlowDiagram() {
  return (
    <svg
      viewBox="0 0 320 460"
      className="h-auto w-full max-w-75"
      role="img"
      aria-label="Diagram of a semantic matching pipeline: a CV and a job description are converted into embeddings, placed in a shared vector space, and matched by semantic similarity."
    >
      <defs>
        <filter id="hero-node-shadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.3" />
        </filter>
      </defs>

      {/* CV / Job inputs */}
      <DocIcon x={100} y={8} label="CV" />
      <DocIcon x={180} y={8} label="Job" />

      {/* Converge into the embedding stage */}
      <g className="stroke-border-strong" strokeWidth={1.25} fill="none">
        <path d="M120,66 L160,96" />
        <path d="M200,66 L160,96" />
      </g>

      <DiagramNode
        x={90}
        y={100}
        w={140}
        h={50}
        title="Embedding"
        subtitle="vector representation"
        filterId="hero-node-shadow"
      />

      {/* Embedding vector bars, drawn inside the node */}
      <g className="fill-muted-foreground/60">
        {[0, 1, 2, 3, 4, 5, 6].map((i) => {
          const barHeight = [10, 16, 8, 20, 12, 18, 9][i];
          return (
            <rect
              key={i}
              x={104 + i * 17}
              y={140 - barHeight}
              width={6}
              height={barHeight}
              rx={1.5}
              className={i === 3 ? "fill-accent" : undefined}
            />
          );
        })}
      </g>

      <line
        x1={160}
        y1={150}
        x2={160}
        y2={188}
        className="stroke-border-strong"
        strokeWidth={1.25}
      />

      {/* Vector space */}
      <rect
        x={60}
        y={188}
        width={200}
        height={168}
        rx={16}
        className="fill-surface/60 stroke-border"
        strokeWidth={1}
      />
      <text
        x={160}
        y={210}
        textAnchor="middle"
        className="fill-muted-foreground font-mono text-[9px] uppercase tracking-widest"
      >
        Vector Space
      </text>

      {VECTOR_DOTS.map((dot, i) => (
        <circle
          key={i}
          cx={dot.x + 60}
          cy={dot.y + 210}
          r={dot.r}
          className="fill-muted-foreground/35"
        />
      ))}

      {/* The matched pair, highlighted */}
      <circle cx={175} cy={310} r="4" className="fill-accent" />
      <circle cx={195} cy={325} r="4" className="fill-accent" />
      <line
        x1={175}
        y1={310}
        x2={195}
        y2={325}
        className="stroke-accent"
        strokeWidth={1.5}
      />
      <ellipse
        cx={185}
        cy={317}
        rx={26}
        ry={22}
        className="stroke-accent/40"
        strokeWidth={1}
        strokeDasharray="3 4"
        fill="none"
      />

      <line
        x1={160}
        y1={356}
        x2={160}
        y2={392}
        className="dash-flow stroke-accent"
        strokeWidth={1.5}
      />

      <DiagramNode
        x={90}
        y={396}
        w={140}
        h={52}
        title="Semantic Match"
        subtitle="candidate ↔ job"
        emphasized
        filterId="hero-node-shadow"
      />
    </svg>
  );
}
