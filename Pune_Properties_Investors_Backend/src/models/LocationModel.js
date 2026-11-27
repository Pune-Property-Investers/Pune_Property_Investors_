import { query, isDBConnected } from "../config/db.js";

let memoryLocations = [
    { id: 1, name: "Kharadi", slug: "kharadi", zone: "East Pune", subtitle: "Global IT Hub & Premium Riverside Living", avgRate: "₹10,500 / sq.ft", isFeatured: true, image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80" },
    { id: 2, name: "Baner", slug: "baner", zone: "West Pune", subtitle: "High Street, Lifestyle & Western Corridor", avgRate: "₹9,800 / sq.ft", isFeatured: true, image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80" },
    { id: 3, name: "Hinjewadi", slug: "hinjewadi", zone: "West Pune", subtitle: "The Silicon Core of Pune", avgRate: "₹7,800 / sq.ft", isFeatured: true, image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80" },
    { id: 4, name: "Wakad", slug: "wakad", zone: "West Pune", subtitle: "Family Living with Seamless Connectivity", avgRate: "₹7,650 / sq.ft", isFeatured: false, image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80" },
    { id: 5, name: "Hadapsar", slug: "hadapsar", zone: "East Pune", subtitle: "SP Infocity & Integrated Mega-Townships", avgRate: "₹8,200 / sq.ft", isFeatured: false, image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80" }
];

function toSlug(name = "") {
    return String(name).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export const LocationModel = {
    async list() {
        if (!isDBConnected()) return [];
        const rows = await query("SELECT * FROM locations ORDER BY id DESC");
        return Array.isArray(rows) ? rows : [];
    },

    async getById(id) {
        if (!isDBConnected()) return null;
        const rows = await query("SELECT * FROM locations WHERE id = ? OR slug = ? LIMIT 1", [id, id]);
        return rows && rows.length > 0 ? rows[0] : null;
    },

    async create(payload) {
        const slug = payload.slug || toSlug(payload.name || `location-${Date.now()}`);
        if (isDBConnected()) {
            try {
                const avgSqft = Number(String(payload.avg_price_per_sqft || payload.avgRate || 0).replace(/[^0-9]/g, "")) || 0;
                const result = await query(
                    `INSERT INTO locations (slug, name, tagline, avg_price_per_sqft, price_growth_rate, landmarks, image, description)
                     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
                    [
                        slug,
                        payload.name || "Untitled Location",
                        payload.tagline || payload.subtitle || payload.zone || "",
                        avgSqft,
                        payload.price_growth_rate || payload.growthRate || "",
                        JSON.stringify(payload.landmarks || []),
                        payload.image || "",
                        payload.description || payload.subtitle || ""
                    ]
                );
                if (result?.insertId) {
                    return { id: result.insertId, slug, ...payload };
                }
            } catch (_) {}
        }
        const nextId = memoryLocations.reduce((max, item) => Math.max(max, Number(item.id) || 0), 0) + 1;
        const created = { id: nextId, slug, ...payload };
        memoryLocations.push(created);
        return created;
    },

    async update(id, payload) {
        if (isDBConnected()) {
            try {
                const updates = [];
                const values = [];
                const map = {
                    name: "name",
                    slug: "slug",
                    tagline: "tagline",
                    subtitle: "tagline",
                    price_growth_rate: "price_growth_rate",
                    image: "image",
                    description: "description"
                };
                for (const [k, col] of Object.entries(map)) {
                    if (payload[k] !== undefined) {
                        updates.push(`${col} = ?`);
                        values.push(payload[k]);
                    }
                }
                if (payload.avg_price_per_sqft !== undefined || payload.avgRate !== undefined) {
                    updates.push("avg_price_per_sqft = ?");
                    values.push(Number(String(payload.avg_price_per_sqft ?? payload.avgRate).replace(/[^0-9]/g, "")) || 0);
                }
                if (updates.length > 0) {
                    values.push(id);
                    await query(`UPDATE locations SET ${updates.join(", ")} WHERE id = ?`, values);
                }
            } catch (_) {}
        }
        const idx = memoryLocations.findIndex(l => String(l.id) === String(id));
        if (idx !== -1) {
            memoryLocations[idx] = { ...memoryLocations[idx], ...payload };
            return memoryLocations[idx];
        }
        return { id, ...payload };
    },

    async delete(id) {
        if (isDBConnected()) {
            try {
                await query("DELETE FROM locations WHERE id = ?", [id]);
            } catch (_) {}
        }
        memoryLocations = memoryLocations.filter(l => String(l.id) !== String(id));
        return true;
    }
};
