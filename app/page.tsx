import { Metadata } from "next";
import Terminal from "@/components/terminal";

export const metadata: Metadata = {
  title: "Vinit Gurjar - Terminal Portfolio",
  description: "A unique terminal-style portfolio showcasing skills and projects.",
  keywords: ["developer portfolio", "terminal portfolio", "frontend developer", "React", "Next.js"],
  authors: [{ name: "Vinit Gurjar" }],
  openGraph: {
    title: "Vinit Gurjar - Terminal Portfolio",
    description: "A unique terminal-style portfolio.",
    type: "website"
  },
};

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Vinit Gurjar",
    "url": "https://yourdomain.com",
    "sameAs": [
      "https://github.com/VinitGurjar",
      "https://www.linkedin.com/in/vinitgurjar",
      "https://x.com/bhaktkage",
      "https://app.daily.dev/squads/vimoos",
    ],
    "jobTitle": "System Engineer",
    "description": "System Engineer specialized on backend and Go language.",
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <Terminal />
    </>
  );
}
