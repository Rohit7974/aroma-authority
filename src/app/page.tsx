import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { getAllPosts } from "@/lib/blog";
import NewsletterBox from "@/components/NewsletterBox";
import SchemaMarkup from "@/components/SchemaMarkup";
import { ArrowUpRight } from "lucide-react";

export default function HomePage() {
  const posts = getAllPosts();
  const featuredPost = posts[0];
  const editorsPicks = posts.slice(1, 4);
  const trendingReads = posts.slice(4, 7);
  const latestArticles = posts.slice(7, 12);
  const popularGuides = posts.slice(12, 15);

  return (
    <div className="relative pb-24 bg-[#FAF9F6] text-[#1C1C1C]">
      {/* Schema Markup */}
      <SchemaMarkup type="WebSite" />

      {/* 1. EDITORIAL HERO (Featured Article) */}
      {featuredPost && (
        <section className="relative w-full py-16 md:py-24 border-b border-[#E5E0DA]">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="flex flex-col gap-12 lg:gap-16">
              
              {/* Category & Tag Line */}
              <div className="flex items-center gap-4 justify-center md:justify-start">
                <span className="text-[10px] uppercase tracking-[0.25em] font-sans font-bold text-[#B5945F]">
                  {featuredPost.category.replace("-", " ")}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#E5E0DA]"></span>
                <span className="text-[10px] uppercase tracking-[0.2em] font-sans text-[#8C8C8C]">
                  {featuredPost.readingTime}
                </span>
              </div>

              {/* Huge Typography Heading */}
              <div className="text-center md:text-left max-w-5xl">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-light leading-[1.1] tracking-tight hover:text-[#B5945F] transition-colors duration-500">
                  <Link href={`/blog/${featuredPost.slug}`}>
                    {featuredPost.title}
                  </Link>
                </h1>
              </div>

              {/* Aspect Ratio Hero Image */}
              <div className="relative w-full aspect-[21/9] rounded-sm overflow-hidden group shadow-[0_4px_30px_rgba(28,28,28,0.02)]">
                <Link href={`/blog/${featuredPost.slug}`}>
                  <Image
                    src={featuredPost.featuredImage}
                    alt={featuredPost.title}
                    fill
                    className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                    priority
                    sizes="100vw"
                  />
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500"></div>
                </Link>
              </div>

              {/* Description & Link */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                <div className="md:col-span-8">
                  <p className="text-base sm:text-lg font-serif font-light text-[#575757] leading-relaxed">
                    {featuredPost.description}
                  </p>
                </div>
                <div className="md:col-span-4 md:text-right pt-2">
                  <Link
                    href={`/blog/${featuredPost.slug}`}
                    className="inline-flex items-center gap-2 text-xs font-sans font-semibold uppercase tracking-widest text-[#1C1C1C] hover:text-[#B5945F] transition-colors duration-300 group"
                  >
                    Read The Article
                    <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </section>
      )}

      {/* 2. FEATURED CATEGORIES SECTION */}
      <section className="py-20 border-b border-[#E5E0DA] bg-[#F5F2EC]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#B5945F] font-sans font-bold block mb-2">
                Fragrance Domains
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-light">
                Select Your Scent Category
              </h2>
            </div>
            <Link
              href="/categories"
              className="text-xs font-sans font-semibold uppercase tracking-widest text-[#1C1C1C] hover:text-[#B5945F] transition-colors"
            >
              Browse All Categories &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {siteConfig.categories.slice(0, 4).map((cat) => (
              <Link
                key={cat.slug}
                href={`/categories/${cat.slug}`}
                className="p-8 bg-[#FAF9F6] border border-[#E5E0DA]/80 rounded-sm hover:border-[#B5945F] hover:shadow-[0_8px_30px_rgba(181,148,95,0.05)] transition-all duration-500 group"
              >
                <div className="w-10 h-10 rounded-full bg-[#F5F2EC] text-[#B5945F] flex items-center justify-center mb-6 font-serif text-sm group-hover:bg-[#B5945F] group-hover:text-white transition-colors duration-500">
                  {cat.title[0]}
                </div>
                <h3 className="text-xl font-serif font-medium text-[#1C1C1C] mb-2">
                  {cat.title}
                </h3>
                <p className="text-xs text-[#575757] font-sans leading-relaxed mb-4 line-clamp-2">
                  {cat.description}
                </p>
                <span className="text-[10px] text-[#B5945F] font-sans uppercase tracking-widest font-semibold block transition-transform duration-300 group-hover:translate-x-1">
                  Explore Domain &rarr;
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. EDITOR'S PICKS & TRENDING READS */}
      <section className="py-24 border-b border-[#E5E0DA]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            {/* Editor's Picks Column */}
            <div className="lg:col-span-8 space-y-12">
              <div className="border-b border-[#E5E0DA] pb-4 mb-8">
                <h2 className="text-2xl sm:text-3xl font-serif font-light tracking-wide text-[#1C1C1C]">
                  Editor&apos;s Editorial Picks
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {editorsPicks.map((post) => (
                  <article key={post.slug} className="group space-y-4">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="block relative aspect-[4/3] rounded-sm overflow-hidden bg-[#FAF9F6] border border-[#E5E0DA]/40"
                    >
                      <Image
                        src={post.featuredImage}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-[1s] ease-out group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 400px"
                      />
                    </Link>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-[9px] uppercase tracking-[0.2em] text-[#8C8C8C] font-sans">
                        <span className="font-semibold text-[#B5945F]">
                          {post.category.replace("-", " ")}
                        </span>
                        <span>•</span>
                        <span>{post.readingTime}</span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-serif leading-snug group-hover:text-[#B5945F] transition-colors duration-300">
                        <Link href={`/blog/${post.slug}`}>
                          {post.title}
                        </Link>
                      </h3>
                      <p className="text-xs text-[#575757] font-sans leading-relaxed line-clamp-2">
                        {post.description}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* Trending Reads Column */}
            <div className="lg:col-span-4 space-y-12">
              <div className="border-b border-[#E5E0DA] pb-4 mb-8">
                <h2 className="text-2xl font-serif font-light tracking-wide text-[#1C1C1C]">
                  Trending Reads
                </h2>
              </div>

              <div className="space-y-8">
                {trendingReads.map((post, idx) => (
                  <div key={post.slug} className="flex gap-6 items-start group">
                    <span className="text-4xl font-serif font-light text-[#E5E0DA] tracking-wider leading-none">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <div className="space-y-1.5">
                      <span className="text-[9px] uppercase tracking-[0.2em] text-[#B5945F] font-sans font-bold block">
                        {post.category.replace("-", " ")}
                      </span>
                      <h3 className="text-base font-serif font-medium leading-snug group-hover:text-[#B5945F] transition-colors duration-300">
                        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. LATEST ARTICLES & POPULAR GUIDES */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            {/* Latest Publications */}
            <div className="lg:col-span-8 space-y-10">
              <div className="border-b border-[#E5E0DA] pb-4 mb-8">
                <h2 className="text-2xl sm:text-3xl font-serif font-light tracking-wide">
                  Latest Publications
                </h2>
              </div>

              <div className="divide-y divide-[#E5E0DA]/60 space-y-10">
                {latestArticles.map((post) => (
                  <article
                    key={post.slug}
                    className="pt-10 first:pt-0 grid grid-cols-1 sm:grid-cols-12 gap-8 group items-center"
                  >
                    <Link
                      href={`/blog/${post.slug}`}
                      className="sm:col-span-5 block relative aspect-[16/10] rounded-sm overflow-hidden bg-[#FAF9F6] border border-[#E5E0DA]/30"
                    >
                      <Image
                        src={post.featuredImage}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-[1s] ease-out group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 300px"
                      />
                    </Link>
                    <div className="sm:col-span-7 space-y-3">
                      <span className="text-[9px] uppercase tracking-[0.2em] text-[#B5945F] font-sans font-bold block">
                        {post.category.replace("-", " ")}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-serif leading-snug group-hover:text-[#B5945F] transition-colors duration-300">
                        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                      </h3>
                      <p className="text-xs text-[#575757] font-sans leading-relaxed line-clamp-2">
                        {post.description}
                      </p>
                      <div className="text-[9px] text-[#8C8C8C] uppercase tracking-wider font-sans">
                        {post.readingTime}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* Popular Guides */}
            <div className="lg:col-span-4 space-y-10">
              <div className="border-b border-[#E5E0DA] pb-4 mb-8">
                <h2 className="text-2xl font-serif font-light tracking-wide">
                  Popular Guides
                </h2>
              </div>

              <div className="grid grid-cols-1 gap-8">
                {popularGuides.map((post) => (
                  <article key={post.slug} className="group space-y-3">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="block relative aspect-[16/9] rounded-sm overflow-hidden bg-[#FAF9F6] border border-[#E5E0DA]/30"
                    >
                      <Image
                        src={post.featuredImage}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-[1s] ease-out group-hover:scale-105"
                        sizes="300px"
                      />
                    </Link>
                    <h3 className="text-lg font-serif font-medium leading-snug group-hover:text-[#B5945F] transition-colors duration-300">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h3>
                  </article>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. NEWSLETTER BOX */}
      <section className="bg-[#F5F2EC] py-20 border-t border-b border-[#E5E0DA]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <NewsletterBox />
        </div>
      </section>
    </div>
  );
}

