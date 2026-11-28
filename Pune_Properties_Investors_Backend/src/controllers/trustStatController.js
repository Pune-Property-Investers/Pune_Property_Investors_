import { TrustStatModel } from "../models/TrustStatModel.js";
import { renderSuccess, renderError } from "../views/responseView.js";

export const listTrustStats = async (req, res, next) => {
    try {
        const stats = await TrustStatModel.list(req.query);
        return renderSuccess(res, stats, "Trust stats retrieved successfully");
    } catch (err) {
        next(err);
    }
};

export const getTrustStatById = async (req, res, next) => {
    try {
        const stat = await TrustStatModel.getById(req.params.id);
        if (!stat) return renderError(res, "Trust stat not found", 404);
        return renderSuccess(res, stat, "Trust stat retrieved successfully");
    } catch (err) {
        next(err);
    }
};

export const createTrustStat = async (req, res, next) => {
    try {
        const created = await TrustStatModel.create(req.body);
        return renderSuccess(res, created, "Trust stat created successfully", 201);
    } catch (err) {
        next(err);
    }
};

export const updateTrustStat = async (req, res, next) => {
    try {
        const updated = await TrustStatModel.update(req.params.id, req.body);
        if (!updated) return renderError(res, "Trust stat not found", 404);
        return renderSuccess(res, updated, "Trust stat updated successfully");
    } catch (err) {
        next(err);
    }
};

export const deleteTrustStat = async (req, res, next) => {
    try {
        await TrustStatModel.delete(req.params.id);
        return renderSuccess(res, null, "Trust stat deleted successfully");
    } catch (err) {
        next(err);
    }
};
