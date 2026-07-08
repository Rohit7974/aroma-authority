import { siteConfig } from "@/config/site";

export const metadata = {
  title: "Editorial Policy",
  description: "Read AromaAuthority's Editorial Policy. Learn how we research, test, and write home fragrance methodologies.",
};

export default function EditorialPolicyPage() {
  return (
    <>
      <h1 className="text-3xl font-serif font-bold text-foreground mb-4">Editorial Policy</h1>
      <p className="text-xs text-muted-light font-sans uppercase tracking-widest pb-4 border-b border-border/40">
        Last Updated: July 08, 2026
      </p>

      <h2 className="text-xl font-serif font-bold text-foreground pt-4">1. Editorial Standards & Focus</h2>
      <p className="leading-relaxed">
        At <strong>{siteConfig.name}</strong>, we are committed to providing the home fragrance community with highly accurate, research-backed, and practical advice. Our articles are not generic affiliate roundups; they are comprehensive, chemistry-centered instructional guides.
      </p>

      <h2 className="text-xl font-serif font-bold text-foreground pt-4">2. Peer and Chemist Review</h2>
      <p className="leading-relaxed">
        Our editorial pipeline requires that every publication involving wax combustion, oil viscosity, chemical flashpoints, or toxicity guidelines undergo reviews by a qualified professional. In our layouts, you will see a "Fact Checked by" credential badge linking directly to the credentials of the verifying chemist or interior stylist.
      </p>

      <h2 className="text-xl font-serif font-bold text-foreground pt-4">3. Independence from Commercial Influence</h2>
      <p className="leading-relaxed">
        While {siteConfig.name} monetizes via Google AdSense and affiliate marketing links (disclosed transparently), these commercial relationships have zero impact on our evaluation reports. We buy the testing kits and brand items ourselves. Our experts maintain absolute editorial autonomy.
      </p>
    </>
  );
}
