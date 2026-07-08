import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import { siteConfig } from "@/config/site";

export default function PoliciesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-20">
      
      {/* Dynamic breadcrumb trail */}
      <Breadcrumbs items={[{ name: "Policies", item: "/policies/privacy-policy" }]} />
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-6">
        
        {/* Sticky sidebar listing all 10 legal links */}
        <aside className="lg:col-span-4">
          <nav
            aria-label="Policies Directory"
            className="p-6 bg-stone-50 dark:bg-stone-900/30 border border-border/60 rounded-lg sticky top-28 space-y-4"
          >
            <h2 className="text-xs uppercase tracking-widest font-sans font-bold text-foreground border-b border-border/40 pb-2">
              Legal & Standards
            </h2>
            <ul className="space-y-3.5">
              {siteConfig.navigation.legal.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block text-xs uppercase tracking-widest font-sans font-semibold text-muted hover:text-accent focus:outline-none transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Policy document viewport */}
        <div className="lg:col-span-8 bg-white dark:bg-stone-900 border border-border rounded-lg p-6 md:p-12 luxury-shadow">
          <article className="prose max-w-none prose-stone dark:prose-invert font-sans text-sm text-muted dark:text-stone-300 space-y-6">
            {children}
          </article>
        </div>

      </div>
    </div>
  );
}
