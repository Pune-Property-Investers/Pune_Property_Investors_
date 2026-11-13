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
        id: "browse-locations",
        type: "browse-locations",
        label: "Browse by Location Marquee",
        enabled: true,
        order: 5,
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
        enabled: true,
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
            eyebrow: "GET IN TOUCH",
            heading: "Connect With Our Pune Real Estate Advisors",
            subtitle: "Looking for inaugural price sheets, verified layouts, or private site visits across Pune? Speak directly with our senior property advisors 7 days a week.",
            buttonText: "Send Inquiry & Connect on WhatsApp",
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

const DEFAULT_JOBS = [
    { id: 1, title: "Senior Property Advisor (West Pune)", department: "Advisory & Sales", location: "Baner, Pune", type: "Full-time", experience: "2–5 Years", description: "Lead consultative site visits and luxury closing cycles across Baner, Wakad, and Hinjewadi.", requirements: "Strong Pune micro-market knowledge, MahaRERA orientation, consultative sales experience.", status: "Open" },
    { id: 2, title: "Digital Performance Marketing Specialist", department: "Marketing", location: "Kharadi, Pune", type: "Full-time", experience: "2–4 Years", description: "Drive qualified homebuyer acquisition through Meta Ads, Google Performance Max campaigns, and hyper-local SEO.", requirements: "Hands-on Google Ads, Meta Business Suite, analytics & funnel optimization.", status: "Open" },
    { id: 3, title: "NRI Client Relationship Manager", department: "NRI Desk", location: "Kalyani Nagar / Hybrid", type: "Full-time", experience: "3–6 Years", description: "Manage virtual walkthroughs, video tours, and end-to-end documentation for overseas investors.", requirements: "Excellent verbal communication, knowledge of FEMA/NRI property norms.", status: "Open" },
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

