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
        "PPI Infra office Kharadi",
        "Pune property advisor WhatsApp"
    ],
    alternates: {
        canonical: "/contact",
    },
    openGraph: {
        title: "Contact Pune Property Investors | Real Estate Advisory",
        description: "Schedule a VIP site visit or speak with our property advisors today.",
        url: "https://punepropertyinvestor.com/contact",
        siteName: "Pune Property Investors",
        type: "website",
    },
};

export default function ContactPage() {
    return <Contact />;
}
