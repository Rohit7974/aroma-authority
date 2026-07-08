import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, ShieldCheck } from "lucide-react";
import { siteConfig } from "@/config/site";

interface AuthorBoxProps {
  authorSlug: string;
  reviewerSlug?: string;
  publishDate: string;
  lastUpdated?: string;
}

export default function AuthorBox({
  authorSlug,
  reviewerSlug,
  publishDate,
  lastUpdated,
}: AuthorBoxProps) {
  const author = siteConfig.authors[authorSlug];
  const reviewer = reviewerSlug ? siteConfig.authors[reviewerSlug] : null;

  if (!author) return null;

  return (
    <div className="my-8 p-6 bg-white  border border-border/80 rounded-lg luxury-shadow">
      {/* Date metadata display */}
      <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-sans text-muted-light uppercase tracking-widest pb-4 border-b border-border/40">
        <div>
          Published: <span className="text-foreground/80">{publishDate}</span>
        </div>
        {lastUpdated && lastUpdated !== publishDate && (
          <div>
            Updated: <span className="text-foreground/80 font-medium">{lastUpdated}</span>
          </div>
        )}
      </div>

      <div className="mt-6 flex flex-col md:flex-row md:items-start gap-6">
        {/* Author details */}
        <div className="flex-1 flex gap-4">
          <div className="relative w-16 h-16 rounded-full overflow-hidden border border-border shrink-0 bg-stone-100">
            <Image
              src={author.avatar}
              alt={author.name}
              fill
              className="object-cover"
              sizes="64px"
            />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs uppercase tracking-widest text-muted-light font-sans">
                Written By
              </span>
              <CheckCircle2 className="w-3.5 h-3.5 text-accent" aria-hidden="true" />
            </div>
            <Link
              href={`/author/${author.slug}`}
              className="text-base font-serif font-semibold text-foreground hover:text-accent transition-colors"
            >
              {author.name}
            </Link>
            <p className="text-xs text-muted-light font-sans mt-0.5">{author.role}</p>
            <p className="text-sm text-muted  mt-2 leading-relaxed font-sans">
              {author.bio}
            </p>
            {author.credentials && author.credentials.length > 0 && (
              <div className="mt-2.5 flex flex-wrap gap-1.5">
                {author.credentials.slice(0, 2).map((cred, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] font-sans bg-stone-50  text-muted px-2 py-0.5 border border-border/60 rounded-full"
                  >
                    {cred}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Reviewer details if present */}
        {reviewer && (
          <div className="flex-1 flex gap-4 md:border-l md:border-border/60 md:pl-6 pt-6 md:pt-0 border-t border-border/40 md:border-t-0">
            <div className="relative w-16 h-16 rounded-full overflow-hidden border border-border shrink-0 bg-stone-100">
              <Image
                src={reviewer.avatar}
                alt={reviewer.name}
                fill
                className="object-cover"
                sizes="64px"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs uppercase tracking-widest text-muted-light font-sans">
                  Fact Checked By
                </span>
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" aria-hidden="true" />
              </div>
              <Link
                href={`/author/${reviewer.slug}`}
                className="text-base font-serif font-semibold text-foreground hover:text-accent transition-colors"
              >
                {reviewer.name}
              </Link>
              <p className="text-xs text-muted-light font-sans mt-0.5">{reviewer.role}</p>
              <p className="text-sm text-muted  mt-2 leading-relaxed font-sans">
                {reviewer.bio}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
