import { ImageResponse } from "next/og";
import { siteConfig } from "@/data/site";
import { contactContent } from "@/data/contact";

/**
 * Shared social-card renderer used by both opengraph-image.tsx and
 * twitter-image.tsx, so the two conventions stay in sync without
 * duplicating the design. Renders only real, already-published site
 * content (name, positioning, role tags, GitHub handle) using the site's
 * actual color tokens — no invented logo, photo, or domain. Satori (the
 * renderer behind ImageResponse) only supports a CSS subset — inline
 * styles and flexbox, no Tailwind classes or custom fonts loaded here.
 */
export const OG_IMAGE_SIZE = { width: 1200, height: 630 };
export const OG_IMAGE_CONTENT_TYPE = "image/png";
export const OG_IMAGE_ALT = `${siteConfig.name} — ${siteConfig.positioning}`;

export function renderSocialCard() {
  const github = contactContent.methods.find((method) => method.key === "github");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "88px",
          backgroundColor: "#08090b",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", gap: 12, marginBottom: 32 }}>
          {siteConfig.roleTags.map((tag) => (
            <div
              key={tag.label}
              style={{
                display: "flex",
                border: "1px solid rgba(255,255,255,0.16)",
                borderRadius: 999,
                padding: "10px 22px",
                fontSize: 22,
                color: "#9a9ea7",
              }}
            >
              {tag.label}
            </div>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 84,
            fontWeight: 700,
            letterSpacing: -2,
            color: "#f2f3f5",
          }}
        >
          {siteConfig.name}
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 36,
            color: "#f2f3f5",
            marginTop: 24,
            maxWidth: 980,
            lineHeight: 1.35,
          }}
        >
          {siteConfig.positioning}
        </div>

        {github && (
          <div style={{ display: "flex", marginTop: 56, alignItems: "center", gap: 16 }}>
            <div
              style={{
                display: "flex",
                width: 12,
                height: 12,
                borderRadius: 999,
                backgroundColor: "#5b6ef5",
              }}
            />
            <div style={{ display: "flex", fontSize: 24, color: "#9a9ea7" }}>
              {github.value}
            </div>
          </div>
        )}
      </div>
    ),
    { ...OG_IMAGE_SIZE }
  );
}
