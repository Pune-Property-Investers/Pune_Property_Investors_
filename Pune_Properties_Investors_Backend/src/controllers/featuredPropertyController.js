import { FeaturedPropertyModel } from "../models/FeaturedPropertyModel.js";
import { renderSuccess, renderError } from "../views/responseView.js";

export const listFeaturedProperties = async (req, res, next) => {
    try {
        const items = await FeaturedPropertyModel.list(req.query);
        return renderSuccess(res, items, "Featured properties retrieved successfully");
    } catch (err) {
        next(err);
    }
};

export const getFeaturedPropertyById = async (req, res, next) => {
    try {
        const item = await FeaturedPropertyModel.getById(req.params.id);
        if (!item) return renderError(res, "Featured property not found", 404);
        return renderSuccess(res, item, "Featured property retrieved successfully");
    } catch (err) {
        next(err);
    }
};

export const createFeaturedProperty = async (req, res, next) => {
    try {
        const created = await FeaturedPropertyModel.create(req.body);
        return renderSuccess(res, created, "Featured property created successfully", 201);
    } catch (err) {
        next(err);
    }
};

export const updateFeaturedProperty = async (req, res, next) => {
    try {
        const updated = await FeaturedPropertyModel.update(req.params.id, req.body);
        return renderSuccess(res, updated, "Featured property updated successfully");
    } catch (err) {
        next(err);
    }
};

export const deleteFeaturedProperty = async (req, res, next) => {
    try {
        await FeaturedPropertyModel.delete(req.params.id);
        return renderSuccess(res, null, "Featured property deleted successfully");
    } catch (err) {
        next(err);
    }
};
