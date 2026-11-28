import { AdvertisementModel } from "../models/AdvertisementModel.js";
import { renderSuccess, renderError } from "../views/responseView.js";

export const listAdvertisements = async (req, res, next) => {
    try {
        const ads = await AdvertisementModel.list(req.query);
        return renderSuccess(res, ads, "Advertisements retrieved successfully");
    } catch (err) {
        next(err);
    }
};

export const getAdvertisementById = async (req, res, next) => {
    try {
        const ad = await AdvertisementModel.getById(req.params.id);
        if (!ad) return renderError(res, "Advertisement not found", 404);
        return renderSuccess(res, ad, "Advertisement retrieved successfully");
    } catch (err) {
        next(err);
    }
};

export const createAdvertisement = async (req, res, next) => {
    try {
        const created = await AdvertisementModel.create(req.body);
        return renderSuccess(res, created, "Advertisement created successfully", 201);
    } catch (err) {
        next(err);
    }
};

export const updateAdvertisement = async (req, res, next) => {
    try {
        const updated = await AdvertisementModel.update(req.params.id, req.body);
        if (!updated) return renderError(res, "Advertisement not found", 404);
        return renderSuccess(res, updated, "Advertisement updated successfully");
    } catch (err) {
        next(err);
    }
};

export const deleteAdvertisement = async (req, res, next) => {
    try {
        await AdvertisementModel.delete(req.params.id);
        return renderSuccess(res, null, "Advertisement deleted successfully");
    } catch (err) {
        next(err);
    }
};
