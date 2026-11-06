"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import locationsData from "../../data/locationsData";
import "./BrowseLocations.css";

// Individual Locality Card in the Track or Grid
function LocalityCard({
    location,
    keyPrefix = "",
    activeType = null, // "top" | "bottom" | null
    onCardClick = null,
    isDesktop = false,
}) {
    const cardContent = (
        <>
            {/* Top Media Area with Zone Badge & Bottom Text Overlay */}
            <div className="locality-card__media">
                <img
                    className="locality-card__image"
                    src={location.image}
                    alt={`Properties in ${location.name}, Pune`}
                    loading="lazy"
                />

                <div className="locality-card__overlay" />

                {/* Top-Left Zone Badge (White Pill) */}
                <div className="locality-card__top">
                    <span className="locality-card__zone-badge">
                        {location.zone}
                    </span>

                    <span className="locality-card__arrow-btn" aria-hidden="true">
                        <ArrowRight size={13} />
                    </span>
                </div>

                {/* Bottom of Media Area: Name & Tagline */}
                <div className="locality-card__media-bottom">
                    <h3 className="locality-card__name">
                        {location.name}
                    </h3>
                    <p className="locality-card__sub">
                        {location.description}
                    </p>
                </div>
            </div>

            {/* Bottom White Information Bar */}
            <div className="locality-card__body">
                {/* Left: Average Rate */}
                <div className="locality-card__stat locality-card__stat--rate">
                    <span className="locality-card__stat-label">
                        AVG. RATE
                    </span>
                    <strong className="locality-card__stat-val">
                        {location.avgRate}
                    </strong>
                </div>

                {/* Right: Demo Listings Pill */}
                <div className="locality-card__stat locality-card__stat--listings">
                    <span className="locality-card__stat-label">
                        DEMO LISTINGS
                    </span>
                    <span className="locality-card__listing-pill">
                        {location.listingsCount}
                    </span>
                </div>
            </div>
        </>
    );

    // Desktop uses direct Next.js Link
    if (isDesktop) {
        return (
            <Link
                href={`/buy?location=${encodeURIComponent(location.searchLocation)}`}
                className={`locality-card ${location.isFeatured ? "locality-card--featured" : ""}`}
                key={`${keyPrefix}${location.id}`}
                aria-label={`Explore properties in ${location.name}, ${location.zone}`}
            >
                {cardContent}
            </Link>
        );
    }

    // Mobile uses interactive card with live boundary touch detection
    const activeClass =
        activeType === "top"
            ? "locality-card--active-top"
            : activeType === "bottom"
            ? "locality-card--active-bottom"
            : "";

    return (
        <div
            onClick={onCardClick}
            data-location-id={location.id}
            className={`locality-card ${location.isFeatured ? "locality-card--featured" : ""} ${activeClass}`}
            key={`${keyPrefix}${location.id}`}
            role="button"
            tabIndex={0}
            aria-label={`Select ${location.name}, ${location.zone}`}
        >
            {cardContent}
        </div>
    );
}

// Full-Size Spotlight Container (Top & Bottom) with Full-Size Image & Transparent Content
function LocalitySpotlightCard({ location, position = "top" }) {
    if (!location) return null;

    const isTop = position === "top";

    return (
        <div className={`locality-spotlight-card locality-spotlight-card--${position}`}>
            {/* Keyed inner wrapper: Triggers smooth cinematic crossfade on every location switch */}
            <div key={location.id} className="locality-spotlight-card__transition-wrapper">
                {/* Full-Size Background Image spanning 100% of the container */}
                <img
                    className="locality-spotlight-card__bg-image"
                    src={location.image}
                    alt={`${location.name}, Pune`}
                    loading="lazy"
                />
                <div className="locality-spotlight-card__overlay" />

                {/* Top Badge Row */}
                <div className="locality-spotlight-card__top">
                    <span className="locality-spotlight-card__zone-badge">
                        {location.zone}
                    </span>

                    <span className="locality-spotlight-card__stream-badge">
                        {isTop ? "▲ Upward Scroll Spotlight" : "▼ Downward Scroll Spotlight"}
                    </span>
                </div>

                {/* Middle Main Content Overlay */}
                <div className="locality-spotlight-card__content">
                    <span className="locality-spotlight-card__eyebrow">
                        <Sparkles size={11} className="text-gold" />
                        <span>{isTop ? "West & Core Corridor" : "East & Scenic Valley"}</span>
                    </span>
                    <h3 className="locality-spotlight-card__name">
                        {location.name}
                    </h3>
                    <p className="locality-spotlight-card__sub">
                        {location.subtitle || location.description}
                    </p>
                </div>

                {/* Bottom Transparent / Glassmorphic Information Bar */}
                <div className="locality-spotlight-card__body">
                    <div className="locality-spotlight-card__stat">
                        <span className="locality-spotlight-card__label">AVG. RATE</span>
                        <strong className="locality-spotlight-card__val">{location.avgRate}</strong>
                    </div>

                    <div className="locality-spotlight-card__stat">
                        <span className="locality-spotlight-card__label">DEMO LISTINGS</span>
                        <span className="locality-spotlight-card__pill">{location.listingsCount}</span>
                    </div>

                    <Link
                        href={`/buy?location=${encodeURIComponent(location.searchLocation)}`}
                        className="locality-spotlight-card__cta"
                        aria-label={`Explore properties in ${location.name}`}
                    >
                        <span>Explore</span>
                        <ArrowRight size={13} />
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default function BrowseLocations() {
    const [isPaused, setIsPaused] = useState(false);

    // Split locations into Left Column (even index) & Right Column (odd index)
    const leftColumn = locationsData.filter((_, idx) => idx % 2 === 0);
    const rightColumn = locationsData.filter((_, idx) => idx % 2 === 1);

    // Duplicate arrays for seamless infinite marquee loop
    const leftColDouble = [...leftColumn, ...leftColumn];
    const rightColDouble = [...rightColumn, ...rightColumn];

    // Refs for real-time boundary touch detection
    const wrapperRef = useRef(null);
    const leftTrackRef = useRef(null);
    const rightTrackRef = useRef(null);
    const topIdRef = useRef(null);
    const bottomIdRef = useRef(null);

    // Active location objects for Top & Bottom Spotlight panels
    const [activeLeftLocation, setActiveLeftLocation] = useState(leftColumn[0]);
    const [activeRightLocation, setActiveRightLocation] = useState(rightColumn[0]);

    // Boundary Touch Detection:
    // Top Panel updates strictly when a left scrolling card touches the TOP edge.
    // Bottom Panel updates strictly when a right scrolling card touches the BOTTOM edge.
    // The middle cards do NOT trigger the panel.
    useEffect(() => {
        let isMounted = true;

        const checkBoundaries = () => {
            if (!isMounted || !wrapperRef.current) return;
            const wrapperRect = wrapperRef.current.getBoundingClientRect();
            // Inactive / hidden on desktop view
            if (wrapperRect.width === 0 || wrapperRect.height === 0) return;

            // 1. LEFT TRACK: Find the card touching the TOP edge
            if (leftTrackRef.current) {
                const leftCards = leftTrackRef.current.children;
                let topCardId = null;
                let minTopDiff = Infinity;

                for (let i = 0; i < leftCards.length; i++) {
                    const card = leftCards[i];
                    const rect = card.getBoundingClientRect();
                    // Distance between the card's top edge and the scrolling window's top boundary
                    const diff = Math.abs(rect.top - wrapperRect.top);
                    if (diff < minTopDiff) {
                        minTopDiff = diff;
                        topCardId = card.getAttribute("data-location-id");
                    }
                }

                if (topCardId && topCardId !== topIdRef.current) {
                    topIdRef.current = topCardId;
                    const matched = leftColumn.find((loc) => String(loc.id) === String(topCardId));
                    if (matched) {
                        setActiveLeftLocation(matched);
                    }
                }
            }

            // 2. RIGHT TRACK: Find the card touching the BOTTOM edge
            if (rightTrackRef.current) {
                const rightCards = rightTrackRef.current.children;
                let bottomCardId = null;
                let minBottomDiff = Infinity;

                for (let i = 0; i < rightCards.length; i++) {
                    const card = rightCards[i];
                    const rect = card.getBoundingClientRect();
                    // Distance between the card's bottom edge and the scrolling window's bottom boundary
                    const diff = Math.abs(rect.bottom - wrapperRect.bottom);
                    if (diff < minBottomDiff) {
                        minBottomDiff = diff;
                        bottomCardId = card.getAttribute("data-location-id");
                    }
                }

                if (bottomCardId && bottomCardId !== bottomIdRef.current) {
                    bottomIdRef.current = bottomCardId;
                    const matched = rightColumn.find((loc) => String(loc.id) === String(bottomCardId));
                    if (matched) {
                        setActiveRightLocation(matched);
                    }
                }
            }
        };

        const intervalId = setInterval(checkBoundaries, 100);
        return () => {
            isMounted = false;
            clearInterval(intervalId);
        };
    }, [leftColumn, rightColumn]);

    // Active indices for count indicators (01 / 05)
    const activeLeftIdx = Math.max(
        0,
        leftColumn.findIndex((l) => l.id === activeLeftLocation?.id)
    );
    const activeRightIdx = Math.max(
        0,
        rightColumn.findIndex((l) => l.id === activeRightLocation?.id)
    );

    return (
        <section className="browse-locations" id="browse-locations" aria-label="Explore Properties by Locality">
            <div className="browse-locations__container">
                {/* Section Heading matching reference */}
                <div className="browse-locations__heading">
                    <div className="browse-locations__heading-text">
                        <span className="browse-locations__eyebrow">
                            FIND YOUR NEIGHBOURHOOD
                        </span>

                        <h2 className="browse-locations__title">
                            Explore Properties by Locality
                        </h2>

                        <p className="browse-locations__desc">
                            Explore prominent residential and commercial destinations. Listing counts strictly reflect current demonstration dataset.
                        </p>

                        <Link
                            href="/buy"
                            className="browse-locations__explore-link"
                        >
                            <span>Explore all 10 localities</span>
                            <ArrowRight size={15} className="browse-locations__explore-arrow" />
                        </Link>
                    </div>
                </div>

                {/* Desktop Grid (Standard multi-column) */}
                <div className="browse-locations__grid browse-locations__grid--desktop">
                    {locationsData.map((location) => (
                        <LocalityCard
                            key={location.id}
                            location={location}
                            keyPrefix="desktop-"
                            isDesktop={true}
                        />
                    ))}
                </div>

                {/* Mobile & Tablet Interactive Showcase: Top Container + Dual Tracks + Bottom Container */}
                <div className="browse-locations__mobile-showcase">
                    {/* 1. ABOVE FULL SIZE CONTAINER (Updates when Left Column card touches TOP) */}
                    <div className="browse-locations__spotlight-wrap browse-locations__spotlight-wrap--top">
                        <div className="browse-locations__spotlight-header">
                            <span className="browse-locations__spotlight-indicator">
                                <span className="browse-locations__pulse-dot browse-locations__pulse-dot--up" />
                                <span>UPWARD STREAM SPOTLIGHT</span>
                            </span>
                            <span className="browse-locations__spotlight-count">
                                {String(activeLeftIdx + 1).padStart(2, "0")} / {String(leftColumn.length).padStart(2, "0")}
                            </span>
                        </div>
                        <LocalitySpotlightCard location={activeLeftLocation} position="top" />
                    </div>

                    {/* 2. MIDDLE COUNTER-SCROLLING MARQUEE (Left UP, Right DOWN) */}
                    <div
                        ref={wrapperRef}
                        className={`browse-locations__marquee-wrapper ${isPaused ? "is-paused" : ""}`}
                        onTouchStart={() => setIsPaused(true)}
                        onTouchEnd={() => setIsPaused(false)}
                        onMouseEnter={() => setIsPaused(true)}
                        onMouseLeave={() => setIsPaused(false)}
                        aria-label="Localities counter-scrolling tracks"
                    >
                        {/* Column 1 (Left): Moves UPWARDS */}
                        <div className="browse-locations__column">
                            <div ref={leftTrackRef} className="browse-locations__track browse-locations__track--up">
                                {leftColDouble.map((location, idx) => (
                                    <LocalityCard
                                        key={`left-${location.id}-${idx}`}
                                        location={location}
                                        keyPrefix={`left-${idx}-`}
                                        activeType={location.id === activeLeftLocation?.id ? "top" : null}
                                        onCardClick={() => setActiveLeftLocation(location)}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Column 2 (Right): Moves DOWNWARDS */}
                        <div className="browse-locations__column">
                            <div ref={rightTrackRef} className="browse-locations__track browse-locations__track--down">
                                {rightColDouble.map((location, idx) => (
                                    <LocalityCard
                                        key={`right-${location.id}-${idx}`}
                                        location={location}
                                        keyPrefix={`right-${idx}-`}
                                        activeType={location.id === activeRightLocation?.id ? "bottom" : null}
                                        onCardClick={() => setActiveRightLocation(location)}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* 3. BELOW FULL SIZE CONTAINER (Updates when Right Column card touches BOTTOM) */}
                    <div className="browse-locations__spotlight-wrap browse-locations__spotlight-wrap--bottom">
                        <div className="browse-locations__spotlight-header">
                            <span className="browse-locations__spotlight-indicator">
                                <span className="browse-locations__pulse-dot browse-locations__pulse-dot--down" />
                                <span>DOWNWARD STREAM SPOTLIGHT</span>
                            </span>
                            <span className="browse-locations__spotlight-count">
                                {String(activeRightIdx + 1).padStart(2, "0")} / {String(rightColumn.length).padStart(2, "0")}
                            </span>
                        </div>
                        <LocalitySpotlightCard location={activeRightLocation} position="bottom" />
                    </div>
                </div>
            </div>
        </section>
    );
}
