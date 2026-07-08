import { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import SearchClient from "./SearchClient";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Search Articles - AromaAuthority Knowledge Base",
  description: "Search our premium collection of scent care, candle trimming, and aromatherapy guides.",
};

export default function SearchPage() {
  const posts = getAllPosts();
  
  // Extract minimal posts data to pass to Client Component (reducing client bundle size)
  const postsCatalog = posts.map((post) => ({
    slug: post.slug,
    title: post.title,
    description: post.description,
    category: post.category,
    readingTime: post.readingTime,
    publishDate: post.publishDate,
    featuredImage: post.featuredImage,
    tags: post.tags,
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-20">
      
      {/* breadcrumb path */}
      <Breadcrumbs items={[{ name: "Search", item: "/search" }]} />

      <header className="mb-12 border-b border-border/40 pb-8 text-center sm:text-left">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground">
          Scent Knowledge Search
        </h1>
        <p className="text-sm md:text-base text-muted  font-sans mt-3 max-w-2xl leading-relaxed">
          Enter key terms (e.g. "wick", "rattan", "soot") to find relevant scientific care and buying guides across our fragrance domains.
        </p>
      </header>

      {/* Render interactive search component */}
      <SearchClient posts={postsCatalog} />

    </div>
  );
}
