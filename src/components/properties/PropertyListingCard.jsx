"use client";

import { useState } from "react";
import Link from "next/link";
import { Star, ArrowUpRight } from "lucide-react";
import "./PropertyListingCard.css";

const FALLBACK_IMAGE =
    "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=85";

function formatPriceParts(prop) {
    const raw = prop.priceLabel || prop.price || prop.priceValue || "";

    if (typeof raw === "string" && raw.trim()) {
        const match = raw.match(/^(₹\s*[\d.,\s-]+)\s*(Cr|Crore|Lac|Lakh|L)?$/i);
        if (match) {
            return {
                amount: match[1].trim(),
                unit: match[2]
                    ? match[2]
                          .replace(/Crore/i, "Cr")
                          .replace(/Lakh/i, "Lakh")
                          .replace(/Lac/i, "Lac")
                    : "",
            };
        }
        return { amount: raw, unit: "" };
    }

    const num = Number(raw);
    if (Number.isFinite(num) && num > 0) {
        if (num >= 10000000) {
            return { amount: `₹ ${(num / 10000000).toFixed(2)}`, unit: "Cr" };
        }
        if (num >= 100000) {
            return { amount: `₹ ${(num / 100000).toFixed(2)}`, unit: "Lakh" };
        }
        return { amount: `₹ ${num.toLocaleString("en-IN")}`, unit: "" };
    }

    return { amount: "Price on Request", unit: "" };
}

function PropertyListingCard({ property }) {
    const [imgSrc, setImgSrc] = useState(property?.image || FALLBACK_IMAGE);
    const [isStarred, setIsStarred] = useState(false);

    if (!property) return null;

    const propertyUrl = property.slug
        ? `/properties/${property.slug}`
        : property.id
        ? `/property/${property.id}`
        : "/buy";

    const title =
        property.name ||
        property.title ||
        property.projectName ||
        "Premium Residence";

    const badgeText =
        property.badge ||
        (property.featured ? "Featured" : property.verified ? "Verified" : "Featured");

    const configText =
        property.configuration ||
        property.subtitle ||
        (() => {
            const count = Number(property.bedrooms ?? property.bhk ?? 0);
            const type = property.propertyType || "Apartment";
            const loc = property.locality || property.location;
            const locClean = loc ? loc.split(",")[0].trim() : "";
            if (count > 0 && locClean) return `${count} BHK ${type}, ${locClean}`;
            if (count > 0) return `${count} BHK ${type}`;
            if (locClean) return `${type}, ${locClean}`;
            return "Residential Suite";
        })();

    const { amount: priceAmount, unit: priceUnit } = formatPriceParts(property);

    const possessionRaw = property.possession || property.status || "Under Construction";
    const isReady = /ready/i.test(possessionRaw);
    const possessionLabel = isReady
        ? "Ready to Move"
        : /\b202\d\b/i.test(possessionRaw) || /construction/i.test(possessionRaw)
        ? "Under Construction"
        : possessionRaw
        ? `Possession ${possessionRaw}`
        : "Under Construction";

    const reraDisplay =
        (property.reraId && property.reraId !== "RERA Approved" ? property.reraId : null) ||
        (property.rera && property.rera !== "RERA Approved" ? property.rera : null) ||
        property.reraNumber ||
        (property.id ? `P521000${String(property.id).padStart(5, "0")}` : "P52100051240");

    const toggleStar = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsStarred((prev) => !prev);
    };

    return (
        <article className="property-listing-card-modern">
            <Link
                href={propertyUrl}
                className="property-listing-card-modern__link"
                aria-label={`View ${title} in ${property.location || "Pune"}`}
            >
                {/* TOP MEDIA AREA WITH BUILDING SITE IMAGE */}
                <div className="property-listing-card-modern__media">
                    <img
                        src={imgSrc}
                        alt={`${title} site view`}
                        className="property-listing-card-modern__img"
                        loading="lazy"
                        draggable={false}
                        onError={() => setImgSrc(FALLBACK_IMAGE)}
                    />

                    {/* Featured Tag (Magenta Pill) */}
                    <span className="property-listing-card-modern__badge">
                        {badgeText}
                    </span>

                    {/* Star Favorite Button */}
                    <button
                        type="button"
                        className={`property-listing-card-modern__star-btn ${
                            isStarred ? "property-listing-card-modern__star-btn--active" : ""
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
                <div className="property-listing-card-modern__inner">
                    <div className="property-listing-card-modern__body">
                        {/* Project Title */}
                        <h3 className="property-listing-card-modern__title">
                            {title}
                        </h3>

                        {/* Configuration & Locality Subtitle (truncated with ellipsis) */}
                        <p className="property-listing-card-modern__sub" title={configText}>
                            {configText},…
                        </p>

                        {/* Price & Status Row */}
                        <div className="property-listing-card-modern__price-row">
                            <strong className="property-listing-card-modern__price">
                                <span className="property-listing-card-modern__price-amount">{priceAmount}</span>
                                {priceUnit && (
                                    <span className="property-listing-card-modern__price-unit">{priceUnit}</span>
                                )}
                            </strong>

                            <span
                                className={`property-listing-card-modern__status ${
                                    isReady
                                        ? "property-listing-card-modern__status--ready"
                                        : "property-listing-card-modern__status--possession"
                                }`}
                            >
                                {possessionLabel}
                            </span>
                        </div>

                        {/* Footer Row: RERA ID & View Project CTA */}
                        <div className="property-listing-card-modern__footer">
                            <span className="property-listing-card-modern__rera">
                                {reraDisplay}
                            </span>

                            <span className="property-listing-card-modern__cta">
                                <span>View Project</span>
                                <ArrowUpRight size={14} className="property-listing-card-modern__cta-arrow" />
                            </span>
                        </div>
                    </div>
                </div>
            </Link>
        </article>
    );
}

export default PropertyListingCard;
