"use client";

import { useState } from "react";
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
} from "react-icons/fa6";
import { getPropertyCategory } from "./ProjectSpecifications";
import "./PropertyAmenities.css";

// ============================================================================
// 1. RESIDENTIAL AMENITIES (APARTMENTS / FLATS)
// ============================================================================
const residentialInternal = [
    { name: "Modular Kitchen with Granite Platform & Sink", icon: FaKitchenSet },
    { name: "Italian Marble / Large Vitrified Tiles", icon: FaCircleCheck },
    { name: "Smart Digital Biometric Door Lock", icon: FaLock },
    { name: "Color Video Door Phone with Intercom", icon: FaVideo },
    { name: "Premium Jaquar / Kohler CP & Sanitary Fittings", icon: FaDroplet },
    { name: "Split AC Pre-Wiring in Living & All Bedrooms", icon: FaFan },
    { name: "Anodized Powder-Coated Soundproof Windows", icon: FaDoorOpen },
    { name: "Fire-Resistant Concealed Copper Wiring", icon: FaPlug },
];

const residentialOutdoor = [
    { name: "Infinity Temperature-Controlled Swimming Pool", icon: FaPersonSwimming },
    { name: "Grand Multi-Storey Clubhouse & Banquet Hall", icon: FaHouseUser },
    { name: "Fully Equipped Fitness Centre & Yoga Pavilion", icon: FaDumbbell },
    { name: "Children's Adventure Play Park & Sandpit", icon: FaChildren },
    { name: "Acupressure Jogging & Cycling Track", icon: FaRoad },
    { name: "Landscaped Zen Gardens with Pergolas", icon: FaTree },
    { name: "24/7 Multi-Tier Security with CCTV Surveillance", icon: FaShieldHalved },
    { name: "High-Speed Automatic Elevators with Power Backup", icon: FaElevator },
    { name: "Multi-Purpose Sports Court & Tennis Lawn", icon: FaTableTennisPaddleBall },
    { name: "EV Charging Infrastructure & Solar Lighting", icon: FaSolarPanel },
];

// ============================================================================
// 2. COMMERCIAL AMENITIES (OFFICES / RETAIL / TECH PARKS)
// ============================================================================
const commercialInternal = [
    { name: "Bare Shell / Warm Shell with 3.8m Clear Ceiling Height", icon: FaBuilding },
    { name: "Centralized VRV / VRF Energy-Efficient HVAC Provision", icon: FaFan },
    { name: "Double-Glazed Soundproof & Thermal Glass Facade", icon: FaDoorOpen },
    { name: "Heavy-Duty Floor Loading Capacity (500 kg/sq.m)", icon: FaCircleCheck },
    { name: "Smart Biometric RFID Access Control & Turnstiles", icon: FaLock },
    { name: "Concealed Fire Suppression Sprinklers & Smoke Detectors", icon: FaFireExtinguisher },
    { name: "Dual-Feed High-Capacity Fiber-Optic Broadband", icon: FaServer },
    { name: "100% DG Power Backup with Dedicated Substation", icon: FaBolt },
];

const commercialOutdoor = [
    { name: "Grand Triple-Height Air-Conditioned Corporate Lobby", icon: FaBuilding },
    { name: "High-Speed Destination-Controlled Elevators & Service Lift", icon: FaElevator },
    { name: "24/7 Centralized Building Management System (BMS)", icon: FaShieldHalved },
    { name: "Dedicated Multi-Level Basement Parking & Visitor Bays", icon: FaSquareParking },
    { name: "Executive Cafeteria, Food Court & Open Terraces", icon: FaHouseUser },
    { name: "Professional Conference Suites & Boardrooms", icon: FaBriefcase },
    { name: "24/7 Multi-Tier Physical Security & Boom Barriers", icon: FaVideo },
    { name: "EV Fast-Charging Infrastructure for 2W & 4W", icon: FaCar },
    { name: "ATM & Retail High-Street Boulevard", icon: FaWifi },
    { name: "IGBC / LEED Pre-Certified Green Building Design", icon: FaSolarPanel },
];

// ============================================================================
// 3. PLOT & LAND AMENITIES (NA RESIDENTIAL & VILLA PLOTS)
// ============================================================================
const plotInternal = [
    { name: "Demarcated Boundary with Individual Stone Markers & Gate", icon: FaCompass },
    { name: "Underground 3-Phase MSEDCL Electrical Line", icon: FaPlug },
    { name: "Dedicated Potable Water Supply Connection Point", icon: FaWater },
    { name: "Underground Sewage & Stormwater Runoff Conduits", icon: FaDroplet },
    { name: "Level Ground Topography Ready for Immediate Construction", icon: FaCircleCheck },
    { name: "100% Clear Title with Individual 7/12 Extract", icon: FaBriefcase },
    { name: "Vastu-Compliant East / North Facing Plot Options", icon: FaCompass },
    { name: "High Elevation with Zero Flood Risk & Natural Slopes", icon: FaRoad },
];

const plotOutdoor = [
    { name: "Grand Designer Entrance Arch with 24/7 Security Cabin", icon: FaShieldHalved },
    { name: "40 ft & 30 ft Wide Internal Concrete / Asphalt DP Roads", icon: FaRoad },
    { name: "Automatic Solar-Powered LED Street Lighting", icon: FaSolarPanel },
    { name: "Landscaped Central Park & Children's Play Zone", icon: FaChildren },
    { name: "Lush Peripheral Avenue Tree Plantation & Green Buffers", icon: FaTree },
    { name: "Gated Enclave Boundary Compound Wall with CCTV", icon: FaVideo },
    { name: "Underground Rainwater Harvesting & Recharge Wells", icon: FaDroplet },
    { name: "Overhead Water Storage Reservoir with Booster Pumps", icon: FaWater },
    { name: "Community Gathering Pavilion & Gazebos", icon: FaHouseUser },
    { name: "Wide Walkway Curbs with Paved Pedestrian Lanes", icon: FaSquareParking },
];

// ============================================================================
// 4. VILLA AMENITIES (LUXURY VILLAS & BUNGALOWS)
// ============================================================================
const villaInternal = [
    { name: "Private In-Villa Elevator / Lift Provision across All Floors", icon: FaElevator },
    { name: "Double-Height Grand Living Room with Panoramic Glazing", icon: FaDoorOpen },
    { name: "Designer Italian Modular Kitchen with Island Breakfast Counter", icon: FaKitchenSet },
    { name: "Imported Italian Marble in Living, Dining & Foyer", icon: FaGem },
    { name: "Presidential Master Suite with Walk-in Wardrobe & Jacuzzi", icon: FaHotTubPerson },
    { name: "Smart Home Automation (Lighting, Climate & Curtains)", icon: FaWifi },
    { name: "Acoustically Treated Private Home Cinema Lounge Provision", icon: FaTv },
    { name: "Biometric Keyless Entry & High-Resolution Video Intercom", icon: FaLock },
];

const villaOutdoor = [
    { name: "Private Temperature-Controlled Swimming Pool & Sun Deck", icon: FaPersonSwimming },
    { name: "Landscaped Private Garden Lawn with Barbeque Gazebo", icon: FaTree },
    { name: "Private Open-Air Rooftop Star-Gazing Deck with Pergola", icon: FaHouseUser },
    { name: "2-3 Covered Car Parking Garage with Dedicated EV Charger", icon: FaCar },
    { name: "5-Star Resort Clubhouse, Spa & Wellness Lounge in Enclave", icon: FaHouseUser },
    { name: "Championship Tennis Court & Air-Conditioned Squash Court", icon: FaTableTennisPaddleBall },
    { name: "24/7 Gated Perimeter Security with Infrared Night CCTV", icon: FaShieldHalved },
    { name: "Tree-Lined Private Boulevards & Scenic Jogging Tracks", icon: FaRoad },
    { name: "Pet-Friendly Activity Park & Family Picnic Grounds", icon: FaChildren },
    { name: "100% Generator Power Backup for Common & Private Inverter", icon: FaBolt },
];

// Amenity Icon Mapper for Custom Items
const amenityIcons = {
    lift: FaElevator,
    elevator: FaElevator,
    parking: FaSquareParking,
    car: FaCar,
    security: FaShieldHalved,
    guard: FaShieldHalved,
    cctv: FaVideo,
    gym: FaDumbbell,
    fitness: FaDumbbell,
    workout: FaDumbbell,
    swimming: FaPersonSwimming,
    pool: FaPersonSwimming,
    garden: FaTree,
    park: FaTree,
    power: FaBolt,
    backup: FaBolt,
    electricity: FaBolt,
    children: FaChildren,
    kid: FaChildren,
    play: FaChildren,
    wifi: FaWifi,
    internet: FaWifi,
    water: FaDroplet,
    road: FaRoad,
    sports: FaTableTennisPaddleBall,
    tennis: FaTableTennisPaddleBall,
    clubhouse: FaHouseUser,
    club: FaHouseUser,
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
    const [activeTab, setActiveTab] = useState("all");

    const category = getPropertyCategory(property);

    // Pick Category-Specific Defaults
    let categoryDefaultsInternal = residentialInternal;
    let categoryDefaultsOutdoor = residentialOutdoor;
    let tabLabels = {
        internal: "Internal Amenities (Apartment)",
        outdoor: "Outdoor & Campus Amenities",
        internalBadge: "Interior Specifications",
        internalTitle: "Internal Amenities & Residence Features",
        internalDesc: "High-specification fittings, premium flooring and smart security inside each apartment.",
        outdoorBadge: "Society & Campus",
        outdoorTitle: "Outdoor, Sports & Club Lifestyle Amenities",
        outdoorDesc: "World-class community infrastructure, sports courts, infinity pool, and green zones.",
    };

    if (category === "commercial") {
        categoryDefaultsInternal = commercialInternal;
        categoryDefaultsOutdoor = commercialOutdoor;
        tabLabels = {
            internal: "Office & Workspace (Internal)",
            outdoor: "Tech Park & Building (Shared)",
            internalBadge: "Workspace Specifications",
            internalTitle: "Internal Office Specifications",
            internalDesc: "High-ceiling floor plate, energy-efficient HVAC and smart biometric access control.",
            outdoorBadge: "Campus & Infrastructure",
            outdoorTitle: "Tech Park & Building Infrastructure",
            outdoorDesc: "Centralized BMS, multi-level parking, destination-controlled elevators and corporate cafeterias.",
        };
    } else if (category === "plot") {
        categoryDefaultsInternal = plotInternal;
        categoryDefaultsOutdoor = plotOutdoor;
        tabLabels = {
            internal: "On-Plot Infrastructure (Individual)",
            outdoor: "Gated Enclave & Layout Amenities",
            internalBadge: "Individual Plot Provisions",
            internalTitle: "On-Plot Infrastructure & Connections",
            internalDesc: "Demarcation, utility points & title clearances for the individual plot.",
            outdoorBadge: "Gated Layout Infrastructure",
            outdoorTitle: "Enclave & Society Community Features",
            outdoorDesc: "40 ft wide internal roads, solar lighting, grand entrance gate and landscaped parks.",
        };
    } else if (category === "villa") {
        categoryDefaultsInternal = villaInternal;
        categoryDefaultsOutdoor = villaOutdoor;
        tabLabels = {
            internal: "Private Villa Features (Internal)",
            outdoor: "Villa Enclave & Club (Outdoor)",
            internalBadge: "Bespoke Villa Interiors",
            internalTitle: "Private Villa Living & Specifications",
            internalDesc: "Inside the private villa residence, en-suite quarters, private elevator & smart automation.",
            outdoorBadge: "Private Grounds & Enclave Club",
            outdoorTitle: "Private Open Spaces & Resort Lifestyle",
            outdoorDesc: "Private swimming pool, landscaped lawn, rooftop terrace deck and gated 5-star club.",
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

    const allList = [...internalList, ...outdoorList];

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
                    <h2>Amenities & Features</h2>
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

            {/* Filter Tabs */}
            <div className="amenities-tab-nav" role="tablist">
                <button
                    type="button"
                    className={`amenities-tab-btn ${activeTab === "all" ? "active" : ""}`}
                    onClick={() => setActiveTab("all")}
                >
                    <span>All Amenities</span>
                    <span className="tab-count">{allList.length}</span>
                </button>

                <button
                    type="button"
                    className={`amenities-tab-btn ${activeTab === "internal" ? "active" : ""}`}
                    onClick={() => setActiveTab("internal")}
                >
                    <span>{tabLabels.internal}</span>
                    <span className="tab-count">{internalList.length}</span>
                </button>

                <button
                    type="button"
                    className={`amenities-tab-btn ${activeTab === "outdoor" ? "active" : ""}`}
                    onClick={() => setActiveTab("outdoor")}
                >
                    <span>{tabLabels.outdoor}</span>
                    <span className="tab-count">{outdoorList.length}</span>
                </button>
            </div>

            {/* Content Display */}
            {activeTab === "all" ? (
                <div className="amenities-dual-view">
                    {/* Internal Amenities Group */}
                    <div className="amenities-group-card">
                        <div className="group-card__header">
                            <span className="group-card__badge">{tabLabels.internalBadge}</span>
                            <h3>{tabLabels.internalTitle}</h3>
                            <p>{tabLabels.internalDesc}</p>
                        </div>
                        <div className="property-amenities__grid">
                            {internalList.map((item, idx) => {
                                const Icon = item.icon;
                                return (
                                    <div className="property-amenities__item" key={idx}>
                                        <span className="property-amenities__icon property-amenities__icon--internal">
                                            <Icon size={15} />
                                        </span>
                                        <span className="property-amenities__name">{item.name}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Outdoor Amenities Group */}
                    <div className="amenities-group-card">
                        <div className="group-card__header">
                            <span className="group-card__badge group-card__badge--outdoor">{tabLabels.outdoorBadge}</span>
                            <h3>{tabLabels.outdoorTitle}</h3>
                            <p>{tabLabels.outdoorDesc}</p>
                        </div>
                        <div className="property-amenities__grid">
                            {outdoorList.map((item, idx) => {
                                const Icon = item.icon;
                                return (
                                    <div className="property-amenities__item" key={idx}>
                                        <span className="property-amenities__icon property-amenities__icon--outdoor">
                                            <Icon size={15} />
                                        </span>
                                        <span className="property-amenities__name">{item.name}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            ) : activeTab === "internal" ? (
                <div className="amenities-group-card single-view">
                    <div className="group-card__header">
                        <span className="group-card__badge">{tabLabels.internalBadge}</span>
                        <h3>{tabLabels.internalTitle}</h3>
                        <p>{tabLabels.internalDesc}</p>
                    </div>
                    <div className="property-amenities__grid">
                        {internalList.map((item, idx) => {
                            const Icon = item.icon;
                            return (
                                <div className="property-amenities__item" key={idx}>
                                    <span className="property-amenities__icon property-amenities__icon--internal">
                                        <Icon size={15} />
                                    </span>
                                    <span className="property-amenities__name">{item.name}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            ) : (
                <div className="amenities-group-card single-view">
                    <div className="group-card__header">
                        <span className="group-card__badge group-card__badge--outdoor">{tabLabels.outdoorBadge}</span>
                        <h3>{tabLabels.outdoorTitle}</h3>
                        <p>{tabLabels.outdoorDesc}</p>
                    </div>
                    <div className="property-amenities__grid">
                        {outdoorList.map((item, idx) => {
                            const Icon = item.icon;
                            return (
                                <div className="property-amenities__item" key={idx}>
                                    <span className="property-amenities__icon property-amenities__icon--outdoor">
                                        <Icon size={15} />
                                    </span>
                                    <span className="property-amenities__name">{item.name}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </section>
    );
}
