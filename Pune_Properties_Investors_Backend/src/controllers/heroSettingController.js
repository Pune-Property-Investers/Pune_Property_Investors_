import { HeroSettingModel } from "../models/HeroSettingModel.js";

export const getHeroSettings = async (req, res) => {
    try {
        const full = req.query.full === "true" || req.query.full === "1";
        if (full) {
            const data = await HeroSettingModel.getFullHero();
            return res.status(200).json({
                success: true,
                message: "Full hero settings retrieved successfully",
                data,
            });
        }
        const data = await HeroSettingModel.getSettings();
        res.status(200).json({
            success: true,
            message: "Hero settings retrieved successfully",
            data,
        });
    } catch (err) {
        console.error("getHeroSettings error:", err);
        res.status(500).json({
            success: false,
            message: "Failed to fetch hero settings",
            error: err.message,
        });
    }
};

export const updateHeroSettings = async (req, res) => {
    try {
        const updated = await HeroSettingModel.updateSettings(req.body);
        res.status(200).json({
            success: true,
            message: "Hero settings updated successfully",
            data: updated,
        });
    } catch (err) {
        console.error("updateHeroSettings error:", err);
        res.status(500).json({
            success: false,
            message: "Failed to update hero settings",
            error: err.message,
        });
    }
};

export const getHeroBadges = async (req, res) => {
    try {
        const filters = {
            isActive: req.query.isActive !== undefined ? req.query.isActive === "true" || req.query.isActive === "1" : undefined,
            all: req.query.all === "true" || req.query.all === "1",
        };
        const badges = await HeroSettingModel.listBadges(filters);
        res.status(200).json({
            success: true,
            count: badges.length,
            message: "Hero trust badges retrieved successfully",
            data: badges,
        });
    } catch (err) {
        console.error("getHeroBadges error:", err);
        res.status(500).json({
            success: false,
            message: "Failed to fetch hero badges",
            error: err.message,
        });
    }
};

export const createHeroBadge = async (req, res) => {
    try {
        const created = await HeroSettingModel.createBadge(req.body);
        res.status(201).json({
            success: true,
            message: "Hero badge created successfully",
            data: created,
        });
    } catch (err) {
        console.error("createHeroBadge error:", err);
        res.status(500).json({
            success: false,
            message: "Failed to create hero badge",
            error: err.message,
        });
    }
};

export const updateHeroBadge = async (req, res) => {
    try {
        const updated = await HeroSettingModel.updateBadge(req.params.id, req.body);
        if (!updated) {
            return res.status(404).json({
                success: false,
                message: "Hero badge not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Hero badge updated successfully",
            data: updated,
        });
    } catch (err) {
        console.error("updateHeroBadge error:", err);
        res.status(500).json({
            success: false,
            message: "Failed to update hero badge",
            error: err.message,
        });
    }
};

export const deleteHeroBadge = async (req, res) => {
    try {
        const success = await HeroSettingModel.deleteBadge(req.params.id);
        if (!success) {
            return res.status(404).json({
                success: false,
                message: "Hero badge not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Hero badge deleted successfully",
        });
    } catch (err) {
        console.error("deleteHeroBadge error:", err);
        res.status(500).json({
            success: false,
            message: "Failed to delete hero badge",
            error: err.message,
        });
    }
};
