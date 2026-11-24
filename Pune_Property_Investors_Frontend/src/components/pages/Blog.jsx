"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
    Calendar,
    Clock,
    ArrowRight,
    MapPin,
    Share2,
    CheckCircle2,
    Search,
    ChevronRight,
    ChevronLeft,
    Sparkles,
    Send,
    ExternalLink,
    Bookmark,
} from "lucide-react";
import {
    FaXTwitter,
    FaPinterestP,
    FaFacebookF,
    FaLinkedinIn,
    FaWhatsapp,
} from "react-icons/fa6";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import { usePublishedCms } from "../../services/liveContent";
import "./Blog.css";

// Slideshow of Trending Vlogs / Luxury Real Estate Features
const TRENDING_VLOG_SLIDES = [
    {
        id: "luxury-rebound-high-end-homes",
        title: "Luxury Rebound: High-End Homes Back in Vogue?",
        estateName: "The Grand Reserve",
        estateLocation: "2715 Ash Dr. San Jose, South Dakota 83475",
        heroImage:
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85",
        inlineImage:
            "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1400&q=85",
        sections: [
            {
                id: "world-of-luxury",
                tocTitle: "A Glimpse into the World of Luxury Real Estate",
                heading: "A Glimpse into the World of Luxury Real Estate",
                paragraphs: [
                    "The world of luxury real estate is an alluring realm where dreams take shape and aspirations find their home. It's a symphony of exquisite designs, unparalleled amenities, and prime locations, all orchestrated to create a lifestyle that surpasses expectations.",
                    "Whether you seek a sprawling estate nestled amidst rolling hills or a penthouse perched atop a bustling metropolis, the quest for the perfect luxury property is an adventure in itself. Beyond square footage, today's discerning buyers seek sanctuary: acoustic tranquility, private wellness retreats, and biophilic continuity between indoors and manicured landscapes.",
                ],
            },
            {
                id: "grandview-estate",
                tocTitle: "Unveiling the Epitome of Modern Living: The Grandview Estate",
                heading: "Unveiling the Epitome of Modern Living: The Grandview Estate",
                paragraphs: [
                    "Conceived as an architectural benchmark, The Grandview Estate redefines spatial grandeur. With dramatic cantilevered silhouettes, triple-height glazed corridors, and natural limestone façades, the residence harmonizes contemporary structural engineering with classical balance.",
                    "Every suite is oriented toward optimal morning solar ingress, while passive thermodynamic ventilation cools living galleries naturally throughout warmer seasons.",
                ],
            },
            {
                id: "designing-dream-oasis",
                tocTitle: "Designing Your Dream Oasis: A Guide to Curating Your Dream Home",
                heading: "Designing Your Dream Oasis: A Guide to Curating Your Dream Home",
                paragraphs: [
                    "Curating a personal sanctuary requires moving past transient decor trends toward authentic materiality. Honed Italian marble, warm fluted teak, and bespoke architectural metalwork gain dignity and character with time.",
                    "Integrating climate-controlled wine cellars, private screening suites, and dual gourmet kitchens creates residences that entertain effortlessly while preserving private family quietude.",
                ],
            },
            {
                id: "navigating-luxury-market",
                tocTitle: "Navigating the Luxury Property Market: Expert Tips for Discerning Buyers",
                heading: "Navigating the Luxury Property Market: Expert Tips for Discerning Buyers",
                paragraphs: [
                    "Acquiring ultra-prime real estate demands rigorous due diligence. Institutional-grade title verification, RERA sanctioned layout confirmation, and developer lifecycle reputation are non-negotiable pillars.",
                    "Savvy investors analyze micro-market capital appreciation, dual-access arterial infrastructure, and proximity to international school ecosystems before making portfolio allocations.",
                ],
            },
            {
                id: "future-trends",
                tocTitle: "A Glimpse into the Future: Emerging Trends in Luxury Living",
                heading: "A Glimpse into the Future: Emerging Trends in Luxury Living",
                paragraphs: [
                    "The next era of high-end real estate is defined by invisible intelligence. Zero-emission solar microgrids, integrated air purification, and concierge-managed private amenities will distinguish tier-one developments from standard luxury offerings.",
                ],
            },
        ],
    },
    {
        id: "pune-expensive-penthouses",
        title: "Inside Pune's Most Exclusive Penthouses: Architecture & Value",
        estateName: "Trump Towers & Presidential Suites",
        estateLocation: "Kalyani Nagar, Pune 411006",
        heroImage:
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=2000&q=85",
        inlineImage:
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85",
        sections: [
            {
                id: "world-of-luxury",
                tocTitle: "Skyline Residences Redefining Ultra-Luxury",
                heading: "Skyline Residences Redefining Ultra-Luxury",
                paragraphs: [
                    "Pune's skyline is undergoing an architectural revolution. Double-height living salons, direct-to-suite private elevators, and temperature-controlled infinity edge pools perched 120 meters above ground level establish an unprecedented benchmark.",
                    "Advising elite executives and global business families, we examine how structural engineering and bespoke Italian fixtures yield enduring real estate capital stability.",
                ],
            },
            {
                id: "grandview-estate",
                tocTitle: "Unveiling Private Sky Penthouses",
                heading: "Unveiling Private Sky Penthouses",
                paragraphs: [
                    "Floor plans designed with acoustic decoupling protect against urban noise. Floor-to-ceiling European profile glazing invites 360-degree vistas across lush golf clubs and city lights.",
                ],
            },
            {
                id: "designing-dream-oasis",
                tocTitle: "Curating Bespoke Interiors & Private Cellars",
                heading: "Curating Bespoke Interiors & Private Cellars",
                paragraphs: [
                    "From climate-regulated wine vaults to concealed staff quarters and master suites wrapped in Belgian oak, craftsmanship remains central.",
                ],
            },
            {
                id: "navigating-luxury-market",
                tocTitle: "Investment Yields in Prime Skyline Hubs",
                heading: "Investment Yields in Prime Skyline Hubs",
                paragraphs: [
                    "Institutional tenants, multinational C-suite occupants, and high capital growth make Kalyani Nagar and Boat Club Road blue-chip asset hubs.",
                ],
            },
            {
                id: "future-trends",
                tocTitle: "The Next Era of Sky Living",
                heading: "The Next Era of Sky Living",
                paragraphs: [
                    "Private heli-pads, biometric security access, and private lifestyle concierge networks represent the pinnacle of tomorrow's skyline living.",
                ],
            },
        ],
    },
    {
        id: "rental-boom-infrastructure",
        title: "Rental Boom & Infrastructure Corridors: Kharadi to Baner",
        estateName: "The Riverside Promenade",
        estateLocation: "Riverside Kharadi, Pune 411014",
        heroImage:
            "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=2000&q=85",
        inlineImage:
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85",
        sections: [
            {
                id: "world-of-luxury",
                tocTitle: "Corridor Growth and Transit Capital",
                heading: "Corridor Growth and Transit Capital",
                paragraphs: [
                    "Pune's east-west transit matrix is expanding rapidly. With the upcoming Metro Line 3 phases and Ring Road connectivity, prime micro-markets are compounding at superior annualized rates.",
                    "Tech parks in Kharadi, Hinjewadi, and Balewadi continue to attract tens of thousands of senior professionals annually, driving rental yields above 5.2%.",
                ],
            },
            {
                id: "grandview-estate",
                tocTitle: "The Riverside Development Corridor",
                heading: "The Riverside Development Corridor",
                paragraphs: [
                    "Riverfront beautification and master-planned townships create pedestrian-friendly urban ecosystems that attract NRI capital.",
                ],
            },
            {
                id: "designing-dream-oasis",
                tocTitle: "Selecting High-Yield Floor Plans",
                heading: "Selecting High-Yield Floor Plans",
                paragraphs: [
                    "3 BHK and 4.5 BHK layouts with dual parking configurations and dedicated home offices experience the shortest vacancy periods.",
                ],
            },
            {
                id: "navigating-luxury-market",
                tocTitle: "Title Audit & MahaRERA Milestones",
                heading: "Title Audit & MahaRERA Milestones",
                paragraphs: [
                    "Verifying builder escrow adherence and quarterly progress reports safeguards every rupee of capital appreciation.",
                ],
            },
            {
                id: "future-trends",
                tocTitle: "Forecasting Capital Appreciation to 2030",
                heading: "Forecasting Capital Appreciation to 2030",
                paragraphs: [
                    "Micro-markets situated along Ring Road interchanges are slated for accelerated commercial expansion.",
                ],
            },
        ],
    },
    {
        id: "biophilic-sanctuary-living",
        title: "Biophilic Sanctuary Living: The Rise of Modern Garden Estates",
        estateName: "Panchshil One North",
        estateLocation: "Hadapsar South, Pune 411028",
        heroImage:
            "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=2000&q=85",
        inlineImage:
            "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1400&q=85",
        sections: [
            {
                id: "world-of-luxury",
                tocTitle: "Biophilic Flow & Environmental Architecture",
                heading: "Biophilic Flow & Environmental Architecture",
                paragraphs: [
                    "Modern home buyers are rejecting cookie-cutter high-rises in favor of organic residences. Deep green terraces, indoor botanical courtyards, and natural limestone create calm sanctuaries.",
                    "Research confirms that residences with direct visual foliage connection and natural solar orientation improve resident wellness and long-term asset value.",
                ],
            },
            {
                id: "grandview-estate",
                tocTitle: "The Modern Courtyard Estate",
                heading: "The Modern Courtyard Estate",
                paragraphs: [
                    "Living spaces centered around private interior water bodies and zen gardens create acoustic barriers against city sounds.",
                ],
            },
            {
                id: "designing-dream-oasis",
                tocTitle: "Natural Materiality & Honed Stone",
                heading: "Natural Materiality & Honed Stone",
                paragraphs: [
                    "Unpolished Kota stone, fluted teakwood, and brass detailing weather gracefully over decades, developing an irreplaceable patina.",
                ],
            },
            {
                id: "navigating-luxury-market",
                tocTitle: "Eco-Grade IGBC Platinum Certification",
                heading: "Eco-Grade IGBC Platinum Certification",
                paragraphs: [
                    "Certified green developments reduce utility consumption by up to 35% while preserving superior resale valuation.",
                ],
            },
            {
                id: "future-trends",
                tocTitle: "The Sustainable Luxury Horizon",
                heading: "The Sustainable Luxury Horizon",
                paragraphs: [
                    "Passive cooling architecture and greywater recycling will soon become mandatory standard specifications for ultra-luxury.",
                ],
            },
        ],
    },
];

// "Highlights the Newness of The Articles"
const HIGHLIGHTS_FEATURED = {
    id: "ownership-before-you-buy",
    title: "Ownership: Before You Buy?",
    subtitle: "Vital legal clearances, title audits, and market timing before committing capital.",
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1200&q=85",
    readTime: "5 mins read",
    date: "March 12, 2024",
};

const HIGHLIGHTS_CARDS = [
    {
        id: "rental-market-boom",
        title: "Rental Market Boom: Are Investment Properties Still a Good Option?",
        date: "March 4, 2024",
        readTime: "4 mins read",
        excerpt:
            "Buying your first home is an exciting yet complex process. While it's easy to get caught up in the thrill of the search, avoiding common pitfalls can ensure a sm...",
        image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=800&q=80",
    },
    {
        id: "hidden-gems-neighborhoods",
        title: "Hidden Gems: Affordable Neighborhoods with High Potential",
        date: "March 5, 2024",
        readTime: "6 mins read",
        excerpt:
            "Buying your first home is an exciting yet complex process. While it's easy to get caught up in the thrill of the search, avoiding common pitfalls can ensure a sm...",
        image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=800&q=80",
    },
];

// "Unveiling the Market: Editor's Choice Articles"
const EDITORS_CHOICE_CATEGORIES = [
    "Latest Trends & Insights",
    "Home Buying & Selling",
    "Lifestyle & Inspiration",
];

const EDITORS_CHOICE_ARTICLES = {
    "Latest Trends & Insights": [
        {
            id: "navigating-mortgage-process",
            title: "Navigating the Mortgage Process: A Step-by-Step Guide for Homebuyers",
            date: "March 6, 2024",
            readTime: "8 mins read",
            excerpt:
                "Buying your first home is an exciting yet complex process. While it's easy to get caught up in the thrill of the search, avoiding common pitfalls can ensure a sm...",
            image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80",
        },
        {
            id: "stand-out-sell-fast",
            title: "Stand Out and Sell Fast: Top Tips for Getting Your Home Ready in Today's Market",
            date: "March 8, 2024",
            readTime: "4 mins read",
            excerpt:
                "Buying your first home is an exciting yet complex process. While it's easy to get caught up in the thrill of the search, avoiding common pitfalls can ensure a sm...",
            image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
        },
        {
            id: "negotiation-ninja",
            title: "Negotiation Ninja: Mastering the Art of Getting the Best Price on Your Dream Home",
            date: "March 3, 2024",
            readTime: "4 mins read",
            excerpt:
                "Buying your first home is an exciting yet complex process. While it's easy to get caught up in the thrill of the search, avoiding common pitfalls can ensure a sm...",
            image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80",
        },
        {
            id: "staging-secrets-revealed",
            title: "Staging Secrets Revealed: Simple Tricks to Make Your Home Sell Faster and for Top Dollar",
            date: "March 2, 2024",
            readTime: "3 mins read",
            excerpt:
                "Buying your first home is an exciting yet complex process. While it's easy to get caught up in the thrill of the search, avoiding common pitfalls can ensure a sm...",
            image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80",
        },
    ],
    "Home Buying & Selling": [
        {
            id: "first-time-homebuyer-checklist",
            title: "First-Time Homebuyer's Checklist: Documents, RERA, and Stamp Duty",
            date: "March 10, 2024",
            readTime: "7 mins read",
            excerpt:
                "Essential due diligence: 7/12 extract verification, Commencement Certificate audits, and understanding builder escrow mechanisms...",
            image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80",
        },
        {
            id: "selling-prime-properties",
            title: "Maximizing Resale Premium on Luxury Apartments and Penthouses",
            date: "March 9, 2024",
            readTime: "5 mins read",
            excerpt:
                "How presentation, architectural photography, and private invitation viewings protect seller valuation in competitive markets...",
            image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
        },
        {
            id: "title-clearance-guidelines",
            title: "30-Year Title Search Reports: What Every Property Investor Must Audit",
            date: "March 7, 2024",
            readTime: "6 mins read",
            excerpt:
                "A legal advisor's roadmap to uncovering potential encumbrances, litigation flags, and revenue department clearances...",
            image: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80",
        },
        {
            id: "nri-property-investment",
            title: "NRI Real Estate Guide: Repatriation Rules and Tax Benefits",
            date: "March 1, 2024",
            readTime: "9 mins read",
            excerpt:
                "Navigating NRE/NRO accounts, TDS exemptions, and Power of Attorney protocols for overseas property acquisitions...",
            image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
        },
    ],
    "Lifestyle & Inspiration": [
        {
            id: "biophilic-luxury-residences",
            title: "Homes Designed Around Light, Proportion, and Calm",
            date: "March 14, 2024",
            readTime: "5 mins read",
            excerpt:
                "Why thoughtful spatial planning and cross-ventilation continue to define exceptional modern living spaces...",
            image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=800&q=80",
        },
        {
            id: "cantilevered-balconies-views",
            title: "Private Terraces & Infinity Decks: The New Living Room",
            date: "March 11, 2024",
            readTime: "4 mins read",
            excerpt:
                "Seamless transitions between interior salons and panoramic outdoor entertaining decks for modern estates...",
            image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
        },
        {
            id: "smart-wellness-spaces",
            title: "In-Home Wellness: Infrared Saunas, Cryo Rooms, and Acoustic Sanctuaries",
            date: "March 5, 2024",
            readTime: "6 mins read",
            excerpt:
                "How private rejuvenation centers have transformed high-end residential floor plans into self-contained wellness escapes...",
            image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
        },
        {
            id: "curating-enduring-art",
            title: "Art Curation & Lighting Design for Architectural Residences",
            date: "February 28, 2024",
            readTime: "7 mins read",
            excerpt:
                "Museum-grade illumination, climate controls, and spatial composition for showcasing personal collections...",
            image: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80",
        },
    ],
};

export default function Blog() {
    const published = usePublishedCms();

    // Slideshow state
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    const currentArticle = TRENDING_VLOG_SLIDES[currentSlideIndex];

    const nextSlide = () => {
        setCurrentSlideIndex((prev) => (prev + 1) % TRENDING_VLOG_SLIDES.length);
    };

    const prevSlide = () => {
        setCurrentSlideIndex(
            (prev) => (prev - 1 + TRENDING_VLOG_SLIDES.length) % TRENDING_VLOG_SLIDES.length
        );
    };

    // Auto-advance slideshow with pause on hover
    useEffect(() => {
        if (isPaused) return;
        const timer = setInterval(() => {
            nextSlide();
        }, 5500);
        return () => clearInterval(timer);
    }, [isPaused, currentSlideIndex]);

    // Active reading section state
    const [activeSectionId, setActiveSectionId] = useState(
        currentArticle.sections[0].id
    );
    const [selectedCategory, setSelectedCategory] = useState(
        "Latest Trends & Insights"
    );
    const [activePage, setActivePage] = useState(1);
    const [emailInput, setEmailInput] = useState("");
    const [subscribed, setSubscribed] = useState(false);
    const [showLearnMoreModal, setShowLearnMoreModal] = useState(false);

    // Track intersection of article sections to highlight active Table of Contents item
    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: "-20% 0px -60% 0px",
            threshold: 0,
        };

        const handleIntersect = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSectionId(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(handleIntersect, observerOptions);

        currentArticle.sections.forEach((sec) => {
            const el = document.getElementById(sec.id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, [currentArticle]);

    // Smooth scroll to a section on Table of Contents click
    const scrollToSection = (e, sectionId) => {
        e.preventDefault();
        const element = document.getElementById(sectionId);
        if (element) {
            const offset = 100;
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = element.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth",
            });
            setActiveSectionId(sectionId);
        }
    };

    // Newsletter submit
    const handleNewsletterSubmit = (e) => {
        e.preventDefault();
        if (emailInput.trim()) {
            setSubscribed(true);
            setTimeout(() => {
                setEmailInput("");
            }, 3000);
        }
    };

    // Share article handler
    const handleShare = (platform) => {
        const url = typeof window !== "undefined" ? window.location.href : "https://punepropertyinvestors.com/blog";
        const title = encodeURIComponent(currentArticle.title);

        switch (platform) {
            case "twitter":
                window.open(`https://twitter.com/intent/tweet?text=${title}&url=${encodeURIComponent(url)}`, "_blank");
                break;
            case "facebook":
                window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, "_blank");
                break;
            case "linkedin":
                window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, "_blank");
                break;
            case "pinterest":
                window.open(`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&description=${title}`, "_blank");
                break;
            case "whatsapp":
                window.open(`https://api.whatsapp.com/send?text=${title}%20${encodeURIComponent(url)}`, "_blank");
                break;
            default:
                break;
        }
    };

    const currentArticles = EDITORS_CHOICE_ARTICLES[selectedCategory] || [];

    return (
        <div className="dream-blog-page">
            <Header transparentAtTop={true} />

            <main className="dream-blog-main">
                {/* ============================================================== */}
                {/* 1. SLIDESHOW OF TRENDING VLOGS (Curved All Around)             */}
                {/* ============================================================== */}
                <section
                    className="dream-hero-section"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    <div className="dream-hero-media">
                        {TRENDING_VLOG_SLIDES.map((slide, idx) => (
                            <div
                                key={slide.id}
                                className={`dream-hero-slide ${
                                    idx === currentSlideIndex ? "active" : ""
                                }`}
                            >
                                <img
                                    src={slide.heroImage}
                                    alt={slide.title}
                                    className="dream-hero-bg-img"
                                />
                            </div>
                        ))}
                        <div className="dream-hero-overlay" />

                        {/* Slide Navigation Buttons */}
                        <button
                            type="button"
                            className="dream-slide-nav-btn dream-slide-nav-btn--prev"
                            onClick={prevSlide}
                            aria-label="Previous trending vlog"
                        >
                            <ChevronLeft size={22} />
                        </button>
                        <button
                            type="button"
                            className="dream-slide-nav-btn dream-slide-nav-btn--next"
                            onClick={nextSlide}
                            aria-label="Next trending vlog"
                        >
                            <ChevronRight size={22} />
                        </button>
                    </div>

                    <div className="dream-hero-inner">
                        {/* Top row with Floating Estate Location Badge */}
                        <div className="dream-hero-top-row">
                            <div className="dream-estate-badge-pill">
                                <div className="dream-badge-icon-wrap">
                                    <MapPin size={18} className="dream-badge-pin" />
                                </div>
                                <div className="dream-badge-text-col">
                                    <span className="dream-badge-name">
                                        {currentArticle.estateName}
                                    </span>
                                    <span className="dream-badge-address">
                                        {currentArticle.estateLocation}
                                    </span>
                                </div>
                                <button
                                    type="button"
                                    className="dream-badge-action-btn"
                                    onClick={() => setShowLearnMoreModal(true)}
                                >
                                    Learn More
                                </button>
                            </div>
                        </div>

                        {/* Hero Headline Row with Slide Indicators (Author Pill removed) */}
                        <div className="dream-hero-bottom-row">
                            <div className="dream-hero-title-group">
                                <h1 className="dream-hero-title">
                                    {currentArticle.title}
                                </h1>

                                {/* Slideshow Dots & Counter */}
                                <div className="dream-slides-progress-strip">
                                    {TRENDING_VLOG_SLIDES.map((_, idx) => (
                                        <button
                                            key={idx}
                                            type="button"
                                            className={`dream-slide-dot ${
                                                idx === currentSlideIndex ? "active" : ""
                                            }`}
                                            onClick={() => setCurrentSlideIndex(idx)}
                                            aria-label={`Go to slide ${idx + 1}`}
                                        />
                                    ))}
                                    <span className="dream-slide-counter">
                                        0{currentSlideIndex + 1} / 0{TRENDING_VLOG_SLIDES.length}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ============================================================== */}
                {/* 2. DUAL-COLUMN MASTER CONTENT LAYOUT (Below Hero)             */}
                {/* ============================================================== */}
                <div className="dream-content-container">
                    <div className="dream-master-layout">
                        {/* -------------------------------------------------------- */}
                        {/* LEFT COLUMN: Table of Contents + Article Reading Body    */}
                        {/* -------------------------------------------------------- */}
                        <div className="dream-left-column">
                            {/* Sticky Left Rail: TOC, Share, Newsletter */}
                            <aside className="dream-left-rail">
                                <div className="dream-toc-box">
                                    <h3 className="dream-toc-heading">Table Of Content</h3>
                                    <ul className="dream-toc-list">
                                        {currentArticle.sections.map((sec) => {
                                            const isActive = activeSectionId === sec.id;
                                            return (
                                                <li key={sec.id} className="dream-toc-item">
                                                    <a
                                                        href={`#${sec.id}`}
                                                        onClick={(e) => scrollToSection(e, sec.id)}
                                                        className={`dream-toc-link ${isActive ? "active" : ""}`}
                                                    >
                                                        {sec.tocTitle}
                                                    </a>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>

                                {/* Share Article */}
                                <div className="dream-share-box">
                                    <span className="dream-share-label">Share Article</span>
                                    <div className="dream-share-icons">
                                        <button
                                            type="button"
                                            className="dream-social-btn"
                                            aria-label="Share on X"
                                            onClick={() => handleShare("twitter")}
                                        >
                                            <FaXTwitter size={14} />
                                        </button>
                                        <button
                                            type="button"
                                            className="dream-social-btn"
                                            aria-label="Share on Pinterest"
                                            onClick={() => handleShare("pinterest")}
                                        >
                                            <FaPinterestP size={14} />
                                        </button>
                                        <button
                                            type="button"
                                            className="dream-social-btn"
                                            aria-label="Share on Facebook"
                                            onClick={() => handleShare("facebook")}
                                        >
                                            <FaFacebookF size={13} />
                                        </button>
                                        <button
                                            type="button"
                                            className="dream-social-btn"
                                            aria-label="Share on LinkedIn"
                                            onClick={() => handleShare("linkedin")}
                                        >
                                            <FaLinkedinIn size={14} />
                                        </button>
                                    </div>
                                </div>

                                {/* Subscribe to Our Newsletter */}
                                <div className="dream-newsletter-card">
                                    <h4 className="dream-nl-title">Subscribe to Our Newsletter</h4>
                                    <p className="dream-nl-desc">
                                        Get the latest news and updates delivered straight to your inbox.
                                    </p>
                                    {subscribed ? (
                                        <div className="dream-nl-success">
                                            <CheckCircle2 size={18} className="dream-nl-check" />
                                            <span>Thank you for subscribing!</span>
                                        </div>
                                    ) : (
                                        <form onSubmit={handleNewsletterSubmit} className="dream-nl-form">
                                            <input
                                                type="email"
                                                required
                                                placeholder="Enter Your Email"
                                                value={emailInput}
                                                onChange={(e) => setEmailInput(e.target.value)}
                                                className="dream-nl-input"
                                            />
                                            <button type="submit" className="dream-nl-submit-btn">
                                                Subscribe
                                            </button>
                                        </form>
                                    )}
                                </div>
                            </aside>

                            {/* Main Reading Article Area */}
                            <article className="dream-article-body">
                                {currentArticle.sections.map((sec, idx) => (
                                    <section
                                        key={sec.id}
                                        id={sec.id}
                                        className="dream-article-section"
                                    >
                                        <h2 className="dream-article-section-title">
                                            {sec.heading}
                                        </h2>

                                        {sec.paragraphs.map((p, pIdx) => (
                                            <p key={pIdx} className="dream-article-p">
                                                {p}
                                            </p>
                                        ))}

                                        {/* In-line Showcase Property Image under Section 1 */}
                                        {idx === 0 && (
                                            <div className="dream-inline-media-wrap">
                                                <img
                                                    src={currentArticle.inlineImage}
                                                    alt={currentArticle.estateName}
                                                    className="dream-inline-img"
                                                />
                                                {/* In-line Location Badge */}
                                                <div className="dream-inline-badge">
                                                    <MapPin size={16} className="dream-badge-pin" />
                                                    <div className="dream-inline-badge-text">
                                                        <strong>{currentArticle.estateName}</strong>
                                                        <span>{currentArticle.estateLocation}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </section>
                                ))}
                            </article>
                        </div>

                        {/* -------------------------------------------------------- */}
                        {/* RIGHT COLUMN: Highlights + Editor's Choice Articles      */}
                        {/* -------------------------------------------------------- */}
                        <div className="dream-right-column">
                            {/* SECTION 1: Highlights the Newness of The Articles */}
                            <section className="dream-highlights-section">
                                <h3 className="dream-col-heading">
                                    Highlights the Newness of The Articles
                                </h3>

                                {/* Large Horizontal Featured Card */}
                                <div
                                    className="dream-hero-card"
                                    onClick={() => window.scrollTo({ top: 400, behavior: "smooth" })}
                                >
                                    <img
                                        src={HIGHLIGHTS_FEATURED.image}
                                        alt={HIGHLIGHTS_FEATURED.title}
                                        className="dream-hero-card-img"
                                    />
                                    <div className="dream-hero-card-overlay">
                                        <h4 className="dream-hero-card-title">
                                            {HIGHLIGHTS_FEATURED.title}
                                        </h4>
                                        <p className="dream-hero-card-sub">
                                            {HIGHLIGHTS_FEATURED.subtitle}
                                        </p>
                                        <div className="dream-hero-card-meta">
                                            <span>{HIGHLIGHTS_FEATURED.date}</span>
                                            <span>·</span>
                                            <span>{HIGHLIGHTS_FEATURED.readTime}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* 2-Column Grid */}
                                <div className="dream-cards-grid-2col">
                                    {HIGHLIGHTS_CARDS.map((card) => (
                                        <div
                                            key={card.id}
                                            className="dream-card-item"
                                            onClick={() => window.scrollTo({ top: 400, behavior: "smooth" })}
                                        >
                                            <div className="dream-card-thumb-wrap">
                                                <img
                                                    src={card.image}
                                                    alt={card.title}
                                                    className="dream-card-thumb"
                                                />
                                            </div>
                                            <span className="dream-card-date">{card.date}</span>
                                            <h5 className="dream-card-title">{card.title}</h5>
                                            <p className="dream-card-excerpt">{card.excerpt}</p>
                                            <span className="dream-card-readtime">{card.readTime}</span>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* SECTION 2: Unveiling the Market: Editor's Choice Articles */}
                            <section className="dream-editors-section">
                                <h3 className="dream-col-heading">
                                    Unveiling the Market: Editor's Choice Articles
                                </h3>

                                {/* Category Tabs */}
                                <div className="dream-cat-tabs">
                                    {EDITORS_CHOICE_CATEGORIES.map((cat) => (
                                        <button
                                            key={cat}
                                            type="button"
                                            className={`dream-cat-tab-btn ${selectedCategory === cat ? "active" : ""}`}
                                            onClick={() => setSelectedCategory(cat)}
                                        >
                                            {cat}
                                        </button>
                                    ))}
                                </div>

                                {/* 2-Column Grid (4 Cards) */}
                                <div className="dream-cards-grid-2col">
                                    {currentArticles.map((card) => (
                                        <div
                                            key={card.id}
                                            className="dream-card-item"
                                            onClick={() => window.scrollTo({ top: 400, behavior: "smooth" })}
                                        >
                                            <div className="dream-card-thumb-wrap">
                                                <img
                                                    src={card.image}
                                                    alt={card.title}
                                                    className="dream-card-thumb"
                                                />
                                            </div>
                                            <span className="dream-card-date">{card.date}</span>
                                            <h5 className="dream-card-title">{card.title}</h5>
                                            <p className="dream-card-excerpt">{card.excerpt}</p>
                                            <span className="dream-card-readtime">{card.readTime}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Pagination */}
                                <div className="dream-pagination-bar">
                                    {[1, 2, 3].map((page) => (
                                        <button
                                            key={page}
                                            type="button"
                                            className={`dream-page-num ${activePage === page ? "active" : ""}`}
                                            onClick={() => setActivePage(page)}
                                        >
                                            {page}
                                        </button>
                                    ))}
                                    <span className="dream-page-dots">...</span>
                                    <button
                                        type="button"
                                        className={`dream-page-num ${activePage === 10 ? "active" : ""}`}
                                        onClick={() => setActivePage(10)}
                                    >
                                        10
                                    </button>
                                    <button
                                        type="button"
                                        className="dream-page-next"
                                        onClick={() => setActivePage((prev) => Math.min(prev + 1, 10))}
                                    >
                                        Next &gt;
                                    </button>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>

                {/* Learn More Modal Dialog */}
                {showLearnMoreModal && (
                    <div
                        className="dream-modal-backdrop"
                        onClick={() => setShowLearnMoreModal(false)}
                    >
                        <div
                            className="dream-modal-content"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                type="button"
                                className="dream-modal-close"
                                onClick={() => setShowLearnMoreModal(false)}
                            >
                                ✕
                            </button>
                            <div className="dream-modal-badge">
                                <Sparkles size={16} /> Exclusive Estate Advisory
                            </div>
                            <h3 className="dream-modal-title">
                                {currentArticle.estateName}
                            </h3>
                            <p className="dream-modal-loc">
                                📍 {currentArticle.estateLocation}
                            </p>
                            <p className="dream-modal-text">
                                Experience bespoke private residence viewing, complete legal verification audits, and RERA sanctioned dossier review directly with our senior advisory partners.
                            </p>
                            <div className="dream-modal-actions">
                                <a
                                    href="https://api.whatsapp.com/send?phone=917398174444&text=Hello,%20I%20would%20like%20to%20schedule%20a%20private%20tour%20for%20this%20estate."
                                    target="_blank"
                                    rel="noreferrer"
                                    className="dream-modal-wa-btn"
                                >
                                    <FaWhatsapp size={16} /> Schedule Private Tour
                                </a>
                                <button
                                    type="button"
                                    className="dream-modal-sec-btn"
                                    onClick={() => setShowLearnMoreModal(false)}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
}
