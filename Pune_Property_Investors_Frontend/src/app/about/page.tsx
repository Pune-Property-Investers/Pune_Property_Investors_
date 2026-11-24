import type { Metadata } from "next";
import AboutPage from "../../components/pages/About";

export const metadata: Metadata = {
    title: "About Us | Leading Real Estate Advisory in Pune - Pune Property Investors",
    description:
        "Learn about Pune Property Investors (PPI Infra), our zero-brokerage advisory model, verified property curation, and client-first real estate team.",
    keywords: [
        "about PPI Infra",
        "Pune Property Investors team",
        "trusted real estate consultant Pune",
        "property advisors Pune",
        "zero brokerage consultant Pune",
        "MahaRERA registered consultant"
    ],
    alternates: {
        canonical: "/about",
    },
    openGraph: {
        title: "About Us | Pune Property Investors",
        description: "Pune's trusted real estate advisory platform with verified properties and zero brokerage.",
        url: "https://punepropertyinvestor.com/about",
        siteName: "Pune Property Investors",
        type: "website",
    },
};

export default function About() {
    return <AboutPage />;
}
