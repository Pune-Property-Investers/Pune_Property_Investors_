"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import "./ScrollStoryProperties.css";

export const STORY_CATEGORIES = {
    all: [
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
    ],
    "new-launch": [
        {
            id: "skyline-one",
            name: "Skyline One",
            displayName: "Skyline One",
            subtitle: "Newly launched architectural marvel in Kharadi",
            counter: "01/03",
            index: 0,
            address: "EON Free Zone Road, Kharadi",
            cityLocation: "Kharadi, East Pune Growth Corridor",
            neighborhood: "EON IT Park / World Trade Center",
            type: "Ultra-Luxury High-Rise Sky Residences",
            floors: "32 Storeys",
            units: "128 Premium Units",
            yearBuilt: "Under Construction",
            price: "From ₹85 Lakh",
            bgImage:
                "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2400&q=90",
            cardImage:
                "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85",
            detailImage:
                "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85",
            exploreUrl: "/properties/101",
        },
        {
            id: "the-aurelia",
            name: "The Aurelia",
            displayName: "The Aurelia",
            subtitle: "Early access pre-launch opportunity in Baner",
            counter: "02/03",
            index: 1,
            address: "Pan Card Club Road, Baner",
            cityLocation: "Baner West, Prime Pune",
            neighborhood: "Baner / Balewadi High Street",
            type: "Smart Home Luxury High-Rise",
            floors: "28 Storeys",
            units: "96 Bespoke Residences",
            yearBuilt: "Under Construction",
            price: "From ₹1.15 Cr",
            bgImage:
                "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=2400&q=90",
            cardImage:
                "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=85",
            detailImage:
                "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85",
            exploreUrl: "/properties/102",
        },
        {
            id: "kohinoor-presidentia",
            name: "Kohinoor Presidentia",
            displayName: "Kohinoor Presidentia",
            subtitle: "Newly unveiled residential masterpiece in Upper Kharadi",
            counter: "03/03",
            index: 2,
            address: "New Kharadi Central Boulevard",
            cityLocation: "Kharadi, Pune",
            neighborhood: "Upper Kharadi Riverside",
            type: "Resort-Inspired Luxury Gated Community",
            floors: "26 Storeys",
            units: "180 Luxury Condos",
            yearBuilt: "Under Construction",
            price: "From ₹92 Lakh",
            bgImage:
                "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=2400&q=90",
            cardImage:
                "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=85",
            detailImage:
                "https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=1600&q=85",
            exploreUrl: "/properties/104",
        },
    ],
    commercial: [
        {
            id: "eon-prime-commercial",
            name: "EON Prime Towers",
            displayName: "EON Prime Towers",
            subtitle: "Grade-A corporate office suites in Kharadi IT Corridor",
            counter: "01/03",
            index: 0,
            address: "World Trade Center Road, Kharadi",
            cityLocation: "Kharadi IT Park Corridor, Pune",
            neighborhood: "Kharadi EON Tech Hub",
            type: "Grade-A Commercial IT & Business Complex",
            floors: "22 Storeys",
            units: "64 Office Suites",
            yearBuilt: "2025 Handover",
            price: "From ₹1.85 Cr",
            bgImage:
                "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2400&q=90",
            cardImage:
                "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=85",
            detailImage:
                "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=85",
            exploreUrl: "/properties/105",
        },
        {
            id: "apex-retail-promenade",
            name: "Apex Retail Promenade",
            displayName: "Apex Retail Promenade",
            subtitle: "Double-height retail showrooms on Balewadi High Street",
            counter: "02/03",
            index: 1,
            address: "Balewadi High Street Junction, Baner",
            cityLocation: "Baner - Balewadi, Pune",
            neighborhood: "High Street Retail Corridor",
            type: "Premium High Street Commercial & Retail",
            floors: "5 Storeys",
            units: "32 Flagship Stores",
            yearBuilt: "Ready Possession",
            price: "From ₹2.40 Cr",
            bgImage:
                "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=2400&q=90",
            cardImage:
                "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=85",
            detailImage:
                "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85",
            exploreUrl: "/properties/106",
        },
        {
            id: "hinjewadi-tech-tower",
            name: "Hinjewadi Tech Tower",
            displayName: "Hinjewadi Tech Tower",
            subtitle: "High-yield commercial workspaces near Phase 1 Metro",
            counter: "03/03",
            index: 2,
            address: "Phase 1 Main Ring Road, Hinjewadi",
            cityLocation: "Hinjewadi Infotech Park, Pune",
            neighborhood: "Hinjewadi Phase 1 Metro Station",
            type: "Corporate Office Hub & Tech Workstations",
            floors: "18 Storeys",
            units: "88 Commercial Suites",
            yearBuilt: "Under Construction",
            price: "From ₹1.20 Cr",
            bgImage:
                "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=2400&q=90",
            cardImage:
                "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=85",
            detailImage:
                "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85",
            exploreUrl: "/properties/107",
        },
    ],
    plot: [
        {
            id: "wagholi-villa-plots",
            name: "Wagholi Villa Enclave",
            displayName: "Wagholi Villa Enclave",
            subtitle: "Collector sanctioned NA residential villa plots",
            counter: "01/03",
            index: 0,
            address: "Wagholi - Bakori Road, Wagholi",
            cityLocation: "Wagholi, East Pune Corridor",
            neighborhood: "Wagholi Keshav Nagar Highway",
            type: "Clear-Title NA Villa Plots",
            floors: "G+2 Approved",
            units: "45 Independent Plots",
            yearBuilt: "Ready for Registration",
            price: "From ₹45 Lakh",
            bgImage:
                "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=2400&q=90",
            cardImage:
                "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=85",
            detailImage:
                "https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=1600&q=85",
            exploreUrl: "/properties/109",
        },
        {
            id: "sahyadri-county-plots",
            name: "Sahyadri County Plots",
            displayName: "Sahyadri County Plots",
            subtitle: "Gated community plots with scenic mountain backdrop",
            counter: "02/03",
            index: 1,
            address: "Hinjewadi Phase 3 Extension",
            cityLocation: "Hinjewadi / Marunji, Pune",
            neighborhood: "Hinjewadi Phase 3 IT Corridor",
            type: "Gated Community Country Plots",
            floors: "Villa Demarcated",
            units: "60 Gated Layouts",
            yearBuilt: "Ready for Construction",
            price: "From ₹65 Lakh",
            bgImage:
                "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=2400&q=90",
            cardImage:
                "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=85",
            detailImage:
                "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85",
            exploreUrl: "/properties/110",
        },
        {
            id: "pirangut-valley-plots",
            name: "Pirangut Valley Plots",
            displayName: "Pirangut Valley Plots",
            subtitle: "High-potential NA land investment near Chandani Chowk",
            counter: "03/03",
            index: 2,
            address: "Paud Road Growth Corridor, Pirangut",
            cityLocation: "Pirangut Valley, Pune",
            neighborhood: "Chandani Chowk / Kothrud Extension",
            type: "Clear-Title NA Non-Agricultural Land",
            floors: "Independent Ownership",
            units: "38 Sanctioned Layouts",
            yearBuilt: "Immediate Allotment",
            price: "From ₹95 Lakh",
            bgImage:
                "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=2400&q=90",
            cardImage:
                "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=85",
            detailImage:
                "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1600&q=85",
            exploreUrl: "/properties/111",
        },
    ],
};

export const STORY_PROPERTIES = STORY_CATEGORIES.all;

export const HEADLINES = {
    all: { featured: "Featured", properties: "properties" },
    "new-launch": { featured: "New Launch", properties: "properties" },
    commercial: { featured: "Commercial", properties: "properties" },
    plot: { featured: "Plots & Land", properties: "properties" },
};

export default function ScrollStoryProperties({
    category = "all",
    previewData = null,
}) {
    const containerRef = useRef(null);
    const [progress, setProgress] = useState(0); // 0 to 1 across the container
    const [activeIndex, setActiveIndex] = useState(0);
    const [transitionRatio, setTransitionRatio] = useState(0); // 0 to 1 between activeIndex and next
    const [selectedProperty, setSelectedProperty] = useState(null);
    const [isHoveringImage, setIsHoveringImage] = useState(false);

    // Normalize category key
    const normalizedKey = useMemo(() => {
        const raw = String(category || "all").toLowerCase();
        if (raw.includes("new")) return "new-launch";
        if (raw.includes("commercial") || raw.includes("office") || raw.includes("retail")) return "commercial";
        if (raw.includes("plot") || raw.includes("land")) return "plot";
        return "all";
    }, [category]);

    const activeStoryList = useMemo(() => {
        return STORY_CATEGORIES[normalizedKey] || STORY_CATEGORIES.all;
    }, [normalizedKey]);

    const headline = useMemo(() => {
        return HEADLINES[normalizedKey] || HEADLINES.all;
    }, [normalizedKey]);

    // Reset slide index on category change
    useEffect(() => {
        setActiveIndex(0);
        setTransitionRatio(0);
    }, [normalizedKey]);

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

                    // Multi-slide calculation
                    const totalSlides = activeStoryList.length;
                    const segmentCount = Math.max(1, totalSlides - 1);
                    const scaled = rawProgress * segmentCount;
                    const currIdx = Math.min(totalSlides - 1, Math.floor(scaled));
                    const ratio = scaled - currIdx; // 0 to 1 within this transition

                    setActiveIndex(currIdx);
                    setTransitionRatio(ratio);

                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, [activeStoryList]);

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

    const activeProperty = activeStoryList[activeIndex] || activeStoryList[0];
    const nextProperty = activeStoryList[activeIndex + 1] || null;

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
            aria-label="Category Scroll Storytelling"
        >
            {/* Sticky Viewport Stage: Locks for 300vh while user scrolls */}
            <div className="scroll-story-sticky-stage">
                {/* 1. BACKGROUND LAYERS: Full-screen images with vertical slide wipe */}
                <div className="scroll-story-backgrounds" aria-hidden="true">
                    {activeStoryList.map((prop, idx) => {
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

                {/* 2. CENTRAL FLOATING WHITE PROPERTY CARD */}
                <div className="scroll-story-card-wrapper">
                    <article className="scroll-story-card" aria-label="Showcase Property Card">
                        {/* Header: Dynamic category title */}
                        <div className="scroll-story-card__header">
                            <span className="scroll-story-card__headline-featured">
                                {previewData?.headlineFeatured || headline.featured}
                            </span>
                            <span className="scroll-story-card__headline-properties">
                                {previewData?.headlineProperties || headline.properties}
                            </span>
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

                            {/* Hover "Explore more" pill */}
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

                {/* 3. PROPERTY DETAIL SIDE PANEL (Animated Slide-out Drawer from Right) */}
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
                            {/* Drawer Header */}
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

                                {/* 2-Column Specs Grid */}
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
