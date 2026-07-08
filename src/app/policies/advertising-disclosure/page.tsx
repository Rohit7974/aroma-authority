import { siteConfig } from "@/config/site";

export const metadata = {
  title: "Advertising Disclosure",
  description: "Read AromaAuthority's Advertising Disclosure. Learn about Google AdSense tracking and cookie rules.",
};

export default function AdvertisingDisclosurePage() {
  return (
    <>
      <h1 className="text-3xl font-serif font-bold text-foreground mb-4">Advertising Disclosure</h1>
      <p className="text-xs text-muted-light font-sans uppercase tracking-widest pb-4 border-b border-border/40">
        Last Updated: July 08, 2026
      </p>

      <h2 className="text-xl font-serif font-bold text-foreground pt-4">1. Monitization Methods</h2>
      <p className="leading-relaxed">
        <strong>{siteConfig.name}</strong> is a free educational resource. In order to fund our research laboratory, product purchases, and writing staff, we run advertising placements across our pages (primarily Google AdSense).
      </p>

      <h2 className="text-xl font-serif font-bold text-foreground pt-4">2. Personalized Advertising and Tracking</h2>
      <p className="leading-relaxed">
        Our advertising partners (including Google) use cookies and web beacons to serve ads based on a user's prior visits to our website or other websites. These cookies allow Google and its partners to serve ads to our users based on their visit to our sites and/or other sites on the Internet.
      </p>
      <p className="leading-relaxed">
        You may opt out of personalized advertising by visiting Google's Ads Settings, or by choosing "Decline" on our GDPR cookie consent banner.
      </p>

      <h2 className="text-xl font-serif font-bold text-foreground pt-4">3. Layout Separation</h2>
      <p className="leading-relaxed">
        All ad placements are separated from the article content and clearly labeled with the term "Advertisement". We enforce strict height limits on ad containers to prevent layout shift.
      </p>
    </>
  );
}
