import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary";

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-medium " +
  "transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 " +
  "focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background " +
  "disabled:pointer-events-none disabled:opacity-50";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-accent text-accent-foreground hover:bg-accent-hover shadow-[0_0_0_1px_rgba(91,110,245,0.4)] hover:shadow-[0_0_24px_-4px_rgba(91,110,245,0.55)]",
  secondary:
    "border border-border text-foreground hover:border-border-strong hover:bg-surface",
};

type CommonProps = {
  variant?: Variant;
  className?: string;
};

type ButtonAsLink = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type ButtonProps = ButtonAsLink | ButtonAsButton;

/** Primary/secondary CTA. Renders a Next.js Link when `href` is passed, otherwise a native button. */
export function Button({ variant = "primary", className, ...props }: ButtonProps) {
  const classes = cn(baseClasses, variantClasses[variant], className);

  if (props.href !== undefined) {
    const { href, ...rest } = props;
    return <Link href={href} className={classes} {...rest} />;
  }

  const { ...rest } = props;
  return <button className={classes} {...rest} />;
}
