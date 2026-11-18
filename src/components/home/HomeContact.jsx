"use client";

import { useState } from "react";
import {
    ArrowRight,
    CheckCircle2,
    AlertCircle,
    Loader2,
} from "lucide-react";
import { FaWhatsapp, FaLinkedinIn, FaEnvelope } from "react-icons/fa6";
import { leadService } from "../../services/lead.service";
import "./HomeContact.css";

const WHATSAPP_NUMBER = "917398174444";
const CONTACT_EMAIL = "info@punepropertyinvestor.com";
const LINKEDIN_URL = "https://www.linkedin.com/company/puneproperty-investor/home/";
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";
const VILLA_BG_IMAGE = `${BASE_PATH}/images/luxury-villa-bg.jpg`;

export default function HomeContact({ previewData }) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        projectLocation: "",
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [serverError, setServerError] = useState("");

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
                propertyTitle: "Stay Connected With Us Inquiry",
                locality: formData.projectLocation.trim() || "Pune",
                budget: "Open Consultation",
                message: `Project Location: ${formData.projectLocation.trim() || "Pune"}`,
            });

            setIsSuccess(true);

            // WhatsApp chat handoff
            const messageLines = [
                `*New Inquiry via Website - Stay Connected*`,
                `*Name:* ${formData.name.trim()}`,
                `*Phone:* ${formData.phone.trim()}`,
                `*Email:* ${formData.email.trim() || "Not provided"}`,
                `*Project Location:* ${formData.projectLocation.trim() || "Pune"}`,
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
                    projectLocation: "",
                });
                setIsSuccess(false);
            }, 4500);
        } catch (err) {
            console.error("Failed to submit inquiry:", err);
            setServerError("Could not submit. Please connect on WhatsApp directly.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section
            className="editorial-contact-section"
            id="home-contact"
            aria-label="Stay Connected With Us"
        >
            <div className="editorial-contact-container">
                {/* Outer Showcase Frame with Background Image */}
                <div
                    className="editorial-showcase-frame"
                    style={{ backgroundImage: `url(${VILLA_BG_IMAGE})` }}
                >
                    {/* Subtle Dark Gradient Overlay */}
                    <div className="editorial-showcase-overlay" aria-hidden="true" />

                    {/* Inner Content Grid */}
                    <div className="fold-dual-grid">
                        {/* Floating Inner Form Card - Transparent Glass & Compact on Mobile */}
                        <div className="editorial-form-card fold-screen-left">
                            <div className="editorial-form-header">
                                <span className="editorial-form-eyebrow">
                                    {previewData?.eyebrow || "PUNE PROPERTY INVESTORS"}
                                </span>
                                <h2 className="editorial-form-title">
                                    {previewData?.heading || "Stay Connected With Us"}
                                </h2>
                                <p className="editorial-form-desc">
                                    {previewData?.subtitle ||
                                        "Connect with our senior property advisors for personalized recommendations in Pune."}
                                </p>
                            </div>

                            {/* Success Notification */}
                            {isSuccess && (
                                <div className="editorial-contact-alert editorial-contact-alert--success">
                                    <CheckCircle2 size={15} />
                                    <span>Thank you! Your inquiry has been received.</span>
                                </div>
                            )}

                            {/* Error Notification */}
                            {serverError && (
                                <div className="editorial-contact-alert editorial-contact-alert--error">
                                    <AlertCircle size={15} />
                                    <span>{serverError}</span>
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="editorial-form" noValidate>
                                <div className="editorial-form-grid">
                                    {/* 1. Your Name */}
                                    <div className={`editorial-input-group ${errors.name ? "has-error" : ""}`}>
                                        <input
                                            id="ed-name"
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="Your Name *"
                                            className="editorial-input"
                                            required
                                            disabled={isSubmitting}
                                        />
                                        {errors.name && (
                                            <span className="editorial-field-error">{errors.name}</span>
                                        )}
                                    </div>

                                    {/* 2. Email Address */}
                                    <div className={`editorial-input-group ${errors.email ? "has-error" : ""}`}>
                                        <input
                                            id="ed-email"
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="Email Address"
                                            className="editorial-input"
                                            disabled={isSubmitting}
                                        />
                                        {errors.email && (
                                            <span className="editorial-field-error">{errors.email}</span>
                                        )}
                                    </div>

                                    {/* 3. Phone Number */}
                                    <div className={`editorial-input-group ${errors.phone ? "has-error" : ""}`}>
                                        <input
                                            id="ed-phone"
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="Phone Number *"
                                            className="editorial-input"
                                            required
                                            disabled={isSubmitting}
                                        />
                                        {errors.phone && (
                                            <span className="editorial-field-error">{errors.phone}</span>
                                        )}
                                    </div>

                                    {/* 4. Project Location */}
                                    <div className="editorial-input-group">
                                        <input
                                            id="ed-location"
                                            type="text"
                                            name="projectLocation"
                                            value={formData.projectLocation}
                                            onChange={handleChange}
                                            placeholder="Project Location"
                                            className="editorial-input"
                                            disabled={isSubmitting}
                                        />
                                    </div>
                                </div>

                                {/* Submit Button Row */}
                                <div className="editorial-actions">
                                    <button
                                        type="submit"
                                        className="editorial-submit-pill"
                                        disabled={isSubmitting || isSuccess}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 size={14} className="editorial-spinner" />
                                                <span>Submitting...</span>
                                            </>
                                        ) : isSuccess ? (
                                            <>
                                                <CheckCircle2 size={14} />
                                                <span>Connected!</span>
                                            </>
                                        ) : (
                                            <>
                                                <span>Submit</span>
                                                <span className="editorial-arrow-circle">
                                                    <ArrowRight size={11} />
                                                </span>
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Floating Contact Icons (Bottom-Right Corner) */}
                        <div
                            className="editorial-floating-socials"
                            aria-label="Direct Contact Channels"
                        >
                            {/* WhatsApp Icon */}
                            <a
                                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                                    "Hello Pune Property Investors, I would like to consult with a property advisor."
                                )}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="editorial-social-btn editorial-social-btn--wa"
                                aria-label="Chat on WhatsApp"
                                title="Chat on WhatsApp"
                            >
                                <FaWhatsapp size={16} />
                            </a>

                            {/* Email Icon */}
                            <a
                                href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
                                    "Property Inquiry - Stay Connected"
                                )}`}
                                className="editorial-social-btn editorial-social-btn--mail"
                                aria-label="Send an Email"
                                title="Send an Email"
                            >
                                <FaEnvelope size={14} />
                            </a>

                            {/* LinkedIn Icon */}
                            <a
                                href={LINKEDIN_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="editorial-social-btn editorial-social-btn--in"
                                aria-label="Visit LinkedIn"
                                title="Visit our LinkedIn"
                            >
                                <FaLinkedinIn size={14} />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
