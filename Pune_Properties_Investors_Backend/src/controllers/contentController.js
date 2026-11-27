import { ContentModel } from "../models/ContentModel.js";
import { renderSuccess } from "../views/responseView.js";

export const getHomepage = async (req, res, next) => {
    try {
        const data = await ContentModel.getHomepage();
        return renderSuccess(res, data, "Homepage content retrieved successfully");
    } catch (err) {
        next(err);
    }
};

export const saveHomepageDraft = async (req, res, next) => {
    try {
        const draft = await ContentModel.saveHomepageDraft(req.body);
        return renderSuccess(res, draft, "Homepage draft saved successfully");
    } catch (err) {
        next(err);
    }
};

export const publishHomepage = async (req, res, next) => {
    try {
        const published = await ContentModel.publishHomepage(req.body);
        return renderSuccess(res, published, "Homepage published successfully");
    } catch (err) {
        next(err);
    }
};

export const getFestivalPopup = async (req, res, next) => {
    try {
        const data = await ContentModel.getFestivalPopup();
        return renderSuccess(res, data, "Festival popup retrieved successfully");
    } catch (err) {
        next(err);
    }
};

export const updateFestivalPopup = async (req, res, next) => {
    try {
        const data = await ContentModel.updateFestivalPopup(req.body);
        return renderSuccess(res, data, "Festival popup updated successfully");
    } catch (err) {
        next(err);
    }
};

export const getShorts = async (req, res, next) => {
    try {
        const data = await ContentModel.getShorts();
        return renderSuccess(res, data, "Shorts retrieved successfully");
    } catch (err) {
        next(err);
    }
};

export const updateShorts = async (req, res, next) => {
    try {
        const data = await ContentModel.updateShorts(req.body);
        return renderSuccess(res, data, "Shorts updated successfully");
    } catch (err) {
        next(err);
    }
};

export const getTestimonials = async (req, res, next) => {
    try {
        const data = await ContentModel.getTestimonials();
        return renderSuccess(res, data, "Testimonials retrieved successfully");
    } catch (err) {
        next(err);
    }
};

export const updateTestimonials = async (req, res, next) => {
    try {
        const data = await ContentModel.updateTestimonials(req.body);
        return renderSuccess(res, data, "Testimonials updated successfully");
    } catch (err) {
        next(err);
    }
};

export const getAdvertisements = async (req, res, next) => {
    try {
        const data = await ContentModel.getAdvertisements();
        return renderSuccess(res, data, "Advertisements retrieved successfully");
    } catch (err) {
        next(err);
    }
};

export const updateAdvertisements = async (req, res, next) => {
    try {
        const data = await ContentModel.updateAdvertisements(req.body);
        return renderSuccess(res, data, "Advertisements updated successfully");
    } catch (err) {
        next(err);
    }
};

export const getPublicContent = async (req, res, next) => {
    try {
        const data = await ContentModel.getPublicContent();
        return renderSuccess(res, data, "Public CMS content retrieved successfully");
    } catch (err) {
        next(err);
    }
};

export const publishSection = async (req, res, next) => {
    try {
        const { sectionKey } = req.params;
        const data = await ContentModel.publishSection(sectionKey);
        return renderSuccess(res, data, `Section ${sectionKey} published successfully`);
    } catch (err) {
        next(err);
    }
};

export const retrieveSection = async (req, res, next) => {
    try {
        const { sectionKey } = req.params;
        const { mode } = req.body || {};
        const data = await ContentModel.retrieveSection(sectionKey, mode);
        return renderSuccess(res, data, `Section ${sectionKey} retrieved successfully`);
    } catch (err) {
        next(err);
    }
};

export const revertHomepage = async (req, res, next) => {
    try {
        const { mode } = req.body || {};
        const data = await ContentModel.revertHomepage(mode);
        return renderSuccess(res, data, "Homepage reverted successfully");
    } catch (err) {
        next(err);
    }
};
