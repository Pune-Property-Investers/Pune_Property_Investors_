"use client";

import { useState, useMemo } from "react";
import {
    SlidersHorizontal,
    RotateCcw,
    MapPin,
    BedDouble,
    IndianRupee,
    Building2,
    Building,
    ArrowDownUp,
    Search,
    ChevronDown,
    X,
    Check,
} from "lucide-react";
import "./PropertyFilters.css";

const PUNE_LOCALITIES = [
    "Aundh",
    "Balewadi",
    "Baner",
    "Bavdhan",
    "Charholi",
    "Dhanori",
    "Gahunje",
    "Hadapsar",
    "Hinjewadi",
    "Kalyani Nagar",
    "Kharadi",
    "Koregaon Park",
    "Kothrud",
    "Magarpatta",
    "Mahalunge",
    "Manjari",
    "Moshi",
    "NIBM",
    "Pimple Saudagar",
    "Pirangut",
    "Punawale",
    "Ravet",
    "Shirwal",
    "Tathawade",
    "Undri",
    "Viman Nagar",
    "Wakad",
    "Wagholi",
];

const BHK_OPTIONS = [
    { label: "Any BHK", value: "all" },
    { label: "1 BHK", value: "1" },
    { label: "2 BHK", value: "2" },
    { label: "3 BHK", value: "3" },
    { label: "4 BHK", value: "4" },
    { label: "4+ BHK", value: "4+" },
];

const PROPERTY_TYPES = [
    { label: "All Types", value: "all" },
    { label: "Apartments & Flats", value: "Apartment" },
    { label: "Commercial Office / Retail", value: "Commercial" },
    { label: "Plots & Land", value: "Plot" },
    { label: "New Launches", value: "new-launch" },
    { label: "Villas & Penthouses", value: "Villa" },
];

const BUDGET_OPTIONS = [
    { label: "Min Budget", value: "" },
    { label: "₹ 25 Lakh", value: "2500000" },
    { label: "₹ 40 Lakh", value: "4000000" },
    { label: "₹ 60 Lakh", value: "6000000" },
    { label: "₹ 80 Lakh", value: "8000000" },
    { label: "₹ 1 Crore", value: "10000000" },
    { label: "₹ 1.5 Crore", value: "15000000" },
    { label: "₹ 2 Crore", value: "20000000" },
    { label: "₹ 3 Crore", value: "30000000" },
    { label: "₹ 5 Crore", value: "50000000" },
    { label: "₹ 10 Crore+", value: "100000000" },
];

const MAX_BUDGET_OPTIONS = [
    { label: "Max Budget", value: "" },
    { label: "₹ 50 Lakh", value: "5000000" },
    { label: "₹ 75 Lakh", value: "7500000" },
    { label: "₹ 1 Crore", value: "10000000" },
    { label: "₹ 1.5 Crore", value: "15000000" },
    { label: "₹ 2 Crore", value: "20000000" },
    { label: "₹ 3 Crore", value: "30000000" },
    { label: "₹ 5 Crore", value: "50000000" },
    { label: "₹ 10 Crore+", value: "100000000" },
];

function PropertyFilters({
    filters,
    onFilterChange,
    onReset,
    resultCount,
    onCloseMobile,
    properties = [],
    searchQuery = "",
    onSearchQueryChange,
}) {
    // Dropdown open states - all hidden by default
    const [openSections, setOpenSections] = useState({
        location: false,
        project: false,
        bhk: false,
        propertyType: false,
    });

    // Search input values for each dropdown
    const [locationSearch, setLocationSearch] = useState("");
    const [projectSearch, setProjectSearch] = useState("");
    const [bhkSearch, setBhkSearch] = useState("");
    const [typeSearch, setTypeSearch] = useState("");

    const toggleSection = (section) => {
        setOpenSections((prev) => ({
            ...prev,
            [section]: !prev[section],
        }));
    };

    const handleChange = (key, value) => {
        onFilterChange(key, value);
    };

    // Calculate dynamic counts of properties per locality
    const locationCounts = useMemo(() => {
        const counts = {};
        properties.forEach((p) => {
            const loc = (p.locality || p.location || "").split(",")[0].trim();
            if (loc) {
                const key = loc.toLowerCase();
                counts[key] = (counts[key] || 0) + 1;
            }
        });
        return counts;
    }, [properties]);

    // Calculate dynamic counts of properties per BHK
    const bhkCounts = useMemo(() => {
        const counts = { all: properties.length };
        properties.forEach((p) => {
            const bedrooms = Number(p.bedrooms ?? p.bhk ?? 0);
            if (bedrooms >= 4) {
                counts["4+"] = (counts["4+"] || 0) + 1;
            }
            if (bedrooms > 0) {
                counts[String(bedrooms)] = (counts[String(bedrooms)] || 0) + 1;
            }
        });
        return counts;
    }, [properties]);

    // Calculate dynamic counts of properties per type
    const typeCounts = useMemo(() => {
        const counts = { all: properties.length };
        properties.forEach((p) => {
            const type = (p.propertyType || "").toLowerCase();
            PROPERTY_TYPES.forEach((pt) => {
                if (pt.value === "all") return;
                const target = pt.value.toLowerCase();
                if (type.includes(target)) {
                    counts[pt.value] = (counts[pt.value] || 0) + 1;
                }
            });
        });
        return counts;
    }, [properties]);

    // Merge predefined Pune localities with any dynamic ones from dataset
    const allLocations = useMemo(() => {
        const set = new Set(PUNE_LOCALITIES);
        properties.forEach((p) => {
            const loc = (p.locality || p.location || "").split(",")[0].trim();
            if (loc) set.add(loc);
        });
        return Array.from(set).sort((a, b) => a.localeCompare(b));
    }, [properties]);

    // Filter location list based on the search query
    const filteredLocations = useMemo(() => {
        if (!locationSearch.trim()) return allLocations;
        const q = locationSearch.toLowerCase().trim();
        return allLocations.filter((loc) => loc.toLowerCase().includes(q));
    }, [allLocations, locationSearch]);

    // Dynamic list of projects / societies
    const allProjects = useMemo(() => {
        const projectMap = new Map();
        properties.forEach((p) => {
            const name = p.projectName || p.name;
            if (name && !projectMap.has(name.toLowerCase())) {
                projectMap.set(name.toLowerCase(), {
                    name,
                    locality: (p.locality || p.location || "").split(",")[0].trim(),
                });
            }
        });
        return Array.from(projectMap.values()).sort((a, b) =>
            a.name.localeCompare(b.name)
        );
    }, [properties]);

    // Filter project list based on project search input
    const filteredProjects = useMemo(() => {
        if (!projectSearch.trim()) return allProjects;
        const q = projectSearch.toLowerCase().trim();
        return allProjects.filter(
            (p) =>
                p.name.toLowerCase().includes(q) ||
                p.locality.toLowerCase().includes(q)
        );
    }, [allProjects, projectSearch]);

    // Filter BHK options based on BHK search input
    const filteredBhkOptions = useMemo(() => {
        if (!bhkSearch.trim()) return BHK_OPTIONS;
        const q = bhkSearch.toLowerCase().trim();
        return BHK_OPTIONS.filter((opt) => opt.label.toLowerCase().includes(q));
    }, [bhkSearch]);

    // Filter property types based on type search input
    const filteredPropertyTypes = useMemo(() => {
        if (!typeSearch.trim()) return PROPERTY_TYPES;
        const q = typeSearch.toLowerCase().trim();
        return PROPERTY_TYPES.filter((t) => t.label.toLowerCase().includes(q));
    }, [typeSearch]);

    const handleResetAll = () => {
        setLocationSearch("");
        setProjectSearch("");
        setBhkSearch("");
        setTypeSearch("");
        setOpenSections({
            location: false,
            project: false,
            bhk: false,
            propertyType: false,
        });
        onReset();
    };

    const isLocationSelected = filters.location && filters.location !== "all";
    const selectedBhkLabel =
        BHK_OPTIONS.find((b) => b.value === filters.bhk)?.label || "Any BHK";
    const selectedTypeLabel =
        PROPERTY_TYPES.find((t) => t.value === filters.propertyType)?.label ||
        "All Types";

    return (
        <aside className="property-filters" aria-label="Property Search Filters">
            {/* Filter heading */}
            <div className="property-filters__header">
                <div className="property-filters__heading">
                    <SlidersHorizontal size={18} />
                    <div>
                        <h2>Filters</h2>
                        <p>Search & filter properties</p>
                    </div>
                </div>

                <div className="property-filters__header-actions">
                    <button
                        type="button"
                        className="property-filters__reset"
                        onClick={handleResetAll}
                        aria-label="Reset all filters"
                        title="Reset All Filters"
                    >
                        <RotateCcw size={13} />
                        <span>Reset</span>
                    </button>

                    {onCloseMobile && (
                        <button
                            type="button"
                            className="property-filters__close-btn"
                            onClick={onCloseMobile}
                            aria-label="Close filters"
                        >
                            <X size={20} />
                        </button>
                    )}
                </div>
            </div>

            {/* Results count badge */}
            <div className="property-filters__count-badge">
                <span className="property-filters__count-dot" />
                <span className="property-filters__count-number">{resultCount}</span>
                <span className="property-filters__count-text">
                    {resultCount === 1 ? "Property Available" : "Properties Available"}
                </span>
            </div>

            <div className="property-filters__body">
                {/* 1. Location Filter: Search Box with Scroll-down List (Hidden by default) */}
                <div className="property-filters__group">
                    <div className="property-filters__group-header">
                        <label className="property-filters__label">
                            <MapPin size={15} />
                            <span>Location in Pune</span>
                        </label>
                        {isLocationSelected && (
                            <button
                                type="button"
                                className="property-filters__clear-chip"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleChange("location", "all");
                                }}
                                title="Clear location filter"
                            >
                                <span>{filters.location}</span>
                                <X size={12} />
                            </button>
                        )}
                    </div>

                    <div className="property-filters__dropdown-container">
                        <button
                            type="button"
                            className={`property-filters__dropdown-trigger ${
                                openSections.location ? "is-open" : ""
                            } ${isLocationSelected ? "has-value" : ""}`}
                            onClick={() => toggleSection("location")}
                            aria-expanded={openSections.location}
                        >
                            <div className="property-filters__trigger-content">
                                <MapPin size={14} className="property-filters__trigger-icon" />
                                <span className="property-filters__trigger-text">
                                    {isLocationSelected ? filters.location : "All Pune"}
                                </span>
                            </div>
                            <ChevronDown
                                size={14}
                                className={`property-filters__trigger-chevron ${
                                    openSections.location ? "is-open" : ""
                                }`}
                            />
                        </button>

                        {/* Options hidden by default, shown when open */}
                        {openSections.location && (
                            <div className="property-filters__dropdown-body">
                                <div className="property-filters__search-input-wrapper">
                                    <Search size={14} className="property-filters__search-icon" />
                                    <input
                                        type="text"
                                        className="property-filters__search-input"
                                        placeholder="Search Pune location..."
                                        value={locationSearch}
                                        onChange={(e) => setLocationSearch(e.target.value)}
                                        autoFocus
                                        aria-label="Search location in Pune"
                                    />
                                    {locationSearch && (
                                        <button
                                            type="button"
                                            className="property-filters__search-clear"
                                            onClick={() => setLocationSearch("")}
                                            aria-label="Clear location input"
                                        >
                                            <X size={13} />
                                        </button>
                                    )}
                                </div>

                                <div className="property-filters__scroll-list" role="listbox">
                                    <button
                                        type="button"
                                        className={`property-filters__list-item ${
                                            filters.location === "all" ? "is-selected" : ""
                                        }`}
                                        onClick={() => {
                                            handleChange("location", "all");
                                            toggleSection("location");
                                        }}
                                    >
                                        <span className="property-filters__item-text">All Pune</span>
                                        <span className="property-filters__item-badge">
                                            {properties.length}
                                        </span>
                                        {filters.location === "all" && <Check size={14} />}
                                    </button>

                                    {filteredLocations.map((item) => {
                                        const count = locationCounts[item.toLowerCase()] || 0;
                                        const isSelected =
                                            filters.location.toLowerCase() === item.toLowerCase();

                                        return (
                                            <button
                                                type="button"
                                                key={item}
                                                className={`property-filters__list-item ${
                                                    isSelected ? "is-selected" : ""
                                                }`}
                                                onClick={() => {
                                                    handleChange("location", item);
                                                    toggleSection("location");
                                                }}
                                            >
                                                <span className="property-filters__item-text">
                                                    {item}
                                                </span>
                                                {count > 0 ? (
                                                    <span className="property-filters__item-badge">
                                                        {count}
                                                    </span>
                                                ) : (
                                                    <span className="property-filters__item-badge is-muted">
                                                        0
                                                    </span>
                                                )}
                                                {isSelected && <Check size={14} />}
                                            </button>
                                        );
                                    })}

                                    {filteredLocations.length === 0 && (
                                        <div className="property-filters__empty-message">
                                            No location matches &ldquo;{locationSearch}&rdquo;
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* 2. BHK Configuration: Search Box with Scroll-down List (Hidden by default) */}
                <div className="property-filters__group">
                    <div className="property-filters__group-header">
                        <label className="property-filters__label">
                            <BedDouble size={15} />
                            <span>BHK Configuration</span>
                        </label>
                        {filters.bhk !== "all" && (
                            <button
                                type="button"
                                className="property-filters__clear-chip"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleChange("bhk", "all");
                                }}
                                title="Clear BHK filter"
                            >
                                <span>{selectedBhkLabel}</span>
                                <X size={12} />
                            </button>
                        )}
                    </div>

                    <div className="property-filters__dropdown-container">
                        <button
                            type="button"
                            className={`property-filters__dropdown-trigger ${
                                openSections.bhk ? "is-open" : ""
                            } ${filters.bhk !== "all" ? "has-value" : ""}`}
                            onClick={() => toggleSection("bhk")}
                            aria-expanded={openSections.bhk}
                        >
                            <div className="property-filters__trigger-content">
                                <BedDouble size={14} className="property-filters__trigger-icon" />
                                <span className="property-filters__trigger-text">
                                    {selectedBhkLabel}
                                </span>
                            </div>
                            <ChevronDown
                                size={14}
                                className={`property-filters__trigger-chevron ${
                                    openSections.bhk ? "is-open" : ""
                                }`}
                            />
                        </button>

                        {/* Options hidden by default, shown when open */}
                        {openSections.bhk && (
                            <div className="property-filters__dropdown-body">
                                <div className="property-filters__search-input-wrapper">
                                    <Search size={14} className="property-filters__search-icon" />
                                    <input
                                        type="text"
                                        className="property-filters__search-input"
                                        placeholder="Search BHK (e.g. 2 BHK, 3 BHK)..."
                                        value={bhkSearch}
                                        onChange={(e) => setBhkSearch(e.target.value)}
                                        autoFocus
                                        aria-label="Search BHK configuration"
                                    />
                                    {bhkSearch && (
                                        <button
                                            type="button"
                                            className="property-filters__search-clear"
                                            onClick={() => setBhkSearch("")}
                                            aria-label="Clear BHK input"
                                        >
                                            <X size={13} />
                                        </button>
                                    )}
                                </div>

                                <div className="property-filters__scroll-list" role="listbox">
                                    {filteredBhkOptions.map((item) => {
                                        const isSelected = filters.bhk === item.value;
                                        const count = bhkCounts[item.value];

                                        return (
                                            <button
                                                type="button"
                                                key={item.value}
                                                className={`property-filters__list-item ${
                                                    isSelected ? "is-selected" : ""
                                                }`}
                                                onClick={() => {
                                                    handleChange("bhk", item.value);
                                                    toggleSection("bhk");
                                                }}
                                            >
                                                <span className="property-filters__item-text">
                                                    {item.label}
                                                </span>
                                                {count !== undefined && (
                                                    <span className="property-filters__item-badge">
                                                        {count}
                                                    </span>
                                                )}
                                                {isSelected && <Check size={14} />}
                                            </button>
                                        );
                                    })}

                                    {filteredBhkOptions.length === 0 && (
                                        <div className="property-filters__empty-message">
                                            No BHK matches &ldquo;{bhkSearch}&rdquo;
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* 3. Project / Society Search Box with Scroll-down List (Hidden by default) */}
                {onSearchQueryChange && allProjects.length > 0 && (
                    <div className="property-filters__group">
                        <div className="property-filters__group-header">
                            <label className="property-filters__label">
                                <Building size={15} />
                                <span>Project or Society</span>
                            </label>
                            {searchQuery && (
                                <button
                                    type="button"
                                    className="property-filters__clear-chip"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onSearchQueryChange("");
                                    }}
                                    title="Clear project search"
                                >
                                    <span>{searchQuery}</span>
                                    <X size={12} />
                                </button>
                            )}
                        </div>

                        <div className="property-filters__dropdown-container">
                            <button
                                type="button"
                                className={`property-filters__dropdown-trigger ${
                                    openSections.project ? "is-open" : ""
                                } ${searchQuery ? "has-value" : ""}`}
                                onClick={() => toggleSection("project")}
                                aria-expanded={openSections.project}
                            >
                                <div className="property-filters__trigger-content">
                                    <Building size={14} className="property-filters__trigger-icon" />
                                    <span className="property-filters__trigger-text">
                                        {searchQuery || "All Projects"}
                                    </span>
                                </div>
                                <ChevronDown
                                    size={14}
                                    className={`property-filters__trigger-chevron ${
                                        openSections.project ? "is-open" : ""
                                    }`}
                                />
                            </button>

                            {/* Options hidden by default, shown when open */}
                            {openSections.project && (
                                <div className="property-filters__dropdown-body">
                                    <div className="property-filters__search-input-wrapper">
                                        <Search size={14} className="property-filters__search-icon" />
                                        <input
                                            type="text"
                                            className="property-filters__search-input"
                                            placeholder="Search project or builder..."
                                            value={projectSearch}
                                            onChange={(e) => setProjectSearch(e.target.value)}
                                            autoFocus
                                            aria-label="Search project or builder"
                                        />
                                        {projectSearch && (
                                            <button
                                                type="button"
                                                className="property-filters__search-clear"
                                                onClick={() => setProjectSearch("")}
                                                aria-label="Clear project input"
                                            >
                                                <X size={13} />
                                            </button>
                                        )}
                                    </div>

                                    <div className="property-filters__scroll-list" role="listbox">
                                        <button
                                            type="button"
                                            className={`property-filters__list-item ${
                                                !searchQuery ? "is-selected" : ""
                                            }`}
                                            onClick={() => {
                                                onSearchQueryChange("");
                                                toggleSection("project");
                                            }}
                                        >
                                            <span className="property-filters__item-text">
                                                All Projects
                                            </span>
                                            {!searchQuery && <Check size={14} />}
                                        </button>

                                        {filteredProjects.map((p) => {
                                            const isSelected =
                                                searchQuery.toLowerCase().trim() ===
                                                p.name.toLowerCase().trim();

                                            return (
                                                <button
                                                    type="button"
                                                    key={p.name}
                                                    className={`property-filters__list-item ${
                                                        isSelected ? "is-selected" : ""
                                                    }`}
                                                    onClick={() => {
                                                        onSearchQueryChange(p.name);
                                                        toggleSection("project");
                                                    }}
                                                >
                                                    <span className="property-filters__item-text">
                                                        {p.name}
                                                    </span>
                                                    {p.locality && (
                                                        <span className="property-filters__item-sub">
                                                            {p.locality}
                                                        </span>
                                                    )}
                                                    {isSelected && <Check size={14} />}
                                                </button>
                                            );
                                        })}

                                        {filteredProjects.length === 0 && (
                                            <div className="property-filters__empty-message">
                                                No project matches &ldquo;{projectSearch}&rdquo;
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* 4. Budget Range with Scroll-down Selection & Presets */}
                <div className="property-filters__group">
                    <label className="property-filters__label">
                        <IndianRupee size={15} />
                        <span>Budget Range (INR)</span>
                    </label>

                    <div className="property-filters__price-row">
                        <div className="property-filters__select-wrapper property-filters__price-select">
                            <select
                                value={filters.minPrice}
                                onChange={(e) => handleChange("minPrice", e.target.value)}
                                className="property-filters__select"
                                aria-label="Minimum budget"
                            >
                                {BUDGET_OPTIONS.map((opt) => (
                                    <option key={opt.label} value={opt.value}>
                                        {opt.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <span className="property-filters__price-to">to</span>

                        <div className="property-filters__select-wrapper property-filters__price-select">
                            <select
                                value={filters.maxPrice}
                                onChange={(e) => handleChange("maxPrice", e.target.value)}
                                className="property-filters__select"
                                aria-label="Maximum budget"
                            >
                                {MAX_BUDGET_OPTIONS.map((opt) => (
                                    <option key={opt.label} value={opt.value}>
                                        {opt.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Quick budget presets */}
                    <div className="property-filters__chips property-filters__budget-chips">
                        {[
                            { label: "< 60L", min: "", max: "6000000" },
                            { label: "60L - 1 Cr", min: "6000000", max: "10000000" },
                            { label: "1 Cr - 1.5 Cr", min: "10000000", max: "15000000" },
                            { label: "> 1.5 Cr", min: "15000000", max: "" },
                        ].map((preset) => {
                            const isPresetActive =
                                String(filters.minPrice || "") === String(preset.min) &&
                                String(filters.maxPrice || "") === String(preset.max);
                            return (
                                <button
                                    type="button"
                                    key={preset.label}
                                    className={`property-filters__chip ${
                                        isPresetActive ? "is-selected" : ""
                                    }`}
                                    onClick={() => {
                                        handleChange("minPrice", preset.min);
                                        handleChange("maxPrice", preset.max);
                                    }}
                                >
                                    {preset.label}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* 5. Property Type Search Box with Scroll-down List (Hidden by default) */}
                <div className="property-filters__group">
                    <div className="property-filters__group-header">
                        <label className="property-filters__label">
                            <Building2 size={15} />
                            <span>Property Type</span>
                        </label>
                        {filters.propertyType !== "all" && (
                            <button
                                type="button"
                                className="property-filters__clear-chip"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleChange("propertyType", "all");
                                }}
                                title="Clear property type"
                            >
                                <span>{selectedTypeLabel}</span>
                                <X size={12} />
                            </button>
                        )}
                    </div>

                    <div className="property-filters__dropdown-container">
                        <button
                            type="button"
                            className={`property-filters__dropdown-trigger ${
                                openSections.propertyType ? "is-open" : ""
                            } ${filters.propertyType !== "all" ? "has-value" : ""}`}
                            onClick={() => toggleSection("propertyType")}
                            aria-expanded={openSections.propertyType}
                        >
                            <div className="property-filters__trigger-content">
                                <Building2 size={14} className="property-filters__trigger-icon" />
                                <span className="property-filters__trigger-text">
                                    {selectedTypeLabel}
                                </span>
                            </div>
                            <ChevronDown
                                size={14}
                                className={`property-filters__trigger-chevron ${
                                    openSections.propertyType ? "is-open" : ""
                                }`}
                            />
                        </button>

                        {/* Options hidden by default, shown when open */}
                        {openSections.propertyType && (
                            <div className="property-filters__dropdown-body">
                                <div className="property-filters__search-input-wrapper">
                                    <Search size={14} className="property-filters__search-icon" />
                                    <input
                                        type="text"
                                        className="property-filters__search-input"
                                        placeholder="Search property type..."
                                        value={typeSearch}
                                        onChange={(e) => setTypeSearch(e.target.value)}
                                        autoFocus
                                        aria-label="Search property type"
                                    />
                                    {typeSearch && (
                                        <button
                                            type="button"
                                            className="property-filters__search-clear"
                                            onClick={() => setTypeSearch("")}
                                            aria-label="Clear property type input"
                                        >
                                            <X size={13} />
                                        </button>
                                    )}
                                </div>

                                <div className="property-filters__scroll-list" role="listbox">
                                    {filteredPropertyTypes.map((item) => {
                                        const isSelected = filters.propertyType === item.value;
                                        const count = typeCounts[item.value];

                                        return (
                                            <button
                                                type="button"
                                                key={item.value}
                                                className={`property-filters__list-item ${
                                                    isSelected ? "is-selected" : ""
                                                }`}
                                                onClick={() => {
                                                    handleChange("propertyType", item.value);
                                                    toggleSection("propertyType");
                                                }}
                                            >
                                                <span className="property-filters__item-text">
                                                    {item.label}
                                                </span>
                                                {count !== undefined && (
                                                    <span className="property-filters__item-badge">
                                                        {count}
                                                    </span>
                                                )}
                                                {isSelected && <Check size={14} />}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* 6. Sort order */}
                <div className="property-filters__group">
                    <label
                        className="property-filters__label"
                        htmlFor="property-sort"
                    >
                        <ArrowDownUp size={15} />
                        <span>Sort Listings</span>
                    </label>

                    <div className="property-filters__select-wrapper">
                        <select
                            id="property-sort"
                            value={filters.sortBy}
                            onChange={(event) =>
                                handleChange("sortBy", event.target.value)
                            }
                            className="property-filters__select"
                        >
                            <option value="recommended">Recommended (Featured First)</option>
                            <option value="price-low-high">Price: Low to High</option>
                            <option value="price-high-low">Price: High to Low</option>
                        </select>
                    </div>
                </div>

                {/* Mobile Apply Button */}
                {onCloseMobile && (
                    <div className="property-filters__mobile-apply">
                        <button
                            type="button"
                            className="property-filters__apply-btn"
                            onClick={onCloseMobile}
                        >
                            <Check size={16} />
                            <span>Show {resultCount} Properties</span>
                        </button>
                    </div>
                )}
            </div>
        </aside>
    );
}

export default PropertyFilters;
