import { PropertyRepository } from "../repositories/propertyRepository.js";

/**
 * Property Service (Business Logic Layer)
 * Implements core domain logic, complex filtering, sorting, and data manipulation.
 * Interacts solely with PropertyRepository for all data operations.
 */

export const PropertyService = {
    async getProperties(filterDTO) {
        let properties = await PropertyRepository.findAll();

        // 1. Search Query (Title, Developer, Location, Locality)
        if (filterDTO.search) {
            const q = filterDTO.search.toLowerCase();
            properties = properties.filter(p =>
                (p.title && p.title.toLowerCase().includes(q)) ||
                (p.developer && p.developer.toLowerCase().includes(q)) ||
                (p.location && p.location.toLowerCase().includes(q)) ||
                (p.locality && p.locality.toLowerCase().includes(q))
            );
        }

        // 2. Locality Filter
        if (filterDTO.locality) {
            const loc = filterDTO.locality.toLowerCase();
            properties = properties.filter(p =>
                p.locality && p.locality.toLowerCase().includes(loc)
            );
        }

        // 3. Property Category (Residential / Commercial / Plot)
        if (filterDTO.propertyCategory) {
            properties = properties.filter(p =>
                p.propertyCategory && p.propertyCategory.toLowerCase() === filterDTO.propertyCategory
            );
        }

        // 4. Physical Property Type (Apartment, Villa, Commercial, Plot, etc.)
        if (filterDTO.propertyType) {
            const targetType = filterDTO.propertyType.toLowerCase();
            if (targetType.includes("new")) {
                // If filtered via "new-launch" type chip
                properties = properties.filter(p => Boolean(p.isNewLaunch) || String(p.status || "").toLowerCase().includes("launch"));
            } else {
                properties = properties.filter(p =>
                    p.propertyType && p.propertyType.toLowerCase().includes(targetType)
                );
            }
        }

        // 5. BHK Filter (for residential)
        if (filterDTO.bhk) {
            properties = properties.filter(p => {
                if (Array.isArray(p.bhk)) {
                    return p.bhk.some(b => String(b).includes(filterDTO.bhk));
                }
                return String(p.bhk).includes(filterDTO.bhk);
            });
        }

        // 6. Price Range Filters
        if (filterDTO.minPrice) {
            properties = properties.filter(p => (p.numericPrice || 0) >= filterDTO.minPrice);
        }
        if (filterDTO.maxPrice) {
            properties = properties.filter(p => (p.numericPrice || 0) <= filterDTO.maxPrice);
        }

        // 7. Dedicated Flags
        if (filterDTO.isNewLaunch) {
            properties = properties.filter(p => Boolean(p.isNewLaunch));
        }
        if (filterDTO.isFeatured) {
            properties = properties.filter(p => Boolean(p.isFeatured));
        }

        // 8. Sorting
        if (filterDTO.sortBy === "price-low-high") {
            properties.sort((a, b) => (a.numericPrice || 0) - (b.numericPrice || 0));
        } else if (filterDTO.sortBy === "price-high-low") {
            properties.sort((a, b) => (b.numericPrice || 0) - (a.numericPrice || 0));
        } else {
            // Default "recommended": Featured properties float to top
            properties.sort((a, b) => Number(Boolean(b.isFeatured)) - Number(Boolean(a.isFeatured)));
        }

        return properties;
    },

    async getPropertyBySlugOrId(identifier) {
        const property = await PropertyRepository.findByIdOrSlug(identifier);
        if (!property) {
            const error = new Error(`Property with identifier '${identifier}' not found`);
            error.statusCode = 404;
            throw error;
        }
        return property;
    },

    async createProperty(propertyDTO) {
        // Business logic: Generate slug from title if not explicitly provided
        const baseSlug = propertyDTO.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "");

        const existing = await PropertyRepository.findByIdOrSlug(baseSlug);
        const slug = existing ? `${baseSlug}-${Date.now().toString().slice(-4)}` : baseSlug;

        const propertyToSave = {
            ...propertyDTO,
            slug
        };

        return await PropertyRepository.create(propertyToSave);
    },

    async updateProperty(id, updateDTO) {
        await this.getPropertyBySlugOrId(id); // Ensure existence
        return await PropertyRepository.update(id, updateDTO);
    },

    async deleteProperty(id) {
        await this.getPropertyBySlugOrId(id); // Ensure existence
        return await PropertyRepository.delete(id);
    }
};
