import type { Metadata } from "next";
import PlaceholderPage from "../../../components/common/PlaceholderPage";

type PageProps = {
    params: Promise<{ slug: string[] }>;
};

export function generateStaticParams() {
    return [{ slug: ["updates"] }, { slug: ["market-updates"] }];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const readableTitle = (slug || [])
        .map((s) => s.replace(/-/g, " "))
        .join(" - ")
        .replace(/\b\w/g, (c) => c.toUpperCase());

    return {
        title: `${readableTitle || "Property News"} | Pune Property News`,
        description: "Stay updated on Pune infrastructure developments, Metro Line expansions, and local real estate policy updates.",
    };
}

export default async function NewsArticlePage({ params }: PageProps) {
    const { slug } = await params;
    const readableTitle = (slug || [])
        .map((s) => s.replace(/-/g, " "))
        .join(" - ")
        .replace(/\b\w/g, (c) => c.toUpperCase());

    return (
        <PlaceholderPage
            title={readableTitle || "Pune Property News"}
            description="Stay updated on Pune infrastructure developments, Metro Line expansions, and local real estate policy updates."
        />
    );
}

