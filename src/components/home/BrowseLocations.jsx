"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import locationsData from "../../data/locationsData";
import "./BrowseLocations.css";

// Individual Locality Card in the Track or Grid
function LocalityCard({
    location,
    keyPrefix = "",
    isActive = false,
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

    // Mobile uses interactive clickable card that updates the spotlight container & can be tapped
    return (
        <div
            onClick={onCardClick}
            className={`locality-card ${location.isFeatured ? "locality-card--featured" : ""} ${
                isActive ? "locality-card--active" : ""
            }`}
            key={`${keyPrefix}${location.id}`}
            role="button"
            tabIndex={0}
            aria-label={`Select ${location.name}, ${location.zone}`}
        >
            {cardContent}
        </div>
    );
}

// Full-Size Spotlight Container (Top & Bottom)
function LocalitySpotlightCard({ location, position = "top" }) {
    if (!location) return null;

    const isTop = position === "top";

    return (
        <div className={`locality-spotlight-card locality-spotlight-card--${position}`}>
            <div className="locality-spotlight-card__media">
                <img
                    className="locality-spotlight-card__image"
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

                {/* Content Overlay */}
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
            </div>

            {/* Bottom Information Bar */}
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
    );
}

export default function BrowseLocations() {
    const [isPaused, setIsPaused] = useState(false);
    const [activeLeftIdx, setActiveLeftIdx] = useState(0);
    const [activeRightIdx, setActiveRightIdx] = useState(0);

    // Split locations into Left Column (even index) & Right Column (odd index)
    const leftColumn = locationsData.filter((_, idx) => idx % 2 === 0);
    const rightColumn = locationsData.filter((_, idx) => idx % 2 === 1);

    // Duplicate arrays for seamless infinite marquee loop
    const leftColDouble = [...leftColumn, ...leftColumn];
    const rightColDouble = [...rightColumn, ...rightColumn];

    // Current active items for Top & Bottom Spotlight containers
    const activeLeftLocation = leftColumn[activeLeftIdx] || leftColumn[0];
    const activeRightLocation = rightColumn[activeRightIdx] || rightColumn[0];

    // Sync Spotlight containers with the scroll speed (every ~5.4s moves to next card)
    useEffect(() => {
        if (isPaused) return;
        const timer = setInterval(() => {
            setActiveLeftIdx((prev) => (prev + 1) % leftColumn.length);
            setActiveRightIdx((prev) => (prev + 1) % rightColumn.length);
        }, 5400);

        return () => clearInterval(timer);
    }, [isPaused, leftColumn.length, rightColumn.length]);

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
                    {/* 1. ABOVE FULL SIZE CONTAINER (Updates as Left Column scrolls UP) */}
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
                        className={`browse-locations__marquee-wrapper ${isPaused ? "is-paused" : ""}`}
                        onTouchStart={() => setIsPaused(true)}
                        onTouchEnd={() => setIsPaused(false)}
                        onMouseEnter={() => setIsPaused(true)}
                        onMouseLeave={() => setIsPaused(false)}
                        aria-label="Localities counter-scrolling tracks"
                    >
                        {/* Column 1 (Left): Moves UPWARDS */}
                        <div className="browse-locations__column">
                            <div className="browse-locations__track browse-locations__track--up">
                                {leftColDouble.map((location, idx) => (
                                    <LocalityCard
                                        key={`left-${location.id}-${idx}`}
                                        location={location}
                                        keyPrefix={`left-${idx}-`}
                                        isActive={location.id === activeLeftLocation.id}
                                        onCardClick={() => setActiveLeftIdx(idx % leftColumn.length)}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Column 2 (Right): Moves DOWNWARDS */}
                        <div className="browse-locations__column">
                            <div className="browse-locations__track browse-locations__track--down">
                                {rightColDouble.map((location, idx) => (
                                    <LocalityCard
                                        key={`right-${location.id}-${idx}`}
                                        location={location}
                                        keyPrefix={`right-${idx}-`}
                                        isActive={location.id === activeRightLocation.id}
                                        onCardClick={() => setActiveRightIdx(idx % rightColumn.length)}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* 3. BELOW FULL SIZE CONTAINER (Updates as Right Column scrolls DOWN) */}
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
