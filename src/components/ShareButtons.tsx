"use client";

import { useState } from "react";
import { Twitter, Facebook, Link as LinkIcon, Check, HelpCircle } from "lucide-react";

interface ShareButtonsProps {
  title: string;
  slug: string;
}

export default function ShareButtons({ title, slug }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const shareUrl = typeof window !== "undefined" ? window.location.href : `/blog/${slug}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  };

  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(shareUrl);

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-6 border-y border-border/60">
      <span className="text-xs uppercase tracking-widest text-muted-light font-sans font-semibold">
        Share this article
      </span>
      <div className="flex items-center gap-2">
        {/* Twitter */}
        <a
          href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on Twitter"
          className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted hover:text-accent hover:border-accent focus:outline-none focus:ring-2 focus:ring-accent transition-all"
        >
          <Twitter className="w-4 h-4" />
        </a>

        {/* Facebook */}
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on Facebook"
          className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted hover:text-accent hover:border-accent focus:outline-none focus:ring-2 focus:ring-accent transition-all"
        >
          <Facebook className="w-4 h-4" />
        </a>

        {/* Pinterest */}
        <a
          href={`https://pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodedTitle}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on Pinterest"
          className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted hover:text-accent hover:border-accent focus:outline-none focus:ring-2 focus:ring-accent transition-all"
        >
          {/* Custom elegant pin icon */}
          <span className="text-xs font-serif font-semibold">P</span>
        </a>

        {/* Copy Link */}
        <button
          onClick={handleCopy}
          aria-label="Copy article link to clipboard"
          className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted hover:text-accent hover:border-accent focus:outline-none focus:ring-2 focus:ring-accent transition-all relative"
        >
          {copied ? (
            <Check className="w-4 h-4 text-emerald-600 animate-in zoom-in duration-200" />
          ) : (
            <LinkIcon className="w-4 h-4" />
          )}

          {copied && (
            <span
              role="alert"
              className="absolute -top-10 left-1/2 -translate-x-1/2 bg-stone-900 text-white text-[10px] font-sans px-2 py-1 rounded shadow-md whitespace-nowrap animate-in fade-in slide-in-from-bottom-2 duration-200"
            >
              Link Copied!
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
