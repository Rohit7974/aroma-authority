import { siteConfig } from "@/config/site";

export const metadata = {
  title: "Accessibility Statement",
  description: "Read AromaAuthority's Accessibility Statement. Learn how we optimize layouts for WCAG 2.2 standards, screen readers, and keyboard navigation.",
};

export default function AccessibilityStatementPage() {
  return (
    <>
      <h1 className="text-3xl font-serif font-bold text-foreground mb-4">Accessibility Statement</h1>
      <p className="text-xs text-muted-light font-sans uppercase tracking-widest pb-4 border-b border-border/40">
        Last Updated: July 08, 2026
      </p>

      <h2 className="text-xl font-serif font-bold text-foreground pt-4">1. Commitment to Accessibility</h2>
      <p className="leading-relaxed">
        <strong>{siteConfig.name}</strong> is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone, and applying the relevant accessibility standards to satisfy Web Content Accessibility Guidelines (WCAG) 2.2 requirements.
      </p>

      <h2 className="text-xl font-serif font-bold text-foreground pt-4">2. Implementation Standards</h2>
      <p className="leading-relaxed">
        Our codebase is designed to align with WCAG 2.2 guidelines. Key optimizations include:
      </p>
      <ul className="list-disc pl-5 space-y-2">
        <li><strong>Skip to Content Link:</strong> Allows keyboard users to bypass global navigation blocks immediately.</li>
        <li><strong>Keyboard Navigation:</strong> All links, buttons, and form controls have explicit focus outlines and are fully interactive using tab and enter keys.</li>
        <li><strong>Color Contrast:</strong> Text colors exceed standard contrast ratios (4.5:1 for body copy).</li>
        <li><strong>Semantic Markup:</strong> Structured utilizing appropriate section containers, lists, tables, and ARIA labels.</li>
      </ul>

      <h2 className="text-xl font-serif font-bold text-foreground pt-4">3. Feedback & Contact</h2>
      <p className="leading-relaxed">
        We welcome your feedback on the accessibility of our site. Please let us know if you encounter accessibility barriers by emailing us at{" "}
        <a href={`mailto:${siteConfig.contactEmail}`} className="text-accent underline font-semibold">
          {siteConfig.contactEmail}
        </a>.
      </p>
    </>
  );
}
