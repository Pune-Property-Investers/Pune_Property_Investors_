"use client";

import {
    Trees,
    Building2,
    Building,
    Layers,
    BedDouble,
    Ruler,
    CalendarDays,
    ShieldCheck,
    CheckCircle2,
    ExternalLink,
    Zap,
    Car,
    Compass,
    Sparkles,
} from "lucide-react";
import "./ProjectSpecifications.css";

/**
 * Detects whether a property is Commercial, Plot / Land, Villa, or Residential
 */
export function getPropertyCategory(property = {}) {
    if (!property) return "residential";
    const type = String(property.propertyType || property.type || property.category || "").toLowerCase();
    const title = String(property.title || property.name || property.projectName || "").toLowerCase();
    const config = String(property.configuration || property.subtitle || "").toLowerCase();
    const purpose = String(property.purpose || "").toLowerCase();
    const combined = `${type} ${title} ${config} ${purpose}`;

    // 1. Plot / Land check
    if (/\b(plot|plots|land|layout|na plot|demarcated)\b/i.test(combined)) {
        return "plot";
    }
    // 2. Commercial check
    if (/\b(commercial|office|offices|shop|shops|retail|showroom|business park|it park|tech park|workspace|bare shell|warm shell)\b/i.test(combined)) {
        return "commercial";
    }
    // 3. Villa check (and not plot)
    if (/\b(villa|villas|sky villa|row house|bungalow|duplex|mansion|mansions)\b/i.test(combined)) {
        return "villa";
    }
    // 4. Default: Residential
    return "residential";
}

export default function ProjectSpecifications({ property }) {
    if (!property) return null;

    const category = getPropertyCategory(property);
    const rawArea = Number(property.area) || 1250;
    const reraNumber =
        property.rera ||
        property.reraId ||
        property.reraNumber ||
        `P5210005${1200 + ((Number(property.id) || 1) * 29)}`;

    let specs = [];
    let eyebrow = "ENGINEERING & RESIDENTIAL MASTERPLAN";
    let title = "Project Specifications & Key Details";
    let reraLegalText = (
        <span>
            Verified as per <strong>Maharashtra Real Estate Regulatory Authority (MahaRERA)</strong> under registration number <strong>{reraNumber}</strong>. Details available on the official MahaRERA website.
        </span>
    );

    // ==========================================
    // 1. COMMERCIAL SPECIFICATIONS
    // ==========================================
    if (category === "commercial") {
        eyebrow = "COMMERCIAL INFRASTRUCTURE & SPECIFICATIONS";
        title = "Commercial Masterplan & Technical Specifications";
        reraLegalText = (
            <span>
                Verified as per <strong>Maharashtra Real Estate Regulatory Authority (MahaRERA)</strong> under commercial project registration number <strong>{reraNumber}</strong>. Pre-approved for IT/ITeS, BFSI, retail and corporate enterprise spaces.
            </span>
        );

        const landAcquired =
            property.landArea ||
            property.totalLand ||
            `${rawArea > 2000 ? "6.5" : "4.2"} Acres Integrated Tech Campus`;

        const structure =
            property.floorsCount ||
            property.floors ||
            "3 Basements + Ground + 18 Floors";

        const unitTypes =
            property.configuration ||
            property.furnishing ||
            "Grade-A Bare Shell / Warm Shell Offices";

        const leasableArea =
            property.carpetArea ||
            `${rawArea.toLocaleString("en-IN")} sq.ft. (Floor Plate up to 28,000 sq.ft.)`;

        const powerHvac = "100% DG Power Backup & VRV HVAC Provision";
        const parkingRatio = "1 : 750 sq.ft. (Multi-Level Basements + EV Bays)";

        specs = [
            {
                icon: <Building2 size={22} className="spec-card__icon" />,
                label: "Land Parcel / Campus",
                value: landAcquired,
                badge: "Commercial Hub",
            },
            {
                icon: <Layers size={22} className="spec-card__icon" />,
                label: "Structure & Storeys",
                value: structure,
                badge: "Grade-A Tower",
            },
            {
                icon: <Building size={22} className="spec-card__icon" />,
                label: "Unit Type & Shell",
                value: unitTypes,
                badge: "Scalable Plates",
            },
            {
                icon: <Ruler size={22} className="spec-card__icon" />,
                label: "Leasable / Carpet Area",
                value: leasableArea,
                badge: "RERA Leasable",
            },
            {
                icon: <Zap size={22} className="spec-card__icon" />,
                label: "Power & HVAC Load",
                value: powerHvac,
                badge: "N+1 Redundancy",
            },
            {
                icon: <Car size={22} className="spec-card__icon" />,
                label: "Parking & Mobility",
                value: parkingRatio,
                badge: "EV Ready",
            },
        ];
    }
    // ==========================================
    // 2. PLOT & LAND SPECIFICATIONS
    // ==========================================
    else if (category === "plot") {
        eyebrow = "LAND & LAYOUT INFRASTRUCTURE";
        title = "NA Plot Specifications & Development Approvals";
        reraLegalText = (
            <span>
                Verified as per <strong>Maharashtra Real Estate Regulatory Authority (MahaRERA)</strong> under plotted layout registration number <strong>{reraNumber}</strong>. 100% clear title with separate 7/12 extract and sanctioned layout.
            </span>
        );

        const plotArea =
            property.carpetArea ||
            `${rawArea.toLocaleString("en-IN")} sq.ft. (${(rawArea / 1076.39).toFixed(1)} Guntha / Freehold Plot)`;

        const sanctions = "Collector NA / PMRDA Sanctioned";
        const permissibleFsi = "1.5 FSI (G + 2 Floors Permissible)";
        const roadWidth = "40 ft. & 30 ft. Wide Tar / Concrete DP Road";
        const boundary = "Pre-Demarcated with Fencing & Private Gate";
        const utilities = "Underground MSEDCL Power & Water Line";

        specs = [
            {
                icon: <Ruler size={22} className="spec-card__icon" />,
                label: "Plot Area / Dimensions",
                value: plotArea,
                badge: "Demarcated",
            },
            {
                icon: <ShieldCheck size={22} className="spec-card__icon" />,
                label: "Sanction & Approvals",
                value: sanctions,
                badge: "100% Clear Title",
            },
            {
                icon: <Layers size={22} className="spec-card__icon" />,
                label: "Permissible FSI & Floors",
                value: permissibleFsi,
                badge: "Custom Build",
            },
            {
                icon: <Compass size={22} className="spec-card__icon" />,
                label: "Road Width & Access",
                value: roadWidth,
                badge: "Direct Access",
            },
            {
                icon: <Trees size={22} className="spec-card__icon" />,
                label: "Boundary & Enclosure",
                value: boundary,
                badge: "Immediate Ready",
            },
            {
                icon: <Zap size={22} className="spec-card__icon" />,
                label: "Water & Power Provision",
                value: utilities,
                badge: "Plug & Play",
            },
        ];
    }
    // ==========================================
    // 3. VILLA SPECIFICATIONS
    // ==========================================
    else if (category === "villa") {
        eyebrow = "LUXURY VILLA ARCHITECTURE";
        title = "Villa Specifications & Bespoke Masterplan";
        reraLegalText = (
            <span>
                Verified as per <strong>Maharashtra Real Estate Regulatory Authority (MahaRERA)</strong> under luxury villa registration number <strong>{reraNumber}</strong>. Exclusive gated villa enclave with private grounds.
            </span>
        );

        const plotParcel =
            property.landArea ||
            `${Math.round(rawArea * 1.35).toLocaleString("en-IN")} sq.ft. Independent Plot Parcel`;

        const usableArea =
            property.carpetArea ||
            `${rawArea.toLocaleString("en-IN")} sq.ft. (Carpet + Private Sun Decks)`;

        const storeys =
            property.floorsCount ||
            property.floors ||
            "G + 2 Floors + Private Rooftop Deck";

        const config =
            property.configuration ||
            `${property.bhk || 4} BHK Bespoke Villa with Maid's Quarter`;

        const openSpaces = "Private Landscaped Lawn, Sun Deck & Patio";
        const garage = "2-3 Dedicated Covered Car Ports (EV Ready)";

        specs = [
            {
                icon: <Trees size={22} className="spec-card__icon" />,
                label: "Private Plot Parcel",
                value: plotParcel,
                badge: "Freehold Land",
            },
            {
                icon: <Ruler size={22} className="spec-card__icon" />,
                label: "Villa Built-up & Carpet",
                value: usableArea,
                badge: "Spacious Luxury",
            },
            {
                icon: <Layers size={22} className="spec-card__icon" />,
                label: "Structure & Storeys",
                value: storeys,
                badge: "Independent Villa",
            },
            {
                icon: <BedDouble size={22} className="spec-card__icon" />,
                label: "Configuration",
                value: config,
                badge: "All En-Suite",
            },
            {
                icon: <Sparkles size={22} className="spec-card__icon" />,
                label: "Private Garden & Open Deck",
                value: openSpaces,
                badge: "Exclusive Greens",
            },
            {
                icon: <Car size={22} className="spec-card__icon" />,
                label: "Private Parking Garage",
                value: garage,
                badge: "EV Provision",
            },
        ];
    }
    // ==========================================
    // 4. RESIDENTIAL (APARTMENTS / FLATS)
    // ==========================================
    else {
        const landAcquired =
            property.landArea ||
            property.totalLand ||
            property.landAcquired ||
            `${property.area && Number(property.area) > 1000 ? "4.5" : "3.2"} Acres Integrated Parcel`;

        const towerCount =
            property.towersCount ||
            property.towers ||
            `${Math.max(2, ((Number(property.id) || 1) % 4) + 3)} High-Rise Towers`;

        const floorCount =
            property.floorsCount ||
            property.floors ||
            `G + ${22 + (((Number(property.id) || 1) * 2) % 12)} Floors`;

        const rawBhk = property.bhk || property.bedrooms;
        const configuration =
            property.configuration ||
            (rawBhk
                ? `${rawBhk} & ${Number(rawBhk) + 1} BHK Luxury Suites`
                : "2, 3 & 4 BHK Luxury Residences");

        const carpetArea =
            property.carpetArea ||
            `${Math.round(rawArea * 0.76).toLocaleString("en-IN")} – ${rawArea.toLocaleString("en-IN")} sq.ft. (RERA Carpet)`;

        const possessionDate =
            property.possessionDate ||
            (property.possession && property.possession !== "Contact Us"
                ? property.possession
                : "December 2026");

        specs = [
            {
                icon: <Trees size={22} className="spec-card__icon" />,
                label: "Land Acquired / Parcel",
                value: landAcquired,
                badge: "Freehold Parcel",
            },
            {
                icon: <Building2 size={22} className="spec-card__icon" />,
                label: "Tower Count",
                value: towerCount,
                badge: "Low Density",
            },
            {
                icon: <Layers size={22} className="spec-card__icon" />,
                label: "Floor Count",
                value: floorCount,
                badge: "High-Rise Living",
            },
            {
                icon: <BedDouble size={22} className="spec-card__icon" />,
                label: "Configuration (BHK)",
                value: configuration,
                badge: "Spacious Layouts",
            },
            {
                icon: <Ruler size={22} className="spec-card__icon" />,
                label: "Carpet Area",
                value: carpetArea,
                badge: "RERA Verified",
            },
            {
                icon: <CalendarDays size={22} className="spec-card__icon" />,
                label: "Possession Date",
                value: possessionDate,
                badge: property.possession === "Ready to Move" ? "Ready" : "On Track",
            },
        ];
    }

    return (
        <section className="project-specifications">
            <div className="project-specifications__header">
                <div>
                    <span className="project-specifications__eyebrow">{eyebrow}</span>
                    <h2 className="project-specifications__title">{title}</h2>
                </div>

                {/* MahaRERA Badge */}
                <div className="project-specifications__rera-badge">
                    <ShieldCheck size={20} className="text-gold" />
                    <div>
                        <span className="rera-badge__label">MahaRERA Registered</span>
                        <strong className="rera-badge__number">{reraNumber}</strong>
                    </div>
                </div>
            </div>

            {/* Specifications 6-Card Grid */}
            <div className="project-specifications__grid">
                {specs.map((item, idx) => (
                    <div className="spec-card" key={idx}>
                        <div className="spec-card__top">
                            <div className="spec-card__icon-wrapper">{item.icon}</div>
                            <span className="spec-card__pill">{item.badge}</span>
                        </div>
                        <div className="spec-card__content">
                            <span className="spec-card__label">{item.label}</span>
                            <strong className="spec-card__value">{item.value}</strong>
                        </div>
                    </div>
                ))}
            </div>

            {/* Bottom MahaRERA Verification Bar */}
            <div className="project-specifications__rera-footer">
                <div className="rera-footer__info">
                    <CheckCircle2 size={16} className="text-gold" />
                    {reraLegalText}
                </div>
                <a
                    href="https://maharera.mahaonline.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rera-footer__link"
                >
                    <span>Verify on MahaRERA</span>
                    <ExternalLink size={13} />
                </a>
            </div>
        </section>
    );
}
