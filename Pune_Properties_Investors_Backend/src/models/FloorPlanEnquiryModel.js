import { query, isDBConnected } from "../config/db.js";
import { EnquiryModel } from "./EnquiryModel.js";

let memoryFloorPlanEnquiries = [];

export const FloorPlanEnquiryModel = {
    async create(data) {
        const id = String(Date.now());
        const now = new Date().toISOString();

        const record = {
            id,
            property_id: data.propertyId || data.property_id || null,
            property_title: data.propertyTitle || data.property_title || "",
            plan_id: data.planId || data.plan_id || null,
            plan_name: data.planName || data.plan_name || "",
            bhk: data.bhk || "",
            carpet_area: data.carpetArea || data.carpet_area || "",
            price: data.price || "",
            client_name: data.name || data.client_name || "",
            client_phone: data.phone || data.client_phone || "",
            client_email: data.email || data.client_email || "",
            message: data.message || "",
            channel: data.channel || "WhatsApp",
            status: "New",
            created_at: now
        };

        if (isDBConnected()) {
            await query(
                `INSERT INTO floor_plan_enquiries (
                    id, property_id, property_title, plan_id, plan_name,
                    bhk, carpet_area, price, client_name, client_phone,
                    client_email, message, channel, status
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    record.id,
                    record.property_id,
                    record.property_title,
                    record.plan_id,
                    record.plan_name,
                    record.bhk,
                    record.carpet_area,
                    record.price,
                    record.client_name,
                    record.client_phone,
                    record.client_email,
                    record.message,
                    record.channel,
                    record.status
                ]
            );

            // Also mirror in central enquiries table for CRM visibility
            await EnquiryModel.create({
                name: record.client_name,
                phone: record.client_phone,
                email: record.client_email,
                propertyId: record.property_id,
                propertyTitle: record.property_title,
                budget: record.price,
                type: "whatsapp",
                status: "New",
                notes: `Floor Plan Request: ${record.plan_name} (${record.bhk}, ${record.carpet_area}) via ${record.channel}`,
                message: record.message || `Requested floor plan details for ${record.plan_name}`
            }).catch(err => console.warn("Mirroring to enquiries error:", err.message));

            const rows = await query("SELECT * FROM floor_plan_enquiries WHERE id = ? LIMIT 1", [id]);
            return rows && rows.length > 0 ? rows[0] : record;
        }

        memoryFloorPlanEnquiries.unshift(record);
        return record;
    },

    async findAll() {
        if (isDBConnected()) {
            const rows = await query("SELECT * FROM floor_plan_enquiries ORDER BY created_at DESC");
            return rows || [];
        }
        return [...memoryFloorPlanEnquiries];
    }
};
