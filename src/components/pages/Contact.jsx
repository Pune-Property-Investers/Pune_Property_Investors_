"use client";

import { useState } from "react";
import Link from "next/link";
import {
    ArrowRight,
    Building2,
    CheckCircle2,
    AlertCircle,
    Loader2,
    MapPin,
    Phone,
    Mail,
    Clock,
    ShieldCheck,
    Navigation,
    ChevronDown,
    ExternalLink
} from "lucide-react";
import { FaWhatsapp, FaLinkedinIn } from "react-icons/fa6";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import { leadService } from "../../services/lead.service";
import "./Contact.css";

const WHATSAPP_NUMBER = "917398174444";
const ADVISOR_PHONE = "+917398174444";
const CONTACT_EMAIL = "info@punepropertyinvestor.com";
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";
const VILLA_BG_IMAGE = `${BASE_PATH}/images/luxury-villa-bg.jpg`;

export default function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        localityBudget: "",
        message: "",
    });

    const [agreedToPolicy, setAgreedToPolicy] = useState(true);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [serverError, setServerError] = useState("");
    const [activeFaq, setActiveFaq] = useState(null);

    const validate = () => {
        const errs = {};
        const cleanName = formData.name.trim();
        const cleanPhone = formData.phone.trim().replace(/\D/g, "");
        const cleanEmail = formData.email.trim();

        if (!cleanName || cleanName.length < 2) {
            errs.name = "Please enter your name";
        }

        if (!cleanPhone || cleanPhone.length < 10) {
            errs.phone = "Enter valid 10-digit number";
        }

        if (cleanEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
            errs.email = "Enter valid email address";
        }

        if (!agreedToPolicy) {
            errs.policy = "Please agree to the privacy policy";
        }

        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
        if (serverError) setServerError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isSubmitting) return;

        if (!validate()) return;

        setIsSubmitting(true);
        setServerError("");

        try {
            await leadService.create({
                type: "contact",
                name: formData.name.trim(),
                phone: formData.phone.trim(),
                email: formData.email.trim(),
                propertyTitle: "Contact Page Advisory Inquiry",
                locality: formData.localityBudget.trim() || "Pune",
                budget: formData.localityBudget.trim() || "Open Consultation",
                message: formData.message.trim() || `Locality & Budget: ${formData.localityBudget.trim() || "Pune"}`,
            });

            setIsSuccess(true);

            // Automated WhatsApp handoff
            const messageLines = [
                `*New Inquiry via Website - Contact Page*`,
                `*Name:* ${formData.name.trim()}`,
                `*Phone:* ${formData.phone.trim()}`,
                `*Email:* ${formData.email.trim() || "Not provided"}`,
                `*Preferred Locality & Budget:* ${formData.localityBudget.trim() || "Pune General"}`,
                `*Requirement:* ${formData.message.trim() || "Assistance requested"}`,
            ];
            const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                messageLines.join("\n")
            )}`;

            setTimeout(() => {
                window.open(waUrl, "_blank", "noopener,noreferrer");
            }, 800);

            setTimeout(() => {
                setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    localityBudget: "",
                    message: "",
                });
                setIsSuccess(false);
            }, 4500);
        } catch (err) {
            console.error("Failed to submit contact enquiry:", err);
            setServerError("Could not submit. Please connect on WhatsApp directly.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const toggleFaq = (index) => {
        setActiveFaq(activeFaq === index ? null : index);
    };

    const faqs = [
        {
            q: "How soon will an advisor contact me after submitting the form?",
            a: "Our senior Pune property specialists review every submission within 24 hours. For priority responses, you can also connect directly via our Fast-Track WhatsApp hotline.",
        },
        {
            q: "Are there any consultancy fees for homebuyers or investors?",
            a: "Zero fees. Our end-to-end buyer advisory service, verified inventory search, price negotiations, and site visit arrangements are completely free for buyers.",
        },
        {
            q: "Can you arrange site visits and doorstep pick-up in Pune?",
            a: "Yes. We arrange private, chauffeured site visits for shortlisted projects across Kharadi, Baner, Balewadi, Hinjewadi, Koregaon Park, and surrounding prime locations.",
        },
        {
            q: "Do you assist with home loans and MahaRERA title legal checks?",
            a: "Absolutely. Our advisory team coordinates bank pre-approvals with major financial institutions (SBI, HDFC, ICICI) and verifies all developer MahaRERA registrations and approvals.",
        },
    ];

    return (
        <div className="contact-page">
            <Header />

            <main className="contact-main">
                {/* 1. HERO SHOWCASE SECTION (MATCHES USER IMAGE 100%) */}
                <section className="contact-hero-section" aria-label="Start your property journey">
                    <div className="contact-hero-container">
                        <div
                            className="contact-showcase-frame"
                            style={{ backgroundImage: `url(${VILLA_BG_IMAGE})` }}
                        >
                            {/* Top-Right Badge: Office Location */}
                            <div className="contact-showcase__tag contact-showcase__tag--top">
                                <span className="tag-dot" aria-hidden="true" />
                                <Building2 size={15} className="tag-icon" />
                                <span>Gera Imperium Alpha, Kharadi</span>
                            </div>

                            {/* Bottom-Right Badge: Fast-Track Hotline */}
                            <a
                                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                                    "Hello Pune Property Investors, I would like to consult with a property advisor."
                                )}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="contact-showcase__tag contact-showcase__tag--bottom"
                                aria-label="Fast-Track Hotline on WhatsApp"
                            >
                                <FaWhatsapp size={16} className="tag-icon-wa" />
                                <span>Fast-Track Hotline: +91 73981 74444</span>
                            </a>

                            {/* Floating Left Form Card (Exact match to reference image) */}
                            <div className="contact-form-card">
                                <span className="contact-form__eyebrow">
                                    PUNE PROPERTY INVESTORS
                                </span>
                                <h1 className="contact-form__title">
                                    Start your Pune property journey today
                                </h1>
                                <p className="contact-form__subtitle">
                                    Complete the form and get a personalized list of verified properties within 24 hours.
                                </p>

                                {/* Success message */}
                                {isSuccess && (
                                    <div className="contact-alert contact-alert--success">
                                        <CheckCircle2 size={16} />
                                        <span>Thank you! Your inquiry has been received. Redirecting to WhatsApp...</span>
                                    </div>
                                )}

                                {/* Error message */}
                                {serverError && (
                                    <div className="contact-alert contact-alert--error">
                                        <AlertCircle size={16} />
                                        <span>{serverError}</span>
                                    </div>
                                )}

                                <form onSubmit={handleSubmit} className="contact-form" noValidate>
                                    {/* 1. Your name * */}
                                    <div className={`contact-form__input-group ${errors.name ? "has-error" : ""}`}>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="Your name *"
                                            className="contact-form__underline-input"
                                            required
                                            disabled={isSubmitting}
                                        />
                                        {errors.name && (
                                            <span className="contact-form__field-error">{errors.name}</span>
                                        )}
                                    </div>

                                    {/* 2. Email */}
                                    <div className={`contact-form__input-group ${errors.email ? "has-error" : ""}`}>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="Email"
                                            className="contact-form__underline-input"
                                            disabled={isSubmitting}
                                        />
                                        {errors.email && (
                                            <span className="contact-form__field-error">{errors.email}</span>
                                        )}
                                    </div>

                                    {/* 3. Phone number * */}
                                    <div className={`contact-form__input-group ${errors.phone ? "has-error" : ""}`}>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="Phone number *"
                                            className="contact-form__underline-input"
                                            required
                                            disabled={isSubmitting}
                                        />
                                        {errors.phone && (
                                            <span className="contact-form__field-error">{errors.phone}</span>
                                        )}
                                    </div>

                                    {/* 4. Preferred locality & budget */}
                                    <div className="contact-form__input-group">
                                        <input
                                            type="text"
                                            name="localityBudget"
                                            value={formData.localityBudget}
                                            onChange={handleChange}
                                            placeholder="Preferred locality & budget"
                                            className="contact-form__underline-input"
                                            disabled={isSubmitting}
                                        />
                                    </div>

                                    {/* 5. How can we help? */}
                                    <div className="contact-form__input-group">
                                        <input
                                            type="text"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            placeholder="How can we help?"
                                            className="contact-form__underline-input"
                                            disabled={isSubmitting}
                                        />
                                    </div>

                                    {/* Privacy Policy Checkbox */}
                                    <div className="contact-form__checkbox-row">
                                        <label className="contact-form__checkbox-label">
                                            <input
                                                type="checkbox"
                                                checked={agreedToPolicy}
                                                onChange={(e) => setAgreedToPolicy(e.target.checked)}
                                                className="contact-form__checkbox"
                                            />
                                            <span className="contact-form__checkbox-text">
                                                By submitting, you agree to our{" "}
                                                <Link href="/privacy-policy" className="contact-form__privacy-link">
                                                    Privacy Policy
                                                </Link>
                                                .
                                            </span>
                                        </label>
                                        {errors.policy && (
                                            <span className="contact-form__field-error">{errors.policy}</span>
                                        )}
                                    </div>

                                    {/* Submit Pill Button */}
                                    <button
                                        type="submit"
                                        className="contact-form__submit-btn"
                                        disabled={isSubmitting || isSuccess}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 size={16} className="contact-spinner" />
                                                <span>Submitting...</span>
                                            </>
                                        ) : isSuccess ? (
                                            <>
                                                <CheckCircle2 size={16} />
                                                <span>Sent Successfully</span>
                                            </>
                                        ) : (
                                            <>
                                                <span>Send message</span>
                                                <span className="contact-form__btn-arrow" aria-hidden="true">
                                                    <ArrowRight size={13} strokeWidth={2.4} />
                                                </span>
                                            </>
                                        )}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 2. DIRECT ADVISORY CHANNELS GRID */}
                <section className="contact-channels-section">
                    <div className="contact-channels-container">
                        <div className="channels-grid">
                            {/* Card 1: Head Office */}
                            <div className="channel-card">
                                <div className="channel-card__icon-wrap">
                                    <MapPin size={22} className="channel-icon" />
                                </div>
                                <h3 className="channel-card__title">Headquarters</h3>
                                <p className="channel-card__desc">
                                    Gera Imperium Alpha, Office No. 412, Near EON Free Zone, Kharadi, Pune - 411014
                                </p>
                                <a
                                    href="https://maps.google.com/?q=Gera+Imperium+Alpha+Kharadi+Pune"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="channel-card__link"
                                >
                                    <span>Get Directions</span>
                                    <ExternalLink size={13} />
                                </a>
                            </div>

                            {/* Card 2: Phone Advisory */}
                            <div className="channel-card">
                                <div className="channel-card__icon-wrap">
                                    <Phone size={22} className="channel-icon" />
                                </div>
                                <h3 className="channel-card__title">Direct Phone Line</h3>
                                <p className="channel-card__desc">
                                    Speak directly with our senior acquisition specialists for immediate assistance.
                                </p>
                                <a href={`tel:${ADVISOR_PHONE}`} className="channel-card__link channel-card__link--phone">
                                    <span>+91 73981 74444</span>
                                    <ArrowRight size={13} />
                                </a>
                            </div>

                            {/* Card 3: WhatsApp Channel */}
                            <div className="channel-card">
                                <div className="channel-card__icon-wrap channel-card__icon-wrap--wa">
                                    <FaWhatsapp size={24} className="channel-icon channel-icon--wa" />
                                </div>
                                <h3 className="channel-card__title">WhatsApp Concierge</h3>
                                <p className="channel-card__desc">
                                    Request high-res floor plans, cost sheets, and video walk-throughs instantly.
                                </p>
                                <a
                                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                                        "Hello Pune Property Investors, I would like to consult with an advisor."
                                    )}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="channel-card__link channel-card__link--wa"
                                >
                                    <span>Start Live Chat</span>
                                    <ArrowRight size={13} />
                                </a>
                            </div>

                            {/* Card 4: Email Desk */}
                            <div className="channel-card">
                                <div className="channel-card__icon-wrap">
                                    <Mail size={22} className="channel-icon" />
                                </div>
                                <h3 className="channel-card__title">Email Desk</h3>
                                <p className="channel-card__desc">
                                    Send investment dossiers, portfolio requirements, or institutional inquiries.
                                </p>
                                <a href={`mailto:${CONTACT_EMAIL}`} className="channel-card__link">
                                    <span>{CONTACT_EMAIL}</span>
                                    <ArrowRight size={13} />
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 3. INTERACTIVE OFFICE MAP & VISIT GUIDANCE */}
                <section className="contact-map-section">
                    <div className="contact-map-container">
                        <div className="map-showcase-card">
                            <div className="map-info-col">
                                <span className="map-eyebrow">PUNE EXPERIENCE CENTRE</span>
                                <h2 className="map-title">Visit Our Advisory Studio in Kharadi</h2>
                                <p className="map-desc">
                                    Experience private consultative property presentations with interactive master layout models, 3D project walk-throughs, and legal title document verification.
                                </p>

                                <div className="map-specs-list">
                                    <div className="map-spec-item">
                                        <Clock size={16} className="spec-icon" />
                                        <div>
                                            <strong>Advisory Hours:</strong>
                                            <span>Monday to Sunday: 9:30 AM – 7:30 PM IST</span>
                                        </div>
                                    </div>

                                    <div className="map-spec-item">
                                        <Navigation size={16} className="spec-icon" />
                                        <div>
                                            <strong>Key Landmarks:</strong>
                                            <span>3 Mins from EON IT Park | 12 Mins from Pune International Airport</span>
                                        </div>
                                    </div>

                                    <div className="map-spec-item">
                                        <ShieldCheck size={16} className="spec-icon" />
                                        <div>
                                            <strong>Valet & Parking:</strong>
                                            <span>Dedicated visitor valet parking available at Gera Imperium Alpha.</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="map-cta-row">
                                    <a
                                        href="https://maps.google.com/?q=Gera+Imperium+Alpha+Kharadi+Pune"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="map-nav-btn"
                                    >
                                        <Navigation size={15} />
                                        <span>Open in Google Maps</span>
                                    </a>
                                </div>
                            </div>

                            <div className="map-iframe-col">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.3557999710323!2d73.94829627589255!3d18.55799988254359!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c3c1e285eb7f%3A0xe54128f731c3bf1a!2sGera&#39;s%20Imperium%20Alpha!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Pune Property Investors Office Location - Gera Imperium Alpha"
                                    className="map-iframe"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* 4. FREQUENTLY ASKED QUESTIONS */}
                <section className="contact-faq-section">
                    <div className="contact-faq-container">
                        <div className="faq-header">
                            <span className="faq-eyebrow">COMMON QUERIES</span>
                            <h2 className="faq-title">Frequently Asked Questions</h2>
                            <p className="faq-desc">
                                Everything you need to know about consulting with Pune Property Investors.
                            </p>
                        </div>

                        <div className="faq-list">
                            {faqs.map((faq, idx) => (
                                <div
                                    key={idx}
                                    className={`faq-item ${activeFaq === idx ? "faq-item--active" : ""}`}
                                >
                                    <button
                                        type="button"
                                        className="faq-question-btn"
                                        onClick={() => toggleFaq(idx)}
                                        aria-expanded={activeFaq === idx}
                                    >
                                        <span>{faq.q}</span>
                                        <ChevronDown size={18} className="faq-chevron" />
                                    </button>
                                    {activeFaq === idx && (
                                        <div className="faq-answer">
                                            <p>{faq.a}</p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
