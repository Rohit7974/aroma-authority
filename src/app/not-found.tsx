import Link from "next/link";
import { Compass, Search, Home, BookOpen } from "lucide-react";

export default function NotFound() {
  return (
    <div className="max-w-xl mx-auto px-4 py-20 md:py-32 text-center space-y-8 animate-in fade-in duration-300">
      
      {/* Visual icon */}
      <div className="w-16 h-16 rounded-full bg-accent/10 text-accent flex items-center justify-center mx-auto mb-4 font-serif text-2xl font-bold">
        404
      </div>

      <div className="space-y-3">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
          Scent Pathway Lost
        </h1>
        <p className="text-sm text-muted dark:text-stone-300 font-sans leading-relaxed">
          The educational guide or page you are looking for has been moved, renamed, or is temporarily offline. Let us guide you back to our scent registry.
        </p>
      </div>

      {/* Structured suggestions */}
      <div className="grid grid-cols-2 gap-3 text-left">
        <Link
          href="/"
          className="p-4 border border-border/60 hover:border-accent rounded bg-white dark:bg-stone-900 flex items-center gap-3 text-xs uppercase tracking-widest font-sans font-semibold text-muted hover:text-foreground transition-all"
        >
          <Home className="w-4 h-4 text-accent shrink-0" />
          <span>Home</span>
        </Link>
        <Link
          href="/blog"
          className="p-4 border border-border/60 hover:border-accent rounded bg-white dark:bg-stone-900 flex items-center gap-3 text-xs uppercase tracking-widest font-sans font-semibold text-muted hover:text-foreground transition-all"
        >
          <BookOpen className="w-4 h-4 text-accent shrink-0" />
          <span>Scent Library</span>
        </Link>
        <Link
          href="/categories"
          className="p-4 border border-border/60 hover:border-accent rounded bg-white dark:bg-stone-900 flex items-center gap-3 text-xs uppercase tracking-widest font-sans font-semibold text-muted hover:text-foreground transition-all"
        >
          <Compass className="w-4 h-4 text-accent shrink-0" />
          <span>Categories</span>
        </Link>
        <Link
          href="/search"
          className="p-4 border border-border/60 hover:border-accent rounded bg-white dark:bg-stone-900 flex items-center gap-3 text-xs uppercase tracking-widest font-sans font-semibold text-muted hover:text-foreground transition-all"
        >
          <Search className="w-4 h-4 text-accent shrink-0" />
          <span>Search</span>
        </Link>
      </div>

      <div className="pt-4 border-t border-border/40 text-xs text-muted-light font-sans">
        AromaAuthority — The Science of Luxury Scents
      </div>
    </div>
  );
}
