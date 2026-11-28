import { NewLaunchProjectModel } from "../models/NewLaunchProjectModel.js";
import { renderSuccess, renderError } from "../views/responseView.js";

export const listNewLaunches = async (req, res, next) => {
    try {
        const items = await NewLaunchProjectModel.list(req.query);
        return renderSuccess(res, items, "New launch projects retrieved successfully");
    } catch (err) {
        next(err);
    }
};

export const getNewLaunchById = async (req, res, next) => {
    try {
        const item = await NewLaunchProjectModel.getById(req.params.id);
        if (!item) return renderError(res, "New launch project not found", 404);
        return renderSuccess(res, item, "New launch project retrieved successfully");
    } catch (err) {
        next(err);
    }
};

export const createNewLaunch = async (req, res, next) => {
    try {
        const created = await NewLaunchProjectModel.create(req.body);
        return renderSuccess(res, created, "New launch project created successfully", 201);
    } catch (err) {
        next(err);
    }
};

export const updateNewLaunch = async (req, res, next) => {
    try {
        const updated = await NewLaunchProjectModel.update(req.params.id, req.body);
        return renderSuccess(res, updated, "New launch project updated successfully");
    } catch (err) {
        next(err);
    }
};

export const deleteNewLaunch = async (req, res, next) => {
    try {
        await NewLaunchProjectModel.delete(req.params.id);
        return renderSuccess(res, null, "New launch project deleted successfully");
    } catch (err) {
        next(err);
    }
};
