/**
 * Enquiry Data Transfer Objects (DTO)
 * Validates, sanitizes, and normalizes inputs for customer enquiries and site visits.
 */

const PHONE_REGEX = /^[6-9]\d{9}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const VALID_STATUSES = ["New", "Contacted", "Follow-Up", "Closed"];

export const validateEnquiryDTO = (data) => {
    const errors = [];

    if (!data.name || typeof data.name !== "string" || data.name.trim().length < 2) {
        errors.push("Full name must be at least 2 characters");
    }

    const cleanPhone = String(data.phone || "").replace(/\D/g, "").slice(-10);
    if (!PHONE_REGEX.test(cleanPhone)) {
        errors.push("A valid 10-digit Indian phone number starting with 6-9 is required");
    }

    if (data.email && !EMAIL_REGEX.test(String(data.email).trim())) {
        errors.push("Please provide a valid email address");
    }

    if (errors.length > 0) {
        const error = new Error("Validation Error");
        error.statusCode = 400;
        error.errors = errors;
        throw error;
    }

    return {
        name: data.name.trim(),
        phone: cleanPhone,
        email: data.email ? String(data.email).trim().toLowerCase() : "",
        propertyId: data.propertyId ? String(data.propertyId).trim() : null,
        propertyTitle: data.propertyTitle ? String(data.propertyTitle).trim() : "",
        message: data.message ? String(data.message).trim().slice(0, 1000) : "",
        date: data.date ? String(data.date).trim() : null,
        time: data.time ? String(data.time).trim() : null,
        leadType: data.leadType || (data.date ? "Site Visit" : "General Enquiry")
    };
};

export const validateEnquiryStatusDTO = (data) => {
    if (!data.status || !VALID_STATUSES.includes(data.status)) {
        const error = new Error(`Invalid status. Allowed values: ${VALID_STATUSES.join(", ")}`);
        error.statusCode = 400;
        throw error;
    }

    return {
        status: data.status
    };
};
