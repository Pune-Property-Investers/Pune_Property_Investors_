"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { X, Volume2, VolumeX, Maximize2 } from "lucide-react";

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

    const shortsList = useMemo(() => {
        // Collect from propertyShorts first (true vertical shorts), fallback to customAds / advertisementData
        const list = [];

        if (Array.isArray(propertyShorts) && propertyShorts.length > 0) {
            propertyShorts.forEach((short) => {
                const vid = resolveVideoId(short);
                if (vid) {
                    list.push({
                        id: short.id,
                        title: short.title,
                        videoId: vid,
                        link: "/shorts",
                    });
                }
            });
        }

        const sourceAds = Array.isArray(customAds) && customAds.length > 0 ? customAds : advertisementData;
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
    }, [customAds]);

    useEffect(() => {
        if (isDismissed || shortsList.length === 0) return undefined;

        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 3000);

        return () => clearTimeout(timer);
    }, [isDismissed, shortsList.length]);

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
