import { apiRequest, withMockFallback } from "./api.js";

const fallbackHighlights = [
    {
        id: "trust",
        highlightKey: "trust",
        title: "100% TRUST",
        line1: "100%",
        line2: "TRUST",
        desc: "Complete Transparency. Confident Decisions.",
        description: "Complete Transparency. Confident Decisions.",
        iconName: "ShieldCheck",
    },
    {
        id: "brokerage",
        highlightKey: "brokerage",
        title: "ZERO BROKERAGE",
        line1: "ZERO",
        line2: "BROKERAGE",
        desc: "No Brokerage. No Hidden Charges.",
        description: "No Brokerage. No Hidden Charges.",
        iconName: "CirclePercent",
    },
    {
        id: "price",
        highlightKey: "price",
        title: "BEST LAUNCH PRICE",
        line1: "BEST LAUNCH",
        line2: "PRICE",
        desc: "Exclusive Launch Offers. Maximum Savings.",
        description: "Exclusive Launch Offers. Maximum Savings.",
        iconName: "Sparkles",
    },
];

let memoryHighlights = [...fallbackHighlights];

export const trustHighlightService = {
    async list(params = {}) {
        const query = new URLSearchParams(params).toString();
        return withMockFallback(
            () => apiRequest(`/trust-highlights${query ? `?${query}` : ""}`),
            () => [...memoryHighlights]
        );
    },

    async getById(id) {
        return withMockFallback(
            () => apiRequest(`/trust-highlights/${id}`),
            () => memoryHighlights.find((h) => String(h.id) === String(id) || h.highlightKey === String(id)) || null
        );
    },

    async create(payload) {
        return withMockFallback(
            () =>
                apiRequest("/trust-highlights", {
                    method: "POST",
                    body: JSON.stringify(payload),
                }),
            () => {
                const nextId = memoryHighlights.length + 1;
                const created = { ...payload, id: nextId };
                memoryHighlights = [...memoryHighlights, created];
                return created;
            }
        );
    },

    async update(id, payload) {
        return withMockFallback(
            () =>
                apiRequest(`/trust-highlights/${id}`, {
                    method: "PATCH",
                    body: JSON.stringify(payload),
                }),
            () => {
                let updated = null;
                memoryHighlights = memoryHighlights.map((item) => {
                    if (String(item.id) === String(id) || item.highlightKey === String(id)) {
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
            () => apiRequest(`/trust-highlights/${id}`, { method: "DELETE" }),
            () => {
                memoryHighlights = memoryHighlights.filter(
                    (item) => String(item.id) !== String(id) && item.highlightKey !== String(id)
                );
                return true;
            }
        );
    },
};
