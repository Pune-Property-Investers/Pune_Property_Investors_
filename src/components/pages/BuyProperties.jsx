"use client";

import { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
    ArrowRight,
    Search,
    SlidersHorizontal,
    MapPin,
    Sparkles,
    ChevronRight,
    Home as HomeIcon,
    X,
} from "lucide-react";

import Header from "../layouts/Header";
import Footer from "../layouts/Footer";

import PropertyFilters from "../properties/PropertyFilters";
import PropertyListingCard from "../properties/PropertyListingCard";
import AdvertisementSidebar from "../common/AdvertisementSidebar";
import ScrollStoryProperties from "../home/ScrollStoryProperties";

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

const HERO_SLIDES = [
    {
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2000&q=85",
        location: "Baner & Balewadi",
        tag: "Premium Residences",
    },
    {
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85",
        location: "Koregaon Park & Kalyani Nagar",
        tag: "Luxury Villas & Estates",
    },
    {
        image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=85",
        location: "Kharadi & Viman Nagar",
        tag: "Modern Skyline Towers",
    },
    {
        image: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=2000&q=85",
        location: "Hinjewadi & Wakad",
        tag: "Smart Living Spaces",
    },
    {
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=2000&q=85",
        location: "Bavdhan & Kothrud",
        tag: "Scenic Green Gated Enclaves",
    },
];

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
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

    // Auto-advance hero photo slideshow
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
        }, 5500);

        return () => clearInterval(interval);
    }, []);

    // Lock body scroll when mobile filter drawer is open
    useEffect(() => {
        if (mobileFiltersOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [mobileFiltersOpen]);

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
                <section className="buy-properties-hero" aria-label="Buy Properties Hero">
                    {/* Crossfading Background Slides */}
                    <div className="buy-properties-hero__slides" aria-hidden="true">
                        {HERO_SLIDES.map((slide, index) => (
                            <div
                                key={index}
                                className={`buy-properties-hero__slide ${
                                    index === currentSlide ? "is-active" : ""
                                }`}
                                style={{ backgroundImage: `url(${slide.image})` }}
                            />
                        ))}
                    </div>

                    {/* Gradient Overlay for high visibility + clear text contrast */}
                    <div className="buy-properties-hero__overlay" aria-hidden="true" />

                    <div className="buy-properties-hero__content">
                        {/* Eyebrow badge */}
                        <div className="buy-properties-hero__eyebrow">
                            <Sparkles size={14} />
                            <span>CURATED PUNE PROPERTIES</span>
                        </div>

                        <h1>
                            Find a Property
                            <span> That Feels Like Home.</span>
                        </h1>

                        <p>
                            Explore premium residential, luxury villas, and smart investment
                            properties across Pune&apos;s prime and emerging hotspots.
                        </p>

                        <div className="buy-properties-hero__footer">
                            <div className="buy-properties-hero__breadcrumb">
                                <Link href="/" className="buy-properties-hero__breadcrumb-home">
                                    <HomeIcon size={13} />
                                    <span>Home</span>
                                </Link>
                                <ChevronRight size={13} className="buy-properties-hero__breadcrumb-sep" />
                                <span>Buy Properties</span>
                            </div>

                            {/* Slide indicators & active location indicator */}
                            <div className="buy-properties-hero__slide-controls">
                                <div className="buy-properties-hero__location-pill">
                                    <MapPin size={13} />
                                    <span>{HERO_SLIDES[currentSlide].location}</span>
                                    <span className="buy-properties-hero__pill-dot">•</span>
                                    <span className="buy-properties-hero__pill-tag">
                                        {HERO_SLIDES[currentSlide].tag}
                                    </span>
                                </div>

                                <div className="buy-properties-hero__dots" role="tablist" aria-label="Slides">
                                    {HERO_SLIDES.map((_, index) => (
                                        <button
                                            key={index}
                                            type="button"
                                            className={`buy-properties-hero__dot ${
                                                index === currentSlide ? "is-active" : ""
                                            }`}
                                            onClick={() => setCurrentSlide(index)}
                                            aria-label={`View slide ${index + 1}: ${HERO_SLIDES[index].location}`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Cinematic Scroll-Driven Storytelling Showcase */}
                <ScrollStoryProperties />

                {/* Main listings area */}
                <section className="buy-properties-content">
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
