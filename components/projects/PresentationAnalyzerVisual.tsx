const FINGERTIPS = [
  { x: 410, y: 230 },
  { x: 425, y: 215 },
  { x: 445, y: 208 },
  { x: 465, y: 215 },
  { x: 480, y: 232 },
];

const STATUS_ITEMS = [
  { label: "Eye Contact", cx: 100, x: 116 },
  { label: "Hand Gestures", cx: 260, x: 276 },
  { label: "Body Language", cx: 420, x: 436 },
];

/**
 * The Presentation Skills Analyzer's flagship visual: a stylized webcam
 * viewport with face/hand landmark points and a live status strip — the
 * shape of what the system tracks, not a literal screenshot or a
 * fabricated accuracy score. One quiet pulsing "LIVE" dot and one slow
 * scan-line sweep are the only motion, both neutralized under
 * prefers-reduced-motion.
 */
export function PresentationAnalyzerVisual() {
  return (
    <svg
      viewBox="0 0 560 400"
      className="h-auto w-full max-w-2xl"
      role="img"
      aria-label="A webcam view showing real-time face and hand landmark tracking, with a status strip indicating live analysis of eye contact, hand gestures, and body language."
    >
      <defs>
        <clipPath id="presentation-frame-clip">
          <rect x={30} y={20} width={500} height={320} rx={18} />
        </clipPath>
      </defs>

      {/* Webcam frame */}
      <rect
        x={30}
        y={20}
        width={500}
        height={320}
        rx={18}
        className="fill-surface/60 stroke-border"
        strokeWidth={1}
      />

      <g clipPath="url(#presentation-frame-clip)">
        {/* Scan-line sweep */}
        <line
          x1={46}
          x2={514}
          y1={40}
          y2={40}
          className="scan-line stroke-accent"
          strokeWidth={1}
        />

        {/* Face outline + landmarks */}
        <ellipse
          cx={280}
          cy={150}
          rx={68}
          ry={82}
          className="stroke-border-strong"
          strokeWidth={1.25}
          strokeDasharray="4 5"
          fill="none"
        />

        <g className="stroke-muted-foreground/40" strokeWidth={1} fill="none">
          <path d="M255,130 L280,158" />
          <path d="M305,130 L280,158" />
          <path d="M280,158 L262,190" />
          <path d="M280,158 L298,190" />
        </g>

        {[
          [255, 130],
          [305, 130],
          [280, 158],
          [262, 190],
          [298, 190],
        ].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r={2.5} className="fill-accent" />
        ))}

        {/* Focus brackets around the tracked face region */}
        <g className="stroke-accent" strokeWidth={1.5} fill="none">
          <path d="M199,84 L199,70 L213,70" />
          <path d="M347,70 L361,70 L361,84" />
          <path d="M199,216 L199,230 L213,230" />
          <path d="M347,230 L361,230 L361,216" />
        </g>

        {/* Hand landmarks */}
        <circle cx={440} cy={260} r={3} className="fill-muted-foreground/70" />
        <g className="stroke-muted-foreground/40" strokeWidth={1}>
          {FINGERTIPS.map((tip, i) => (
            <line key={i} x1={440} y1={260} x2={tip.x} y2={tip.y} />
          ))}
        </g>
        {FINGERTIPS.map((tip, i) => (
          <circle key={i} cx={tip.x} cy={tip.y} r={2} className="fill-accent" />
        ))}
      </g>

      {/* LIVE indicator */}
      <circle cx={54} cy={44} r={4} className="fill-accent pulse-dot" />
      <text
        x={64}
        y={48}
        className="fill-foreground/80 font-mono text-[10px] uppercase tracking-widest"
      >
        Live
      </text>
      <text
        x={506}
        y={48}
        textAnchor="end"
        className="fill-muted-foreground font-mono text-[10px] uppercase tracking-widest"
      >
        Analyzing
      </text>

      {/* Status strip */}
      <rect
        x={46}
        y={278}
        width={468}
        height={48}
        rx={10}
        className="fill-background/70 stroke-border"
        strokeWidth={1}
      />
      {STATUS_ITEMS.map((item) => (
        <g key={item.label}>
          <circle cx={item.cx} cy={302} r={3.5} className="fill-accent" />
          <text
            x={item.x}
            y={306}
            className="fill-muted-foreground font-mono text-[10px] uppercase tracking-widest"
          >
            {item.label}
          </text>
        </g>
      ))}
    </svg>
  );
}
