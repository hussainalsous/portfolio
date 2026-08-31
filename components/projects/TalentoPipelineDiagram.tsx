import { DiagramNode } from "@/components/ui/DiagramNode";
import { DocIcon } from "@/components/ui/DocIcon";

/**
 * Talento's flagship visual: a real AI-system diagram, not a dashboard
 * screenshot. A CV and a job description each run through their own
 * processing step, are converted into embedding vectors, and meet in a
 * shared vector space where semantic similarity produces the match. Static
 * SVG + one CSS dash animation on the final "match found" step, neutralized
 * globally under prefers-reduced-motion.
 */
export function TalentoPipelineDiagram() {
  return (
    <svg
      viewBox="0 0 620 460"
      className="h-auto w-full max-w-2xl"
      role="img"
      aria-label="Talento's semantic matching pipeline: a CV and a job description are each processed and converted into embedding vectors, which meet in a shared vector space to produce a semantic match between candidate and job."
    >
      <defs>
        <filter id="talento-pipeline-shadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.35" />
        </filter>
      </defs>

      <DocIcon x={120} y={14} label="CV" />
      <DocIcon x={460} y={14} label="Job" />

      <g className="stroke-border-strong" strokeWidth={1.25} fill="none">
        <path d="M140,64 L140,100" />
        <path d="M480,64 L480,100" />
        <path d="M140,150 L140,190" />
        <path d="M480,150 L480,190" />
        <path d="M140,240 L290,280" />
        <path d="M480,240 L330,280" />
      </g>

      <path
        d="M310,338 L310,372"
        className="dash-flow stroke-accent"
        strokeWidth={1.75}
        fill="none"
      />

      <DiagramNode
        x={65}
        y={100}
        w={150}
        h={50}
        title="AI Analysis"
        filterId="talento-pipeline-shadow"
      />
      <DiagramNode
        x={405}
        y={100}
        w={150}
        h={50}
        title="Job Processing"
        filterId="talento-pipeline-shadow"
      />
      <DiagramNode
        x={65}
        y={190}
        w={150}
        h={50}
        title="Embedding Vector"
        subtitle="CV"
        filterId="talento-pipeline-shadow"
      />
      <DiagramNode
        x={405}
        y={190}
        w={150}
        h={50}
        title="Embedding Vector"
        subtitle="Job"
        filterId="talento-pipeline-shadow"
      />
      <DiagramNode
        x={215}
        y={280}
        w={190}
        h={58}
        title="Vector Space"
        filterId="talento-pipeline-shadow"
      />
      <DiagramNode
        x={210}
        y={372}
        w={200}
        h={62}
        title="Semantic Match"
        subtitle="Candidate ↔ Job"
        emphasized
        filterId="talento-pipeline-shadow"
      />
    </svg>
  );
}
