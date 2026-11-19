"use client";

import { useState } from "react";
import Link from "next/link";
import {
    MapPin,
    BedDouble,
    Bath,
    Ruler,
    Heart,
    ShieldCheck,
    Star,
    Play,
    MessageSquare,
} from "lucide-react";
import "./PropertyListingCard.css";

function formatPrice(price) {
    const numericPrice = Number(price);

    if (!Number.isFinite(numericPrice) || numericPrice <= 0) {
        return "Price on Request";
    }

    if (numericPrice >= 10000000) {
        const crore = numericPrice / 10000000;
        return `₹${Number(crore.toFixed(2))} Cr`;
    }

    if (numericPrice >= 100000) {
        const lakh = numericPrice / 100000;
        return `₹${Number(lakh.toFixed(2))} L`;
    }

    return `₹${numericPrice.toLocaleString("en-IN")}`;
}

function PropertyListingCard({ property }) {
    const [isFavorite, setIsFavorite] = useState(false);

    if (!property) return null;

    const {
        id,
        title,
        projectName,
        location,
        locality,
        bhk,
        bedrooms,
        bathrooms,
        area,
        areaUnit = "sq.ft.",
        price,
        priceLabel,
        image,
        imageAlt,
        featured,
        verified,
        propertyType,
    } = property;

    const displayTitle = title || projectName || "Property for Sale";
    const displayLocation = [locality, location, "Pune"]
        .filter(Boolean)
        .flatMap((v) => String(v).split(","))
        .map((s) => s.trim())
        .filter((v, i, a) => v && a.findIndex((item) => item.toLowerCase() === v.toLowerCase()) === i)
        .slice(0, 2)
        .join(", ");

    const bedroomCount = Number(bedrooms ?? bhk ?? 0);
    const bathroomCount = Number(bathrooms ?? 0);
    const areaValue = Number(area ?? 0);
    const numericPrice = Number(price ?? 0);

    const displayPrice =
        priceLabel ||
        (numericPrice > 0 ? formatPrice(numericPrice) : "Price on Request");

    const propertyUrl = `/property/${id}`;

    return (
        <article className="property-listing-card">
                {/* HERO IMAGE CONTAINER */}
                <div className="property-listing-card__image-wrap">
                    <Link
                        href={propertyUrl}
                        className="property-listing-card__image-link"
                        aria-label={`View details of ${displayTitle}`}
                    >
                        {image ? (
                            <img
                                src={image}
                                alt={imageAlt || displayTitle}
                                loading="lazy"
                            />
                        ) : (
                            <div className="property-listing-card__image-placeholder">
                                <span>Property Image</span>
                            </div>
                        )}
                    </Link>

                    {/* Top Badges (Left) */}
                    <div className="property-listing-card__badges">
                        {featured ? (
                            <span className="property-listing-card__badge property-listing-card__badge--featured">
                                <Star size={11} fill="#e5b869" color="#e5b869" />
                                <span>Featured</span>
                            </span>
                        ) : verified ? (
                            <span className="property-listing-card__badge property-listing-card__badge--verified">
                                <ShieldCheck size={12} />
                                <span>Verified</span>
                            </span>
                        ) : null}
                    </div>

                    {/* Favorite Heart Button (Right) */}
                    <button
                        type="button"
                        className={`property-listing-card__favorite ${isFavorite ? "is-favorite" : ""
                            }`}
                        aria-label={
                            isFavorite
                                ? `Remove ${displayTitle} from favorites`
                                : `Save ${displayTitle} to favorites`
                        }
                        aria-pressed={isFavorite}
                        onClick={() => setIsFavorite((previous) => !previous)}
                    >
                        <Heart size={18} strokeWidth={1.8} />
                    </button>

                    {/* Video Tour Floating Pill Badge (Bottom-Left of Image) */}
                    <Link
                        href={`${propertyUrl}#video-tour`}
                        className="property-listing-card__video-badge"
                        aria-label={`Watch Video Tour for ${displayTitle}`}
                    >
                        <span className="property-listing-card__video-icon">
                            <Play size={10} fill="#ffffff" color="#ffffff" />
                        </span>
                        <span>Video Tour</span>
                    </Link>
                </div>

                {/* DARK LUXURY FLOATING SHEET */}
                <div className="property-listing-card__body">
                    <div className="property-listing-card__main-info">
                        <p className="property-listing-card__project">
                            {projectName || propertyType || "Sample Residential Project"}
                        </p>

                        <h3 className="property-listing-card__title">
                            <Link href={propertyUrl}>
                                {displayTitle}
                            </Link>
                        </h3>

                        <p className="property-listing-card__location">
                            <MapPin size={13.5} aria-hidden="true" />
                            <span>{displayLocation || "Pune, Maharashtra"}</span>
                        </p>
                    </div>

                    {/* Specifications Row with Vertical Dividers */}
                    <div className="property-listing-card__specifications">
                        {bedroomCount > 0 && (
                            <div className="property-listing-card__spec">
                                <BedDouble size={16} aria-hidden="true" />
                                <span>{bedroomCount} BHK</span>
                            </div>
                        )}

                        {bedroomCount > 0 && bathroomCount > 0 && (
                            <span className="property-listing-card__spec-divider" aria-hidden="true" />
                        )}

                        {bathroomCount > 0 && (
                            <div className="property-listing-card__spec">
                                <Bath size={16} aria-hidden="true" />
                                <span>
                                    {bathroomCount}{" "}
                                    {bathroomCount === 1 ? "Bathroom" : "Bathrooms"}
                                </span>
                            </div>
                        )}

                        {(bedroomCount > 0 || bathroomCount > 0) && areaValue > 0 && (
                            <span className="property-listing-card__spec-divider" aria-hidden="true" />
                        )}

                        {areaValue > 0 && (
                            <div className="property-listing-card__spec">
                                <Ruler size={16} aria-hidden="true" />
                                <span>
                                    {areaValue.toLocaleString("en-IN")} {areaUnit}
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Full-width Gold Enquire Now Button */}
                    <div className="property-listing-card__footer">
                        <Link
                            href="/#home-contact"
                            className="property-listing-card__contact-button"
                            aria-label={`Enquire about ${displayTitle}`}
                        >
                            <MessageSquare size={16} aria-hidden="true" />
                            <span>Enquire Now</span>
                        </Link>
                    </div>
                </div>
        </article>
    );
}

export default PropertyListingCard;
