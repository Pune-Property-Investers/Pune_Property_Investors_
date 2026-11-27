/**
 * Property Data Transfer Objects (DTO)
 * Validates, sanitizes, and normalizes inputs/outputs for property operations.
 */

const VALID_CATEGORIES = ["residential", "commercial", "plot", "luxury"];
const VALID_STATUSES = ["Under Construction", "Ready to Move", "New Launch"];

function normalizeStatus(status, possession = "") {
    const s = String(status || "").trim();
    if (VALID_STATUSES.includes(s)) return s;
    const p = String(possession || "").toLowerCase();
    if (p.includes("ready") || p.includes("immediate")) return "Ready to Move";
    if (p.includes("new")) return "New Launch";
    return "Under Construction";
}

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

    if (!isUpdate || (data.price !== undefined && data.numericPrice === undefined)) {
        const numeric = Number(data.numericPrice ?? data.price);
        if (data.price !== undefined && (isNaN(numeric) || numeric < 0)) {
            errors.push("A valid price is required");
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

    if (isUpdate) {
        const patch = {};
        if (data.title !== undefined) patch.title = data.title.trim();
        if (data.developer !== undefined || data.projectName !== undefined) {
            patch.developer = (data.developer || data.projectName || "").trim();
        }
        if (data.location !== undefined) patch.location = data.location.trim();
        if (data.locality !== undefined) patch.locality = data.locality.trim();
        if (data.city !== undefined) patch.city = data.city.trim();
        if (data.propertyCategory !== undefined) patch.propertyCategory = String(data.propertyCategory).toLowerCase();
        if (data.propertyType !== undefined) patch.propertyType = data.propertyType;
        if (data.purpose !== undefined) patch.purpose = String(data.purpose).toLowerCase();
        if (data.priceLabel !== undefined || data.priceDisplay !== undefined || data.price !== undefined) {
            patch.price = String(data.priceLabel || data.priceDisplay || data.price);
        }
        if (data.numericPrice !== undefined || data.price !== undefined) {
            const num = Number(data.numericPrice ?? data.price);
            if (!isNaN(num)) patch.numericPrice = num;
        }
        if (data.area !== undefined) patch.area = String(data.area);
        if (data.bhk !== undefined) patch.bhk = Array.isArray(data.bhk) ? data.bhk : [data.bhk];
        if (data.status !== undefined) patch.status = normalizeStatus(data.status, data.possession);
        if (data.possession !== undefined) patch.possession = data.possession;
        if (data.isNewLaunch !== undefined) patch.isNewLaunch = Boolean(data.isNewLaunch);
        if (data.isFeatured !== undefined || data.featured !== undefined) {
            patch.isFeatured = Boolean(data.isFeatured ?? data.featured);
        }
        if (data.isTrending !== undefined) patch.isTrending = Boolean(data.isTrending);
        if (data.verified !== undefined) patch.verified = Boolean(data.verified);
        if (data.badge !== undefined) patch.badge = data.badge;
        if (data.image !== undefined) patch.image = data.image;
        if (data.images !== undefined) patch.images = Array.isArray(data.images) ? data.images : [];
        if (data.videoUrl !== undefined) patch.videoUrl = data.videoUrl;
        if (data.amenities !== undefined) patch.amenities = Array.isArray(data.amenities) ? data.amenities : [];
        if (data.description !== undefined) patch.description = String(data.description).trim();
        return patch;
    }

    const numericPrice = Number(data.numericPrice ?? data.price ?? 0) || 0;
    const priceStr = data.priceLabel || data.priceDisplay || (numericPrice > 0 ? `₹${numericPrice.toLocaleString("en-IN")}` : String(data.price || "On Request"));

    return {
        title: data.title?.trim(),
        slug: data.slug || `${String(data.title || "property").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}-${Date.now()}`,
        developer: (data.developer || data.projectName || "Independent Developer").trim(),
        location: data.location?.trim(),
        locality: data.locality?.trim() || data.location?.split(",")[0]?.trim(),
        city: data.city?.trim() || "Pune",
        propertyCategory: (data.propertyCategory || "residential").toLowerCase(),
        propertyType: data.propertyType || "Apartment",
        purpose: (data.purpose || "buy").toLowerCase(),
        price: priceStr,
        numericPrice,
        area: data.area ? String(data.area) : "",
        bhk: Array.isArray(data.bhk) ? data.bhk : (data.bhk !== undefined ? [data.bhk] : []),
        status: normalizeStatus(data.status, data.possession),
        possession: data.possession || "Under Construction",
        isNewLaunch: Boolean(data.isNewLaunch),
        isFeatured: Boolean(data.isFeatured ?? data.featured),
        isTrending: Boolean(data.isTrending),
        verified: data.verified !== undefined ? Boolean(data.verified) : true,
        badge: data.badge || "",
        image: data.image || "",
        images: Array.isArray(data.images) ? data.images : (data.image ? [data.image] : []),
        videoUrl: data.videoUrl || "",
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
