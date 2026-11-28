import { apiRequest, withMockFallback } from "./api";
import { newLaunchProjects as defaultNewLaunches } from "../data/newLaunchProjectsData";

let memoryNewLaunches = [...defaultNewLaunches];

export const newLaunchService = {
    async list(params = {}) {
        const query = new URLSearchParams(params).toString();
        return withMockFallback(
            () => apiRequest(`/new-launches${query ? `?${query}` : ""}`),
            () => [...memoryNewLaunches]
        );
    },

    async getById(id) {
        return withMockFallback(
            () => apiRequest(`/new-launches/${id}`),
            () => memoryNewLaunches.find((p) => String(p.id) === String(id)) || null
        );
    },

    async create(payload) {
        return withMockFallback(
            () =>
                apiRequest("/new-launches", {
                    method: "POST",
                    body: JSON.stringify(payload),
                }),
            () => {
                const nextId =
                    memoryNewLaunches.reduce((max, item) => Math.max(max, Number(item.id) || 0), 0) + 1;
                const created = { ...payload, id: nextId };
                memoryNewLaunches = [created, ...memoryNewLaunches];
                return created;
            }
        );
    },

    async update(id, payload) {
        return withMockFallback(
            () =>
                apiRequest(`/new-launches/${id}`, {
                    method: "PATCH",
                    body: JSON.stringify(payload),
                }),
            () => {
                let updated = null;
                memoryNewLaunches = memoryNewLaunches.map((item) => {
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
            () => apiRequest(`/new-launches/${id}`, { method: "DELETE" }),
            () => {
                memoryNewLaunches = memoryNewLaunches.filter((p) => String(p.id) !== String(id));
                return { success: true };
            }
        );
    },
};
