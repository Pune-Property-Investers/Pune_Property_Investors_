import { apiRequest, withMockFallback } from "./api";
import { projects as defaultProjects } from "../data/projects";

let memoryFeaturedProjects = [...defaultProjects];

export const featuredProjectService = {
    async list(params = {}) {
        const query = new URLSearchParams(params).toString();
        return withMockFallback(
            () => apiRequest(`/featured-projects${query ? `?${query}` : ""}`),
            () => [...memoryFeaturedProjects]
        );
    },

    async getById(id) {
        return withMockFallback(
            () => apiRequest(`/featured-projects/${id}`),
            () => memoryFeaturedProjects.find((p) => String(p.id) === String(id)) || null
        );
    },

    async create(payload) {
        return withMockFallback(
            () =>
                apiRequest("/featured-projects", {
                    method: "POST",
                    body: JSON.stringify(payload),
                }),
            () => {
                const nextId =
                    memoryFeaturedProjects.reduce((max, item) => Math.max(max, Number(item.id) || 0), 0) + 1;
                const created = { ...payload, id: nextId };
                memoryFeaturedProjects = [created, ...memoryFeaturedProjects];
                return created;
            }
        );
    },

    async update(id, payload) {
        return withMockFallback(
            () =>
                apiRequest(`/featured-projects/${id}`, {
                    method: "PATCH",
                    body: JSON.stringify(payload),
                }),
            () => {
                let updated = null;
                memoryFeaturedProjects = memoryFeaturedProjects.map((item) => {
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
            () => apiRequest(`/featured-projects/${id}`, { method: "DELETE" }),
            () => {
                memoryFeaturedProjects = memoryFeaturedProjects.filter((p) => String(p.id) !== String(id));
                return { success: true };
            }
        );
    },
};
