"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import locationsData from "../../data/locationsData";
import "./BrowseLocations.css";

// Individual Locality Card
function LocalityCard({ location, keyPrefix = "" }) {
    return (
        <Link
            href={`/buy?location=${encodeURIComponent(location.searchLocation)}`}
            className={`locality-card ${location.isFeatured ? "locality-card--featured" : ""}`}
            key={`${keyPrefix}${location.id}`}
            aria-label={`Explore properties in ${location.name}, ${location.zone}`}
        >
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
        </Link>
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
                        <LocalityCard key={location.id} location={location} keyPrefix="desktop-" />
                    ))}
                </div>

                {/* Mobile & Tablet Counter-Scrolling Showcase: Left moves UP, Right moves DOWN */}
                <div
                    className={`browse-locations__marquee-wrapper ${isPaused ? "is-paused" : ""}`}
                    onTouchStart={() => setIsPaused(true)}
                    onTouchEnd={() => setIsPaused(false)}
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                    aria-label="Localities counter-scrolling view"
                >
                    {/* Column 1 (Left): Moves UPWARDS */}
                    <div className="browse-locations__column">
                        <div className="browse-locations__track browse-locations__track--up">
                            {leftColDouble.map((location, idx) => (
                                <LocalityCard
                                    key={`left-${location.id}-${idx}`}
                                    location={location}
                                    keyPrefix={`left-${idx}-`}
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
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
