import { query, isDBConnected } from "../config/db.js";

const fallbackDevelopers = [
    { id: 1, name: "Shapoorji Pallonji", slug: "shapoorji-pallonji", domain: "shapoorjirealestate.com", logoUrl: "https://www.google.com/s2/favicons?domain=shapoorjirealestate.com&sz=128", website: "https://shapoorjirealestate.com", experienceYears: 158, totalProjects: 35, description: "Global engineering and infrastructure giant with over 150 years of excellence.", isActive: true, displayOrder: 1 },
    { id: 2, name: "Vilas Javdekar", slug: "vilas-javdekar", domain: "vilasjavdekar.com", logoUrl: "https://www.google.com/s2/favicons?domain=vilasjavdekar.com&sz=128", website: "https://vilasjavdekar.com", experienceYears: 40, totalProjects: 28, description: "Pioneers of architectural trust and sustainable lifestyle homes across Pune.", isActive: true, displayOrder: 2 },
    { id: 3, name: "Pride Purple", slug: "pride-purple", domain: "pridepurpleproperties.com", logoUrl: "https://www.google.com/s2/favicons?domain=pridepurpleproperties.com&sz=128", website: "https://pridepurpleproperties.com", experienceYears: 25, totalProjects: 40, description: "Creators of world-class township communities and commercial business hubs in Pune.", isActive: true, displayOrder: 3 },
    { id: 4, name: "Kohinoor Group", slug: "kohinoor-group", domain: "kohinoorpune.com", logoUrl: "https://www.google.com/s2/favicons?domain=kohinoorpune.com&sz=128", website: "https://kohinoorpune.com", experienceYears: 39, totalProjects: 45, description: "Renowned developer with the Sada Sukhi Raho philosophy delivering quality homes across Pune.", isActive: true, displayOrder: 4 },
    { id: 5, name: "Kolte Patil", slug: "kolte-patil", domain: "koltepatil.com", logoUrl: "https://www.google.com/s2/favicons?domain=koltepatil.com&sz=128", website: "https://koltepatil.com", experienceYears: 33, totalProjects: 50, description: "NSE/BSE listed developer creating landmark integrated townships for over 30 years.", isActive: true, displayOrder: 5 },
    { id: 6, name: "Gera Developments", slug: "gera-developments", domain: "gera.in", logoUrl: "https://www.google.com/s2/favicons?domain=gera.in&sz=128", website: "https://gera.in", experienceYears: 50, totalProjects: 62, description: "Pioneers of ChildCentric homes and India's first 7-year real estate warranty.", isActive: true, displayOrder: 6 },
    { id: 7, name: "VTP Realty", slug: "vtp-realty", domain: "vtprealty.in", logoUrl: "/images/logos/vtp.png", website: "https://vtprealty.in", experienceYears: 38, totalProjects: 30, description: "Pune's leading residential brand renowned for Maximum Livable Area and swift execution.", isActive: true, displayOrder: 7 },
    { id: 8, name: "K Raheja Corp", slug: "k-raheja-corp", domain: "krahejacorp.com", logoUrl: "/images/logos/kraheja.jpg", website: "https://kraheja.com", experienceYears: 65, totalProjects: 70, description: "Leading pan-India real estate conglomerate shaping Grade-A IT parks.", isActive: true, displayOrder: 8 },
    { id: 9, name: "SS Group", slug: "ss-group", domain: "ssgroupindia.com", logoUrl: "https://www.google.com/s2/favicons?domain=ssgroupindia.com&sz=128", website: "https://ssgroupindia.com", experienceYears: 28, totalProjects: 22, description: "Trusted real estate group delivering architectural grandeur and high-value properties.", isActive: true, displayOrder: 9 },
    { id: 10, name: "Pristine Developers", slug: "pristine-developers", domain: "pristineproperties.com", logoUrl: "https://www.google.com/s2/favicons?domain=pristineproperties.com&sz=128", website: "https://pristineproperties.com", experienceYears: 30, totalProjects: 35, description: "Specialists in eco-friendly residential sanctuaries and premium gated enclaves.", isActive: true, displayOrder: 10 },
    { id: 11, name: "Lodha", slug: "lodha-group", domain: "lodhagroup.com", logoUrl: "/images/logos/lodha.png", website: "https://lodhagroup.com", experienceYears: 44, totalProjects: 85, description: "India's premier real estate developer delivering world-class residences.", isActive: true, displayOrder: 11 },
    { id: 12, name: "Godrej Properties", slug: "godrej-properties", domain: "godrejproperties.com", logoUrl: "/images/logos/godrej.svg", website: "https://godrejproperties.com", experienceYears: 34, totalProjects: 90, description: "125-year legacy of Godrej bringing innovation, sustainability, and excellence.", isActive: true, displayOrder: 12 },
    { id: 13, name: "Mahindra Lifespaces", slug: "mahindra-lifespaces", domain: "mahindralifespaces.com", logoUrl: "https://www.google.com/s2/favicons?domain=mahindralifespaces.com&sz=128", website: "https://mahindralifespaces.com", experienceYears: 30, totalProjects: 48, description: "Real estate and infrastructure development arm of the renowned Mahindra Group.", isActive: true, displayOrder: 13 },
    { id: 14, name: "JP Morgan", slug: "jp-morgan", domain: "jpmorgan.com", logoUrl: "https://www.google.com/s2/favicons?domain=jpmorgan.com&sz=128", website: "https://www.jpmorgan.com", experienceYears: 150, totalProjects: 50, description: "Global financial services leader and premier institutional real estate investor backing prime commercial and luxury developments.", isActive: true, displayOrder: 14 }
];

let memoryDevelopers = [...fallbackDevelopers];

function formatDeveloper(row) {
    if (!row) return null;
    return {
        id: row.id,
        name: row.name || "",
        slug: row.slug || (row.name ? row.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") : String(row.id)),
        domain: row.domain || "",
        logoUrl: row.logo_url || row.logoUrl || (row.domain ? `https://www.google.com/s2/favicons?domain=${row.domain}&sz=128` : ""),
        website: row.website || (row.domain ? `https://${row.domain}` : ""),
        phone: row.phone || "+91 73981 74444",
        email: row.email || "",
        experienceYears: row.experience_years ?? (row.experienceYears ?? 10),
        totalProjects: row.total_projects ?? (row.totalProjects ?? 5),
        description: row.description || "",
        isActive: Boolean(row.is_active ?? true),
        displayOrder: row.display_order ?? (row.displayOrder ?? 0),
        createdAt: row.created_at,
        updatedAt: row.updated_at
    };
}

export const DeveloperModel = {
    async list(filters = {}) {
        if (isDBConnected()) {
            try {
                let sql = "SELECT * FROM developers WHERE 1=1";
                const params = [];

                if (filters.isActive !== undefined) {
                    sql += " AND is_active = ?";
                    params.push(filters.isActive ? 1 : 0);
                } else if (!filters.all) {
                    sql += " AND is_active = 1";
                }

                sql += " ORDER BY display_order ASC, id ASC";

                const rows = await query(sql, params);
                return (rows || []).map(formatDeveloper);
            } catch (err) {
                console.error("DeveloperModel.list DB error:", err.message);
            }
        }
        let list = [...memoryDevelopers];
        if (filters.isActive !== undefined) {
            list = list.filter(d => d.isActive === filters.isActive);
        } else if (!filters.all) {
            list = list.filter(d => d.isActive !== false);
        }
        return list;
    },

    async getById(id) {
        if (isDBConnected()) {
            try {
                let sql = "SELECT * FROM developers WHERE id = ?";
                if (!/^\d+$/.test(String(id))) {
                    sql = "SELECT * FROM developers WHERE slug = ? OR LOWER(name) = LOWER(?)";
                    const rows = await query(sql, [id, id]);
                    return rows && rows.length > 0 ? formatDeveloper(rows[0]) : null;
                }
                const rows = await query(sql, [id]);
                return rows && rows.length > 0 ? formatDeveloper(rows[0]) : null;
            } catch (err) {
                console.error("DeveloperModel.getById DB error:", err.message);
            }
        }
        const found = memoryDevelopers.find(
            d => String(d.id) === String(id) || d.slug === String(id) || d.name?.toLowerCase() === String(id).toLowerCase()
        );
        return found || null;
    },

    async create(payload) {
        const slug = payload.slug || (payload.name || "developer").toLowerCase().replace(/[^a-z0-9]+/g, "-");
        if (isDBConnected()) {
            try {
                const sql = `
                    INSERT INTO developers (
                        name, slug, domain, logo_url, website, phone, email,
                        experience_years, total_projects, description, is_active, display_order
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                `;
                const params = [
                    payload.name,
                    slug,
                    payload.domain || null,
                    payload.logoUrl || payload.logo_url || null,
                    payload.website || null,
                    payload.phone || "+91 73981 74444",
                    payload.email || null,
                    payload.experienceYears ?? (payload.experience_years ?? 10),
                    payload.totalProjects ?? (payload.total_projects ?? 5),
                    payload.description || null,
                    payload.isActive !== undefined ? (payload.isActive ? 1 : 0) : 1,
                    payload.displayOrder ?? (payload.display_order ?? 0)
                ];
                const res = await query(sql, params);
                return this.getById(res.insertId);
            } catch (err) {
                console.error("DeveloperModel.create DB error:", err.message);
                throw err;
            }
        }

        const nextId = memoryDevelopers.reduce((max, item) => Math.max(max, Number(item.id) || 0), 0) + 1;
        const created = { id: nextId, ...payload, slug };
        memoryDevelopers.push(created);
        return created;
    },

    async update(id, payload) {
        if (isDBConnected()) {
            try {
                const fields = [];
                const params = [];

                if (payload.name !== undefined) { fields.push("name = ?"); params.push(payload.name); }
                if (payload.slug !== undefined) { fields.push("slug = ?"); params.push(payload.slug); }
                if (payload.domain !== undefined) { fields.push("domain = ?"); params.push(payload.domain); }
                if (payload.logoUrl !== undefined || payload.logo_url !== undefined) {
                    fields.push("logo_url = ?");
                    params.push(payload.logoUrl || payload.logo_url);
                }
                if (payload.website !== undefined) { fields.push("website = ?"); params.push(payload.website); }
                if (payload.phone !== undefined) { fields.push("phone = ?"); params.push(payload.phone); }
                if (payload.email !== undefined) { fields.push("email = ?"); params.push(payload.email); }
                if (payload.experienceYears !== undefined || payload.experience_years !== undefined) {
                    fields.push("experience_years = ?");
                    params.push(payload.experienceYears ?? payload.experience_years);
                }
                if (payload.totalProjects !== undefined || payload.total_projects !== undefined) {
                    fields.push("total_projects = ?");
                    params.push(payload.totalProjects ?? payload.total_projects);
                }
                if (payload.description !== undefined) { fields.push("description = ?"); params.push(payload.description); }
                if (payload.isActive !== undefined) { fields.push("is_active = ?"); params.push(payload.isActive ? 1 : 0); }
                if (payload.displayOrder !== undefined) { fields.push("display_order = ?"); params.push(payload.displayOrder); }

                if (fields.length > 0) {
                    params.push(id);
                    await query(`UPDATE developers SET ${fields.join(", ")} WHERE id = ?`, params);
                }
                return this.getById(id);
            } catch (err) {
                console.error("DeveloperModel.update DB error:", err.message);
                throw err;
            }
        }

        const idx = memoryDevelopers.findIndex(d => String(d.id) === String(id) || d.slug === String(id));
        if (idx !== -1) {
            memoryDevelopers[idx] = { ...memoryDevelopers[idx], ...payload };
            return memoryDevelopers[idx];
        }
        return null;
    },

    async delete(id) {
        if (isDBConnected()) {
            try {
                await query("DELETE FROM developers WHERE id = ?", [id]);
                return true;
            } catch (err) {
                console.error("DeveloperModel.delete DB error:", err.message);
                throw err;
            }
        }
        memoryDevelopers = memoryDevelopers.filter(d => String(d.id) !== String(id) && d.slug !== String(id));
        return true;
    }
};
