/**
 * Local Mock Data Store (Frontend-Only / Offline Demo Persistence)
 * Seeded from existing public website data modules in src/data/ so the Admin CMS
 * reflects real Pune Property Investors inventory out of the box.
 */

import { projects as initialProjects } from "../data/projects";
import propertyListingsData from "../data/propertyListingsData";
import locationsData from "../data/locationsData";
import { propertyShorts as initialShorts } from "../data/shortsData";
import { testimonials as initialTestimonials } from "../data/testimonials";
import initialAds from "../data/advertisementData";

const STORE_KEY = "ppi_admin_cms_store_v1";

const DEFAULT_HOMEPAGE_SECTIONS = [
    {
        id: "hero",
        type: "hero",
        label: "Hero Banner & Property Search",
        enabled: true,
        order: 1,
        data: {
            eyebrow: "YOUR PROPERTY PARTNER IN PUNE",
            headingLine1: "Find Your Dream Home.",
            headingLine2: "Invest in Your Future",
            subtitle: "Discover verified residential properties, newly launched projects, and luxury homes across Pune.",
            videoUrl: "https://play.gumlet.io/embed/6aec1cf3981592d058d2775e?background=true&autoplay=true&loop=true&disable_player_controls=true&preload=true",
            backgroundImage: "",
            primaryCtaText: "Search Properties",
            primaryCtaUrl: "/buy",
            showSearchCard: true,
            showCategoryTabs: true,
        },
    },
    {
        id: "trust-highlights",
        type: "trust-highlights",
        label: "Trust Highlights (Typewriter Bar)",
        enabled: true,
        order: 2,
        data: {
            headingText: "Why Pune Property Investors",
            items: [
                { id: "trust", title: "100% TRUST", desc: "Complete Transparency. Confident Decisions." },
                { id: "brokerage", title: "ZERO BROKERAGE", desc: "No Brokerage. No Hidden Charges." },
                { id: "price", title: "BEST LAUNCH PRICE", desc: "Exclusive Launch Offers. Maximum Savings." },
            ],
        },
    },
    {
        id: "featured-properties",
        type: "featured-properties",
        label: "Projects in Pune (YouTube Video Tours)",
        enabled: true,
        order: 3,
        data: {
            eyebrow: "CURATED SHOWCASE",
            heading: "Featured Pune Developments",
            subtitle: "Explore MahaRERA verified residences with real walkthrough video tours.",
        },
    },
    {
        id: "new-launches",
        type: "new-launches",
        label: "New Launch Showcase Carousel",
        enabled: true,
        order: 4,
        data: {
            eyebrow: "FRESH INVENTORY",
            heading: "New Launch Projects",
            subtitle: "Early-bird allocations and inaugural builder pricing across Pune corridors.",
        },
    },
    {
        id: "property-reels",
        type: "property-reels",
        label: "Property Shorts & Video Reels",
        enabled: true,
        order: 5,
        data: {
            eyebrow: "PROPERTY SHORTS",
            heading: "Explore Pune Projects Through Reels",
            subtitle: "Streets • Amenities • Lifestyle • Walkthroughs",
        },
    },
    {
        id: "browse-locations",
        type: "browse-locations",
        label: "Browse by Location Marquee",
        enabled: true,
        order: 6,
        data: {
            eyebrow: "EXPLORE PUNE",
            heading: "Browse by Prime Localities",
            subtitle: "Live market rates and curated inventory across East & West Pune.",
        },
    },
    {
        id: "featured-projects",
        type: "featured-projects",
        label: "Explore Our Featured Projects",
        enabled: true,
        order: 6,
        data: {
            eyebrow: "OUR PORTFOLIO",
            heading: "Explore Our Featured Projects",
            subtitle: "Discover thoughtfully selected properties across Pune that match your lifestyle and investment goals.",
            ctaText: "View All Properties",
            ctaUrl: "/buy",
        },
    },
    {
        id: "upcoming-projects",
        type: "upcoming-projects",
        label: "Upcoming Pre-Launch Showcase",
        enabled: true,
        order: 7,
        data: {
            eyebrow: "EXCLUSIVE PRE-LAUNCH PREVIEW 2026–2027",
            heading: "Upcoming Project Showcase",
            subtitle: "Experience the grand launch and exclusive first look of Pune’s next iconic landmark in New Kharadi.",
            projectName: "VTP Aurelia",
            location: "New Kharadi, Pune",
            developer: "VTP Realty",
            youtubeUrl: "https://www.youtube.com/watch?v=yTzvQko2gYo&t=14s",
            ctaText: "Priority Pre-Register",
        },
    },
    {
        id: "featured-prop",
        type: "featured-prop",
        label: "Signature Luxury Spotlight",
        enabled: false,
        order: 8,
        data: {
            eyebrow: "SIGNATURE COLLECTION",
            heading: "Handpicked Luxury Residences",
            subtitle: "Curated trophy residences for discerning homeowners and NRI investors.",
        },
    },
    {
        id: "advertisements",
        type: "advertisements",
        label: "Sidebar Video Advertisements",
        enabled: true,
        order: 9,
        data: {
            showSidebar: true,
        },
    },
    {
        id: "workflow",
        type: "workflow",
        label: "7-Step Homebuying Workflow",
        enabled: true,
        order: 10,
        data: {
            eyebrow: "HOW WE WORK",
            heading: "Your Seamless Property Journey",
            subtitle: "From shortlisting verified projects to home loan assistance and key handover.",
        },
    },
    {
        id: "developer-logos",
        type: "developer-logos",
        label: "Trusted Developer Partners",
        enabled: true,
        order: 11,
        data: {
            eyebrow: "CHANNEL PARTNERSHIPS",
            heading: "Authorized Partner With Top Builders",
        },
    },
    {
        id: "testimonials",
        type: "testimonials",
        label: "Customer Testimonials",
        enabled: false,
        order: 12,
        data: {
            eyebrow: "CLIENT EXPERIENCES",
            heading: "What Our Customers Say",
            subtitle: "Trusted by 20,000+ homebuyers and real estate investors across Pune.",
        },
    },
    {
        id: "home-contact",
        type: "home-contact",
        label: "Contact & Advisory CTA Section",
        enabled: true,
        order: 13,
        data: {
            eyebrow: "PUNE PROPERTY INVESTORS",
            heading: "Start your Pune property journey today",
            subtitle: "Complete the form and get a personalized list of verified properties within 24 hours.",
            buttonText: "Send message",
        },
    },
    {
        id: "trust-stats",
        type: "trust-stats",
        label: "Trust Numbers & Milestones",
        enabled: true,
        order: 14,
        data: {
            heading: "Numbers That Define Our Commitment",
        },
    },
];

const DEFAULT_ABOUT_CONTENT = {
    eyebrow: "ABOUT PUNE PROPERTY INVESTOR",
    title: "Guiding Your Journey With",
    titleAccent: "Trust & Expertise.",
    description:
        "Pune Property Investors is your dedicated advisory partner helping homebuyers, NRI investors, and commercial clients make verified, high-yielding property decisions across Pune's fastest growing corridors.",
    backgroundImage:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85",
    storyTitle: "Transparent Advisory Since 2015",
    storyContent:
        "We eliminate misinformation and hidden brokerage in Pune real estate by verifying MahaRERA filings, title clarity, and builder delivery history before recommending any home or commercial space.",
    ctaText: "Schedule a Consultation",
    ctaUrl: "/contact",
    seo: {
        title: "About Pune Property Investors | Real Estate Advisory",
        description: "Learn about our zero-brokerage verified real estate advisory in Pune.",
        slug: "/about",
    },
};

const DEFAULT_DEVELOPERS = [
    { id: 1, name: "Paras Buildtech", domain: "parasbuildtech.com", logoUrl: "/images/logos/paras-emperor.png", website: "https://parasbuildtech.com", phone: "+91 73981 74444", email: "sales@parasbuildtech.com", description: "Luxury residential & commercial landmarks.", featured: true },
    { id: 2, name: "Godrej Properties", domain: "godrejproperties.com", logoUrl: "/images/logos/godrej.png", website: "https://www.godrejproperties.com", phone: "+91 73981 74444", email: "info@godrejproperties.com", description: "125+ years of trust and sustainable urban townships across Pune.", featured: true },
    { id: 3, name: "Kolte-Patil Developers", domain: "koltepatil.com", logoUrl: "/images/logos/kolte-patil.jpg", website: "https://www.koltepatil.com", phone: "+91 73981 74444", email: "info@koltepatil.com", description: "Pune's leading township builder behind Life Republic.", featured: true },
    { id: 4, name: "VTP Realty", domain: "vtprealty.in", logoUrl: "/images/logos/vtp.png", website: "https://www.vtprealty.in", phone: "+91 73981 74444", email: "info@vtprealty.in", description: "Pune's #1 real estate brand known for MLA homes in Kharadi & Mahalunge.", featured: true },
    { id: 5, name: "Sobha Limited", domain: "sobha.com", logoUrl: "/images/logos/sobha.png", website: "https://www.sobha.com", phone: "+91 73981 74444", email: "sales@sobha.com", description: "Backward-integrated luxury developer acclaimed for German-grade quality.", featured: true },
    { id: 6, name: "Shapoorji Pallonji", domain: "shapoorjirealestate.com", logoUrl: "/images/logos/shapoorji.svg", website: "https://www.shapoorjirealestate.com", phone: "+91 73981 74444", email: "care@shapoorjirealestate.com", description: "150-year engineering legacy crafting Joyville smart communities.", featured: true },
    { id: 7, name: "Lodha Group", domain: "lodhagroup.com", logoUrl: "/images/logos/lodha.png", website: "https://www.lodhagroup.in", phone: "+91 73981 74444", email: "sales@lodhagroup.com", description: "India's premier luxury real estate developer.", featured: true },
    { id: 8, name: "Kohinoor Group", domain: "kohinoorpune.com", logoUrl: "/images/logos/kohinoor.png", website: "https://www.kohinoorpune.com", phone: "+91 73981 74444", email: "sales@kohinoorpune.com", description: "Sada Sukhi Raho philosophy across 40+ years in Pune.", featured: true },
];

const DEFAULT_ARTICLES = [
    {
        id: 1,
        type: "blog",
        title: "Top 7 High-Growth Localities to Buy Property in Pune (2026 Edition)",
        slug: "top-high-growth-localities-pune",
        category: "Locality Guide",
        author: "Pune Property Research Team",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85",
        excerpt: "From Kharadi's IT corridor expansion to Baner and Wakad's connectivity surge, discover where smart homebuyers and NRI investors are securing highest rental yields.",
        content: "<p>Pune's real estate landscape continues to outperform tier-1 peers due to balanced IT employment growth, Metro corridors, and integrated township supply.</p><h3>1. Kharadi & Upper Kharadi</h3><p>Backed by EON IT Park and World Trade Center, rental yields stay between 3.9% and 4.6%.</p><h3>2. Baner – Balewadi High Street</h3><p>Strong lifestyle infrastructure and metro proximity keep end-user demand resilient.</p>",
        status: "Published",
        publishDate: "2026-10-24",
        seo: {
            title: "Top 7 High-Growth Localities in Pune 2026 | PPI",
            description: "Discover the best residential and investment corridors in Pune for 2026.",
            slug: "top-high-growth-localities-pune",
        },
    },
    {
        id: 2,
        type: "blog",
        title: "First-Time Homebuyer's Checklist: Documents, RERA, and Stamp Duty in Maharashtra",
        slug: "first-time-homebuyer-checklist-maharashtra",
        category: "Buying Guide",
        author: "Legal Advisory Desk",
        image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=85",
        excerpt: "A step-by-step roadmap to navigating MahaRERA registration, title clearance verification, home loan eligibility, and government registration fees in Pune.",
        content: "<p>Always verify the MahaRERA registration number, sanctioned commencement certificate (CC), and carpet area statement before paying token booking amounts.</p>",
        status: "Published",
        publishDate: "2026-10-18",
        seo: {
            title: "Homebuyer RERA & Stamp Duty Checklist Maharashtra",
            description: "Step-by-step home buying verification checklist for Pune homebuyers.",
            slug: "first-time-homebuyer-checklist-maharashtra",
        },
    },
    {
        id: 3,
        type: "magazine",
        title: "Q4 Pune Luxury Market Outlook: Riverfront Townships & Sky Villas",
        slug: "q4-pune-luxury-market-outlook",
        category: "PPI Magazine",
        author: "Editorial Board",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85",
        excerpt: "An in-depth quarterly magazine feature analyzing ₹1.5 Cr+ demand across Mundhwa, Kothrud, and Koregaon Park Annexe.",
        content: "<p>End-user upgrades to 3.5 & 4 BHK sky suites surged 24% YoY across Pune's premium corridors.</p>",
        status: "Published",
        publishDate: "2026-11-01",
        seo: {
            title: "Q4 Pune Luxury Market Magazine | PPI",
            description: "Luxury real estate market analysis across Pune's prime residential belts.",
            slug: "q4-pune-luxury-market-outlook",
        },
    },
];

const DEFAULT_NEWS = [
    {
        id: 1,
        title: "Pune Metro Line 3 Trials Commence: 23 Stations Connecting Hinjewadi to Civil Court",
        slug: "pune-metro-line-3-trials-commence",
        category: "Metro & Transit",
        source: "Pune Urban Infrastructure Bureau",
        image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=85",
        summary: "The 23.3 km elevated corridor enters final trial runs. Major residential localities like Wakad, Baner, Balewadi, and Aundh report rising housing inquiries ahead of full public operations.",
        impact: "Expected 20-30 min commute time reduction between West Pune IT hubs and downtown.",
        content: "<p>Trial operations along Hinjewadi Phase 3 to Balewadi have shown steady progress ahead of passenger launch.</p>",
        status: "Published",
        publishDate: "2026-10-27",
        seo: {
            title: "Pune Metro Line 3 Trials Update | PPI News",
            description: "Impact of Pune Metro Line 3 on Hinjewadi, Wakad, and Baner property demand.",
            slug: "pune-metro-line-3-trials-commence",
        },
    },
    {
        id: 2,
        title: "PMC Approves New 36-Meter DP Road Links Connecting Upper Kharadi Directly to Wagholi",
        slug: "pmc-dp-road-upper-kharadi-wagholi",
        category: "Infrastructure",
        source: "Civic Development Authority",
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=85",
        summary: "New arterial connecting corridors cleared to decongest Nagar Road and facilitate direct connectivity between EON IT Park, WTC Tower 4, and eastern residential developments.",
        impact: "Eases heavy freight and daily IT commuter traffic through eastern suburbs.",
        content: "<p>The 36-meter arterial DP link cuts travel time between Kharadi EON Free Zone and Wagholi annexes by up to 18 minutes.</p>",
        status: "Published",
        publishDate: "2026-10-22",
        seo: {
            title: "PMC 36m DP Road Kharadi to Wagholi | PPI News",
            description: "Infrastructure boost for East Pune residential and commercial real estate.",
            slug: "pmc-dp-road-upper-kharadi-wagholi",
        },
    },
];

const DEFAULT_LEADS = [
    { id: 101, type: "property", name: "Rohan Deshmukh", phone: "+91 98220 11223", email: "rohan.d@example.com", propertyTitle: "Godrej Ivara - Hinjewadi Phase 1", locality: "Hinjewadi", budget: "₹1.30 Cr - ₹1.85 Cr", message: "Looking for 3 BHK botanical suite site visit this Saturday.", status: "New", followUpDate: "2026-11-13", notes: "Prefers east-facing higher floor." },
    { id: 102, type: "contact", name: "Sneha Kulkarni", phone: "+91 97654 88990", email: "sneha.k@example.com", propertyTitle: "General Advisory", locality: "Kharadi", budget: "₹95 Lacs - ₹1.5 Cr", message: "Interested in new launches near EON IT Park with possession by 2027.", status: "Contacted", followUpDate: "2026-11-14", notes: "Shared brochure on WhatsApp." },
    { id: 103, type: "property", name: "Amitabh Joshi", phone: "+91 99210 55443", email: "amit.joshi@example.com", propertyTitle: "Lodha Belmondo - Gahunje", locality: "Gahunje", budget: "₹2.40 Cr+", message: "NRI buyer inquiring about ready 4 BHK golf villa options.", status: "Site Visit Scheduled", followUpDate: "2026-11-15", notes: "Airport pickup requested." },
    { id: 104, type: "contact", name: "Priya Nair", phone: "+91 98500 77331", email: "priya.nair@example.com", propertyTitle: "General Advisory", locality: "Baner", budget: "₹1.10 Cr", message: "Comparing 2 & 3 BHK projects near Balewadi High Street.", status: "Follow-up", followUpDate: "2026-11-12", notes: "Need RERA floor plan PDF." },
];

export const DEFAULT_JOBS = [
    // =========================================================
    // ADMIN CATEGORY
    // =========================================================
    {
        id: 1,
        title: "Digital Marketing Specialist",
        department: "Admin & Operations",
        location: "Kharadi, Pune",
        genderCriteria: "Open to All",
        type: "Full-time",
        experience: "2–4 Years",
        salary: "₹35,000 – ₹55,000 / month + Performance Bonus",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
        description: "Lead digital homebuyer acquisition across Google Performance Max, Meta Ads Manager, hyper-local SEO, and real estate conversion landing pages exclusively for Kharadi prime projects.",
        requirements: "Hands-on experience running real estate Meta/Google lead campaigns, GA4 analytics, CPL optimization, and creative ad copies.",
        status: "Open",
    },
    {
        id: 2,
        title: "HR Recruit (Female)",
        department: "Admin & Operations",
        location: "Kharadi, Pune",
        genderCriteria: "Female Candidates Only",
        type: "Full-time",
        experience: "1–3 Years",
        salary: "₹25,000 – ₹40,000 / month + Hiring Incentives",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
        description: "Talent acquisition executive responsible for sourcing, telephonic screening, interviewing, and onboarding sales executives, pre-sales coordinators, and office staff for our Kharadi corporate office.",
        requirements: "Female candidate with prior recruitment experience in real estate or corporate sectors. Excellent spoken Hindi, Marathi, and English with confident interview handling.",
        status: "Open",
    },
    {
        id: 3,
        title: "Sr. HR (Female)",
        department: "Admin & Operations",
        location: "Kharadi, Pune",
        genderCriteria: "Female Candidates Only",
        type: "Full-time",
        experience: "4–8 Years",
        salary: "₹45,000 – ₹70,000 / month",
        image: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&w=800&q=80",
        description: "Senior Human Resources leader overseeing organizational structure, performance appraisal cycles, attendance policies, corporate culture, HR compliance, and employee retention across Pune branches.",
        requirements: "Female candidate with minimum 4+ years in core HR leadership, policy formulation, team building, conflict management, and payroll compliance.",
        status: "Open",
    },
    {
        id: 4,
        title: "Office Boy (Housekeeping & Support)",
        department: "Admin & Operations",
        location: "Kharadi, Pune",
        genderCriteria: "Open to All",
        type: "Full-time",
        experience: "0–2 Years",
        salary: "₹14,000 – ₹18,000 / month",
        image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80",
        description: "Managing corporate office cleanliness, daily pantry stock, serving tea/coffee and refreshments to luxury property buyers and visiting builder partners, and managing physical office errands.",
        requirements: "Punctual, polite, trustworthy, and hygienic with basic knowledge of corporate office etiquette and hospitality.",
        status: "Open",
    },
    {
        id: 5,
        title: "Models for Marketing & Video Shoots",
        department: "Admin & Operations",
        location: "Pune (Kharadi & Project Locations)",
        genderCriteria: "Open (Female & Male Models)",
        type: "Contract / Project",
        experience: "Portfolio / Freshers Welcome",
        salary: "Per Project Shoot / Competitive Retainer",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
        description: "On-camera presenters and fashion/lifestyle models for luxury project walkthrough videos, YouTube property reviews, Instagram reels, developer launch events, and marketing photoshoots across Pune.",
        requirements: "Camera confident, expressive personality, polished styling, clear speech and diction. Prior experience in real estate video hosting or commercial modeling is an added advantage.",
        status: "Open",
    },
    {
        id: 6,
        title: "Network Analyst (IT & Systems)",
        department: "Admin & Operations",
        location: "Kharadi, Pune",
        genderCriteria: "Open to All",
        type: "Full-time",
        experience: "2–5 Years",
        salary: "₹30,000 – ₹50,000 / month",
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
        description: "Manage corporate IT network infrastructure, lead distribution telephony/VoIP routing, CRM network traffic security, local LAN/Wi-Fi reliability, and computer hardware systems across our offices.",
        requirements: "Experience in network troubleshooting, router/firewall security, IP telephony, CRM data routing, and corporate IT hardware support.",
        status: "Open",
    },

    // =========================================================
    // SALES CATEGORY
    // =========================================================
    {
        id: 7,
        title: "Relationship Manager",
        department: "Sales & Advisory",
        location: "Kharadi & Dighi, Pune",
        genderCriteria: "Open to All",
        type: "Full-time",
        experience: "2–6 Years",
        salary: "Competitive Fixed + Uncapped High Commissions",
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80",
        description: "High-ticket residential and commercial advisory. Meet prospective property buyers, coordinate developer site visits, advise on pricing/floor plans, and close high-value real estate bookings.",
        requirements: "Demonstrated success in Pune primary real estate sales (Kharadi or Dighi / Northern corridors preferred). Strong consultative negotiation and client relationship building.",
        status: "Open",
    },
    {
        id: 8,
        title: "Pre Sales Executive (Female / Location Specific)",
        department: "Sales & Advisory",
        location: "Kharadi & Dighi (Female Only) | Katraj (Male eligible)",
        genderCriteria: "Females: Kharadi & Dighi | Males: Katraj",
        type: "Full-time",
        experience: "1–3 Years",
        salary: "₹20,000 – ₹32,000 / month + Booking Incentives",
        image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&q=80",
        description: "Qualify verified buyer inquiries generated from digital marketing. Understand configuration and budget needs, explain project USPs, and schedule confirmed site visit appointments with Relationship Managers.",
        requirements: "Female candidates strictly for Kharadi & Dighi branches; male candidates eligible for Katraj branch. Strong communication in Marathi, Hindi & English with CRM logging skills.",
        status: "Open",
    },
    {
        id: 9,
        title: "Tele Caller Executive (Female / Location Specific)",
        department: "Sales & Advisory",
        location: "Kharadi & Dighi (Female Only) | Katraj (Male eligible)",
        genderCriteria: "Females: Kharadi & Dighi | Males: Katraj",
        type: "Full-time",
        experience: "0–2 Years",
        salary: "₹18,000 – ₹28,000 / month + Incentives",
        image: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80",
        description: "First touchpoint for incoming property seekers. Engage callers professionally, share brochure information, verify requirement parameters, and nurture leads for project site visits.",
        requirements: "Female candidates strictly for Kharadi & Dighi branches; male candidates eligible for Katraj branch. Energetic telephone voice, customer patience, and daily calling discipline.",
        status: "Open",
    },
];

const DEFAULT_APPLICATIONS = [
    { id: 1, jobId: 1, jobTitle: "Senior Property Advisor (West Pune)", name: "Vikram Patil", phone: "+91 98811 22334", email: "vikram.patil@example.com", experience: "4 Years", resumeUrl: "/resumes/vikram-patil-cv.pdf", resumeName: "Vikram_Patil_Resume.pdf", status: "Shortlisted", appliedAt: "2026-11-08" },
    { id: 2, jobId: 2, jobTitle: "Digital Performance Marketing Specialist", name: "Ananya Verma", phone: "+91 97661 44556", email: "ananya.v@example.com", experience: "3 Years", resumeUrl: "/resumes/ananya-verma-cv.pdf", resumeName: "Ananya_Verma_CV.pdf", status: "New", appliedAt: "2026-11-10" },
];

const DEFAULT_MEDIA = [
    { id: 1, name: "Mantra Magnus Site Elevation", url: "/images/mantra-magnus-site-elevation.jpg", type: "image", size: "420 KB", uploadedAt: "2026-11-01" },
    { id: 2, name: "Godrej Properties Logo", url: "/images/logos/godrej.png", type: "image", size: "167 KB", uploadedAt: "2026-11-06" },
    { id: 3, name: "Lodha Gold Logo", url: "/images/logos/lodha.png", type: "image", size: "4 KB", uploadedAt: "2026-11-06" },
    { id: 4, name: "Kohinoor Brand Mark", url: "/images/logos/kohinoor.png", type: "image", size: "8 KB", uploadedAt: "2026-11-06" },
    { id: 5, name: "PPI Hero Background Video", url: "https://play.gumlet.io/embed/6aec1cf3981592d058d2775e", type: "video", size: "Stream", uploadedAt: "2026-10-20" },
    { id: 6, name: "Godrej Ivara RERA Brochure", url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf", type: "document", size: "1.4 MB", uploadedAt: "2026-11-04" },
];

const DEFAULT_FESTIVAL_POPUP = {
    enabled: false,
    badge: "FESTIVE SPECIAL OFFER",
    title: "Diwali & New Year Homebuyer Bonanza",
    subtitle: "Zero Stamp Duty + Assured Gold Coin on Booking",
    description:
        "Unlock exclusive developer festive pricing, flexible payment plans, and complimentary VIP site visits across Pune's top projects.",
    offerCode: "FESTIVE2026",
    image: "",
    buttonText: "Claim Festive Offer",
    buttonUrl: "/contact",
    position: "center",
    pages: "all",
    delaySeconds: 1,
    showOncePerSession: false,
    updatedAt: "",
};

export const DEFAULT_PAGES_SEO = {
    home: {
        pageName: "Home Page",
        route: "/",
        title: "Pune Property Investors | Verified Properties & Real Estate in Pune",
        description: "Discover verified residential apartments, luxury penthouses, commercial spaces, and high-yield investment plots in Kharadi, Baner, Wakad, Hinjewadi, and across Pune.",
        keywords: "Pune Real Estate, Properties in Pune, Buy Flat in Pune, Kharadi Properties, Baner Apartments, Wakad Homes, Hinjewadi Real Estate, PPI Infra",
        canonical: "/",
        robots: "index, follow"
    },
    buy: {
        pageName: "Buy Properties",
        route: "/buy",
        title: "Buy Verified Properties in Pune | 1, 2, 3 & 4 BHK Flats & Villas",
        description: "Browse top RERA-registered residential apartments, luxury penthouses, and gated community villas for sale in Pune. Filter by price, BHK, and prime localities.",
        keywords: "buy flat in Pune, buy 2 BHK in Pune, 3 BHK luxury apartment Pune, ready to move flats Pune, under construction projects Pune, real estate buy Pune",
        canonical: "/buy",
        robots: "index, follow"
    },
    commercial: {
        pageName: "Commercial Properties",
        route: "/commercial",
        title: "Commercial Properties in Pune | Office Spaces & Showrooms For Sale/Lease",
        description: "Explore Grade-A commercial office spaces, retail showrooms, and IT park developments in Kharadi, Hinjewadi, and Baner with high rental yields.",
        keywords: "commercial real estate Pune, office space for sale Pune, IT park lease Kharadi, retail shops Pune, commercial investment Pune",
        canonical: "/commercial",
        robots: "index, follow"
    },
    "new-launches": {
        pageName: "New Launches",
        route: "/new-launches",
        title: "New Launch Residential Projects in Pune | Early Bird Launch Offers",
        description: "Get early-access pricing and zero brokerage on the newest residential project launches by premier developers across East & West Pune.",
        keywords: "new launches Pune, upcoming projects Pune, pre-launch offers real estate Pune, Godrej new launch, Panchshil new projects Pune",
        canonical: "/new-launches",
        robots: "index, follow"
    },
    plots: {
        pageName: "Plots & Land",
        route: "/plots",
        title: "NA Villa Plots & Gated Land for Sale in Pune | Clear Title Land",
        description: "Clear title, PMRDA-sanctioned residential NA villa plots in luxury gated communities with clubhouse amenities around Hinjewadi, Wagholi, and Pune.",
        keywords: "plots for sale Pune, villa plots Pune, NA plots Hinjewadi, gated community plots Pune, residential land Pune",
        canonical: "/plots",
        robots: "index, follow"
    },
    investment: {
        pageName: "High-Yield Investments",
        route: "/investment",
        title: "High-Yield Real Estate Investment Opportunities in Pune | PPI Advisory",
        description: "Data-backed real estate investments with attractive rental yields and capital appreciation in Pune's fastest growing IT and infrastructure corridors.",
        keywords: "real estate investment Pune, high rental yield properties Pune, Pune property ROI, property investors Pune, commercial pre-leased Pune",
        canonical: "/investment",
        robots: "index, follow"
    },
    projects: {
        pageName: "Projects Showcase",
        route: "/projects",
        title: "Top Real Estate Projects in Pune | Premier Developers Showcase",
        description: "Explore flagship residential and commercial master townships by Pune's most reputed builders: Godrej, Panchshil, Lodha, Kolte Patil, and more.",
        keywords: "Pune builders, top projects Pune, Godrej Properties Pune, Panchshil Realty projects, luxury township Pune",
        canonical: "/projects",
        robots: "index, follow"
    },
    properties: {
        pageName: "Properties Catalogue",
        route: "/properties",
        title: "Complete Property Catalogue in Pune | Search & Filter Listings",
        description: "Search and filter verified real estate listings in Pune by locality, budget, configuration, status, and developer.",
        keywords: "Pune property listings, real estate catalog Pune, search flats Pune, filter properties Pune",
        canonical: "/properties",
        robots: "index, follow"
    },
    "property-details": {
        pageName: "Property Details (Template)",
        route: "/properties/[slug]",
        title: "%s | Pune Property Investors - Verified Project Details",
        description: "View verified pricing, floor plans, construction status, amenities, and site tour booking for premier properties in Pune.",
        keywords: "property details Pune, floor plans Pune, price list, brochure download, schedule site visit",
        canonical: "/properties",
        robots: "index, follow"
    },
    search: {
        pageName: "Universal Search",
        route: "/search",
        title: "Search Properties & Projects in Pune | Pune Property Investors",
        description: "Find your ideal home or investment in Pune using intelligent real estate search by locality, budget, configuration, and possession timeline.",
        keywords: "search properties Pune, property finder Pune, find flat in Pune, Pune real estate search",
        canonical: "/search",
        robots: "index, follow"
    },
    about: {
        pageName: "About Us",
        route: "/about",
        title: "About Us | Leading Real Estate Advisory in Pune - Pune Property Investors",
        description: "Learn about Pune Property Investors (PPI Infra), our zero-brokerage advisory model, verified property curation, and client-first real estate team.",
        keywords: "about PPI Infra, Pune Property Investors team, trusted real estate consultant Pune, property advisors Pune",
        canonical: "/about",
        robots: "index, follow"
    },
    contact: {
        pageName: "Contact Us",
        route: "/contact",
        title: "Contact Us | Schedule Site Visit & Expert Advisory | PPI Infra",
        description: "Get in touch with certified Pune property advisors for instant WhatsApp consultations, site visit bookings, and customized real estate recommendations.",
        keywords: "contact Pune Property Investors, property enquiry Pune, schedule site visit Pune, real estate phone number Pune",
        canonical: "/contact",
        robots: "index, follow"
    },
    shorts: {
        pageName: "Video Shorts",
        route: "/shorts",
        title: "Real Estate Video Shorts & Property Walkthroughs | PPI Infra",
        description: "Watch fast, cinematic vertical video walkthroughs, sample flat tours, and developer project reviews across Pune.",
        keywords: "property videos Pune, real estate shorts, sample flat tour Pune, YouTube property reels Pune",
        canonical: "/shorts",
        robots: "index, follow"
    },
    blog: {
        pageName: "Blog & Magazine",
        route: "/blog",
        title: "Pune Real Estate Blog & Market Insights | Trends, Rates & Guides",
        description: "Stay informed with the latest Pune property market trends, locality price appreciation reports, infrastructure updates, and homebuyer legal guides.",
        keywords: "Pune real estate news, property rates Pune, locality guides Pune, real estate investment tips Pune",
        canonical: "/blog",
        robots: "index, follow"
    },
    "privacy-policy": {
        pageName: "Privacy Policy",
        route: "/privacy-policy",
        title: "Privacy Policy | Pune Property Investors",
        description: "Our commitment to data protection, privacy guidelines, and how PPI Infra safeguards client inquiry information.",
        keywords: "privacy policy, terms of service, PPI data security",
        canonical: "/privacy-policy",
        robots: "noindex, follow"
    },
    "terms-and-conditions": {
        pageName: "Terms & Conditions",
        route: "/terms-and-conditions",
        title: "Terms & Conditions | Pune Property Investors",
        description: "Terms of use, MahaRERA advisory disclosures, and client agreements for the Pune Property Investors platform.",
        keywords: "terms and conditions, MahaRERA compliance, disclaimer",
        canonical: "/terms-and-conditions",
        robots: "noindex, follow"
    }
};

const DEFAULT_SETTINGS = {
    website: {
        siteName: "Pune Property Investors",
        tagline: "REALTY • REDEFINED",
        phone: "+917398174444",
        whatsappNumber: "917398174444",
        email: "info@punepropertyinvestor.com",
        officeAddress: "World Trade Center, Tower 3, Kharadi, Pune 411014",
        reraDisclosure: "Zero Brokerage on Primary Developer Bookings | MahaRERA Authorized Advisory",
        facebookUrl: "https://facebook.com",
        instagramUrl: "https://instagram.com",
        youtubeUrl: "https://www.youtube.com/@PunePropertyInvestor",
        linkedinUrl: "https://linkedin.com",
    },
    seo: {
        defaultTitle: "Pune Property Investors | Verified Properties & Real Estate in Pune",
        titleTemplate: "%s | Pune Property Investors",
        defaultDescription: "Discover residential properties, new launches, luxury apartments, and investment opportunities in Kharadi, Baner, Wakad, Hinjewadi, and across Pune.",
        keywords: "Pune Real Estate, Properties in Pune, Buy Flat in Pune, Kharadi Properties, Baner Apartments",
        canonicalUrl: "https://punepropertyinvestor.com",
    },
    pagesSeo: DEFAULT_PAGES_SEO,
    profile: {
        name: "PPI Super Admin",
        email: "admin@punepropertyinvestor.com",
        role: "Super Admin",
        phone: "+91 73981 74444",
    },
};

export function createInitialStore() {
    return {
        properties: propertyListingsData.map((p) => ({
            ...p,
            listingType: p.purpose || "Buy",
            publicationStatus: "Published",
            floorPlans: [],
        })),
        projects: initialProjects.map((proj, index) => ({
            ...proj,
            startingPrice: proj.price,
            highlights: proj.amenities?.slice(0, 3) || [],
            gallery: [proj.image],
            floorPlans: [],
            brochureUrl: "",
            isFeatured: true,
            isTrending: index % 2 === 0,
            isNewLaunch: index < 4,
            publicationStatus: "Published",
        })),
        developers: DEFAULT_DEVELOPERS,
        locations: locationsData.map((loc) => ({
            ...loc,
            city: "Pune",
            areaType: "Locality",
        })),
        leads: DEFAULT_LEADS,
        jobs: DEFAULT_JOBS,
        applications: DEFAULT_APPLICATIONS,
        articles: DEFAULT_ARTICLES,
        news: DEFAULT_NEWS,
        shorts: initialShorts.map((s, idx) => ({
            ...s,
            order: idx + 1,
            visible: true,
            thumbnail: s.thumbnail || "",
        })),
        testimonials: initialTestimonials.map((t) => ({
            ...t,
            designation: t.role || "Homebuyer",
            photo: "",
            visible: true,
        })),
        advertisements: initialAds.map((ad, idx) => ({
            ...ad,
            placement: idx === 0 ? "Sidebar Primary" : "Sidebar Secondary",
            visible: true,
        })),
        media: DEFAULT_MEDIA,
        homepageDraft: {
            sections: DEFAULT_HOMEPAGE_SECTIONS,
            seo: {
                title: DEFAULT_SETTINGS.seo.defaultTitle,
                description: DEFAULT_SETTINGS.seo.defaultDescription,
                slug: "/",
            },
            about: DEFAULT_ABOUT_CONTENT,
            status: "Published",
            updatedAt: new Date().toISOString(),
        },
        homepagePublished: {
            sections: DEFAULT_HOMEPAGE_SECTIONS,
            seo: {
                title: DEFAULT_SETTINGS.seo.defaultTitle,
                description: DEFAULT_SETTINGS.seo.defaultDescription,
                slug: "/",
            },
            about: DEFAULT_ABOUT_CONTENT,
            status: "Published",
            updatedAt: new Date().toISOString(),
        },
        settings: DEFAULT_SETTINGS,
        festivalPopup: { ...DEFAULT_FESTIVAL_POPUP },
        activities: [
            { id: 1, action: "Updated developer brand logos on Property Cards", actor: "Admin", time: "Just now", type: "update" },
            { id: 2, action: "New enquiry received for Godrej Ivara (Hinjewadi)", actor: "Website Lead", time: "25 mins ago", type: "lead" },
            { id: 3, action: "Published Q4 Pune Luxury Market Outlook magazine", actor: "Editorial", time: "2 hours ago", type: "publish" },
            { id: 4, action: "Scheduled site visit for Lodha Belmondo", actor: "CRM Advisor", time: "Yesterday", type: "crm" },
        ],
    };
}

let memoryStore = null;

export function getStore() {
    if (typeof window === "undefined") {
        if (!memoryStore) memoryStore = createInitialStore();
        return memoryStore;
    }

    try {
        const raw = localStorage.getItem(STORE_KEY);
        if (raw) {
            const parsed = JSON.parse(raw);
            if (!parsed.festivalPopup) {
                parsed.festivalPopup = { ...DEFAULT_FESTIVAL_POPUP };
            }
            if (!Array.isArray(parsed.jobs) || parsed.jobs.length < 8) {
                parsed.jobs = [...DEFAULT_JOBS];
                saveStore(parsed);
            }
            return parsed;
        }
    } catch {
        // Fallback to initial seed
    }

    const seeded = createInitialStore();
    saveStore(seeded);
    return seeded;
}

export function saveStore(nextStore) {
    memoryStore = nextStore;
    if (typeof window !== "undefined") {
        try {
            localStorage.setItem(STORE_KEY, JSON.stringify(nextStore));
        } catch {
            // Ignore localStorage quota exceeded
        }
    }
    return nextStore;
}

export function addActivity(action, type = "update", actor = "Admin") {
    const store = getStore();
    const entry = {
        id: Date.now(),
        action,
        type,
        actor,
        time: "Just now",
    };
    store.activities = [entry, ...(store.activities || [])].slice(0, 20);
    saveStore(store);
    return entry;
}

export function resetMockStore() {
    const fresh = createInitialStore();
    saveStore(fresh);
    return fresh;
}

export { DEFAULT_FESTIVAL_POPUP };

