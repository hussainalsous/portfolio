import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type FieldWrapperProps = {
  label: string;
  htmlFor: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
};

/** Label + input slot + inline error, shared by every field in the contact form. */
export function FieldWrapper({
  label,
  htmlFor,
  error,
  required = true,
  children,
}: FieldWrapperProps) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={htmlFor}
        className="font-mono text-xs uppercase tracking-widest text-muted-foreground"
      >
        {label}
        {required && (
          <span className="text-accent" aria-hidden="true">
            {" "}
            *
          </span>
        )}
      </label>
      {children}
      {error && (
        <p id={`${htmlFor}-error`} className="text-xs text-danger">
          {error}
        </p>
      )}
    </div>
  );
}

/** Shared input/textarea styling — border shifts to the danger token only when a field has an error. */
export function fieldClasses(hasError: boolean) {
  return cn(
    "w-full rounded-md border bg-surface px-4 py-3 text-sm text-foreground",
    "placeholder:text-muted-foreground/50 transition-colors duration-200",
    "focus:outline-none focus:ring-1",
    hasError
      ? "border-danger/60 focus:border-danger focus:ring-danger"
      : "border-border focus:border-accent focus:ring-accent"
  );
}
