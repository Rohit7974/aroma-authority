import { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { siteConfig } from "@/config/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = getAllPosts();

  // 1. Core pages list
  const coreRoutes = [
    "",
    "/blog",
    "/categories",
    "/search",
    "/about",
    "/contact",
    "/sitemap",
  ].map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  // 2. Policy routes list
  const policyRoutes = siteConfig.navigation.legal.map((item) => ({
    url: `${siteConfig.url}${item.href}`,
    lastModified: new Date().toISOString().split("T")[0],
    changeFrequency: "monthly" as const,
    priority: 0.3,
  }));

  // 3. Category routes list
  const categoryRoutes = siteConfig.categories.map((cat) => ({
    url: `${siteConfig.url}/categories/${cat.slug}`,
    lastModified: new Date().toISOString().split("T")[0],
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  // 4. Dynamic MDX post routes list
  const postRoutes = posts.map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}`,
    lastModified: post.lastUpdated || post.publishDate,
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  return [...coreRoutes, ...policyRoutes, ...categoryRoutes, ...postRoutes];
}
