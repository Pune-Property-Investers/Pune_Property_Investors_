import Link from "next/link";
import Image from "next/image";
import ScrollToTopButton from "../common/ScrollToTopButton";
import FestivalOfferPopup from "../common/FestivalOfferPopup";
import {
    FaFacebookF,
    FaInstagram,
    FaLinkedinIn,
    FaYoutube,
    FaMapMarkerAlt,
    FaPhoneAlt,
    FaEnvelope,
    FaArrowRight,
} from "react-icons/fa";

const quickLinks = [
    { label: "Home", path: "/" },
    { label: "About Us", path: "/about" },
    { label: "Buy Properties", path: "/buy" },
    { label: "New Projects", path: "/projects" },
    { label: "Blog", path: "/blog" },
    { label: "Contact Us", path: "/contact" },
    { label: "Admin", path: "/admin" },
];

const propertyLinks = [
    { label: "Residential Properties", path: "/buy" },
    { label: "New Residential Projects", path: "/projects" },
    { label: "Commercial Properties", path: "/commercial" },
    { label: "Plots & Land", path: "/plots" },
];

const offices = [
    {
        city: "Pune, Maharashtra",
        label: "Headquarters",
        addressLines: [
            "3rd Floor, Suite 904, Gera Imperium Alpha,",
            "Grant Road, Vitthal Nagar, Kharadi,",
            "Pune, Maharashtra - 411014",
        ],
        mapUrl: "https://maps.app.goo.gl/49jQdRiP4CCgNMCP7",
    },
    {
        city: "Narhe, Pune",
        label: "Branch Office",
        addressLines: [
            "Vishwa Arcade, Navale Bridge,",
            "Vadgaon bk, Narhe,",
            "Pune, Maharashtra - 411041",
        ],
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Vishwa+Arcade+Navale+Bridge+Vadgaon+bk+Narhe+Pune+411041",
    },
    {
        city: "Dighi, Pune",
        label: "Branch Office",
        addressLines: [
            "Rajnandini Tower, Parande Nagar,",
            "Dighi, Pune, Maharashtra - 411015",
        ],
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Rajnandini+Tower+Parande+Nagar+Dighi+Pune+411015",
    },
];

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="site-footer">
            <div className="footer-main">
                <div className="footer-container">

                    {/* Company Information */}
                    <div className="footer-company">
                        <Link href="/" className="footer-brand">
                            <Image
                                src={`${basePath}/images/logo.png`}
                                alt="Pune Property Investor logo"
                                className="footer-brand__logo"
                                width={52}
                                height={52}
                            />

                            <span className="footer-brand__text">
                                <span className="footer-brand__name">
                                    PUNE PROPERTY
                                </span>

                                <span className="footer-brand__subtitle">
                                    INVESTOR
                                </span>
                            </span>
                        </Link>

                        <p className="footer-description">
                            Your trusted partner for discovering the right
                            property in Pune. We help homebuyers and investors
                            make informed real estate decisions with confidence,
                            transparency, and expert guidance.
                        </p>

                        <div className="footer-socials">
                            <a
                                href="https://www.facebook.com/punepropertyinvestors/"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Facebook"
                            >
                                <FaFacebookF />
                            </a>

                            <a
                                href="https://www.instagram.com/punepropertyinvestor/"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Instagram"
                            >
                                <FaInstagram />
                            </a>

                            <a
                                href="https://www.linkedin.com/company/puneproperty-investor/home/"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="LinkedIn"
                            >
                                <FaLinkedinIn />
                            </a>

                            <a
                                href="https://www.youtube.com/@PunePropertyInvestor/posts"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="YouTube"
                            >
                                <FaYoutube />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="footer-column">
                        <h3 className="footer-heading">Quick Links</h3>

                        <ul className="footer-links">
                            {quickLinks.map((item) => (
                                <li key={item.label}>
                                    <Link href={item.path}>
                                        <FaArrowRight />
                                        <span>{item.label}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Property Links */}
                    <div className="footer-column">
                        <h3 className="footer-heading">
                            Explore Properties
                        </h3>

                        <ul className="footer-links">
                            {propertyLinks.map((item) => (
                                <li key={item.label}>
                                    <Link href={item.path}>
                                        <FaArrowRight />
                                        <span>{item.label}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Information */}
                    <div className="footer-column footer-contact">
                        <h3 className="footer-heading">Get In Touch</h3>

                        <p className="footer-contact__intro">
                            Looking for the right property in Pune? Let's
                            connect.
                        </p>

                        <div className="footer-addresses-list">
                            {offices.map((office) => (
                                <a
                                    key={office.city}
                                    href={office.mapUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="footer-address-card"
                                    aria-label={`View ${office.city} location on Google Maps`}
                                >
                                    <div className="footer-address-card__icon-box">
                                        <FaMapMarkerAlt className="footer-address-card__icon" />
                                    </div>

                                    <h4 className="footer-address-card__city">
                                        {office.city}
                                    </h4>

                                    <div className="footer-address-card__details">
                                        {office.addressLines.map((line, idx) => (
                                            <p key={idx}>{line}</p>
                                        ))}
                                    </div>
                                </a>
                            ))}
                        </div>

                        <div className="footer-contact-actions">
                            <a
                                href="tel:+917398174444"
                                className="footer-contact__item"
                            >
                                <FaPhoneAlt />
                                <span>+91 73981 74444</span>
                            </a>

                            <a
                                href="mailto:info@punepropertyinvestor.com"
                                className="footer-contact__item"
                            >
                                <FaEnvelope />
                                <span>info@punepropertyinvestor.com</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div className="footer-bottom">
                <div className="footer-bottom__container">
                    <p>
                        © {currentYear} Pune Property Investor. All rights
                        reserved.
                    </p>

                    <div className="footer-legal-links">
                        <Link href="/privacy-policy">Privacy Policy</Link>

                        <Link href="/terms-and-conditions">
                            Terms & Conditions
                        </Link>
                    </div>
                </div>
            </div>

            <ScrollToTopButton />
            <FestivalOfferPopup />
        </footer>
    );
}

export default Footer;
