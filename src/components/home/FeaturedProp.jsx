"use client";

import { useState } from "react";
import {
    ChevronLeft,
    ChevronRight,
    MapPin,
    Bed,
    Maximize2,
    ArrowRight,
    Star,
    X,
    Send,
    CheckCircle2,
    Building2,
    PhoneCall,
    Sparkles,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import "./FeaturedProp.css";

// 8 Curated Luxury Pune Properties
const featuredListings = [
    {
        id: 1,
        name: "Mantra Magnus",
        location: "Hadapsar, Pune",
        heroLocation: "Hadapsar, Pune",
        config: "2 & 3 BHK",
        area: "1,150 - 1,680 Sq. Ft.",
        price: "₹1.25 Cr*",
        badge: "Signature Living",
        image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1400&q=85",
        developer: "Mantra Properties",
        tagline: "Ultra-luxury high-rise residences with panoramic greens and sky clubhouse.",
    },
    {
        id: 2,
        name: "Godrej Elements",
        location: "Hinjewadi Phase 1, Pune",
        heroLocation: "Hinjewadi, Pune",
        config: "2 & 3 BHK",
        area: "980 - 1,420 Sq. Ft.",
        price: "₹1.30 Cr*",
        badge: "Tech Corridor Luxury",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85",
        developer: "Godrej Properties",
        tagline: "Eco-architectural homes designed around active wellness and smart automation.",
    },
    {
        id: 3,
        name: "Kumar Primus",
        location: "Kalyani Nagar, Pune",
        heroLocation: "Kalyani Nagar, Pune",
        config: "3 & 4 BHK",
        area: "1,750 - 2,450 Sq. Ft.",
        price: "₹1.85 Cr*",
        badge: "Ultra Luxury Suites",
        image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1400&q=85",
        developer: "Kumar Properties",
        tagline: "Bespoke architectural high-rises commanding views of Koregaon Park skyline.",
    },
    {
        id: 4,
        name: "VTP HiLife",
        location: "Kharadi, Pune",
        heroLocation: "Kharadi, Pune",
        config: "2 & 3 BHK",
        area: "890 - 1,320 Sq. Ft.",
        price: "₹1.05 Cr*",
        badge: "Waterfront Living",
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1400&q=85",
        developer: "VTP Realty",
        tagline: "Riverfront promenade lifestyle with 3-tier MLA architecture in New Kharadi.",
    },
    {
        id: 5,
        name: "The Ark Voyage",
        location: "Wakad, Pune",
        heroLocation: "Wakad, Pune",
        config: "3 & 4 BHK",
        area: "1,920 - 2,680 Sq. Ft.",
        price: "₹2.10 Cr*",
        badge: "Exclusive Penthouses",
        image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1400&q=85",
        developer: "Tribeca & Acropolis",
        tagline: "Cruise-inspired architectural towers surrounded by protected reserved greens.",
    },
    {
        id: 6,
        name: "Tribeca Highstreet",
        location: "Baner - Balewadi, Pune",
        heroLocation: "Baner, Pune",
        config: "2 & 3 BHK",
        area: "1,100 - 1,590 Sq. Ft.",
        price: "₹1.45 Cr*",
        badge: "Prime Highstreet Living",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85",
        developer: "Tribeca Developers",
        tagline: "Trump Tower developers bring signature boutique urban living to West Pune.",
    },
    {
        id: 7,
        name: "Kolte Patil Life Republic",
        location: "Hinjewadi - Marunji, Pune",
        heroLocation: "Hinjewadi, Pune",
        config: "2 & 3 BHK",
        area: "850 - 1,280 Sq. Ft.",
        price: "₹98 Lacs*",
        badge: "Integrated Township",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1400&q=85",
        developer: "Kolte Patil",
        tagline: "400-acre self-sustaining township with Olympic sports arena and urban lakes.",
    },
    {
        id: 8,
        name: "Pride World City",
        location: "Charholi, Pune",
        heroLocation: "Charholi, Pune",
        config: "2, 3 & 4 BHK",
        area: "950 - 1,820 Sq. Ft.",
        price: "₹1.12 Cr*",
        badge: "Mega City Living",
        image: "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=1400&q=85",
        developer: "Pride Group",
        tagline: "Master-planned residential enclave seamlessly connected to Pune International Airport.",
    },
];

// Architectural Gold Building Emblem
function BuildingEmblem({ size = 28, className = "" }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            aria-hidden="true"
        >
            <path
                d="M18 3L28 9V32H8V9L18 3Z"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M13 14H15M21 14H23M13 19H15M21 19H23M13 24H15M21 24H23"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
            />
            <path
                d="M16 32V27C16 25.8954 16.8954 25 18 25C19.1046 25 20 25.8954 20 27V32"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinejoin="round"
            />
            <path
                d="M4 32H32"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
            />
        </svg>
    );
}

export default function FeaturedProperties() {
    const [selectedId, setSelectedId] = useState(1);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [inquiryModalProject, setInquiryModalProject] = useState(null);
    const [modalSubmitted, setModalSubmitted] = useState(false);

    // Form inputs for modal
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
    });

    const activeProject =
        featuredListings.find((p) => p.id === selectedId) || featuredListings[0];

    // Split listings into 2 distinct columns for vertical marquee
    const col1Listings = [
        featuredListings[0], // Mantra Magnus
        featuredListings[2], // Kumar Primus
        featuredListings[4], // The Ark Voyage
        featuredListings[6], // Kolte Patil
    ];

    const col2Listings = [
        featuredListings[1], // Godrej Elements
        featuredListings[3], // VTP HiLife
        featuredListings[5], // Tribeca Highstreet
        featuredListings[7], // Pride World City
    ];

    // Double for continuous infinite seamless scrolling loop
    const col1Double = [...col1Listings, ...col1Listings];
    const col2Double = [...col2Listings, ...col2Listings];

    const handleSelectProject = (project) => {
        if (project.id === selectedId) return;
        setIsTransitioning(true);
        setSelectedId(project.id);
        setTimeout(() => setIsTransitioning(false), 280);
    };

    const handlePrev = () => {
        setIsTransitioning(true);
        setSelectedId((prev) => {
            const currentIdx = featuredListings.findIndex((p) => p.id === prev);
            const prevIdx = (currentIdx - 1 + featuredListings.length) % featuredListings.length;
            return featuredListings[prevIdx].id;
        });
        setTimeout(() => setIsTransitioning(false), 280);
    };

    const handleNext = () => {
        setIsTransitioning(true);
        setSelectedId((prev) => {
            const currentIdx = featuredListings.findIndex((p) => p.id === prev);
            const nextIdx = (currentIdx + 1) % featuredListings.length;
            return featuredListings[nextIdx].id;
        });
        setTimeout(() => setIsTransitioning(false), 280);
    };

    const handleOpenInquiry = (e, project) => {
        e.stopPropagation();
        setInquiryModalProject(project);
        setModalSubmitted(false);
    };

    const handleCloseModal = () => {
        setInquiryModalProject(null);
        setModalSubmitted(false);
        setFormData({ name: "", phone: "", email: "" });
    };

    const handleSubmitInquiry = (e) => {
        e.preventDefault();
        setModalSubmitted(true);
        const msg = `Hi PPI Infra, I am interested in ${inquiryModalProject.name} (${inquiryModalProject.location}) starting at ${inquiryModalProject.price}. My name is ${formData.name}, phone: ${formData.phone}.`;
        const waUrl = `https://wa.me/917398174444?text=${encodeURIComponent(msg)}`;
        setTimeout(() => {
            window.open(waUrl, "_blank", "noopener,noreferrer");
            handleCloseModal();
        }, 1200);
    };

    const handleWhatsAppHero = () => {
        const msg = `Hi PPI Infra, I am interested in ${activeProject.name} (${activeProject.location}) starting at ${activeProject.price}. Please share pricing details and brochure.`;
        const waUrl = `https://wa.me/917398174444?text=${encodeURIComponent(msg)}`;
        window.open(waUrl, "_blank", "noopener,noreferrer");
    };

    return (
        <section
            className="featured-props-section"
            id="featured-properties"
            aria-label="Featured Properties in Pune"
        >
            {/* Botanical Corner Silhouettes */}
            <div className="featured-props-botanical featured-props-botanical--top-left" aria-hidden="true">
                <svg viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M20 10C60 40 100 100 130 180C110 140 80 80 40 50C70 90 90 140 100 200C80 160 50 110 10 90C40 120 60 170 70 230C50 190 20 150 -10 140"
                        stroke="#2a453b"
                        strokeWidth="8"
                        strokeLinecap="round"
                        opacity="0.12"
                    />
                    <path
                        d="M5 20C45 50 85 110 115 190M30 60C60 100 80 150 90 210M0 100C30 130 50 180 60 240"
                        stroke="#c49866"
                        strokeWidth="3"
                        strokeLinecap="round"
                        opacity="0.15"
                    />
                </svg>
            </div>

            <div className="featured-props-container">
                {/* SECTION HEADER */}
                <div className="featured-props-header">
                    <div className="featured-props-emblem-wrap">
                        <span className="featured-props-emblem-line" />
                        <div className="featured-props-emblem-icon">
                            <BuildingEmblem size={28} />
                        </div>
                        <span className="featured-props-emblem-line" />
                    </div>

                    <h2 className="featured-props-title">Featured Properties</h2>
                    <p className="featured-props-subtitle">
                        Handcrafted luxury residences & prime investment landmarks across Pune
                    </p>
                </div>

                {/* SHOWCASE STAGE */}
                <div className="featured-props-stage">
                    {/* LEFT COLUMN: HERO SPOTLIGHT CARD */}
                    <div className="featured-props-hero">
                        <div
                            className={`featured-props-hero__image-wrap ${
                                isTransitioning ? "featured-props-hero__image-wrap--fading" : ""
                            }`}
                        >
                            <img
                                src={activeProject.image}
                                alt={`${activeProject.name} in ${activeProject.location}`}
                                className="featured-props-hero__img"
                                loading="eager"
                            />

                            {/* Top Badge */}
                            <div className="featured-props-hero__badge">
                                <Sparkles size={13} fill="currentColor" />
                                <span>{activeProject.badge}</span>
                            </div>

                            {/* Price Floating Tag */}
                            <div className="featured-props-hero__price-tag">
                                <span>Starting</span>
                                <strong>{activeProject.price}</strong>
                            </div>

                            {/* Floating Left & Right Navigation Arrows */}
                            <button
                                type="button"
                                className="featured-props-hero__nav-btn featured-props-hero__nav-btn--prev"
                                onClick={handlePrev}
                                aria-label="Previous featured property"
                                title="Previous Property"
                            >
                                <ChevronLeft size={20} strokeWidth={2.4} />
                            </button>

                            <button
                                type="button"
                                className="featured-props-hero__nav-btn featured-props-hero__nav-btn--next"
                                onClick={handleNext}
                                aria-label="Next featured property"
                                title="Next Property"
                            >
                                <ChevronRight size={20} strokeWidth={2.4} />
                            </button>

                            {/* Subtle dark gradient overlay */}
                            <div className="featured-props-hero__vignette" />

                            {/* Bottom Content Card on Hero */}
                            <div className="featured-props-hero__content">
                                <div className="featured-props-hero__developer">
                                    <Building2 size={13} />
                                    <span>{activeProject.developer}</span>
                                </div>

                                <h3 className="featured-props-hero__name">
                                    {activeProject.name}
                                </h3>

                                <div className="featured-props-hero__meta-row">
                                    <span className="featured-props-hero__meta-pill">
                                        <MapPin size={13} className="text-gold" />
                                        <span>{activeProject.location}</span>
                                    </span>
                                    <span className="featured-props-hero__meta-pill">
                                        <Bed size={13} className="text-gold" />
                                        <span>{activeProject.config}</span>
                                    </span>
                                    <span className="featured-props-hero__meta-pill">
                                        <Maximize2 size={13} className="text-gold" />
                                        <span>{activeProject.area}</span>
                                    </span>
                                </div>

                                <p className="featured-props-hero__tagline">
                                    {activeProject.tagline}
                                </p>

                                <div className="featured-props-hero__actions">
                                    <button
                                        type="button"
                                        className="featured-props-hero__btn-enquire"
                                        onClick={(e) => handleOpenInquiry(e, activeProject)}
                                    >
                                        <span>Get Cost Sheet & Brochure</span>
                                        <ArrowRight size={15} />
                                    </button>

                                    <button
                                        type="button"
                                        className="featured-props-hero__btn-wa"
                                        onClick={handleWhatsAppHero}
                                        aria-label="Inquire on WhatsApp"
                                    >
                                        <FaWhatsapp size={16} />
                                        <span>WhatsApp VIP</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: DUAL-COLUMN CONTINUOUS UP/DOWN MARQUEE SCROLLER */}
                    <div className="featured-props-scroller-wrapper">
                        {/* Interactive Pause Cue */}
                        <div className="featured-props-scroller-hint">
                            <span>Scrolls Continuously • Hover to Pause • Tap to View</span>
                        </div>

                        <div className="featured-props-scroller-columns">
                            {/* COLUMN 1: CONTINUOUS SCROLL UP */}
                            <div className="featured-props-column-track-wrap">
                                <div className="featured-props-track featured-props-track--up">
                                    {col1Double.map((project, idx) => {
                                        const isSelected = selectedId === project.id;
                                        return (
                                            <div
                                                key={`col1-${project.id}-${idx}`}
                                                className={`featured-scroll-card ${
                                                    isSelected ? "featured-scroll-card--selected" : ""
                                                }`}
                                                onClick={() => handleSelectProject(project)}
                                                role="button"
                                                tabIndex={0}
                                                aria-label={`View ${project.name}`}
                                            >
                                                {/* Property Image on Top */}
                                                <div className="featured-scroll-card__image-wrap">
                                                    <img
                                                        src={project.image}
                                                        alt={project.name}
                                                        className="featured-scroll-card__image"
                                                        loading="lazy"
                                                    />
                                                    <span className="featured-scroll-card__chip">
                                                        {project.config}
                                                    </span>
                                                    <span className="featured-scroll-card__price-chip">
                                                        {project.price}
                                                    </span>
                                                </div>

                                                {/* Property Info Below */}
                                                <div className="featured-scroll-card__body">
                                                    <span className="featured-scroll-card__dev">
                                                        {project.developer}
                                                    </span>
                                                    <h4 className="featured-scroll-card__title">
                                                        {project.name}
                                                    </h4>
                                                    <div className="featured-scroll-card__loc">
                                                        <MapPin size={11} />
                                                        <span>{project.location}</span>
                                                    </div>

                                                    <div className="featured-scroll-card__footer">
                                                        <span className="featured-scroll-card__area">
                                                            {project.area}
                                                        </span>
                                                        <span className="featured-scroll-card__arrow">
                                                            <ArrowRight size={13} />
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* COLUMN 2: CONTINUOUS SCROLL DOWN */}
                            <div className="featured-props-column-track-wrap">
                                <div className="featured-props-track featured-props-track--down">
                                    {col2Double.map((project, idx) => {
                                        const isSelected = selectedId === project.id;
                                        return (
                                            <div
                                                key={`col2-${project.id}-${idx}`}
                                                className={`featured-scroll-card ${
                                                    isSelected ? "featured-scroll-card--selected" : ""
                                                }`}
                                                onClick={() => handleSelectProject(project)}
                                                role="button"
                                                tabIndex={0}
                                                aria-label={`View ${project.name}`}
                                            >
                                                {/* Property Image on Top */}
                                                <div className="featured-scroll-card__image-wrap">
                                                    <img
                                                        src={project.image}
                                                        alt={project.name}
                                                        className="featured-scroll-card__image"
                                                        loading="lazy"
                                                    />
                                                    <span className="featured-scroll-card__chip">
                                                        {project.config}
                                                    </span>
                                                    <span className="featured-scroll-card__price-chip">
                                                        {project.price}
                                                    </span>
                                                </div>

                                                {/* Property Info Below */}
                                                <div className="featured-scroll-card__body">
                                                    <span className="featured-scroll-card__dev">
                                                        {project.developer}
                                                    </span>
                                                    <h4 className="featured-scroll-card__title">
                                                        {project.name}
                                                    </h4>
                                                    <div className="featured-scroll-card__loc">
                                                        <MapPin size={11} />
                                                        <span>{project.location}</span>
                                                    </div>

                                                    <div className="featured-scroll-card__footer">
                                                        <span className="featured-scroll-card__area">
                                                            {project.area}
                                                        </span>
                                                        <span className="featured-scroll-card__arrow">
                                                            <ArrowRight size={13} />
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* QUICK INQUIRY MODAL */}
            {inquiryModalProject && (
                <div className="featured-props-modal-backdrop" onClick={handleCloseModal}>
                    <div
                        className="featured-props-modal"
                        onClick={(e) => e.stopPropagation()}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="modal-title"
                    >
                        <button
                            type="button"
                            className="featured-props-modal__close"
                            onClick={handleCloseModal}
                            aria-label="Close modal"
                        >
                            <X size={20} />
                        </button>

                        <div className="featured-props-modal__header">
                            <span className="featured-props-modal__tag">DIRECT DEVELOPER ACCESS</span>
                            <h3 id="modal-title" className="featured-props-modal__title">
                                {inquiryModalProject.name}
                            </h3>
                            <p className="featured-props-modal__location">
                                <MapPin size={14} /> {inquiryModalProject.location} • {inquiryModalProject.config}
                            </p>
                            <div className="featured-props-modal__price-badge">
                                <span>Starting Price:</span>
                                <strong>{inquiryModalProject.price}</strong>
                            </div>
                        </div>

                        {modalSubmitted ? (
                            <div className="featured-props-modal__success">
                                <CheckCircle2 size={46} color="#16a34a" />
                                <h4>Connecting with Senior Advisor...</h4>
                                <p>Opening WhatsApp to deliver price sheet and floor plan.</p>
                            </div>
                        ) : (
                            <form className="featured-props-modal__form" onSubmit={handleSubmitInquiry}>
                                <div className="featured-props-modal__field">
                                    <label htmlFor="f-name">Full Name</label>
                                    <input
                                        id="f-name"
                                        type="text"
                                        required
                                        placeholder="e.g. Rahul Sharma"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>

                                <div className="featured-props-modal__field">
                                    <label htmlFor="f-phone">Mobile / WhatsApp Number</label>
                                    <input
                                        id="f-phone"
                                        type="tel"
                                        required
                                        placeholder="+91 98765 43210"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    />
                                </div>

                                <div className="featured-props-modal__field">
                                    <label htmlFor="f-email">Email Address (Optional)</label>
                                    <input
                                        id="f-email"
                                        type="email"
                                        placeholder="rahul@example.com"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>

                                <button type="submit" className="featured-props-modal__submit-btn">
                                    <span>Get Verified Brochure & Cost Sheet</span>
                                    <Send size={16} />
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            )}
        </section>
    );
}
