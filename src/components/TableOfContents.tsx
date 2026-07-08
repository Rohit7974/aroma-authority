"use client";

import { useEffect, useState } from "react";
import { Heading } from "@/lib/blog";

interface TableOfContentsProps {
  headings: Heading[];
}

export default function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    if (headings.length === 0) return;

    // Monitor headings visibility on the screen
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);
        if (visibleEntries.length > 0) {
          // Set active to the top visible heading
          setActiveId(visibleEntries[0].target.id);
        }
      },
      {
        rootMargin: "-80px 0px -60% 0px", // Trigger when headings are in reading zone
        threshold: 0.1,
      }
    );

    headings.forEach((heading) => {
      const el = document.getElementById(heading.id);
      if (el) observer.observe(el);
    });

    return () => {
      headings.forEach((heading) => {
        const el = document.getElementById(heading.id);
        if (el) observer.unobserve(el);
      });
    };
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav
      aria-label="Table of Contents"
      className="p-6 bg-white  border border-border/80 rounded-lg luxury-shadow sticky top-28"
    >
      <h2 className="text-xs uppercase tracking-widest font-sans font-semibold text-muted-light mb-4 border-b border-border/60 pb-2">
        Table of Contents
      </h2>
      <ul className="space-y-3">
        {headings.map((heading) => {
          const indent = heading.level === 3 ? "pl-4" : heading.level === 4 ? "pl-8" : "";
          const isActive = activeId === heading.id;

          return (
            <li key={heading.id} className={`${indent}`}>
              <a
                href={`#${heading.id}`}
                className={`block text-sm font-serif leading-tight transition-colors duration-200 border-l-2 pl-3 -ml-0.5 focus:outline-none focus:ring-1 focus:ring-accent ${
                  isActive
                    ? "text-accent border-accent font-medium"
                    : "text-muted hover:text-foreground border-transparent"
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(heading.id)?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                  // Push URL update without full reload
                  window.history.pushState(null, "", `#${heading.id}`);
                  setActiveId(heading.id);
                }}
              >
                {heading.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
