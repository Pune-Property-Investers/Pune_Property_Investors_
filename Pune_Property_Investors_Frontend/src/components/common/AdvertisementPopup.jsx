"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { X, Volume2, VolumeX, Maximize2 } from "lucide-react";

import { propertyShortService } from "../../services/propertyShort.service.js";
import { advertisementService } from "../../services/advertisement.service.js";
import { advertisementPopupService } from "../../services/advertisementPopup.service.js";
import { propertyShorts, extractYouTubeId } from "../../data/shortsData.js";
import advertisementData from "../../data/advertisementData.js";
import "./AdvertisementPopup.css";

function resolveVideoId(item) {
    if (!item) return "";
    return (
        extractYouTubeId(item.youtubeUrl) ||
        extractYouTubeId(item.videoUrl) ||
        extractYouTubeId(item.videoId) ||
        ""
    );
}

function AdvertisementPopup({ customAds }) {
    const [isVisible, setIsVisible] = useState(false);
    const [isDismissed, setIsDismissed] = useState(false);
    const [isMuted, setIsMuted] = useState(true);

    const [popupConfig, setPopupConfig] = useState(null);
    const [dbShorts, setDbShorts] = useState([]);
    const [dbAds, setDbAds] = useState([]);

    useEffect(() => {
        let isMounted = true;

        advertisementPopupService
            .getSettings()
            .then((res) => {
                const data = res?.data || res;
                if (isMounted && data) {
                    setPopupConfig(data);
                    if (data.autoMute !== undefined) {
                        setIsMuted(Boolean(data.autoMute));
                    }
                }
            })
            .catch((err) => console.error("Failed to load popup settings:", err));

        propertyShortService
            .list()
            .then((res) => {
                const list = Array.isArray(res) ? res : res?.data;
                if (isMounted && Array.isArray(list) && list.length > 0) {
                    setDbShorts(list);
                }
            })
            .catch((err) => console.error("Failed to load shorts for popup:", err));

        advertisementService
            .list()
            .then((res) => {
                const list = Array.isArray(res) ? res : res?.data;
                if (isMounted && Array.isArray(list) && list.length > 0) {
                    setDbAds(list);
                }
            })
            .catch((err) => console.error("Failed to load ads for popup:", err));

        return () => {
            isMounted = false;
        };
    }, []);

    const shortsList = useMemo(() => {
        const list = [];

        // 1. Pinned Video if set in MySQL settings
        if (popupConfig?.pinnedVideoId) {
            list.push({
                id: "pinned-popup",
                title: popupConfig.pinnedTitle || "Featured Property Reel",
                videoId: resolveVideoId({ videoId: popupConfig.pinnedVideoId }),
                link: popupConfig.pinnedLink || "/shorts",
            });
        }

        // 2. Database Property Shorts (or fallback to static propertyShorts)
        const sourceShorts = dbShorts.length > 0 ? dbShorts : propertyShorts;
        if (Array.isArray(sourceShorts) && sourceShorts.length > 0) {
            sourceShorts.forEach((short) => {
                const vid = resolveVideoId(short);
                if (vid && !list.some((item) => item.videoId === vid)) {
                    list.push({
                        id: short.id,
                        title: short.title,
                        videoId: vid,
                        link: "/shorts",
                    });
                }
            });
        }

        // 3. Database Advertisements (or customAds / advertisementData)
        const sourceAds =
            Array.isArray(customAds) && customAds.length > 0
                ? customAds
                : dbAds.length > 0
                ? dbAds
                : advertisementData;

        sourceAds.forEach((ad) => {
            const vid = resolveVideoId(ad);
            if (vid && !list.some((item) => item.videoId === vid)) {
                list.push({
                    id: ad.id || vid,
                    title: ad.title || "Featured Property",
                    videoId: vid,
                    link: ad.link || ad.buttonUrl || "/properties",
                });
            }
        });

        return list;
    }, [popupConfig, dbShorts, dbAds, customAds]);

    useEffect(() => {
        if (popupConfig && popupConfig.isEnabled === false) return;
        if (isDismissed || shortsList.length === 0) return undefined;

        const delay = (Number(popupConfig?.delaySeconds) || 3) * 1000;
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, delay);

        return () => clearTimeout(timer);
    }, [isDismissed, shortsList.length, popupConfig]);

    if (isDismissed || !isVisible || shortsList.length === 0) {
        return null;
    }

    const currentShort = shortsList[0];
    const videoId = currentShort.videoId;

    // Shorts embed URL configured for continuous looping, muted autoplay, and full-bleed play
    const videoSrc = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(
        videoId
    )}?autoplay=1&mute=${isMuted ? 1 : 0}&controls=0&playsinline=1&loop=1&playlist=${encodeURIComponent(
        videoId
    )}&rel=0&modestbranding=1&iv_load_policy=3&disablekb=1&fs=0`;

    const handleClose = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsVisible(false);
        setIsDismissed(true);
    };

    const toggleMute = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsMuted((prev) => !prev);
    };

    return (
        <aside
            className="ad-shorts-popup"
            role="dialog"
            aria-label="Property Video Reel"
        >
            {/* Full-Bleed Video Background */}
            <div className="ad-shorts-popup__video-wrap">
                <iframe
                    key={`${videoId}-${isMuted ? "muted" : "unmuted"}`}
                    className="ad-shorts-popup__iframe"
                    src={videoSrc}
                    title={currentShort.title || "Property Short Reel"}
                    allow="autoplay; encrypted-media; picture-in-picture"
                    referrerPolicy="strict-origin-when-cross-origin"
                />
            </div>

            {/* Floating Top Controls */}
            <div className="ad-shorts-popup__controls">
                <button
                    type="button"
                    className="ad-shorts-popup__btn"
                    onClick={toggleMute}
                    aria-label={isMuted ? "Unmute video" : "Mute video"}
                    title={isMuted ? "Unmute" : "Mute"}
                >
                    {isMuted ? <VolumeX size={13} /> : <Volume2 size={13} />}
                </button>

                <button
                    type="button"
                    className="ad-shorts-popup__btn ad-shorts-popup__btn--close"
                    onClick={handleClose}
                    aria-label="Close video"
                    title="Close"
                >
                    <X size={14} />
                </button>
            </div>
        </aside>
    );
}

export default AdvertisementPopup;
