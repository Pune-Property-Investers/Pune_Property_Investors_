"use client";

import { useState, useRef, useMemo } from "react";
import Link from "next/link";
import {
    Building2,
    MapPin,
    BedDouble,
    Ruler,
    ShieldCheck,
    Award,
    Sparkles,
    Users,
    CheckCircle2,
    Clock,
    Phone,
    Star,
    ChevronLeft,
    ChevronRight,
    ArrowUpRight,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { projects } from "../../data/projects.js";
import { newLaunchProjects } from "../../data/newLaunchProjectsData.js";
import "./BuilderProperties.css";

const WHATSAPP_NUMBER = "917398174444";

function formatArea(val) {
    if (!val) return "1,200 sq.ft.";
    const str = String(val).trim();
    if (/sq\.?\s*ft/i.test(str)) return str;
    const num = Number(str.replace(/\D/g, ""));
    return num ? `${num.toLocaleString("en-IN")} sq.ft.` : `${str} sq.ft.`;
}

// Comprehensive database of major developer credentials, track records, and metrics in Pune
const BUILDER_PROFILES = {
    gera: {
        name: "Gera Developments",
        experience: "54+ Yrs",
        totalProjects: "35+ Projects",
        deliveredProjects: "28 Delivered",
        ongoingProjects: "7 Ongoing",
        happyCustomers: "12,500+ Families",
        cities: "Pune, Goa & USA",
        rating: "4.9★",
        tagline: "Pioneers of ChildCentric® Homes & 7-Year Warranty",
        description:
            "Founded in 1970, Gera Developments is one of Western India's most innovative builders, renowned for delivering premium residential landmarks, India's first 5-year and 7-year structural warranty, and award-winning ChildCentric® township masterplans across Pune.",
        logo: "https://www.google.com/s2/favicons?domain=gera.in&sz=128",
        domain: "gera.in",
    },
    godrej: {
        name: "Godrej Properties",
        experience: "35+ Yrs",
        totalProjects: "95+ Projects",
        deliveredProjects: "72 Delivered",
        ongoingProjects: "23 Ongoing",
        happyCustomers: "45,000+ Families",
        cities: "12 Top Indian Metros",
        rating: "4.9★",
        tagline: "125+ Years of Godrej Trust & Sustainability",
        description:
            "Established on the principles of sustainability and engineering excellence, Godrej Properties brings over a century of Godrej Group trust with world-class residential townships across prime Pune corridors like Kharadi, Mahalunge, and Mamurdi.",
        logo: "/images/logos/godrej.png",
        domain: "godrejproperties.com",
    },
    vilas: {
        name: "Vilas Javdekar Developers",
        experience: "42+ Yrs",
        totalProjects: "32+ Projects",
        deliveredProjects: "25 Delivered",
        ongoingProjects: "7 Ongoing",
        happyCustomers: "11,000+ Families",
        cities: "Pune MMR",
        rating: "4.8★",
        tagline: "We Love What We Do • Best Construction Practices",
        description:
            "Known for the iconic YashWIN series, Vilas Javdekar Developers is synonymous with transparent transactions, timely handovers, and sustainable green architectural masterplans across Baner, Wakad, and Hadapsar.",
        logo: "https://www.google.com/s2/favicons?domain=vilasjavdekar.com&sz=128",
        domain: "vilasjavdekar.com",
    },
    vtp: {
        name: "VTP Realty",
        experience: "15+ Yrs",
        totalProjects: "28+ Projects",
        deliveredProjects: "18 Delivered",
        ongoingProjects: "10 Ongoing",
        happyCustomers: "19,000+ Families",
        cities: "Pune",
        rating: "4.8★",
        tagline: "Pune's #1 Real Estate Brand by Market Share",
        description:
            "Pune's leading developer renowned for MLA (Maximum Living Area) architecture, high-speed construction technology, and mega integrated townships across Kharadi, Hinjewadi, and Mahalunge.",
        logo: "/images/logos/vtp.png",
        domain: "vtprealty.in",
    },
    kolte: {
        name: "Kolte-Patil Developers",
        experience: "33+ Yrs",
        totalProjects: "55+ Projects",
        deliveredProjects: "44 Delivered",
        ongoingProjects: "11 Ongoing",
        happyCustomers: "22,000+ Families",
        cities: "Pune, Mumbai, Bengaluru",
        rating: "4.8★",
        tagline: "NSE & BSE Listed • Creators of Life Republic",
        description:
            "With over 3 decades of shaping Pune's skyline, Kolte-Patil is celebrated for iconic self-sustainable townships like Life Republic, sustainable smart homes, and high resale capital appreciation.",
        logo: "/images/logos/kolte-patil.jpg",
        domain: "koltepatil.com",
    },
    kohinoor: {
        name: "Kohinoor Group",
        experience: "41+ Yrs",
        totalProjects: "45+ Projects",
        deliveredProjects: "36 Delivered",
        ongoingProjects: "9 Ongoing",
        happyCustomers: "10,500+ Families",
        cities: "Pune",
        rating: "4.8★",
        tagline: "Sada Sukhi Raho Philosophy & Timely Handover",
        description:
            "Built on 40+ years of trust, Kohinoor Group has redefined Pune living through its 'Sada Sukhi Raho' promise, premium finishes, and customer-first post-possession maintenance.",
        logo: "/images/logos/kohinoor.png",
        domain: "kohinoorpune.com",
    },
    shapoorji: {
        name: "Shapoorji Pallonji Real Estate",
        experience: "158+ Yrs",
        totalProjects: "48+ Projects",
        deliveredProjects: "38 Delivered",
        ongoingProjects: "10 Ongoing",
        happyCustomers: "28,000+ Families",
        cities: "Global & 6 Indian Metros",
        rating: "4.9★",
        tagline: "150+ Years Historic Engineering Excellence",
        description:
            "A legendary conglomerate behind global monuments, Shapoorji Pallonji crafts Joyville smart-lifestyle residences in Pune, blending generational construction prestige with modern home automation.",
        logo: "/images/logos/shapoorji.svg",
        domain: "shapoorjirealestate.com",
    },
    lodha: {
        name: "Lodha Group (Macrotech)",
        experience: "44+ Yrs",
        totalProjects: "110+ Projects",
        deliveredProjects: "88 Delivered",
        ongoingProjects: "22 Ongoing",
        happyCustomers: "60,000+ Families",
        cities: "Mumbai, Pune, London",
        rating: "4.9★",
        tagline: "Building a Better Life • India's Largest Developer",
        description:
            "India's largest real estate developer by sales, Lodha brings five-star hospitality services, grand world-class clubhouses, and bespoke architecture to Pune's prime luxury corridors.",
        logo: "/images/logos/lodha.png",
        domain: "lodhagroup.com",
    },
    pride: {
        name: "Pride Purple Group",
        experience: "28+ Yrs",
        totalProjects: "35+ Projects",
        deliveredProjects: "27 Delivered",
        ongoingProjects: "8 Ongoing",
        happyCustomers: "15,000+ Families",
        cities: "Pune",
        rating: "4.8★",
        tagline: "Engineering Better Lifestyles across Prime Pune",
        description:
            "Famous for Park District and Park Connect, Pride Purple combines community infrastructure, large sports clubhouses, and transit-oriented development for modern IT professionals.",
        logo: "https://www.google.com/s2/favicons?domain=pridepurpleproperties.com&sz=128",
        domain: "pridepurpleproperties.com",
    },
    mantra: {
        name: "Mantra Properties",
        experience: "17+ Yrs",
        totalProjects: "26+ Projects",
        deliveredProjects: "18 Delivered",
        ongoingProjects: "8 Ongoing",
        happyCustomers: "12,000+ Families",
        cities: "Pune, PCMC",
        rating: "4.7★",
        tagline: "Speedy Construction & Smart Space Utilization",
        description:
            "Mantra Properties has rapidly grown into one of Pune's most dynamic developers, pioneering 1st-time-in-India home automation configurations and fastest project execution speeds.",
        logo: "https://www.google.com/s2/favicons?domain=mantraproperties.in&sz=128",
        domain: "mantraproperties.in",
    },
    sobha: {
        name: "Sobha Limited",
        experience: "30+ Yrs",
        totalProjects: "130+ Projects",
        deliveredProjects: "105 Delivered",
        ongoingProjects: "25 Ongoing",
        happyCustomers: "35,000+ Families",
        cities: "13 Indian Cities",
        rating: "4.9★",
        tagline: "Passionate at Work • 100% Backward Integration",
        description:
            "Celebrated across India for German-grade construction tolerance, Sobha manufactures its own concrete blocks, glazing, and woodcraft, ensuring immaculate lifelong build quality.",
        logo: "/images/logos/sobha.png",
        domain: "sobha.com",
    },
    paras: {
        name: "Paras Buildtech",
        experience: "22+ Yrs",
        totalProjects: "20+ Projects",
        deliveredProjects: "15 Delivered",
        ongoingProjects: "5 Ongoing",
        happyCustomers: "8,500+ Families",
        cities: "NCR & Pune",
        rating: "4.8★",
        tagline: "Curators of Signature Ultra-Luxury Landmarks",
        description:
            "Paras Buildtech delivers flagship architectural statements combining timeless European facades, low-density luxury residences, and state-of-the-art wellness centers.",
        logo: "/images/logos/paras-emperor.png",
        domain: "parasbuildtech.com",
    },
};

export function resolveBuilderProfile(rawDeveloper, property) {
    const raw = String(
        rawDeveloper ||
            property.developer ||
            property.builder ||
            property.projectName ||
            "Leading Pune Developer"
    ).trim();
    const lower = raw.toLowerCase();

    for (const [key, profile] of Object.entries(BUILDER_PROFILES)) {
        if (lower.includes(key)) {
            return profile;
        }
    }

    // Dynamic fallback with complete profile details
    return {
        name: raw,
        experience: "25+ Yrs",
        totalProjects: "28+ Projects",
        deliveredProjects: "20 Delivered",
        ongoingProjects: "8 Ongoing",
        happyCustomers: "10,000+ Families",
        cities: "Pune & MMR",
        rating: "4.8★",
        tagline: "Verified RERA Grade-A Developer Partner",
        description: `${raw} is a leading real estate brand in Pune, committed to high structural integrity, prime strategic connectivity, transparent pricing, and punctual possession handovers.`,
        logo:
            property.developerLogo ||
            property.logo ||
            `https://www.google.com/s2/favicons?domain=${raw.toLowerCase().replace(/[^a-z0-9]/g, "")}.com&sz=128`,
        domain: `${raw.toLowerCase().replace(/[^a-z0-9]/g, "")}.com`,
    };
}

export default function BuilderProperties({ property, onEnquire }) {
    if (!property) return null;

    // Detect developer
    const rawDeveloper =
        property.developer ||
        property.builder ||
        (property.projectName && property.projectName.includes("Gera") ? "Gera Developments" : null) ||
        (property.projectName && property.projectName.includes("Godrej") ? "Godrej Properties" : null) ||
        (property.projectName && property.projectName.includes("VTP") ? "VTP Realty" : null) ||
        (property.projectName && property.projectName.includes("Mantra") ? "Mantra Properties" : null) ||
        (property.projectName && property.projectName.includes("Kolte") ? "Kolte-Patil Developers" : null) ||
        (property.projectName && property.projectName.includes("Lodha") ? "Lodha Group" : null) ||
        (property.projectName && property.projectName.includes("Vilas") ? "Vilas Javdekar Developers" : null) ||
        "Gera Developments";

    const builderProfile = useMemo(
        () => resolveBuilderProfile(rawDeveloper, property),
        [rawDeveloper, property]
    );

    const [activeTab, setActiveTab] = useState("All");
    const [logoFailed, setLogoFailed] = useState(false);
    const trackRef = useRef(null);

    const currentId = String(property.id);

    // Collect candidate projects by this developer or top Pune developers
    const matched = useMemo(() => {
        const devPool = [];

        // 1. From newLaunchProjectsData
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
                    possession: item.possession || "Under Construction",
                    status: item.possession || "Under Construction",
                    rera: item.rera || "P52100051280",
                    image: item.image,
                    slug: item.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
                });
            }
        });

        // 2. From projects.js
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
                    status: item.possession || item.status || "Under Construction",
                    rera: item.reraId || "RERA Approved",
                    image: item.image,
                    slug: item.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
                });
            }
        });

        const cleanDev = builderProfile.name.toLowerCase();
        let matches = devPool.filter(
            (p) =>
                (p.developer || "").toLowerCase().includes(cleanDev) ||
                cleanDev.includes((p.developer || "").toLowerCase())
        );

        if (matches.length < 6) {
            const remaining = devPool.filter(
                (p) => !matches.some((m) => m.title === p.title)
            );
            matches = [...matches, ...remaining].slice(0, 8);
        } else {
            matches = matches.slice(0, 8);
        }

        return matches;
    }, [builderProfile.name, rawDeveloper, currentId]);

    // Filter projects based on active tab
    const filteredProjects = useMemo(() => {
        if (activeTab === "All") return matched;
        if (activeTab === "Ongoing") {
            const list = matched.filter(
                (p) =>
                    /under|construction|ongoing|2026|2027|2028|2029|2030/i.test(
                        p.possession || ""
                    )
            );
            return list.length > 0 ? list : matched.slice(0, 4);
        }
        if (activeTab === "Delivered") {
            const list = matched.filter(
                (p) =>
                    /ready|delivered|completed|immediate/i.test(
                        p.possession || ""
                    )
            );
            return list.length > 0 ? list : matched.slice(2, 6);
        }
        return matched;
    }, [matched, activeTab]);

    const handleScroll = (direction) => {
        if (!trackRef.current) return;
        const offset = direction === "left" ? -320 : 320;
        trackRef.current.scrollBy({ left: offset, behavior: "smooth" });
    };

    const handleConnectClick = () => {
        if (typeof onEnquire === "function") {
            onEnquire();
        } else {
            const msg = `Hello Pune Property Investors, I would like to connect with the builder desk for *${builderProfile.name}* regarding *${property.title || property.name}*.`;
            window.open(
                `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`,
                "_blank"
            );
        }
    };

    return (
        <section
            className="builder-properties-section"
            id="builder-legacy"
            aria-label="Builder Legacy and Track Record"
        >
            {/* Main Section Header */}
            <div className="builder-properties__header">
                <div className="builder-properties__header-text">
                    <span className="builder-properties__eyebrow">
                        <Award size={13} className="text-gold" />
                        BUILDER LEGACY & TRACK RECORD
                    </span>
                    <h2 className="builder-properties__title">
                        About {builderProfile.name}
                    </h2>
                    <p className="builder-properties__desc">
                        {builderProfile.tagline} • Direct Verified Builder Desk
                    </p>
                </div>
            </div>

            {/* UNIQUE LUXURY BUILDER DOSSIER CARD */}
            <div className="builder-legacy-dossier">
                {/* 1. Header with Logo, Builder Name & Quick Connect */}
                <div className="builder-dossier__header">
                    <div className="builder-dossier__brand">
                        <div className="builder-dossier__logo-wrapper">
                            {!logoFailed ? (
                                <img
                                    src={builderProfile.logo}
                                    alt={`${builderProfile.name} logo`}
                                    className="builder-dossier__logo"
                                    onError={() => setLogoFailed(true)}
                                />
                            ) : (
                                <div className="builder-dossier__logo-fallback">
                                    <Building2 size={26} />
                                </div>
                            )}
                        </div>

                        <div className="builder-dossier__brand-info">
                            <div className="builder-dossier__title-row">
                                <h3 className="builder-dossier__name">
                                    {builderProfile.name}
                                </h3>
                                <span className="builder-dossier__verified-badge">
                                    <ShieldCheck size={12} />
                                    Verified Grade-A Builder
                                </span>
                            </div>
                            <p className="builder-dossier__tagline">
                                {builderProfile.tagline}
                            </p>
                        </div>
                    </div>

                    {/* Quick Call & Enquiry CTAs */}
                    <div className="builder-dossier__cta-group">
                        <a
                            href="tel:+917398174444"
                            className="builder-dossier__call-btn"
                            title="Call Builder Advisory Desk"
                        >
                            <Phone size={14} />
                            <span>Call Builder</span>
                        </a>

                        <button
                            type="button"
                            className="builder-dossier__enquire-btn"
                            onClick={handleConnectClick}
                            title="Request Builder Brochure on WhatsApp"
                        >
                            <FaWhatsapp size={15} />
                            <span>Builder Brochure</span>
                        </button>
                    </div>
                </div>

                {/* 2. Crisp Stats Strip: Count and Header */}
                <div className="builder-dossier__stats-strip">
                    <div className="builder-stat-item">
                        <span className="builder-stat-item__count">
                            {builderProfile.totalProjects.replace(/\s*projects/i, "")}
                        </span>
                        <span className="builder-stat-item__header">
                            Total Projects
                        </span>
                    </div>

                    <div className="builder-stat-item">
                        <span className="builder-stat-item__count">
                            {builderProfile.happyCustomers.replace(/\s*families/i, "")}
                        </span>
                        <span className="builder-stat-item__header">
                            Happy Customers
                        </span>
                    </div>

                    <div className="builder-stat-item">
                        <span className="builder-stat-item__count">
                            {builderProfile.experience}
                        </span>
                        <span className="builder-stat-item__header">
                            Experience
                        </span>
                    </div>

                    <div className="builder-stat-item">
                        <span className="builder-stat-item__count">
                            {builderProfile.rating}
                        </span>
                        <span className="builder-stat-item__header">
                            Quality Score
                        </span>
                    </div>
                </div>

                {/* 3. Description & Crisp Points */}
                <div className="builder-dossier__body">
                    <p className="builder-dossier__desc">
                        {builderProfile.description}
                    </p>

                    <div className="builder-dossier__crisp-points">
                        <div className="builder-crisp-point">
                            <span className="builder-crisp-point__dot" />
                            <strong className="builder-crisp-point__header">Delivered Projects:</strong>
                            <span className="builder-crisp-point__value">
                                {builderProfile.deliveredProjects} completed with Occupancy Certificates (OC).
                            </span>
                        </div>

                        <div className="builder-crisp-point">
                            <span className="builder-crisp-point__dot" />
                            <strong className="builder-crisp-point__header">Ongoing Construction:</strong>
                            <span className="builder-crisp-point__value">
                                {builderProfile.ongoingProjects} active towers currently on-schedule.
                            </span>
                        </div>

                        <div className="builder-crisp-point">
                            <span className="builder-crisp-point__dot" />
                            <strong className="builder-crisp-point__header">Direct Allotment:</strong>
                            <span className="builder-crisp-point__value">
                                100% verified developer pricing with 0% brokerage guarantee.
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* 4. PROJECTS BY BUILDER SECTION WITH TABS */}
            <div className="builder-properties__projects-block">
                <div className="builder-projects__header">
                    <div>
                        <h3 className="builder-projects__title">
                            Projects by {builderProfile.name}
                        </h3>
                        <p className="builder-projects__subtitle">
                            Explore prime residential townships and signature towers
                        </p>
                    </div>

                    {/* Filter Tabs (All, Ongoing, Delivered) & Scroll Buttons */}
                    <div className="builder-projects__actions">
                        <div className="builder-projects__tabs" role="tablist">
                            {["All", "Ongoing", "Delivered"].map((tab) => (
                                <button
                                    key={tab}
                                    type="button"
                                    role="tab"
                                    aria-selected={activeTab === tab}
                                    className={`builder-tab-btn ${activeTab === tab ? "builder-tab-btn--active" : ""}`}
                                    onClick={() => setActiveTab(tab)}
                                >
                                    {tab === "All" ? `All (${matched.length})` : tab}
                                </button>
                            ))}
                        </div>

                        <div className="builder-properties__scroll-arrows">
                            <button
                                type="button"
                                className="builder-scroll-arrow-btn"
                                onClick={() => handleScroll("left")}
                                aria-label="Previous projects"
                            >
                                <ChevronLeft size={16} />
                            </button>
                            <button
                                type="button"
                                className="builder-scroll-arrow-btn"
                                onClick={() => handleScroll("right")}
                                aria-label="Next projects"
                            >
                                <ChevronRight size={16} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Horizontal Scroll Track */}
                <div
                    className="builder-properties__track"
                    ref={trackRef}
                    tabIndex={0}
                    role="region"
                    aria-label={`Projects by ${builderProfile.name}`}
                >
                    {filteredProjects.map((item, idx) => {
                        const itemUrl = `/properties/${item.slug || item.id}`;

                        return (
                            <article className="builder-card" key={idx}>
                                <Link href={itemUrl} className="builder-card__link">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="builder-card__image"
                                        loading="lazy"
                                    />

                                    {/* Top Badges */}
                                    <div className="builder-card__badges">
                                        {item.rera && (
                                            <span className="builder-card__badge builder-card__badge--rera">
                                                <ShieldCheck size={12} />
                                                {item.rera}
                                            </span>
                                        )}
                                        {item.status && (
                                            <span className="builder-card__badge builder-card__badge--status">
                                                {item.status}
                                            </span>
                                        )}
                                    </div>

                                    {/* Dark Gradient Overlay with content at the bottom */}
                                    <div className="builder-card__overlay">
                                        <div className="builder-card__bottom">
                                            <p className="builder-card__location">
                                                <MapPin size={13} className="text-gold" />
                                                <span>{item.location}</span>
                                            </p>

                                            <div className="builder-card__title-row">
                                                <h3 className="builder-card__title">
                                                    {item.title}
                                                </h3>
                                                <div className="builder-card__price-tag">
                                                    {item.price}
                                                </div>
                                            </div>

                                            <div className="builder-card__specs">
                                                <div className="builder-spec">
                                                    <BedDouble size={14} />
                                                    <span>{item.configuration || "2 & 3 BHK"}</span>
                                                </div>
                                                <span className="builder-spec__dot">•</span>
                                                <div className="builder-spec">
                                                    <Ruler size={14} />
                                                    <span>{formatArea(item.area)}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
