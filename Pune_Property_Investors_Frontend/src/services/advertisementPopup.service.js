import { apiRequest, withMockFallback } from "./api.js";

const fallbackSettings = {
    id: 1,
    isEnabled: true,
    delaySeconds: 3,
    autoMute: true,
    sourceType: "shorts",
    pinnedVideoId: null,
    pinnedTitle: "Featured Property Reel",
    pinnedLink: "/shorts",
};

let memorySettings = { ...fallbackSettings };

export const advertisementPopupService = {
    async getSettings() {
        return withMockFallback(
            () => apiRequest("/advertisement-popup-settings"),
            () => ({ ...memorySettings })
        );
    },

    async updateSettings(payload) {
        return withMockFallback(
            () =>
                apiRequest("/advertisement-popup-settings", {
                    method: "PUT",
                    body: JSON.stringify(payload),
                }),
            () => {
                memorySettings = { ...memorySettings, ...payload };
                return { ...memorySettings };
            }
        );
    },
};

export default advertisementPopupService;
