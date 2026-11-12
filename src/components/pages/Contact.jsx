"use client";

import { useState } from "react";
import {
    MapPin,
    Phone,
    Mail,
    Send,
    MessageCircle,
    Clock,
} from "lucide-react";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import PageHeroBanner from "../common/PageHeroBanner";
import { leadService } from "../../services/lead.service";
import "./Contact.css";

const WHATSAPP_NUMBER = "917398174444";
const PHONE_NUMBER = "+917398174444";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        locality: "Kharadi",
        message: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await leadService.create({
                type: "contact",
                name: formData.name,
                phone: formData.phone,
                email: formData.email,
                propertyTitle: "Contact Page Enquiry",
                locality: formData.locality,
                message:
                    formData.message ||
                    "I would like to speak to a Pune Property Advisor.",
            });
        } catch {
            // Continue to WhatsApp handoff even if lead logging fails
        }
        const text = [
            `*New Property Inquiry via Contact Page*`,
            `Name: ${formData.name}`,
            `Phone: ${formData.phone}`,
            `Email: ${formData.email || "Not specified"}`,
            `Preferred Locality: ${formData.locality}`,
            `Message: ${formData.message || "I would like to speak to a Pune Property Advisor."}`,
        ].join("\n");

        const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
        window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    };

    return (
        <div className="contact-page">
            <Header />

            <main>
                {/* Hero Header Section */}
                <PageHeroBanner
                    title="Connect With Our"
                    titleAccent="Pune Real Estate Advisors."
                    eyebrow="GET IN TOUCH"
                    description="Have questions about newly launched projects, pricing, or property investment in Pune? Reach out today for personalized recommendations and site visit scheduling."
                    breadcrumbs={[
                        { label: "Home", href: "/" },
                        { label: "Contact Us" },
                    ]}
                    backgroundImage="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85"
                    icon={Phone}
                />

                <div className="container contact-page__content">
                    <div className="contact-grid">
                        {/* Contact Form */}
                        <div className="contact-form-card">
                            <h2 className="contact-form-title">
                                Send Us a Message
                            </h2>
                            <p className="contact-form-desc">
                                Fill out your details below and we will connect with you right away on WhatsApp or by call.
                            </p>

                            <form onSubmit={handleSubmit} className="contact-form">
                                <div>
                                    <label className="contact-label">
                                        Your Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="e.g. Amit Patil"
                                        className="contact-input"
                                    />
                                </div>

                                <div className="contact-form-row">
                                    <div>
                                        <label className="contact-label">
                                            Phone / WhatsApp *
                                        </label>
                                        <input
                                            type="tel"
                                            required
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="e.g. +91 98765 43210"
                                            className="contact-input"
                                        />
                                    </div>

                                    <div>
                                        <label className="contact-label">
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="e.g. amit@example.com"
                                            className="contact-input"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="contact-label">
                                        Preferred Pune Locality
                                    </label>
                                    <select
                                        name="locality"
                                        value={formData.locality}
                                        onChange={handleChange}
                                        className="contact-select"
                                    >
                                        <option value="Kharadi">Kharadi (East Pune)</option>
                                        <option value="Baner">Baner (West Pune)</option>
                                        <option value="Wakad">Wakad (West Pune)</option>
                                        <option value="Hinjewadi">Hinjewadi (IT Park)</option>
                                        <option value="Wagholi">Wagholi (Nagar Road)</option>
                                        <option value="Hadapsar / Magarpatta">Hadapsar / Magarpatta</option>
                                        <option value="NIBM / Undri">NIBM / Undri (South Pune)</option>
                                        <option value="Other">Other / Flexible</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="contact-label">
                                        Your Requirements / Message
                                    </label>
                                    <textarea
                                        rows={4}
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="Looking for 2 or 3 BHK near IT Park with budget around 80 Lakhs..."
                                        className="contact-textarea"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="primary-button contact-submit-btn"
                                >
                                    Send Inquiry via WhatsApp
                                    <Send size={16} />
                                </button>
                            </form>
                        </div>

                        {/* Direct Contact Info & Office */}
                        <div className="contact-info-col">
                            <div className="contact-office-card">
                                <h3 className="contact-office-title">
                                    Office Headquarters
                                </h3>

                                <div className="contact-office-item">
                                    <MapPin
                                        size={22}
                                        className="contact-office-icon"
                                    />
                                    <div>
                                        <strong className="contact-office-name">
                                            Pune Property Investors
                                        </strong>
                                        <span className="contact-office-address">
                                            3rd Floor, Gera Imperium Alpha, Grant Road,
                                            Vitthal Nagar, Kharadi, Pune, Maharashtra
                                            411014
                                        </span>
                                    </div>
                                </div>

                                <div className="contact-office-item contact-office-item--center">
                                    <Phone
                                        size={20}
                                        className="contact-office-icon contact-office-icon--center"
                                    />
                                    <div>
                                        <span className="contact-office-meta-label">
                                            Advisory Hotline
                                        </span>
                                        <a
                                            href={`tel:${PHONE_NUMBER}`}
                                            className="contact-office-link"
                                        >
                                            +91 73981 74444
                                        </a>
                                    </div>
                                </div>

                                <div className="contact-office-item contact-office-item--center">
                                    <Mail
                                        size={20}
                                        className="contact-office-icon contact-office-icon--center"
                                    />
                                    <div>
                                        <span className="contact-office-meta-label">
                                            General & Builder Inquiries
                                        </span>
                                        <a
                                            href="mailto:info@punepropertyinvestor.com"
                                            className="contact-office-link"
                                        >
                                            info@punepropertyinvestor.com
                                        </a>
                                    </div>
                                </div>

                                <div className="contact-office-item contact-office-item--center">
                                    <Clock
                                        size={20}
                                        className="contact-office-icon contact-office-icon--center"
                                    />
                                    <div>
                                        <span className="contact-office-meta-label">
                                            Working Hours
                                        </span>
                                        <span className="contact-office-val">
                                            Monday – Sunday: 9:30 AM – 7:30 PM
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* WhatsApp Fast Track Card */}
                            <div className="contact-whatsapp-card">
                                <div className="contact-whatsapp-header">
                                    <MessageCircle size={30} />
                                    <h4 className="contact-whatsapp-title">
                                        Instant WhatsApp Consultation
                                    </h4>
                                </div>
                                <p className="contact-whatsapp-desc">
                                    Need instant brochures, floor plans, and
                                    pricing for Pune properties? Chat directly with
                                    our senior property consultant.
                                </p>
                                <a
                                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                                        "Hello Pune Property Investor, I want to consult about buying a property in Pune."
                                    )}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="contact-whatsapp-btn"
                                >
                                    Start WhatsApp Chat
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
