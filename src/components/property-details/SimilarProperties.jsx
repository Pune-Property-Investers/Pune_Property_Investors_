"use client";

import { useRef } from "react";
import Link from "next/link";
import {
    MapPin,
    BedDouble,
    Ruler,
    ArrowRight,
    Sparkles,
    ShieldCheck,
} from "lucide-react";
import propertyListingsData from "../../data/propertyListingsData.js";
import trendingProjects from "../../data/trendingProjectsData.js";
import "./SimilarProperties.css";

function formatPrice(price, priceLabel) {
    if (priceLabel) return priceLabel;
    const num = Number(price);
    if (!Number.isFinite(num) || num <= 0) return "Price on Request";
    if (num >= 10000000) return `₹${(num / 10000000).toFixed(2).replace(/\.?0+$/, "")} Cr`;
    if (num >= 100000) return `₹${(num / 100000).toFixed(2).replace(/\.?0+$/, "")} L`;
    return `₹${num.toLocaleString("en-IN")}`;
}

function formatArea(val) {
    if (!val) return "1,250 sq.ft.";
    const str = String(val).trim();
    if (/sq\.?\s*ft/i.test(str)) return str;
    const num = Number(str.replace(/\D/g, ""));
    return num ? `${num.toLocaleString("en-IN")} sq.ft.` : `${str} sq.ft.`;
}

export default function SimilarProperties({ currentProperty }) {
    if (!currentProperty) return null;

    const currentId = String(currentProperty.id);
    const currentLocality = (
        currentProperty.locality ||
        currentProperty.location ||
        "Pune"
    ).toLowerCase();
    const currentPrice = Number(currentProperty.price) || 10000000;
    const currentBhk = Number(currentProperty.bhk) || 2;

    // Filter available listings
    const candidates = propertyListingsData.filter(
        (item) => String(item.id) !== currentId && item.title !== currentProperty.title
    );

    // Score candidates based on locality match, price proximity, and BHK match
    const scored = candidates.map((item) => {
        let score = 0;
        const itemLocality = (item.locality || item.location || "").toLowerCase();
        if (itemLocality.includes(currentLocality) || currentLocality.includes(itemLocality)) {
            score += 40;
        }

        // Price proximity (within 35%)
        if (item.price) {
            const diffRatio = Math.abs(Number(item.price) - currentPrice) / currentPrice;
            if (diffRatio < 0.25) score += 30;
            else if (diffRatio < 0.5) score += 15;
        }

        // BHK match
        if (item.bhk && Number(item.bhk) === currentBhk) {
            score += 20;
        }

        return { item, score };
    });

    scored.sort((a, b) => b.score - a.score);

    // Take top 8 matching properties or fallback to trending projects for a rich horizontal scroll
    let similarList = scored.slice(0, 8).map((s) => s.item);

    if (similarList.length < 6) {
        const fallbacks = trendingProjects
            .filter((tp) => String(tp.id) !== currentId && !similarList.some(s => String(s.id) === String(tp.id)))
            .map((tp) => ({
                id: tp.id,
                title: tp.name,
                projectName: tp.project || tp.name,
                location: tp.location,
                locality: tp.location?.split(",")[0],
                priceLabel: tp.price,
                bhk: tp.configuration?.includes("3") ? 3 : 2,
                area: 1250,
                possession: "Under Construction",
                image: tp.image,
                slug: tp.slug || String(tp.id),
                verified: true,
            }));
        similarList = [...similarList, ...fallbacks].slice(0, 8);
    }

    const trackRef = useRef(null);

    if (similarList.length === 0) return null;

    const localityDisplayName =
        currentProperty.locality || currentProperty.location || "Pune";

    return (
        <section className="similar-properties-section" aria-label="Similar Properties">
            <div className="similar-properties__header">
                <div className="similar-properties__header-text">
                    <span className="similar-properties__eyebrow">
                        <Sparkles size={12} className="text-gold" />
                        CURATED RECOMMENDATIONS
                    </span>
                    <h2 className="similar-properties__title">
                        Similar Projects in {localityDisplayName}
                    </h2>
                    <p className="similar-properties__desc">
                        Explore handpicked verified properties in nearby corridors with comparable carpet area, configuration, and budget.
                    </p>
                </div>

                <div className="similar-properties__header-actions">
                    <Link href="/buy" className="similar-properties__view-all">
                        <span>View All</span>
                        <ArrowRight size={14} />
                    </Link>
                </div>
            </div>

            {/* Horizontal Manual Scroll Track */}
            <div
                className="similar-properties__track"
                ref={trackRef}
                tabIndex={0}
                role="region"
                aria-label="Horizontally scrollable similar properties"
            >
                {similarList.map((item) => {
                    const priceFormatted = formatPrice(item.price, item.priceLabel);
                    const itemUrl = `/properties/${item.slug || item.id}`;
                    const rawArea = formatArea(item.area);

                    return (
                        <article className="similar-card" key={item.id}>
                            <Link href={itemUrl} className="similar-card__link">
                                <img
                                    src={item.image || (item.images && item.images[0])}
                                    alt={item.title || item.name}
                                    className="similar-card__image"
                                    loading="lazy"
                                />

                                {/* Top Badges */}
                                <div className="similar-card__badges">
                                    {item.rera ? (
                                        <span className="similar-card__badge similar-card__badge--rera">
                                            <ShieldCheck size={12} />
                                            {item.rera}
                                        </span>
                                    ) : item.verified !== false ? (
                                        <span className="similar-card__badge similar-card__badge--verified">
                                            <ShieldCheck size={12} />
                                            Verified
                                        </span>
                                    ) : null}
                                </div>

                                {/* Dark Gradient Overlay with content at the bottom */}
                                <div className="similar-card__overlay">
                                    <div className="similar-card__bottom">
                                        <p className="similar-card__location">
                                            <MapPin size={13} className="text-gold" />
                                            <span>{item.location || item.locality || "Pune"}</span>
                                        </p>

                                        <div className="similar-card__title-row">
                                            <h3 className="similar-card__title">
                                                {item.title || item.name}
                                            </h3>
                                            <div className="similar-card__price-tag">
                                                {priceFormatted}
                                            </div>
                                        </div>

                                        <div className="similar-card__specs">
                                            <div className="similar-spec">
                                                <BedDouble size={14} />
                                                <span>{item.bhk || 2} BHK</span>
                                            </div>
                                            <span className="similar-spec__dot">•</span>
                                            <div className="similar-spec">
                                                <Ruler size={14} />
                                                <span>{rawArea}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </article>
                    );
                })}
            </div>
        </section>
    );
}
