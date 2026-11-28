import { apiRequest, withMockFallback } from "./api.js";

const fallbackUpcoming = [
    {
        id: 1,
        slug: "vtp-aurelia-new-kharadi",
        title: "VTP Aurelia",
        brandSubtext: "VTP REALTY • TOWNSHIP CODENAME PEGASUS",
        developer: "VTP Realty",
        location: "New Kharadi - Riverside Corridor, Pune",
        locality: "New Kharadi",
        badgeText: "GRAND PRE-LAUNCH",
        reraStatus: "MahaRERA Applied",
        youtubeUrl: "https://www.youtube.com/watch?v=yTzvQko2gYo&t=14s",
        youtubeId: "yTzvQko2gYo",
        videoStartSeconds: 14,
        configurations: "2, 3 & 4.5 BHK",
        configurationsSub: "Forest & River Views",
        price: "Starting ₹ 85 Lacs*",
        priceSub: "Zero Floor Rise in EOI",
        launchTimeline: "Pre-Launch 2026–2027",
        launchTimelineSub: "Early Bird Window",
        eyebrow: "EXCLUSIVE PRE-LAUNCH PREVIEW 2026–2027",
        heading: "Upcoming Project Showcase",
        subtitle: "Experience the grand launch and exclusive first look of Pune’s next iconic landmark in New Kharadi. Lock in inaugural pre-registration privileges before public release.",
        whatsappNumber: "917398174444",
        isActive: true,
        isFeatured: true,
        displayOrder: 1,
    }
];

let memoryUpcoming = [...fallbackUpcoming];

export const upcomingProjectService = {
    async list(params = {}) {
        const query = new URLSearchParams(params).toString();
        return withMockFallback(
            () => apiRequest(`/upcoming-projects${query ? `?${query}` : ""}`),
            () => [...memoryUpcoming]
        );
    },

    async getFeatured() {
        return withMockFallback(
            () => apiRequest("/upcoming-projects/featured"),
            () => memoryUpcoming.find((p) => p.isFeatured) || memoryUpcoming[0] || null
        );
    },

    async getById(id) {
        return withMockFallback(
            () => apiRequest(`/upcoming-projects/${id}`),
            () => memoryUpcoming.find((p) => String(p.id) === String(id) || p.slug === String(id)) || null
        );
    },

    async create(payload) {
        return withMockFallback(
            () =>
                apiRequest("/upcoming-projects", {
                    method: "POST",
                    body: JSON.stringify(payload),
                }),
            () => {
                const nextId = memoryUpcoming.length + 1;
                const created = { ...payload, id: nextId };
                memoryUpcoming = [created, ...memoryUpcoming];
                return created;
            }
        );
    },

    async update(id, payload) {
        return withMockFallback(
            () =>
                apiRequest(`/upcoming-projects/${id}`, {
                    method: "PATCH",
                    body: JSON.stringify(payload),
                }),
            () => {
                let updated = null;
                memoryUpcoming = memoryUpcoming.map((item) => {
                    if (String(item.id) === String(id) || item.slug === String(id)) {
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
                apiRequest(`/upcoming-projects/${id}`, {
                    method: "DELETE",
                }),
            () => {
                memoryUpcoming = memoryUpcoming.filter(
                    (item) => String(item.id) !== String(id) && item.slug !== String(id)
                );
                return true;
            }
        );
    },
};
