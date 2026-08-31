"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/data/site";

function MenuIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden="true">
      <g stroke="currentColor" strokeWidth={1.5} strokeLinecap="round">
        <line x1={3} y1={6} x2={17} y2={6} />
        <line x1={3} y1={10} x2={17} y2={10} />
        <line x1={3} y1={14} x2={17} y2={14} />
      </g>
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden="true">
      <g stroke="currentColor" strokeWidth={1.5} strokeLinecap="round">
        <line x1={4} y1={4} x2={16} y2={16} />
        <line x1={16} y1={4} x2={4} y2={16} />
      </g>
    </svg>
  );
}

/**
 * Persistent site header: sticky and always visible at the top of the
 * viewport, transparent at the very top of the page (so it doesn't sit on
 * top of the Hero as a solid bar), gains a background + hairline border
 * once scrolled, and highlights the nav link for whichever section is
 * currently in view. All of that is plain scroll/IntersectionObserver
 * state — no animation library.
 */
export function Header() {
  const { name, navLinks, cta } = siteConfig;

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeHref, setActiveHref] = useState(navLinks[0]?.href ?? "");

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 8);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks
      .map((link) => document.querySelector(link.href))
      .filter((el): el is Element => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          setActiveHref(`#${visible[0].target.id}`);
        }
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [navLinks]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-[background-color,border-color] duration-300",
        scrolled
          ? "border-border bg-background/80 backdrop-blur-sm"
          : "border-transparent bg-transparent"
      )}
    >
      <Container>
        <div className="flex h-16 items-center justify-between">
          <Link
            href="#home"
            className="rounded-sm text-sm font-semibold tracking-tight text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            {name}
          </Link>

          <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "font-mono text-xs uppercase tracking-widest transition-colors",
                  activeHref === link.href
                    ? "text-accent"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:block">
            <Button href={cta.secondary.href} variant="secondary" className="px-4 py-2 text-sm">
              {cta.secondary.label}
            </Button>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="flex h-9 w-9 items-center justify-center rounded-md border border-border text-foreground transition-colors hover:border-border-strong md:hidden"
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </Container>

      {menuOpen && (
        <div id="mobile-nav" className="border-t border-border bg-background md:hidden">
          <Container>
            <nav className="flex flex-col gap-1 py-4" aria-label="Mobile">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={cn(
                    "rounded-md px-1 py-2.5 font-mono text-sm uppercase tracking-widest",
                    activeHref === link.href ? "text-accent" : "text-muted-foreground"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <Button
                href={cta.secondary.href}
                variant="secondary"
                className="mt-3 w-full justify-center"
                onClick={() => setMenuOpen(false)}
              >
                {cta.secondary.label}
              </Button>
            </nav>
          </Container>
        </div>
      )}
    </header>
  );
}
