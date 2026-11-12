import { apiRequest, withMockFallback } from "./api";
import { getStore, saveStore, addActivity } from "./mockStore";

export const projectService = {
    async list(params = {}) {
        const query = new URLSearchParams(params).toString();
        return withMockFallback(
            () => apiRequest(`/projects${query ? `?${query}` : ""}`),
            () => [...getStore().projects]
        );
    },

    async getById(id) {
        return withMockFallback(
            () => apiRequest(`/projects/${id}`),
            () => getStore().projects.find((p) => String(p.id) === String(id)) || null
        );
    },

    async create(payload) {
        return withMockFallback(
            () =>
                apiRequest("/projects", {
                    method: "POST",
                    body: JSON.stringify(payload),
                }),
            () => {
                const store = getStore();
                const nextId =
                    store.projects.reduce((max, item) => Math.max(max, Number(item.id) || 0), 0) + 1;
                const created = { ...payload, id: nextId, createdAt: new Date().toISOString() };
                store.projects = [created, ...store.projects];
                saveStore(store);
                addActivity(`Added project "${created.name}"`, "create");
                return created;
            }
        );
    },

    async update(id, payload) {
        return withMockFallback(
            () =>
                apiRequest(`/projects/${id}`, {
                    method: "PATCH",
                    body: JSON.stringify(payload),
                }),
            () => {
                const store = getStore();
                let updated = null;
                store.projects = store.projects.map((item) => {
                    if (String(item.id) === String(id)) {
                        updated = { ...item, ...payload, updatedAt: new Date().toISOString() };
                        return updated;
                    }
                    return item;
                });
                saveStore(store);
                if (updated) {
                    addActivity(`Updated project "${updated.name}"`, "update");
                }
                return updated;
            }
        );
    },

    async remove(id) {
        return withMockFallback(
            () => apiRequest(`/projects/${id}`, { method: "DELETE" }),
            () => {
                const store = getStore();
                const target = store.projects.find((p) => String(p.id) === String(id));
                store.projects = store.projects.filter((p) => String(p.id) !== String(id));
                saveStore(store);
                if (target) {
                    addActivity(`Deleted project "${target.name}"`, "delete");
                }
                return { success: true };
            }
        );
    },
};

