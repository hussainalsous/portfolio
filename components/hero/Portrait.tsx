import Image from "next/image";
import { cn } from "@/lib/utils";

type PortraitProps = {
  name: string;
  className?: string;
};

/**
 * The Hero's portrait: a compact, deliberate plate rather than a large
 * standalone photo card — sized to support the Hero text, not compete
 * with it. A faint offset frame sits outside the image itself, echoing
 * the hairline links of the NodeNetwork behind it and giving the plate a
 * sense of layering into the interface rather than sitting on top of it.
 * Inside, the same quiet corner brackets reuse the focus-reticle motif
 * from the Computer Vision visuals — a nod to the domain around the
 * photo, not a filter applied to it. The bottom-edge fade only touches
 * the lower strip of the frame, well clear of the face.
 */
export function Portrait({ name, className }: PortraitProps) {
  return (
    <div className={cn("relative w-full", className)}>
      {/* Offset structural frame, set back from the photo — a quiet nod to
          the hairline connections in the background node graph rather than
          a decorative border on the image itself. */}
      <div
        aria-hidden="true"
        className="absolute -inset-2.5 rounded-[1.375rem] border border-accent/10"
      />

      <div className="relative aspect-4/5 w-full overflow-hidden rounded-2xl border border-border/70 bg-surface">
        <Image
          src="/images/profile.JPG"
          alt={`Portrait of ${name}`}
          fill
          priority
          sizes="(min-width: 1024px) 288px, 224px"
          className="object-cover"
          style={{ objectPosition: "50% 28%" }}
        />

        {/* Subtle grounding fade into the page background — kept to the lower strip, clear of the face. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/5 bg-linear-to-t from-background/60 to-transparent"
        />

        {/* Quiet corner brackets — the same focus-reticle language used by the Computer Vision glyph and Presentation Analyzer visual. */}
        <svg
          aria-hidden="true"
          viewBox="0 0 20 20"
          className="pointer-events-none absolute left-2.5 top-2.5 h-4 w-4 text-accent/60"
        >
          <path d="M1,7 L1,1 L7,1" fill="none" stroke="currentColor" strokeWidth={1.25} strokeLinecap="round" />
        </svg>
        <svg
          aria-hidden="true"
          viewBox="0 0 20 20"
          className="pointer-events-none absolute bottom-2.5 right-2.5 h-4 w-4 text-accent/60"
        >
          <path
            d="M13,19 L19,19 L19,13"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.25}
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
}
