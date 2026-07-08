"use client";

import { useState } from "react";
import { Mail, CheckCircle, ArrowRight } from "lucide-react";

export default function NewsletterBox() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    // Simple email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setStatus("loading");

    // Mock API request for subscription tracking
    try {
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setStatus("success");
      setEmail("");
    } catch (err) {
      console.error(err);
      setStatus("error");
      setErrorMessage("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <section
      aria-labelledby="newsletter-heading"
      className="p-8 md:p-12 bg-stone-50  border border-border rounded-xl text-center max-w-3xl mx-auto my-12 luxury-shadow"
    >
      <div className="max-w-xl mx-auto">
        <span className="text-xs uppercase tracking-widest text-accent font-sans font-semibold mb-2 block">
          Editorial Newsletter
        </span>
        <h2
          id="newsletter-heading"
          className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-3 leading-tight"
        >
          Join Our Olfactory Circle
        </h2>
        <p className="text-sm text-muted  mb-8 leading-relaxed font-sans">
          Subscribe to receive our latest scientific guides, candle care tutorials, fragrance family analyses, and exclusive buying discounts. No spam, unsubscribe anytime.
        </p>

        {status === "success" ? (
          <div className="flex flex-col items-center justify-center p-4 bg-emerald-50  border border-emerald-200/80 rounded-lg animate-in zoom-in duration-300">
            <CheckCircle className="w-8 h-8 text-emerald-600 mb-2" />
            <span className="text-sm font-sans font-semibold text-emerald-800 ">
              Subscription Successful!
            </span>
            <p className="text-xs text-emerald-700/80  mt-1">
              Thank you for subscribing. Please check your inbox to confirm your membership.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full">
            <div className="relative flex-1">
              <label htmlFor="newsletter-email" className="sr-only">
                Email Address
              </label>
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted-light">
                <Mail className="w-4 h-4" />
              </div>
              <input
                id="newsletter-email"
                type="email"
                required
                disabled={status === "loading"}
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === "error") setStatus("idle");
                }}
                className="w-full pl-10 pr-4 py-3 bg-white  border border-border focus:border-accent focus:ring-2 focus:ring-accent/20 rounded text-sm text-foreground placeholder:text-muted-light/60 transition outline-none disabled:opacity-60"
              />
            </div>
            <button
              type="submit"
              disabled={status === "loading"}
              className="sm:w-auto w-full px-8 py-3 bg-accent hover:bg-accent-hover text-white text-xs font-sans uppercase tracking-widest font-semibold rounded focus:outline-none focus:ring-2 focus:ring-accent transition flex items-center justify-center gap-2 group disabled:opacity-60"
            >
              {status === "loading" ? "Subscribing..." : "Subscribe"}
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        )}

        {status === "error" && (
          <p className="text-xs text-red-600  text-left mt-2.5 ml-1 animate-in fade-in duration-200">
            {errorMessage}
          </p>
        )}
      </div>
    </section>
  );
}
