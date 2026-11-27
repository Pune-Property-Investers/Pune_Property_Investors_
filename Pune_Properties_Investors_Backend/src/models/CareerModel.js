import { query, isDBConnected } from "../config/db.js";

let memoryJobs = [
    {
        id: 1,
        title: "Senior Real Estate Investment Advisor",
        category: "Sales & Advisory",
        location: "Kharadi, Pune",
        experience: "3-6 years",
        type: "Full Time",
        status: "Open",
        description: "Guide high-net-worth clients and homebuyers in making informed property purchases across Pune's prime luxury corridors."
    },
    {
        id: 2,
        title: "Digital Marketing & Performance Lead",
        category: "Marketing",
        location: "Kharadi, Pune",
        experience: "2-4 years",
        type: "Full Time",
        status: "Open",
        description: "Drive lead generation across Meta, Google Search, and YouTube for primary developer launches."
    }
];

let memoryApplications = [];

export const CareerModel = {
    async listJobs() {
        if (!isDBConnected()) return [];
        const rows = await query("SELECT * FROM jobs ORDER BY id DESC");
        return Array.isArray(rows) ? rows : [];
    },

    async createJob(payload) {
        if (isDBConnected()) {
            try {
                const result = await query(
                    `INSERT INTO jobs (title, category, location, experience, type, status, description)
                     VALUES (?, ?, ?, ?, ?, ?, ?)`,
                    [
                        payload.title || "Open Position",
                        payload.category || "General",
                        payload.location || "Pune",
                        payload.experience || "1-3 years",
                        payload.type || "Full Time",
                        payload.status || "Open",
                        payload.description || ""
                    ]
                );
                if (result?.insertId) {
                    return { id: result.insertId, ...payload };
                }
            } catch (_) {}
        }
        const nextId = memoryJobs.reduce((m, j) => Math.max(m, Number(j.id) || 0), 0) + 1;
        const created = { id: nextId, ...payload, createdAt: new Date().toISOString() };
        memoryJobs.unshift(created);
        return created;
    },

    async updateJob(id, payload) {
        if (isDBConnected()) {
            try {
                const map = {
                    title: "title",
                    category: "category",
                    location: "location",
                    experience: "experience",
                    type: "type",
                    status: "status",
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
                    await query(`UPDATE jobs SET ${updates.join(", ")} WHERE id = ?`, values);
                }
            } catch (_) {}
        }
        const idx = memoryJobs.findIndex(j => String(j.id) === String(id));
        if (idx !== -1) {
            memoryJobs[idx] = { ...memoryJobs[idx], ...payload, updatedAt: new Date().toISOString() };
            return memoryJobs[idx];
        }
        return { id, ...payload };
    },

    async deleteJob(id) {
        if (isDBConnected()) {
            try {
                await query("DELETE FROM jobs WHERE id = ?", [id]);
            } catch (_) {}
        }
        memoryJobs = memoryJobs.filter(j => String(j.id) !== String(id));
        return true;
    },

    async listApplications() {
        if (isDBConnected()) {
            try {
                const rows = await query("SELECT section_data FROM settings WHERE section_key = 'career_applications' LIMIT 1");
                if (rows && rows.length > 0 && rows[0].section_data) {
                    const parsed = typeof rows[0].section_data === "string" ? JSON.parse(rows[0].section_data) : rows[0].section_data;
                    if (Array.isArray(parsed)) return parsed;
                }
            } catch (_) {}
        }
        return [...memoryApplications];
    },

    async createApplication(payload) {
        const current = await this.listApplications();
        const nextId = current.reduce((m, a) => Math.max(m, Number(a.id) || 0), 0) + 1;
        const created = { id: nextId, ...payload, createdAt: new Date().toISOString() };
        const updated = [created, ...current];
        memoryApplications = updated;
        if (isDBConnected()) {
            try {
                await query(
                    `INSERT INTO settings (section_key, section_data)
                     VALUES ('career_applications', ?)
                     ON DUPLICATE KEY UPDATE section_data = VALUES(section_data), updated_at = CURRENT_TIMESTAMP`,
                    [JSON.stringify(updated)]
                );
            } catch (_) {}
        }
        return created;
    },

    async updateApplication(id, payload) {
        const current = await this.listApplications();
        let updatedItem = null;
        const updated = current.map((app) => {
            if (String(app.id) === String(id)) {
                updatedItem = { ...app, ...payload, updatedAt: new Date().toISOString() };
                return updatedItem;
            }
            return app;
        });
        memoryApplications = updated;
        if (isDBConnected() && updatedItem) {
            try {
                await query(
                    `INSERT INTO settings (section_key, section_data)
                     VALUES ('career_applications', ?)
                     ON DUPLICATE KEY UPDATE section_data = VALUES(section_data), updated_at = CURRENT_TIMESTAMP`,
                    [JSON.stringify(updated)]
                );
            } catch (_) {}
        }
        return updatedItem;
    }
};
