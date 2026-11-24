import type { Metadata } from "next";
import PlaceholderPage from "../../components/common/PlaceholderPage";

export const metadata: Metadata = {
    title: "Terms & Conditions | Pune Property Investors",
    description:
        "Review the terms and conditions governing the real estate advisory services and content provided by Pune Property Investor.",
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

