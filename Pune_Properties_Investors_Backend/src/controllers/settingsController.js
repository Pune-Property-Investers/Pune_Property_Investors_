import { SettingsModel } from "../models/SettingsModel.js";
import { renderSuccess, renderError } from "../views/responseView.js";

export const getSettings = async (req, res, next) => {
    try {
        const settings = await SettingsModel.getAll();
        return renderSuccess(res, settings, "Settings retrieved successfully");
    } catch (error) {
        next(error);
    }
};

export const getSection = async (req, res, next) => {
    try {
        const { section } = req.params;
        const data = await SettingsModel.getSection(section);
        if (!data) {
            return renderError(res, `Settings section '${section}' not found`, 404);
        }
        return renderSuccess(res, data, `${section} settings retrieved successfully`);
    } catch (error) {
        next(error);
    }
};

export const updateSection = async (req, res, next) => {
    try {
        const { section } = req.params;
        const payload = req.body;
        if (!payload || typeof payload !== "object") {
            return renderError(res, "Invalid settings payload", 400);
        }
        const updated = await SettingsModel.updateSection(section, payload);
        return renderSuccess(res, updated, `${section} settings updated successfully`);
    } catch (error) {
        next(error);
    }
};

export const updatePageSeo = async (req, res, next) => {
    try {
        const { pageKey } = req.params;
        const pageData = req.body;
        if (!pageData || typeof pageData !== "object") {
            return renderError(res, "Invalid page SEO payload", 400);
        }
        const updated = await SettingsModel.updatePageSeo(pageKey, pageData);
        return renderSuccess(res, updated, `Page SEO for '${pageKey}' updated successfully`);
    } catch (error) {
        next(error);
    }
};
