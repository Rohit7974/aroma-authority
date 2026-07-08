import { getAllPosts } from "@/lib/blog";
import { siteConfig } from "@/config/site";

export async function GET() {
  const posts = getAllPosts();
  
  const rssItems = posts
    .map((post) => `
      <item>
        <title>${escapeXml(post.title)}</title>
        <link>${siteConfig.url}/blog/${post.slug}</link>
        <guid>${siteConfig.url}/blog/${post.slug}</guid>
        <pubDate>${new Date(post.publishDate).toUTCString()}</pubDate>
        <description>${escapeXml(post.description)}</description>
        <category>${escapeXml(post.category.replace("-", " "))}</category>
      </item>
    `)
    .join("");

  const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(siteConfig.name)}</title>
    <link>${siteConfig.url}</link>
    <description>${escapeXml(siteConfig.description)}</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteConfig.url}/feed.xml" rel="self" type="application/rss+xml" />
    ${rssItems}
  </channel>
</rss>`.trim();

  return new Response(rssFeed, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=1200, stale-while-revalidate=600",
    },
  });
}

function escapeXml(unsafe: string) {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case "<": return "&lt;";
      case ">": return "&gt;";
      case "&": return "&amp;";
      case "'": return "&apos;";
      case '"': return "&quot;";
      default: return c;
    }
  });
}
export const dynamic = 'force-static';
