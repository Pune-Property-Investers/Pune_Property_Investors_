"use client";

import { useState, useEffect, useMemo, useRef } from "react";
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
import PropertyFloorPlans, { getFloorPlansData } from "../property-details/PropertyFloorPlans";
import PropertyAmenities from "../property-details/PropertyAmenities";
import PropertyMap from "../property-details/PropertyMap";
import SimilarProperties from "../property-details/SimilarProperties";
import BuilderProperties, { resolvePropertyBuilder } from "../property-details/BuilderProperties";
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

    const rawBhk = Array.isArray(property.bhk) ? property.bhk[0] : property.bhk || property.bedrooms;
    if (rawBhk && Number(rawBhk) !== 0) {
        const b = String(rawBhk);
        if (/bhk/i.test(b)) return `${b} Flats`;
        return `${rawBhk} BHK Flats`;
    }

    return "1, 2 & 3 BHK Flats";
}

import { findProperty } from "../../lib/propertyUtils";
import { propertyService } from "../../services/property.service";
import { isBackendConfigured } from "../../services/api";

/**
 * @param {{ propertyId?: string | number | null; propertySlug?: string | null }} props
 */
function PropertyDetails({ propertyId, propertySlug }) {
    const params = useParams();
    const identifier = propertyId || propertySlug || params?.id || params?.slug;
    const cachedProperty = propertyService.getCachedById(identifier);
    const [apiProperty, setApiProperty] = useState(cachedProperty);
    const [loadingApi, setLoadingApi] = useState(!cachedProperty && Boolean(identifier));

    useEffect(() => {
        if (!identifier) return;
        let cancelled = false;
        propertyService.getById(identifier).then((res) => {
            const item = res?.data || res;
            if (!cancelled && item && (item.id || item.slug || item.title)) {
                setApiProperty(item);
            }
        }).catch(() => {
            if (!cancelled && !cachedProperty) setApiProperty(null);
        }).finally(() => {
            if (!cancelled) setLoadingApi(false);
        });
        return () => { cancelled = true; };
    }, [identifier]);

    const property = apiProperty;

    if (!property && loadingApi) {
        return (
            <>
                <Header transparentAtTop={true} showFilterChips={false} />
                <main className="property-details__not-found" style={{ minHeight: "70vh" }}>
                    <div
                        style={{
                            width: "100%",
                            maxWidth: "1100px",
                            margin: "0 auto",
                            display: "grid",
                            gap: "18px",
                        }}
                    >
                        <div style={{ height: "380px", borderRadius: "18px", background: "linear-gradient(90deg, #e2e8f0 25%, #f1f5f9 50%, #e2e8f0 75%)", backgroundSize: "200% 100%" }} />
                        <div style={{ height: "32px", width: "60%", borderRadius: "8px", background: "#e2e8f0" }} />
                        <div style={{ height: "20px", width: "40%", borderRadius: "8px", background: "#f1f5f9" }} />
                    </div>
                </main>
                <Footer />
            </>
        );
    }

    if (!property) {
        return (
            <>
                <Header transparentAtTop={true} showFilterChips={false} />

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

    return <PropertyDetailsContent property={property} />;
}

function PropertyDetailsContent({ property }) {

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
    const [activeThemeTab, setActiveThemeTab] = useState("Overview");
    const [selectedBhk, setSelectedBhk] = useState(null);
    const [isFavorite, setIsFavorite] = useState(false);
    const [shareToast, setShareToast] = useState(false);
    const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
    const [heroSlideIndex, setHeroSlideIndex] = useState(0);
    const [isHeroInstant, setIsHeroInstant] = useState(false);
    const [isHeroPaused, setIsHeroPaused] = useState(false);
    const heroTouchStartX = useRef(null);

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

    const PROPERTY_TABS = [
        { id: "Overview", label: "Overview", targetId: "overview" },
        { id: "Floor Plan", label: "Floor Plan", targetId: "floor-plans" },
        { id: "Amenities", label: "Amenities", targetId: "amenities-section" },
        { id: "Similar Property", label: "Similar Property", targetId: "similar-properties" },
    ];

    const handleTabClick = (tabId) => {
        setActiveThemeTab(tabId);
        const tab = PROPERTY_TABS.find((t) => t.id === tabId);
        if (!tab) return;
        const el = document.getElementById(tab.targetId);
        if (el) {
            const topOffset = 112;
            const elementTop = el.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({
                top: Math.max(0, elementTop - topOffset),
                behavior: "smooth",
            });
        }
    };

    // Sync active tab underline as user scrolls across Overview -> Floor Plan -> Amenities -> Similar Property
    useEffect(() => {
        if (typeof window === "undefined") return;
        let ticking = false;
        const handleScrollSpy = () => {
            if (ticking) return;
            ticking = true;
            window.requestAnimationFrame(() => {
                const triggerY = 155;
                let currentTab = "Overview";
                for (const tab of PROPERTY_TABS) {
                    const el = document.getElementById(tab.targetId);
                    if (el && el.getBoundingClientRect().top <= triggerY) {
                        currentTab = tab.id;
                    }
                }
                setActiveThemeTab((prev) => (prev === currentTab ? prev : currentTab));
                ticking = false;
            });
        };

        window.addEventListener("scroll", handleScrollSpy, { passive: true });
        return () => window.removeEventListener("scroll", handleScrollSpy);
    }, []);

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

    const cleanAreaStr = (val) => {
        if (!val) return "";
        const str = String(val).replace(/\s*sq\.?\s*ft\.?/gi, "").trim();
        return str ? `${str} sq.ft` : "";
    };

    const carpetAreaText = cleanAreaStr(property.carpetArea) || cleanAreaStr(property.area) || "1,120 sq.ft";

    const possessionText = property.possession || "Dec 2028";
    const builderProfile = resolvePropertyBuilder(property);
    const developerName = builderProfile.name;
    const builderLogoSrc = builderProfile.logoSrc;
    const builderInitials = builderProfile.initials;

    const displayPropertyName = property.projectName || property.name || title;

    const bhkPriceItems = (() => {
        const plans = getFloorPlansData(property) || [];
        const seen = new Set();
        const items = [];
        for (const p of plans) {
            const label = p.bhk || p.bhkCategory || "";
            if (!label || seen.has(label)) continue;
            seen.add(label);
            items.push({
                label,
                price: p.price || priceClean,
                carpetArea: p.carpetArea,
                image: p.image || "",
            });
            if (items.length >= 8) break;
        }
        if (items.length === 0) {
            items.push({ label: bhkBadge, price: priceClean, carpetArea: null, image: "" });
        }
        return items;
    })();

    const selectedBhkIndex = selectedBhk
        ? bhkPriceItems.findIndex((item) => item.label === selectedBhk)
        : -1;
    const selectedBhkItem = selectedBhkIndex >= 0 ? bhkPriceItems[selectedBhkIndex] : null;
    const activeHeroImage =
        selectedBhkItem?.image ||
        (selectedBhkIndex >= 0 && uniqueImages.length > 0
            ? uniqueImages[selectedBhkIndex % uniqueImages.length]
            : uniqueImages[0]) ||
        "/images/properties/default.jpg";
    const displayCarpetArea = selectedBhkItem?.carpetArea
        ? cleanAreaStr(selectedBhkItem.carpetArea)
        : carpetAreaText;
    const displayPropertyPrice = selectedBhkItem?.price || priceClean;

    const heroImages = useMemo(() => {
        const list = uniqueImages.length > 0 ? [...uniqueImages] : ["/images/properties/default.jpg"];
        if (selectedBhkItem?.image && !list.includes(selectedBhkItem.image)) {
            list.unshift(selectedBhkItem.image);
        }
        return list;
    }, [uniqueImages, selectedBhkItem]);

    useEffect(() => {
        if (selectedBhkIndex >= 0 && heroImages.length > 0) {
            const targetIdx = selectedBhkItem?.image
                ? heroImages.indexOf(selectedBhkItem.image)
                : selectedBhkIndex % heroImages.length;
            setHeroSlideIndex(targetIdx >= 0 ? targetIdx : 0);
        }
    }, [selectedBhkIndex, selectedBhkItem, heroImages]);

    useEffect(() => {
        if (heroImages.length <= 1 || isHeroPaused || isGalleryModalOpen) return;
        const timer = setInterval(() => {
            setIsHeroInstant(false);
            setHeroSlideIndex((prev) => (prev >= heroImages.length ? 1 : prev + 1));
        }, 2800);
        return () => clearInterval(timer);
    }, [heroImages.length, isHeroPaused, isGalleryModalOpen]);

    const safeHeroIndex = heroImages.length > 0 ? heroSlideIndex % heroImages.length : 0;
    const trackImages = heroImages.length > 1 ? [...heroImages, heroImages[0]] : heroImages;

    return (
        <>
            <Header transparentAtTop={true} showFilterChips={false} />

            <main className="property-details property-details--vtp-theme">
                {/* 1. CINEMATIC SLIDING HERO VIEWPORT WITH SMALL PHOTO THUMBNAILS */}
                <div
                    className="vtp-hero-viewport"
                    onMouseEnter={() => setIsHeroPaused(true)}
                    onMouseLeave={() => setIsHeroPaused(false)}
                    onTouchStart={(e) => {
                        heroTouchStartX.current = e.touches?.[0]?.clientX ?? null;
                        setIsHeroPaused(true);
                    }}
                    onTouchEnd={(e) => {
                        const startX = heroTouchStartX.current;
                        const endX = e.changedTouches?.[0]?.clientX ?? null;
                        if (startX !== null && endX !== null && heroImages.length > 1) {
                            const diff = startX - endX;
                            if (Math.abs(diff) > 35) {
                                setIsHeroInstant(false);
                                setHeroSlideIndex((prev) => {
                                    const current = prev % heroImages.length;
                                    return diff > 0
                                        ? current + 1
                                        : (current - 1 + heroImages.length) % heroImages.length;
                                });
                            }
                        }
                        heroTouchStartX.current = null;
                        setIsHeroPaused(false);
                    }}
                >
                    <div
                        className={`vtp-hero-slider-track ${isHeroInstant ? "vtp-hero-slider-track--instant" : ""}`}
                        style={{ transform: `translate3d(-${heroSlideIndex * 100}%, 0, 0)` }}
                        onTransitionEnd={() => {
                            if (heroImages.length > 1 && heroSlideIndex >= heroImages.length) {
                                setIsHeroInstant(true);
                                setHeroSlideIndex(0);
                                requestAnimationFrame(() => {
                                    requestAnimationFrame(() => setIsHeroInstant(false));
                                });
                            }
                        }}
                    >
                        {trackImages.map((imgSrc, imgIdx) => (
                            <div className="vtp-hero-slide" key={`${imgSrc}-${imgIdx}`}>
                                <img
                                    src={imgSrc}
                                    alt={`${title} - Photo ${(imgIdx % heroImages.length) + 1}`}
                                    className="vtp-hero-img"
                                />
                            </div>
                        ))}
                    </div>

                    {/* Small Photo Thumbnails Strip at Corner Count Position */}
                    <div className="vtp-hero-thumbs-bar" aria-label="Property photos">
                        {heroImages.map((imgSrc, imgIdx) => {
                            const isActiveThumb = imgIdx === safeHeroIndex;
                            return (
                                <button
                                    key={`thumb-${imgSrc}-${imgIdx}`}
                                    type="button"
                                    className={`vtp-hero-thumb-btn ${isActiveThumb ? "vtp-hero-thumb-btn--active" : ""}`}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setHeroSlideIndex(imgIdx);
                                    }}
                                    aria-label={`Show photo ${imgIdx + 1}`}
                                    aria-current={isActiveThumb ? "true" : undefined}
                                >
                                    <img
                                        src={imgSrc}
                                        alt={`${title} thumbnail ${imgIdx + 1}`}
                                        className="vtp-hero-thumb-img"
                                    />
                                </button>
                            );
                        })}
                        <button
                            type="button"
                            className="vtp-hero-thumb-expand"
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsGalleryModalOpen(true);
                            }}
                            title="Open full gallery"
                            aria-label="Open full photo gallery"
                        >
                            <ImageIcon size={13} />
                        </button>
                    </div>
                </div>

                <div className="property-details__container">
                    {/* 2. FLOATING OVERLAPPING HERO CARD (EXACT PHOTO REPLICA) */}
                    <div className="vtp-floating-card-wrapper">
                        <section className="vtp-floating-card" aria-label="Property summary">
                            {/* Main Row: Property Name -> BHK Pill -> Location + Round Builder Logo */}
                            <div className="vtp-card-title-row">
                                <div className="vtp-card-title-col">
                                    <h1 className="vtp-card-title">{displayPropertyName}</h1>

                                    <div className="vtp-card-badge">
                                        <span>{selectedBhk || bhkBadge}</span>
                                        <span className="vtp-card-badge__dot">•</span>
                                        <span className="vtp-card-badge__status">{possessionBadge}</span>
                                    </div>

                                    <p className="vtp-card-location">
                                        <MapPin size={15} />
                                        <span>{location}</span>
                                    </p>
                                </div>

                                <div className="vtp-card-builder-logo-col" title={builderProfile?.name || developerName}>
                                    {builderLogoSrc ? (
                                        <img
                                            src={builderLogoSrc}
                                            alt={builderProfile?.name || developerName}
                                            className="vtp-card-builder-logo-img"
                                            onError={(e) => {
                                                e.currentTarget.style.display = "none";
                                                if (e.currentTarget.nextSibling) {
                                                    e.currentTarget.nextSibling.style.display = "flex";
                                                }
                                            }}
                                        />
                                    ) : null}
                                    <span
                                        className="vtp-card-builder-logo-fallback"
                                        style={{ display: builderLogoSrc ? "none" : "flex" }}
                                    >
                                        {builderInitials}
                                    </span>
                                </div>
                            </div>

                            {/* BHK & Price Horizontal Row (Top: BHK, Below: Price) */}
                            <div className="vtp-bhk-price-row" aria-label="Configurations and prices">
                                {bhkPriceItems.map((item, idx) => {
                                    const isActive = selectedBhk === item.label;
                                    return (
                                        <button
                                            type="button"
                                            className={`vtp-bhk-price-item ${isActive ? "vtp-bhk-price-item--active" : ""}`}
                                            key={`${item.label}-${idx}`}
                                            onClick={() =>
                                                setSelectedBhk((prev) => (prev === item.label ? null : item.label))
                                            }
                                            aria-pressed={isActive}
                                        >
                                            <span className="vtp-bhk-price-item__bhk">{item.label}</span>
                                            <span className="vtp-bhk-price-item__price">{item.price}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </section>
                    </div>

                    {/* 3. TABS BAR: Overview | Floor Plan | Amenities | Similar Property */}
                    <nav className="vtp-tabs-bar" role="tablist" aria-label="Property sections">
                        {PROPERTY_TABS.map((tab) => (
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

                    {/* 4. 3-COLUMN STATS ROW: Carpet Area | Possession | Property Price */}
                    <div className="vtp-stats-row">
                        <div className="vtp-stat-item">
                            <div className="vtp-stat-value">{displayCarpetArea}</div>
                            <div className="vtp-stat-label">Carpet Area</div>
                        </div>

                        <div className="vtp-stat-divider" />

                        <div className="vtp-stat-item">
                            <div className="vtp-stat-value">{possessionText}</div>
                            <div className="vtp-stat-label">Possession</div>
                        </div>

                        <div className="vtp-stat-divider" />

                        <div className="vtp-stat-item">
                            <div className="vtp-stat-value">{displayPropertyPrice}</div>
                            <div className="vtp-stat-label">Starting Price</div>
                        </div>
                    </div>

                    {/* Overview Anchor: Project Specifications + About Property + Reels */}
                    <div id="overview" className="vtp-section-anchor">
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
                    </div>

                    {/* 2. Floor Plans & Architectural Layouts directly below About Property */}
                    <PropertyFloorPlans
                        property={property}
                        onEnquire={() => setIsEnquiryModalOpen(true)}
                        selectedBhk={selectedBhk}
                        onSelectBhk={setSelectedBhk}
                    />

                    {/* Main content and ad sidebar layout */}
                    <div className="property-details__layout">
                        {/* CENTER: Property information */}
                        <div className="property-details__main">
                            {/* 2. Amenities (Internal Amenities & Outdoor Amenities) */}
                            <div id="amenities-section" className="vtp-section-anchor">
                                <PropertyAmenities
                                    amenities={property.amenities}
                                    showHeader={true}
                                    property={property}
                                    onEnquire={() => setIsEnquiryModalOpen(true)}
                                />
                            </div>

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
                        <aside id="similar-properties" className="property-details__ad-sidebar vtp-section-anchor">
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
