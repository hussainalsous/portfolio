import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";

/**
 * Minimal manifest — identity only, not a PWA. display: "browser" keeps
 * it a normal website (no standalone app-window behavior implied).
 * No icons array: the only icon asset is the default favicon.ico, and
 * manifest icons conventionally expect sized PNG/SVG assets we don't
 * have — omitted rather than mis-described. See the SEO report for
 * recommended sizes if these are added later.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteConfig.name} — ${siteConfig.positioning}`,
    short_name: siteConfig.name,
    description: siteConfig.positioning,
    start_url: "/",
    display: "browser",
    background_color: "#08090b",
    theme_color: "#08090b",
  };
}
