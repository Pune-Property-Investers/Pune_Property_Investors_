import type { Metadata } from "next";
import Home from "../components/pages/Home";

export const metadata: Metadata = {
    title: "Pune Property Investors | Verified Luxury Properties & New Launches in Pune",
    description:
        "Explore verified residential apartments, luxury penthouses, commercial IT spaces, and investment plots across prime locations in Pune including Kharadi, Baner, Wakad, and Hinjewadi with 0% brokerage.",
    keywords: [
        "Pune Real Estate",
        "Properties in Pune",
        "Buy Flat in Pune",
        "Kharadi Properties",
        "Baner Luxury Apartments",
        "Wakad Real Estate",
        "Hinjewadi Homes",
        "New Projects in Pune",
        "Pune Property Investors",
        "PPI Infra"
    ],
    alternates: {
        canonical: "/",
    },
    openGraph: {
        title: "Pune Property Investors | Verified Luxury Properties in Pune",
        description: "Zero brokerage property consultancy for premium flats, villas, and commercial real estate in Pune.",
        url: "https://punepropertyinvestor.com",
        siteName: "Pune Property Investors",
        locale: "en_IN",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Pune Property Investors | Verified Real Estate",
        description: "Find verified properties with early bird pricing and zero brokerage across Pune.",
    },
};

export default function HomePage() {
    return <Home />;
}
