"use client";

import Link from "next/link";
import {
    ShieldCheck,
    MapPin,
    Users,
    TrendingUp,
    Phone,
    Mail,
    ArrowRight,
    CheckCircle2,
    Building2,
    Navigation,
} from "lucide-react";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import PageHeroBanner from "../common/PageHeroBanner";
import AboutSection from "../home/AboutSection";
import { usePublishedCms } from "../../services/liveContent";
import "./About.css";

const OFFICE_LOCATIONS = [
    {
        name: "Kharadi (Headquarters)",
        type: "",
        isHeadquarters: true,
        address: "3rd Floor, Gera Imperium Alpha, Grant Road, Vitthal Nagar, Kharadi, Pune, Maharashtra 411014",
        zone: "East Pune • Corporate Office",
        mapUrl: "https://maps.app.goo.gl/49jQdRiP4CCgNMCP7",
    },
    {
        name: "Narhe / Vadgaon bk Office",
        type: "Branch Office",
        isHeadquarters: false,
        address: "Office No:- 09 , Ground Floor , Beside Jagade Patil Developers , Below Pulse Multi-speciality Hospital , Vishwa Arcade , Navale Bridge, Vadgaon bk,  Narhe, Pune . 411041",
        zone: "South-West Pune • Highway Corridor",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Vishwa+Arcade+Navale+Bridge+Vadgaon+bk+Narhe+Pune+411041",
    },
    {
        name: "Dighi Office",
        type: "Branch Office",
        isHeadquarters: false,
        address: "3rd floor, rajnandini tower, above hdfc bank, parande nagar, dighi 411015",
        zone: "North Pune • PCMC Corridor",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Rajnandini+Tower+Parande+Nagar+Dighi+Pune+411015",
    },
];

export default function AboutPage() {
    const published = usePublishedCms();
    const aboutData = published?.homepage?.about || null;

    return (
        <div className="about-page">
            <Header />

            <main>
                {/* Hero Header Section */}
                <PageHeroBanner
                    title={aboutData?.title || "Guiding Your Journey With"}
                    titleAccent={aboutData?.titleAccent || "Trust & Expertise."}
                    eyebrow={aboutData?.eyebrow || "ABOUT PUNE PROPERTY INVESTOR"}
                    description={
                        aboutData?.description ||
                        "Pune Property Investors is your dedicated advisory partner helping homebuyers, NRI investors, and commercial clients make verified, high-yielding property decisions across Pune's fastest growing corridors."
                    }
                    breadcrumbs={[
                        { label: "Home", href: "/" },
                        { label: "About Us" },
                    ]}
                    backgroundImage={
                        aboutData?.backgroundImage ||
                        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85"
                    }
                />

                <div className="about-page__content">
                    {/* Core Pillars */}
                    <section className="container about-pillars-section">
                        <div className="about-pillars-grid">
                            <div className="about-pillar-card">
                                <div className="about-pillar-icon">
                                    <ShieldCheck size={26} />
                                </div>
                                <h3 className="about-pillar-title">
                                    100% Verified Properties
                                </h3>
                                <p className="about-pillar-desc">
                                    Every property listed is vetted for legal
                                    compliance, developer credentials, RERA
                                    approvals, and clear titles to ensure your
                                    peace of mind.
                                </p>
                            </div>

                            <div className="about-pillar-card">
                                <div className="about-pillar-icon">
                                    <TrendingUp size={26} />
                                </div>
                                <h3 className="about-pillar-title">
                                    High Capital Appreciation
                                </h3>
                                <p className="about-pillar-desc">
                                    We identify strategic micro-markets positioned
                                    near major upcoming infrastructure like Metro
                                    corridors, Ring Road, and IT hubs for maximum
                                    ROI.
                                </p>
                            </div>

                            <div className="about-pillar-card">
                                <div className="about-pillar-icon">
                                    <Users size={26} />
                                </div>
                                <h3 className="about-pillar-title">
                                    Personalized Advisory
                                </h3>
                                <p className="about-pillar-desc">
                                    Our seasoned real estate consultants guide you
                                    end-to-end, from requirement analysis, site
                                    visits, price negotiations, to loan
                                    sanctioning.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Partnership Built on Trust */}
                    <AboutSection />

                    {/* Company Story & Office */}
                    <section className="container about-story-section">
                        <div className="about-story-card">
                            <div>
                                <span className="about-mission-tag">
                                    OUR MISSION
                                </span>
                                <h2 className="about-mission-heading">
                                    {aboutData?.storyTitle || "Empowering Homebuyers With Market Transparency"}
                                </h2>
                                {aboutData?.storyContent ? (
                                    <div
                                        className="about-mission-desc"
                                        dangerouslySetInnerHTML={{ __html: aboutData.storyContent }}
                                    />
                                ) : (
                                    <p className="about-mission-desc">
                                        Headquartered in Kharadi, Pune, Pune Property
                                        Investors was founded with a singular focus:
                                        bringing complete honesty, professional advisory,
                                        and data-backed market analysis to Pune&apos;s
                                        thriving real estate landscape. With our headquarters in Kharadi
                                        and branch offices in Narhe and Dighi, our advisory covers
                                        all prime residential and commercial corridors of Pune.
                                    </p>
                                )}
                                <ul className="about-checklist">
                                    <li className="about-checklist-item">
                                        <CheckCircle2 size={18} />
                                        Direct builder tie-ups offering exclusive
                                        zero-brokerage deals.
                                    </li>
                                    <li className="about-checklist-item">
                                        <CheckCircle2 size={18} />
                                        Complete portfolio across East, West, North,
                                        and South Pune corridors.
                                    </li>
                                    <li className="about-checklist-item">
                                        <CheckCircle2 size={18} />
                                        Dedicated post-sales and property management
                                        assistance.
                                    </li>
                                </ul>
                                <Link
                                    href={aboutData?.ctaUrl || "/buy"}
                                    className="primary-button about-browse-btn"
                                >
                                    {aboutData?.ctaText || "Browse Available Properties"}
                                    <ArrowRight size={17} />
                                </Link>
                            </div>

                            <div className="about-contact-card">
                                <h3 className="about-contact-title">
                                    Our Offices &amp; Contact
                                </h3>

                                <div className="about-offices-list">
                                    {/* Headquarters */}
                                    <div className="about-office-row">
                                        <MapPin
                                            size={18}
                                            className="about-contact-icon about-contact-icon--gold"
                                        />
                                        <div className="about-office-detail">
                                            <div className="about-office-header-line">
                                                <strong className="about-office-name">
                                                    Kharadi (Headquarters)
                                                </strong>
                                            </div>
                                            <span className="about-contact-text">
                                                3rd Floor, Gera Imperium Alpha, Grant Road, Vitthal Nagar, Kharadi, Pune, Maharashtra 411014
                                            </span>
                                        </div>
                                    </div>

                                    {/* Horizontal Branch Offices: Narhe & Dighi */}
                                    <div className="about-branches-horizontal">
                                        <div className="about-branch-item">
                                            <MapPin size={17} className="about-contact-icon" />
                                            <span className="about-branch-name">
                                                Narhe / Vadgaon bk Office
                                            </span>
                                        </div>
                                        <div className="about-branch-item">
                                            <MapPin size={17} className="about-contact-icon" />
                                            <span className="about-branch-name">
                                                Dighi Office
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="about-contact-direct-wrap">
                                    <div className="about-contact-row about-contact-row--center">
                                        <Phone
                                            size={18}
                                            className="about-contact-icon about-contact-icon--center"
                                        />
                                        <a
                                            href="tel:+917398174444"
                                            className="about-contact-link"
                                        >
                                            +91 73981 74444
                                        </a>
                                    </div>
                                    <div className="about-contact-row about-contact-row--center">
                                        <Mail
                                            size={18}
                                            className="about-contact-icon about-contact-icon--center"
                                        />
                                        <a
                                            href="mailto:info@punepropertyinvestor.com"
                                            className="about-contact-link"
                                        >
                                            info@punepropertyinvestor.com
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Dedicated Office Locations Section */}
                    <section className="container about-locations-section" aria-label="Our Office Locations">
                        <div className="about-locations-header">
                            <span className="about-mission-tag">STRATEGIC PRESENCE</span>
                            <h2 className="about-locations-heading">Visit Our Offices Across Pune</h2>
                            <p className="about-locations-sub">
                                Headquartered in Kharadi with convenient branch offices in Narhe / Vadgaon bk and Dighi, our seasoned consultants are ready to assist you in person.
                            </p>
                        </div>

                        <div className="about-locations-grid">
                            {OFFICE_LOCATIONS.map((loc, idx) => (
                                <div
                                    key={idx}
                                    className={`about-location-card ${loc.isHeadquarters ? "about-location-card--hq" : ""}`}
                                >
                                    <div className="about-location-card__top">
                                        <div className="about-location-card__badge-row">
                                            <span className={`about-location-card__badge ${loc.isHeadquarters ? "about-location-card__badge--hq" : ""}`}>
                                                {loc.type} {loc.isHeadquarters ? "(Headquarters)" : ""}
                                            </span>
                                            <span className="about-location-card__zone">{loc.zone}</span>
                                        </div>
                                        <h3 className="about-location-card__title">
                                            {loc.name}
                                        </h3>
                                    </div>

                                    <div className="about-location-card__body">
                                        <div className="about-location-card__address-row">
                                            <MapPin size={18} className="about-location-card__pin" />
                                            <p className="about-location-card__address">
                                                {loc.address}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="about-location-card__action">
                                        <a
                                            href={loc.mapUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="about-location-card__link"
                                        >
                                            <Navigation size={14} />
                                            <span>Get Directions</span>
                                        </a>
                                        <a
                                            href="tel:+917398174444"
                                            className="about-location-card__call-link"
                                        >
                                            <Phone size={14} />
                                            <span>Call Office</span>
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </main>

            <Footer />
        </div>
    );
}
