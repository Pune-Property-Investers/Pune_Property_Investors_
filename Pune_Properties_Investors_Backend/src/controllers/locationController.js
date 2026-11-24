import { LocationModel } from "../models/LocationModel.js";
import { renderSuccess, renderError } from "../views/responseView.js";

export const listLocations = async (req, res, next) => {
    try {
        const locations = await LocationModel.list();
        return renderSuccess(res, locations, "Locations retrieved successfully");
    } catch (err) {
        next(err);
    }
};

export const getLocationById = async (req, res, next) => {
    try {
        const loc = await LocationModel.getById(req.params.id);
        if (!loc) return renderError(res, "Location not found", 404);
        return renderSuccess(res, loc, "Location retrieved successfully");
    } catch (err) {
        next(err);
    }
};

export const createLocation = async (req, res, next) => {
    try {
        const created = await LocationModel.create(req.body);
        return renderSuccess(res, created, "Location created successfully", 201);
    } catch (err) {
        next(err);
    }
};

export const updateLocation = async (req, res, next) => {
    try {
        const updated = await LocationModel.update(req.params.id, req.body);
        return renderSuccess(res, updated, "Location updated successfully");
    } catch (err) {
        next(err);
    }
};

export const deleteLocation = async (req, res, next) => {
    try {
        await LocationModel.delete(req.params.id);
        return renderSuccess(res, null, "Location deleted successfully");
    } catch (err) {
        next(err);
    }
};
