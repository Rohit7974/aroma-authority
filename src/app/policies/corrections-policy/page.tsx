import { siteConfig } from "@/config/site";

export const metadata = {
  title: "Corrections Policy",
  description: "Read AromaAuthority's Corrections Policy. Learn how we handle readers' error reports and track updates to publications.",
};

export default function CorrectionsPolicyPage() {
  return (
    <>
      <h1 className="text-3xl font-serif font-bold text-foreground mb-4">Corrections Policy</h1>
      <p className="text-xs text-muted-light font-sans uppercase tracking-widest pb-4 border-b border-border/40">
        Last Updated: July 08, 2026
      </p>

      <h2 className="text-xl font-serif font-bold text-foreground pt-4">1. Commitment to Truth</h2>
      <p className="leading-relaxed">
        Despite our rigorous review and fact-checking workflows, errors can occur. <strong>{siteConfig.name}</strong> is committed to transparency and will correct any factual errors, incorrect measurements, or out-of-date safety information immediately.
      </p>

      <h2 className="text-xl font-serif font-bold text-foreground pt-4">2. Submission of Error Reports</h2>
      <p className="leading-relaxed">
        If you spot an error in any of our articles, please notify us immediately through our contact page or email us at{" "}
        <a href={`mailto:${siteConfig.contactEmail}`} className="text-accent underline font-semibold">
          {siteConfig.contactEmail}
        </a>. Please include the link of the article, the paragraph containing the error, and the suggested correction supported by a source.
      </p>

      <h2 className="text-xl font-serif font-bold text-foreground pt-4">3. Execution of Corrections</h2>
      <p className="leading-relaxed">
        Once an error is verified, we will edit the article immediately. If the error is a significant safety concern or materially alters the conclusion of the guide, we will add an "Editorial Update Note" at the top or bottom of the article detailing the date and the nature of the correction.
      </p>
    </>
  );
}
