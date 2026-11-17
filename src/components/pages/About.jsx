"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
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
    Award,
    Sparkles,
    Compass,
    Handshake,
    Clock,
    FileCheck2,
    Layers,
    ChevronRight,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import { usePublishedCms } from "../../services/liveContent";
import "./About.css";

const basePath =
    process.env.NEXT_PUBLIC_BASE_PATH ||
    (typeof window !== "undefined" && window.location.pathname.startsWith("/Pune_Property_Investors_")
        ? "/Pune_Property_Investors_"
        : "");

const getAssetPath = (path) => {
    if (!path) return "";
    if (path.startsWith("http://") || path.startsWith("https://") || path.startsWith("data:")) {
        return path;
    }
    const clean = path.startsWith("/") ? path : `/${path}`;
    return `${basePath}${clean}`;
};

const WHATSAPP_NUMBER = "917398174444";

const STATS = [
    { prefix: "₹", target: 750, suffix: "+ Cr", label: "Advised Transactions", sub: "Across Luxury Corridors" },
    { target: 1500, suffix: "+", label: "Happy Families", sub: "Homebuyers & NRI Investors" },
    { target: 100, suffix: "%", label: "MahaRERA Verified", sub: "Zero-Litigation Mandates" },
    { target: 15, suffix: "+ Yrs", label: "Executive Leadership", sub: "Pune Real Estate Mastery" },
];

function AnimatedStatNumber({ target, prefix = "", suffix = "", started }) {
    const [count, setCount] = useState(0);
    const hasAnimated = useRef(false);

    useEffect(() => {
        if (!started || hasAnimated.current) return;
        hasAnimated.current = true;

        const duration = 2000;
        let frameId;
        let startTime;

        const animate = (timestamp) => {
            if (startTime === undefined) startTime = timestamp;

            const progress = Math.min((timestamp - startTime) / duration, 1);
            // Ease out cubic matching TrustStats counter
            const eased = 1 - Math.pow(1 - progress, 3);
            const value = Math.round(target * eased);

            setCount(value);

            if (progress < 1) {
                frameId = requestAnimationFrame(animate);
            } else {
                setCount(target);
            }
        };

        frameId = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(frameId);
    }, [started, target]);

    return (
        <>
            {prefix}
            {count.toLocaleString("en-IN")}
            {suffix}
        </>
    );
}

const PILLARS = [
    {
        icon: ShieldCheck,
        badge: "LEGAL RIGOR",
        title: "100% Verified Due Diligence",
        desc: "Every mandate undergoes stringent legal scrutiny: 30-year title search reports, sanctioned building layouts, MahaRERA compliance, and developer financial health audits.",
    },
    {
        icon: Handshake,
        badge: "EXCLUSIVE ACCESS",
        title: "Direct Builder Mandates",
        desc: "We work directly with Pune's tier-1 builders (Godrej, Lodha, Panchshil, VTP, Kohinoor, Mantra), guaranteeing direct builder inventory, zero brokerage, and best negotiated rates.",
    },
    {
        icon: TrendingUp,
        badge: "DATA INTELLIGENCE",
        title: "High Capital Appreciation",
        desc: "Our analytics team tracks infrastructure catalysts—Pune Metro Line 3, Ring Road corridors, and IT employment clusters—to identify micro-markets with superior ROI potential.",
    },
    {
        icon: Users,
        badge: "END-TO-END CARE",
        title: "Private Advisory & Handholding",
        desc: "From curated private site tours and unit selection to bespoke home loan sanctioning and registration, our consultants walk with you every step of the journey.",
    },
];

const BUILDERS = [
    { name: "Panchshil Realty", tag: "Luxury Commercial & Residential" },
    { name: "Godrej Properties", tag: "Premium Integrated Townships" },
    { name: "Lodha Group", tag: "Iconic Landmarks & Penthouses" },
    { name: "VTP Realty", tag: "High-Rise Living & High ROI" },
    { name: "Kohinoor Group", tag: "Quality Residential Corridors" },
    { name: "Mantra Properties", tag: "Modern Urban Living" },
    { name: "Gera Developments", tag: "ChildCentric® & Commercial Hubs" },
];

const OFFICES = [
    {
        id: "kharadi",
        name: "Kharadi Corporate Headquarters",
        type: "Corporate Headquarters",
        zone: "East Pune • IT & Luxury Corridor",
        address: "3rd Floor, Gera Imperium Alpha, Grant Road, Vitthal Nagar, Kharadi, Pune, Maharashtra 411014",
        timings: "Monday – Sunday • 9:30 AM to 7:30 PM",
        phone: "+91 73981 74444",
        mapUrl: "https://maps.app.goo.gl/49jQdRiP4CCgNMCP7",
        badge: "Headquarters",
        highlight: "Strategic Base for East Pune Mandates",
    },
    {
        id: "narhe",
        name: "Narhe / Vadgaon bk Branch",
        type: "Regional Branch Office",
        zone: "South-West Pune • Highway Corridor",
        address: "Office No. 09, Ground Floor, Beside Jagade Patil Developers, Below Pulse Multi-speciality Hospital, Vishwa Arcade, Navale Bridge, Vadgaon bk, Narhe, Pune 411041",
        timings: "Monday – Sunday • 10:00 AM to 7:00 PM",
        phone: "+91 73981 74444",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Vishwa+Arcade+Navale+Bridge+Vadgaon+bk+Narhe+Pune+411041",
        badge: "South Pune Hub",
        highlight: "Highway & Emerging Suburbs Desk",
    },
    {
        id: "dighi",
        name: "Dighi Regional Office",
        type: "Regional Branch Office",
        zone: "North Pune • PCMC & Airport Corridor",
        address: "3rd Floor, Rajnandini Tower, Above HDFC Bank, Parande Nagar, Dighi, Pune 411015",
        timings: "Monday – Sunday • 10:00 AM to 7:00 PM",
        phone: "+91 73981 74444",
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Rajnandini+Tower+Parande+Nagar+Dighi+Pune+411015",
        badge: "North Pune Hub",
        highlight: "Aviation & Industrial Corridor Desk",
    },
];

export default function AboutPage() {
    const published = usePublishedCms();
    const aboutData = published?.homepage?.about || null;
    const [activeOfficeTab, setActiveOfficeTab] = useState(0);

    const statsRef = useRef(null);
    const [statsStarted, setStatsStarted] = useState(false);

    useEffect(() => {
        const el = statsRef.current;
        if (!el || statsStarted) return;

        const checkVisibility = () => {
            if (el) {
                const rect = el.getBoundingClientRect();
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    setStatsStarted(true);
                }
            }
        };

        checkVisibility();

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setStatsStarted(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.05, rootMargin: "60px 0px" }
        );

        observer.observe(el);
        window.addEventListener("scroll", checkVisibility, { passive: true });

        return () => {
            observer.disconnect();
            window.removeEventListener("scroll", checkVisibility);
        };
    }, [statsStarted]);

    const getWhatsAppUrl = () => {
        const text = encodeURIComponent(
            "Hello Pune Property Investors team, I would like to schedule a private advisory consultation regarding property investments in Pune."
        );
        return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
    };

    return (
        <div className="about-luxury-page">
            <Header transparentAtTop={true} />

            <main>
                {/* 1. ARCHITECTURAL EDITORIAL HERO */}
                <section className="about-hero">
                    <div className="about-hero__bg-wrap">
                        <Image
                            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85"
                            alt="Luxury Pune Real Estate Architecture"
                            fill
                            priority
                            sizes="100vw"
                            className="about-hero__bg-image"
                        />
                        <div className="about-hero__overlay" />
                    </div>

                    <div className="container about-hero__content">
                        <div className="about-hero__breadcrumbs">
                            <Link href="/">Home</Link>
                            <span>/</span>
                            <span className="current">About Us</span>
                        </div>

                        <div className="about-hero__eyebrow-pill">
                            <Sparkles size={13} />
                            <span>EST. 2015 • PUNE PROPERTY INVESTORS • MAHARERA VERIFIED</span>
                        </div>

                        <h1 className="about-hero__title">
                            Architecting Trust in <em>Pune&apos;s Prime Real Estate.</em>
                        </h1>

                        <p className="about-hero__subtitle">
                            Headquartered in Gera Imperium Alpha, Kharadi with branches across
                            Narhe and Dighi. We provide data-backed property intelligence,
                            institutional due diligence, and direct builder mandates across Pune&apos;s
                            high-growth residential and commercial corridors.
                        </p>

                        <div className="about-hero__actions">
                            <Link href="/buy" className="about-hero__btn about-hero__btn--primary">
                                <span>Explore Curated Properties</span>
                                <ArrowRight size={16} />
                            </Link>
                            <a
                                href={getWhatsAppUrl()}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="about-hero__btn about-hero__btn--whatsapp"
                            >
                                <FaWhatsapp size={17} />
                                <span>Private Consultation</span>
                            </a>
                        </div>

                        {/* Floating Live Metrics Bar */}
                        <div ref={statsRef} className="about-stats-card">
                            {STATS.map((stat) => (
                                <div key={stat.label} className="about-stat-item">
                                    <div className="about-stat-value">
                                        <AnimatedStatNumber
                                            target={stat.target}
                                            prefix={stat.prefix}
                                            suffix={stat.suffix}
                                            started={statsStarted}
                                        />
                                    </div>
                                    <div className="about-stat-label">{stat.label}</div>
                                    <div className="about-stat-sub">{stat.sub}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <div className="container about-body-wrap">
                    {/* 2. THE PPI JOURNEY & CORPORATE HERITAGE */}
                    <section className="about-story-editorial">
                        <div className="about-story__grid">
                            <div className="about-story__copy">
                                <span className="about-section-tag">OUR HERITAGE &amp; MISSION</span>
                                <h2 className="about-section-heading">
                                    Empowering Homebuyers With <em>Uncompromising Transparency.</em>
                                </h2>

                                <p className="about-lead-text">
                                    Founded with a clear conviction that buying real estate should be guided by
                                    rigorous legal analysis, financial clarity, and institutional honesty—not aggressive
                                    sales pitches.
                                </p>

                                <p className="about-paragraph">
                                    Over the past decade, Pune Property Investors has grown from a boutique advisory
                                    in Kharadi into a multi-branch network across Pune. Today, we advise top corporate
                                    executives, IT leaders, doctors, and NRI families looking for luxury penthouses,
                                    villas, and high-yielding commercial assets.
                                </p>

                                <div className="about-values-list">
                                    <div className="about-value-item">
                                        <div className="about-value-icon">
                                            <CheckCircle2 size={18} />
                                        </div>
                                        <div>
                                            <strong>Zero Brokerage Direct Pricing</strong>
                                            <span>We partner directly with developers to provide authentic project rates without buyer commission.</span>
                                        </div>
                                    </div>
                                    <div className="about-value-item">
                                        <div className="about-value-icon">
                                            <CheckCircle2 size={18} />
                                        </div>
                                        <div>
                                            <strong>360° Title &amp; MahaRERA Clearance</strong>
                                            <span>Comprehensive verification of approvals, RERA certificates, and developer track records.</span>
                                        </div>
                                    </div>
                                    <div className="about-value-item">
                                        <div className="about-value-icon">
                                            <CheckCircle2 size={18} />
                                        </div>
                                        <div>
                                            <strong>Corridor Analytics &amp; Infrastructure Tracking</strong>
                                            <span>Capitalizing on Metro Line 3, Ring Road corridors, and IT expansion corridors for long-term ROI.</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="about-story__cta">
                                    <Link href="/buy" className="about-editorial-btn">
                                        <span>Browse Verified Listings</span>
                                        <ArrowRight size={16} />
                                    </Link>
                                    <div className="about-story__rera-badge">
                                        <Award size={16} />
                                        <span>MahaRERA Sanctioned Advisory</span>
                                    </div>
                                </div>
                            </div>

                            <div className="about-story__media">
                                <div className="about-media-card">
                                    <div className="about-media-img-wrap">
                                        <Image
                                            src={getAssetPath("/images/ppi-team-office.webp")}
                                            alt="Pune Property Investors Executive Team at Kharadi Headquarters"
                                            width={600}
                                            height={500}
                                            className="about-media-img"
                                        />
                                    </div>
                                    <div className="about-media-floating-pill">
                                        <Building2 size={18} className="pill-icon" />
                                        <div>
                                            <strong>Gera Imperium Alpha, Kharadi</strong>
                                            <span>Corporate Headquarters • East Pune</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* 3. FOUR CORE PILLARS OF EXCELLENCE */}
                    <section className="about-pillars-block">
                        <div className="about-section-header">
                            <span className="about-section-tag">WHY CLIENTS CHOOSE PPI</span>
                            <h2 className="about-section-heading">
                                The Four Standards of <em>Bespoke Advisory.</em>
                            </h2>
                            <p className="about-section-sub">
                                We combine institutional research with genuine client advocacy to protect your capital and unlock Pune&apos;s finest living spaces.
                            </p>
                        </div>

                        <div className="about-pillars-grid">
                            {PILLARS.map((pillar) => {
                                const IconComponent = pillar.icon;
                                return (
                                    <div key={pillar.title} className="about-pillar-card">
                                        <div className="about-pillar-badge">{pillar.badge}</div>
                                        <div className="about-pillar-icon-box">
                                            <IconComponent size={24} />
                                        </div>
                                        <h3 className="about-pillar-title">{pillar.title}</h3>
                                        <p className="about-pillar-desc">{pillar.desc}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </section>

                    {/* 4. TIER-1 BUILDER MANDATES */}
                    <section className="about-builders-block">
                        <div className="about-builders-header">
                            <div>
                                <span className="about-section-tag">DIRECT INVENTORY MANDATES</span>
                                <h2 className="about-section-heading">
                                    Trusted by Pune&apos;s <em>Premier Developers.</em>
                                </h2>
                            </div>
                            <p className="about-builders-desc">
                                We hold institutional mandates with Maharashtra&apos;s most respected developer groups,
                                granting our buyers priority inventory access, flexible payment structures, and guaranteed legal transparency.
                            </p>
                        </div>

                        <div className="about-builders-grid">
                            {BUILDERS.map((builder) => (
                                <div key={builder.name} className="about-builder-card">
                                    <div className="about-builder-logo-mark">
                                        <Building2 size={20} />
                                    </div>
                                    <h4 className="about-builder-name">{builder.name}</h4>
                                    <span className="about-builder-tag">{builder.tag}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* 5. STRATEGIC PRESENCE ACROSS PUNE (3 HUBS) */}
                    <section className="about-presence-block" id="our-offices">
                        <div className="about-section-header">
                            <span className="about-section-tag">REGIONAL ADVISORY HUBS</span>
                            <h2 className="about-section-heading">
                                Meet Our Consultants in <em>Kharadi, Narhe &amp; Dighi.</em>
                            </h2>
                            <p className="about-section-sub">
                                Accessible office locations situated across Pune&apos;s critical development zones, staffed by localized area experts.
                            </p>
                        </div>

                        {/* Interactive Office Selector */}
                        <div className="about-office-tabs">
                            {OFFICES.map((office, idx) => (
                                <button
                                    key={office.id}
                                    type="button"
                                    className={`about-office-tab-btn ${
                                        activeOfficeTab === idx ? "active" : ""
                                    }`}
                                    onClick={() => setActiveOfficeTab(idx)}
                                >
                                    <MapPin size={16} />
                                    <span>{office.name}</span>
                                </button>
                            ))}
                        </div>

                        {/* Active Office Card Display */}
                        <div className="about-office-showcase-card">
                            <div className="about-office-info">
                                <div className="about-office-badge-row">
                                    <span className="office-tag office-tag--gold">
                                        {OFFICES[activeOfficeTab].badge}
                                    </span>
                                    <span className="office-tag office-tag--sub">
                                        {OFFICES[activeOfficeTab].zone}
                                    </span>
                                </div>

                                <h3 className="about-office-title">
                                    {OFFICES[activeOfficeTab].name}
                                </h3>

                                <div className="about-office-meta-list">
                                    <div className="about-office-meta-row">
                                        <MapPin size={20} className="office-icon" />
                                        <div>
                                            <strong>Address</strong>
                                            <p>{OFFICES[activeOfficeTab].address}</p>
                                        </div>
                                    </div>
                                    <div className="about-office-meta-row">
                                        <Clock size={20} className="office-icon" />
                                        <div>
                                            <strong>Office Hours</strong>
                                            <p>{OFFICES[activeOfficeTab].timings}</p>
                                        </div>
                                    </div>
                                    <div className="about-office-meta-row">
                                        <Phone size={20} className="office-icon" />
                                        <div>
                                            <strong>Direct Advisory Desk</strong>
                                            <p>{OFFICES[activeOfficeTab].phone}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="about-office-action-row">
                                    <a
                                        href={OFFICES[activeOfficeTab].mapUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="office-action-btn office-action-btn--primary"
                                    >
                                        <Compass size={16} />
                                        <span>Get Driving Directions on Google Maps</span>
                                    </a>
                                    <a
                                        href={`tel:${OFFICES[activeOfficeTab].phone.replace(/[^0-9+]/g, "")}`}
                                        className="office-action-btn office-action-btn--secondary"
                                    >
                                        <Phone size={15} />
                                        <span>Call Office Desk</span>
                                    </a>
                                </div>
                            </div>

                            <div className="about-office-side-perks">
                                <div className="office-perk-box">
                                    <Sparkles size={22} className="perk-box-icon" />
                                    <h4>What to Expect at This Branch</h4>
                                    <ul>
                                        <li>Private consultation rooms for confidential portfolio reviews.</li>
                                        <li>High-resolution master layouts &amp; 3D architectural walkthroughs.</li>
                                        <li>On-site home loan specialists from SBI, HDFC &amp; ICICI.</li>
                                        <li>Dedicated vehicle for scheduled on-site property tours.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* 6. PRIVATE CONSULTATION CTA BANNER */}
                    <section className="about-consultation-banner">
                        <div className="consultation-banner__bg-art" aria-hidden="true" />
                        <div className="consultation-banner__content">
                            <span className="consultation-banner__tag">
                                START YOUR PROPERTY DISCOVERY
                            </span>
                            <h2 className="consultation-banner__title">
                                Ready to Experience Pune&apos;s Most Trusted Advisory?
                            </h2>
                            <p className="consultation-banner__desc">
                                Whether you are searching for an ultra-luxury penthouse in Kharadi, a serene villa in Baner,
                                or high-yield commercial investment near Metro 3, our senior consultants are ready to assist.
                            </p>
                            <div className="consultation-banner__actions">
                                <a
                                    href={getWhatsAppUrl()}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="consult-btn consult-btn--whatsapp"
                                >
                                    <FaWhatsapp size={18} />
                                    <span>WhatsApp Private Advisory</span>
                                </a>
                                <a
                                    href="tel:+917398174444"
                                    className="consult-btn consult-btn--call"
                                >
                                    <Phone size={16} />
                                    <span>Call +91 73981 74444</span>
                                </a>
                            </div>
                        </div>
                    </section>
                </div>
            </main>

            <Footer />
        </div>
    );
}
