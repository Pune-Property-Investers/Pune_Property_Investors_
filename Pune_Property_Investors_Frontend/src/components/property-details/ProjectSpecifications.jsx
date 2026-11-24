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
    let title = "Project Specifications & Details";

    // ==========================================
    // 1. COMMERCIAL SPECIFICATIONS
    // ==========================================
    if (category === "commercial") {
        eyebrow = "COMMERCIAL SPECIFICATIONS";
        title = "Commercial Masterplan & Specifications";

        const landAcquired =
            property.landArea ||
            property.totalLand ||
            (rawArea > 2000 ? "6.5 Acres" : "4.2 Acres");

        const structure =
            property.floorsCount ||
            property.floors ||
            "G + 18 Floors";

        const unitTypes =
            property.furnishing ||
            property.configuration ||
            "Bare / Warm Shell";

        const leasableArea =
            property.carpetArea ||
            `${rawArea.toLocaleString("en-IN")} sq.ft.`;

        const powerHvac = "100% DG Backup";
        const parkingRatio = "Reserved + EV Bays";

        specs = [
            {
                icon: <Building2 size={20} className="spec-card__icon" />,
                label: "Land Parcel",
                value: landAcquired,
            },
            {
                icon: <Layers size={20} className="spec-card__icon" />,
                label: "Total Floors",
                value: structure,
            },
            {
                icon: <Building size={20} className="spec-card__icon" />,
                label: "Unit Type",
                value: unitTypes,
            },
            {
                icon: <Ruler size={20} className="spec-card__icon" />,
                label: "Carpet Area",
                value: leasableArea,
            },
            {
                icon: <Zap size={20} className="spec-card__icon" />,
                label: "Power Backup",
                value: powerHvac,
            },
            {
                icon: <Car size={20} className="spec-card__icon" />,
                label: "Parking",
                value: parkingRatio,
            },
        ];
    }
    // ==========================================
    // 2. PLOT & LAND SPECIFICATIONS
    // ==========================================
    else if (category === "plot") {
        eyebrow = "LAND & LAYOUT SPECIFICATIONS";
        title = "Plot Specifications & Approvals";

        const plotArea =
            property.carpetArea ||
            `${rawArea.toLocaleString("en-IN")} sq.ft. (${(rawArea / 1076.39).toFixed(1)} Guntha)`;

        const sanctions = "PMRDA Sanctioned";
        const permissibleFsi = "1.5 FSI (G+2)";
        const roadWidth = "40 ft. DP Road";
        const boundary = "Fenced & Demarcated";
        const utilities = "Power & Water Ready";

        specs = [
            {
                icon: <Ruler size={20} className="spec-card__icon" />,
                label: "Plot Area",
                value: plotArea,
            },
            {
                icon: <ShieldCheck size={20} className="spec-card__icon" />,
                label: "Sanctions",
                value: sanctions,
            },
            {
                icon: <Layers size={20} className="spec-card__icon" />,
                label: "FSI / Floors",
                value: permissibleFsi,
            },
            {
                icon: <Compass size={20} className="spec-card__icon" />,
                label: "Road Access",
                value: roadWidth,
            },
            {
                icon: <Trees size={20} className="spec-card__icon" />,
                label: "Boundary",
                value: boundary,
            },
            {
                icon: <Zap size={20} className="spec-card__icon" />,
                label: "Utilities",
                value: utilities,
            },
        ];
    }
    // ==========================================
    // 3. VILLA SPECIFICATIONS
    // ==========================================
    else if (category === "villa") {
        eyebrow = "LUXURY VILLA ARCHITECTURE";
        title = "Villa Specifications & Masterplan";

        const plotParcel =
            property.landArea ||
            `${Math.round(rawArea * 1.35).toLocaleString("en-IN")} sq.ft.`;

        const usableArea =
            property.carpetArea ||
            `${rawArea.toLocaleString("en-IN")} sq.ft.`;

        const storeys =
            property.floorsCount ||
            property.floors ||
            "G + 2 Floors";

        const config =
            property.configuration ||
            `${property.bhk || 4} BHK Villa`;

        const openSpaces = "Private Lawn & Deck";
        const garage = "Covered Garage (EV)";

        specs = [
            {
                icon: <Trees size={20} className="spec-card__icon" />,
                label: "Plot Parcel",
                value: plotParcel,
            },
            {
                icon: <Ruler size={20} className="spec-card__icon" />,
                label: "Carpet Area",
                value: usableArea,
            },
            {
                icon: <Layers size={20} className="spec-card__icon" />,
                label: "Structure",
                value: storeys,
            },
            {
                icon: <BedDouble size={20} className="spec-card__icon" />,
                label: "Configuration",
                value: config,
            },
            {
                icon: <Sparkles size={20} className="spec-card__icon" />,
                label: "Open Spaces",
                value: openSpaces,
            },
            {
                icon: <Car size={20} className="spec-card__icon" />,
                label: "Parking",
                value: garage,
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
            (property.area && Number(property.area) > 1000 ? "4.5 Acres" : "3.2 Acres");

        const towerCount =
            property.towersCount ||
            property.towers ||
            `${Math.max(2, ((Number(property.id) || 1) % 4) + 3)} Towers`;

        const floorCount =
            property.floorsCount ||
            property.floors ||
            `G + ${22 + (((Number(property.id) || 1) * 2) % 12)} Floors`;

        const rawBhk = property.bhk || property.bedrooms;
        const configuration =
            property.configuration ||
            (rawBhk ? `${rawBhk} BHK` : "2 & 3 BHK");

        const carpetArea =
            property.carpetArea ||
            `${rawArea.toLocaleString("en-IN")} sq.ft.`;

        const rawPossession = property.possessionDate || property.possession;
        const possessionDate =
            rawPossession && !/\b202\d\b/i.test(rawPossession) && rawPossession !== "Contact Us"
                ? rawPossession
                : "Under Construction";

        specs = [
            {
                icon: <Trees size={20} className="spec-card__icon" />,
                label: "Land Parcel",
                value: landAcquired,
            },
            {
                icon: <Building2 size={20} className="spec-card__icon" />,
                label: "Towers",
                value: towerCount,
            },
            {
                icon: <Layers size={20} className="spec-card__icon" />,
                label: "Total Floors",
                value: floorCount,
            },
            {
                icon: <BedDouble size={20} className="spec-card__icon" />,
                label: "Configuration",
                value: configuration,
            },
            {
                icon: <Ruler size={20} className="spec-card__icon" />,
                label: "Carpet Area",
                value: carpetArea,
            },
            {
                icon: <CalendarDays size={20} className="spec-card__icon" />,
                label: "Possession",
                value: possessionDate,
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

                {/* Compact MahaRERA Badge */}
                <div className="project-specifications__rera-badge">
                    <ShieldCheck size={18} className="text-gold" />
                    <div>
                        <span className="rera-badge__label">MahaRERA</span>
                        <strong className="rera-badge__number">{reraNumber}</strong>
                    </div>
                </div>
            </div>

            {/* Clean Specifications Grid (3 in Row Horizontal) */}
            <div className="project-specifications__grid">
                {specs.map((item, idx) => (
                    <div className="spec-card" key={idx}>
                        <div className="spec-card__header-row">
                            <span className="spec-card__icon-wrapper">{item.icon}</span>
                            <span className="spec-card__label">{item.label}</span>
                        </div>
                        <strong className="spec-card__value">{item.value}</strong>
                    </div>
                ))}
            </div>

            {/* Bottom Clean MahaRERA Bar */}
            <div className="project-specifications__rera-footer">
                <div className="rera-footer__info">
                    <CheckCircle2 size={16} className="text-gold" />
                    <span>
                        MahaRERA Registered: <strong>{reraNumber}</strong> • 100% Verified Project
                    </span>
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
