type ClassValue = string | number | null | undefined | false;

/** Joins truthy class names together. Small local stand-in for clsx. */
export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(" ");
}
