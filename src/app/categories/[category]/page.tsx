import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getAllPosts } from "@/lib/blog";
import { siteConfig } from "@/config/site";
import Breadcrumbs from "@/components/Breadcrumbs";
import AdSlot from "@/components/AdSlot";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

// Generate static paths for all 11 categories at build time for SSG
export async function generateStaticParams() {
  return siteConfig.categories.map((cat) => ({
    category: cat.slug,
  }));
}

// Generate dynamic metadata for categories
export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  const catObj = siteConfig.categories.find((c) => c.slug === category);
  if (!catObj) return {};

  return {
    title: `${catObj.title} Guides - Authority Scent Library`,
    description: catObj.description,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const catObj = siteConfig.categories.find((c) => c.slug === category);

  if (!catObj) {
    notFound();
  }

  const allPosts = getAllPosts();
  const filteredPosts = allPosts.filter((post) => post.category === category);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-20">
      
      {/* breadcrumb path */}
      <Breadcrumbs
        items={[
          { name: "Categories", item: "/categories" },
          { name: catObj.title, item: `/categories/${category}` },
        ]}
      />

      <header className="mb-12 border-b border-border/40 pb-8 text-center sm:text-left">
        <span className="text-xs uppercase tracking-widest text-accent font-sans font-bold block mb-2">
          Domain Category
        </span>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground">
          {catObj.title}
        </h1>
        <p className="text-sm md:text-base text-muted dark:text-stone-300 font-sans mt-3 max-w-2xl leading-relaxed">
          {catObj.description}
        </p>
      </header>

      {/* Ad placement */}
      <AdSlot id="category-top-banner" format="horizontal" />

      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => {
            const authorObj = siteConfig.authors[post.author];
            return (
              <article
                key={post.slug}
                className="border border-border/60 rounded-lg overflow-hidden bg-white dark:bg-stone-900 flex flex-col h-full luxury-shadow luxury-shadow-hover group"
              >
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

                  <p className="text-xs text-muted dark:text-stone-300 font-sans leading-relaxed line-clamp-3 flex-1">
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
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16 border border-dashed border-border/80 rounded-lg bg-stone-50/50 dark:bg-stone-900/10">
          <p className="text-sm font-sans text-muted">No publications yet under {catObj.title}. Check back soon!</p>
          <div className="mt-4">
            <Link
              href="/blog"
              className="text-xs font-sans font-bold uppercase tracking-widest text-accent hover:text-accent-hover"
            >
              Browse other directories →
            </Link>
          </div>
        </div>
      )}

      {/* Ad slot */}
      <div className="mt-12">
        <AdSlot id="category-bottom-banner" format="horizontal" />
      </div>
    </div>
  );
}
