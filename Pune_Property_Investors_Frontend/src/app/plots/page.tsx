import type { Metadata } from "next";
import { Suspense } from "react";
import BuyProperties from "../../components/pages/BuyProperties";

export const metadata: Metadata = {
    title: "Plots & Land in Pune | NA Residential Plots & Gated Communities",
    description:
        "Explore clear-title residential plots, gated community layouts, and NA land opportunities in growing Pune corridors.",
    alternates: {
        canonical: "/plots",
    },
};

export default function PlotsPage() {
    return (
        <Suspense
            fallback={
                <div className="page-loading-fallback">Loading plots and land...</div>
            }
        >
            <BuyProperties
                defaultPropertyType="Plot"
                pageTitle="Plots & Land in Pune"
            />
        </Suspense>
    );
}
