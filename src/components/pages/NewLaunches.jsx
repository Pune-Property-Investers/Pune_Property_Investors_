"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import Link from "next/link";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import { leadService } from "../../services/lead.service";
import {
    MapPin,
    Bed,
    Maximize2,
    Calendar,
    ArrowRight,
    ShieldCheck,
    Sparkles,
    MessageCircle,
    PhoneCall,
    CheckCircle2,
    Building2,
    X,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    Home,
    Layers,
    Gift,
    Percent,
    Car,
    FileText,
    Grid3X3,
    Play,
    Pause,
    Check,
    Scale,
    Heart,
    Camera,
    IndianRupee,
    Search,
} from "lucide-react";
import { newLaunchProjects } from "../../data/newLaunchProjectsData";
import "./NewLaunches.css";

const PUNE_LOCATIONS = [
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

const PROPERTY_TYPES_SEARCH = [
    { label: "All Residential", value: "Residential" },
    { label: "Apartment / Flat", value: "Apartment" },
    { label: "Villa / Independent House", value: "Villa" },
    { label: "Plot / Land", value: "Plot" },
    { label: "Commercial", value: "Commercial" },
];

const BHK_OPTIONS_SEARCH = [
    { label: "Any BHK", value: "Any" },
    { label: "1 BHK", value: "1" },
    { label: "2 BHK", value: "2" },
    { label: "3 BHK", value: "3" },
    { label: "4 BHK", value: "4" },
    { label: "5+ BHK", value: "5+" },
];

const BUDGET_OPTIONS_SEARCH = [
    { label: "Any Budget", value: "Any Budget", min: "", max: "" },
    { label: "Under ₹30 Lakh", value: "Under 30 Lakhs", min: "", max: "3000000" },
    { label: "₹30–50 Lakh", value: "30-50 Lakhs", min: "3000000", max: "5000000" },
    { label: "₹50–80 Lakh", value: "50-80 Lakhs", min: "5000000", max: "8000000" },
    { label: "₹80 Lakh–₹1.5 Cr", value: "80 Lakhs-1.5 Crore", min: "8000000", max: "15000000" },
    { label: "Above ₹1.5 Cr", value: "Above 1.5 Crore", min: "15000000", max: "" },
];

const SEARCH_TABS_MOBILE = [
    { key: "projects", label: "Projects", href: "/projects" },
    { key: "new-launches", label: "New Launches", href: "/new-launches" },
    { key: "residential", label: "Residential", href: "/buy?type=Residential" },
    { key: "commercial", label: "Commercial", href: "/commercial" },
    { key: "plot-land", label: "Plot / Land", href: "/plots" },
    { key: "upcoming", label: "Upcoming", href: "/buy?status=Upcoming" },
];

const HERO_SLIDES = [
    {
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2000&q=85",
        location: "Kharadi & Hadapsar",
        tag: "Waterfront & IT Corridors",
    },
    {
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85",
        location: "Baner & Balewadi",
        tag: "High-Street Sky Mansions",
    },
    {
        image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=2000&q=85",
        location: "Kalyani Nagar",
        tag: "Boutique River Residences",
    },
    {
        image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=85",
        location: "Hinjewadi & Wakad",
        tag: "Botanical Smart Condos",
    },
];

const LOCALITY_TABS = [
    { label: "All Localities", value: "all" },
    { label: "Kharadi", value: "Kharadi" },
    { label: "Baner", value: "Baner" },
    { label: "Hinjewadi", value: "Hinjewadi" },
    { label: "Wakad", value: "Wakad" },
    { label: "Hadapsar", value: "Hadapsar" },
    { label: "Kalyani Nagar", value: "Kalyani Nagar" },
];

const VIP_PRIVILEGES = [
    {
        icon: <Percent size={22} />,
        title: "Pre-Launch Price Freeze",
        desc: "Lock in developer introductory rates 10–18% lower than general public launch pricing.",
    },
    {
        icon: <ShieldCheck size={22} />,
        title: "100% MahaRERA Verified",
        desc: "Every project possesses valid MahaRERA certificates, cleared land titles, and builder escrow accounts.",
    },
    {
        icon: <Gift size={22} />,
        title: "0% Brokerage Guarantee",
        desc: "Authorized strategic channel partners. 100% free consultation, transparent paperwork, and zero fees.",
    },
    {
        icon: <Layers size={22} />,
        title: "Preferred Unit Allotment",
        desc: "First access to higher-floor penthouses, river-facing balconies, and Vastu-compliant residences.",
    },
    {
        icon: <Car size={22} />,
        title: "Complimentary VIP Cab",
        desc: "Private luxury chauffeur pickup and drop for site inspections anywhere across Pune.",
    },
];

const FAQS = [
    {
        q: "What is the Pre-Launch Price Privilege?",
        a: "Pre-launch prices are special introductory rates offered by tier-1 developers before the public marketing campaign begins. Booking during this window allows buyers to lock in prices that are typically 10–18% lower than standard launch rates.",
    },
    {
        q: "Is there any brokerage charged on new launch bookings?",
        a: "Zero brokerage. Pune Property Investors is an authorized strategic marketing partner for all featured developers. All advisory, site visits, and allocation services are 100% complimentary for buyers.",
    },
    {
        q: "Are all featured projects verified under MahaRERA?",
        a: "Yes. Every project in our new launch portfolio is verified with a valid Maharashtra RERA registration number, clear land titles, and verified developer escrow accounts.",
    },
    {
        q: "What payment plans are offered for pre-launch purchases?",
        a: "Most developers offer buyer-friendly construction-linked schemes, 10:90, 20:80, or subvention plans where you pay 10–20% on booking and the remainder upon superstructure or possession.",
    },
    {
        q: "Can I get a complimentary cab for site visits?",
        a: "Yes, we provide free private chauffeur-driven luxury cabs for site inspections anywhere across Pune, including Hinjewadi, Kharadi, Baner, Wakad, and Hadapsar.",
    },
];

export default function NewLaunches() {
    const [selectedProject, setSelectedProject] = useState(null);
    const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
    const [enquiryForm, setEnquiryForm] = useState({ name: "", phone: "", message: "", bhk: "2 BHK" });
    const [enquirySuccess, setEnquirySuccess] = useState(false);
    const [openFaq, setOpenFaq] = useState(null);
    const [isMarqueePaused, setIsMarqueePaused] = useState(false);
    const [currentHeroSlide, setCurrentHeroSlide] = useState(0);
    const [selectedLocality, setSelectedLocality] = useState("all");
    const [viewMode, setViewMode] = useState("scroller"); // "scroller" | "grid"
    const [mobileViewMode, setMobileViewMode] = useState("carousel"); // "carousel" | "list"
    const [spotlightImgIdx, setSpotlightImgIdx] = useState(0);
    const [isSpotlightFav, setIsSpotlightFav] = useState(false);
    const [isSpotlightCompared, setIsSpotlightCompared] = useState(false);

    // Mobile Slider
    const mobileSliderRef = useRef(null);
    const [activeMobileIdx, setActiveMobileIdx] = useState(0);

    // Mobile search card state (matching Home Screen and Buy Properties head section)
    const [mobileLocation, setMobileLocation] = useState("All Locations");
    const [mobileType, setMobileType] = useState("Residential");
    const [mobileBhk, setMobileBhk] = useState("Any");
    const [mobileBudget, setMobileBudget] = useState("Any Budget");

    const handleMobileHeroSearch = (e) => {
        e.preventDefault();
        if (mobileLocation !== "All Locations") {
            setSelectedLocality(mobileLocation);
        }
        const target = document.querySelector(".nl-stage-section");
        if (target) {
            target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    // Auto-advance Hero Banner Slideshow
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentHeroSlide((prev) => (prev + 1) % HERO_SLIDES.length);
        }, 5500);
        return () => clearInterval(interval);
    }, []);

    // Reset spotlight image index on locality filter change
    useEffect(() => {
        setSpotlightImgIdx(0);
    }, [selectedLocality]);

    // Filter projects by locality
    const filteredProjects = useMemo(() => {
        if (selectedLocality === "all") return newLaunchProjects;
        return newLaunchProjects.filter(
            (p) =>
                p.areaLocality?.toLowerCase() === selectedLocality.toLowerCase() ||
                p.location?.toLowerCase().includes(selectedLocality.toLowerCase())
        );
    }, [selectedLocality]);

    // Active Spotlight Project for Featured Premiere Card (Image 1 replica)
    const activeSpotlight = filteredProjects[0];
    const spotlightImages = useMemo(() => {
        if (!activeSpotlight) return [];
        if (activeSpotlight.gallery && activeSpotlight.gallery.length > 0) {
            return activeSpotlight.gallery;
        }
        return activeSpotlight.image ? [activeSpotlight.image] : [];
    }, [activeSpotlight]);

    const currentSpotlightImg = spotlightImages.length > 0
        ? spotlightImages[spotlightImgIdx % spotlightImages.length]
        : activeSpotlight?.image;

    // Split projects for desktop vertical dual marquee
    const col1 = filteredProjects.slice(0, Math.ceil(filteredProjects.length / 2));
    const col2 = filteredProjects.slice(Math.ceil(filteredProjects.length / 2));
    const col1Duplicated = [...col1, ...col1];
    const col2Duplicated = [...col2, ...col2];

    const openEnquiry = (project, e) => {
        e?.stopPropagation();
        setSelectedProject(project);
        setEnquirySuccess(false);
        setEnquiryForm({
            name: "",
            phone: "",
            bhk: project.configuration ? project.configuration.split("&")[0].trim() : "2 BHK",
            message: `Hi Pune Property Investors, please share pre-launch offers & brochure for ${project.name} in ${project.location}.`,
        });
        setEnquiryModalOpen(true);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            await leadService.create({
                type: "property",
                name: enquiryForm.name,
                phone: enquiryForm.phone,
                propertyTitle: selectedProject?.name || "Exclusive Pune Launch",
                locality: selectedProject?.location || "Pune",
                budget: enquiryForm.bhk,
                message:
                    enquiryForm.message ||
                    "New Launch VIP Pre-Launch Allotment enquiry.",
            });
        } catch {
            // Continue to WhatsApp handoff even if lead logging fails
        }
        const msg = [
            `*New Launch VIP Pre-Launch Allotment*`,
            `*Project:* ${selectedProject?.name || "Exclusive Pune Launch"}`,
            `*Location:* ${selectedProject?.location || "Pune"}`,
            `*Config Desired:* ${enquiryForm.bhk}`,
            `*Client Name:* ${enquiryForm.name}`,
            `*Phone:* ${enquiryForm.phone}`,
            `*Message:* ${enquiryForm.message}`,
        ].join("\n");

        const whatsappUrl = `https://wa.me/917398174444?text=${encodeURIComponent(msg)}`;
        window.open(whatsappUrl, "_blank", "noopener,noreferrer");
        setEnquirySuccess(true);
        setTimeout(() => setEnquiryModalOpen(false), 2000);
    };

    const toggleFaq = (idx) => {
        setOpenFaq(openFaq === idx ? null : idx);
    };

    // Mobile Horizontal Slider Scroll Handler
    const handleMobileScroll = () => {
        if (!mobileSliderRef.current) return;
        const slider = mobileSliderRef.current;
        const cardWidth = slider.querySelector(".nl-mobile-card")?.offsetWidth || 300;
        const index = Math.round(slider.scrollLeft / (cardWidth + 16));
        setActiveMobileIdx(Math.min(Math.max(index, 0), filteredProjects.length - 1));
    };

    const scrollMobile = (dir) => {
        if (!mobileSliderRef.current) return;
        const slider = mobileSliderRef.current;
        const cardWidth = slider.querySelector(".nl-mobile-card")?.offsetWidth || 300;
        const scrollAmount = dir === "next" ? cardWidth + 16 : -(cardWidth + 16);
        slider.scrollBy({ left: scrollAmount, behavior: "smooth" });
    };

    return (
        <div className="new-launch-page">
            <Header />

            {/* ==============================================================
                1. LUXURY HERO BANNER (Identical Style to Buy Properties)
               ============================================================== */}
            <section className="nl-hero" aria-label="New Launches Hero">
                {/* Photo Slideshow Container with Vertical Wipe Transition */}
                <div className="nl-hero__slides" aria-hidden="true">
                    {HERO_SLIDES.map((slide, idx) => (
                        <div
                            key={idx}
                            className={`nl-hero__slide ${idx === currentHeroSlide ? "is-active" : ""}`}
                            style={{ backgroundImage: `url(${slide.image})` }}
                        />
                    ))}
                </div>

                {/* High-Visibility Gradient Overlay with Open Middle 65% + Spotlight */}
                <div className="nl-hero__overlay" aria-hidden="true" />

                <div className="nl-hero__container">
                    {/* Eyebrow Badge (Matching Buy Properties Style) */}
                    <div className="nl-hero__eyebrow">
                        <Sparkles size={14} />
                        <span>CURATED PUNE NEW LAUNCHES</span>
                    </div>

                    {/* Headline */}
                    <h1 className="nl-hero__title">
                        Exclusive New Launches
                        <span> in Pune.</span>
                    </h1>

                    {/* Subtitle */}
                    <p className="nl-hero__subtitle">
                        Discover newly announced residential towers, botanical townships, and luxury sky condos
                        across Pune&apos;s prime corridors. Verified MahaRERA projects with direct early bird allotments.
                    </p>

                    {/* Mobile Screen Search Bar: Same as Home Screen (Visible on mobile <= 900px) */}
                    <div className="nl-hero-mobile-search">
                        {/* Category Tabs */}
                        <div
                            className="hero-oyo-tabs"
                            role="tablist"
                            aria-label="Project categories"
                        >
                            {SEARCH_TABS_MOBILE.map((tab) => (
                                <Link
                                    key={tab.key}
                                    href={tab.href}
                                    role="tab"
                                    className={`hero-oyo-tab ${tab.key === "new-launches" ? "hero-oyo-tab--active" : ""}`}
                                >
                                    {tab.label}
                                </Link>
                            ))}
                        </div>

                        {/* Search Card - Matching Home Screen */}
                        <form
                            className="hero-search-card"
                            onSubmit={handleMobileHeroSearch}
                        >
                            {/* Location */}
                            <div className="hero-search-card__field">
                                <label
                                    htmlFor="nl-search-location"
                                    className="hero-search-card__label"
                                >
                                    LOCATION IN PUNE
                                </label>
                                <div className="hero-search-card__input-row">
                                    <MapPin className="hero-search-card__icon" size={16} />
                                    <select
                                        id="nl-search-location"
                                        value={mobileLocation}
                                        onChange={(e) => setMobileLocation(e.target.value)}
                                        className="hero-search-card__select"
                                    >
                                        <option value="All Locations">
                                            e.g. Baner, Wakad, Kharadi...
                                        </option>
                                        {PUNE_LOCATIONS.filter((l) => l !== "All Locations").map((item) => (
                                            <option key={item} value={item}>
                                                {item}, Pune
                                            </option>
                                        ))}
                                    </select>
                                    <ChevronDown className="hero-search-card__chevron" size={14} />
                                </div>
                            </div>

                            {/* Property Type */}
                            <div className="hero-search-card__field">
                                <label
                                    htmlFor="nl-search-type"
                                    className="hero-search-card__label"
                                >
                                    PROPERTY TYPE
                                </label>
                                <div className="hero-search-card__input-row">
                                    <Building2 className="hero-search-card__icon" size={16} />
                                    <select
                                        id="nl-search-type"
                                        value={mobileType}
                                        onChange={(e) => setMobileType(e.target.value)}
                                        className="hero-search-card__select"
                                    >
                                        <option value="Residential">All Types</option>
                                        {PROPERTY_TYPES_SEARCH.map((item) => (
                                            <option key={item.value} value={item.value}>
                                                {item.label}
                                            </option>
                                        ))}
                                    </select>
                                    <ChevronDown className="hero-search-card__chevron" size={14} />
                                </div>
                            </div>

                            {/* Budget */}
                            <div className="hero-search-card__field">
                                <label
                                    htmlFor="nl-search-budget"
                                    className="hero-search-card__label"
                                >
                                    BUDGET
                                </label>
                                <div className="hero-search-card__input-row">
                                    <IndianRupee className="hero-search-card__icon" size={15} />
                                    <select
                                        id="nl-search-budget"
                                        value={mobileBudget}
                                        onChange={(e) => setMobileBudget(e.target.value)}
                                        className="hero-search-card__select"
                                    >
                                        {BUDGET_OPTIONS_SEARCH.map((item) => (
                                            <option key={item.value} value={item.value}>
                                                {item.label}
                                            </option>
                                        ))}
                                    </select>
                                    <ChevronDown className="hero-search-card__chevron" size={14} />
                                </div>
                            </div>

                            {/* Bedrooms and Search Button */}
                            <div className="hero-search-card__bottom-row">
                                <div className="hero-search-card__field hero-search-card__field--half">
                                    <label
                                        htmlFor="nl-search-bhk"
                                        className="hero-search-card__label"
                                    >
                                        BEDROOMS
                                    </label>
                                    <div className="hero-search-card__input-row">
                                        <Bed className="hero-search-card__icon" size={16} />
                                        <select
                                            id="nl-search-bhk"
                                            value={mobileBhk}
                                            onChange={(e) => setMobileBhk(e.target.value)}
                                            className="hero-search-card__select"
                                        >
                                            <option value="Any">BHK</option>
                                            {BHK_OPTIONS_SEARCH.filter((b) => b.value !== "Any").map((item) => (
                                                <option key={item.value} value={item.value}>
                                                    {item.label}
                                                </option>
                                            ))}
                                        </select>
                                        <ChevronDown className="hero-search-card__chevron" size={14} />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="hero-search-card__submit-btn"
                                    aria-label="Search new launches"
                                >
                                    <Search size={18} strokeWidth={2.4} />
                                    <span>Search</span>
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Hero Footer: Breadcrumbs on Left, Location Pill & Dots on Right */}
                    <div className="nl-hero__footer">
                        <nav className="nl-hero__breadcrumb" aria-label="Breadcrumbs">
                            <Link href="/" className="nl-hero__breadcrumb-home">
                                <Home size={13} />
                                <span>Home</span>
                            </Link>
                            <ChevronRight size={13} className="nl-hero__breadcrumb-sep" />
                            <span>New Launches</span>
                        </nav>

                        <div className="nl-hero__slide-controls">
                            <div className="nl-hero__location-pill">
                                <MapPin size={13} />
                                <span>{HERO_SLIDES[currentHeroSlide].location}</span>
                                <span className="nl-hero__pill-dot">•</span>
                                <span className="nl-hero__pill-tag">
                                    {HERO_SLIDES[currentHeroSlide].tag}
                                </span>
                            </div>

                            <div className="nl-hero__dots" role="tablist" aria-label="Hero Slides">
                                {HERO_SLIDES.map((_, idx) => (
                                    <button
                                        key={idx}
                                        type="button"
                                        className={`nl-hero__dot ${idx === currentHeroSlide ? "is-active" : ""}`}
                                        onClick={() => setCurrentHeroSlide(idx)}
                                        aria-label={`View slide ${idx + 1}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ==============================================================
                2. LOCALITY FILTER & VIEW SELECTOR BAR
               ============================================================== */}
            <div className="nl-filter-bar-section">
                <div className="nl-filter-bar-container">
                    <div className="nl-locality-tabs">
                        {LOCALITY_TABS.map((tab) => (
                            <button
                                key={tab.value}
                                type="button"
                                className={`nl-locality-tab ${selectedLocality === tab.value ? "is-active" : ""}`}
                                onClick={() => setSelectedLocality(tab.value)}
                            >
                                <span>{tab.label}</span>
                                {tab.value === "all" ? (
                                    <span className="nl-tab-count">{newLaunchProjects.length}</span>
                                ) : (
                                    <span className="nl-tab-count">
                                        {
                                            newLaunchProjects.filter(
                                                (p) =>
                                                    p.areaLocality?.toLowerCase() === tab.value.toLowerCase() ||
                                                    p.location?.toLowerCase().includes(tab.value.toLowerCase())
                                            ).length
                                        }
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Desktop View Switcher (Live Scroller vs Grid) */}
                    <div className="nl-view-switcher">
                        <button
                            type="button"
                            className={`nl-view-btn ${viewMode === "scroller" ? "is-active" : ""}`}
                            onClick={() => setViewMode("scroller")}
                            title="Interactive Live Motion Scroller"
                        >
                            <Play size={14} />
                            <span>Motion Scroller</span>
                        </button>
                        <button
                            type="button"
                            className={`nl-view-btn ${viewMode === "grid" ? "is-active" : ""}`}
                            onClick={() => setViewMode("grid")}
                            title="Comprehensive Grid View"
                        >
                            <Grid3X3 size={14} />
                            <span>Grid View</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* ==============================================================
                3. MAIN SHOWCASE: SPLIT LAYOUT (DESKTOP) & TOUCH CAROUSEL (MOBILE)
               ============================================================== */}
            <main className="nl-stage-section">
                <div className="nl-stage-container">
                    {/* LEFT COLUMN: STICKY HERO & SPOTLIGHT (Desktop) */}
                    <div className="nl-left-sticky">
                        <div className="nl-sticky-content">
                            <span className="nl-kicker">
                                <Sparkles size={13} /> PUNE REAL ESTATE PREMIERES
                            </span>

                            <h2 className="nl-sticky-title">
                                Why buyers love our <em>New Launches</em>
                            </h2>

                            <p className="nl-sticky-desc">
                                A curated portfolio backed by 10+ years of Pune real estate expertise.
                                Direct developer inventory, verified MahaRERA titles, and zero brokerage.
                            </p>

                            {/* Trust Badges */}
                            <div className="nl-trust-badges">
                                <span><ShieldCheck size={13} /> 100% RERA Verified</span>
                                <span><CheckCircle2 size={13} /> 0% Brokerage</span>
                                <span><Building2 size={13} /> Tier-1 Developers</span>
                            </div>

                            {/* Featured Highlight Visual Card (Image 1 replica for both Mobile & Laptop) */}
                            {activeSpotlight && (
                                <div className="nl-featured-spotlight-wrapper">
                                    <div
                                        className="nl-featured-spotlight"
                                        onClick={() => openEnquiry(activeSpotlight)}
                                        role="button"
                                        tabIndex={0}
                                        aria-label={`View featured premiere ${activeSpotlight.name}`}
                                    >
                                        {/* Full-Bleed Background Image */}
                                        <div className="nl-spotlight-bg-wrap">
                                            <img
                                                key={currentSpotlightImg}
                                                src={currentSpotlightImg}
                                                alt={activeSpotlight.name}
                                                className="nl-spotlight-full-img"
                                            />
                                            <div className="nl-spotlight-scrim" />
                                        </div>

                                        {/* Top Bar: Badges on left, glass action buttons on right */}
                                        <div className="nl-spotlight-topbar">
                                            <div className="nl-spotlight-top-badges">
                                                <span className="nl-spotlight-gold-badge">
                                                    <Sparkles size={11} /> FEATURED
                                                </span>
                                                <span className="nl-spotlight-pill-badge">
                                                    {activeSpotlight.propertyType || (activeSpotlight.type ? activeSpotlight.type.replace(" Residences", "").replace(" Apartments", "").replace(" Condos", "") : "Commercial")}
                                                </span>
                                                <span className="nl-spotlight-count-badge">
                                                    <Camera size={12} /> {spotlightImages.length > 0 ? `${(spotlightImgIdx % spotlightImages.length) + 1}/${spotlightImages.length}` : "1/1"}
                                                </span>
                                            </div>

                                            <div className="nl-spotlight-top-actions">
                                                <button
                                                    type="button"
                                                    className={`nl-spotlight-glass-circle ${isSpotlightCompared ? "is-active" : ""}`}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setIsSpotlightCompared((prev) => !prev);
                                                    }}
                                                    aria-label="Compare property"
                                                    title={isSpotlightCompared ? "In Comparison" : "Compare"}
                                                >
                                                    <Scale size={14} />
                                                </button>
                                                <button
                                                    type="button"
                                                    className={`nl-spotlight-glass-circle ${isSpotlightFav ? "is-fav" : ""}`}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setIsSpotlightFav((prev) => !prev);
                                                    }}
                                                    aria-label="Save to favorites"
                                                    title={isSpotlightFav ? "Saved" : "Save to Wishlist"}
                                                >
                                                    <Heart
                                                        size={14}
                                                        fill={isSpotlightFav ? "#e11d48" : "none"}
                                                        color={isSpotlightFav ? "#e11d48" : "#ffffff"}
                                                    />
                                                </button>
                                            </div>
                                        </div>

                                        {/* Middle Gallery Arrows (< and >) */}
                                        {spotlightImages.length > 1 && (
                                            <>
                                                <button
                                                    type="button"
                                                    className="nl-spotlight-nav-btn nl-spotlight-nav-btn--prev"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setSpotlightImgIdx(
                                                            (prev) => (prev - 1 + spotlightImages.length) % spotlightImages.length
                                                        );
                                                    }}
                                                    aria-label="Previous photo"
                                                >
                                                    <ChevronLeft size={18} />
                                                </button>
                                                <button
                                                    type="button"
                                                    className="nl-spotlight-nav-btn nl-spotlight-nav-btn--next"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setSpotlightImgIdx((prev) => (prev + 1) % spotlightImages.length);
                                                    }}
                                                    aria-label="Next photo"
                                                >
                                                    <ChevronRight size={18} />
                                                </button>
                                            </>
                                        )}

                                        {/* Bottom Content Area */}
                                        <div className="nl-spotlight-bottom-content">
                                            {/* Price & Yield Tag */}
                                            <div className="nl-spotlight-bottom-price-row">
                                                <div className="nl-spotlight-price-group">
                                                    <span className="nl-spotlight-main-price">{activeSpotlight.price}</span>
                                                    <span className="nl-spotlight-sub-rate">
                                                        {activeSpotlight.emi ? activeSpotlight.emi.replace("EMI from ", "EMI: ") : "₹22,500/sq.ft"}
                                                    </span>
                                                </div>
                                                <span className="nl-spotlight-yield-badge">
                                                    {activeSpotlight.badge ? activeSpotlight.badge.toUpperCase() : "7.8% YIELD"}
                                                </span>
                                            </div>

                                            {/* Project Title */}
                                            <h3 className="nl-spotlight-headline">{activeSpotlight.name}</h3>

                                            {/* Subtitle / Tagline */}
                                            <p className="nl-spotlight-tagline">
                                                {activeSpotlight.developer} • {activeSpotlight.offer || activeSpotlight.description}
                                            </p>

                                            {/* Specs & View Details CTA (Always single row) */}
                                            <div className="nl-spotlight-meta-row">
                                                <div className="nl-spotlight-specs-inline">
                                                    <span className="nl-spotlight-spec-item">
                                                        <Maximize2 size={13} /> {activeSpotlight.area}
                                                    </span>
                                                    <span className="nl-spotlight-spec-divider">•</span>
                                                    <span className="nl-spotlight-spec-item">
                                                        <MapPin size={13} /> {activeSpotlight.location}
                                                    </span>
                                                </div>

                                                <button
                                                    type="button"
                                                    className="nl-spotlight-cta-pill"
                                                    onClick={(e) => openEnquiry(activeSpotlight, e)}
                                                >
                                                    <span>View Details</span>
                                                    <ArrowRight size={13} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* External Carousel Dots below card (matches 2nd image exactly) */}
                                    {spotlightImages.length > 1 && (
                                        <div className="nl-spotlight-external-dots" role="tablist" aria-label="Photo carousel dots">
                                            {spotlightImages.map((_, dotIdx) => (
                                                <button
                                                    key={dotIdx}
                                                    type="button"
                                                    className={`nl-spotlight-ext-dot ${
                                                        dotIdx === (spotlightImgIdx % spotlightImages.length)
                                                            ? "is-active"
                                                            : ""
                                                    }`}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setSpotlightImgIdx(dotIdx);
                                                    }}
                                                    aria-label={`Go to slide ${dotIdx + 1}`}
                                                />
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Direct Actions (Desktop) */}
                            <div className="nl-sticky-actions">
                                <a
                                    href="https://wa.me/917398174444?text=Hello%20Pune%20Property%20Investors%2C%20please%20share%20all%20new%20launch%20options."
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="nl-wa-cta"
                                >
                                    <MessageCircle size={16} />
                                    <span>WhatsApp VIP Concierge</span>
                                </a>
                                <a href="tel:+917398174444" className="nl-call-cta">
                                    <PhoneCall size={15} />
                                    <span>+91 73981 74444</span>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* MOBILE-ONLY: TOUCH CAROUSEL & EXPANDABLE LIST */}
                    <div className="nl-mobile-showcase-wrapper">
                        <div className="nl-mobile-showcase-header">
                            <div>
                                <span className="nl-mobile-subkicker">
                                    SHOWING {filteredProjects.length} PREMIERES
                                </span>
                                <h3 className="nl-mobile-heading">Upcoming & Active Launches</h3>
                            </div>
                            <div className="nl-mobile-toggles">
                                <div className="nl-mobile-mode-switch">
                                    <button
                                        type="button"
                                        className={`nl-mobile-mode-btn ${mobileViewMode === "carousel" ? "is-active" : ""}`}
                                        onClick={() => setMobileViewMode("carousel")}
                                    >
                                        Swipe
                                    </button>
                                    <button
                                        type="button"
                                        className={`nl-mobile-mode-btn ${mobileViewMode === "list" ? "is-active" : ""}`}
                                        onClick={() => setMobileViewMode("list")}
                                    >
                                        List
                                    </button>
                                </div>
                                {mobileViewMode === "carousel" && (
                                    <div className="nl-mobile-nav-btns">
                                        <button
                                            type="button"
                                            className="nl-mobile-nav-btn"
                                            onClick={() => scrollMobile("prev")}
                                            aria-label="Previous Project"
                                        >
                                            <ChevronLeft size={18} />
                                        </button>
                                        <button
                                            type="button"
                                            className="nl-mobile-nav-btn"
                                            onClick={() => scrollMobile("next")}
                                            aria-label="Next Project"
                                        >
                                            <ChevronRight size={18} />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Swipeable Snap Track or Vertical List */}
                        <div
                            className={`nl-mobile-slider-track ${mobileViewMode === "list" ? "nl-mobile-slider-track--list" : ""}`}
                            ref={mobileSliderRef}
                            onScroll={handleMobileScroll}
                        >
                            {filteredProjects.map((project) => (
                                <article
                                    key={`mobile-${project.id}`}
                                    className="nl-mobile-card"
                                    onClick={() => openEnquiry(project)}
                                >
                                    {/* Image with Badges */}
                                    <div className="nl-mobile-card__media">
                                        <img
                                            src={project.image}
                                            alt={project.name}
                                            className="nl-mobile-card__img"
                                            loading="lazy"
                                        />
                                        <div className="nl-mobile-card__overlay" />
                                        <span className="nl-mobile-card__dev-pill">
                                            <Building2 size={11} /> {project.developer}
                                        </span>
                                        <span className="nl-mobile-card__rera-pill">
                                            <ShieldCheck size={11} /> RERA: {project.rera}
                                        </span>
                                        <span className="nl-mobile-card__status-pill">
                                            {project.status}
                                        </span>
                                    </div>

                                    {/* Body */}
                                    <div className="nl-mobile-card__body">
                                        <div className="nl-mobile-card__header">
                                            <h4 className="nl-mobile-card__title">{project.name}</h4>
                                            <p className="nl-mobile-card__loc">
                                                <MapPin size={12} /> {project.location}
                                            </p>
                                        </div>

                                        {/* Specs Row */}
                                        <div className="nl-mobile-card__specs">
                                            <span><Bed size={12} /> {project.configuration}</span>
                                            <span><Maximize2 size={11} /> {project.area}</span>
                                            <span><Calendar size={11} /> {project.possession}</span>
                                        </div>

                                        {/* Special Offer Pill */}
                                        {project.offer && (
                                            <div className="nl-mobile-card__offer">
                                                <span>⚡ {project.offer}</span>
                                            </div>
                                        )}

                                        {/* Highlights */}
                                        <div className="nl-mobile-card__highlights">
                                            {project.highlights?.slice(0, 3).map((h, i) => (
                                                <span key={i}>• {h}</span>
                                            ))}
                                        </div>

                                        {/* Footer */}
                                        <div className="nl-mobile-card__footer">
                                            <div className="nl-mobile-card__price-box">
                                                <span className="nl-mobile-card__price-label">Pre-Launch Price</span>
                                                <strong className="nl-mobile-card__price">{project.price}</strong>
                                                <small className="nl-mobile-card__emi">{project.emi}</small>
                                            </div>
                                            <button
                                                type="button"
                                                className="nl-mobile-card__action-btn"
                                                onClick={(e) => openEnquiry(project, e)}
                                            >
                                                <span>Enquire</span>
                                                <ArrowRight size={13} />
                                            </button>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>

                        {/* Mobile Pagination Counter & Dots (Carousel mode only) */}
                        {mobileViewMode === "carousel" && (
                            <div className="nl-mobile-pagination">
                                <span className="nl-mobile-counter">
                                    <strong>{String(activeMobileIdx + 1).padStart(2, "0")}</strong> /{" "}
                                    {String(filteredProjects.length).padStart(2, "0")}
                                </span>
                                <div className="nl-mobile-dots">
                                    {filteredProjects.map((_, dotIdx) => (
                                        <span
                                            key={dotIdx}
                                            className={`nl-mobile-dot ${
                                                activeMobileIdx === dotIdx ? "nl-mobile-dot--active" : ""
                                            }`}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* ==============================================================
                        DESKTOP SHOWCASE (Scroller vs Grid)
                       ============================================================== */}
                    {viewMode === "scroller" ? (
                        /* DUAL VERTICAL MARQUEE (Up & Down Counter-Scroll with Full Details) */
                        <div
                            className={`nl-right-marquee-wrapper ${
                                isMarqueePaused ? "nl-right-marquee-wrapper--paused" : ""
                            }`}
                            onMouseEnter={() => setIsMarqueePaused(true)}
                            onMouseLeave={() => setIsMarqueePaused(false)}
                        >
                            {/* Column 1: Smooth Vertical Scroll UP */}
                            <div className="nl-marquee-col nl-marquee-col--up">
                                <div className="nl-marquee-track nl-marquee-track--up">
                                    {col1Duplicated.map((project, idx) => (
                                        <article
                                            key={`col1-${project.id}-${idx}`}
                                            className="nl-project-card"
                                            onClick={() => openEnquiry(project)}
                                        >
                                            {/* Photo banner */}
                                            <div className="nl-card-photo-wrap">
                                                <img
                                                    src={project.image}
                                                    alt={project.name}
                                                    className="nl-card-photo"
                                                    loading="lazy"
                                                />
                                                <div className="nl-card-photo-overlay" />
                                                <span className="nl-card-status-badge">
                                                    {project.status}
                                                </span>
                                                <span className="nl-card-rera-badge">
                                                    <ShieldCheck size={11} /> {project.rera}
                                                </span>
                                            </div>

                                            <div className="nl-card-content">
                                                <div className="nl-card-header">
                                                    <div className="nl-developer-badge">
                                                        <Building2 size={13} />
                                                        <span>{project.developer}</span>
                                                    </div>
                                                </div>

                                                <div className="nl-card-details">
                                                    <h4 className="nl-card-title">{project.name}</h4>
                                                    <span className="nl-card-loc">
                                                        <MapPin size={12} /> {project.location}
                                                    </span>
                                                </div>

                                                {/* Specs */}
                                                <div className="nl-card-specs-row">
                                                    <span><Bed size={13} /> {project.configuration}</span>
                                                    <span><Maximize2 size={12} /> {project.area}</span>
                                                    <span><Calendar size={12} /> {project.possession}</span>
                                                </div>

                                                {/* Pre-launch Offer Banner */}
                                                {project.offer && (
                                                    <div className="nl-card-offer">
                                                        <span>⚡ {project.offer}</span>
                                                    </div>
                                                )}

                                                {/* Curated Highlights */}
                                                <div className="nl-card-highlights">
                                                    {project.highlights?.slice(0, 3).map((h, i) => (
                                                        <span key={i} className="nl-card-tag">{h}</span>
                                                    ))}
                                                </div>

                                                <div className="nl-card-footer">
                                                    <div className="nl-card-price-block">
                                                        <span className="nl-card-price">{project.price}</span>
                                                        <span className="nl-card-emi">{project.emi}</span>
                                                    </div>
                                                    <button
                                                        type="button"
                                                        className="nl-card-action-btn"
                                                        onClick={(e) => openEnquiry(project, e)}
                                                    >
                                                        <span>Pre-Launch Price</span>
                                                        <ArrowRight size={13} />
                                                    </button>
                                                </div>
                                            </div>
                                        </article>
                                    ))}
                                </div>
                            </div>

                            {/* Column 2: Smooth Vertical Scroll DOWN */}
                            <div className="nl-marquee-col nl-marquee-col--down">
                                <div className="nl-marquee-track nl-marquee-track--down">
                                    {col2Duplicated.map((project, idx) => (
                                        <article
                                            key={`col2-${project.id}-${idx}`}
                                            className="nl-project-card"
                                            onClick={() => openEnquiry(project)}
                                        >
                                            {/* Photo banner */}
                                            <div className="nl-card-photo-wrap">
                                                <img
                                                    src={project.image}
                                                    alt={project.name}
                                                    className="nl-card-photo"
                                                    loading="lazy"
                                                />
                                                <div className="nl-card-photo-overlay" />
                                                <span className="nl-card-status-badge">
                                                    {project.status}
                                                </span>
                                                <span className="nl-card-rera-badge">
                                                    <ShieldCheck size={11} /> {project.rera}
                                                </span>
                                            </div>

                                            <div className="nl-card-content">
                                                <div className="nl-card-header">
                                                    <div className="nl-developer-badge">
                                                        <Building2 size={13} />
                                                        <span>{project.developer}</span>
                                                    </div>
                                                </div>

                                                <div className="nl-card-details">
                                                    <h4 className="nl-card-title">{project.name}</h4>
                                                    <span className="nl-card-loc">
                                                        <MapPin size={12} /> {project.location}
                                                    </span>
                                                </div>

                                                {/* Specs */}
                                                <div className="nl-card-specs-row">
                                                    <span><Bed size={13} /> {project.configuration}</span>
                                                    <span><Maximize2 size={12} /> {project.area}</span>
                                                    <span><Calendar size={12} /> {project.possession}</span>
                                                </div>

                                                {/* Pre-launch Offer Banner */}
                                                {project.offer && (
                                                    <div className="nl-card-offer">
                                                        <span>⚡ {project.offer}</span>
                                                    </div>
                                                )}

                                                {/* Curated Highlights */}
                                                <div className="nl-card-highlights">
                                                    {project.highlights?.slice(0, 3).map((h, i) => (
                                                        <span key={i} className="nl-card-tag">{h}</span>
                                                    ))}
                                                </div>

                                                <div className="nl-card-footer">
                                                    <div className="nl-card-price-block">
                                                        <span className="nl-card-price">{project.price}</span>
                                                        <span className="nl-card-emi">{project.emi}</span>
                                                    </div>
                                                    <button
                                                        type="button"
                                                        className="nl-card-action-btn"
                                                        onClick={(e) => openEnquiry(project, e)}
                                                    >
                                                        <span>Pre-Launch Price</span>
                                                        <ArrowRight size={13} />
                                                    </button>
                                                </div>
                                            </div>
                                        </article>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ) : (
                        /* CURATED GRID VIEW (2 Columns on Laptop/Desktop) */
                        <div className="nl-desktop-grid-wrapper">
                            <div className="nl-desktop-grid">
                                {filteredProjects.map((project) => (
                                    <article
                                        key={`grid-${project.id}`}
                                        className="nl-grid-card"
                                        onClick={() => openEnquiry(project)}
                                    >
                                        <div className="nl-grid-card__media">
                                            <img
                                                src={project.image}
                                                alt={project.name}
                                                className="nl-grid-card__img"
                                                loading="lazy"
                                            />
                                            <div className="nl-grid-card__overlay" />
                                            <span className="nl-grid-card__dev-badge">
                                                <Building2 size={12} /> {project.developer}
                                            </span>
                                            <span className="nl-grid-card__rera-badge">
                                                <ShieldCheck size={12} /> RERA: {project.rera}
                                            </span>
                                        </div>

                                        <div className="nl-grid-card__body">
                                            <div className="nl-grid-card__heading">
                                                <div>
                                                    <span className="nl-grid-card__type">{project.type}</span>
                                                    <h3 className="nl-grid-card__title">{project.name}</h3>
                                                    <p className="nl-grid-card__loc">
                                                        <MapPin size={13} /> {project.location}
                                                    </p>
                                                </div>
                                                <div className="nl-grid-card__price-box">
                                                    <strong>{project.price}</strong>
                                                    <small>{project.emi}</small>
                                                </div>
                                            </div>

                                            <div className="nl-grid-card__specs">
                                                <span><Bed size={13} /> {project.configuration}</span>
                                                <span><Maximize2 size={12} /> {project.area}</span>
                                                <span><Calendar size={12} /> {project.possession}</span>
                                                <span><Layers size={12} /> {project.towers}</span>
                                            </div>

                                            {project.offer && (
                                                <div className="nl-grid-card__offer">
                                                    <span>⚡ {project.offer}</span>
                                                </div>
                                            )}

                                            <p className="nl-grid-card__desc">
                                                {project.description}
                                            </p>

                                            <div className="nl-grid-card__tags">
                                                {project.highlights?.map((h, i) => (
                                                    <span key={i} className="nl-grid-tag">
                                                        <Check size={12} /> {h}
                                                    </span>
                                                ))}
                                            </div>

                                            <div className="nl-grid-card__footer">
                                                <button
                                                    type="button"
                                                    className="nl-grid-card__primary-btn"
                                                    onClick={(e) => openEnquiry(project, e)}
                                                >
                                                    <span>Get Pre-Launch Price & Floor Plan</span>
                                                    <ArrowRight size={14} />
                                                </button>
                                                <a
                                                    href={`https://wa.me/917398174444?text=Hi%2C%20please%20share%20details%20for%20${encodeURIComponent(project.name)}.`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="nl-grid-card__wa-btn"
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    <MessageCircle size={15} />
                                                    <span>WhatsApp</span>
                                                </a>
                                            </div>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* ==============================================================
                    4. VIP BUYER PRIVILEGES SECTION
                   ============================================================== */}
                <section className="nl-privileges-section">
                    <div className="nl-privileges-container">
                        <div className="nl-privileges-header">
                            <span className="nl-section-kicker">
                                <Sparkles size={13} /> DIRECT DEVELOPER ADVANTAGE
                            </span>
                            <h2>Why Book Pre-Launch Through Pune Property Investors?</h2>
                            <p>
                                We represent buyers with direct developer relationships, ensuring first-mover advantage,
                                zero brokerage, and guaranteed lowest introductory allotment rates.
                            </p>
                        </div>

                        <div className="nl-privileges-grid">
                            {VIP_PRIVILEGES.map((item, idx) => (
                                <div key={idx} className="nl-privilege-card">
                                    <div className="nl-privilege-icon">{item.icon}</div>
                                    <h4>{item.title}</h4>
                                    <p>{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ==============================================================
                    5. FAQ SECTION
                   ============================================================== */}
                <section className="nl-faq-section">
                    <div className="nl-faq-container">
                        <div className="nl-faq-sidebar">
                            <span className="nl-section-kicker">KNOWLEDGE BASE</span>
                            <h2>Frequently Asked Questions</h2>
                            <p>
                                Everything you need to know about buying pre-launch properties, MahaRERA compliance, and
                                developer allotments in Pune.
                            </p>
                            <a
                                href="https://wa.me/917398174444?text=Hello%20PPI%2C%20I%20have%20a%20question%20about%20new%20launches"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="nl-faq-contact-btn"
                            >
                                <MessageCircle size={15} />
                                <span>Chat with an Advisor</span>
                            </a>
                        </div>

                        <div className="nl-faq-accordion">
                            {FAQS.map((item, idx) => {
                                const isOpen = openFaq === idx;
                                return (
                                    <div
                                        key={idx}
                                        className={`nl-faq-item ${isOpen ? "nl-faq-item--open" : ""}`}
                                    >
                                        <button
                                            type="button"
                                            className="nl-faq-question"
                                            onClick={() => toggleFaq(idx)}
                                        >
                                            <span>{item.q}</span>
                                            <ChevronDown
                                                size={18}
                                                className={`nl-faq-chevron ${isOpen ? "nl-faq-chevron--rotated" : ""}`}
                                            />
                                        </button>
                                        {isOpen && (
                                            <div className="nl-faq-answer">
                                                <p>{item.a}</p>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>
            </main>

            {/* ==============================================================
                6. PRE-LAUNCH ALLOTMENT MODAL
               ============================================================== */}
            {enquiryModalOpen && (
                <div className="nl-modal-overlay" onClick={() => setEnquiryModalOpen(false)}>
                    <div
                        className="nl-modal-box"
                        onClick={(e) => e.stopPropagation()}
                        role="dialog"
                        aria-modal="true"
                    >
                        <button
                            type="button"
                            className="nl-modal-close"
                            onClick={() => setEnquiryModalOpen(false)}
                            aria-label="Close modal"
                        >
                            <X size={20} />
                        </button>

                        <div className="nl-modal-head">
                            <span className="nl-modal-kicker">
                                <Sparkles size={13} /> VIP PRE-LAUNCH ALLOTMENT
                            </span>
                            <h3>{selectedProject?.name || "Exclusive Pune Launch"}</h3>
                            <p>
                                {selectedProject?.location} • {selectedProject?.configuration} Luxury Living
                            </p>
                            {selectedProject?.offer && (
                                <div className="nl-modal-offer-tag">
                                    <span>⚡ {selectedProject.offer}</span>
                                </div>
                            )}
                        </div>

                        {enquirySuccess ? (
                            <div className="nl-modal-success">
                                <CheckCircle2 size={46} className="nl-success-icon" />
                                <h4>VIP Request Dispatched!</h4>
                                <p>Our luxury advisory will reach out via WhatsApp with pre-launch pricing, unit layouts & brochure.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleFormSubmit} className="nl-modal-form">
                                <div className="nl-form-field">
                                    <label>Full Name</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="e.g. Rahul Sharma"
                                        value={enquiryForm.name}
                                        onChange={(e) =>
                                            setEnquiryForm({ ...enquiryForm, name: e.target.value })
                                        }
                                    />
                                </div>

                                <div className="nl-form-field">
                                    <label>WhatsApp / Mobile Number</label>
                                    <input
                                        type="tel"
                                        required
                                        placeholder="+91 98765 43210"
                                        value={enquiryForm.phone}
                                        onChange={(e) =>
                                            setEnquiryForm({ ...enquiryForm, phone: e.target.value })
                                        }
                                    />
                                </div>

                                <div className="nl-form-field">
                                    <label>Configuration Preference</label>
                                    <select
                                        value={enquiryForm.bhk}
                                        onChange={(e) =>
                                            setEnquiryForm({ ...enquiryForm, bhk: e.target.value })
                                        }
                                    >
                                        <option value="2 BHK">2 BHK Luxury</option>
                                        <option value="3 BHK">3 BHK Premium</option>
                                        <option value="4 BHK">4 BHK Sky Mansion / Duplex</option>
                                        <option value="Penthouse">Penthouse / Villa</option>
                                    </select>
                                </div>

                                <div className="nl-form-field">
                                    <label>Inquiry Details</label>
                                    <textarea
                                        rows={2}
                                        value={enquiryForm.message}
                                        onChange={(e) =>
                                            setEnquiryForm({ ...enquiryForm, message: e.target.value })
                                        }
                                    />
                                </div>

                                <button type="submit" className="nl-modal-submit">
                                    <MessageCircle size={16} />
                                    <span>Get Pre-Launch Price & Floor Plan</span>
                                </button>

                                <span className="nl-modal-guarantee">
                                    <ShieldCheck size={13} /> 100% MahaRERA Verified • 0% Brokerage Guarantee
                                </span>
                            </form>
                        )}
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
}
