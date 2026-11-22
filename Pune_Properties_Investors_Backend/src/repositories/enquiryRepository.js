import { EnquiryModel } from "../models/EnquiryModel.js";

/**
 * Enquiry Repository (Data Access Layer)
 * Manages persistence and low-level data queries for customer leads and enquiries.
 */

export const EnquiryRepository = {
    async findAll() {
        return await EnquiryModel.findAll();
    },

    async findById(id) {
        return await EnquiryModel.findById(id);
    },

    async create(enquiryData) {
        return await EnquiryModel.create(enquiryData);
    },

    async update(id, updateData) {
        return await EnquiryModel.update(id, updateData);
    },

    async updateStatus(id, status) {
        return await EnquiryModel.updateStatus(id, status);
    },

    async delete(id) {
        return await EnquiryModel.delete(id);
    }
};
