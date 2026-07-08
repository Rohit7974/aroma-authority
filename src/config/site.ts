export interface Author {
  slug: string;
  name: string;
  role: string;
  bio: string;
  avatar: string;
  credentials: string[];
  credentialsSummary: string;
  socials: {
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
}

export interface Category {
  slug: string;
  title: string;
  description: string;
  color: string; // Tailwind class colors or hex
}

export interface SiteConfig {
  name: string;
  url: string;
  description: string;
  slogan: string;
  logoText: string;
  contactEmail: string;
  adSensePublisherId: string;
  adSenseEnabled: boolean;
  googleAnalyticsId: string;
  authors: Record<string, Author>;
  categories: Category[];
  navigation: {
    header: { label: string; href: string }[];
    footer: { label: string; href: string }[];
    legal: { label: string; href: string }[];
  };
}

export const siteConfig: SiteConfig = {
  name: "AromaAuthority",
  url: "https://aromaauthority.com", // Replaceable with production domain
  description: "The premier educational authority on home fragrances, scented candles, reed diffusers, and luxury scent care.",
  slogan: "Science, Art & Care of Luxury Home Scents",
  logoText: "AROMA AUTHORITY",
  contactEmail: "editor@aromaauthority.com",
  adSensePublisherId: "ca-pub-0000000000000000", // Configure when ready
  adSenseEnabled: true,
  googleAnalyticsId: "G-XXXXXXXXXX", // Configure when ready
  authors: {
    "elena-rostova": {
      slug: "elena-rostova",
      name: "Elena Rostova",
      role: "Lead Fragrance Consultant & Chemist",
      bio: "Elena holds a Master's degree in Organic Chemistry and has over 12 years of experience designing scent profiles for luxury European home brands. She specializes in fragrance compatibility, wax formulation, and scent safety standards.",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&h=400&fit=crop",
      credentials: [
        "M.S. in Organic Chemistry (Heidelberg University)",
        "Certified Fragrance Specialist (The Fragrance Foundation)",
        "Former R&D Chemist at Zara Home Scents Division"
      ],
      credentialsSummary: "Chemist & Certified Scent Specialist",
      socials: {
        twitter: "https://twitter.com/elenarostova",
        linkedin: "https://linkedin.com/in/elena-rostova"
      }
    },
    "marcus-vance": {
      slug: "marcus-vance",
      name: "Marcus Vance",
      role: "Wellness Editor & Home Decor Stylist",
      bio: "Marcus is an interior stylist and wellness writer. His work focuses on integrating olfactory aesthetics with functional home design to improve mental wellness, relaxation, and holiday ambiance.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&h=400&fit=crop",
      credentials: [
        "B.A. in Interior Architecture (Rhode Island School of Design)",
        "Associate Member of the American Society of Interior Designers (ASID)",
        "Author of 'Scenting Your Spaces: A Design Guide'"
      ],
      credentialsSummary: "Interior Stylist & Wellness Advocate",
      socials: {
        instagram: "https://instagram.com/marcusvancestyles",
        linkedin: "https://linkedin.com/in/marcus-vance"
      }
    }
  },
  categories: [
    {
      slug: "home-fragrance",
      title: "Home Fragrance",
      description: "Explore the art and science of home scenting, from scent throw theories to choosing fragrance notes.",
      color: "bg-amber-50 text-amber-900 border-amber-200"
    },
    {
      slug: "candles",
      title: "Scented Candles",
      description: "Everything you need to know about wax types, wicks, and selecting premium aromatherapy candles.",
      color: "bg-orange-50 text-orange-900 border-orange-200"
    },
    {
      slug: "reed-diffusers",
      title: "Reed Diffusers",
      description: "Guides on optimizing oil absorption, flipping reeds, and maximizing scent dispersal in large spaces.",
      color: "bg-emerald-50 text-emerald-900 border-emerald-200"
    },
    {
      slug: "car-diffusers",
      title: "Car Diffusers",
      description: "Aesthetic and safe olfactory solutions for hanging diffusers, vent clips, and car wellness scents.",
      color: "bg-blue-50 text-blue-900 border-blue-200"
    },
    {
      slug: "home-decor",
      title: "Home Decor",
      description: "Integrate fragrance vessels into your aesthetic style, layering sensory experiences room by room.",
      color: "bg-stone-50 text-stone-900 border-stone-200"
    },
    {
      slug: "gift-guides",
      title: "Gift Guides",
      description: "Curated home fragrance gift guides for holidays, housewarmings, anniversaries, and personal milestones.",
      color: "bg-rose-50 text-rose-900 border-rose-200"
    },
    {
      slug: "buying-guides",
      title: "Buying Guides",
      description: "Unbiased, detailed comparison guides of luxury scent brands, ingredients, and diffusion devices.",
      color: "bg-purple-50 text-purple-900 border-purple-200"
    },
    {
      slug: "wellness",
      title: "Wellness",
      description: "Discover how olfactory elements impact sleep, stress levels, productivity, and emotional balance.",
      color: "bg-teal-50 text-teal-900 border-teal-200"
    },
    {
      slug: "festival-decoration",
      title: "Festival Decoration",
      description: "Seasonal sentscaping guides to elevate Christmas, Thanksgiving, spring gatherings, and autumn settings.",
      color: "bg-red-50 text-red-900 border-red-200"
    },
    {
      slug: "candle-care",
      title: "Candle Care",
      description: "Master wick trimming, tunneling prevention, soot minimization, and safe container cleaning.",
      color: "bg-yellow-50 text-yellow-900 border-yellow-200"
    },
    {
      slug: "diffuser-care",
      title: "Diffuser Care",
      description: "Techniques for cleaning ultrasonic diffusers, unclogging reeds, and storing essential oils.",
      color: "bg-cyan-50 text-cyan-900 border-cyan-200"
    }
  ],
  navigation: {
    header: [
      { label: "Home", href: "/" },
      { label: "Blog", href: "/blog" },
      { label: "Categories", href: "/categories" },
      { label: "Search", href: "/search" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" }
    ],
    footer: [
      { label: "Home", href: "/" },
      { label: "Blog Archive", href: "/blog" },
      { label: "Categories Index", href: "/categories" },
      { label: "Editorial About Us", href: "/about" },
      { label: "Contact Support", href: "/contact" },
      { label: "HTML Sitemap", href: "/sitemap" }
    ],
    legal: [
      { label: "Privacy Policy", href: "/policies/privacy-policy" },
      { label: "Terms of Service", href: "/policies/terms-of-service" },
      { label: "Disclaimer", href: "/policies/disclaimer" },
      { label: "Cookie Policy", href: "/policies/cookie-policy" },
      { label: "Editorial Policy", href: "/policies/editorial-policy" },
      { label: "Fact Checking Policy", href: "/policies/fact-checking-policy" },
      { label: "Corrections Policy", href: "/policies/corrections-policy" },
      { label: "Accessibility Statement", href: "/policies/accessibility-statement" },
      { label: "Advertising Disclosure", href: "/policies/advertising-disclosure" },
      { label: "Affiliate Disclosure", href: "/policies/affiliate-disclosure" }
    ]
  }
};
