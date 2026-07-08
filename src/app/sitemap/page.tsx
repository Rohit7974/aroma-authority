import Link from "next/link";
import { siteConfig } from "@/config/site";
import { getAllPosts } from "@/lib/blog";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata = {
  title: "HTML Sitemap - Scent Library Navigation Index",
  description: "Browse the absolute index of pages on AromaAuthority. Find category directories, legal disclosures, and candle guides.",
};

export default function HtmlSitemapPage() {
  const posts = getAllPosts();

  // Deduplicate all tags to show tag paths
  const tags = new Set<string>();
  posts.forEach((post) => post.tags.forEach((tag) => tags.add(tag)));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-20">
      
      {/* breadcrumb path */}
      <Breadcrumbs items={[{ name: "Sitemap", item: "/sitemap" }]} />

      <header className="mb-12 border-b border-border/40 pb-8 text-center sm:text-left">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground">
          Sitemap Directory
        </h1>
        <p className="text-sm md:text-base text-muted  font-sans mt-3 max-w-2xl leading-relaxed">
          The absolute visual structure of AromaAuthority pages. Easily navigate articles, educational topics, and policy updates.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 items-start">
        
        {/* Core Pages Column */}
        <div className="space-y-4">
          <h2 className="text-sm uppercase tracking-widest font-sans font-bold text-foreground border-b border-border/60 pb-2">
            Main Pathways
          </h2>
          <ul className="space-y-2 text-xs font-sans text-muted">
            <li>
              <Link href="/" className="hover:text-accent hover:underline">Home Page</Link>
            </li>
            <li>
              <Link href="/blog" className="hover:text-accent hover:underline">Scent Blog Library</Link>
            </li>
            <li>
              <Link href="/categories" className="hover:text-accent hover:underline">Categories Directory</Link>
            </li>
            <li>
              <Link href="/search" className="hover:text-accent hover:underline">Search Panel</Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-accent hover:underline">About & Standards</Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-accent hover:underline">Contact Desk</Link>
            </li>
          </ul>
        </div>

        {/* Categories Column */}
        <div className="space-y-4">
          <h2 className="text-sm uppercase tracking-widest font-sans font-bold text-foreground border-b border-border/60 pb-2">
            Fragrance Domains
          </h2>
          <ul className="space-y-2 text-xs font-sans text-muted">
            {siteConfig.categories.map((cat) => (
              <li key={cat.slug}>
                <Link href={`/categories/${cat.slug}`} className="hover:text-accent hover:underline">
                  {cat.title} Guides
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Educational Guides Column */}
        <div className="space-y-4 md:col-span-2 lg:col-span-1">
          <h2 className="text-sm uppercase tracking-widest font-sans font-bold text-foreground border-b border-border/60 pb-2">
            Authority Publications
          </h2>
          <ul className="space-y-2 text-xs font-sans text-muted">
            {posts.map((post) => (
              <li key={post.slug} className="truncate max-w-[320px]">
                <Link href={`/blog/${post.slug}`} className="hover:text-accent hover:underline">
                  {post.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Legal Policies Column */}
        <div className="space-y-4">
          <h2 className="text-sm uppercase tracking-widest font-sans font-bold text-foreground border-b border-border/60 pb-2">
            Compliance & Disclosures
          </h2>
          <ul className="space-y-2 text-xs font-sans text-muted">
            {siteConfig.navigation.legal.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-accent hover:underline">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
}
