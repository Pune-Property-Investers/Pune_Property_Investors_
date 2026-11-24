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
    PhoneCall,
    MessageCircle,
    CheckCircle2,
    ChevronRight,
    ChevronLeft,
    Heart,
    Share2,
    Image as ImageIcon,
    X,
} from "lucide-react";

import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import PageHeroBanner from "../common/PageHeroBanner";

import PropertyGallery from "../property-details/PropertyGallery";
import PropertyOverview from "../property-details/PropertyOverview";
import ProjectSpecifications from "../property-details/ProjectSpecifications";
import PropertyReels from "../property-details/PropertyReels";
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
    const [activeThemeTab, setActiveThemeTab] = useState("Gallery");
    const [isFavorite, setIsFavorite] = useState(false);
    const [shareToast, setShareToast] = useState(false);
    const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);

    // Favorite handler with localStorage
    useEffect(() => {
        try {
            if (typeof window !== "undefined") {
                const favs = JSON.parse(localStorage.getItem("ppi_favorites") || "[]");
                if (favs.includes(String(property.id))) {
                    setIsFavorite(true);
                }
            }
        } catch (_) { }
    }, [property.id]);

    const handleToggleFavorite = (e) => {
        e?.stopPropagation();
        try {
            if (typeof window !== "undefined") {
                const favs = JSON.parse(localStorage.getItem("ppi_favorites") || "[]");
                const idStr = String(property.id);
                let next;
                if (favs.includes(idStr)) {
                    next = favs.filter((id) => id !== idStr);
                    setIsFavorite(false);
                } else {
                    next = [...favs, idStr];
                    setIsFavorite(true);
                }
                localStorage.setItem("ppi_favorites", JSON.stringify(next));
            }
        } catch (_) { }
    };

    const handleShare = async (e) => {
        e?.stopPropagation();
        const shareData = {
            title: title,
            text: `Check out ${title} in ${location} on Pune Property Investors`,
            url: typeof window !== "undefined" ? window.location.href : "",
        };

        if (typeof navigator !== "undefined" && navigator.share) {
            try {
                await navigator.share(shareData);
            } catch (_) { }
        } else if (typeof navigator !== "undefined" && navigator.clipboard) {
            try {
                await navigator.clipboard.writeText(window.location.href);
                setShareToast(true);
                setTimeout(() => setShareToast(false), 2400);
            } catch (_) { }
        }
    };

    const handleTabClick = (tabId) => {
        setActiveThemeTab(tabId);
        if (tabId === "Gallery") {
            setIsGalleryModalOpen(true);
        } else if (tabId === "Outdoors") {
            const el = document.getElementById("amenities");
            if (el) {
                el.scrollIntoView({ behavior: "smooth" });
            }
        } else if (tabId === "Video") {
            const el = document.getElementById("video-tour");
            if (el) {
                el.scrollIntoView({ behavior: "smooth" });
            }
        } else if (tabId === "Brochure") {
            setIsEnquiryModalOpen(true);
        }
    };

    // Lock body scroll and handle Escape key for modals
    useEffect(() => {
        if (isEnquiryModalOpen || isGalleryModalOpen) {
            const prevOverflow = document.body.style.overflow;
            document.body.style.overflow = "hidden";

            const handleKeyDown = (e) => {
                if (e.key === "Escape") {
                    setIsEnquiryModalOpen(false);
                    setIsGalleryModalOpen(false);
                }
            };
            window.addEventListener("keydown", handleKeyDown);

            return () => {
                document.body.style.overflow = prevOverflow;
                window.removeEventListener("keydown", handleKeyDown);
            };
        }
    }, [isEnquiryModalOpen, isGalleryModalOpen]);

    const videoId =
        extractYouTubeVideoId(property?.videoUrl) ||
        extractYouTubeVideoId(property?.videoId) ||
        "M1sDYNUJQrY";

    // Split price into Main (e.g. ₹85) and Sub (e.g. Lakh – ₹1.3 Cr) matching uploaded photo
    const priceClean = price || "₹85 Lakh";
    const priceMatch = priceClean.match(/^(₹?\s*[\d.]+)\s*(.*)$/);
    const priceMain = priceMatch ? priceMatch[1].trim() : priceClean;
    const priceSub = priceMatch && priceMatch[2] ? priceMatch[2].trim() : "All inc.";

    const bhkBadge = property.bhk
        ? `${property.bhk} BHK`
        : availableFlats?.replace(/flats/i, "").trim() || configuration || "2 & 3 BHK";

    const possessionBadge = property.possession?.toLowerCase().includes("ready")
        ? "Ready to Move"
        : property.possession || "Ready to Move";

    const carpetAreaText = property.carpetArea
        ? `${property.carpetArea} sq.ft`
        : property.area
            ? `${property.area} sq.ft`
            : "1,120 sq.ft";

    const possessionText = property.possession || "Dec 2028";
    const developerName = property.developer || property.builder || "Leading Developer";

    return (
        <>
            <Header transparentAtTop={true} />

            <main className="property-details property-details--vtp-theme">
                {/* 1. CINEMATIC HERO IMAGE WITH TOP CONTROLS (EXACT PHOTO REPLICA) */}
                <div className="vtp-hero-viewport">
                    <img
                        src={uniqueImages[0] || "/images/properties/default.jpg"}
                        alt={title}
                        className="vtp-hero-img"
                    />

                    {/* Floating Circular Controls at Top of Image */}
                    <div className="vtp-hero-top-bar" onClick={(e) => e.stopPropagation()}>
                        <Link
                            href="/buy"
                            className="vtp-circle-btn"
                            aria-label="Back to properties"
                            title="Back"
                        >
                            <ChevronLeft size={22} />
                        </Link>

                        <div className="vtp-hero-top-bar__right">
                            <button
                                type="button"
                                className={`vtp-circle-btn ${isFavorite ? "vtp-circle-btn--active" : ""}`}
                                onClick={handleToggleFavorite}
                                aria-label="Favorite property"
                                title={isFavorite ? "Saved" : "Save property"}
                            >
                                <Heart
                                    size={19}
                                    fill={isFavorite ? "#ef4444" : "none"}
                                    color={isFavorite ? "#ef4444" : "#1e293b"}
                                />
                            </button>

                            <button
                                type="button"
                                className="vtp-circle-btn"
                                onClick={handleShare}
                                aria-label="Share property"
                                title="Share"
                            >
                                <Share2 size={19} />
                            </button>
                        </div>
                    </div>

                    {/* Corner Photo Count Pill */}
                    <button
                        type="button"
                        className="vtp-hero-photos-pill"
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsGalleryModalOpen(true);
                        }}
                        title="View photo gallery"
                    >
                        <ImageIcon size={14} />
                        <span>{uniqueImages.length} Photos</span>
                    </button>

                    {shareToast && (
                        <div className="vtp-share-toast">
                            Link copied to clipboard!
                        </div>
                    )}
                </div>

                <div className="property-details__container">
                    {/* 2. FLOATING OVERLAPPING HERO CARD (EXACT PHOTO REPLICA) */}
                    <div className="vtp-floating-card-wrapper">
                        <section className="vtp-floating-card" aria-label="Property summary">
                            {/* Dark Badge: "2 & 3 BHK • Ready to Move" */}
                            <div className="vtp-card-badge">
                                <span>{bhkBadge}</span>
                                <span className="vtp-card-badge__dot">•</span>
                                <span className="vtp-card-badge__status">{possessionBadge}</span>
                            </div>

                            {/* Main Title & Price Row */}
                            <div className="vtp-card-title-row">
                                <div className="vtp-card-title-col">
                                    <h1 className="vtp-card-title">{title}</h1>
                                    <p className="vtp-card-location">
                                        <MapPin size={15} />
                                        <span>{location} • By {developerName}</span>
                                    </p>
                                </div>

                                <div className="vtp-card-price-col">
                                    <div className="vtp-card-price-main">{priceMain}</div>
                                    <div className="vtp-card-price-sub">{priceSub}</div>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* 3. TABS BAR: Gallery | Outdoors | Video | Brochure (EXACT PHOTO REPLICA) */}
                    <nav className="vtp-tabs-bar" role="tablist">
                        {[
                            { id: "Gallery", label: "Gallery" },
                            { id: "Outdoors", label: "Outdoors" },
                            { id: "Video", label: "Video" },
                            { id: "Brochure", label: "Brochure" },
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                type="button"
                                role="tab"
                                aria-selected={activeThemeTab === tab.id}
                                className={`vtp-tab-btn ${activeThemeTab === tab.id ? "vtp-tab-btn--active" : ""}`}
                                onClick={() => handleTabClick(tab.id)}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </nav>

                    {/* 4. 3-COLUMN STATS ROW: Carpet Area | Possession | RERA Verified (EXACT PHOTO REPLICA) */}
                    <div className="vtp-stats-row">
                        <div className="vtp-stat-item">
                            <div className="vtp-stat-value">{carpetAreaText}</div>
                            <div className="vtp-stat-label">Carpet Area</div>
                        </div>

                        <div className="vtp-stat-divider" />

                        <div className="vtp-stat-item">
                            <div className="vtp-stat-value">{possessionText}</div>
                            <div className="vtp-stat-label">Possession</div>
                        </div>

                        <div className="vtp-stat-divider" />

                        <div className="vtp-stat-item">
                            <div className="vtp-stat-value">Verified</div>
                            <div className="vtp-stat-label">RERA Verified</div>
                        </div>
                    </div>

                    {/* Project Specifications */}
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

                    {/* Reels / Shorts Slider directly below About Property Section */}
                    <PropertyReels property={property} />

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
                                onEnquire={() => setIsEnquiryModalOpen(true)}
                            />

                            {/* 3. Location & Google Map with Connectivity */}
                            <PropertyMap property={property} />

                            {/* 4. Builder Legacy, Track Record & Portfolio Showcase */}
                            <BuilderProperties
                                property={property}
                                onEnquire={() => setIsEnquiryModalOpen(true)}
                            />

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

                        {/* RIGHT: Similar Properties */}
                        <aside className="property-details__ad-sidebar">
                            <div className="property-details__ad-sticky">
                                <SimilarProperties currentProperty={property} />
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

            {/* FULL PHOTO GALLERY LIGHTBOX MODAL */}
            {isGalleryModalOpen && (
                <div
                    className="vtp-gallery-modal-backdrop"
                    onClick={() => setIsGalleryModalOpen(false)}
                    role="dialog"
                    aria-modal="true"
                >
                    <div
                        className="vtp-gallery-modal-content"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            type="button"
                            className="vtp-gallery-modal-close"
                            onClick={() => setIsGalleryModalOpen(false)}
                            aria-label="Close photo gallery"
                        >
                            <X size={22} />
                        </button>
                        <PropertyGallery images={uniqueImages} title={title} />
                    </div>
                </div>
            )}

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
