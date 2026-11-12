import { apiRequest, withMockFallback } from "./api";
import { getStore, saveStore, addActivity } from "./mockStore";

export const propertyService = {
    async list(params = {}) {
        const query = new URLSearchParams(params).toString();
        return withMockFallback(
            () => apiRequest(`/properties${query ? `?${query}` : ""}`),
            () => {
                const { properties } = getStore();
                return [...properties];
            }
        );
    },

    async getById(id) {
        return withMockFallback(
            () => apiRequest(`/properties/${id}`),
            () => getStore().properties.find((p) => String(p.id) === String(id)) || null
        );
    },

    async create(payload) {
        return withMockFallback(
            () =>
                apiRequest("/properties", {
                    method: "POST",
                    body: JSON.stringify(payload),
                }),
            () => {
                const store = getStore();
                const nextId =
                    store.properties.reduce((max, item) => Math.max(max, Number(item.id) || 0), 0) + 1;
                const created = {
                    ...payload,
                    id: nextId,
                    createdAt: new Date().toISOString(),
                };
                store.properties = [created, ...store.properties];
                saveStore(store);
                addActivity(`Added property "${created.title || created.name}"`, "create");
                return created;
            }
        );
    },

    async update(id, payload) {
        return withMockFallback(
            () =>
                apiRequest(`/properties/${id}`, {
                    method: "PATCH",
                    body: JSON.stringify(payload),
                }),
            () => {
                const store = getStore();
                let updated = null;
                store.properties = store.properties.map((item) => {
                    if (String(item.id) === String(id)) {
                        updated = { ...item, ...payload, updatedAt: new Date().toISOString() };
                        return updated;
                    }
                    return item;
                });
                saveStore(store);
                if (updated) {
                    addActivity(`Updated property "${updated.title || updated.name}"`, "update");
                }
                return updated;
            }
        );
    },

    async remove(id) {
        return withMockFallback(
            () => apiRequest(`/properties/${id}`, { method: "DELETE" }),
            () => {
                const store = getStore();
                const target = store.properties.find((p) => String(p.id) === String(id));
                store.properties = store.properties.filter((p) => String(p.id) !== String(id));
                saveStore(store);
                if (target) {
                    addActivity(`Removed property "${target.title || target.name}"`, "delete");
                }
                return { success: true };
            }
        );
    },
};

