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
import SchemaMarkup from "@/components/SchemaMarkup";
import ReadingProgressBar from "@/components/ReadingProgressBar";
import { BookOpen, Calendar, HelpCircle } from "lucide-react";

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const ogUrl = `${siteConfig.url}/blog/${post.slug}`;

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

  const allPosts = getAllPosts();
  const currentIndex = allPosts.findIndex((p) => p.slug === post.slug);
  const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const prevPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

  return (
    <article className="pb-24 bg-[#FAF9F6] text-[#1C1C1C]">
      {/* Reading Progress Bar */}
      <ReadingProgressBar />

      {/* Dynamic JSON-LD structured schemas */}
      <SchemaMarkup type="BlogPosting" post={post} />
      {post.faqs && post.faqs.length > 0 && <SchemaMarkup type="FAQPage" post={post} />}

      {/* Hero Header Section */}
      <header className="py-16 border-b border-[#E5E0DA] bg-[#F5F2EC]">
        <div className="max-w-5xl mx-auto px-6 text-center space-y-6">
          <div className="flex items-center justify-center gap-3">
            <Link
              href={`/categories/${post.category}`}
              className="text-[10px] uppercase tracking-[0.25em] text-[#B5945F] font-sans font-bold hover:text-[#9E7D47]"
            >
              {post.category.replace("-", " ")}
            </Link>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-light leading-tight max-w-4xl mx-auto">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[10px] text-[#8C8C8C] font-sans uppercase tracking-[0.15em] pt-4">
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
              By{" "}
              <Link
                href={`/author/${post.author}`}
                className="text-[#1C1C1C] hover:text-[#B5945F] font-semibold"
              >
                {authorObj?.name}
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Cover Image Section */}
      <div className="max-w-6xl mx-auto px-6 -mt-8 relative z-10">
        <div className="relative aspect-[21/9] w-full overflow-hidden rounded-sm bg-[#FAF9F6] border border-[#E5E0DA] shadow-[0_12px_40px_rgba(28,28,28,0.03)]">
          <Image
            src={post.featuredImage}
            alt={post.title}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1200px) 100vw, 1200px"
          />
        </div>
        {post.featuredImageCaption && (
          <p className="text-[10px] italic font-sans text-[#8C8C8C] text-center mt-3 tracking-wide">
            {post.featuredImageCaption}
          </p>
        )}
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mt-16">
        
        {/* Breadcrumb trail */}
        <Breadcrumbs
          items={[
            { name: "Blog", item: "/blog" },
            { name: post.category.replace("-", " "), item: `/categories/${post.category}` },
            { name: post.title, item: `/blog/${post.slug}` },
          ]}
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mt-8 items-start">
          
          {/* Main article body column */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* Key Takeaways summary box */}
            {post.keyTakeaways && post.keyTakeaways.length > 0 && (
              <section
                aria-label="Key Takeaways"
                className="p-8 bg-[#F5F2EC] border-l-2 border-[#B5945F] rounded-r-sm shadow-[0_4px_20px_rgba(181,148,95,0.02)]"
              >
                <h2 className="text-[11px] uppercase tracking-[0.2em] font-sans font-bold text-[#B5945F] mb-4">
                  Key Takeaways
                </h2>
                <ul className="space-y-3 text-sm text-[#575757] font-serif font-light leading-relaxed list-disc pl-5">
                  {post.keyTakeaways.map((takeaway, idx) => (
                    <li key={idx}>{takeaway}</li>
                  ))}
                </ul>
              </section>
            )}

            {/* Compiled MDX content renderer */}
            <div className="prose max-w-none prose-stone font-serif font-light text-base leading-relaxed text-[#575757] space-y-6 antialiased">
              <MDXRemote source={post.content} components={mdxComponents} />
            </div>

            {/* Scientific Sources & Citations section */}
            {post.sources && post.sources.length > 0 && (
              <section className="pt-8 border-t border-[#E5E0DA]">
                <h2 className="text-[11px] uppercase tracking-[0.2em] font-sans font-bold text-[#1C1C1C] mb-4">
                  Sources & References
                </h2>
                <ol className="space-y-2 pl-4 list-decimal text-xs font-sans text-[#8C8C8C]">
                  {post.sources.map((source, idx) => (
                    <li key={idx} className="leading-relaxed">
                      {source.url ? (
                        <a
                          href={source.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-[#B5945F] hover:underline transition-colors"
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

            {/* Share links */}
            <ShareButtons title={post.title} slug={post.slug} />

            {/* Author Credential box */}
            <AuthorBox
              authorSlug={post.author}
              reviewerSlug={post.reviewer}
              publishDate={post.publishDate}
              lastUpdated={post.lastUpdated}
            />

            {/* FAQ Accordion Section */}
            {post.faqs && post.faqs.length > 0 && (
              <section className="space-y-6 pt-8 border-t border-[#E5E0DA]">
                <h2 className="text-[11px] uppercase tracking-[0.2em] font-sans font-bold text-[#1C1C1C] flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-[#B5945F]" />
                  <span>Frequently Asked Questions</span>
                </h2>
                <div className="divide-y divide-[#E5E0DA]/60">
                  {post.faqs.map((faq, idx) => (
                    <details key={idx} className="py-5 group">
                      <summary className="font-serif text-lg font-light text-[#1C1C1C] hover:text-[#B5945F] cursor-pointer list-none flex items-center justify-between outline-none">
                        <span>{faq.question}</span>
                        <span className="text-[#8C8C8C] group-open:rotate-180 transition-transform font-serif">+</span>
                      </summary>
                      <p className="text-sm font-sans text-[#575757] mt-3 leading-relaxed pl-1">
                        {faq.answer}
                      </p>
                    </details>
                  ))}
                </div>
              </section>
            )}

            {/* Previous / Next navigation */}
            <div className="flex justify-between items-center gap-6 py-8 border-t border-[#E5E0DA]">
              {prevPost ? (
                <Link
                  href={`/blog/${prevPost.slug}`}
                  className="flex-1 text-left p-6 border border-[#E5E0DA]/60 hover:border-[#B5945F] rounded-sm bg-[#F5F2EC]/30 transition-all"
                >
                  <span className="text-[9px] uppercase tracking-[0.2em] font-sans text-[#8C8C8C] block mb-1">
                    &larr; Previous Article
                  </span>
                  <span className="text-sm font-serif font-light text-[#1C1C1C] hover:text-[#B5945F] leading-snug line-clamp-1">
                    {prevPost.title}
                  </span>
                </Link>
              ) : (
                <div className="flex-1" />
              )}
              {nextPost ? (
                <Link
                  href={`/blog/${nextPost.slug}`}
                  className="flex-1 text-right p-6 border border-[#E5E0DA]/60 hover:border-[#B5945F] rounded-sm bg-[#F5F2EC]/30 transition-all"
                >
                  <span className="text-[9px] uppercase tracking-[0.2em] font-sans text-[#8C8C8C] block mb-1">
                    Next Article &rarr;
                  </span>
                  <span className="text-sm font-serif font-light text-[#1C1C1C] hover:text-[#B5945F] leading-snug line-clamp-1">
                    {nextPost.title}
                  </span>
                </Link>
              ) : (
                <div className="flex-1" />
              )}
            </div>

            {/* Newsletter box */}
            <NewsletterBox />
          </div>

          {/* Sidebar Area Column */}
          <aside className="hidden lg:col-span-4 lg:block space-y-8 sticky top-28">
            {/* Table of contents headings card */}
            <TableOfContents headings={post.headings} />

            {/* Related articles panel */}
            {relatedPosts.length > 0 && (
              <div className="p-8 border border-[#E5E0DA]/80 rounded-sm bg-[#FAF9F6] shadow-[0_4px_30px_rgba(28,28,28,0.02)]">
                <h3 className="text-[11px] uppercase tracking-[0.2em] font-sans font-bold text-[#1C1C1C] border-b border-[#E5E0DA] pb-3 mb-6">
                  Related Guides
                </h3>
                <div className="space-y-6">
                  {relatedPosts.map((related) => (
                    <article key={related.slug} className="space-y-2 group">
                      <h4 className="text-base font-serif font-light text-[#1C1C1C] group-hover:text-[#B5945F] transition-colors leading-snug">
                        <Link href={`/blog/${related.slug}`}>{related.title}</Link>
                      </h4>
                      <div className="flex justify-between text-[9px] uppercase tracking-[0.2em] font-sans text-[#8C8C8C]">
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
