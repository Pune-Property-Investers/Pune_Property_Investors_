"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
    ChevronLeft,
    ChevronRight,
    ArrowUpRight,
    Calendar,
    Layers,
    Home,
    Tag,
    Clock,
    Volume2,
    VolumeX,
    Maximize2,
    ExternalLink,
    Sparkles,
    Film,
    ThumbsUp,
    Share2,
    Play,
} from "lucide-react";
import { FaYoutube, FaWhatsapp } from "react-icons/fa";
import "./FeaturedProperties.css";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const WHATSAPP_NUMBER = "917398174444";
const youtubeChannelUrl = "https://www.youtube.com/@PunePropertyInvestor";

export const featuredPuneProjects = [
    {
        id: 1,
        name: "Mantra Magnus",
        brandName: "MANTRA",
        location: "Mundhwa, Pune",
        localityName: "Mundhwa",
        youtubeId: "v1KcS0G22EQ",
        startSeconds: 0,
        youtubeUrl: "https://www.youtube.com/watch?v=v1KcS0G22EQ",
        title: "Mantra Magnus Mundhwa Project Details | 2, 2.5, 3.5 BHK | Vridhi Bhava Concept",
        tagline: "Iconic Vridhi Bhava architectural design concept delivering optimal privacy, 360-degree cross ventilation, and scenic views.",
        completion: "Q4 2026",
        completionSub: "MahaRERA",
        configurations: "2, 2.5 & 3.5 BHK",
        configSub: "5 Towers // 22 Storeys",
        carpet: "420 M²",
        carpetSub: "1,420 - 2,150 SQ.FT",
        price: "₹ 1.55 Cr*",
        priceSub: "Direct Price",
        badge: "SAMPLE FLAT TOUR",
        propertySlug: "mantra-magnus",
        thumbnail: `${basePath}/images/mantra-magnus-shorts-thumb.jpg`,
        siteImages: [
            { url: `${basePath}/images/mantra-magnus-site-elevation.jpg`, label: "Site Elevation & Towers" },
            { url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80", label: "Sample Flat Living Room" },
            { url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80", label: "Grand Entrance & Reflecting Pool" },
            { url: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80", label: "Landscaped Courtyards" },
            { url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80", label: "Master Suite & Private Deck" }
        ],
    },
    {
        id: 2,
        name: "Godrej Elements",
        brandName: "GODREJ",
        location: "Hinjewadi, Pune",
        localityName: "Hinjewadi",
        youtubeId: "M1sDYNUJQrY",
        startSeconds: 203,
        youtubeUrl: "https://www.youtube.com/watch?v=M1sDYNUJQrY&t=203s",
        title: "Godrej Elements Hinjewadi Project Details | 2 & 3 BHK Eco-Luxury Residences",
        tagline: "Eco-architectural high-rises centered on active wellness, smart automation, and panoramic Hinjewadi skyline views.",
        completion: "Q2 2027",
        completionSub: "MahaRERA",
        configurations: "2 & 3 BHK",
        configSub: "6 Towers // 28 Storeys",
        carpet: "380 M²",
        carpetSub: "980 - 1,420 SQ.FT",
        price: "₹ 1.30 Cr*",
        priceSub: "Direct Price",
        badge: "SAMPLE FLAT TOUR",
        propertySlug: "godrej-elements",
        thumbnail: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
        siteImages: [
            { url: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80", label: "Tower Elevation & Skyline" },
            { url: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=800&q=80", label: "Living & Dining Room" },
            { url: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=800&q=80", label: "Rooftop Infinity Pool" },
            { url: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80", label: "Wellness Club & Gym" }
        ],
    },
    {
        id: 3,
        name: "VTP HiLife",
        brandName: "VTP REALTY",
        location: "Kharadi, Pune",
        localityName: "Kharadi",
        youtubeId: "FbWb8gl35BE",
        startSeconds: 0,
        youtubeUrl: "https://www.youtube.com/watch?v=FbWb8gl35BE",
        title: "VTP HiLife Kharadi Project Details | 2 & 3 BHK Riverfront Luxury",
        tagline: "Riverfront promenade lifestyle with Maximum Livable Area (MLA) architectural design in prime New Kharadi.",
        completion: "Q4 2026",
        completionSub: "MahaRERA",
        configurations: "2 & 3 BHK",
        configSub: "8 Towers // 24 Storeys",
        carpet: "360 M²",
        carpetSub: "890 - 1,320 SQ.FT",
        price: "₹ 1.05 Cr*",
        priceSub: "Direct Price",
        badge: "SAMPLE FLAT TOUR",
        propertySlug: "vtp-hilife",
        thumbnail: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
        siteImages: [
            { url: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80", label: "Riverfront Facade" },
            { url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80", label: "Designer Show Flat" },
            { url: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=800&q=80", label: "Olympic-Length Pool" },
            { url: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80", label: "Sky Deck Lounge" }
        ],
    },
    {
        id: 4,
        name: "Kumar Primus",
        brandName: "KUMAR",
        location: "Kalyani Nagar, Pune",
        localityName: "Kalyani Nagar",
        youtubeId: "v1KcS0G22EQ",
        startSeconds: 0,
        youtubeUrl: "https://www.youtube.com/watch?v=v1KcS0G22EQ",
        title: "Kumar Primus Kalyani Nagar | 3 & 4 BHK Bespoke High-Rise Residences",
        tagline: "Bespoke high-rises commanding sweeping views of Koregaon Park skyline with private sundecks and plunge pools.",
        completion: "Ready to Move",
        completionSub: "MahaRERA",
        configurations: "3 & 4 BHK",
        configSub: "3 Towers // 26 Storeys",
        carpet: "540 M²",
        carpetSub: "1,750 - 2,450 SQ.FT",
        price: "₹ 1.85 Cr*",
        priceSub: "Direct Price",
        badge: "SAMPLE FLAT TOUR",
        propertySlug: "kumar-primus",
        thumbnail: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
        siteImages: [
            { url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80", label: "Grand Tower Elevation" },
            { url: "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?auto=format&fit=crop&w=800&q=80", label: "Ultra Luxury Suite" },
            { url: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80", label: "Private Sundeck" }
        ],
    },
    {
        id: 5,
        name: "The Ark Voyage",
        brandName: "TRIBECA",
        location: "Wakad, Pune",
        localityName: "Wakad",
        youtubeId: "M1sDYNUJQrY",
        startSeconds: 203,
        youtubeUrl: "https://www.youtube.com/watch?v=M1sDYNUJQrY&t=203s",
        title: "The Ark Voyage Wakad | 3 & 4 BHK Cruise-Inspired Architecture",
        tagline: "Cruise-inspired towers surrounded by protected green reserves, rooftop sky-bridge, and Trump Tower design pedigree.",
        completion: "Q4 2027",
        completionSub: "MahaRERA",
        configurations: "3 & 4 BHK",
        configSub: "4 Towers // 30 Storeys",
        carpet: "610 M²",
        carpetSub: "1,920 - 2,680 SQ.FT",
        price: "₹ 2.10 Cr*",
        priceSub: "Direct Price",
        badge: "SAMPLE FLAT TOUR",
        propertySlug: "the-ark-voyage",
        thumbnail: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=800&q=80",
        siteImages: [
            { url: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80", label: "The Ark Facade" },
            { url: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80", label: "Duplex Penthouse" },
            { url: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=800&q=80", label: "Sky Promenade" }
        ],
    },
    {
        id: 6,
        name: "Kohinoor Kaleido",
        brandName: "KOHINOOR",
        location: "Wagholi, Pune",
        localityName: "Wagholi",
        youtubeId: "FbWb8gl35BE",
        startSeconds: 0,
        youtubeUrl: "https://www.youtube.com/watch?v=FbWb8gl35BE",
        title: "Kohinoor Kaleido Wagholi | 3 & 4 BHK Urban Forest Residences",
        tagline: "An urban masterpiece celebrating natural sunlight, forested landscape, and innovative residential design in East Pune.",
        completion: "Q1 2027",
        completionSub: "MahaRERA",
        configurations: "3 & 4 BHK",
        configSub: "5 Towers // 22 Storeys",
        carpet: "480 M²",
        carpetSub: "1,450 - 2,200 SQ.FT",
        price: "₹ 1.45 Cr*",
        priceSub: "Direct Price",
        badge: "SAMPLE FLAT TOUR",
        propertySlug: "kohinoor-kaleido",
        thumbnail: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80",
        siteImages: [
            { url: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80", label: "Urban Forest Facade" },
            { url: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80", label: "Bespoke Salon" },
            { url: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=800&q=80", label: "Panoramic Deck" }
        ],
    },
];

/* --------------------------------------------------------------------------
   Mini Gallery Slideshow (Left box in the bottom bar - with smooth slide transition)
   -------------------------------------------------------------------------- */
function SiteImageSlideshow({ images = [], projectName = "Project" }) {
    const [currentIdx, setCurrentIdx] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [touchStartX, setTouchStartX] = useState(0);
    const [touchEndX, setTouchEndX] = useState(0);
    const total = images.length || 1;

    useEffect(() => {
        setCurrentIdx(0);
    }, [projectName]);

    // Automatic slideshow effect (runs smoothly on both mobile and laptop)
    useEffect(() => {
        if (total <= 1 || isPaused) return;
        const timer = setInterval(() => {
            setCurrentIdx((prev) => (prev + 1) % total);
        }, 3400);
        return () => clearInterval(timer);
    }, [total, isPaused]);

    const handlePrev = (e) => {
        if (e && e.stopPropagation) e.stopPropagation();
        setCurrentIdx((prev) => (prev - 1 + total) % total);
    };

    const handleNext = (e) => {
        if (e && e.stopPropagation) e.stopPropagation();
        setCurrentIdx((prev) => (prev + 1) % total);
    };

    const handleMouseEnter = () => {
        if (typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches) {
            setIsPaused(true);
        }
    };

    const handleMouseLeave = () => {
        setIsPaused(false);
    };

    const handleTouchStart = (e) => {
        e.stopPropagation();
        setTouchStartX(e.targetTouches[0].clientX);
    };

    const handleTouchMove = (e) => {
        e.stopPropagation();
        setTouchEndX(e.targetTouches[0].clientX);
    };

    const handleTouchEnd = (e) => {
        e.stopPropagation();
        if (!touchStartX || !touchEndX) return;
        const diff = touchStartX - touchEndX;
        if (diff > 30) {
            handleNext(e);
        } else if (diff < -30) {
            handlePrev(e);
        }
        setTouchStartX(0);
        setTouchEndX(0);
    };

    const currentImg = images[currentIdx] || images[0] || {};
    const imgLabel = typeof currentImg === "object" && currentImg.label ? currentImg.label : "Site Elevation & Towers";

    return (
        <div
            className="pune-gallery-card"
            aria-label={`${projectName} gallery`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            {/* Sliding Image Track (Slideshow Effect) */}
            <div
                className="pune-gallery-card__track"
                style={{ transform: `translateX(-${currentIdx * 100}%)` }}
            >
                {images.map((img, idx) => {
                    const url = typeof img === "string" ? img : img.url;
                    const label = typeof img === "object" && img.label ? img.label : `Photo ${idx + 1}`;
                    return (
                        <img
                            key={idx}
                            src={url}
                            alt={`${projectName} - ${label}`}
                            className="pune-gallery-slide-img"
                            loading="lazy"
                        />
                    );
                })}
            </div>
            <div className="pune-gallery-card__overlay" />

            {/* Top Bar: • GALLERY badge + 01/05 Counter */}
            <div className="pune-gallery-card__top">
                <span className="pune-gallery-card__badge">
                    <span className="pune-gallery-card__badge-dot" />
                    <span>GALLERY</span>
                </span>
                <span className="pune-gallery-card__counter">
                    {String(currentIdx + 1).padStart(2, "0")}/{String(total).padStart(2, "0")}
                </span>
            </div>

            {/* Bottom Content: Title + Sub-row with (< > buttons) and (Pagination dots) */}
            <div className="pune-gallery-card__bottom">
                <h4 className="pune-gallery-card__title" title={imgLabel}>
                    {imgLabel}
                </h4>

                <div className="pune-gallery-card__footer-row">
                    {/* Mini Arrow buttons < > */}
                    <div className="pune-gallery-card__arrows">
                        <button
                            type="button"
                            onClick={handlePrev}
                            className="pune-gallery-card__arrow-btn"
                            aria-label="Previous gallery image"
                        >
                            <ChevronLeft size={13} strokeWidth={2.4} />
                        </button>
                        <button
                            type="button"
                            onClick={handleNext}
                            className="pune-gallery-card__arrow-btn"
                            aria-label="Next gallery image"
                        >
                            <ChevronRight size={13} strokeWidth={2.4} />
                        </button>
                    </div>

                    {/* Active Gold Pill + Grey Dots Indicator */}
                    <div className="pune-gallery-card__dots" aria-label="Gallery slide indicators">
                        {images.map((_, idx) => (
                            <button
                                key={idx}
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setCurrentIdx(idx);
                                }}
                                className={`pune-gallery-card__dot ${
                                    idx === currentIdx ? "pune-gallery-card__dot--active" : ""
                                }`}
                                aria-label={`Go to photo ${idx + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

/* --------------------------------------------------------------------------
   Main FeaturedProperties Component - Multi-Container Sideways Project Slideshow
   -------------------------------------------------------------------------- */
function extractYtId(url, fallbackId) {
    if (url) {
        const m = String(url).match(/(?:v=|\/embed\/|youtu\.be\/|\/shorts\/)([a-zA-Z0-9_-]{11})/);
        if (m) return m[1];
    }
    return fallbackId || "";
}

export default function FeaturedProperties({ previewData }) {
    const activeProjects =
        Array.isArray(previewData?.items) && previewData.items.length > 0
            ? previewData.items
            : featuredPuneProjects;
    const [activeIndex, setActiveIndex] = useState(0);
    const [isMuted, setIsMuted] = useState(true);
    const [isFullSize, setIsFullSize] = useState(true);
    const [likedProjects, setLikedProjects] = useState({});
    const [touchStartX, setTouchStartX] = useState(0);
    const [touchEndX, setTouchEndX] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const stageContainerRef = useRef(null);

    const totalSlides = activeProjects.length;

    const handlePrevProject = () => {
        setActiveIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
    };

    const handleNextProject = () => {
        setActiveIndex((prev) => (prev + 1) % totalSlides);
    };

    const toggleSound = () => {
        setIsMuted((prev) => !prev);
    };

    const toggleFullscreen = () => {
        if (!stageContainerRef.current) return;
        if (!document.fullscreenElement) {
            stageContainerRef.current.requestFullscreen().catch(() => {});
        } else {
            document.exitFullscreen().catch(() => {});
        }
    };

    const toggleLike = (projectId) => {
        setLikedProjects((prev) => ({ ...prev, [projectId]: !prev[projectId] }));
    };

    const handleShare = (project, e) => {
        e.stopPropagation();
        if (typeof navigator !== "undefined" && navigator.share) {
            navigator.share({
                title: project.name,
                text: `${project.title} - Pune Property Investor`,
                url: window.location.href,
            }).catch(() => {});
        } else if (typeof navigator !== "undefined" && navigator.clipboard) {
            navigator.clipboard.writeText(window.location.href);
            alert("Property link copied to clipboard!");
        }
    };

    const handleWhatsApp = (project, e) => {
        e.stopPropagation();
        const msg = `Hello Pune Property Investor, I am interested in ${project.name} (${project.location}) starting at ${project.price}. Please share project details, brochure, and sample flat visit appointment.`;
        const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
        window.open(url, "_blank", "noopener,noreferrer");
    };

    // Keyboard Arrow Left/Right controls
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "ArrowLeft") handlePrevProject();
            else if (e.key === "ArrowRight") handleNextProject();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [totalSlides]);

    // Touch Swipe Handlers for mobile & tablet
    const handleTouchStart = (e) => {
        setTouchStartX(e.targetTouches[0].clientX);
    };

    const handleTouchMove = (e) => {
        setTouchEndX(e.targetTouches[0].clientX);
    };

    const handleTouchEnd = () => {
        if (!touchStartX || !touchEndX) return;
        const diff = touchStartX - touchEndX;
        if (diff > 45) {
            handleNextProject();
        } else if (diff < -45) {
            handlePrevProject();
        }
        setTouchStartX(0);
        setTouchEndX(0);
    };

    // Mouse Drag Handlers for laptop
    const handleMouseDown = (e) => {
        setIsDragging(true);
        setTouchStartX(e.clientX);
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        setTouchEndX(e.clientX);
    };

    const handleMouseUp = () => {
        if (!isDragging) return;
        setIsDragging(false);
        if (!touchStartX || !touchEndX) return;
        const diff = touchStartX - touchEndX;
        if (diff > 50) {
            handleNextProject();
        } else if (diff < -50) {
            handlePrevProject();
        }
        setTouchStartX(0);
        setTouchEndX(0);
    };

    return (
        <section
            className="pune-projects-showcase-section"
            id="featured-properties"
            aria-label="Projects in Pune Showcase"
        >
            <div className="pune-projects-showcase-container">
                {/* Section Header (Curated Asset Classes Style) */}
                <div className="pune-projects-header">
                    <div className="pune-projects-eyebrow-wrap">
                        <span className="pune-projects-eyebrow-line" />
                        <span className="pune-projects-eyebrow">
                            <Sparkles size={13} /> {previewData?.eyebrow || "CURATED ASSET CLASSES"}
                        </span>
                        <span className="pune-projects-eyebrow-line" />
                    </div>

                    <h2 className="pune-projects-title">
                        {previewData?.heading ? (
                            previewData.heading
                        ) : (
                            <>
                                Properties in <span>Pune</span>
                            </>
                        )}
                    </h2>

                    <p className="pune-projects-subtitle">
                        {previewData?.subtitle ||
                            "From high-rise riverfront apartments to private gated villas and high-yield commercial spaces across Pune."}
                    </p>
                </div>

                {/* Slideshow Viewport: Each Project has its Own Distinct Slide Container */}
                <div
                    className="pune-projects-slider-wrapper"
                    ref={stageContainerRef}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                >
                    <div
                        className="pune-projects-slider-track"
                        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
                    >
                        {activeProjects.map((project, pIdx) => {
                            const isCurrent = pIdx === activeIndex;
                            const isLiked = !!likedProjects[project.id];
                            const resolvedYtId = extractYtId(project.youtubeUrl, project.youtubeId);

                            return (
                                <div key={project.id} className="pune-project-slide">
                                    <div className="pune-project-card">
                                        {/* TOP HALF: Video / Media Stage */}
                                        <div className={`pune-project-stage ${isFullSize ? "pune-project-stage--fill" : ""}`}>
                                            {/* Huge Typography Watermark on Left Stage */}
                                            <div className="pune-project-stage__watermark" aria-hidden="true">
                                                {project.brandName}
                                            </div>

                                            {/* Top Controls Row (Matches Reference Exactly) */}
                                            <div className="pune-project-stage__top-row">
                                                {/* Left Badges: SAMPLE FLAT TOUR + PPI SHORTS */}
                                                <div className="pune-project-stage__left-badges">
                                                    <div className="pune-project-stage__tour-badge">
                                                        <span className="pune-project-stage__tour-dot" />
                                                        <span>{project.badge}</span>
                                                    </div>

                                                    <a
                                                        href={project.youtubeUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="pune-stage-pill-btn pune-stage-pill-btn--shorts"
                                                        title="Watch on PPI Shorts"
                                                    >
                                                        <span className="pune-stage-pill-dot--white" />
                                                        <span>PPI SHORTS</span>
                                                    </a>
                                                </div>

                                                {/* Right Action Controls: Sound Off, Fullscreen, YouTube */}
                                                <div className="pune-project-stage__top-actions">
                                                    <button
                                                        type="button"
                                                        onClick={toggleSound}
                                                        className="pune-stage-pill-btn"
                                                        title={isMuted ? "Turn Sound On" : "Turn Sound Off"}
                                                    >
                                                        {isMuted ? <VolumeX size={13} /> : <Volume2 size={13} />}
                                                        <span>{isMuted ? "Sound Off" : "Sound On"}</span>
                                                    </button>

                                                    <button
                                                        type="button"
                                                        onClick={toggleFullscreen}
                                                        className="pune-stage-pill-btn pune-stage-pill-btn--icon"
                                                        title="View Fullscreen"
                                                    >
                                                        <Maximize2 size={13} />
                                                    </button>

                                                    <a
                                                        href={project.youtubeUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="pune-stage-yt-btn"
                                                        aria-label="Open YouTube"
                                                        title="Open YouTube video"
                                                    >
                                                        <FaYoutube size={15} color="#ffffff" />
                                                        <ExternalLink size={11} color="rgba(255,255,255,0.85)" />
                                                    </a>
                                                </div>
                                            </div>

                                            {/* Side Navigation Arrow: Left (Slides sideways) */}
                                            <button
                                                type="button"
                                                onClick={handlePrevProject}
                                                className="pune-stage-nav-arrow pune-stage-nav-arrow--left"
                                                aria-label="Previous property"
                                                title="Previous property"
                                            >
                                                <ChevronLeft size={22} />
                                            </button>

                                            {/* Center Stage: Widescreen Video Player or Poster */}
                                            <div className="pune-project-stage__video-frame">
                                                {isCurrent ? (
                                                    <iframe
                                                        src={`https://www.youtube-nocookie.com/embed/${resolvedYtId}?autoplay=1&mute=${
                                                            isMuted ? 1 : 0
                                                        }&loop=1&playlist=${resolvedYtId}&controls=1&modestbranding=1&rel=0&playsinline=1${
                                                            project.startSeconds ? `&start=${project.startSeconds}` : ""
                                                        }`}
                                                        title={project.name}
                                                        className="pune-project-stage__iframe"
                                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                        allowFullScreen
                                                    />
                                                ) : (
                                                    <div className="pune-project-stage__poster">
                                                        <img
                                                            src={project.thumbnail}
                                                            alt={project.name}
                                                            className="pune-project-stage__poster-img"
                                                            loading="lazy"
                                                        />
                                                        <div className="pune-project-stage__poster-overlay">
                                                            <div className="pune-project-stage__poster-play">
                                                                <Play size={28} fill="#ffffff" color="#ffffff" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Watermark logo badge in top right of video */}
                                                <div className="pune-video-watermark-pill" aria-hidden="true">
                                                    <img
                                                        src={`${basePath}/images/logo.png`}
                                                        alt="PPI Logo"
                                                        className="pune-video-watermark-logo"
                                                    />
                                                </div>
                                            </div>

                                            {/* Right Action Column (Matches Reference Image) */}
                                            <div className="pune-stage-right-actions">
                                                {/* Like Button */}
                                                <button
                                                    type="button"
                                                    onClick={() => toggleLike(project.id)}
                                                    className={`pune-stage-side-circle-btn ${isLiked ? "pune-stage-side-circle-btn--liked" : ""}`}
                                                    aria-label="Like property"
                                                    title="Like property"
                                                >
                                                    <ThumbsUp size={16} />
                                                </button>

                                                {/* Next Property Arrow with Glowing Green Border */}
                                                <button
                                                    type="button"
                                                    onClick={handleNextProject}
                                                    className="pune-stage-side-circle-btn pune-stage-side-circle-btn--next"
                                                    aria-label="Next property"
                                                    title="Next property"
                                                >
                                                    <ChevronRight size={20} />
                                                </button>

                                                {/* Share Button */}
                                                <button
                                                    type="button"
                                                    onClick={(e) => handleShare(project, e)}
                                                    className="pune-stage-side-circle-btn"
                                                    aria-label="Share property"
                                                    title="Share property"
                                                >
                                                    <Share2 size={16} />
                                                </button>

                                                {/* White Circular CTA with Arrow */}
                                                <Link
                                                    href={`/buy`}
                                                    className="pune-stage-circle-cta"
                                                    aria-label={`View ${project.name} details`}
                                                    title="View details"
                                                >
                                                    <ArrowUpRight size={18} strokeWidth={2.4} />
                                                </Link>
                                            </div>

                                            {/* Bottom Stage Overlay: Project Details Headline */}
                                            <div className="pune-project-stage__bottom-info">
                                                <div className="pune-project-stage__text">
                                                    <h3 className="pune-project-stage__title">
                                                        {project.title}
                                                    </h3>
                                                    <p className="pune-project-stage__desc">
                                                        {project.tagline}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* BOTTOM HALF: White Bar (Gallery Preview + 4 Specs + Actions) */}
                                        <div className="pune-project-bottom-bar">
                                            {/* LEFT COLUMN: Gallery Preview Card matching reference */}
                                            <div className="pune-project-bottom-bar__left">
                                                <SiteImageSlideshow
                                                    images={project.siteImages}
                                                    projectName={project.name}
                                                />
                                            </div>

                                            {/* RIGHT COLUMN: 4 Spec Cards + Bottom Action Row */}
                                            <div className="pune-project-bottom-bar__right">
                                                {/* 4 Specification Cards in a Row */}
                                                <div className="pune-project-specs-grid">
                                                    {/* 1. COMPLETION */}
                                                    <div className="pune-spec-card">
                                                        <div className="pune-spec-card__header">
                                                            <Calendar size={14} className="pune-spec-card__icon" />
                                                            <span className="pune-spec-card__label">COMPLETION</span>
                                                        </div>
                                                        <strong className="pune-spec-card__val">
                                                            {project.completion}
                                                        </strong>
                                                        <span className="pune-spec-card__sub">
                                                            {project.completionSub}
                                                        </span>
                                                    </div>

                                                    {/* 2. CONFIG */}
                                                    <div className="pune-spec-card">
                                                        <div className="pune-spec-card__header">
                                                            <Layers size={14} className="pune-spec-card__icon" />
                                                            <span className="pune-spec-card__label">CONFIG</span>
                                                        </div>
                                                        <strong className="pune-spec-card__val">
                                                            {project.configurations}
                                                        </strong>
                                                        <span className="pune-spec-card__sub">
                                                            {project.configSub}
                                                        </span>
                                                    </div>

                                                    {/* 3. CARPET */}
                                                    <div className="pune-spec-card">
                                                        <div className="pune-spec-card__header">
                                                            <Home size={14} className="pune-spec-card__icon" />
                                                            <span className="pune-spec-card__label">CARPET</span>
                                                        </div>
                                                        <strong className="pune-spec-card__val">
                                                            {project.carpet}
                                                        </strong>
                                                        <span className="pune-spec-card__sub">
                                                            {project.carpetSub}
                                                        </span>
                                                    </div>

                                                    {/* 4. PRICE */}
                                                    <div className="pune-spec-card">
                                                        <div className="pune-spec-card__header">
                                                            <Tag size={14} className="pune-spec-card__icon" />
                                                            <span className="pune-spec-card__label">PRICE</span>
                                                        </div>
                                                        <strong className="pune-spec-card__val">
                                                            {project.price}
                                                        </strong>
                                                        <span className="pune-spec-card__sub">
                                                            {project.priceSub}
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Bottom Action Row (Navigation Controls + WhatsApp + View Details) */}
                                                <div className="pune-project-action-row">
                                                    <div className="pune-project-action-row__left">
                                                        {/* Arrow buttons to slide sideways */}
                                                        <div className="pune-action-nav-btns">
                                                            <button
                                                                type="button"
                                                                onClick={handlePrevProject}
                                                                className="pune-action-nav-btn"
                                                                aria-label="Previous project"
                                                            >
                                                                <ChevronLeft size={15} />
                                                            </button>
                                                            <button
                                                                type="button"
                                                                onClick={handleNextProject}
                                                                className="pune-action-nav-btn"
                                                                aria-label="Next project"
                                                            >
                                                                <ChevronRight size={15} />
                                                            </button>
                                                        </div>

                                                        {/* Counter (01 / 06) */}
                                                        <span className="pune-action-counter">
                                                            <strong>{String(pIdx + 1).padStart(2, "0")}</strong>
                                                            <span className="pune-action-counter__sep">/</span>
                                                            <span>{String(totalSlides).padStart(2, "0")}</span>
                                                        </span>

                                                        {/* Project Name • Locality (Desktop/Laptop) */}
                                                        <span className="pune-action-project-name">
                                                            {project.name} • {project.localityName}
                                                        </span>
                                                    </div>

                                                    <div className="pune-project-action-row__right">
                                                        <button
                                                            type="button"
                                                            onClick={(e) => handleWhatsApp(project, e)}
                                                            className="pune-action-whatsapp-btn"
                                                            aria-label="Connect on WhatsApp"
                                                            title="Connect on WhatsApp"
                                                        >
                                                            <FaWhatsapp size={15} />
                                                        </button>

                                                        <Link
                                                            href="/buy"
                                                            className="pune-action-details-link"
                                                        >
                                                            <span>View Details</span>
                                                            <span className="pune-action-details-arrow">→</span>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Bottom Pagination Dots (Active Gold Pill + Grey Dots for the 6 projects) */}
                <div className="pune-showcase-pagination" aria-label="Slide indicators">
                    {activeProjects.map((_, idx) => (
                        <button
                            key={idx}
                            type="button"
                            onClick={() => setActiveIndex(idx)}
                            className={`pune-showcase-dot ${
                                idx === activeIndex ? "pune-showcase-dot--active" : ""
                            }`}
                            aria-label={`Jump to slide ${idx + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
