import { apiRequest, withMockFallback } from "./api";
import { getStore, saveStore, addActivity } from "./mockStore";

export const developerService = {
    async list() {
        return withMockFallback(
            () => apiRequest("/developers"),
            () => [...getStore().developers]
        );
    },

    async create(payload) {
        return withMockFallback(
            () =>
                apiRequest("/developers", {
                    method: "POST",
                    body: JSON.stringify(payload),
                }),
            () => {
                const store = getStore();
                const nextId =
                    store.developers.reduce((max, item) => Math.max(max, Number(item.id) || 0), 0) + 1;
                const created = { ...payload, id: nextId };
                store.developers = [created, ...store.developers];
                saveStore(store);
                addActivity(`Added developer "${created.name}"`, "create");
                return created;
            }
        );
    },

    async update(id, payload) {
        return withMockFallback(
            () =>
                apiRequest(`/developers/${id}`, {
                    method: "PATCH",
                    body: JSON.stringify(payload),
                }),
            () => {
                const store = getStore();
                let updated = null;
                store.developers = store.developers.map((item) => {
                    if (String(item.id) === String(id)) {
                        updated = { ...item, ...payload };
                        return updated;
                    }
                    return item;
                });
                saveStore(store);
                if (updated) addActivity(`Updated developer "${updated.name}"`, "update");
                return updated;
            }
        );
    },

    async remove(id) {
        return withMockFallback(
            () => apiRequest(`/developers/${id}`, { method: "DELETE" }),
            () => {
                const store = getStore();
                const target = store.developers.find((d) => String(d.id) === String(id));
                store.developers = store.developers.filter((d) => String(d.id) !== String(id));
                saveStore(store);
                if (target) addActivity(`Removed developer "${target.name}"`, "delete");
                return { success: true };
            }
        );
    },
};

