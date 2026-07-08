import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "content/posts");

export interface Heading {
  id: string;
  text: string;
  level: number;
}

export interface Post {
  slug: string;
  title: string;
  description: string;
  publishDate: string;
  lastUpdated?: string;
  author: string;
  reviewer?: string;
  category: string;
  tags: string[];
  featuredImage: string;
  featuredImageCaption?: string;
  draft?: boolean;
  keyTakeaways: string[];
  faqs?: { question: string; answer: string }[];
  sources?: { title: string; url: string }[];
  content: string;
  readingTime: string;
  headings: Heading[];
}

// Calculate reading time based on 200 words per minute
export function calculateReadingTime(text: string): string {
  const wordsPerMinute = 200;
  const numberOfWords = text.split(/\s+/g).length;
  const minutes = Math.ceil(numberOfWords / wordsPerMinute);
  return `${minutes} min read`;
}

// Extract headings dynamically from markdown content
export function extractHeadings(content: string): Heading[] {
  const headingRegex = /^(#{2,4})\s+(.*)$/gm;
  const headings: Heading[] = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].replace(/[**_*`]/g, "").trim();
    // Create an anchor-friendly ID
    const id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");
    headings.push({ id, text, level });
  }

  return headings;
}

// Get all posts from MDX files
export function getAllPosts(): Post[] {
  // If the directory does not exist, return an empty array
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith(".mdx"))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      const readingTime = calculateReadingTime(content);
      const headings = extractHeadings(content);

      return {
        slug,
        title: data.title || "",
        description: data.description || "",
        publishDate: data.publishDate || "",
        lastUpdated: data.lastUpdated || data.publishDate || "",
        author: data.author || "elena-rostova",
        reviewer: data.reviewer || undefined,
        category: data.category || "home-fragrance",
        tags: data.tags || [],
        featuredImage: data.featuredImage || "/images/hero-candle.webp",
        featuredImageCaption: data.featuredImageCaption || undefined,
        draft: data.draft || false,
        keyTakeaways: data.keyTakeaways || [],
        faqs: data.faqs || undefined,
        sources: data.sources || undefined,
        content,
        readingTime,
        headings,
      } as Post;
    });

  // Filter out drafts and sort by date descending
  return allPostsData
    .filter((post) => !post.draft)
    .sort((a, b) => (a.publishDate < b.publishDate ? 1 : -1));
}

// Get a single post by slug
export function getPostBySlug(slug: string): Post | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`);
    if (!fs.existsSync(fullPath)) {
      return null;
    }
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    const readingTime = calculateReadingTime(content);
    const headings = extractHeadings(content);

    return {
      slug,
      title: data.title || "",
      description: data.description || "",
      publishDate: data.publishDate || "",
      lastUpdated: data.lastUpdated || data.publishDate || "",
      author: data.author || "elena-rostova",
      reviewer: data.reviewer || undefined,
      category: data.category || "home-fragrance",
      tags: data.tags || [],
      featuredImage: data.featuredImage || "/images/hero-candle.webp",
      featuredImageCaption: data.featuredImageCaption || undefined,
      draft: data.draft || false,
      keyTakeaways: data.keyTakeaways || [],
      faqs: data.faqs || undefined,
      sources: data.sources || undefined,
      content,
      readingTime,
      headings,
    } as Post;
  } catch (error) {
    console.error(`Error reading post with slug ${slug}:`, error);
    return null;
  }
}

// Get related articles based on category overlap and shared tags
export function getRelatedPosts(currentPost: Post, max = 3): Post[] {
  const allPosts = getAllPosts();
  return allPosts
    .filter((post) => post.slug !== currentPost.slug) // Exclude current
    .map((post) => {
      let score = 0;
      if (post.category === currentPost.category) {
        score += 5; // Heavy weight for same category
      }
      // Overlapping tags
      const sharedTags = post.tags.filter((tag) => currentPost.tags.includes(tag));
      score += sharedTags.length * 2;
      return { post, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, max)
    .map((item) => item.post);
}

// Simple search query matching
export function searchPosts(query: string): Post[] {
  const allPosts = getAllPosts();
  if (!query) return allPosts;

  const normalizedQuery = query.toLowerCase().trim();
  return allPosts.filter((post) => {
    return (
      post.title.toLowerCase().includes(normalizedQuery) ||
      post.description.toLowerCase().includes(normalizedQuery) ||
      post.content.toLowerCase().includes(normalizedQuery) ||
      post.tags.some((tag) => tag.toLowerCase().includes(normalizedQuery)) ||
      post.category.toLowerCase().includes(normalizedQuery)
    );
  });
}
