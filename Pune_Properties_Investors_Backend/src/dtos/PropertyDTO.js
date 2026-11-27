/**
 * Property Data Transfer Objects (DTO)
 * Validates, sanitizes, and normalizes inputs/outputs for property operations.
 */

const VALID_CATEGORIES = ["residential", "commercial", "plot"];
const VALID_TYPES = [
    "Apartment",
    "Villa",
    "Penthouse",
    "Commercial",
    "Commercial Office",
    "Retail Showroom",
    "Plot",
    "Plots & Land"
];

/**
 * Validates and sanitizes incoming property creation / update payloads
 */
export const validatePropertyDTO = (data, isUpdate = false) => {
    const errors = [];

    if (!isUpdate || data.title !== undefined) {
        if (!data.title || typeof data.title !== "string" || data.title.trim().length < 3) {
            errors.push("Title must be at least 3 characters long");
        }
    }

    if (!isUpdate || data.location !== undefined) {
        if (!data.location || typeof data.location !== "string") {
            errors.push("Location is required");
        }
    }

    if (!isUpdate || data.price !== undefined) {
        const numeric = Number(data.numericPrice || data.price);
        if (isNaN(numeric) || numeric <= 0) {
            errors.push("A valid positive price is required");
        }
    }

    if (data.propertyCategory) {
        const cat = String(data.propertyCategory).toLowerCase();
        if (!VALID_CATEGORIES.includes(cat)) {
            errors.push(`Invalid propertyCategory. Must be one of: ${VALID_CATEGORIES.join(", ")}`);
        }
    }

    if (errors.length > 0) {
        const error = new Error("Validation Error");
        error.statusCode = 400;
        error.errors = errors;
        throw error;
    }

    // Sanitized DTO Output
    return {
        title: data.title?.trim(),
        developer: data.developer?.trim() || "Independent Developer",
        location: data.location?.trim(),
        locality: data.locality?.trim() || data.location?.split(",")[0]?.trim(),
        propertyCategory: (data.propertyCategory || "residential").toLowerCase(),
        propertyType: data.propertyType || "Apartment",
        price: data.priceDisplay || data.price,
        numericPrice: Number(data.numericPrice || data.price),
        area: data.area || "",
        bhk: data.bhk || [],
        status: data.status || "Under Construction",
        possession: data.possession || "Immediate",
        isNewLaunch: Boolean(data.isNewLaunch),
        isFeatured: Boolean(data.isFeatured),
        isTrending: Boolean(data.isTrending),
        verified: data.verified !== undefined ? Boolean(data.verified) : true,
        image: data.image || "",
        images: Array.isArray(data.images) ? data.images : (data.image ? [data.image] : []),
        videoUrl: data.videoUrl || "https://www.youtube.com/watch?v=M1sDYNUJQrY&t=2s",
        amenities: Array.isArray(data.amenities) ? data.amenities : [],
        description: data.description?.trim() || ""
    };
};

/**
 * Validates query parameters for filtering properties
 */
export const validatePropertyFilterDTO = (query) => {
    return {
        search: query.search ? String(query.search).trim() : null,
        locality: query.locality && query.locality !== "all" ? String(query.locality).trim() : null,
        propertyType: query.propertyType && query.propertyType !== "all" ? String(query.propertyType).trim() : null,
        propertyCategory: query.category && query.category !== "all" ? String(query.category).toLowerCase().trim() : null,
        bhk: query.bhk && query.bhk !== "all" ? String(query.bhk).trim() : null,
        minPrice: query.minPrice ? Number(query.minPrice) : null,
        maxPrice: query.maxPrice ? Number(query.maxPrice) : null,
        isNewLaunch: query.isNewLaunch === "true" || query.isNewLaunch === true,
        isFeatured: query.isFeatured === "true" || query.isFeatured === true,
        sortBy: query.sortBy || "recommended"
    };
};
