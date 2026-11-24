import { apiRequest, withMockFallback } from "./api";
import { getStore, saveStore, addActivity } from "./mockStore";

export const articleService = {
    async list(type) {
        return withMockFallback(
            () => apiRequest(`/articles${type ? `?type=${type}` : ""}`),
            () => {
                const { articles } = getStore();
                return type ? articles.filter((a) => a.type === type) : [...articles];
            }
        );
    },

    async create(payload) {
        return withMockFallback(
            () => apiRequest("/articles", { method: "POST", body: JSON.stringify(payload) }),
            () => {
                const store = getStore();
                const nextId = store.articles.reduce((m, a) => Math.max(m, Number(a.id) || 0), 0) + 1;
                const created = { ...payload, id: nextId };
                store.articles = [created, ...store.articles];
                saveStore(store);
                addActivity(`Created ${created.type || "article"} "${created.title}"`, "create");
                return created;
            }
        );
    },

    async update(id, payload) {
        return withMockFallback(
            () => apiRequest(`/articles/${id}`, { method: "PATCH", body: JSON.stringify(payload) }),
            () => {
                const store = getStore();
                let updated = null;
                store.articles = store.articles.map((a) => {
                    if (String(a.id) === String(id)) {
                        updated = { ...a, ...payload };
                        return updated;
                    }
                    return a;
                });
                saveStore(store);
                if (updated) addActivity(`Updated article "${updated.title}"`, "update");
                return updated;
            }
        );
    },

    async remove(id) {
        return withMockFallback(
            () => apiRequest(`/articles/${id}`, { method: "DELETE" }),
            () => {
                const store = getStore();
                store.articles = store.articles.filter((a) => String(a.id) !== String(id));
                saveStore(store);
                return { success: true };
            }
        );
    },

    // News endpoints
    async listNews() {
        return withMockFallback(
            () => apiRequest("/news"),
            () => [...getStore().news]
        );
    },

    async createNews(payload) {
        return withMockFallback(
            () => apiRequest("/news", { method: "POST", body: JSON.stringify(payload) }),
            () => {
                const store = getStore();
                const nextId = store.news.reduce((m, n) => Math.max(m, Number(n.id) || 0), 0) + 1;
                const created = { ...payload, id: nextId };
                store.news = [created, ...store.news];
                saveStore(store);
                addActivity(`Created news "${created.title}"`, "create");
                return created;
            }
        );
    },

    async updateNews(id, payload) {
        return withMockFallback(
            () => apiRequest(`/news/${id}`, { method: "PATCH", body: JSON.stringify(payload) }),
            () => {
                const store = getStore();
                let updated = null;
                store.news = store.news.map((n) => {
                    if (String(n.id) === String(id)) {
                        updated = { ...n, ...payload };
                        return updated;
                    }
                    return n;
                });
                saveStore(store);
                if (updated) addActivity(`Updated news "${updated.title}"`, "update");
                return updated;
            }
        );
    },

    async removeNews(id) {
        return withMockFallback(
            () => apiRequest(`/news/${id}`, { method: "DELETE" }),
            () => {
                const store = getStore();
                store.news = store.news.filter((n) => String(n.id) !== String(id));
                saveStore(store);
                return { success: true };
            }
        );
    },
};

