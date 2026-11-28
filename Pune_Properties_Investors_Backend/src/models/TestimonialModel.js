import { query, isDBConnected } from "../config/db.js";

const fallbackTestimonials = [
    {
        id: 1,
        name: "Vikram Malhotra",
        role: "First-time Homebuyer",
        location: "Kharadi, Pune",
        rating: 5,
        text: "PPI helped us secure our dream 3 BHK in Kharadi with zero brokerage and guided us through transparent builder negotiations. Truly exceptional service.",
        avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
        projectName: "Panchshil Towers",
        displayOrder: 1,
        isActive: true,
    },
    {
        id: 2,
        name: "Dr. Ananya Deshmukh",
        role: "Luxury Villa Buyer",
        location: "Baner, Pune",
        rating: 5,
        text: "Their in-depth knowledge of Baner-Balewadi developments and swift loan coordination made the whole buying journey completely stress-free.",
        avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
        projectName: "VTP Earth One",
        displayOrder: 2,
        isActive: true,
    },
    {
        id: 3,
        name: "Rajesh & Sunita Kulkarni",
        role: "NRI Property Investor",
        location: "Hinjewadi, Pune",
        rating: 5,
        text: "Investing from Dubai was seamless. The PPI team arranged live video walkthroughs, verified RERA documentation, and provided accurate rental yield projections.",
        avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
        projectName: "Godrej Woodsville",
        displayOrder: 3,
        isActive: true,
    },
    {
        id: 4,
        name: "Amitesh Sengupta",
        role: "Tech Entrepreneur",
        location: "Wakad, Pune",
        rating: 5,
        text: "Honest advisory without sales pressure. Got pre-launch pricing and complete assistance right up to registration day.",
        avatarUrl: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80",
        projectName: "Kohinoor Courtyard",
        displayOrder: 4,
        isActive: true,
    },
];

let memoryTestimonials = [...fallbackTestimonials];

function formatTestimonial(row) {
    if (!row) return null;
    return {
        id: row.id,
        name: row.name || "",
        role: row.role || "Homebuyer",
        location: row.location || "Pune",
        rating: Number(row.rating ?? 5),
        text: row.text || "",
        avatarUrl: row.avatar_url || row.avatarUrl || null,
        projectName: row.project_name || row.projectName || null,
        displayOrder: Number(row.display_order ?? 0),
        isActive: Boolean(row.is_active ?? true),
        createdAt: row.created_at,
        updatedAt: row.updated_at,
    };
}

export const TestimonialModel = {
    async list(filters = {}) {
        if (isDBConnected()) {
            try {
                let sql = "SELECT * FROM testimonials WHERE 1=1";
                const params = [];

                if (filters.isActive !== undefined) {
                    sql += " AND is_active = ?";
                    params.push(filters.isActive ? 1 : 0);
                } else if (!filters.all) {
                    sql += " AND is_active = 1";
                }

                sql += " ORDER BY display_order ASC, id ASC";

                const rows = await query(sql, params);
                return (rows || []).map(formatTestimonial);
            } catch (err) {
                console.error("TestimonialModel.list DB error:", err.message);
            }
        }
        let list = [...memoryTestimonials];
        if (filters.isActive !== undefined) {
            list = list.filter((t) => t.isActive === filters.isActive);
        } else if (!filters.all) {
            list = list.filter((t) => t.isActive !== false);
        }
        return list;
    },

    async getById(id) {
        if (isDBConnected()) {
            try {
                const sql = "SELECT * FROM testimonials WHERE id = ?";
                const rows = await query(sql, [id]);
                return rows && rows.length > 0 ? formatTestimonial(rows[0]) : null;
            } catch (err) {
                console.error("TestimonialModel.getById DB error:", err.message);
            }
        }
        return memoryTestimonials.find((t) => String(t.id) === String(id)) || null;
    },

    async create(payload) {
        if (isDBConnected()) {
            try {
                const sql = `
                    INSERT INTO testimonials (name, role, location, rating, text, avatar_url, project_name, display_order, is_active)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
                `;
                const params = [
                    payload.name || "Customer",
                    payload.role || "Homebuyer",
                    payload.location || "Pune",
                    Number(payload.rating ?? 5),
                    payload.text || "",
                    payload.avatarUrl || payload.avatar_url || null,
                    payload.projectName || payload.project_name || null,
                    Number(payload.displayOrder ?? 0),
                    payload.isActive !== false ? 1 : 0,
                ];
                const result = await query(sql, params);
                return this.getById(result.insertId);
            } catch (err) {
                console.error("TestimonialModel.create DB error:", err.message);
            }
        }
        const newId = memoryTestimonials.length ? Math.max(...memoryTestimonials.map((t) => t.id)) + 1 : 1;
        const record = {
            id: newId,
            name: payload.name || "Customer",
            role: payload.role || "Homebuyer",
            location: payload.location || "Pune",
            rating: Number(payload.rating ?? 5),
            text: payload.text || "",
            avatarUrl: payload.avatarUrl || payload.avatar_url || null,
            projectName: payload.projectName || payload.project_name || null,
            displayOrder: Number(payload.displayOrder ?? 0),
            isActive: payload.isActive !== false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        memoryTestimonials.push(record);
        return record;
    },

    async update(id, payload) {
        if (isDBConnected()) {
            try {
                const fields = [];
                const params = [];

                if (payload.name !== undefined) {
                    fields.push("name = ?");
                    params.push(payload.name);
                }
                if (payload.role !== undefined) {
                    fields.push("role = ?");
                    params.push(payload.role);
                }
                if (payload.location !== undefined) {
                    fields.push("location = ?");
                    params.push(payload.location);
                }
                if (payload.rating !== undefined) {
                    fields.push("rating = ?");
                    params.push(Number(payload.rating));
                }
                if (payload.text !== undefined) {
                    fields.push("text = ?");
                    params.push(payload.text);
                }
                if (payload.avatarUrl !== undefined || payload.avatar_url !== undefined) {
                    fields.push("avatar_url = ?");
                    params.push(payload.avatarUrl || payload.avatar_url);
                }
                if (payload.projectName !== undefined || payload.project_name !== undefined) {
                    fields.push("project_name = ?");
                    params.push(payload.projectName || payload.project_name);
                }
                if (payload.displayOrder !== undefined || payload.display_order !== undefined) {
                    fields.push("display_order = ?");
                    params.push(Number(payload.displayOrder ?? payload.display_order));
                }
                if (payload.isActive !== undefined || payload.is_active !== undefined) {
                    fields.push("is_active = ?");
                    params.push((payload.isActive ?? payload.is_active) ? 1 : 0);
                }

                if (fields.length > 0) {
                    params.push(id);
                    await query(`UPDATE testimonials SET ${fields.join(", ")} WHERE id = ?`, params);
                }
                return this.getById(id);
            } catch (err) {
                console.error("TestimonialModel.update DB error:", err.message);
            }
        }
        const index = memoryTestimonials.findIndex((t) => String(t.id) === String(id));
        if (index !== -1) {
            memoryTestimonials[index] = {
                ...memoryTestimonials[index],
                ...payload,
                updatedAt: new Date().toISOString(),
            };
            return memoryTestimonials[index];
        }
        return null;
    },

    async delete(id) {
        if (isDBConnected()) {
            try {
                await query("DELETE FROM testimonials WHERE id = ?", [id]);
                return true;
            } catch (err) {
                console.error("TestimonialModel.delete DB error:", err.message);
            }
        }
        const index = memoryTestimonials.findIndex((t) => String(t.id) === String(id));
        if (index !== -1) {
            memoryTestimonials.splice(index, 1);
            return true;
        }
        return false;
    },
};
