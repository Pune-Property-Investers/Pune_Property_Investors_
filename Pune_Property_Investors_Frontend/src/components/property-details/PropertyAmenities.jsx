"use client";

import { useState, useEffect, useRef } from "react";
import {
    Play,
    ChevronRight,
    ChevronLeft,
} from "lucide-react";
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
import { extractYouTubeVideoId } from "../../lib/youtube";
import "./PropertyAmenities.css";

// ============================================================================
// 1. RESIDENTIAL AMENITIES (APARTMENTS / FLATS)
// ============================================================================
const residentialOutdoor = [
    { name: "Swimming Pool & Lap Pool", icon: FaPersonSwimming },
    { name: "Kids Play Area & Creche", icon: FaChildren },
    { name: "Acupressure Jogging Track", icon: FaPersonRunning },
    { name: "Senior Citizen Area", icon: FaPersonCane },
    { name: "Squash Court & Sports Arena", icon: FaTableTennisPaddleBall },
    { name: "Skating Rink", icon: FaPersonSkating },
    { name: "Box Cricket Pitch", icon: FaBaseballBatBall },
    { name: "Herbal Garden & Zen Park", icon: FaSeedling },
    { name: "Dedicated Cycling Track", icon: FaBicycle },
    { name: "Futsal Court", icon: FaFutbol },
    { name: "Amphitheatre & Party Lawn", icon: FaChampagneGlasses },
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
    creche: FaChildren,
    jog: FaPersonRunning,
    run: FaPersonRunning,
    track: FaPersonRunning,
    senior: FaPersonCane,
    squash: FaTableTennisPaddleBall,
    skat: FaPersonSkating,
    cricket: FaBaseballBatBall,
    herb: FaSeedling,
    garden: FaTree,
    landscape: FaTree,
    park: FaTree,
    tree: FaTree,
    cycle: FaBicycle,
    cycling: FaBicycle,
    futsal: FaFutbol,
    football: FaFutbol,
    party: FaChampagneGlasses,
    lawn: FaChampagneGlasses,
    amphi: FaChampagneGlasses,
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
    ev: FaSolarPanel,
    charger: FaSolarPanel,
    charging: FaSolarPanel,
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

// ============================================================================
// CURATED FEATURED SLIDES POOL (HIGH RESOLUTION IMAGERY WITH OVERLAPPING LABELS)
// ============================================================================
const featuredSlidesPool = {
    residential: [
        {
            key: "amphi",
            name: "Amphitheatre",
            image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=900&q=80",
            icon: FaChampagneGlasses,
        },
        {
            key: "gym",
            name: "Gymnasium",
            image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=900&q=80",
            icon: FaDumbbell,
        },
        {
            key: "pool",
            name: "Swimming Pool",
            image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=900&q=80",
            icon: FaPersonSwimming,
        },
        {
            key: "creche",
            name: "Creche / Day Care",
            image: "https://images.unsplash.com/photo-1596464716127-f2a829822301?auto=format&fit=crop&w=900&q=80",
            icon: FaChildren,
        },
        {
            key: "garden",
            name: "Landscape Garden",
            image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=900&q=80",
            icon: FaTree,
        },
        {
            key: "ev",
            name: "EV Charging Station",
            image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=900&q=80",
            icon: FaSolarPanel,
        },
        {
            key: "club",
            name: "Grand Clubhouse",
            image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=900&q=80",
            icon: FaHouseUser,
        },
    ],
    commercial: [
        {
            key: "lobby",
            name: "Grand Corporate Lobby",
            image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=80",
            icon: FaBuilding,
        },
        {
            key: "conference",
            name: "Conference & Meeting Suites",
            image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=900&q=80",
            icon: FaBriefcase,
        },
        {
            key: "cafeteria",
            name: "Cafeteria & Dining Hub",
            image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=900&q=80",
            icon: FaHouseUser,
        },
        {
            key: "lifts",
            name: "High-Speed Smart Elevators",
            image: "https://images.unsplash.com/photo-1541888946425-d0fbb186156f?auto=format&fit=crop&w=900&q=80",
            icon: FaElevator,
        },
        {
            key: "ev",
            name: "EV Fast-Charging Facility",
            image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=900&q=80",
            icon: FaSolarPanel,
        },
    ],
    plot: [
        {
            key: "arch",
            name: "Grand Entrance Arch",
            image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80",
            icon: FaShieldHalved,
        },
        {
            key: "road",
            name: "Wide Internal Concrete Roads",
            image: "https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=900&q=80",
            icon: FaRoad,
        },
        {
            key: "park",
            name: "Central Landscaped Park",
            image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=900&q=80",
            icon: FaTree,
        },
        {
            key: "pavilion",
            name: "Community Pavilion & Gazebo",
            image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=900&q=80",
            icon: FaHouseUser,
        },
    ],
    villa: [
        {
            key: "pool",
            name: "Private Swimming Pool",
            image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=900&q=80",
            icon: FaPersonSwimming,
        },
        {
            key: "lawn",
            name: "Private Landscape Garden",
            image: "https://images.unsplash.com/photo-1558293842-c0fd3db86157?auto=format&fit=crop&w=900&q=80",
            icon: FaTree,
        },
        {
            key: "club",
            name: "Resort Clubhouse & Spa",
            image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=900&q=80",
            icon: FaHouseUser,
        },
        {
            key: "gym",
            name: "Exclusive Fitness Studio",
            image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=900&q=80",
            icon: FaDumbbell,
        },
    ],
};

export default function PropertyAmenities({
    amenities = [],
    showHeader = true,
    property = null,
    onEnquire = null,
}) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeSlideIndex, setActiveSlideIndex] = useState(0);
    const [isExpanded, setIsExpanded] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

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

    // Carousel slides list
    const pool = featuredSlidesPool[category] || featuredSlidesPool.residential;
    const slides = pool.slice(0, 6);

    // Auto-advance slides every 5s when not hovered
    useEffect(() => {
        if (isHovered) return;
        const timer = setInterval(() => {
            setActiveSlideIndex((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [isHovered, slides.length]);

    const activeSlide = slides[activeSlideIndex] || slides[0];

    const prevSlide = () => {
        setActiveSlideIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    };

    const nextSlide = () => {
        setActiveSlideIndex((prev) => (prev + 1) % slides.length);
    };

    // Quick highlight amenities (4-item grid below hero photo matching the reference)
    const quickItems = [
        {
            key: "gym",
            name: "Gymnasium",
            icon: FaDumbbell,
            slideIndex: slides.findIndex((s) => s.key === "gym"),
        },
        {
            key: "creche",
            name: "Creche/Day Care",
            icon: FaChildren,
            slideIndex: slides.findIndex((s) => s.key === "creche"),
        },
        {
            key: "ev",
            name: "EV Charging Stat...",
            icon: FaSolarPanel,
            slideIndex: slides.findIndex((s) => s.key === "ev"),
        },
        {
            key: "garden",
            name: "Landscape Garden",
            icon: FaTree,
            slideIndex: slides.findIndex((s) => s.key === "garden"),
        },
    ];

    // Interactive flip: clicking on quick item switches the hero photo to that amenity
    const handleQuickSelect = (item) => {
        if (item.slideIndex !== -1) {
            setActiveSlideIndex(item.slideIndex);
        }
    };

    // Subtitle text with ...more toggle
    const projectName = property?.projectName || property?.title || "This premium project";
    const fullDescription = `${projectName} presents an exclusive opportunity to indulge in world-class lifestyle amenities, serene open greens, and state-of-the-art recreation spaces.`;
    const shortDescription = `${projectName} presents an exclusive opportunity to...`;

    // Video Tour ID
    const videoId = extractYouTubeVideoId(property?.videoUrl || property?.youtubeUrl || "");

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
            {/* 1. Header with Video Tour Badge */}
            <div className="property-amenities__card-header">
                <div className="property-amenities__header-text">
                    <h3 className="property-amenities__title">Amenities</h3>
                    <p className="property-amenities__subtitle">
                        {isExpanded ? fullDescription : shortDescription}
                        <button
                            type="button"
                            className="property-amenities__more-btn"
                            onClick={() => setIsExpanded(!isExpanded)}
                        >
                            {isExpanded ? " less" : "more"}
                        </button>
                    </p>
                </div>

                {videoId ? (
                    <a
                        href="#video-tour"
                        className="property-amenities__video-badge"
                        title="Watch Property Video Tour"
                    >
                        <img
                            src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
                            alt="Video Tour"
                            className="property-amenities__video-badge-thumb"
                        />
                        <span className="property-amenities__video-badge-play">
                            <Play size={11} fill="#ffffff" color="#ffffff" />
                        </span>
                    </a>
                ) : (
                    <div className="property-amenities__count-pill">
                        <span>{allList.length}+ Amenities</span>
                    </div>
                )}
            </div>

            {/* 2. Hero Featured Photo Card with Overlapping Name & Pagination Dots */}
            <div
                className="property-amenities__hero-card"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className="property-amenities__hero-media">
                    <img
                        src={activeSlide.image}
                        alt={activeSlide.name}
                        className="property-amenities__hero-image"
                        loading="lazy"
                    />

                    {/* Left & Right Subtle Navigation Arrows on Hover */}
                    <button
                        type="button"
                        className="property-amenities__hero-nav property-amenities__hero-nav--prev"
                        onClick={(e) => {
                            e.stopPropagation();
                            prevSlide();
                        }}
                        aria-label="Previous amenity photo"
                    >
                        <ChevronLeft size={16} />
                    </button>
                    <button
                        type="button"
                        className="property-amenities__hero-nav property-amenities__hero-nav--next"
                        onClick={(e) => {
                            e.stopPropagation();
                            nextSlide();
                        }}
                        aria-label="Next amenity photo"
                    >
                        <ChevronRight size={16} />
                    </button>

                    {/* Gradient Overlay with Overlapping Name at Bottom Left */}
                    <div className="property-amenities__hero-overlay">
                        <div className="property-amenities__hero-bottom">
                            <h4 className="property-amenities__hero-name">
                                {activeSlide.name}
                            </h4>

                            {/* Centered Pagination Dots */}
                            <div className="property-amenities__hero-dots">
                                {slides.map((_, dotIdx) => (
                                    <button
                                        key={dotIdx}
                                        type="button"
                                        className={`property-amenities__hero-dot ${
                                            dotIdx === activeSlideIndex ? "active" : ""
                                        }`}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setActiveSlideIndex(dotIdx);
                                        }}
                                        aria-label={`Amenity photo ${dotIdx + 1}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 3. Quick 4 Amenity Highlights (Interactive Switcher) */}
            <div className="property-amenities__quick-grid">
                {quickItems.map((item, idx) => {
                    const Icon = item.icon;
                    const isSelected = activeSlide.key === item.key;
                    return (
                        <div
                            key={idx}
                            className={`property-amenities__quick-item ${isSelected ? "selected" : ""}`}
                            onClick={() => handleQuickSelect(item)}
                            role="button"
                            tabIndex={0}
                            title={`Click to view ${item.name} photo`}
                        >
                            <span className="property-amenities__quick-icon">
                                <Icon size={16} />
                            </span>
                            <span className="property-amenities__quick-name">
                                {item.name}
                            </span>
                        </div>
                    );
                })}
            </div>

            {/* 4. Action Button (View All Amenities) */}
            <div className="property-amenities__action-buttons">
                {/* Luxury Outlined Pill: View all X amenities */}
                <button
                    type="button"
                    className="property-amenities__view-all-pill"
                    onClick={() => setIsModalOpen(true)}
                >
                    <span>View all {allList.length} amenities</span>
                    <ChevronRight size={16} className="property-amenities__btn-arrow" />
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
