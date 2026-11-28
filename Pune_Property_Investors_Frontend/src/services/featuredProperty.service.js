import { apiRequest, withMockFallback } from "./api.js";

let memoryFeaturedProperties = [];

export const featuredPropertyService = {
    async list(params = {}) {
        const query = new URLSearchParams(params).toString();
        return withMockFallback(
            () => apiRequest(`/featured-properties${query ? `?${query}` : ""}`),
            () => [...memoryFeaturedProperties]
        );
    },

    async getById(id) {
        return withMockFallback(
            () => apiRequest(`/featured-properties/${id}`),
            () => memoryFeaturedProperties.find((p) => String(p.id) === String(id) || p.propertySlug === id || p.slug === id) || null
        );
    },

    async create(payload) {
        return withMockFallback(
            () =>
                apiRequest("/featured-properties", {
                    method: "POST",
                    body: JSON.stringify(payload),
                }),
            () => {
                const nextId =
                    memoryFeaturedProperties.reduce((max, item) => Math.max(max, Number(item.id) || 0), 0) + 1;
                const created = { ...payload, id: nextId };
                memoryFeaturedProperties = [created, ...memoryFeaturedProperties];
                return created;
            }
        );
    },

    async update(id, payload) {
        return withMockFallback(
            () =>
                apiRequest(`/featured-properties/${id}`, {
                    method: "PATCH",
                    body: JSON.stringify(payload),
                }),
            () => {
                let updated = null;
                memoryFeaturedProperties = memoryFeaturedProperties.map((item) => {
                    if (String(item.id) === String(id)) {
                        updated = { ...item, ...payload };
                        return updated;
                    }
                    return item;
                });
                return updated;
            }
        );
    },

    async remove(id) {
        return withMockFallback(
            () => apiRequest(`/featured-properties/${id}`, { method: "DELETE" }),
            () => {
                memoryFeaturedProperties = memoryFeaturedProperties.filter((p) => String(p.id) !== String(id));
                return { success: true };
            }
        );
    },
};
