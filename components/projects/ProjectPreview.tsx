import type { ReactNode } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { ProjectPreviewData } from "@/data/projects";

type ProjectPreviewProps = {
  preview: ProjectPreviewData;
  /** Custom visual (e.g. an architecture diagram), used when preview.kind === "custom". */
  children?: ReactNode;
  className?: string;
};

/**
 * Reusable preview frame for a project. Renders a real screenshot once one
 * exists (`kind: "image"`), a bespoke visual supplied by the caller
 * (`kind: "custom"`), or a clean placeholder — never a fabricated screenshot.
 *
 * The browser-chrome header only appears for real screenshots — an
 * architecture diagram isn't a webpage, so wrapping it in a browser frame
 * would misrepresent it and make the frame the dominant visual.
 */
export function ProjectPreview({ preview, children, className }: ProjectPreviewProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-border bg-surface",
        className
      )}
    >
      {preview.kind === "image" && (
        <div className="flex items-center gap-1.5 border-b border-border px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
        </div>
      )}

      <div className="flex min-h-60 items-center justify-center p-6 md:p-8">
        {preview.kind === "custom" && children}

        {preview.kind === "image" && (
          <div className="relative aspect-video w-full">
            <Image
              src={preview.src}
              alt={preview.alt}
              fill
              className="rounded-lg object-cover"
            />
          </div>
        )}

        {preview.kind === "placeholder" && (
          <div className="flex flex-col items-center gap-3 text-center">
            <div className="h-px w-16 bg-border-strong" />
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              {preview.label}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
