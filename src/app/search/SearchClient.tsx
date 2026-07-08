"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Search, X, Grid } from "lucide-react";
import AdSlot from "@/components/AdSlot";

interface SearchPost {
  slug: string;
  title: string;
  description: string;
  category: string;
  readingTime: string;
  publishDate: string;
  featuredImage: string;
  tags: string[];
}

interface SearchClientProps {
  posts: SearchPost[];
}

function SearchClientInner({ posts }: SearchClientProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const queryParam = searchParams.get("q") || "";

  const [query, setQuery] = useState(queryParam);
  const [results, setResults] = useState<SearchPost[]>(posts);
  const [activeCategory, setActiveCategory] = useState<string>("all");

  // Sync state with URL query parameters
  useEffect(() => {
    setQuery(queryParam);
  }, [queryParam]);

  // Perform dynamic filtration when query or category changes
  useEffect(() => {
    let filtered = posts;

    const normalizedQuery = query.toLowerCase().trim();
    if (normalizedQuery) {
      filtered = filtered.filter((post) => {
        return (
          post.title.toLowerCase().includes(normalizedQuery) ||
          post.description.toLowerCase().includes(normalizedQuery) ||
          post.tags.some((t) => t.toLowerCase().includes(normalizedQuery)) ||
          post.category.toLowerCase().includes(normalizedQuery)
        );
      });
    }

    if (activeCategory !== "all") {
      filtered = filtered.filter((post) => post.category === activeCategory);
    }

    setResults(filtered);
  }, [query, activeCategory, posts]);

  const handleInputChange = (val: string) => {
    setQuery(val);
    // Dynamic URL replacement to allow bookmarkable search queries
    const params = new URLSearchParams(window.location.search);
    if (val) {
      params.set("q", val);
    } else {
      params.delete("q");
    }
    router.replace(`/search?${params.toString()}`, { scroll: false });
  };

  const handleClear = () => {
    handleInputChange("");
  };

  // Get list of categories in results to show count shortcuts
  const categories = ["all", ...Array.from(new Set(posts.map((p) => p.category)))];

  return (
    <div className="space-y-8">
      {/* Search Input Box */}
      <div className="relative max-w-2xl">
        <label htmlFor="search-input" className="sr-only">
          Search Scent Guides
        </label>
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-muted-light">
          <Search className="w-5 h-5" />
        </div>
        <input
          id="search-input"
          type="text"
          placeholder="Search for wicks, soy wax, diffusers..."
          value={query}
          onChange={(e) => handleInputChange(e.target.value)}
          className="w-full pl-12 pr-12 py-3.5 bg-white dark:bg-stone-900 border border-border focus:border-accent focus:ring-2 focus:ring-accent/20 rounded-lg text-base text-foreground placeholder:text-muted-light/60 transition outline-none luxury-shadow"
        />
        {query && (
          <button
            onClick={handleClear}
            aria-label="Clear Search Input"
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-muted-light hover:text-accent focus:outline-none"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Category selector capsules */}
      <div className="flex flex-wrap gap-2 items-center">
        <span className="text-xs uppercase tracking-widest font-sans font-semibold text-muted-light mr-2">
          Domain:
        </span>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-xs uppercase tracking-wider font-semibold border transition focus:outline-none focus:ring-2 focus:ring-accent/40 ${
              activeCategory === cat
                ? "bg-accent border-accent text-white"
                : "bg-white dark:bg-stone-900 border-border/80 text-muted hover:text-foreground hover:border-accent"
            }`}
          >
            {cat.replace("-", " ")}
          </button>
        ))}
      </div>

      <div className="pt-4 border-t border-border/40">
        <div className="flex items-center justify-between text-xs text-muted-light font-sans uppercase tracking-widest mb-6">
          <span>Found {results.length} guides</span>
          <Grid className="w-4 h-4" />
        </div>

        {results.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {results.map((post, index) => (
              <div key={post.slug} className="flex flex-col h-full">
                <article className="border border-border/60 rounded-lg overflow-hidden bg-white dark:bg-stone-900 flex flex-col h-full luxury-shadow luxury-shadow-hover group">
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

                  <div className="p-6 flex flex-col flex-1 space-y-4">
                    <div className="flex items-center justify-between text-[10px] text-muted-light font-sans uppercase tracking-widest">
                      <span className="font-semibold text-accent">{post.category.replace("-", " ")}</span>
                      <span>{post.readingTime}</span>
                    </div>

                    <h2 className="text-lg font-serif font-bold text-foreground group-hover:text-accent transition-colors leading-snug">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h2>

                    <p className="text-xs text-muted dark:text-stone-300 font-sans leading-relaxed line-clamp-3 flex-1">
                      {post.description}
                    </p>

                    <div className="pt-4 border-t border-border/40 text-[10px] text-muted-light font-sans flex justify-between">
                      <span>{post.publishDate}</span>
                    </div>
                  </div>
                </article>

                {/* Optional middle ad in results */}
                {index === 2 && (
                  <div className="col-span-1 md:col-span-2 lg:col-span-3">
                    <AdSlot id="search-mid-ad" format="horizontal" />
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 border border-dashed border-border/60 rounded-lg bg-stone-50/20">
            <p className="text-sm font-sans text-muted">No guides match your query. Try searching for other terms or check categories.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchClient({ posts }: SearchClientProps) {
  return (
    <Suspense fallback={<div className="text-sm font-sans text-muted">Loading search module...</div>}>
      <SearchClientInner posts={posts} />
    </Suspense>
  );
}
