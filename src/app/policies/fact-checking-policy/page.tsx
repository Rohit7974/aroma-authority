import { siteConfig } from "@/config/site";

export const metadata = {
  title: "Fact-Checking Policy",
  description: "Read AromaAuthority's Fact-Checking Policy. Learn how we verify scientific statements, citations, and product safety limits.",
};

export default function FactCheckingPolicyPage() {
  return (
    <>
      <h1 className="text-3xl font-serif font-bold text-foreground mb-4">Fact-Checking Policy</h1>
      <p className="text-xs text-muted-light font-sans uppercase tracking-widest pb-4 border-b border-border/40">
        Last Updated: July 08, 2026
      </p>

      <h2 className="text-xl font-serif font-bold text-foreground pt-4">1. Strict Scientific Verification</h2>
      <p className="leading-relaxed">
        <strong>{siteConfig.name}</strong> values accuracy above all else. Every statement regarding health, fire safety, chemical reaction, combustion output, or fluid capillary action is verified against peer-reviewed journals, safety data sheets, and official publications from regulatory agencies (such as the EPA, IFRA, and OSHA).
      </p>

      <h2 className="text-xl font-serif font-bold text-foreground pt-4">2. Citation Integrity</h2>
      <p className="leading-relaxed">
        We do not quote unverified forum posts or secondary sources. Every guide is required to compile its scientific sources list at the bottom of the article. These citations point directly to original research papers or official industry standard guidelines.
      </p>

      <h2 className="text-xl font-serif font-bold text-foreground pt-4">3. Verification of Product Specifications</h2>
      <p className="leading-relaxed">
        When we detail measurements, wick codes, or material grades (e.g. natural rattan vs. synthetic polyester), these elements are cross-referenced with manufacturer data sheets.
      </p>
    </>
  );
}
