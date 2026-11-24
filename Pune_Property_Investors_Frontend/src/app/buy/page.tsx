import type { Metadata } from "next";
import { Suspense } from "react";
import BuyProperties from "../../components/pages/BuyProperties";

export const metadata: Metadata = {
    title: "Buy Verified Properties in Pune | 1, 2, 3 & 4 BHK Flats & Villas",
    description:
        "Browse top RERA-registered residential apartments, luxury penthouses, and gated community villas for sale in Pune across Kharadi, Baner, Wakad, and Hinjewadi.",
    keywords: [
        "buy flat in Pune",
        "buy 2 BHK in Pune",
        "3 BHK luxury apartment Pune",
        "ready to move flats Pune",
        "under construction projects Pune",
        "real estate buy Pune",
        "Pune property listings",
        "flats for sale Kharadi",
        "apartments for sale Baner"
    ],
    alternates: {
        canonical: "/buy",
    },
    openGraph: {
        title: "Buy Verified Properties in Pune | Flats & Villas for Sale",
        description: "Browse verified 1, 2, 3 & 4 BHK flats, luxury villas, and penthouses in Pune with 0% brokerage.",
        url: "https://punepropertyinvestor.com/buy",
        siteName: "Pune Property Investors",
        type: "website",
    },
};

export default function BuyPage() {
    return (
        <Suspense fallback={<div className="page-loading-fallback">Loading properties...</div>}>
            <BuyProperties />
        </Suspense>
    );
}
