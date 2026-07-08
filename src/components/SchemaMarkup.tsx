import { siteConfig } from "@/config/site";
import { Post } from "@/lib/blog";

interface SchemaMarkupProps {
  type: "Organization" | "WebSite" | "BlogPosting" | "FAQPage" | "BreadcrumbList";
  post?: Post;
  breadcrumbs?: { name: string; item: string }[];
}

export default function SchemaMarkup({ type, post, breadcrumbs }: SchemaMarkupProps) {
  let schemaData: Record<string, any> | null = null;

  const publisherInfo = {
    "@type": "Organization",
    "@id": `${siteConfig.url}/#organization`,
    "name": siteConfig.name,
    "url": siteConfig.url,
    "logo": {
      "@type": "ImageObject",
      "url": `${siteConfig.url}/images/site-cover.webp`,
      "width": 1200,
      "height": 675
    },
    "sameAs": [
      "https://twitter.com/aromaauthority",
      "https://pinterest.com/aromaauthority"
    ]
  };

  if (type === "Organization") {
    schemaData = publisherInfo;
  }

  if (type === "WebSite") {
    schemaData = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${siteConfig.url}/#website`,
      "url": siteConfig.url,
      "name": siteConfig.name,
      "description": siteConfig.description,
      "publisher": {
        "@id": `${siteConfig.url}/#organization`
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": `${siteConfig.url}/search?q={search_term_string}`
        },
        "query-input": "required name=search_term_string"
      }
    };
  }

  if (type === "BlogPosting" && post) {
    const authorObj = siteConfig.authors[post.author];
    schemaData = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "@id": `${siteConfig.url}/blog/${post.slug}/#post`,
      "headline": post.title,
      "description": post.description,
      "datePublished": post.publishDate,
      "dateModified": post.lastUpdated || post.publishDate,
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `${siteConfig.url}/blog/${post.slug}`
      },
      "image": {
        "@type": "ImageObject",
        "url": post.featuredImage,
        "width": 1200,
        "height": 675
      },
      "author": {
        "@type": "Person",
        "name": authorObj?.name || post.author,
        "url": `${siteConfig.url}/author/${post.author}`,
        "jobTitle": authorObj?.role || "Fragrance Writer"
      },
      "publisher": {
        "@id": `${siteConfig.url}/#organization`
      },
      "isPartOf": {
        "@type": "WebPage",
        "@id": `${siteConfig.url}/blog/${post.slug}`
      }
    };

    if (post.reviewer) {
      const reviewerObj = siteConfig.authors[post.reviewer];
      schemaData.editor = {
        "@type": "Person",
        "name": reviewerObj?.name || post.reviewer,
        "url": `${siteConfig.url}/author/${post.reviewer}`
      };
    }
  }

  if (type === "FAQPage" && post?.faqs && post.faqs.length > 0) {
    schemaData = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": post.faqs.map((faq) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    };
  }

  if (type === "BreadcrumbList" && breadcrumbs) {
    schemaData = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbs.map((crumb, idx) => ({
        "@type": "ListItem",
        "position": idx + 1,
        "name": crumb.name,
        "item": crumb.item.startsWith("http") ? crumb.item : `${siteConfig.url}${crumb.item}`
      }))
    };
  }

  if (!schemaData) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
}
