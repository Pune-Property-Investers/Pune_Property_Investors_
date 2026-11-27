import { query, isDBConnected } from "../config/db.js";

let memoryDevelopers = [
    { id: 1, name: "Godrej Properties", domain: "godrejproperties.com", logoUrl: "/images/logos/godrej.png", website: "https://godrejproperties.com", phone: "+91 73981 74444", description: "One of India's most trusted real estate conglomerates known for sustainability and innovation." },
    { id: 2, name: "Panchshil Realty", domain: "panchshil.com", logoUrl: "/images/logos/shapoorji.svg", website: "https://panchshil.com", phone: "+91 73981 74444", description: "Pioneers of ultra-luxury residential towers and Grade-A business IT parks across Pune." },
    { id: 3, name: "Lodha Group", domain: "lodhagroup.in", logoUrl: "/images/logos/lodha.png", website: "https://lodhagroup.in", phone: "+91 73981 74444", description: "India's premier real estate developer offering landmark developments and world-class architecture." },
    { id: 4, name: "Kolte-Patil Developers", domain: "koltepatil.com", logoUrl: "/images/logos/kolte-patil.jpg", website: "https://koltepatil.com", phone: "+91 73981 74444", description: "Renowned Pune developer with over 3 decades of creating landmark townships and modern residences." },
    { id: 5, name: "VTP Realty", domain: "vtprealty.in", logoUrl: "/images/logos/vtp.png", website: "https://vtprealty.in", phone: "+91 73981 74444", description: "Pune's leading residential developer known for Maximum Livable Area and high-speed execution." }
];

export const DeveloperModel = {
    async list() {
        if (!isDBConnected()) return [];
        const rows = await query("SELECT * FROM developers ORDER BY id DESC");
        return Array.isArray(rows) ? rows.map((r) => ({ ...r, logoUrl: r.logo_url || r.logoUrl })) : [];
    },

    async getById(id) {
        if (!isDBConnected()) return null;
        const rows = await query("SELECT * FROM developers WHERE id = ? LIMIT 1", [id]);
        return rows && rows.length > 0 ? { ...rows[0], logoUrl: rows[0].logo_url || rows[0].logoUrl } : null;
    },

    async create(payload) {
        if (isDBConnected()) {
            try {
                const result = await query(
                    `INSERT INTO developers (name, domain, logo_url, website, phone, email, description)
                     VALUES (?, ?, ?, ?, ?, ?, ?)`,
                    [
                        payload.name || "Developer",
                        payload.domain || "",
                        payload.logoUrl || payload.logo_url || "",
                        payload.website || "",
                        payload.phone || "",
                        payload.email || "",
                        payload.description || ""
                    ]
                );
                if (result?.insertId) {
                    return { id: result.insertId, ...payload };
                }
            } catch (_) {}
        }
        const nextId = memoryDevelopers.reduce((max, item) => Math.max(max, Number(item.id) || 0), 0) + 1;
        const created = { id: nextId, ...payload };
        memoryDevelopers.push(created);
        return created;
    },

    async update(id, payload) {
        if (isDBConnected()) {
            try {
                const map = {
                    name: "name",
                    domain: "domain",
                    logoUrl: "logo_url",
                    logo_url: "logo_url",
                    website: "website",
                    phone: "phone",
                    email: "email",
                    description: "description"
                };
                const updates = [];
                const values = [];
                for (const [k, col] of Object.entries(map)) {
                    if (payload[k] !== undefined) {
                        updates.push(`${col} = ?`);
                        values.push(payload[k]);
                    }
                }
                if (updates.length > 0) {
                    values.push(id);
                    await query(`UPDATE developers SET ${updates.join(", ")} WHERE id = ?`, values);
                }
            } catch (_) {}
        }
        const idx = memoryDevelopers.findIndex(d => String(d.id) === String(id));
        if (idx !== -1) {
            memoryDevelopers[idx] = { ...memoryDevelopers[idx], ...payload };
            return memoryDevelopers[idx];
        }
        return { id, ...payload };
    },

    async delete(id) {
        if (isDBConnected()) {
            try {
                await query("DELETE FROM developers WHERE id = ?", [id]);
            } catch (_) {}
        }
        memoryDevelopers = memoryDevelopers.filter(d => String(d.id) !== String(id));
        return true;
    }
};
