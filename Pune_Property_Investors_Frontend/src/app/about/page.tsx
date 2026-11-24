import type { Metadata } from "next";
import AboutPage from "../../components/pages/About";

export const metadata: Metadata = {
    title: "About Us | Pune Property Investors",
    description:
        "Learn about Pune Property Investors — your trusted real estate advisory partner helping homebuyers and investors make informed property decisions in Pune.",
    alternates: {
        canonical: "/about",
    },
};

export default function About() {
    return <AboutPage />;
}
