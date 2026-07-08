import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts } from "@/lib/blog";
import { siteConfig } from "@/config/site";
import Breadcrumbs from "@/components/Breadcrumbs";
import AdSlot from "@/components/AdSlot";
import { Award, CheckCircle2, ShieldCheck, Mail } from "lucide-react";

interface AuthorPageProps {
  params: Promise<{ slug: string }>;
}

// Generate static parameters for author slugs for SSG
export async function generateStaticParams() {
  return Object.keys(siteConfig.authors).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: AuthorPageProps): Promise<Metadata> {
  const { slug } = await params;
  const author = siteConfig.authors[slug];
  if (!author) return {};

  return {
    title: `${author.name} - Profile & Credentials`,
    description: author.bio,
  };
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const { slug } = await params;
  const author = siteConfig.authors[slug];

  if (!author) {
    notFound();
  }

  const posts = getAllPosts();
  // Filter posts where author is slug, or where reviewer is slug (for EEAT review tracking!)
  const authoredPosts = posts.filter((post) => post.author === slug);
  const reviewedPosts = posts.filter((post) => post.reviewer === slug);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-20">
      
      {/* breadcrumb path */}
      <Breadcrumbs
        items={[
          { name: "About Us", item: "/about" },
          { name: author.name, item: `/author/${slug}` },
        ]}
      />

      {/* Author profile Header */}
      <section className="bg-stone-50  border border-border/80 rounded-xl p-8 md:p-12 mb-12 luxury-shadow">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          
          <div className="relative w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden border-2 border-accent shrink-0 bg-stone-100 luxury-shadow">
            <Image
              src={author.avatar}
              alt={author.name}
              fill
              className="object-cover"
              sizes="144px"
            />
          </div>

          <div className="space-y-4 flex-1 text-center md:text-left">
            <div>
              <div className="flex items-center justify-center md:justify-start gap-2 text-xs uppercase tracking-widest text-accent font-sans font-bold mb-1">
                <span>Verified Expert Profile</span>
                <CheckCircle2 className="w-4 h-4 text-accent" />
              </div>
              
              <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
                {author.name}
              </h1>
              
              <p className="text-sm text-muted-light font-sans mt-0.5">{author.role}</p>
            </div>

            <p className="text-sm md:text-base text-muted  font-sans leading-relaxed">
              {author.bio}
            </p>

            {/* Qualifications / Credentials list */}
            {author.credentials && author.credentials.length > 0 && (
              <div className="space-y-2 pt-2">
                <h3 className="text-xs uppercase tracking-widest font-sans font-bold text-foreground flex items-center justify-center md:justify-start gap-2">
                  <Award className="w-4 h-4 text-accent" />
                  <span>Professional Credentials</span>
                </h3>
                <ul className="text-xs text-muted font-sans space-y-1.5 list-disc pl-5 inline-block text-left">
                  {author.credentials.map((cred, idx) => (
                    <li key={idx} className="leading-relaxed">{cred}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Ad slot */}
      <AdSlot id="author-top-banner" format="horizontal" />

      {/* Authored publications grid */}
      <section className="mt-12 space-y-8">
        <h2 className="text-2xl font-serif font-bold text-foreground border-b border-border/60 pb-3">
          Guides Written by {author.name}
        </h2>

        {authoredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {authoredPosts.map((post) => (
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
                    sizes="(max-width: 768px) 100vw, 300px"
                  />
                </Link>
                
                <div className="p-6 flex flex-col flex-1 space-y-3">
                  <div className="text-[10px] text-muted-light font-sans uppercase tracking-widest">
                    {post.category.replace("-", " ")}
                  </div>
                  <h3 className="text-lg font-serif font-bold text-foreground group-hover:text-accent transition-colors leading-snug">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>
                  <p className="text-xs text-muted  font-sans leading-relaxed line-clamp-2">
                    {post.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p className="text-sm font-sans text-muted">No authored guides published yet.</p>
        )}
      </section>

      {/* Reviewed publications grid (for scientific reviews) */}
      {reviewedPosts.length > 0 && (
        <section className="mt-16 space-y-8">
          <h2 className="text-2xl font-serif font-bold text-foreground border-b border-border/60 pb-3 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <span>Guides Fact Checked & Reviewed by {author.name}</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviewedPosts.map((post) => (
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
                    sizes="(max-width: 768px) 100vw, 300px"
                  />
                </Link>
                
                <div className="p-6 flex flex-col flex-1 space-y-3">
                  <div className="text-[10px] text-muted-light font-sans uppercase tracking-widest flex items-center gap-1">
                    <span className="text-emerald-700  font-semibold">Reviewed</span>
                    <span>•</span>
                    <span>{post.category.replace("-", " ")}</span>
                  </div>
                  <h3 className="text-lg font-serif font-bold text-foreground group-hover:text-accent transition-colors leading-snug">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>
                  <p className="text-xs text-muted  font-sans leading-relaxed line-clamp-2">
                    {post.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
