import { query, isDBConnected } from "../config/db.js";

const fallbackTrustHighlights = [
    { id: 1, highlightKey: "trust", title: "100% TRUST", line1: "100%", line2: "TRUST", description: "Complete Transparency. Confident Decisions.", desc: "Complete Transparency. Confident Decisions.", iconName: "ShieldCheck", displayOrder: 1, isActive: true },
    { id: 2, highlightKey: "brokerage", title: "ZERO BROKERAGE", line1: "ZERO", line2: "BROKERAGE", description: "No Brokerage. No Hidden Charges.", desc: "No Brokerage. No Hidden Charges.", iconName: "CirclePercent", displayOrder: 2, isActive: true },
    { id: 3, highlightKey: "price", title: "BEST LAUNCH PRICE", line1: "BEST LAUNCH", line2: "PRICE", description: "Exclusive Launch Offers. Maximum Savings.", desc: "Exclusive Launch Offers. Maximum Savings.", iconName: "Sparkles", displayOrder: 3, isActive: true }
];

let memoryHighlights = [...fallbackTrustHighlights];

function formatTrustHighlight(row) {
    if (!row) return null;
    return {
        id: row.id,
        highlightKey: row.highlight_key || row.highlightKey || `highlight-${row.id}`,
        title: row.title || "",
        line1: row.line1 || "",
        line2: row.line2 || "",
        description: row.description || "",
        desc: row.description || "",
        iconName: row.icon_name || row.iconName || "ShieldCheck",
        displayOrder: row.display_order ?? (row.displayOrder ?? 0),
        isActive: Boolean(row.is_active ?? true),
        createdAt: row.created_at,
        updatedAt: row.updated_at
    };
}

export const TrustHighlightModel = {
    async list(filters = {}) {
        if (isDBConnected()) {
            try {
                let sql = "SELECT * FROM trust_highlights WHERE 1=1";
                const params = [];

                if (filters.isActive !== undefined) {
                    sql += " AND is_active = ?";
                    params.push(filters.isActive ? 1 : 0);
                } else if (!filters.all) {
                    sql += " AND is_active = 1";
                }

                sql += " ORDER BY display_order ASC, id ASC";

                const rows = await query(sql, params);
                return (rows || []).map(formatTrustHighlight);
            } catch (err) {
                console.error("TrustHighlightModel.list DB error:", err.message);
            }
        }
        let list = [...memoryHighlights];
        if (filters.isActive !== undefined) {
            list = list.filter(h => h.isActive === filters.isActive);
        } else if (!filters.all) {
            list = list.filter(h => h.isActive !== false);
        }
        return list;
    },

    async getById(id) {
        if (isDBConnected()) {
            try {
                let sql = "SELECT * FROM trust_highlights WHERE id = ?";
                if (!/^\d+$/.test(String(id))) {
                    sql = "SELECT * FROM trust_highlights WHERE highlight_key = ?";
                }
                const rows = await query(sql, [id]);
                return rows && rows.length > 0 ? formatTrustHighlight(rows[0]) : null;
            } catch (err) {
                console.error("TrustHighlightModel.getById DB error:", err.message);
            }
        }
        return memoryHighlights.find(h => String(h.id) === String(id) || h.highlightKey === String(id)) || null;
    },

    async create(payload) {
        const highlightKey = payload.highlightKey || payload.highlight_key || (payload.title || "highlight").toLowerCase().replace(/[^a-z0-9]+/g, "-");
        if (isDBConnected()) {
            try {
                const sql = `
                    INSERT INTO trust_highlights (
                        highlight_key, title, line1, line2, description, icon_name, display_order, is_active
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                `;
                const params = [
                    highlightKey,
                    payload.title,
                    payload.line1 || null,
                    payload.line2 || null,
                    payload.description || payload.desc || "",
                    payload.iconName || payload.icon_name || "ShieldCheck",
                    payload.displayOrder ?? (payload.display_order ?? 0),
                    payload.isActive !== undefined ? (payload.isActive ? 1 : 0) : 1
                ];
                const res = await query(sql, params);
                return this.getById(res.insertId);
            } catch (err) {
                console.error("TrustHighlightModel.create DB error:", err.message);
                throw err;
            }
        }

        const nextId = memoryHighlights.reduce((max, h) => Math.max(max, Number(h.id) || 0), 0) + 1;
        const created = { id: nextId, ...payload, highlightKey };
        memoryHighlights.push(created);
        return created;
    },

    async update(id, payload) {
        if (isDBConnected()) {
            try {
                const fields = [];
                const params = [];

                if (payload.highlightKey !== undefined || payload.highlight_key !== undefined) {
                    fields.push("highlight_key = ?");
                    params.push(payload.highlightKey || payload.highlight_key);
                }
                if (payload.title !== undefined) { fields.push("title = ?"); params.push(payload.title); }
                if (payload.line1 !== undefined) { fields.push("line1 = ?"); params.push(payload.line1); }
                if (payload.line2 !== undefined) { fields.push("line2 = ?"); params.push(payload.line2); }
                if (payload.description !== undefined || payload.desc !== undefined) {
                    fields.push("description = ?");
                    params.push(payload.description || payload.desc);
                }
                if (payload.iconName !== undefined || payload.icon_name !== undefined) {
                    fields.push("icon_name = ?");
                    params.push(payload.iconName || payload.icon_name);
                }
                if (payload.displayOrder !== undefined) { fields.push("display_order = ?"); params.push(payload.displayOrder); }
                if (payload.isActive !== undefined) { fields.push("is_active = ?"); params.push(payload.isActive ? 1 : 0); }

                if (fields.length > 0) {
                    params.push(id);
                    await query(`UPDATE trust_highlights SET ${fields.join(", ")} WHERE id = ?`, params);
                }
                return this.getById(id);
            } catch (err) {
                console.error("TrustHighlightModel.update DB error:", err.message);
                throw err;
            }
        }

        const idx = memoryHighlights.findIndex(h => String(h.id) === String(id) || h.highlightKey === String(id));
        if (idx !== -1) {
            memoryHighlights[idx] = { ...memoryHighlights[idx], ...payload };
            return memoryHighlights[idx];
        }
        return null;
    },

    async delete(id) {
        if (isDBConnected()) {
            try {
                await query("DELETE FROM trust_highlights WHERE id = ?", [id]);
                return true;
            } catch (err) {
                console.error("TrustHighlightModel.delete DB error:", err.message);
                throw err;
            }
        }
        memoryHighlights = memoryHighlights.filter(h => String(h.id) !== String(id) && h.highlightKey !== String(id));
        return true;
    }
};
