"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
    ArrowLeft,
    ArrowRight,
    MapPin,
    ShieldCheck,
    Building2,
    CalendarDays,
    Ruler,
    BedDouble,
    Home,
    Phone,
    PhoneCall,
    MessageCircle,
    CheckCircle2,
    ChevronRight,
    X,
} from "lucide-react";

import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import PageHeroBanner from "../common/PageHeroBanner";

import PropertyGallery from "../property-details/PropertyGallery";
import PropertyOverview from "../property-details/PropertyOverview";
import ProjectSpecifications from "../property-details/ProjectSpecifications";
import PropertyFloorPlans from "../property-details/PropertyFloorPlans";
import PropertyAmenities from "../property-details/PropertyAmenities";
import PropertyMap from "../property-details/PropertyMap";
import SimilarProperties from "../property-details/SimilarProperties";
import BuilderProperties from "../property-details/BuilderProperties";
import PropertyEnquiry from "../property-details/PropertyEnquiry";
import { extractYouTubeVideoId } from "../../lib/youtube";

const WHATSAPP_NUMBER = "917398174444";
const ADVISOR_PHONE = "+917398174444";

function formatPrice(property) {
    if (property.priceLabel) {
        return property.priceLabel;
    }

    const price = Number(property.price);

    if (!Number.isFinite(price) || price <= 0) {
        return "Price on request";
    }

    if (price >= 10000000) {
        return `₹${(price / 10000000)
            .toFixed(2)
            .replace(/\.?0+$/, "")} Cr`;
    }

    if (price >= 100000) {
        return `₹${(price / 100000)
            .toFixed(2)
            .replace(/\.?0+$/, "")} L`;
    }

    return `₹${price.toLocaleString("en-IN")}`;
}

function formatConfiguration(value, propertyType) {
    if (!value) {
        return propertyType || "Residential";
    }

    const text = String(value);

    if (/BHK/i.test(text)) {
        return text;
    }

    if (/^\d+$/.test(text)) {
        return `${text} BHK`;
    }

    return text;
}

function getDeveloperLogo(property) {
    if (!property) return null;
    if (property.developerLogo) return property.developerLogo;
    if (property.logo) return property.logo;
    if (property.builderLogo) return property.builderLogo;

    const combined = `${property.developer || ""} ${property.builder || ""} ${property.projectName || ""} ${property.title || ""} ${property.name || ""}`.toLowerCase();

    if (combined.includes("godrej")) return "/images/logos/godrej.png";
    if (combined.includes("kohinoor")) return "/images/logos/kohinoor.png";
    if (combined.includes("kolte") || combined.includes("patil") || combined.includes("life republic")) return "/images/logos/kolte-patil.jpg";
    if (combined.includes("vtp")) return "/images/logos/vtp.png";
    if (combined.includes("sobha")) return "/images/logos/sobha.png";
    if (combined.includes("shapoorji") || combined.includes("joyville")) return "/images/logos/shapoorji.svg";
    if (combined.includes("lodha")) return "/images/logos/lodha.png";
    if (combined.includes("paras")) return "/images/logos/paras-emperor.png";
    if (combined.includes("mantra")) return "https://www.google.com/s2/favicons?domain=mantraproperties.in&sz=128";
    if (combined.includes("kumar")) return "https://www.google.com/s2/favicons?domain=kumarworld.com&sz=128";
    if (combined.includes("pride")) return "https://www.google.com/s2/favicons?domain=pridepurpleproperties.com&sz=128";
    if (combined.includes("gera")) return "https://www.google.com/s2/favicons?domain=gera.in&sz=128";
    if (combined.includes("vilas") || combined.includes("javdekar")) return "https://www.google.com/s2/favicons?domain=vilasjavdekar.com&sz=128";
    if (combined.includes("urban") || combined.includes("crest")) return "/images/logo.png";

    return "/images/logo.png";
}

function getAvailableFlats(property) {
    if (!property) return "1, 2 & 3 BHK Flats";
    if (property.availableFlats) return property.availableFlats;

    // Check description for e.g. "Smartly planned 1, 2 & 3 BHK residences"
    const desc = property.description || "";
    const descMatch = desc.match(/(\d+(?:\s*,\s*\d+)*(?:\s*(?:&|and)\s*\d+)?\s*BHK)/i);
    if (descMatch) {
        return `${descMatch[1]} Flats`;
    }

    // Check floorPlans array if present
    if (Array.isArray(property.floorPlans) && property.floorPlans.length > 0) {
        const categories = Array.from(new Set(property.floorPlans.map((p) => p.bhk || p.bhkCategory))).filter(Boolean);
        if (categories.length > 0) {
            return `${categories.join(", ")} Flats`;
        }
    }

    // Property configuration or category
    const category = String(property.category || property.propertyType || "").toLowerCase();
    if (category.includes("commercial") || category.includes("office") || category.includes("shop")) {
        return "Boutique Offices & Commercial Suites";
    }
    if (category.includes("villa") || category.includes("bungalow") || category.includes("row house")) {
        return "3 & 4 BHK Luxury Villas";
    }

    if (property.availableBhk) {
        return /flats?/i.test(property.availableBhk) ? property.availableBhk : `${property.availableBhk} Flats`;
    }

    const rawBhk = property.bhk || property.bedrooms;
    if (rawBhk) {
        const b = String(rawBhk);
        if (/bhk/i.test(b)) return `${b} Flats`;
        if (Number(rawBhk) === 2) return "1, 2 & 3 BHK Flats";
        if (Number(rawBhk) === 3) return "2, 3 & 4 BHK Flats";
        return `${rawBhk} BHK Flats`;
    }

    return "1, 2 & 3 BHK Flats";
}

import { findProperty } from "../../lib/propertyUtils";

/**
 * @param {{ propertyId?: string | number | null; propertySlug?: string | null }} props
 */
function PropertyDetails({ propertyId, propertySlug }) {
    const params = useParams();
    const identifier = propertyId || propertySlug || params?.id || params?.slug;

    const property = findProperty(identifier);

    if (!property) {
        return (
            <>
                <Header transparentAtTop={true} />

                <PageHeroBanner
                    title="Property"
                    titleAccent="Not Found"
                    eyebrow="PROPERTY ADVISORY"
                    description="We couldn't find this property. It may have been sold, archived, or the link may be incorrect."
                    breadcrumbs={[
                        { label: "Home", href: "/" },
                        { label: "Buy Properties", href: "/buy" },
                        { label: "Not Found" },
                    ]}
                />

                <main className="property-details__not-found">
                    <Home size={44} strokeWidth={1.5} />

                    <span className="property-details__eyebrow">
                        PROPERTY NOT AVAILABLE
                    </span>

                    <h1>Property Not Found</h1>

                    <p>
                        We couldn't find this property. It may have been
                        removed or the link may be incorrect.
                    </p>

                    <Link
                        href="/buy"
                        className="property-details__back-button"
                    >
                        <ArrowLeft size={17} />
                        Browse Verified Properties
                    </Link>
                </main>

                <Footer />
            </>
        );
    }

    const title =
        property.title ||
        property.name ||
        property.projectName ||
        "Property in Pune";

    const price = formatPrice(property);

    const rawTokens = [
        property.locality,
        property.location,
        property.city || "Pune",
    ]
        .filter(Boolean)
        .flatMap((s) => String(s).split(","))
        .map((s) => s.trim())
        .filter(Boolean);

    const location = Array.from(new Set(rawTokens.map((t) => t.toLowerCase())))
        .map((lower) => rawTokens.find((t) => t.toLowerCase() === lower))
        .join(", ");

    const images = [
        ...(Array.isArray(property.images) ? property.images : []),
        property.image,
    ].filter(Boolean);

    const uniqueImages = [...new Set(images)];

    const bedrooms = property.bhk || property.bedrooms;

    const configuration = property.configuration || formatConfiguration(
        bedrooms,
        property.propertyType
    );

    const logoUrl = getDeveloperLogo(property);
    const availableFlats = getAvailableFlats(property);

    const area = property.area
        ? `${Number(property.area).toLocaleString("en-IN")} ${property.areaUnit || "sq.ft."
        }`
        : "On request";

    const highlights = [
        {
            icon: <BedDouble size={20} />,
            label: "Configuration",
            value: configuration,
        },
        {
            icon: <Ruler size={20} />,
            label: "Area",
            value: area,
        },
        {
            icon: <Building2 size={20} />,
            label: "Property Type",
            value: property.propertyType || "Residential",
        },
        {
            icon: <CalendarDays size={20} />,
            label: "Possession",
            value: property.possession || "Contact for details",
        },
    ];

    const whatsappMessage = encodeURIComponent(
        `Hello Pune Property Investor, I would like to know more about ${title} in ${location}. Please share the price and availability details.`
    );

    const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);

    // Lock body scroll and handle Escape key for the enquiry modal
    useEffect(() => {
        if (isEnquiryModalOpen) {
            const prevOverflow = document.body.style.overflow;
            document.body.style.overflow = "hidden";

            const handleKeyDown = (e) => {
                if (e.key === "Escape") {
                    setIsEnquiryModalOpen(false);
                }
            };
            window.addEventListener("keydown", handleKeyDown);

            return () => {
                document.body.style.overflow = prevOverflow;
                window.removeEventListener("keydown", handleKeyDown);
            };
        }
    }, [isEnquiryModalOpen]);

    const videoId =
        extractYouTubeVideoId(property?.videoUrl) ||
        extractYouTubeVideoId(property?.videoId) ||
        "M1sDYNUJQrY";

    return (
        <>
            <Header transparentAtTop={true} />

            <main className="property-details">
                {/* Property gallery on top - Full width edge-to-edge */}
                <section className="property-details__gallery-section property-details__gallery-section--full">
                    <PropertyGallery
                        images={uniqueImages}
                        title={title}
                    />
                </section>

                <div className="property-details__container">
                    {/* Property heading and price details below gallery */}
                    <section className="property-details__project-header">
                        <div className="property-details__project-info">
                            <div className="property-details__badges">
                                {property.verified && (
                                    <span className="property-details__badge property-details__badge--verified">
                                        <ShieldCheck size={14} />
                                        Verified Listing
                                    </span>
                                )}

                                {property.verified && property.featured && (
                                    <span className="property-details__badge-divider">•</span>
                                )}

                                {property.featured && (
                                    <span className="property-details__badge property-details__badge--featured">
                                        Featured Property
                                    </span>
                                )}
                            </div>

                            <div className="property-details__title-row">
                                {logoUrl ? (
                                    <div className="property-details__brand-logo-container">
                                        <img
                                            src={logoUrl}
                                            alt={property.developer || property.projectName || "Developer Logo"}
                                            className="property-details__brand-logo-img"
                                            onError={(e) => {
                                                e.currentTarget.style.display = "none";
                                                const fallback = e.currentTarget.parentElement?.querySelector(".property-details__brand-logo-fallback");
                                                if (fallback) fallback.style.display = "flex";
                                            }}
                                        />
                                        <div className="property-details__brand-logo-fallback" style={{ display: "none" }}>
                                            <Building2 size={22} />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="property-details__brand-logo-fallback">
                                        <Building2 size={22} />
                                    </div>
                                )}
                                <h1>{title}</h1>
                            </div>

                            <p className="property-details__location">
                                <MapPin size={17} />
                                <span>{location || "Pune, Maharashtra"}</span>
                            </p>

                            {availableFlats && (
                                <p className="property-details__flats-row">
                                    <Building2 size={16} />
                                    <span>Available Flats: <strong>{availableFlats}</strong></span>
                                </p>
                            )}

                            {property.projectName &&
                                property.projectName !== title && (
                                    <p className="property-details__project-name">
                                        Project: {property.projectName}
                                    </p>
                                )}
                        </div>

                        <div className="property-details__price-block">
                            <span className="property-details__price-label">
                                Listed Price
                            </span>

                            <strong>{price}</strong>

                            {property.pricePerSqFt && (
                                <span className="property-details__price-rate">
                                    ₹{property.pricePerSqFt}/sq.ft.
                                </span>
                            )}

                            <button
                                type="button"
                                onClick={() => setIsEnquiryModalOpen(true)}
                                className="property-details__price-cta"
                            >
                                Enquire Now
                                <ArrowRight size={15} />
                            </button>
                        </div>
                    </section>

                    {/* 1. Project Specifications directly below Enquire Now */}
                    <ProjectSpecifications property={property} />

                    {/* About this property section — Moved directly on top of floor plan */}
                    <section id="video-tour" className="property-details__section property-details__description-card property-details__about-card">
                        <div className="property-details__section-heading">
                            <div>
                                <span className="property-details__eyebrow">
                                    PROPERTY OVERVIEW
                                </span>
                                <h2>About this property</h2>
                            </div>
                        </div>
                        {property.description && (
                            <div className="property-details__description-body">
                                <p>{property.description}</p>
                            </div>
                        )}

                        {/* Video Frame Container with curved sides and continuous autoplay */}
                        <div className="property-details__video-frame-container">
                            <iframe
                                src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&playsinline=1&controls=1&modestbranding=1&rel=0`}
                                title={`${title} - Video Tour`}
                                className="property-details__video-iframe"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                                loading="lazy"
                            />
                        </div>
                    </section>

                    {/* 2. Floor Plans & Architectural Layouts directly below About Property */}
                    <PropertyFloorPlans property={property} onEnquire={() => setIsEnquiryModalOpen(true)} />

                    {/* Main content and ad sidebar layout */}
                    <div className="property-details__layout">
                        {/* CENTER: Property information */}
                        <div className="property-details__main">
                            {/* 2. Amenities (Internal Amenities & Outdoor Amenities) */}
                            <PropertyAmenities
                                amenities={property.amenities}
                                showHeader={true}
                                property={property}
                            />

                            {/* 3. Location & Google Map with Connectivity */}
                            <PropertyMap property={property} />

                            {/* Trust section */}
                            <section className="property-details__trust">
                                <div className="property-details__trust-icon">
                                    <CheckCircle2 size={25} />
                                </div>

                                <div className="property-details__trust-content">
                                    <h3>
                                        Need help choosing the right property?
                                    </h3>

                                    <p>
                                        Our senior advisory team can help you
                                        review verified legal documents, floor
                                        plans, pricing breakdown, and arrange an
                                        exclusive site visit in Pune.
                                    </p>
                                </div>

                                <Link href="/#home-contact">
                                    Talk to an Advisor
                                    <ArrowRight size={16} />
                                </Link>
                            </section>
                        </div>

                        {/* RIGHT: Similar Properties & More Landmark Properties */}
                        <aside className="property-details__ad-sidebar">
                            <div className="property-details__ad-sticky">
                                <SimilarProperties currentProperty={property} />
                                <BuilderProperties property={property} />
                            </div>
                        </aside>
                    </div>

                    {/* Back to listings */}
                    <div className="property-details__bottom-link">
                        <Link href="/buy">
                            <ArrowLeft size={17} />
                            Explore More Properties in Pune
                        </Link>
                    </div>
                </div>
            </main>

            {/* Floating Enquiry Icon Button — Directly on top of back to top button */}
            <button
                type="button"
                className="property-floating-enquiry-btn"
                onClick={() => setIsEnquiryModalOpen(true)}
                aria-label="Enquire about this property"
                title="Enquire Now"
            >
                <PhoneCall size={20} />
            </button>

            {/* Enquiry Form Modal Popup */}
            {isEnquiryModalOpen && (
                <div
                    className="property-enquiry-modal-backdrop"
                    onClick={() => setIsEnquiryModalOpen(false)}
                    role="dialog"
                    aria-modal="true"
                >
                    <div
                        className="property-enquiry-modal"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            type="button"
                            className="property-enquiry-modal__close-btn"
                            onClick={() => setIsEnquiryModalOpen(false)}
                            aria-label="Close enquiry form"
                        >
                            <X size={18} />
                        </button>
                        <PropertyEnquiry
                            property={property}
                            isModal={true}
                            onClose={() => setIsEnquiryModalOpen(false)}
                        />
                    </div>
                </div>
            )}

            <Footer />
        </>
    );
}

export default PropertyDetails;
