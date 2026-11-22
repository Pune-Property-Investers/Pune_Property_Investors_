"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
    Menu,
    X,
    ChevronDown,
    ChevronLeft,
    Phone,
    Search,
    Building2,
    Heart,
    Scale,
    ChevronRight,
    Home,
    Film,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import "./Header.css";

function ShortsIcon({ size = 20, className = "" }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.9"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <rect x="5.5" y="2.5" width="13" height="19" rx="3" />
            <line x1="7.5" y1="5.5" x2="16.5" y2="5.5" strokeWidth="1.4" opacity="0.65" />
            <polygon points="10 9.5 15.5 12 10 14.5" fill="currentColor" stroke="none" />
            <line x1="7.5" y1="18.5" x2="16.5" y2="18.5" strokeWidth="1.4" opacity="0.65" />
        </svg>
    );
}

const navigationItems = [
    {
        label: "Home",
        href: "/",
    },
    {
        label: "Properties",
        href: "/buy",
        dropdown: [
            { label: "All Properties", href: "/buy" },
            { label: "Search Properties", href: "/properties?focus=search#property-search" },
            { label: "New Launches", href: "/buy?type=new-launch" },
            { label: "Commercial Properties", href: "/commercial" },
            { label: "Plots & Land", href: "/plots" },
        ],
    },
    {
        label: "About Us",
        href: "/about",
    },
    {
        label: "Blog",
        href: "/blog",
    },
    {
        label: "Career",
        href: "/career",
    },
];

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const PUNE_LOCALITIES = [
    "kharadi", "hinjewadi", "hinjawadi", "wakad", "baner", "balewadi",
    "hadapsar", "kothrud", "viman nagar", "bavdhan", "nibm", "magarpatta",
    "kalyani nagar", "aundh", "ravet", "punawale", "tathawade", "mahalunge",
    "undri", "pisoli", "wagholi", "dhanori", "moshi", "chakan", "pcmc"
];

function isKnownLocality(term = "") {
    const lower = term.toLowerCase().trim();
    return PUNE_LOCALITIES.some((loc) => lower.includes(loc) || loc.includes(lower));
}

function Header({ transparentAtTop = false, forceDark = false, theme = "default", hideTopHeader = false }) {
    const router = useRouter();
    const pathname = usePathname();
    const [searchQuery, setSearchQuery] = useState("");

    const handleGoBack = () => {
        if (typeof window !== "undefined" && window.history.length > 1) {
            window.history.back();
        } else {
            router.push("/buy");
        }
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        const q = (searchQuery || "").trim();
        if (q) {
            if (isKnownLocality(q)) {
                router.push(`/buy?location=${encodeURIComponent(q)}&search=${encodeURIComponent(q)}#property-search`);
            } else {
                router.push(`/buy?search=${encodeURIComponent(q)}#property-search`);
            }
        } else {
            router.push("/buy?focus=search#property-search");
        }
    };
    const normalizedPath =
        pathname === "/" ? "/" : (pathname || "/").replace(/\/+$/, "");
    const isHome = normalizedPath === "/";
    const isTransparent =
        transparentAtTop ||
        (!forceDark &&
            theme !== "black" &&
            !normalizedPath.startsWith("/property") &&
            !normalizedPath.startsWith("/buy") &&
            !normalizedPath.startsWith("/properties") &&
            (isHome ||
                normalizedPath.startsWith("/commercial") ||
                normalizedPath.startsWith("/plots") ||
                normalizedPath.startsWith("/new-launches") ||
                normalizedPath.startsWith("/about") ||
                normalizedPath.startsWith("/blog") ||
                normalizedPath.startsWith("/career")));
    const [menuOpen, setMenuOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(null);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isHeaderHidden, setIsHeaderHidden] = useState(false);

    // Dynamic Active Index for Mobile Bottom Nav:
    // 0: Home, 1: Shorts, 2: WhatsApp, 3: Menu
    const getActiveIndex = () => {
        if (menuOpen) return 3;
        if (normalizedPath === "/shorts") return 1;
        return 0; // Default to Home
    };

    const [activeNavIndex, setActiveNavIndex] = useState(getActiveIndex);

    useEffect(() => {
        setActiveNavIndex(getActiveIndex());
    }, [normalizedPath, menuOpen]);

    const renderActiveBubbleIcon = (idx) => {
        switch (idx) {
            case 0:
                return <Home size={20} strokeWidth={2.2} className="mobile-bottom-nav__bubble-icon" />;
            case 1:
                return <ShortsIcon size={20} className="mobile-bottom-nav__bubble-icon" />;
            case 2:
                return <FaWhatsapp size={22} className="mobile-bottom-nav__bubble-icon mobile-bottom-nav__bubble-icon--wa" />;
            case 3:
                return menuOpen ? (
                    <X size={20} strokeWidth={2.2} className="mobile-bottom-nav__bubble-icon" />
                ) : (
                    <Menu size={20} strokeWidth={2.2} className="mobile-bottom-nav__bubble-icon" />
                );
            default:
                return <Home size={20} strokeWidth={2.2} className="mobile-bottom-nav__bubble-icon" />;
        }
    };

    const closeMenu = () => {
        setMenuOpen(false);
        setOpenDropdown(null);
    };

    const handleHomeClick = (e) => {
        closeMenu();
        if (pathname === "/") {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    const handleShortsClick = (e) => {
        closeMenu();
        if (pathname === "/") {
            const section = document.getElementById("featured-properties");
            if (section) {
                e.preventDefault();
                section.scrollIntoView({ behavior: "smooth", block: "start" });
                return;
            }
        }
    };

    const handleSearchClick = (e) => {
        closeMenu();
        if (
            normalizedPath === "/properties" ||
            normalizedPath === "/buy" ||
            normalizedPath.startsWith("/properties") ||
            normalizedPath.startsWith("/buy")
        ) {
            e.preventDefault();
            window.dispatchEvent(new CustomEvent("focus-property-search"));
            try {
                const url = new URL(window.location.href);
                url.searchParams.set("focus", "search");
                url.hash = "property-search";
                window.history.replaceState({}, "", url.toString());
            } catch (err) {
                // Ignore URL parsing errors
            }
        }
    };

    const toggleDropdown = (label) => {
        setOpenDropdown((current) => (current === label ? null : label));
    };

    // Track scroll position and auto-hide header on scroll up/down
    useEffect(() => {
        let ticking = false;
        let lastScrollY = typeof window !== "undefined" ? window.scrollY : 0;

        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const currentScrollY = window.scrollY;
                    const scrolled = currentScrollY > 20;
                    setIsScrolled((prev) => (prev !== scrolled ? scrolled : prev));

                    if (isHome) {
                        // For only home page in mobile and laptop view:
                        // Always keep the header visible when scrolling down!
                        setIsHeaderHidden(false);
                    } else if (transparentAtTop) {
                        // Static header with back button & search pill stays visible on scroll
                        setIsHeaderHidden(false);
                    } else {
                        // Standard pages
                        if (currentScrollY <= 20) {
                            setIsHeaderHidden(false);
                        } else if (currentScrollY > lastScrollY + 6) {
                            setIsHeaderHidden(true);
                        } else if (currentScrollY < lastScrollY - 10) {
                            setIsHeaderHidden(false);
                        }
                    }

                    lastScrollY = Math.max(0, currentScrollY);
                    ticking = false;
                });
                ticking = true;
            }
        };

        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [transparentAtTop, isHome]);

    // Close on Escape key and lock body scroll on mobile when drawer is open
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
                closeMenu();
            }
        };

        if (menuOpen) {
            window.addEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "";
        };
    }, [menuOpen]);

    return (
        <>
            {/* Header Main Bar (Fixed, Luxury Scrolled State) */}
            {!hideTopHeader && (
                <header
                    className={`site-header ${transparentAtTop ? "site-header--transparent" : ""} ${isTransparent && !isScrolled && !transparentAtTop ? "site-header--home" : ""} ${isScrolled ? "site-header--scrolled" : ""
                        } ${menuOpen ? "site-header--open" : ""} ${(theme === "black" || forceDark || (normalizedPath.startsWith("/property") && !transparentAtTop)) && (!isTransparent || isScrolled) && !transparentAtTop ? "site-header--black" : ""} ${isHeaderHidden && !menuOpen ? "site-header--hidden" : ""} ${isHome ? "site-header--is-home" : ""}`}
                >
                    {transparentAtTop ? (
                        <div className="property-header-container">
                            <button
                                type="button"
                                onClick={handleGoBack}
                                className="property-header__back-btn"
                                aria-label="Go back"
                            >
                                <ChevronLeft size={22} strokeWidth={2.4} />
                            </button>

                            <form onSubmit={handleSearchSubmit} className="property-header__search-form">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search City/Locality/Project..."
                                    className="property-header__search-input"
                                    aria-label="Search City, Locality, or Project"
                                />
                                <button
                                    type="submit"
                                    className="property-header__search-btn"
                                    aria-label="Search"
                                >
                                    <Search size={18} strokeWidth={2.2} />
                                </button>
                            </form>
                        </div>
                    ) : (
                        <div className="header-container">
                        {/* Company Logo and Brand Name */}
                        <Link
                            href="/"
                            className="header-brand"
                            aria-label="Pune Property Investor home"
                            onClick={closeMenu}
                        >
                            <Image
                                src={`${basePath}/images/logo.png`}
                                alt="Pune Property Investor logo"
                                className="header-brand__image"
                                width={68}
                                height={68}
                                priority
                            />

                            <span className="header-brand__text">
                                <span className="header-brand__name">
                                    PUNE PROPERTY
                                </span>
                                <span className="header-brand__subtitle">
                                    INVESTOR
                                </span>
                            </span>
                        </Link>

                        {/* Desktop Horizontal Navigation (Hidden on Mobile) */}
                        <nav
                            className="header-navigation desktop-only"
                            aria-label="Main navigation"
                        >
                            {navigationItems.map((item) => {
                                const isDropdownOpen = openDropdown === item.label;

                                return (
                                    <div
                                        key={item.label}
                                        className={`header-nav-item ${isDropdownOpen
                                            ? "header-nav-item--open"
                                            : ""
                                            }`}
                                    >
                                        <div className="header-nav-item__main">
                                            <Link
                                                href={item.href}
                                                className={`header-nav-link ${item.label === "Home"
                                                    ? "header-nav-link--home"
                                                    : ""
                                                    }`}
                                            >
                                                <span>{item.label}</span>
                                            </Link>

                                            {item.dropdown && (
                                                <button
                                                    type="button"
                                                    className="header-dropdown-toggle"
                                                    aria-label={`Toggle ${item.label} submenu`}
                                                    aria-expanded={isDropdownOpen}
                                                    onClick={() =>
                                                        toggleDropdown(item.label)
                                                    }
                                                >
                                                    <ChevronDown size={17} />
                                                </button>
                                            )}
                                        </div>

                                        {item.dropdown && (
                                            <div
                                                className={`header-dropdown ${isDropdownOpen
                                                    ? "header-dropdown--visible"
                                                    : ""
                                                    }`}
                                            >
                                                {item.dropdown.map((subItem) => (
                                                    <Link
                                                        key={subItem.label}
                                                        href={subItem.href}
                                                        className="header-dropdown__link"
                                                    >
                                                        {subItem.label}
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}

                            {/* Search Link for Desktop/Laptop View (Hidden on Home page) */}
                            {!isHome && (
                                <div className="header-nav-item">
                                    <div className="header-nav-item__main">
                                        <Link
                                            href="/properties?focus=search#property-search"
                                            onClick={handleSearchClick}
                                            className="header-nav-link header-nav-link--search"
                                            aria-label="Search properties"
                                        >
                                            <Search size={15} style={{ display: "inline-block", marginRight: "6px", verticalAlign: "-2px" }} />
                                            <span>Search</span>
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </nav>

                        {/* Mobile Header Actions (Right corner in logo row) */}
                        <div className="header-mobile-actions">
                            {!isHome && (
                                <Link
                                    href="/properties?focus=search#property-search"
                                    onClick={handleSearchClick}
                                    className="header-mobile-search-btn"
                                    aria-label="Search properties"
                                >
                                    <Search size={22} strokeWidth={2.1} />
                                </Link>
                            )}

                            {/* Mobile Hamburger Menu Toggle Button (matches Image 2 on tablet) */}
                            <button
                                type="button"
                                className="header-mobile-hamburger"
                                onClick={() => setMenuOpen((prev) => !prev)}
                                aria-label={menuOpen ? "Close menu" : "Open menu"}
                                aria-expanded={menuOpen}
                            >
                                <span className="header-mobile-hamburger__bar" />
                                <span className="header-mobile-hamburger__bar" />
                                <span className="header-mobile-hamburger__bar" />
                            </button>
                        </div>
                    </div>
                )}
            </header>
            )}

            {/* Backdrop Overlay for Mobile Drawer */}
            <div
                className={`mobile-drawer-backdrop ${menuOpen ? "mobile-drawer-backdrop--visible" : ""
                    }`}
                onClick={closeMenu}
                aria-hidden="true"
            />

            {/* Mobile Navigation Drawer */}
            <aside
                className={`mobile-drawer ${menuOpen ? "mobile-drawer--open" : ""
                    }`}
                aria-label="Mobile menu"
                aria-hidden={!menuOpen}
            >
                {/* Top Header in Black Background (matches reference image) */}
                <div className="mobile-drawer__header">
                    <Link
                        href="/"
                        className="mobile-drawer__brand"
                        onClick={closeMenu}
                        aria-label="Pune Property Investor home"
                    >
                        <Image
                            src={`${basePath}/images/logo.png`}
                            alt="Pune Property Investor logo"
                            className="mobile-drawer__logo"
                            width={40}
                            height={40}
                            priority
                        />

                        <span className="mobile-drawer__brand-text">
                            <span className="mobile-drawer__brand-name">
                                PUNE PROPERTY
                            </span>
                            <span className="mobile-drawer__brand-subtitle">
                                INVESTOR
                            </span>
                        </span>
                    </Link>

                    <button
                        type="button"
                        className="mobile-drawer__close-btn"
                        onClick={closeMenu}
                        aria-label="Close navigation drawer"
                    >
                        <X size={22} strokeWidth={2.2} />
                    </button>
                </div>

                <div className="mobile-drawer__content">
                    {/* Navigation Options from Menu (Home, Properties, About Us, Blog, Career) */}
                    <nav className="mobile-drawer__nav">
                        {navigationItems.map((item) => {
                            const isDropdownOpen = openDropdown === item.label;

                            if (!item.dropdown) {
                                return (
                                    <Link
                                        key={item.label}
                                        href={item.href}
                                        className="mobile-drawer__link"
                                        onClick={closeMenu}
                                    >
                                        <span>{item.label}</span>
                                        <ChevronRight size={17} className="mobile-drawer__arrow" />
                                    </Link>
                                );
                            }

                            return (
                                <div
                                    key={item.label}
                                    className={`mobile-drawer__item ${isDropdownOpen ? "mobile-drawer__item--open" : ""
                                        }`}
                                >
                                    <div className="mobile-drawer__link-row">
                                        <Link
                                            href={item.href}
                                            className="mobile-drawer__link-title"
                                            onClick={closeMenu}
                                        >
                                            <span>{item.label}</span>
                                        </Link>

                                        <button
                                            type="button"
                                            className="mobile-drawer__dropdown-trigger"
                                            onClick={() => toggleDropdown(item.label)}
                                            aria-label={`Toggle ${item.label} dropdown`}
                                            aria-expanded={isDropdownOpen}
                                        >
                                            <ChevronDown
                                                size={18}
                                                className={`mobile-drawer__chevron ${isDropdownOpen ? "mobile-drawer__chevron--rotated" : ""
                                                    }`}
                                            />
                                        </button>
                                    </div>

                                    {/* Submenu Accordion */}
                                    {isDropdownOpen && (
                                        <div className="mobile-drawer__submenu">
                                            {item.dropdown.map((subItem) => (
                                                <Link
                                                    key={subItem.label}
                                                    href={subItem.href}
                                                    className="mobile-drawer__sublink"
                                                    onClick={closeMenu}
                                                >
                                                    <span>{subItem.label}</span>
                                                    <ChevronRight size={14} className="mobile-drawer__subarrow" />
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </nav>

                    {/* Thin Section Divider */}
                    <div className="mobile-drawer__divider" />

                    {/* Secondary Utility Links */}
                    <div className="mobile-drawer__utilities">
                        <Link
                            href="/buy?filter=saved"
                            className="mobile-drawer__util-link"
                            onClick={closeMenu}
                        >
                            <Heart size={18} className="mobile-drawer__util-icon" />
                            <span>Saved Properties</span>
                        </Link>

                        <Link
                            href="/buy?filter=compare"
                            className="mobile-drawer__util-link"
                            onClick={closeMenu}
                        >
                            <Scale size={18} className="mobile-drawer__util-icon mobile-drawer__util-icon--gold" />
                            <span>Compare Properties</span>
                        </Link>
                    </div>

                    {/* Bottom Action Buttons & Caption */}
                    <div className="mobile-drawer__footer">
                        <a
                            href="tel:+917398174444"
                            className="mobile-drawer__btn mobile-drawer__btn--call"
                            onClick={closeMenu}
                        >
                            <Phone size={16} />
                            <span>Talk to Our Team</span>
                        </a>

                        <Link
                            href="/properties?focus=search#property-search"
                            className="mobile-drawer__btn mobile-drawer__btn--search"
                            onClick={handleSearchClick}
                        >
                            <Search size={16} />
                            <span>Search All Properties</span>
                        </Link>

                        <p className="mobile-drawer__caption">
                            Demonstration platform for Pune, Maharashtra
                        </p>
                    </div>
                </div>
            </aside>

            {/* Mobile Bottom Navigation Bar (Fluid Dynamic Cutout Notch Bar matching website luxury emerald & gold theme) */}
            <nav
                className={`mobile-bottom-nav ${isScrolled ||
                    normalizedPath === "/shorts" ||
                    hideTopHeader ||
                    normalizedPath.startsWith("/properties") ||
                    normalizedPath.startsWith("/buy")
                    ? "mobile-bottom-nav--visible"
                    : ""
                    }`}
                aria-label="Mobile Bottom Navigation"
                style={{
                    "--active-idx": activeNavIndex,
                    "--active-pct": `${12.5 + activeNavIndex * 25}%`,
                }}
            >
                {/* 1. Base Pill Bar Boundary (Clips the bar background AND the notch rim to the exact pill shape) */}
                <div className="mobile-bottom-nav__pill-boundary" aria-hidden="true">
                    <div className="mobile-bottom-nav__bar-bg" />

                    {/* Sliding Concave Cutout Notch Rim Line strictly clipped inside the navbar boundary */}
                    <div
                        className="mobile-bottom-nav__slider mobile-bottom-nav__slider--rim"
                        style={{ transform: `translateX(${activeNavIndex * 100}%)` }}
                    >
                        <div className="mobile-bottom-nav__notch-cutout">
                            <svg className="mobile-bottom-nav__notch-svg" viewBox="0 0 68 36">
                                <defs>
                                    <linearGradient id="ppi-notch-rim-glow" x1="0" y1="0" x2="1" y2="0">
                                        <stop offset="0%" stopColor="transparent" />
                                        <stop offset="14%" stopColor="rgba(214, 179, 106, 0.4)" />
                                        <stop offset="30%" stopColor="#F5D78E" />
                                        <stop offset="50%" stopColor="#FFF1C2" />
                                        <stop offset="70%" stopColor="#F5D78E" />
                                        <stop offset="86%" stopColor="rgba(214, 179, 106, 0.4)" />
                                        <stop offset="100%" stopColor="transparent" />
                                    </linearGradient>
                                </defs>
                                {/* Precision concentric circular arc matching the 30px cutout with smooth blended fillets */}
                                <path
                                    d="M 1,0 C 2.5,0 3.5,0.4 4.3,1.2 A 30 30 0 0 0 63.7,1.2 C 64.5,0.4 65.5,0 67,0"
                                    fill="none"
                                    stroke="url(#ppi-notch-rim-glow)"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* 2. Sliding Popped-Up Bubble (Unclipped, floats above the navbar) */}
                <div
                    className="mobile-bottom-nav__slider mobile-bottom-nav__slider--bubble"
                    style={{ transform: `translateX(${activeNavIndex * 100}%)` }}
                    aria-hidden="true"
                >
                    <div className="mobile-bottom-nav__bubble" key={activeNavIndex}>
                        {renderActiveBubbleIcon(activeNavIndex)}
                    </div>
                </div>

                {/* 3. The 4 Interactive Navigation Buttons */}
                {/* 1. Home */}
                <Link
                    href="/"
                    onClick={(e) => {
                        setActiveNavIndex(0);
                        handleHomeClick(e);
                    }}
                    className={`mobile-bottom-nav__item ${activeNavIndex === 0 ? "mobile-bottom-nav__item--active" : ""}`}
                    aria-label="Home"
                >
                    <div className="mobile-bottom-nav__icon-wrap">
                        <Home className="mobile-bottom-nav__icon" size={20} strokeWidth={1.8} />
                    </div>
                    <span className="mobile-bottom-nav__label">Home</span>
                    <span className="mobile-bottom-nav__indicator" aria-hidden="true" />
                </Link>

                {/* 2. PPI Shorts */}
                <Link
                    href="/shorts"
                    onClick={() => {
                        setActiveNavIndex(1);
                        closeMenu();
                    }}
                    className={`mobile-bottom-nav__item ${activeNavIndex === 1 ? "mobile-bottom-nav__item--active" : ""}`}
                    aria-label="PPI Shorts"
                >
                    <div className="mobile-bottom-nav__icon-wrap">
                        <ShortsIcon size={20} className="mobile-bottom-nav__icon" />
                    </div>
                    <span className="mobile-bottom-nav__label">Shorts</span>
                    <span className="mobile-bottom-nav__indicator" aria-hidden="true" />
                </Link>

                {/* 3. WhatsApp */}
                <a
                    href="https://wa.me/917398174444?text=Hello%20Pune%20Property%20Investors%2C%20I%20would%20like%20to%20know%20more%20about%20your%20properties."
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => {
                        setActiveNavIndex(2);
                        closeMenu();
                    }}
                    className={`mobile-bottom-nav__item mobile-bottom-nav__item--wa ${activeNavIndex === 2 ? "mobile-bottom-nav__item--active" : ""}`}
                    aria-label="WhatsApp"
                >
                    <div className="mobile-bottom-nav__icon-wrap">
                        <FaWhatsapp size={21} className="mobile-bottom-nav__icon mobile-bottom-nav__icon--wa" />
                    </div>
                    <span className="mobile-bottom-nav__label mobile-bottom-nav__label--wa">WhatsApp</span>
                    <span className="mobile-bottom-nav__indicator" aria-hidden="true" />
                </a>

                {/* 4. Menu */}
                <button
                    type="button"
                    onClick={() => {
                        const next = !menuOpen;
                        setMenuOpen(next);
                        setActiveNavIndex(next ? 3 : getActiveIndex());
                    }}
                    className={`mobile-bottom-nav__item mobile-bottom-nav__item--menu ${activeNavIndex === 3 ? "mobile-bottom-nav__item--active" : ""}`}
                    aria-label={menuOpen ? "Close menu" : "Open menu"}
                    aria-expanded={menuOpen}
                >
                    <div className="mobile-bottom-nav__icon-wrap">
                        {menuOpen ? (
                            <X className="mobile-bottom-nav__icon mobile-bottom-nav__icon--menu-toggle" size={20} strokeWidth={1.8} />
                        ) : (
                            <Menu className="mobile-bottom-nav__icon mobile-bottom-nav__icon--menu-toggle" size={20} strokeWidth={1.8} />
                        )}
                    </div>
                    <span className="mobile-bottom-nav__label">Menu</span>
                    <span className="mobile-bottom-nav__indicator" aria-hidden="true" />
                </button>
            </nav>
        </>
    );
}

export default Header;
