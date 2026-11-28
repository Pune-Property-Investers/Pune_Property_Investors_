import { PropertyShortModel } from "../models/PropertyShortModel.js";
import { renderSuccess, renderError } from "../views/responseView.js";

export const listPropertyShorts = async (req, res, next) => {
    try {
        const items = await PropertyShortModel.list(req.query);
        return renderSuccess(res, items, "Property reels retrieved successfully");
    } catch (err) {
        next(err);
    }
};

export const getPropertyShortById = async (req, res, next) => {
    try {
        const item = await PropertyShortModel.getById(req.params.id);
        if (!item) return renderError(res, "Property reel not found", 404);
        return renderSuccess(res, item, "Property reel retrieved successfully");
    } catch (err) {
        next(err);
    }
};

export const createPropertyShort = async (req, res, next) => {
    try {
        const created = await PropertyShortModel.create(req.body);
        return renderSuccess(res, created, "Property reel created successfully", 201);
    } catch (err) {
        next(err);
    }
};

export const updatePropertyShort = async (req, res, next) => {
    try {
        const updated = await PropertyShortModel.update(req.params.id, req.body);
        return renderSuccess(res, updated, "Property reel updated successfully");
    } catch (err) {
        next(err);
    }
};

export const deletePropertyShort = async (req, res, next) => {
    try {
        await PropertyShortModel.delete(req.params.id);
        return renderSuccess(res, null, "Property reel deleted successfully");
    } catch (err) {
        next(err);
    }
};
