"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { heroSettingService } from "../../services/heroSetting.service";
import { locationService } from "../../services/location.service";

import {
    Search,
    MapPin,
    Building2,
    IndianRupee,
    Star,
    Users,
    ShieldCheck,
    Bed,
    ChevronDown,
    Sparkles,
    CirclePercent,
    Percent,
    Calendar,
} from "lucide-react";

const ICON_MAP = {
    ShieldCheck,
    Building2,
    MapPin,
    Users,
    Star,
    CirclePercent,
    Percent,
    Calendar,
};

const GUMLET_VIDEO_URL =
    "https://play.gumlet.io/embed/6aec1cf3981592d058d2775e?background=true&autoplay=true&loop=true&disable_player_controls=true&preload=true";

const locations = [
    "All Locations",
    "Wakad",
    "Baner",
    "Hinjewadi",
    "Kharadi",
    "Hadapsar",
    "Kothrud",
    "Viman Nagar",
    "Ravet",
    "Dhanori",
    "Wagholi",
    "Charholi",
    "Mundhwa",
    "NIBM",
    "Keshav Nagar",
    "Pimple Saudagar",
    "Punawale",
    "Tathawade",
    "Undri",
    "Mohammed Wadi",
    "Balewadi",
];

const propertyTypes = [
    { label: "All Residential", value: "Residential" },
    { label: "Apartment / Flat", value: "Apartment" },
    { label: "Villa / Independent House", value: "Villa" },
    { label: "Plot / Land", value: "Plot" },
    { label: "Commercial", value: "Commercial" },
];

const bhkOptions = [
    { label: "Any BHK", value: "Any" },
    { label: "1 BHK", value: "1" },
    { label: "2 BHK", value: "2" },
    { label: "3 BHK", value: "3" },
    { label: "4 BHK", value: "4" },
    { label: "5+ BHK", value: "5+" },
];

const budgetOptions = [
    { label: "Any Budget", value: "Any Budget" },
    { label: "Under ₹30 Lakh", value: "Under 30 Lakhs" },
    { label: "₹30–50 Lakh", value: "30-50 Lakhs" },
    { label: "₹50–80 Lakh", value: "50-80 Lakhs" },
    { label: "₹80 Lakh–₹1.5 Cr", value: "80 Lakhs-1.5 Crore" },
    { label: "Above ₹1.5 Cr", value: "Above 1.5 Crore" },
];

const searchTabs = [
    { key: "projects", label: "Projects", href: "/projects" },
    { key: "new-launches", label: "New Launches", href: "/new-launches" },
    { key: "residential", label: "Residential", href: "/buy?type=Residential" },
    { key: "commercial", label: "Commercial", href: "/commercial" },
    { key: "plot-land", label: "Plot / Land", href: "/plots" },
    { key: "upcoming", label: "Upcoming", href: "/buy?status=Upcoming" },
];

const trustStats = [
    { icon: ShieldCheck, strong: "Since 2022", text: "in Pune" },
    { icon: Star, strong: "4.9/5", text: "Client Rating" },
    { icon: CirclePercent, strong: "0%", text: "Brokerage" },
    { icon: Users, strong: "20,000+", text: "Happy Families" },
    { icon: Building2, strong: "200+", text: "Team Size" },
    { icon: MapPin, strong: "30+", text: "Pune Localities" },
];

function HeroSection({ activeTab = "projects", onTabChange, previewData }) {
    const router = useRouter();

    const [location, setLocation] = useState("All Locations");
    const [propertyType, setPropertyType] = useState("Residential");
    const [bhk, setBhk] = useState("Any");
    const [budget, setBudget] = useState("Any Budget");

    const [dbHero, setDbHero] = useState(null);
    const [dbLocalities, setDbLocalities] = useState([]);

    useEffect(() => {
        let isMounted = true;
        heroSettingService
            .get({ full: true })
            .then((res) => {
                const data = res?.data || res;
                if (isMounted && data) {
                    setDbHero(data);
                }
            })
            .catch((err) => console.error("Failed to load hero settings:", err));

        locationService
            .list()
            .then((res) => {
                const list = Array.isArray(res) ? res : res?.data;
                if (isMounted && Array.isArray(list) && list.length > 0) {
                    setDbLocalities(list);
                }
            })
            .catch((err) => console.error("Failed to load localities for hero:", err));

        return () => {
            isMounted = false;
        };
    }, []);

    const locationOptions = useMemo(() => {
        if (dbLocalities.length > 0) {
            return ["All Locations", ...dbLocalities.map((l) => l.name || l.title)];
        }
        return locations;
    }, [dbLocalities]);

    const badgesList = useMemo(() => {
        if (Array.isArray(dbHero?.trustBadges) && dbHero.trustBadges.length > 0) {
            return dbHero.trustBadges.map((b) => ({
                icon: ICON_MAP[b.iconName] || ShieldCheck,
                strong: b.strongText || b.strong,
                text: b.labelText || b.text,
            }));
        }
        return trustStats;
    }, [dbHero?.trustBadges]);

    const heroEyebrow =
        (previewData?.eyebrow && previewData.eyebrow.trim()) ||
        (dbHero?.eyebrow && dbHero.eyebrow.trim()) ||
        "YOUR PROPERTY PARTNER IN PUNE";
    const heroHeading1 =
        (previewData?.headingLine1 && previewData.headingLine1.trim()) ||
        (dbHero?.headingLine1 && dbHero.headingLine1.trim()) ||
        "Find Your Dream Home.";
    const heroHeading2 =
        (previewData?.headingLine2 && previewData.headingLine2.trim()) ||
        (dbHero?.headingLine2 && dbHero.headingLine2.trim()) ||
        "Invest in Your Future";
    const heroSubtitle = previewData?.subtitle ?? dbHero?.subtitle ?? "";
    const heroVideoUrl = previewData?.videoUrl || dbHero?.videoUrl || GUMLET_VIDEO_URL;
    const heroBgImage = previewData?.backgroundImage || dbHero?.backgroundImage || "";
    const showCategoryTabs = previewData?.showCategoryTabs ?? dbHero?.showCategoryTabs ?? true;
    const showSearchCard = previewData?.showSearchCard ?? dbHero?.showSearchCard ?? true;
    const ctaText = previewData?.primaryCtaText || dbHero?.primaryCtaText || "";
    const ctaUrl = previewData?.primaryCtaUrl || dbHero?.primaryCtaUrl || "/buy";

    // Category tab handling
    const handleTabChange = (tabKey) => {
        if (onTabChange) {
            onTabChange(tabKey);
        }

        if (tabKey === "commercial") {
            setPropertyType("Commercial");
        } else if (tabKey === "plot-land") {
            setPropertyType("Plot");
        } else if (tabKey === "residential") {
            setPropertyType("Residential");
        }

        const target = document.getElementById("featured-properties");

        if (target) {
            target.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    };

    // Property search
    const handleSearch = (event) => {
        event.preventDefault();

        const params = new URLSearchParams({
            projectType: activeTab,
            location:
                location === "All Locations" ? "all" : location,
            type:
                propertyType === "Residential" ? "all" : propertyType,
            bhk: bhk === "Any" ? "all" : bhk,
            budget,
        });

        router.push(`/buy?${params.toString()}`);
    };

    return (
        <section className="hero-oyo-section" id="buy">

            {/* =========================================
                GUMLET BACKGROUND VIDEO
                TOP-ALIGNED FULL-BLEED VIDEO
            ========================================= */}

            <div className="hero-oyo-video-wrapper">
                {heroBgImage ? (
                    <img
                        src={heroBgImage}
                        alt={heroHeading1}
                        className="hero-oyo-video"
                        style={{
                            position: "absolute",
                            inset: 0,
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            border: "none",
                            pointerEvents: "none",
                        }}
                    />
                ) : (
                    <iframe
                        src={heroVideoUrl}
                        title="Pune Property Investor Background Video"
                        className="hero-oyo-video"
                        allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
                        referrerPolicy="origin"
                        loading="eager"
                        style={{
                            position: "absolute",

                            // Align video from the TOP
                            top: "0",
                            left: "50%",
                            transform: "translateX(-50%)",

                            // Full-screen 16:9 cover sizing
                            width: "max(100vw, 177.78vh)",
                            height: "max(100vh, 56.25vw)",

                            minWidth: "100%",
                            minHeight: "100%",

                            border: "none",
                            pointerEvents: "none",
                        }}
                    />
                )}
            </div>

            {/* Dark Vignette Overlay */}
            <div className="hero-oyo-overlay" />

            {/* =========================================
                CENTERED HERO CONTENT
            ========================================= */}

            <div className="hero-oyo-stage">

                {/* Eyebrow */}
                <span className="hero-oyo-eyebrow">
                    <Sparkles size={13} style={{ color: "#d6b36a" }} />
                    <span>{heroEyebrow}</span>
                </span>

                {/* Main Heading */}
                <h1 className="hero-oyo-title">
                    <span>{heroHeading1}</span>

                    <span className="hero-oyo-title-sub">
                        {heroHeading2}
                    </span>
                </h1>

                {/* Category Tabs */}
                {showCategoryTabs && (
                    <div
                        className="hero-oyo-tabs"
                        role="tablist"
                        aria-label="Project category tabs"
                    >
                        {searchTabs.map((tab) => (
                            <Link
                                key={tab.key}
                                href={tab.href}
                                role="tab"
                                aria-selected={activeTab === tab.key}
                                className={`hero-oyo-tab ${activeTab === tab.key
                                    ? "hero-oyo-tab--active"
                                    : ""
                                    }`}
                                onClick={() => handleTabChange(tab.key)}
                            >
                                {tab.label}
                            </Link>
                        ))}
                    </div>
                )}

                {/* =========================================
                    PROPERTY SEARCH CARD
                ========================================= */}

                {showSearchCard && (
                    <form
                        className="hero-search-card"
                        onSubmit={handleSearch}
                    >

                        {/* Location */}
                        <div className="hero-search-card__field">

                            <label
                                htmlFor="search-location"
                                className="hero-search-card__label"
                            >
                                LOCATION IN PUNE
                            </label>

                            <div className="hero-search-card__input-row">

                                <MapPin
                                    className="hero-search-card__icon"
                                    size={16}
                                />

                                <select
                                    id="search-location"
                                    value={location}
                                    onChange={(e) =>
                                        setLocation(e.target.value)
                                    }
                                    className="hero-search-card__select"
                                >
                                    <option value="All Locations">
                                        e.g. Baner, Wakad, Kharadi...
                                    </option>

                                    {locationOptions
                                        .filter((l) => l !== "All Locations")
                                        .map((item) => (
                                            <option key={item} value={item}>
                                                {item}, Pune
                                            </option>
                                        ))}
                                </select>

                                <ChevronDown
                                    className="hero-search-card__chevron"
                                    size={14}
                                />

                            </div>
                        </div>

                        {/* Property Type */}
                        <div className="hero-search-card__field">

                            <label
                                htmlFor="search-type"
                                className="hero-search-card__label"
                            >
                                PROPERTY TYPE
                            </label>

                            <div className="hero-search-card__input-row">

                                <Building2
                                    className="hero-search-card__icon"
                                    size={16}
                                />

                                <select
                                    id="search-type"
                                    value={propertyType}
                                    onChange={(e) =>
                                        setPropertyType(e.target.value)
                                    }
                                    className="hero-search-card__select"
                                >
                                    <option value="Residential">
                                        All Types
                                    </option>

                                    {propertyTypes.map((item) => (
                                        <option
                                            key={item.value}
                                            value={item.value}
                                        >
                                            {item.label}
                                        </option>
                                    ))}
                                </select>

                                <ChevronDown
                                    className="hero-search-card__chevron"
                                    size={14}
                                />

                            </div>
                        </div>

                        {/* Budget */}
                        <div className="hero-search-card__field">

                            <label
                                htmlFor="search-budget"
                                className="hero-search-card__label"
                            >
                                BUDGET
                            </label>

                            <div className="hero-search-card__input-row">

                                <IndianRupee
                                    className="hero-search-card__icon"
                                    size={15}
                                />

                                <select
                                    id="search-budget"
                                    value={budget}
                                    onChange={(e) =>
                                        setBudget(e.target.value)
                                    }
                                    className="hero-search-card__select"
                                >
                                    {budgetOptions.map((item) => (
                                        <option
                                            key={item.value}
                                            value={item.value}
                                        >
                                            {item.label}
                                        </option>
                                    ))}
                                </select>

                                <ChevronDown
                                    className="hero-search-card__chevron"
                                    size={14}
                                />

                            </div>
                        </div>

                        {/* Bedrooms and Search Button */}
                        <div className="hero-search-card__bottom-row">

                            {/* Bedrooms */}
                            <div className="hero-search-card__field hero-search-card__field--half">

                                <label
                                    htmlFor="search-bhk"
                                    className="hero-search-card__label"
                                >
                                    BEDROOMS
                                </label>

                                <div className="hero-search-card__input-row">

                                    <Bed
                                        className="hero-search-card__icon"
                                        size={16}
                                    />

                                    <select
                                        id="search-bhk"
                                        value={bhk}
                                        onChange={(e) =>
                                            setBhk(e.target.value)
                                        }
                                        className="hero-search-card__select"
                                    >
                                        <option value="Any">BHK</option>

                                        {bhkOptions
                                            .filter((b) => b.value !== "Any")
                                            .map((item) => (
                                                <option
                                                    key={item.value}
                                                    value={item.value}
                                                >
                                                    {item.label}
                                                </option>
                                            ))}
                                    </select>

                                    <ChevronDown
                                        className="hero-search-card__chevron"
                                        size={14}
                                    />

                                </div>
                            </div>

                            {/* Search Button */}
                            <button
                                type="submit"
                                className="hero-search-card__submit-btn"
                                aria-label="Search properties"
                            >
                                <Search
                                    size={18}
                                    strokeWidth={2.4}
                                />

                                <span>Search</span>
                            </button>

                        </div>
                    </form>
                )}
            </div>

            {/* =========================================
                BOTTOM TRUST STATISTICS MARQUEE
            ========================================= */}

            <div
                className="hero-oyo-trust-strip"
                aria-label="Key Trust Statistics"
            >
                <div className="hero-oyo-trust-marquee">

                    <div className="hero-oyo-trust-track">

                        {[
                            ...badgesList,
                            ...badgesList,
                            ...badgesList,
                            ...badgesList,
                        ].map((item, idx) => (
                            <div
                                key={idx}
                                className="hero-oyo-trust-item"
                            >
                                <item.icon
                                    size={17}
                                    className="hero-oyo-trust-icon"
                                />

                                <span>
                                    <strong>{item.strong}</strong>{" "}
                                    {item.text}
                                </span>

                                <span className="hero-oyo-trust-divider" />
                            </div>
                        ))}

                    </div>
                </div>
            </div>

        </section>
    );
}

export default HeroSection;