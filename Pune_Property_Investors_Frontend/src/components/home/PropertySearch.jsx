"use client";

import { useState } from "react";
import {
    FaMapMarkerAlt,
    FaSearch,
    FaChevronDown,
} from "react-icons/fa";

const locations = [
    "All Locations",
    "Dhanori",
    "Wagholi",
    "Charholi",
    "Kharadi",
    "Mundhwa",
    "NIBM",
    "Keshav Nagar",
    "Hadapsar",
    "Wakad",
    "Baner",
    "Hinjewadi",
    "Viman Nagar",
    "Koregaon Park",
    "Kothrud",
    "Pimple Saudagar",
    "Ravet",
    "Punawale",
    "Tathawade",
    "Undri",
    "Mohammed Wadi",
    "Balewadi",
];

const propertyTypes = [
    "All Residential",
    "Apartment",
    "Flat",
    "Villa",
    "Penthouse",
    "Plot",
    "Commercial",
];

const bhkOptions = [
    "Any BHK",
    "1 BHK",
    "2 BHK",
    "3 BHK",
    "4 BHK",
    "5+ BHK",
];

const budgets = [
    { label: "Any Budget", min: 0, max: Infinity },
    { label: "Under ₹30 Lakhs", min: 0, max: 3000000 },
    { label: "₹30–50 Lakhs", min: 3000000, max: 5000000 },
    { label: "₹50–75 Lakhs", min: 5000000, max: 7500000 },
    { label: "₹75 Lakhs–1 Crore", min: 7500000, max: 10000000 },
    { label: "₹1–2 Crores", min: 10000000, max: 20000000 },
    { label: "Above ₹2 Crores", min: 20000000, max: Infinity },
];

function PropertySearch({ onSearch }) {
    const [activeTab, setActiveTab] = useState("projects");

    const [filters, setFilters] = useState({
        location: "All Locations",
        propertyType: "All Residential",
        bhk: "Any BHK",
        budget: "Any Budget",
    });

    const updateFilter = (name, value) => {
        setFilters((current) => ({
            ...current,
            [name]: value,
        }));
    };

    const handleSearch = (event) => {
        event.preventDefault();

        const selectedBudget = budgets.find(
            (budget) => budget.label === filters.budget
        );

        onSearch?.({
            ...filters,
            projectType: activeTab,
            minBudget: selectedBudget?.min ?? 0,
            maxBudget: selectedBudget?.max ?? Infinity,
        });
    };

    return (
        <section className="property-search">
            <div className="property-search__tabs" role="tablist">
                <button
                    type="button"
                    role="tab"
                    aria-selected={activeTab === "projects"}
                    className={`property-search__tab ${
                        activeTab === "projects"
                            ? "property-search__tab--active"
                            : ""
                    }`}
                    onClick={() => setActiveTab("projects")}
                >
                    Projects
                </button>

                <button
                    type="button"
                    role="tab"
                    aria-selected={activeTab === "new-launches"}
                    className={`property-search__tab ${
                        activeTab === "new-launches"
                            ? "property-search__tab--active"
                            : ""
                    }`}
                    onClick={() => setActiveTab("new-launches")}
                >
                    New Launches
                </button>
            </div>

            <form
                className="property-search__form"
                onSubmit={handleSearch}
            >
                {/* Location */}
                <div className="property-search__field property-search__location">
                    <label htmlFor="search-location">Location</label>

                    <div className="property-search__control">
                        <FaMapMarkerAlt
                            className="property-search__location-icon"
                            aria-hidden="true"
                        />

                        <select
                            id="search-location"
                            value={filters.location}
                            onChange={(event) =>
                                updateFilter("location", event.target.value)
                            }
                        >
                            {locations.map((location) => (
                                <option key={location} value={location}>
                                    {location === "All Locations"
                                        ? location
                                        : `${location} Pune`}
                                </option>
                            ))}
                        </select>

                        <FaChevronDown
                            className="property-search__chevron"
                            aria-hidden="true"
                        />
                    </div>
                </div>

                {/* Property Type */}
                <div className="property-search__field">
                    <label htmlFor="search-property-type">
                        Property Type
                    </label>

                    <div className="property-search__control">
                        <select
                            id="search-property-type"
                            value={filters.propertyType}
                            onChange={(event) =>
                                updateFilter(
                                    "propertyType",
                                    event.target.value
                                )
                            }
                        >
                            {propertyTypes.map((type) => (
                                <option key={type} value={type}>
                                    {type}
                                </option>
                            ))}
                        </select>

                        <FaChevronDown
                            className="property-search__chevron"
                            aria-hidden="true"
                        />
                    </div>
                </div>

                {/* BHK */}
                <div className="property-search__field">
                    <label htmlFor="search-bhk">BHK</label>

                    <div className="property-search__control">
                        <select
                            id="search-bhk"
                            value={filters.bhk}
                            onChange={(event) =>
                                updateFilter("bhk", event.target.value)
                            }
                        >
                            {bhkOptions.map((bhk) => (
                                <option key={bhk} value={bhk}>
                                    {bhk}
                                </option>
                            ))}
                        </select>

                        <FaChevronDown
                            className="property-search__chevron"
                            aria-hidden="true"
                        />
                    </div>
                </div>

                {/* Budget */}
                <div className="property-search__field">
                    <label htmlFor="search-budget">Budget</label>

                    <div className="property-search__control">
                        <select
                            id="search-budget"
                            value={filters.budget}
                            onChange={(event) =>
                                updateFilter("budget", event.target.value)
                            }
                        >
                            {budgets.map((budget) => (
                                <option
                                    key={budget.label}
                                    value={budget.label}
                                >
                                    {budget.label}
                                </option>
                            ))}
                        </select>

                        <FaChevronDown
                            className="property-search__chevron"
                            aria-hidden="true"
                        />
                    </div>
                </div>

                {/* Search Button */}
                <button
                    type="submit"
                    className="property-search__submit"
                >
                    <FaSearch aria-hidden="true" />
                    <span>Search</span>
                </button>
            </form>

            {/* Popular locations */}
            <div className="property-search__popular">
                <span className="property-search__popular-label">
                    Popular searches:
                </span>

                {["Wakad", "Baner", "Hinjewadi", "Kharadi"].map(
                    (location) => (
                        <button
                            key={location}
                            type="button"
                            className={`property-search__chip ${
                                filters.location === location
                                    ? "property-search__chip--active"
                                    : ""
                            }`}
                            onClick={() =>
                                updateFilter("location", location)
                            }
                        >
                            {location}
                        </button>
                    )
                )}
            </div>
        </section>
    );
}

export default PropertySearch;
