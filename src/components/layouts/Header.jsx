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
            { label: "New Launches", href: "/new-launches" },
            { label: "New Projects", href: "/projects" },
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
        dropdown: [
            { label: "All Blog Posts", href: "/blog" },
            { label: "Real Estate Tips", href: "/blog" },
            { label: "Buying Guide", href: "/blog/buying-guide" },
            { label: "Investment Insights", href: "/blog/investment" },
        ],
    },
    {
        label: "News",
        href: "/news",
        dropdown: [
            { label: "All News", href: "/news" },
            { label: "Pune Property News", href: "/news" },
            { label: "Market Updates", href: "/news/market-updates" },
        ],
    },
    {
        label: "Career",
        href: "/career",
        dropdown: [
            { label: "Careers Overview", href: "/career" },
            { label: "Current Openings", href: "/career" },
            { label: "Join Our Team", href: "/career" },
        ],
    },
    {
        label: "Contact Us",
        href: "/contact",
    },
];

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

function Header() {
    const pathname = usePathname();
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
                className={`site-header ${isScrolled ? "site-header--scrolled" : ""} ${
                    menuOpen ? "site-header--open" : ""
                }`}
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
                                    className={`header-nav-item ${
                                        isDropdownOpen
                                            ? "header-nav-item--open"
                                            : ""
                                    }`}
                                >
                                    <div className="header-nav-item__main">
                                        <Link
                                            href={item.href}
                                            className={`header-nav-link ${
                                                item.label === "Home"
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
                                            className={`header-dropdown ${
                                                isDropdownOpen
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

                        {/* Desktop Call CTA */}
                        <div className="header-cta-item">
                            <a
                                href="tel:+917398174444"
                                className="header-cta-link"
                                aria-label="Call Pune Property Investor"
                            >
                                <Phone size={15} />
                                <span>Call Us</span>
                                <span className="header-cta-badge" aria-hidden="true">N</span>
                            </a>
                        </div>
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
                className={`mobile-drawer-backdrop ${
                    menuOpen ? "mobile-drawer-backdrop--visible" : ""
                }`}
                onClick={closeMenu}
                aria-hidden="true"
            />

            {/* Mobile Navigation Drawer */}
            <aside
                className={`mobile-drawer ${
                    menuOpen ? "mobile-drawer--open" : ""
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
                    {/* Navigation Options from Menu (Home, Properties, About Us, Blog, News, Career, Contact Us) */}
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
                                    className={`mobile-drawer__item ${
                                        isDropdownOpen ? "mobile-drawer__item--open" : ""
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
                                                className={`mobile-drawer__chevron ${
                                                    isDropdownOpen ? "mobile-drawer__chevron--rotated" : ""
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
                            href="/buy"
                            className="mobile-drawer__btn mobile-drawer__btn--search"
                            onClick={closeMenu}
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

            {/* Mobile Bottom Navigation Bar (Appears when scrolling down from head section with header) */}
            <nav
                className={`mobile-bottom-nav ${
                    isScrolled || pathname === "/shorts"
                        ? "mobile-bottom-nav--visible"
                        : ""
                }`}
                aria-label="Mobile Bottom Navigation"
            >
                {/* 1. Home */}
                <Link
                    href="/"
                    onClick={handleHomeClick}
                    className={`mobile-bottom-nav__item ${
                        pathname === "/" && !menuOpen
                            ? "mobile-bottom-nav__item--active"
                            : ""
                    }`}
                    aria-label="Home"
                >
                    <div className="mobile-bottom-nav__icon-wrap">
                        <Home className="mobile-bottom-nav__icon" size={20} />
                    </div>
                    <span className="mobile-bottom-nav__label">Home</span>
                </Link>

                {/* 2. Search */}
                <Link
                    href="/search"
                    onClick={closeMenu}
                    className={`mobile-bottom-nav__item ${
                        (pathname === "/search" ||
                            pathname === "/buy" ||
                            pathname?.startsWith("/properties")) &&
                        !menuOpen
                            ? "mobile-bottom-nav__item--active"
                            : ""
                    }`}
                    aria-label="Search"
                >
                    <div className="mobile-bottom-nav__icon-wrap">
                        <Search className="mobile-bottom-nav__icon" size={20} />
                    </div>
                    <span className="mobile-bottom-nav__label">Search</span>
                </Link>

                {/* 3. PPI Shorts */}
                <Link
                    href="/shorts"
                    onClick={closeMenu}
                    className={`mobile-bottom-nav__item ${
                        pathname === "/shorts" && !menuOpen
                            ? "mobile-bottom-nav__item--active mobile-bottom-nav__item--shorts"
                            : ""
                    }`}
                    aria-label="PPI Shorts"
                >
                    <div className="mobile-bottom-nav__icon-wrap">
                        <Film size={20} className="mobile-bottom-nav__icon" />
                    </div>
                    <span className="mobile-bottom-nav__label">PPI Shorts</span>
                    {pathname === "/shorts" && !menuOpen && (
                        <span className="mobile-bottom-nav__dot" />
                    )}
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
                        <FaWhatsapp size={20} className="mobile-bottom-nav__icon mobile-bottom-nav__icon--wa" />
                    </div>
                    <span className="mobile-bottom-nav__label mobile-bottom-nav__label--wa">WhatsApp</span>
                </a>

                {/* 5. Menu */}
                <button
                    type="button"
                    onClick={() => setMenuOpen((current) => !current)}
                    className={`mobile-bottom-nav__item ${
                        menuOpen ? "mobile-bottom-nav__item--active" : ""
                    }`}
                    aria-label={menuOpen ? "Close menu" : "Open menu"}
                    aria-expanded={menuOpen}
                >
                    <div className="mobile-bottom-nav__icon-wrap">
                        {menuOpen ? (
                            <X className="mobile-bottom-nav__icon" size={20} />
                        ) : (
                            <Menu className="mobile-bottom-nav__icon" size={20} />
                        )}
                    </div>
                    <span className="mobile-bottom-nav__label">Menu</span>
                </button>
            </nav>
        </>
    );
}

export default Header;
