import { aboutContent } from "@/data/about";

/**
 * The three engineering domains as one connected spine rather than three
 * isolated cards — visualizing "I build complete systems, not isolated
 * features." A single hairline connects three solid accent nodes (the
 * domains) down to one hollow node (the outcome they connect toward).
 * Plain HTML/CSS — the content is real text, not an SVG illustration.
 */
export function SystemLayers() {
  return (
    <div className="relative flex flex-col gap-10 pl-10">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-2 left-1.5 top-2 w-px bg-border"
      />

      {aboutContent.layers.map((layer, index) => (
        <div key={layer.title} className="relative flex flex-col gap-2">
          <span
            aria-hidden="true"
            className="absolute -left-10 top-1.5 h-3 w-3 rounded-full bg-accent"
          />
          <div className="flex items-baseline gap-3">
            <span className="font-mono text-sm text-accent">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="text-lg font-semibold tracking-tight text-foreground sm:text-xl">
              {layer.title}
            </h3>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
            {layer.description}
          </p>
        </div>
      ))}

      <div className="relative flex items-center">
        <span
          aria-hidden="true"
          className="absolute -left-10 h-3 w-3 rounded-full border border-border bg-background"
        />
        <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground/70">
          {aboutContent.closingLabel}
        </span>
      </div>
    </div>
  );
}
