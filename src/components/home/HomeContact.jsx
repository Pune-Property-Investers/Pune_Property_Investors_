"use client";

import { useState } from "react";
import {
    MapPin,
    Phone,
    Mail,
    Send,
    Clock,
    ShieldCheck,
    Award,
    Sparkles,
    CheckCircle2,
    Building2,
    Compass,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import "./HomeContact.css";

const WHATSAPP_NUMBER = "917398174444";
const PHONE_NUMBER = "+917398174444";

export default function HomeContact() {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        locality: "Kharadi & New Kharadi",
        budgetBhk: "3 BHK (₹95 Lacs - ₹1.5 Cr)",
        message: "",
    });

    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitted(true);

        const msg = [
            `*New Home Page Property Inquiry*`,
            `*Name:* ${formData.name}`,
            `*Phone:* ${formData.phone}`,
            `*Email:* ${formData.email || "Not specified"}`,
            `*Preferred Locality:* ${formData.locality}`,
            `*Configuration & Budget:* ${formData.budgetBhk}`,
            `*Requirements:* ${formData.message || "Looking for property recommendations & site visit."}`,
        ].join("\n");

        const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;

        setTimeout(() => {
            window.open(whatsappUrl, "_blank", "noopener,noreferrer");
            setIsSubmitted(false);
            setFormData({
                name: "",
                phone: "",
                email: "",
                locality: "Kharadi & New Kharadi",
                budgetBhk: "3 BHK (₹95 Lacs - ₹1.5 Cr)",
                message: "",
            });
        }, 800);
    };

    return (
        <section
            className="home-contact-section"
            id="home-contact"
            aria-label="Contact Pune Property Investors"
        >
            <div className="home-contact-container">
                {/* Section Header */}
                <div className="home-contact-header">
                    <div className="home-contact-eyebrow-wrap">
                        <span className="home-contact-eyebrow-line" />
                        <span className="home-contact-eyebrow">
                            <Compass size={14} className="text-gold" />
                            GET IN TOUCH
                        </span>
                        <span className="home-contact-eyebrow-line" />
                    </div>

                    <h2 className="home-contact-title">
                        Connect With Our Pune Real Estate Advisors
                    </h2>

                    <p className="home-contact-subtitle">
                        Looking for inaugural price sheets, verified layouts, or private site visits across Pune?
                        Speak directly with our senior property advisors 7 days a week.
                    </p>
                </div>

                {/* Main 2-Column Grid */}
                <div className="home-contact-grid">
                    {/* LEFT COLUMN: Luxury Inquiry Form */}
                    <div className="home-contact-card home-contact-card--form">
                        <div className="home-contact-card__badge">
                            <Sparkles size={13} />
                            <span>PRIORITY CONSULTATION</span>
                        </div>

                        <h3 className="home-contact-form-title">
                            Send Us an Inquiry
                        </h3>
                        <p className="home-contact-form-desc">
                            Fill in your requirements below and our advisor will connect with tailored property options within 15 minutes.
                        </p>

                        <form onSubmit={handleSubmit} className="home-contact-form">
                            {/* Full Name */}
                            <div className="home-contact-field">
                                <label htmlFor="home-contact-name" className="home-contact-label">
                                    Your Full Name *
                                </label>
                                <input
                                    id="home-contact-name"
                                    type="text"
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="e.g. Rajesh Kulkarni"
                                    className="home-contact-input"
                                />
                            </div>

                            {/* Phone & Email Row */}
                            <div className="home-contact-form-row">
                                <div className="home-contact-field">
                                    <label htmlFor="home-contact-phone" className="home-contact-label">
                                        WhatsApp / Mobile *
                                    </label>
                                    <input
                                        id="home-contact-phone"
                                        type="tel"
                                        name="phone"
                                        required
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="+91 98765 43210"
                                        className="home-contact-input"
                                    />
                                </div>

                                <div className="home-contact-field">
                                    <label htmlFor="home-contact-email" className="home-contact-label">
                                        Email Address (Optional)
                                    </label>
                                    <input
                                        id="home-contact-email"
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="rajesh@example.com"
                                        className="home-contact-input"
                                    />
                                </div>
                            </div>

                            {/* Locality & Budget Row */}
                            <div className="home-contact-form-row">
                                <div className="home-contact-field">
                                    <label htmlFor="home-contact-locality" className="home-contact-label">
                                        Preferred Pune Locality
                                    </label>
                                    <select
                                        id="home-contact-locality"
                                        name="locality"
                                        value={formData.locality}
                                        onChange={handleChange}
                                        className="home-contact-select"
                                    >
                                        <option value="Kharadi & New Kharadi">Kharadi & New Kharadi (East)</option>
                                        <option value="Baner & Balewadi">Baner & Balewadi (West)</option>
                                        <option value="Wakad & Tathawade">Wakad & Tathawade (West)</option>
                                        <option value="Hinjewadi Phase 1, 2, 3">Hinjewadi IT Corridor</option>
                                        <option value="Wagholi & Kesnand">Wagholi & Nagar Road</option>
                                        <option value="Hadapsar & Magarpatta">Hadapsar & Magarpatta</option>
                                        <option value="Kalyani Nagar & Koregaon Park">Kalyani Nagar & KP</option>
                                        <option value="Bavdhan & Kothrud">Bavdhan & Kothrud</option>
                                        <option value="Other / Entire Pune">Other / Flexible</option>
                                    </select>
                                </div>

                                <div className="home-contact-field">
                                    <label htmlFor="home-contact-budget" className="home-contact-label">
                                        Configuration & Budget
                                    </label>
                                    <select
                                        id="home-contact-budget"
                                        name="budgetBhk"
                                        value={formData.budgetBhk}
                                        onChange={handleChange}
                                        className="home-contact-select"
                                    >
                                        <option value="1 BHK (Under ₹50 Lacs)">1 BHK (Under ₹50 Lacs)</option>
                                        <option value="2 BHK (₹55 Lacs - ₹90 Lacs)">2 BHK (₹55 Lacs - ₹90 Lacs)</option>
                                        <option value="3 BHK (₹95 Lacs - ₹1.5 Cr)">3 BHK (₹95 Lacs - ₹1.5 Cr)</option>
                                        <option value="Luxury 3 & 4 BHK (₹1.5 Cr - ₹3 Cr)">Luxury 3 & 4 BHK (₹1.5 Cr - ₹3 Cr)</option>
                                        <option value="Penthouse / Villa (₹3 Cr+)">Penthouse / Villa (₹3 Cr+)</option>
                                        <option value="Commercial / Plot">Commercial / Land Plot</option>
                                    </select>
                                </div>
                            </div>

                            {/* Message */}
                            <div className="home-contact-field">
                                <label htmlFor="home-contact-message" className="home-contact-label">
                                    Specific Requirements or Project In Mind
                                </label>
                                <textarea
                                    id="home-contact-message"
                                    rows={3}
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="e.g. Looking for ready possession 3 BHK near IT company with 2 car parks..."
                                    className="home-contact-textarea"
                                />
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="home-contact-submit-btn"
                                disabled={isSubmitted}
                            >
                                {isSubmitted ? (
                                    <>
                                        <CheckCircle2 size={17} />
                                        <span>Connecting to WhatsApp...</span>
                                    </>
                                ) : (
                                    <>
                                        <Send size={16} />
                                        <span>Send Inquiry via WhatsApp</span>
                                    </>
                                )}
                            </button>
                        </form>
                    </div>

                    {/* RIGHT COLUMN: Office Details, Fast-Track WhatsApp & Guarantees */}
                    <div className="home-contact-sidebar">
                        {/* Direct Office Address & Details Card */}
                        <div className="home-contact-card home-contact-card--details">
                            <div className="home-contact-card__badge home-contact-card__badge--gold">
                                <Building2 size={13} />
                                <span>OFFICIAL HEADQUARTERS</span>
                            </div>

                            <h4 className="home-contact-details-title">
                                Pune Property Investors
                            </h4>

                            <div className="home-contact-info-list">
                                {/* Address */}
                                <div className="home-contact-info-item">
                                    <div className="home-contact-info-icon">
                                        <MapPin size={18} />
                                    </div>
                                    <div className="home-contact-info-text">
                                        <span className="home-contact-info-label">Office Location</span>
                                        <span className="home-contact-info-val">
                                            3rd Floor, Gera Imperium Alpha, Grant Road, Vitthal Nagar, Kharadi, Pune, Maharashtra 411014
                                        </span>
                                    </div>
                                </div>

                                {/* Advisory Phone */}
                                <div className="home-contact-info-item">
                                    <div className="home-contact-info-icon">
                                        <Phone size={18} />
                                    </div>
                                    <div className="home-contact-info-text">
                                        <span className="home-contact-info-label">Advisory Hotline</span>
                                        <a href={`tel:${PHONE_NUMBER}`} className="home-contact-info-link">
                                            +91 73981 74444
                                        </a>
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="home-contact-info-item">
                                    <div className="home-contact-info-icon">
                                        <Mail size={18} />
                                    </div>
                                    <div className="home-contact-info-text">
                                        <span className="home-contact-info-label">Email Support</span>
                                        <a href="mailto:info@punepropertyinvestor.com" className="home-contact-info-link">
                                            info@punepropertyinvestor.com
                                        </a>
                                    </div>
                                </div>

                                {/* Working Hours */}
                                <div className="home-contact-info-item">
                                    <div className="home-contact-info-icon">
                                        <Clock size={18} />
                                    </div>
                                    <div className="home-contact-info-text">
                                        <span className="home-contact-info-label">Working Hours</span>
                                        <span className="home-contact-info-val">
                                            Monday – Sunday: 9:30 AM – 7:30 PM
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* WhatsApp Fast-Track Card */}
                        <div className="home-contact-card home-contact-card--wa">
                            <div className="home-contact-wa-header">
                                <div className="home-contact-wa-icon-wrap">
                                    <FaWhatsapp size={24} />
                                </div>
                                <div>
                                    <h4 className="home-contact-wa-title">
                                        Fast-Track WhatsApp Advisory
                                    </h4>
                                    <span className="home-contact-wa-badge">Instant 2-Minute Reply</span>
                                </div>
                            </div>

                            <p className="home-contact-wa-desc">
                                Prefer an instant conversation? Tap below to chat directly with our senior Pune consultant for real-time floor plans, brochures, and price quotes.
                            </p>

                            <a
                                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                                    "Hello Pune Property Investor, I would like to consult with a property advisor regarding properties in Pune."
                                )}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="home-contact-wa-btn"
                            >
                                <FaWhatsapp size={18} />
                                <span>Start Instant WhatsApp Chat</span>
                            </a>
                        </div>

                        {/* 3 Trust Signals */}
                        <div className="home-contact-trust-row">
                            <div className="home-contact-trust-item">
                                <ShieldCheck size={18} className="text-gold" />
                                <span>100% Free Consultation</span>
                            </div>
                            <div className="home-contact-trust-item">
                                <Award size={18} className="text-gold" />
                                <span>Zero Brokerage on Direct Booking</span>
                            </div>
                            <div className="home-contact-trust-item">
                                <Sparkles size={18} className="text-gold" />
                                <span>Lowest Inaugural Price Guarantee</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

