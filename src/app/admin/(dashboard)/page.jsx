"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
    Building2,
    FolderKanban,
    Users,
    FileText,
    LayoutTemplate,
    Plus,
    ArrowUpRight,
    Clock,
} from "lucide-react";
import StatCard from "../../../components/admin/common/StatCard";
import StatusBadge from "../../../components/admin/common/StatusBadge";
import { contentService } from "../../../services/content.service";

export default function AdminDashboardPage() {
    const [overview, setOverview] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let mounted = true;
        contentService
            .getDashboardOverview()
            .then((data) => {
                if (mounted) setOverview(data);
            })
            .finally(() => {
                if (mounted) setLoading(false);
            });
        return () => {
            mounted = false;
        };
    }, []);

    const stats = overview?.stats || {};

    return (
        <div>
            <div className="admin-page-header">
                <div>
                    <h1 className="admin-page-title">Dashboard Overview</h1>
                    <p className="admin-page-subtitle">
                        Monitor Pune Property Investors inventory, incoming leads, and live website content.
                    </p>
                </div>

                <div className="admin-page-actions">
                    <Link href="/admin/homepage" className="admin-btn admin-btn--gold">
                        <LayoutTemplate size={15} />
                        <span>Visual Homepage Editor</span>
                    </Link>
                    <Link href="/admin/properties" className="admin-btn admin-btn--primary">
                        <Plus size={15} />
                        <span>Add Property</span>
                    </Link>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="admin-kpi-grid">
                <StatCard
                    label="Active Properties"
                    value={loading ? "—" : stats.totalProperties ?? 0}
                    meta={`${stats.totalLocations ?? 0} Pune Localities`}
                    icon={Building2}
                />
                <StatCard
                    label="Landmark Projects"
                    value={loading ? "—" : stats.totalProjects ?? 0}
                    meta={`${stats.totalDevelopers ?? 0} Partner Builders`}
                    icon={FolderKanban}
                />
                <StatCard
                    label="New Enquiries"
                    value={loading ? "—" : stats.newLeads ?? 0}
                    meta={`${stats.totalLeads ?? 0} Total CRM Leads`}
                    icon={Users}
                />
                <StatCard
                    label="Published Content"
                    value={loading ? "—" : stats.publishedArticles ?? 0}
                    meta={`${stats.openJobs ?? 0} Open Career Roles`}
                    icon={FileText}
                />
            </div>

            {/* Main Dashboard Grid */}
            <div className="admin-dashboard-grid">
                {/* Recent Enquiries */}
                <div className="admin-card">
                    <div className="admin-card__header">
                        <h2 className="admin-card__title">Recent Enquiries</h2>
                        <Link
                            href="/admin/leads"
                            className="admin-btn admin-btn--outline admin-btn--sm"
                        >
                            <span>View All Leads</span>
                            <ArrowUpRight size={13} />
                        </Link>
                    </div>
                    <div className="admin-table-wrap">
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>Lead</th>
                                    <th>Interest</th>
                                    <th>Status</th>
                                    <th>Follow-up</th>
                                </tr>
                            </thead>
                            <tbody>
                                {(overview?.recentLeads || []).map((lead) => (
                                    <tr key={lead.id}>
                                        <td>
                                            <div style={{ fontWeight: 600 }}>{lead.name}</div>
                                            <div style={{ fontSize: 12, color: "#64748b" }}>{lead.phone}</div>
                                        </td>
                                        <td>
                                            <div style={{ fontSize: 13 }}>{lead.propertyTitle}</div>
                                            <div style={{ fontSize: 11.5, color: "#64748b" }}>
                                                {lead.locality} • {lead.budget}
                                            </div>
                                        </td>
                                        <td>
                                            <StatusBadge status={lead.status} />
                                        </td>
                                        <td style={{ fontSize: 12.5, color: "#475569" }}>
                                            {lead.followUpDate || "—"}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Recent Activities */}
                <div className="admin-card">
                    <div className="admin-card__header">
                        <h2 className="admin-card__title">Recent Activities</h2>
                    </div>
                    <div className="admin-card__body" style={{ padding: "10px 20px" }}>
                        {(overview?.activities || []).map((act) => (
                            <div
                                key={act.id}
                                style={{
                                    display: "flex",
                                    alignItems: "flex-start",
                                    gap: 10,
                                    padding: "10px 0",
                                    borderBottom: "1px solid #f1f5f9",
                                }}
                            >
                                <div
                                    style={{
                                        width: 28,
                                        height: 28,
                                        borderRadius: 8,
                                        background: "#f1f5f9",
                                        color: "#475569",
                                        display: "grid",
                                        placeItems: "center",
                                        flexShrink: 0,
                                    }}
                                >
                                    <Clock size={14} />
                                </div>
                                <div style={{ minWidth: 0, flex: 1 }}>
                                    <div style={{ fontSize: 13, fontWeight: 500, color: "#0f172a" }}>
                                        {act.action}
                                    </div>
                                    <div style={{ fontSize: 11.5, color: "#64748b", marginTop: 2 }}>
                                        {act.actor} • {act.time}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Recently Added Properties */}
            <div className="admin-card" style={{ marginTop: 20 }}>
                <div className="admin-card__header">
                    <h2 className="admin-card__title">Recently Added Properties</h2>
                    <Link
                        href="/admin/properties"
                        className="admin-btn admin-btn--outline admin-btn--sm"
                    >
                        <span>Manage Inventory</span>
                        <ArrowUpRight size={13} />
                    </Link>
                </div>
                <div className="admin-table-wrap">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Property</th>
                                <th>Location</th>
                                <th>Type</th>
                                <th>Price</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {(overview?.recentProperties || []).map((prop) => (
                                <tr key={prop.id}>
                                    <td>
                                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                            <img
                                                src={prop.image}
                                                alt={prop.title}
                                                className="admin-thumb"
                                            />
                                            <div>
                                                <div style={{ fontWeight: 600 }}>{prop.title}</div>
                                                <div style={{ fontSize: 12, color: "#64748b" }}>
                                                    {prop.projectName}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{prop.location}</td>
                                    <td>{prop.propertyType}</td>
                                    <td style={{ fontWeight: 600 }}>{prop.priceLabel || prop.price}</td>
                                    <td>
                                        <StatusBadge status={prop.publicationStatus || "Published"} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

