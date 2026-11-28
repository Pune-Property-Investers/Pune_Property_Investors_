import { query, isDBConnected } from "../config/db.js";

const fallbackAdvertisements = [
    {
        id: 1,
        title: "Explore Our Featured Property",
        eyebrow: "FEATURED PROPERTY",
        type: "video",
        description: "Watch the property video and discover your next home in Pune.",
        videoId: "PRCOvxoYAzo",
        videoUrl: "https://www.youtube.com/watch?v=PRCOvxoYAzo",
        image: "https://img.youtube.com/vi/PRCOvxoYAzo/hqdefault.jpg",
        imageUrl: "https://img.youtube.com/vi/PRCOvxoYAzo/hqdefault.jpg",
        buttonText: "Explore Properties",
        buttonUrl: "/properties",
        link: "/properties",
        displayOrder: 1,
        isActive: true,
    },
    {
        id: 2,
        title: "Discover Pune Real Estate",
        eyebrow: "WATCH ON YOUTUBE",
        type: "video",
        description: "Watch our property video and explore real estate opportunities.",
        videoId: "Dyb_iyhg-MU",
        videoUrl: "https://www.youtube.com/watch?v=Dyb_iyhg-MU",
        image: "https://img.youtube.com/vi/Dyb_iyhg-MU/hqdefault.jpg",
        imageUrl: "https://img.youtube.com/vi/Dyb_iyhg-MU/hqdefault.jpg",
        buttonText: "Watch on YouTube",
        buttonUrl: "/properties",
        link: "/properties",
        displayOrder: 2,
        isActive: true,
    },
    {
        id: 3,
        title: "Exclusive Property Tour",
        eyebrow: "PROJECT WALKTHROUGH",
        type: "video",
        description: "Watch our exclusive walkthrough video showcasing prime luxury developments in Pune.",
        videoId: "6EGZJ-RtTqs",
        videoUrl: "https://www.youtube.com/shorts/6EGZJ-RtTqs",
        image: "https://img.youtube.com/vi/6EGZJ-RtTqs/hqdefault.jpg",
        imageUrl: "https://img.youtube.com/vi/6EGZJ-RtTqs/hqdefault.jpg",
        buttonText: "Explore Properties",
        buttonUrl: "/properties",
        link: "/properties",
        displayOrder: 3,
        isActive: true,
    },
];

let memoryAds = [...fallbackAdvertisements];

function formatAdvertisement(row) {
    if (!row) return null;
    return {
        id: row.id,
        title: row.title || "",
        eyebrow: row.eyebrow || "FEATURED PROPERTY",
        type: row.type || "video",
        description: row.description || "",
        videoId: row.video_id || row.videoId || "",
        videoUrl: row.video_url || row.videoUrl || "",
        image: row.image_url || row.imageUrl || row.image || "",
        imageUrl: row.image_url || row.imageUrl || row.image || "",
        buttonText: row.button_text || row.buttonText || "Explore Properties",
        buttonUrl: row.button_url || row.buttonUrl || row.link || "/properties",
        link: row.button_url || row.buttonUrl || row.link || "/properties",
        externalUrl: row.external_url || row.externalUrl || "",
        displayOrder: row.display_order ?? (row.displayOrder ?? 0),
        isActive: Boolean(row.is_active ?? true),
        createdAt: row.created_at,
        updatedAt: row.updated_at,
    };
}

export const AdvertisementModel = {
    async list(filters = {}) {
        if (isDBConnected()) {
            try {
                let sql = "SELECT * FROM advertisements WHERE 1=1";
                const params = [];

                if (filters.isActive !== undefined) {
                    sql += " AND is_active = ?";
                    params.push(filters.isActive ? 1 : 0);
                } else if (!filters.all) {
                    sql += " AND is_active = 1";
                }

                if (filters.type) {
                    sql += " AND type = ?";
                    params.push(filters.type);
                }

                sql += " ORDER BY display_order ASC, id ASC";

                const rows = await query(sql, params);
                return (rows || []).map(formatAdvertisement);
            } catch (err) {
                console.error("AdvertisementModel.list DB error:", err.message);
            }
        }
        let list = [...memoryAds];
        if (filters.isActive !== undefined) {
            list = list.filter((a) => a.isActive === filters.isActive);
        } else if (!filters.all) {
            list = list.filter((a) => a.isActive !== false);
        }
        if (filters.type) {
            list = list.filter((a) => a.type === filters.type);
        }
        return list;
    },

    async getById(id) {
        if (isDBConnected()) {
            try {
                const rows = await query("SELECT * FROM advertisements WHERE id = ?", [id]);
                return rows && rows.length > 0 ? formatAdvertisement(rows[0]) : null;
            } catch (err) {
                console.error("AdvertisementModel.getById DB error:", err.message);
            }
        }
        return memoryAds.find((a) => String(a.id) === String(id)) || null;
    },

    async create(payload) {
        if (isDBConnected()) {
            try {
                const sql = `
                    INSERT INTO advertisements (
                        title, eyebrow, type, description, video_id, video_url, image_url,
                        button_text, button_url, external_url, display_order, is_active
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                `;
                const params = [
                    payload.title,
                    payload.eyebrow || "FEATURED PROPERTY",
                    payload.type || "video",
                    payload.description || "",
                    payload.videoId || payload.video_id || null,
                    payload.videoUrl || payload.video_url || null,
                    payload.imageUrl || payload.image_url || payload.image || null,
                    payload.buttonText || payload.button_text || "Explore Properties",
                    payload.buttonUrl || payload.button_url || payload.link || "/properties",
                    payload.externalUrl || payload.external_url || null,
                    payload.displayOrder ?? (payload.display_order ?? 0),
                    payload.isActive !== undefined ? (payload.isActive ? 1 : 0) : 1,
                ];
                const res = await query(sql, params);
                return this.getById(res.insertId);
            } catch (err) {
                console.error("AdvertisementModel.create DB error:", err.message);
                throw err;
            }
        }

        const nextId = memoryAds.reduce((max, a) => Math.max(max, Number(a.id) || 0), 0) + 1;
        const created = { id: nextId, ...payload };
        memoryAds.push(created);
        return created;
    },

    async update(id, payload) {
        if (isDBConnected()) {
            try {
                const fields = [];
                const params = [];

                if (payload.title !== undefined) { fields.push("title = ?"); params.push(payload.title); }
                if (payload.eyebrow !== undefined) { fields.push("eyebrow = ?"); params.push(payload.eyebrow); }
                if (payload.type !== undefined) { fields.push("type = ?"); params.push(payload.type); }
                if (payload.description !== undefined) { fields.push("description = ?"); params.push(payload.description); }
                if (payload.videoId !== undefined || payload.video_id !== undefined) {
                    fields.push("video_id = ?");
                    params.push(payload.videoId || payload.video_id);
                }
                if (payload.videoUrl !== undefined || payload.video_url !== undefined) {
                    fields.push("video_url = ?");
                    params.push(payload.videoUrl || payload.video_url);
                }
                if (payload.imageUrl !== undefined || payload.image_url !== undefined || payload.image !== undefined) {
                    fields.push("image_url = ?");
                    params.push(payload.imageUrl || payload.image_url || payload.image);
                }
                if (payload.buttonText !== undefined || payload.button_text !== undefined) {
                    fields.push("button_text = ?");
                    params.push(payload.buttonText || payload.button_text);
                }
                if (payload.buttonUrl !== undefined || payload.button_url !== undefined || payload.link !== undefined) {
                    fields.push("button_url = ?");
                    params.push(payload.buttonUrl || payload.button_url || payload.link);
                }
                if (payload.externalUrl !== undefined || payload.external_url !== undefined) {
                    fields.push("external_url = ?");
                    params.push(payload.externalUrl || payload.external_url);
                }
                if (payload.displayOrder !== undefined) { fields.push("display_order = ?"); params.push(payload.displayOrder); }
                if (payload.isActive !== undefined) { fields.push("is_active = ?"); params.push(payload.isActive ? 1 : 0); }

                if (fields.length > 0) {
                    params.push(id);
                    await query(`UPDATE advertisements SET ${fields.join(", ")} WHERE id = ?`, params);
                }
                return this.getById(id);
            } catch (err) {
                console.error("AdvertisementModel.update DB error:", err.message);
                throw err;
            }
        }

        const idx = memoryAds.findIndex((a) => String(a.id) === String(id));
        if (idx !== -1) {
            memoryAds[idx] = { ...memoryAds[idx], ...payload };
            return memoryAds[idx];
        }
        return null;
    },

    async delete(id) {
        if (isDBConnected()) {
            try {
                await query("DELETE FROM advertisements WHERE id = ?", [id]);
                return true;
            } catch (err) {
                console.error("AdvertisementModel.delete DB error:", err.message);
                throw err;
            }
        }
        memoryAds = memoryAds.filter((a) => String(a.id) !== String(id));
        return true;
    },
};
