import type { Metadata } from "next";
import { Suspense } from "react";
import BuyProperties from "../../components/pages/BuyProperties";

export const metadata: Metadata = {
    title: "Commercial Properties in Pune | Office Spaces & Showrooms For Sale/Lease",
    description:
        "Explore Grade-A commercial office spaces, retail showrooms, and IT park developments in Kharadi, Hinjewadi, and Baner with high rental yields.",
    keywords: [
        "commercial real estate Pune",
        "office space for sale Pune",
        "IT park lease Kharadi",
        "retail shops Pune",
        "commercial investment Pune",
        "Grade A office Pune",
        "commercial showroom Pune",
        "pre leased commercial property Pune"
    ],
    alternates: {
        canonical: "/commercial",
    },
    openGraph: {
        title: "Commercial Properties in Pune | High Yield Offices & Retail",
        description: "Grade-A IT office units and high-footfall retail spaces in Pune's prime business hubs.",
        url: "https://punepropertyinvestor.com/commercial",
        siteName: "Pune Property Investors",
        type: "website",
    },
};

export default function CommercialPage() {
    return (
        <Suspense
            fallback={
                <div className="page-loading-fallback">Loading commercial properties...</div>
            }
        >
            <BuyProperties
                defaultPropertyType="Commercial"
                pageTitle="Commercial Properties in Pune"
            />
        </Suspense>
    );
}
