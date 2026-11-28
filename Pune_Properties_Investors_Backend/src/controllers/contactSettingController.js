import { ContactSettingModel } from "../models/ContactSettingModel.js";

export const getContactSettings = async (req, res) => {
    try {
        const data = await ContactSettingModel.getSettings();
        res.status(200).json({
            success: true,
            message: "Contact settings retrieved successfully",
            data,
        });
    } catch (err) {
        console.error("getContactSettings error:", err);
        res.status(500).json({
            success: false,
            message: "Failed to fetch contact settings",
            error: err.message,
        });
    }
};

export const updateContactSettings = async (req, res) => {
    try {
        const updated = await ContactSettingModel.updateSettings(req.body);
        res.status(200).json({
            success: true,
            message: "Contact settings updated successfully",
            data: updated,
        });
    } catch (err) {
        console.error("updateContactSettings error:", err);
        res.status(500).json({
            success: false,
            message: "Failed to update contact settings",
            error: err.message,
        });
    }
};
