import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { getAllPosts } from "@/lib/blog";
import NewsletterBox from "@/components/NewsletterBox";
import AdSlot from "@/components/AdSlot";
import SchemaMarkup from "@/components/SchemaMarkup";
import { Award, Compass, HeartPulse } from "lucide-react";

export default function HomePage() {
  const posts = getAllPosts();
  const featuredPost = posts[0];
  const recentPosts = posts.slice(1, 4);

  return (
    <div className="relative pb-16">
      
      {/* Dynamic Homepage Website Schema */}
      <SchemaMarkup type="WebSite" />

      {/* 1. Hero Editorial Section */}
      {featuredPost && (
        <section className="relative w-full border-b border-border/40 py-12 md:py-20 bg-stone-50 dark:bg-stone-900/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              {/* Text Info */}
              <div className="lg:col-span-5 space-y-6">
                <div className="inline-flex items-center gap-2">
                  <span className="text-[10px] uppercase tracking-widest font-semibold font-sans bg-accent/10 text-accent px-2.5 py-1 rounded">
                    Featured Article
                  </span>
                  <span className="text-[10px] text-muted-light font-sans uppercase tracking-widest">
                    {featuredPost.readingTime}
                  </span>
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground leading-tight">
                  <Link
                    href={`/blog/${featuredPost.slug}`}
                    className="hover:text-accent transition-colors"
                  >
                    {featuredPost.title}
                  </Link>
                </h1>

                <p className="text-sm md:text-base text-muted dark:text-stone-300 font-sans leading-relaxed">
                  {featuredPost.description}
                </p>

                <div className="pt-2">
                  <Link
                    href={`/blog/${featuredPost.slug}`}
                    className="inline-flex items-center text-xs font-sans font-bold uppercase tracking-widest border-b-2 border-accent text-foreground hover:text-accent hover:border-accent-hover pb-1 transition"
                  >
                    Read Authority Guide →
                  </Link>
                </div>
              </div>

              {/* Big Luxury Image with discover aspect standards */}
              <div className="lg:col-span-7">
                <Link
                  href={`/blog/${featuredPost.slug}`}
                  className="block relative aspect-[16/9] w-full overflow-hidden border border-border/80 rounded-lg luxury-shadow luxury-shadow-hover focus:outline-none focus:ring-2 focus:ring-accent"
                >
                  <Image
                    src={featuredPost.featuredImage}
                    alt={featuredPost.title}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 1024px) 100vw, 800px"
                  />
                </Link>
              </div>

            </div>
          </div>
        </section>
      )}

      {/* Top Banner Ad slot (Predefined min-height to prevent CLS) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <AdSlot id="home-top-banner" format="horizontal" />
      </div>

      {/* 2. Content Categories Slider / Navigation */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-border/40">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest text-accent font-sans font-semibold mb-2 block">
            Fragrance Domains
          </span>
          <h2 className="text-3xl font-serif font-bold text-foreground">
            Explore by Category
          </h2>
          <p className="text-xs text-muted font-sans mt-2">
            Detailed, fact-checked methodologies curated across 11 educational categories.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {siteConfig.categories.slice(0, 6).map((cat) => (
            <Link
              key={cat.slug}
              href={`/categories/${cat.slug}`}
              className="p-6 border border-border/60 rounded-lg bg-white dark:bg-stone-900 text-center hover:border-accent hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent select-none"
            >
              <div className="w-8 h-8 rounded-full bg-accent/10 text-accent flex items-center justify-center mx-auto mb-3.5 font-serif font-medium text-sm">
                {cat.title[0]}
              </div>
              <h3 className="text-sm font-serif font-bold text-foreground mb-1 leading-tight">
                {cat.title}
              </h3>
              <span className="text-[10px] text-muted-light font-sans uppercase tracking-widest">
                Guides →
              </span>
            </Link>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link
            href="/categories"
            className="text-xs font-sans font-semibold text-accent hover:text-accent-hover uppercase tracking-widest"
          >
            Browse All 11 Domains →
          </Link>
        </div>
      </section>

      {/* 3. Recent Articles Feed & Sidebar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Main Grid feed column */}
          <div className="lg:col-span-8 space-y-12">
            <h2 className="text-2xl font-serif font-bold text-foreground border-b border-border/60 pb-3 mb-6">
              Latest Publications
            </h2>
            
            {recentPosts.length > 0 ? (
              <div className="space-y-10">
                {recentPosts.map((post) => {
                  const authorObj = siteConfig.authors[post.author];
                  return (
                    <article
                      key={post.slug}
                      className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start group"
                    >
                      <Link
                        href={`/blog/${post.slug}`}
                        className="md:col-span-5 block relative aspect-[16/10] w-full overflow-hidden border border-border/60 rounded bg-stone-100 focus:outline-none focus:ring-2 focus:ring-accent"
                      >
                        <Image
                          src={post.featuredImage}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                          sizes="(max-width: 768px) 100vw, 300px"
                        />
                      </Link>
                      <div className="md:col-span-7 space-y-3">
                        <div className="flex items-center gap-3 text-[10px] text-muted-light font-sans uppercase tracking-widest">
                          <span className="font-semibold text-accent">{post.category.replace("-", " ")}</span>
                          <span>•</span>
                          <span>{post.readingTime}</span>
                        </div>
                        <h3 className="text-xl md:text-2xl font-serif font-bold text-foreground group-hover:text-accent transition-colors">
                          <Link href={`/blog/${post.slug}`}>
                            {post.title}
                          </Link>
                        </h3>
                        <p className="text-xs text-muted dark:text-stone-300 font-sans leading-relaxed line-clamp-2">
                          {post.description}
                        </p>
                        <div className="text-[10px] text-muted-light font-sans">
                          By <span className="text-foreground">{authorObj?.name || post.author}</span>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            ) : (
              <p className="text-sm font-sans text-muted">No additional publications found.</p>
            )}

            {/* Mid Feed Ad slot */}
            <AdSlot id="home-mid-feed" format="rectangle" />
          </div>

          {/* Sidebar Area Column */}
          <aside className="lg:col-span-4 space-y-12">
            
            {/* EEAT Editorial Quality Badge Box */}
            <div className="p-6 bg-stone-50 dark:bg-stone-900/30 border border-border/80 rounded-lg">
              <h3 className="text-xs uppercase tracking-widest font-sans font-bold text-foreground mb-4">
                Our Editorial Standards
              </h3>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <Award className="w-5 h-5 text-accent shrink-0" aria-hidden="true" />
                  <div>
                    <h4 className="text-sm font-serif font-bold text-foreground">Scientific Sourcing</h4>
                    <p className="text-[11px] text-muted font-sans mt-0.5 leading-relaxed">
                      We supplement all candle care and diffuser chemistry guides with academic study citations.
                    </p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <Compass className="w-5 h-5 text-accent shrink-0" aria-hidden="true" />
                  <div>
                    <h4 className="text-sm font-serif font-bold text-foreground">Independent Reviews</h4>
                    <p className="text-[11px] text-muted font-sans mt-0.5 leading-relaxed">
                      Our experts conduct independent testing. We disclose any affiliate/advertising arrangements.
                    </p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <HeartPulse className="w-5 h-5 text-accent shrink-0" aria-hidden="true" />
                  <div>
                    <h4 className="text-sm font-serif font-bold text-foreground">Wellness Oriented</h4>
                    <p className="text-[11px] text-muted font-sans mt-0.5 leading-relaxed">
                      We detail olfactory impacts on focus, rest, and stress levels from certified therapists.
                    </p>
                  </div>
                </li>
              </ul>
              <div className="mt-5 pt-4 border-t border-border/40 text-center">
                <Link
                  href="/about"
                  className="text-[10px] font-sans font-bold uppercase tracking-widest text-accent hover:text-accent-hover"
                >
                  Meet our experts →
                </Link>
              </div>
            </div>

            {/* Sidebar Ad placement */}
            <AdSlot id="home-sidebar" format="vertical" />

          </aside>
        </div>
      </section>

      {/* 4. Full Width Newsletter Container */}
      <NewsletterBox />

    </div>
  );
}
