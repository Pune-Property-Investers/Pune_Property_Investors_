import type { Metadata } from "next";
import { Suspense } from "react";
import BuyProperties from "../../components/pages/BuyProperties";

export const metadata: Metadata = {
    title: "NA Villa Plots & Gated Land for Sale in Pune | Clear Title Land",
    description:
        "Clear title, PMRDA-sanctioned residential NA villa plots in luxury gated communities with clubhouse amenities around Hinjewadi, Wagholi, and Pune.",
    keywords: [
        "plots for sale Pune",
        "villa plots Pune",
        "NA plots Hinjewadi",
        "gated community plots Pune",
        "residential land Pune",
        "PMRDA plots Pune",
        "investment plots Pune",
        "agricultural NA land Pune"
    ],
    alternates: {
        canonical: "/plots",
    },
    openGraph: {
        title: "NA Residential Villa Plots in Pune | Gated Communities",
        description: "Verified clear-title NA plots with lifestyle amenities and high appreciation.",
        url: "https://punepropertyinvestor.com/plots",
        siteName: "Pune Property Investors",
        type: "website",
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
