"use client";

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
    MessageCircle,
    CheckCircle2,
    ChevronRight,
} from "lucide-react";

import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import PageHeroBanner from "../common/PageHeroBanner";

import PropertyGallery from "../property-details/PropertyGallery";
import PropertyOverview from "../property-details/PropertyOverview";
import ProjectSpecifications from "../property-details/ProjectSpecifications";
import PropertyAmenities from "../property-details/PropertyAmenities";
import PropertyMap from "../property-details/PropertyMap";
import SimilarProperties from "../property-details/SimilarProperties";
import BuilderProperties from "../property-details/BuilderProperties";
import PropertyEnquiry from "../property-details/PropertyEnquiry";

import AdvertisementSidebar from "../common/AdvertisementSidebar";

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

    const locationParts = [
        property.locality,
        property.location,
        property.city || "Pune",
    ]
        .filter(Boolean)
        .map((value) => String(value).trim())
        .filter((value, index, array) => {
            return (
                value &&
                array.findIndex(
                    (item) => item.toLowerCase() === value.toLowerCase()
                ) === index
            );
        });

    const location = locationParts.join(", ");

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

    return (
        <>
            <Header forceDark={true} theme="black" />

            <main className="property-details">
                <div className="property-details__container">
                    {/* Property gallery on top */}
                    <section className="property-details__gallery-section">
                        <PropertyGallery
                            images={uniqueImages}
                            title={title}
                        />
                    </section>

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

                                {property.featured && (
                                    <span className="property-details__badge property-details__badge--featured">
                                        Featured Property
                                    </span>
                                )}
                            </div>

                            <h1>{title}</h1>

                            <p className="property-details__location">
                                <MapPin size={17} />
                                <span>{location || "Pune, Maharashtra"}</span>
                            </p>

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

                            <a
                                href="#property-enquiry"
                                className="property-details__price-cta"
                            >
                                Enquire Now
                                <ArrowRight size={15} />
                            </a>
                        </div>
                    </section>

                    {/* 1. Project Specifications directly below Enquire Now */}
                    <ProjectSpecifications property={property} />

                    {/* Three-column content */}
                    <div className="property-details__layout">
                        {/* LEFT: Enquiry form */}
                        <aside className="property-details__sidebar property-details__sidebar--left">
                            <PropertyEnquiry property={property} />
                        </aside>

                        {/* CENTER: Property information */}
                        <div className="property-details__main">
                            {/* Property Description if available */}
                            {property.description && (
                                <section className="property-details__section property-details__description-card">
                                    <div className="property-details__section-heading">
                                        <div>
                                            <span className="property-details__eyebrow">
                                                PROPERTY OVERVIEW
                                            </span>
                                            <h2>About this property</h2>
                                        </div>
                                    </div>
                                    <div className="property-details__description-body">
                                        <p>{property.description}</p>
                                    </div>
                                </section>
                            )}

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

                        {/* RIGHT: Existing advertisement component */}
                        <aside className="property-details__ad-sidebar">
                            <div className="property-details__ad-sticky">
                                <AdvertisementSidebar />
                            </div>
                        </aside>
                    </div>

                    {/* 4. Similar Projects / Budgets & Area Cards */}
                    <SimilarProperties currentProperty={property} />

                    {/* 5. More Builder Properties Available */}
                    <BuilderProperties property={property} />

                    {/* Back to listings */}
                    <div className="property-details__bottom-link">
                        <Link href="/buy">
                            <ArrowLeft size={17} />
                            Explore More Properties in Pune
                        </Link>
                    </div>
                </div>
            </main>

            <Footer />
        </>
    );
}

export default PropertyDetails;
