import type { Metadata } from "next";
import Home from "../components/pages/Home";

export const metadata: Metadata = {
    title: "Pune Property Investors | Find Verified Real Estate in Pune",
    description:
        "Explore residential flats, luxury apartments, and new projects for sale across Pune's top localities with Pune Property Investors.",
    alternates: {
        canonical: "/",
    },
};

export default function HomePage() {
    return <Home />;
}
