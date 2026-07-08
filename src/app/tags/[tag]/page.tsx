import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getAllPosts } from "@/lib/blog";
import { siteConfig } from "@/config/site";
import Breadcrumbs from "@/components/Breadcrumbs";
import AdSlot from "@/components/AdSlot";

interface TagPageProps {
  params: Promise<{ tag: string }>;
}

// Generate static paths for tags at build time based on all tags in the MDX posts
export async function generateStaticParams() {
  const posts = getAllPosts();
  const tags = new Set<string>();
  posts.forEach((post) => {
    post.tags.forEach((tag) => tags.add(tag));
  });

  return Array.from(tags).map((tag) => ({
    tag,
  }));
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const { tag } = await params;
  const capitalizedTag = tag.charAt(0).toUpperCase() + tag.slice(1).replace("-", " ");
  return {
    title: `Articles tagged with #${tag} - AromaAuthority`,
    description: `Browse all home fragrance guides and articles categorised under the tag #${tag}.`,
  };
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag } = await params;
  const posts = getAllPosts();
  const filteredPosts = posts.filter((post) => post.tags.includes(tag));
  const capitalizedTag = tag.charAt(0).toUpperCase() + tag.slice(1).replace("-", " ");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-20">
      
      {/* breadcrumb path */}
      <Breadcrumbs
        items={[
          { name: "Blog", item: "/blog" },
          { name: `#${tag}`, item: `/tags/${tag}` },
        ]}
      />

      <header className="mb-12 border-b border-border/40 pb-8 text-center sm:text-left">
        <span className="text-xs uppercase tracking-widest text-accent font-sans font-bold block mb-2">
          Content Tag
        </span>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground">
          #{capitalizedTag}
        </h1>
        <p className="text-sm font-sans text-muted mt-2">
          Found {filteredPosts.length} {filteredPosts.length === 1 ? "publication" : "publications"} for this topic.
        </p>
      </header>

      {/* Ad slot */}
      <AdSlot id="tag-top-banner" format="horizontal" />

      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => {
            const authorObj = siteConfig.authors[post.author];
            return (
              <article
                key={post.slug}
                className="border border-border/60 rounded-lg overflow-hidden bg-white  flex flex-col h-full luxury-shadow luxury-shadow-hover group"
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
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16 border border-dashed border-border/80 rounded-lg bg-stone-50/50 ">
          <p className="text-sm font-sans text-muted">No publications found for this tag.</p>
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
    </div>
  );
}
