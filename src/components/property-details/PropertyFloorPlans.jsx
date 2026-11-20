"use client";

import { useState } from "react";
import {
    Maximize2,
    Download,
    PhoneCall,
    CheckCircle2,
    Compass,
    Ruler,
    Layers,
    Sparkles,
    ShieldCheck,
    X,
    Eye,
    ChevronRight
} from "lucide-react";
import "./PropertyFloorPlans.css";

/**
 * Derives realistic floor plan configurations based on property specs
 */
function getFloorPlansData(property = {}) {
    if (Array.isArray(property.floorPlans) && property.floorPlans.length > 0) {
        return property.floorPlans;
    }

    const bhk = Number(property.bhk) || Number(property.bedrooms) || 2;
    const baseArea = Number(property.area) || Number(property.carpetArea) || 850;
    const priceNum = Number(property.price) || 8000000;
    const category = String(property.category || property.propertyType || "Apartment").toLowerCase();

    // 1. Commercial Plans
    if (category.includes("commercial") || category.includes("office") || category.includes("shop")) {
        return [
            {
                id: "plan-comm-1",
                name: "Executive Suite",
                config: "Furnished Office",
                carpetArea: Math.round(baseArea * 0.75),
                superArea: baseArea,
                balconyArea: Math.round(baseArea * 0.08),
                facing: "North-East",
                price: `₹${(priceNum * 0.85 / 10000000).toFixed(2)} Cr`,
                priceLabel: "Starting from",
                description: "Optimized corporate floor plate with executive cabins, open workstation cluster, and pantry.",
                rooms: [
                    { name: "Executive Cabin", size: "14'0\" × 12'6\"" },
                    { name: "Workstation Zone", size: "24'0\" × 18'0\"" },
                    { name: "Conference Room", size: "16'0\" × 12'0\"" },
                    { name: "Pantry & Restroom", size: "10'0\" × 8'0\"" }
                ],
                tag: "High ROI"
            },
            {
                id: "plan-comm-2",
                name: "Corporate Floor",
                config: "Bare Shell Unit",
                carpetArea: Math.round(baseArea * 1.3),
                superArea: Math.round(baseArea * 1.7),
                balconyArea: Math.round(baseArea * 0.12),
                facing: "East Facing",
                price: `₹${(priceNum * 1.4 / 10000000).toFixed(2)} Cr`,
                priceLabel: "Starting from",
                description: "Spacious expansive floor plate designed for large MNCs, IT teams, and corporate headquarters.",
                rooms: [
                    { name: "Open Floor Layout", size: "38'0\" × 26'0\"" },
                    { name: "Director Suite", size: "18'0\" × 14'0\"" },
                    { name: "Server & Utility", size: "12'0\" × 10'0\"" },
                    { name: "Visitor Lounge", size: "16'0\" × 12'0\"" }
                ],
                tag: "Flagship"
            }
        ];
    }

    // 2. Villa / Bungalow Plans
    if (category.includes("villa") || category.includes("bungalow") || category.includes("row house")) {
        return [
            {
                id: "plan-villa-1",
                name: "Signature Villa",
                config: "4 BHK Duplex Villa",
                carpetArea: Math.max(baseArea, 2200),
                superArea: Math.max(Math.round(baseArea * 1.35), 2950),
                balconyArea: 280,
                facing: "East (Vastu Compliant)",
                price: `₹${(priceNum / 10000000).toFixed(2)} Cr`,
                priceLabel: "Starting from",
                description: "Grand dual-level luxury villa with private lawn, double-height living foyer, and sky deck.",
                rooms: [
                    { name: "Grand Living & Dining", size: "26'6\" × 17'0\"" },
                    { name: "Master Suite + Walk-in", size: "18'6\" × 15'0\"" },
                    { name: "Guest Bedroom", size: "15'0\" × 13'6\"" },
                    { name: "Kids Sanctuary", size: "14'6\" × 13'0\"" },
                    { name: "Private Deck & Lawn", size: "22'0\" × 12'6\"" }
                ],
                tag: "Exclusive"
            },
            {
                id: "plan-villa-2",
                name: "Presidential Mansion",
                config: "5 BHK Triplex Estate",
                carpetArea: Math.max(Math.round(baseArea * 1.45), 3200),
                superArea: Math.max(Math.round(baseArea * 1.85), 4150),
                balconyArea: 420,
                facing: "North-East Facing",
                price: `₹${(priceNum * 1.45 / 10000000).toFixed(2)} Cr`,
                priceLabel: "Starting from",
                description: "Ultra-luxury palatial villa with private infinity plunge pool, rooftop lounge, and staff quarters.",
                rooms: [
                    { name: "Double-Height Living", size: "32'0\" × 20'0\"" },
                    { name: "Presidential Suite", size: "22'0\" × 18'0\"" },
                    { name: "Home Theatre Lounge", size: "18'0\" × 15'6\"" },
                    { name: "Private Plunge Deck", size: "24'0\" × 14'0\"" }
                ],
                tag: "Ultra Luxury"
            }
        ];
    }

    // 3. Residential Apartments (Default)
    const plans = [];

    // Plan A: Primary BHK
    const primaryName = bhk === 1 ? "1 BHK Smart Home" : bhk === 2 ? "2 BHK Comfort Suite" : bhk === 3 ? "3 BHK Luxury Residence" : `${bhk} BHK Royal Residence`;
    plans.push({
        id: "plan-res-1",
        name: primaryName,
        config: `${bhk} BHK Premium`,
        carpetArea: baseArea,
        superArea: Math.round(baseArea * 1.32),
        balconyArea: Math.round(baseArea * 0.09) || 75,
        facing: "East Facing (Vastu)",
        price: `₹${priceNum >= 10000000 ? (priceNum / 10000000).toFixed(2) + " Cr" : (priceNum / 100000).toFixed(0) + " Lakh"}`,
        priceLabel: "Starting from",
        description: `Thoughtfully engineered ${bhk} BHK layout offering zero dead space, cross-ventilation, and maximum natural sunlight.`,
        rooms: [
            { name: "Living & Dining", size: "20'6\" × 11'6\"" },
            { name: "Master Bedroom", size: "13'6\" × 11'0\"" },
            ...(bhk >= 2 ? [{ name: "Bedroom 2", size: "12'0\" × 10'6\"" }] : []),
            ...(bhk >= 3 ? [{ name: "Bedroom 3", size: "11'6\" × 10'0\"" }] : []),
            { name: "Kitchen & Dry Balcony", size: "10'0\" × 8'0\"" },
            { name: "Grand Sun Deck", size: "11'6\" × 5'0\"" }
        ],
        tag: "Most Popular"
    });

    // Plan B: Larger variant (e.g. 2.5 BHK or 3 BHK or 4 BHK)
    const nextBhk = bhk + 1;
    const nextArea = Math.round(baseArea * 1.38);
    const nextPrice = priceNum * 1.35;
    plans.push({
        id: "plan-res-2",
        name: `${nextBhk} BHK Grande Suite`,
        config: `${nextBhk} BHK Ultra Luxury`,
        carpetArea: nextArea,
        superArea: Math.round(nextArea * 1.32),
        balconyArea: Math.round(nextArea * 0.1) || 110,
        facing: "North-East Facing",
        price: `₹${nextPrice >= 10000000 ? (nextPrice / 10000000).toFixed(2) + " Cr" : (nextPrice / 100000).toFixed(0) + " Lakh"}`,
        priceLabel: "Starting from",
        description: `Expansive ${nextBhk} BHK home featuring an enlarged master suite, walk-in closet niche, and dual panoramic sundecks.`,
        rooms: [
            { name: "Formal Living & Dining", size: "23'0\" × 13'0\"" },
            { name: "Master Suite + Dresser", size: "15'6\" × 12'6\"" },
            { name: "Bedroom 2", size: "13'0\" × 11'6\"" },
            { name: "Bedroom 3", size: "12'0\" × 11'0\"" },
            { name: "Modular Kitchen", size: "11'0\" × 9'0\"" },
            { name: "Panoramic Sun Deck", size: "14'0\" × 6'0\"" }
        ],
        tag: "Spacious Layout"
    });

    // Plan C: Penthouse / Royale (if 3 BHK or above)
    if (bhk >= 3) {
        const skyArea = Math.round(baseArea * 1.85);
        const skyPrice = priceNum * 1.8;
        plans.push({
            id: "plan-res-3",
            name: `${bhk + 1} BHK Sky Penthouse`,
            config: "Sky Residence & Terrace",
            carpetArea: skyArea,
            superArea: Math.round(skyArea * 1.36),
            balconyArea: Math.round(skyArea * 0.16) || 220,
            facing: "North-East (Panoramic)",
            price: `₹${(skyPrice / 10000000).toFixed(2)} Cr`,
            priceLabel: "Starting from",
            description: "Top-floor penthouse boasting 11-ft ceiling heights, wraparound party terrace, and 270-degree city skyline vistas.",
            rooms: [
                { name: "Grand Salon & Dining", size: "28'0\" × 16'0\"" },
                { name: "Presidential Bedroom", size: "18'0\" × 15'0\"" },
                { name: "Suite 2 with Balcony", size: "15'0\" × 13'0\"" },
                { name: "Family Media Lounge", size: "14'0\" × 12'0\"" },
                { name: "Wraparound Sky Terrace", size: "26'0\" × 8'0\"" }
            ],
            tag: "Sky Residence"
        });
    }

    return plans;
}

export default function PropertyFloorPlans({ property, onEnquire }) {
    if (!property) return null;

    const floorPlans = getFloorPlansData(property);
    const [activePlanIndex, setActivePlanIndex] = useState(0);
    const [isZoomOpen, setIsZoomOpen] = useState(false);
    const [unitMeasure, setUnitMeasure] = useState("sq.ft"); // 'sq.ft' or 'sq.m'

    const activePlan = floorPlans[activePlanIndex] || floorPlans[0];
    const reraId = property.rera || property.reraId || property.reraNumber || "P52100052341";

    const convertArea = (sqft) => {
        if (!sqft) return 0;
        if (unitMeasure === "sq.m") {
            return Math.round(sqft * 0.092903);
        }
        return sqft;
    };

    const handleDownloadClick = () => {
        if (typeof onEnquire === "function") {
            onEnquire();
        } else {
            alert(`Detailed floor plan brochure for "${activePlan.name}" has been requested.`);
        }
    };

    return (
        <section className="property-floor-plans" id="floor-plans">
            {/* Header: Eyebrow, Title & RERA verification */}
            <div className="property-floor-plans__header">
                <div>
                    <span className="property-floor-plans__eyebrow">
                        ARCHITECTURAL SCHEMATICS & MASTER LAYOUTS
                    </span>
                    <h2 className="property-floor-plans__title">
                        Floor Plans & Unit Configurations
                    </h2>
                </div>

                <div className="property-floor-plans__header-actions">
                    {/* Unit Switcher: Sq.Ft / Sq.M */}
                    <div className="floor-plans__unit-toggle" role="group" aria-label="Area measurement unit">
                        <button
                            type="button"
                            className={`unit-toggle__btn ${unitMeasure === "sq.ft" ? "unit-toggle__btn--active" : ""}`}
                            onClick={() => setUnitMeasure("sq.ft")}
                        >
                            Sq. Ft.
                        </button>
                        <button
                            type="button"
                            className={`unit-toggle__btn ${unitMeasure === "sq.m" ? "unit-toggle__btn--active" : ""}`}
                            onClick={() => setUnitMeasure("sq.m")}
                        >
                            Sq. M.
                        </button>
                    </div>

                    {/* MahaRERA Badge */}
                    <div className="floor-plans__rera-badge">
                        <ShieldCheck size={14} className="rera-badge__icon" />
                        <div>
                            <span className="rera-badge__label">MahaRERA Approved</span>
                            <span className="rera-badge__num">{reraId}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Plan Configuration Selector Tabs */}
            <div className="property-floor-plans__tabs">
                {floorPlans.map((plan, idx) => (
                    <button
                        key={plan.id || idx}
                        type="button"
                        className={`floor-plans__tab-btn ${activePlanIndex === idx ? "floor-plans__tab-btn--active" : ""}`}
                        onClick={() => setActivePlanIndex(idx)}
                    >
                        <div className="tab-btn__header">
                            <span className="tab-btn__title">{plan.name}</span>
                            {plan.tag && (
                                <span className="tab-btn__tag">{plan.tag}</span>
                            )}
                        </div>
                        <div className="tab-btn__details">
                            <span className="tab-btn__area">
                                {convertArea(plan.carpetArea)} {unitMeasure} Carpet
                            </span>
                            <span className="tab-btn__price">{plan.price}</span>
                        </div>
                    </button>
                ))}
            </div>

            {/* Main Floor Plan Showcase Card */}
            <div className="property-floor-plans__showcase">
                {/* LEFT: Interactive Blueprint / Architectural Drawing */}
                <div className="floor-plans__blueprint-wrapper">
                    {/* Floating Controls Bar */}
                    <div className="blueprint__controls-bar">
                        <div className="blueprint__orientation">
                            <Compass size={14} className="blueprint__compass-icon" />
                            <span>{activePlan.facing}</span>
                        </div>

                        <button
                            type="button"
                            className="blueprint__zoom-btn"
                            onClick={() => setIsZoomOpen(true)}
                            aria-label="Enlarge floor plan layout"
                        >
                            <Maximize2 size={14} />
                            <span>Enlarge View</span>
                        </button>
                    </div>

                    {/* Blueprint Drawing Viewport */}
                    <div className="floor-plans__drawing-viewport" onClick={() => setIsZoomOpen(true)}>
                        <svg
                            viewBox="0 0 600 420"
                            className="floor-plans__svg-blueprint"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <defs>
                                {/* Grid Blueprint Background Pattern */}
                                <pattern id="ppi-blueprint-grid" width="24" height="24" patternUnits="userSpaceOnUse">
                                    <path d="M 24 0 L 0 0 0 24" fill="none" stroke="rgba(173, 124, 72, 0.08)" strokeWidth="0.8" />
                                </pattern>
                                <linearGradient id="wall-fill-gradient" x1="0" y1="0" x2="1" y2="1">
                                    <stop offset="0%" stopColor="#1e3a34" />
                                    <stop offset="100%" stopColor="#0f2622" />
                                </linearGradient>
                            </defs>

                            {/* Background Canvas */}
                            <rect width="600" height="420" fill="#fcfbf9" />
                            <rect width="600" height="420" fill="url(#ppi-blueprint-grid)" />

                            {/* Outer Demarcation / Boundary */}
                            <rect x="25" y="25" width="550" height="370" rx="6" fill="#ffffff" stroke="#cbb292" strokeWidth="1.5" strokeDasharray="6 4" />

                            {/* ROOM 1: Living & Dining Hall */}
                            <g className="blueprint-room">
                                <rect x="50" y="50" width="260" height="180" rx="3" fill="#f7f5f0" stroke="#ad7c48" strokeWidth="2.5" />
                                <text x="180" y="130" textAnchor="middle" className="blueprint-room-name">Living & Dining Hall</text>
                                <text x="180" y="152" textAnchor="middle" className="blueprint-room-dim">20'6" × 11'6"</text>
                                {/* Entrance Door Arc */}
                                <path d="M 50 180 A 35 35 0 0 1 85 215" fill="none" stroke="#ad7c48" strokeWidth="1.2" strokeDasharray="3 3" />
                                <line x1="50" y1="180" x2="50" y2="215" stroke="#ad7c48" strokeWidth="2.5" />
                                <text x="70" y="228" className="blueprint-tag">Entrance</text>
                            </g>

                            {/* ROOM 2: Grand Sun Deck / Balcony */}
                            <g className="blueprint-room">
                                <rect x="50" y="235" width="260" height="65" rx="2" fill="#eff6f3" stroke="#0e382f" strokeWidth="2" strokeDasharray="4 2" />
                                <text x="180" y="270" textAnchor="middle" className="blueprint-room-name blueprint-room-name--green">Grand Sun Deck / Balcony</text>
                                <text x="180" y="286" textAnchor="middle" className="blueprint-room-dim">11'6" × 5'0"</text>
                            </g>

                            {/* ROOM 3: Modular Kitchen & Utility */}
                            <g className="blueprint-room">
                                <rect x="50" y="305" width="160" height="75" rx="3" fill="#faf7f2" stroke="#ad7c48" strokeWidth="2" />
                                <text x="130" y="342" textAnchor="middle" className="blueprint-room-name">Modular Kitchen</text>
                                <text x="130" y="358" textAnchor="middle" className="blueprint-room-dim">10'0" × 8'0"</text>
                            </g>

                            {/* Dry Balcony / Utility */}
                            <g className="blueprint-room">
                                <rect x="215" y="305" width="95" height="75" rx="2" fill="#f4f1ea" stroke="#c0a07e" strokeWidth="1.8" />
                                <text x="262" y="342" textAnchor="middle" className="blueprint-room-name" style={{ fontSize: "10px" }}>Dry Utility</text>
                                <text x="262" y="358" textAnchor="middle" className="blueprint-room-dim" style={{ fontSize: "9px" }}>6'0" × 4'6"</text>
                            </g>

                            {/* ROOM 4: Master Bedroom Suite */}
                            <g className="blueprint-room">
                                <rect x="320" y="50" width="230" height="155" rx="3" fill="#f8f5ee" stroke="#ad7c48" strokeWidth="2.5" />
                                <text x="435" y="120" textAnchor="middle" className="blueprint-room-name">Master Bedroom Suite</text>
                                <text x="435" y="142" textAnchor="middle" className="blueprint-room-dim">13'6" × 11'0"</text>
                                {/* Door Arc */}
                                <path d="M 320 160 A 28 28 0 0 1 348 188" fill="none" stroke="#ad7c48" strokeWidth="1.2" strokeDasharray="3 3" />
                                <line x1="320" y1="160" x2="320" y2="188" stroke="#ad7c48" strokeWidth="2.5" />
                            </g>

                            {/* En-Suite Master Toilet */}
                            <g className="blueprint-room">
                                <rect x="440" y="210" width="110" height="85" rx="2" fill="#f1f5f3" stroke="#8fa89b" strokeWidth="1.8" />
                                <text x="495" y="250" textAnchor="middle" className="blueprint-room-name" style={{ fontSize: "10.5px" }}>Master Bath</text>
                                <text x="495" y="268" textAnchor="middle" className="blueprint-room-dim" style={{ fontSize: "9.5px" }}>8'0" × 5'0"</text>
                            </g>

                            {/* ROOM 5: Bedroom 2 / Guest Sanctuary */}
                            <g className="blueprint-room">
                                <rect x="320" y="210" width="115" height="170" rx="3" fill="#faf7f0" stroke="#ad7c48" strokeWidth="2" />
                                <text x="377" y="290" textAnchor="middle" className="blueprint-room-name" style={{ fontSize: "11px" }}>Bedroom 2</text>
                                <text x="377" y="310" textAnchor="middle" className="blueprint-room-dim" style={{ fontSize: "9.5px" }}>12'0" × 10'6"</text>
                            </g>

                            {/* Common Washroom */}
                            <g className="blueprint-room">
                                <rect x="440" y="300" width="110" height="80" rx="2" fill="#f1f5f3" stroke="#8fa89b" strokeWidth="1.8" />
                                <text x="495" y="340" textAnchor="middle" className="blueprint-room-name" style={{ fontSize: "10.5px" }}>Common Bath</text>
                                <text x="495" y="358" textAnchor="middle" className="blueprint-room-dim" style={{ fontSize: "9.5px" }}>7'6" × 4'6"</text>
                            </g>

                            {/* North Arrow Symbol */}
                            <g transform="translate(535, 60)">
                                <circle cx="0" cy="0" r="14" fill="#ffffff" stroke="#ad7c48" strokeWidth="1.2" />
                                <polygon points="0,-11 -4,0 4,0" fill="#ad7c48" />
                                <polygon points="0,11 -4,0 4,0" fill="#cbb292" />
                                <text x="0" y="-13" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#0f2622">N</text>
                            </g>
                        </svg>

                        {/* Hover Overlay Hint */}
                        <div className="blueprint__click-hint">
                            <Eye size={16} />
                            <span>Click to Inspect High-Resolution Blueprint</span>
                        </div>
                    </div>

                    <div className="blueprint__caption">
                        <span>* Architectural layout is indicative and subject to final sanctioned municipal drawings.</span>
                    </div>
                </div>

                {/* RIGHT: Unit Specification Metrics & Enquiry Actions */}
                <div className="floor-plans__specs-sidebar">
                    <div className="specs-sidebar__header">
                        <span className="specs-sidebar__badge">{activePlan.config}</span>
                        <h3 className="specs-sidebar__title">{activePlan.name}</h3>
                        <p className="specs-sidebar__desc">{activePlan.description}</p>
                    </div>

                    {/* Area & Price Highlights Grid */}
                    <div className="specs-sidebar__metrics-grid">
                        <div className="metric-cell">
                            <span className="metric-cell__label">Carpet Area</span>
                            <span className="metric-cell__value">
                                {convertArea(activePlan.carpetArea)} <small>{unitMeasure}</small>
                            </span>
                        </div>

                        <div className="metric-cell">
                            <span className="metric-cell__label">Super Built-up</span>
                            <span className="metric-cell__value">
                                {convertArea(activePlan.superArea)} <small>{unitMeasure}</small>
                            </span>
                        </div>

                        <div className="metric-cell">
                            <span className="metric-cell__label">Balcony Deck</span>
                            <span className="metric-cell__value">
                                {convertArea(activePlan.balconyArea)} <small>{unitMeasure}</small>
                            </span>
                        </div>

                        <div className="metric-cell">
                            <span className="metric-cell__label">Price Indicative</span>
                            <span className="metric-cell__value metric-cell__value--gold">
                                {activePlan.price}
                            </span>
                        </div>
                    </div>

                    {/* Room-by-Room Dimension Breakdown */}
                    <div className="specs-sidebar__rooms-list">
                        <h4 className="rooms-list__heading">Key Room Dimensions</h4>
                        <div className="rooms-list__items">
                            {activePlan.rooms.map((room, rIdx) => (
                                <div key={rIdx} className="room-item">
                                    <span className="room-item__name">
                                        <CheckCircle2 size={13} className="room-item__check" />
                                        {room.name}
                                    </span>
                                    <span className="room-item__size">{room.size}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Actions & Enquiry CTA */}
                    <div className="specs-sidebar__actions">
                        <button
                            type="button"
                            className="specs-sidebar__btn specs-sidebar__btn--enquire"
                            onClick={() => onEnquire && onEnquire()}
                        >
                            <PhoneCall size={16} />
                            <span>Request Layout & Cost Sheet</span>
                            <ChevronRight size={15} />
                        </button>

                        <button
                            type="button"
                            className="specs-sidebar__btn specs-sidebar__btn--download"
                            onClick={handleDownloadClick}
                        >
                            <Download size={15} />
                            <span>Download Plan PDF</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* FULLSCREEN ZOOM MODAL */}
            {isZoomOpen && (
                <div className="floor-plans__modal-backdrop" onClick={() => setIsZoomOpen(false)}>
                    <div className="floor-plans__modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modal__header">
                            <div>
                                <span className="modal__eyebrow">{activePlan.config}</span>
                                <h3 className="modal__title">{activePlan.name} — Detailed Layout</h3>
                            </div>
                            <button
                                type="button"
                                className="modal__close-btn"
                                onClick={() => setIsZoomOpen(false)}
                                aria-label="Close enlarged view"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="modal__body">
                            <svg
                                viewBox="0 0 600 420"
                                className="modal__svg"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <defs>
                                    <pattern id="modal-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                                        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(173, 124, 72, 0.09)" strokeWidth="0.8" />
                                    </pattern>
                                </defs>
                                <rect width="600" height="420" fill="#fcfbf9" />
                                <rect width="600" height="420" fill="url(#modal-grid)" />
                                <rect x="25" y="25" width="550" height="370" rx="6" fill="#ffffff" stroke="#cbb292" strokeWidth="1.5" strokeDasharray="6 4" />

                                <rect x="50" y="50" width="260" height="180" rx="3" fill="#f7f5f0" stroke="#ad7c48" strokeWidth="2.5" />
                                <text x="180" y="130" textAnchor="middle" className="blueprint-room-name">Living & Dining Hall</text>
                                <text x="180" y="152" textAnchor="middle" className="blueprint-room-dim">20'6" × 11'6"</text>

                                <rect x="50" y="235" width="260" height="65" rx="2" fill="#eff6f3" stroke="#0e382f" strokeWidth="2" strokeDasharray="4 2" />
                                <text x="180" y="270" textAnchor="middle" className="blueprint-room-name blueprint-room-name--green">Grand Sun Deck / Balcony</text>
                                <text x="180" y="286" textAnchor="middle" className="blueprint-room-dim">11'6" × 5'0"</text>

                                <rect x="50" y="305" width="160" height="75" rx="3" fill="#faf7f2" stroke="#ad7c48" strokeWidth="2" />
                                <text x="130" y="342" textAnchor="middle" className="blueprint-room-name">Modular Kitchen</text>
                                <text x="130" y="358" textAnchor="middle" className="blueprint-room-dim">10'0" × 8'0"</text>

                                <rect x="215" y="305" width="95" height="75" rx="2" fill="#f4f1ea" stroke="#c0a07e" strokeWidth="1.8" />
                                <text x="262" y="342" textAnchor="middle" className="blueprint-room-name" style={{ fontSize: "10px" }}>Dry Utility</text>

                                <rect x="320" y="50" width="230" height="155" rx="3" fill="#f8f5ee" stroke="#ad7c48" strokeWidth="2.5" />
                                <text x="435" y="120" textAnchor="middle" className="blueprint-room-name">Master Bedroom Suite</text>
                                <text x="435" y="142" textAnchor="middle" className="blueprint-room-dim">13'6" × 11'0"</text>

                                <rect x="440" y="210" width="110" height="85" rx="2" fill="#f1f5f3" stroke="#8fa89b" strokeWidth="1.8" />
                                <text x="495" y="250" textAnchor="middle" className="blueprint-room-name" style={{ fontSize: "10.5px" }}>Master Bath</text>

                                <rect x="320" y="210" width="115" height="170" rx="3" fill="#faf7f0" stroke="#ad7c48" strokeWidth="2" />
                                <text x="377" y="290" textAnchor="middle" className="blueprint-room-name" style={{ fontSize: "11px" }}>Bedroom 2</text>

                                <rect x="440" y="300" width="110" height="80" rx="2" fill="#f1f5f3" stroke="#8fa89b" strokeWidth="1.8" />
                                <text x="495" y="340" textAnchor="middle" className="blueprint-room-name" style={{ fontSize: "10.5px" }}>Common Bath</text>
                            </svg>
                        </div>

                        <div className="modal__footer">
                            <span className="modal__footer-text">
                                Carpet Area: <strong>{convertArea(activePlan.carpetArea)} {unitMeasure}</strong> | Super Built-up: <strong>{convertArea(activePlan.superArea)} {unitMeasure}</strong>
                            </span>
                            <button
                                type="button"
                                className="specs-sidebar__btn specs-sidebar__btn--enquire"
                                onClick={() => {
                                    setIsZoomOpen(false);
                                    if (onEnquire) onEnquire();
                                }}
                            >
                                <PhoneCall size={15} />
                                <span>Request Price & Availability</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
