import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Projects } from "@/components/sections/Projects";
import { TechnicalExpertise } from "@/components/sections/TechnicalExpertise";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/layout/Footer";
import { getPersonJsonLd } from "@/lib/structured-data";

export default function Home() {
  const personJsonLd = getPersonJsonLd();

  return (
    <>
      {/* Static, server-generated JSON, not user input. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <main className="flex flex-1 flex-col">
        <Hero />
        <About />
        <Projects />
        <TechnicalExpertise />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
