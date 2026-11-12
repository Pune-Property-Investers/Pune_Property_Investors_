import { apiRequest, withMockFallback } from "./api";
import { getStore, saveStore, addActivity } from "./mockStore";

export const leadService = {
    async list(params = {}) {
        const query = new URLSearchParams(params).toString();
        return withMockFallback(
            () => apiRequest(`/leads${query ? `?${query}` : ""}`),
            () => [...getStore().leads]
        );
    },

    async update(id, payload) {
        return withMockFallback(
            () =>
                apiRequest(`/leads/${id}`, {
                    method: "PATCH",
                    body: JSON.stringify(payload),
                }),
            () => {
                const store = getStore();
                let updated = null;
                store.leads = store.leads.map((item) => {
                    if (String(item.id) === String(id)) {
                        updated = { ...item, ...payload };
                        return updated;
                    }
                    return item;
                });
                saveStore(store);
                if (updated) addActivity(`Updated lead "${updated.name}" (${updated.status})`, "crm");
                return updated;
            }
        );
    },

    async remove(id) {
        return withMockFallback(
            () => apiRequest(`/leads/${id}`, { method: "DELETE" }),
            () => {
                const store = getStore();
                store.leads = store.leads.filter((item) => String(item.id) !== String(id));
                saveStore(store);
                return { success: true };
            }
        );
    },
};

