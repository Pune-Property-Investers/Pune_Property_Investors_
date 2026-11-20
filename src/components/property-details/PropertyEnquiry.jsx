"use client";

import { useState } from "react";
import { PhoneCall, ShieldCheck } from "lucide-react";
import { leadService } from "../../services/lead.service";
import "./PropertyEnquiry.css";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

function PropertyEnquiry({ property, isModal = false, onClose = null }) {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        message: "",
    });

    const [submitted, setSubmitted] = useState(false);

    const propertyTitle =
        property?.title || property?.name || "Property enquiry";

    const phoneNumber = "917398174444";

    const updateField = (event) => {
        const { name, value } = event.target;

        setFormData((current) => ({
            ...current,
            [name]: value,
        }));

        setSubmitted(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await leadService.create({
                type: "property",
                name: formData.name,
                phone: formData.phone,
                propertyTitle,
                locality: property?.locality || property?.location || "Pune",
                budget: property?.price || "",
                message: formData.message || "Please share more details.",
            });
        } catch {
            // Continue to WhatsApp handoff even if lead logging fails
        }

        const message = [
            `Hello, I am interested in ${propertyTitle}.`,
            `Name: ${formData.name}`,
            `Phone: ${formData.phone}`,
            `Message: ${formData.message || "Please share more details."}`,
        ].join("\n");

        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
            message
        )}`;

        window.open(whatsappUrl, "_blank", "noopener,noreferrer");
        setSubmitted(true);
        if (onClose) {
            setTimeout(() => onClose(), 1500);
        }
    };

    return (
        <aside className={`property-enquiry ${isModal ? "property-enquiry--modal" : ""}`} id="property-enquiry">
            <div className="property-enquiry__header">
                <span className="property-enquiry__eyebrow">INTERESTED IN THIS PROPERTY?</span>
                <h3 className="property-enquiry__title">Get More Information</h3>
                <p className="property-enquiry__sub">Share your details and our team will contact you.</p>
            </div>

            <form className="property-enquiry__form" onSubmit={handleSubmit}>
                <div className="property-enquiry__fields">
                    <div className="property-enquiry__field">
                        <label htmlFor="enquiry-name">Full Name</label>
                        <input
                            id="enquiry-name"
                            name="name"
                            type="text"
                            placeholder="Enter your name"
                            value={formData.name}
                            onChange={updateField}
                            autoComplete="name"
                            required
                            maxLength={100}
                        />
                    </div>

                    <div className="property-enquiry__field">
                        <label htmlFor="enquiry-phone">Mobile Number</label>
                        <input
                            id="enquiry-phone"
                            name="phone"
                            type="tel"
                            placeholder="Enter mobile number"
                            value={formData.phone}
                            onChange={updateField}
                            autoComplete="tel"
                            inputMode="numeric"
                            pattern="[0-9+\-\s()]{10,18}"
                            title="Enter a valid phone number."
                            required
                        />
                    </div>

                    <div className="property-enquiry__field property-enquiry__field--message">
                        <label htmlFor="enquiry-message">Message (Optional)</label>
                        <textarea
                            id="enquiry-message"
                            name="message"
                            placeholder="Interested in this property..."
                            value={formData.message}
                            onChange={updateField}
                            rows={3}
                            maxLength={500}
                        />
                    </div>
                </div>

                {/* Horizontal action buttons: WhatsApp & Call */}
                <div className="property-enquiry__actions">
                    <button
                        className="property-enquiry__btn property-enquiry__btn--whatsapp"
                        type="submit"
                        title="Send enquiry on WhatsApp"
                    >
                        <img
                            src={`${basePath}/images/whatsapp-logo.png`}
                            alt="WhatsApp"
                            className="property-enquiry__btn-icon property-enquiry__btn-icon--whatsapp"
                            width={16}
                            height={16}
                        />
                        <span>WhatsApp</span>
                    </button>

                    <a
                        href={`tel:+${phoneNumber}`}
                        className="property-enquiry__btn property-enquiry__btn--call"
                        title="Call property advisor"
                    >
                        <PhoneCall
                            size={14}
                            className="property-enquiry__btn-icon property-enquiry__btn-icon--call"
                            strokeWidth={2.2}
                        />
                        <span>Call Us</span>
                    </a>
                </div>

                {submitted && (
                    <p className="property-enquiry__success" role="status">
                        WhatsApp opened with your enquiry.
                    </p>
                )}
            </form>

            <p className="property-enquiry__privacy">
                <ShieldCheck size={12} />
                <span>Your details are kept strictly confidential.</span>
            </p>
        </aside>
    );
}

export default PropertyEnquiry;
