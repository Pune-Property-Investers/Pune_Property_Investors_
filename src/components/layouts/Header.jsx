"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
    Menu,
    X,
    ChevronDown,
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

function Header({ transparentAtTop = false }) {
    const pathname = usePathname();
    const normalizedPath =
        pathname === "/" ? "/" : (pathname || "/").replace(/\/+$/, "");
    const isHome = normalizedPath === "/";
    const isTransparent =
        isHome ||
        transparentAtTop ||
        normalizedPath.startsWith("/buy") ||
        normalizedPath.startsWith("/properties") ||
        normalizedPath.startsWith("/property") ||
        normalizedPath.startsWith("/commercial") ||
        normalizedPath.startsWith("/plots") ||
        normalizedPath.startsWith("/new-launches") ||
        normalizedPath.startsWith("/about") ||
        normalizedPath.startsWith("/blog") ||
        normalizedPath.startsWith("/career");
    const [menuOpen, setMenuOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(null);
    const [isScrolled, setIsScrolled] = useState(false);

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
            window.dispatchEvent(new CustomEvent("open-property-filters"));
            try {
                const url = new URL(window.location.href);
                url.searchParams.set("filter", "open");
                window.history.replaceState({}, "", url.toString());
            } catch (err) {
                // Ignore URL parsing errors
            }
        }
    };

    const toggleDropdown = (label) => {
        setOpenDropdown((current) => (current === label ? null : label));
    };

    // Track scroll position using requestAnimationFrame to prevent scroll lag
    useEffect(() => {
        let ticking = false;
        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const scrolled = window.scrollY > 40;
                    setIsScrolled((prev) => (prev !== scrolled ? scrolled : prev));
                    ticking = false;
                });
                ticking = true;
            }
        };

        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

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
            <header
                className={`site-header ${isTransparent ? "site-header--home" : ""} ${isScrolled ? "site-header--scrolled" : ""
                    } ${menuOpen ? "site-header--open" : ""}`}
            >
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
                    </nav>

                    {/* Mobile Hamburger Menu Toggle Button (matches Image 2) */}
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
            </header>

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
                            href="/properties?filter=open"
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

            {/* Mobile Bottom Navigation Bar (Floating Pill Shape with Scooped Centre Cradle) */}
            <nav
                className={`mobile-bottom-nav ${isScrolled || normalizedPath === "/shorts"
                    ? "mobile-bottom-nav--visible"
                    : ""
                    }`}
                aria-label="Mobile Bottom Navigation"
            >
                {/* Scooped Cradle Backdrop */}
                <div className="mobile-bottom-nav__backdrop" aria-hidden="true">
                    <div className="mobile-bottom-nav__bg-wing mobile-bottom-nav__bg-wing--left" />
                    <svg className="mobile-bottom-nav__bg-notch" viewBox="0 0 96 64" preserveAspectRatio="none">
                        <defs>
                            <linearGradient id="ppi-notch-body" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#18443d" stopOpacity="0.98" />
                                <stop offset="100%" stopColor="#11322d" stopOpacity="0.98" />
                            </linearGradient>
                            <linearGradient id="ppi-cradle-glow" x1="0" y1="0" x2="1" y2="0">
                                <stop offset="0%" stopColor="rgba(214, 179, 106, 0.35)" />
                                <stop offset="50%" stopColor="rgba(244, 213, 138, 0.9)" />
                                <stop offset="100%" stopColor="rgba(214, 179, 106, 0.35)" />
                            </linearGradient>
                        </defs>
                        {/* Dark Body fill with circular scooped notch tailored to the Shorts circle */}
                        <path
                            d="M -2,0 L 15,0 C 18,0 20.85,5.06 22.4,10.86 A 26.5 26.5 0 0,0 73.6,10.86 C 75.15,5.06 78,0 81,0 L 98,0 L 98,64 L -2,64 Z"
                            fill="url(#ppi-notch-body)"
                        />
                        {/* Top Scooped Gold Rim Contour (Concentric circular arc around button) */}
                        <path
                            d="M 0,0 L 15,0 C 18,0 20.85,5.06 22.4,10.86 A 26.5 26.5 0 0,0 73.6,10.86 C 75.15,5.06 78,0 81,0 L 96,0"
                            fill="none"
                            stroke="url(#ppi-cradle-glow)"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                        />
                        {/* Bottom Gold Rim Line */}
                        <line
                            x1="-2" y1="63.5" x2="98" y2="63.5"
                            stroke="rgba(214, 179, 106, 0.28)"
                            strokeWidth="1"
                        />
                    </svg>
                    <div className="mobile-bottom-nav__bg-wing mobile-bottom-nav__bg-wing--right" />
                </div>

                {/* Dark Gold Snake Border Animation (Runs once when container appears, slow & prominently dark) */}
                <svg
                    className="mobile-bottom-nav__snake-svg"
                    viewBox="0 0 400 64"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                >
                    <defs>
                        <linearGradient id="ppi-snake-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#3E2407" stopOpacity="0" />
                            <stop offset="20%" stopColor="#6D4512" stopOpacity="0.95" />
                            <stop offset="55%" stopColor="#9B681D" stopOpacity="1" />
                            <stop offset="85%" stopColor="#C48D2E" stopOpacity="1" />
                            <stop offset="100%" stopColor="#D99F3B" stopOpacity="1" />
                        </linearGradient>
                        <filter id="ppi-snake-glow" x="-20%" y="-20%" width="140%" height="140%">
                            <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#B88228" floodOpacity="0.95" />
                        </filter>
                    </defs>
                    <path
                        className="mobile-bottom-nav__snake-line"
                        d="M 32,0 L 167,0 C 170,0 172.85,5.06 174.4,10.86 A 26.5 26.5 0 0,0 225.6,10.86 C 227.15,5.06 230,0 233,0 L 368,0 A 32,32 0 0,1 400,32 A 32,32 0 0,1 368,64 L 32,64 A 32,32 0 0,1 0,32 A 32,32 0 0,1 32,0 Z"
                        fill="none"
                        stroke="url(#ppi-snake-grad)"
                        strokeWidth="3.2"
                        strokeLinecap="round"
                        filter="url(#ppi-snake-glow)"
                        vectorEffect="non-scaling-stroke"
                    />
                </svg>

                {/* 1. Home */}
                <Link
                    href="/"
                    onClick={handleHomeClick}
                    className={`mobile-bottom-nav__item mobile-bottom-nav__item--home ${normalizedPath === "/" && !menuOpen
                        ? "mobile-bottom-nav__item--active"
                        : ""
                        }`}
                    aria-label="Home"
                >
                    <div className="mobile-bottom-nav__icon-wrap">
                        <Home className="mobile-bottom-nav__icon" size={20} strokeWidth={1.8} />
                    </div>
                    <span className="mobile-bottom-nav__label">Home</span>
                    <span className="mobile-bottom-nav__indicator" aria-hidden="true" />
                </Link>

                {/* 2. Search */}
                <Link
                    href="/properties?filter=open"
                    onClick={handleSearchClick}
                    className={`mobile-bottom-nav__item mobile-bottom-nav__item--search ${(normalizedPath === "/search" ||
                        normalizedPath === "/buy" ||
                        normalizedPath.startsWith("/properties")) &&
                        !menuOpen
                        ? "mobile-bottom-nav__item--active"
                        : ""
                        }`}
                    aria-label="Search properties"
                >
                    <div className="mobile-bottom-nav__icon-wrap">
                        <Search className="mobile-bottom-nav__icon" size={20} strokeWidth={1.8} />
                    </div>
                    <span className="mobile-bottom-nav__label">Search</span>
                    <span className="mobile-bottom-nav__indicator" aria-hidden="true" />
                </Link>

                {/* 3. PPI Shorts (Special Centre Highlight) */}
                <Link
                    href="/shorts"
                    onClick={closeMenu}
                    className={`mobile-bottom-nav__item mobile-bottom-nav__item--shorts ${normalizedPath === "/shorts" && !menuOpen
                        ? "mobile-bottom-nav__item--active"
                        : ""
                        }`}
                    aria-label="PPI Shorts"
                >
                    <div className="mobile-bottom-nav__shorts-pod">
                        <ShortsIcon size={22} className="mobile-bottom-nav__shorts-icon" />
                    </div>
                    <span className="mobile-bottom-nav__label">PPI Shorts</span>
                    <span className="mobile-bottom-nav__indicator" aria-hidden="true" />
                </Link>

                {/* 4. WhatsApp */}
                <a
                    href="https://wa.me/917398174444?text=Hello%20Pune%20Property%20Investors%2C%20I%20would%20like%20to%20know%20more%20about%20your%20properties."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mobile-bottom-nav__item mobile-bottom-nav__item--wa"
                    aria-label="WhatsApp"
                >
                    <div className="mobile-bottom-nav__icon-wrap">
                        <FaWhatsapp size={21} className="mobile-bottom-nav__icon mobile-bottom-nav__icon--wa" />
                    </div>
                    <span className="mobile-bottom-nav__label mobile-bottom-nav__label--wa">WhatsApp</span>
                    <span className="mobile-bottom-nav__indicator" aria-hidden="true" />
                </a>

                {/* 5. Menu */}
                <button
                    type="button"
                    onClick={() => setMenuOpen((current) => !current)}
                    className={`mobile-bottom-nav__item mobile-bottom-nav__item--menu ${menuOpen ? "mobile-bottom-nav__item--active" : ""
                        }`}
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
