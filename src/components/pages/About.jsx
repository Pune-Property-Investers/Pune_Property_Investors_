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
} from "lucide-react";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import PageHeroBanner from "../common/PageHeroBanner";
import AboutSection from "../home/AboutSection";
import "./About.css";

export default function AboutPage() {
    return (
        <div className="about-page">
            <Header />

            <main>
                {/* Hero Header Section */}
                <PageHeroBanner
                    title="Guiding Your Journey With"
                    titleAccent="Trust & Expertise."
                    eyebrow="ABOUT PUNE PROPERTY INVESTOR"
                    description="Pune Property Investors is your dedicated advisory partner helping homebuyers, NRI investors, and commercial clients make verified, high-yielding property decisions across Pune's fastest growing corridors."
                    breadcrumbs={[
                        { label: "Home", href: "/" },
                        { label: "About Us" },
                    ]}
                    backgroundImage="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85"
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
                                    Empowering Homebuyers With Market Transparency
                                </h2>
                                <p className="about-mission-desc">
                                    Headquartered in Kharadi, Pune, Pune Property
                                    Investors was founded with a singular focus:
                                    bringing complete honesty, professional advisory,
                                    and data-backed market analysis to Pune's
                                    thriving real estate landscape.
                                </p>
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
                                    href="/buy"
                                    className="primary-button about-browse-btn"
                                >
                                    Browse Available Properties
                                    <ArrowRight size={17} />
                                </Link>
                            </div>

                            <div className="about-contact-card">
                                <h3 className="about-contact-title">
                                    Get in Touch With Us
                                </h3>
                                <div className="about-contact-list">
                                    <div className="about-contact-row">
                                        <MapPin
                                            size={20}
                                            className="about-contact-icon"
                                        />
                                        <span className="about-contact-text">
                                            3rd Floor, Gera Imperium Alpha, Grant
                                            Road, Vitthal Nagar, Kharadi, Pune,
                                            Maharashtra 411014
                                        </span>
                                    </div>
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
                </div>
            </main>

            <Footer />
        </div>
    );
}
