"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
    Clapperboard,
    Play,
    ChevronRight,
    X,
    MessageCircle,
} from "lucide-react";
import { extractYouTubeId } from "../../data/shortsData";
import { usePublishedCms } from "../../services/liveContent";
import "./PropertyReels.css";

// 3 Exact Featured Reels matching user reference screenshot
const REFERENCE_REELS = [
    {
        id: "reel-sky-luxe-joyville",
        title: "Sky Luxe Joyville",
        displayTitle: "Sky Luxe Joyville",
        duration: "1:34",
        location: "Hadapsar, Pune",
        developer: "Shapoorji Pallonji",
        youtubeUrl: "https://www.youtube.com/shorts/GbNlxWtdOvA",
        thumbnail: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=720&q=80",
    },
    {
        id: "reel-kumar-primavera",
        title: "Kumar Primavera",
        displayTitle: "Kumar Primevi...",
        duration: "1:21",
        location: "Hadapsar, Pune",
        developer: "Kumar Properties",
        youtubeUrl: "https://www.youtube.com/shorts/M1sDYNUJQrY",
        thumbnail: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=720&q=80",
    },
    {
        id: "reel-kumar-magna",
        title: "Kumar Magna",
        displayTitle: "Kumar Magnac...",
        duration: "1:42",
        location: "Hadapsar, Pune",
        developer: "Kumar Properties",
        youtubeUrl: "https://www.youtube.com/shorts/v1KcS0G22EQ",
        thumbnail: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=720&q=80",
    },
];

export default function PropertyReels({ property = {} }) {
    const published = usePublishedCms();
    const liveShorts = published?.shorts;
    const [selectedReel, setSelectedReel] = useState(null);

    // Derive locality name from property
    const locality = useMemo(() => {
        if (!property) return "Hadapsar";
        const loc = property.location || property.locality || property.city || "";
        const parts = loc.split(",").map((p) => p.trim()).filter(Boolean);
        return parts[0] || "Hadapsar";
    }, [property]);

    // Build the 3 cards matching reference screenshot
    const displayReels = useMemo(() => {
        // Start with the 3 reference reels
        const list = [...REFERENCE_REELS];

        // If current property has title or video, integrate it seamlessly
        if (property?.title) {
            list[0] = {
                ...list[0],
                title: property.title,
                displayTitle: property.title.length > 16 ? `${property.title.slice(0, 14)}...` : property.title,
                location: property.location || `${locality}, Pune`,
                developer: property.developer || property.builder || "Pune Property Investors",
                thumbnail: property.image || property.featuredImage || property.gallery?.[0] || list[0].thumbnail,
            };
        }

        return list.slice(0, 3);
    }, [property, locality]);

    // Close modal on ESC key
    useEffect(() => {
        const onKeyDown = (e) => {
            if (e.key === "Escape") setSelectedReel(null);
        };
        if (selectedReel) {
            window.addEventListener("keydown", onKeyDown);
            document.body.style.overflow = "hidden";
        }
        return () => {
            window.removeEventListener("keydown", onKeyDown);
            document.body.style.overflow = "";
        };
    }, [selectedReel]);

    return (
        <section className="property-reels-card-section" aria-label="Explore Projects Through Reels">
            {/* Header Block matching Reference Screenshot */}
            <div className="property-reels-header">
                <div className="property-reels-header__left">
                    <div className="property-reels-header__icon-wrap" aria-hidden="true">
                        <Clapperboard size={20} className="property-reels-header__icon" strokeWidth={1.8} />
                    </div>
                    <div className="property-reels-header__text">
                        <h2 className="property-reels-header__title">
                            Explore {locality} Projects Throug...
                        </h2>
                        <p className="property-reels-header__subtitle">
                            Streets &bull; Amenities &bull; Lifestyle &bull; Ove...
                        </p>
                    </div>
                </div>

                <Link href="/shorts" className="property-reels-header__link">
                    <span>Watch All Reels</span>
                    <ChevronRight size={13} strokeWidth={2.4} />
                </Link>
            </div>

            {/* 3 Reel Cards Row (Exact Match to Screenshot) */}
            <div className="property-reels-grid">
                {displayReels.map((reel) => (
                    <div
                        key={reel.id}
                        className="property-reel-item"
                        onClick={() => setSelectedReel(reel)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                                e.preventDefault();
                                setSelectedReel(reel);
                            }
                        }}
                        aria-label={`Watch reel: ${reel.title}`}
                    >
                        <div className="property-reel-item__inner">
                            {/* Thumbnail Image */}
                            <img
                                src={reel.thumbnail}
                                alt={reel.title}
                                loading="lazy"
                                className="property-reel-item__img"
                            />

                            {/* Soft Gradient Overlay */}
                            <div className="property-reel-item__gradient" />

                            {/* Top-Right Duration Badge (e.g. 1:34) */}
                            <div className="property-reel-item__duration">
                                <span>{reel.duration}</span>
                            </div>

                            {/* Center Circular Play Button */}
                            <div className="property-reel-item__play-btn" aria-hidden="true">
                                <Play size={13} fill="currentColor" className="property-reel-play-icon" />
                            </div>

                            {/* Bottom Project Name Pill */}
                            <div className="property-reel-item__pill">
                                <span>{reel.displayTitle}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Video Player Modal */}
            {selectedReel && (
                <div
                    className="property-reel-modal-backdrop"
                    onClick={() => setSelectedReel(null)}
                    role="dialog"
                    aria-modal="true"
                    aria-label={`Playing ${selectedReel.title}`}
                >
                    <div
                        className="property-reel-modal-container"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close button */}
                        <button
                            type="button"
                            onClick={() => setSelectedReel(null)}
                            className="property-reel-modal__close"
                            aria-label="Close reel viewer"
                        >
                            <X size={20} />
                        </button>

                        {/* 9:16 Video Wrapper */}
                        <div className="property-reel-modal__video-wrap">
                            {(() => {
                                const ytId = extractYouTubeId(selectedReel.youtubeUrl);
                                if (ytId) {
                                    return (
                                        <iframe
                                            src={`https://www.youtube-nocookie.com/embed/${ytId}?autoplay=1&playsinline=1&rel=0&modestbranding=1`}
                                            title={selectedReel.title}
                                            className="property-reel-modal__iframe"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        />
                                    );
                                }
                                return (
                                    <video
                                        src={selectedReel.youtubeUrl}
                                        controls
                                        autoPlay
                                        playsInline
                                        className="property-reel-modal__video"
                                    />
                                );
                            })()}
                        </div>

                        {/* Modal Footer Info */}
                        <div className="property-reel-modal__footer">
                            <div className="property-reel-modal__footer-text">
                                <h3>{selectedReel.title}</h3>
                                <p>{selectedReel.location} &bull; {selectedReel.developer}</p>
                            </div>
                            <a
                                href={`https://wa.me/917398174444?text=${encodeURIComponent(
                                    `Hi Pune Property Investors, I watched the reel for ${selectedReel.title} and would like to know more details!`
                                )}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="property-reel-modal__cta-btn"
                            >
                                <MessageCircle size={16} />
                                <span>Enquire</span>
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
