"use client";

import { useState } from "react";
import Link from "next/link";
import { Star, ArrowUpRight } from "lucide-react";
import "./PropertyCard.css";

const FALLBACK_IMAGE =
    "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=85";

const KNOWN_LOGOS = {
    godrej: "/images/logos/godrej.png",
    kohinoor: "/images/logos/kohinoor.png",
    kolte: "/images/logos/kolte-patil.jpg",
    "kolte patil": "/images/logos/kolte-patil.jpg",
    lodha: "/images/logos/lodha.png",
    paras: "/images/logos/paras-emperor.png",
    shapoorji: "/images/logos/shapoorji.svg",
    sobha: "/images/logos/sobha.png",
    vtp: "/images/logos/vtp.png",
};

const KNOWN_DOMAINS = {
    godrej: "godrejproperties.com",
    panchshil: "panchshil.com",
    vtp: "vtprealty.in",
    lodha: "lodhagroup.in",
    mantra: "mantraproperties.in",
    kohinoor: "kohinoorpune.com",
    kolte: "koltepatil.com",
    "kolte patil": "koltepatil.com",
    rohan: "rohanbuilders.com",
    pride: "pridegroup.net",
    nyati: "nyatigroup.com",
    paras: "parasbuildtech.com",
    megapolis: "megapolis.co.in",
    shapoorji: "shapoorjipallonji.com",
    sobha: "sobha.com",
};

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

function resolveLogo(prop, basePath) {
    if (prop.logo) {
        return prop.logo.startsWith("http") ? prop.logo : `${basePath}${prop.logo}`;
    }
    if (prop.logoUrl) {
        return prop.logoUrl.startsWith("http") ? prop.logoUrl : `${basePath}${prop.logoUrl}`;
    }

    const devStr = String(
        prop.developer ||
        prop.projectName ||
        prop.brandName ||
        prop.name ||
        prop.title ||
        ""
    ).toLowerCase();

    for (const [key, logoPath] of Object.entries(KNOWN_LOGOS)) {
        if (devStr.includes(key)) {
            return `${basePath}${logoPath}`;
        }
    }

    if (prop.domain) {
        return `https://www.google.com/s2/favicons?domain=${prop.domain}&sz=128`;
    }

    for (const [key, domain] of Object.entries(KNOWN_DOMAINS)) {
        if (devStr.includes(key)) {
            return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
        }
    }

    return null;
}

function PropertyCard({ property }) {
    const [imgSrc, setImgSrc] = useState(property?.image || FALLBACK_IMAGE);
    const [isStarred, setIsStarred] = useState(false);

    if (!property) return null;

    const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

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

    const developerName =
        property.developer ||
        property.brandName ||
        property.projectName ||
        "Prime Realty";

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

    const logoSrc = resolveLogo(property, basePath);

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
                aria-label={`View ${title} in ${property.location || "Pune"}`}
            >
                {/* TOP MEDIA AREA WITH BUILDING SITE IMAGE */}
                <div className="property-card__media">
                    <img
                        src={imgSrc}
                        alt={`${title} site view`}
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
                </div>

                {/* ── INNER CARD (smaller, sits inside the outer card's bottom) ── */}
                <div className="property-card__inner">
                    {/* Inner card text body */}
                    <div className="property-card__body">
                        {/* Project Title */}
                        <h3 className="property-card__title">
                            {title}
                        </h3>

                        {/* Configuration & Locality Subtitle (truncated with ellipsis) */}
                        <p className="property-card__sub" title={configText}>
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
                                className={`property-card__status ${
                                    isReady
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
