import { query, isDBConnected } from "../config/db.js";

const fallbackContactSettings = {
    id: 1,
    eyebrow: "GET IN TOUCH",
    title: "Connect With Our Property Advisors",
    cardEyebrow: "PUNE PROPERTY INVESTORS",
    cardTitle: "Start your Pune property journey today",
    cardSubtitle: "Complete the form and get a personalized list of verified properties within 24 hours.",
    officeLocation: "Gera Imperium Alpha, Kharadi",
    phoneNumber: "+91 73981 74444",
    whatsappNumber: "917398174444",
    backgroundImage: "/images/luxury-villa-bg.jpg",
    isActive: true,
};

let memoryContact = { ...fallbackContactSettings };

function formatContact(row) {
    if (!row) return null;
    return {
        id: row.id,
        eyebrow: row.eyebrow || "GET IN TOUCH",
        title: row.title || "Connect With Our Property Advisors",
        cardEyebrow: row.card_eyebrow || "PUNE PROPERTY INVESTORS",
        cardTitle: row.card_title || "Start your Pune property journey today",
        cardSubtitle: row.card_subtitle || "Complete the form and get a personalized list of verified properties within 24 hours.",
        officeLocation: row.office_location || "Gera Imperium Alpha, Kharadi",
        phoneNumber: row.phone_number || "+91 73981 74444",
        whatsappNumber: row.whatsapp_number || "917398174444",
        backgroundImage: row.background_image || "/images/luxury-villa-bg.jpg",
        isActive: Boolean(row.is_active ?? true),
        createdAt: row.created_at,
        updatedAt: row.updated_at,
    };
}

export class ContactSettingModel {
    static async getSettings() {
        if (!isDBConnected()) {
            return { ...memoryContact };
        }
        try {
            const rows = await query("SELECT * FROM contact_settings WHERE is_active = 1 ORDER BY id ASC LIMIT 1");
            if (rows.length > 0) {
                return formatContact(rows[0]);
            }
            return { ...memoryContact };
        } catch (err) {
            console.error("ContactSettingModel.getSettings error:", err);
            return { ...memoryContact };
        }
    }

    static async updateSettings(data) {
        if (!isDBConnected()) {
            memoryContact = {
                ...memoryContact,
                ...data,
                updatedAt: new Date().toISOString(),
            };
            return { ...memoryContact };
        }

        try {
            const current = await this.getSettings();
            const eyebrow = data.eyebrow !== undefined ? data.eyebrow : current.eyebrow;
            const title = data.title !== undefined ? data.title : current.title;
            const cardEyebrow = data.cardEyebrow !== undefined ? data.cardEyebrow : current.cardEyebrow;
            const cardTitle = data.cardTitle !== undefined ? data.cardTitle : current.cardTitle;
            const cardSubtitle = data.cardSubtitle !== undefined ? data.cardSubtitle : current.cardSubtitle;
            const officeLocation = data.officeLocation !== undefined ? data.officeLocation : current.officeLocation;
            const phoneNumber = data.phoneNumber !== undefined ? data.phoneNumber : current.phoneNumber;
            const whatsappNumber = data.whatsappNumber !== undefined ? data.whatsappNumber : current.whatsappNumber;
            const backgroundImage = data.backgroundImage !== undefined ? data.backgroundImage : current.backgroundImage;
            const isActive = data.isActive !== undefined ? (data.isActive ? 1 : 0) : (current.isActive ? 1 : 0);

            const [existing] = await query("SELECT id FROM contact_settings LIMIT 1");
            if (existing) {
                await query(
                    `UPDATE contact_settings
                     SET eyebrow = ?, title = ?, card_eyebrow = ?, card_title = ?, card_subtitle = ?,
                         office_location = ?, phone_number = ?, whatsapp_number = ?, background_image = ?, is_active = ?
                     WHERE id = ?`,
                    [
                        eyebrow,
                        title,
                        cardEyebrow,
                        cardTitle,
                        cardSubtitle,
                        officeLocation,
                        phoneNumber,
                        whatsappNumber,
                        backgroundImage,
                        isActive,
                        existing.id,
                    ]
                );
            } else {
                await query(
                    `INSERT INTO contact_settings (
                        id, eyebrow, title, card_eyebrow, card_title, card_subtitle,
                        office_location, phone_number, whatsapp_number, background_image, is_active
                    ) VALUES (1, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                    [
                        eyebrow,
                        title,
                        cardEyebrow,
                        cardTitle,
                        cardSubtitle,
                        officeLocation,
                        phoneNumber,
                        whatsappNumber,
                        backgroundImage,
                        isActive,
                    ]
                );
            }

            return await this.getSettings();
        } catch (err) {
            console.error("ContactSettingModel.updateSettings error:", err);
            throw err;
        }
    }
}
