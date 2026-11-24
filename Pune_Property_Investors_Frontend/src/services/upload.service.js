import { apiRequest, withMockFallback } from "./api";
import { getStore, saveStore, addActivity } from "./mockStore";

function readFileAsDataUrl(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

export const uploadService = {
    async listMedia(type) {
        return withMockFallback(
            () => apiRequest(`/uploads${type ? `?type=${type}` : ""}`),
            () => {
                const { media } = getStore();
                return type && type !== "all" ? media.filter((m) => m.type === type) : [...media];
            }
        );
    },

    async uploadFile(file, typeHint = "image") {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("type", typeHint);

        return withMockFallback(
            () => apiRequest("/uploads", { method: "POST", body: formData }),
            async () => {
                const dataUrl = await readFileAsDataUrl(file);
                const store = getStore();
                const nextId = store.media.reduce((m, item) => Math.max(m, Number(item.id) || 0), 0) + 1;
                const detectedType = file.type.startsWith("video/")
                    ? "video"
                    : file.type.startsWith("image/")
                        ? "image"
                        : "document";
                const item = {
                    id: nextId,
                    name: file.name,
                    url: dataUrl,
                    type: detectedType || typeHint,
                    size: `${Math.max(1, Math.round(file.size / 1024))} KB`,
                    uploadedAt: new Date().toISOString().slice(0, 10),
                };
                store.media = [item, ...store.media];
                saveStore(store);
                addActivity(`Uploaded media "${item.name}"`, "create");
                return item;
            }
        );
    },

    async addExternalMedia({ name, url, type = "video" }) {
        return withMockFallback(
            () => apiRequest("/uploads/external", { method: "POST", body: JSON.stringify({ name, url, type }) }),
            () => {
                const store = getStore();
                const nextId = store.media.reduce((m, item) => Math.max(m, Number(item.id) || 0), 0) + 1;
                const item = {
                    id: nextId,
                    name,
                    url,
                    type,
                    size: "External URL",
                    uploadedAt: new Date().toISOString().slice(0, 10),
                };
                store.media = [item, ...store.media];
                saveStore(store);
                return item;
            }
        );
    },

    async removeMedia(id) {
        return withMockFallback(
            () => apiRequest(`/uploads/${id}`, { method: "DELETE" }),
            () => {
                const store = getStore();
                store.media = store.media.filter((m) => String(m.id) !== String(id));
                saveStore(store);
                return { success: true };
            }
        );
    },
};

