import { FeaturedProjectModel } from "../models/FeaturedProjectModel.js";
import { renderSuccess, renderError } from "../views/responseView.js";

export const listFeaturedProjects = async (req, res, next) => {
    try {
        const items = await FeaturedProjectModel.list(req.query);
        return renderSuccess(res, items, "Featured projects retrieved successfully");
    } catch (err) {
        next(err);
    }
};

export const getFeaturedProjectById = async (req, res, next) => {
    try {
        const item = await FeaturedProjectModel.getById(req.params.id);
        if (!item) return renderError(res, "Featured project not found", 404);
        return renderSuccess(res, item, "Featured project retrieved successfully");
    } catch (err) {
        next(err);
    }
};

export const createFeaturedProject = async (req, res, next) => {
    try {
        const created = await FeaturedProjectModel.create(req.body);
        return renderSuccess(res, created, "Featured project created successfully", 201);
    } catch (err) {
        next(err);
    }
};

export const updateFeaturedProject = async (req, res, next) => {
    try {
        const updated = await FeaturedProjectModel.update(req.params.id, req.body);
        return renderSuccess(res, updated, "Featured project updated successfully");
    } catch (err) {
        next(err);
    }
};

export const deleteFeaturedProject = async (req, res, next) => {
    try {
        await FeaturedProjectModel.delete(req.params.id);
        return renderSuccess(res, null, "Featured project deleted successfully");
    } catch (err) {
        next(err);
    }
};
