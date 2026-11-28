import { apiRequest, withMockFallback } from "./api.js";
import advertisementData from "../data/advertisementData.js";

let memoryAds = [...advertisementData];

export const advertisementService = {
    async list(params = {}) {
        const query = new URLSearchParams(params).toString();
        return withMockFallback(
            () => apiRequest(`/advertisements${query ? `?${query}` : ""}`),
            () => [...memoryAds]
        );
    },

    async getById(id) {
        return withMockFallback(
            () => apiRequest(`/advertisements/${id}`),
            () => memoryAds.find((a) => String(a.id) === String(id)) || null
        );
    },

    async create(payload) {
        return withMockFallback(
            () =>
                apiRequest("/advertisements", {
                    method: "POST",
                    body: JSON.stringify(payload),
                }),
            () => {
                const nextId = memoryAds.length + 1;
                const created = { ...payload, id: nextId };
                memoryAds = [...memoryAds, created];
                return created;
            }
        );
    },

    async update(id, payload) {
        return withMockFallback(
            () =>
                apiRequest(`/advertisements/${id}`, {
                    method: "PATCH",
                    body: JSON.stringify(payload),
                }),
            () => {
                let updated = null;
                memoryAds = memoryAds.map((item) => {
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

    async delete(id) {
        return withMockFallback(
            () => apiRequest(`/advertisements/${id}`, { method: "DELETE" }),
            () => {
                memoryAds = memoryAds.filter((item) => String(item.id) !== String(id));
                return true;
            }
        );
    },
};
