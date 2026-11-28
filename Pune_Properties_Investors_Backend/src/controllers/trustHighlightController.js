import { TrustHighlightModel } from "../models/TrustHighlightModel.js";
import { renderSuccess, renderError } from "../views/responseView.js";

export const listTrustHighlights = async (req, res, next) => {
    try {
        const items = await TrustHighlightModel.list(req.query);
        return renderSuccess(res, items, "Trust highlights retrieved successfully");
    } catch (err) {
        next(err);
    }
};

export const getTrustHighlightById = async (req, res, next) => {
    try {
        const item = await TrustHighlightModel.getById(req.params.id);
        if (!item) return renderError(res, "Trust highlight not found", 404);
        return renderSuccess(res, item, "Trust highlight retrieved successfully");
    } catch (err) {
        next(err);
    }
};

export const createTrustHighlight = async (req, res, next) => {
    try {
        const created = await TrustHighlightModel.create(req.body);
        return renderSuccess(res, created, "Trust highlight created successfully", 201);
    } catch (err) {
        next(err);
    }
};

export const updateTrustHighlight = async (req, res, next) => {
    try {
        const updated = await TrustHighlightModel.update(req.params.id, req.body);
        if (!updated) return renderError(res, "Trust highlight not found", 404);
        return renderSuccess(res, updated, "Trust highlight updated successfully");
    } catch (err) {
        next(err);
    }
};

export const deleteTrustHighlight = async (req, res, next) => {
    try {
        await TrustHighlightModel.delete(req.params.id);
        return renderSuccess(res, null, "Trust highlight deleted successfully");
    } catch (err) {
        next(err);
    }
};
