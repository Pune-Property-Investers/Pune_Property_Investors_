import type { Metadata } from "next";
import { Suspense } from "react";
import BuyProperties from "../../components/pages/BuyProperties";

export const metadata: Metadata = {
    title: "Commercial Properties in Pune | Office Spaces & Showrooms",
    description:
        "Explore Grade-A commercial office spaces, retail showrooms, and IT park developments in Kharadi, Hinjewadi, and Baner.",
    alternates: {
        canonical: "/commercial",
    },
};

export default function CommercialPage() {
    return (
        <Suspense
            fallback={
                <div className="page-loading-fallback">Loading commercial properties...</div>
            }
        >
            <BuyProperties
                defaultPropertyType="Commercial"
                pageTitle="Commercial Properties in Pune"
            />
        </Suspense>
    );
}
