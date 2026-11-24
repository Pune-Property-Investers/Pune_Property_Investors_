import { query, isDBConnected } from "../config/db.js";

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

export const DEFAULT_SETTINGS = {
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
        keywords: "Pune Real Estate, Properties in Pune, Buy Flat in Pune, Kharadi Properties, Baner Apartments, Wakad Real Estate, Hinjewadi Homes, PPI Infra",
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

let memorySettings = { ...DEFAULT_SETTINGS };

export const SettingsModel = {
    async getAll() {
        if (isDBConnected()) {
            try {
                const rows = await query("SELECT section_key, section_data FROM settings");
                if (rows && rows.length > 0) {
                    const loaded = { ...DEFAULT_SETTINGS };
                    for (const r of rows) {
                        try {
                            loaded[r.section_key] = typeof r.section_data === "string" 
                                ? JSON.parse(r.section_data) 
                                : r.section_data;
                        } catch (_) {}
                    }
                    return loaded;
                }
            } catch (err) {
                console.warn("DB settings fetch error, using memory:", err.message);
            }
        }
        return memorySettings;
    },

    async getSection(sectionKey) {
        const all = await this.getAll();
        return all[sectionKey] || null;
    },

    async updateSection(sectionKey, payload) {
        const currentAll = await this.getAll();
        const merged = {
            ...(currentAll[sectionKey] || {}),
            ...payload
        };

        memorySettings[sectionKey] = merged;

        if (isDBConnected()) {
            try {
                await query(
                    `INSERT INTO settings (section_key, section_data) 
                     VALUES (?, ?) 
                     ON DUPLICATE KEY UPDATE section_data = VALUES(section_data), updated_at = CURRENT_TIMESTAMP`,
                    [sectionKey, JSON.stringify(merged)]
                );
            } catch (err) {
                console.warn("DB settings save error:", err.message);
            }
        }

        return merged;
    },

    async updatePageSeo(pageKey, pageData) {
        const currentPages = (await this.getSection("pagesSeo")) || DEFAULT_PAGES_SEO;
        const updated = {
            ...currentPages,
            [pageKey]: {
                ...(currentPages[pageKey] || {}),
                ...pageData
            }
        };
        await this.updateSection("pagesSeo", updated);
        return updated[pageKey];
    }
};
