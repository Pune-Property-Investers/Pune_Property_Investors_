/**
 * Enquiry Model (MVC Model Layer)
 * Manages customer inquiries, site visit requests, and contact leads.
 */

let enquiries = [];

export const EnquiryModel = {
    async findAll() {
        return [...enquiries];
    },

    async create(enquiryData) {
        const newEnquiry = {
            id: String(Date.now()),
            name: enquiryData.name,
            phone: enquiryData.phone,
            email: enquiryData.email || "",
            propertyId: enquiryData.propertyId || null,
            propertyTitle: enquiryData.propertyTitle || "",
            message: enquiryData.message || "",
            date: enquiryData.date || null,
            time: enquiryData.time || null,
            status: "New",
            createdAt: new Date().toISOString()
        };
        enquiries.unshift(newEnquiry);
        return newEnquiry;
    },

    async updateStatus(id, status) {
        const enquiry = enquiries.find(e => e.id === id);
        if (!enquiry) return null;
        enquiry.status = status;
        enquiry.updatedAt = new Date().toISOString();
        return enquiry;
    }
};
