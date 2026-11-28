import { query, isDBConnected } from "../config/db.js";

const fallbackTrustStats = [
    { id: 1, statKey: "team-size", label: "Team Size", target: 200, targetValue: 200, suffix: " +", iconName: "Users", displayOrder: 1, isActive: true },
    { id: 2, statKey: "happy-clients", label: "Happy Clients", target: 20000, targetValue: 20000, suffix: " +", iconName: "UserRoundCheck", displayOrder: 2, isActive: true },
    { id: 3, statKey: "site-visits", label: "Site Visits", target: 10000, targetValue: 10000, suffix: " +", iconName: "CarFront", displayOrder: 3, isActive: true },
    { id: 4, statKey: "sqft-sold", label: "Sq. Ft Sold Till Date", target: 900000, targetValue: 900000, suffix: " +", iconName: "Building2", displayOrder: 4, isActive: true },
    { id: 5, statKey: "zero-brokerage", label: "Brokerage", target: 0, targetValue: 0, suffix: " %", iconName: "CirclePercent", displayOrder: 5, isActive: true }
];

let memoryStats = [...fallbackTrustStats];

function formatTrustStat(row) {
    if (!row) return null;
    const target = Number(row.target_value ?? (row.targetValue ?? row.target ?? 0));
    return {
        id: row.id,
        statKey: row.stat_key || row.statKey || `stat-${row.id}`,
        label: row.label || "",
        target: target,
        targetValue: target,
        suffix: row.suffix !== undefined ? row.suffix : " +",
        iconName: row.icon_name || row.iconName || "Users",
        displayOrder: row.display_order ?? (row.displayOrder ?? 0),
        isActive: Boolean(row.is_active ?? true),
        createdAt: row.created_at,
        updatedAt: row.updated_at
    };
}

export const TrustStatModel = {
    async list(filters = {}) {
        if (isDBConnected()) {
            try {
                let sql = "SELECT * FROM trust_stats WHERE 1=1";
                const params = [];

                if (filters.isActive !== undefined) {
                    sql += " AND is_active = ?";
                    params.push(filters.isActive ? 1 : 0);
                } else if (!filters.all) {
                    sql += " AND is_active = 1";
                }

                sql += " ORDER BY display_order ASC, id ASC";

                const rows = await query(sql, params);
                return (rows || []).map(formatTrustStat);
            } catch (err) {
                console.error("TrustStatModel.list DB error:", err.message);
            }
        }
        let list = [...memoryStats];
        if (filters.isActive !== undefined) {
            list = list.filter(s => s.isActive === filters.isActive);
        } else if (!filters.all) {
            list = list.filter(s => s.isActive !== false);
        }
        return list;
    },

    async getById(id) {
        if (isDBConnected()) {
            try {
                let sql = "SELECT * FROM trust_stats WHERE id = ?";
                if (!/^\d+$/.test(String(id))) {
                    sql = "SELECT * FROM trust_stats WHERE stat_key = ?";
                }
                const rows = await query(sql, [id]);
                return rows && rows.length > 0 ? formatTrustStat(rows[0]) : null;
            } catch (err) {
                console.error("TrustStatModel.getById DB error:", err.message);
            }
        }
        return memoryStats.find(s => String(s.id) === String(id) || s.statKey === String(id)) || null;
    },

    async create(payload) {
        const statKey = payload.statKey || payload.stat_key || (payload.label || "stat").toLowerCase().replace(/[^a-z0-9]+/g, "-");
        if (isDBConnected()) {
            try {
                const sql = `
                    INSERT INTO trust_stats (
                        stat_key, label, target_value, suffix, icon_name, display_order, is_active
                    ) VALUES (?, ?, ?, ?, ?, ?, ?)
                `;
                const params = [
                    statKey,
                    payload.label,
                    Number(payload.targetValue ?? payload.target ?? 0),
                    payload.suffix !== undefined ? payload.suffix : " +",
                    payload.iconName || payload.icon_name || "Users",
                    payload.displayOrder ?? (payload.display_order ?? 0),
                    payload.isActive !== undefined ? (payload.isActive ? 1 : 0) : 1
                ];
                const res = await query(sql, params);
                return this.getById(res.insertId);
            } catch (err) {
                console.error("TrustStatModel.create DB error:", err.message);
                throw err;
            }
        }

        const nextId = memoryStats.reduce((max, s) => Math.max(max, Number(s.id) || 0), 0) + 1;
        const created = { id: nextId, ...payload, statKey };
        memoryStats.push(created);
        return created;
    },

    async update(id, payload) {
        if (isDBConnected()) {
            try {
                const fields = [];
                const params = [];

                if (payload.statKey !== undefined || payload.stat_key !== undefined) {
                    fields.push("stat_key = ?");
                    params.push(payload.statKey || payload.stat_key);
                }
                if (payload.label !== undefined) { fields.push("label = ?"); params.push(payload.label); }
                if (payload.targetValue !== undefined || payload.target !== undefined) {
                    fields.push("target_value = ?");
                    params.push(Number(payload.targetValue ?? payload.target));
                }
                if (payload.suffix !== undefined) { fields.push("suffix = ?"); params.push(payload.suffix); }
                if (payload.iconName !== undefined || payload.icon_name !== undefined) {
                    fields.push("icon_name = ?");
                    params.push(payload.iconName || payload.icon_name);
                }
                if (payload.displayOrder !== undefined) { fields.push("display_order = ?"); params.push(payload.displayOrder); }
                if (payload.isActive !== undefined) { fields.push("is_active = ?"); params.push(payload.isActive ? 1 : 0); }

                if (fields.length > 0) {
                    params.push(id);
                    await query(`UPDATE trust_stats SET ${fields.join(", ")} WHERE id = ?`, params);
                }
                return this.getById(id);
            } catch (err) {
                console.error("TrustStatModel.update DB error:", err.message);
                throw err;
            }
        }

        const idx = memoryStats.findIndex(s => String(s.id) === String(id) || s.statKey === String(id));
        if (idx !== -1) {
            memoryStats[idx] = { ...memoryStats[idx], ...payload };
            return memoryStats[idx];
        }
        return null;
    },

    async delete(id) {
        if (isDBConnected()) {
            try {
                await query("DELETE FROM trust_stats WHERE id = ?", [id]);
                return true;
            } catch (err) {
                console.error("TrustStatModel.delete DB error:", err.message);
                throw err;
            }
        }
        memoryStats = memoryStats.filter(s => String(s.id) !== String(id) && s.statKey !== String(id));
        return true;
    }
};
