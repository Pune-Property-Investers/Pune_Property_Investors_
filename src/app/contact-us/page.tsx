import type { Metadata } from "next";
import Contact from "../../components/pages/Contact";

export const metadata: Metadata = {
    title: "Contact Us | Pune Property Investors",
    description:
        "Connect with Pune Property Investors for verified residential, commercial, and luxury properties in Pune. Fast-track property consultation within 24 hours.",
    alternates: {
        canonical: "/contact",
    },
};

export default function ContactUsPage() {
    return <Contact />;
}
