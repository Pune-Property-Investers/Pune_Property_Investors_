import type { Metadata } from "next";
import { Suspense } from "react";
import BuyProperties from "../../components/pages/BuyProperties";

export const metadata: Metadata = {
    title: "Buy Properties in Pune | Apartments, Flats & Plots For Sale",
    description:
        "Browse verified residential properties, flats, apartments, and plots for sale in Pune across Kharadi, Baner, Wakad, Hinjewadi, and more.",
    alternates: {
        canonical: "/buy",
    },
};

export default function BuyPage() {
    return (
        <Suspense fallback={<div className="page-loading-fallback">Loading properties...</div>}>
            <BuyProperties />
        </Suspense>
    );
}
