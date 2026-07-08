import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import Breadcrumbs from "@/components/Breadcrumbs";
import AdSlot from "@/components/AdSlot";
import { ShieldAlert, Award, FileText, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "About Us & Editorial Standards - AromaAuthority",
  description: "Learn about AromaAuthority's mission, independent testing methodologies, organic chemistry research, and editorial guidelines.",
};

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-20">
      
      {/* breadcrumb path */}
      <Breadcrumbs items={[{ name: "About", item: "/about" }]} />

      <header className="mb-12 border-b border-border/40 pb-8 text-center sm:text-left">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground">
          About AromaAuthority
        </h1>
        <p className="text-sm md:text-base text-muted dark:text-stone-300 font-sans mt-3 max-w-2xl leading-relaxed">
          We are an independent educational authority dedicated to the chemistry, physics, safety, and design of home scenting systems.
        </p>
      </header>

      {/* Hero section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
        <div className="lg:col-span-6 space-y-6">
          <h2 className="text-3xl font-serif font-bold text-foreground">
            Our Mission: Raising Scent Literacy
          </h2>
          <p className="text-sm text-muted dark:text-stone-300 font-sans leading-relaxed">
            Many home fragrance sites compile simple reviews or push products. At AromaAuthority, we believe that understanding the science behind the scent is key to enjoying it safely. 
          </p>
          <p className="text-sm text-muted dark:text-stone-300 font-sans leading-relaxed">
            From the capillary physics of rattan fibers to the carbon combustion of soy wax wicks, our mission is to provide clear, scientific methodologies that maximize your olfactory experience while keeping your home environment healthy.
          </p>
        </div>
        <div className="lg:col-span-6 relative aspect-[16/10] w-full overflow-hidden border border-border/60 rounded-lg bg-stone-100 luxury-shadow">
          <Image
            src="https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=1200&auto=format&fit=crop"
            alt="Fragrance blending lab showcase"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 600px"
          />
        </div>
      </section>

      {/* Ad slot */}
      <AdSlot id="about-mid-ad" format="horizontal" />

      {/* 3. Editorial Integrity & EEAT standards */}
      <section className="py-12 border-y border-border/40 grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 bg-stone-50/50 dark:bg-stone-900/10 p-8 rounded-xl">
        <div className="space-y-3">
          <div className="w-10 h-10 rounded-full bg-accent/10 text-accent flex items-center justify-center">
            <Award className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-serif font-bold text-foreground">Chemistry Led</h3>
          <p className="text-xs text-muted dark:text-stone-300 font-sans leading-relaxed">
            Our guides are authored and reviewed by organic chemists who understand formulation chemistry, flashpoints, and organic emissions profiles.
          </p>
        </div>
        <div className="space-y-3">
          <div className="w-10 h-10 rounded-full bg-accent/10 text-accent flex items-center justify-center">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-serif font-bold text-foreground">Independent Testing</h3>
          <p className="text-xs text-muted dark:text-stone-300 font-sans leading-relaxed">
            We purchase every wax vessel and carrier oil blend ourselves. We perform burning memory tests in standard draft-controlled rooms.
          </p>
        </div>
        <div className="space-y-3">
          <div className="w-10 h-10 rounded-full bg-accent/10 text-accent flex items-center justify-center">
            <FileText className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-serif font-bold text-foreground">Citations & References</h3>
          <p className="text-xs text-muted dark:text-stone-300 font-sans leading-relaxed">
            Every safety warning or molecular assertion is referenced at the bottom of the article using valid academic citations.
          </p>
        </div>
      </section>

      {/* 4. Meet the Experts Panel */}
      <section className="space-y-10">
        <div className="text-center max-w-xl mx-auto">
          <h2 className="text-3xl font-serif font-bold text-foreground">Meet Our Scent Experts</h2>
          <p className="text-xs text-muted font-sans mt-2">
            The professional team responsible for researching, formulating, and fact-checking our content.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {Object.values(siteConfig.authors).map((author) => (
            <div
              key={author.slug}
              className="border border-border/60 rounded-lg p-6 bg-white dark:bg-stone-900 flex flex-col justify-between space-y-6 luxury-shadow"
            >
              <div className="flex gap-4">
                <div className="relative w-16 h-16 rounded-full overflow-hidden border border-border shrink-0 bg-stone-100">
                  <Image
                    src={author.avatar}
                    alt={author.name}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-serif font-bold text-foreground flex items-center gap-1.5">
                    <Link href={`/author/${author.slug}`} className="hover:text-accent">
                      {author.name}
                    </Link>
                    <CheckCircle2 className="w-3.5 h-3.5 text-accent" />
                  </h3>
                  <span className="text-[10px] uppercase tracking-widest text-muted-light font-sans block mt-0.5">
                    {author.role}
                  </span>
                  <p className="text-xs text-muted dark:text-stone-300 font-sans mt-3 leading-relaxed">
                    {author.bio}
                  </p>
                </div>
              </div>
              <div className="border-t border-border/40 pt-4 text-center">
                <Link
                  href={`/author/${author.slug}`}
                  className="text-[10px] font-sans font-bold uppercase tracking-widest text-accent hover:text-accent-hover"
                >
                  View full credentials & articles →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Editorial Process Link footer */}
      <section className="text-center mt-16 pt-8 border-t border-border/40">
        <p className="text-xs text-muted font-sans max-w-md mx-auto leading-relaxed">
          Want to know more about our corrections procedure or editorial review? Read our detailed{" "}
          <Link href="/policies/editorial-policy" className="text-accent underline font-semibold hover:text-accent-hover">
            Editorial Policy
          </Link>{" "}
          and{" "}
          <Link href="/policies/fact-checking-policy" className="text-accent underline font-semibold hover:text-accent-hover">
            Fact-Checking Policy
          </Link>
          .
        </p>
      </section>

    </div>
  );
}
