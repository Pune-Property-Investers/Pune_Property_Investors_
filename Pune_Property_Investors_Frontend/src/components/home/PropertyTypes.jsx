"use client";

import Link from "next/link";
import {
    Building2,
    Home as HomeIcon,
    Briefcase,
    Trees,
    Sparkles,
    ArrowUpRight,
    Compass,
    Layers,
} from "lucide-react";
import "./PropertyTypes.css";

const propertyTypesData = [
    {
        id: "apartments",
        title: "Luxury Apartments",
        subtitle: "High-Rise Sky Condos & Penthouses",
        count: "280+ Properties",
        priceRange: "From ₹ 55 Lacs to ₹ 4.5 Cr",
        href: "/buy?type=Apartment",
        image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
        icon: Building2,
        popularAreas: ["Kharadi", "Hinjewadi", "Baner", "Wakad"],
        featuredTag: "Most Popular",
    },
    {
        id: "villas",
        title: "Villas & Row Houses",
        subtitle: "Independent Gated Living with Private Lawns",
        count: "65+ Exclusive Residences",
        priceRange: "From ₹ 1.45 Cr to ₹ 8.5 Cr",
        href: "/buy?type=Villa",
        image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80",
        icon: HomeIcon,
        popularAreas: ["Balewadi", "NIBM", "Wagholi", "Bavdhan"],
        featuredTag: "Ultra Luxury",
    },
    {
        id: "commercial",
        title: "Commercial & Offices",
        subtitle: "Grade-A IT Spaces, Retail Showrooms & SCO",
        count: "90+ High-Yield Assets",
        priceRange: "From ₹ 75 Lacs to ₹ 12 Cr",
        href: "/commercial",
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
        icon: Briefcase,
        popularAreas: ["Viman Nagar", "Kharadi EON", "Baner High Street"],
        featuredTag: "High ROI (7–9%)",
    },
    {
        id: "plots",
        title: "NA Plots & Land",
        subtitle: "RERA Registered Gated Villa & Investment Plots",
        count: "120+ Clear Title Plots",
        priceRange: "From ₹ 25 Lacs to ₹ 2.2 Cr",
        href: "/plots",
        image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80",
        icon: Trees,
        popularAreas: ["Pirangut", "Marunji", "Wagholi", "Talegaon"],
        featuredTag: "100% Clear Title",
    },
];

export default function PropertyTypes() {
    return (
        <section className="property-types-section" aria-label="Explore by Property Type">
            <div className="property-types-container">
                {/* Section Header */}
                <div className="property-types-header">
                    <div className="property-types-eyebrow-wrap">
                        <span className="property-types-eyebrow-line" />
                        <span className="property-types-eyebrow">
                            <Sparkles size={13} /> CURATED ASSET CLASSES
                        </span>
                        <span className="property-types-eyebrow-line" />
                    </div>

                    <h2 className="property-types-title">
                        Explore by <span>Property Type</span>
                    </h2>

                    <p className="property-types-subtitle">
                        From high-rise riverfront apartments to private gated villas and high-yield commercial spaces across Pune.
                    </p>
                </div>

                {/* 4-Card Luxury Editorial Grid */}
                <div className="property-types-grid">
                    {propertyTypesData.map((type) => {
                        const Icon = type.icon;
                        return (
                            <Link
                                key={type.id}
                                href={type.href}
                                className="property-type-card"
                            >
                                {/* Background Image with Smooth Zoom */}
                                <div className="property-type-card__media">
                                    <img
                                        src={type.image}
                                        alt={type.title}
                                        className="property-type-card__img"
                                        loading="lazy"
                                    />
                                    <div className="property-type-card__overlay" />
                                </div>

                                {/* Top Floating Badge & Icon */}
                                <div className="property-type-card__top">
                                    <div className="property-type-card__icon-badge">
                                        <Icon size={20} strokeWidth={1.8} />
                                    </div>
                                    <span className="property-type-card__tag">
                                        {type.featuredTag}
                                    </span>
                                </div>

                                {/* Bottom Content Box */}
                                <div className="property-type-card__content">
                                    <div className="property-type-card__count">
                                        {type.count}
                                    </div>

                                    <h3 className="property-type-card__name">
                                        {type.title}
                                    </h3>

                                    <p className="property-type-card__desc">
                                        {type.subtitle}
                                    </p>

                                    <div className="property-type-card__footer">
                                        <span className="property-type-card__price">
                                            {type.priceRange}
                                        </span>
                                        <div className="property-type-card__arrow-btn">
                                            <ArrowUpRight size={17} />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

