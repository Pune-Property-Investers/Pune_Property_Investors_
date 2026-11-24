"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";

const LABELS = {
    admin: "Dashboard",
    properties: "Properties",
    projects: "Projects",
    developers: "Developers",
    locations: "Locations",
    leads: "CRM / Leads",
    careers: "Careers",
    articles: "Blogs & Magazine",
    news: "News",
    shorts: "Shorts / Videos",
    testimonials: "Testimonials",
    advertisements: "Advertisements",
    "festival-popup": "Festival Offer Popup",
    media: "Media Library",
    homepage: "Homepage & About Editor",
    settings: "Settings",
};

export default function AdminBreadcrumbs() {
    const pathname = usePathname() || "/admin";
    const segments = pathname.split("/").filter(Boolean);

    return (
        <nav className="admin-breadcrumbs" aria-label="Breadcrumb">
            {segments.map((seg, idx) => {
                const href = `/${segments.slice(0, idx + 1).join("/")}`;
                const isLast = idx === segments.length - 1;
                const label = LABELS[seg] || seg;

                return (
                    <span key={href} style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                        {idx > 0 && <ChevronRight size={13} />}
                        {isLast ? (
                            <span style={{ color: "#0f172a", fontWeight: 600 }}>{label}</span>
                        ) : (
                            <Link href={href}>{label}</Link>
                        )}
                    </span>
                );
            })}
        </nav>
    );
}

