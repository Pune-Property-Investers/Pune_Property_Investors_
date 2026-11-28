import { UpcomingProjectModel } from "../models/UpcomingProjectModel.js";
import { renderSuccess, renderError } from "../views/responseView.js";

export const listUpcomingProjects = async (req, res, next) => {
    try {
        const items = await UpcomingProjectModel.getAll(req.query);
        return renderSuccess(res, items, "Upcoming projects retrieved successfully");
    } catch (err) {
        next(err);
    }
};

export const getFeaturedUpcomingProject = async (req, res, next) => {
    try {
        const item = await UpcomingProjectModel.getFeatured();
        if (!item) return renderError(res, "Featured upcoming project not found", 404);
        return renderSuccess(res, item, "Featured upcoming project retrieved successfully");
    } catch (err) {
        next(err);
    }
};

export const getUpcomingProjectById = async (req, res, next) => {
    try {
        const { id } = req.params;
        let item = null;
        if (/^\d+$/.test(id)) {
            item = await UpcomingProjectModel.getById(id);
        } else {
            item = await UpcomingProjectModel.getBySlug(id);
        }
        if (!item) return renderError(res, "Upcoming project not found", 404);
        return renderSuccess(res, item, "Upcoming project retrieved successfully");
    } catch (err) {
        next(err);
    }
};

export const createUpcomingProject = async (req, res, next) => {
    try {
        const created = await UpcomingProjectModel.create(req.body);
        return renderSuccess(res, created, "Upcoming project created successfully", 201);
    } catch (err) {
        next(err);
    }
};

export const updateUpcomingProject = async (req, res, next) => {
    try {
        const updated = await UpcomingProjectModel.update(req.params.id, req.body);
        if (!updated) return renderError(res, "Upcoming project not found", 404);
        return renderSuccess(res, updated, "Upcoming project updated successfully");
    } catch (err) {
        next(err);
    }
};

export const deleteUpcomingProject = async (req, res, next) => {
    try {
        await UpcomingProjectModel.delete(req.params.id);
        return renderSuccess(res, null, "Upcoming project deleted successfully");
    } catch (err) {
        next(err);
    }
};
