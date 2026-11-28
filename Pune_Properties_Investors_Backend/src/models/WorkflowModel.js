import { query, isDBConnected } from "../config/db.js";

const fallbackWorkflowSteps = [
    { id: 1, stepNumber: 1, title: "Select Property", description: "Explore verified luxury properties and new launches that match your lifestyle and investment goals.", iconName: "MapPin", isActive: true, displayOrder: 1 },
    { id: 2, stepNumber: 2, title: "Submit Your Enquiry", description: "Tell us your preferred location, configuration, and budget for zero-brokerage VIP assistance.", iconName: "FileText", isActive: true, displayOrder: 2 },
    { id: 3, stepNumber: 3, title: "Meet Our Expert", description: "Receive unbiased advisory, accurate pricing comparisons, and tailored inventory recommendations.", iconName: "Users", isActive: true, displayOrder: 3 },
    { id: 4, stepNumber: 4, title: "Visit Property", description: "Experience curated private site walkthroughs with complimentary chauffeur pickup & drop.", iconName: "Building2", isActive: true, displayOrder: 4 },
    { id: 5, stepNumber: 5, title: "Buy Property", description: "Lock in inaugural launch privileges, early bird payment plans, and direct builder contracts.", iconName: "KeyRound", isActive: true, displayOrder: 5 },
    { id: 6, stepNumber: 6, title: "Loan Assistance", description: "Enjoy instant home loan pre-approvals and lowest interest rate negotiation across 20+ leading banks.", iconName: "Landmark", isActive: true, displayOrder: 6 },
    { id: 7, stepNumber: 7, title: "Customer Support", description: "Ongoing documentation, legal verification, agreement registration, and lifetime handover support.", iconName: "Headset", isActive: true, displayOrder: 7 }
];

let memorySteps = [...fallbackWorkflowSteps];

function formatWorkflowStep(row) {
    if (!row) return null;
    return {
        id: row.id,
        stepNumber: row.step_number ?? (row.stepNumber ?? row.id),
        title: row.title || "",
        description: row.description || "",
        iconName: row.icon_name || row.iconName || "MapPin",
        isActive: Boolean(row.is_active ?? true),
        displayOrder: row.display_order ?? (row.displayOrder ?? 0),
        createdAt: row.created_at,
        updatedAt: row.updated_at
    };
}

export const WorkflowModel = {
    async list(filters = {}) {
        if (isDBConnected()) {
            try {
                let sql = "SELECT * FROM workflow_steps WHERE 1=1";
                const params = [];

                if (filters.isActive !== undefined) {
                    sql += " AND is_active = ?";
                    params.push(filters.isActive ? 1 : 0);
                } else if (!filters.all) {
                    sql += " AND is_active = 1";
                }

                sql += " ORDER BY display_order ASC, step_number ASC, id ASC";

                const rows = await query(sql, params);
                return (rows || []).map(formatWorkflowStep);
            } catch (err) {
                console.error("WorkflowModel.list DB error:", err.message);
            }
        }
        let list = [...memorySteps];
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
                const rows = await query("SELECT * FROM workflow_steps WHERE id = ?", [id]);
                return rows && rows.length > 0 ? formatWorkflowStep(rows[0]) : null;
            } catch (err) {
                console.error("WorkflowModel.getById DB error:", err.message);
            }
        }
        return memorySteps.find(s => String(s.id) === String(id)) || null;
    },

    async create(payload) {
        if (isDBConnected()) {
            try {
                const sql = `
                    INSERT INTO workflow_steps (
                        step_number, title, description, icon_name, is_active, display_order
                    ) VALUES (?, ?, ?, ?, ?, ?)
                `;
                const params = [
                    payload.stepNumber ?? (payload.step_number ?? (memorySteps.length + 1)),
                    payload.title,
                    payload.description || "",
                    payload.iconName || payload.icon_name || "MapPin",
                    payload.isActive !== undefined ? (payload.isActive ? 1 : 0) : 1,
                    payload.displayOrder ?? (payload.display_order ?? 0)
                ];
                const res = await query(sql, params);
                return this.getById(res.insertId);
            } catch (err) {
                console.error("WorkflowModel.create DB error:", err.message);
                throw err;
            }
        }

        const nextId = memorySteps.reduce((max, s) => Math.max(max, Number(s.id) || 0), 0) + 1;
        const created = { id: nextId, ...payload };
        memorySteps.push(created);
        return created;
    },

    async update(id, payload) {
        if (isDBConnected()) {
            try {
                const fields = [];
                const params = [];

                if (payload.stepNumber !== undefined || payload.step_number !== undefined) {
                    fields.push("step_number = ?");
                    params.push(payload.stepNumber ?? payload.step_number);
                }
                if (payload.title !== undefined) { fields.push("title = ?"); params.push(payload.title); }
                if (payload.description !== undefined) { fields.push("description = ?"); params.push(payload.description); }
                if (payload.iconName !== undefined || payload.icon_name !== undefined) {
                    fields.push("icon_name = ?");
                    params.push(payload.iconName || payload.icon_name);
                }
                if (payload.isActive !== undefined) { fields.push("is_active = ?"); params.push(payload.isActive ? 1 : 0); }
                if (payload.displayOrder !== undefined) { fields.push("display_order = ?"); params.push(payload.displayOrder); }

                if (fields.length > 0) {
                    params.push(id);
                    await query(`UPDATE workflow_steps SET ${fields.join(", ")} WHERE id = ?`, params);
                }
                return this.getById(id);
            } catch (err) {
                console.error("WorkflowModel.update DB error:", err.message);
                throw err;
            }
        }

        const idx = memorySteps.findIndex(s => String(s.id) === String(id));
        if (idx !== -1) {
            memorySteps[idx] = { ...memorySteps[idx], ...payload };
            return memorySteps[idx];
        }
        return null;
    },

    async delete(id) {
        if (isDBConnected()) {
            try {
                await query("DELETE FROM workflow_steps WHERE id = ?", [id]);
                return true;
            } catch (err) {
                console.error("WorkflowModel.delete DB error:", err.message);
                throw err;
            }
        }
        memorySteps = memorySteps.filter(s => String(s.id) !== String(id));
        return true;
    }
};
