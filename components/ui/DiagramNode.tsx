import { cn } from "@/lib/utils";

type DiagramNodeProps = {
  x: number;
  y: number;
  w: number;
  h: number;
  title: string;
  subtitle?: string;
  emphasized?: boolean;
  /** id of an SVG <filter> (e.g. a drop shadow) defined in the parent's <defs>. */
  filterId?: string;
};

/**
 * Shared node glyph — a rounded rect with a mono title/subtitle — used by
 * both the Hero's semantic-flow diagram and the Talento architecture
 * diagram so they read as the same visual language rather than two
 * unrelated illustrations.
 */
export function DiagramNode({
  x,
  y,
  w,
  h,
  title,
  subtitle,
  emphasized,
  filterId,
}: DiagramNodeProps) {
  const midY = y + h / 2;

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={10}
        className={cn("fill-surface", emphasized ? "stroke-accent" : "stroke-border")}
        strokeWidth={emphasized ? 1.5 : 1}
        filter={filterId ? `url(#${filterId})` : undefined}
      />
      <text
        x={x + w / 2}
        y={subtitle ? midY - 4 : midY + 4}
        textAnchor="middle"
        className="fill-foreground font-mono text-[12px] font-medium"
      >
        {title}
      </text>
      {subtitle && (
        <text
          x={x + w / 2}
          y={midY + 14}
          textAnchor="middle"
          className="fill-muted-foreground font-mono text-[10px]"
        >
          {subtitle}
        </text>
      )}
    </g>
  );
}
