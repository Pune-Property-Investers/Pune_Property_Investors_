import { apiRequest, withMockFallback } from "./api.js";

const fallbackBadges = [
    { id: 1, badgeKey: "establishment", strongText: "Since 2022", labelText: "in Pune", iconName: "ShieldCheck", displayOrder: 1, isActive: true },
    { id: 2, badgeKey: "rating", strongText: "4.9/5", labelText: "Client Rating", iconName: "Star", displayOrder: 2, isActive: true },
    { id: 3, badgeKey: "brokerage", strongText: "0%", labelText: "Brokerage", iconName: "CirclePercent", displayOrder: 3, isActive: true },
    { id: 4, badgeKey: "happy-families", strongText: "20,000+", labelText: "Happy Families", iconName: "Users", displayOrder: 4, isActive: true },
    { id: 5, badgeKey: "team-size", strongText: "200+", labelText: "Team Size", iconName: "Building2", displayOrder: 5, isActive: true },
    { id: 6, badgeKey: "localities", strongText: "30+", labelText: "Pune Localities", iconName: "MapPin", displayOrder: 6, isActive: true },
];

let memoryBadges = [...fallbackBadges];

export const heroTrustBadgeService = {
    async list(params = {}) {
        const query = new URLSearchParams(params).toString();
        return withMockFallback(
            () => apiRequest(`/hero-trust-badges${query ? `?${query}` : ""}`),
            () => [...memoryBadges]
        );
    },

    async getById(id) {
        return withMockFallback(
            () => apiRequest(`/hero-trust-badges/${id}`),
            () => memoryBadges.find((b) => String(b.id) === String(id)) || null
        );
    },

    async create(payload) {
        return withMockFallback(
            () =>
                apiRequest("/hero-trust-badges", {
                    method: "POST",
                    body: JSON.stringify(payload),
                }),
            () => {
                const nextId = memoryBadges.length + 1;
                const created = { ...payload, id: nextId };
                memoryBadges = [...memoryBadges, created];
                return created;
            }
        );
    },

    async update(id, payload) {
        return withMockFallback(
            () =>
                apiRequest(`/hero-trust-badges/${id}`, {
                    method: "PUT",
                    body: JSON.stringify(payload),
                }),
            () => {
                let updated = null;
                memoryBadges = memoryBadges.map((item) => {
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

    async delete(id) {
        return withMockFallback(
            () =>
                apiRequest(`/hero-trust-badges/${id}`, {
                    method: "DELETE",
                }),
            () => {
                const before = memoryBadges.length;
                memoryBadges = memoryBadges.filter((item) => String(item.id) !== String(id));
                return memoryBadges.length < before;
            }
        );
    },
};
