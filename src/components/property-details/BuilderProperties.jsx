"use client";

import Link from "next/link";
import {
    Building2,
    MapPin,
    BedDouble,
    Ruler,
    ShieldCheck,
    ArrowRight,
    Award,
    Sparkles,
} from "lucide-react";
import { projects } from "../../data/projects.js";
import { newLaunchProjects } from "../../data/newLaunchProjectsData.js";
import trendingProjects from "../../data/trendingProjectsData.js";
import "./BuilderProperties.css";

const WHATSAPP_NUMBER = "917398174444";

export default function BuilderProperties({ property }) {
    if (!property) return null;

    // Detect developer
    const rawDeveloper =
        property.developer ||
        property.builder ||
        (property.projectName && property.projectName.includes("Godrej") ? "Godrej Properties" : null) ||
        (property.projectName && property.projectName.includes("VTP") ? "VTP Realty" : null) ||
        (property.projectName && property.projectName.includes("Mantra") ? "Mantra Properties" : null) ||
        (property.projectName && property.projectName.includes("Kolte") ? "Kolte-Patil Developers" : null) ||
        (property.projectName && property.projectName.includes("Lodha") ? "Lodha Group" : null) ||
        "Godrej Properties";

    const currentId = String(property.id);

    // Collect all candidate projects by this developer or top Pune developers
    const devPool = [];

    // From newLaunchProjectsData
    newLaunchProjects.forEach((item) => {
        if (String(item.id) !== currentId) {
            devPool.push({
                id: `nl-${item.id}`,
                title: item.name,
                developer: item.developer || rawDeveloper,
                location: item.location,
                configuration: item.configuration,
                price: item.price,
                area: item.area,
                possession: item.possession || "Dec 2027",
                rera: item.rera || "P52100051280",
                image: item.image,
                slug: item.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
            });
        }
    });

    // From projects.js
    projects.forEach((item) => {
        if (String(item.id) !== currentId) {
            devPool.push({
                id: `pj-${item.id}`,
                title: item.name,
                developer: item.developer,
                location: item.location,
                configuration: item.configuration,
                price: item.price,
                area: item.area,
                possession: item.possession || item.status || "Under Construction",
                rera: item.reraId || "RERA Approved",
                image: item.image,
                slug: item.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
            });
        }
    });

    // Filter by matching developer first
    const cleanDev = rawDeveloper.toLowerCase();
    let matched = devPool.filter((p) =>
        (p.developer || "").toLowerCase().includes(cleanDev) ||
        cleanDev.includes((p.developer || "").toLowerCase())
    );

    // If fewer than 3, backfill with top developer projects in Pune
    if (matched.length < 3) {
        const remaining = devPool.filter((p) => !matched.some((m) => m.title === p.title));
        matched = [...matched, ...remaining].slice(0, 3);
    } else {
        matched = matched.slice(0, 3);
    }

    if (matched.length === 0) return null;

    return (
        <section className="builder-properties-section" aria-label="More Builder Properties">
            <div className="builder-properties__header">
                <div className="builder-properties__header-text">
                    <span className="builder-properties__eyebrow">
                        <Award size={13} className="text-gold" />
                        DEVELOPER REPUTATION & PORTFOLIO
                    </span>
                    <h2 className="builder-properties__title">
                        More Landmark Properties by {rawDeveloper}
                    </h2>
                    <p className="builder-properties__desc">
                        Explore other premier residential townships, high-rise luxury towers, and signature developments by {rawDeveloper} across Pune's prime corridors.
                    </p>
                </div>

                <div className="builder-properties__developer-badge">
                    <div className="dev-badge__icon">
                        <Building2 size={20} />
                    </div>
                    <div>
                        <strong className="dev-badge__name">{rawDeveloper}</strong>
                        <span className="dev-badge__tag">Verified Partner Developer</span>
                    </div>
                </div>
            </div>

            {/* Builder Projects Grid */}
            <div className="builder-properties__grid">
                {matched.map((item, idx) => {
                    const itemUrl = `/properties/${item.slug || item.id}`;

                    return (
                        <article className="builder-card" key={idx}>
                            <Link href={itemUrl} className="builder-card__media-link">
                                <div className="builder-card__media">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="builder-card__image"
                                        loading="lazy"
                                    />
                                    <div className="builder-card__badges">
                                        <span className="builder-card__badge builder-card__badge--rera">
                                            <ShieldCheck size={12} />
                                            {item.rera}
                                        </span>
                                        <span className="builder-card__badge builder-card__badge--status">
                                            {item.possession}
                                        </span>
                                    </div>
                                    <div className="builder-card__price-tag">
                                        {item.price}
                                    </div>
                                </div>
                            </Link>

                            <div className="builder-card__content">
                                <div className="builder-card__dev-tag">
                                    <Building2 size={13} className="text-gold" />
                                    <span>{item.developer}</span>
                                </div>

                                <h3 className="builder-card__title">
                                    <Link href={itemUrl}>{item.title}</Link>
                                </h3>

                                <p className="builder-card__location">
                                    <MapPin size={13} className="text-gold" />
                                    <span>{item.location}</span>
                                </p>

                                <div className="builder-card__specs">
                                    <div className="builder-spec">
                                        <BedDouble size={14} />
                                        <span>{item.configuration || "2 & 3 BHK"}</span>
                                    </div>
                                    <span className="builder-spec-dot">•</span>
                                    <div className="builder-spec">
                                        <Ruler size={14} />
                                        <span>{item.area || "1,250 sq.ft."}</span>
                                    </div>
                                </div>

                                <div className="builder-card__actions">
                                    <Link href={itemUrl} className="builder-card__btn builder-card__btn--primary">
                                        <span>View Details</span>
                                        <ArrowRight size={13} />
                                    </Link>
                                    <a
                                        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                                            `Hello Pune Property Investors, I am interested in ${item.title} by ${item.developer}. Please share current pricing and brochure.`
                                        )}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="builder-card__btn builder-card__btn--wa"
                                        title="Chat on WhatsApp"
                                    >
                                        <span>Inquire</span>
                                    </a>
                                </div>
                            </div>
                        </article>
                    );
                })}
            </div>
        </section>
    );
}
