import { siteConfig } from "@/config/site";

interface AdSlotProps {
  id: string; // Dynamic ID for target script identification
  format?: "auto" | "rectangle" | "horizontal" | "vertical";
  className?: string;
}

export default function AdSlot({ id, format = "auto", className = "" }: AdSlotProps) {
  // If ads are disabled globally in configuration, render nothing
  if (!siteConfig.adSenseEnabled) return null;

  // Map format to height metrics to enforce strict CLS-prevention limits
  let heightClass = "min-h-[280px]";
  let widthClass = "w-full";
  let label = "Responsive Banner Ad";

  if (format === "horizontal") {
    heightClass = "min-h-[90px] md:min-h-[100px]";
    label = "Leaderboard Banner (728x90)";
  } else if (format === "vertical") {
    heightClass = "min-h-[600px]";
    widthClass = "w-full max-w-[300px] mx-auto";
    label = "Skyscraper Ad (300x600)";
  } else if (format === "rectangle") {
    heightClass = "min-h-[250px] md:min-h-[280px]";
    widthClass = "w-full max-w-[336px] mx-auto";
    label = "Medium Rectangle (300x250)";
  }

  return (
    <div
      className={`relative my-8 border border-border/40 bg-stone-50/50 dark:bg-stone-900/30 rounded flex flex-col items-center justify-center overflow-hidden transition-all duration-300 ${heightClass} ${widthClass} ${className}`}
      data-ad-slot-container={id}
    >
      {/* Background visual styling showing luxury minimal container */}
      <span className="absolute top-2 left-3 text-[10px] uppercase tracking-widest text-muted-light font-sans select-none">
        Advertisement
      </span>

      {/* Structured placeholder to reserve space and show aesthetic indicator */}
      <div className="flex flex-col items-center space-y-2 pointer-events-none">
        <div className="w-8 h-8 rounded-full border border-dashed border-accent/40 animate-pulse flex items-center justify-center">
          <span className="text-[10px] text-accent font-serif">A</span>
        </div>
        <span className="text-[10px] font-sans text-muted-light/60 uppercase tracking-wider">
          {label}
        </span>
      </div>

      {/* Standard Google AdSense script loader wrapper */}
      {/* In production, this div gets populated by adsbygoogle script */}
      <ins
        className="adsbygoogle"
        style={{ display: "block", minHeight: "100%", width: "100%" }}
        data-ad-client={siteConfig.adSensePublisherId}
        data-ad-slot={id}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
