import type { Metadata } from "next";
import NewLaunches from "../../components/pages/NewLaunches";

export const metadata: Metadata = {
    title: "Featured Properties & New Launches in Pune | Pune Property Investors",
    description:
        "Explore premium new launched projects in Pune across Kharadi, Hinjewadi, Hadapsar, Baner, Wakad & Kalyani Nagar. Exclusive developer allotments, pre-launch pricing privileges, and 0% brokerage.",
    alternates: {
        canonical: "/new-launches",
    },
    openGraph: {
        title: "Featured Properties & New Launches • Pune Property Investors",
        description:
            "Curated new launched projects, botanical suites, and luxury sky condos in Pune. Interactive showcase with pre-launch price freezes.",
        type: "website",
    },
};

export default function NewLaunchesPage() {
    return <NewLaunches />;
}

