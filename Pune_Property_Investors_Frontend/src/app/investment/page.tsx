import type { Metadata } from "next";
import PlaceholderPage from "../../components/common/PlaceholderPage";

export const metadata: Metadata = {
    title: "High-Yield Real Estate Investment Opportunities in Pune | PPI Advisory",
    description:
        "Data-backed real estate investments with attractive rental yields and capital appreciation in Pune's fastest growing IT and infrastructure corridors.",
    keywords: [
        "real estate investment Pune",
        "high rental yield properties Pune",
        "Pune property ROI",
        "property investors Pune",
        "commercial pre-leased Pune",
        "wealth creation real estate Pune",
        "capital appreciation Pune real estate"
    ],
    alternates: {
        canonical: "/investment",
    },
    openGraph: {
        title: "High-Yield Property Investments in Pune | PPI Advisory",
        description: "Maximize real estate ROI with expert data-driven property advisory in Pune.",
        url: "https://punepropertyinvestor.com/investment",
        siteName: "Pune Property Investors",
        type: "website",
    },
};

export default function InvestmentPage() {
    return (
        <PlaceholderPage
            title="Property Investment in Pune"
            description="Learn about high-yield rental properties, pre-launch investor pricing, and strategic capital appreciation pockets across Pune."
        />
    );
}
