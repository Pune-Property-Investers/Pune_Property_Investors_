"use client";

import { useState } from "react";
import { Phone, MessageCircle, Send, ShieldCheck } from "lucide-react";
import { leadService } from "../../services/lead.service";
import "./PropertyEnquiry.css";

function PropertyEnquiry({ property }) {
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
    };

    return (
        <aside className="property-enquiry" id="property-enquiry">
            <div className="property-enquiry__header">
                <span className="property-enquiry__eyebrow">Interested?</span>
                <h2>Enquire About This Property</h2>
                <p>Share your details and our team can help you with the next steps.</p>
            </div>

            <form className="property-enquiry__form" onSubmit={handleSubmit}>
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

                <label htmlFor="enquiry-phone">Mobile Number</label>
                <input
                    id="enquiry-phone"
                    name="phone"
                    type="tel"
                    placeholder="Enter your mobile number"
                    value={formData.phone}
                    onChange={updateField}
                    autoComplete="tel"
                    inputMode="numeric"
                    pattern="[0-9+\-\s()]{10,18}"
                    title="Enter a valid phone number."
                    required
                />

                <label htmlFor="enquiry-message">Message (Optional)</label>
                <textarea
                    id="enquiry-message"
                    name="message"
                    placeholder="I would like to know more about this property..."
                    value={formData.message}
                    onChange={updateField}
                    rows={3}
                    maxLength={1000}
                />

                <button className="property-enquiry__submit" type="submit">
                    <Send size={17} />
                    Send Enquiry on WhatsApp
                </button>

                {submitted && (
                    <p className="property-enquiry__success" role="status">
                        WhatsApp has been opened with your enquiry. Send the message there
                        to contact our team.
                    </p>
                )}
            </form>

            <div className="property-enquiry__direct">
                <a href={`tel:+${phoneNumber}`}>
                    <Phone size={17} />
                    Call Our Team
                </a>

                <a
                    href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(
                        `Hello, I would like more information about ${propertyTitle}.`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                >
                    <MessageCircle size={17} />
                    WhatsApp
                </a>
            </div>

            <p className="property-enquiry__privacy">
                <ShieldCheck size={15} />
                Your details will be used to respond to your enquiry.
            </p>
        </aside>
    );
}

export default PropertyEnquiry;