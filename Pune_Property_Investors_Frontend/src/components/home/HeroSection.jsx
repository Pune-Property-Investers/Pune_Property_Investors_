"use client";

import { useState, useEffect, useMemo, useRef } from "react";
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
    ChevronLeft,
    ChevronRight,
    Sparkles,
    CirclePercent,
    Percent,
    Calendar,
    Check,
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
    const [activeDropdown, setActiveDropdown] = useState(null); // 'location' | 'type' | 'budget' | 'bhk' | null

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (!e.target.closest(".hero-search-card__field")) {
                setActiveDropdown(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Tabs slider scroll & navigation
    const tabsTrackRef = useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    const checkTabScroll = () => {
        const el = tabsTrackRef.current;
        if (el) {
            setCanScrollLeft(el.scrollLeft > 6);
            setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 6);
        }
    };

    useEffect(() => {
        const el = tabsTrackRef.current;
        if (!el) return;
        checkTabScroll();
        el.addEventListener("scroll", checkTabScroll, { passive: true });
        window.addEventListener("resize", checkTabScroll);
        return () => {
            el.removeEventListener("scroll", checkTabScroll);
            window.removeEventListener("resize", checkTabScroll);
        };
    }, []);

    const slideTabs = (direction) => {
        const el = tabsTrackRef.current;
        if (el) {
            const scrollAmount = direction === "left" ? -190 : 190;
            el.scrollBy({ left: scrollAmount, behavior: "smooth" });
        }
    };

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

                {/* Category Tabs Slider with Controls */}
                {showCategoryTabs && (
                    <div className="hero-oyo-tabs-wrapper">
                        {canScrollLeft && (
                            <button
                                type="button"
                                className="hero-oyo-tabs-arrow hero-oyo-tabs-arrow--left"
                                onClick={() => slideTabs("left")}
                                aria-label="Slide tabs left"
                            >
                                <ChevronLeft size={16} />
                            </button>
                        )}

                        <div
                            ref={tabsTrackRef}
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

                        {canScrollRight && (
                            <button
                                type="button"
                                className="hero-oyo-tabs-arrow hero-oyo-tabs-arrow--right"
                                onClick={() => slideTabs("right")}
                                aria-label="Slide tabs right"
                            >
                                <ChevronRight size={16} />
                            </button>
                        )}
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
                        <div
                            className={`hero-search-card__field ${activeDropdown === "location" ? "is-dropdown-open" : ""}`}
                            onClick={() => setActiveDropdown((prev) => (prev === "location" ? null : "location"))}
                        >
                            <label className="hero-search-card__label">
                                LOCATION IN PUNE
                            </label>

                            <div className="hero-search-card__input-row">
                                <MapPin
                                    className="hero-search-card__icon"
                                    size={16}
                                />
                                <span className="hero-search-card__display-val">
                                    {location === "All Locations" ? "e.g. Baner, Wakad, Kharadi..." : `${location}, Pune`}
                                </span>
                                <ChevronDown
                                    className={`hero-search-card__chevron ${activeDropdown === "location" ? "is-open" : ""}`}
                                    size={14}
                                />
                            </div>

                            {activeDropdown === "location" && (
                                <div className="hero-custom-dropdown" onClick={(e) => e.stopPropagation()}>
                                    <div className="hero-custom-dropdown__list">
                                        <button
                                            type="button"
                                            className={`hero-custom-dropdown__item ${location === "All Locations" ? "is-active" : ""}`}
                                            onClick={() => {
                                                setLocation("All Locations");
                                                setActiveDropdown(null);
                                            }}
                                        >
                                            <span className="hero-custom-dropdown__text">All Locations</span>
                                        </button>
                                        {locationOptions
                                            .filter((l) => l !== "All Locations")
                                            .map((item) => (
                                                <button
                                                    key={item}
                                                    type="button"
                                                    className={`hero-custom-dropdown__item ${location === item ? "is-active" : ""}`}
                                                    onClick={() => {
                                                        setLocation(item);
                                                        setActiveDropdown(null);
                                                    }}
                                                >
                                                    <span className="hero-custom-dropdown__text">{item}, Pune</span>
                                                </button>
                                            ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Property Type */}
                        <div
                            className={`hero-search-card__field ${activeDropdown === "type" ? "is-dropdown-open" : ""}`}
                            onClick={() => setActiveDropdown((prev) => (prev === "type" ? null : "type"))}
                        >
                            <label className="hero-search-card__label">
                                PROPERTY TYPE
                            </label>

                            <div className="hero-search-card__input-row">
                                <Building2
                                    className="hero-search-card__icon"
                                    size={16}
                                />
                                <span className="hero-search-card__display-val">
                                    {propertyTypes.find((p) => p.value === propertyType)?.label || (propertyType === "Residential" ? "All Types" : propertyType)}
                                </span>
                                <ChevronDown
                                    className={`hero-search-card__chevron ${activeDropdown === "type" ? "is-open" : ""}`}
                                    size={14}
                                />
                            </div>

                            {activeDropdown === "type" && (
                                <div className="hero-custom-dropdown" onClick={(e) => e.stopPropagation()}>
                                    <div className="hero-custom-dropdown__list">
                                        <button
                                            type="button"
                                            className={`hero-custom-dropdown__item ${propertyType === "Residential" ? "is-active" : ""}`}
                                            onClick={() => {
                                                setPropertyType("Residential");
                                                setActiveDropdown(null);
                                            }}
                                        >
                                            <span className="hero-custom-dropdown__text">All Types</span>
                                        </button>
                                        {propertyTypes.map((item) => (
                                            <button
                                                key={item.value}
                                                type="button"
                                                className={`hero-custom-dropdown__item ${propertyType === item.value ? "is-active" : ""}`}
                                                onClick={() => {
                                                    setPropertyType(item.value);
                                                    setActiveDropdown(null);
                                                }}
                                            >
                                                <span className="hero-custom-dropdown__text">{item.label}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Budget */}
                        <div
                            className={`hero-search-card__field ${activeDropdown === "budget" ? "is-dropdown-open" : ""}`}
                            onClick={() => setActiveDropdown((prev) => (prev === "budget" ? null : "budget"))}
                        >
                            <label className="hero-search-card__label">
                                BUDGET
                            </label>

                            <div className="hero-search-card__input-row">
                                <IndianRupee
                                    className="hero-search-card__icon"
                                    size={15}
                                />
                                <span className="hero-search-card__display-val">
                                    {budgetOptions.find((b) => b.value === budget)?.label || budget}
                                </span>
                                <ChevronDown
                                    className={`hero-search-card__chevron ${activeDropdown === "budget" ? "is-open" : ""}`}
                                    size={14}
                                />
                            </div>

                            {activeDropdown === "budget" && (
                                <div className="hero-custom-dropdown" onClick={(e) => e.stopPropagation()}>
                                    <div className="hero-custom-dropdown__list">
                                        {budgetOptions.map((item) => (
                                            <button
                                                key={item.value}
                                                type="button"
                                                className={`hero-custom-dropdown__item ${budget === item.value ? "is-active" : ""}`}
                                                onClick={() => {
                                                    setBudget(item.value);
                                                    setActiveDropdown(null);
                                                }}
                                            >
                                                <span className="hero-custom-dropdown__text">{item.label}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Bedrooms and Search Button */}
                        <div className="hero-search-card__bottom-row">

                            {/* Bedrooms */}
                            <div
                                className={`hero-search-card__field hero-search-card__field--half ${activeDropdown === "bhk" ? "is-dropdown-open" : ""}`}
                                onClick={() => setActiveDropdown((prev) => (prev === "bhk" ? null : "bhk"))}
                            >
                                <label className="hero-search-card__label">
                                    BEDROOMS
                                </label>

                                <div className="hero-search-card__input-row">
                                    <Bed
                                        className="hero-search-card__icon"
                                        size={16}
                                    />
                                    <span className="hero-search-card__display-val">
                                        {bhk === "Any" ? "BHK" : `${bhk} BHK`}
                                    </span>
                                    <ChevronDown
                                        className={`hero-search-card__chevron ${activeDropdown === "bhk" ? "is-open" : ""}`}
                                        size={14}
                                    />
                                </div>

                                {activeDropdown === "bhk" && (
                                    <div className="hero-custom-dropdown hero-custom-dropdown--right" onClick={(e) => e.stopPropagation()}>
                                        <div className="hero-custom-dropdown__list">
                                            <button
                                                type="button"
                                                className={`hero-custom-dropdown__item ${bhk === "Any" ? "is-active" : ""}`}
                                                onClick={() => {
                                                    setBhk("Any");
                                                    setActiveDropdown(null);
                                                }}
                                            >
                                                <span className="hero-custom-dropdown__text">Any BHK</span>
                                            </button>
                                            {bhkOptions
                                                .filter((b) => b.value !== "Any")
                                                .map((item) => (
                                                    <button
                                                        key={item.value}
                                                        type="button"
                                                        className={`hero-custom-dropdown__item ${bhk === item.value ? "is-active" : ""}`}
                                                        onClick={() => {
                                                            setBhk(item.value);
                                                            setActiveDropdown(null);
                                                        }}
                                                    >
                                                        <span className="hero-custom-dropdown__text">{item.label}</span>
                                                    </button>
                                                ))}
                                        </div>
                                    </div>
                                )}
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