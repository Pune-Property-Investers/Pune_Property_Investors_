"use client";

import { useState } from "react";
import Link from "next/link";
import {
    MapPin,
    BedDouble,
    Bath,
    Ruler,
    ArrowUpRight,
    Heart,
    ShieldCheck,
    CalendarDays,
} from "lucide-react";

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
        pricePerSqFt,
        possession,
        image,
        imageAlt,
        featured,
        verified,
        amenities = [],
        propertyType,
    } = property;

    const displayTitle = title || projectName || "Property for Sale";
    const displayLocation = [locality, location]
        .filter((value, index, array) => value && array.indexOf(value) === index)
        .join(", ");

    const bedroomCount = Number(bedrooms ?? bhk ?? 0);
    const bathroomCount = Number(bathrooms ?? 0);
    const areaValue = Number(area ?? 0);
    const numericPrice = Number(price ?? 0);

    const displayPrice =
        priceLabel ||
        (numericPrice > 0 ? formatPrice(numericPrice) : "Price on Request");

    const displayPricePerSqFt =
        pricePerSqFt ||
        (areaValue > 0 && numericPrice > 0
            ? `₹${Math.round(numericPrice / areaValue).toLocaleString("en-IN")}/sq.ft.`
            : "");

    return (
        <article className="property-listing-card">
            <div className="property-listing-card__image">
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

                <div className="property-listing-card__badges">
                    {featured && (
                        <span className="property-listing-card__badge property-listing-card__badge--featured">
                            Featured
                        </span>
                    )}

                    {verified && (
                        <span className="property-listing-card__badge property-listing-card__badge--verified">
                            <ShieldCheck size={13} />
                            Verified
                        </span>
                    )}
                </div>

                <button
                    type="button"
                    className={`property-listing-card__favorite ${
                        isFavorite ? "is-favorite" : ""
                    }`}
                    aria-label={
                        isFavorite
                            ? `Remove ${displayTitle} from favorites`
                            : `Save ${displayTitle} to favorites`
                    }
                    aria-pressed={isFavorite}
                    onClick={() => setIsFavorite((previous) => !previous)}
                >
                    <Heart size={19} />
                </button>

                <span className="property-listing-card__image-caption">
                    For Sale
                </span>
            </div>

            <div className="property-listing-card__body">
                <div className="property-listing-card__heading">
                    <div className="property-listing-card__main-info">
                        <p className="property-listing-card__project">
                            {projectName || propertyType || "Property for Sale"}
                        </p>

                        <h3 className="property-listing-card__title">
                            {displayTitle}
                        </h3>

                        <p className="property-listing-card__location">
                            <MapPin size={15} aria-hidden="true" />
                            <span>
                                {displayLocation || "Pune, Maharashtra"}
                            </span>
                        </p>
                    </div>

                    <div className="property-listing-card__price">
                        <strong>{displayPrice}</strong>

                        {displayPricePerSqFt && (
                            <span>{displayPricePerSqFt}</span>
                        )}
                    </div>
                </div>

                <div className="property-listing-card__specifications">
                    {bedroomCount > 0 && (
                        <div className="property-listing-card__spec">
                            <BedDouble size={17} aria-hidden="true" />
                            <span>
                                {bedroomCount} BHK
                            </span>
                        </div>
                    )}

                    {bathroomCount > 0 && (
                        <div className="property-listing-card__spec">
                            <Bath size={17} aria-hidden="true" />
                            <span>
                                {bathroomCount}{" "}
                                {bathroomCount === 1 ? "Bathroom" : "Bathrooms"}
                            </span>
                        </div>
                    )}

                    {areaValue > 0 && (
                        <div className="property-listing-card__spec">
                            <Ruler size={17} aria-hidden="true" />
                            <span>
                                {areaValue.toLocaleString("en-IN")} {areaUnit}
                            </span>
                        </div>
                    )}
                </div>

                {possession && (
                    <p className="property-listing-card__possession">
                        <CalendarDays size={15} aria-hidden="true" />
                        <span>{possession}</span>
                    </p>
                )}

                {amenities.length > 0 && (
                    <div className="property-listing-card__amenities">
                        {amenities.slice(0, 3).map((amenity) => (
                            <span key={amenity}>{amenity}</span>
                        ))}

                        {amenities.length > 3 && (
                            <span>+{amenities.length - 3} more</span>
                        )}
                    </div>
                )}

                <div className="property-listing-card__footer">
                    <div className="property-listing-card__trust">
                        {verified && (
                            <>
                                <ShieldCheck size={15} />
                                <span>Verified Listing</span>
                            </>
                        )}
                    </div>

                    <div className="property-listing-card__actions">
                        <Link
                            href={`/property/${id}`}
                            className="property-listing-card__details-button"
                        >
                            View Details
                            <ArrowUpRight size={16} aria-hidden="true" />
                        </Link>

                        <Link
                            href="/#home-contact"
                            className="property-listing-card__contact-button"
                            aria-label={`Enquire about ${displayTitle}`}
                        >
                            Enquire
                        </Link>
                    </div>
                </div>
            </div>
        </article>
    );
}

export default PropertyListingCard;
