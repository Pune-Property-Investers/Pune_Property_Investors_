"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import {
    ChevronLeft,
    ChevronRight,
    ArrowRight,
    Maximize2,
    Play,
    Pause,
    Sparkles,
    Scale,
    Heart,
    Camera,
    MapPin,
} from "lucide-react";
import "./NewLaunchProjects.css";

/* 8 Distinct New Launch Projects with full photography and specifications */
const newLaunchProjects = [
    {
        id: 1,
        title: "Gated Villa NA Plot with Clubhouse Access",
        propertyType: "Plot",
        typeBadge: "NA Plot",
        price: "₹1.35 Cr",
        rate: "₹5,625/sq.ft",
        area: "2,400 sq.ft",
        location: "Phase 3, Megapolis Circle, Hinjewadi",
        images: [
            "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1400&q=85",
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1400&q=85",
        ],
        isFeatured: true,
        link: "/buy?project=Villa%20NA%20Plot%20Hinjewadi",
    },
    {
        id: 2,
        title: "Mantra Magnus Riverside Residences",
        propertyType: "Apartment",
        typeBadge: "Luxury Suite",
        price: "₹1.25 Cr",
        rate: "₹7,200/sq.ft",
        area: "1,712 sq.ft",
        location: "Mundhwa-Kharadi Bridge, Pune",
        images: [
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85",
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85",
        ],
        isFeatured: true,
        link: "/buy?project=Mantra%20Magnus",
    },
    {
        id: 3,
        title: "Godrej Elements Botanical Smart Condos",
        propertyType: "Condo",
        typeBadge: "Eco Luxury",
        price: "₹1.30 Cr",
        rate: "₹8,965/sq.ft",
        area: "1,450 sq.ft",
        location: "Hinjewadi Phase 1, Pune",
        images: [
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85",
            "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1400&q=85",
        ],
        isFeatured: true,
        link: "/buy?project=Godrej%20Elements",
    },
    {
        id: 4,
        title: "The Aurelia High-Street Mansions",
        propertyType: "Sky Villa",
        typeBadge: "Sky Villa",
        price: "₹1.85 Cr",
        rate: "₹7,550/sq.ft",
        area: "2,450 sq.ft",
        location: "Baner-Balewadi High Street, Pune",
        images: [
            "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1400&q=85",
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85",
        ],
        isFeatured: true,
        link: "/buy?project=The%20Aurelia",
    },
    {
        id: 5,
        title: "VTP HiLife Smart Towers",
        propertyType: "Apartment",
        typeBadge: "Smart Homes",
        price: "₹98 Lacs",
        rate: "₹7,650/sq.ft",
        area: "1,280 sq.ft",
        location: "EON IT Park, Kharadi, Pune",
        images: [
            "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=85",
            "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1400&q=85",
        ],
        isFeatured: true,
        link: "/buy?project=VTP%20HiLife",
    },
    {
        id: 6,
        title: "Tribeca Highstreet Sky Mansions",
        propertyType: "Penthouse",
        typeBadge: "Penthouse",
        price: "₹2.10 Cr",
        rate: "₹8,930/sq.ft",
        area: "2,350 sq.ft",
        location: "Baner Prime, Pune",
        images: [
            "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=85",
            "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1400&q=85",
        ],
        isFeatured: true,
        link: "/buy?project=Tribeca%20Highstreet",
    },
    {
        id: 7,
        title: "Kumar Primus River Residences",
        propertyType: "Condo",
        typeBadge: "River View",
        price: "₹1.95 Cr",
        rate: "₹9,285/sq.ft",
        area: "2,100 sq.ft",
        location: "Kalyani Nagar, Pune",
        images: [
            "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1400&q=85",
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85",
        ],
        isFeatured: true,
        link: "/buy?project=Kumar%20Primus",
    },
    {
        id: 8,
        title: "The Ark Voyage Skyline Suites",
        propertyType: "Apartment",
        typeBadge: "Skyline Suite",
        price: "₹85 Lacs",
        rate: "₹7,390/sq.ft",
        area: "1,150 sq.ft",
        location: "Wakad Expressway, Pune",
        images: [
            "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1400&q=85",
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85",
        ],
        isFeatured: true,
        link: "/buy?project=The%20Ark%20Voyage",
    },
];

export default function NewLaunchProjects() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [imgIndices, setImgIndices] = useState({});
    const [comparedItems, setComparedItems] = useState({});
    const [favoriteItems, setFavoriteItems] = useState({ 1: true });
    const [touchStartX, setTouchStartX] = useState(0);
    const [touchEndX, setTouchEndX] = useState(0);

    const totalProjects = newLaunchProjects.length;

    const handlePrev = useCallback(() => {
        setActiveIndex((prev) => (prev - 1 + totalProjects) % totalProjects);
    }, [totalProjects]);

    const handleNext = useCallback(() => {
        setActiveIndex((prev) => (prev + 1) % totalProjects);
    }, [totalProjects]);

    // Automatic Project Slideshow (slides every 3.5s unless paused)
    useEffect(() => {
        if (isPaused) return;

        const timer = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % totalProjects);
        }, 3500);

        return () => clearInterval(timer);
    }, [isPaused, totalProjects]);

    // Sub-image crossfade rotation within current active project
    useEffect(() => {
        if (isPaused) return;

        const currentProject = newLaunchProjects[activeIndex];
        if (!currentProject || currentProject.images.length <= 1) return;

        const imgTimer = setInterval(() => {
            setImgIndices((prev) => ({
                ...prev,
                [currentProject.id]: ((prev[currentProject.id] || 0) + 1) % currentProject.images.length,
            }));
        }, 2400);

        return () => clearInterval(imgTimer);
    }, [activeIndex, isPaused]);

    // Keyboard Arrow Left/Right controls
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "ArrowLeft") handlePrev();
            else if (e.key === "ArrowRight") handleNext();
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [handlePrev, handleNext]);

    // Touch Swipe Handlers for mobile
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
            handleNext();
        } else if (diff < -45) {
            handlePrev();
        }
        setTouchStartX(0);
        setTouchEndX(0);
    };

    const switchProjectImage = (projectId, totalImages) => {
        setImgIndices((prev) => ({
            ...prev,
            [projectId]: ((prev[projectId] || 0) + 1) % totalImages,
        }));
    };

    const toggleFavorite = (projectId) => {
        setFavoriteItems((prev) => ({
            ...prev,
            [projectId]: !prev[projectId],
        }));
    };

    const toggleCompare = (projectId) => {
        setComparedItems((prev) => ({
            ...prev,
            [projectId]: !prev[projectId],
        }));
    };

    return (
        <section
            className="new-launch"
            id="new-launch-projects"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
        >
            <div className="new-launch__container">
                {/* Section Header */}
                <div className="new-launch__heading">
                    <div className="new-launch__intro">
                        <span className="new-launch__eyebrow">
                            <span className="new-launch__eyebrow-line" />
                            DISCOVER WHAT&apos;S NEXT
                        </span>

                        <h2>
                            New launches.
                            <br />
                            <span>New possibilities.</span>
                        </h2>

                        <p className="new-launch__desc-desktop">
                            Explore exciting luxury residential opportunities across Pune.
                            Find a home that fits your lifestyle and your future plans.
                        </p>

                        {/* Mobile Header Subtitle & Date Link matching reference design */}
                        <div className="new-launch__mobile-header-sub">
                            <p className="new-launch__mobile-subtext">
                                Baner, Wakad, Hinjawadi, and Kothrud.
                            </p>
                            <Link href="/new-launches" className="new-launch__mobile-date-link">
                                <span>View all listings by date</span>
                                <ArrowRight size={13} />
                            </Link>
                        </div>
                    </div>

                    <div className="new-launch__header-actions">
                        {/* Slideshow Indicator & Play/Pause Toggle */}
                        <button
                            type="button"
                            className={`new-launch-slideshow-toggle ${
                                !isPaused ? "new-launch-slideshow-toggle--active" : ""
                            }`}
                            onClick={() => setIsPaused((prev) => !prev)}
                            aria-label={isPaused ? "Play slideshow" : "Pause slideshow"}
                            title={isPaused ? "Play slideshow" : "Pause slideshow"}
                        >
                            {!isPaused ? (
                                <>
                                    <span className="new-launch-pulse-dot" />
                                    <Pause size={13} />
                                    <span>Slideshow On</span>
                                </>
                            ) : (
                                <>
                                    <Play size={13} />
                                    <span>Paused</span>
                                </>
                            )}
                        </button>

                        <Link href="/new-launches" className="new-launch__view-all">
                            Explore all new launches
                            <ArrowRight size={18} />
                        </Link>
                    </div>
                </div>

                {/* DISTINCT PROJECT CONTAINER SLIDESHOW */}
                <div
                    className="new-launch-slideshow-viewport"
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                    role="region"
                    aria-label="New launch projects slideshow"
                >
                    <div
                        className="new-launch-slideshow-track"
                        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
                    >
                        {newLaunchProjects.map((project, pIdx) => {
                            const projectImgIdx = imgIndices[project.id] || 0;
                            const isFav = favoriteItems[project.id] ?? (project.id === 1);
                            const isCompared = comparedItems[project.id] ?? false;

                            return (
                                <div className="new-launch-slide-wrapper" key={project.id}>
                                    <article
                                        className="new-launch-project-card"
                                        aria-label={`${project.title} (${project.propertyType})`}
                                    >
                                        {/* Full-Bleed Background Image with Crossfade */}
                                        <div className="new-launch-project-card__bg">
                                            {project.images.map((imgUrl, iIdx) => (
                                                <img
                                                    key={iIdx}
                                                    src={imgUrl}
                                                    alt={`${project.title} photo ${iIdx + 1}`}
                                                    className={`new-launch-project-card__img ${
                                                        iIdx === (projectImgIdx % project.images.length)
                                                            ? "new-launch-project-card__img--active"
                                                            : ""
                                                    }`}
                                                    loading={pIdx === 0 && iIdx === 0 ? "eager" : "lazy"}
                                                />
                                            ))}
                                            <div className="new-launch-project-card__scrim" />
                                        </div>

                                        {/* Top Badges & Action Buttons */}
                                        <div className="new-launch-project-card__topbar">
                                            <div className="new-launch-project-card__badges">
                                                {project.isFeatured && (
                                                    <span className="nl-badge-featured">
                                                        <Sparkles size={11} /> FEATURED
                                                    </span>
                                                )}
                                                <span className="nl-badge-type">
                                                    {project.typeBadge}
                                                </span>
                                                <button
                                                    type="button"
                                                    className="nl-badge-count"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        switchProjectImage(project.id, project.images.length);
                                                    }}
                                                    title="Switch photo"
                                                >
                                                    <Camera size={12} /> {(projectImgIdx % project.images.length) + 1}/{project.images.length}
                                                </button>
                                            </div>

                                            <div className="new-launch-project-card__actions">
                                                <button
                                                    type="button"
                                                    className={`nl-action-circle ${isCompared ? "nl-action-circle--active" : ""}`}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        toggleCompare(project.id);
                                                    }}
                                                    aria-label="Compare property"
                                                    title={isCompared ? "In Comparison" : "Compare"}
                                                >
                                                    <Scale size={14} />
                                                </button>
                                                <button
                                                    type="button"
                                                    className={`nl-action-circle nl-action-circle--fav ${isFav ? "is-fav" : ""}`}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        toggleFavorite(project.id);
                                                    }}
                                                    aria-label="Save to Wishlist"
                                                    title={isFav ? "Saved to Wishlist" : "Save to Wishlist"}
                                                >
                                                    <Heart
                                                        size={14}
                                                        fill={isFav ? "#ffffff" : "none"}
                                                        stroke="#ffffff"
                                                    />
                                                </button>
                                            </div>
                                        </div>

                                        {/* Left & Right Slide Chevrons (< and >) */}
                                        <button
                                            type="button"
                                            className="nl-slide-nav nl-slide-nav--prev"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handlePrev();
                                            }}
                                            aria-label="Previous project"
                                        >
                                            <ChevronLeft size={20} />
                                        </button>
                                        <button
                                            type="button"
                                            className="nl-slide-nav nl-slide-nav--next"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleNext();
                                            }}
                                            aria-label="Next project"
                                        >
                                            <ChevronRight size={20} />
                                        </button>

                                        {/* Bottom Overlay Content */}
                                        <div className="new-launch-project-card__bottom">
                                            <div className="nl-card-price-row">
                                                <span className="nl-card-price">{project.price}</span>
                                                <span className="nl-card-rate">{project.rate}</span>
                                            </div>

                                            <div className="nl-card-type">{project.propertyType}</div>
                                            <h3 className="nl-card-title">{project.title}</h3>

                                            <div className="nl-card-meta-row">
                                                <div className="nl-card-specs">
                                                    <span className="nl-card-spec-item">
                                                        <Maximize2 size={13} /> {project.area}
                                                    </span>
                                                    <span className="nl-card-spec-dot">•</span>
                                                    <span className="nl-card-spec-item">
                                                        <MapPin size={13} /> {project.location}
                                                    </span>
                                                </div>

                                                <Link href={project.link} className="nl-card-view-details-btn">
                                                    <span>View Details</span>
                                                    <ArrowRight size={13} />
                                                </Link>
                                            </div>
                                        </div>
                                    </article>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* External 8 Pagination Dots & Slide Counter below Container */}
                <div className="new-launch-bottom-controls">
                    <div className="new-launch-dots" role="tablist" aria-label="New launch project pagination">
                        {newLaunchProjects.map((_, dotIdx) => (
                            <button
                                key={dotIdx}
                                type="button"
                                className={`new-launch-dot ${dotIdx === activeIndex ? "new-launch-dot--active" : ""}`}
                                onClick={() => setActiveIndex(dotIdx)}
                                aria-label={`Go to slide ${dotIdx + 1}`}
                            />
                        ))}
                    </div>

                    <div className="new-launch-counter">
                        <span>{String(activeIndex + 1).padStart(2, "0")}</span>
                        <span className="new-launch-counter__sep">/</span>
                        <span>{String(totalProjects).padStart(2, "0")}</span>
                    </div>
                </div>

                {/* Section Bottom Banner Link */}
                <div className="new-launch__bottom">
                    <p>
                        Looking for the right investment opportunity?
                        <span> Let&apos;s find the right fit for you.</span>
                    </p>

                    <Link href="/new-launches" className="new-launch__bottom-link">
                        Explore all new launches
                        <ArrowRight size={17} />
                    </Link>
                </div>
            </div>
        </section>
    );
}
