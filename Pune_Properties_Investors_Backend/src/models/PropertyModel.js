import { query, isDBConnected } from "../config/db.js";

/**
 * Property Model (Data Layer)
 * Supports parameterized MySQL database operations with seamless in-memory fallback.
 */

let memoryProperties = [
    {
        id: "1",
        slug: "godrej-rivergreens-kharadi",
        title: "Godrej Rivergreens",
        developer: "Godrej Properties",
        location: "Kharadi, Pune",
        locality: "Kharadi",
        city: "Pune",
        propertyCategory: "residential",
        propertyType: "Apartment",
        purpose: "buy",
        price: "₹85 Lac - 1.45 Cr",
        numericPrice: 8500000,
        bhk: ["2 BHK", "3 BHK"],
        area: "750 - 1250 sq.ft.",
        status: "Under Construction",
        possession: "Dec 2026",
        isNewLaunch: true,
        isFeatured: true,
        isTrending: true,
        verified: true,
        badge: "New Launch Premiere",
        image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80",
        images: [
            "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80",
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85"
        ],
        videoUrl: "https://www.youtube.com/watch?v=M1sDYNUJQrY&t=2s",
        description: "Premium township living by Godrej Properties featuring modern amenities, riverside lifestyle, and seamless connectivity to Kharadi IT hub.",
        amenities: ["Swimming Pool", "Clubhouse", "Gymnasium", "Kids Play Area", "Jogging Track", "24/7 Security"],
        createdAt: new Date().toISOString()
    },
    {
        id: "2",
        slug: "panchshil-towers-kharadi",
        title: "Panchshil Towers",
        developer: "Panchshil Realty",
        location: "Kharadi, Pune",
        locality: "Kharadi",
        city: "Pune",
        propertyCategory: "residential",
        propertyType: "Apartment",
        purpose: "buy",
        price: "₹2.2 Cr - 3.8 Cr",
        numericPrice: 22000000,
        bhk: ["3 BHK", "4 BHK"],
        area: "1900 - 3100 sq.ft.",
        status: "Ready to Move",
        possession: "Immediate",
        isNewLaunch: false,
        isFeatured: true,
        isTrending: false,
        verified: true,
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80",
        images: [
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80"
        ],
        videoUrl: "https://www.youtube.com/watch?v=M1sDYNUJQrY&t=2s",
        description: "Ultra-luxury modern residences with panoramic skyline views, bespoke specifications, and high-end concierge services.",
        amenities: ["Infinity Pool", "Sky Lounge", "Tennis Court", "Spa", "Private Theater"],
        createdAt: new Date().toISOString()
    },
    {
        id: "3",
        slug: "eon-free-zone-office-kharadi",
        title: "Grade-A Commercial Space at EON IT Park",
        developer: "Panchshil Realty",
        location: "Kharadi, Pune",
        locality: "Kharadi",
        city: "Pune",
        propertyCategory: "commercial",
        propertyType: "Commercial Office",
        purpose: "lease",
        price: "₹4.5 Cr",
        numericPrice: 45000000,
        area: "4200 sq.ft.",
        status: "Ready to Move",
        possession: "Immediate",
        isNewLaunch: false,
        isFeatured: true,
        isTrending: true,
        verified: true,
        badge: "Grade-A IT Asset",
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
        images: [
            "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80"
        ],
        videoUrl: "https://www.youtube.com/watch?v=M1sDYNUJQrY&t=2s",
        description: "High-yield commercial IT office space with 100% DG power backup, high-speed elevators, and LEED gold certification.",
        amenities: ["Central AC", "24/7 Power Backup", "High-Speed Elevators", "Conference Center", "Cafeteria", "Ample Parking"],
        createdAt: new Date().toISOString()
    },
    {
        id: "4",
        slug: "hinjewadi-prime-villa-plots",
        title: "Exclusive Villa Plots in Hinjewadi",
        developer: "Megapolis Developers",
        location: "Hinjewadi Phase 3, Pune",
        locality: "Hinjewadi",
        city: "Pune",
        propertyCategory: "plot",
        propertyType: "Plot",
        purpose: "buy",
        price: "₹65 Lac - 1.1 Cr",
        numericPrice: 6500000,
        area: "1800 - 3200 sq.ft.",
        status: "New Launch",
        possession: "Within 6 Months",
        isNewLaunch: true,
        isFeatured: false,
        isTrending: false,
        verified: true,
        badge: "Gated Community Plots",
        image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
        images: [
            "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80"
        ],
        videoUrl: "https://www.youtube.com/watch?v=M1sDYNUJQrY&t=2s",
        description: "Clear title, PMRDA sanctioned residential NA plots in a luxury gated community near Hinjewadi IT hub with clubhouse and landscaped gardens.",
        amenities: ["Gated Perimeter", "Wide Asphalt Roads", "Water & Electricity Points", "Clubhouse", "24/7 Guarded Entry"],
        createdAt: new Date().toISOString()
    }
];

function formatRow(row) {
    if (!row) return null;
    const parsedBhk = typeof row.bhk === "string" ? JSON.parse(row.bhk || "[]") : row.bhk || [];
    const numericPrice = Number(row.numeric_price || row.numericPrice || 0);
    const bedrooms = Array.isArray(parsedBhk) ? Number(parsedBhk[0]) || 0 : Number(parsedBhk) || 0;
    return {
        id: String(row.id),
        slug: row.slug,
        title: row.title,
        developer: row.developer,
        projectName: row.developer,
        location: row.location,
        locality: row.locality,
        city: row.city,
        propertyCategory: row.property_category || row.propertyCategory,
        propertyType: row.property_type || row.propertyType,
        purpose: row.purpose,
        price: numericPrice > 0 ? numericPrice : row.price,
        priceLabel: row.price,
        numericPrice,
        bhk: Array.isArray(parsedBhk) && parsedBhk.length === 1 ? parsedBhk[0] : parsedBhk,
        bedrooms,
        area: row.area,
        status: row.status,
        possession: row.possession,
        isNewLaunch: Boolean(row.is_new_launch || row.isNewLaunch),
        isFeatured: Boolean(row.is_featured || row.isFeatured),
        featured: Boolean(row.is_featured || row.isFeatured),
        isTrending: Boolean(row.is_trending || row.isTrending),
        verified: Boolean(row.verified),
        badge: row.badge,
        image: row.image,
        images: (() => {
            try {
                if (typeof row.images === "string") {
                    return row.images.startsWith("[") ? JSON.parse(row.images) : row.images.split(",").map((s) => s.trim()).filter(Boolean);
                }
                return Array.isArray(row.images) ? row.images : (row.image ? [row.image] : []);
            } catch {
                return row.image ? [row.image] : [];
            }
        })(),
        videoUrl: row.video_url || row.videoUrl,
        description: row.description,
        amenities: typeof row.amenities === "string" ? JSON.parse(row.amenities || "[]") : row.amenities || [],
        createdAt: row.created_at || row.createdAt
    };
}

export const PropertyModel = {
    async findAll() {
        if (!isDBConnected()) return [];
        const rows = await query("SELECT * FROM properties ORDER BY created_at DESC");
        return Array.isArray(rows) ? rows.map(formatRow) : [];
    },

    async findBySlugOrId(identifier) {
        if (!isDBConnected()) return null;
        const rows = await query(
            "SELECT * FROM properties WHERE slug = ? OR id = ? LIMIT 1",
            [identifier, identifier]
        );
        return rows && rows.length > 0 ? formatRow(rows[0]) : null;
    },

    async create(propertyData) {
        const id = String(Date.now());
        const now = new Date().toISOString();

        if (isDBConnected()) {
            await query(
                `INSERT INTO properties (
                    id, slug, title, developer, location, locality, city,
                    property_category, property_type, purpose, price, numeric_price,
                    bhk, area, status, possession, is_new_launch, is_featured, is_trending,
                    verified, badge, image, images, video_url, description, amenities
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    id,
                    propertyData.slug || id,
                    propertyData.title,
                    propertyData.developer || "",
                    propertyData.location || "",
                    propertyData.locality || "",
                    propertyData.city || "Pune",
                    propertyData.propertyCategory || "residential",
                    propertyData.propertyType || "Apartment",
                    propertyData.purpose || "buy",
                    propertyData.price || "",
                    propertyData.numericPrice || 0,
                    JSON.stringify(propertyData.bhk || []),
                    propertyData.area || "",
                    propertyData.status || "Under Construction",
                    propertyData.possession || "",
                    propertyData.isNewLaunch ? 1 : 0,
                    propertyData.isFeatured ? 1 : 0,
                    propertyData.isTrending ? 1 : 0,
                    propertyData.verified ? 1 : 0,
                    propertyData.badge || "",
                    propertyData.image || "",
                    JSON.stringify(propertyData.images || []),
                    propertyData.videoUrl || "",
                    propertyData.description || "",
                    JSON.stringify(propertyData.amenities || [])
                ]
            );
            return this.findBySlugOrId(id);
        }

        const newProperty = {
            id,
            createdAt: now,
            ...propertyData
        };
        memoryProperties.unshift(newProperty);
        return newProperty;
    },

    async update(id, updateData) {
        if (isDBConnected()) {
            const existing = await this.findBySlugOrId(id);
            if (!existing) return null;

            const merged = { ...existing, ...updateData };
            await query(
                `UPDATE properties SET
                    title = ?, developer = ?, location = ?, locality = ?, city = ?,
                    property_category = ?, property_type = ?, purpose = ?, price = ?, numeric_price = ?,
                    bhk = ?, area = ?, status = ?, possession = ?, is_new_launch = ?, is_featured = ?, is_trending = ?,
                    verified = ?, badge = ?, image = ?, images = ?, video_url = ?, description = ?, amenities = ?
                WHERE id = ?`,
                [
                    merged.title,
                    merged.developer || "",
                    merged.location || "",
                    merged.locality || "",
                    merged.city || "Pune",
                    merged.propertyCategory || "residential",
                    merged.propertyType || "Apartment",
                    merged.purpose || "buy",
                    merged.price || "",
                    merged.numericPrice || 0,
                    JSON.stringify(merged.bhk || []),
                    merged.area || "",
                    merged.status || "Under Construction",
                    merged.possession || "",
                    merged.isNewLaunch ? 1 : 0,
                    merged.isFeatured ? 1 : 0,
                    merged.isTrending ? 1 : 0,
                    merged.verified ? 1 : 0,
                    merged.badge || "",
                    merged.image || "",
                    JSON.stringify(merged.images || []),
                    merged.videoUrl || "",
                    merged.description || "",
                    JSON.stringify(merged.amenities || []),
                    id
                ]
            );
            return this.findBySlugOrId(id);
        }

        const index = memoryProperties.findIndex(p => p.id === id);
        if (index === -1) return null;
        memoryProperties[index] = { ...memoryProperties[index], ...updateData, updatedAt: new Date().toISOString() };
        return memoryProperties[index];
    },

    async delete(id) {
        if (isDBConnected()) {
            const result = await query("DELETE FROM properties WHERE id = ?", [id]);
            return result && result.affectedRows > 0;
        }

        const index = memoryProperties.findIndex(p => p.id === id);
        if (index === -1) return false;
        memoryProperties.splice(index, 1);
        return true;
    }
};
