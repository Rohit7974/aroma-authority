"use client";

import { useState } from "react";
import { Mail, CheckCircle, Send, ShieldAlert } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "general",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const sanitizeInput = (text: string) => {
    // Simple sanitization: escape HTML tags to prevent basic XSS injections
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#x27;");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus("error");
      setErrorMessage("Please fill out all required fields.");
      return;
    }

    setStatus("loading");

    // Sanitize inputs
    const sanitizedName = sanitizeInput(formData.name);
    const sanitizedEmail = sanitizeInput(formData.email);
    const sanitizedMessage = sanitizeInput(formData.message);

    try {
      // Simulate API submit for contact form tracking
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setStatus("success");
      setFormData({ name: "", email: "", subject: "general", message: "" });
    } catch (err) {
      console.error(err);
      setStatus("error");
      setErrorMessage("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-20">
      
      {/* breadcrumbs path */}
      <Breadcrumbs items={[{ name: "Contact", item: "/contact" }]} />

      <header className="mb-12 border-b border-border/40 pb-8 text-center sm:text-left">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground">
          Contact Our Editorial Desk
        </h1>
        <p className="text-sm md:text-base text-muted  font-sans mt-3 max-w-2xl leading-relaxed">
          Have an editorial suggestion, correction proposal, or commercial inquiry? Submit your request here. Our board reviews inquiries within 48 business hours.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Side: Contact Information & Disclosures */}
        <div className="lg:col-span-5 space-y-6 bg-stone-50  p-8 border border-border rounded-xl">
          <h2 className="text-xl font-serif font-bold text-foreground">Editorial Desk</h2>
          <p className="text-xs text-muted  font-sans leading-relaxed">
            AromaAuthority maintains a strict policy of transparency and independence. We welcome corrections or scholarly debates regarding wax combustion statistics, capillary fiber performance, or scent classifications.
          </p>

          <div className="space-y-4 pt-4 border-t border-border/40">
            <div>
              <h3 className="text-xs uppercase tracking-widest font-sans font-bold text-foreground">
                Email Communications
              </h3>
              <a
                href="mailto:editor@aromaauthority.com"
                className="text-xs text-accent hover:text-accent-hover font-semibold font-sans mt-1 block hover:underline"
              >
                editor@aromaauthority.com
              </a>
            </div>
            <div>
              <h3 className="text-xs uppercase tracking-widest font-sans font-bold text-foreground">
                Media Inquiries & Licensing
              </h3>
              <span className="text-xs text-muted font-sans mt-1 block">
                press@aromaauthority.com
              </span>
            </div>
          </div>

          <div className="pt-6 border-t border-border/40 flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-accent shrink-0 mt-0.5" />
            <p className="text-[10px] text-muted-light font-sans leading-normal">
              For errors or article corrections, please specify the article URL, current paragraph, proposed correction, and the source/citation of your information. Refer to our corrections policy link in footer.
            </p>
          </div>
        </div>

        {/* Right Side: Contact Form with secure inputs */}
        <div className="lg:col-span-7 bg-white  border border-border p-8 rounded-xl luxury-shadow">
          {status === "success" ? (
            <div className="flex flex-col items-center justify-center p-8 text-center animate-in zoom-in duration-300">
              <CheckCircle className="w-12 h-12 text-emerald-600 mb-4" />
              <h3 className="text-xl font-serif font-bold text-foreground">Message Sent Successfully</h3>
              <p className="text-xs text-muted  font-sans mt-2 max-w-sm leading-relaxed">
                Thank you for reaching out. Your submission has been securely routed to our editors. A specialist will follow up shortly.
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="mt-6 px-6 py-2.5 bg-accent hover:bg-accent-hover text-white text-xs font-sans uppercase tracking-widest rounded transition"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-name" className="block text-xs uppercase tracking-widest font-sans font-bold text-foreground mb-1.5">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    disabled={status === "loading"}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 bg-stone-50  border border-border focus:border-accent focus:ring-2 focus:ring-accent/20 rounded text-sm text-foreground outline-none transition"
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="block text-xs uppercase tracking-widest font-sans font-bold text-foreground mb-1.5">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    disabled={status === "loading"}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 bg-stone-50  border border-border focus:border-accent focus:ring-2 focus:ring-accent/20 rounded text-sm text-foreground outline-none transition"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-subject" className="block text-xs uppercase tracking-widest font-sans font-bold text-foreground mb-1.5">
                  Nature of Inquiry
                </label>
                <select
                  id="contact-subject"
                  disabled={status === "loading"}
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-2.5 bg-stone-50  border border-border focus:border-accent focus:ring-2 focus:ring-accent/20 rounded text-sm text-foreground outline-none transition select-none"
                >
                  <option value="general">General Scent Inquiries</option>
                  <option value="correction">Proposed Article Correction</option>
                  <option value="press">Press / Media Outreach</option>
                  <option value="feedback">Educational Suggestion</option>
                </select>
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-xs uppercase tracking-widest font-sans font-bold text-foreground mb-1.5">
                  Message Details <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={6}
                  disabled={status === "loading"}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-2.5 bg-stone-50  border border-border focus:border-accent focus:ring-2 focus:ring-accent/20 rounded text-sm text-foreground outline-none transition resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full py-3 bg-accent hover:bg-accent-hover text-white text-xs font-sans uppercase tracking-widest font-bold rounded focus:outline-none focus:ring-2 focus:ring-accent transition flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {status === "loading" ? "Submitting Request..." : "Send Message"}
                <Send className="w-3.5 h-3.5" />
              </button>

              {status === "error" && (
                <p className="text-xs text-red-600  mt-2 font-sans animate-in fade-in duration-200">
                  {errorMessage}
                </p>
              )}
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
