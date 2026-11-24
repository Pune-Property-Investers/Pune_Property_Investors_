import type { Metadata } from "next";
import Blog from "../../components/pages/Blog";

export const metadata: Metadata = {
    title: "Pune Real Estate Blog & Market Insights | Trends, Rates & Guides",
    description:
        "Stay informed with the latest Pune property market trends, locality price appreciation reports, infrastructure updates, and homebuyer legal guides.",
    keywords: [
        "Pune real estate news",
        "property rates Pune",
        "locality guides Pune",
        "real estate investment tips Pune",
        "home buying guide Pune",
        "MahaRERA updates"
    ],
    alternates: {
        canonical: "/blog",
    },
    openGraph: {
        title: "Pune Real Estate Blog & Market Insights | PPI Infra",
        description: "Market reports, infrastructure analyses, and investment guides from Pune property experts.",
        url: "https://punepropertyinvestor.com/blog",
        siteName: "Pune Property Investors",
        type: "article",
    },
};

export default function BlogPage() {
    return <Blog />;
}
