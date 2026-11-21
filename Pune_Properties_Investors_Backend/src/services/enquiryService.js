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

    async submitEnquiry(enquiryDTO) {
        // Business logic: Add lead priority and tags
        const enrichedLead = {
            ...enquiryDTO,
            priority: enquiryDTO.leadType === "Site Visit" ? "High" : "Standard",
            source: "Website Direct",
            submittedAt: new Date().toISOString()
        };

        const created = await EnquiryRepository.create(enrichedLead);

        // Webhook hook point for WhatsApp / Email notification
        console.log(`🔔 New Lead Received [${created.leadType}] from ${created.name} (${created.phone})`);

        return created;
    },

    async updateStatus(id, statusDTO) {
        const updated = await EnquiryRepository.updateStatus(id, statusDTO.status);
        if (!updated) {
            const error = new Error(`Enquiry with ID '${id}' not found`);
            error.statusCode = 404;
            throw error;
        }
        return updated;
    }
};
