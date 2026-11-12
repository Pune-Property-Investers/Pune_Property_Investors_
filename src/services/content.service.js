import { apiRequest, withMockFallback } from "./api";
import { getStore, saveStore, addActivity, resetMockStore, createInitialStore } from "./mockStore";
import {
    publishLiveSnapshot,
    restorePreviousSnapshot,
    clearLiveSnapshot,
    publishSectionSnapshot,
    retrieveSectionPreviousSnapshot,
    clearSectionLiveOverride,
} from "./liveContent";

export const contentService = {
    // Homepage Draft & Published CMS
    async getHomepage() {
        return withMockFallback(
            () => apiRequest("/content/homepage"),
            () => {
                const store = getStore();
                return {
                    draft: store.homepageDraft,
                    published: store.homepagePublished,
                };
            }
        );
    },

    async saveHomepageDraft(draftPayload) {
        return withMockFallback(
            () =>
                apiRequest("/content/homepage/draft", {
                    method: "PUT",
                    body: JSON.stringify(draftPayload),
                }),
            () => {
                const store = getStore();
                store.homepageDraft = {
                    ...draftPayload,
                    status: "Draft",
                    updatedAt: new Date().toISOString(),
                };
                saveStore(store);
                addActivity("Saved Homepage & About draft", "update");
                return store.homepageDraft;
            }
        );
    },

    async publishHomepage(payload) {
        return withMockFallback(
            () =>
                apiRequest("/content/homepage/publish", {
                    method: "POST",
                    body: JSON.stringify(payload),
                }),
            () => {
                const store = getStore();
                const publishedData = {
                    ...payload,
                    status: "Published",
                    updatedAt: new Date().toISOString(),
                };
                store.homepageDraft = publishedData;
                store.homepagePublished = publishedData;
                saveStore(store);
                publishLiveSnapshot(store);
                addActivity("Published Homepage sections to live site", "publish");
                return publishedData;
            }
        );
    },

    async publishAllToLiveSite() {
        const store = getStore();
        const draftPayload = store.homepageDraft || store.homepagePublished;
        return withMockFallback(
            () =>
                apiRequest("/content/homepage/publish", {
                    method: "POST",
                    body: JSON.stringify(draftPayload),
                }),
            () => {
                const publishedData = {
                    ...draftPayload,
                    status: "Published",
                    updatedAt: new Date().toISOString(),
                };
                store.homepageDraft = publishedData;
                store.homepagePublished = publishedData;
                saveStore(store);
                const snapshot = publishLiveSnapshot(store);
                addActivity("Published all admin changes to live public website", "publish");
                return snapshot;
            }
        );
    },

    async revertChanges(mode = "original") {
        return withMockFallback(
            () =>
                apiRequest("/content/homepage/revert", {
                    method: "POST",
                    body: JSON.stringify({ mode }),
                }),
            () => {
                if (mode === "previous") {
                    const prevSnapshot = restorePreviousSnapshot();
                    if (prevSnapshot) {
                        const store = getStore();
                        if (prevSnapshot.homepage) {
                            store.homepageDraft = prevSnapshot.homepage;
                            store.homepagePublished = prevSnapshot.homepage;
                        }
                        if (Array.isArray(prevSnapshot.properties)) store.properties = prevSnapshot.properties;
                        if (Array.isArray(prevSnapshot.projects)) store.projects = prevSnapshot.projects;
                        if (Array.isArray(prevSnapshot.locations)) store.locations = prevSnapshot.locations;
                        if (Array.isArray(prevSnapshot.testimonials)) store.testimonials = prevSnapshot.testimonials;
                        if (Array.isArray(prevSnapshot.advertisements)) store.advertisements = prevSnapshot.advertisements;
                        saveStore(store);
                        addActivity("Reverted live website to previous published version", "update");
                        return { mode: "previous", snapshot: prevSnapshot };
                    }
                }

                const fresh = resetMockStore();
                clearLiveSnapshot();
                addActivity("Reverted all changes and restored original website", "update");
                return { mode: "original", store: fresh };
            }
        );
    },

    async publishSection(sectionKey) {
        return withMockFallback(
            () =>
                apiRequest(`/content/sections/${sectionKey}/publish`, {
                    method: "POST",
                }),
            () => {
                const store = getStore();
                if (sectionKey === "homepage" && store.homepageDraft) {
                    store.homepagePublished = {
                        ...(store.homepagePublished || {}),
                        sections: store.homepageDraft.sections,
                        seo: store.homepageDraft.seo,
                        status: "Published",
                        updatedAt: new Date().toISOString(),
                    };
                    saveStore(store);
                } else if (sectionKey === "about" && store.homepageDraft?.about) {
                    store.homepagePublished = {
                        ...(store.homepagePublished || store.homepageDraft),
                        about: store.homepageDraft.about,
                        updatedAt: new Date().toISOString(),
                    };
                    saveStore(store);
                }
                const snapshot = publishSectionSnapshot(sectionKey, store);
                addActivity(`Published "${sectionKey}" changes to live website`, "publish");
                return snapshot;
            }
        );
    },

    async retrieveSection(sectionKey, mode = "original") {
        return withMockFallback(
            () =>
                apiRequest(`/content/sections/${sectionKey}/retrieve`, {
                    method: "POST",
                    body: JSON.stringify({ mode }),
                }),
            () => {
                const store = getStore();

                if (mode === "previous") {
                    const prev = retrieveSectionPreviousSnapshot(sectionKey);
                    if (prev) {
                        if (sectionKey === "homepage" && prev.restoredValue) {
                            store.homepageDraft = { ...(store.homepageDraft || {}), ...prev.restoredValue };
                            store.homepagePublished = { ...(store.homepagePublished || {}), ...prev.restoredValue };
                        } else if (sectionKey === "about" && prev.restoredValue) {
                            store.homepageDraft = { ...(store.homepageDraft || {}), about: prev.restoredValue };
                            store.homepagePublished = { ...(store.homepagePublished || {}), about: prev.restoredValue };
                        } else if (sectionKey === "careers") {
                            store.jobs = prev.restoredValue;
                        } else if (sectionKey in store) {
                            store[sectionKey] = prev.restoredValue;
                        }
                        saveStore(store);
                        addActivity(`Retrieved previous "${sectionKey}" version`, "update");
                        return { mode: "previous", sectionKey };
                    }
                }

                const initial = createInitialStore();
                if (sectionKey === "homepage") {
                    store.homepageDraft = {
                        ...(store.homepageDraft || {}),
                        sections: initial.homepagePublished.sections,
                        seo: initial.homepagePublished.seo,
                        status: "Published",
                    };
                    store.homepagePublished = {
                        ...(store.homepagePublished || {}),
                        sections: initial.homepagePublished.sections,
                        seo: initial.homepagePublished.seo,
                        status: "Published",
                    };
                } else if (sectionKey === "about") {
                    store.homepageDraft = {
                        ...(store.homepageDraft || {}),
                        about: initial.homepagePublished.about,
                    };
                    store.homepagePublished = {
                        ...(store.homepagePublished || {}),
                        about: initial.homepagePublished.about,
                    };
                } else if (sectionKey === "careers") {
                    store.jobs = initial.jobs;
                } else if (sectionKey in initial) {
                    store[sectionKey] = initial[sectionKey];
                }

                saveStore(store);
                clearSectionLiveOverride(sectionKey);
                addActivity(`Retrieved original "${sectionKey}" defaults`, "update");
                return { mode: "original", sectionKey };
            }
        );
    },

    // Shorts / Videos
    async listShorts() {
        return withMockFallback(
            () => apiRequest("/content/shorts"),
            () => [...getStore().shorts].sort((a, b) => (a.order || 0) - (b.order || 0))
        );
    },

    async saveShorts(shorts) {
        return withMockFallback(
            () => apiRequest("/content/shorts/bulk", { method: "PUT", body: JSON.stringify({ shorts }) }),
            () => {
                const store = getStore();
                store.shorts = shorts;
                saveStore(store);
                addActivity("Updated Shorts & Video Reels feed", "update");
                return store.shorts;
            }
        );
    },

    // Testimonials
    async listTestimonials() {
        return withMockFallback(
            () => apiRequest("/content/testimonials"),
            () => [...getStore().testimonials]
        );
    },

    async saveTestimonials(testimonials) {
        return withMockFallback(
            () => apiRequest("/content/testimonials/bulk", { method: "PUT", body: JSON.stringify({ testimonials }) }),
            () => {
                const store = getStore();
                store.testimonials = testimonials;
                saveStore(store);
                addActivity("Updated Customer Testimonials", "update");
                return store.testimonials;
            }
        );
    },

    // Advertisements
    async listAds() {
        return withMockFallback(
            () => apiRequest("/content/advertisements"),
            () => [...getStore().advertisements]
        );
    },

    async saveAds(advertisements) {
        return withMockFallback(
            () => apiRequest("/content/advertisements/bulk", { method: "PUT", body: JSON.stringify({ advertisements }) }),
            () => {
                const store = getStore();
                store.advertisements = advertisements;
                saveStore(store);
                addActivity("Updated Sidebar & Banner Advertisements", "update");
                return store.advertisements;
            }
        );
    },

    async getDashboardOverview() {
        return withMockFallback(
            () => apiRequest("/dashboard/overview"),
            () => {
                const store = getStore();
                return {
                    stats: {
                        totalProperties: store.properties.length,
                        totalProjects: store.projects.length,
                        totalDevelopers: store.developers.length,
                        totalLocations: store.locations.length,
                        newLeads: store.leads.filter((l) => l.status === "New").length,
                        totalLeads: store.leads.length,
                        publishedArticles: store.articles.length + store.news.length,
                        openJobs: store.jobs.filter((j) => j.status === "Open").length,
                    },
                    recentLeads: store.leads.slice(0, 5),
                    recentProperties: store.properties.slice(0, 5),
                    activities: store.activities.slice(0, 8),
                };
            }
        );
    },
};

