import { query, isDBConnected } from "../config/db.js";
import { projects as defaultProjects } from "../../../Pune_Property_Investors_Frontend/src/data/projects.js";

let memoryFeaturedProjects = [...defaultProjects];

function mapRowToFeaturedProject(row) {
    if (!row) return null;

    let parsedAmenities = [];
    if (typeof row.amenities === "string") {
        try {
            parsedAmenities = JSON.parse(row.amenities);
        } catch (_) {
            parsedAmenities = [];
        }
    } else if (Array.isArray(row.amenities)) {
        parsedAmenities = row.amenities;
    }

    return {
        id: row.id,
        slug: row.slug || String(row.id),
        name: row.name,
        developer: row.developer,
        logo: row.logo_url || row.logo || "",
        logoUrl: row.logo_url || row.logo || "",
        domain: row.domain || "parasbuildtech.com",
        logoBrand: row.logo_brand || row.developer || "",
        logoSub: row.logo_sub || "",
        location: row.location,
        price: row.price,
        priceValue: row.numeric_price || 0,
        propertyType: row.property_type || "Residential",
        configuration: row.configuration || "",
        subtitle: row.subtitle || "",
        area: row.area || "",
        status: row.status || "Under Construction",
        possession: row.possession || "Under Construction",
        reraId: row.rera_id || "RERA Approved",
        image: row.image_url || row.image || "",
        badge: row.badge || "Featured",
        description: row.description || "",
        amenities: parsedAmenities,
        displayOrder: row.display_order || row.id || 0,
        isActive: Boolean(row.is_active),
        createdAt: row.created_at,
        updatedAt: row.updated_at
    };
}

export const FeaturedProjectModel = {
    /**
     * Fetch list of all featured projects
     */
    async list(filters = {}) {
        if (isDBConnected()) {
            try {
                let sql = "SELECT * FROM featured_projects WHERE is_active = 1";
                const params = [];

                if (filters.status) {
                    sql += " AND status = ?";
                    params.push(filters.status);
                }
                if (filters.developer) {
                    sql += " AND developer = ?";
                    params.push(filters.developer);
                }

                sql += " ORDER BY display_order ASC, id ASC";

                const rows = await query(sql, params);
                if (rows && rows.length > 0) {
                    return rows.map(mapRowToFeaturedProject);
                }
            } catch (err) {
                console.error("FeaturedProjectModel.list DB error:", err.message);
            }
        }
        return [...memoryFeaturedProjects];
    },

    /**
     * Fetch a single featured project by ID or Slug
     */
    async getById(idOrSlug) {
        if (isDBConnected()) {
            try {
                const rows = await query(
                    "SELECT * FROM featured_projects WHERE id = ? OR slug = ? LIMIT 1",
                    [idOrSlug, idOrSlug]
                );
                if (rows && rows.length > 0) {
                    return mapRowToFeaturedProject(rows[0]);
                }
            } catch (err) {
                console.error("FeaturedProjectModel.getById DB error:", err.message);
            }
        }
        return (
            memoryFeaturedProjects.find(
                (p) =>
                    String(p.id) === String(idOrSlug) ||
                    p.slug === idOrSlug ||
                    p.name?.toLowerCase() === String(idOrSlug).toLowerCase()
            ) || null
        );
    },

    /**
     * Create a new featured project
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
            name: payload.name || "New Featured Project",
            developer: payload.developer || "Prime Developer",
            logo_url: payload.logo || payload.logoUrl || "",
            domain: payload.domain || "punepropertyinvestor.com",
            logo_brand: payload.logoBrand || payload.developer || "",
            logo_sub: payload.logoSub || "",
            location: payload.location || "Pune",
            price: payload.price || "Price on Request",
            numeric_price: Number(payload.priceValue || payload.numericPrice) || 0,
            property_type: payload.propertyType || "Residential",
            configuration: payload.configuration || "2 & 3 BHK",
            subtitle: payload.subtitle || "",
            area: payload.area || "",
            status: payload.status || "Under Construction",
            possession: payload.possession || "Under Construction",
            rera_id: payload.reraId || "RERA Approved",
            image_url: payload.image || payload.imageUrl || "",
            badge: payload.badge || "Featured",
            description: payload.description || "",
            amenities: JSON.stringify(Array.isArray(payload.amenities) ? payload.amenities : []),
            display_order: Number(payload.displayOrder) || 0,
            is_active: payload.isActive !== undefined ? (payload.isActive ? 1 : 0) : 1
        };

        if (isDBConnected()) {
            try {
                const res = await query(
                    `INSERT INTO featured_projects (
                        slug, name, developer, logo_url, domain, logo_brand, logo_sub,
                        location, price, numeric_price, property_type, configuration,
                        subtitle, area, status, possession, rera_id, image_url,
                        badge, description, amenities, display_order, is_active
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                    [
                        record.slug,
                        record.name,
                        record.developer,
                        record.logo_url,
                        record.domain,
                        record.logo_brand,
                        record.logo_sub,
                        record.location,
                        record.price,
                        record.numeric_price,
                        record.property_type,
                        record.configuration,
                        record.subtitle,
                        record.area,
                        record.status,
                        record.possession,
                        record.rera_id,
                        record.image_url,
                        record.badge,
                        record.description,
                        record.amenities,
                        record.display_order,
                        record.is_active
                    ]
                );
                if (res && res.insertId) {
                    return this.getById(res.insertId);
                }
            } catch (err) {
                console.error("FeaturedProjectModel create DB error:", err.message);
            }
        }

        const nextId =
            memoryFeaturedProjects.reduce((max, item) => Math.max(max, Number(item.id) || 0), 0) + 1;
        const created = { id: nextId, ...payload, slug };
        memoryFeaturedProjects.push(created);
        return created;
    },

    /**
     * Update an existing featured project
     */
    async update(id, payload) {
        if (isDBConnected()) {
            try {
                await query(
                    `UPDATE featured_projects SET
                        name = COALESCE(?, name),
                        developer = COALESCE(?, developer),
                        logo_url = COALESCE(?, logo_url),
                        domain = COALESCE(?, domain),
                        location = COALESCE(?, location),
                        price = COALESCE(?, price),
                        numeric_price = COALESCE(?, numeric_price),
                        property_type = COALESCE(?, property_type),
                        configuration = COALESCE(?, configuration),
                        subtitle = COALESCE(?, subtitle),
                        area = COALESCE(?, area),
                        status = COALESCE(?, status),
                        possession = COALESCE(?, possession),
                        rera_id = COALESCE(?, rera_id),
                        image_url = COALESCE(?, image_url),
                        badge = COALESCE(?, badge),
                        description = COALESCE(?, description),
                        amenities = COALESCE(?, amenities),
                        display_order = COALESCE(?, display_order),
                        is_active = COALESCE(?, is_active)
                    WHERE id = ?`,
                    [
                        payload.name ?? null,
                        payload.developer ?? null,
                        (payload.logo || payload.logoUrl) ?? null,
                        payload.domain ?? null,
                        payload.location ?? null,
                        payload.price ?? null,
                        (payload.priceValue !== undefined || payload.numericPrice !== undefined)
                            ? Number(payload.priceValue || payload.numericPrice)
                            : null,
                        payload.propertyType ?? null,
                        payload.configuration ?? null,
                        payload.subtitle ?? null,
                        payload.area ?? null,
                        payload.status ?? null,
                        payload.possession ?? null,
                        payload.reraId ?? null,
                        (payload.image || payload.imageUrl) ?? null,
                        payload.badge ?? null,
                        payload.description ?? null,
                        payload.amenities ? JSON.stringify(payload.amenities) : null,
                        payload.displayOrder !== undefined ? Number(payload.displayOrder) : null,
                        payload.isActive !== undefined ? (payload.isActive ? 1 : 0) : null,
                        id
                    ]
                );
                return this.getById(id);
            } catch (err) {
                console.error("FeaturedProjectModel update DB error:", err.message);
            }
        }

        const idx = memoryFeaturedProjects.findIndex((p) => String(p.id) === String(id));
        if (idx !== -1) {
            memoryFeaturedProjects[idx] = { ...memoryFeaturedProjects[idx], ...payload };
            return memoryFeaturedProjects[idx];
        }
        return null;
    },

    /**
     * Delete a featured project
     */
    async delete(id) {
        if (isDBConnected()) {
            try {
                const res = await query("DELETE FROM featured_projects WHERE id = ?", [id]);
                return res && res.affectedRows > 0;
            } catch (err) {
                console.error("FeaturedProjectModel delete DB error:", err.message);
            }
        }
        const initialLen = memoryFeaturedProjects.length;
        memoryFeaturedProjects = memoryFeaturedProjects.filter((p) => String(p.id) !== String(id));
        return memoryFeaturedProjects.length < initialLen;
    }
};
