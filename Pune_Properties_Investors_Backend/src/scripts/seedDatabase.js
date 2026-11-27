import { connectDB, query } from "../config/db.js";
import propertyListingsData from "../../../Pune_Property_Investors_Frontend/src/data/propertyListingsData.js";
import trendingProjects from "../../../Pune_Property_Investors_Frontend/src/data/trendingProjectsData.js";
import { newLaunchProjects } from "../../../Pune_Property_Investors_Frontend/src/data/newLaunchProjectsData.js";
import { projects } from "../../../Pune_Property_Investors_Frontend/src/data/projects.js";
import locationsData from "../../../Pune_Property_Investors_Frontend/src/data/locationsData.js";
import { propertyShorts } from "../../../Pune_Property_Investors_Frontend/src/data/shortsData.js";
import { testimonials } from "../../../Pune_Property_Investors_Frontend/src/data/testimonials.js";

function toSlug(str = "", fallback = "item") {
    const s = String(str || fallback)
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
    return s || fallback;
}

function parseNumericPrice(val, fallbackLabel = "") {
    if (typeof val === "number" && Number.isFinite(val)) return val;
    const raw = String(val || fallbackLabel || "").trim();
    const numMatch = raw.match(/[\d,.]+/);
    if (!numMatch) return 0;
    const num = parseFloat(numMatch[0].replace(/,/g, ""));
    if (!Number.isFinite(num)) return 0;
    if (/cr/i.test(raw)) return Math.round(num * 10000000);
    if (/lac|lakh|\bL\b/i.test(raw)) return Math.round(num * 100000);
    return Math.round(num);
}

function normalizeStatus(status = "") {
    const s = String(status).toLowerCase();
    if (s.includes("ready")) return "Ready to Move";
    if (s.includes("new")) return "New Launch";
    return "Under Construction";
}

function normalizeCategory(type = "") {
    const t = String(type).toLowerCase();
    if (t.includes("commercial") || t.includes("office") || t.includes("shop") || t.includes("retail")) return "commercial";
    if (t.includes("plot") || t.includes("land")) return "plot";
    if (t.includes("luxury") || t.includes("villa") || t.includes("penthouse")) return "luxury";
    return "residential";
}

const CURATED_IMAGE_POOLS = [
    [
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85",
        "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=85",
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=85",
    ],
    [
        "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85",
        "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=85",
        "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=1200&q=85",
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=85",
    ],
    [
        "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=85",
        "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85",
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=85",
        "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1200&q=85",
    ],
    [
        "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=85",
        "https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1200&q=85",
        "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=85",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85",
    ],
    [
        "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=85",
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=85",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85",
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=85",
    ],
];

function ensureMultipleImages(p, seedStr = "") {
    const rawList = [
        p.image,
        ...(Array.isArray(p.images) ? p.images : []),
        ...(Array.isArray(p.gallery) ? p.gallery : []),
    ].filter((u) => typeof u === "string" && u.trim().length > 0);
    const unique = Array.from(new Set(rawList));
    if (unique.length >= 4) return unique;

    const s = seedStr || p.id || p.slug || p.title || p.name || "prop";
    let hash = 0;
    for (let i = 0; i < s.length; i++) {
        hash = (hash << 5) - hash + s.charCodeAt(i);
        hash |= 0;
    }
    const pool = CURATED_IMAGE_POOLS[Math.abs(hash) % CURATED_IMAGE_POOLS.length];
    const res = [...unique];
    for (const img of pool) {
        if (!res.includes(img)) res.push(img);
        if (res.length >= 4) break;
    }
    return res;
}

async function seedProperties() {
    const allProps = [
        ...propertyListingsData.map((p) => {
            const multiImgs = ensureMultipleImages(p, `prop-${p.id}`);
            return {
                id: String(p.id),
                slug: p.slug || toSlug(`${p.title}-${p.id}`, `prop-${p.id}`),
                title: p.title,
                developer: p.projectName || p.developer || "Verified Developer",
                location: p.location || "Pune",
                locality: p.locality || p.location || "Pune",
                city: p.city || "Pune",
                propertyCategory: normalizeCategory(p.propertyType),
                propertyType: p.propertyType || "Apartment",
                purpose: (p.purpose || "buy").toLowerCase(),
                price: p.priceLabel || (p.price ? `₹${Number(p.price).toLocaleString("en-IN")}` : "On Request"),
                numericPrice: Number(p.price || 0),
                bhk: p.bhk ? [p.bhk] : [],
                area: p.area ? `${p.area} ${p.areaUnit || "sq.ft."}` : "",
                status: normalizeStatus(p.possession),
                possession: p.possession || "Under Construction",
                isNewLaunch: Boolean(p.isNewLaunch),
                isFeatured: Boolean(p.featured),
                isTrending: false,
                verified: p.verified !== false,
                badge: p.badge || (p.featured ? "Featured" : ""),
                image: multiImgs[0] || p.image || "",
                images: multiImgs,
                videoUrl: p.videoUrl || "",
                description: p.description || "",
                amenities: Array.isArray(p.amenities) ? p.amenities : []
            };
        }),
        ...trendingProjects.map((p) => {
            const multiImgs = ensureMultipleImages(p, `trending-${p.id}`);
            return {
                id: `trending-${p.id}`,
                slug: p.slug || toSlug(p.title || p.name, `trending-${p.id}`),
                title: p.title || p.name || "Trending Property in Pune",
                developer: p.developer || "Premier Developer",
                location: p.location || "Pune",
                locality: p.locality || p.location?.split(",")[0]?.trim() || "Pune",
                city: "Pune",
                propertyCategory: normalizeCategory(p.propertyType),
                propertyType: p.propertyType || "Apartment",
                purpose: "buy",
                price: p.price || "On Request",
                numericPrice: parseNumericPrice(p.price),
                bhk: p.bhk ? (Array.isArray(p.bhk) ? p.bhk : [p.bhk]) : [],
                area: p.area || "",
                status: normalizeStatus(p.status || p.possession),
                possession: p.possession || "Under Construction",
                isNewLaunch: false,
                isFeatured: true,
                isTrending: true,
                verified: true,
                badge: p.badge || "Trending",
                image: multiImgs[0] || p.image || "",
                images: multiImgs,
                videoUrl: p.videoUrl || "",
                description: p.description || "",
                amenities: Array.isArray(p.amenities) ? p.amenities : []
            };
        }),
        ...newLaunchProjects.map((p) => {
            const multiImgs = ensureMultipleImages(p, `nl-${p.id}`);
            return {
                id: `nl-${p.id}`,
                slug: p.slug || toSlug(p.title || p.name, `new-launch-${p.id}`),
                title: p.title || p.name || "New Launch Property in Pune",
                developer: p.developer || "Premier Developer",
                location: p.location || "Pune",
                locality: p.location?.split(",").slice(-2, -1)[0]?.trim() || p.location || "Pune",
                city: "Pune",
                propertyCategory: normalizeCategory(p.propertyType),
                propertyType: p.propertyType || "Apartment",
                purpose: "buy",
                price: p.price || "On Request",
                numericPrice: parseNumericPrice(p.price),
                bhk: [],
                area: p.area || "",
                status: "New Launch",
                possession: "New Launch",
                isNewLaunch: true,
                isFeatured: Boolean(p.isFeatured),
                isTrending: false,
                verified: true,
                badge: p.typeBadge || "New Launch",
                image: multiImgs[0] || p.image || "",
                images: multiImgs,
                videoUrl: "",
                description: `${p.title || p.name} at ${p.location}. Area: ${p.area}. Rate: ${p.rate || "On Request"}.`,
                amenities: []
            };
        })
    ];

    for (const p of allProps) {
        await query(
            `INSERT INTO properties (
                id, slug, title, developer, location, locality, city,
                property_category, property_type, purpose, price, numeric_price,
                bhk, area, status, possession, is_new_launch, is_featured, is_trending,
                verified, badge, image, images, video_url, description, amenities
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE
                title = VALUES(title),
                developer = VALUES(developer),
                location = VALUES(location),
                locality = VALUES(locality),
                property_category = VALUES(property_category),
                property_type = VALUES(property_type),
                price = VALUES(price),
                numeric_price = VALUES(numeric_price),
                bhk = VALUES(bhk),
                area = VALUES(area),
                status = VALUES(status),
                possession = VALUES(possession),
                is_new_launch = VALUES(is_new_launch),
                is_featured = VALUES(is_featured),
                is_trending = VALUES(is_trending),
                badge = VALUES(badge),
                image = VALUES(image),
                images = VALUES(images),
                description = VALUES(description),
                amenities = VALUES(amenities)`,
            [
                p.id ?? "", p.slug ?? "", p.title ?? "Property in Pune", p.developer ?? "", p.location ?? "Pune", p.locality ?? "Pune", p.city ?? "Pune",
                p.propertyCategory ?? "residential", p.propertyType ?? "Apartment", p.purpose ?? "buy", p.price ?? "On Request", p.numericPrice ?? 0,
                JSON.stringify(p.bhk ?? []), p.area ?? "", p.status ?? "Under Construction", p.possession ?? "",
                p.isNewLaunch ? 1 : 0, p.isFeatured ? 1 : 0, p.isTrending ? 1 : 0,
                p.verified ? 1 : 0, p.badge ?? "", p.image ?? "", JSON.stringify(p.images ?? []),
                p.videoUrl ?? "", p.description ?? "", JSON.stringify(p.amenities ?? [])
            ]
        );
    }
    return allProps.length;
}

async function seedProjects() {
    for (const p of projects) {
        const slug = p.slug || toSlug(p.name, `proj-${p.id}`);
        await query(
            `INSERT INTO projects (id, name, slug, developer, location, locality, price, status, publication_status, configurations, possession_date, featured, image, description)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'Published', ?, ?, 1, ?, ?)
             ON DUPLICATE KEY UPDATE
                name = VALUES(name),
                developer = VALUES(developer),
                location = VALUES(location),
                locality = VALUES(locality),
                price = VALUES(price),
                status = VALUES(status),
                configurations = VALUES(configurations),
                possession_date = VALUES(possession_date),
                image = VALUES(image),
                description = VALUES(description)`,
            [
                String(p.id), p.name, slug, p.developer || "", p.location || "",
                p.location?.split(",")[0]?.trim() || "Pune", p.price || "",
                p.status || "Under Construction", p.configuration || "",
                p.possession || "", p.image || "", p.description || ""
            ]
        );
    }
    return projects.length;
}

async function seedLocations() {
    for (const loc of locationsData) {
        const slug = loc.slug || toSlug(loc.name, `loc-${loc.id}`);
        const avgSqft = Number(String(loc.avgRate || 0).replace(/[^0-9]/g, "")) || 0;
        await query(
            `INSERT INTO locations (slug, name, tagline, avg_price_per_sqft, price_growth_rate, landmarks, image, description)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)
             ON DUPLICATE KEY UPDATE
                name = VALUES(name),
                tagline = VALUES(tagline),
                avg_price_per_sqft = VALUES(avg_price_per_sqft),
                image = VALUES(image),
                description = VALUES(description)`,
            [
                slug, loc.name, loc.zone || "", avgSqft, loc.listingsCount || "",
                JSON.stringify([]), loc.image || "", loc.subtitle || loc.description || ""
            ]
        );
    }
    return locationsData.length;
}

async function seedDevelopers() {
    const devs = [
        { name: "Paras Buildtech", domain: "parasbuildtech.com", logoUrl: "/images/logos/paras-emperor.png", website: "https://parasbuildtech.com", phone: "+91 73981 74444", email: "sales@parasbuildtech.com", description: "Luxury residential & commercial landmarks." },
        { name: "Godrej Properties", domain: "godrejproperties.com", logoUrl: "/images/logos/godrej.png", website: "https://www.godrejproperties.com", phone: "+91 73981 74444", email: "info@godrejproperties.com", description: "125+ years of trust and sustainable urban townships across Pune." },
        { name: "Kolte-Patil Developers", domain: "koltepatil.com", logoUrl: "/images/logos/kolte-patil.jpg", website: "https://www.koltepatil.com", phone: "+91 73981 74444", email: "info@koltepatil.com", description: "Pune's leading township builder behind Life Republic." },
        { name: "VTP Realty", domain: "vtprealty.in", logoUrl: "/images/logos/vtp.png", website: "https://www.vtprealty.in", phone: "+91 73981 74444", email: "info@vtprealty.in", description: "Pune's #1 real estate brand known for MLA homes in Kharadi & Mahalunge." },
        { name: "Sobha Limited", domain: "sobha.com", logoUrl: "/images/logos/sobha.png", website: "https://www.sobha.com", phone: "+91 73981 74444", email: "sales@sobha.com", description: "Backward-integrated luxury developer acclaimed for German-grade quality." },
        { name: "Shapoorji Pallonji", domain: "shapoorjirealestate.com", logoUrl: "/images/logos/shapoorji.svg", website: "https://www.shapoorjirealestate.com", phone: "+91 73981 74444", email: "care@shapoorjirealestate.com", description: "150-year engineering legacy crafting Joyville smart communities." },
        { name: "Lodha Group", domain: "lodhagroup.com", logoUrl: "/images/logos/lodha.png", website: "https://www.lodhagroup.in", phone: "+91 73981 74444", email: "sales@lodhagroup.com", description: "India's premier luxury real estate developer." },
        { name: "Kohinoor Group", domain: "kohinoorpune.com", logoUrl: "/images/logos/kohinoor.png", website: "https://www.kohinoorpune.com", phone: "+91 73981 74444", email: "sales@kohinoorpune.com", description: "Sada Sukhi Raho philosophy across 40+ years in Pune." }
    ];
    const existing = await query("SELECT COUNT(*) as c FROM developers");
    if (existing[0].c === 0) {
        for (const d of devs) {
            await query(
                `INSERT INTO developers (name, domain, logo_url, website, phone, email, description) VALUES (?, ?, ?, ?, ?, ?, ?)`,
                [d.name, d.domain, d.logoUrl, d.website, d.phone, d.email, d.description]
            );
        }
    }
    return devs.length;
}

async function seedArticles() {
    const articles = [
        {
            type: "blog",
            title: "Top 7 High-Growth Localities to Buy Property in Pune (2026 Edition)",
            slug: "top-high-growth-localities-pune",
            category: "Locality Guide",
            author: "Pune Property Research Team",
            date: "2026-10-24",
            readTime: "6 min read",
            image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85",
            excerpt: "From Kharadi's IT corridor expansion to Baner and Wakad's connectivity surge, discover where smart homebuyers and NRI investors are securing highest rental yields.",
            content: "<p>Pune's real estate landscape continues to outperform tier-1 peers due to balanced IT employment growth, Metro corridors, and integrated township supply.</p>"
        },
        {
            type: "blog",
            title: "First-Time Homebuyer's Checklist: Documents, RERA, and Stamp Duty in Maharashtra",
            slug: "first-time-homebuyer-checklist-maharashtra",
            category: "Buying Guide",
            author: "Legal Advisory Desk",
            date: "2026-10-18",
            readTime: "5 min read",
            image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=85",
            excerpt: "A step-by-step roadmap to navigating MahaRERA registration, title clearance verification, home loan eligibility, and government registration fees in Pune.",
            content: "<p>Always verify the MahaRERA registration number, sanctioned commencement certificate (CC), and carpet area statement before paying token booking amounts.</p>"
        },
        {
            type: "magazine",
            title: "Q4 Pune Luxury Market Outlook: Riverfront Townships & Sky Villas",
            slug: "q4-pune-luxury-market-outlook",
            category: "PPI Magazine",
            author: "Editorial Board",
            date: "2026-11-01",
            readTime: "7 min read",
            image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85",
            excerpt: "An in-depth quarterly magazine feature analyzing ₹1.5 Cr+ demand across Mundhwa, Kothrud, and Koregaon Park Annexe.",
            content: "<p>End-user upgrades to 3.5 & 4 BHK sky suites surged 24% YoY across Pune's premium corridors.</p>"
        },
        {
            type: "news",
            title: "Pune Metro Line 3 Trials Commence: 23 Stations Connecting Hinjewadi to Civil Court",
            slug: "pune-metro-line-3-trials-commence",
            category: "Metro & Transit",
            author: "Pune Urban Infrastructure Bureau",
            date: "2026-10-27",
            readTime: "4 min read",
            image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=85",
            excerpt: "The 23.3 km elevated corridor enters final trial runs across Wakad, Baner, Balewadi, and Aundh.",
            content: "<p>Trial operations along Hinjewadi Phase 3 to Balewadi have shown steady progress ahead of passenger launch.</p>"
        }
    ];

    for (const a of articles) {
        await query(
            `INSERT INTO articles (type, title, slug, category, author, date, read_time, status, image, excerpt, content)
             VALUES (?, ?, ?, ?, ?, ?, ?, 'Published', ?, ?, ?)
             ON DUPLICATE KEY UPDATE
                title = VALUES(title),
                excerpt = VALUES(excerpt),
                content = VALUES(content)`,
            [a.type, a.title, a.slug, a.category, a.author, a.date, a.readTime, a.image, a.excerpt, a.content]
        );
    }
    return articles.length;
}

async function seedJobs() {
    const existing = await query("SELECT COUNT(*) as c FROM jobs");
    if (existing[0].c === 0) {
        const jobs = [
            { title: "Digital Marketing Specialist", category: "Admin & Operations", location: "Kharadi, Pune", experience: "2-4 Years", type: "Full-time", status: "Open", description: "Lead digital homebuyer acquisition across Google Performance Max, Meta Ads Manager, hyper-local SEO, and real estate conversion landing pages." },
            { title: "HR Recruit (Female)", category: "Admin & Operations", location: "Kharadi, Pune", experience: "1-3 Years", type: "Full-time", status: "Open", description: "Manage talent acquisition, onboarding, and team engagement for Pune Property Investors." },
            { title: "Senior Real Estate Investment Advisor", category: "Sales & Advisory", location: "Kharadi, Pune", experience: "3-6 Years", type: "Full-time", status: "Open", description: "Guide high-net-worth clients and homebuyers in making informed property purchases across Pune's prime luxury corridors." }
        ];
        for (const j of jobs) {
            await query(
                `INSERT INTO jobs (title, category, location, experience, type, status, description) VALUES (?, ?, ?, ?, ?, ?, ?)`,
                [j.title, j.category, j.location, j.experience, j.type, j.status, j.description]
            );
        }
    }
}

async function seedContentSettings() {
    const shortsPayload = propertyShorts.map((s, idx) => ({
        id: String(s.id),
        title: s.title,
        subtitle: s.subtitle,
        videoUrl: s.youtubeUrl || `https://www.youtube.com/watch?v=${s.youtubeId}`,
        youtubeId: s.youtubeId,
        location: s.location,
        price: s.price,
        propertySlug: s.propertySlug,
        visible: true,
        order: idx + 1
    }));

    const testimonialsPayload = testimonials.map((t) => ({
        id: String(t.id),
        name: t.name,
        role: t.role,
        comment: t.quote,
        quote: t.quote,
        rating: t.rating || 5,
        visible: true
    }));

    await query(
        `INSERT INTO settings (section_key, section_data) VALUES ('cms_shorts', ?) ON DUPLICATE KEY UPDATE section_data = VALUES(section_data)`,
        [JSON.stringify(shortsPayload)]
    );
    await query(
        `INSERT INTO settings (section_key, section_data) VALUES ('cms_testimonials', ?) ON DUPLICATE KEY UPDATE section_data = VALUES(section_data)`,
        [JSON.stringify(testimonialsPayload)]
    );
}

async function run() {
    const pool = await connectDB();
    if (!pool) {
        console.error("❌ MySQL is not connected. Aborting seed.");
        process.exit(1);
    }

    const propCount = await seedProperties();
    const projCount = await seedProjects();
    const locCount = await seedLocations();
    const devCount = await seedDevelopers();
    const artCount = await seedArticles();
    await seedJobs();
    await seedContentSettings();

    console.log(`✅ Seeded MySQL: ${propCount} properties, ${projCount} projects, ${locCount} locations, ${devCount} developers, ${artCount} articles + jobs, shorts, testimonials.`);
    process.exit(0);
}

run().catch((err) => {
    console.error("Seed error:", err);
    process.exit(1);
});
