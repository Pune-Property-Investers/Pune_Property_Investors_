import { query, isDBConnected } from "../config/db.js";

let memoryLocations = [
    { id: 1, name: "Kharadi", zone: "East Pune", subtitle: "Global IT Hub & Premium Riverside Living", avgRate: "₹10,500 / sq.ft", isFeatured: true, image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80" },
    { id: 2, name: "Baner", zone: "West Pune", subtitle: "High Street, Lifestyle & Western Corridor", avgRate: "₹9,800 / sq.ft", isFeatured: true, image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80" },
    { id: 3, name: "Hinjewadi", zone: "West Pune", subtitle: "The Silicon Core of Pune", avgRate: "₹7,800 / sq.ft", isFeatured: true, image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80" },
    { id: 4, name: "Wakad", zone: "West Pune", subtitle: "Family Living with Seamless Connectivity", avgRate: "₹7,650 / sq.ft", isFeatured: false, image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80" },
    { id: 5, name: "Hadapsar", zone: "East Pune", subtitle: "SP Infocity & Integrated Mega-Townships", avgRate: "₹8,200 / sq.ft", isFeatured: false, image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80" }
];

export const LocationModel = {
    async list() {
        if (isDBConnected()) {
            try {
                const rows = await query("SELECT * FROM locations");
                if (rows && rows.length > 0) return rows;
            } catch (_) {}
        }
        return [...memoryLocations];
    },

    async getById(id) {
        return memoryLocations.find(l => String(l.id) === String(id) || l.name?.toLowerCase() === String(id).toLowerCase()) || null;
    },

    async create(payload) {
        const nextId = memoryLocations.reduce((max, item) => Math.max(max, Number(item.id) || 0), 0) + 1;
        const created = { id: nextId, ...payload };
        memoryLocations.push(created);
        return created;
    },

    async update(id, payload) {
        const idx = memoryLocations.findIndex(l => String(l.id) === String(id));
        if (idx !== -1) {
            memoryLocations[idx] = { ...memoryLocations[idx], ...payload };
        }
        return memoryLocations[idx] || null;
    },

    async delete(id) {
        memoryLocations = memoryLocations.filter(l => String(l.id) !== String(id));
        return true;
    }
};
