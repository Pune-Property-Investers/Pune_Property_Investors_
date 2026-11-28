import { apiRequest, withMockFallback } from "./api.js";

let memoryShorts = [];

export const propertyShortService = {
    async list(params = {}) {
        const query = new URLSearchParams(params).toString();
        return withMockFallback(
            () => apiRequest(`/property-shorts${query ? `?${query}` : ""}`),
            () => [...memoryShorts]
        );
    },

    async getById(id) {
        return withMockFallback(
            () => apiRequest(`/property-shorts/${id}`),
            () => memoryShorts.find((s) => String(s.id) === String(id)) || null
        );
    },

    async create(payload) {
        return withMockFallback(
            () =>
                apiRequest("/property-shorts", {
                    method: "POST",
                    body: JSON.stringify(payload),
                }),
            () => {
                const nextId = `short-${Date.now()}`;
                const created = { ...payload, id: nextId };
                memoryShorts = [created, ...memoryShorts];
                return created;
            }
        );
    },

    async update(id, payload) {
        return withMockFallback(
            () =>
                apiRequest(`/property-shorts/${id}`, {
                    method: "PATCH",
                    body: JSON.stringify(payload),
                }),
            () => {
                let updated = null;
                memoryShorts = memoryShorts.map((item) => {
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
            () => apiRequest(`/property-shorts/${id}`, { method: "DELETE" }),
            () => {
                memoryShorts = memoryShorts.filter((s) => String(s.id) !== String(id));
                return { success: true };
            }
        );
    },
};
