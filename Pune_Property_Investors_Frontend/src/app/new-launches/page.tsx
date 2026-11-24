import type { Metadata } from "next";
import { Suspense } from "react";
import BuyProperties from "../../components/pages/BuyProperties";

export const metadata: Metadata = {
    title: "New Launch Residential Projects in Pune | Early Bird Launch Offers",
    description:
        "Get early-access pricing and zero brokerage on the newest residential project launches by premier developers across East & West Pune.",
    keywords: [
        "new launches Pune",
        "upcoming projects Pune",
        "pre-launch offers real estate Pune",
        "Godrej new launch Pune",
        "Panchshil new projects Pune",
        "new residential launches Kharadi",
        "upcoming flats Hinjewadi",
        "pre-booking real estate Pune"
    ],
    alternates: {
        canonical: "/new-launches",
    },
    openGraph: {
        title: "New Launch Projects in Pune | Early Bird Privileges",
        description: "Zero brokerage access to verified new project launches from Pune's premier builders.",
        url: "https://punepropertyinvestor.com/new-launches",
        siteName: "Pune Property Investors",
        type: "website",
    },
};

export default function NewLaunchesPage() {
    return (
        <Suspense
            fallback={
                <div className="page-loading-fallback">Loading new launches...</div>
            }
        >
            <BuyProperties
                defaultPropertyType="new-launch"
                pageTitle="New Launches in Pune"
            />
        </Suspense>
    );
}
