"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
    ChevronLeft,
    ChevronRight,
    ArrowRight,
    ShieldCheck,
    Building2,
    Sparkles,
    CheckCircle2,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import "./AboutHeroStudio.css";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";
const STUDIO_BG = `${BASE_PATH}/images/about-hero-studio.jpg`;
const VILLA_BG = `${BASE_PATH}/images/luxury-villa-bg.jpg`;
const WHATSAPP_NUMBER = "917398174444";

const SLIDES = [
    {
        id: "curated",
        tag: "01 / 03 • ARCHITECTURAL SHOWCASE",
        badge: "Kharadi • Baner • Balewadi",
        title: "Homes, seen in their best light.",
        description:
            "A boutique advisory selling distinctive luxury villas, penthouses, and landmark residences across Pune.",
        phoneTag: "Featured Estate",
        phoneTitle: "Homes, seen in their best light",
        actionPrimary: { label: "View Listings", href: "/buy" },
        actionSecondary: { label: "Free Consultation", href: "/#home-contact" },
        highlight: "Zero Brokerage • Direct Builder Inventory",
    },
    {
        id: "verification",
        tag: "02 / 03 • TITLE & MAHARERA VERIFIED",
        badge: "100% Legal Clearance",
        title: "Every title researched. Every layout vetted.",
        description:
            "Complete peace of mind. Every property undergoes rigorous title searches, RERA compliance validation, and direct developer pricing agreements.",
        phoneTag: "Legal Clearance",
        phoneTitle: "100% Verified Layouts & Titles",
        actionPrimary: { label: "Verified Projects", href: "/buy" },
        actionSecondary: { label: "Speak to Legal Advisor", href: "/#home-contact" },
        highlight: "MahaRERA Sanctioned • Title Clear Guarantee",
    },
    {
        id: "growth",
        tag: "03 / 03 • BESPOKE ADVISORY & ROI",
        badge: "High Capital Appreciation",
        title: "Data-driven yields across Pune corridors.",
        description:
            "Strategic advisory tailored for homebuyers and NRI investors targeting high appreciation near Metro 3, Ring Road, and IT hubs.",
        phoneTag: "Bespoke Advisory",
        phoneTitle: "Data-Driven Property ROI",
        actionPrimary: { label: "Investment Deck", href: "/#home-contact" },
        actionSecondary: { label: "Private Site Visit", href: "/#home-contact" },
        highlight: "1,200+ Pune Families Guided • Est. 2015",
    },
];

export default function AboutHeroStudio() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1));
    };

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev === SLIDES.length - 1 ? 0 : prev + 1));
    };

    // Gentle auto-rotation (pauses when user hovers or interacts)
    useEffect(() => {
        if (isPaused) return;
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev === SLIDES.length - 1 ? 0 : prev + 1));
        }, 7000);
        return () => clearInterval(timer);
    }, [isPaused]);

    const activeSlide = SLIDES[currentSlide];

    return (
        <section
            className="about-studio-hero"
            aria-label="About Pune Property Investors Showcase"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {/* Top Sub-Bar: Breadcrumbs & RERA Badge */}
            <div className="about-studio-topbar">
                <nav className="about-studio-breadcrumbs" aria-label="Breadcrumb">
                    <Link href="/">Home</Link>
                    <span className="about-studio-breadcrumbs__sep">/</span>
                    <span className="about-studio-breadcrumbs__current">About Us</span>
                </nav>
                <div className="about-studio-top-badge">
                    <ShieldCheck size={13} className="text-gold" />
                    <span>MahaRERA Verified Advisory • Est. 2015</span>
                </div>
            </div>

            {/* Editorial Brand Header */}
            <header className="about-studio-header">
                <span className="about-studio-eyebrow">
                    — THE ARCHITECTURAL REAL ESTATE ADVISORY
                </span>
                <h1 className="about-studio-title">PUNE PROPERTY INVESTORS</h1>
                <p className="about-studio-tagline">
                    CINEMATIC PROPERTY DISCOVERY — MAHARERA VERIFIED · ZERO BROKERAGE · BESPOKE SITE VISITS
                </p>
            </header>

            {/* The Cinematic Studio Stage (Desk with Laptop + Mobile Screen Containers) */}
            <div className="about-studio-stage-wrap">
                <div
                    className="about-studio-canvas"
                    style={{ backgroundImage: `url(${STUDIO_BG})` }}
                    role="img"
                    aria-label="Architectural studio desk with interactive laptop and smartphone display"
                >
                    {/* Ambient Glow & Edge Vignette */}
                    <div className="about-studio-canvas__vignette" />

                    {/* Left Carousel Navigation Button */}
                    <button
                        type="button"
                        className="about-studio-nav-btn about-studio-nav-btn--prev"
                        onClick={prevSlide}
                        aria-label="Previous slide"
                        title="Previous slide"
                    >
                        <ChevronLeft size={18} />
                    </button>

                    {/* Right Carousel Navigation Button */}
                    <button
                        type="button"
                        className="about-studio-nav-btn about-studio-nav-btn--next"
                        onClick={nextSlide}
                        aria-label="Next slide"
                        title="Next slide"
                    >
                        <ChevronRight size={18} />
                    </button>

                    {/* ============================================================== */}
                    {/* SEPARATE CONTAINER 1: INTERACTIVE LAPTOP SCREEN                */}
                    {/* Positioned precisely inside the laptop display bezel           */}
                    {/* ============================================================== */}
                    <div className="about-studio-laptop-screen">
                        {/* Laptop Screen Glass Sheen */}
                        <div className="about-studio-screen-sheen" aria-hidden="true" />

                        {/* Top Browser Bar Chrome */}
                        <div className="about-laptop-browser-bar">
                            <div className="about-laptop-traffic-lights" aria-hidden="true">
                                <span className="about-laptop-light about-laptop-light--red" />
                                <span className="about-laptop-light about-laptop-light--yellow" />
                                <span className="about-laptop-light about-laptop-light--green" />
                            </div>
                            <div className="about-laptop-url-pill">
                                <span>punepropertyinvestor.com</span>
                            </div>
                            <div className="about-laptop-slide-badge">
                                <span>{activeSlide.badge}</span>
                            </div>
                        </div>

                        {/* Screen Content Body with Animated Backdrop */}
                        <div
                            className="about-laptop-display-body"
                            style={{ backgroundImage: `url(${VILLA_BG})` }}
                        >
                            <div className="about-laptop-display-overlay" />

                            <div className="about-laptop-content">
                                <div className="about-laptop-tag-row">
                                    <span className="about-laptop-tag">
                                        {activeSlide.tag}
                                    </span>
                                    <span className="about-laptop-pill">
                                        <Building2 size={9} />
                                        <span>Gera Imperium Alpha, Kharadi</span>
                                    </span>
                                </div>

                                <h2 className="about-laptop-headline">
                                    {activeSlide.title}
                                </h2>

                                <p className="about-laptop-desc">
                                    {activeSlide.description}
                                </p>

                                <div className="about-laptop-cta-row">
                                    <Link
                                        href={activeSlide.actionPrimary.href}
                                        className="about-laptop-btn about-laptop-btn--primary"
                                    >
                                        <span>{activeSlide.actionPrimary.label}</span>
                                        <ArrowRight size={11} />
                                    </Link>
                                    <Link
                                        href={activeSlide.actionSecondary.href}
                                        className="about-laptop-btn about-laptop-btn--secondary"
                                    >
                                        <span>{activeSlide.actionSecondary.label}</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ============================================================== */}
                    {/* SEPARATE CONTAINER 2: INTERACTIVE MOBILE PHONE SCREEN          */}
                    {/* Positioned precisely inside the phone display bezel            */}
                    {/* ============================================================== */}
                    <div className="about-studio-phone-screen">
                        {/* Phone Screen Glass Sheen */}
                        <div className="about-studio-screen-sheen" aria-hidden="true" />

                        {/* Dynamic Island Pill */}
                        <div className="about-phone-dynamic-island" aria-hidden="true" />

                        {/* Screen Content Body */}
                        <div
                            className="about-phone-display-body"
                            style={{ backgroundImage: `url(${VILLA_BG})` }}
                        >
                            <div className="about-phone-display-overlay" />

                            <div className="about-phone-content">
                                <div className="about-phone-header">
                                    <span className="about-phone-badge">PPI ADVISORY</span>
                                </div>

                                <div className="about-phone-center">
                                    <span className="about-phone-subtag">
                                        {activeSlide.phoneTag}
                                    </span>
                                    <h3 className="about-phone-title">
                                        {activeSlide.phoneTitle}
                                    </h3>
                                </div>

                                <div className="about-phone-footer">
                                    <a
                                        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                                            "Hello Pune Property Investor, I would like to consult with an advisor regarding properties in Pune."
                                        )}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="about-phone-wa-btn"
                                        aria-label="Connect on WhatsApp"
                                    >
                                        <FaWhatsapp size={12} />
                                        <span>Instant WhatsApp</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom 4 Minimalist Advisory Indicators (matches editorial style) */}
            <div className="about-studio-indicators">
                <div className="about-studio-indicator-item">
                    <span className="about-studio-indicator-num">1,200+</span>
                    <span className="about-studio-indicator-label">Pune Families Guided</span>
                </div>
                <div className="about-studio-indicator-item">
                    <span className="about-studio-indicator-num">100%</span>
                    <span className="about-studio-indicator-label">MahaRERA & Legal Vetting</span>
                </div>
                <div className="about-studio-indicator-item">
                    <span className="about-studio-indicator-num">0%</span>
                    <span className="about-studio-indicator-label">Zero Brokerage on Bookings</span>
                </div>
                <div className="about-studio-indicator-item">
                    <span className="about-studio-indicator-num">7 Days</span>
                    <span className="about-studio-indicator-label">Personalized Site Visits</span>
                </div>
            </div>
        </section>
    );
}
