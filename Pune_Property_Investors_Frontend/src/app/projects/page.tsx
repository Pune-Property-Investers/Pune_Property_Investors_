import type { Metadata } from "next";
import { Suspense } from "react";
import BuyProperties from "../../components/pages/BuyProperties";

export const metadata: Metadata = {
    title: "Top Real Estate Projects in Pune | Premier Developers Showcase",
    description:
        "Explore flagship residential and commercial master townships by Pune's most reputed builders: Godrej, Panchshil, Lodha, Kolte Patil, and more.",
    keywords: [
        "Pune builders",
        "top projects Pune",
        "Godrej Properties Pune",
        "Panchshil Realty projects",
        "luxury township Pune",
        "Lodha projects Pune",
        "Kolte Patil Pune",
        "RERA registered projects Pune"
    ],
    alternates: {
        canonical: "/projects",
    },
    openGraph: {
        title: "Top Real Estate Projects in Pune | Premier Builders",
        description: "Flagship residential & commercial projects across Pune from verified developers.",
        url: "https://punepropertyinvestor.com/projects",
        siteName: "Pune Property Investors",
        type: "website",
    },
};

export default function ProjectsPage() {
    return (
        <Suspense
            fallback={
                <div className="page-loading-fallback">Loading projects...</div>
            }
        >
            <BuyProperties pageTitle="New Projects in Pune" />
        </Suspense>
    );
}
