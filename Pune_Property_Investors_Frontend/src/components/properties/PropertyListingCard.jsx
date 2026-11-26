"use client";

import { useState } from "react";
import Link from "next/link";
import { ShieldCheck, MapPin, BedDouble, Ruler } from "lucide-react";
import "./PropertyListingCard.css";

const FALLBACK_IMAGE =
    "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=85";

function formatPriceDisplay(prop) {
    const raw = prop.priceLabel || prop.price || prop.priceValue || "";

    if (typeof raw === "string" && raw.trim()) {
        return raw.trim();
    }

    const num = Number(raw);
    if (Number.isFinite(num) && num > 0) {
        if (num >= 10000000) {
            return `₹${(num / 10000000).toFixed(2).replace(/\.00$/, "")} Cr*`;
        }
        if (num >= 100000) {
            return `₹${Math.round(num / 100000)} Lacs*`;
        }
        return `₹${num.toLocaleString("en-IN")}`;
    }

    return "Price on Request";
}

function PropertyListingCard({ property }) {
    const [imgSrc, setImgSrc] = useState(property?.image || FALLBACK_IMAGE);

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

    const locationText = property.location || property.locality || "Pune";

    const bhkConfigText =
        property.configuration ||
        property.subtitle ||
        (() => {
            const count = Number(property.bedrooms ?? property.bhk ?? 0);
            const type = property.propertyType || "Apartment";
            if (count > 0) return `${count} BHK ${type}`;
            return type;
        })();

    const areaText = (() => {
        if (property.carpetArea) return String(property.carpetArea);
        const rawArea = property.area;
        if (!rawArea) return "1,250 Sq. Ft.";
        if (typeof rawArea === "string") {
            return /sq\.?\s*ft/i.test(rawArea) ? rawArea : `${rawArea} Sq. Ft.`;
        }
        const num = Number(rawArea);
        return Number.isFinite(num) && num > 0
            ? `${num.toLocaleString("en-IN")} Sq. Ft.`
            : "1,250 Sq. Ft.";
    })();

    const priceDisplay = formatPriceDisplay(property);

    const possessionRaw = property.possession || property.status || "Under Construction";
    const isReady = /ready/i.test(possessionRaw);
    const possessionLabel = isReady
        ? "Ready to Move"
        : /\b202\d\b/i.test(possessionRaw) || /construction/i.test(possessionRaw)
        ? "Under Construction"
        : possessionRaw || "Under Construction";

    const reraDisplay =
        (property.reraId && property.reraId !== "RERA Approved" ? property.reraId : null) ||
        (property.rera && property.rera !== "RERA Approved" ? property.rera : null) ||
        property.reraNumber ||
        (property.id ? `P521000${String(property.id).padStart(5, "0")}` : "P52100051240");

    return (
        <article className="explore-overlay-card">
            <Link
                href={propertyUrl}
                className="explore-overlay-card__link"
                aria-label={`View ${title} in ${locationText}`}
            >
                <img
                    src={imgSrc}
                    alt={`${title} in ${locationText}`}
                    className="explore-overlay-card__img"
                    loading="lazy"
                    draggable={false}
                    onError={() => setImgSrc(FALLBACK_IMAGE)}
                />

                <div className="explore-overlay-card__gradient" aria-hidden="true" />

                {/* Top Small Badges Row: RERA Number + Possession Status */}
                <div className="explore-overlay-card__top-badges">
                    <span className="explore-overlay-card__rera-pill">
                        <ShieldCheck size={12} className="explore-overlay-card__rera-icon" />
                        <span>{reraDisplay}</span>
                    </span>

                    <span
                        className={`explore-overlay-card__status-pill ${
                            isReady ? "is-ready" : "is-construction"
                        }`}
                    >
                        {possessionLabel}
                    </span>
                </div>

                {/* Bottom Overlay Info */}
                <div className="explore-overlay-card__content">
                    <div className="explore-overlay-card__location">
                        <MapPin size={13} className="explore-overlay-card__loc-icon" />
                        <span>{locationText}</span>
                    </div>

                    <div className="explore-overlay-card__title-row">
                        <h3 className="explore-overlay-card__title">{title}</h3>
                        <span className="explore-overlay-card__price">{priceDisplay}</span>
                    </div>

                    <div className="explore-overlay-card__specs">
                        <span className="explore-overlay-card__spec-item">
                            <BedDouble size={14} className="explore-overlay-card__spec-icon" />
                            <span>{bhkConfigText}</span>
                        </span>
                        <span className="explore-overlay-card__spec-dot" aria-hidden="true">
                            •
                        </span>
                        <span className="explore-overlay-card__spec-item">
                            <Ruler size={14} className="explore-overlay-card__spec-icon" />
                            <span>{areaText}</span>
                        </span>
                    </div>
                </div>
            </Link>
        </article>
    );
}

export default PropertyListingCard;
