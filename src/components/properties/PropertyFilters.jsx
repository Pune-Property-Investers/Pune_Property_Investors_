"use client";

import {
    SlidersHorizontal,
    RotateCcw,
    MapPin,
    BedDouble,
    IndianRupee,
    Building2,
    ArrowDownUp,
    X,
    Check,
} from "lucide-react";
import "./PropertyFilters.css";

const locations = [
    "Kharadi",
    "Baner",
    "Wakad",
    "Hinjewadi",
    "Wagholi",
    "Hadapsar",
    "Kalyani Nagar",
    "Bavdhan",
];

const bhkOptions = [
    { label: "Any BHK", value: "all" },
    { label: "1 BHK", value: "1" },
    { label: "2 BHK", value: "2" },
    { label: "3 BHK", value: "3" },
    { label: "4+ BHK", value: "4+" },
];

const propertyTypes = [
    { label: "All Types", value: "all" },
    { label: "New Launches", value: "new-launch" },
    { label: "Apartments", value: "Apartment" },
    { label: "Commercial", value: "Commercial" },
    { label: "Plots & Land", value: "Plot" },
];

function PropertyFilters({
    filters,
    onFilterChange,
    onReset,
    resultCount,
    onCloseMobile,
}) {
    const handleChange = (key, value) => {
        onFilterChange(key, value);
    };

    return (
        <aside className="property-filters" aria-label="Property Search Filters">
            {/* Filter heading */}
            <div className="property-filters__header">
                <div className="property-filters__heading">
                    <SlidersHorizontal size={18} />
                    <div>
                        <h2>Filters</h2>
                        <p>Find your ideal property</p>
                    </div>
                </div>

                <div className="property-filters__header-actions">
                    <button
                        type="button"
                        className="property-filters__reset"
                        onClick={onReset}
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
                {/* 1. Location filter */}
                <div className="property-filters__group">
                    <label className="property-filters__label">
                        <MapPin size={15} />
                        <span>Location in Pune</span>
                    </label>

                    <div className="property-filters__chips">
                        <button
                            type="button"
                            className={`property-filters__chip ${
                                filters.location === "all" ? "is-selected" : ""
                            }`}
                            onClick={() => handleChange("location", "all")}
                        >
                            All Pune
                        </button>

                        {locations.map((item) => (
                            <button
                                type="button"
                                key={item}
                                className={`property-filters__chip ${
                                    filters.location.toLowerCase() === item.toLowerCase()
                                        ? "is-selected"
                                        : ""
                                }`}
                                onClick={() => handleChange("location", item)}
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                </div>

                {/* 2. BHK filter */}
                <div className="property-filters__group">
                    <label className="property-filters__label">
                        <BedDouble size={15} />
                        <span>BHK Configuration</span>
                    </label>

                    <div className="property-filters__bhk-buttons">
                        {bhkOptions.map((item) => (
                            <button
                                type="button"
                                key={item.value}
                                className={`property-filters__bhk-button ${
                                    filters.bhk === item.value ? "is-selected" : ""
                                }`}
                                onClick={() => handleChange("bhk", item.value)}
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* 3. Budget range */}
                <div className="property-filters__group">
                    <label className="property-filters__label">
                        <IndianRupee size={15} />
                        <span>Budget Range (INR)</span>
                    </label>

                    <div className="property-filters__price-inputs">
                        <div className="property-filters__input-wrapper">
                            <span className="property-filters__currency-tag">₹ Min</span>
                            <input
                                type="number"
                                placeholder="50,00,000"
                                value={filters.minPrice}
                                onChange={(event) =>
                                    handleChange("minPrice", event.target.value)
                                }
                                min="0"
                                step="100000"
                                aria-label="Minimum budget in rupees"
                            />
                        </div>

                        <span className="property-filters__price-to">to</span>

                        <div className="property-filters__input-wrapper">
                            <span className="property-filters__currency-tag">₹ Max</span>
                            <input
                                type="number"
                                placeholder="1,50,00,000"
                                value={filters.maxPrice}
                                onChange={(event) =>
                                    handleChange("maxPrice", event.target.value)
                                }
                                min="0"
                                step="100000"
                                aria-label="Maximum budget in rupees"
                            />
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

                {/* 4. Property type */}
                <div className="property-filters__group">
                    <label className="property-filters__label">
                        <Building2 size={15} />
                        <span>Property Type</span>
                    </label>

                    <div className="property-filters__chips">
                        {propertyTypes.map((item) => (
                            <button
                                type="button"
                                key={item.value}
                                className={`property-filters__chip ${
                                    filters.propertyType === item.value ? "is-selected" : ""
                                }`}
                                onClick={() =>
                                    handleChange("propertyType", item.value)
                                }
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* 5. Sort order */}
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
