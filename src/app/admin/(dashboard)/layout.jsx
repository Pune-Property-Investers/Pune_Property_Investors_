"use client";

import { useState, useEffect } from "react";
import "../../../styles/admin/admin.css";
import AdminGuard from "../../../components/admin/layout/AdminGuard";
import AdminSidebar from "../../../components/admin/layout/AdminSidebar";
import AdminTopbar from "../../../components/admin/layout/AdminTopbar";
import AdminBreadcrumbs from "../../../components/admin/layout/AdminBreadcrumbs";
import { leadService } from "../../../services/lead.service";

export default function AdminDashboardLayout({ children }) {
    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [newLeadsCount, setNewLeadsCount] = useState(0);
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        let mounted = true;
        leadService
            .list()
            .then((leads) => {
                if (!mounted || !Array.isArray(leads)) return;
                const fresh = leads.filter((l) => l.status === "New");
                setNewLeadsCount(fresh.length);
                setNotifications(
                    leads.slice(0, 4).map((l) => ({
                        id: l.id,
                        title: `Enquiry from ${l.name}`,
                        meta: `${l.propertyTitle || l.locality} • ${l.status}`,
                        href: "/admin/leads",
                    }))
                );
            })
            .catch(() => {});

        return () => {
            mounted = false;
        };
    }, []);

    return (
        <AdminGuard>
            <div className="admin-shell">
                <AdminSidebar
                    collapsed={collapsed}
                    onToggleCollapse={() => setCollapsed((c) => !c)}
                    mobileOpen={mobileOpen}
                    onCloseMobile={() => setMobileOpen(false)}
                    badges={{ newLeads: newLeadsCount }}
                />

                <div className={`admin-main ${collapsed ? "admin-main--collapsed" : ""}`}>
                    <AdminTopbar
                        onOpenMobileMenu={() => setMobileOpen(true)}
                        notifications={notifications}
                    />

                    <main className="admin-content">
                        <AdminBreadcrumbs />
                        {children}
                    </main>
                </div>
            </div>
        </AdminGuard>
    );
}

