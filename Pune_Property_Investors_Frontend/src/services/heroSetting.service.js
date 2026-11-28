import { apiRequest, withMockFallback } from "./api.js";

const fallbackHero = {
    id: 1,
    eyebrow: "YOUR PROPERTY PARTNER IN PUNE",
    headingLine1: "Find Your Dream Home.",
    headingLine2: "Invest in Your Future",
    subtitle: null,
    videoUrl: "https://play.gumlet.io/embed/6aec1cf3981592d058d2775e?background=true&autoplay=true&loop=true&disable_player_controls=true&preload=true",
    backgroundImage: null,
    primaryCtaText: null,
    primaryCtaUrl: "/buy",
    showCategoryTabs: true,
    showSearchCard: true,
    isActive: true,
    trustBadges: [
        { id: 1, badgeKey: "establishment", strongText: "Since 2022", labelText: "in Pune", iconName: "ShieldCheck", displayOrder: 1, isActive: true },
        { id: 2, badgeKey: "rating", strongText: "4.9/5", labelText: "Client Rating", iconName: "Star", displayOrder: 2, isActive: true },
        { id: 3, badgeKey: "brokerage", strongText: "0%", labelText: "Brokerage", iconName: "CirclePercent", displayOrder: 3, isActive: true },
        { id: 4, badgeKey: "happy-families", strongText: "20,000+", labelText: "Happy Families", iconName: "Users", displayOrder: 4, isActive: true },
        { id: 5, badgeKey: "team-size", strongText: "200+", labelText: "Team Size", iconName: "Building2", displayOrder: 5, isActive: true },
        { id: 6, badgeKey: "localities", strongText: "30+", labelText: "Pune Localities", iconName: "MapPin", displayOrder: 6, isActive: true },
    ],
};

let memoryHero = { ...fallbackHero };

export const heroSettingService = {
    async get(params = { full: true }) {
        const query = new URLSearchParams(params).toString();
        return withMockFallback(
            () => apiRequest(`/hero-settings${query ? `?${query}` : ""}`),
            () => ({ ...memoryHero })
        );
    },

    async update(payload) {
        return withMockFallback(
            () =>
                apiRequest("/hero-settings", {
                    method: "PUT",
                    body: JSON.stringify(payload),
                }),
            () => {
                memoryHero = { ...memoryHero, ...payload };
                return { ...memoryHero };
            }
        );
    },

    async listBadges(params = {}) {
        const query = new URLSearchParams(params).toString();
        return withMockFallback(
            () => apiRequest(`/hero-settings/badges${query ? `?${query}` : ""}`),
            () => [...memoryHero.trustBadges]
        );
    },
};
