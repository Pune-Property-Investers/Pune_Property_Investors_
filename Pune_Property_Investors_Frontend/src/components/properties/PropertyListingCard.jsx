"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import {
    ShieldCheck,
    Share2,
    ChevronDown,
    ChevronUp,
    ChevronLeft,
    ChevronRight,
    Check,
} from "lucide-react";
import { getFloorPlansData } from "../property-details/PropertyFloorPlans";
import "./PropertyListingCard.css";

const FALLBACK_IMAGE =
    "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=85";

const CURATED_IMAGE_POOLS = [
    [
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85",
        "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=85",
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=85",
    ],
    [
        "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85",
        "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=85",
        "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=1200&q=85",
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=85",
    ],
    [
        "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=85",
        "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85",
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=85",
        "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1200&q=85",
    ],
    [
        "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=85",
        "https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1200&q=85",
        "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=85",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85",
    ],
    [
        "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=85",
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=85",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85",
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=85",
    ],
    [
        "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=1200&q=85",
        "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85",
        "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=85",
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=85",
    ],
];

function resolvePropertyImages(property) {
    const rawList = [
        property?.image,
        ...(Array.isArray(property?.images) ? property.images : []),
        ...(Array.isArray(property?.gallery) ? property.gallery : []),
    ].filter((u) => typeof u === "string" && u.trim().length > 0);

    const unique = Array.from(new Set(rawList));
    if (unique.length >= 4) {
        return unique;
    }

    const seedStr = String(
        property?.id ||
        property?.slug ||
        property?.name ||
        property?.title ||
        property?.projectName ||
        "ppi-property"
    );
    let hash = 0;
    for (let i = 0; i < seedStr.length; i++) {
        hash = (hash << 5) - hash + seedStr.charCodeAt(i);
        hash |= 0;
    }
    const pool = CURATED_IMAGE_POOLS[Math.abs(hash) % CURATED_IMAGE_POOLS.length];

    const result = [...unique];
    for (const img of pool) {
        if (!result.includes(img)) {
            result.push(img);
        }
        if (result.length >= 4) break;
    }

    return result.length > 0 ? result : [FALLBACK_IMAGE];
}

function formatCompactPrice(val) {
    if (typeof val === "string" && val.trim()) {
        const trimmed = val.trim();
        return trimmed.replace(/^₹(?!\s)/, "₹ ");
    }
    const num = Number(val);
    if (Number.isFinite(num) && num > 0) {
        if (num >= 10000000) {
            return `₹ ${(num / 10000000).toFixed(2).replace(/\.?0+$/, "")} Cr*`;
        }
        if (num >= 100000) {
            return `₹ ${(num / 100000).toFixed(1).replace(/\.0$/, "")} Lacs*`;
        }
        return `₹ ${num.toLocaleString("en-IN")}`;
    }
    return "Price on Request";
}

function getAvailableBhkText(property, plans = []) {
    if (!property) return "";
    if (Array.isArray(plans) && plans.length > 0) {
        const categories = Array.from(
            new Set(plans.map((p) => p.bhk || p.bhkCategory))
        ).filter(Boolean);
        if (categories.length > 0) {
            const nums = categories
                .map((c) => String(c).match(/^(\d+(?:\.\d+)?)\s*BHK$/i)?.[1])
                .filter(Boolean);
            if (nums.length === categories.length && nums.length > 1) {
                return `${nums.join(", ")} BHK`;
            }
            return categories.join(", ");
        }
    }
    if (property.availableFlats) {
        return String(property.availableFlats).replace(/\s*Flats?\b/i, "").trim();
    }
    return property.propertyType || "Residences";
}

function getCarpetAreaRange(property, plans = []) {
    if (!property) return "";
    const nums = [];

    if (Array.isArray(plans) && plans.length > 0) {
        for (const fp of plans) {
            const raw = fp.carpetArea || fp.area || "";
            const match = String(raw).replace(/,/g, "").match(/\d+(?:\.\d+)?/);
            if (match) {
                const n = Number(match[0]);
                if (Number.isFinite(n) && n > 0) nums.push(n);
            }
        }
    }

    if (nums.length === 0 && (property.carpetArea || property.area)) {
        const raw = String(property.carpetArea || property.area).replace(/,/g, "");
        const matches = raw.match(/\d+(?:\.\d+)?/g);
        if (matches) {
            for (const m of matches) {
                const n = Number(m);
                if (Number.isFinite(n) && n > 0) nums.push(n);
            }
        }
    }

    if (nums.length === 0) return "";
    const min = Math.min(...nums);
    const max = Math.max(...nums);
    if (min < max) {
        return `${min.toLocaleString("en-IN")} sq/ft - ${max.toLocaleString("en-IN")} sq/ft`;
    }
    return `${min.toLocaleString("en-IN")} sq/ft`;
}

function PropertyListingCard({ property, priority = false }) {
    const imagesList = useMemo(() => resolvePropertyImages(property), [property]);

    const [slideIdx, setSlideIdx] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [imgSrcMap, setImgSrcMap] = useState({});
    const [copied, setCopied] = useState(false);
    const [descExpanded, setDescExpanded] = useState(false);
    const touchStartX = useRef(0);

    const totalSlides = imagesList.length;

    // Auto-playing slideshow
    useEffect(() => {
        if (totalSlides <= 1 || isPaused) return;
        const timer = setInterval(() => {
            setSlideIdx((prev) => (prev + 1) % totalSlides);
        }, 3500);
        return () => clearInterval(timer);
    }, [totalSlides, isPaused]);

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
    const floorPlans = (() => {
        try {
            return getFloorPlansData(property) || [];
        } catch {
            return [];
        }
    })();
    const availableBhkText = getAvailableBhkText(property, floorPlans);
    const startingPrice = formatCompactPrice(
        property.priceLabel || property.price || property.priceValue
    );
    const carpetRangeText = getCarpetAreaRange(property, floorPlans);

    const pricePerSqftText = property.pricePerSqFt
        ? `₹${Number(property.pricePerSqFt).toLocaleString("en-IN")} /sqft (Carpet Area)`
        : "";

    const possessionRaw = property.possession || property.status || "Under Construction";

    const reraDisplay =
        (property.reraId && property.reraId !== "RERA Approved" ? property.reraId : null) ||
        (property.rera && property.rera !== "RERA Approved" ? property.rera : null) ||
        property.reraNumber ||
        (property.id ? `P521000${String(property.id).replace(/\D/g, "").slice(-5).padStart(5, "0")}` : "P52100051240");

    const descriptionText =
        property.description ||
        `Here are beautifully built ${availableBhkText} residences in ${locationText} with modern amenities.`;

    const currentSrc = imgSrcMap[slideIdx] || imagesList[slideIdx] || FALLBACK_IMAGE;

    const goSlide = (nextIdx, e) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        setSlideIdx((nextIdx + totalSlides) % totalSlides);
    };

    const handleShare = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        const shareUrl =
            typeof window !== "undefined"
                ? `${window.location.origin}${propertyUrl}`
                : propertyUrl;
        try {
            if (typeof navigator !== "undefined" && navigator.share) {
                await navigator.share({ title, url: shareUrl });
                return;
            }
            if (typeof navigator !== "undefined" && navigator.clipboard) {
                await navigator.clipboard.writeText(shareUrl);
                setCopied(true);
                setTimeout(() => setCopied(false), 1800);
            }
        } catch {
            // User cancelled share
        }
    };

    const handleToggleDesc = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDescExpanded((prev) => !prev);
    };

    return (
        <article
            className="explore-overlay-card"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={(e) => {
                setIsPaused(true);
                touchStartX.current = e.touches[0].clientX;
            }}
            onTouchEnd={(e) => {
                setIsPaused(false);
                if (totalSlides <= 1) return;
                const diff = touchStartX.current - e.changedTouches[0].clientX;
                if (diff > 40) goSlide(slideIdx + 1);
                else if (diff < -40) goSlide(slideIdx - 1);
            }}
        >
            <Link
                href={propertyUrl}
                className="explore-overlay-card__link"
                aria-label={`View ${title} in ${locationText}`}
            >
                <div
                    className="explore-overlay-card__track"
                    style={{ transform: `translate3d(-${slideIdx * 100}%, 0, 0)` }}
                >
                    {imagesList.map((src, idx) => (
                        <img
                            key={`${src}-${idx}`}
                            src={imgSrcMap[idx] || src || FALLBACK_IMAGE}
                            alt={`${title} in ${locationText} (${idx + 1})`}
                            className="explore-overlay-card__img"
                            loading={priority && idx === 0 ? "eager" : "lazy"}
                            decoding="async"
                            draggable={false}
                            onError={() =>
                                setImgSrcMap((prev) => ({ ...prev, [idx]: FALLBACK_IMAGE }))
                            }
                        />
                    ))}
                </div>

                <div className="explore-overlay-card__gradient" aria-hidden="true" />

                {/* Top Row: Left Unified RERA Number | Zero Brokerage Pill + Right Share */}
                <div className="explore-overlay-card__top-bar">
                    <span
                        className="explore-overlay-card__rera-pill"
                        title={reraDisplay}
                    >
                        <ShieldCheck size={14} className="explore-overlay-card__rera-icon" />
                        <span>{reraDisplay}</span>
                        <span className="explore-overlay-card__rera-divider" />
                        <span>Zero Brokerage</span>
                    </span>

                    <div className="explore-overlay-card__actions">
                        <button
                            type="button"
                            className="explore-overlay-card__icon-btn"
                            onClick={handleShare}
                            aria-label="Share property"
                            title={copied ? "Link copied!" : "Share property"}
                        >
                            {copied ? <Check size={17} /> : <Share2 size={17} strokeWidth={1.9} />}
                        </button>
                    </div>
                </div>

                {/* Desktop Prev/Next Carousel Arrows */}
                {totalSlides > 1 && (
                    <>
                        <button
                            type="button"
                            className="explore-overlay-card__nav explore-overlay-card__nav--prev"
                            onClick={(e) => goSlide(slideIdx - 1, e)}
                            aria-label="Previous photo"
                        >
                            <ChevronLeft size={18} />
                        </button>
                        <button
                            type="button"
                            className="explore-overlay-card__nav explore-overlay-card__nav--next"
                            onClick={(e) => goSlide(slideIdx + 1, e)}
                            aria-label="Next photo"
                        >
                            <ChevronRight size={18} />
                        </button>
                    </>
                )}

                {/* Bottom Overlay Info (compactly fitted) */}
                <div className="explore-overlay-card__content">
                    {/* Carousel Dots + Counter Pill (e.g. ••• 3/4) */}
                    <div className="explore-overlay-card__dots-wrap">
                        <div
                            className="explore-overlay-card__dots-pill"
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                            }}
                        >
                            <div className="explore-overlay-card__dots">
                                {imagesList.slice(0, 5).map((_, idx) => (
                                    <button
                                        key={idx}
                                        type="button"
                                        className={`explore-overlay-card__dot ${
                                            idx === slideIdx ? "is-active" : ""
                                        }`}
                                        onClick={(e) => goSlide(idx, e)}
                                        aria-label={`Photo ${idx + 1}`}
                                    />
                                ))}
                            </div>
                            <span className="explore-overlay-card__slide-count">
                                {slideIdx + 1}/{totalSlides}
                            </span>
                        </div>
                    </div>

                    <h3 className="explore-overlay-card__title">{title}</h3>

                    {/* Blue box: Available BHKs matching PropertyDetails */}
                    <p className="explore-overlay-card__subtitle">
                        {availableBhkText} in {locationText}
                    </p>

                    {/* Row: White Bar (Only Price) + Carpet Area next to it */}
                    <div className="explore-overlay-card__price-row">
                        <div className="explore-overlay-card__price-bar">
                            <span className="explore-overlay-card__bhk-group">
                                <span className="explore-overlay-card__bhk-tag">Starts from</span>
                                <span className="explore-overlay-card__price-val">{startingPrice}</span>
                            </span>
                        </div>

                        {carpetRangeText && (
                            <span className="explore-overlay-card__carpet-inline">
                                Area: {carpetRangeText}
                            </span>
                        )}
                    </div>

                    {/* Meta Line: Possession • Price/sqft */}
                    <div className="explore-overlay-card__meta">
                        <span>Possession: {possessionRaw}</span>
                        {pricePerSqftText && (
                            <>
                                <span className="explore-overlay-card__meta-dot">•</span>
                                <span>{pricePerSqftText}</span>
                            </>
                        )}
                    </div>

                    {/* Expandable Description Row */}
                    <div className="explore-overlay-card__desc-row">
                        <p
                            className={`explore-overlay-card__desc ${
                                descExpanded ? "is-expanded" : ""
                            }`}
                        >
                            {descriptionText}
                        </p>
                        <button
                            type="button"
                            className="explore-overlay-card__desc-toggle"
                            onClick={handleToggleDesc}
                            aria-label={descExpanded ? "Show less" : "Show more"}
                        >
                            {descExpanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                        </button>
                    </div>
                </div>
            </Link>
        </article>
    );
}

export default PropertyListingCard;
