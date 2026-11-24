import type { Metadata } from "next";
import { Suspense } from "react";
import BuyProperties from "../../components/pages/BuyProperties";

export const metadata: Metadata = {
    title: "Complete Property Catalogue in Pune | Verified Real Estate Listings",
    description:
        "Explore premium homes, flats, apartments, and plots across Pune with verified titles, floor plans, and expert advisory.",
    keywords: [
        "properties in Pune",
        "Pune real estate listings",
        "verified flats Pune",
        "buy residential property Pune",
        "flats Kharadi",
        "apartments Baner",
        "homes Wakad",
        "plots Hinjewadi"
    ],
    alternates: {
        canonical: "/properties",
    },
    openGraph: {
        title: "Complete Property Catalogue in Pune | Pune Property Investors",
        description: "Verified property listings with real-time pricing and zero brokerage advisory.",
        url: "https://punepropertyinvestor.com/properties",
        siteName: "Pune Property Investors",
        type: "website",
    },
};

export default function PropertiesPage() {
    return (
        <Suspense fallback={<div className="page-loading-fallback">Loading properties...</div>}>
            <BuyProperties />
        </Suspense>
    );
}
