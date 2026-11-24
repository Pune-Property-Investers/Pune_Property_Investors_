import type { Metadata } from "next";
import Shorts from "../../components/pages/Shorts";

export const metadata: Metadata = {
    title: "Property Shorts & Video Tours | Pune Property Investors",
    description:
        "Watch trending vertical property tours and real estate shorts across Pune. Experience luxury apartments, villas, and sample flat walkthroughs.",
    alternates: {
        canonical: "/shorts",
    },
};

export default function ShortsPage() {
    return <Shorts />;
}

