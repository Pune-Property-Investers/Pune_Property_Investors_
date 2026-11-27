import { query, isDBConnected } from "../config/db.js";

let memoryProjects = [
    {
        id: "1",
        name: "Godrej Rivergreens",
        slug: "godrej-rivergreens-kharadi",
        developer: "Godrej Properties",
        location: "Kharadi, Pune",
        locality: "Kharadi",
        price: "₹85 Lac - 1.45 Cr",
        status: "Under Construction",
        publicationStatus: "Published",
        configurations: "2 & 3 BHK",
        possessionDate: "Dec 2026",
        featured: true,
        image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80",
        description: "Premium township living by Godrej Properties featuring modern amenities, riverside lifestyle, and seamless connectivity to Kharadi IT hub.",
        createdAt: new Date().toISOString()
    },
    {
        id: "2",
        name: "Panchshil Towers",
        slug: "panchshil-towers-kharadi",
        developer: "Panchshil Realty",
        location: "Kharadi, Pune",
        locality: "Kharadi",
        price: "₹2.2 Cr - 3.8 Cr",
        status: "Ready to Move",
        publicationStatus: "Published",
        configurations: "3 & 4 BHK",
        possessionDate: "Immediate",
        featured: true,
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80",
        description: "Ultra-luxury modern residences with panoramic skyline views, bespoke specifications, and high-end concierge services.",
        createdAt: new Date().toISOString()
    },
    {
        id: "3",
        name: "EON Free Zone IT Park",
        slug: "eon-free-zone-office-kharadi",
        developer: "Panchshil Realty",
        location: "Kharadi, Pune",
        locality: "Kharadi",
        price: "₹4.5 Cr",
        status: "Ready to Move",
        publicationStatus: "Published",
        configurations: "Grade-A Office",
        possessionDate: "Immediate",
        featured: true,
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
        description: "High-yield commercial IT office space with 100% DG power backup, high-speed elevators, and LEED gold certification.",
        createdAt: new Date().toISOString()
    },
    {
        id: "4",
        name: "Hinjewadi Prime Villa Plots",
        slug: "hinjewadi-prime-villa-plots",
        developer: "Megapolis Developers",
        location: "Hinjewadi Phase 3, Pune",
        locality: "Hinjewadi",
        price: "₹65 Lac - 1.1 Cr",
        status: "New Launch",
        publicationStatus: "Published",
        configurations: "Plots 1800 - 3200 sq.ft.",
        possessionDate: "Within 6 Months",
        featured: false,
        image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
        description: "Clear title, PMRDA sanctioned residential NA plots in a luxury gated community near Hinjewadi IT hub with clubhouse and landscaped gardens.",
        createdAt: new Date().toISOString()
    }
];

export const ProjectModel = {
    async list(filters = {}) {
        if (!isDBConnected()) return [];
        const rows = await query("SELECT * FROM projects ORDER BY created_at DESC");
        return Array.isArray(rows) ? rows : [];
    },

    async getById(id) {
        if (!isDBConnected()) return null;
        const rows = await query("SELECT * FROM projects WHERE id = ? OR slug = ? LIMIT 1", [id, id]);
        return rows && rows.length > 0 ? rows[0] : null;
    },

    async create(payload) {
        const nextId = String(memoryProjects.reduce((max, item) => Math.max(max, Number(item.id) || 0), 0) + 1);
        const created = {
            id: nextId,
            ...payload,
            createdAt: new Date().toISOString()
        };
        memoryProjects.unshift(created);

        if (isDBConnected()) {
            try {
                await query(
                    `INSERT INTO projects (id, name, slug, developer, location, locality, price, status, publication_status, configurations, possession_date, featured, image, description)
                     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                    [
                        created.id,
                        created.name,
                        created.slug || created.name.toLowerCase().replace(/\s+/g, "-"),
                        created.developer || "",
                        created.location || "",
                        created.locality || "",
                        created.price || "",
                        created.status || "Under Construction",
                        created.publicationStatus || "Published",
                        created.configurations || "",
                        created.possessionDate || "",
                        created.featured ? 1 : 0,
                        created.image || "",
                        created.description || ""
                    ]
                );
            } catch (_) {}
        }
        return created;
    },

    async update(id, payload) {
        const idx = memoryProjects.findIndex(p => String(p.id) === String(id));
        if (idx !== -1) {
            memoryProjects[idx] = { ...memoryProjects[idx], ...payload, updatedAt: new Date().toISOString() };
        }
        if (isDBConnected()) {
            try {
                const fieldMap = {
                    name: "name",
                    slug: "slug",
                    developer: "developer",
                    location: "location",
                    locality: "locality",
                    price: "price",
                    status: "status",
                    publicationStatus: "publication_status",
                    configurations: "configurations",
                    possessionDate: "possession_date",
                    featured: "featured",
                    image: "image",
                    description: "description"
                };
                const updates = [];
                const values = [];
                for (const [key, col] of Object.entries(fieldMap)) {
                    if (payload[key] !== undefined) {
                        updates.push(`${col} = ?`);
                        values.push(key === "featured" ? (payload[key] ? 1 : 0) : payload[key]);
                    }
                }
                if (updates.length > 0) {
                    values.push(id);
                    await query(`UPDATE projects SET ${updates.join(", ")} WHERE id = ?`, values);
                }
            } catch (_) {}
        }
        return memoryProjects[idx] || { id, ...payload };
    },

    async delete(id) {
        memoryProjects = memoryProjects.filter(p => String(p.id) !== String(id));
        if (isDBConnected()) {
            try {
                await query("DELETE FROM projects WHERE id = ?", [id]);
            } catch (_) {}
        }
        return true;
    }
};
