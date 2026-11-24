import { query, isDBConnected } from "../config/db.js";

/**
 * Enquiry Model (Data Layer)
 * Manages customer inquiries, site visit requests, and contact leads with MySQL & memory fallback.
 */

let memoryEnquiries = [];

function parseFollowUpDate(val) {
    if (!val) return null;
    const str = String(val).trim();
    if (!str || str.toLowerCase() === "not scheduled") return null;

    // Matches YYYY-MM-DD
    if (/^\d{4}-\d{2}-\d{2}$/.test(str)) return str;

    // Matches DD-MM-YYYY
    const dmy = str.match(/^(\d{2})[-/](\d{2})[-/](\d{4})$/);
    if (dmy) {
        return `${dmy[3]}-${dmy[2]}-${dmy[1]}`;
    }

    return str.slice(0, 10);
}

function formatEnquiry(row) {
    if (!row) return null;
    let followUp = "";
    if (row.follow_up_date) {
        if (typeof row.follow_up_date === "string") {
            followUp = row.follow_up_date.slice(0, 10);
        } else if (row.follow_up_date instanceof Date) {
            const y = row.follow_up_date.getFullYear();
            const m = String(row.follow_up_date.getMonth() + 1).padStart(2, "0");
            const d = String(row.follow_up_date.getDate()).padStart(2, "0");
            followUp = `${y}-${m}-${d}`;
        } else {
            followUp = String(row.follow_up_date).slice(0, 10);
        }
    } else if (row.followUpDate) {
        followUp = String(row.followUpDate).slice(0, 10);
    }

    return {
        id: String(row.id),
        name: row.name || "",
        phone: row.phone || "",
        email: row.email || "",
        propertyId: row.property_id || row.propertyId || null,
        propertyTitle: row.property_title || row.propertyTitle || "General Advisory",
        locality: row.locality || "Pune",
        budget: row.budget || "",
        message: row.message || "",
        type: row.type || "contact",
        date: row.date || null,
        time: row.time || null,
        status: row.status || "New",
        followUpDate: followUp,
        notes: row.notes || "",
        createdAt: row.created_at || row.createdAt || new Date().toISOString()
    };
}

export const EnquiryModel = {
    async findAll() {
        if (isDBConnected()) {
            const rows = await query("SELECT * FROM enquiries ORDER BY created_at DESC");
            if (rows && rows.length > 0) {
                return rows.map(formatEnquiry);
            }
        }
        return [...memoryEnquiries];
    },

    async findById(id) {
        const idStr = String(id);
        if (isDBConnected()) {
            const rows = await query("SELECT * FROM enquiries WHERE id = ? LIMIT 1", [idStr]);
            return rows && rows.length > 0 ? formatEnquiry(rows[0]) : null;
        }
        const found = memoryEnquiries.find(e => String(e.id) === idStr);
        return found ? { ...found } : null;
    },

    async create(enquiryData) {
        const id = String(enquiryData.id || Date.now());
        const now = new Date().toISOString();
        const followUp = parseFollowUpDate(enquiryData.followUpDate || enquiryData.follow_up_date);

        if (isDBConnected()) {
            await query(
                `INSERT INTO enquiries (
                    id, name, phone, email, property_id, property_title,
                    locality, budget, message, type, date, time, status, follow_up_date, notes
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    id,
                    enquiryData.name,
                    enquiryData.phone,
                    enquiryData.email || "",
                    enquiryData.propertyId || null,
                    enquiryData.propertyTitle || "",
                    enquiryData.locality || "",
                    enquiryData.budget || "",
                    enquiryData.message || "",
                    enquiryData.type || "contact",
                    enquiryData.date || null,
                    enquiryData.time || null,
                    enquiryData.status || "New",
                    followUp,
                    enquiryData.notes || ""
                ]
            );

            const rows = await query("SELECT * FROM enquiries WHERE id = ? LIMIT 1", [id]);
            return rows && rows.length > 0 ? formatEnquiry(rows[0]) : null;
        }

        const newEnquiry = {
            id,
            name: enquiryData.name,
            phone: enquiryData.phone,
            email: enquiryData.email || "",
            propertyId: enquiryData.propertyId || null,
            propertyTitle: enquiryData.propertyTitle || "",
            locality: enquiryData.locality || "",
            budget: enquiryData.budget || "",
            message: enquiryData.message || "",
            type: enquiryData.type || "contact",
            date: enquiryData.date || null,
            time: enquiryData.time || null,
            status: enquiryData.status || "New",
            followUpDate: followUp || "",
            notes: enquiryData.notes || "",
            createdAt: now
        };
        memoryEnquiries.unshift(newEnquiry);
        return newEnquiry;
    },

    async update(id, data) {
        const idStr = String(id);

        if (isDBConnected()) {
            // Check if record exists
            const existingRows = await query("SELECT * FROM enquiries WHERE id = ? LIMIT 1", [idStr]);

            if (!existingRows || existingRows.length === 0) {
                // If not in DB yet (e.g. mock lead edited by admin), insert gracefully
                const created = await this.create({
                    id: idStr,
                    name: data.name || "Client Lead",
                    phone: data.phone || "0000000000",
                    email: data.email || "",
                    propertyTitle: data.propertyTitle || "",
                    locality: data.locality || "",
                    status: data.status || "New",
                    followUpDate: data.followUpDate,
                    notes: data.notes || ""
                });
                return created;
            }

            const updates = [];
            const values = [];

            if (data.status !== undefined) {
                updates.push("status = ?");
                values.push(data.status);
            }
            if (data.notes !== undefined) {
                updates.push("notes = ?");
                values.push(data.notes);
            }
            if (data.followUpDate !== undefined || data.follow_up_date !== undefined) {
                updates.push("follow_up_date = ?");
                values.push(parseFollowUpDate(data.followUpDate ?? data.follow_up_date));
            }
            if (data.name !== undefined) {
                updates.push("name = ?");
                values.push(data.name);
            }
            if (data.phone !== undefined) {
                updates.push("phone = ?");
                values.push(data.phone);
            }
            if (data.email !== undefined) {
                updates.push("email = ?");
                values.push(data.email);
            }
            if (data.locality !== undefined) {
                updates.push("locality = ?");
                values.push(data.locality);
            }
            if (data.budget !== undefined) {
                updates.push("budget = ?");
                values.push(data.budget);
            }

            if (updates.length > 0) {
                values.push(idStr);
                await query(`UPDATE enquiries SET ${updates.join(", ")} WHERE id = ?`, values);
            }

            const rows = await query("SELECT * FROM enquiries WHERE id = ? LIMIT 1", [idStr]);
            return rows && rows.length > 0 ? formatEnquiry(rows[0]) : null;
        }

        // Memory Mode
        let enquiry = memoryEnquiries.find(e => String(e.id) === idStr);
        if (!enquiry) {
            enquiry = {
                id: idStr,
                name: data.name || "Client Lead",
                phone: data.phone || "",
                status: data.status || "New",
                followUpDate: data.followUpDate || "",
                notes: data.notes || "",
                createdAt: new Date().toISOString()
            };
            memoryEnquiries.unshift(enquiry);
            return enquiry;
        }

        Object.assign(enquiry, data, {
            id: idStr,
            updatedAt: new Date().toISOString()
        });
        return enquiry;
    },

    async updateStatus(id, status) {
        return await this.update(id, { status });
    },

    async delete(id) {
        const idStr = String(id);
        if (isDBConnected()) {
            await query("DELETE FROM enquiries WHERE id = ?", [idStr]);
            return true;
        }

        const idx = memoryEnquiries.findIndex(e => String(e.id) === idStr);
        if (idx !== -1) {
            memoryEnquiries.splice(idx, 1);
            return true;
        }
        return false;
    }
};
