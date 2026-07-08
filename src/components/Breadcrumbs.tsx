import Link from "next/link";
import SchemaMarkup from "./SchemaMarkup";

interface BreadcrumbsProps {
  items: {
    name: string;
    item: string; // Href link
  }[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  // Always prepend Home to the crumbs for validation and user safety
  const allItems = [{ name: "Home", item: "/" }, ...items];

  return (
    <nav
      aria-label="Breadcrumb"
      className="py-3 px-1 text-xs font-sans uppercase tracking-widest text-muted-light select-none"
    >
      <ol className="flex flex-wrap items-center space-x-2">
        {allItems.map((item, idx) => {
          const isLast = idx === allItems.length - 1;

          return (
            <li key={idx} className="flex items-center space-x-2">
              {idx > 0 && <span className="text-[10px] text-border font-serif">/</span>}
              {isLast ? (
                <span
                  aria-current="page"
                  className="text-foreground/80 font-medium truncate max-w-[200px]"
                >
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.item}
                  className="hover:text-accent focus:outline-none focus:underline transition-colors"
                >
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>

      {/* Structured dynamic schema injector */}
      <SchemaMarkup type="BreadcrumbList" breadcrumbs={allItems} />
    </nav>
  );
}
