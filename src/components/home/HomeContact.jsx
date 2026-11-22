"use client";

import { useState } from "react";
import Link from "next/link";
import {
    ArrowRight,
    Building2,
    CheckCircle2,
    AlertCircle,
    Loader2,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import { leadService } from "../../services/lead.service";
import "./HomeContact.css";

const WHATSAPP_NUMBER = "917398174444";
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

    const [agreedToPolicy, setAgreedToPolicy] = useState(true);
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
                propertyTitle: "Home Showcase Inquiry",
                locality: formData.localityBudget.trim() || "Pune",
                budget: formData.localityBudget.trim() || "Open Consultation",
                message: formData.message.trim() || `Locality & Budget: ${formData.localityBudget.trim() || "Pune"}`,
            });

            setIsSuccess(true);

            // WhatsApp chat handoff
            const messageLines = [
                `*New Inquiry via Website - Start Property Journey*`,
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
            aria-label="Start your Pune property journey today"
        >
            <div className="editorial-contact-container">
                {/* 1. Section Heading at Top */}
                <div className="editorial-contact-header">
                    <span className="editorial-contact-header__eyebrow">
                        GET IN TOUCH
                    </span>
                    <h2 className="editorial-contact-header__title">
                        Connect With Our <span>Property Advisors</span>
                    </h2>
                    <div className="editorial-contact-header__divider" aria-hidden="true" />
                </div>

                {/* 2. Outer Showcase Frame with Background Image */}
                <div
                    className="editorial-showcase-frame"
                    style={{ backgroundImage: `url(${VILLA_BG_IMAGE})` }}
                >
                    {/* Top-Right Badge: Office Location */}
                    <div className="home-showcase__tag home-showcase__tag--top">
                        <span className="home-tag-dot" aria-hidden="true" />
                        <Building2 size={14} className="home-tag-icon" />
                        <span>Gera Imperium Alpha, Kharadi</span>
                    </div>

                    {/* Bottom-Right Badge: Fast-Track Hotline */}
                    <a
                        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                            "Hello Pune Property Investors, I would like to consult with a property advisor."
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="home-showcase__tag home-showcase__tag--bottom"
                        aria-label="Fast-Track Hotline on WhatsApp"
                    >
                        <FaWhatsapp size={15} className="home-tag-icon-wa" />
                        <span>Fast-Track Hotline: +91 73981 74444</span>
                    </a>

                    {/* Decreased Compact Floating Form Card */}
                    <div className="home-form-card">
                        <span className="home-form__eyebrow">
                            {previewData?.eyebrow || "PUNE PROPERTY INVESTORS"}
                        </span>
                        <h3 className="home-form__title">
                            {previewData?.heading || "Start your Pune property journey today"}
                        </h3>
                        <p className="home-form__subtitle">
                            {previewData?.subtitle ||
                                "Complete the form and get a personalized list of verified properties within 24 hours."}
                        </p>

                        {/* Success Notification */}
                        {isSuccess && (
                            <div className="home-contact-alert home-contact-alert--success">
                                <CheckCircle2 size={15} />
                                <span>Thank you! Your inquiry has been received. Redirecting to WhatsApp...</span>
                            </div>
                        )}

                        {/* Error Notification */}
                        {serverError && (
                            <div className="home-contact-alert home-contact-alert--error">
                                <AlertCircle size={15} />
                                <span>{serverError}</span>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="home-contact-form" noValidate>
                            {/* 1. Your name * */}
                            <div className={`home-form__input-group ${errors.name ? "has-error" : ""}`}>
                                <input
                                    id="ed-name"
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Your name *"
                                    className="home-form__underline-input"
                                    required
                                    disabled={isSubmitting}
                                />
                                {errors.name && (
                                    <span className="home-form__field-error">{errors.name}</span>
                                )}
                            </div>

                            {/* 2. Email */}
                            <div className={`home-form__input-group ${errors.email ? "has-error" : ""}`}>
                                <input
                                    id="ed-email"
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Email"
                                    className="home-form__underline-input"
                                    disabled={isSubmitting}
                                />
                                {errors.email && (
                                    <span className="home-form__field-error">{errors.email}</span>
                                )}
                            </div>

                            {/* 3. Phone number * */}
                            <div className={`home-form__input-group ${errors.phone ? "has-error" : ""}`}>
                                <input
                                    id="ed-phone"
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="Phone number *"
                                    className="home-form__underline-input"
                                    required
                                    disabled={isSubmitting}
                                />
                                {errors.phone && (
                                    <span className="home-form__field-error">{errors.phone}</span>
                                )}
                            </div>

                            {/* 4. Preferred locality & budget */}
                            <div className="home-form__input-group">
                                <input
                                    id="ed-locality"
                                    type="text"
                                    name="localityBudget"
                                    value={formData.localityBudget}
                                    onChange={handleChange}
                                    placeholder="Preferred locality & budget"
                                    className="home-form__underline-input"
                                    disabled={isSubmitting}
                                />
                            </div>

                            {/* 5. How can we help? */}
                            <div className="home-form__input-group">
                                <input
                                    id="ed-message"
                                    type="text"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="How can we help?"
                                    className="home-form__underline-input"
                                    disabled={isSubmitting}
                                />
                            </div>

                            {/* Privacy Policy Checkbox */}
                            <div className="home-form__checkbox-row">
                                <label className="home-form__checkbox-label">
                                    <input
                                        type="checkbox"
                                        checked={agreedToPolicy}
                                        onChange={(e) => setAgreedToPolicy(e.target.checked)}
                                        className="home-form__checkbox"
                                    />
                                    <span className="home-form__checkbox-text">
                                        By submitting, you agree to our{" "}
                                        <Link href="/privacy-policy" className="home-form__privacy-link">
                                            Privacy Policy
                                        </Link>
                                        .
                                    </span>
                                </label>
                                {errors.policy && (
                                    <span className="home-form__field-error">{errors.policy}</span>
                                )}
                            </div>

                            {/* Submit Button Row */}
                            <div className="home-form__actions">
                                <button
                                    type="submit"
                                    className="home-form__submit-btn"
                                    disabled={isSubmitting || isSuccess}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 size={16} className="home-form-spinner" />
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
                                            <span className="home-form__btn-arrow" aria-hidden="true">
                                                <ArrowRight size={13} strokeWidth={2.4} />
                                            </span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
