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
    const [logoFailed, setLogoFailed] = useState(false);

    if (!property) return null;

    const propertyUrl = property.id ? `/property/${property.id}` : "/buy";
    const badgeText = property.badge || "Featured";

    const configText =
        property.configuration ||
        (property.bedrooms
            ? `${property.bedrooms} BHK Apartment`
            : property.propertyType || "Residential");

    const developerName = property.developer || property.brandName || "Prime Realty";

    /* ── Price: split into amount line + "Cr" line ── */
    const rawPrice = property.price || "";
    // Extract the rupee amount part and the unit (Cr/Lac)
    const priceMatch = rawPrice.match(/^(₹\s*[\d.,]+\s*-\s*[\d.,]+)\s*(Cr|Lac|L)?$/i);
    const priceAmount = priceMatch ? priceMatch[1] : rawPrice;
    const priceUnit = priceMatch ? priceMatch[2] || "" : "";

    /* ── Possession / Status pill ── */
    const possessionRaw = property.possession || property.status || "Ready to Move";
    const isReady = possessionRaw.toLowerCase() === "ready";
    const possessionLabel = isReady
        ? "Ready to Move"
        : `Possession ${possessionRaw}`;

    /* ── RERA: show the actual RERA ID when available ── */
    const reraDisplay =
        property.reraId && property.reraId !== "RERA Approved"
            ? property.reraId
            : property.rera || "RERA Approved";

    // Base path support for GitHub Pages and relative asset resolution
    const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
    const rawLogo = property.logo || property.logoUrl;
    const developerDomain = property.domain || "parasbuildtech.com";
    const logoSrc = rawLogo
        ? (rawLogo.startsWith("http") ? rawLogo : `${basePath}${rawLogo}`)
        : `https://www.google.com/s2/favicons?domain=${developerDomain}&sz=128`;

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
                        draggable={false}
                        onError={() => setImgSrc(FALLBACK_IMAGE)}
                    />

                    {/* Featured Tag (Magenta Pill) */}
                    <span className="property-card__badge">
                        {badgeText}
                    </span>

                    {/* Star Favorite Button */}
                    <button
                        type="button"
                        className={`property-card__star-btn ${isStarred ? "property-card__star-btn--active" : ""
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

                </div>

                {/* ── INNER CARD (smaller, sits inside the outer card's bottom) ── */}
                <div className="property-card__inner">
                    {/* Overlapping Circular Company Logo */}
                    <div className="property-card__logo-wrap">
                        <div className="property-card__logo-badge">
                            {!logoFailed && logoSrc ? (
                                <div className="property-card__brand-logo-box">
                                    <img
                                        src={logoSrc}
                                        alt={`${developerName} official logo`}
                                        className="property-card__org-logo"
                                        loading="lazy"
                                        onError={() => setLogoFailed(true)}
                                    />
                                </div>
                            ) : (
                                <div className="property-card__logo-fallback">
                                    <Crown size={14} className="property-card__crown-icon" />
                                    <span className="property-card__logo-top">
                                        {property.logoBrand || developerName.split(" ")[0] || "PARAS"}
                                    </span>
                                    <span className="property-card__logo-mid">
                                        {property.name?.split(" ")[1]?.toUpperCase() || "EMPEROR"}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Inner card text body */}
                    <div className="property-card__body">
                        {/* Project Title */}
                        <h3 className="property-card__title">
                            {property.name}
                        </h3>

                        {/* Configuration & Locality Subtitle (truncated with ellipsis) */}
                        <p className="property-card__sub">
                            {configText},…
                        </p>

                        {/* Price & Status Row */}
                        <div className="property-card__price-row">
                            <strong className="property-card__price">
                                <span className="property-card__price-amount">{priceAmount}</span>
                                {priceUnit && (
                                    <span className="property-card__price-unit">{priceUnit}</span>
                                )}
                            </strong>

                            <span
                                className={`property-card__status ${isReady
                                        ? "property-card__status--ready"
                                        : "property-card__status--possession"
                                    }`}
                            >
                                {possessionLabel}
                            </span>
                        </div>

                        {/* Footer Row: RERA ID & View Project CTA */}
                        <div className="property-card__footer">
                            <span className="property-card__rera">
                                {reraDisplay}
                            </span>

                            <span className="property-card__cta">
                                <span>View Project</span>
                                <ArrowUpRight size={14} className="property-card__cta-arrow" />
                            </span>
                        </div>
                    </div>
                </div>
            </Link>
        </article>
    );
}

export default PropertyCard;