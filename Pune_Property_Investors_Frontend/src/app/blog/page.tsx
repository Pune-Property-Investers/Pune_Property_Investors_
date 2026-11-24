import type { Metadata } from "next";
import Blog from "../../components/pages/Blog";

export const metadata: Metadata = {
    title: "Pune Real Estate Blog | Insights, Guides & Trends",
    description:
        "Market insights, neighborhood guides, and home buying tips from Pune real estate experts.",
    alternates: {
        canonical: "/blog",
    },
};

export default function BlogPage() {
    return <Blog />;
}
