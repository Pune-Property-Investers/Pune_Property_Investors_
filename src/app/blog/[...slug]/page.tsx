import type { Metadata } from "next";
import PlaceholderPage from "../../../components/common/PlaceholderPage";

type PageProps = {
    params: Promise<{ slug: string[] }>;
};

export function generateStaticParams() {
    return [{ slug: ["guide"] }, { slug: ["buying-guide"] }, { slug: ["investment"] }];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const readableTitle = (slug || [])
        .map((s) => s.replace(/-/g, " "))
        .join(" - ")
        .replace(/\b\w/g, (c) => c.toUpperCase());

    return {
        title: `${readableTitle || "Real Estate Guide"} | Pune Property Investors Blog`,
        description: "Read real estate tips, property investment guides, and Pune neighborhood updates.",
    };
}

export default async function BlogPostPage({ params }: PageProps) {
    const { slug } = await params;
    const readableTitle = (slug || [])
        .map((s) => s.replace(/-/g, " "))
        .join(" - ")
        .replace(/\b\w/g, (c) => c.toUpperCase());

    return (
        <PlaceholderPage
            title={readableTitle || "Pune Real Estate Blog"}
            description="Market insights, neighborhood guides, and home buying tips from Pune real estate experts."
        />
    );
}

