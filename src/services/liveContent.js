"use client";

import { useEffect, useState } from "react";
import { getApiBaseUrl, isBackendConfigured } from "./api";

export const LIVE_SNAPSHOT_KEY = "ppi_live_published_v1";
export const PREVIOUS_SNAPSHOT_KEY = "ppi_live_previous_v1";
export const LIVE_CHANNEL_NAME = "ppi_cms_live_channel";

function notifyLiveTabs(publishedAt) {
    try {
        if ("BroadcastChannel" in window) {
            const channel = new BroadcastChannel(LIVE_CHANNEL_NAME);
            channel.postMessage({
                type: "PPI_CMS_PUBLISHED",
                publishedAt: publishedAt || new Date().toISOString(),
            });
            channel.close();
        }
    } catch {
        // Ignore BroadcastChannel errors
    }
}

export function buildPublishedSnapshot(store) {
    if (!store) return null;
    const homepage = store.homepagePublished || store.homepageDraft || null;
    return {
        version: 1,
        publishedAt: new Date().toISOString(),
        homepage,
        properties: Array.isArray(store.properties)
            ? store.properties.filter((p) => (p.status || "Published") !== "Draft")
            : [],
        projects: Array.isArray(store.projects)
            ? store.projects.filter((p) => (p.publicationStatus || "Published") !== "Draft")
            : [],
        developers: Array.isArray(store.developers) ? store.developers : [],
        locations: Array.isArray(store.locations) ? store.locations : [],
        articles: Array.isArray(store.articles)
            ? store.articles.filter((a) => (a.status || "Published") !== "Draft")
            : [],
        news: Array.isArray(store.news)
            ? store.news.filter((n) => (n.status || "Published") !== "Draft")
            : [],
        shorts: Array.isArray(store.shorts)
            ? store.shorts.filter((s) => s.visible !== false).sort((a, b) => (a.order || 0) - (b.order || 0))
            : [],
        testimonials: Array.isArray(store.testimonials)
            ? store.testimonials.filter((t) => t.visible !== false)
            : [],
        advertisements: Array.isArray(store.advertisements)
            ? store.advertisements.filter((a) => a.visible !== false)
            : [],
        jobs: Array.isArray(store.jobs) ? store.jobs.filter((j) => j.status === "Open") : [],
        settings: store.settings || null,
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

    notifyLiveTabs(snapshot.publishedAt);
    return snapshot;
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
    notifyLiveTabs(prev.publishedAt);
    return prev;
}

export function clearLiveSnapshot() {
    if (typeof window === "undefined") return;
    try {
        localStorage.removeItem(LIVE_SNAPSHOT_KEY);
        localStorage.removeItem(PREVIOUS_SNAPSHOT_KEY);
    } catch {
        // Ignore storage errors
    }
    notifyLiveTabs();
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

