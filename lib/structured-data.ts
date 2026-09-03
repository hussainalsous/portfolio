import { siteConfig } from "@/data/site";
import { contactContent } from "@/data/contact";
import { SITE_URL } from "@/lib/seo";

/**
 * Person/ProfilePage JSON-LD, assembled entirely from data already on the
 * site (data/site.ts, data/contact.ts) — nothing here is invented.
 * Deliberately omits worksFor, alumniOf, awards, and any sameAs beyond
 * GitHub: none of that exists anywhere in this project's content.
 */
export function getPersonJsonLd() {
  const email = contactContent.methods.find((m) => m.key === "email");
  const phone = contactContent.methods.find((m) => m.key === "phone");
  const location = contactContent.methods.find((m) => m.key === "location");
  const github = contactContent.methods.find((m) => m.key === "github");

  const person: Record<string, unknown> = {
    "@type": "Person",
    name: siteConfig.name,
    jobTitle: "Full-Stack Engineer",
    description: siteConfig.positioning,
    url: SITE_URL,
    knowsAbout: [
      "Full-Stack Development",
      "Web Development",
      "Mobile Development",
      "Workflow Automation",
      "n8n",
      "LLM Integration",
      "Computer Vision",
    ],
  };

  if (email?.href) person.email = email.href;
  if (phone?.href) person.telephone = phone.value;
  if (github?.href) person.sameAs = [github.href];

  if (location?.value) {
    const [addressLocality, addressCountry] = location.value
      .split(",")
      .map((part) => part.trim());
    person.address = {
      "@type": "PostalAddress",
      addressLocality,
      addressCountry,
    };
  }

  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: SITE_URL,
    name: `${siteConfig.name} | Full-Stack Engineer`,
    mainEntity: person,
  };
}
