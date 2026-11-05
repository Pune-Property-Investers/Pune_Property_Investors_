"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
    MapPin,
    BedDouble,
    Ruler,
    CalendarDays,
    Building2,
    ChevronRight,
    Home,
} from "lucide-react";

import "./PropertyHeroHead.css";

const FALLBACK_LUXURY_SLIDES = [
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2000&q=85",
    "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=2000&q=85",
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=85",
];

function getCategoryRoute(propertyType) {
    if (!propertyType) return "/buy";
    const lower = propertyType.toLowerCase();
    if (lower.includes("commercial")) return "/commercial";
    if (lower.includes("plot") || lower.includes("land")) return "/plots";
    if (lower.includes("launch")) return "/projects";
    return "/buy";
}

export default function PropertyHeroHead({
    property = {},
    title,
    location,
    configuration,
    area,
    backgroundImage,
}) {
    const propertyType = property.propertyType || "Residential";
    const categoryRoute = getCategoryRoute(propertyType);

    // Multi-photo slides for smooth crossfade photo change effect
    const slides = useMemo(() => {
        let list = [];
        if (Array.isArray(property.images) && property.images.length > 0) {
            list = property.images.filter(Boolean);
        } else if (property.image) {
            list = [property.image];
        } else if (backgroundImage) {
            list = [backgroundImage];
        }

        // If only 1 image provided, augment with complementary views so slideshow transitions smoothly
        if (list.length === 1) {
            const extra = FALLBACK_LUXURY_SLIDES.filter((url) => url !== list[0]);
            list = [list[0], ...extra.slice(0, 3)];
        } else if (list.length === 0) {
            list = FALLBACK_LUXURY_SLIDES;
        }

        return list;
    }, [property.images, property.image, backgroundImage]);

    const [currentSlide, setCurrentSlide] = useState(0);

    // Auto-advance photo slideshow
    useEffect(() => {
        if (slides.length <= 1) return;
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5500);

        return () => clearInterval(interval);
    }, [slides.length]);

    return (
        <section className="property-hero-head" aria-label="Property header">
            {/* Background Image Slideshow with smooth crossfade */}
            <div className="property-hero-head__slides" aria-hidden="true">
                {slides.map((imgUrl, index) => (
                    <div
                        key={index}
                        className={`property-hero-head__slide ${
                            index === currentSlide ? "is-active" : ""
                        }`}
                        style={{ backgroundImage: `url(${imgUrl})` }}
                    />
                ))}
            </div>

            {/* High-Visibility Dual-Layer Gradient Overlay */}
            <div className="property-hero-head__overlay" aria-hidden="true" />

            <div className="property-hero-head__container">
                {/* Refined Luxury Breadcrumbs */}
                <nav
                    className="property-hero-head__breadcrumb"
                    aria-label="Breadcrumbs"
                >
                    <Link href="/" className="property-hero-head__breadcrumb-home">
                        <Home size={13} />
                        <span>Home</span>
                    </Link>
                    <ChevronRight size={13} className="property-hero-head__crumb-sep" />
                    <Link href="/buy">Properties</Link>
                    <ChevronRight size={13} className="property-hero-head__crumb-sep" />
                    <Link href={categoryRoute}>{propertyType}</Link>
                    <ChevronRight size={13} className="property-hero-head__crumb-sep" />
                    <span className="property-hero-head__crumb-current" title={title}>
                        {title}
                    </span>
                </nav>

                <div className="property-hero-head__content">
                    {/* Property Title */}
                    <h1 className="property-hero-head__title">{title}</h1>

                    {/* Location & Project Sub-details */}
                    <div className="property-hero-head__meta">
                        <p className="property-hero-head__location">
                            <MapPin size={16} />
                            <span>{location || "Pune, Maharashtra"}</span>
                        </p>

                        {property.projectName &&
                            property.projectName !== title && (
                                <span className="property-hero-head__project-name">
                                    • Project: {property.projectName}
                                </span>
                            )}

                        {property.developer && (
                            <span className="property-hero-head__developer">
                                • Developer: {property.developer}
                            </span>
                        )}
                    </div>

                    {/* Quick Feature Highlights */}
                    <div className="property-hero-head__highlights">
                        {configuration && (
                            <div className="property-hero-head__pill">
                                <BedDouble size={16} />
                                <span>{configuration}</span>
                            </div>
                        )}

                        {area && area !== "On request" && (
                            <div className="property-hero-head__pill">
                                <Ruler size={16} />
                                <span>{area}</span>
                            </div>
                        )}

                        {property.possession && (
                            <div className="property-hero-head__pill">
                                <CalendarDays size={16} />
                                <span>{property.possession}</span>
                            </div>
                        )}

                        <div className="property-hero-head__pill">
                            <Building2 size={16} />
                            <span>{propertyType}</span>
                        </div>
                    </div>
                </div>

                {/* Slideshow Controls Footer */}
                {slides.length > 1 && (
                    <div className="property-hero-head__footer">
                        <div className="property-hero-head__location-pill">
                            <MapPin size={13} />
                            <span>{location || "Pune, Maharashtra"}</span>
                            <span className="property-hero-head__pill-dot">•</span>
                            <span className="property-hero-head__pill-tag">
                                Photo {currentSlide + 1} of {slides.length}
                            </span>
                        </div>

                        <div
                            className="property-hero-head__dots"
                            role="tablist"
                            aria-label="Property Photos"
                        >
                            {slides.map((_, index) => (
                                <button
                                    key={index}
                                    type="button"
                                    className={`property-hero-head__dot ${
                                        index === currentSlide ? "is-active" : ""
                                    }`}
                                    onClick={() => setCurrentSlide(index)}
                                    aria-label={`View photo ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
