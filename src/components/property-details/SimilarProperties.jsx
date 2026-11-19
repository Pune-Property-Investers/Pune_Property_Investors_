"use client";

import Link from "next/link";
import {
    MapPin,
    BedDouble,
    Ruler,
    CalendarDays,
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

    // Take top 3 or fallback to trending projects
    let similarList = scored.slice(0, 3).map((s) => s.item);

    if (similarList.length < 3) {
        const fallbacks = trendingProjects
            .filter((tp) => String(tp.id) !== currentId)
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
        similarList = [...similarList, ...fallbacks].slice(0, 3);
    }

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
                        Similar Projects in {localityDisplayName} & Matching Budgets
                    </h2>
                    <p className="similar-properties__desc">
                        Explore handpicked verified properties in nearby corridors with comparable carpet area, configuration, and investment returns.
                    </p>
                </div>

                <Link href="/buy" className="similar-properties__view-all">
                    <span>View All Listings</span>
                    <ArrowRight size={15} />
                </Link>
            </div>

            {/* Cards Grid */}
            <div className="similar-properties__grid">
                {similarList.map((item) => {
                    const priceFormatted = formatPrice(item.price, item.priceLabel);
                    const itemUrl = `/properties/${item.slug || item.id}`;
                    const rawArea = item.area
                        ? `${Number(item.area).toLocaleString("en-IN")} sq.ft.`
                        : "1,250 sq.ft.";

                    return (
                        <article className="similar-card" key={item.id}>
                            <Link href={itemUrl} className="similar-card__media-link">
                                <div className="similar-card__media">
                                    <img
                                        src={item.image || (item.images && item.images[0])}
                                        alt={item.title || item.name}
                                        className="similar-card__image"
                                        loading="lazy"
                                    />
                                    <div className="similar-card__badges">
                                        <span className="similar-card__badge similar-card__badge--status">
                                            {item.possession || "New Launch"}
                                        </span>
                                        {item.verified !== false && (
                                            <span className="similar-card__badge similar-card__badge--verified">
                                                <ShieldCheck size={12} />
                                                Verified
                                            </span>
                                        )}
                                    </div>
                                    <div className="similar-card__price-tag">
                                        {priceFormatted}
                                    </div>
                                </div>
                            </Link>

                            <div className="similar-card__content">
                                <p className="similar-card__location">
                                    <MapPin size={13} className="text-gold" />
                                    <span>{item.location || item.locality || "Pune"}</span>
                                </p>

                                <h3 className="similar-card__title">
                                    <Link href={itemUrl}>{item.title || item.name}</Link>
                                </h3>

                                <div className="similar-card__specs">
                                    <div className="similar-spec">
                                        <BedDouble size={14} />
                                        <span>{item.bhk || 2} BHK</span>
                                    </div>
                                    <span className="similar-spec-divider">•</span>
                                    <div className="similar-spec">
                                        <Ruler size={14} />
                                        <span>{rawArea}</span>
                                    </div>
                                    <span className="similar-spec-divider">•</span>
                                    <div className="similar-spec">
                                        <CalendarDays size={14} />
                                        <span>{item.possession || "2026"}</span>
                                    </div>
                                </div>

                                <div className="similar-card__footer">
                                    <Link href={itemUrl} className="similar-card__action-btn">
                                        <span>View Details</span>
                                        <ArrowRight size={13} />
                                    </Link>
                                </div>
                            </div>
                        </article>
                    );
                })}
            </div>
        </section>
    );
}
