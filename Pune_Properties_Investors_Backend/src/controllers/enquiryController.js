import { EnquiryService } from "../services/enquiryService.js";
import { validateEnquiryDTO } from "../dtos/EnquiryDTO.js";
import { renderSuccess } from "../views/responseView.js";

/**
 * Enquiry Controller
 * Lean HTTP Controller: validates input and executes domain actions via EnquiryService.
 */

export const getAllEnquiries = async (req, res, next) => {
    try {
        const enquiries = await EnquiryService.getAllEnquiries();
        return renderSuccess(res, enquiries, "Enquiries retrieved successfully", 200, {
            total: enquiries.length
        });
    } catch (error) {
        next(error);
    }
};

export const getEnquiryById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const enquiry = await EnquiryService.getEnquiryById(id);
        return renderSuccess(res, enquiry, "Enquiry retrieved successfully");
    } catch (error) {
        next(error);
    }
};

export const createEnquiry = async (req, res, next) => {
    try {
        const enquiryDTO = validateEnquiryDTO(req.body);
        const savedEnquiry = await EnquiryService.submitEnquiry(enquiryDTO);
        return renderSuccess(res, savedEnquiry, "Enquiry submitted successfully. Our team will contact you shortly.", 201);
    } catch (error) {
        next(error);
    }
};

export const updateEnquiry = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updated = await EnquiryService.updateEnquiry(id, req.body);
        return renderSuccess(res, updated, "Lead updated successfully");
    } catch (error) {
        next(error);
    }
};

export const updateEnquiryStatus = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updated = await EnquiryService.updateStatus(id, req.body);
        return renderSuccess(res, updated, "Enquiry status updated successfully");
    } catch (error) {
        next(error);
    }
};

export const deleteEnquiry = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await EnquiryService.deleteEnquiry(id);
        return renderSuccess(res, result, "Lead deleted successfully");
    } catch (error) {
        next(error);
    }
};
