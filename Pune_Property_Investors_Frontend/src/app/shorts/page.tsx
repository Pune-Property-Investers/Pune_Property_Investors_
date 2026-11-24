import type { Metadata } from "next";
import Shorts from "../../components/pages/Shorts";

export const metadata: Metadata = {
    title: "Real Estate Video Shorts & Property Walkthroughs | PPI Infra",
    description:
        "Watch fast, cinematic vertical video walkthroughs, sample flat tours, and developer project reviews across Pune.",
    keywords: [
        "property videos Pune",
        "real estate shorts",
        "sample flat tour Pune",
        "YouTube property reels Pune",
        "luxury flat tour Kharadi",
        "virtual site tour Pune"
    ],
    alternates: {
        canonical: "/shorts",
    },
    openGraph: {
        title: "Real Estate Video Shorts & Property Walkthroughs | Pune Property Investors",
        description: "Watch cinematic walkthroughs and sample flat tours across top Pune localities.",
        url: "https://punepropertyinvestor.com/shorts",
        siteName: "Pune Property Investors",
        type: "video.other",
    },
};

export default function ShortsPage() {
    return <Shorts />;
}
