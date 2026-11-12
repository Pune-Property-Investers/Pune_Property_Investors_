import HomepageEditor from "../../../../../components/admin/content/HomepageEditor";

const HOMEPAGE_SECTION_IDS = [
    "hero",
    "trust-highlights",
    "featured-properties",
    "new-launches",
    "browse-locations",
    "featured-projects",
    "upcoming-projects",
    "featured-prop",
    "advertisements",
    "workflow",
    "developer-logos",
    "testimonials",
    "home-contact",
    "trust-stats",
];

export function generateStaticParams() {
    return HOMEPAGE_SECTION_IDS.map((section) => ({ section }));
}

export default async function AdminHomepageSectionPage({ params }) {
    const resolved = await params;
    const section = resolved?.section || "hero";
    return <HomepageEditor forcedSectionId={section} />;
}

