import type { DomainGlyphVariant } from "@/data/expertise";

type DomainGlyphProps = {
  variant: DomainGlyphVariant;
  className?: string;
};

/**
 * A small, static per-domain accent glyph — not a full diagram. Reuses the
 * site's established line-art language at a much quieter scale than the
 * Hero/Projects diagrams: dots+lines for automated workflow/data flow, the
 * same focus bracket used by the Presentation Skills Analyzer visual for
 * Computer Vision, and stacked bars for layered full-stack architecture.
 * Colored via `currentColor` so the parent's hover utility drives its
 * appearance.
 */
export function DomainGlyph({ variant, className }: DomainGlyphProps) {
  return (
    <svg viewBox="0 0 56 56" className={className} aria-hidden="true">
      {variant === "ai" && <AiGlyph />}
      {variant === "vision" && <VisionGlyph />}
      {variant === "fullstack" && <FullStackGlyph />}
      {variant === "data" && <DataGlyph />}
    </svg>
  );
}

const NODES: [number, number][] = [
  [16, 16],
  [38, 12],
  [40, 36],
  [18, 40],
];

function AiGlyph() {
  return (
    <g fill="none" stroke="currentColor" strokeWidth={1.25}>
      <path d="M16,16 L38,12 M38,12 L40,36 M40,36 L18,40 M18,40 L16,16 M16,16 L40,36" />
      {NODES.map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r={2.5} fill="currentColor" stroke="none" />
      ))}
    </g>
  );
}

function VisionGlyph() {
  return (
    <g fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path d="M12,20 L12,12 L20,12" />
      <path d="M36,12 L44,12 L44,20" />
      <path d="M12,36 L12,44 L20,44" />
      <path d="M44,36 L44,44 L36,44" />
      <circle cx={28} cy={28} r={5} />
    </g>
  );
}

function FullStackGlyph() {
  return (
    <g fill="none" stroke="currentColor" strokeWidth={1.25}>
      <rect x={12} y={14} width={32} height={8} rx={2.5} />
      <rect x={12} y={26} width={32} height={8} rx={2.5} />
      <rect x={12} y={38} width={32} height={8} rx={2.5} />
    </g>
  );
}

function DataGlyph() {
  return (
    <g fill="none" stroke="currentColor" strokeWidth={1.25}>
      <line x1={14} y1={28} x2={42} y2={28} />
      {[14, 28, 42].map((cx, i) => (
        <circle key={cx} cx={cx} cy={28} r={i === 1 ? 3.5 : 2.5} fill="currentColor" stroke="none" />
      ))}
    </g>
  );
}
