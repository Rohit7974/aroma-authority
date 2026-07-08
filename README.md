# Aroma Authority

A premium, highly optimized blog built with **Next.js 16 (App Router)** and **MDX** focusing on the science, art, and care of luxury home scents (reed diffusers, candles, car diffusers, fragrance families, and aromatherapy).

## 🚀 Features

- **Next.js 16 (App Router)** with TypeScript & Turbopack.
- **Dynamic MDX Blog System** parsing post metadata (using `gray-matter`) and rendering via `next-mdx-remote`.
- **Search Functionality** for real-time article querying.
- **Categorization & Tagging** systems to structure posts dynamically.
- **Automated RSS Feed & Sitemaps** (`sitemap.xml`, `robots.txt`, `feed.xml`) optimized for search engines.
- **Core Editorial Policies** (Fact Checking, Terms of Service, Privacy Policy, Disclaimer, etc.) integrated.
- **Tailored Styling** with modern CSS aesthetics, responsive design, and rich UI elements (bread-crumbs, schema markups, newsletter signup, and interactive cookie banner).

---

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router & Turbopack)
- **Styling**: Tailwind CSS v4
- **Language**: TypeScript
- **Content Format**: MDX
- **Libraries**: `gray-matter`, `next-mdx-remote`, `lucide-react`

---

## ⚙️ Development

First, install dependencies:

```bash
npm install
```

Then, run the local development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## 🏗️ Production Build

To build the project for production, run:

```bash
npm run build
```

This compiles a fully optimized static build of the website under `.next/` or the configured exports.

---

## 🌍 Deployment

This repository is fully optimized to be deployed on **Vercel** with automatic GitHub integration.

### Steps to Deploy:
1. Go to [Vercel](https://vercel.com/new).
2. Connect your GitHub account and import the `aroma-authority` repository.
3. Keep default build configurations (Next.js preset).
4. Click **Deploy**. Vercel will build, optimize, and serve the application globally.
