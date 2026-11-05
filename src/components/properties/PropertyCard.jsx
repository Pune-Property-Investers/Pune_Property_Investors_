"use client";

import { useState } from "react";
import Link from "next/link";
import { Star, Crown, ArrowUpRight } from "lucide-react";
import "./PropertyCard.css";

const FALLBACK_IMAGE =
    "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=85";

function PropertyCard({ property }) {
    const [imgSrc, setImgSrc] = useState(property?.image || FALLBACK_IMAGE);
    const [isStarred, setIsStarred] = useState(false);

    if (!property) return null;

    const propertyUrl = property.id ? `/property/${property.id}` : "/buy";
    const badgeText = property.badge || "Featured";

    const configText =
        property.configuration ||
        (property.bedrooms
            ? `${property.bedrooms} BHK Apartment`
            : property.propertyType || "Residential");

    const statusText = property.status || "Ready to Move";
    const developerName = property.developer || property.brandName || "Prime Realty";
    const reraText = property.reraId || property.rera ? "RERA Approved" : "RERA Approved";

    const toggleStar = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsStarred((prev) => !prev);
    };

    return (
        <article className="property-card">
            <Link
                href={propertyUrl}
                className="property-card__link"
                aria-label={`View ${property.name} in ${property.location}`}
            >
                {/* TOP MEDIA AREA WITH BUILDING SITE IMAGE */}
                <div className="property-card__media">
                    <img
                        src={imgSrc}
                        alt={`${property.name} site view`}
                        className="property-card__img"
                        loading="lazy"
                        onError={() => setImgSrc(FALLBACK_IMAGE)}
                    />

                    {/* Featured Tag (Vibrant Magenta Pill) */}
                    <span className="property-card__badge">
                        {badgeText}
                    </span>

                    {/* Star Favorite Button */}
                    <button
                        type="button"
                        className={`property-card__star-btn ${
                            isStarred ? "property-card__star-btn--active" : ""
                        }`}
                        onClick={toggleStar}
                        aria-label={
                            isStarred ? "Remove from favorites" : "Add to favorites"
                        }
                    >
                        <Star
                            size={16}
                            fill={isStarred ? "#fbbf24" : "none"}
                            color={isStarred ? "#fbbf24" : "#ffffff"}
                            strokeWidth={2}
                        />
                    </button>

                    {/* OVERLAPPING CIRCULAR COMPANY LOGO BADGE (White circle with Crown) */}
                    <div className="property-card__logo-wrap">
                        <div className="property-card__logo-badge">
                            <Crown size={13} className="property-card__crown-icon" />
                            <span className="property-card__logo-top">
                                {property.logoBrand || developerName.split(" ")[0] || "PARAS"}
                            </span>
                            <span className="property-card__logo-mid">
                                {property.name?.split(" ")[1]?.toUpperCase() || property.name?.toUpperCase() || "EMPEROR"}
                            </span>
                            <span className="property-card__logo-bot">
                                {property.logoSub || "THE ICON TOWER"}
                            </span>
                        </div>
                    </div>
                </div>

                {/* BOTTOM WHITE CARD BODY */}
                <div className="property-card__body">
                    {/* Project Title */}
                    <h3 className="property-card__title">
                        {property.name}
                    </h3>

                    {/* Configuration & Locality Subtitle */}
                    <p className="property-card__sub">
                        {configText}, {property.location}
                    </p>

                    {/* Price & Status Row */}
                    <div className="property-card__price-row">
                        <strong className="property-card__price">
                            {property.price}
                        </strong>

                        <span className={`property-card__status ${
                            statusText.toLowerCase().includes("ready")
                                ? "property-card__status--ready"
                                : "property-card__status--ongoing"
                        }`}>
                            {statusText}
                        </span>
                    </div>

                    {/* Footer Row: RERA Approved & View Project CTA */}
                    <div className="property-card__footer">
                        <span className="property-card__rera">
                            {reraText}
                        </span>

                        <span className="property-card__cta">
                            <span>View Project</span>
                            <ArrowUpRight size={14} className="property-card__cta-arrow" />
                        </span>
                    </div>
                </div>
            </Link>
        </article>
    );
}

export default PropertyCard;
