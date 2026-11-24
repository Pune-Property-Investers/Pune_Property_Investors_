import { apiRequest, withMockFallback } from "./api";
import { getStore, saveStore, addActivity } from "./mockStore";

export const settingsService = {
    async getSettings() {
        return withMockFallback(
            () => apiRequest("/settings"),
            () => ({ ...getStore().settings })
        );
    },

    async updateSection(sectionKey, payload) {
        return withMockFallback(
            () =>
                apiRequest(`/settings/${sectionKey}`, {
                    method: "PATCH",
                    body: JSON.stringify(payload),
                }),
            () => {
                const store = getStore();
                store.settings = {
                    ...store.settings,
                    [sectionKey]: {
                        ...(store.settings[sectionKey] || {}),
                        ...payload,
                    },
                };
                saveStore(store);
                addActivity(`Updated ${sectionKey} settings`, "update");
                return store.settings[sectionKey];
            }
        );
    },

    async updatePageSeo(pageKey, payload) {
        return withMockFallback(
            () =>
                apiRequest(`/settings/pages-seo/${pageKey}`, {
                    method: "PUT",
                    body: JSON.stringify(payload),
                }),
            () => {
                const store = getStore();
                const currentPages = store.settings.pagesSeo || {};
                store.settings = {
                    ...store.settings,
                    pagesSeo: {
                        ...currentPages,
                        [pageKey]: {
                            ...(currentPages[pageKey] || {}),
                            ...payload,
                        },
                    },
                };
                saveStore(store);
                addActivity(`Updated SEO metadata for page "${pageKey}"`, "update");
                return store.settings.pagesSeo[pageKey];
            }
        );
    },
};

