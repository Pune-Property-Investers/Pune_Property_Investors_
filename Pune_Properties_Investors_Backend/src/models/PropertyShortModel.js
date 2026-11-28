import { query, isDBConnected } from "../config/db.js";

const fallbackReels = [
    {
        id: "reel-sky-luxe-joyville",
        title: "Sky Luxe Joyville",
        displayTitle: "Premium 2 BHK ...",
        duration: "1:34",
        location: "Hadapsar, Pune",
        developer: "Shapoorji Pallonji",
        youtubeUrl: "https://www.youtube.com/shorts/GbNlxWtdOvA",
        youtubeId: "GbNlxWtdOvA",
        thumbnail: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=720&q=80",
        price: "₹ 1.25 Cr*",
        configurations: "2 & 3 BHK",
        likes: "3.1K",
        likesCount: 3100,
        description: "Ultra-spacious 2 & 3 BHK luxury residences with modern clubhouse and landscaped greens in Hadapsar.",
        isVisible: true,
        displayOrder: 1
    },
    {
        id: "reel-kumar-primavera",
        title: "Kumar Primavera",
        displayTitle: "Kumar Primevi...",
        duration: "1:21",
        location: "Hadapsar, Pune",
        developer: "Kumar Properties",
        youtubeUrl: "https://www.youtube.com/shorts/M1sDYNUJQrY",
        youtubeId: "M1sDYNUJQrY",
        thumbnail: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=720&q=80",
        price: "₹ 95 Lacs*",
        configurations: "2 BHK",
        likes: "2.4K",
        likesCount: 2400,
        description: "Contemporary design residences near Magarpatta City with premium amenities.",
        isVisible: true,
        displayOrder: 2
    },
    {
        id: "reel-kumar-magna",
        title: "Kumar Magna",
        displayTitle: "Kumar Magnac...",
        duration: "1:42",
        location: "Hadapsar, Pune",
        developer: "Kumar Properties",
        youtubeUrl: "https://www.youtube.com/shorts/v1KcS0G22EQ",
        youtubeId: "v1KcS0G22EQ",
        thumbnail: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=720&q=80",
        price: "₹ 1.45 Cr*",
        configurations: "3 BHK",
        likes: "4.2K",
        likesCount: 4200,
        description: "Exclusive high-rise living with sundecks and panoramic city views.",
        isVisible: true,
        displayOrder: 3
    },
    {
        id: "short-ganga-avanta",
        title: "Ganga Avanta",
        displayTitle: "Ganga Avanta",
        duration: "1:15",
        location: "Mundhwa, Pune",
        developer: "Goel Ganga Developments",
        youtubeUrl: "https://www.youtube.com/shorts/GbNlxWtdOvA",
        youtubeId: "GbNlxWtdOvA",
        thumbnail: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=720&q=80",
        price: "₹ 2.02 Cr*",
        configurations: "3 & 4 BHK",
        likes: "3.1K",
        likesCount: 3100,
        description: "Ultra-spacious simplex and duplex riverfront sky suites with triple-height entrance lobbies and 30+ international standard lifestyle amenities.",
        isVisible: true,
        displayOrder: 4
    },
    {
        id: "short-empyrean-leela",
        title: "Empyrean Leela",
        displayTitle: "Empyrean Leela",
        duration: "1:28",
        location: "Kharadi, Pune",
        developer: "Empyrean Realty",
        youtubeUrl: "https://www.youtube.com/shorts/M1sDYNUJQrY",
        youtubeId: "M1sDYNUJQrY",
        thumbnail: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=720&q=80",
        price: "₹ 1.25 Cr*",
        configurations: "2 & 3 BHK",
        likes: "4.8K",
        likesCount: 4800,
        description: "Signature architectural luxury in Kharadi featuring Italian marble, deck balconies, landscaped courtyards & 40+ lifestyle amenities.",
        isVisible: true,
        displayOrder: 5
    },
    {
        id: "short-amara-keshav",
        title: "Amara Riverside",
        displayTitle: "Amara Riverside",
        duration: "1:45",
        location: "Keshav Nagar, Pune",
        developer: "Amara Living",
        youtubeUrl: "https://www.youtube.com/shorts/v1KcS0G22EQ",
        youtubeId: "v1KcS0G22EQ",
        thumbnail: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=720&q=80",
        price: "₹ 85 Lacs*",
        configurations: "2 & 3 BHK",
        likes: "3.9K",
        likesCount: 3900,
        description: "Riverside living nestled in Keshav Nagar offering rooftop infinity pool, yoga decks, and 5 mins connectivity to Koregaon Park.",
        isVisible: true,
        displayOrder: 6
    },
    {
        id: "short-adani-atelier",
        title: "Adani Atelier Greens",
        displayTitle: "Adani Atelier",
        duration: "1:30",
        location: "Koregaon Park Annex, Pune",
        developer: "Adani Realty",
        youtubeUrl: "https://www.youtube.com/shorts/GbNlxWtdOvA",
        youtubeId: "GbNlxWtdOvA",
        thumbnail: "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&w=720&q=80",
        price: "₹ 1.65 Cr*",
        configurations: "2.5 & 3 BHK",
        likes: "5.2K",
        likesCount: 5200,
        description: "Vertical green living surrounded by lush bio-diverse vertical gardens and club facilities in Koregaon Park Annex.",
        isVisible: true,
        displayOrder: 7
    }
];

let memoryReels = [...fallbackReels];

function extractYtId(url, fallbackId = "") {
    if (!url) return fallbackId;
    const m = String(url).match(/(?:shorts\/|v=|youtu\.be\/|\/embed\/)([a-zA-Z0-9_-]{11})/);
    return m ? m[1] : fallbackId;
}

function mapRowToReel(row) {
    if (!row) return null;
    const ytId = row.youtube_id || extractYtId(row.youtube_url);
    const likesCount = row.likes_count || 0;
    const likesFormatted = likesCount >= 1000 ? `${(likesCount / 1000).toFixed(1)}K` : String(likesCount);

    return {
        id: row.id,
        slug: row.slug || String(row.id),
        title: row.title,
        displayTitle: row.display_title || row.title,
        duration: row.duration || "1:30",
        location: row.location || "",
        price: row.price || "",
        configurations: row.configurations || "",
        developer: row.developer || "",
        youtubeUrl: row.youtube_url || "",
        youtubeId: ytId,
        thumbnail: row.thumbnail_url || `https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=720&q=80`,
        thumbnailUrl: row.thumbnail_url || `https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=720&q=80`,
        likes: likesFormatted,
        likesCount: likesCount,
        description: row.description || "",
        isVisible: Boolean(row.is_visible ?? true),
        displayOrder: row.display_order ?? 0,
        propertyId: row.property_id || null,
        createdAt: row.created_at,
        updatedAt: row.updated_at
    };
}

export const PropertyShortModel = {
    /**
     * Fetch all property shorts/reels
     */
    async list(filters = {}) {
        if (isDBConnected()) {
            try {
                let sql = "SELECT * FROM property_shorts WHERE 1=1";
                const params = [];

                if (filters.isVisible !== undefined) {
                    sql += " AND is_visible = ?";
                    params.push(filters.isVisible ? 1 : 0);
                } else {
                    sql += " AND is_visible = 1";
                }

                if (filters.developer) {
                    sql += " AND developer = ?";
                    params.push(filters.developer);
                }

                if (filters.location) {
                    sql += " AND location LIKE ?";
                    params.push(`%${filters.location}%`);
                }

                sql += " ORDER BY display_order ASC, id ASC";

                const rows = await query(sql, params);
                if (rows && rows.length > 0) {
                    return rows.map(mapRowToReel);
                }
            } catch (err) {
                console.error("PropertyShortModel.list DB error:", err.message);
            }
        }
        return [...memoryReels];
    },

    /**
     * Fetch single reel by ID or slug
     */
    async getById(idOrSlug) {
        if (isDBConnected()) {
            try {
                const rows = await query(
                    "SELECT * FROM property_shorts WHERE id = ? OR slug = ? LIMIT 1",
                    [idOrSlug, idOrSlug]
                );
                if (rows && rows.length > 0) {
                    return mapRowToReel(rows[0]);
                }
            } catch (err) {
                console.error("PropertyShortModel.getById DB error:", err.message);
            }
        }
        return (
            memoryReels.find(
                (r) => String(r.id) === String(idOrSlug) || r.slug === idOrSlug
            ) || null
        );
    },

    /**
     * Create new reel
     */
    async create(data) {
        const slug = data.slug || (data.title ? data.title.toLowerCase().replace(/[^a-z0-9]+/g, "-") : `short-${Date.now()}`);
        const ytId = data.youtubeId || extractYtId(data.youtubeUrl);
        const thumb = data.thumbnailUrl || data.thumbnail || `https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=720&q=80`;

        if (isDBConnected()) {
            try {
                const result = await query(
                    `INSERT INTO property_shorts (
                        slug, title, display_title, duration, location, price,
                        configurations, developer, youtube_url, youtube_id,
                        thumbnail_url, likes_count, description, is_visible, display_order, property_id
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                    [
                        slug,
                        data.title,
                        data.displayTitle || data.title,
                        data.duration || "1:30",
                        data.location || "",
                        data.price || "",
                        data.configurations || "",
                        data.developer || "",
                        data.youtubeUrl || "",
                        ytId,
                        thumb,
                        data.likesCount || 0,
                        data.description || "",
                        data.isVisible !== undefined ? (data.isVisible ? 1 : 0) : 1,
                        data.displayOrder || 0,
                        data.propertyId || null
                    ]
                );
                return this.getById(result.insertId);
            } catch (err) {
                console.error("PropertyShortModel.create DB error:", err.message);
                throw err;
            }
        }

        const newId = memoryReels.length > 0 ? Math.max(...memoryReels.map((r) => Number(r.id) || 0)) + 1 : 1;
        const newReel = {
            id: newId,
            slug,
            ...data,
            youtubeId: ytId,
            thumbnail: thumb,
            thumbnailUrl: thumb,
            isVisible: data.isVisible !== undefined ? data.isVisible : true,
            displayOrder: data.displayOrder || newId
        };
        memoryReels.push(newReel);
        return newReel;
    },

    /**
     * Update existing reel
     */
    async update(id, data) {
        if (isDBConnected()) {
            try {
                const fields = [];
                const params = [];

                if (data.slug !== undefined) { fields.push("slug = ?"); params.push(data.slug); }
                if (data.title !== undefined) { fields.push("title = ?"); params.push(data.title); }
                if (data.displayTitle !== undefined) { fields.push("display_title = ?"); params.push(data.displayTitle); }
                if (data.duration !== undefined) { fields.push("duration = ?"); params.push(data.duration); }
                if (data.location !== undefined) { fields.push("location = ?"); params.push(data.location); }
                if (data.price !== undefined) { fields.push("price = ?"); params.push(data.price); }
                if (data.configurations !== undefined) { fields.push("configurations = ?"); params.push(data.configurations); }
                if (data.developer !== undefined) { fields.push("developer = ?"); params.push(data.developer); }
                if (data.youtubeUrl !== undefined) {
                    fields.push("youtube_url = ?");
                    params.push(data.youtubeUrl);
                    fields.push("youtube_id = ?");
                    params.push(extractYtId(data.youtubeUrl, data.youtubeId));
                }
                if (data.youtubeId !== undefined && !data.youtubeUrl) {
                    fields.push("youtube_id = ?");
                    params.push(data.youtubeId);
                }
                if (data.thumbnail !== undefined || data.thumbnailUrl !== undefined) {
                    fields.push("thumbnail_url = ?");
                    params.push(data.thumbnailUrl || data.thumbnail);
                }
                if (data.likesCount !== undefined) { fields.push("likes_count = ?"); params.push(data.likesCount); }
                if (data.description !== undefined) { fields.push("description = ?"); params.push(data.description); }
                if (data.isVisible !== undefined) { fields.push("is_visible = ?"); params.push(data.isVisible ? 1 : 0); }
                if (data.displayOrder !== undefined) { fields.push("display_order = ?"); params.push(data.displayOrder); }
                if (data.propertyId !== undefined) { fields.push("property_id = ?"); params.push(data.propertyId); }

                if (fields.length > 0) {
                    params.push(id);
                    await query(`UPDATE property_shorts SET ${fields.join(", ")} WHERE id = ?`, params);
                }
                return this.getById(id);
            } catch (err) {
                console.error("PropertyShortModel.update DB error:", err.message);
                throw err;
            }
        }

        const idx = memoryReels.findIndex((r) => String(r.id) === String(id));
        if (idx !== -1) {
            memoryReels[idx] = { ...memoryReels[idx], ...data };
            return memoryReels[idx];
        }
        return null;
    },

    /**
     * Delete reel
     */
    async delete(id) {
        if (isDBConnected()) {
            try {
                await query("DELETE FROM property_shorts WHERE id = ?", [id]);
                return true;
            } catch (err) {
                console.error("PropertyShortModel.delete DB error:", err.message);
                throw err;
            }
        }
        const initialLength = memoryReels.length;
        memoryReels = memoryReels.filter((r) => String(r.id) !== String(id));
        return memoryReels.length < initialLength;
    }
};
