# Pune Property Investors — Tech Stack, Dependencies & System Requirements

This document provides a comprehensive breakdown of the technology stack, all installed dependencies, runtime and system prerequisites, environment configurations, and operational requirements for the **Pune Property Investors** production real estate web platform.

---

## 1. Complete Technology Stack

| Layer | Technology | Version | Purpose & Rationale |
| :--- | :--- | :--- | :--- |
| **Framework** | [Next.js](https://nextjs.org/) | `^16.4.3` | React production framework utilizing App Router, Server Components, and Turbopack for rapid compilation and high SEO visibility. |
| **Core UI Library** | [React](https://react.dev/) | `^19.3.1` | Declarative, component-based user interface engine. |
| **DOM Renderer** | [React DOM](https://react.dev/reference/react-dom) | `^19.3.1` | DOM-specific methods for React 19 concurrent features. |
| **Programming Language**| [TypeScript](https://www.typescriptlang.org/) | `^5.3.3` | Statically typed JavaScript with strict compiler settings, path mapping (`@/*`), and IntelliSense. |
| **CSS Framework** | [Tailwind CSS](https://tailwindcss.com/) | `^4.3.3` | Utility-first styling engine operating alongside custom CSS design tokens. |
| **PostCSS Processor** | [PostCSS](https://postcss.org/) | `^8.5.32` | Tool for transforming styles with JS plugins. |
| **Tailwind PostCSS Plugin** | [@tailwindcss/postcss](https://www.npmjs.com/package/@tailwindcss/postcss) | `^4.3.3` | Bundler plugin for Tailwind v4 engine integration. |
| **CSS Vendor Prefixing**| [Autoprefixer](https://github.com/postcss/autoprefixer) | `^10.6.2` | Automatically adds vendor prefixes to CSS rules for legacy browser compatibility. |
| **Icon Libraries** | [Lucide React](https://lucide.dev/) | `^1.61.0` | Crisp, accessible SVG icons (property specifications, amenities, navigation). |
| | [React Icons](https://react-icons.github.io/react-icons/) | `^5.7.0` | Brand social icons (Facebook, Instagram, LinkedIn, YouTube, etc.). |
| **Font Optimization** | `next/font/google` (`Inter`) | Built-in | Zero-CLS (Cumulative Layout Shift) variable web font loading hosted locally by Next.js. |
| **Image Optimization**| `next/image` | Built-in | Automatic lazy-loading, WebP/AVIF format transcoding, and responsive sizing. |
| **Data Layer** | Local Mock Datasets (JS/JSON) | Custom | Frontend-only property listings, new launch projects, trending projects, and locality catalogues. |

---

## 2. All Installed Dependencies

Below is the verified dependency manifest from `package.json`:

### Production Dependencies (`dependencies`)

```json
{
  "dependencies": {
    "@tailwindcss/postcss": "^4.3.3",
    "autoprefixer": "^10.6.2",
    "lucide-react": "^1.61.0",
    "next": "^16.4.3",
    "postcss": "^8.5.32",
    "react": "^19.3.1",
    "react-dom": "^19.3.1",
    "react-icons": "^5.7.0",
    "tailwindcss": "^4.3.3"
  }
}
```

#### Detailed Breakdown of Production Packages:
1. **`next` (`^16.4.3`)**: Core framework handling routing, static generation (SSG), server rendering (SSR), and Turbopack asset pipelines.
2. **`react` (`^19.3.1`)**: React 19 component runtime supporting server actions, suspense boundaries, and modern hooks.
3. **`react-dom` (`^19.3.1`)**: React browser DOM adapter.
4. **`lucide-react` (`^1.61.0`)**: Provides icons for bedrooms, bathrooms, area, verified badge, calendar, search, phone, and filters.
5. **`react-icons` (`^5.7.0`)**: Provides FontAwesome and brand social icons in the footer and hero search blocks.
6. **`tailwindcss` (`^4.3.3`)**: Next-generation Tailwind styling engine.
7. **`@tailwindcss/postcss` (`^4.3.3`)**: Official PostCSS adapter for compiling Tailwind v4 directives.
8. **`postcss` (`^8.5.32`)**: Underlying CSS transformation engine.
9. **`autoprefixer` (`^10.6.2`)**: Injects cross-browser CSS prefixes automatically.

### Development Dependencies (`devDependencies`)

```json
{
  "devDependencies": {
    "@types/node": "^20.11.0",
    "@types/react": "^19.3.0",
    "@types/react-dom": "^19.3.0",
    "typescript": "^5.3.3"
  }
}
```

#### Detailed Breakdown of Dev Packages:
1. **`typescript` (`^5.3.3`)**: TypeScript compiler for type checking and transpilation.
2. **`@types/node` (`^20.11.0`)**: TypeScript type definitions for Node.js runtimes (Node 20+).
3. **`@types/react` (`^19.3.0`)**: Type declarations for React 19 hooks, JSX, and component props.
4. **`@types/react-dom` (`^19.3.0`)**: Type declarations for React DOM.

---

## 3. System & Runtime Requirements

### Hardware Requirements
- **CPU**: Dual-core processor minimum (Quad-core recommended for fast builds).
- **RAM**: Minimum 4 GB RAM (8 GB+ recommended during parallel Turbopack worker compilation).
- **Disk Space**: ~500 MB free space for `node_modules` and compiled `.next` artifacts.

### Software Prerequisites
- **Operating System**: Windows 10/11, macOS (12+), or Linux (Ubuntu 20.04+, Debian, Alpine).
- **Node.js**: **Node.js v20.x, v22.x, or v24.x** (Validated with active Node `v24.20.0`).
- **Package Manager**: **npm v10+** (Validated with npm `v11.13.0`), or **pnpm v9+**, or **yarn v1.22+**.

### Browser Support Matrix
Tested and supported across all modern evergreen browsers:
- Google Chrome (latest 2 versions)
- Apple Safari (macOS & iOS 15+)
- Mozilla Firefox (latest 2 versions)
- Microsoft Edge (Chromium based, latest 2 versions)

---

## 4. Environment Variables (`.env.example`)

The application is frontend-only and does not expose private database credentials or sensitive API keys. Public runtime variables are prefixed with `NEXT_PUBLIC_`:

```ini
# Base Canonical URL for SEO metadata & XML Sitemap
NEXT_PUBLIC_SITE_URL=https://punepropertyinvestor.com

# WhatsApp Consultation Lead Phone Number (Format: CountryCode + Number)
NEXT_PUBLIC_WHATSAPP_NUMBER=917398174444

# Direct Advisor Phone Hotline
NEXT_PUBLIC_PHONE_NUMBER=+917398174444

# Primary Business Support Email
NEXT_PUBLIC_CONTACT_EMAIL=info@punepropertyinvestor.com
```

---

## 5. Network & External Domain Requirements

The application connects to the following external domains for media and links:

| Domain | Protocol | Usage | Configured in `next.config.mjs` |
| :--- | :--- | :--- | :---: |
| `images.unsplash.com` | HTTPS | High-resolution property photography and project banners | Yes |
| `scontent.fpnq12-1.fna.fbcdn.net` | HTTPS | PPI Facebook showcase property banners | Yes |
| `punepropertyinvestor.com` | HTTPS | Official corporate team photography & assets | Yes |
| `img.youtube.com` | HTTPS | Video thumbnail posters | Yes |
| `www.youtube-nocookie.com` | HTTPS | Privacy-friendly embedded YouTube showcase player | Allowed in iframe |
| `wa.me` | HTTPS | Instant WhatsApp client communication link | Client-side link |

---

## 6. Project Scripts & Lifecycle Commands

Run these scripts from the project root:

```bash
# 1. Install all dependencies cleanly
npm install

# 2. Run local development server with Turbopack (http://localhost:3000)
npm run dev

# 3. Compile optimized production build (TypeScript check + Static Page Generation)
npm run build

# 4. Start the production server (after npm run build)
npm run start

# 5. Run Next.js linter
npm run lint
```

---

## 7. Build Output & Route Specification

The production build automatically generates **35 static/SSG routes**:

```text
Route (app)                               Size     First Load JS
┌ ○ /                                     142 B          92.4 kB
├ ○ /_not-found                           875 B          88.2 kB
├ ○ /about                                184 B          90.5 kB
├ ○ /blog                                 138 B          88.4 kB
├ ƒ /blog/[...slug]                       138 B          88.4 kB
├ ○ /buy                                  196 B          94.2 kB
├ ○ /career                               138 B          88.4 kB
├ ○ /commercial                           138 B          88.4 kB
├ ○ /contact                              210 B          91.8 kB
├ ○ /investment                           138 B          88.4 kB
├ ○ /news                                 138 B          88.4 kB
├ ƒ /news/[...slug]                       138 B          88.4 kB
├ ○ /plots                                138 B          88.4 kB
├ ○ /privacy-policy                       138 B          88.4 kB
├ ○ /projects                             138 B          88.4 kB
├ ○ /properties                           196 B          94.2 kB
├ ● /properties/[slug] (10 SSG paths)     215 B          96.1 kB
├ ● /property/[id]     (6 SSG paths)      215 B          96.1 kB
├ ○ /robots.txt                           0 B            0 B
├ ƒ /search                               0 B            0 B
├ ○ /sitemap.xml                          0 B            0 B
└ ○ /terms-and-conditions                 138 B          88.4 kB

○  (Static)   Pre-rendered as static content
●  (SSG)      Pre-rendered as static HTML (uses generateStaticParams)
ƒ  (Dynamic)  Server-rendered on demand / Redirects
```

---

## 8. Deployment Requirements

### Standard Node.js Hosting (Vercel, AWS Amplify, Docker, VPS)
- Run `npm run build` during deployment build phase.
- Start server using `npm run start` or `next start -p $PORT`.
- Set environment variables in your hosting dashboard.

### Static Hosting (GitHub Pages / AWS S3 / Cloudflare Pages)
- If full static HTML export is desired:
  1. Add `output: 'export'` to `next.config.mjs`.
  2. Run `npm run build` to generate the static files inside the `out/` folder.
  3. Upload the `out/` folder to your static hosting provider.

