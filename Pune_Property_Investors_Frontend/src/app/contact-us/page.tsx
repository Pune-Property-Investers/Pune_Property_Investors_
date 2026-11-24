import type { Metadata } from "next";
import Contact from "../../components/pages/Contact";

export const metadata: Metadata = {
    title: "Contact Us | Schedule Site Visit & Expert Advisory | PPI Infra",
    description:
        "Get in touch with certified Pune property advisors for instant WhatsApp consultations, site visit bookings, and customized real estate recommendations.",
    keywords: [
        "contact Pune Property Investors",
        "property enquiry Pune",
        "schedule site visit Pune",
        "real estate phone number Pune",
        "PPI Infra office Kharadi"
    ],
    alternates: {
        canonical: "/contact-us",
    },
};

export default function ContactUsPage() {
    return <Contact />;
}
