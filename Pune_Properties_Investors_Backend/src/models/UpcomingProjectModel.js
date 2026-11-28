import { query, isDBConnected } from "../config/db.js";

const fallbackUpcomingProjects = [
    {
        id: 1,
        slug: "vtp-aurelia-new-kharadi",
        title: "VTP Aurelia",
        brandSubtext: "VTP REALTY • TOWNSHIP CODENAME PEGASUS",
        developer: "VTP Realty",
        location: "New Kharadi - Riverside Corridor, Pune",
        locality: "New Kharadi",
        badgeText: "GRAND PRE-LAUNCH",
        reraStatus: "MahaRERA Applied",
        youtubeUrl: "https://www.youtube.com/watch?v=yTzvQko2gYo&t=14s",
        youtubeId: "yTzvQko2gYo",
        videoStartSeconds: 14,
        configurations: "2, 3 & 4.5 BHK",
        configurationsSub: "Forest & River Views",
        price: "Starting ₹ 85 Lacs*",
        priceSub: "Zero Floor Rise in EOI",
        launchTimeline: "Pre-Launch 2026–2027",
        launchTimelineSub: "Early Bird Window",
        eyebrow: "EXCLUSIVE PRE-LAUNCH PREVIEW 2026–2027",
        heading: "Upcoming Project Showcase",
        subtitle: "Experience the grand launch and exclusive first look of Pune’s next iconic landmark in New Kharadi. Lock in inaugural pre-registration privileges before public release.",
        whatsappNumber: "917398174444",
        isActive: true,
        isFeatured: true,
        displayOrder: 1,
    },
    {
        id: 2,
        slug: "lodha-giardino-kharadi",
        title: "Lodha Giardino Phase 2",
        brandSubtext: "LODHA LUXURY • PRIME KHARADI",
        developer: "Lodha Group",
        location: "Kharadi, Pune",
        locality: "Kharadi",
        badgeText: "COMING SOON",
        reraStatus: "MahaRERA Registered",
        youtubeUrl: "https://www.youtube.com/watch?v=GbNlxWtdOvA",
        youtubeId: "GbNlxWtdOvA",
        videoStartSeconds: 0,
        configurations: "3 & 4 BHK Luxury Suites",
        configurationsSub: "Private Deck & Club Privileges",
        price: "Starting ₹ 1.95 Cr*",
        priceSub: "Pre-Booking Priority Tokens",
        launchTimeline: "Mid 2026",
        launchTimelineSub: "VIP Investor Allotment",
        eyebrow: "PRE-LAUNCH OPPORTUNITY",
        heading: "Upcoming Luxury Residences",
        subtitle: "Expansive resort-style condominiums set in the heart of Pune's leading IT corridor.",
        whatsappNumber: "917398174444",
        isActive: true,
        isFeatured: false,
        displayOrder: 2,
    }
];

let memoryUpcoming = [...fallbackUpcomingProjects];

function formatUpcomingProject(row) {
    if (!row) return null;

    return {
        id: row.id,
        slug: row.slug || String(row.id),
        title: row.title || "",
        brandSubtext: row.brand_subtext || row.brandSubtext || "",
        developer: row.developer || "",
        location: row.location || "",
        locality: row.locality || "",
        badgeText: row.badge_text || row.badgeText || "GRAND PRE-LAUNCH",
        reraStatus: row.rera_status || row.reraStatus || "MahaRERA Applied",
        youtubeUrl: row.youtube_url || row.youtubeUrl || "",
        youtubeId: row.youtube_id || row.youtubeId || "",
        videoStartSeconds: row.video_start_seconds ?? (row.videoStartSeconds ?? 14),
        configurations: row.configurations || "",
        configurationsSub: row.configurations_sub || row.configurationsSub || "",
        price: row.price || "",
        priceSub: row.price_sub || row.priceSub || "",
        launchTimeline: row.launch_timeline || row.launchTimeline || "",
        launchTimelineSub: row.launch_timeline_sub || row.launchTimelineSub || "",
        eyebrow: row.eyebrow || "EXCLUSIVE PRE-LAUNCH PREVIEW 2026–2027",
        heading: row.heading || "Upcoming Project Showcase",
        subtitle: row.subtitle || "",
        whatsappNumber: row.whatsapp_number || row.whatsappNumber || "917398174444",
        isActive: Boolean(row.is_active ?? true),
        isFeatured: Boolean(row.is_featured ?? false),
        displayOrder: row.display_order ?? (row.displayOrder ?? 0),
        createdAt: row.created_at,
        updatedAt: row.updated_at,
    };
}

export const UpcomingProjectModel = {
    /**
     * Fetch list of upcoming projects
     */
    async getAll(filters = {}) {
        if (isDBConnected()) {
            try {
                let sql = "SELECT * FROM upcoming_projects WHERE 1=1";
                const params = [];

                if (filters.isActive !== undefined) {
                    sql += " AND is_active = ?";
                    params.push(filters.isActive ? 1 : 0);
                } else if (!filters.all) {
                    sql += " AND is_active = 1";
                }

                if (filters.isFeatured !== undefined) {
                    sql += " AND is_featured = ?";
                    params.push(filters.isFeatured ? 1 : 0);
                }

                if (filters.locality) {
                    sql += " AND locality LIKE ?";
                    params.push(`%${filters.locality}%`);
                }

                sql += " ORDER BY display_order ASC, id ASC";

                const rows = await query(sql, params);
                return (rows || []).map(formatUpcomingProject);
            } catch (err) {
                console.error("UpcomingProjectModel.getAll DB error:", err.message);
                throw err;
            }
        }

        // Memory fallback
        let list = [...memoryUpcoming];
        if (filters.isActive !== undefined) {
            list = list.filter((p) => p.isActive === filters.isActive);
        } else if (!filters.all) {
            list = list.filter((p) => p.isActive !== false);
        }
        if (filters.isFeatured !== undefined) {
            list = list.filter((p) => p.isFeatured === filters.isFeatured);
        }
        return list;
    },

    /**
     * Fetch primary featured upcoming project for home showcase
     */
    async getFeatured() {
        if (isDBConnected()) {
            try {
                const rows = await query(
                    "SELECT * FROM upcoming_projects WHERE is_active = 1 AND is_featured = 1 ORDER BY display_order ASC LIMIT 1"
                );
                if (rows && rows.length > 0) {
                    return formatUpcomingProject(rows[0]);
                }
                // Fallback to first active project if none flagged as featured
                const fallbackRows = await query(
                    "SELECT * FROM upcoming_projects WHERE is_active = 1 ORDER BY display_order ASC LIMIT 1"
                );
                return fallbackRows && fallbackRows.length > 0 ? formatUpcomingProject(fallbackRows[0]) : null;
            } catch (err) {
                console.error("UpcomingProjectModel.getFeatured DB error:", err.message);
                throw err;
            }
        }

        const found = memoryUpcoming.find((p) => p.isActive && p.isFeatured);
        return found || memoryUpcoming[0] || null;
    },

    /**
     * Fetch single upcoming project by ID
     */
    async getById(id) {
        if (isDBConnected()) {
            try {
                const rows = await query("SELECT * FROM upcoming_projects WHERE id = ?", [id]);
                return rows && rows.length > 0 ? formatUpcomingProject(rows[0]) : null;
            } catch (err) {
                console.error("UpcomingProjectModel.getById DB error:", err.message);
                throw err;
            }
        }
        const item = memoryUpcoming.find((p) => String(p.id) === String(id));
        return item || null;
    },

    /**
     * Fetch single upcoming project by slug
     */
    async getBySlug(slug) {
        if (isDBConnected()) {
            try {
                const rows = await query("SELECT * FROM upcoming_projects WHERE slug = ?", [slug]);
                return rows && rows.length > 0 ? formatUpcomingProject(rows[0]) : null;
            } catch (err) {
                console.error("UpcomingProjectModel.getBySlug DB error:", err.message);
                throw err;
            }
        }
        const item = memoryUpcoming.find((p) => p.slug === slug);
        return item || null;
    },

    /**
     * Create upcoming project
     */
    async create(data) {
        const slug =
            data.slug ||
            (data.title || "upcoming-project")
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/(^-|-$)/g, "");

        if (isDBConnected()) {
            try {
                const sql = `
                    INSERT INTO upcoming_projects (
                        slug, title, brand_subtext, developer, location, locality,
                        badge_text, rera_status, youtube_url, youtube_id, video_start_seconds,
                        configurations, configurations_sub, price, price_sub,
                        launch_timeline, launch_timeline_sub, eyebrow, heading, subtitle,
                        whatsapp_number, is_active, is_featured, display_order
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                `;
                const params = [
                    slug,
                    data.title,
                    data.brandSubtext || data.brand_subtext || null,
                    data.developer || null,
                    data.location,
                    data.locality || null,
                    data.badgeText || data.badge_text || "GRAND PRE-LAUNCH",
                    data.reraStatus || data.rera_status || "MahaRERA Applied",
                    data.youtubeUrl || data.youtube_url,
                    data.youtubeId || data.youtube_id,
                    data.videoStartSeconds ?? (data.video_start_seconds ?? 14),
                    data.configurations || null,
                    data.configurationsSub || data.configurations_sub || null,
                    data.price || null,
                    data.priceSub || data.price_sub || null,
                    data.launchTimeline || data.launch_timeline || null,
                    data.launchTimelineSub || data.launch_timeline_sub || null,
                    data.eyebrow || "EXCLUSIVE PRE-LAUNCH PREVIEW 2026–2027",
                    data.heading || "Upcoming Project Showcase",
                    data.subtitle || null,
                    data.whatsappNumber || data.whatsapp_number || "917398174444",
                    data.isActive !== undefined ? (data.isActive ? 1 : 0) : 1,
                    data.isFeatured !== undefined ? (data.isFeatured ? 1 : 0) : 0,
                    data.displayOrder ?? (data.display_order ?? 0),
                ];

                const result = await query(sql, params);
                return this.getById(result.insertId);
            } catch (err) {
                console.error("UpcomingProjectModel.create DB error:", err.message);
                throw err;
            }
        }

        const newItem = {
            id: memoryUpcoming.length + 1,
            ...data,
            slug,
        };
        memoryUpcoming.push(newItem);
        return newItem;
    },

    /**
     * Update upcoming project
     */
    async update(id, data) {
        if (isDBConnected()) {
            try {
                const fields = [];
                const params = [];

                if (data.title !== undefined) { fields.push("title = ?"); params.push(data.title); }
                if (data.slug !== undefined) { fields.push("slug = ?"); params.push(data.slug); }
                if (data.brandSubtext !== undefined || data.brand_subtext !== undefined) {
                    fields.push("brand_subtext = ?");
                    params.push(data.brandSubtext || data.brand_subtext);
                }
                if (data.developer !== undefined) { fields.push("developer = ?"); params.push(data.developer); }
                if (data.location !== undefined) { fields.push("location = ?"); params.push(data.location); }
                if (data.locality !== undefined) { fields.push("locality = ?"); params.push(data.locality); }
                if (data.badgeText !== undefined || data.badge_text !== undefined) {
                    fields.push("badge_text = ?");
                    params.push(data.badgeText || data.badge_text);
                }
                if (data.reraStatus !== undefined || data.rera_status !== undefined) {
                    fields.push("rera_status = ?");
                    params.push(data.reraStatus || data.rera_status);
                }
                if (data.youtubeUrl !== undefined || data.youtube_url !== undefined) {
                    fields.push("youtube_url = ?");
                    params.push(data.youtubeUrl || data.youtube_url);
                }
                if (data.youtubeId !== undefined || data.youtube_id !== undefined) {
                    fields.push("youtube_id = ?");
                    params.push(data.youtubeId || data.youtube_id);
                }
                if (data.videoStartSeconds !== undefined || data.video_start_seconds !== undefined) {
                    fields.push("video_start_seconds = ?");
                    params.push(data.videoStartSeconds ?? data.video_start_seconds);
                }
                if (data.configurations !== undefined) { fields.push("configurations = ?"); params.push(data.configurations); }
                if (data.configurationsSub !== undefined || data.configurations_sub !== undefined) {
                    fields.push("configurations_sub = ?");
                    params.push(data.configurationsSub || data.configurations_sub);
                }
                if (data.price !== undefined) { fields.push("price = ?"); params.push(data.price); }
                if (data.priceSub !== undefined || data.price_sub !== undefined) {
                    fields.push("price_sub = ?");
                    params.push(data.priceSub || data.price_sub);
                }
                if (data.launchTimeline !== undefined || data.launch_timeline !== undefined) {
                    fields.push("launch_timeline = ?");
                    params.push(data.launchTimeline || data.launch_timeline);
                }
                if (data.launchTimelineSub !== undefined || data.launch_timeline_sub !== undefined) {
                    fields.push("launch_timeline_sub = ?");
                    params.push(data.launchTimelineSub || data.launch_timeline_sub);
                }
                if (data.eyebrow !== undefined) { fields.push("eyebrow = ?"); params.push(data.eyebrow); }
                if (data.heading !== undefined) { fields.push("heading = ?"); params.push(data.heading); }
                if (data.subtitle !== undefined) { fields.push("subtitle = ?"); params.push(data.subtitle); }
                if (data.whatsappNumber !== undefined || data.whatsapp_number !== undefined) {
                    fields.push("whatsapp_number = ?");
                    params.push(data.whatsappNumber || data.whatsapp_number);
                }
                if (data.isActive !== undefined) { fields.push("is_active = ?"); params.push(data.isActive ? 1 : 0); }
                if (data.isFeatured !== undefined) { fields.push("is_featured = ?"); params.push(data.isFeatured ? 1 : 0); }
                if (data.displayOrder !== undefined) { fields.push("display_order = ?"); params.push(data.displayOrder); }

                if (fields.length > 0) {
                    params.push(id);
                    await query(`UPDATE upcoming_projects SET ${fields.join(", ")} WHERE id = ?`, params);
                }
                return this.getById(id);
            } catch (err) {
                console.error("UpcomingProjectModel.update DB error:", err.message);
                throw err;
            }
        }

        const idx = memoryUpcoming.findIndex((p) => String(p.id) === String(id));
        if (idx !== -1) {
            memoryUpcoming[idx] = { ...memoryUpcoming[idx], ...data };
            return memoryUpcoming[idx];
        }
        return null;
    },

    /**
     * Delete upcoming project
     */
    async delete(id) {
        if (isDBConnected()) {
            try {
                await query("DELETE FROM upcoming_projects WHERE id = ?", [id]);
                return true;
            } catch (err) {
                console.error("UpcomingProjectModel.delete DB error:", err.message);
                throw err;
            }
        }
        memoryUpcoming = memoryUpcoming.filter((p) => String(p.id) !== String(id));
        return true;
    },
};
