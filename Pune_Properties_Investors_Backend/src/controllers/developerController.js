import { DeveloperModel } from "../models/DeveloperModel.js";
import { renderSuccess, renderError } from "../views/responseView.js";

export const listDevelopers = async (req, res, next) => {
    try {
        const developers = await DeveloperModel.list();
        return renderSuccess(res, developers, "Developers retrieved successfully");
    } catch (err) {
        next(err);
    }
};

export const getDeveloperById = async (req, res, next) => {
    try {
        const dev = await DeveloperModel.getById(req.params.id);
        if (!dev) return renderError(res, "Developer not found", 404);
        return renderSuccess(res, dev, "Developer retrieved successfully");
    } catch (err) {
        next(err);
    }
};

export const createDeveloper = async (req, res, next) => {
    try {
        const created = await DeveloperModel.create(req.body);
        return renderSuccess(res, created, "Developer created successfully", 201);
    } catch (err) {
        next(err);
    }
};

export const updateDeveloper = async (req, res, next) => {
    try {
        const updated = await DeveloperModel.update(req.params.id, req.body);
        return renderSuccess(res, updated, "Developer updated successfully");
    } catch (err) {
        next(err);
    }
};

export const deleteDeveloper = async (req, res, next) => {
    try {
        await DeveloperModel.delete(req.params.id);
        return renderSuccess(res, null, "Developer deleted successfully");
    } catch (err) {
        next(err);
    }
};
