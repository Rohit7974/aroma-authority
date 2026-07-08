import Link from "next/link";
import { siteConfig } from "@/config/site";
import SchemaMarkup from "./SchemaMarkup";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-stone-100  border-t border-border/80 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 pb-12 border-b border-border/60">
          
          {/* Slogan and Brand Column */}
          <div className="md:col-span-1 space-y-4">
            <Link
              href="/"
              className="text-base font-serif font-bold tracking-[0.2em] text-foreground hover:text-accent transition-colors"
            >
              {siteConfig.logoText}
            </Link>
            <p className="text-xs text-muted  font-sans leading-relaxed">
              {siteConfig.description}
            </p>
            <div className="text-[10px] text-muted-light font-sans uppercase tracking-widest leading-relaxed">
              <span>{siteConfig.slogan}</span>
            </div>
          </div>

          {/* Site Navigation Links Column */}
          <div>
            <h3 className="text-xs uppercase tracking-widest font-sans font-bold text-foreground mb-4">
              Explore
            </h3>
            <ul className="space-y-2.5">
              {siteConfig.navigation.footer.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-xs text-muted hover:text-accent focus:outline-none focus:underline font-sans transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories Grid Column */}
          <div>
            <h3 className="text-xs uppercase tracking-widest font-sans font-bold text-foreground mb-4">
              Core Categories
            </h3>
            <ul className="space-y-2.5">
              {siteConfig.categories.slice(0, 5).map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/categories/${cat.slug}`}
                    className="text-xs text-muted hover:text-accent focus:outline-none focus:underline font-sans transition-colors"
                  >
                    {cat.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/categories"
                  className="text-xs text-accent hover:text-accent-hover font-sans font-semibold uppercase tracking-wider transition-colors"
                >
                  View All Categories →
                </Link>
              </li>
            </ul>
          </div>

          {/* Socials & Contact Column */}
          <div className="space-y-4">
            <h3 className="text-xs uppercase tracking-widest font-sans font-bold text-foreground mb-4">
              Editorial Contact
            </h3>
            <p className="text-xs text-muted font-sans">
              Have inquiries, corrections, or fact-checking feedback?
            </p>
            <a
              href={`mailto:${siteConfig.contactEmail}`}
              className="text-xs text-accent hover:text-accent-hover focus:outline-none underline font-sans transition-colors block"
            >
              {siteConfig.contactEmail}
            </a>
            
            {/* Social SVGs */}
            <div className="flex items-center gap-4 pt-2">
              <a
                href="https://twitter.com/aromaauthority"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow AromaAuthority on Twitter (opens in a new tab)"
                className="text-muted hover:text-accent focus:outline-none focus:ring-1 focus:ring-accent rounded p-0.5 transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://pinterest.com/aromaauthority"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow AromaAuthority on Pinterest (opens in a new tab)"
                className="text-muted hover:text-accent focus:outline-none focus:ring-1 focus:ring-accent rounded p-0.5 transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 0 5.397 0 12.017c0 5.078 3.158 9.422 7.64 11.16-.104-.945-.197-2.39.041-3.424.213-.933 1.377-5.83 1.377-5.83s-.351-.703-.351-1.745c0-1.635.949-2.855 2.128-2.855 1.004 0 1.488.754 1.488 1.657 0 1.008-.643 2.518-.973 3.915-.278 1.173.585 2.13 1.74 2.13 2.09 0 3.69-2.203 3.69-5.385 0-2.818-2.025-4.786-4.914-4.786-3.35 0-5.314 2.512-5.314 5.107 0 1.012.39 2.1 1.036 2.812.113.136.13.254.095.397-.104.433-.338 1.38-.383 1.57-.06.25-.19.3-.438.188-1.637-.762-2.66-3.157-2.66-5.08 0-4.135 3.003-7.935 8.663-7.935 4.548 0 8.082 3.24 8.082 7.57 0 4.52-2.85 8.16-6.804 8.16-1.328 0-2.58-.69-3.008-1.5l-.82 3.125c-.297 1.135-1.102 2.556-1.642 3.435 1.124.348 2.317.536 3.555.536 6.62 0 12.017-5.397 12.017-12.017C24.017 5.397 18.637 0 12.017 0z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Legal disclosures & compliance pages link directory */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-wrap justify-center md:justify-start gap-x-4 gap-y-2 max-w-4xl">
            {siteConfig.navigation.legal.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[10px] uppercase tracking-widest font-sans text-muted-light hover:text-accent focus:outline-none focus:underline transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="text-[10px] font-sans text-muted-light uppercase tracking-widest shrink-0 text-center md:text-right">
            © {currentYear} {siteConfig.name}. All rights reserved.
          </div>
        </div>
      </div>

      {/* Structured Organization Schema Injection */}
      <SchemaMarkup type="Organization" />
    </footer>
  );
}
