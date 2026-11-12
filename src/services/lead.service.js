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

    async create(payload) {
        return withMockFallback(
            () =>
                apiRequest("/leads", {
                    method: "POST",
                    body: JSON.stringify(payload),
                }),
            () => {
                const store = getStore();
                const nextId =
                    store.leads.reduce((max, item) => Math.max(max, Number(item.id) || 0), 0) + 1;
                const newLead = {
                    id: nextId,
                    type: payload?.type || "contact",
                    name: payload?.name?.trim() || "Website Visitor",
                    phone: payload?.phone?.trim() || "",
                    email: payload?.email?.trim() || "",
                    propertyTitle: payload?.propertyTitle?.trim() || "General Advisory",
                    locality: payload?.locality?.trim() || "Pune",
                    budget: payload?.budget?.trim() || "",
                    message: payload?.message?.trim() || "",
                    status: "New",
                    followUpDate: payload?.followUpDate || "",
                    notes: payload?.notes || "",
                    createdAt: new Date().toISOString(),
                };
                store.leads = [newLead, ...store.leads];
                saveStore(store);
                addActivity(`New ${newLead.type} enquiry from "${newLead.name}"`, "crm");
                if (typeof window !== "undefined") {
                    window.dispatchEvent(new CustomEvent("ppi:leads-updated", { detail: newLead }));
                }
                return newLead;
            }
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

