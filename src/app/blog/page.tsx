import Link from "next/link";
import Image from "next/image";
import { getAllPosts } from "@/lib/blog";
import { siteConfig } from "@/config/site";
import Breadcrumbs from "@/components/Breadcrumbs";
import AdSlot from "@/components/AdSlot";

export const metadata = {
  title: "Blog Archive - All Fragrance & Candle Guides",
  description: "Browse our complete archive of scientific candle care guides, reed diffuser optimization manuals, and fragrance family reviews.",
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Dynamic breadcrumbs */}
      <Breadcrumbs items={[{ name: "Blog", item: "/blog" }]} />

      <header className="mb-12 border-b border-border/40 pb-8 text-center sm:text-left">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground">
          The Scent Library
        </h1>
        <p className="text-sm md:text-base text-muted  font-sans mt-3 max-w-2xl leading-relaxed">
          Access our comprehensive collection of long-form articles, instructions, and reviews. Every post is fact-checked by our chemists and designers.
        </p>
      </header>

      {/* Categories shortcut bar */}
      <div className="flex flex-wrap items-center gap-2 mb-10 pb-6 border-b border-border/40">
        <span className="text-xs uppercase tracking-widest text-muted-light font-sans font-semibold mr-2">
          Filter:
        </span>
        <Link
          href="/blog"
          className="px-3.5 py-1.5 bg-accent text-white text-xs uppercase tracking-wider font-semibold rounded"
        >
          All
        </Link>
        {siteConfig.categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/categories/${cat.slug}`}
            className="px-3.5 py-1.5 bg-stone-50 hover:bg-stone-100   text-muted hover:text-foreground text-xs uppercase tracking-wider font-semibold rounded border border-border/40 transition"
          >
            {cat.title}
          </Link>
        ))}
      </div>

      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => {
            const authorObj = siteConfig.authors[post.author];
            return (
              <div key={post.slug} className="flex flex-col h-full">
                {/* Visual grid post card */}
                <article className="border border-border/60 rounded-lg overflow-hidden bg-white  flex flex-col h-full luxury-shadow luxury-shadow-hover group">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="block relative aspect-[16/10] w-full overflow-hidden bg-stone-100 focus:outline-none"
                  >
                    <Image
                      src={post.featuredImage}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-[1.01] transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 380px"
                    />
                  </Link>

                  <div className="p-6 flex flex-col flex-1 space-y-4">
                    <div className="flex items-center justify-between text-[10px] text-muted-light font-sans uppercase tracking-widest">
                      <span className="font-semibold text-accent">{post.category.replace("-", " ")}</span>
                      <span>{post.readingTime}</span>
                    </div>

                    <h2 className="text-xl font-serif font-bold text-foreground group-hover:text-accent transition-colors leading-snug">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h2>

                    <p className="text-xs text-muted  font-sans leading-relaxed line-clamp-3 flex-1">
                      {post.description}
                    </p>

                    <div className="pt-4 border-t border-border/40 flex items-center justify-between text-[10px] text-muted-light font-sans">
                      <div>
                        By <span className="text-foreground">{authorObj?.name || post.author}</span>
                      </div>
                      <div>{post.publishDate}</div>
                    </div>
                  </div>
                </article>

                {/* Inject middle banner ad in post grid layout */}
                {index === 2 && (
                  <div className="col-span-1 md:col-span-2 lg:col-span-3">
                    <AdSlot id="blog-archive-mid-grid" format="horizontal" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-sm font-sans text-muted">No publications available in our library.</p>
        </div>
      )}

      {/* Bottom Ad space */}
      <div className="mt-12">
        <AdSlot id="blog-archive-bottom" format="horizontal" />
      </div>
    </div>
  );
}
