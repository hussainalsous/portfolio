type DocIconProps = {
  x: number;
  y: number;
  label: string;
};

/**
 * A minimal abstracted "document" glyph (rounded rect + text-line strokes) —
 * used to represent a CV or job description in the semantic-matching
 * diagrams. Shared by the Hero's SemanticFlowDiagram and Talento's
 * pipeline diagram so both read as the same visual language.
 */
export function DocIcon({ x, y, label }: DocIconProps) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={40}
        height={50}
        rx={6}
        className="fill-surface stroke-border"
        strokeWidth={1}
      />
      {[0, 1, 2].map((i) => (
        <line
          key={i}
          x1={x + 8}
          x2={x + 32}
          y1={y + 14 + i * 9}
          y2={y + 14 + i * 9}
          className="stroke-muted-foreground/50"
          strokeWidth={1.5}
          strokeLinecap="round"
        />
      ))}
      <text
        x={x + 20}
        y={y + 64}
        textAnchor="middle"
        className="fill-muted-foreground font-mono text-[9px] uppercase tracking-widest"
      >
        {label}
      </text>
    </g>
  );
}
