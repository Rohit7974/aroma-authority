import { siteConfig } from "@/config/site";

export const metadata = {
  title: "Affiliate Disclosure",
  description: "Read AromaAuthority's Affiliate Disclosure. Understand how we maintain independent testing while utilizing product links.",
};

export default function AffiliateDisclosurePage() {
  return (
    <>
      <h1 className="text-3xl font-serif font-bold text-foreground mb-4">Affiliate Disclosure</h1>
      <p className="text-xs text-muted-light font-sans uppercase tracking-widest pb-4 border-b border-border/40">
        Last Updated: July 08, 2026
      </p>

      <h2 className="text-xl font-serif font-bold text-foreground pt-4">1. Referral Commissions</h2>
      <p className="leading-relaxed">
        In some of our buying guides or review pages, we may include links to third-party e-commerce sites (such as Amazon). If you click on one of these links and complete a purchase, <strong>{siteConfig.name}</strong> may earn a small referral commission at no additional cost to you.
      </p>

      <h2 className="text-xl font-serif font-bold text-foreground pt-4">2. Unbiased Methodology</h2>
      <p className="leading-relaxed">
        We only link to products or accessories (such as wick trimmers, infrared thermometers, or high-grade oils) that our testing lab has verified. We do not accept payment to review specific products, nor do we guarantee positive ratings. If a product does not pass our quality thresholds, we list its defects or choose not to recommend it.
      </p>

      <h2 className="text-xl font-serif font-bold text-foreground pt-4">3. Consumer Awareness</h2>
      <p className="leading-relaxed">
        You are under no obligation to use our links. We encourage you to research alternatives. If you do choose to purchase using our links, the referral commissions directly fund our chemists, writers, and laboratory supplies.
      </p>
    </>
  );
}
