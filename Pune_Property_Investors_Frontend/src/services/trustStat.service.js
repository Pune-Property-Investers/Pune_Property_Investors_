import { apiRequest, withMockFallback } from "./api.js";

const fallbackStats = [
    { id: 1, statKey: "team-size", label: "Team Size", target: 200, targetValue: 200, suffix: " +", iconName: "Users" },
    { id: 2, statKey: "happy-clients", label: "Happy Clients", target: 20000, targetValue: 20000, suffix: " +", iconName: "UserRoundCheck" },
    { id: 3, statKey: "site-visits", label: "Site Visits", target: 10000, targetValue: 10000, suffix: " +", iconName: "CarFront" },
    { id: 4, statKey: "sqft-sold", label: "Sq. Ft Sold Till Date", target: 900000, targetValue: 900000, suffix: " +", iconName: "Building2" },
    { id: 5, statKey: "zero-brokerage", label: "Brokerage", target: 0, targetValue: 0, suffix: " %", iconName: "CirclePercent" }
];

let memoryStats = [...fallbackStats];

export const trustStatService = {
    async list(params = {}) {
        const query = new URLSearchParams(params).toString();
        return withMockFallback(
            () => apiRequest(`/trust-stats${query ? `?${query}` : ""}`),
            () => [...memoryStats]
        );
    },

    async getById(id) {
        return withMockFallback(
            () => apiRequest(`/trust-stats/${id}`),
            () => memoryStats.find((s) => String(s.id) === String(id) || s.statKey === String(id)) || null
        );
    },

    async create(payload) {
        return withMockFallback(
            () =>
                apiRequest("/trust-stats", {
                    method: "POST",
                    body: JSON.stringify(payload),
                }),
            () => {
                const nextId = memoryStats.length + 1;
                const created = { ...payload, id: nextId };
                memoryStats = [...memoryStats, created];
                return created;
            }
        );
    },

    async update(id, payload) {
        return withMockFallback(
            () =>
                apiRequest(`/trust-stats/${id}`, {
                    method: "PATCH",
                    body: JSON.stringify(payload),
                }),
            () => {
                let updated = null;
                memoryStats = memoryStats.map((item) => {
                    if (String(item.id) === String(id) || item.statKey === String(id)) {
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
            () => apiRequest(`/trust-stats/${id}`, { method: "DELETE" }),
            () => {
                memoryStats = memoryStats.filter((item) => String(item.id) !== String(id) && item.statKey !== String(id));
                return true;
            }
        );
    },
};
