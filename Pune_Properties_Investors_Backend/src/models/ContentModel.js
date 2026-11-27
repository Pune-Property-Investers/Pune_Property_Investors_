import { query, isDBConnected } from "../config/db.js";
import { LocationModel } from "./LocationModel.js";
import { ProjectModel } from "./ProjectModel.js";
import { PropertyModel } from "./PropertyModel.js";
import { ArticleModel } from "./ArticleModel.js";
import { DeveloperModel } from "./DeveloperModel.js";
import { CareerModel } from "./CareerModel.js";

const KEYS = {
    homepageDraft: "cms_homepage_draft",
    homepagePublished: "cms_homepage_published",
    festivalPopup: "cms_festival_popup",
    shorts: "cms_shorts",
    testimonials: "cms_testimonials",
    advertisements: "cms_advertisements"
};

let memoryContent = {
    homepageDraft: {
        status: "Published",
        updatedAt: new Date().toISOString()
    },
    homepagePublished: {
        status: "Published",
        updatedAt: new Date().toISOString()
    },
    festivalPopup: {
        active: true,
        title: "Exclusive Launch Privileges",
        subtitle: "Special zero brokerage & developer pre-launch pricing on verified Pune properties.",
        tag: "Limited Period Opportunity",
        ctaText: "Claim Exclusive Offer",
        ctaLink: "/contact"
    },
    shorts: [
        { id: "1", title: "Luxury 3 BHK Penthouse Walkthrough in Kharadi", videoUrl: "https://www.youtube.com/watch?v=M1sDYNUJQrY", thumbnail: "/images/luxury-villa-bg.jpg", visible: true, order: 1 },
        { id: "2", title: "Top 5 Infrastructure Projects Shaping Pune Real Estate", videoUrl: "https://www.youtube.com/watch?v=M1sDYNUJQrY", thumbnail: "/images/hero.png", visible: true, order: 2 }
    ],
    testimonials: [
        { id: "1", name: "Rahul Deshmukh", role: "Homebuyer, Kharadi", comment: "The team at Pune Property Investors made our home buying experience completely hassle-free with zero brokerage and total transparency.", rating: 5, visible: true },
        { id: "2", name: "Priya & Amit Kulkarni", role: "Investors, Hinjewadi", comment: "Exceptional market analysis and verified title verification. Highly recommended for property investors looking for strong ROI.", rating: 5, visible: true }
    ],
    advertisements: [
        { id: "1", title: "New Launch: Godrej Rivergreens", bannerUrl: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80", link: "/buy", placement: "Sidebar Primary", visible: true }
    ]
};

async function readSetting(sectionKey, fallback) {
    if (!isDBConnected()) return Array.isArray(fallback) ? [] : null;
    try {
        const rows = await query("SELECT section_data FROM settings WHERE section_key = ? LIMIT 1", [sectionKey]);
        if (rows && rows.length > 0 && rows[0].section_data !== undefined) {
            const raw = rows[0].section_data;
            return typeof raw === "string" ? JSON.parse(raw) : raw;
        }
    } catch (_) {
        return Array.isArray(fallback) ? [] : null;
    }
    return Array.isArray(fallback) ? [] : null;
}

async function writeSetting(sectionKey, data) {
    if (!isDBConnected()) return;
    try {
        await query(
            `INSERT INTO settings (section_key, section_data)
             VALUES (?, ?)
             ON DUPLICATE KEY UPDATE section_data = VALUES(section_data), updated_at = CURRENT_TIMESTAMP`,
            [sectionKey, JSON.stringify(data)]
        );
    } catch (_) {
        // Keep in-memory state if DB write fails
    }
}

export const ContentModel = {
    async getHomepage() {
        const [draft, published] = await Promise.all([
            readSetting(KEYS.homepageDraft, memoryContent.homepageDraft),
            readSetting(KEYS.homepagePublished, memoryContent.homepagePublished)
        ]);
        return { draft, published };
    },

    async saveHomepageDraft(draft) {
        memoryContent.homepageDraft = { ...draft, status: "Draft", updatedAt: new Date().toISOString() };
        await writeSetting(KEYS.homepageDraft, memoryContent.homepageDraft);
        return memoryContent.homepageDraft;
    },

    async publishHomepage(payload) {
        const base = payload || (await readSetting(KEYS.homepageDraft, memoryContent.homepageDraft));
        memoryContent.homepagePublished = {
            ...base,
            status: "Published",
            publishedAt: new Date().toISOString()
        };
        memoryContent.homepageDraft = { ...memoryContent.homepagePublished };
        await Promise.all([
            writeSetting(KEYS.homepagePublished, memoryContent.homepagePublished),
            writeSetting(KEYS.homepageDraft, memoryContent.homepageDraft)
        ]);
        return memoryContent.homepagePublished;
    },

    async getFestivalPopup() {
        return readSetting(KEYS.festivalPopup, memoryContent.festivalPopup);
    },

    async updateFestivalPopup(payload) {
        const current = await readSetting(KEYS.festivalPopup, memoryContent.festivalPopup);
        memoryContent.festivalPopup = { ...current, ...payload };
        await writeSetting(KEYS.festivalPopup, memoryContent.festivalPopup);
        return memoryContent.festivalPopup;
    },

    async getShorts() {
        return readSetting(KEYS.shorts, memoryContent.shorts);
    },

    async updateShorts(payload) {
        const list = Array.isArray(payload) ? payload : (Array.isArray(payload?.shorts) ? payload.shorts : null);
        if (list) {
            memoryContent.shorts = list;
            await writeSetting(KEYS.shorts, memoryContent.shorts);
        }
        return memoryContent.shorts;
    },

    async getTestimonials() {
        return readSetting(KEYS.testimonials, memoryContent.testimonials);
    },

    async updateTestimonials(payload) {
        const list = Array.isArray(payload) ? payload : (Array.isArray(payload?.testimonials) ? payload.testimonials : null);
        if (list) {
            memoryContent.testimonials = list;
            await writeSetting(KEYS.testimonials, memoryContent.testimonials);
        }
        return memoryContent.testimonials;
    },

    async getAdvertisements() {
        return readSetting(KEYS.advertisements, memoryContent.advertisements);
    },

    async updateAdvertisements(payload) {
        const list = Array.isArray(payload) ? payload : (Array.isArray(payload?.advertisements) ? payload.advertisements : null);
        if (list) {
            memoryContent.advertisements = list;
            await writeSetting(KEYS.advertisements, memoryContent.advertisements);
        }
        return memoryContent.advertisements;
    },

    async getPublicContent() {
        const [homepage, festivalPopup, shorts, testimonials, advertisements, locations, projects, properties, articles, developers, jobs] =
            await Promise.all([
                readSetting(KEYS.homepagePublished, memoryContent.homepagePublished),
                readSetting(KEYS.festivalPopup, memoryContent.festivalPopup),
                readSetting(KEYS.shorts, memoryContent.shorts),
                readSetting(KEYS.testimonials, memoryContent.testimonials),
                readSetting(KEYS.advertisements, memoryContent.advertisements),
                LocationModel.list().catch(() => []),
                ProjectModel.list().catch(() => []),
                PropertyModel.findAll().catch(() => []),
                ArticleModel.list().catch(() => []),
                DeveloperModel.list().catch(() => []),
                CareerModel.listJobs().catch(() => [])
            ]);

        return {
            homepage,
            festivalPopup,
            shorts: Array.isArray(shorts) ? shorts.filter((s) => s.visible !== false) : [],
            testimonials: Array.isArray(testimonials) ? testimonials.filter((t) => t.visible !== false) : [],
            advertisements: Array.isArray(advertisements) ? advertisements.filter((a) => a.visible !== false) : [],
            locations,
            projects,
            properties,
            articles: Array.isArray(articles) ? articles.filter((a) => (a.status || "Published") !== "Draft") : [],
            developers,
            jobs: Array.isArray(jobs) ? jobs.filter((j) => j.status === "Open") : []
        };
    },

    async publishSection(sectionKey) {
        if (sectionKey === "homepage") {
            return this.publishHomepage();
        }
        const publicData = await this.getPublicContent();
        await writeSetting(`cms_section_published_${sectionKey}`, {
            sectionKey,
            publishedAt: new Date().toISOString()
        });
        return {
            sectionKey,
            publishedAt: new Date().toISOString(),
            data: publicData[sectionKey] ?? publicData
        };
    },

    async retrieveSection(sectionKey, mode = "original") {
        const publicData = await this.getPublicContent();
        return {
            sectionKey,
            mode,
            restoredAt: new Date().toISOString(),
            data: publicData[sectionKey] ?? publicData
        };
    },

    async revertHomepage(mode = "original") {
        const published = await readSetting(KEYS.homepagePublished, memoryContent.homepagePublished);
        return {
            mode,
            revertedAt: new Date().toISOString(),
            homepage: published
        };
    }
};
