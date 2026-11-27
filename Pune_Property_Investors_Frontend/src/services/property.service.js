import { apiRequest, withMockFallback } from "./api";
import { getStore, saveStore, addActivity } from "./mockStore";

const LIST_CACHE_KEY = "ppi_props_cache_v1";
let memoryListCache = null;
const memoryItemCache = new Map();
let inflightListPromise = null;

function indexItems(list) {
    if (!Array.isArray(list)) return;
    memoryListCache = list;
    for (const item of list) {
        if (item?.id !== undefined) memoryItemCache.set(String(item.id), item);
        if (item?.slug) memoryItemCache.set(String(item.slug), item);
    }
    try {
        if (typeof window !== "undefined") {
            sessionStorage.setItem(LIST_CACHE_KEY, JSON.stringify(list));
        }
    } catch {
        // Ignore storage quota errors
    }
}

function hydrateFromSession() {
    if (memoryListCache) return memoryListCache;
    if (typeof window === "undefined") return null;
    try {
        const raw = sessionStorage.getItem(LIST_CACHE_KEY);
        if (raw) {
            const parsed = JSON.parse(raw);
            if (Array.isArray(parsed)) {
                indexItems(parsed);
                return parsed;
            }
        }
    } catch {
        // Ignore parse errors
    }
    return null;
}

export const propertyService = {
    getCachedList() {
        return hydrateFromSession();
    },

    getCachedById(identifier) {
        if (!identifier) return null;
        const key = String(identifier);
        if (memoryItemCache.has(key)) return memoryItemCache.get(key);
        const list = hydrateFromSession();
        if (Array.isArray(list)) {
            return list.find((p) => String(p.id) === key || p.slug === key) || null;
        }
        return null;
    },

    invalidateCache() {
        memoryListCache = null;
        memoryItemCache.clear();
        try {
            if (typeof window !== "undefined") {
                sessionStorage.removeItem(LIST_CACHE_KEY);
            }
        } catch {
            // Ignore
        }
    },

    async list(params = {}) {
        const query = new URLSearchParams(params).toString();
        if (!query && inflightListPromise) {
            return inflightListPromise;
        }
        const reqPromise = withMockFallback(
            () => apiRequest(`/properties${query ? `?${query}` : ""}`),
            () => {
                const { properties } = getStore();
                return [...properties];
            }
        ).then((res) => {
            const list = res?.data || res;
            if (!query && Array.isArray(list)) {
                indexItems(list);
            }
            return res;
        }).finally(() => {
            if (!query) inflightListPromise = null;
        });

        if (!query) inflightListPromise = reqPromise;
        return reqPromise;
    },

    async getById(id) {
        return withMockFallback(
            () => apiRequest(`/properties/${id}`),
            () => getStore().properties.find((p) => String(p.id) === String(id)) || null
        ).then((res) => {
            const item = res?.data || res;
            if (item && (item.id || item.slug)) {
                if (item.id !== undefined) memoryItemCache.set(String(item.id), item);
                if (item.slug) memoryItemCache.set(String(item.slug), item);
            }
            return res;
        });
    },

    async create(payload) {
        const res = await withMockFallback(
            () =>
                apiRequest("/properties", {
                    method: "POST",
                    body: JSON.stringify(payload),
                }),
            () => {
                const store = getStore();
                const nextId =
                    store.properties.reduce((max, item) => Math.max(max, Number(item.id) || 0), 0) + 1;
                const created = {
                    ...payload,
                    id: nextId,
                    createdAt: new Date().toISOString(),
                };
                store.properties = [created, ...store.properties];
                saveStore(store);
                addActivity(`Added property "${created.title || created.name}"`, "create");
                return created;
            }
        );
        this.invalidateCache();
        return res;
    },

    async update(id, payload) {
        const res = await withMockFallback(
            () =>
                apiRequest(`/properties/${id}`, {
                    method: "PATCH",
                    body: JSON.stringify(payload),
                }),
            () => {
                const store = getStore();
                let updated = null;
                store.properties = store.properties.map((item) => {
                    if (String(item.id) === String(id)) {
                        updated = { ...item, ...payload, updatedAt: new Date().toISOString() };
                        return updated;
                    }
                    return item;
                });
                saveStore(store);
                if (updated) {
                    addActivity(`Updated property "${updated.title || updated.name}"`, "update");
                }
                return updated;
            }
        );
        this.invalidateCache();
        return res;
    },

    async remove(id) {
        const res = await withMockFallback(
            () => apiRequest(`/properties/${id}`, { method: "DELETE" }),
            () => {
                const store = getStore();
                const target = store.properties.find((p) => String(p.id) === String(id));
                store.properties = store.properties.filter((p) => String(p.id) !== String(id));
                saveStore(store);
                if (target) {
                    addActivity(`Removed property "${target.title || target.name}"`, "delete");
                }
                return { success: true };
            }
        );
        this.invalidateCache();
        return res;
    },
};
