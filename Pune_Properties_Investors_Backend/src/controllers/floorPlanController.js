import { FloorPlanEnquiryModel } from "../models/FloorPlanEnquiryModel.js";
import { renderSuccess, renderError } from "../views/responseView.js";

export const submitFloorPlanEnquiry = async (req, res, next) => {
    try {
        const { name, phone } = req.body;

        if (!name || !phone) {
            return renderError(res, "Name and Phone number are required.", 400);
        }

        const saved = await FloorPlanEnquiryModel.create(req.body);
        return renderSuccess(res, saved, "Floor plan enquiry submitted successfully", 201);
    } catch (error) {
        next(error);
    }
};

export const getFloorPlanEnquiries = async (req, res, next) => {
    try {
        const list = await FloorPlanEnquiryModel.findAll();
        return renderSuccess(res, list, "Floor plan enquiries retrieved successfully");
    } catch (error) {
        next(error);
    }
};
