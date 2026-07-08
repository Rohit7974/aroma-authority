import { siteConfig } from "@/config/site";

export const metadata = {
  title: "Terms of Service",
  description: "Read AromaAuthority's Terms of Service regarding article licensing, user behavior, and intellectual property limits.",
};

export default function TermsOfServicePage() {
  return (
    <>
      <h1 className="text-3xl font-serif font-bold text-foreground mb-4">Terms of Service</h1>
      <p className="text-xs text-muted-light font-sans uppercase tracking-widest pb-4 border-b border-border/40">
        Last Updated: July 08, 2026
      </p>

      <p className="leading-relaxed">
        Welcome to <strong>{siteConfig.name}</strong>. These terms and conditions outline the rules and regulations for the use of {siteConfig.name}'s Website, located at {siteConfig.url}.
      </p>

      <h2 className="text-xl font-serif font-bold text-foreground pt-4">1. Intellectual Property Rights</h2>
      <p className="leading-relaxed">
        Unless otherwise stated, {siteConfig.name} and/or its licensors own the intellectual property rights for all material on {siteConfig.name}. All intellectual property rights are reserved. You may access this from {siteConfig.name} for your own personal use subjected to restrictions set in these terms and conditions.
      </p>
      <p className="leading-relaxed">
        You must not:
      </p>
      <ul className="list-disc pl-5 space-y-2">
        <li>Republish material from {siteConfig.name} (including copying text into AI generation models or scraping).</li>
        <li>Sell, rent, or sub-license material from {siteConfig.name}.</li>
        <li>Reproduce, duplicate, or copy material from {siteConfig.name}.</li>
      </ul>

      <h2 className="text-xl font-serif font-bold text-foreground pt-4">2. Hyperlinking to our Content</h2>
      <p className="leading-relaxed">
        Educational organizations, search engines, and news portals may link to our home page or publications without prior written approval, provided the link is not deceptive and correctly attributes the source.
      </p>

      <h2 className="text-xl font-serif font-bold text-foreground pt-4">3. Disclaimer of Liability</h2>
      <p className="leading-relaxed">
        To the maximum extent permitted by applicable law, we exclude all representations, warranties, and conditions relating to our website and the use of this website (including, without limitation, any warranties implied by law in respect of satisfactory quality or fitness for purpose).
      </p>

      <h2 className="text-xl font-serif font-bold text-foreground pt-4">4. Governing Law</h2>
      <p className="leading-relaxed">
        These terms and conditions are governed by and construed in accordance with the local laws, and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
      </p>
    </>
  );
}
