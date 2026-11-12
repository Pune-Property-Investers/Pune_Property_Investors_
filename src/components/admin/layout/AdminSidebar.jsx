"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Building2,
    FolderKanban,
    BriefcaseBusiness,
    MapPin,
    Users,
    LayoutTemplate,
    FileText,
    Newspaper,
    Film,
    MessageSquareQuote,
    Megaphone,
    Image as ImageIcon,
    Briefcase,
    Settings,
    ChevronLeft,
    ChevronRight,
    X,
} from "lucide-react";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export const SIDEBAR_GROUPS = [
    {
        title: "Dashboard",
        items: [
            { label: "Overview & Stats", href: "/admin", icon: LayoutDashboard, exact: true },
        ],
    },
    {
        title: "Property Management",
        items: [
            { label: "All Properties", href: "/admin/properties", icon: Building2 },
        ],
    },
    {
        title: "Project Management",
        items: [
            { label: "All Projects", href: "/admin/projects", icon: FolderKanban },
        ],
    },
    {
        title: "Developer Management",
        items: [
            { label: "Developers", href: "/admin/developers", icon: BriefcaseBusiness },
        ],
    },
    {
        title: "Location Management",
        items: [
            { label: "Cities & Localities", href: "/admin/locations", icon: MapPin },
        ],
    },
    {
        title: "CRM / Leads",
        items: [
            { label: "Leads & Enquiries", href: "/admin/leads", icon: Users, badgeKey: "newLeads" },
        ],
    },
    {
        title: "Website Content",
        items: [
            { label: "Homepage & About", href: "/admin/homepage", icon: LayoutTemplate },
            { label: "Blogs & Magazine", href: "/admin/articles", icon: FileText },
            { label: "News", href: "/admin/news", icon: Newspaper },
            { label: "Shorts / Videos", href: "/admin/shorts", icon: Film },
            { label: "Testimonials", href: "/admin/testimonials", icon: MessageSquareQuote },
            { label: "Advertisements", href: "/admin/advertisements", icon: Megaphone },
        ],
    },
    {
        title: "Careers",
        items: [
            { label: "Jobs & Resumes", href: "/admin/careers", icon: Briefcase },
        ],
    },
    {
        title: "Media Library",
        items: [
            { label: "Images, Videos & Docs", href: "/admin/media", icon: ImageIcon },
        ],
    },
    {
        title: "Settings",
        items: [
            { label: "Website & SEO Settings", href: "/admin/settings", icon: Settings },
        ],
    },
];

export default function AdminSidebar({
    collapsed,
    onToggleCollapse,
    mobileOpen,
    onCloseMobile,
    badges = {},
}) {
    const pathname = usePathname() || "";

    const isActive = (item) => {
        const normalized = pathname.replace(/\/+$/, "") || "/admin";
        if (item.exact) return normalized === item.href;
        return normalized === item.href || normalized.startsWith(`${item.href}/`);
    };

    return (
        <>
            {mobileOpen && (
                <div
                    className="admin-sidebar-backdrop"
                    onClick={onCloseMobile}
                    aria-hidden="true"
                />
            )}

            <aside
                className={`admin-sidebar ${collapsed ? "admin-sidebar--collapsed" : ""} ${
                    mobileOpen ? "admin-sidebar--mobile-open" : ""
                }`}
                aria-label="Admin Navigation"
            >
                <div className="admin-sidebar__brand">
                    <Link href="/admin" className="admin-sidebar__logo-link" onClick={onCloseMobile}>
                        <img
                            src={`${basePath}/images/logo.png`}
                            alt="PPI Logo"
                            className="admin-sidebar__logo-img"
                        />
                        {!collapsed && (
                            <div className="admin-sidebar__brand-text">
                                <span className="admin-sidebar__brand-title">PPI Admin</span>
                                <span className="admin-sidebar__brand-sub">CRM &amp; Visual CMS</span>
                            </div>
                        )}
                    </Link>

                    <button
                        type="button"
                        className="admin-sidebar__collapse-btn"
                        onClick={mobileOpen ? onCloseMobile : onToggleCollapse}
                        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                        title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                    >
                        {mobileOpen ? (
                            <X size={15} />
                        ) : collapsed ? (
                            <ChevronRight size={15} />
                        ) : (
                            <ChevronLeft size={15} />
                        )}
                    </button>
                </div>

                <nav className="admin-sidebar__nav">
                    {SIDEBAR_GROUPS.map((group) => (
                        <div key={group.title} className="admin-sidebar__group">
                            {!collapsed && (
                                <div className="admin-sidebar__group-title">{group.title}</div>
                            )}
                            {group.items.map((item) => {
                                const Icon = item.icon;
                                const active = isActive(item);
                                const badgeCount = item.badgeKey ? badges[item.badgeKey] : 0;

                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        onClick={onCloseMobile}
                                        className={`admin-sidebar__link ${
                                            active ? "admin-sidebar__link--active" : ""
                                        }`}
                                        title={collapsed ? item.label : undefined}
                                    >
                                        <Icon size={17} className="admin-sidebar__icon" />
                                        {!collapsed && <span>{item.label}</span>}
                                        {!collapsed && badgeCount > 0 && (
                                            <span className="admin-sidebar__badge">{badgeCount}</span>
                                        )}
                                    </Link>
                                );
                            })}
                        </div>
                    ))}
                </nav>
            </aside>
        </>
    );
}

