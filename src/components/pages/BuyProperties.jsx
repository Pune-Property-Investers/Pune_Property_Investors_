"use client";

import { useMemo, useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
    ArrowRight,
    Search,
    SlidersHorizontal,
    MapPin,
    Sparkles,
    ChevronRight,
    ChevronLeft,
    ChevronDown,
    Home as HomeIcon,
    Building2,
    X,
} from "lucide-react";

import Header from "../layouts/Header";
import Footer from "../layouts/Footer";

import PropertyFilters from "../properties/PropertyFilters";
import PropertyListingCard from "../properties/PropertyListingCard";
import AdvertisementSidebar from "../common/AdvertisementSidebar";

import propertyListingsData from "../../data/propertyListingsData.js";
import { usePublishedCms } from "../../services/liveContent";
import "./BuyProperties.css";

const DEFAULT_FILTERS = {
    location: "all",
    bhk: "all",
    minPrice: "",
    maxPrice: "",
    propertyType: "all",
    sortBy: "recommended",
};

const HERO_FEATURED_PROPERTIES = [
    {
        id: 1,
        name: "Kumar Primus",
        subtitle: "Beaux Arts elegance in Kalyani Nagar",
        tagline: "Ultra-luxury riverfront residences on Kalyani Nagar Prime Corridor",
        location: "Kalyani Nagar, Pune",
        address: "Bishop's School Road, Kalyani Nagar",
        neighborhood: "Koregaon Park & Kalyani Nagar",
        developer: "Kumar Properties",
        type: "Ultra-Luxury Condos",
        configuration: "3 & 4 BHK Sky Mansions",
        floors: "28 Storeys",
        units: "112 Exclusive Units",
        yearBuilt: "2027",
        area: "2,100 – 2,850 Sq. Ft.",
        possession: "March 2027",
        price: "₹1.95 Cr*",
        rera: "P52100049871",
        badge: "Architectural Showcase",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2400&q=85",
    },
    {
        id: 2,
        name: "The Aurelia",
        subtitle: "Contemporary skyline towers in Baner",
        tagline: "Architectural high-street residences with private sky decks",
        location: "Baner, Pune",
        address: "High Street Boulevard, Baner",
        neighborhood: "Baner & Balewadi Prime",
        developer: "Vilas Javdekar Group",
        type: "Luxury High-Rise",
        configuration: "3 & 4.5 BHK",
        floors: "34 Storeys",
        units: "164 Private Units",
        yearBuilt: "2026",
        area: "2,450 – 3,200 Sq. Ft.",
        possession: "June 2026",
        price: "₹2.10 Cr*",
        rera: "P52100049871",
        badge: "Skyline Landmark",
        image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2400&q=85",
    },
    {
        id: 3,
        name: "VTP HiLife",
        subtitle: "Amenity-rich smart living in Kharadi",
        tagline: "High-rise residences 5 mins from EON IT Park & World Trade Center",
        location: "Kharadi, Pune",
        address: "Dhole Patil College Road, Kharadi",
        neighborhood: "Kharadi IT Corridor",
        developer: "VTP Realty",
        type: "Smart Condominiums",
        configuration: "2 & 3 BHK",
        floors: "30 Storeys",
        units: "450 Smart Condos",
        yearBuilt: "2026",
        area: "1,280 – 1,750 Sq. Ft.",
        possession: "Sept 2026",
        price: "₹98 Lacs*",
        rera: "P52100048712",
        badge: "Smart Residences",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2400&q=85",
    },
    {
        id: 4,
        name: "Tribeca Highstreet",
        subtitle: "Trump Towers architects' Baner landmark",
        tagline: "International design sky-mansions with triple-height entrance lobby",
        location: "Baner, Pune",
        address: "Mumbai-Pune Expressway Link, Baner",
        neighborhood: "West Pune Luxury Corridor",
        developer: "Tribeca Developers",
        type: "Branded Sky Mansions",
        configuration: "3 & 4 BHK",
        floors: "32 Storeys",
        units: "192 Sky Mansions",
        yearBuilt: "2027",
        area: "2,350 – 3,100 Sq. Ft.",
        possession: "Nov 2027",
        price: "₹2.10 Cr*",
        rera: "P52100051199",
        badge: "Global Architecture",
        image: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=2400&q=85",
    },
];

const CATEGORY_HERO_PROPERTIES = {
    all: [
        {
            id: 1,
            name: "Kumar Primus",
            subtitle: "Beaux Arts elegance in Kalyani Nagar",
            tagline: "Ultra-luxury riverfront residences on Kalyani Nagar Prime Corridor",
            location: "Kalyani Nagar, Pune",
            address: "Bishop's School Road, Kalyani Nagar",
            neighborhood: "Koregaon Park & Kalyani Nagar",
            developer: "Kumar Properties",
            type: "Ultra-Luxury Condos",
            configuration: "3 & 4 BHK Sky Mansions",
            floors: "28 Storeys",
            units: "112 Exclusive Units",
            yearBuilt: "2027",
            area: "2,100 – 2,850 Sq. Ft.",
            possession: "March 2027",
            price: "₹1.95 Cr*",
            rera: "P52100049871",
            badge: "Architectural Showcase",
            image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2400&q=85",
        },
        {
            id: 2,
            name: "The Aurelia",
            subtitle: "Contemporary skyline towers in Baner",
            tagline: "Architectural high-street residences with private sky decks",
            location: "Baner, Pune",
            address: "High Street Boulevard, Baner",
            neighborhood: "Baner & Balewadi Prime",
            developer: "Vilas Javdekar Group",
            type: "Luxury High-Rise",
            configuration: "3 & 4.5 BHK",
            floors: "34 Storeys",
            units: "164 Private Units",
            yearBuilt: "2026",
            area: "2,450 – 3,200 Sq. Ft.",
            possession: "June 2026",
            price: "₹2.10 Cr*",
            rera: "P52100049871",
            badge: "Skyline Landmark",
            image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2400&q=85",
        },
        {
            id: 3,
            name: "VTP HiLife",
            subtitle: "Amenity-rich smart living in Kharadi",
            tagline: "High-rise residences 5 mins from EON IT Park & World Trade Center",
            location: "Kharadi, Pune",
            address: "Dhole Patil College Road, Kharadi",
            neighborhood: "Kharadi IT Corridor",
            developer: "VTP Realty",
            type: "Smart Condominiums",
            configuration: "2 & 3 BHK",
            floors: "30 Storeys",
            units: "450 Smart Condos",
            yearBuilt: "2026",
            area: "1,280 – 1,750 Sq. Ft.",
            possession: "Sept 2026",
            price: "₹98 Lacs*",
            rera: "P52100048712",
            badge: "Smart Residences",
            image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2400&q=85",
        },
        {
            id: 4,
            name: "Tribeca Highstreet",
            subtitle: "Trump Towers architects' Baner landmark",
            tagline: "International design sky-mansions with triple-height entrance lobby",
            location: "Baner, Pune",
            address: "Mumbai-Pune Expressway Link, Baner",
            neighborhood: "West Pune Luxury Corridor",
            developer: "Tribeca Developers",
            type: "Branded Sky Mansions",
            configuration: "3 & 4 BHK",
            floors: "32 Storeys",
            units: "192 Sky Mansions",
            yearBuilt: "2027",
            area: "2,350 – 3,100 Sq. Ft.",
            possession: "Nov 2027",
            price: "₹2.10 Cr*",
            rera: "P52100051199",
            badge: "Global Architecture",
            image: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=2400&q=85",
        },
    ],
    "new-launch": [
        {
            id: 101,
            name: "The Aurelia Sky Mansions",
            subtitle: "New tower premiere in Baner High Street",
            tagline: "Exclusive high-floor allotments with private sun decks and concierge",
            location: "Baner, Pune",
            address: "High Street Boulevard, Baner",
            neighborhood: "Baner Prime",
            developer: "Vilas Javdekar Group",
            type: "New Launch Sky Condos",
            configuration: "3 & 4 BHK",
            floors: "34 Storeys",
            units: "164 Units",
            yearBuilt: "2026",
            area: "2,450 Sq. Ft.",
            possession: "June 2026",
            price: "₹2.10 Cr*",
            rera: "P52100049871",
            badge: "Exclusive Premiere",
            image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=2400&q=85",
        },
        {
            id: 102,
            name: "Skyline One Residences",
            subtitle: "Pre-launch privilege on Kharadi IT Corridor",
            tagline: "Botanical smart homes minutes from EON Free Zone",
            location: "Kharadi, Pune",
            address: "Kharadi Bypass, EON IT Park",
            neighborhood: "Kharadi IT Corridor",
            developer: "Pristine Properties",
            type: "Pre-Launch Condos",
            configuration: "2 & 3 BHK",
            floors: "28 Storeys",
            units: "220 Units",
            yearBuilt: "2027",
            area: "1,350 Sq. Ft.",
            possession: "Dec 2027",
            price: "₹85 Lacs*",
            rera: "P52100050123",
            badge: "Pre-Launch Allotment",
            image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=2400&q=85",
        },
        {
            id: 103,
            name: "Urban Crest Contemporary",
            subtitle: "Smart tech apartments in Hinjewadi Phase 1",
            tagline: "Work-life balanced residences equipped with 40+ clubhouse amenities",
            location: "Hinjewadi, Pune",
            address: "Megapolis Circle, Hinjewadi Phase 1",
            neighborhood: "Hinjewadi Tech Hub",
            developer: "Kolte Patil",
            type: "New Launch Apartments",
            configuration: "2 BHK",
            floors: "24 Storeys",
            units: "310 Units",
            yearBuilt: "2026",
            area: "1,050 Sq. Ft.",
            possession: "August 2026",
            price: "₹62 Lacs*",
            rera: "P52100048220",
            badge: "New Tower Launch",
            image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=2400&q=85",
        },
        {
            id: 104,
            name: "Kohinoor Presidentia",
            subtitle: "Signature high-rises in Upper Kharadi",
            tagline: "Panoramic river view residences with infinity sky lounge",
            location: "Kharadi, Pune",
            address: "New Kharadi Promenade, Pune",
            neighborhood: "East Pune Corridor",
            developer: "Kohinoor Group",
            type: "Luxury High-Rise",
            configuration: "3 BHK",
            floors: "30 Storeys",
            units: "180 Units",
            yearBuilt: "2027",
            area: "1,580 Sq. Ft.",
            possession: "May 2027",
            price: "₹92 Lacs*",
            rera: "P52100051441",
            badge: "Early Bird Offer",
            image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=2400&q=85",
        },
    ],
    commercial: [
        {
            id: 201,
            name: "World Trade Center Suites",
            subtitle: "Grade-A IT & corporate suites in Kharadi",
            tagline: "Global business landmark connected to international financial institutions",
            location: "Kharadi, Pune",
            address: "World Trade Center Boulevard, Kharadi",
            neighborhood: "Kharadi Financial Hub",
            developer: "Panchshil Realty",
            type: "Grade-A Corporate Offices",
            configuration: "1,200 – 4,500 Sq. Ft.",
            floors: "18 Storeys",
            units: "84 Office Suites",
            yearBuilt: "2025",
            area: "1,450 Sq. Ft.",
            possession: "Ready Possession",
            price: "₹1.45 Cr*",
            rera: "P52100038910",
            badge: "Grade-A Commercial",
            image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2400&q=85",
        },
        {
            id: 202,
            name: "Amar Apex High-Street",
            subtitle: "High-street retail & corporate towers in Baner",
            tagline: "Double-height ground retail spaces with marquee expressway visibility",
            location: "Baner, Pune",
            address: "Mumbai-Pune Highway, Baner",
            neighborhood: "Baner Business District",
            developer: "Amar Builders",
            type: "Retail & Office Hub",
            configuration: "850 – 2,800 Sq. Ft.",
            floors: "14 Storeys",
            units: "62 Commercial Units",
            yearBuilt: "2026",
            area: "950 Sq. Ft.",
            possession: "Dec 2026",
            price: "₹95 Lacs*",
            rera: "P52100042119",
            badge: "High-Footfall Retail",
            image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2400&q=85",
        },
        {
            id: 203,
            name: "EON Free Zone IT Suites",
            subtitle: "Pre-leased & ready tech office spaces",
            tagline: "SEZ & Non-SEZ flexible corporate floors with 9%+ rental yield potential",
            location: "Kharadi, Pune",
            address: "EON Free Zone Phase 2, Kharadi",
            neighborhood: "Kharadi IT Corridor",
            developer: "Panchshil Realty",
            type: "IT Park Office Suites",
            configuration: "2,000 – 6,000 Sq. Ft.",
            floors: "16 Storeys",
            units: "48 Corporate Suites",
            yearBuilt: "2025",
            area: "2,100 Sq. Ft.",
            possession: "Immediate Allotment",
            price: "₹1.85 Cr*",
            rera: "P52100039002",
            badge: "High Rental Yield",
            image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=2400&q=85",
        },
    ],
    plot: [
        {
            id: 301,
            name: "Gated Villa NA Plots",
            subtitle: "Clubhouse layout plots in Hinjewadi Phase 3",
            tagline: "Clear-title Sanctioned NA residential plots with private road & clubhouse",
            location: "Hinjewadi, Pune",
            address: "Megapolis Circle, Phase 3, Hinjewadi",
            neighborhood: "Hinjewadi Megapolis",
            developer: "Megapolis Infra",
            type: "Sanctioned NA Plots",
            configuration: "2,000 – 3,500 Sq. Ft.",
            floors: "G+2 Permissible",
            units: "45 Limited Plots",
            yearBuilt: "2025",
            area: "2,400 Sq. Ft.",
            possession: "Immediate Registration",
            price: "₹72 Lacs*",
            rera: "P52100041880",
            badge: "Collector NA Sanctioned",
            image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=2400&q=85",
        },
        {
            id: 302,
            name: "Wagholi Country Plots",
            subtitle: "Independent residential layouts in Wagholi",
            tagline: "Demarcated plots with water, power, and compound wall in booming East Pune",
            location: "Wagholi, Pune",
            address: "Bakori Road, Wagholi",
            neighborhood: "Wagholi Corridor",
            developer: "Pride Land Holdings",
            type: "Clear-Title Plots",
            configuration: "1,500 – 2,800 Sq. Ft.",
            floors: "Independent Construction",
            units: "60 Demarcated Plots",
            yearBuilt: "2025",
            area: "1,800 Sq. Ft.",
            possession: "Ready for Construction",
            price: "₹55 Lacs*",
            rera: "P52100043120",
            badge: "100% Clear Title",
            image: "https://images.unsplash.com/photo-1500076656116-558758c991c1?auto=format&fit=crop&w=2400&q=85",
        },
    ],
};

function BuyPropertiesContent({ defaultPropertyType = "", pageTitle = "" }) {
    const published = usePublishedCms();
    const sourceProperties =
        Array.isArray(published?.properties) && published.properties.length > 0
            ? published.properties
            : propertyListingsData;

    const searchParams = useSearchParams();
    const initialLocation = searchParams?.get("location") || "all";
    const initialBhk = searchParams?.get("bhk") || "all";
    const initialType = searchParams?.get("type") || defaultPropertyType || "all";
    const initialProject = searchParams?.get("project") || "";

    const [filters, setFilters] = useState({
        ...DEFAULT_FILTERS,
        location: initialLocation,
        bhk: initialBhk,
        propertyType: initialType,
    });
    const [searchQuery, setSearchQuery] = useState(initialProject);
        const [currentSlide, setCurrentSlide] = useState(0);
    const [dragProgress, setDragProgress] = useState(0); // -100 to 100 vertical %
    const [isInteracting, setIsInteracting] = useState(false);
    const [isSnapping, setIsSnapping] = useState(false);

    const dragProgressRef = useRef(0);
    dragProgressRef.current = dragProgress;

    const isDraggingRef = useRef(false);
    const startYRef = useRef(0);
    const hasDraggedRef = useRef(false);
    const wheelTimeoutRef = useRef(null);
    const snapTimeoutRef = useRef(null);

    const [isHovered, setIsHovered] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [drawerProperty, setDrawerProperty] = useState(null);
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

    // Dynamic Hero Slides & Card Title based on selected Category / Type
    const activeHeroProperties = useMemo(() => {
        const type = (filters.propertyType || "").toLowerCase();
        if (type === "commercial") return CATEGORY_HERO_PROPERTIES.commercial;
        if (type === "plot" || type === "plots" || type === "land") return CATEGORY_HERO_PROPERTIES.plot;
        if (type === "new-launch" || type === "new_launch" || type === "new-launches" || type === "new launch") {
            return CATEGORY_HERO_PROPERTIES["new-launch"];
        }
        return CATEGORY_HERO_PROPERTIES.all;
    }, [filters.propertyType]);

    const cardHeading = useMemo(() => {
        const type = (filters.propertyType || "").toLowerCase();
        if (type === "commercial") {
            return {
                italic: "Commercial",
                regular: "properties",
            };
        }
        if (type === "plot" || type === "plots" || type === "land") {
            return {
                italic: "Plots &",
                regular: "land",
            };
        }
        if (type === "new-launch" || type === "new_launch" || type === "new-launches" || type === "new launch") {
            return {
                italic: "New",
                regular: "launches",
            };
        }
        if (type === "apartment" || type === "apartments" || type === "residential") {
            return {
                italic: "Residential",
                regular: "apartments",
            };
        }
        return {
            italic: "All",
            regular: "properties",
        };
    }, [filters.propertyType]);

    const handleCategoryTabChange = (typeVal) => {
        setFilters((prev) => ({
            ...prev,
            propertyType: typeVal,
        }));
        setCurrentSlide(0);
        setPrevSlide(null);
    };

    // Cleanup any pending timeouts on unmount
    useEffect(() => {
        return () => {
            if (wheelTimeoutRef.current) clearTimeout(wheelTimeoutRef.current);
            if (snapTimeoutRef.current) clearTimeout(snapTimeoutRef.current);
        };
    }, []);

    // Helper: Total slides and safely wrapped indices
    const totalSlides = activeHeroProperties.length;
    const safeCurrentIdx = totalSlides > 0 ? ((currentSlide % totalSlides) + totalSlides) % totalSlides : 0;
    const nextIdx = totalSlides > 0 ? (safeCurrentIdx + 1) % totalSlides : 0;
    const prevIdx = totalSlides > 0 ? (safeCurrentIdx - 1 + totalSlides) % totalSlides : 0;

    const currentProp = activeHeroProperties[safeCurrentIdx];
    const nextProp = activeHeroProperties[nextIdx];
    const prevProp = activeHeroProperties[prevIdx];

    // Settle drag/scroll gesture: snaps to next/prev or springs back
    const settleDrag = () => {
        const progress = dragProgressRef.current;
        const THRESHOLD = 16; // 16% drag triggers advance

        if (snapTimeoutRef.current) clearTimeout(snapTimeoutRef.current);

        if (progress <= -THRESHOLD) {
            // Dragged/scrolled up -> advance to NEXT
            if (safeCurrentIdx < totalSlides - 1) {
                setIsSnapping(true);
                setDragProgress(-100);
                snapTimeoutRef.current = setTimeout(() => {
                    setCurrentSlide((prev) => (prev + 1) % totalSlides);
                    setDragProgress(0);
                    setIsSnapping(false);
                }, 480);
            } else {
                // At last slide -> spring back with rubber-band recovery
                setIsSnapping(true);
                setDragProgress(0);
                snapTimeoutRef.current = setTimeout(() => setIsSnapping(false), 480);
            }
        } else if (progress >= THRESHOLD) {
            // Dragged/scrolled down -> advance to PREV
            if (safeCurrentIdx > 0) {
                setIsSnapping(true);
                setDragProgress(100);
                snapTimeoutRef.current = setTimeout(() => {
                    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
                    setDragProgress(0);
                    setIsSnapping(false);
                }, 480);
            } else {
                // At first slide -> spring back
                setIsSnapping(true);
                setDragProgress(0);
                snapTimeoutRef.current = setTimeout(() => setIsSnapping(false), 480);
            }
        } else {
            // Insufficient drag -> spring back smoothly
            setIsSnapping(true);
            setDragProgress(0);
            snapTimeoutRef.current = setTimeout(() => setIsSnapping(false), 480);
        }
    };

    const handleNextSlide = () => {
        if (isSnapping || isInteracting) return;
        setIsInteracting(false);
        setIsSnapping(true);
        setDragProgress(-100);
        if (snapTimeoutRef.current) clearTimeout(snapTimeoutRef.current);
        snapTimeoutRef.current = setTimeout(() => {
            setCurrentSlide((prev) => (prev + 1) % totalSlides);
            setDragProgress(0);
            setIsSnapping(false);
        }, 480);
    };

    const handlePrevSlide = () => {
        if (isSnapping || isInteracting) return;
        setIsInteracting(false);
        setIsSnapping(true);
        setDragProgress(100);
        if (snapTimeoutRef.current) clearTimeout(snapTimeoutRef.current);
        snapTimeoutRef.current = setTimeout(() => {
            setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
            setDragProgress(0);
            setIsSnapping(false);
        }, 480);
    };

    // Auto-advance slideshow when not hovered or interacting
    useEffect(() => {
        if (isHovered || isDrawerOpen || isInteracting || isSnapping) return;
        const interval = setInterval(() => {
            handleNextSlide();
        }, 6500);

        return () => clearInterval(interval);
    }, [safeCurrentIdx, isHovered, isDrawerOpen, isInteracting, isSnapping, totalSlides]);

    // Keyboard navigation (Arrow keys for slides, Escape to close drawer)
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape" && isDrawerOpen) {
                setIsDrawerOpen(false);
            } else if (e.key === "ArrowLeft" && !isDrawerOpen) {
                handlePrevSlide();
            } else if (e.key === "ArrowRight" && !isDrawerOpen) {
                handleNextSlide();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [safeCurrentIdx, isDrawerOpen, isInteracting, isSnapping]);

    // Interactive Mouse Wheel Scroll: Photo directly follows scroll delta
    const handleHeroWheel = (e) => {
        if (isDrawerOpen || isSnapping) return;

        // At boundaries, release so the page scrolls naturally
        if (e.deltaY > 0 && safeCurrentIdx >= totalSlides - 1 && dragProgress <= 0) {
            return;
        }
        if (e.deltaY < 0 && safeCurrentIdx <= 0 && dragProgress >= 0) {
            return;
        }

        if (e.cancelable) e.preventDefault();

        setIsInteracting(true);

        setDragProgress((prev) => {
            // Fluid delta tracking: 0.16% per delta unit
            const next = prev - e.deltaY * 0.16;
            // Add rubber-band resistance at top and bottom boundaries
            let clamped = next;
            if (safeCurrentIdx === 0 && next > 0) {
                clamped = next * 0.35;
            } else if (safeCurrentIdx === totalSlides - 1 && next < 0) {
                clamped = next * 0.35;
            }
            return Math.max(-100, Math.min(100, clamped));
        });

        if (wheelTimeoutRef.current) clearTimeout(wheelTimeoutRef.current);
        wheelTimeoutRef.current = setTimeout(() => {
            setIsInteracting(false);
            settleDrag();
        }, 130);
    };

    // Interactive Mouse & Touch Drag on the Photo Frame
    const handlePhotoMouseDown = (e) => {
        if (isDrawerOpen || isSnapping) return;
        isDraggingRef.current = true;
        startYRef.current = e.clientY;
        hasDraggedRef.current = false;
        setIsInteracting(true);
    };

    const handlePhotoTouchStart = (e) => {
        if (isDrawerOpen || isSnapping) return;
        isDraggingRef.current = true;
        startYRef.current = e.touches[0].clientY;
        hasDraggedRef.current = false;
        setIsInteracting(true);
    };

    // Global drag move & release listeners while interacting
    useEffect(() => {
        if (!isInteracting) return;

        const handleGlobalPointerMove = (e) => {
            if (!isDraggingRef.current) return;
            const currentY = e.clientY ?? (e.touches && e.touches[0]?.clientY);
            if (currentY === undefined) return;
            const diff = currentY - startYRef.current;
            if (Math.abs(diff) > 4) {
                hasDraggedRef.current = true;
            }
            // 240px is reference card frame height
            const percent = (diff / 240) * 100;
            let clamped = percent;
            if (safeCurrentIdx === 0 && percent > 0) {
                clamped = percent * 0.35;
            } else if (safeCurrentIdx === totalSlides - 1 && percent < 0) {
                clamped = percent * 0.35;
            }
            setDragProgress(Math.max(-100, Math.min(100, clamped)));
        };

        const handleGlobalPointerUp = () => {
            if (!isDraggingRef.current) return;
            isDraggingRef.current = false;
            setIsInteracting(false);
            settleDrag();
        };

        window.addEventListener("mousemove", handleGlobalPointerMove);
        window.addEventListener("mouseup", handleGlobalPointerUp);
        window.addEventListener("touchmove", handleGlobalPointerMove, { passive: true });
        window.addEventListener("touchend", handleGlobalPointerUp);

        return () => {
            window.removeEventListener("mousemove", handleGlobalPointerMove);
            window.removeEventListener("mouseup", handleGlobalPointerUp);
            window.removeEventListener("touchmove", handleGlobalPointerMove);
            window.removeEventListener("touchend", handleGlobalPointerUp);
        };
    }, [isInteracting, safeCurrentIdx, totalSlides]);

    const handlePhotoClick = () => {
        // Only open property drawer if user clicked, not dragged
        if (!hasDraggedRef.current) {
            openPropertyDrawer(currentProp);
        }
    };

    // Lock body scroll when mobile filter drawer or property info drawer is open
    useEffect(() => {
        if (mobileFiltersOpen || isDrawerOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [mobileFiltersOpen, isDrawerOpen]);

    const openPropertyDrawer = (prop) => {
        setDrawerProperty(prop || HERO_FEATURED_PROPERTIES[currentSlide]);
        setIsDrawerOpen(true);
    };

    const closePropertyDrawer = () => {
        setIsDrawerOpen(false);
    };

    const handleExplorePropertyFromDrawer = () => {
        setIsDrawerOpen(false);
        if (drawerProperty?.name) {
            setSearchQuery(drawerProperty.name);
            const listingsEl = document.getElementById("listings");
            if (listingsEl) {
                listingsEl.scrollIntoView({ behavior: "smooth" });
            }
        }
    };

    // Sync if URL search params change
    useEffect(() => {
        const loc = searchParams?.get("location");
        const proj = searchParams?.get("project");
        const bhkParam = searchParams?.get("bhk");
        const typeParam = searchParams?.get("type");

        if (loc) {
            setFilters((prev) => ({ ...prev, location: loc }));
        }
        if (proj) {
            setSearchQuery(proj);
        }
        if (bhkParam) {
            setFilters((prev) => ({ ...prev, bhk: bhkParam }));
        }
        if (typeParam) {
            setFilters((prev) => ({ ...prev, propertyType: typeParam }));
        }
    }, [searchParams]);

    // Update an individual filter.
    const handleFilterChange = (key, value) => {
        setFilters((previousFilters) => ({
            ...previousFilters,
            [key]: value,
        }));
    };

    // Reset every filter and the search field.
    const handleResetFilters = () => {
        setFilters({ ...DEFAULT_FILTERS });
        setSearchQuery("");
    };

    // Calculate active filter count for mobile badge
    const activeFilterCount = useMemo(() => {
        let count = 0;
        if (filters.location && filters.location !== "all") count++;
        if (filters.bhk && filters.bhk !== "all") count++;
        if (filters.propertyType && filters.propertyType !== "all") count++;
        if (filters.minPrice !== "") count++;
        if (filters.maxPrice !== "") count++;
        return count;
    }, [filters]);

    // Filter and sort the property listings.
    const filteredProperties = useMemo(() => {
        let properties = [...sourceProperties];

        // Location filter.
        if (filters.location && filters.location !== "all") {
            properties = properties.filter((property) => {
                const locality = String(
                    property.locality || property.location || ""
                ).toLowerCase();

                return locality.includes(filters.location.toLowerCase());
            });
        }

        // BHK filter.
        if (filters.bhk && filters.bhk !== "all") {
            properties = properties.filter((property) => {
                const bedrooms = Number(
                    property.bedrooms ?? property.bhk ?? 0
                );

                if (filters.bhk === "4+") {
                    return bedrooms >= 4;
                }

                return bedrooms === Number(filters.bhk);
            });
        }

        // Minimum budget. Budget inputs are in rupees.
        if (filters.minPrice !== "") {
            const minimumPrice = Number(filters.minPrice);

            properties = properties.filter(
                (property) => Number(property.price) >= minimumPrice
            );
        }

        // Maximum budget. Budget inputs are in rupees.
        if (filters.maxPrice !== "") {
            const maximumPrice = Number(filters.maxPrice);

            properties = properties.filter(
                (property) => Number(property.price) <= maximumPrice
            );
        }

        // Property type filter.
        if (filters.propertyType && filters.propertyType !== "all") {
            properties = properties.filter((property) => {
                const type = String(
                    property.propertyType || ""
                ).toLowerCase();
                const target = String(filters.propertyType).toLowerCase();

                if (target === "plot" || target === "land") {
                    return (
                        type.includes("plot") ||
                        type.includes("land")
                    );
                }

                if (target === "commercial") {
                    return (
                        type.includes("commercial") ||
                        type.includes("office") ||
                        type.includes("retail")
                    );
                }

                if (
                    target === "apartment" ||
                    target === "flat" ||
                    target === "residential"
                ) {
                    return (
                        type.includes("apartment") ||
                        type.includes("flat") ||
                        type.includes("residential")
                    );
                }

                return type.includes(target);
            });
        }

        // Search by property, project, or locality.
        const query = searchQuery.trim().toLowerCase();

        if (query) {
            properties = properties.filter((property) => {
                const searchableText = [
                    property.title,
                    property.name,
                    property.projectName,
                    property.location,
                    property.locality,
                    property.city,
                    property.propertyType,
                ]
                    .filter(Boolean)
                    .join(" ")
                    .toLowerCase();

                return searchableText.includes(query);
            });
        }

        // Sorting.
        if (filters.sortBy === "price-low-high") {
            properties.sort(
                (a, b) => Number(a.price) - Number(b.price)
            );
        } else if (filters.sortBy === "price-high-low") {
            properties.sort(
                (a, b) => Number(b.price) - Number(a.price)
            );
        } else {
            properties.sort(
                (a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured))
            );
        }

        return properties;
    }, [filters, searchQuery, sourceProperties]);

    return (
        <div className="buy-properties-page">
            <Header />

            <main>
                {/* Hero Banner with Photo Change Effect */}
                {/* Editorial Hero Section (Matching Video Design: Synchronized Vertical Slide Effect + Identical Middle & Back Photo) */}
                <section
                    className="buy-hero-editorial"
                    aria-label="Featured Properties Editorial Showcase"
                    onWheel={handleHeroWheel}
                >
                    {/* Full-bleed Vertical Sliding Background Slides with Direct Drag & Scroll Follow */}
                    <div className="buy-hero-editorial__bg-layer" aria-hidden="true">
                        {currentProp && (
                            <div
                                className="buy-hero-editorial__bg-slide is-active"
                                style={{
                                    backgroundImage: `url(${currentProp.image})`,
                                    transform: `translateY(${dragProgress}%)`,
                                    transition: isInteracting ? "none" : "transform 0.48s cubic-bezier(0.16, 1, 0.3, 1)",
                                    zIndex: 1,
                                }}
                            />
                        )}

                        {dragProgress < 0 && nextProp && (
                            <div
                                className="buy-hero-editorial__bg-slide is-incoming"
                                style={{
                                    backgroundImage: `url(${nextProp.image})`,
                                    transform: `translateY(${100 + dragProgress}%)`,
                                    transition: isInteracting ? "none" : "transform 0.48s cubic-bezier(0.16, 1, 0.3, 1)",
                                    zIndex: 2,
                                }}
                            />
                        )}

                        {dragProgress > 0 && prevProp && (
                            <div
                                className="buy-hero-editorial__bg-slide is-incoming"
                                style={{
                                    backgroundImage: `url(${prevProp.image})`,
                                    transform: `translateY(${-100 + dragProgress}%)`,
                                    transition: isInteracting ? "none" : "transform 0.48s cubic-bezier(0.16, 1, 0.3, 1)",
                                    zIndex: 2,
                                }}
                            />
                        )}

                        <div className="buy-hero-editorial__bg-overlay" />
                    </div>

                    {/* Edge Navigation Arrow Buttons (Desktop) */}
                    <button
                        type="button"
                        className="buy-hero-editorial__arrow buy-hero-editorial__arrow--prev"
                        onClick={handlePrevSlide}
                        aria-label="Previous property"
                    >
                        <ChevronLeft size={28} />
                    </button>

                    <button
                        type="button"
                        className="buy-hero-editorial__arrow buy-hero-editorial__arrow--next"
                        onClick={handleNextSlide}
                        aria-label="Next property"
                    >
                        <ChevronRight size={28} />
                    </button>

                    {/* Centered Editorial White Poster Card */}
                    <div className="buy-hero-editorial__stage">
                        <article
                            className="buy-hero-poster-card"
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                        >
                            {/* Card Top Title: Dynamic based on category in our signature serif style */}
                            <div className="buy-hero-poster-card__header">
                                <h1 className="buy-hero-poster-card__title" key={`${cardHeading.italic}-${cardHeading.regular}`}>
                                    <span className="buy-hero-poster-card__title-italic">{cardHeading.italic}</span>
                                    <span className="buy-hero-poster-card__title-regular">{cardHeading.regular}</span>
                                </h1>
                            </div>

                            {/* Inset Photo Window: Follows Drag of Mouse & Scroll in Direct Lockstep */}
                            <div
                                className={`buy-hero-poster-card__photo-frame ${isInteracting ? "is-dragging" : ""}`}
                                onMouseDown={handlePhotoMouseDown}
                                onTouchStart={handlePhotoTouchStart}
                                onClick={handlePhotoClick}
                                role="button"
                                tabIndex={0}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" || e.key === " ") {
                                        e.preventDefault();
                                        openPropertyDrawer(currentProp);
                                    }
                                }}
                                aria-label={`Explore details for ${currentProp?.name || "Property"}`}
                                title="Click & drag or scroll mouse wheel to change photo"
                            >
                                <div className="buy-hero-poster-card__photo-viewport">
                                    {currentProp && (
                                        <img
                                            src={currentProp.image}
                                            alt={currentProp.name}
                                            className="buy-hero-poster-card__photo is-active"
                                            style={{
                                                transform: `translateY(${dragProgress}%)`,
                                                transition: isInteracting ? "none" : "transform 0.48s cubic-bezier(0.16, 1, 0.3, 1)",
                                                zIndex: 1,
                                            }}
                                            draggable={false}
                                        />
                                    )}

                                    {dragProgress < 0 && nextProp && (
                                        <img
                                            src={nextProp.image}
                                            alt={nextProp.name}
                                            className="buy-hero-poster-card__photo is-incoming"
                                            style={{
                                                transform: `translateY(${100 + dragProgress}%)`,
                                                transition: isInteracting ? "none" : "transform 0.48s cubic-bezier(0.16, 1, 0.3, 1)",
                                                zIndex: 2,
                                            }}
                                            draggable={false}
                                        />
                                    )}

                                    {dragProgress > 0 && prevProp && (
                                        <img
                                            src={prevProp.image}
                                            alt={prevProp.name}
                                            className="buy-hero-poster-card__photo is-incoming"
                                            style={{
                                                transform: `translateY(${-100 + dragProgress}%)`,
                                                transition: isInteracting ? "none" : "transform 0.48s cubic-bezier(0.16, 1, 0.3, 1)",
                                                zIndex: 2,
                                            }}
                                            draggable={false}
                                        />
                                    )}
                                </div>

                                <div className="buy-hero-poster-card__explore-pill">
                                    <span>Explore more</span>
                                    <ArrowRight size={13} />
                                </div>
                            </div>

                            {/* Project Name & Subtitle with Lockstep Motion */}
                            <div className="buy-hero-poster-card__meta">
                                <div className="buy-hero-poster-card__meta-viewport">
                                    {currentProp && (
                                        <div
                                            className="buy-hero-poster-card__meta-content is-active"
                                            style={{
                                                opacity: Math.max(0, 1 - Math.abs(dragProgress) * 0.02),
                                                transform: `translateY(${dragProgress * 0.4}%)`,
                                                transition: isInteracting ? "none" : "all 0.48s cubic-bezier(0.16, 1, 0.3, 1)",
                                                zIndex: 1,
                                            }}
                                        >
                                            <h2 className="buy-hero-poster-card__name">{currentProp.name}</h2>
                                            <p className="buy-hero-poster-card__subtitle">{currentProp.subtitle}</p>
                                        </div>
                                    )}

                                    {dragProgress < 0 && nextProp && (
                                        <div
                                            className="buy-hero-poster-card__meta-content is-incoming"
                                            style={{
                                                opacity: Math.min(1, Math.abs(dragProgress) * 0.02),
                                                transform: `translateY(${100 + dragProgress * 0.4}%)`,
                                                transition: isInteracting ? "none" : "all 0.48s cubic-bezier(0.16, 1, 0.3, 1)",
                                                zIndex: 2,
                                            }}
                                        >
                                            <h2 className="buy-hero-poster-card__name">{nextProp.name}</h2>
                                            <p className="buy-hero-poster-card__subtitle">{nextProp.subtitle}</p>
                                        </div>
                                    )}

                                    {dragProgress > 0 && prevProp && (
                                        <div
                                            className="buy-hero-poster-card__meta-content is-incoming"
                                            style={{
                                                opacity: Math.min(1, Math.abs(dragProgress) * 0.02),
                                                transform: `translateY(${-100 + dragProgress * 0.4}%)`,
                                                transition: isInteracting ? "none" : "all 0.48s cubic-bezier(0.16, 1, 0.3, 1)",
                                                zIndex: 2,
                                            }}
                                        >
                                            <h2 className="buy-hero-poster-card__name">{prevProp.name}</h2>
                                            <p className="buy-hero-poster-card__subtitle">{prevProp.subtitle}</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Bottom Counter & Slide Controller */}
                            <div className="buy-hero-poster-card__footer">
                                <button
                                    type="button"
                                    className="buy-hero-poster-card__nav-btn"
                                    onClick={handlePrevSlide}
                                    aria-label="Previous property"
                                >
                                    <ChevronLeft size={15} />
                                </button>

                                <span className="buy-hero-poster-card__counter">
                                    {String(safeCurrentIdx + 1).padStart(2, "0")} / {String(totalSlides).padStart(2, "0")}
                                </span>

                                <button
                                    type="button"
                                    className="buy-hero-poster-card__nav-btn"
                                    onClick={handleNextSlide}
                                    aria-label="Next property"
                                >
                                    <ChevronRight size={15} />
                                </button>
                            </div>
                            <div className="buy-hero-poster-card__footer">
                                <button
                                    type="button"
                                    className="buy-hero-poster-card__nav-btn"
                                    onClick={handlePrevSlide}
                                    aria-label="Previous property"
                                >
                                    <ChevronLeft size={15} />
                                </button>

                                <span className="buy-hero-poster-card__counter">
                                    {String(currentSlide + 1).padStart(2, "0")} / {String(activeHeroProperties.length).padStart(2, "0")}
                                </span>

                                <button
                                    type="button"
                                    className="buy-hero-poster-card__nav-btn"
                                    onClick={handleNextSlide}
                                    aria-label="Next property"
                                >
                                    <ChevronRight size={15} />
                                </button>
                            </div>
                        </article>

                        {/* Subtle Scroll Down Pill to Listings */}
                        <a href="#listings" className="buy-hero-editorial__scroll-pill">
                            <span>Browse All Listings ({sourceProperties.length} Properties)</span>
                            <ChevronDown size={14} />
                        </a>
                    </div>

                    {/* Sliding Property Info Drawer (Matching Video Frame 00:15 - 00:17) */}
                    {isDrawerOpen && (
                        <div
                            className="buy-hero-drawer-backdrop"
                            onClick={closePropertyDrawer}
                            aria-hidden="true"
                        />
                    )}

                    <aside
                        className={`buy-hero-drawer ${isDrawerOpen ? "is-open" : ""}`}
                        aria-label="Property Information Drawer"
                        aria-hidden={!isDrawerOpen}
                    >
                        {drawerProperty && (
                            <>
                                {/* Drawer Header */}
                                <div className="buy-hero-drawer__header">
                                    <span className="buy-hero-drawer__label">PROPERTY INFO</span>
                                    <button
                                        type="button"
                                        className="buy-hero-drawer__close"
                                        onClick={closePropertyDrawer}
                                        aria-label="Close property info"
                                    >
                                        <X size={18} />
                                    </button>
                                </div>

                                {/* Landscape Photo Banner */}
                                <div className="buy-hero-drawer__banner">
                                    <img
                                        src={drawerProperty.image}
                                        alt={drawerProperty.name}
                                    />
                                    <span className="buy-hero-drawer__badge">
                                        {drawerProperty.badge || "Verified MahaRERA"}
                                    </span>
                                </div>

                                {/* Property Content */}
                                <div className="buy-hero-drawer__body">
                                    <div className="buy-hero-drawer__heading">
                                        <h3>{drawerProperty.name}</h3>
                                        <p className="buy-hero-drawer__byline">
                                            by {drawerProperty.developer} • {drawerProperty.location}
                                        </p>
                                    </div>

                                    {/* Specifications Grid matching video layout */}
                                    <div className="buy-hero-drawer__specs">
                                        <div className="buy-hero-drawer__spec-item buy-hero-drawer__spec-item--full">
                                            <span className="buy-hero-drawer__spec-label">ADDRESS</span>
                                            <span className="buy-hero-drawer__spec-val">{drawerProperty.address}</span>
                                        </div>

                                        <div className="buy-hero-drawer__spec-item">
                                            <span className="buy-hero-drawer__spec-label">NEIGHBORHOOD</span>
                                            <span className="buy-hero-drawer__spec-val">{drawerProperty.neighborhood}</span>
                                        </div>

                                        <div className="buy-hero-drawer__spec-item">
                                            <span className="buy-hero-drawer__spec-label">TYPE</span>
                                            <span className="buy-hero-drawer__spec-val">{drawerProperty.type}</span>
                                        </div>

                                        <div className="buy-hero-drawer__spec-item">
                                            <span className="buy-hero-drawer__spec-label">FLOORS</span>
                                            <span className="buy-hero-drawer__spec-val">{drawerProperty.floors}</span>
                                        </div>

                                        <div className="buy-hero-drawer__spec-item">
                                            <span className="buy-hero-drawer__spec-label">UNITS</span>
                                            <span className="buy-hero-drawer__spec-val">{drawerProperty.units}</span>
                                        </div>

                                        <div className="buy-hero-drawer__spec-item">
                                            <span className="buy-hero-drawer__spec-label">CONFIGURATION</span>
                                            <span className="buy-hero-drawer__spec-val">{drawerProperty.configuration}</span>
                                        </div>

                                        <div className="buy-hero-drawer__spec-item">
                                            <span className="buy-hero-drawer__spec-label">CARPET AREA</span>
                                            <span className="buy-hero-drawer__spec-val">{drawerProperty.area}</span>
                                        </div>

                                        <div className="buy-hero-drawer__spec-item">
                                            <span className="buy-hero-drawer__spec-label">YEAR / POSSESSION</span>
                                            <span className="buy-hero-drawer__spec-val">{drawerProperty.yearBuilt} ({drawerProperty.possession})</span>
                                        </div>

                                        <div className="buy-hero-drawer__spec-item">
                                            <span className="buy-hero-drawer__spec-label">MAHARERA</span>
                                            <span className="buy-hero-drawer__spec-val">{drawerProperty.rera}</span>
                                        </div>

                                        <div className="buy-hero-drawer__spec-item buy-hero-drawer__spec-item--full buy-hero-drawer__spec-item--price">
                                            <span className="buy-hero-drawer__spec-label">STARTING PRICE</span>
                                            <span className="buy-hero-drawer__spec-val-price">{drawerProperty.price}</span>
                                        </div>
                                    </div>

                                    {/* Action CTAs */}
                                    <div className="buy-hero-drawer__actions">
                                        <button
                                            type="button"
                                            className="buy-hero-drawer__btn buy-hero-drawer__btn--primary"
                                            onClick={handleExplorePropertyFromDrawer}
                                        >
                                            <span>Explore property</span>
                                            <ArrowRight size={15} />
                                        </button>

                                        <a
                                            href={`https://wa.me/919112233445?text=Hi%20PPI%2C%20I%20am%20interested%20in%20${encodeURIComponent(drawerProperty.name)}%20at%20${encodeURIComponent(drawerProperty.location)}.`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="buy-hero-drawer__btn buy-hero-drawer__btn--whatsapp"
                                        >
                                            <span>WhatsApp VIP Concierge</span>
                                        </a>
                                    </div>
                                </div>
                            </>
                        )}
                    </aside>
                </section>

                {/* Main listings area */}
                <section className="buy-properties-content" id="listings">
                    <div className="buy-properties-container">
                        {/* Intro and search */}
                        <div className="buy-properties-intro">
                            <div className="buy-properties-intro__text">
                                <span className="buy-properties-section-label">
                                    EXPLORE PROPERTIES
                                </span>

                                <h2>
                                    {pageTitle || "Properties for Sale in Pune"}
                                </h2>

                                <p>
                                    Discover verified apartments, penthouses, villas, and commercial spaces across Pune.
                                </p>
                            </div>

                            <div className="buy-properties-search-wrapper">
                                <form
                                    className="buy-properties-search"
                                    onSubmit={(event) => event.preventDefault()}
                                    role="search"
                                >
                                    <Search size={18} className="buy-properties-search__icon" />

                                    <input
                                        type="search"
                                        placeholder="Search location, builder, or project..."
                                        value={searchQuery}
                                        onChange={(event) =>
                                            setSearchQuery(event.target.value)
                                        }
                                        aria-label="Search properties by location or project"
                                    />

                                    {searchQuery && (
                                        <button
                                            type="button"
                                            onClick={() => setSearchQuery("")}
                                            aria-label="Clear search"
                                            className="buy-properties-search__clear"
                                        >
                                            <X size={15} />
                                        </button>
                                    )}
                                </form>
                            </div>
                        </div>

                        {/* Mobile Filter Trigger Bar (visible under 900px) */}
                        <div className="buy-properties-mobile-bar">
                            <button
                                type="button"
                                className="buy-properties-mobile-filter-btn"
                                onClick={() => setMobileFiltersOpen(true)}
                                aria-label="Open filter options"
                            >
                                <SlidersHorizontal size={17} />
                                <span>Filter Properties</span>
                                {activeFilterCount > 0 && (
                                    <span className="buy-properties-mobile-filter-badge">
                                        {activeFilterCount}
                                    </span>
                                )}
                            </button>

                            <div className="buy-properties-mobile-results-info">
                                <strong>{filteredProperties.length}</strong>{" "}
                                {filteredProperties.length === 1 ? "Property" : "Properties"} found
                            </div>
                        </div>

                        {/* Three-column layout */}
                        <div className="buy-properties-layout">
                            {/* Left: filters (desktop sticky sidebar / mobile slide drawer) */}
                            <div
                                className={`buy-properties-filter-column ${
                                    mobileFiltersOpen ? "is-mobile-open" : ""
                                }`}
                            >
                                {/* Mobile Drawer Backdrop */}
                                <div
                                    className="buy-properties-drawer-backdrop"
                                    onClick={() => setMobileFiltersOpen(false)}
                                    aria-hidden="true"
                                />

                                <div className="buy-properties-drawer-content">
                                    <PropertyFilters
                                        filters={filters}
                                        onFilterChange={handleFilterChange}
                                        onReset={handleResetFilters}
                                        resultCount={filteredProperties.length}
                                        onCloseMobile={() => setMobileFiltersOpen(false)}
                                    />
                                </div>
                            </div>

                            {/* Centre: listings */}
                            <div className="buy-properties-results">
                                <div className="buy-properties-results__header">
                                    <div>
                                        <h2>Available Properties</h2>
                                        <p>
                                            Showing{" "}
                                            <strong>
                                                {filteredProperties.length}
                                            </strong>{" "}
                                            {filteredProperties.length === 1
                                                ? "verified property"
                                                : "verified properties"}
                                        </p>
                                    </div>

                                    {(activeFilterCount > 0 || searchQuery) && (
                                        <button
                                            type="button"
                                            className="buy-properties-clear-button"
                                            onClick={handleResetFilters}
                                        >
                                            Clear all filters
                                        </button>
                                    )}
                                </div>

                                {filteredProperties.length > 0 ? (
                                    <div className="buy-properties-grid">
                                        {filteredProperties.map((property) => (
                                            <PropertyListingCard
                                                key={property.id}
                                                property={property}
                                            />
                                        ))}
                                    </div>
                                ) : (
                                    <div className="buy-properties-empty">
                                        <div className="buy-properties-empty__icon">
                                            <Search size={32} />
                                        </div>

                                        <h3>No matching properties found</h3>

                                        <p>
                                            We couldn&apos;t find any properties matching your current criteria.
                                            Try adjusting your locality, BHK preference, or budget filters.
                                        </p>

                                        <button
                                            type="button"
                                            onClick={handleResetFilters}
                                            className="buy-properties-empty__reset-btn"
                                        >
                                            <span>Reset All Filters</span>
                                            <ArrowRight size={16} />
                                        </button>
                                    </div>
                                )}

                                {/* Enquiry call to action */}
                                <div className="buy-properties-enquiry">
                                    <div className="buy-properties-enquiry__text">
                                        <span className="buy-properties-enquiry__eyebrow">
                                            NEED HELP FINDING A HOME?
                                        </span>

                                        <h3>
                                            Let our Pune property experts guide your search.
                                        </h3>

                                        <p>
                                            Share your requirements with our dedicated advisors and receive curated,
                                            verified property recommendations with zero brokerage on select new launches.
                                        </p>
                                    </div>

                                    <Link
                                        href="/contact"
                                        className="buy-properties-enquiry__button"
                                    >
                                        <span>Talk to an Expert</span>
                                        <ArrowRight size={17} />
                                    </Link>
                                </div>
                            </div>

                            {/* Right: advertisements */}
                            <aside className="buy-properties-ad-column">
                                <AdvertisementSidebar />
                            </aside>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}

export default function BuyProperties({ defaultPropertyType = "", pageTitle = "" }) {
    return <BuyPropertiesContent defaultPropertyType={defaultPropertyType} pageTitle={pageTitle} />;
}
