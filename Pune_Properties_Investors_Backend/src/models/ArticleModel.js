import { query, isDBConnected } from "../config/db.js";

let memoryArticles = [
    {
        id: 1,
        type: "blog",
        title: "Top 7 High-Growth Localities to Buy Property in Pune (2026 Edition)",
        slug: "top-high-growth-localities-pune",
        category: "Locality Guide",
        author: "PPI Research Desk",
        date: "Nov 2026",
        readTime: "6 min read",
        status: "Published",
        image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
        excerpt: "An in-depth analysis of Pune's fastest growing residential corridors driven by the Metro extension, Ring Road connectivity, and IT expansions.",
        content: "Discover why Kharadi, Baner, Wakad, and Hinjewadi are leading capital appreciation charts in Pune real estate."
    },
    {
        id: 2,
        type: "news",
        title: "Pune Metro Phase 2 Approval: Key Beneficiary Real Estate Localities",
        slug: "pune-metro-phase-2-impact",
        category: "Infrastructure",
        author: "Editorial Team",
        date: "Nov 2026",
        readTime: "4 min read",
        status: "Published",
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80",
        excerpt: "State cabinet clears crucial metro lines connecting Hinjewadi to Civil Court and Ramwadi to Wagholi.",
        content: "Detailed breakdown of upcoming metro stations and property price impact along major transport corridors."
    }
];

export const ArticleModel = {
    async list(type) {
        if (isDBConnected()) {
            try {
                const sql = type ? "SELECT * FROM articles WHERE type = ?" : "SELECT * FROM articles";
                const rows = await query(sql, type ? [type] : []);
                if (rows && rows.length > 0) return rows;
            } catch (_) {}
        }
        return type ? memoryArticles.filter(a => a.type === type) : [...memoryArticles];
    },

    async getById(id) {
        return memoryArticles.find(a => String(a.id) === String(id) || a.slug === id) || null;
    },

    async create(payload) {
        const nextId = memoryArticles.reduce((m, a) => Math.max(m, Number(a.id) || 0), 0) + 1;
        const created = { id: nextId, ...payload, createdAt: new Date().toISOString() };
        memoryArticles.unshift(created);
        return created;
    },

    async update(id, payload) {
        const idx = memoryArticles.findIndex(a => String(a.id) === String(id));
        if (idx !== -1) {
            memoryArticles[idx] = { ...memoryArticles[idx], ...payload, updatedAt: new Date().toISOString() };
        }
        return memoryArticles[idx] || null;
    },

    async delete(id) {
        memoryArticles = memoryArticles.filter(a => String(a.id) !== String(id));
        return true;
    }
};
