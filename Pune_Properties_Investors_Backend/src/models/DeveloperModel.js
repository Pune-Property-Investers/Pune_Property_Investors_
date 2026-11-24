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
        if (isDBConnected()) {
            try {
                const rows = await query("SELECT * FROM developers");
                if (rows && rows.length > 0) return rows;
            } catch (_) {}
        }
        return [...memoryDevelopers];
    },

    async getById(id) {
        return memoryDevelopers.find(d => String(d.id) === String(id) || d.name?.toLowerCase() === String(id).toLowerCase()) || null;
    },

    async create(payload) {
        const nextId = memoryDevelopers.reduce((max, item) => Math.max(max, Number(item.id) || 0), 0) + 1;
        const created = { id: nextId, ...payload };
        memoryDevelopers.push(created);
        return created;
    },

    async update(id, payload) {
        const idx = memoryDevelopers.findIndex(d => String(d.id) === String(id));
        if (idx !== -1) {
            memoryDevelopers[idx] = { ...memoryDevelopers[idx], ...payload };
        }
        return memoryDevelopers[idx] || null;
    },

    async delete(id) {
        memoryDevelopers = memoryDevelopers.filter(d => String(d.id) !== String(id));
        return true;
    }
};
