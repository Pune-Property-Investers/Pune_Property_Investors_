import type { Metadata } from "next";
import { Suspense } from "react";
import BuyProperties from "../../components/pages/BuyProperties";

export const metadata: Metadata = {
    title: "New Launches in Pune | Exclusive Pre-Launch Projects",
    description:
        "Explore premium new launched projects in Pune across Kharadi, Hinjewadi, Hadapsar, Baner, Wakad & Kalyani Nagar. Exclusive developer allotments, pre-launch pricing privileges, and 0% brokerage.",
    alternates: {
        canonical: "/new-launches",
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
