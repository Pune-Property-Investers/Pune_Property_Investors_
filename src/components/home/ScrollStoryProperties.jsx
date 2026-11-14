"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import {
    X,
    MapPin,
    Building2,
    Calendar,
    Layers,
    DollarSign,
    ExternalLink,
    ChevronDown,
    ArrowUpRight,
    Sparkles,
} from "lucide-react";
import "./ScrollStoryProperties.css";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export const STORY_PROPERTIES = [
    {
        id: "the-willard",
        name: "The Willard",
        displayName: "The Willard",
        subtitle: "Beaux Arts elegance on the KP",
        counter: "01/03",
        index: 0,
        address: "250 West 76th Street, Upper West Side",
        cityLocation: "Upper West Side, Pune International Portfolio",
        neighborhood: "Upper West Side / Koregaon Park Annexe",
        type: "Pre-War Classic & Sky Residences",
        floors: "12 Storeys",
        units: "48 Bespoke Residences",
        yearBuilt: "2024 Restoration",
        price: "From ₹2.85 Cr ($3.4M)",
        bgImage:
            "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=2400&q=90",
        cardImage:
            "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=85",
        detailImage:
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85",
        exploreUrl: "/properties/1",
    },
    {
        id: "ip-collection",
        name: "IP Collection",
        displayName: "IP Collection",
        subtitle: "Luxury waterfront towers in Kharadi",
        counter: "02/03",
        index: 1,
        address: "111 Murray Street, Tribeca Waterfront",
        cityLocation: "Tribeca Waterfront / Hinjewadi IT Corridors",
        neighborhood: "Tribeca / Hinjewadi Phase 1",
        type: "Glass Tower Waterfront Condos",
        floors: "58 Storeys",
        units: "156 Waterfront Penthouses",
        yearBuilt: "2025 Completion",
        price: "From ₹3.40 Cr ($4.1M)",
        bgImage:
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=2400&q=90",
        cardImage:
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=85",
        detailImage:
            "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85",
        exploreUrl: "/properties/2",
    },
    {
        id: "otto",
        name: "OTTO",
        displayName: "OTTO",
        subtitle: "Amenity-rich luxury living in Greenpoint",
        counter: "03/03",
        index: 2,
        address: "211 Mcguinness Blvd",
        cityLocation: "Greenpoint / Kharadi Waterfront Residences",
        neighborhood: "Greenpoint / Kharadi Central",
        type: "Residential-Rental & Luxury Ownership",
        floors: "8 Storeys",
        units: "197 Luxury Suites",
        yearBuilt: "2023",
        price: "From ₹1.75 Cr ($2.1M)",
        bgImage:
            "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2400&q=90",
        cardImage:
            "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=85",
        detailImage:
            "https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=1600&q=85",
        exploreUrl: "/properties/3",
    },
];

export default function ScrollStoryProperties({ previewData = null }) {
    const containerRef = useRef(null);
    const [progress, setProgress] = useState(0); // 0 to 1 across the container
    const [activeIndex, setActiveIndex] = useState(0);
    const [transitionRatio, setTransitionRatio] = useState(0); // 0 to 1 between activeIndex and next
    const [showNav, setShowNav] = useState(false);
    const [selectedProperty, setSelectedProperty] = useState(null);
    const [isHoveringImage, setIsHoveringImage] = useState(false);

    // Scroll listener calculates exact progress through the 300vh storytelling section
    useEffect(() => {
        let ticking = false;

        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const el = containerRef.current;
                    if (!el) {
                        ticking = false;
                        return;
                    }

                    const rect = el.getBoundingClientRect();
                    const totalHeight = el.offsetHeight - window.innerHeight;
                    const scrolled = -rect.top;

                    // Progress from 0.0 to 1.0 clamped
                    const rawProgress = Math.max(0, Math.min(1, scrolled / (totalHeight || 1)));
                    setProgress(rawProgress);

                    // 3 properties -> 2 segments: [0, 0.5] and [0.5, 1.0]
                    const totalSlides = STORY_PROPERTIES.length;
                    const segmentCount = totalSlides - 1; // 2
                    const scaled = rawProgress * segmentCount;
                    const currIdx = Math.min(totalSlides - 1, Math.floor(scaled));
                    const ratio = scaled - currIdx; // 0 to 1 within this transition

                    setActiveIndex(currIdx);
                    setTransitionRatio(ratio);

                    // Show sticky navbar around stage 2/3 (progress > 0.35)
                    setShowNav(rawProgress > 0.35);

                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close side drawer on Escape key and prevent body scroll while drawer is open
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
                setSelectedProperty(null);
            }
        };

        if (selectedProperty) {
            window.addEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "";
        };
    }, [selectedProperty]);

    const activeProperty = STORY_PROPERTIES[activeIndex] || STORY_PROPERTIES[0];
    const nextProperty = STORY_PROPERTIES[activeIndex + 1] || null;

    const handleExploreClick = useCallback((prop) => {
        setSelectedProperty(prop);
    }, []);

    const closeDetailPanel = useCallback(() => {
        setSelectedProperty(null);
    }, []);

    return (
        <section
            ref={containerRef}
            className="scroll-story-section"
            id="all-properties-story"
            aria-label="Featured Properties Scroll Storytelling"
        >
            {/* Sticky Viewport Stage: Locks for 300vh while user scrolls */}
            <div className="scroll-story-sticky-stage">
                {/* 1. BACKGROUND LAYERS: Full-screen images with vertical slide wipe */}
                <div className="scroll-story-backgrounds" aria-hidden="true">
                    {STORY_PROPERTIES.map((prop, idx) => {
                        let translateY = 100;
                        let opacity = 0;
                        let scale = 1.05;

                        if (idx < activeIndex) {
                            // Already scrolled past: off screen top
                            translateY = -100;
                            opacity = 0;
                            scale = 1.08;
                        } else if (idx === activeIndex) {
                            // Currently active: at 0, moving up as transitionRatio increases
                            translateY = -transitionRatio * 25; // Subtle parallax upward
                            opacity = 1;
                            scale = 1.0 + transitionRatio * 0.04;
                        } else if (idx === activeIndex + 1) {
                            // Incoming next slide: slides up from bottom (100% down to 0%)
                            translateY = (1 - transitionRatio) * 100;
                            opacity = 1;
                            scale = 1.04;
                        } else {
                            // Future slides: waiting below
                            translateY = 100;
                            opacity = 0;
                        }

                        return (
                            <div
                                key={prop.id}
                                className={`scroll-story-bg-layer ${idx === activeIndex ? "scroll-story-bg-layer--active" : ""
                                    }`}
                                style={{
                                    transform: `translate3d(0, ${translateY}%, 0) scale(${scale})`,
                                    opacity: opacity,
                                    zIndex: idx === activeIndex + 1 ? 2 : idx === activeIndex ? 1 : 0,
                                }}
                            >
                                <img
                                    src={prop.bgImage}
                                    alt=""
                                    className="scroll-story-bg-img"
                                    loading={idx === 0 ? "eager" : "lazy"}
                                />
                                <div className="scroll-story-bg-vignette" />
                            </div>
                        );
                    })}
                </div>

                {/* 2. MINIMAL PREMIUM STICKY NAVIGATION BAR (appears at Stage 5 as in video) */}


                {/* 3. CENTRAL FLOATING WHITE PROPERTY CARD (Matches reference exactly) */}
                <div className="scroll-story-card-wrapper">
                    <article className="scroll-story-card" aria-label="Featured Property Card">
                        {/* Header: "Featured properties" (properties in italic serif) */}
                        <div className="scroll-story-card__header">
                            <span className="scroll-story-card__headline-featured">Featured</span>
                            <span className="scroll-story-card__headline-properties">properties</span>
                        </div>

                        {/* Central Property Image Container with Synchronized Wipe */}
                        <div
                            className="scroll-story-card__media-frame"
                            onMouseEnter={() => setIsHoveringImage(true)}
                            onMouseLeave={() => setIsHoveringImage(false)}
                            onClick={() => handleExploreClick(activeProperty)}
                            role="button"
                            tabIndex={0}
                            aria-label={`Explore ${activeProperty.name}`}
                        >
                            {/* Base Image */}
                            <img
                                src={activeProperty.cardImage}
                                alt={activeProperty.name}
                                className="scroll-story-card__image scroll-story-card__image--base"
                                style={{
                                    transform: `translate3d(0, ${-transitionRatio * 20}%, 0)`,
                                }}
                            />

                            {/* Incoming Image Wipe from Bottom */}
                            {nextProperty && (
                                <div
                                    className="scroll-story-card__incoming-wrap"
                                    style={{
                                        clipPath: `inset(${(1 - transitionRatio) * 100}% 0 0 0)`,
                                    }}
                                >
                                    <img
                                        src={nextProperty.cardImage}
                                        alt={nextProperty.name}
                                        className="scroll-story-card__image scroll-story-card__image--next"
                                        style={{
                                            transform: `translate3d(0, ${(1 - transitionRatio) * 16}%, 0)`,
                                        }}
                                    />
                                </div>
                            )}

                            {/* Hover "Explore more" pill (as seen in frame_00443) */}
                            <div
                                className={`scroll-story-card__hover-pill ${isHoveringImage ? "scroll-story-card__hover-pill--visible" : ""
                                    }`}
                            >
                                <span>Explore more</span>
                            </div>
                        </div>

                        {/* Content Below Image: Title, Tagline, and Rolling Counter */}
                        <div className="scroll-story-card__content">
                            <div className="scroll-story-card__text-block">
                                <h3 className="scroll-story-card__title">
                                    {activeProperty.name}
                                </h3>
                                <p className="scroll-story-card__subtitle">
                                    {activeProperty.subtitle}
                                </p>
                            </div>

                            <div className="scroll-story-card__counter" aria-label="Slide Counter">
                                <span>{activeProperty.counter}</span>
                            </div>
                        </div>
                    </article>
                </div>

                {/* 4. FLOATING BOTTOM RIGHT ACTION PILL ("Rent with us" / "Schedule Visit") */}
                {/* <div className="scroll-story-floating-action">
                    <button
                        type="button"
                        className="scroll-story-rent-btn"
                        onClick={() => handleExploreClick(activeProperty)}
                    >
                        <span>Rent with us</span>
                    </button>
                </div> */}

                {/* 5. PROPERTY DETAIL SIDE PANEL (Animated Slide-out Drawer from Right) */}
                <div
                    className={`scroll-story-drawer-backdrop ${selectedProperty ? "is-open" : ""
                        }`}
                    onClick={closeDetailPanel}
                    aria-hidden="true"
                />

                <aside
                    className={`scroll-story-drawer ${selectedProperty ? "scroll-story-drawer--open" : ""
                        }`}
                    role="dialog"
                    aria-modal="true"
                    aria-label={selectedProperty ? `${selectedProperty.name} Details` : "Property Info"}
                >
                    {selectedProperty && (
                        <div className="scroll-story-drawer__inner">
                            {/* Drawer Header: "PROPERTY INFO" on left, "×" on right */}
                            <div className="scroll-story-drawer__header">
                                <span className="scroll-story-drawer__header-tag">PROPERTY INFO</span>
                                <button
                                    type="button"
                                    className="scroll-story-drawer__close-btn"
                                    onClick={closeDetailPanel}
                                    aria-label="Close property info"
                                >
                                    <X size={19} />
                                </button>
                            </div>

                            <div className="scroll-story-drawer__scroll-body">
                                {/* Title */}
                                <h2 className="scroll-story-drawer__title">
                                    {selectedProperty.displayName}
                                </h2>

                                {/* Hero Image */}
                                <div className="scroll-story-drawer__image-box">
                                    <img
                                        src={selectedProperty.detailImage || selectedProperty.cardImage}
                                        alt={selectedProperty.name}
                                        className="scroll-story-drawer__image"
                                    />
                                </div>

                                {/* Address Section */}
                                <div className="scroll-story-drawer__spec-section">
                                    <span className="scroll-story-drawer__label">ADDRESS</span>
                                    <p className="scroll-story-drawer__address-val">
                                        {selectedProperty.address}
                                    </p>
                                </div>

                                {/* 2-Column Specs Grid (Neighborhood, Type, Floors, Units, Year Built, Price) */}
                                <div className="scroll-story-drawer__specs-grid">
                                    <div className="scroll-story-drawer__spec-cell">
                                        <span className="scroll-story-drawer__label">NEIGHBORHOOD</span>
                                        <strong className="scroll-story-drawer__val">
                                            {selectedProperty.neighborhood}
                                        </strong>
                                    </div>

                                    <div className="scroll-story-drawer__spec-cell">
                                        <span className="scroll-story-drawer__label">TYPE</span>
                                        <strong className="scroll-story-drawer__val">
                                            {selectedProperty.type}
                                        </strong>
                                    </div>

                                    <div className="scroll-story-drawer__spec-cell">
                                        <span className="scroll-story-drawer__label">FLOORS</span>
                                        <strong className="scroll-story-drawer__val">
                                            {selectedProperty.floors}
                                        </strong>
                                    </div>

                                    <div className="scroll-story-drawer__spec-cell">
                                        <span className="scroll-story-drawer__label">UNITS</span>
                                        <strong className="scroll-story-drawer__val">
                                            {selectedProperty.units}
                                        </strong>
                                    </div>

                                    <div className="scroll-story-drawer__spec-cell">
                                        <span className="scroll-story-drawer__label">YEAR BUILT</span>
                                        <strong className="scroll-story-drawer__val">
                                            {selectedProperty.yearBuilt}
                                        </strong>
                                    </div>

                                    <div className="scroll-story-drawer__spec-cell">
                                        <span className="scroll-story-drawer__label">STARTING PRICE</span>
                                        <strong className="scroll-story-drawer__val scroll-story-drawer__val--gold">
                                            {selectedProperty.price}
                                        </strong>
                                    </div>
                                </div>

                                <div className="scroll-story-drawer__divider" />

                                {/* Action Buttons */}
                                <div className="scroll-story-drawer__actions">
                                    <Link
                                        href={selectedProperty.exploreUrl}
                                        className="scroll-story-drawer__explore-btn"
                                        onClick={closeDetailPanel}
                                    >
                                        <span>Explore property</span>
                                    </Link>

                                    <a
                                        href={`https://wa.me/917398174444?text=Hi%2C%20I%20am%20interested%20in%20${encodeURIComponent(selectedProperty.name)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="scroll-story-drawer__whatsapp-btn"
                                    >
                                        <span>Enquire via WhatsApp</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    )}
                </aside>
            </div>
        </section>
    );
}

