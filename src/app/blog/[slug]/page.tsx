import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts, getPostBySlug, getRelatedPosts } from "@/lib/blog";
import { siteConfig } from "@/config/site";
import { mdxComponents } from "@/components/MDXComponents";
import Breadcrumbs from "@/components/Breadcrumbs";
import TableOfContents from "@/components/TableOfContents";
import AuthorBox from "@/components/AuthorBox";
import ShareButtons from "@/components/ShareButtons";
import NewsletterBox from "@/components/NewsletterBox";
import AdSlot from "@/components/AdSlot";
import SchemaMarkup from "@/components/SchemaMarkup";
import { BookOpen, Calendar, HelpCircle } from "lucide-react";

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

// Generate static paths at build time for Static Site Generation (SSG)
export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Generate dynamic metadata for search engines & OG cards
export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const ogUrl = `${siteConfig.url}/blog/${post.slug}`;
  const authorObj = siteConfig.authors[post.author];

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: ogUrl,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: ogUrl,
      type: "article",
      publishedTime: post.publishDate,
      modifiedTime: post.lastUpdated || post.publishDate,
      authors: [`${siteConfig.url}/author/${post.author}`],
      images: [
        {
          url: post.featuredImage,
          width: 1200,
          height: 675,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [post.featuredImage],
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(post, 3);
  const authorObj = siteConfig.authors[post.author];

  // Find next/prev articles in order
  const allPosts = getAllPosts();
  const currentIndex = allPosts.findIndex((p) => p.slug === post.slug);
  const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const prevPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

  return (
    <article className="pb-24">
      {/* Dynamic JSON-LD structured schemas */}
      <SchemaMarkup type="BlogPosting" post={post} />
      {post.faqs && post.faqs.length > 0 && <SchemaMarkup type="FAQPage" post={post} />}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Dynamic breadcrumb trail */}
        <Breadcrumbs
          items={[
            { name: "Blog", item: "/blog" },
            { name: post.category.replace("-", " "), item: `/categories/${post.category}` },
            { name: post.title, item: `/blog/${post.slug}` },
          ]}
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-6">
          
          {/* Main article body column */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Header info */}
            <header className="space-y-4">
              <Link
                href={`/categories/${post.category}`}
                className="text-xs uppercase tracking-widest text-accent font-sans font-bold hover:text-accent-hover transition-colors"
              >
                {post.category.replace("-", " ")}
              </Link>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-foreground leading-tight">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-light font-sans uppercase tracking-widest pt-2 border-b border-border/40 pb-4">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Published: {post.publishDate}</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>{post.readingTime}</span>
                </div>
                <span>•</span>
                <div>
                  By <Link href={`/author/${post.author}`} className="text-foreground hover:text-accent font-semibold">{authorObj?.name}</Link>
                </div>
              </div>
            </header>

            {/* In-Article Top Ad Space */}
            <AdSlot id="article-top-banner" format="horizontal" />

            {/* Key Takeaways summary box */}
            {post.keyTakeaways && post.keyTakeaways.length > 0 && (
              <section
                aria-label="Key Takeaways"
                className="p-6 bg-stone-50  border-l-4 border-accent rounded-r-lg"
              >
                <h2 className="text-xs uppercase tracking-widest font-sans font-bold text-accent mb-3 flex items-center gap-2">
                  <span>Key Takeaways</span>
                </h2>
                <ul className="space-y-2 text-sm text-muted  font-sans leading-relaxed list-disc pl-5">
                  {post.keyTakeaways.map((takeaway, idx) => (
                    <li key={idx}>{takeaway}</li>
                  ))}
                </ul>
              </section>
            )}

            {/* Featured Image with citation cap */}
            <div className="space-y-2">
              <div className="relative aspect-[16/9] w-full overflow-hidden border border-border/60 rounded-lg bg-stone-100 luxury-shadow">
                <Image
                  src={post.featuredImage}
                  alt={post.title}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 800px"
                />
              </div>
              {post.featuredImageCaption && (
                <p className="text-[11px] italic font-sans text-muted-light text-center leading-normal px-2">
                  {post.featuredImageCaption}
                </p>
              )}
            </div>

            {/* Compiled MDX content renderer */}
            <div className="prose max-w-none prose-stone ">
              <MDXRemote source={post.content} components={mdxComponents} />
            </div>

            {/* Scientific Sources & Citations section */}
            {post.sources && post.sources.length > 0 && (
              <section className="mt-12 pt-6 border-t border-border/40">
                <h2 className="text-xs uppercase tracking-widest font-sans font-bold text-foreground mb-4">
                  Scientific Sources & References
                </h2>
                <ol className="space-y-2 pl-4 list-decimal text-xs font-sans text-muted-light">
                  {post.sources.map((source, idx) => (
                    <li key={idx} className="leading-relaxed">
                      {source.url ? (
                        <a
                          href={source.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-accent hover:underline focus:outline-none transition-colors"
                        >
                          {source.title}
                        </a>
                      ) : (
                        source.title
                      )}
                    </li>
                  ))}
                </ol>
              </section>
            )}

            {/* In-Article Bottom Ad Slot */}
            <AdSlot id="article-bottom-banner" format="horizontal" />

            {/* Share links */}
            <ShareButtons title={post.title} slug={post.slug} />

            {/* EEAT Author Credential box */}
            <AuthorBox
              authorSlug={post.author}
              reviewerSlug={post.reviewer}
              publishDate={post.publishDate}
              lastUpdated={post.lastUpdated}
            />

            {/* FAQ Accordion Section */}
            {post.faqs && post.faqs.length > 0 && (
              <section className="my-10 space-y-4">
                <h2 className="text-xs uppercase tracking-widest font-sans font-bold text-foreground border-b border-border/40 pb-2 flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-accent" />
                  <span>Frequently Asked Questions</span>
                </h2>
                <div className="divide-y divide-border/60">
                  {post.faqs.map((faq, idx) => (
                    <details key={idx} className="py-4 group focus-within:text-accent">
                      <summary className="font-serif text-lg font-bold text-foreground hover:text-accent cursor-pointer list-none flex items-center justify-between outline-none">
                        <span>{faq.question}</span>
                        <span className="text-muted-light group-open:rotate-180 transition-transform font-serif">+</span>
                      </summary>
                      <p className="text-sm font-sans text-muted  mt-2 leading-relaxed pl-1">
                        {faq.answer}
                      </p>
                    </details>
                  ))}
                </div>
              </section>
            )}

            {/* Previous / Next navigation */}
            <div className="flex justify-between items-center gap-4 py-8 border-t border-border/40">
              {prevPost ? (
                <Link
                  href={`/blog/${prevPost.slug}`}
                  className="flex-1 text-left p-4 border border-border/60 hover:border-accent rounded-lg bg-stone-50/50  focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                >
                  <span className="text-[10px] uppercase tracking-widest font-sans text-muted-light block mb-1">
                    ← Previous Article
                  </span>
                  <span className="text-sm font-serif font-bold text-foreground hover:text-accent leading-snug line-clamp-1">
                    {prevPost.title}
                  </span>
                </Link>
              ) : (
                <div className="flex-1" />
              )}
              {nextPost ? (
                <Link
                  href={`/blog/${nextPost.slug}`}
                  className="flex-1 text-right p-4 border border-border/60 hover:border-accent rounded-lg bg-stone-50/50  focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                >
                  <span className="text-[10px] uppercase tracking-widest font-sans text-muted-light block mb-1">
                    Next Article →
                  </span>
                  <span className="text-sm font-serif font-bold text-foreground hover:text-accent leading-snug line-clamp-1">
                    {nextPost.title}
                  </span>
                </Link>
              ) : (
                <div className="flex-1" />
              )}
            </div>

            {/* Newsletter sign-up block */}
            <NewsletterBox />
          </div>

          {/* Sidebar Area Column */}
          <aside className="hidden lg:col-span-4 lg:block space-y-8">
            
            {/* Table of contents headings card */}
            <TableOfContents headings={post.headings} />

            {/* Ad space */}
            <AdSlot id="article-sidebar" format="vertical" />

            {/* Related articles panel */}
            {relatedPosts.length > 0 && (
              <div className="p-6 border border-border/80 rounded-lg bg-white  luxury-shadow">
                <h3 className="text-xs uppercase tracking-widest font-sans font-bold text-foreground border-b border-border/40 pb-2 mb-4">
                  Related Guides
                </h3>
                <div className="space-y-4">
                  {relatedPosts.map((related) => (
                    <article key={related.slug} className="space-y-2">
                      <h4 className="text-sm font-serif font-bold text-foreground hover:text-accent transition-colors leading-snug">
                        <Link href={`/blog/${related.slug}`}>{related.title}</Link>
                      </h4>
                      <div className="flex justify-between text-[9px] uppercase tracking-widest font-sans text-muted-light">
                        <span>{related.category.replace("-", " ")}</span>
                        <span>{related.readingTime}</span>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )}

          </aside>
        </div>
      </div>
    </article>
  );
}

