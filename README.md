<<<<<<< HEAD
# Pune Property Investors - Next.js App Router Platform

A modern, production-grade real estate platform built with **Next.js (App Router)**, **React 19**, **TypeScript**, and **Tailwind CSS**. Migrated from Vite + React to Next.js while preserving 100% of the ultra-premium branding, design system, business logic, and property catalog.

---

## 🏗️ Architecture & Technology Stack

- **Framework**: Next.js 16+ (App Router with Turbopack)
- **UI Library**: React 19 + TypeScript
- **Styling**: Tailwind CSS & Modular CSS variables (`ivory`, `forest-green`, and `gold` luxury color palette)
- **Icons**: Lucide React & React Icons
- **SEO & Social Sharing**: Dynamic metadata, OpenGraph tags, JSON-LD Real Estate structured data, `robots.txt`, and automated `sitemap.xml`
- **Rendering Strategy**:
  - **Server Components by default** for optimal TTFB, zero bundle bloat, and maximum SEO crawlability.
  - **Client Components** exclusively where stateful interactivity is required (search filters, lightbox gallery, enquiry drawer, mobile navigation).
  - **Static Site Generation (SSG)** with `generateStaticParams` for high-speed delivery of property listings and project showcases.

---

## 📂 Project Directory Structure

```text
Pune_Property_Investors_Frontend/
├── public/
│   ├── images/
│   │   └── logo.jpg               # PPI brand logo
│   ├── favicon.svg                # Favicon
│   └── hero.png                   # Hero background asset
├── src/
│   ├── app/
│   │   ├── layout.tsx             # Root Layout with SEO metadata & Inter font
│   │   ├── page.tsx               # Homepage
│   │   ├── globals.css            # Central design tokens & component stylesheets
│   │   ├── buy/page.tsx           # Property search & listing catalog
│   │   ├── properties/
│   │   │   ├── page.tsx           # Search/listing route
│   │   │   └── [slug]/page.tsx    # SSG/Dynamic project details page
│   │   ├── property/
│   │   │   └── [id]/page.tsx      # SSG/Dynamic property details page
│   │   ├── search/page.tsx        # Search query parameter redirector
│   │   ├── about/page.tsx         # Company mission, story, verified advisory
│   │   ├── contact/page.tsx       # Lead forms & WhatsApp advisor connection
│   │   ├── projects/page.tsx      # New residential townships & launches
│   │   ├── commercial/page.tsx    # Commercial office spaces & IT parks
│   │   ├── plots/page.tsx         # Clear-title residential & NA plots
│   │   ├── investment/page.tsx    # High-yield real estate investment advisory
│   │   ├── blog/
│   │   │   ├── page.tsx           # Real estate insights & buying guides
│   │   │   └── [...slug]/page.tsx # Dynamic blog topic pages
│   │   ├── news/
│   │   │   ├── page.tsx           # Pune infrastructure & market updates
│   │   │   └── [...slug]/page.tsx # Dynamic news pages
│   │   ├── career/page.tsx        # Careers & recruitment
│   │   ├── privacy-policy/        # Legal compliance
│   │   ├── terms-and-conditions/  # Advisory terms
│   │   ├── not-found.tsx          # Custom 404 error page
│   │   ├── sitemap.ts             # Dynamic XML sitemap
│   │   └── robots.ts              # Search engine robots configuration
│   ├── components/
│   │   ├── layouts/               # Header & Footer
│   │   ├── home/                  # HeroSection, FeaturedProperties, Locations, Launches, Trending
│   │   ├── properties/            # PropertyCard, PropertyFilters, PropertyListingCard
│   │   ├── property-details/      # PropertyGallery, Overview, Amenities, Enquiry
│   │   ├── common/                # AdvertisementSidebar, PlaceholderPage
│   │   └── pages/                 # Full page view components
│   ├── data/                      # Property listings, projects, and localities mock datasets
│   └── styles/                    # Global typography, responsive, and variable design tokens
├── next.config.mjs                # Next.js config (remote image domains & Turbopack settings)
├── postcss.config.mjs             # Tailwind CSS & PostCSS config
├── tsconfig.json                  # Strict TypeScript compiler options
├── .env.example                   # Environment configuration template
└── package.json                   # Project scripts and dependencies
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js `20.x` or higher (tested with Node `v24.20.0`)
- npm `10.x` or higher

### Installation

```bash
# Clone or navigate into the repository
cd Pune_Property_Investors_Frontend

# Install dependencies
npm install
```

### Development Server

Start the local Next.js development server with Turbopack:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔨 Production Build & Testing

To compile and validate the production build:

```bash
# Build the optimized production bundle
npm run build

# Start the production server
npm run start
```

---

## 🌐 SEO & Social Sharing Features

- **Dynamic Metadata**: Every route includes custom titles, descriptions, canonical URLs, and OpenGraph images.
- **Search Engine Optimization**: Automatically serves `/sitemap.xml` and `/robots.txt`.
- **Structured Data**: Injects Schema.org `RealEstateListing` JSON-LD on property and project detail pages for rich search engine snippets.
- **WhatsApp & Telephony Integration**: Direct WhatsApp lead integration pre-filling property name and user requirements (`+91 73981 74444`).

---

## 🚢 Deployment Guide

### Vercel / Standard Node.js Hosting (Recommended)
1. Push repository to GitHub/GitLab.
2. Import project into Vercel or deploy using `next start` on a Docker/Node VPS.
3. Next.js will auto-detect the App Router configuration without extra setup.

### Static Export (GitHub Pages)
If deploying as a purely static site:
1. In `next.config.mjs`, add `output: 'export'`.
2. Run `npm run build` to generate the static files inside the `out/` folder.
3. Note that dynamic server-side redirects should be configured using standard static HTML meta redirects or client routing.
=======
# Pune_Property_Investors_
>>>>>>> f5cca45c896b709ce6db1e2db2df2de2af146c67
