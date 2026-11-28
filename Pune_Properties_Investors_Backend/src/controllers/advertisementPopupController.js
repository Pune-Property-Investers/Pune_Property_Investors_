import { AdvertisementPopupModel } from "../models/AdvertisementPopupModel.js";

export const getAdvertisementPopupSettings = async (req, res) => {
    try {
        const data = await AdvertisementPopupModel.getSettings();
        res.status(200).json({
            success: true,
            message: "Advertisement popup settings retrieved successfully",
            data,
        });
    } catch (err) {
        console.error("getAdvertisementPopupSettings error:", err);
        res.status(500).json({
            success: false,
            message: "Failed to fetch advertisement popup settings",
            error: err.message,
        });
    }
};

export const updateAdvertisementPopupSettings = async (req, res) => {
    try {
        const updated = await AdvertisementPopupModel.updateSettings(req.body);
        res.status(200).json({
            success: true,
            message: "Advertisement popup settings updated successfully",
            data: updated,
        });
    } catch (err) {
        console.error("updateAdvertisementPopupSettings error:", err);
        res.status(500).json({
            success: false,
            message: "Failed to update advertisement popup settings",
            error: err.message,
        });
    }
};
