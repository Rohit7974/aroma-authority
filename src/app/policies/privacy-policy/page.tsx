import { siteConfig } from "@/config/site";

export const metadata = {
  title: "Privacy Policy",
  description: "Read AromaAuthority's Privacy Policy regarding user data collection, cookie usage, advertising tracking, and GDPR compliance.",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <h1 className="text-3xl font-serif font-bold text-foreground mb-4">Privacy Policy</h1>
      <p className="text-xs text-muted-light font-sans uppercase tracking-widest pb-4 border-b border-border/40">
        Last Updated: July 08, 2026
      </p>

      <p className="leading-relaxed">
        At <strong>{siteConfig.name}</strong>, accessible from {siteConfig.url}, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by {siteConfig.name} and how we use it.
      </p>

      <h2 className="text-xl font-serif font-bold text-foreground pt-4">1. Information We Collect</h2>
      <p className="leading-relaxed">
        If you contact us directly or subscribe to our newsletter, we may collect name, email address, the contents of the message, and any attachments you send. We collect this data under your voluntary consent.
      </p>

      <h2 className="text-xl font-serif font-bold text-foreground pt-4">2. Cookies and Web Beacons</h2>
      <p className="leading-relaxed">
        Like any other website, {siteConfig.name} uses "cookies". These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.
      </p>

      <h2 className="text-xl font-serif font-bold text-foreground pt-4">3. Google DoubleClick DART Cookie</h2>
      <p className="leading-relaxed">
        Google is one of the third-party vendors on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to {siteConfig.url} and other sites on the internet. Visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy.
      </p>

      <h2 className="text-xl font-serif font-bold text-foreground pt-4">4. GDPR Data Protection Rights</h2>
      <p className="leading-relaxed">
        We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:
      </p>
      <ul className="list-disc pl-5 space-y-2">
        <li><strong>The right to access</strong> – You have the right to request copies of your personal data.</li>
        <li><strong>The right to rectification</strong> – You have the right to request that we correct any information you believe is inaccurate.</li>
        <li><strong>The right to erasure</strong> – You have the right to request that we erase your personal data, under certain conditions.</li>
      </ul>

      <h2 className="text-xl font-serif font-bold text-foreground pt-4">5. Contact Information</h2>
      <p className="leading-relaxed">
        If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us at{" "}
        <a href={`mailto:${siteConfig.contactEmail}`} className="text-accent underline font-semibold">
          {siteConfig.contactEmail}
        </a>.
      </p>
    </>
  );
}
