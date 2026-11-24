import type { Metadata } from "next";
import PlaceholderPage from "../../components/common/PlaceholderPage";

export const metadata: Metadata = {
    title: "Privacy Policy | Pune Property Investors",
    description:
        "Your privacy is important to us. Learn how Pune Property Investors handles and protects client data.",
    alternates: {
        canonical: "/privacy-policy",
    },
};

export default function PrivacyPolicyPage() {
    return (
        <PlaceholderPage
            title="Privacy Policy"
            description="Your privacy is important to us. We handle client data with complete confidentiality and strict security protocols."
        />
    );
}

