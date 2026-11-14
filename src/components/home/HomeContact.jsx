"use client";

import { useState } from "react";
import {
    MapPin,
    Phone,
    Mail,
    ArrowRight,
    CheckCircle2,
    Building2,
    ShieldCheck,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { leadService } from "../../services/lead.service";
import "./HomeContact.css";

const WHATSAPP_NUMBER = "917398174444";
const PHONE_NUMBER = "+917398174444";
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";
const VILLA_BG_IMAGE = `${BASE_PATH}/images/luxury-villa-bg.jpg`;

export default function HomeContact({ previewData }) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        localityBudget: "",
        message: "",
    });
    const [agreed, setAgreed] = useState(true);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!agreed) return;

        setIsSubmitted(true);

        try {
            await leadService.create({
                type: "contact",
                name: formData.name,
                phone: formData.phone,
                email: formData.email,
                propertyTitle: "Editorial Showcase Advisory",
                locality: formData.localityBudget || "Pune (Flexible)",
                budget: formData.localityBudget || "Standard Bracket",
                message:
                    formData.message ||
                    "Looking for personalized property portfolio & site visit.",
            });
        } catch {
            // Continue to WhatsApp handoff even if lead logging fails
        }

        const msg = [
            `*New Pune Property Journey Inquiry*`,
            `*Name:* ${formData.name}`,
            `*Phone:* ${formData.phone}`,
            `*Email:* ${formData.email || "Not specified"}`,
            `*Locality & Budget:* ${formData.localityBudget || "Flexible / Across Pune"}`,
            `*Requirements:* ${formData.message || "Looking for property recommendations & site visit."}`,
        ].join("\n");

        const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;

        setTimeout(() => {
            window.open(whatsappUrl, "_blank", "noopener,noreferrer");
            setIsSubmitted(false);
            setFormData({
                name: "",
                email: "",
                phone: "",
                localityBudget: "",
                message: "",
            });
        }, 800);
    };

    return (
        <section
            className="editorial-contact-section"
            id="home-contact"
            aria-label="Contact Pune Property Investors"
        >
            <div className="editorial-contact-container">
                {/* Outer Architectural Showcase Frame */}
                <div className="editorial-showcase-frame samsung-fold-device">
                    {/* Full-size panoramic villa background across entire container */}
                    <div
                        className="editorial-showcase-bg fold-full-bg"
                        style={{ backgroundImage: `url(${VILLA_BG_IMAGE})` }}
                        role="img"
                        aria-label="Modern architectural luxury estate"
                    >
                        <div className="editorial-showcase-overlay" />
                    </div>

                    {/* Hardware Accents */}
                    <div className="fold-antenna-left" aria-hidden="true" />
                    <div className="fold-antenna-right" aria-hidden="true" />
                    <div className="fold-camera-dot" aria-hidden="true" />

                    {/* Dual Pane Layout (No middle partition) */}
                    <div className="fold-dual-grid">
                        {/* LEFT SIDE: Fully Transparent Contact Form (No white background) */}
                        <div className="editorial-form-card fold-screen-left">
                            <div className="editorial-form-header">
                                <span className="editorial-form-eyebrow">
                                    PUNE PROPERTY INVESTORS
                                </span>
                                <h2 className="editorial-form-title">
                                    {previewData?.heading ??
                                        "Start your Pune property journey today"}
                                </h2>
                                <p className="editorial-form-desc">
                                    {previewData?.subtitle ??
                                        "Complete the form and get a personalized list of verified properties within 24 hours."}
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="editorial-form">
                                {/* Your Name */}
                                <div className="editorial-input-group">
                                    <input
                                        id="ed-name"
                                        type="text"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Your name *"
                                        className="editorial-input"
                                    />
                                </div>

                                {/* Email */}
                                <div className="editorial-input-group">
                                    <input
                                        id="ed-email"
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Email"
                                        className="editorial-input"
                                    />
                                </div>

                                {/* Phone Number */}
                                <div className="editorial-input-group">
                                    <input
                                        id="ed-phone"
                                        type="tel"
                                        name="phone"
                                        required
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="Phone number *"
                                        className="editorial-input"
                                    />
                                </div>

                                {/* Preferred Locality & Budget */}
                                <div className="editorial-input-group">
                                    <input
                                        id="ed-locality"
                                        type="text"
                                        name="localityBudget"
                                        value={formData.localityBudget}
                                        onChange={handleChange}
                                        placeholder="Preferred locality & budget"
                                        className="editorial-input"
                                    />
                                </div>

                                {/* How Can We Help / Message */}
                                <div className="editorial-input-group">
                                    <textarea
                                        id="ed-message"
                                        rows={1}
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="How can we help?"
                                        className="editorial-input editorial-textarea"
                                    />
                                </div>

                                {/* Privacy Policy Checkbox Agreement */}
                                <label className="editorial-consent-row">
                                    <input
                                        type="checkbox"
                                        checked={agreed}
                                        onChange={(e) => setAgreed(e.target.checked)}
                                        className="editorial-checkbox"
                                        required
                                    />
                                    <span className="editorial-consent-text">
                                        By submitting, you agree to our{" "}
                                        <span className="editorial-policy-link">Privacy Policy</span>.
                                    </span>
                                </label>

                                {/* Black Pill CTA Button with Circle Arrow */}
                                <div className="editorial-actions">
                                    <button
                                        type="submit"
                                        className="editorial-submit-pill"
                                        disabled={isSubmitted || !agreed}
                                    >
                                        {isSubmitted ? (
                                            <>
                                                <CheckCircle2 size={14} />
                                                <span>Connecting...</span>
                                            </>
                                        ) : (
                                            <>
                                                <span>Send message</span>
                                                <span className="editorial-arrow-circle">
                                                    <ArrowRight size={11} />
                                                </span>
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* RIGHT SIDE: Open Panoramic Villa View with Badges */}
                        <div className="fold-screen-right-content">
                            <div className="editorial-glass-pill fold-glass-pill-top">
                                <span className="editorial-pulse-dot" />
                                <Building2 size={11} className="text-gold" />
                                <span>Gera Imperium Alpha, Kharadi</span>
                            </div>

                            <a
                                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                                    "Hello Pune Property Investor, I would like to consult with a property advisor regarding properties in Pune."
                                )}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="editorial-glass-pill editorial-glass-pill--wa fold-glass-pill-bottom"
                            >
                                <FaWhatsapp size={14} />
                                <span>Fast-Track Hotline: +91 73981 74444</span>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Sub-bar: Minimal Luxury Trust & Headquarters Info */}
                <div className="editorial-bottom-strip">
                    <div className="editorial-strip-item">
                        <MapPin size={14} className="text-gold" />
                        <div>
                            <strong>Headquarters:</strong> 3rd Floor, Gera Imperium Alpha, Kharadi, Pune
                        </div>
                    </div>
                    <div className="editorial-strip-item">
                        <Phone size={14} className="text-gold" />
                        <div>
                            <strong>Direct Hotline:</strong>{" "}
                            <a href={`tel:${PHONE_NUMBER}`}>+91 73981 74444</a>
                        </div>
                    </div>
                    <div className="editorial-strip-item">
                        <Mail size={14} className="text-gold" />
                        <div>
                            <strong>Support:</strong>{" "}
                            <a href="mailto:info@punepropertyinvestor.com">info@punepropertyinvestor.com</a>
                        </div>
                    </div>
                    <div className="editorial-strip-item">
                        <ShieldCheck size={14} className="text-gold" />
                        <div>
                            <strong>Zero Brokerage</strong> • 100% Free Consultation
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}