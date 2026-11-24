import type { Metadata } from "next";
import PlaceholderPage from "../../components/common/PlaceholderPage";

export const metadata: Metadata = {
    title: "Terms & Conditions | Pune Property Investors",
    description:
        "Review the terms and conditions governing the real estate advisory services and content provided by Pune Property Investor.",
    keywords: [
        "terms and conditions",
        "MahaRERA compliance",
        "real estate terms Pune",
        "advisory disclaimer"
    ],
    robots: {
        index: false,
        follow: true,
    },
    alternates: {
        canonical: "/terms-and-conditions",
    },
};

export default function TermsPage() {
    return (
        <PlaceholderPage
            title="Terms & Conditions"
            description="Review the terms and conditions governing the advisory services and content provided by Pune Property Investor."
        />
    );
}
