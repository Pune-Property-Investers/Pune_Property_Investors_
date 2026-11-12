import { apiRequest, withMockFallback } from "./api";
import { getStore, saveStore, addActivity } from "./mockStore";

export const locationService = {
    async list() {
        return withMockFallback(
            () => apiRequest("/locations"),
            () => [...getStore().locations]
        );
    },

    async create(payload) {
        return withMockFallback(
            () =>
                apiRequest("/locations", {
                    method: "POST",
                    body: JSON.stringify(payload),
                }),
            () => {
                const store = getStore();
                const nextId =
                    store.locations.reduce((max, item) => Math.max(max, Number(item.id) || 0), 0) + 1;
                const created = { ...payload, id: nextId };
                store.locations = [created, ...store.locations];
                saveStore(store);
                addActivity(`Added location "${created.name}"`, "create");
                return created;
            }
        );
    },

    async update(id, payload) {
        return withMockFallback(
            () =>
                apiRequest(`/locations/${id}`, {
                    method: "PATCH",
                    body: JSON.stringify(payload),
                }),
            () => {
                const store = getStore();
                let updated = null;
                store.locations = store.locations.map((item) => {
                    if (String(item.id) === String(id)) {
                        updated = { ...item, ...payload };
                        return updated;
                    }
                    return item;
                });
                saveStore(store);
                if (updated) addActivity(`Updated location "${updated.name}"`, "update");
                return updated;
            }
        );
    },

    async remove(id) {
        return withMockFallback(
            () => apiRequest(`/locations/${id}`, { method: "DELETE" }),
            () => {
                const store = getStore();
                const target = store.locations.find((l) => String(l.id) === String(id));
                store.locations = store.locations.filter((l) => String(l.id) !== String(id));
                saveStore(store);
                if (target) addActivity(`Removed location "${target.name}"`, "delete");
                return { success: true };
            }
        );
    },
};

