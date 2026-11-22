"use client";

import { useState, useRef, useMemo, useEffect } from "react";
import {
    Eye,
    Compass,
    X,
    CheckCircle2,
    Sparkles,
    Ruler,
    Lock,
    AlertCircle
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { floorPlanService } from "../../services/floorPlan.service";
import "./PropertyFloorPlans.css";

/**
 * Derives realistic floor plan configurations based on property specs
 */
function getFloorPlansData(property = {}) {
    if (Array.isArray(property.floorPlans) && property.floorPlans.length > 0) {
        return property.floorPlans;
    }

    const bhkNum = Number(property.bhk) || Number(property.bedrooms) || 2;
    const baseArea = Number(String(property.area || property.carpetArea || "850").replace(/\D/g, "")) || 850;
    const priceNum = property.priceValue || Number(property.numeric_price) || 8500000;
    const category = String(property.category || property.propertyType || "Apartment").toLowerCase();

    const formatPrice = (amt) => {
        if (amt >= 10000000) {
            return `₹${(amt / 10000000).toFixed(2)} Cr`;
        }
        return `₹${Math.round(amt / 100000)} Lakh`;
    };

    // 1. Commercial
    if (category.includes("commercial") || category.includes("office") || category.includes("shop")) {
        return [
            {
                id: "plan-comm-1",
                bhk: "Office",
                bhkCategory: "Commercial",
                name: "Executive Boutique Office",
                config: "Furnished Worksuite",
                carpetArea: Math.round(baseArea * 0.75) || 650,
                superArea: baseArea || 870,
                balconyArea: Math.round(baseArea * 0.08) || 60,
                facing: "North-East Facing",
                price: formatPrice(priceNum * 0.8),
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
                bhk: "Floor Plate",
                bhkCategory: "Commercial",
                name: "Corporate Headquarters Floor",
                config: "Bare Shell Expansive Unit",
                carpetArea: Math.round(baseArea * 1.4) || 1200,
                superArea: Math.round(baseArea * 1.8) || 1650,
                balconyArea: Math.round(baseArea * 0.12) || 120,
                facing: "East Facing",
                price: formatPrice(priceNum * 1.45),
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

    // 2. Villa / Bungalow
    if (category.includes("villa") || category.includes("bungalow") || category.includes("row house")) {
        return [
            {
                id: "plan-villa-3bhk",
                bhk: "3 BHK",
                bhkCategory: "3 BHK",
                name: "3 BHK Luxury Villa",
                config: "3 BHK Duplex Villa",
                carpetArea: Math.max(Math.round(baseArea * 0.85), 1850),
                superArea: Math.max(Math.round(baseArea * 1.15), 2450),
                balconyArea: 210,
                facing: "East (Vastu Compliant)",
                price: formatPrice(priceNum * 0.85),
                priceLabel: "Starting from",
                description: "Dual-level villa with private garden, double-height living foyer, and rooftop sun deck.",
                rooms: [
                    { name: "Living & Dining", size: "24'0\" × 15'0\"" },
                    { name: "Master Suite", size: "16'6\" × 14'0\"" },
                    { name: "Bedroom 2", size: "14'0\" × 12'6\"" },
                    { name: "Bedroom 3", size: "13'0\" × 12'0\"" },
                    { name: "Private Garden", size: "20'0\" × 10'0\"" }
                ],
                tag: "Exclusive"
            },
            {
                id: "plan-villa-4bhk",
                bhk: "4 BHK",
                bhkCategory: "4 BHK",
                name: "4 BHK Signature Estate",
                config: "4 BHK Triplex Villa",
                carpetArea: Math.max(baseArea, 2600),
                superArea: Math.max(Math.round(baseArea * 1.35), 3450),
                balconyArea: 320,
                facing: "East (Vastu Compliant)",
                price: formatPrice(priceNum),
                priceLabel: "Starting from",
                description: "Grand tri-level luxury villa with private lawn, plunge deck, and double-height family lounge.",
                rooms: [
                    { name: "Grand Living & Deck", size: "28'0\" × 18'0\"" },
                    { name: "Presidential Suite", size: "20'0\" × 16'0\"" },
                    { name: "Guest Bedroom", size: "16'0\" × 14'0\"" },
                    { name: "Kids Sanctuary", size: "15'0\" × 13'6\"" },
                    { name: "Rooftop Party Deck", size: "25'0\" × 14'0\"" }
                ],
                tag: "Ultra Luxury"
            }
        ];
    }

    // 3. Residential Apartments (1 BHK, 2 BHK, 3 BHK)
    const basePrice = priceNum || 8500000;

    return [
        {
            id: "plan-1bhk-smart",
            bhk: "1 BHK",
            bhkCategory: "1 BHK",
            name: "1 BHK Smart Compact",
            config: "1 BHK Urban Residence",
            carpetArea: Math.round(baseArea * 0.62) || 485,
            superArea: Math.round(baseArea * 0.82) || 640,
            balconyArea: 55,
            facing: "East Facing (Vastu)",
            price: formatPrice(basePrice * 0.62),
            priceLabel: "Starting from",
            description: "Ergonomically designed 1 BHK layout with maximum carpet efficiency, modular kitchen, and private sun balcony.",
            rooms: [
                { name: "Living & Dining", size: "16'0\" × 10'6\"" },
                { name: "Master Bedroom", size: "12'0\" × 10'0\"" },
                { name: "Kitchen & Utility", size: "8'6\" × 7'6\"" },
                { name: "Sun Balcony", size: "10'0\" × 4'0\"" },
                { name: "Bathroom", size: "7'0\" × 4'6\"" }
            ],
            tag: "High Rental Yield"
        },
        {
            id: "plan-2bhk-comfort",
            bhk: "2 BHK",
            bhkCategory: "2 BHK",
            name: "2 BHK Comfort Suite",
            config: "2 BHK Premium Layout",
            carpetArea: Math.round(baseArea * 0.95) || 780,
            superArea: Math.round(baseArea * 1.25) || 1030,
            balconyArea: 80,
            facing: "East Facing (Vastu)",
            price: formatPrice(basePrice * 0.95),
            priceLabel: "Starting from",
            description: "Spacious 2 BHK home with separate dining zone, master bedroom en-suite, and cross-ventilation breeze.",
            rooms: [
                { name: "Living & Dining", size: "19'6\" × 11'6\"" },
                { name: "Master Suite + Bath", size: "13'6\" × 11'0\"" },
                { name: "Bedroom 2", size: "11'6\" × 10'6\"" },
                { name: "Kitchen & Dry Balcony", size: "10'0\" × 8'0\"" },
                { name: "Grand Balcony Deck", size: "11'0\" × 5'0\"" },
                { name: "Common Washroom", size: "7'6\" × 4'6\"" }
            ],
            tag: "Most Popular"
        },
        {
            id: "plan-2bhk-grande",
            bhk: "2 BHK",
            bhkCategory: "2 BHK",
            name: "2.5 BHK Royale Living",
            config: "2.5 BHK with Study Niche",
            carpetArea: Math.round(baseArea * 1.12) || 915,
            superArea: Math.round(baseArea * 1.48) || 1210,
            balconyArea: 100,
            facing: "North-East Facing",
            price: formatPrice(basePrice * 1.15),
            priceLabel: "Starting from",
            description: "Premium 2 BHK plus dedicated study/work-from-home nook, enlarged living room, and dual panoramic decks.",
            rooms: [
                { name: "Living & Dining Lounge", size: "21'0\" × 12'6\"" },
                { name: "Master Bedroom Suite", size: "14'6\" × 11'6\"" },
                { name: "Bedroom 2", size: "12'0\" × 11'0\"" },
                { name: "Study / WFH Niche", size: "8'0\" × 6'6\"" },
                { name: "Modular Kitchen", size: "10'6\" × 8'6\"" },
                { name: "Dual Balconies", size: "12'0\" × 5'0\"" }
            ],
            tag: "WFH Optimized"
        },
        {
            id: "plan-3bhk-luxury",
            bhk: "3 BHK",
            bhkCategory: "3 BHK",
            name: "3 BHK Luxury Haven",
            config: "3 BHK Royale Residence",
            carpetArea: Math.round(baseArea * 1.42) || 1180,
            superArea: Math.round(baseArea * 1.88) || 1560,
            balconyArea: 135,
            facing: "North-East (Panoramic)",
            price: formatPrice(basePrice * 1.42),
            priceLabel: "Starting from",
            description: "Expansive 3 BHK residence with 3 private bathrooms, walk-in dresser in master suite, and grand party deck.",
            rooms: [
                { name: "Grand Salon & Dining", size: "24'0\" × 14'0\"" },
                { name: "Master Suite + Dresser", size: "16'0\" × 13'0\"" },
                { name: "Guest Bedroom", size: "13'0\" × 11'6\"" },
                { name: "Kids Sanctuary", size: "12'6\" × 11'0\"" },
                { name: "Kitchen & Store Room", size: "11'0\" × 9'0\"" },
                { name: "Panoramic Sun Deck", size: "14'0\" × 6'0\"" }
            ],
            tag: "Spacious Luxury"
        },
        {
            id: "plan-3bhk-sky",
            bhk: "3 BHK",
            bhkCategory: "3 BHK",
            name: "3 BHK Sky Residence",
            config: "3 BHK Panoramic Deck",
            carpetArea: Math.round(baseArea * 1.62) || 1350,
            superArea: Math.round(baseArea * 2.15) || 1790,
            balconyArea: 180,
            facing: "East Facing (Vastu)",
            price: formatPrice(basePrice * 1.68),
            priceLabel: "Starting from",
            description: "Premium corner unit offering uninhibited 270-degree views, 10.5 ft ceiling height, and luxury finishes.",
            rooms: [
                { name: "Family Living & Dining", size: "26'0\" × 15'0\"" },
                { name: "Master Suite", size: "17'0\" × 14'0\"" },
                { name: "Junior Suite", size: "14'0\" × 12'6\"" },
                { name: "Guest Bedroom", size: "13'6\" × 12'0\"" },
                { name: "L-Shaped Gourmet Kitchen", size: "12'0\" × 9'6\"" },
                { name: "Wraparound Deck", size: "18'0\" × 6'6\"" }
            ],
            tag: "Corner Unit"
        }
    ];
}

/**
 * Blueprint SVG Schematic Renderer
 */
function BlueprintSvg({ plan }) {
    const is1Bhk = plan.bhkCategory === "1 BHK";
    const is3Bhk = plan.bhkCategory === "3 BHK";

    return (
        <svg viewBox="0 0 540 360" className="blueprint-canvas-svg" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <pattern id={`grid-${plan.id}`} width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(173, 124, 72, 0.12)" strokeWidth="0.8" />
                </pattern>
            </defs>

            <rect width="540" height="360" fill="#fbf9f5" />
            <rect width="540" height="360" fill={`url(#grid-${plan.id})`} />

            {/* Outer Wall Boundary */}
            <rect x="20" y="20" width="500" height="320" rx="4" fill="#ffffff" stroke="#ad7c48" strokeWidth="2.2" strokeDasharray="6 3" />

            {/* Living & Dining */}
            <rect x="40" y="40" width="230" height="150" rx="3" fill="#f7f5f0" stroke="#ad7c48" strokeWidth="2.2" />
            <text x="155" y="105" textAnchor="middle" className="svg-room-title">Living & Dining</text>
            <text x="155" y="125" textAnchor="middle" className="svg-room-dim">{plan.rooms?.[0]?.size || "20'0\" × 12'0\""}</text>

            {/* Balcony Deck */}
            <rect x="40" y="200" width="230" height="55" rx="2" fill="#eef6f2" stroke="#0e382f" strokeWidth="1.8" strokeDasharray="4 2" />
            <text x="155" y="233" textAnchor="middle" className="svg-room-title svg-room-title--green">Sun Deck / Balcony</text>

            {/* Kitchen */}
            <rect x="40" y="265" width="230" height="60" rx="2" fill="#faf7f2" stroke="#ad7c48" strokeWidth="1.8" />
            <text x="155" y="300" textAnchor="middle" className="svg-room-title">Kitchen & Utility</text>

            {/* Master Bedroom */}
            <rect x="285" y="40" width="215" height="135" rx="3" fill="#f8f5ee" stroke="#ad7c48" strokeWidth="2.2" />
            <text x="392" y="100" textAnchor="middle" className="svg-room-title">Master Suite</text>
            <text x="392" y="120" textAnchor="middle" className="svg-room-dim">{plan.rooms?.[1]?.size || "14'0\" × 11'0\""}</text>

            {/* Bathrooms & Secondary Bedrooms */}
            {is1Bhk ? (
                <>
                    <rect x="285" y="190" width="215" height="135" rx="2" fill="#f1f5f3" stroke="#8fa89b" strokeWidth="1.6" />
                    <text x="392" y="260" textAnchor="middle" className="svg-room-title">En-Suite Bath & Dressing</text>
                </>
            ) : is3Bhk ? (
                <>
                    <rect x="285" y="185" width="105" height="140" rx="2" fill="#faf7f0" stroke="#ad7c48" strokeWidth="1.8" />
                    <text x="337" y="250" textAnchor="middle" className="svg-room-title" style={{ fontSize: "10px" }}>Bedroom 2</text>

                    <rect x="395" y="185" width="105" height="140" rx="2" fill="#faf7f0" stroke="#ad7c48" strokeWidth="1.8" />
                    <text x="447" y="250" textAnchor="middle" className="svg-room-title" style={{ fontSize: "10px" }}>Bedroom 3</text>
                </>
            ) : (
                <>
                    <rect x="285" y="185" width="130" height="140" rx="2" fill="#faf7f0" stroke="#ad7c48" strokeWidth="1.8" />
                    <text x="350" y="250" textAnchor="middle" className="svg-room-title">Bedroom 2</text>

                    <rect x="420" y="185" width="80" height="140" rx="2" fill="#f1f5f3" stroke="#8fa89b" strokeWidth="1.6" />
                    <text x="460" y="250" textAnchor="middle" className="svg-room-title" style={{ fontSize: "9.5px" }}>Bath 2</text>
                </>
            )}

            {/* North Compass Indicator */}
            <g transform="translate(480, 52)">
                <circle cx="0" cy="0" r="11" fill="#ffffff" stroke="#ad7c48" strokeWidth="1" />
                <polygon points="0,-8 -3,0 3,0" fill="#ad7c48" />
                <polygon points="0,8 -3,0 3,0" fill="#cbb292" />
                <text x="0" y="-9" textAnchor="middle" fontSize="6.5" fontWeight="bold" fill="#0f2622">N</text>
            </g>
        </svg>
    );
}

export default function PropertyFloorPlans({ property, onEnquire }) {
    if (!property) return null;

    const floorPlans = useMemo(() => getFloorPlansData(property), [property]);
    const [activeFilter, setActiveFilter] = useState("All");
    const [selectedModalPlan, setSelectedModalPlan] = useState(null);
    const [whatsappModalPlan, setWhatsappModalPlan] = useState(null);
    const [leadModalIntent, setLeadModalIntent] = useState("preview"); // 'preview' | 'whatsapp'
    const [targetPreviewPlan, setTargetPreviewPlan] = useState(null);
    const [isUserUnlocked, setIsUserUnlocked] = useState(false);
    const [unitMeasure, setUnitMeasure] = useState("sq.ft"); // 'sq.ft' or 'sq.m'

    // Form State
    const [waFormData, setWaFormData] = useState({
        name: "",
        phone: "",
        email: "",
        message: ""
    });
    const [formError, setFormError] = useState("");
    const [waSubmitting, setWaSubmitting] = useState(false);
    const [waSuccess, setWaSuccess] = useState(false);

    const trackRef = useRef(null);

    // Check if user has already unlocked/submitted details on this browser
    useEffect(() => {
        try {
            if (typeof window !== "undefined") {
                const storedUnlocked = localStorage.getItem("ppi_floor_plan_unlocked");
                const storedName = localStorage.getItem("ppi_user_name") || "";
                const storedPhone = localStorage.getItem("ppi_user_phone") || "";

                if (storedUnlocked === "true") {
                    setIsUserUnlocked(true);
                }
                if (storedName || storedPhone) {
                    setWaFormData((prev) => ({
                        ...prev,
                        name: prev.name || storedName,
                        phone: prev.phone || storedPhone
                    }));
                }
            }
        } catch (_) {}
    }, []);

    // Compute unique BHK categories for filter buttons
    const availableFilters = useMemo(() => {
        const categories = Array.from(new Set(floorPlans.map((p) => p.bhkCategory || p.bhk))).filter(Boolean);
        return ["All", ...categories];
    }, [floorPlans]);

    // Filtered plans list
    const filteredPlans = useMemo(() => {
        if (activeFilter === "All") return floorPlans;
        return floorPlans.filter((p) => p.bhkCategory === activeFilter || p.bhk === activeFilter);
    }, [floorPlans, activeFilter]);

    const propertyTitle = property.title || property.name || "Pune Luxury Property";

    const convertArea = (sqft) => {
        if (!sqft) return 0;
        if (unitMeasure === "sq.m") {
            return Math.round(sqft * 0.092903);
        }
        return sqft;
    };

    // Open lead modal with intent
    const openLeadModal = (plan, intent = "whatsapp") => {
        setFormError("");
        setLeadModalIntent(intent);
        setWhatsappModalPlan(plan);
        if (intent === "preview") {
            setTargetPreviewPlan(plan);
        }
    };

    // Triggered when user wants to see clear blueprint preview
    const handlePreviewClick = (plan) => {
        if (isUserUnlocked) {
            setSelectedModalPlan(plan);
        } else {
            openLeadModal(plan, "preview");
        }
    };

    // Handle Submission: Validates mandatory Name and Number, stores in MySQL and opens WhatsApp
    const handleWhatsappSubmit = async (e) => {
        e.preventDefault();
        setFormError("");

        const nameTrimmed = waFormData.name.trim();
        const phoneDigits = waFormData.phone.replace(/\D/g, "");

        // MANDATORY VALIDATION: Name and Number are strictly required
        if (!nameTrimmed || nameTrimmed.length < 2) {
            setFormError("Full Name is mandatory to view floor plan preview.");
            return;
        }
        if (!phoneDigits || phoneDigits.length < 10) {
            setFormError("Valid 10-digit Mobile / WhatsApp Number is mandatory.");
            return;
        }

        setWaSubmitting(true);
        try {
            // 1. Store in Database (floor_plan_enquiries & enquiries tables)
            await floorPlanService.submitEnquiry({
                name: nameTrimmed,
                phone: phoneDigits,
                email: waFormData.email?.trim() || "",
                propertyId: String(property.id || ""),
                propertyTitle,
                planId: whatsappModalPlan?.id || "",
                planName: whatsappModalPlan?.name || "",
                bhk: whatsappModalPlan?.bhk || "",
                carpetArea: `${whatsappModalPlan?.carpetArea || ""} ${unitMeasure}`,
                price: whatsappModalPlan?.price || "",
                message: waFormData.message.trim() || (leadModalIntent === "preview"
                    ? `User requested high-resolution architectural layout preview for ${whatsappModalPlan?.name}.`
                    : `Requested floor plan layout and price sheet for ${whatsappModalPlan?.name}.`),
                channel: leadModalIntent === "preview" ? "Preview Unlock" : "WhatsApp"
            });

            // 2. Mark user as unlocked
            setIsUserUnlocked(true);
            try {
                if (typeof window !== "undefined") {
                    localStorage.setItem("ppi_floor_plan_unlocked", "true");
                    localStorage.setItem("ppi_user_name", nameTrimmed);
                    localStorage.setItem("ppi_user_phone", phoneDigits);
                }
            } catch (_) {}

            // Detailed Sanctioned Room Dimensions Report for WhatsApp
            const roomReport = Array.isArray(whatsappModalPlan?.rooms) && whatsappModalPlan.rooms.length > 0
                ? whatsappModalPlan.rooms.map((rm) => `  ▫️ ${rm.name}: ${rm.size}`).join("\n")
                : null;

            // 3. Format prefilled WhatsApp Message with Detailed Report
            const lines = [
                `Hello Pune Property Investors, I am interested in the floor plan for *${propertyTitle}*.`,
                ``,
                `📐 *Unit Configuration & Sanctioned Dimensions:*`,
                `• Plan: ${whatsappModalPlan?.name} (${whatsappModalPlan?.bhk})`,
                `• Carpet Area: ${whatsappModalPlan?.carpetArea} ${unitMeasure}`,
                whatsappModalPlan?.superArea ? `• Super Built-up: ${whatsappModalPlan.superArea} ${unitMeasure}` : null,
                `• Indicative Price: ${whatsappModalPlan?.price}`,
                roomReport ? `\n📋 *Sanctioned Room Dimensions Report:*\n${roomReport}` : null,
                ``,
                `👤 *Client Details:*`,
                `• Name: ${nameTrimmed}`,
                `• Mobile: ${phoneDigits}`,
                waFormData.email ? `• Email: ${waFormData.email.trim()}` : null,
                waFormData.message ? `• Note: ${waFormData.message.trim()}` : null,
                ``,
                leadModalIntent === "preview"
                    ? `I have requested the high-resolution architectural layout. Please share the floor plan PDF and latest cost sheet.`
                    : `Please share the detailed floor plan PDF and latest cost sheet.`
            ].filter(Boolean);

            const whatsappUrl = `https://wa.me/917398174444?text=${encodeURIComponent(lines.join("\n"))}`;
            window.open(whatsappUrl, "_blank", "noopener,noreferrer");

            setWaSuccess(true);
            const nextPlanToPreview = targetPreviewPlan || (leadModalIntent === "preview" ? whatsappModalPlan : null);

            setTimeout(() => {
                setWaSuccess(false);
                setWhatsappModalPlan(null);
                // If the user requested to see the preview, seamlessly show the full blueprint now!
                if (nextPlanToPreview) {
                    setSelectedModalPlan(nextPlanToPreview);
                    setTargetPreviewPlan(null);
                }
            }, 1400);
        } catch (err) {
            console.error("Floor plan enquiry submission error:", err);
            // Fallback: still open WhatsApp even if API request had a network hiccup
            const fallbackText = `Hello Pune Property Investors, I am interested in the floor plan for ${propertyTitle} - ${whatsappModalPlan?.name}. My Name: ${nameTrimmed}, Phone: ${phoneDigits}`;
            window.open(`https://wa.me/917398174444?text=${encodeURIComponent(fallbackText)}`, "_blank");

            setIsUserUnlocked(true);
            setWhatsappModalPlan(null);
            if (targetPreviewPlan) {
                setSelectedModalPlan(targetPreviewPlan);
                setTargetPreviewPlan(null);
            }
        } finally {
            setWaSubmitting(false);
        }
    };

    return (
        <section className="property-floor-plans" id="floor-plans">
            {/* Header: Eyebrow, Title & Actions */}
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
                    {/* Measurement Unit Toggle */}
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
                </div>
            </div>

            {/* Filter Pills Bar */}
            <div className="floor-plans__controls-bar">
                {/* 1 BHK, 2 BHK, 3 BHK Filter Tabs */}
                <div className="floor-plans__filter-tabs">
                    {availableFilters.map((f) => {
                        const count = f === "All"
                            ? floorPlans.length
                            : floorPlans.filter((p) => p.bhkCategory === f || p.bhk === f).length;

                        return (
                            <button
                                key={f}
                                type="button"
                                className={`floor-plans__filter-btn ${activeFilter === f ? "floor-plans__filter-btn--active" : ""}`}
                                onClick={() => setActiveFilter(f)}
                            >
                                <span className="filter-btn__label">{f}</span>
                                <span className="filter-btn__count">{count}</span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* HORIZONTAL MANUAL SCROLL TRACK */}
            <div
                className="floor-plans__horizontal-track"
                ref={trackRef}
                tabIndex={0}
                role="region"
                aria-label="Horizontally scrollable floor plan cards"
            >
                {filteredPlans.map((plan, idx) => (
                    <article key={plan.id || idx} className="floor-plan-card">
                        {/* 1. Card Top Header */}
                        <div className="floor-plan-card__top">
                            <div className="floor-plan-card__tags">
                                <span className="plan-badge plan-badge--bhk">{plan.bhk}</span>
                                {plan.tag && (
                                    <span className="plan-badge plan-badge--highlight">
                                        <Sparkles size={11} /> {plan.tag}
                                    </span>
                                )}
                            </div>
                            <div className="floor-plan-card__facing">
                                <Compass size={12} />
                                <span>{plan.facing}</span>
                            </div>
                        </div>

                        {/* Title & Configuration */}
                        <div className="floor-plan-card__title-row">
                            <h3 className="floor-plan-card__title">{plan.name}</h3>
                            <span className="floor-plan-card__config">{plan.config}</span>
                        </div>

                        {/* 2. Blueprint Preview Viewport (Clearly visible floor plan layout) */}
                        <div
                            className="floor-plan-card__preview-viewport"
                            onClick={() => handlePreviewClick(plan)}
                            title={isUserUnlocked ? "Click to view full high-resolution blueprint" : "Enter details to unlock full blueprint layout"}
                        >
                            {/* Blueprint Canvas (Clear visibility with subtle blur) */}
                            <div className="floor-plan-card__blueprint-canvas">
                                <BlueprintSvg plan={plan} />
                            </div>

                            {/* Small Corner Badge indicating interactive preview */}
                            <div className="floor-plan-card__preview-chip">
                                {isUserUnlocked ? <Eye size={12} /> : <Lock size={11} />}
                                <span>{isUserUnlocked ? "Preview" : "Unlock Details"}</span>
                            </div>
                        </div>

                        {/* 3. Area Details (Placed below floor plan image) */}
                        <div className="floor-plan-card__area-info">
                            <div className="area-info__primary">
                                <Ruler size={13} className="area-info__icon" />
                                <span className="area-info__carpet">
                                    <strong>{convertArea(plan.carpetArea)}</strong> {unitMeasure} Carpet
                                </span>
                            </div>
                            {plan.superArea && (
                                <span className="area-info__super">
                                    Super: {convertArea(plan.superArea)} {unitMeasure}
                                </span>
                            )}
                        </div>

                        {/* Bottom Row: Price & WhatsApp Icon Button ONLY */}
                        <div className="floor-plan-card__bottom">
                            <div className="floor-plan-card__price-box">
                                <span className="price-box__label">{plan.priceLabel || "Starting from"}</span>
                                <span className="price-box__amount">{plan.price}</span>
                            </div>

                            <div className="floor-plan-card__actions">
                                {/* Only WhatsApp Icon Button (No phone icon, no outer border) */}
                                <button
                                    type="button"
                                    className="floor-plan-card__whatsapp-icon-btn"
                                    aria-label={`Get ${plan.name} floor plan on WhatsApp`}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        openLeadModal(plan, "whatsapp");
                                    }}
                                    title="Get Floor Plan on WhatsApp"
                                >
                                    <FaWhatsapp size={22} />
                                </button>
                            </div>
                        </div>
                    </article>
                ))}
            </div>

            {/* Manual Swipe & Scroll Hint for Mobile Users */}
            <div className="floor-plans__swipe-hint">
                <span>← Swipe horizontally to explore all floor plans →</span>
            </div>

            {/* MANDATORY LEAD MODAL: Required to preview layout or connect on WhatsApp */}
            {whatsappModalPlan && (
                <div
                    className="floor-plans__modal-backdrop"
                    onClick={() => !waSubmitting && setWhatsappModalPlan(null)}
                >
                    <div
                        className="floor-plans__modal floor-plans__wa-modal"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className={`modal__header ${leadModalIntent === "preview" ? "modal__header--preview" : "modal__header--wa"}`}>
                            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                <div className={`wa-modal__icon-wrap ${leadModalIntent === "preview" ? "wa-modal__icon-wrap--gold" : ""}`}>
                                    {leadModalIntent === "preview" ? <Lock size={20} /> : <FaWhatsapp size={22} />}
                                </div>
                                <div>
                                    <span className="modal__eyebrow" style={{ color: leadModalIntent === "preview" ? "#F4D58A" : "#dcfce7" }}>
                                        {leadModalIntent === "preview" ? "DETAILS REQUIRED FOR PREVIEW" : "INSTANT WHATSAPP DELIVERY"}
                                    </span>
                                    <h3 className="modal__title" style={{ fontSize: "17.5px" }}>
                                        {leadModalIntent === "preview" ? "Unlock Sanctioned Floor Plan" : "Get Floor Plan & Cost Sheet"}
                                    </h3>
                                </div>
                            </div>
                            <button
                                type="button"
                                className="modal__close-btn"
                                onClick={() => {
                                    setWhatsappModalPlan(null);
                                    setTargetPreviewPlan(null);
                                }}
                                disabled={waSubmitting}
                                aria-label="Close"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {waSuccess ? (
                            <div className="wa-modal__success-view">
                                <CheckCircle2 size={44} color="#16a34a" />
                                <h4>{leadModalIntent === "preview" ? "Details Verified!" : "Enquiry Saved & WhatsApp Opened!"}</h4>
                                <p>
                                    {leadModalIntent === "preview"
                                        ? "Unlocking full high-resolution architectural blueprint layout now..."
                                        : "Our property advisor is connecting with you on WhatsApp right now with the floor plan PDF."}
                                </p>
                            </div>
                        ) : (
                            <form onSubmit={handleWhatsappSubmit} className="wa-modal__form">
                                {/* Selected Plan Snapshot */}
                                <div className="wa-modal__plan-summary">
                                    <div className="plan-summary__left">
                                        <span className="plan-summary__bhk">{whatsappModalPlan.bhk}</span>
                                        <div>
                                            <strong className="plan-summary__name">{whatsappModalPlan.name}</strong>
                                            <span className="plan-summary__area">
                                                {convertArea(whatsappModalPlan.carpetArea)} {unitMeasure} Carpet Area
                                            </span>
                                        </div>
                                    </div>
                                    <span className="plan-summary__price">{whatsappModalPlan.price}</span>
                                </div>

                                {leadModalIntent === "preview" && (
                                    <div className="wa-modal__intent-banner">
                                        <Lock size={14} className="intent-banner__icon" />
                                        <span>Please provide your Name & Mobile number to view the unblurred floor plan blueprint and sanctioned room dimensions.</span>
                                    </div>
                                )}

                                {formError && (
                                    <div className="wa-modal__error-box" role="alert">
                                        <AlertCircle size={15} />
                                        <span>{formError}</span>
                                    </div>
                                )}

                                <div className="wa-modal__field">
                                    <label htmlFor="wa-client-name" className="wa-modal__label">
                                        Full Name <span className="field__required-star">* Mandatory</span>
                                    </label>
                                    <input
                                        id="wa-client-name"
                                        type="text"
                                        className="wa-modal__input"
                                        placeholder="Enter your full name (e.g. Rahul Sharma)"
                                        value={waFormData.name}
                                        onChange={(e) => {
                                            setFormError("");
                                            setWaFormData({ ...waFormData, name: e.target.value });
                                        }}
                                        required
                                        autoFocus
                                    />
                                </div>

                                <div className="wa-modal__field">
                                    <label htmlFor="wa-client-phone" className="wa-modal__label">
                                        Mobile / WhatsApp Number <span className="field__required-star">* Mandatory</span>
                                    </label>
                                    <input
                                        id="wa-client-phone"
                                        type="tel"
                                        className="wa-modal__input"
                                        placeholder="10-digit mobile number (e.g. 9888800000)"
                                        value={waFormData.phone}
                                        onChange={(e) => {
                                            setFormError("");
                                            setWaFormData({ ...waFormData, phone: e.target.value });
                                        }}
                                        required
                                    />
                                </div>

                                <div className="wa-modal__field">
                                    <label htmlFor="wa-client-msg" className="wa-modal__label">
                                        Note / Requirement (Optional)
                                    </label>
                                    <textarea
                                        id="wa-client-msg"
                                        className="wa-modal__textarea"
                                        rows={2}
                                        placeholder="e.g. Interested in floor rise, Vastu orientation, and payment schedule."
                                        value={waFormData.message}
                                        onChange={(e) => setWaFormData({ ...waFormData, message: e.target.value })}
                                    />
                                </div>

                                <p className="wa-modal__privacy">
                                    <Lock size={11} style={{ display: "inline-block", marginRight: 4, verticalAlign: "-1px" }} />
                                    Your details are stored securely and our advisors will share the sanctioned PDF layout on WhatsApp.
                                </p>

                                <button
                                    type="submit"
                                    className="wa-modal__submit-btn"
                                    disabled={waSubmitting}
                                >
                                    {leadModalIntent === "preview" ? (
                                        <>
                                            <Lock size={17} />
                                            <span>{waSubmitting ? "Verifying & Unlocking..." : "Submit Details & View Floor Plan"}</span>
                                        </>
                                    ) : (
                                        <>
                                            <FaWhatsapp size={19} />
                                            <span>{waSubmitting ? "Saving & Opening WhatsApp..." : "Send on WhatsApp & Get Plan"}</span>
                                        </>
                                    )}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            )}

            {/* FULLSCREEN UNBLURRED HIGH-RESOLUTION PREVIEW MODAL */}
            {selectedModalPlan && (
                <div
                    className="floor-plans__modal-backdrop"
                    onClick={() => setSelectedModalPlan(null)}
                >
                    <div
                        className="floor-plans__modal"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="modal__header">
                            <div>
                                <span className="modal__eyebrow">{selectedModalPlan.config}</span>
                                <h3 className="modal__title">
                                    {selectedModalPlan.name} — Clear Architectural Layout
                                </h3>
                            </div>
                            <button
                                type="button"
                                className="modal__close-btn"
                                onClick={() => setSelectedModalPlan(null)}
                                aria-label="Close enlarged blueprint"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="modal__body">
                            {/* Clear unblurred high-res blueprint */}
                            <BlueprintSvg plan={selectedModalPlan} />
                        </div>

                        {/* Room Dimensions Breakdown */}
                        <div className="modal__rooms-breakdown">
                            <h4 className="rooms-breakdown__title">Sanctioned Room Dimensions</h4>
                            <div className="rooms-breakdown__grid">
                                {selectedModalPlan.rooms?.map((rm, idx) => (
                                    <div key={idx} className="breakdown-cell">
                                        <span className="breakdown-cell__name">{rm.name}</span>
                                        <span className="breakdown-cell__size">{rm.size}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="modal__footer">
                            <div className="modal__footer-meta">
                                <span className="modal__footer-price">{selectedModalPlan.price}</span>
                                <span className="modal__footer-carpet">
                                    {convertArea(selectedModalPlan.carpetArea)} {unitMeasure} Carpet Area
                                </span>
                            </div>

                            <div className="modal__footer-actions">
                                {/* Only WhatsApp Button (Call button removed) */}
                                <button
                                    type="button"
                                    className="floor-plan-card__whatsapp-btn"
                                    style={{ padding: "10px 22px", fontSize: "13.5px" }}
                                    onClick={() => {
                                        const p = selectedModalPlan;
                                        setSelectedModalPlan(null);
                                        openLeadModal(p, "whatsapp");
                                    }}
                                >
                                    <FaWhatsapp size={18} />
                                    <span>Get on WhatsApp</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
