"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, X, Search } from "lucide-react";
import { siteConfig } from "@/config/site";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();

  // Scroll observer to add blur backing on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setMobileMenuOpen(false);
    }
  };

  return (
    <>
      {/* Skip Navigation Link for WCAG Accessibility */}
      <a href="#main-content" className="skip-link font-sans text-xs uppercase tracking-widest font-semibold">
        Skip to Content
      </a>

      <header
        className={`sticky top-0 z-40 w-full border-b border-border/40 transition-all duration-300 ${
          isScrolled
            ? "bg-white/80 dark:bg-stone-900/80 backdrop-blur-md luxury-shadow py-3"
            : "bg-white/60 dark:bg-stone-900/60 backdrop-blur-sm py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          
          {/* Logo brand styling */}
          <Link
            href="/"
            className="text-lg md:text-xl font-serif font-bold tracking-[0.2em] text-foreground hover:text-accent focus:outline-none focus:ring-2 focus:ring-accent rounded px-1 transition-colors"
          >
            {siteConfig.logoText}
          </Link>

          {/* Desktop Navigation Link items */}
          <nav aria-label="Main Navigation" className="hidden md:flex items-center space-x-8">
            {siteConfig.navigation.header.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-xs uppercase tracking-widest font-sans font-semibold text-muted hover:text-accent focus:outline-none focus:underline decoration-accent decoration-2 underline-offset-4 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right utility items: search form & mobile menu */}
          <div className="flex items-center gap-4">
            
            {/* Inline search bar (Desktop) */}
            <form onSubmit={handleSearchSubmit} className="hidden sm:flex items-center relative">
              <label htmlFor="header-search" className="sr-only">
                Search site
              </label>
              <input
                id="header-search"
                type="search"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-48 xl:w-56 pl-3 pr-8 py-1.5 bg-stone-50 dark:bg-stone-950 border border-border focus:border-accent focus:ring-1 focus:ring-accent/40 rounded text-xs text-foreground placeholder:text-muted-light/60 transition outline-none"
              />
              <button
                type="submit"
                aria-label="Submit Search"
                className="absolute right-2 text-muted hover:text-accent focus:outline-none focus:ring-1 focus:ring-accent rounded p-0.5"
              >
                <Search className="w-3.5 h-3.5" />
              </button>
            </form>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              className="md:hidden p-1.5 border border-border hover:border-accent rounded text-muted hover:text-accent focus:outline-none focus:ring-2 focus:ring-accent transition"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div
            id="mobile-nav"
            className="md:hidden border-t border-border/40 bg-white dark:bg-stone-900 w-full py-4 px-4 sm:px-6 flex flex-col space-y-4 animate-in slide-in-from-top-4 duration-300"
          >
            {/* Search form for Mobile */}
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <label htmlFor="mobile-search" className="sr-only">
                Search site
              </label>
              <input
                id="mobile-search"
                type="search"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-3 pr-10 py-2.5 bg-stone-50 dark:bg-stone-950 border border-border focus:border-accent focus:ring-1 focus:ring-accent/40 rounded text-sm text-foreground outline-none"
              />
              <button
                type="submit"
                aria-label="Submit Mobile Search"
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted hover:text-accent p-1"
              >
                <Search className="w-4 h-4" />
              </button>
            </form>

            {/* Navigation links for Mobile */}
            <nav className="flex flex-col space-y-3 pl-1">
              {siteConfig.navigation.header.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm uppercase tracking-widest font-sans font-semibold text-muted hover:text-accent focus:outline-none focus:ring-1 focus:ring-accent rounded py-1 transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
