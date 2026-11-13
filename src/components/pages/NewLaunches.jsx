"use client";

import { useState, useRef, useEffect, useMemo, useCallback } from "react";
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
    BookOpen,
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
    const [viewMode, setViewMode] = useState("magazine"); // "magazine" | "grid"
    const [mobileViewMode, setMobileViewMode] = useState("carousel"); // "carousel" | "list"
    const [spotlightImgIdx, setSpotlightImgIdx] = useState(0);
    const [isSpotlightFav, setIsSpotlightFav] = useState(false);
    const [isSpotlightCompared, setIsSpotlightCompared] = useState(false);

    // Magazine Dual-Screen Showcase State with Fluid Two-Phase Transitions
    const [activeMagazineIdx, setActiveMagazineIdx] = useState(0);
    const [magazinePhotoIdx, setMagazinePhotoIdx] = useState(0);
    const [transitionPhase, setTransitionPhase] = useState("idle"); // "idle" | "leaving" | "entering"
    const [transitionDir, setTransitionDir] = useState("up"); // "up" | "down"

    const showcaseRef = useRef(null);
    const wheelAccumulatorRef = useRef(0);
    const wheelLockRef = useRef(false);
    const wheelDecayTimerRef = useRef(null);
    const transitionTimerRef = useRef(null);
    const enterTimerRef = useRef(null);
    const touchStartYRef = useRef(null);

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

    // Reset magazine and spotlight indices on locality filter change
    useEffect(() => {
        setSpotlightImgIdx(0);
        setActiveMagazineIdx(0);
        setMagazinePhotoIdx(0);
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

    // Active project for Magazine Dual-Screen Showcase
    const activeProject = filteredProjects[activeMagazineIdx] || filteredProjects[0];
    const activeGallery = useMemo(() => {
        if (!activeProject) return [];
        if (activeProject.gallery && activeProject.gallery.length > 0) {
            return activeProject.gallery;
        }
        return activeProject.image ? [activeProject.image] : [];
    }, [activeProject]);
    const activePhoto = activeGallery[magazinePhotoIdx % activeGallery.length] || activeProject?.image;

    // Ultra-smooth two-phase property transition (leaving -> entering -> settle)
    const goToMagazineProject = useCallback((newIdx, dir = "up") => {
        if (newIdx < 0 || newIdx >= filteredProjects.length) return;
        if (newIdx === activeMagazineIdx && transitionPhase === "idle") return;
        if (transitionPhase !== "idle") return;

        if (transitionTimerRef.current) clearTimeout(transitionTimerRef.current);
        if (enterTimerRef.current) clearTimeout(enterTimerRef.current);

        setTransitionDir(dir);
        setTransitionPhase("leaving");

        // Phase 1 -> Phase 2: After 170ms graceful exit glide, switch project & start silky enter
        transitionTimerRef.current = setTimeout(() => {
            setActiveMagazineIdx(newIdx);
            setMagazinePhotoIdx(0);
            setTransitionPhase("entering");

            // Phase 2 -> Settle: After 540ms, return to idle state
            enterTimerRef.current = setTimeout(() => {
                setTransitionPhase("idle");
            }, 540);
        }, 170);
    }, [activeMagazineIdx, filteredProjects.length, transitionPhase]);

    const handleNextProject = useCallback(() => {
        if (activeMagazineIdx < filteredProjects.length - 1) {
            goToMagazineProject(activeMagazineIdx + 1, "up");
        } else {
            goToMagazineProject(0, "up");
        }
    }, [activeMagazineIdx, filteredProjects.length, goToMagazineProject]);

    const handlePrevProject = useCallback(() => {
        if (activeMagazineIdx > 0) {
            goToMagazineProject(activeMagazineIdx - 1, "down");
        } else {
            goToMagazineProject(filteredProjects.length - 1, "down");
        }
    }, [activeMagazineIdx, filteredProjects.length, goToMagazineProject]);

    // Silky-smooth Wheel listener for mouse scroll property changing
    useEffect(() => {
        const el = showcaseRef.current;
        if (!el) return;

        const handleWheel = (e) => {
            if (enquiryModalOpen) return;

            // When currently animating or in cooldown, absorb continuous scroll inertia to prevent erratic jumps
            if (wheelLockRef.current) {
                if (e.cancelable) e.preventDefault();
                return;
            }

            // Clear previous decay timer
            if (wheelDecayTimerRef.current) {
                clearTimeout(wheelDecayTimerRef.current);
            }

            // Accumulate deltaY for smooth threshold detection
            wheelAccumulatorRef.current += e.deltaY;

            // Decay accumulator after 160ms if user stops scrolling
            wheelDecayTimerRef.current = setTimeout(() => {
                wheelAccumulatorRef.current = 0;
            }, 160);

            // 50px delta threshold: responsive on physical mouse wheels, silky on precision trackpads
            const SCROLL_THRESHOLD = 50;

            if (wheelAccumulatorRef.current >= SCROLL_THRESHOLD) {
                // Scroll down gesture -> next property with scroll-up effect
                if (activeMagazineIdx < filteredProjects.length - 1) {
                    if (e.cancelable) e.preventDefault();
                    wheelLockRef.current = true;
                    wheelAccumulatorRef.current = 0;
                    goToMagazineProject(activeMagazineIdx + 1, "up");
                    setTimeout(() => {
                        wheelLockRef.current = false;
                    }, 720);
                } else {
                    // At final property, release lock to allow natural page scroll down
                    wheelAccumulatorRef.current = 0;
                }
            } else if (wheelAccumulatorRef.current <= -SCROLL_THRESHOLD) {
                // Scroll up gesture -> previous property with scroll-down effect
                if (activeMagazineIdx > 0) {
                    if (e.cancelable) e.preventDefault();
                    wheelLockRef.current = true;
                    wheelAccumulatorRef.current = 0;
                    goToMagazineProject(activeMagazineIdx - 1, "down");
                    setTimeout(() => {
                        wheelLockRef.current = false;
                    }, 720);
                } else {
                    // At first property, release lock to allow natural page scroll up
                    wheelAccumulatorRef.current = 0;
                }
            }
        };

        el.addEventListener("wheel", handleWheel, { passive: false });
        return () => {
            el.removeEventListener("wheel", handleWheel);
            if (wheelDecayTimerRef.current) clearTimeout(wheelDecayTimerRef.current);
            if (transitionTimerRef.current) clearTimeout(transitionTimerRef.current);
            if (enterTimerRef.current) clearTimeout(enterTimerRef.current);
        };
    }, [activeMagazineIdx, filteredProjects.length, enquiryModalOpen, goToMagazineProject]);

    // Keyboard Arrow navigation for properties
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (enquiryModalOpen) return;
            if (e.key === "ArrowDown" || e.key === "PageDown") {
                handleNextProject();
            } else if (e.key === "ArrowUp" || e.key === "PageUp") {
                handlePrevProject();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [enquiryModalOpen, handleNextProject, handlePrevProject]);

    // Touch swipe for mobile/tablet screen change
    const handleTouchStart = (e) => {
        touchStartYRef.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e) => {
        if (touchStartYRef.current === null) return;
        const touchEndY = e.changedTouches[0].clientY;
        const diff = touchStartYRef.current - touchEndY;
        if (Math.abs(diff) > 40) {
            if (diff > 0) {
                handleNextProject();
            } else {
                handlePrevProject();
            }
        }
        touchStartYRef.current = null;
    };

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

                    {/* Desktop View Switcher (Editorial Magazine vs Grid) */}
                    <div className="nl-view-switcher">
                        <button
                            type="button"
                            className={`nl-view-btn ${viewMode === "magazine" ? "is-active" : ""}`}
                            onClick={() => setViewMode("magazine")}
                            title="Interactive Dual-Screen Editorial Magazine"
                        >
                            <BookOpen size={14} />
                            <span>Editorial Magazine</span>
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
                <div className="nl-stage-container-editorial">
                    {viewMode === "magazine" ? (
                        /* DUAL TABLET SCREEN EDITORIAL SHOWCASE WITH VERTICAL SCROLL-UP PROPERTY CHANGING */
                        <section
                            className="nl-magazine-section"
                            ref={showcaseRef}
                            onTouchStart={handleTouchStart}
                            onTouchEnd={handleTouchEnd}
                            aria-label="New Launches Magazine Showcase"
                        >
                            {/* Top Control Bar with Vertical Stepper & Count */}
                            <div className="nl-magazine-topbar">
                                <div className="nl-magazine-topbar-left">
                                    <span className="nl-magazine-kicker">
                                        <Sparkles size={13} /> PUNE REAL ESTATE PREMIERES • DIGITAL MAGAZINE
                                    </span>
                                    <h2 className="nl-magazine-main-title">
                                        Architectural Launch <em>Dossiers</em>
                                    </h2>
                                </div>

                                <div className="nl-magazine-topbar-right">
                                    <div className="nl-mag-counter-badge">
                                        <span className="nl-mag-counter-curr">
                                            {String(activeMagazineIdx + 1).padStart(2, "0")}
                                        </span>
                                        <span className="nl-mag-counter-sep">/</span>
                                        <span className="nl-mag-counter-total">
                                            {String(filteredProjects.length).padStart(2, "0")}
                                        </span>
                                    </div>

                                    <div className="nl-mag-scroll-cue" title="Mouse wheel scroll flips properties">
                                        <span className="nl-mag-mouse-icon" aria-hidden="true">
                                            <span className="nl-mag-mouse-wheel" />
                                        </span>
                                        <span className="nl-mag-mouse-label">Scroll to browse</span>
                                    </div>

                                    <div className="nl-mag-nav-group">
                                        <button
                                            type="button"
                                            className="nl-mag-nav-btn"
                                            onClick={handlePrevProject}
                                            aria-label="Previous Property"
                                            title="Previous Property (Scroll Up)"
                                        >
                                            <ChevronLeft size={16} />
                                        </button>
                                        <button
                                            type="button"
                                            className="nl-mag-nav-btn"
                                            onClick={handleNextProject}
                                            aria-label="Next Property"
                                            title="Next Property (Scroll Down)"
                                        >
                                            <ChevronRight size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* DUAL TABLETS STAGE (Side by side screens as in reference image) */}
                            <div className={`nl-tablets-stage nl-trans-${transitionPhase} nl-dir-${transitionDir}`}>
                                
                                {/* SCREEN 1: PROPERTY IMAGE SCREEN (Left Tablet) */}
                                <div className="nl-tablet nl-tablet--visual">
                                    <div className="nl-tablet-bezel">
                                        <div className="nl-tablet-camera-notch" />
                                        
                                        <div className="nl-tablet-screen nl-visual-screen">
                                            {/* Luxury Full-Bleed Property Photo */}
                                            <div className="nl-visual-screen__photo-wrap">
                                                <img
                                                    key={`${activeProject?.id}-${activePhoto}`}
                                                    src={activePhoto}
                                                    alt={activeProject?.name}
                                                    className="nl-visual-screen__img"
                                                />
                                                <div className="nl-visual-screen__scrim" />
                                            </div>

                                            {/* Screen Header: Brand & Location */}
                                            <div className="nl-visual-screen__topbar">
                                                <div className="nl-visual-screen__brand">
                                                    <Building2 size={16} />
                                                    <span>Pune Property Investors</span>
                                                </div>
                                                <span className="nl-visual-screen__cat-tag">
                                                    {activeProject?.type}
                                                </span>
                                            </div>

                                            {/* Top Status & RERA Pills */}
                                            <div className="nl-visual-screen__badges">
                                                <span className="nl-vis-pill nl-vis-pill--dev">
                                                    <Building2 size={12} /> {activeProject?.developer}
                                                </span>
                                                <span className="nl-vis-pill nl-vis-pill--rera">
                                                    <ShieldCheck size={12} /> RERA: {activeProject?.rera}
                                                </span>
                                            </div>

                                            {/* Screen Bottom: Editorial Title & Magazine Overlay */}
                                            <div className="nl-visual-screen__bottom">
                                                <div className="nl-vis-eyebrow">
                                                    <FileText size={12} />
                                                    <span>PDF Report • Digital Dossier • 100% Verified</span>
                                                </div>

                                                <h3 className="nl-vis-title">
                                                    {activeProject?.name}
                                                    <span>{activeProject?.location}</span>
                                                </h3>

                                                <p className="nl-vis-desc">
                                                    {activeProject?.description}
                                                </p>

                                                {/* Gallery Photo Thumbnails Switcher */}
                                                {activeGallery.length > 1 && (
                                                    <div className="nl-vis-gallery-bar">
                                                        <span className="nl-vis-gallery-label">
                                                            <Camera size={12} /> Gallery ({magazinePhotoIdx + 1}/{activeGallery.length}):
                                                        </span>
                                                        <div className="nl-vis-gallery-dots">
                                                            {activeGallery.map((thumb, tIdx) => (
                                                                <button
                                                                    key={tIdx}
                                                                    type="button"
                                                                    className={`nl-vis-thumb-btn ${tIdx === magazinePhotoIdx ? "is-active" : ""}`}
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        setMagazinePhotoIdx(tIdx);
                                                                    }}
                                                                    aria-label={`View photo ${tIdx + 1}`}
                                                                >
                                                                    <img src={thumb} alt="" />
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* SCREEN 2: PROPERTY DETAILS & Q&A DOSSIER (Right Tablet) */}
                                <div className="nl-tablet nl-tablet--details">
                                    <div className="nl-tablet-bezel">
                                        <div className="nl-tablet-camera-notch" />

                                        <div className="nl-tablet-screen nl-details-screen">
                                            
                                            {/* LEFT SUB-COLUMN: CREAM EDITORIAL Q&A & SPECS */}
                                            <div className="nl-details-screen__main">
                                                
                                                {/* Header matching Q&A reference */}
                                                <div className="nl-dossier-header">
                                                    <span className="nl-dossier-qna-watermark">Q&amp;A</span>
                                                    <h4 className="nl-dossier-title">
                                                        {activeProject?.name}
                                                    </h4>
                                                    <p className="nl-dossier-sub">
                                                        Verified pre-launch metrics, configurations, and developer privileges.
                                                    </p>
                                                </div>

                                                {/* Key Specifications Grid */}
                                                <div className="nl-dossier-specs-grid">
                                                    <div className="nl-dossier-spec-card">
                                                        <Bed size={15} />
                                                        <div>
                                                            <label>Configuration</label>
                                                            <strong>{activeProject?.configuration}</strong>
                                                        </div>
                                                    </div>
                                                    <div className="nl-dossier-spec-card">
                                                        <Maximize2 size={15} />
                                                        <div>
                                                            <label>Carpet Area</label>
                                                            <strong>{activeProject?.area}</strong>
                                                        </div>
                                                    </div>
                                                    <div className="nl-dossier-spec-card">
                                                        <Calendar size={15} />
                                                        <div>
                                                            <label>Possession</label>
                                                            <strong>{activeProject?.possession}</strong>
                                                        </div>
                                                    </div>
                                                    <div className="nl-dossier-spec-card">
                                                        <Layers size={15} />
                                                        <div>
                                                            <label>Structure</label>
                                                            <strong>{activeProject?.towers}</strong>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Pre-launch Offer Banner */}
                                                {activeProject?.offer && (
                                                    <div className="nl-dossier-offer-pill">
                                                        <span>⚡ {activeProject.offer}</span>
                                                    </div>
                                                )}

                                                {/* Q&A Section (Exact replica of user's uploaded reference) */}
                                                <div className="nl-dossier-qna-list">
                                                    <div className="nl-dossier-qna-item">
                                                        <h5>How long until possession for this property?</h5>
                                                        <p>
                                                            Possession is scheduled for {activeProject?.possession} under MahaRERA certificate #{activeProject?.rera}.
                                                        </p>
                                                    </div>

                                                    <div className="nl-dossier-qna-item">
                                                        <h5>What pre-launch discounts are available?</h5>
                                                        <p>
                                                            Direct developer allotment with price locked 10–18% below general public launch rates, with zero floor rise.
                                                        </p>
                                                    </div>

                                                    <div className="nl-dossier-qna-item">
                                                        <h5>Is there any brokerage or service commission?</h5>
                                                        <p>
                                                            Zero brokerage. All buyer consultations, documentation, and VIP chauffeur site visits are 100% complimentary.
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* Verified Highlights */}
                                                <div className="nl-dossier-tags">
                                                    {activeProject?.highlights?.map((h, i) => (
                                                        <span key={i} className="nl-dossier-tag">
                                                            <Check size={12} /> {h}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* RIGHT SUB-COLUMN: DARK LUXURY VIP SIDEBAR (Reference Image Dark Column) */}
                                            <div className="nl-details-screen__sidebar">
                                                <div className="nl-sidebar-brand-box">
                                                    <Building2 size={18} />
                                                    <div>
                                                        <strong>{activeProject?.developer}</strong>
                                                        <span>Strategic Partner</span>
                                                    </div>
                                                </div>

                                                {/* Dark Column Photo Preview */}
                                                <div className="nl-sidebar-media-preview">
                                                    <img src={activeProject?.image} alt={activeProject?.name} />
                                                    <div className="nl-sidebar-media-overlay">
                                                        <span>100% RERA VERIFIED</span>
                                                    </div>
                                                </div>

                                                {/* Price Card */}
                                                <div className="nl-sidebar-price-card">
                                                    <span className="nl-sidebar-price-label">Introductory Price</span>
                                                    <strong className="nl-sidebar-main-price">{activeProject?.price}</strong>
                                                    <span className="nl-sidebar-emi">{activeProject?.emi}</span>
                                                </div>

                                                {/* Contact Information & Concierge */}
                                                <div className="nl-sidebar-contact-info">
                                                    <div className="nl-sidebar-info-row">
                                                        <PhoneCall size={14} />
                                                        <span>+91 73981 74444</span>
                                                    </div>
                                                    <div className="nl-sidebar-info-row">
                                                        <Car size={14} />
                                                        <span>Complimentary VIP Cab Visit</span>
                                                    </div>
                                                    <div className="nl-sidebar-info-row">
                                                        <MapPin size={14} />
                                                        <span>{activeProject?.location}</span>
                                                    </div>
                                                </div>

                                                {/* Action Buttons */}
                                                <div className="nl-sidebar-actions">
                                                    <button
                                                        type="button"
                                                        className="nl-sidebar-primary-btn"
                                                        onClick={() => openEnquiry(activeProject)}
                                                    >
                                                        <span>Get Pre-Launch Price &amp; Floor Plan</span>
                                                        <ArrowRight size={14} />
                                                    </button>

                                                    <a
                                                        href={`https://wa.me/917398174444?text=Hi%20Pune%20Property%20Investors%2C%20please%20share%20VIP%20allotment%20details%20for%20${encodeURIComponent(activeProject?.name || "Exclusive Pune Launch")}.`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="nl-sidebar-wa-btn"
                                                    >
                                                        <MessageCircle size={15} />
                                                        <span>WhatsApp VIP Concierge</span>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Project Stepper Strip along Bottom */}
                            <div className="nl-magazine-bottom-strip">
                                <span className="nl-strip-label">SELECT PROPERTY:</span>
                                <div className="nl-strip-items">
                                    {filteredProjects.map((proj, pIdx) => (
                                        <button
                                            key={proj.id}
                                            type="button"
                                            className={`nl-strip-item ${pIdx === activeMagazineIdx ? "is-active" : ""}`}
                                            onClick={() => goToMagazineProject(pIdx, pIdx > activeMagazineIdx ? "up" : "down")}
                                        >
                                            <span className="nl-strip-item-num">{String(pIdx + 1).padStart(2, "0")}</span>
                                            <span className="nl-strip-item-name">{proj.name}</span>
                                            <span className="nl-strip-item-loc">• {proj.areaLocality || proj.location}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </section>
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
