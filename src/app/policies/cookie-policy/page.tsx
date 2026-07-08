import { siteConfig } from "@/config/site";

export const metadata = {
  title: "Cookie Policy",
  description: "Read AromaAuthority's Cookie Policy. Learn about first-party cookies, third-party analytics tracking, and AdSense DART tags.",
};

export default function CookiePolicyPage() {
  return (
    <>
      <h1 className="text-3xl font-serif font-bold text-foreground mb-4">Cookie Policy</h1>
      <p className="text-xs text-muted-light font-sans uppercase tracking-widest pb-4 border-b border-border/40">
        Last Updated: July 08, 2026
      </p>

      <p className="leading-relaxed">
        This Cookie Policy explains how <strong>{siteConfig.name}</strong> uses cookies and similar technologies to recognize you when you visit our website. It explains what these technologies are and why we use them, as well as your rights to control our use of them.
      </p>

      <h2 className="text-xl font-serif font-bold text-foreground pt-4">1. What Are Cookies?</h2>
      <p className="leading-relaxed">
        Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners in order to make their websites work, or to work more efficiently, as well as to provide reporting information.
      </p>

      <h2 className="text-xl font-serif font-bold text-foreground pt-4">2. Why Do We Use Cookies?</h2>
      <p className="leading-relaxed">
        We use first-party and third-party cookies for several reasons. Some cookies are required for technical reasons in order for our Website to operate. Other cookies enable us to track and target the interests of our users to enhance the experience on our online properties. Third parties serve cookies through our Website for advertising, analytics, and other purposes (such as Google Analytics and Google AdSense).
      </p>

      <h2 className="text-xl font-serif font-bold text-foreground pt-4">3. Types of Cookies We Use</h2>
      <ul className="list-disc pl-5 space-y-2">
        <li><strong>Essential Cookies:</strong> Needed to support system layouts and preferences (e.g. cookie consent choice storage).</li>
        <li><strong>Analytics Cookies:</strong> Powered by Google Analytics. These collect aggregated visitor metrics. These are blocked by default until you click "Accept" on our consent banner.</li>
        <li><strong>Advertising Cookies:</strong> Used by Google AdSense to serve personalized ads based on your browser profile.</li>
      </ul>
    </>
  );
}
