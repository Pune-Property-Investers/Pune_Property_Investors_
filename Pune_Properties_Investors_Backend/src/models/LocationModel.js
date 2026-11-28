import { query, isDBConnected } from "../config/db.js";

const DEFAULT_LOCALITIES = [
    {
        id: 1,
        slug: "baner",
        name: "Baner",
        zone: "West Pune",
        subtitle: "High Street, Lifestyle & Western Corridor",
        description: "High Street, Lifestyle & Western...",
        avgRate: "₹9,800 / sq.ft",
        numericAvgRate: 9800,
        listingsCount: "2 Properties",
        image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
        searchLocation: "Baner",
        isFeatured: true,
        displayOrder: 1
    },
    {
        id: 2,
        slug: "wakad",
        name: "Wakad",
        zone: "West Pune",
        subtitle: "Family Living with Seamless Connectivity",
        description: "Family Living with Seamless...",
        avgRate: "₹7,650 / sq.ft",
        numericAvgRate: 7650,
        listingsCount: "1 Property",
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80",
        searchLocation: "Wakad",
        isFeatured: false,
        displayOrder: 2
    },
    {
        id: 3,
        slug: "hinjawadi",
        name: "Hinjawadi",
        zone: "West Pune",
        subtitle: "The Silicon Core of Pune",
        description: "The Silicon Core of Pune",
        avgRate: "₹6,900 / sq.ft",
        numericAvgRate: 6900,
        listingsCount: "2 Properties",
        image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
        searchLocation: "Hinjewadi",
        isFeatured: false,
        displayOrder: 3
    },
    {
        id: 4,
        slug: "kharadi",
        name: "Kharadi",
        zone: "East Pune",
        subtitle: "East Pune's Premier IT Hub",
        description: "East Pune's Premier...",
        avgRate: "₹11,200 / sq.ft",
        numericAvgRate: 11200,
        listingsCount: "1 Property",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
        searchLocation: "Kharadi",
        isFeatured: false,
        displayOrder: 4
    },
    {
        id: 5,
        slug: "hadapsar",
        name: "Hadapsar",
        zone: "East Pune",
        subtitle: "Self-Sustaining Integrated Townships",
        description: "Self-Sustaining Integrated...",
        avgRate: "₹7,400 / sq.ft",
        numericAvgRate: 7400,
        listingsCount: "1 Property",
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
        searchLocation: "Hadapsar",
        isFeatured: false,
        displayOrder: 5
    },
    {
        id: 6,
        slug: "kothrud",
        name: "Kothrud",
        zone: "Central Pune",
        subtitle: "Cultural Heritage Meets Modern Metro",
        description: "Cultural Heritage Meets...",
        avgRate: "₹12,500 / sq.ft",
        numericAvgRate: 12500,
        listingsCount: "1 Property",
        image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
        searchLocation: "Kothrud",
        isFeatured: false,
        displayOrder: 6
    },
    {
        id: 7,
        slug: "viman-nagar",
        name: "Viman Nagar",
        zone: "East Pune",
        subtitle: "Airport Corridor & High-Street Retail",
        description: "Airport Corridor & High-Street...",
        avgRate: "₹12,800 / sq.ft",
        numericAvgRate: 12800,
        listingsCount: "1 Property",
        image: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80",
        searchLocation: "Viman Nagar",
        isFeatured: false,
        displayOrder: 7
    },
    {
        id: 8,
        slug: "bavdhan",
        name: "Bavdhan",
        zone: "West Pune",
        subtitle: "Scenic Valley Views & Highway Access",
        description: "Scenic Valley Views & Highway...",
        avgRate: "₹8,200 / sq.ft",
        numericAvgRate: 8200,
        listingsCount: "1 Property",
        image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
        searchLocation: "Bavdhan",
        isFeatured: false,
        displayOrder: 8
    },
    {
        id: 9,
        slug: "balewadi",
        name: "Balewadi",
        zone: "West Pune",
        subtitle: "Sports City & High Street Cafes",
        description: "Sports City & High Street...",
        avgRate: "₹10,500 / sq.ft",
        numericAvgRate: 10500,
        listingsCount: "2 Properties",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80",
        searchLocation: "Balewadi",
        isFeatured: false,
        displayOrder: 9
    },
    {
        id: 10,
        slug: "nibm-road",
        name: "NIBM Road",
        zone: "South Pune",
        subtitle: "Cosmopolitan Greens & Forest Living",
        description: "Cosmopolitan Greens & Forest...",
        avgRate: "₹7,800 / sq.ft",
        numericAvgRate: 7800,
        listingsCount: "1 Property",
        image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80",
        searchLocation: "NIBM",
        isFeatured: false,
        displayOrder: 10
    },
    {
        id: 11,
        slug: "dhanori",
        name: "Dhanori",
        zone: "North-East Pune",
        subtitle: "Airport Corridor & High-Growth Residential Belt",
        description: "Airport Corridor & High-Growth...",
        avgRate: "₹6,800 / sq.ft",
        numericAvgRate: 6800,
        listingsCount: "22 Properties",
        image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
        searchLocation: "Dhanori",
        isFeatured: true,
        displayOrder: 11
    }
];

let memoryLocations = [...DEFAULT_LOCALITIES];

function mapRowToLocality(row) {
    if (!row) return null;
    return {
        id: row.id,
        slug: row.slug || String(row.id),
        name: row.name,
        zone: row.zone || "West Pune",
        subtitle: row.subtitle || row.description || "",
        description: row.description || row.subtitle || "",
        avgRate: row.avg_rate || (row.avg_price_per_sqft ? `₹${row.avg_price_per_sqft.toLocaleString("en-IN")} / sq.ft` : "₹8,500 / sq.ft"),
        numericAvgRate: row.numeric_avg_rate || row.avg_price_per_sqft || 0,
        listingsCount: "Verified",
        image: row.image_url || row.image || "",
        searchLocation: row.search_location || row.name,
        isFeatured: Boolean(row.is_featured),
        displayOrder: row.display_order || row.id || 0,
        createdAt: row.created_at,
        updatedAt: row.updated_at
    };
}

export const LocationModel = {
    /**
     * Fetch list of all localities
     */
    async list(filters = {}) {
        if (isDBConnected()) {
            try {
                let sql = "SELECT * FROM localities";
                const conditions = [];
                const params = [];

                if (filters.zone) {
                    conditions.push("zone = ?");
                    params.push(filters.zone);
                }
                if (filters.isFeatured !== undefined) {
                    conditions.push("is_featured = ?");
                    params.push(filters.isFeatured ? 1 : 0);
                }

                if (conditions.length > 0) {
                    sql += " WHERE " + conditions.join(" AND ");
                }
                sql += " ORDER BY display_order ASC, id ASC";

                const rows = await query(sql, params);
                if (rows && rows.length > 0) {
                    return rows.map(mapRowToLocality);
                }
            } catch (err) {
                // If table is named 'locations', try fallback query
                try {
                    const fallbackRows = await query("SELECT * FROM locations ORDER BY id ASC");
                    if (fallbackRows && fallbackRows.length > 0) {
                        return fallbackRows.map(mapRowToLocality);
                    }
                } catch (_) { }
            }
        }
        return [...memoryLocations];
    },

    /**
     * Fetch a single locality by ID or Slug
     */
    async getById(idOrSlug) {
        if (isDBConnected()) {
            try {
                const rows = await query(
                    "SELECT * FROM localities WHERE id = ? OR slug = ? LIMIT 1",
                    [idOrSlug, idOrSlug]
                );
                if (rows && rows.length > 0) {
                    return mapRowToLocality(rows[0]);
                }
            } catch (_) { }
        }
        return (
            memoryLocations.find(
                (l) =>
                    String(l.id) === String(idOrSlug) ||
                    l.slug === idOrSlug ||
                    l.name?.toLowerCase() === String(idOrSlug).toLowerCase()
            ) || null
        );
    },

    /**
     * Create a new locality
     */
    async create(payload) {
        const slug =
            payload.slug ||
            (payload.name || "")
                .toLowerCase()
                .trim()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/^-+|-+$/g, "");

        const record = {
            slug,
            name: payload.name || "Unnamed Locality",
            zone: payload.zone || "West Pune",
            subtitle: payload.subtitle || "",
            description: payload.description || "",
            avgRate: payload.avgRate || "₹8,500 / sq.ft",
            numericAvgRate: Number(payload.numericAvgRate) || 8500,
            image: payload.image || "",
            searchLocation: payload.searchLocation || payload.name || "Pune",
            isFeatured: Boolean(payload.isFeatured),
            displayOrder: Number(payload.displayOrder) || 0
        };

        if (isDBConnected()) {
            try {
                const res = await query(
                    `INSERT INTO localities (
                        slug, name, zone, subtitle, description,
                        avg_rate, numeric_avg_rate, image_url, search_location,
                        is_featured, display_order
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                    [
                        record.slug,
                        record.name,
                        record.zone,
                        record.subtitle,
                        record.description,
                        record.avgRate,
                        record.numericAvgRate,
                        record.image,
                        record.searchLocation,
                        record.isFeatured ? 1 : 0,
                        record.displayOrder
                    ]
                );
                if (res && res.insertId) {
                    return this.getById(res.insertId);
                }
            } catch (err) {
                console.error("Locality create error in DB:", err.message);
            }
        }

        const nextId =
            memoryLocations.reduce((max, item) => Math.max(max, Number(item.id) || 0), 0) + 1;
        const created = { id: nextId, ...record };
        memoryLocations.push(created);
        return created;
    },

    /**
     * Update an existing locality
     */
    async update(id, payload) {
        if (isDBConnected()) {
            try {
                await query(
                    `UPDATE localities SET
                        name = COALESCE(?, name),
                        zone = COALESCE(?, zone),
                        subtitle = COALESCE(?, subtitle),
                        description = COALESCE(?, description),
                        avg_rate = COALESCE(?, avg_rate),
                        numeric_avg_rate = COALESCE(?, numeric_avg_rate),
                        image_url = COALESCE(?, image_url),
                        search_location = COALESCE(?, search_location),
                        is_featured = COALESCE(?, is_featured),
                        display_order = COALESCE(?, display_order)
                    WHERE id = ?`,
                    [
                        payload.name ?? null,
                        payload.zone ?? null,
                        payload.subtitle ?? null,
                        payload.description ?? null,
                        payload.avgRate ?? null,
                        payload.numericAvgRate !== undefined ? Number(payload.numericAvgRate) : null,
                        payload.image ?? payload.image_url ?? null,
                        payload.searchLocation ?? null,
                        payload.isFeatured !== undefined ? (payload.isFeatured ? 1 : 0) : (payload.featured !== undefined ? (payload.featured ? 1 : 0) : null),
                        payload.displayOrder !== undefined ? Number(payload.displayOrder) : null,
                        id
                    ]
                );
                return this.getById(id);
            } catch (err) {
                console.error("Locality update error in DB:", err.message);
            }
        }

        const idx = memoryLocations.findIndex((l) => String(l.id) === String(id));
        if (idx !== -1) {
            memoryLocations[idx] = { ...memoryLocations[idx], ...payload };
            return memoryLocations[idx];
        }
        return null;
    },

    /**
     * Delete a locality
     */
    async delete(id) {
        if (isDBConnected()) {
            try {
                const res = await query("DELETE FROM localities WHERE id = ?", [id]);
                return res && res.affectedRows > 0;
            } catch (err) {
                console.error("Locality delete error in DB:", err.message);
            }
        }

        memoryLocations = memoryLocations.filter((l) => String(l.id) !== String(id));
        return true;
    }
};
