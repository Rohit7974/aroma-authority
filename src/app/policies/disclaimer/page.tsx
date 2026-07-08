import { siteConfig } from "@/config/site";

export const metadata = {
  title: "Disclaimer",
  description: "Read AromaAuthority's Disclaimer detailing product recommendations safety guidelines and responsibility thresholds.",
};

export default function DisclaimerPage() {
  return (
    <>
      <h1 className="text-3xl font-serif font-bold text-foreground mb-4">Disclaimer</h1>
      <p className="text-xs text-muted-light font-sans uppercase tracking-widest pb-4 border-b border-border/40">
        Last Updated: July 08, 2026
      </p>

      <p className="leading-relaxed font-semibold">
        The information provided on {siteConfig.name} is for general educational and informational purposes only. All information on the site is provided in good faith, however, we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the site.
      </p>

      <h2 className="text-xl font-serif font-bold text-foreground pt-4">1. Safety Warning Disclaimer</h2>
      <p className="leading-relaxed">
        Home fragrance products, specifically candles, wax melts, and essential oil diffusers, involve heat, open flames, and chemical compounds that must be handled with appropriate care. Trimming wicks, placement of candles, and usage of car diffusers can carry fire hazards or chemical corrosion risks if safety protocols are ignored. 
      </p>
      <p className="leading-relaxed">
        <strong>{siteConfig.name}</strong> and its authors are not liable for any physical injury, property damage, or losses resulting from the execution of the care tips or instructions documented on this site.
      </p>

      <h2 className="text-xl font-serif font-bold text-foreground pt-4">2. Professional Aromatherapy Disclaimer</h2>
      <p className="leading-relaxed">
        Olfactory wellness recommendations and aromatherapy articles are intended to provide guidance on stress relief and ambiance design. Scent evaluations are subjective, and specific essential oils or fragrances can trigger allergic reactions in humans or pets. Always consult with a veterinary professional before using diffusers around pets, as certain oils (such as tea tree or eucalyptus) are highly toxic to cats and dogs.
      </p>
    </>
  );
}
