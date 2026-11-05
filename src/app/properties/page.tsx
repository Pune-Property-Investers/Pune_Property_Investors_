import type { Metadata } from "next";
import { Suspense } from "react";
import BuyProperties from "../../components/pages/BuyProperties";

export const metadata: Metadata = {
    title: "Properties in Pune | Pune Property Investors",
    description:
        "Explore premium homes, flats, apartments, and plots across Pune with verified titles and expert advisory.",
    alternates: {
        canonical: "/properties",
    },
};

export default function PropertiesPage() {
    return (
        <Suspense fallback={<div className="page-loading-fallback">Loading properties...</div>}>
            <BuyProperties />
        </Suspense>
    );
}
