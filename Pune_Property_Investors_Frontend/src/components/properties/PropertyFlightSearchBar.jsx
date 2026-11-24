"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import {
    Search,
    MapPin,
    ChevronDown,
    SlidersHorizontal,
    X,
    Building2,
    Home,
    Trees,
    Sparkles,
    Check,
    ArrowUpDown,
} from "lucide-react";
import "./PropertyFlightSearchBar.css";

const POPULAR_PUNE_LOCALITIES = [
    "All Pune",
    "Kharadi",
    "Baner",
    "Wakad",
    "Hinjewadi",
    "Koregaon Park",
    "Viman Nagar",
    "Hadapsar",
    "Kothrud",
    "Balewadi",
    "Bavdhan",
    "Aundh",
    "Pimple Saudagar",
    "Ravet",
    "Tathawade",
    "Undri",
    "Wagholi",
    "Dhanori",
    "Charholi",
];

const BHK_OPTIONS = [
    { label: "Any BHK", value: "all" },
    { label: "1 BHK", value: "1" },
    { label: "2 BHK", value: "2" },
    { label: "3 BHK", value: "3" },
    { label: "4 BHK", value: "4" },
    { label: "4+ BHK", value: "4+" },
];

const BUDGET_OPTIONS = [
    { label: "Any Budget", value: "" },
    { label: "Under ₹ 40 Lakh", value: "4000000" },
    { label: "Under ₹ 60 Lakh", value: "6000000" },
    { label: "Under ₹ 80 Lakh", value: "8000000" },
    { label: "Under ₹ 1 Crore", value: "10000000" },
    { label: "Under ₹ 1.5 Crore", value: "15000000" },
    { label: "Under ₹ 2 Crore", value: "20000000" },
    { label: "Under ₹ 3 Crore+", value: "30000000" },
];

const PROPERTY_TYPE_OPTIONS = [
    { label: "All Properties", value: "all" },
    { label: "Apartments & Flats", value: "Apartment" },
    { label: "Luxury Villas", value: "Villa" },
    { label: "Commercial Spaces", value: "Commercial" },
    { label: "Residential Plots", value: "Plot" },
    { label: "New Launches", value: "new-launch" },
];

const SORT_OPTIONS = [
    { label: "Recommended (Featured)", value: "recommended" },
    { label: "Price: Low to High", value: "price-low-high" },
    { label: "Price: High to Low", value: "price-high-low" },
];

export default function PropertyFlightSearchBar({
    filters = {},
    onFilterChange,
    searchQuery = "",
    onSearchQueryChange,
    onOpenFilterDrawer,
    totalResults = 0,
}) {
    const [activeDropdown, setActiveDropdown] = useState(null); // 'bhk' | 'price' | 'area' | 'type' | 'sort'
    const [areaSearch, setAreaSearch] = useState("");
    const barRef = useRef(null);
    const searchInputRef = useRef(null);

    // Close dropdown on outside click
    useEffect(() => {
        function handleClickOutside(e) {
            if (barRef.current && !barRef.current.contains(e.target)) {
                setActiveDropdown(null);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const selectedCategory = filters.propertyType || "all";
    const selectedBhk = filters.bhk || "all";
    const selectedLocation = filters.location || "all";
    const selectedMaxPrice = filters.maxPrice || "";
    const selectedSort = filters.sortBy || "recommended";

    const isNewProjectsActive =
        selectedCategory === "new-launch" ||
        String(selectedCategory).toLowerCase().includes("new");

    // Active filters count for purple badge
    const activeFilterCount = useMemo(() => {
        let count = 0;
        if (selectedLocation && selectedLocation !== "all") count++;
        if (selectedBhk && selectedBhk !== "all") count++;
        if (selectedCategory && selectedCategory !== "all") count++;
        if (selectedMaxPrice) count++;
        if (filters.minPrice) count++;
        return count;
    }, [selectedLocation, selectedBhk, selectedCategory, selectedMaxPrice, filters.minPrice]);

    const handleBhkClick = (bhkVal) => {
        onFilterChange("bhk", bhkVal);
        setActiveDropdown(null);
    };

    const handleLocationSelect = (loc) => {
        onFilterChange("location", loc === "All Pune" ? "all" : loc);
        setActiveDropdown(null);
    };

    const handleTypeSelect = (typeVal) => {
        onFilterChange("propertyType", typeVal);
        setActiveDropdown(null);
    };

    const handleBudgetSelect = (budgetVal) => {
        onFilterChange("maxPrice", budgetVal);
        setActiveDropdown(null);
    };

    const handleSortSelect = (sortVal) => {
        onFilterChange("sortBy", sortVal);
        setActiveDropdown(null);
    };

    const handleToggleNewProjects = () => {
        if (isNewProjectsActive) {
            onFilterChange("propertyType", "all");
        } else {
            onFilterChange("propertyType", "new-launch");
        }
    };

    // Chip labels
    const bhkChipLabel =
        selectedBhk === "all"
            ? "BHK"
            : `${selectedBhk} BHK`;

    const priceChipLabel =
        selectedMaxPrice === ""
            ? "Price"
            : BUDGET_OPTIONS.find((b) => b.value === selectedMaxPrice)?.label?.replace("Under ", "") ||
              `₹ ${Number(selectedMaxPrice) / 100000}L`;

    const areaChipLabel =
        selectedLocation === "all"
            ? "Area"
            : selectedLocation;

    // Filtered localities for Area popup
    const filteredLocalities = useMemo(() => {
        if (!areaSearch.trim()) return POPULAR_PUNE_LOCALITIES;
        const q = areaSearch.toLowerCase().trim();
        return POPULAR_PUNE_LOCALITIES.filter((l) => l.toLowerCase().includes(q));
    }, [areaSearch]);

    return (
        <div className="property-search-filter-wrapper" ref={barRef}>
            {/* 1. MAIN SEARCH BAR (Matches Screenshot 1) */}
            <div className="property-search-bar-row">
                <div className="property-search-bar-input-box">
                    <Search size={18} className="property-search-bar__icon" />
                    <input
                        ref={searchInputRef}
                        type="text"
                        placeholder="Search location, builder, or project..."
                        value={searchQuery}
                        onChange={(e) => onSearchQueryChange(e.target.value)}
                        className="property-search-bar__input"
                        aria-label="Search location, builder, or project"
                    />
                    {searchQuery && (
                        <button
                            type="button"
                            onClick={() => onSearchQueryChange("")}
                            className="property-search-bar__clear"
                            aria-label="Clear search"
                        >
                            <X size={15} />
                        </button>
                    )}
                </div>

                <div className="property-search-results-pill">
                    <strong>{totalResults}</strong> properties
                </div>
            </div>

            {/* 2. QUICK FILTER CHIPS ROW DIRECTLY BELOW (Matches Screenshot 2: BHK ▾, Price ▾, Area ▾, New Projects, Filters, ⇅) */}
            <div className="property-filter-chips-row">
                {/* CHIP 1: BHK ▾ */}
                <div className="property-chip-anchor">
                    <button
                        type="button"
                        className={`property-chip-btn ${selectedBhk !== "all" ? "is-selected" : ""} ${
                            activeDropdown === "bhk" ? "is-active" : ""
                        }`}
                        onClick={() =>
                            setActiveDropdown((prev) => (prev === "bhk" ? null : "bhk"))
                        }
                    >
                        <span>{bhkChipLabel}</span>
                        <ChevronDown size={13} className="property-chip-chevron" />
                    </button>

                    {activeDropdown === "bhk" && (
                        <div className="property-chip-menu">
                            <div className="property-chip-menu__header">Select Configuration</div>
                            {BHK_OPTIONS.map((bhk) => (
                                <button
                                    key={bhk.value}
                                    type="button"
                                    className={`property-chip-menu__item ${
                                        selectedBhk === bhk.value ? "is-active" : ""
                                    }`}
                                    onClick={() => handleBhkClick(bhk.value)}
                                >
                                    <span>{bhk.label}</span>
                                    {selectedBhk === bhk.value && (
                                        <Check size={14} className="property-check-icon" />
                                    )}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* CHIP 2: Price ▾ */}
                <div className="property-chip-anchor">
                    <button
                        type="button"
                        className={`property-chip-btn ${selectedMaxPrice ? "is-selected" : ""} ${
                            activeDropdown === "price" ? "is-active" : ""
                        }`}
                        onClick={() =>
                            setActiveDropdown((prev) => (prev === "price" ? null : "price"))
                        }
                    >
                        <span>{priceChipLabel}</span>
                        <ChevronDown size={13} className="property-chip-chevron" />
                    </button>

                    {activeDropdown === "price" && (
                        <div className="property-chip-menu">
                            <div className="property-chip-menu__header">Maximum Budget</div>
                            {BUDGET_OPTIONS.map((opt) => (
                                <button
                                    key={opt.value}
                                    type="button"
                                    className={`property-chip-menu__item ${
                                        selectedMaxPrice === opt.value ? "is-active" : ""
                                    }`}
                                    onClick={() => handleBudgetSelect(opt.value)}
                                >
                                    <span>{opt.label}</span>
                                    {selectedMaxPrice === opt.value && (
                                        <Check size={14} className="property-check-icon" />
                                    )}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* CHIP 3: Area ▾ (Locality in Pune) */}
                <div className="property-chip-anchor">
                    <button
                        type="button"
                        className={`property-chip-btn ${selectedLocation !== "all" ? "is-selected" : ""} ${
                            activeDropdown === "area" ? "is-active" : ""
                        }`}
                        onClick={() =>
                            setActiveDropdown((prev) => (prev === "area" ? null : "area"))
                        }
                    >
                        <span>{areaChipLabel}</span>
                        <ChevronDown size={13} className="property-chip-chevron" />
                    </button>

                    {activeDropdown === "area" && (
                        <div className="property-chip-menu property-chip-menu--wide">
                            <div className="property-chip-search-box">
                                <Search size={13} className="property-chip-search-icon" />
                                <input
                                    type="text"
                                    placeholder="Search locality..."
                                    value={areaSearch}
                                    onChange={(e) => setAreaSearch(e.target.value)}
                                    className="property-chip-search-input"
                                    autoFocus
                                />
                            </div>
                            <div className="property-chip-menu__list">
                                {filteredLocalities.map((loc) => (
                                    <button
                                        key={loc}
                                        type="button"
                                        className={`property-chip-menu__item ${
                                            (loc === "All Pune" && selectedLocation === "all") ||
                                            loc === selectedLocation
                                                ? "is-active"
                                                : ""
                                        }`}
                                        onClick={() => {
                                            handleLocationSelect(loc);
                                            setAreaSearch("");
                                        }}
                                    >
                                        <span>{loc}</span>
                                        {((loc === "All Pune" && selectedLocation === "all") ||
                                            loc === selectedLocation) && (
                                            <Check size={14} className="property-check-icon" />
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* CHIP 4: Property Type ▾ (Optional extra helper chip) */}
                <div className="property-chip-anchor">
                    <button
                        type="button"
                        className={`property-chip-btn ${
                            selectedCategory !== "all" && !isNewProjectsActive ? "is-selected" : ""
                        } ${activeDropdown === "type" ? "is-active" : ""}`}
                        onClick={() =>
                            setActiveDropdown((prev) => (prev === "type" ? null : "type"))
                        }
                    >
                        <span>
                            {selectedCategory === "all" || isNewProjectsActive
                                ? "Property Type"
                                : selectedCategory}
                        </span>
                        <ChevronDown size={13} className="property-chip-chevron" />
                    </button>

                    {activeDropdown === "type" && (
                        <div className="property-chip-menu">
                            <div className="property-chip-menu__header">Property Type</div>
                            {PROPERTY_TYPE_OPTIONS.map((opt) => (
                                <button
                                    key={opt.value}
                                    type="button"
                                    className={`property-chip-menu__item ${
                                        selectedCategory === opt.value ? "is-active" : ""
                                    }`}
                                    onClick={() => handleTypeSelect(opt.value)}
                                >
                                    <span>{opt.label}</span>
                                    {selectedCategory === opt.value && (
                                        <Check size={14} className="property-check-icon" />
                                    )}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* CHIP 5: New Projects (Toggle chip from Screenshot 2) */}
                <button
                    type="button"
                    className={`property-chip-btn property-chip-btn--toggle ${
                        isNewProjectsActive ? "is-selected" : ""
                    }`}
                    onClick={handleToggleNewProjects}
                    title="Filter new launch projects"
                >
                    <span className="property-chip-bullet">✦</span>
                    <span>New Projects</span>
                </button>

                {/* CHIP 6: Filters (Soft Lavender / Purple Pill from Screenshot 2) */}
                <button
                    type="button"
                    className="property-chip-btn property-chip-btn--purple"
                    onClick={onOpenFilterDrawer}
                    aria-label="Open advanced property filters"
                >
                    <SlidersHorizontal size={13} />
                    <span>Filters</span>
                    {activeFilterCount > 0 && (
                        <span className="property-chip-purple-count">{activeFilterCount}</span>
                    )}
                </button>

                {/* CHIP 7: Sort ⇅ (Sort button from Screenshot 2) */}
                <div className="property-chip-anchor">
                    <button
                        type="button"
                        className={`property-chip-btn property-chip-btn--icon ${
                            selectedSort !== "recommended" ? "is-selected" : ""
                        } ${activeDropdown === "sort" ? "is-active" : ""}`}
                        onClick={() =>
                            setActiveDropdown((prev) => (prev === "sort" ? null : "sort"))
                        }
                        title="Sort Properties"
                        aria-label="Sort Properties"
                    >
                        <ArrowUpDown size={14} />
                    </button>

                    {activeDropdown === "sort" && (
                        <div className="property-chip-menu property-chip-menu--right">
                            <div className="property-chip-menu__header">Sort Properties</div>
                            {SORT_OPTIONS.map((opt) => (
                                <button
                                    key={opt.value}
                                    type="button"
                                    className={`property-chip-menu__item ${
                                        selectedSort === opt.value ? "is-active" : ""
                                    }`}
                                    onClick={() => handleSortSelect(opt.value)}
                                >
                                    <span>{opt.label}</span>
                                    {selectedSort === opt.value && (
                                        <Check size={14} className="property-check-icon" />
                                    )}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

