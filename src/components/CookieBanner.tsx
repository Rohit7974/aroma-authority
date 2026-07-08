"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if user has already made a selection
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) {
      setShowBanner(true);
    } else if (consent === "granted") {
      // Re-trigger consent settings for third-party scripts if needed
      window.gtag?.("consent", "update", {
        analytics_storage: "granted",
      });
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie_consent", "granted");
    setShowBanner(false);
    
    // Update Google Analytics consent mode
    if (window.gtag) {
      window.gtag("consent", "update", {
        analytics_storage: "granted",
      });
    }
  };

  const handleDecline = () => {
    localStorage.setItem("cookie_consent", "denied");
    setShowBanner(false);
    
    // Maintain denied state
    if (window.gtag) {
      window.gtag("consent", "update", {
        analytics_storage: "denied",
      });
    }
  };

  if (!showBanner) return null;

  return (
    <div
      role="region"
      aria-label="Cookie Consent Banner"
      className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 bg-white  border-t border-border/80 luxury-shadow flex flex-col md:flex-row items-center justify-between gap-4 animate-in fade-in slide-in-from-bottom-5 duration-300"
    >
      <div className="flex-1 text-sm text-muted ">
        <p className="leading-relaxed">
          We use cookies to analyze site traffic, personalize content, and support our advertising partners to enhance your browsing experience. Read our{" "}
          <Link
            href="/policies/cookie-policy"
            className="text-accent underline hover:text-accent-hover focus:outline-none focus:ring-1 focus:ring-accent"
          >
            Cookie Policy
          </Link>{" "}
          and{" "}
          <Link
            href="/policies/privacy-policy"
            className="text-accent underline hover:text-accent-hover focus:outline-none focus:ring-1 focus:ring-accent"
          >
            Privacy Policy
          </Link>{" "}
          to learn more.
        </p>
      </div>
      <div className="flex items-center gap-3 w-full md:w-auto justify-end">
        <button
          onClick={handleDecline}
          className="px-4 py-2 text-xs font-sans uppercase tracking-widest text-muted hover:text-foreground border border-border rounded focus:outline-none focus:ring-2 focus:ring-accent transition"
        >
          Decline
        </button>
        <button
          onClick={handleAccept}
          className="px-6 py-2 text-xs font-sans uppercase tracking-widest text-white bg-accent hover:bg-accent-hover rounded focus:outline-none focus:ring-2 focus:ring-accent transition"
        >
          Accept All
        </button>
      </div>
    </div>
  );
}

// Add TypeScript definition for window.gtag
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}
