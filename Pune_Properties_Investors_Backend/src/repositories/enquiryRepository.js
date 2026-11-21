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
        const all = await EnquiryModel.findAll();
        return all.find(e => e.id === id) || null;
    },

    async create(enquiryData) {
        return await EnquiryModel.create(enquiryData);
    },

    async updateStatus(id, status) {
        return await EnquiryModel.updateStatus(id, status);
    }
};
