# Pune Property Investors (PPI) — Complete Project Blueprint & Architecture Guide

> **Purpose:** This blueprint serves as the single source of truth for the entire **Pune Property Investors** real estate platform. When you or any AI agent need to find a file, add a feature, modify styles, debug an issue, or connect services, consult this guide.

---

## 1. High-Level Architecture Overview

```mermaid
graph TD
    Client[Web Browser / Mobile Visitor] -->|HTTP / HTTPS| NextJS[Frontend: Next.js 16 App Router]
    Client -->|Direct Chat Handoff| WA[WhatsApp Business Hotline]
    
    subgraph Frontend ["Frontend Layer (Next.js 16 + React 19)"]
        NextJS --> AppRouter["App Router (src/app)"]
        AppRouter --> PageViews["Page Components (src/components/pages)"]
        AppRouter --> AdminPanel["Admin CMS (src/app/admin)"]
        AdminPanel --> AdminGuard["Session Guard (src/components/admin/layout/AdminGuard)"]
        PageViews --> ServiceLayer["API Service Layer (src/services/api.js)"]
    end

    ServiceLayer -->|REST API + Bearer JWT| Backend["Backend: Node.js Express MVC"]
    ServiceLayer -.->|Fallback if Backend Offline| MockStore["Local Mock Store (src/services/mockStore.js)"]

    subgraph Backend ["Backend Layer (Pune_Properties_Investors_Backend)"]
        Backend --> Security["Security: Helmet + CORS + Rate Limiter"]
        Security --> AuthMW["Auth Middleware (JWT verifyToken)"]
        AuthMW --> Routes["Express Routes (/api/auth, /api/properties, /api/enquiries)"]
        Routes --> Controllers["Controllers (MVC)"]
        Controllers --> Repositories["Repositories & Models"]
    end

    Repositories -->|mysql2 connection pool| MySQL[("MySQL Database (Local or PlanetScale/RDS)")]
```

---

## 2. Directory Structure & File Map

### A. Frontend (`src/`)

```
src/
├── app/                                # Next.js 16 App Router (Routes & Metadata)
│   ├── layout.tsx                      # Root HTML Shell & Font Config
│   ├── page.tsx                        # Homepage Route (/)
│   ├── about/page.tsx                  # About Us Route (/about)
│   ├── buy/page.tsx                    # Buy Properties Route (/buy)
│   ├── commercial/page.tsx             # Commercial Properties Route (/commercial)
│   ├── contact/page.tsx                # Contact Us Route (/contact)
│   ├── contact-us/page.tsx             # Alias Contact Route (/contact-us)
│   ├── investment/page.tsx             # High-Yield Investment Route (/investment)
│   ├── new-launches/page.tsx           # New Project Launches Route (/new-launches)
│   ├── plots/page.tsx                  # Villa & Land Plots Route (/plots)
│   ├── privacy-policy/page.tsx         # Privacy Policy Legal Route (/privacy-policy)
│   ├── projects/page.tsx               # Projects Showcase Route (/projects)
│   ├── properties/
│   │   ├── page.tsx                    # Property Catalogue Route (/properties)
│   │   └── [slug]/page.tsx             # Dynamic Property Details Route
│   ├── search/page.tsx                 # Universal Real Estate Search Route
│   ├── shorts/page.tsx                 # Video Shorts / Reels Route (/shorts)
│   ├── terms-and-conditions/page.tsx   # Terms & Conditions Route
│   └── admin/                          # Administrative Dashboard & CMS
│       ├── layout.jsx                  # Admin Route Root Shell
│       ├── login/page.jsx              # Admin Login View
│       └── (dashboard)/                # Protected Dashboard Route Group
│           ├── layout.jsx              # Dashboard Shell (Sidebar + Topbar + Guard)
│           ├── page.jsx                # Overview Analytics Dashboard
│           ├── leads/page.jsx          # Lead Management CRM View
│           ├── properties/page.jsx     # Property Inventory Management
│           ├── projects/page.jsx       # Project Showcase Editor
│           ├── settings/page.jsx       # Global Settings & Profile
│           └── ... (articles, careers, locations, developers, etc.)
│
├── components/                         # Reusable React UI Components
│   ├── layouts/
│   │   ├── Header.jsx & Header.css     # Sticky Global Navbar (Desktop & Mobile)
│   │   └── Footer.jsx & Footer.css     # Site Footer (Links, Social, Disclaimers)
│   ├── pages/                          # Full-page View Components
│   │   ├── Home.jsx & Home.css         # Homepage Composed Container
│   │   ├── Contact.jsx & Contact.css   # Luxury Villa Contact Showcase Page
│   │   ├── BuyProperties.jsx & .css    # Property Grid with Filters & Sorting
│   │   ├── PropertyDetails.jsx & .css  # Single Property Page (Gallery, Floor Plans, Specs)
│   │   ├── About.jsx & About.css       # About PPI Platform Story & Team
│   │   ├── Career.jsx & Career.css     # Careers & Job Openings
│   │   └── Shorts.jsx & Shorts.css     # Vertical Video Player Experience
│   ├── home/                           # Modular Homepage Sections
│   │   ├── HeroSection.jsx             # Top Video/Hero Banner with Search Pill
│   │   ├── FeaturedProperties.jsx      # Top Curated Properties Carousel
│   │   ├── HomeContact.jsx & .css      # Villa Contact Section on Homepage
│   │   ├── SmartCalculator.jsx & .css  # Interactive EMI & Investment ROI Calculator
│   │   ├── BrowseLocations.jsx         # Pune Locality Grid (Kharadi, Hinjewadi, etc.)
│   │   ├── NewLaunchProjects.jsx       # Upcoming Projects Spotlight
│   │   ├── ScrollStoryProperties.jsx   # Interactive Sticky Scroll Story
│   │   ├── TrustHighlights.jsx         # Verified Credentials & PPI Stats
│   │   └── DeveloperLogos.jsx          # Partner Builders (Godrej, Panchshil, etc.)
│   └── admin/                          # Admin CMS Specific UI
│       ├── layout/
│       │   ├── AdminGuard.jsx          # Session Authenticator (Redirects if unauthenticated)
│       │   ├── AdminSidebar.jsx        # Navigation Sidebar with Lead Badge Counters
│       │   └── AdminTopbar.jsx         # Header with Notifications & Profile Actions
│       └── leads/, properties/, ...    # Admin Modals, Tables, and Forms
│
├── services/                           # API & Data Fetching Layer
│   ├── api.js                          # Base fetch wrapper, Bearer tokens, Error handling
│   ├── auth.service.js                 # Admin Auth (login, logout, me, changePassword)
│   ├── lead.service.js                 # Lead Submission & CRM CRUD
│   ├── property.service.js             # Property Catalog CRUD
│   ├── mockStore.js                    # In-browser LocalStorage fallback store
│   └── liveContent.js                  # Dynamic site content helper
│
├── data/                               # Static Fallback Data & Listings
│   ├── propertyListingsData.js         # Comprehensive Pune Property Listings
│   ├── properties.js                   # Legacy property list
│   ├── locationsData.js                # Localities, Landmarks, Coordinates
│   └── trendingProjectsData.js         # Spotlight Projects
│
├── context/
│   └── AdminAuthContext.jsx            # React Context managing Admin JWT Auth State
│
└── styles/                             # Global Styles & Tokens
    ├── global.css                      # Base Global CSS Reset & Utilities
    ├── variables.css                   # Color Tokens (--gold, --dark-slate, etc.)
    └── responsive.css                  # Breakpoint helpers
```

---

### B. Backend (`Pune_Properties_Investors_Backend/`)

```
Pune_Properties_Investors_Backend/
├── package.json                        # Dependencies (express, mysql2, bcryptjs, jsonwebtoken, helmet)
├── .env.example                        # Database & Security Environment Template
├── src/
│   ├── server.js                       # Server Entry Point (connects DB and starts HTTP server)
│   ├── app.js                          # Express App Factory (middlewares, routes, error handlers)
│   │
│   ├── config/
│   │   ├── db.js                       # MySQL Pool (`mysql2/promise`) & Auto-Migrations
│   │   └── security.js                 # Helmet Headers, CORS Policy, Sliding-Window Rate Limiters
│   │
│   ├── middlewares/
│   │   ├── authMiddleware.js           # JWT Verification (`verifyToken`) & Admin Check (`requireAdmin`)
│   │   └── errorHandler.js             # Centralized Error Catch & JSON Response
│   │
│   ├── routes/
│   │   ├── index.js                    # Router Root (/api/health, /api/auth, /api/properties, /api/enquiries)
│   │   ├── authRoutes.js               # POST /login (Rate-limited), GET /me, POST /change-password
│   │   ├── propertyRoutes.js           # Public GET; Protected Admin POST, PUT, DELETE
│   │   └── enquiryRoutes.js            # Public POST (Anti-spam); Protected Admin GET, PATCH
│   │
│   ├── controllers/
│   │   ├── authController.js           # Handles Admin JWT Issuance & bcrypt Checks
│   │   ├── propertyController.js       # Property CRUD Controller
│   │   └── enquiryController.js        # Lead Capture & Status Update Controller
│   │
│   ├── models/
│   │   ├── PropertyModel.js            # Parameterized MySQL queries with in-memory fallback
│   │   └── EnquiryModel.js             # Parameterized MySQL queries with in-memory fallback
│   │
│   ├── repositories/                   # Data Access Abstraction Layer
│   ├── services/                       # Business Logic Layer
│   ├── dtos/                           # Input Validation DTOs
│   └── views/
│       └── responseView.js             # Standardized API response format ({ success, data, message })
```

---

## 3. End-to-End Operational Workflows

### Flow 1: Lead Capture & WhatsApp Handoff
1. Visitor browses `/contact` or homepage contact section.
2. Form is submitted in [Contact.jsx](file:///c:/Users/tanma/OneDrive/Desktop/PPI%20infra/final/Pune_Property_Investors_/src/components/pages/Contact.jsx).
3. `leadService.create()` sends payload to `POST /api/enquiries` (or saves to `mockStore` if backend offline).
4. Automated WhatsApp URL is constructed with visitor details (`wa.me/917398174444?text=...`) and opened in a new tab.
5. Lead is inserted into MySQL table `enquiries` with status `'New'`.
6. Lead instantly appears inside the Admin Panel at `/admin/leads` with badge counters.

### Flow 2: Admin Login & Secure Session Management
1. Admin opens `/admin/login` and submits credentials.
2. Handled by `authService.login()` in [auth.service.js](file:///c:/Users/tanma/OneDrive/Desktop/PPI%20infra/final/Pune_Property_Investors_/src/services/auth.service.js).
3. Backend checks brute-force rate limiter (max 5 attempts per 15 min).
4. `authController.js` validates email and runs `bcrypt.compare()` against the MySQL `admins` table.
5. If valid, signs a cryptographically secure JWT (24-hour validity) and returns it.
6. Frontend stores token and user in browser storage; `AdminGuard.jsx` validates session and grants entry.

### Flow 3: Property Inventory Updates
1. Admin adds/edits a property inside `/admin/properties`.
2. Frontend sends `POST` or `PUT /api/properties/:id` with Bearer token in the `Authorization` header.
3. Backend `authMiddleware.js` verifies JWT signature and admin role.
4. `PropertyModel.js` executes parameterized MySQL queries (`INSERT` / `UPDATE`) safely preventing SQL injection.
5. Visitors browsing `/properties` or `/properties/[slug]` instantly see the updated listings.

---

## 4. Developer "Where Do I Change X?" Cheat-Sheet

| Task / Feature | Primary File to Edit | Associated Styles / Config |
| :--- | :--- | :--- |
| **Change Phone / WhatsApp Number** | `src/components/pages/Contact.jsx`<br>`src/components/home/HomeContact.jsx` | `src/components/layouts/Header.jsx`<br>`src/components/layouts/Footer.jsx` |
| **Edit Contact Page Villa Card** | [Contact.jsx](file:///c:/Users/tanma/OneDrive/Desktop/PPI%20infra/final/Pune_Property_Investors_/src/components/pages/Contact.jsx) | [Contact.css](file:///c:/Users/tanma/OneDrive/Desktop/PPI%20infra/final/Pune_Property_Investors_/src/components/pages/Contact.css) |
| **Edit Homepage Contact Card** | [HomeContact.jsx](file:///c:/Users/tanma/OneDrive/Desktop/PPI%20infra/final/Pune_Property_Investors_/src/components/home/HomeContact.jsx) | [HomeContact.css](file:///c:/Users/tanma/OneDrive/Desktop/PPI%20infra/final/Pune_Property_Investors_/src/components/home/HomeContact.css) |
| **Edit Header / Navigation Links** | [Header.jsx](file:///c:/Users/tanma/OneDrive/Desktop/PPI%20infra/final/Pune_Property_Investors_/src/components/layouts/Header.jsx) | [Header.css](file:///c:/Users/tanma/OneDrive/Desktop/PPI%20infra/final/Pune_Property_Investors_/src/components/layouts/Header.css) |
| **Edit Footer Links & Disclaimers** | [Footer.jsx](file:///c:/Users/tanma/OneDrive/Desktop/PPI%20infra/final/Pune_Property_Investors_/src/components/layouts/Footer.jsx) | [Footer.css](file:///c:/Users/tanma/OneDrive/Desktop/PPI%20infra/final/Pune_Property_Investors_/src/components/layouts/Footer.css) |
| **Update Static Property Listings** | [propertyListingsData.js](file:///c:/Users/tanma/OneDrive/Desktop/PPI%20infra/final/Pune_Property_Investors_/src/data/propertyListingsData.js) | `src/data/locationsData.js` |
| **Configure MySQL Database** | [Pune_Properties_Investors_Backend/.env](file:///c:/Users/tanma/OneDrive/Desktop/PPI%20infra/final/Pune_Property_Investors_/Pune_Properties_Investors_Backend/.env.example) | [db.js](file:///c:/Users/tanma/OneDrive/Desktop/PPI%20infra/final/Pune_Property_Investors_/Pune_Properties_Investors_Backend/src/config/db.js) |
| **Admin Login & Password Rules** | [authController.js](file:///c:/Users/tanma/OneDrive/Desktop/PPI%20infra/final/Pune_Property_Investors_/Pune_Properties_Investors_Backend/src/controllers/authController.js) | [authMiddleware.js](file:///c:/Users/tanma/OneDrive/Desktop/PPI%20infra/final/Pune_Property_Investors_/Pune_Properties_Investors_Backend/src/middlewares/authMiddleware.js) |
| **Change Brand Colors / Fonts** | [variables.css](file:///c:/Users/tanma/OneDrive/Desktop/PPI%20infra/final/Pune_Property_Investors_/src/styles/variables.css) | `src/styles/global.css` |
| **Add New Page Route** | Create `src/app/<route-name>/page.tsx` | Create component in `src/components/pages/` |

---

## 5. Security & Protection Matrix

| Security Layer | Implemented Mechanism | Location in Code |
| :--- | :--- | :--- |
| **Admin Authentication** | JSON Web Tokens (JWT) signed with SHA-256 (24h lifespan) | `Pune_Properties_Investors_Backend/src/middlewares/authMiddleware.js` |
| **Password Storage** | `bcryptjs` with 12 salt rounds | `Pune_Properties_Investors_Backend/src/controllers/authController.js` |
| **Route Protection** | `verifyToken` & `requireAdmin` guards on all write/admin endpoints | `Pune_Properties_Investors_Backend/src/routes/*.js` |
| **Brute-Force Shield** | Sliding-window rate limiter: max 5 login requests per 15 mins per IP | `Pune_Properties_Investors_Backend/src/routes/authRoutes.js` |
| **Spam Protection** | Anti-spam limiter: max 10 enquiry submissions per 15 mins per IP | `Pune_Properties_Investors_Backend/src/routes/enquiryRoutes.js` |
| **SQL Injection Shield** | Parameterized queries with prepared statements (`?` placeholders) | `Pune_Properties_Investors_Backend/src/models/*.js` |
| **XSS Shield** | Input normalization and sanitization via `validator` | `Pune_Properties_Investors_Backend/src/controllers/authController.js` |
| **HTTP Security Headers** | `helmet` (HSTS, CSP, Frameguard, NoSniff) & `poweredByHeader: false` | `Pune_Properties_Investors_Backend/src/config/security.js`<br>`next.config.mjs` |
| **CORS Policy** | Origin whitelist matching verified frontend domains | `Pune_Properties_Investors_Backend/src/config/security.js` |

---

## 6. How to Run & Deploy the Project

### Running Locally

```bash
# 1. Start the Frontend (Port 3000)
npm run dev

# 2. Start the Backend API (Port 5000)
cd Pune_Properties_Investors_Backend
npm start
```

### Verifying Build & Quality

```bash
# Production Next.js Build
npm run build
```

---

*Keep this blueprint updated whenever new routes, services, or architectural layers are introduced.*
