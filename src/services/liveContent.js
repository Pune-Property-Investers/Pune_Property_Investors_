"use client";

import { useEffect, useState } from "react";
import { getApiBaseUrl, isBackendConfigured } from "./api";

export const LIVE_SNAPSHOT_KEY = "ppi_live_published_v1";
export const PREVIOUS_SNAPSHOT_KEY = "ppi_live_previous_v1";
export const SECTION_PREV_KEY = "ppi_live_section_prev_v1";
export const LIVE_CHANNEL_NAME = "ppi_cms_live_channel";

function notifyLiveTabs(publishedAt, sectionKey) {
    try {
        if ("BroadcastChannel" in window) {
            const channel = new BroadcastChannel(LIVE_CHANNEL_NAME);
            channel.postMessage({
                type: "PPI_CMS_PUBLISHED",
                sectionKey: sectionKey || "all",
                publishedAt: publishedAt || new Date().toISOString(),
            });
            channel.close();
        }
    } catch {
        // Ignore BroadcastChannel errors
    }
}

export function extractSectionSlice(sectionKey, store) {
    if (!store) return null;
    switch (sectionKey) {
        case "homepage": {
            const hp = store.homepagePublished || store.homepageDraft || null;
            return hp ? { sections: hp.sections, seo: hp.seo, status: "Published", updatedAt: new Date().toISOString() } : null;
        }
        case "about": {
            const hp = store.homepagePublished || store.homepageDraft || null;
            return hp?.about || null;
        }
        case "properties":
            return Array.isArray(store.properties)
                ? store.properties.filter((p) => (p.status || "Published") !== "Draft")
                : [];
        case "projects":
            return Array.isArray(store.projects)
                ? store.projects.filter((p) => (p.publicationStatus || "Published") !== "Draft")
                : [];
        case "developers":
            return Array.isArray(store.developers) ? store.developers : [];
        case "locations":
            return Array.isArray(store.locations) ? store.locations : [];
        case "articles":
            return Array.isArray(store.articles)
                ? store.articles.filter((a) => (a.status || "Published") !== "Draft")
                : [];
        case "news":
            return Array.isArray(store.news)
                ? store.news.filter((n) => (n.status || "Published") !== "Draft")
                : [];
        case "shorts":
            return Array.isArray(store.shorts)
                ? store.shorts.filter((s) => s.visible !== false).sort((a, b) => (a.order || 0) - (b.order || 0))
                : [];
        case "testimonials":
            return Array.isArray(store.testimonials)
                ? store.testimonials.filter((t) => t.visible !== false)
                : [];
        case "advertisements":
            return Array.isArray(store.advertisements)
                ? store.advertisements.filter((a) => a.visible !== false)
                : [];
        case "careers":
            return Array.isArray(store.jobs) ? store.jobs.filter((j) => j.status === "Open") : [];
        case "settings":
            return store.settings || null;
        case "festivalPopup":
            return store.festivalPopup || null;
        default:
            return null;
    }
}

export function buildPublishedSnapshot(store) {
    if (!store) return null;
    const homepage = store.homepagePublished || store.homepageDraft || null;
    return {
        version: 1,
        publishedAt: new Date().toISOString(),
        homepage,
        properties: extractSectionSlice("properties", store),
        projects: extractSectionSlice("projects", store),
        developers: extractSectionSlice("developers", store),
        locations: extractSectionSlice("locations", store),
        articles: extractSectionSlice("articles", store),
        news: extractSectionSlice("news", store),
        shorts: extractSectionSlice("shorts", store),
        testimonials: extractSectionSlice("testimonials", store),
        advertisements: extractSectionSlice("advertisements", store),
        jobs: extractSectionSlice("careers", store),
        settings: extractSectionSlice("settings", store),
        festivalPopup: extractSectionSlice("festivalPopup", store),
    };
}

export function publishLiveSnapshot(store) {
    if (typeof window === "undefined") return null;
    const snapshot = buildPublishedSnapshot(store);
    if (!snapshot) return null;

    try {
        const currentRaw = localStorage.getItem(LIVE_SNAPSHOT_KEY);
        if (currentRaw) {
            localStorage.setItem(PREVIOUS_SNAPSHOT_KEY, currentRaw);
        }
        localStorage.setItem(LIVE_SNAPSHOT_KEY, JSON.stringify(snapshot));
    } catch {
        // Ignore storage quota issues
    }

    notifyLiveTabs(snapshot.publishedAt, "all");
    return snapshot;
}

function readSectionPrevMap() {
    if (typeof window === "undefined") return {};
    try {
        const raw = localStorage.getItem(SECTION_PREV_KEY);
        return raw ? JSON.parse(raw) : {};
    } catch {
        return {};
    }
}

function writeSectionPrevMap(map) {
    if (typeof window === "undefined") return;
    try {
        localStorage.setItem(SECTION_PREV_KEY, JSON.stringify(map));
    } catch {
        // Ignore storage errors
    }
}

export function hasPreviousSectionSnapshot(sectionKey) {
    const map = readSectionPrevMap();
    return Boolean(map && map[sectionKey]);
}

function getLiveKeyForSection(sectionKey) {
    if (sectionKey === "careers") return "jobs";
    return sectionKey;
}

export function publishSectionSnapshot(sectionKey, store) {
    if (typeof window === "undefined" || !store) return null;
    const currentSnapshot = readLiveSnapshot() || { version: 1 };
    const prevMap = readSectionPrevMap();

    // Save previous value for this specific section before overwriting
    if (sectionKey === "homepage") {
        prevMap[sectionKey] = currentSnapshot.homepage
            ? { sections: currentSnapshot.homepage.sections, seo: currentSnapshot.homepage.seo }
            : null;
    } else if (sectionKey === "about") {
        prevMap[sectionKey] = currentSnapshot.homepage?.about || null;
    } else {
        const liveKey = getLiveKeyForSection(sectionKey);
        if (liveKey in currentSnapshot) {
            prevMap[sectionKey] = currentSnapshot[liveKey];
        }
    }
    writeSectionPrevMap(prevMap);

    const slice = extractSectionSlice(sectionKey, store);
    const nextSnapshot = {
        ...currentSnapshot,
        version: 1,
        publishedAt: new Date().toISOString(),
    };

    if (sectionKey === "homepage") {
        nextSnapshot.homepage = {
            ...(currentSnapshot.homepage || {}),
            ...(slice || {}),
        };
    } else if (sectionKey === "about") {
        nextSnapshot.homepage = {
            ...(currentSnapshot.homepage || {}),
            about: slice,
        };
    } else {
        const liveKey = getLiveKeyForSection(sectionKey);
        nextSnapshot[liveKey] = slice;
    }

    try {
        localStorage.setItem(LIVE_SNAPSHOT_KEY, JSON.stringify(nextSnapshot));
    } catch {
        // Ignore quota errors
    }

    notifyLiveTabs(nextSnapshot.publishedAt, sectionKey);
    return nextSnapshot;
}

export function retrieveSectionPreviousSnapshot(sectionKey) {
    if (typeof window === "undefined") return null;
    const prevMap = readSectionPrevMap();
    const prevValue = prevMap[sectionKey];
    if (!prevValue) return null;

    const currentSnapshot = readLiveSnapshot() || { version: 1 };
    const nextSnapshot = {
        ...currentSnapshot,
        publishedAt: new Date().toISOString(),
    };

    if (sectionKey === "homepage") {
        nextSnapshot.homepage = {
            ...(currentSnapshot.homepage || {}),
            ...prevValue,
        };
    } else if (sectionKey === "about") {
        nextSnapshot.homepage = {
            ...(currentSnapshot.homepage || {}),
            about: prevValue,
        };
    } else {
        const liveKey = getLiveKeyForSection(sectionKey);
        nextSnapshot[liveKey] = prevValue;
    }

    delete prevMap[sectionKey];
    writeSectionPrevMap(prevMap);

    try {
        localStorage.setItem(LIVE_SNAPSHOT_KEY, JSON.stringify(nextSnapshot));
    } catch {
        // Ignore storage errors
    }

    notifyLiveTabs(nextSnapshot.publishedAt, sectionKey);
    return { restoredValue: prevValue, snapshot: nextSnapshot };
}

export function clearSectionLiveOverride(sectionKey) {
    if (typeof window === "undefined") return;
    const prevMap = readSectionPrevMap();
    delete prevMap[sectionKey];
    writeSectionPrevMap(prevMap);

    const currentSnapshot = readLiveSnapshot();
    if (currentSnapshot) {
        if (sectionKey === "homepage" && currentSnapshot.homepage) {
            delete currentSnapshot.homepage.sections;
            delete currentSnapshot.homepage.seo;
        } else if (sectionKey === "about" && currentSnapshot.homepage) {
            delete currentSnapshot.homepage.about;
        } else {
            const liveKey = getLiveKeyForSection(sectionKey);
            delete currentSnapshot[liveKey];
        }
        try {
            localStorage.setItem(LIVE_SNAPSHOT_KEY, JSON.stringify(currentSnapshot));
        } catch {
            // Ignore storage errors
        }
    }

    notifyLiveTabs(new Date().toISOString(), sectionKey);
}

export function readLiveSnapshot() {
    if (typeof window === "undefined") return null;
    try {
        const raw = localStorage.getItem(LIVE_SNAPSHOT_KEY);
        return raw ? JSON.parse(raw) : null;
    } catch {
        return null;
    }
}

export function readPreviousSnapshot() {
    if (typeof window === "undefined") return null;
    try {
        const raw = localStorage.getItem(PREVIOUS_SNAPSHOT_KEY);
        return raw ? JSON.parse(raw) : null;
    } catch {
        return null;
    }
}

export function restorePreviousSnapshot() {
    if (typeof window === "undefined") return null;
    const prev = readPreviousSnapshot();
    if (!prev) return null;
    try {
        localStorage.setItem(LIVE_SNAPSHOT_KEY, JSON.stringify(prev));
        localStorage.removeItem(PREVIOUS_SNAPSHOT_KEY);
    } catch {
        // Ignore storage quota issues
    }
    notifyLiveTabs(prev.publishedAt, "all");
    return prev;
}

export function clearLiveSnapshot() {
    if (typeof window === "undefined") return;
    try {
        localStorage.removeItem(LIVE_SNAPSHOT_KEY);
        localStorage.removeItem(PREVIOUS_SNAPSHOT_KEY);
        localStorage.removeItem(SECTION_PREV_KEY);
    } catch {
        // Ignore storage errors
    }
    notifyLiveTabs(null, "all");
}

export function usePublishedCms() {
    const [snapshot, setSnapshot] = useState(null);

    useEffect(() => {
        const syncFromStorage = () => {
            setSnapshot(readLiveSnapshot());
        };

        syncFromStorage();

        if (isBackendConfigured()) {
            fetch(`${getApiBaseUrl()}/content/public`)
                .then((res) => (res.ok ? res.json() : null))
                .then((payload) => {
                    const data = payload?.data || payload;
                    if (data && (data.homepage || data.sections)) {
                        setSnapshot(data);
                    }
                })
                .catch(() => {
                    // Keep local snapshot fallback cleanly
                });
        }

        const handleStorage = (e) => {
            if (!e.key || e.key === LIVE_SNAPSHOT_KEY) {
                syncFromStorage();
            }
        };
        window.addEventListener("storage", handleStorage);

        let channel = null;
        try {
            if ("BroadcastChannel" in window) {
                channel = new BroadcastChannel(LIVE_CHANNEL_NAME);
                channel.onmessage = (event) => {
                    if (event.data?.type === "PPI_CMS_PUBLISHED") {
                        syncFromStorage();
                    }
                };
            }
        } catch {
            // Ignore unsupported BroadcastChannel
        }

        return () => {
            window.removeEventListener("storage", handleStorage);
            if (channel) channel.close();
        };
    }, []);

    return snapshot;
}
