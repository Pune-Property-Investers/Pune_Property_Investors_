import { apiRequest, withMockFallback } from "./api";
import { getStore, saveStore, addActivity } from "./mockStore";

export const careerService = {
    async listJobs() {
        return withMockFallback(
            () => apiRequest("/careers/jobs"),
            () => [...getStore().jobs]
        );
    },

    async createJob(payload) {
        return withMockFallback(
            () => apiRequest("/careers/jobs", { method: "POST", body: JSON.stringify(payload) }),
            () => {
                const store = getStore();
                const nextId = store.jobs.reduce((m, j) => Math.max(m, Number(j.id) || 0), 0) + 1;
                const created = { ...payload, id: nextId };
                store.jobs = [created, ...store.jobs];
                saveStore(store);
                addActivity(`Posted job opening "${created.title}"`, "create");
                return created;
            }
        );
    },

    async updateJob(id, payload) {
        return withMockFallback(
            () => apiRequest(`/careers/jobs/${id}`, { method: "PATCH", body: JSON.stringify(payload) }),
            () => {
                const store = getStore();
                let updated = null;
                store.jobs = store.jobs.map((j) => {
                    if (String(j.id) === String(id)) {
                        updated = { ...j, ...payload };
                        return updated;
                    }
                    return j;
                });
                saveStore(store);
                if (updated) addActivity(`Updated job "${updated.title}"`, "update");
                return updated;
            }
        );
    },

    async removeJob(id) {
        return withMockFallback(
            () => apiRequest(`/careers/jobs/${id}`, { method: "DELETE" }),
            () => {
                const store = getStore();
                store.jobs = store.jobs.filter((j) => String(j.id) !== String(id));
                saveStore(store);
                return { success: true };
            }
        );
    },

    async listApplications() {
        return withMockFallback(
            () => apiRequest("/careers/applications"),
            () => [...getStore().applications]
        );
    },

    async updateApplication(id, payload) {
        return withMockFallback(
            () => apiRequest(`/careers/applications/${id}`, { method: "PATCH", body: JSON.stringify(payload) }),
            () => {
                const store = getStore();
                let updated = null;
                store.applications = store.applications.map((a) => {
                    if (String(a.id) === String(id)) {
                        updated = { ...a, ...payload };
                        return updated;
                    }
                    return a;
                });
                saveStore(store);
                if (updated) addActivity(`Updated candidate "${updated.name}" to ${updated.status}`, "crm");
                return updated;
            }
        );
    },
};

