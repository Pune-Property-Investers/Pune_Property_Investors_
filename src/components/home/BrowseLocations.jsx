"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import locationsData from "../../data/locationsData";
import "./BrowseLocations.css";

export default function BrowseLocations() {
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

                {/* 2-Column Mobile Grid, 3/4-Column Desktop Grid */}
                <div className="browse-locations__grid">
                    {locationsData.map((location) => (
                        <Link
                            href={`/buy?location=${encodeURIComponent(location.searchLocation)}`}
                            className={`locality-card ${location.isFeatured ? "locality-card--featured" : ""}`}
                            key={location.id}
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
                    ))}
                </div>
            </div>
        </section>
    );
}
