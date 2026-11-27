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

function toSlug(title = "") {
    return String(title).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export const ArticleModel = {
    async list(type) {
        if (!isDBConnected()) return [];
        const sql = type ? "SELECT * FROM articles WHERE type = ? ORDER BY id DESC" : "SELECT * FROM articles ORDER BY id DESC";
        const rows = await query(sql, type ? [type] : []);
        return Array.isArray(rows) ? rows.map((r) => ({ ...r, readTime: r.read_time || r.readTime })) : [];
    },

    async getById(id) {
        if (!isDBConnected()) return null;
        const rows = await query("SELECT * FROM articles WHERE id = ? OR slug = ? LIMIT 1", [id, id]);
        return rows && rows.length > 0 ? { ...rows[0], readTime: rows[0].read_time || rows[0].readTime } : null;
    },

    async create(payload) {
        const slug = payload.slug || `${toSlug(payload.title || "article")}-${Date.now()}`;
        if (isDBConnected()) {
            try {
                const result = await query(
                    `INSERT INTO articles (type, title, slug, category, author, date, read_time, status, image, excerpt, content)
                     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                    [
                        payload.type || "blog",
                        payload.title || "Untitled Article",
                        slug,
                        payload.category || "Real Estate",
                        payload.author || "PPI Editorial",
                        payload.date || new Date().toLocaleDateString("en-IN", { month: "short", year: "numeric" }),
                        payload.readTime || payload.read_time || "4 min read",
                        payload.status || "Published",
                        payload.image || "",
                        payload.excerpt || "",
                        payload.content || ""
                    ]
                );
                if (result?.insertId) {
                    return { id: result.insertId, slug, ...payload };
                }
            } catch (_) {}
        }
        const nextId = memoryArticles.reduce((m, a) => Math.max(m, Number(a.id) || 0), 0) + 1;
        const created = { id: nextId, slug, ...payload, createdAt: new Date().toISOString() };
        memoryArticles.unshift(created);
        return created;
    },

    async update(id, payload) {
        if (isDBConnected()) {
            try {
                const map = {
                    type: "type",
                    title: "title",
                    slug: "slug",
                    category: "category",
                    author: "author",
                    date: "date",
                    readTime: "read_time",
                    read_time: "read_time",
                    status: "status",
                    image: "image",
                    excerpt: "excerpt",
                    content: "content"
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
                    await query(`UPDATE articles SET ${updates.join(", ")} WHERE id = ?`, values);
                }
            } catch (_) {}
        }
        const idx = memoryArticles.findIndex(a => String(a.id) === String(id));
        if (idx !== -1) {
            memoryArticles[idx] = { ...memoryArticles[idx], ...payload, updatedAt: new Date().toISOString() };
            return memoryArticles[idx];
        }
        return { id, ...payload };
    },

    async delete(id) {
        if (isDBConnected()) {
            try {
                await query("DELETE FROM articles WHERE id = ?", [id]);
            } catch (_) {}
        }
        memoryArticles = memoryArticles.filter(a => String(a.id) !== String(id));
        return true;
    }
};
