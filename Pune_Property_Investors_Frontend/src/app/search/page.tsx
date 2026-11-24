import type { Metadata } from "next";
import { Suspense } from "react";
import BuyProperties from "../../components/pages/BuyProperties";

export const metadata: Metadata = {
    title: "Search Properties & Projects in Pune | Pune Property Investors",
    description:
        "Find your ideal home or investment in Pune using intelligent real estate search by locality, budget, configuration, and possession timeline.",
    keywords: [
        "search properties Pune",
        "property finder Pune",
        "find flat in Pune",
        "Pune real estate search",
        "properties by budget Pune",
        "properties by locality Pune"
    ],
    alternates: {
        canonical: "/search",
    },
    openGraph: {
        title: "Search Properties & Projects in Pune | Pune Property Investors",
        description: "Filter and find verified Pune homes, flats, and plots matching your exact budget.",
        url: "https://punepropertyinvestor.com/search",
        siteName: "Pune Property Investors",
        type: "website",
    },
};

export default function SearchPage() {
    return (
        <Suspense fallback={<div className="page-loading-fallback">Loading search results...</div>}>
            <BuyProperties pageTitle="Search Properties in Pune" />
        </Suspense>
    );
}
