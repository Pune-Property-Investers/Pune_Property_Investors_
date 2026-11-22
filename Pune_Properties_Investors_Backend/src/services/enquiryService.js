import { EnquiryRepository } from "../repositories/enquiryRepository.js";

/**
 * Enquiry Service (Business Logic Layer)
 * Manages lead ingestion, site visit scheduling, and status lifecycle.
 * Interacts with EnquiryRepository for data persistence.
 */

export const EnquiryService = {
    async getAllEnquiries() {
        return await EnquiryRepository.findAll();
    },

    async getEnquiryById(id) {
        const item = await EnquiryRepository.findById(id);
        if (!item) {
            const error = new Error(`Lead/Enquiry with ID '${id}' not found`);
            error.statusCode = 404;
            throw error;
        }
        return item;
    },

    async submitEnquiry(enquiryDTO) {
        const enrichedLead = {
            ...enquiryDTO,
            priority: enquiryDTO.leadType === "Site Visit" ? "High" : "Standard",
            source: "Website Direct",
            submittedAt: new Date().toISOString()
        };

        const created = await EnquiryRepository.create(enrichedLead);
        console.log(`🔔 New Lead Received [${created?.type || "Lead"}] from ${created?.name} (${created?.phone})`);
        return created;
    },

    async updateEnquiry(id, updateData) {
        const updated = await EnquiryRepository.update(id, updateData);
        if (!updated) {
            const error = new Error(`Lead with ID '${id}' not found`);
            error.statusCode = 404;
            throw error;
        }
        return updated;
    },

    async updateStatus(id, statusDTO) {
        const status = typeof statusDTO === "string" ? statusDTO : statusDTO?.status;
        return await this.updateEnquiry(id, { status });
    },

    async deleteEnquiry(id) {
        const success = await EnquiryRepository.delete(id);
        return { success, id };
    }
};
