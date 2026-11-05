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

import PropertyHeroHead from "../property-details/PropertyHeroHead";
import PropertyGallery from "../property-details/PropertyGallery";
import PropertyOverview from "../property-details/PropertyOverview";
import PropertyAmenities from "../property-details/PropertyAmenities";
import PropertyEnquiry from "../property-details/PropertyEnquiry";

import AdvertisementSidebar from "../common/AdvertisementSidebar";
import propertyListingsData from "../../data/propertyListingsData.js";
import trendingProjects from "../../data/trendingProjectsData.js";

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
                <Header />

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
            <Header />

            {/* Premium Full-Width Head Section for View Details */}
            <PropertyHeroHead
                property={property}
                title={title}
                price={price}
                location={location}
                configuration={configuration}
                area={area}
                whatsappMessage={whatsappMessage}
                whatsappNumber={WHATSAPP_NUMBER}
                advisorPhone={ADVISOR_PHONE}
                backgroundImage={uniqueImages[0] || property.image}
            />

            <main className="property-details">
                <div className="property-details__container">
                    {/* Property gallery */}
                    <section className="property-details__gallery-section">
                        <PropertyGallery
                            images={uniqueImages}
                            title={title}
                        />
                    </section>

                    {/* Property highlights */}
                    <section
                        className="property-details__highlights"
                        aria-label="Property highlights"
                    >
                        {highlights.map((item) => (
                            <article
                                className="property-details__highlight"
                                key={item.label}
                            >
                                <div className="property-details__highlight-icon">
                                    {item.icon}
                                </div>

                                <div className="property-details__highlight-content">
                                    <span>{item.label}</span>
                                    <strong>{item.value}</strong>
                                </div>
                            </article>
                        ))}
                    </section>

                    {/* Three-column content */}
                    <div className="property-details__layout">
                        {/* LEFT: Enquiry form */}
                        <aside className="property-details__sidebar property-details__sidebar--left">
                            <div
                                className="property-details__enquiry-wrapper"
                                id="property-enquiry"
                            >
                                <div className="property-details__enquiry-heading">
                                    <span>
                                        INTERESTED IN THIS PROPERTY?
                                    </span>

                                    <h2>Get More Information</h2>

                                    <p>
                                        Share your details and our team will
                                        contact you.
                                    </p>
                                </div>

                                <PropertyEnquiry property={property} />

                                <a
                                    className="property-details__whatsapp"
                                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <MessageCircle size={18} />
                                    Enquire on WhatsApp
                                </a>

                                <a
                                    className="property-details__call"
                                    href={`tel:${ADVISOR_PHONE}`}
                                >
                                    <Phone size={17} />
                                    Call Property Advisor
                                </a>

                                <div className="property-details__privacy">
                                    <ShieldCheck size={15} />

                                    <span>
                                        Your information will be handled
                                        with care.
                                    </span>
                                </div>
                            </div>
                        </aside>

                        {/* CENTER: Property information */}
                        <div className="property-details__main">
                            {/* Overview */}
                            <section className="property-details__section">
                                <div className="property-details__section-heading">
                                    <div>
                                        <span className="property-details__eyebrow">
                                            PROPERTY INFORMATION
                                        </span>

                                        <h2>About this property</h2>
                                    </div>
                                </div>

                                <PropertyOverview property={property} />
                            </section>

                            {/* Pricing */}
                            <section className="property-details__section property-details__pricing">
                                <div className="property-details__section-heading">
                                    <div>
                                        <span className="property-details__eyebrow">
                                            PRICING INFORMATION
                                        </span>

                                        <h2>Price & property details</h2>
                                    </div>
                                </div>

                                <div className="property-details__price-card">
                                    <div className="property-details__price-card-main">
                                        <span>Listed price</span>

                                        <strong>{price}</strong>

                                        <p>
                                            Contact our property advisors
                                            for current availability and
                                            pricing.
                                        </p>
                                    </div>

                                    <div className="property-details__price-card-divider" />

                                    <div className="property-details__price-card-info">
                                        <div>
                                            <span>Configuration</span>
                                            <strong>{configuration}</strong>
                                        </div>

                                        <div>
                                            <span>Area</span>
                                            <strong>{area}</strong>
                                        </div>

                                        <div>
                                            <span>Possession</span>
                                            <strong>
                                                {property.possession ||
                                                    "Contact for details"}
                                            </strong>
                                        </div>
                                    </div>

                                    <a
                                        href="#property-enquiry"
                                        className="property-details__outline-cta"
                                    >
                                        Request Detailed Pricing
                                        <ArrowRight size={16} />
                                    </a>
                                </div>
                            </section>

                            {/* Amenities */}
                            <section className="property-details__section">
                                <div className="property-details__section-heading">
                                    <div>
                                        <span className="property-details__eyebrow">
                                            COMFORT & LIFESTYLE
                                        </span>

                                        <h2>Amenities & features</h2>
                                    </div>
                                </div>

                                <PropertyAmenities
                                    amenities={property.amenities}
                                />
                            </section>

                            {/* Location */}
                            <section className="property-details__section property-details__location-section">
                                <div className="property-details__section-heading">
                                    <div>
                                        <span className="property-details__eyebrow">
                                            EXPLORE THE NEIGHBOURHOOD
                                        </span>

                                        <h2>Location & neighbourhood</h2>
                                    </div>
                                </div>

                                <div className="property-details__location-card">
                                    <div className="property-details__location-icon">
                                        <MapPin size={24} />
                                    </div>

                                    <div>
                                        <h3>
                                            {location || "Pune, Maharashtra"}
                                        </h3>

                                        <p>
                                            Contact our Pune property
                                            advisors to learn about nearby
                                            IT parks, schools, hospitals,
                                            shopping centres and transport
                                            facilities.
                                        </p>
                                    </div>
                                </div>
                            </section>

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
                                        Our team can help you understand
                                        the property details, pricing and
                                        next steps. Confirm all project
                                        information before making a
                                        purchase decision.
                                    </p>
                                </div>

                                <Link href="/contact">
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

                    {/* Back to listings */}
                    <div className="property-details__bottom-link">
                        <Link href="/buy">
                            <ArrowLeft size={17} />
                            Explore More Properties
                        </Link>
                    </div>
                </div>
            </main>

            <Footer />
        </>
    );
}

export default PropertyDetails;
