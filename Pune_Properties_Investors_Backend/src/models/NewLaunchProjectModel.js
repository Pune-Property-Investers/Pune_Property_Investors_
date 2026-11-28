import { query, isDBConnected } from "../config/db.js";
import { newLaunchProjects as defaultNewLaunches } from "../../../Pune_Property_Investors_Frontend/src/data/newLaunchProjectsData.js";

let memoryNewLaunches = [...defaultNewLaunches];

function parseJsonField(val) {
    if (!val) return [];
    if (Array.isArray(val)) return val;
    if (typeof val === "string") {
        try {
            return JSON.parse(val);
        } catch (_) {
            return [];
        }
    }
    return [];
}

function mapRowToNewLaunch(row) {
    if (!row) return null;
    const gallery = parseJsonField(row.gallery);
    const images = gallery.length > 0 ? gallery : (row.image_url ? [row.image_url] : []);

    return {
        id: row.id,
        slug: row.slug || String(row.id),
        name: row.name,
        title: row.name,
        developer: row.developer,
        developerLogo: row.developer_logo || row.developer || "",
        location: row.location,
        areaLocality: row.area_locality || "",
        type: row.property_type || "Luxury Residences",
        propertyType: row.property_type || "Luxury Residences",
        typeBadge: row.badge || "New Launch",
        configuration: row.configuration || "2 & 3 BHK",
        area: row.area || "",
        price: row.price,
        numericPrice: row.numeric_price || 0,
        rate: row.emi || "Verified Price",
        emi: row.emi || "",
        offer: row.offer || "",
        status: row.status || "Newly Launched",
        badge: row.badge || "New Launch",
        possession: row.possession || "Under Construction",
        rera: row.rera_number || "",
        reraNumber: row.rera_number || "",
        towers: row.towers || "",
        totalUnits: row.total_units || "",
        image: row.image_url || row.image || "",
        imageUrl: row.image_url || row.image || "",
        images: images,
        gallery: gallery,
        highlights: parseJsonField(row.highlights),
        description: row.description || "",
        isFeatured: Boolean(row.is_active),
        link: `/properties/${row.slug || row.id}`,
        displayOrder: row.display_order || row.id || 0,
        isActive: Boolean(row.is_active),
        createdAt: row.created_at,
        updatedAt: row.updated_at
    };
}

export const NewLaunchProjectModel = {
    /**
     * Fetch all new launch projects
     */
    async list(filters = {}) {
        if (isDBConnected()) {
            try {
                let sql = "SELECT * FROM new_launch_projects WHERE is_active = 1";
                const params = [];

                if (filters.locality) {
                    sql += " AND area_locality = ?";
                    params.push(filters.locality);
                }
                if (filters.developer) {
                    sql += " AND developer = ?";
                    params.push(filters.developer);
                }

                sql += " ORDER BY display_order ASC, id ASC";

                const rows = await query(sql, params);
                if (Array.isArray(rows)) {
                    return rows.map(mapRowToNewLaunch);
                }
            } catch (err) {
                console.error("NewLaunchProjectModel.list DB error:", err.message);
            }
        }
        return [...memoryNewLaunches];
    },

    /**
     * Fetch a single new launch by ID or Slug
     */
    async getById(idOrSlug) {
        if (isDBConnected()) {
            try {
                const rows = await query(
                    "SELECT * FROM new_launch_projects WHERE id = ? OR slug = ? LIMIT 1",
                    [idOrSlug, idOrSlug]
                );
                if (rows && rows.length > 0) {
                    return mapRowToNewLaunch(rows[0]);
                }
            } catch (err) {
                console.error("NewLaunchProjectModel.getById DB error:", err.message);
            }
        }
        return (
            memoryNewLaunches.find(
                (p) =>
                    String(p.id) === String(idOrSlug) ||
                    p.slug === idOrSlug ||
                    p.name?.toLowerCase() === String(idOrSlug).toLowerCase()
            ) || null
        );
    },

    /**
     * Create a new launch project
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
            name: payload.name || "New Launch Project",
            developer: payload.developer || "Prime Developer",
            developer_logo: payload.developerLogo || payload.developer || "",
            location: payload.location || "Pune",
            area_locality: payload.areaLocality || payload.locality || "Pune",
            property_type: payload.type || payload.propertyType || "Luxury Residences",
            configuration: payload.configuration || "2 & 3 BHK",
            area: payload.area || "",
            price: payload.price || "Price on Request",
            numeric_price: Number(payload.numericPrice || payload.priceValue) || 0,
            emi: payload.emi || "",
            offer: payload.offer || "",
            status: payload.status || "Newly Launched",
            badge: payload.badge || "New Launch",
            possession: payload.possession || "Under Construction",
            rera_number: payload.rera || payload.reraNumber || "",
            towers: payload.towers || "",
            total_units: payload.totalUnits || "",
            image_url: payload.image || payload.imageUrl || "",
            gallery: JSON.stringify(Array.isArray(payload.gallery) ? payload.gallery : []),
            highlights: JSON.stringify(Array.isArray(payload.highlights) ? payload.highlights : []),
            description: payload.description || "",
            display_order: Number(payload.displayOrder) || 0,
            is_active: payload.isActive !== undefined ? (payload.isActive ? 1 : 0) : 1
        };

        if (isDBConnected()) {
            try {
                const res = await query(
                    `INSERT INTO new_launch_projects (
                        slug, name, developer, developer_logo, location, area_locality,
                        property_type, configuration, area, price, numeric_price, emi,
                        offer, status, badge, possession, rera_number, towers, total_units,
                        image_url, gallery, highlights, description, display_order, is_active
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                    [
                        record.slug,
                        record.name,
                        record.developer,
                        record.developer_logo,
                        record.location,
                        record.area_locality,
                        record.property_type,
                        record.configuration,
                        record.area,
                        record.price,
                        record.numeric_price,
                        record.emi,
                        record.offer,
                        record.status,
                        record.badge,
                        record.possession,
                        record.rera_number,
                        record.towers,
                        record.total_units,
                        record.image_url,
                        record.gallery,
                        record.highlights,
                        record.description,
                        record.display_order,
                        record.is_active
                    ]
                );
                if (res && res.insertId) {
                    return this.getById(res.insertId);
                }
            } catch (err) {
                console.error("NewLaunchProjectModel create DB error:", err.message);
            }
        }

        const nextId =
            memoryNewLaunches.reduce((max, item) => Math.max(max, Number(item.id) || 0), 0) + 1;
        const created = { id: nextId, ...payload, slug };
        memoryNewLaunches.push(created);
        return created;
    },

    /**
     * Update an existing new launch project
     */
    async update(id, payload) {
        if (isDBConnected()) {
            try {
                await query(
                    `UPDATE new_launch_projects SET
                        name = COALESCE(?, name),
                        developer = COALESCE(?, developer),
                        developer_logo = COALESCE(?, developer_logo),
                        location = COALESCE(?, location),
                        area_locality = COALESCE(?, area_locality),
                        property_type = COALESCE(?, property_type),
                        configuration = COALESCE(?, configuration),
                        area = COALESCE(?, area),
                        price = COALESCE(?, price),
                        numeric_price = COALESCE(?, numeric_price),
                        emi = COALESCE(?, emi),
                        offer = COALESCE(?, offer),
                        status = COALESCE(?, status),
                        badge = COALESCE(?, badge),
                        possession = COALESCE(?, possession),
                        rera_number = COALESCE(?, rera_number),
                        towers = COALESCE(?, towers),
                        total_units = COALESCE(?, total_units),
                        image_url = COALESCE(?, image_url),
                        gallery = COALESCE(?, gallery),
                        highlights = COALESCE(?, highlights),
                        description = COALESCE(?, description),
                        display_order = COALESCE(?, display_order),
                        is_active = COALESCE(?, is_active)
                    WHERE id = ?`,
                    [
                        payload.name ?? null,
                        payload.developer ?? null,
                        (payload.developerLogo || payload.developer) ?? null,
                        payload.location ?? null,
                        (payload.areaLocality || payload.locality) ?? null,
                        (payload.type || payload.propertyType) ?? null,
                        payload.configuration ?? null,
                        payload.area ?? null,
                        payload.price ?? null,
                        payload.numericPrice !== undefined ? Number(payload.numericPrice) : null,
                        payload.emi ?? null,
                        payload.offer ?? null,
                        payload.status ?? null,
                        payload.badge ?? null,
                        payload.possession ?? null,
                        (payload.rera || payload.reraNumber) ?? null,
                        payload.towers ?? null,
                        payload.totalUnits ?? null,
                        (payload.image || payload.imageUrl) ?? null,
                        payload.gallery ? JSON.stringify(payload.gallery) : null,
                        payload.highlights ? JSON.stringify(payload.highlights) : null,
                        payload.description ?? null,
                        payload.displayOrder !== undefined ? Number(payload.displayOrder) : null,
                        payload.isActive !== undefined ? (payload.isActive ? 1 : 0) : null,
                        id
                    ]
                );
                return this.getById(id);
            } catch (err) {
                console.error("NewLaunchProjectModel update DB error:", err.message);
            }
        }

        const idx = memoryNewLaunches.findIndex((p) => String(p.id) === String(id));
        if (idx !== -1) {
            memoryNewLaunches[idx] = { ...memoryNewLaunches[idx], ...payload };
            return memoryNewLaunches[idx];
        }
        return null;
    },

    /**
     * Delete a new launch project
     */
    async delete(id) {
        if (isDBConnected()) {
            try {
                const res = await query("DELETE FROM new_launch_projects WHERE id = ?", [id]);
                return res && res.affectedRows > 0;
            } catch (err) {
                console.error("NewLaunchProjectModel delete DB error:", err.message);
            }
        }
        const initialLen = memoryNewLaunches.length;
        memoryNewLaunches = memoryNewLaunches.filter((p) => String(p.id) !== String(id));
        return memoryNewLaunches.length < initialLen;
    }
};
