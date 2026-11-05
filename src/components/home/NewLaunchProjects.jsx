"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import {
    ChevronLeft,
    ChevronRight,
    ArrowRight,
    Home,
    Maximize2,
    Building2,
    Play,
    Pause,
} from "lucide-react";
import "./NewLaunchProjects.css";

const newLaunchProjectsData = [
    {
        id: 1,
        titlePrefix: "PLANET",
        titleSuffix: "VISTA",
        category: "PREMIUM RESIDENCES",
        tagline: "Live the Luxury. Embrace the View.",
        location: "Kharadi Riverside, Pune",
        developer: "Planet Group",
        heroImages: [
            "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=900&q=75",
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=75",
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=75",
        ],
        exploreLink: "/buy?project=Planet%20Vista",
        floorPlanTitle: "Modern",
        floorPlanSubtitle: "Floor Plan",
        floorPlanHighlights: "Spacious • Elegant • Smart",
        specs: {
            configuration: "4 BHK",
            flatSize: "4,500 Sq.Ft.",
            totalFloors: "G+14",
        },
        thumbnails: [
            {
                url: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=400&q=80",
                label: "Living Salon",
            },
            {
                url: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=400&q=80",
                label: "Pool Terrace",
            },
        ],
    },
    {
        id: 2,
        titlePrefix: "AURA",
        titleSuffix: "HORIZON",
        category: "SIGNATURE RESIDENCES",
        tagline: "Bespoke Grandeur. Skyline Serenity.",
        location: "Baner Hills, Pune",
        developer: "Aura Living",
        heroImages: [
            "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=900&q=75",
            "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=900&q=75",
            "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=900&q=75",
        ],
        exploreLink: "/buy?project=Aura%20Horizon",
        floorPlanTitle: "Penthouse",
        floorPlanSubtitle: "Floor Plan",
        floorPlanHighlights: "Panoramic • Private • Iconic",
        specs: {
            configuration: "3 & 4 BHK",
            flatSize: "3,850 Sq.Ft.",
            totalFloors: "G+24",
        },
        thumbnails: [
            {
                url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80",
                label: "Sky Deck",
            },
            {
                url: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=400&q=80",
                label: "Infinity Pool",
            },
        ],
    },
    {
        id: 3,
        titlePrefix: "VERDANT",
        titleSuffix: "SOLITAIRE",
        category: "ECO-LUXURY ESTATES",
        tagline: "Forested Sanctuary. Timeless Craftsmanship.",
        location: "Koregaon Park Annexe, Pune",
        developer: "Solitaire Group",
        heroImages: [
            "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=900&q=75",
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=900&q=75",
            "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=900&q=75",
        ],
        exploreLink: "/buy?project=Verdant%20Solitaire",
        floorPlanTitle: "Duplex",
        floorPlanSubtitle: "Floor Plan",
        floorPlanHighlights: "Expansive • Green • Bespoke",
        specs: {
            configuration: "4 & 5 BHK",
            flatSize: "5,200 Sq.Ft.",
            totalFloors: "G+18",
        },
        thumbnails: [
            {
                url: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=400&q=80",
                label: "Master Suite",
            },
            {
                url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=400&q=80",
                label: "Lush Pergola",
            },
        ],
    },
    {
        id: 4,
        titlePrefix: "IMPERIAL",
        titleSuffix: "CREST",
        category: "HIGH-RISE TOWERS",
        tagline: "Elevated Living. Masterpiece Architecture.",
        location: "Senapati Bapat Road, Pune",
        developer: "Imperial Realty",
        heroImages: [
            "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=75",
            "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=900&q=75",
            "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=900&q=75",
        ],
        exploreLink: "/buy?project=Imperial%20Crest",
        floorPlanTitle: "Sky Villa",
        floorPlanSubtitle: "Floor Plan",
        floorPlanHighlights: "Exclusive • Double-Height • Grand",
        specs: {
            configuration: "3 & 4 BHK",
            flatSize: "3,400 Sq.Ft.",
            totalFloors: "G+28",
        },
        thumbnails: [
            {
                url: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=400&q=80",
                label: "Lounge Salon",
            },
            {
                url: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=400&q=80",
                label: "Tower Facade",
            },
        ],
    },
];

/* Technical CAD Floor Plan Diagram with Compass */
function FloorPlanGraphic() {
    return (
        <div className="new-launch-cad">
            {/* North Compass Icon */}
            <div className="new-launch-cad__compass" title="North orientation">
                <span className="new-launch-cad__compass-n">N</span>
                <span className="new-launch-cad__compass-arrow">↗</span>
            </div>

            {/* Architectural Blueprint Vector */}
            <svg
                viewBox="0 0 170 125"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="new-launch-cad__svg"
                aria-label="CAD Floor plan layout"
            >
                {/* Outer Wall Boundary */}
                <path
                    d="M 22 14 H 146 V 68 H 158 V 112 H 104 V 98 H 68 V 112 H 22 Z"
                    stroke="#5ce1e6"
                    strokeWidth="1.8"
                    fill="none"
                />

                {/* Interior Wall Partitions */}
                <path
                    d="M 22 54 H 82 V 14"
                    stroke="#ffffff"
                    strokeWidth="1.2"
                />
                <path
                    d="M 82 54 H 146"
                    stroke="#ffffff"
                    strokeWidth="1.2"
                />
                <path
                    d="M 104 54 V 98"
                    stroke="#ffffff"
                    strokeWidth="1.2"
                />
                <path
                    d="M 62 54 V 98"
                    stroke="#ffffff"
                    strokeWidth="1.2"
                />
                <path
                    d="M 22 84 H 62"
                    stroke="#ffffff"
                    strokeWidth="1.2"
                />

                {/* Balcony & Terrace Outlines (Dotted) */}
                <rect
                    x="28"
                    y="18"
                    width="48"
                    height="30"
                    stroke="rgba(255, 255, 255, 0.45)"
                    strokeWidth="0.8"
                    strokeDasharray="2 2"
                    fill="none"
                />
                <rect
                    x="88"
                    y="18"
                    width="52"
                    height="30"
                    stroke="rgba(255, 255, 255, 0.45)"
                    strokeWidth="0.8"
                    strokeDasharray="2 2"
                    fill="none"
                />
                <rect
                    x="68"
                    y="62"
                    width="30"
                    height="32"
                    stroke="rgba(212, 163, 89, 0.7)"
                    strokeWidth="0.9"
                    fill="none"
                />

                {/* Door Arcs */}
                <path
                    d="M 44 54 A 12 12 0 0 1 56 42"
                    stroke="rgba(255, 255, 255, 0.6)"
                    strokeWidth="0.8"
                    strokeDasharray="2 2"
                />
                <line x1="44" y1="54" x2="44" y2="42" stroke="#ffffff" strokeWidth="1" />

                <path
                    d="M 116 54 A 12 12 0 0 1 128 66"
                    stroke="rgba(255, 255, 255, 0.6)"
                    strokeWidth="0.8"
                    strokeDasharray="2 2"
                />
                <line x1="116" y1="54" x2="116" y2="66" stroke="#ffffff" strokeWidth="1" />

                {/* Sub-room details */}
                <line x1="104" y1="76" x2="146" y2="76" stroke="rgba(255, 255, 255, 0.35)" strokeWidth="0.8" />
                <line x1="126" y1="76" x2="126" y2="98" stroke="rgba(255, 255, 255, 0.35)" strokeWidth="0.8" />
            </svg>
        </div>
    );
}

export default function NewLaunchProjects() {
    const sliderRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [subPhotoIndex, setSubPhotoIndex] = useState(0);

    const totalSlides = newLaunchProjectsData.length;

    const scrollToSlide = useCallback((index) => {
        if (!sliderRef.current) return;
        const container = sliderRef.current;
        const targetLeft = index * container.clientWidth;

        container.scrollTo({
            left: targetLeft,
            behavior: "smooth",
        });

        setActiveIndex(index);
    }, []);

    const handlePrev = useCallback(() => {
        const nextIdx = (activeIndex - 1 + totalSlides) % totalSlides;
        scrollToSlide(nextIdx);
    }, [activeIndex, totalSlides, scrollToSlide]);

    const handleNext = useCallback(() => {
        const nextIdx = (activeIndex + 1) % totalSlides;
        scrollToSlide(nextIdx);
    }, [activeIndex, totalSlides, scrollToSlide]);

    const handleScroll = () => {
        if (!sliderRef.current) return;
        const container = sliderRef.current;
        const scrollLeft = container.scrollLeft;
        const width = container.clientWidth;

        if (width > 0) {
            const index = Math.round(scrollLeft / width);
            if (index >= 0 && index < totalSlides && index !== activeIndex) {
                setActiveIndex(index);
            }
        }
    };

    // 2-Second Automatic Image Slideshow
    useEffect(() => {
        if (isPaused || !totalSlides) return;

        const timer = setInterval(() => {
            setActiveIndex((prev) => {
                const nextIdx = (prev + 1) % totalSlides;
                if (sliderRef.current) {
                    const container = sliderRef.current;
                    container.scrollTo({
                        left: nextIdx * container.clientWidth,
                        behavior: "smooth",
                    });
                }
                return nextIdx;
            });

            // Also rotate sub-photo in hero
            setSubPhotoIndex((prev) => (prev + 1) % 3);
        }, 2000);

        return () => clearInterval(timer);
    }, [isPaused, totalSlides]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "ArrowLeft") {
                handlePrev();
            } else if (e.key === "ArrowRight") {
                handleNext();
            }
        };

        const sliderElem = sliderRef.current;
        if (sliderElem) {
            sliderElem.addEventListener("keydown", handleKeyDown);
        }

        return () => {
            if (sliderElem) {
                sliderElem.removeEventListener("keydown", handleKeyDown);
            }
        };
    }, [handlePrev, handleNext]);

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

                        <p>
                            Explore exciting luxury residential opportunities across Pune.
                            Find a home that fits your lifestyle and your future plans.
                        </p>
                    </div>

                    <div className="new-launch__header-actions">
                        {/* 2-Second Slideshow Indicator & Toggle */}
                        <button
                            type="button"
                            className={`new-launch-slideshow-toggle ${
                                !isPaused ? "new-launch-slideshow-toggle--active" : ""
                            }`}
                            onClick={() => setIsPaused((prev) => !prev)}
                            aria-label={isPaused ? "Resume 2s slideshow" : "Pause 2s slideshow"}
                            title={isPaused ? "Play 2s slideshow" : "Pause slideshow"}
                        >
                            {!isPaused ? (
                                <>
                                    <span className="new-launch-pulse-dot" />
                                    <Pause size={13} />
                                    <span>2s Slideshow</span>
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

                {/* Side-Scroll Showcase Slider Container */}
                <div className="new-launch-showcase-wrapper">
                    <div
                        className="new-launch-slider"
                        ref={sliderRef}
                        onScroll={handleScroll}
                        tabIndex={0}
                        role="region"
                        aria-label="New launch luxury residences showcase"
                    >
                        {newLaunchProjectsData.map((project, idx) => {
                            const isCurrent = activeIndex === idx;
                            const heroImgs = project.heroImages || [project.heroImage];
                            const currentHeroImg =
                                heroImgs[subPhotoIndex % heroImgs.length] || heroImgs[0];

                            return (
                                <article
                                    key={project.id}
                                    className={`new-launch-card ${isCurrent ? "new-launch-card--active" : ""
                                        }`}
                                    aria-roledescription="slide"
                                    aria-label={`${project.titlePrefix} ${project.titleSuffix}`}
                                >
                                    {/* TOP HERO VISUAL SECTION */}
                                    <div className="new-launch-card__hero">
                                        {/* Multi-Photo Slideshow Crossfade */}
                                        <div className="new-launch-card__hero-stage">
                                            {heroImgs.map((imgUrl, hIdx) => {
                                                const isActiveHero = isCurrent
                                                    ? hIdx === (subPhotoIndex % heroImgs.length)
                                                    : hIdx === 0;

                                                return (
                                                    <img
                                                        key={hIdx}
                                                        src={imgUrl}
                                                        alt={`${project.titlePrefix} ${project.titleSuffix} view ${hIdx + 1}`}
                                                        className={`new-launch-card__bg-img ${
                                                            isActiveHero
                                                                ? "new-launch-card__bg-img--active"
                                                                : ""
                                                        }`}
                                                        loading={idx === 0 && hIdx === 0 ? "eager" : "lazy"}
                                                    />
                                                );
                                            })}
                                        </div>

                                        {/* Subtle Vignette Gradient Overlay */}
                                        <div className="new-launch-card__hero-overlay" />

                                        {/* Top Left Editorial Header Content */}
                                        <div className="new-launch-card__hero-content">
                                            {/* Category Tag with Elegant Horizontal Rule */}
                                            <div className="new-launch-card__category-row">
                                                <span className="new-launch-card__category">
                                                    {project.category}
                                                </span>
                                                <span className="new-launch-card__category-line" />
                                            </div>

                                            {/* Huge Dual-Tone Luxury Title: Planet (White) Vista (Gold) */}
                                            <h3 className="new-launch-card__title">
                                                <span className="new-launch-card__title-prefix">
                                                    {project.titlePrefix}
                                                </span>{" "}
                                                <span className="new-launch-card__title-suffix">
                                                    {project.titleSuffix}
                                                </span>
                                            </h3>

                                            {/* Tagline */}
                                            <p className="new-launch-card__tagline">
                                                {project.tagline}
                                            </p>

                                            {/* Gold Accent Line */}
                                            <div className="new-launch-card__accent-line" />

                                            {/* Explore Project Pill CTA Button */}
                                            <div className="new-launch-card__cta-row">
                                                <Link
                                                    href={project.exploreLink}
                                                    className="new-launch-card__explore-btn"
                                                    aria-label={`Explore ${project.titlePrefix} ${project.titleSuffix}`}
                                                >
                                                    <span>Explore Project</span>
                                                    <span className="new-launch-card__explore-chevron">
                                                        ›
                                                    </span>
                                                </Link>
                                            </div>
                                        </div>

                                        {/* Next / Previous Circular Controls Over Hero Image */}
                                        <div className="new-launch-card__nav-arrows">
                                            <button
                                                type="button"
                                                onClick={handlePrev}
                                                className="new-launch-card__arrow new-launch-card__arrow--prev"
                                                aria-label="Previous project"
                                                title="Previous project"
                                            >
                                                <ChevronLeft size={20} strokeWidth={2.4} />
                                            </button>

                                            <button
                                                type="button"
                                                onClick={handleNext}
                                                className="new-launch-card__arrow new-launch-card__arrow--next"
                                                aria-label="Next project"
                                                title="Next project"
                                            >
                                                <ChevronRight size={20} strokeWidth={2.4} />
                                            </button>
                                        </div>
                                    </div>

                                    {/* BOTTOM FLOATING SPECIFICATIONS DOCK */}
                                    <div className="new-launch-dock">
                                        {/* Zone 1: Forest Green CAD Blueprint Area */}
                                        <div className="new-launch-dock__left">
                                            <FloorPlanGraphic />

                                            <div className="new-launch-dock__plan-info">
                                                <h4 className="new-launch-dock__plan-title">
                                                    {project.floorPlanTitle}
                                                    <br />
                                                    {project.floorPlanSubtitle}
                                                </h4>
                                                <p className="new-launch-dock__plan-sub">
                                                    {project.floorPlanHighlights}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Zone 2: Warm Ivory Specifications Metric Columns */}
                                        <div className="new-launch-dock__middle">
                                            {/* Metric 1: Configuration */}
                                            <div className="new-launch-dock__metric">
                                                <div className="new-launch-dock__metric-icon">
                                                    <Home size={22} strokeWidth={1.7} />
                                                </div>
                                                <span className="new-launch-dock__metric-label">
                                                    Configuration
                                                </span>
                                                <strong className="new-launch-dock__metric-val">
                                                    {project.specs.configuration}
                                                </strong>
                                            </div>

                                            <div className="new-launch-dock__divider" />

                                            {/* Metric 2: Flat Size */}
                                            <div className="new-launch-dock__metric">
                                                <div className="new-launch-dock__metric-icon">
                                                    <Maximize2 size={21} strokeWidth={1.7} />
                                                </div>
                                                <span className="new-launch-dock__metric-label">
                                                    Flat Size
                                                </span>
                                                <strong className="new-launch-dock__metric-val">
                                                    {project.specs.flatSize}
                                                </strong>
                                            </div>

                                            <div className="new-launch-dock__divider" />

                                            {/* Metric 3: Total Floors */}
                                            <div className="new-launch-dock__metric">
                                                <div className="new-launch-dock__metric-icon">
                                                    <Building2 size={22} strokeWidth={1.7} />
                                                </div>
                                                <span className="new-launch-dock__metric-label">
                                                    Total Floors
                                                </span>
                                                <strong className="new-launch-dock__metric-val">
                                                    {project.specs.totalFloors}
                                                </strong>
                                            </div>
                                        </div>

                                        {/* Zone 3: Stacked Dual Thumbnails */}
                                        <div className="new-launch-dock__right">
                                            {project.thumbnails.map((thumb, tIdx) => (
                                                <div
                                                    key={tIdx}
                                                    className="new-launch-dock__thumb-box"
                                                    title={thumb.label}
                                                >
                                                    <img
                                                        src={thumb.url}
                                                        alt={`${project.titlePrefix} ${thumb.label}`}
                                                        className="new-launch-dock__thumb-img"
                                                        loading="lazy"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </article>
                            );
                        })}
                    </div>

                    {/* Bottom Pagination Dots & Progress */}
                    <div className="new-launch-footer-bar">
                        <div className="new-launch-dots">
                            {newLaunchProjectsData.map((_, dotIdx) => (
                                <button
                                    key={dotIdx}
                                    type="button"
                                    className={`new-launch-dot ${activeIndex === dotIdx ? "new-launch-dot--active" : ""
                                        }`}
                                    onClick={() => scrollToSlide(dotIdx)}
                                    aria-label={`Go to slide ${dotIdx + 1}`}
                                />
                            ))}
                        </div>

                        <div className="new-launch-counter">
                            <span>{String(activeIndex + 1).padStart(2, "0")}</span>
                            <span className="new-launch-counter__sep">/</span>
                            <span>{String(totalSlides).padStart(2, "0")}</span>
                        </div>
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
