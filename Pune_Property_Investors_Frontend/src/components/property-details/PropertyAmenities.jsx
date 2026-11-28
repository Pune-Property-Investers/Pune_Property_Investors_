"use client";

import { useState, useEffect, useRef } from "react";
import {
    Play,
    ChevronRight,
    ChevronLeft,
    X,
} from "lucide-react";
import {
    SwimmingPoolIcon,
    ClubHouseIcon,
    KidsPlayIcon,
    GardenIcon,
    MultiCourtIcon,
    SeniorCitizenIcon,
    KidsPoolIcon,
    FlowerGardenIcon,
    CricketNetIcon,
    LawnMowerIcon,
    AmphitheaterIcon,
    MeditationIcon,
    SeatingAreaIcon,
    PoolDeckIcon,
    CrecheIcon,
    StarGazingIcon,
    PartyLawnIcon,
    GymnasiumIcon,
    SkyCinemaIcon,
    JoggingTrackIcon,
    CyclingTrackIcon,
    SecurityIcon,
    ElevatorIcon,
    EvChargingIcon,
    ParkingIcon,
    KitchenIcon,
    SmartLockIcon,
    VideoIntercomIcon,
    SanitaryIcon,
    AcCoolingIcon,
    WindowGlassIcon,
    PowerBackupIcon,
    BuildingIcon,
    WaterSupplyIcon,
    RoadInfraIcon,
    CompassVastuIcon,
    CheckFloorIcon,
} from "./AmenityLineIcons";
import { getPropertyCategory } from "./ProjectSpecifications";
import { extractYouTubeVideoId } from "../../lib/youtube";
import "./PropertyAmenities.css";

// ============================================================================
// 1. RESIDENTIAL AMENITIES (APARTMENTS / FLATS)
// ============================================================================
const residentialOutdoor = [
    { name: "Swimming Pool", icon: SwimmingPoolIcon },
    { name: "Club House", icon: ClubHouseIcon },
    { name: "Kids Play Area", icon: KidsPlayIcon },
    { name: "Garden", icon: GardenIcon },
    { name: "Multi Purpose Court", icon: MultiCourtIcon },
    { name: "Senior Citizen Area", icon: SeniorCitizenIcon },
    { name: "Kids Pool", icon: KidsPoolIcon },
    { name: "Flower Garden", icon: FlowerGardenIcon },
    { name: "Net Cricket", icon: CricketNetIcon },
    { name: "Multi Purpose Lawn", icon: LawnMowerIcon },
    { name: "Amphitheater", icon: AmphitheaterIcon },
    { name: "Meditation Zone", icon: MeditationIcon },
    { name: "Seating Area", icon: SeatingAreaIcon },
    { name: "Pool Deck", icon: PoolDeckIcon },
    { name: "Creche Play Area", icon: CrecheIcon },
    { name: "Star Gazing", icon: StarGazingIcon },
    { name: "Party Lawn", icon: PartyLawnIcon },
    { name: "Gymnasium", icon: GymnasiumIcon },
    { name: "Sky Cinema", icon: SkyCinemaIcon },
    { name: "Jogging & Cycling Track", icon: JoggingTrackIcon },
    { name: "24/7 Security & CCTV", icon: SecurityIcon },
    { name: "High-Speed Elevators", icon: ElevatorIcon },
    { name: "EV Fast-Charging Station", icon: EvChargingIcon },
];

const residentialInternal = [
    { name: "Modular Kitchen with Granite Platform", icon: KitchenIcon },
    { name: "Italian Marble / Large Vitrified Tiles", icon: CheckFloorIcon },
    { name: "Smart Digital Biometric Door Lock", icon: SmartLockIcon },
    { name: "Color Video Door Phone with Intercom", icon: VideoIntercomIcon },
    { name: "Premium Jaquar / Kohler CP & Sanitary Fittings", icon: SanitaryIcon },
    { name: "Split AC Pre-Wiring in Living & Bedrooms", icon: AcCoolingIcon },
    { name: "Soundproof Anodized Sliding Windows", icon: WindowGlassIcon },
    { name: "Fire-Resistant Concealed Copper Wiring", icon: PowerBackupIcon },
    { name: "Solar Water Heating System", icon: WaterSupplyIcon },
    { name: "100% Power Backup for Common Areas", icon: PowerBackupIcon },
];

// ============================================================================
// 2. COMMERCIAL AMENITIES (OFFICES / RETAIL / TECH PARKS)
// ============================================================================
const commercialOutdoor = [
    { name: "Grand Triple-Height Corporate Lobby", icon: BuildingIcon },
    { name: "Destination-Controlled High-Speed Lifts", icon: ElevatorIcon },
    { name: "Centralized Building Management System (BMS)", icon: SecurityIcon },
    { name: "Multi-Level Covered Basement Parking", icon: ParkingIcon },
    { name: "Executive Cafeteria & Food Court", icon: ClubHouseIcon },
    { name: "Professional Conference Suites & Boardrooms", icon: SeatingAreaIcon },
    { name: "24/7 Multi-Tier Physical Security & Boom Barriers", icon: VideoIntercomIcon },
    { name: "EV Fast-Charging Infrastructure for 2W & 4W", icon: EvChargingIcon },
    { name: "High-Street Retail & ATM Boulevard", icon: BuildingIcon },
    { name: "IGBC / LEED Pre-Certified Green Design", icon: GardenIcon },
];

const commercialInternal = [
    { name: "Bare Shell / Warm Shell (3.8m Clear Ceiling)", icon: BuildingIcon },
    { name: "Centralized VRV / VRF HVAC Provision", icon: AcCoolingIcon },
    { name: "Double-Glazed Soundproof Glass Facade", icon: WindowGlassIcon },
    { name: "Heavy-Duty Floor Loading Capacity (500 kg/m²)", icon: CheckFloorIcon },
    { name: "Smart Biometric RFID Access Control", icon: SmartLockIcon },
    { name: "Fire Suppression Sprinklers & Detectors", icon: SecurityIcon },
    { name: "Dual-Feed High-Capacity Fiber Broadband", icon: PowerBackupIcon },
    { name: "100% DG Power Backup with Dedicated Substation", icon: PowerBackupIcon },
];

// ============================================================================
// 3. PLOT & LAND AMENITIES (NA RESIDENTIAL & VILLA PLOTS)
// ============================================================================
const plotOutdoor = [
    { name: "Grand Designer Entrance Arch & Security Cabin", icon: SecurityIcon },
    { name: "40 ft & 30 ft Wide Internal Concrete Roads", icon: RoadInfraIcon },
    { name: "Automatic Solar-Powered LED Street Lights", icon: EvChargingIcon },
    { name: "Landscaped Central Park & Children's Play Zone", icon: KidsPlayIcon },
    { name: "Peripheral Avenue Tree Plantation & Green Buffers", icon: GardenIcon },
    { name: "Gated Enclave Boundary Compound Wall with CCTV", icon: VideoIntercomIcon },
    { name: "Underground Rainwater Harvesting Wells", icon: WaterSupplyIcon },
    { name: "Overhead Reservoir with Booster Water Pumps", icon: SanitaryIcon },
    { name: "Community Gathering Pavilion & Gazebos", icon: PartyLawnIcon },
    { name: "Paved Curbs & Pedestrian Walkway Lanes", icon: JoggingTrackIcon },
];

const plotInternal = [
    { name: "Demarcated Boundary with Individual Stone Markers", icon: CompassVastuIcon },
    { name: "Underground 3-Phase MSEDCL Electrical Line", icon: PowerBackupIcon },
    { name: "Dedicated Potable Water Supply Tap Point", icon: WaterSupplyIcon },
    { name: "Underground Sewage & Stormwater Runoff Conduits", icon: SanitaryIcon },
    { name: "Level Topography Ready for Immediate Construction", icon: CheckFloorIcon },
    { name: "100% Clear Title with Individual 7/12 Extract", icon: BuildingIcon },
    { name: "Vastu-Compliant East / North Facing Layouts", icon: CompassVastuIcon },
    { name: "Elevated Ground with Zero Flood Risk", icon: RoadInfraIcon },
];

// ============================================================================
// 4. VILLA AMENITIES (LUXURY VILLAS & BUNGALOWS)
// ============================================================================
const villaOutdoor = [
    { name: "Private Temperature-Controlled Swimming Pool", icon: SwimmingPoolIcon },
    { name: "Landscaped Private Garden Lawn & BBQ Gazebo", icon: GardenIcon },
    { name: "Rooftop Star-Gazing Deck with Pergola", icon: StarGazingIcon },
    { name: "Covered Car Garage with Dedicated EV Charger", icon: EvChargingIcon },
    { name: "5-Star Resort Clubhouse, Spa & Wellness Lounge", icon: ClubHouseIcon },
    { name: "Championship Tennis & Squash Courts", icon: MultiCourtIcon },
    { name: "24/7 Gated Perimeter Security with Thermal CCTV", icon: SecurityIcon },
    { name: "Tree-Lined Private Boulevards & Jogging Track", icon: JoggingTrackIcon },
    { name: "Pet-Friendly Activity Park & Family Grounds", icon: KidsPlayIcon },
    { name: "100% Generator Power Backup for Enclave", icon: PowerBackupIcon },
];

const villaInternal = [
    { name: "Private In-Villa Elevator Provision", icon: ElevatorIcon },
    { name: "Double-Height Grand Living Room with Glazing", icon: WindowGlassIcon },
    { name: "Designer Italian Modular Kitchen with Island", icon: KitchenIcon },
    { name: "Imported Italian Marble in Living & Dining", icon: CheckFloorIcon },
    { name: "Presidential Master Suite with Jacuzzi & Wardrobe", icon: PoolDeckIcon },
    { name: "Smart Home Automation (Lights, Climate, Blinds)", icon: AcCoolingIcon },
    { name: "Private Home Cinema / AV Lounge Provision", icon: SkyCinemaIcon },
    { name: "Biometric Keyless Entry & Video Intercom", icon: SmartLockIcon },
];

// Amenity Icon Mapper for Custom Items
const amenityIcons = {
    "kids pool": KidsPoolIcon,
    "pool deck": PoolDeckIcon,
    swim: SwimmingPoolIcon,
    pool: SwimmingPoolIcon,
    creche: CrecheIcon,
    play: KidsPlayIcon,
    kid: KidsPlayIcon,
    children: KidsPlayIcon,
    jog: JoggingTrackIcon,
    run: JoggingTrackIcon,
    track: JoggingTrackIcon,
    senior: SeniorCitizenIcon,
    court: MultiCourtIcon,
    squash: MultiCourtIcon,
    tennis: MultiCourtIcon,
    cricket: CricketNetIcon,
    flower: FlowerGardenIcon,
    herb: FlowerGardenIcon,
    garden: GardenIcon,
    landscape: GardenIcon,
    park: GardenIcon,
    tree: GardenIcon,
    cycle: CyclingTrackIcon,
    cycling: CyclingTrackIcon,
    meditation: MeditationIcon,
    yoga: MeditationIcon,
    zen: MeditationIcon,
    seat: SeatingAreaIcon,
    bench: SeatingAreaIcon,
    star: StarGazingIcon,
    party: PartyLawnIcon,
    lawn: LawnMowerIcon,
    amphi: AmphitheaterIcon,
    theatre: SkyCinemaIcon,
    theater: SkyCinemaIcon,
    cinema: SkyCinemaIcon,
    gym: GymnasiumIcon,
    fitness: GymnasiumIcon,
    workout: GymnasiumIcon,
    club: ClubHouseIcon,
    clubhouse: ClubHouseIcon,
    security: SecurityIcon,
    guard: SecurityIcon,
    cctv: VideoIntercomIcon,
    lift: ElevatorIcon,
    elevator: ElevatorIcon,
    parking: ParkingIcon,
    ev: EvChargingIcon,
    charger: EvChargingIcon,
    charging: EvChargingIcon,
    car: ParkingIcon,
    power: PowerBackupIcon,
    backup: PowerBackupIcon,
    electricity: PowerBackupIcon,
    water: WaterSupplyIcon,
    road: RoadInfraIcon,
    kitchen: KitchenIcon,
    lock: SmartLockIcon,
    ac: AcCoolingIcon,
    office: BuildingIcon,
    hvac: AcCoolingIcon,
    bms: SecurityIcon,
};

function getAmenityIcon(amenity) {
    const text = String(amenity).toLowerCase();
    const match = Object.keys(amenityIcons).find((key) => text.includes(key));
    return match ? amenityIcons[match] : CheckFloorIcon;
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
            icon: AmphitheaterIcon,
        },
        {
            key: "gym",
            name: "Gymnasium",
            image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=900&q=80",
            icon: GymnasiumIcon,
        },
        {
            key: "pool",
            name: "Swimming Pool",
            image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=900&q=80",
            icon: SwimmingPoolIcon,
        },
        {
            key: "creche",
            name: "Creche / Day Care",
            image: "https://images.unsplash.com/photo-1596464716127-f2a829822301?auto=format&fit=crop&w=900&q=80",
            icon: CrecheIcon,
        },
        {
            key: "garden",
            name: "Landscape Garden",
            image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=900&q=80",
            icon: GardenIcon,
        },
        {
            key: "ev",
            name: "EV Charging Station",
            image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=900&q=80",
            icon: EvChargingIcon,
        },
        {
            key: "club",
            name: "Grand Clubhouse",
            image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=900&q=80",
            icon: ClubHouseIcon,
        },
    ],
    commercial: [
        {
            key: "lobby",
            name: "Grand Corporate Lobby",
            image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=80",
            icon: BuildingIcon,
        },
        {
            key: "conference",
            name: "Conference & Meeting Suites",
            image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=900&q=80",
            icon: SeatingAreaIcon,
        },
        {
            key: "cafeteria",
            name: "Cafeteria & Dining Hub",
            image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=900&q=80",
            icon: ClubHouseIcon,
        },
        {
            key: "lifts",
            name: "High-Speed Smart Elevators",
            image: "https://images.unsplash.com/photo-1541888946425-d0fbb186156f?auto=format&fit=crop&w=900&q=80",
            icon: ElevatorIcon,
        },
        {
            key: "ev",
            name: "EV Fast-Charging Facility",
            image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=900&q=80",
            icon: EvChargingIcon,
        },
    ],
    plot: [
        {
            key: "arch",
            name: "Grand Entrance Arch",
            image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80",
            icon: SecurityIcon,
        },
        {
            key: "road",
            name: "Wide Internal Concrete Roads",
            image: "https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=900&q=80",
            icon: RoadInfraIcon,
        },
        {
            key: "park",
            name: "Central Landscaped Park",
            image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=900&q=80",
            icon: GardenIcon,
        },
        {
            key: "pavilion",
            name: "Community Pavilion & Gazebo",
            image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=900&q=80",
            icon: PartyLawnIcon,
        },
    ],
    villa: [
        {
            key: "pool",
            name: "Private Swimming Pool",
            image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=900&q=80",
            icon: SwimmingPoolIcon,
        },
        {
            key: "lawn",
            name: "Private Landscape Garden",
            image: "https://images.unsplash.com/photo-1558293842-c0fd3db86157?auto=format&fit=crop&w=900&q=80",
            icon: GardenIcon,
        },
        {
            key: "club",
            name: "Resort Clubhouse & Spa",
            image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=900&q=80",
            icon: ClubHouseIcon,
        },
        {
            key: "gym",
            name: "Exclusive Fitness Studio",
            image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=900&q=80",
            icon: GymnasiumIcon,
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
            icon: GymnasiumIcon,
            slideIndex: slides.findIndex((s) => s.key === "gym"),
        },
        {
            key: "creche",
            name: "Creche/Day Care",
            icon: CrecheIcon,
            slideIndex: slides.findIndex((s) => s.key === "creche"),
        },
        {
            key: "ev",
            name: "EV Charging Stat...",
            icon: EvChargingIcon,
            slideIndex: slides.findIndex((s) => s.key === "ev"),
        },
        {
            key: "garden",
            name: "Landscape Garden",
            icon: GardenIcon,
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
                                <Icon size={24} />
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
                                <X size={18} />
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
                                                        <Icon size={24} />
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
                                                        <Icon size={24} />
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
