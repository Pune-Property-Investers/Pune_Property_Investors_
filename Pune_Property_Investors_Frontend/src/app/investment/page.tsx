import type { Metadata } from "next";
import PlaceholderPage from "../../components/common/PlaceholderPage";

export const metadata: Metadata = {
    title: "Property Investment in Pune | High Yield Real Estate",
    description:
        "Learn about high-yield rental properties, pre-launch investor pricing, and strategic capital appreciation pockets across Pune.",
    alternates: {
        canonical: "/investment",
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

