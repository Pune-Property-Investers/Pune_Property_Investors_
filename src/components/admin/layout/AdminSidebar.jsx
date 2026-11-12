"use client";

import { useEffect, useState } from "react";
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
    Sparkles,
    Image as ImageIcon,
    Briefcase,
    Settings,
    ChevronLeft,
    ChevronRight,
    ChevronDown,
    X,
} from "lucide-react";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export const HOME_COMPONENT_ITEMS = [
    { id: "hero", label: "1. Hero Banner & Search" },
    { id: "trust-highlights", label: "2. Trust Highlights" },
    { id: "featured-properties", label: "3. Projects Video Tours" },
    { id: "new-launches", label: "4. New Launch Carousel" },
    { id: "browse-locations", label: "5. Browse by Location" },
    { id: "featured-projects", label: "6. Featured Projects" },
    { id: "upcoming-projects", label: "7. Upcoming Pre-Launch" },
    { id: "featured-prop", label: "8. Luxury Spotlight" },
    { id: "advertisements", label: "9. Sidebar Ads" },
    { id: "workflow", label: "10. 7-Step Workflow" },
    { id: "developer-logos", label: "11. Developer Logos" },
    { id: "testimonials", label: "12. Testimonials" },
    { id: "home-contact", label: "13. Contact & Advisory" },
    { id: "trust-stats", label: "14. Trust Numbers" },
];

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
            { label: "Festival Popup", href: "/admin/festival-popup", icon: Sparkles },
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
    const normalizedPath = pathname.replace(/\/+$/, "") || "/admin";
    const isHomepageRoute =
        normalizedPath === "/admin/homepage" || normalizedPath.startsWith("/admin/homepage/");
    const [homeMenuOpen, setHomeMenuOpen] = useState(isHomepageRoute);

    useEffect(() => {
        if (isHomepageRoute) setHomeMenuOpen(true);
    }, [isHomepageRoute]);

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

                                if (item.href === "/admin/homepage") {
                                    return (
                                        <div key={item.href}>
                                            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                                                <Link
                                                    href={item.href}
                                                    onClick={onCloseMobile}
                                                    className={`admin-sidebar__link ${
                                                        active ? "admin-sidebar__link--active" : ""
                                                    }`}
                                                    style={{ flex: 1, minWidth: 0 }}
                                                    title={collapsed ? item.label : undefined}
                                                >
                                                    <Icon size={17} className="admin-sidebar__icon" />
                                                    {!collapsed && <span>{item.label}</span>}
                                                </Link>
                                                {!collapsed && (
                                                    <button
                                                        type="button"
                                                        onClick={() => setHomeMenuOpen((o) => !o)}
                                                        aria-label="Toggle Home Page Components"
                                                        title="Scroll Home Page Components"
                                                        style={{
                                                            background: homeMenuOpen ? "#f1f5f9" : "transparent",
                                                            border: "1px solid #e2e8f0",
                                                            borderRadius: 8,
                                                            color: "#475569",
                                                            cursor: "pointer",
                                                            width: 30,
                                                            height: 30,
                                                            flexShrink: 0,
                                                            display: "inline-flex",
                                                            alignItems: "center",
                                                            justifyContent: "center",
                                                        }}
                                                    >
                                                        {homeMenuOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                                                    </button>
                                                )}
                                            </div>
                                            {!collapsed && homeMenuOpen && (
                                                <div
                                                    style={{
                                                        marginLeft: 14,
                                                        marginTop: 6,
                                                        marginBottom: 8,
                                                        paddingLeft: 10,
                                                        paddingRight: 4,
                                                        borderLeft: "2px solid #e2e8f0",
                                                        maxHeight: 320,
                                                        overflowY: "auto",
                                                        display: "flex",
                                                        flexDirection: "column",
                                                        gap: 3,
                                                    }}
                                                >
                                                    {HOME_COMPONENT_ITEMS.map((sub) => {
                                                        const subHref = `/admin/homepage/${sub.id}`;
                                                        const isSubActive = normalizedPath === subHref;
                                                        return (
                                                            <Link
                                                                key={sub.id}
                                                                href={subHref}
                                                                onClick={onCloseMobile}
                                                                style={{
                                                                    display: "block",
                                                                    flexShrink: 0,
                                                                    fontFamily: "inherit",
                                                                    fontSize: 12.5,
                                                                    lineHeight: 1.45,
                                                                    padding: "6px 10px",
                                                                    borderRadius: 7,
                                                                    textDecoration: "none",
                                                                    color: isSubActive ? "#1d4ed8" : "#475569",
                                                                    background: isSubActive ? "#eff6ff" : "transparent",
                                                                    border: isSubActive ? "1px solid #bfdbfe" : "1px solid transparent",
                                                                    fontWeight: isSubActive ? 600 : 500,
                                                                    whiteSpace: "nowrap",
                                                                    overflow: "hidden",
                                                                    textOverflow: "ellipsis",
                                                                }}
                                                            >
                                                                {sub.label}
                                                            </Link>
                                                        );
                                                    })}
                                                </div>
                                            )}
                                        </div>
                                    );
                                }

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

