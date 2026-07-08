import Link from "next/link";
import { siteConfig } from "@/config/site";
import { getAllPosts } from "@/lib/blog";
import Breadcrumbs from "@/components/Breadcrumbs";
import AdSlot from "@/components/AdSlot";

export const metadata = {
  title: "Categories Index - Olfactory Domains Directory",
  description: "Browse our 11 educational categories, spanning candle care, reed diffuser setups, essential oils, and home decoration.",
};

export default function CategoriesPage() {
  const posts = getAllPosts();

  // Helper to count articles per category
  const getCategoryCount = (catSlug: string) => {
    return posts.filter((post) => post.category === catSlug).length;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-20">
      
      {/* Breadcrumb path */}
      <Breadcrumbs items={[{ name: "Categories", item: "/categories" }]} />

      <header className="mb-12 border-b border-border/40 pb-8 text-center sm:text-left">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground">
          Fragrance Domains
        </h1>
        <p className="text-sm md:text-base text-muted  font-sans mt-3 max-w-2xl leading-relaxed">
          Navigate our scent architecture. Explore comprehensive guides and chemistry-focused methodologies organized across 11 key home fragrance domains.
        </p>
      </header>

      {/* Ad slot */}
      <AdSlot id="categories-top-banner" format="horizontal" />

      {/* Categories layout grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {siteConfig.categories.map((cat) => {
          const count = getCategoryCount(cat.slug);

          return (
            <Link
              key={cat.slug}
              href={`/categories/${cat.slug}`}
              className="p-8 border border-border hover:border-accent bg-white  rounded-lg flex flex-col justify-between h-64 luxury-shadow luxury-shadow-hover focus:outline-none focus:ring-2 focus:ring-accent select-none"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-widest text-muted-light font-sans font-semibold">
                    Category
                  </span>
                  <span className="text-[10px] font-sans font-semibold text-accent bg-accent/5 px-2.5 py-0.5 rounded-full border border-accent/20">
                    {count} {count === 1 ? "Guide" : "Guides"}
                  </span>
                </div>
                
                <h2 className="text-2xl font-serif font-bold text-foreground mt-4 mb-2">
                  {cat.title}
                </h2>
                
                <p className="text-xs text-muted  font-sans leading-relaxed line-clamp-3">
                  {cat.description}
                </p>
              </div>

              <div className="text-[10px] text-accent font-sans font-bold uppercase tracking-widest flex items-center gap-1.5 border-t border-border/40 pt-4">
                Explore guides →
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
