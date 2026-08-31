import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

/**
 * This portfolio is a genuine single-page site — Home/About/Projects/
 * Contact are in-page anchors, not routes, so they don't get separate
 * sitemap entries. Add real entries here only if actual routes are added.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
