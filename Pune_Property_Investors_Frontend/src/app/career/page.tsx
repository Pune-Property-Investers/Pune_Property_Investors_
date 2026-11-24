import type { Metadata } from "next";
import Career from "../../components/pages/Career";

export const metadata: Metadata = {
    title: "Careers | Pune Property Investors",
    description:
        "Explore exciting career opportunities in real estate consulting, client relations, and digital property marketing at Pune Property Investor.",
    alternates: {
        canonical: "/career",
    },
};

export default function CareerPage() {
    return <Career />;
}
