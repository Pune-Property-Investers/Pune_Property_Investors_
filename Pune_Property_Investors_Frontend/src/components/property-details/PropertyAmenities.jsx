"use client";

import { useState, useEffect } from "react";
import {
    FaElevator,
    FaSquareParking,
    FaShieldHalved,
    FaDumbbell,
    FaPersonSwimming,
    FaTree,
    FaBolt,
    FaWifi,
    FaChildren,
    FaRoad,
    FaCar,
    FaDroplet,
    FaTableTennisPaddleBall,
    FaVideo,
    FaHouseUser,
    FaCircleCheck,
    FaKitchenSet,
    FaFan,
    FaLock,
    FaPlug,
    FaDoorOpen,
    FaSolarPanel,
    FaBriefcase,
    FaBuilding,
    FaServer,
    FaFireExtinguisher,
    FaWater,
    FaCompass,
    FaGem,
    FaHotTubPerson,
    FaTv,
    FaXmark,
    FaPlus,
    FaPersonRunning,
    FaPersonSkating,
    FaPersonCane,
    FaBaseballBatBall,
    FaBicycle,
    FaFutbol,
    FaSeedling,
    FaChampagneGlasses,
    FaFilm,
} from "react-icons/fa6";
import { getPropertyCategory } from "./ProjectSpecifications";
import "./PropertyAmenities.css";

// ============================================================================
// 1. RESIDENTIAL AMENITIES (APARTMENTS / FLATS)
// ============================================================================
const residentialOutdoor = [
    { name: "Swimming Pool & Lap Pool", icon: FaPersonSwimming },
    { name: "Kids Play Area", icon: FaChildren },
    { name: "Acupressure Jogging Track", icon: FaPersonRunning },
    { name: "Senior Citizen Area", icon: FaPersonCane },
    { name: "Squash Court & Sports Arena", icon: FaTableTennisPaddleBall },
    { name: "Skating Rink", icon: FaPersonSkating },
    { name: "Box Cricket Pitch", icon: FaBaseballBatBall },
    { name: "Herbal Garden & Zen Park", icon: FaSeedling },
    { name: "Dedicated Cycling Track", icon: FaBicycle },
    { name: "Futsal Court", icon: FaFutbol },
    { name: "Party Lawn & Gazebo", icon: FaChampagneGlasses },
    { name: "Mini Theatre & AV Lounge", icon: FaFilm },
    { name: "Grand Multi-Storey Clubhouse", icon: FaHouseUser },
    { name: "Fully Equipped Fitness Centre", icon: FaDumbbell },
    { name: "24/7 Security & CCTV Surveillance", icon: FaShieldHalved },
    { name: "High-Speed Automatic Elevators", icon: FaElevator },
    { name: "EV Fast-Charging Infrastructure", icon: FaSolarPanel },
];

const residentialInternal = [
    { name: "Modular Kitchen with Granite Platform", icon: FaKitchenSet },
    { name: "Italian Marble / Large Vitrified Tiles", icon: FaCircleCheck },
    { name: "Smart Digital Biometric Door Lock", icon: FaLock },
    { name: "Color Video Door Phone with Intercom", icon: FaVideo },
    { name: "Premium Jaquar / Kohler CP & Sanitary Fittings", icon: FaDroplet },
    { name: "Split AC Pre-Wiring in Living & Bedrooms", icon: FaFan },
    { name: "Soundproof Anodized Sliding Windows", icon: FaDoorOpen },
    { name: "Fire-Resistant Concealed Copper Wiring", icon: FaPlug },
    { name: "Solar Water Heating System", icon: FaSolarPanel },
    { name: "100% Power Backup for Common Areas", icon: FaBolt },
];

// ============================================================================
// 2. COMMERCIAL AMENITIES (OFFICES / RETAIL / TECH PARKS)
// ============================================================================
const commercialOutdoor = [
    { name: "Grand Triple-Height Corporate Lobby", icon: FaBuilding },
    { name: "Destination-Controlled High-Speed Lifts", icon: FaElevator },
    { name: "Centralized Building Management System (BMS)", icon: FaShieldHalved },
    { name: "Multi-Level Covered Basement Parking", icon: FaSquareParking },
    { name: "Executive Cafeteria & Food Court", icon: FaHouseUser },
    { name: "Professional Conference Suites & Boardrooms", icon: FaBriefcase },
    { name: "24/7 Multi-Tier Physical Security & Boom Barriers", icon: FaVideo },
    { name: "EV Fast-Charging Infrastructure for 2W & 4W", icon: FaCar },
    { name: "High-Street Retail & ATM Boulevard", icon: FaWifi },
    { name: "IGBC / LEED Pre-Certified Green Design", icon: FaSolarPanel },
];

const commercialInternal = [
    { name: "Bare Shell / Warm Shell (3.8m Clear Ceiling)", icon: FaBuilding },
    { name: "Centralized VRV / VRF HVAC Provision", icon: FaFan },
    { name: "Double-Glazed Soundproof Glass Facade", icon: FaDoorOpen },
    { name: "Heavy-Duty Floor Loading Capacity (500 kg/m²)", icon: FaCircleCheck },
    { name: "Smart Biometric RFID Access Control", icon: FaLock },
    { name: "Fire Suppression Sprinklers & Detectors", icon: FaFireExtinguisher },
    { name: "Dual-Feed High-Capacity Fiber Broadband", icon: FaServer },
    { name: "100% DG Power Backup with Dedicated Substation", icon: FaBolt },
];

// ============================================================================
// 3. PLOT & LAND AMENITIES (NA RESIDENTIAL & VILLA PLOTS)
// ============================================================================
const plotOutdoor = [
    { name: "Grand Designer Entrance Arch & Security Cabin", icon: FaShieldHalved },
    { name: "40 ft & 30 ft Wide Internal Concrete Roads", icon: FaRoad },
    { name: "Automatic Solar-Powered LED Street Lights", icon: FaSolarPanel },
    { name: "Landscaped Central Park & Children's Play Zone", icon: FaChildren },
    { name: "Peripheral Avenue Tree Plantation & Green Buffers", icon: FaTree },
    { name: "Gated Enclave Boundary Compound Wall with CCTV", icon: FaVideo },
    { name: "Underground Rainwater Harvesting Wells", icon: FaDroplet },
    { name: "Overhead Reservoir with Booster Water Pumps", icon: FaWater },
    { name: "Community Gathering Pavilion & Gazebos", icon: FaHouseUser },
    { name: "Paved Curbs & Pedestrian Walkway Lanes", icon: FaSquareParking },
];

const plotInternal = [
    { name: "Demarcated Boundary with Individual Stone Markers", icon: FaCompass },
    { name: "Underground 3-Phase MSEDCL Electrical Line", icon: FaPlug },
    { name: "Dedicated Potable Water Supply Tap Point", icon: FaWater },
    { name: "Underground Sewage & Stormwater Runoff Conduits", icon: FaDroplet },
    { name: "Level Topography Ready for Immediate Construction", icon: FaCircleCheck },
    { name: "100% Clear Title with Individual 7/12 Extract", icon: FaBriefcase },
    { name: "Vastu-Compliant East / North Facing Layouts", icon: FaCompass },
    { name: "Elevated Ground with Zero Flood Risk", icon: FaRoad },
];

// ============================================================================
// 4. VILLA AMENITIES (LUXURY VILLAS & BUNGALOWS)
// ============================================================================
const villaOutdoor = [
    { name: "Private Temperature-Controlled Swimming Pool", icon: FaPersonSwimming },
    { name: "Landscaped Private Garden Lawn & BBQ Gazebo", icon: FaTree },
    { name: "Rooftop Star-Gazing Deck with Pergola", icon: FaHouseUser },
    { name: "Covered Car Garage with Dedicated EV Charger", icon: FaCar },
    { name: "5-Star Resort Clubhouse, Spa & Wellness Lounge", icon: FaHouseUser },
    { name: "Championship Tennis & Squash Courts", icon: FaTableTennisPaddleBall },
    { name: "24/7 Gated Perimeter Security with Thermal CCTV", icon: FaShieldHalved },
    { name: "Tree-Lined Private Boulevards & Jogging Track", icon: FaRoad },
    { name: "Pet-Friendly Activity Park & Family Grounds", icon: FaChildren },
    { name: "100% Generator Power Backup for Enclave", icon: FaBolt },
];

const villaInternal = [
    { name: "Private In-Villa Elevator Provision", icon: FaElevator },
    { name: "Double-Height Grand Living Room with Glazing", icon: FaDoorOpen },
    { name: "Designer Italian Modular Kitchen with Island", icon: FaKitchenSet },
    { name: "Imported Italian Marble in Living & Dining", icon: FaGem },
    { name: "Presidential Master Suite with Jacuzzi & Wardrobe", icon: FaHotTubPerson },
    { name: "Smart Home Automation (Lights, Climate, Blinds)", icon: FaWifi },
    { name: "Private Home Cinema / AV Lounge Provision", icon: FaTv },
    { name: "Biometric Keyless Entry & Video Intercom", icon: FaLock },
];

// Amenity Icon Mapper for Custom Items
const amenityIcons = {
    swim: FaPersonSwimming,
    pool: FaPersonSwimming,
    play: FaChildren,
    kid: FaChildren,
    children: FaChildren,
    jog: FaPersonRunning,
    run: FaPersonRunning,
    track: FaPersonRunning,
    senior: FaPersonCane,
    squash: FaTableTennisPaddleBall,
    skat: FaPersonSkating,
    cricket: FaBaseballBatBall,
    herb: FaSeedling,
    garden: FaSeedling,
    park: FaTree,
    tree: FaTree,
    cycle: FaBicycle,
    cycling: FaBicycle,
    futsal: FaFutbol,
    football: FaFutbol,
    party: FaChampagneGlasses,
    lawn: FaChampagneGlasses,
    theatre: FaFilm,
    theater: FaFilm,
    cinema: FaFilm,
    gym: FaDumbbell,
    fitness: FaDumbbell,
    workout: FaDumbbell,
    club: FaHouseUser,
    clubhouse: FaHouseUser,
    security: FaShieldHalved,
    guard: FaShieldHalved,
    cctv: FaVideo,
    lift: FaElevator,
    elevator: FaElevator,
    parking: FaSquareParking,
    car: FaCar,
    power: FaBolt,
    backup: FaBolt,
    electricity: FaBolt,
    wifi: FaWifi,
    water: FaDroplet,
    road: FaRoad,
    tennis: FaTableTennisPaddleBall,
    kitchen: FaKitchenSet,
    lock: FaLock,
    ac: FaFan,
    office: FaBuilding,
    hvac: FaFan,
    bms: FaServer,
};

function getAmenityIcon(amenity) {
    const text = String(amenity).toLowerCase();
    const match = Object.keys(amenityIcons).find((key) => text.includes(key));
    return match ? amenityIcons[match] : FaCircleCheck;
}

export default function PropertyAmenities({ amenities = [], showHeader = false, property = null }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const category = getPropertyCategory(property);

    // Pick Category-Specific Defaults
    let categoryDefaultsInternal = residentialInternal;
    let categoryDefaultsOutdoor = residentialOutdoor;
    let sectionTitles = {
        outdoor: "External Amenities",
        internal: "Internal Amenities",
    };

    if (category === "commercial") {
        categoryDefaultsInternal = commercialInternal;
        categoryDefaultsOutdoor = commercialOutdoor;
        sectionTitles = {
            outdoor: "Tech Park & Building Amenities",
            internal: "Office & Workspace Specifications",
        };
    } else if (category === "plot") {
        categoryDefaultsInternal = plotInternal;
        categoryDefaultsOutdoor = plotOutdoor;
        sectionTitles = {
            outdoor: "Gated Enclave & Layout Amenities",
            internal: "On-Plot Infrastructure & Connections",
        };
    } else if (category === "villa") {
        categoryDefaultsInternal = villaInternal;
        categoryDefaultsOutdoor = villaOutdoor;
        sectionTitles = {
            outdoor: "Private Grounds & Enclave Club",
            internal: "Private Villa Specifications",
        };
    }

    // Merge any custom amenities from property object
    const rawAmenities = Array.isArray(amenities) ? amenities.filter(Boolean) : [];
    const customInternal = [];
    const customOutdoor = [];

    rawAmenities.forEach((item) => {
        const lower = item.toLowerCase();
        if (
            lower.includes("kitchen") ||
            lower.includes("marble") ||
            lower.includes("tile") ||
            lower.includes("door") ||
            lower.includes("fitting") ||
            lower.includes("ac") ||
            lower.includes("wiring") ||
            lower.includes("bath") ||
            lower.includes("shell") ||
            lower.includes("hvac") ||
            lower.includes("elevator") ||
            lower.includes("lift")
        ) {
            customInternal.push({ name: item, icon: getAmenityIcon(item) });
        } else {
            customOutdoor.push({ name: item, icon: getAmenityIcon(item) });
        }
    });

    const internalList = [
        ...categoryDefaultsInternal,
        ...customInternal.filter(
            (ci) => !categoryDefaultsInternal.some((d) => d.name.toLowerCase() === ci.name.toLowerCase())
        ),
    ];

    const outdoorList = [
        ...categoryDefaultsOutdoor,
        ...customOutdoor.filter(
            (co) => !categoryDefaultsOutdoor.some((d) => d.name.toLowerCase() === co.name.toLowerCase())
        ),
    ];

    const allList = [...outdoorList, ...internalList];

    // Take 3 top preview amenities to display in a single clean row on the page
    const previewList = outdoorList.slice(0, 3);
    const remainingCount = Math.max(0, allList.length - previewList.length);

    // Body scroll lock & Escape key handling when modal is open
    useEffect(() => {
        if (isModalOpen) {
            const prevOverflow = document.body.style.overflow;
            document.body.style.overflow = "hidden";

            const handleKeyDown = (e) => {
                if (e.key === "Escape") {
                    setIsModalOpen(false);
                }
            };
            window.addEventListener("keydown", handleKeyDown);

            return () => {
                document.body.style.overflow = prevOverflow;
                window.removeEventListener("keydown", handleKeyDown);
            };
        }
    }, [isModalOpen]);

    return (
        <section className="property-amenities">
            {showHeader && (
                <div className="property-amenities__heading">
                    <span className="property-amenities__eyebrow">
                        {category === "commercial"
                            ? "BUSINESS INFRASTRUCTURE & AMENITIES"
                            : category === "plot"
                            ? "LAYOUT & GATED INFRASTRUCTURE"
                            : category === "villa"
                            ? "LUXURY VILLA LIFESTYLE & AMENITIES"
                            : "COMFORT & LIFESTYLE"}
                    </span>
                    <h2>Amenities</h2>
                    <p>
                        {category === "commercial"
                            ? "Enterprise-grade office specifications and corporate tech park amenities."
                            : category === "plot"
                            ? "Pre-installed on-plot utilities and premium gated layout infrastructure."
                            : category === "villa"
                            ? "Bespoke private villa amenities alongside world-class gated enclave leisure."
                            : "Thoughtfully planned internal fixtures and world-class community amenities."}
                    </p>
                </div>
            )}

            {/* 3 Preview Amenities Cards (3 in a Row) */}
            <div className="property-amenities__preview-grid">
                {previewList.map((item, idx) => {
                    const Icon = item.icon;
                    return (
                        <div
                            key={idx}
                            className="property-amenities__preview-card"
                            onClick={() => setIsModalOpen(true)}
                            role="button"
                            tabIndex={0}
                            title={`Click to view all amenities including ${item.name}`}
                        >
                            <span className="property-amenities__preview-icon">
                                <Icon size={22} />
                            </span>
                            <span className="property-amenities__preview-name">{item.name}</span>
                        </div>
                    );
                })}
            </div>

            {/* View More CTA Button */}
            <div className="property-amenities__action">
                <button
                    type="button"
                    className="amenities-view-more-btn"
                    onClick={() => setIsModalOpen(true)}
                >
                    <FaPlus className="amenities-view-more-icon" />
                    <span>View More Amenities (+{remainingCount} More)</span>
                </button>
            </div>

            {/* ================================================================= */}
            {/* AMENITIES MODAL POPUP (Matching Housiey reference & PPI Luxury)  */}
            {/* ================================================================= */}
            {isModalOpen && (
                <div
                    className="amenities-modal-backdrop"
                    onClick={() => setIsModalOpen(false)}
                    aria-modal="true"
                    role="dialog"
                >
                    <div
                        className="amenities-modal"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header */}
                        <div className="amenities-modal__header">
                            <div className="amenities-modal__title-group">
                                <h2>Amenities</h2>
                                <span className="amenities-modal__badge">{allList.length} Amenities</span>
                            </div>
                            <button
                                type="button"
                                className="amenities-modal__close-btn"
                                onClick={() => setIsModalOpen(false)}
                                aria-label="Close amenities modal"
                            >
                                <FaXmark size={18} />
                            </button>
                        </div>

                        {/* Modal Body with 2-Column Sections */}
                        <div className="amenities-modal__body">
                            {/* 1. External / Outdoor Amenities */}
                            {outdoorList.length > 0 && (
                                <div className="amenities-modal__section">
                                    <h3 className="amenities-modal__section-title">
                                        {sectionTitles.outdoor}
                                    </h3>
                                    <div className="amenities-modal__grid-2col">
                                        {outdoorList.map((item, idx) => {
                                            const Icon = item.icon;
                                            return (
                                                <div
                                                    className="amenities-modal__item"
                                                    key={`outdoor-${idx}`}
                                                >
                                                    <span className="amenities-modal__item-icon">
                                                        <Icon size={17} />
                                                    </span>
                                                    <span className="amenities-modal__item-name">
                                                        {item.name}
                                                    </span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}

                            {/* 2. Internal Amenities */}
                            {internalList.length > 0 && (
                                <div className="amenities-modal__section">
                                    <h3 className="amenities-modal__section-title">
                                        {sectionTitles.internal}
                                    </h3>
                                    <div className="amenities-modal__grid-2col">
                                        {internalList.map((item, idx) => {
                                            const Icon = item.icon;
                                            return (
                                                <div
                                                    className="amenities-modal__item"
                                                    key={`internal-${idx}`}
                                                >
                                                    <span className="amenities-modal__item-icon amenities-modal__item-icon--internal">
                                                        <Icon size={17} />
                                                    </span>
                                                    <span className="amenities-modal__item-name">
                                                        {item.name}
                                                    </span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
