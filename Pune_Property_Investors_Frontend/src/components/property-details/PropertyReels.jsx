"use client";

import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import Link from "next/link";
import {
    Clapperboard,
    Play,
    ChevronLeft,
    ChevronRight,
    X,
    MessageCircle,
} from "lucide-react";
import { propertyShorts, extractYouTubeId } from "../../data/shortsData";
import { usePublishedCms } from "../../services/liveContent";
import { propertyShortService } from "../../services/propertyShort.service";
import "./PropertyReels.css";

// 3 Exact Featured Reels matching user reference screenshot
const REFERENCE_REELS = [
    {
        id: "reel-sky-luxe-joyville",
        title: "Sky Luxe Joyville",
        displayTitle: "Premium 2 BHK ...",
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

// Fallback high-res real estate photography for shorts
const FALLBACK_THUMBNAILS = [
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=720&q=80",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=720&q=80",
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=720&q=80",
    "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&w=720&q=80",
    "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=720&q=80",
];

const FALLBACK_DURATIONS = ["1:15", "1:28", "1:45", "1:30", "1:50", "1:22", "1:39"];

export default function PropertyReels({ property = null, previewData = null }) {
    const published = usePublishedCms();
    const [fetchedReels, setFetchedReels] = useState([]);
    const [selectedReel, setSelectedReel] = useState(null);

    useEffect(() => {
        let isMounted = true;
        const loadReels = async () => {
            try {
                const res = await propertyShortService.list();
                const list = Array.isArray(res) ? res : res?.data;
                if (isMounted && Array.isArray(list) && list.length > 0) {
                    setFetchedReels(list);
                }
            } catch (err) {
                console.error("Failed to load property reels from DB:", err);
            }
        };
        loadReels();
        return () => {
            isMounted = false;
        };
    }, []);

    const trackRef = useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const isDraggingRef = useRef(false);
    const startXRef = useRef(0);
    const scrollLeftRef = useRef(0);
    const hasMovedRef = useRef(false);

    // Derive locality name from property if provided
    const locality = useMemo(() => {
        if (!property) return "Pune";
        const loc = property.location || property.locality || property.city || "";
        const parts = loc.split(",").map((p) => p.trim()).filter(Boolean);
        return parts[0] || "Pune";
    }, [property]);

    // Build the rich scrollable shorts cards list
    const displayReels = useMemo(() => {
        // Priority 1: Live DB records
        let list = fetchedReels.length > 0 ? [...fetchedReels] : [...REFERENCE_REELS];

        // Gather shorts from CMS or propertyShorts only if DB list is empty
        if (fetchedReels.length === 0) {
            const cmsShorts = Array.isArray(published?.shorts)
                ? published.shorts.filter((s) => s.visible !== false)
                : [];
            const sourceShorts = cmsShorts.length > 0 ? cmsShorts : propertyShorts;

            // Add additional shorts into the list
            sourceShorts.forEach((short, idx) => {
                const ytId = extractYouTubeId(short.youtubeUrl);
                if (!ytId) return;

                // Avoid duplicating exact YouTube ID
                if (list.some((r) => extractYouTubeId(r.youtubeUrl) === ytId && r.title === short.title)) {
                    return;
                }

                const cleanTitle = short.title || "Luxury Property Tour";
                const displayTitle = cleanTitle.length > 15 ? `${cleanTitle.slice(0, 13)}...` : cleanTitle;
                const fallbackThumb = FALLBACK_THUMBNAILS[idx % FALLBACK_THUMBNAILS.length];
                const ytThumb = `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`;

                list.push({
                    id: short.id || `short-${idx}`,
                    title: cleanTitle,
                    displayTitle,
                    duration: short.duration || FALLBACK_DURATIONS[idx % FALLBACK_DURATIONS.length],
                    location: short.location || `${short.developer || "Prime"}, Pune`,
                    developer: short.developer || "Pune Property Investors",
                    youtubeUrl: short.youtubeUrl,
                    thumbnail: short.thumbnail || ytThumb || fallbackThumb,
                });
            });
        }

        // If specific property has title or video, integrate it seamlessly at position 0
        if (property?.title && list.length > 0) {
            list[0] = {
                ...list[0],
                title: property.title,
                displayTitle: property.title.length > 16 ? `${property.title.slice(0, 14)}...` : property.title,
                location: property.location || `${locality}, Pune`,
                developer: property.developer || property.builder || "Pune Property Investors",
                thumbnail: property.image || property.featuredImage || property.gallery?.[0] || list[0].thumbnail,
                youtubeUrl: property.youtubeUrl || property.videoUrl || list[0].youtubeUrl,
            };
        }

        return list;
    }, [fetchedReels, property, locality, published?.shorts]);

    // Check scroll boundaries for arrows
    const checkScroll = useCallback(() => {
        const el = trackRef.current;
        if (!el) return;
        setCanScrollLeft(el.scrollLeft > 10);
        setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
    }, []);

    useEffect(() => {
        const el = trackRef.current;
        if (!el) return;
        checkScroll();
        el.addEventListener("scroll", checkScroll, { passive: true });
        window.addEventListener("resize", checkScroll);
        return () => {
            el.removeEventListener("scroll", checkScroll);
            window.removeEventListener("resize", checkScroll);
        };
    }, [checkScroll]);

    // Smooth horizontal scroll handler for arrow buttons (scrolls 1 frame of 3 containers)
    const handleScroll = (direction) => {
        const el = trackRef.current;
        if (!el) return;
        const scrollAmount = el.clientWidth;
        el.scrollBy({
            left: direction === "left" ? -scrollAmount : scrollAmount,
            behavior: "smooth",
        });
    };

    // Mouse drag to scroll handlers for desktop convenience
    const handleMouseDown = (e) => {
        const el = trackRef.current;
        if (!el) return;
        isDraggingRef.current = true;
        hasMovedRef.current = false;
        startXRef.current = e.pageX - el.offsetLeft;
        scrollLeftRef.current = el.scrollLeft;
    };

    const handleMouseMove = (e) => {
        if (!isDraggingRef.current) return;
        const el = trackRef.current;
        if (!el) return;
        const x = e.pageX - el.offsetLeft;
        const walk = (x - startXRef.current) * 1.4;
        if (Math.abs(walk) > 6) {
            hasMovedRef.current = true;
        }
        el.scrollLeft = scrollLeftRef.current - walk;
    };

    const handleMouseUp = () => {
        isDraggingRef.current = false;
    };

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

    const titleText = previewData?.heading || (property ? `Explore ${locality} Projects Through Reels` : "Explore Pune Projects Through Reels");
    const subtitleText = previewData?.subtitle || "Streets • Amenities • Lifestyle • Walkthroughs";

    return (
        <section className="property-reels-card-section" aria-label="Explore Projects Through Reels">
            {/* Header Block matching Reference Screenshot + Scroll Arrow Controls */}
            <div className="property-reels-header">
                <div className="property-reels-header__left">
                    <div className="property-reels-header__icon-wrap" aria-hidden="true">
                        <Clapperboard size={20} className="property-reels-header__icon" strokeWidth={1.8} />
                    </div>
                    <div className="property-reels-header__text">
                        <h2 className="property-reels-header__title" title={titleText}>
                            {titleText}
                        </h2>
                        <p className="property-reels-header__subtitle" title={subtitleText}>
                            {subtitleText}
                        </p>
                    </div>
                </div>

                <div className="property-reels-header__right">
                    {/* Scroll Arrow Buttons for effortless container navigation */}
                    <div className="property-reels-nav-controls" aria-label="Scroll controls">
                        <button
                            type="button"
                            className="property-reels-nav-btn property-reels-nav-btn--prev"
                            onClick={() => handleScroll("left")}
                            disabled={!canScrollLeft}
                            aria-label="Scroll reels left"
                        >
                            <ChevronLeft size={16} strokeWidth={2.4} />
                        </button>
                        <button
                            type="button"
                            className="property-reels-nav-btn property-reels-nav-btn--next"
                            onClick={() => handleScroll("right")}
                            disabled={!canScrollRight}
                            aria-label="Scroll reels right"
                        >
                            <ChevronRight size={16} strokeWidth={2.4} />
                        </button>
                    </div>

                    <Link href="/shorts" className="property-reels-header__link">
                        <span>Watch All Reels</span>
                        <ChevronRight size={13} strokeWidth={2.4} />
                    </Link>
                </div>
            </div>

            {/* Reel Cards Container with Smooth Scroll Effect & Continuous Video In Play */}
            <div className="property-reels-scroll-wrapper">
                <div
                    ref={trackRef}
                    className="property-reels-grid property-reels-grid--scrollable"
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                >
                    {displayReels.map((reel) => {
                        const ytId = extractYouTubeId(reel.youtubeUrl);

                        return (
                            <div
                                key={reel.id}
                                className="property-reel-item"
                                onClick={() => {
                                    if (!hasMovedRef.current) {
                                        setSelectedReel(reel);
                                    }
                                }}
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
                                    {/* Continuous Video In Play (Full-bleed muted looping playback) */}
                                    {ytId ? (
                                        <div className="property-reel-item__video-crop">
                                            <iframe
                                                src={`https://www.youtube-nocookie.com/embed/${encodeURIComponent(
                                                    ytId
                                                )}?autoplay=1&mute=1&controls=0&playsinline=1&loop=1&playlist=${encodeURIComponent(
                                                    ytId
                                                )}&rel=0&modestbranding=1&iv_load_policy=3&disablekb=1&fs=0`}
                                                title={reel.title}
                                                className="property-reel-item__iframe"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                tabIndex={-1}
                                                loading="lazy"
                                            />
                                        </div>
                                    ) : (
                                        /* High-Res Fallback Thumbnail */
                                        <img
                                            src={reel.thumbnail}
                                            alt={reel.title}
                                            loading="lazy"
                                            className="property-reel-item__img"
                                            draggable={false}
                                        />
                                    )}

                                    {/* Soft Gradient Overlay */}
                                    <div className="property-reel-item__gradient" />

                                    {/* Top-Right Duration Badge (e.g. 1:34) */}
                                    <div className="property-reel-item__duration">
                                        <span>{reel.duration || "1:30"}</span>
                                    </div>

                                    {/* Center Circular Play Button */}
                                    <div className="property-reel-item__play-btn" aria-hidden="true">
                                        <Play size={11} fill="currentColor" className="property-reel-play-icon" />
                                    </div>

                                    {/* Bottom Project Name Pill */}
                                    <div className="property-reel-item__pill">
                                        <span>{reel.displayTitle || reel.title}</span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Video Player Modal (Full screen view with audio and WhatsApp Enquiry) */}
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

                        {/* 9:16 Video Wrapper with Audio */}
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
