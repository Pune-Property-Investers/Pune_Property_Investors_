"use client";

import { useEffect, useMemo, useState } from "react";
import { Phone, Mail, Calendar, Pencil, Trash2, MessageSquare } from "lucide-react";
import { leadService } from "../../../services/lead.service";
import { useToast } from "../../../context/ToastContext";
import DataTable from "../common/DataTable";
import StatusBadge from "../common/StatusBadge";
import AdminModal from "../common/AdminModal";
import ConfirmModal from "../common/ConfirmModal";

const LEAD_TABS = [
    { key: "all", label: "All Leads" },
    { key: "New", label: "New Enquiries" },
    { key: "contact", label: "Contact Enquiries" },
    { key: "property", label: "Property Enquiries" },
];

const LEAD_STATUSES = [
    "New",
    "Contacted",
    "Site Visit Scheduled",
    "Follow-up",
    "Closed",
];

export default function LeadsManager() {
    const { showToast } = useToast();
    const [leads, setLeads] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("all");
    const [search, setSearch] = useState("");

    const [editingLead, setEditingLead] = useState(null);
    const [saving, setSaving] = useState(false);
    const [deleteTarget, setDeleteTarget] = useState(null);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        async function load() {
            setLoading(true);
            try {
                const list = await leadService.list();
                setLeads(Array.isArray(list) ? list : []);
            } catch (err) {
                showToast(err.message || "Failed to load leads", "error");
            } finally {
                setLoading(false);
            }
        }
        load();
    }, []);

    const filteredLeads = useMemo(() => {
        return leads.filter((l) => {
            if (activeTab === "New" && l.status !== "New") return false;
            if (activeTab === "contact" && l.type !== "contact") return false;
            if (activeTab === "property" && l.type !== "property") return false;
            if (search.trim()) {
                const q = search.toLowerCase();
                const hay = [l.name, l.phone, l.email, l.propertyTitle, l.locality, l.message]
                    .filter(Boolean)
                    .join(" ")
                    .toLowerCase();
                if (!hay.includes(q)) return false;
            }
            return true;
        });
    }, [leads, activeTab, search]);

    const handleQuickStatusChange = async (id, nextStatus) => {
        try {
            const updated = await leadService.update(id, { status: nextStatus });
            setLeads((prev) => prev.map((l) => (String(l.id) === String(id) ? updated : l)));
            showToast(`Lead marked as ${nextStatus}`, "success");
        } catch (err) {
            showToast(err.message || "Failed to update lead status", "error");
        }
    };

    const handleSaveModal = async (e) => {
        e?.preventDefault();
        if (!editingLead) return;
        setSaving(true);
        try {
            const updated = await leadService.update(editingLead.id, {
                status: editingLead.status,
                followUpDate: editingLead.followUpDate,
                notes: editingLead.notes,
            });
            setLeads((prev) => prev.map((l) => (String(l.id) === String(editingLead.id) ? updated : l)));
            showToast("Lead follow-up updated", "success");
            setEditingLead(null);
        } catch (err) {
            showToast(err.message || "Failed to save lead", "error");
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async () => {
        if (!deleteTarget) return;
        setDeleting(true);
        try {
            await leadService.remove(deleteTarget.id);
            setLeads((prev) => prev.filter((l) => String(l.id) !== String(deleteTarget.id)));
            showToast("Lead deleted", "success");
            setDeleteTarget(null);
        } catch (err) {
            showToast(err.message || "Failed to delete lead", "error");
        } finally {
            setDeleting(false);
        }
    };

    const columns = [
        {
            key: "name",
            label: "Lead / Client",
            render: (row) => (
                <div>
                    <div style={{ fontWeight: 600, color: "#0f172a" }}>{row.name}</div>
                    <div style={{ fontSize: 12, color: "#64748b", display: "flex", gap: 10, marginTop: 2 }}>
                        <span style={{ display: "inline-flex", alignItems: "center", gap: 3 }}>
                            <Phone size={11} /> {row.phone}
                        </span>
                        {row.email && (
                            <span style={{ display: "inline-flex", alignItems: "center", gap: 3 }}>
                                <Mail size={11} /> {row.email}
                            </span>
                        )}
                    </div>
                </div>
            ),
        },
        {
            key: "interest",
            label: "Enquiry Interest",
            render: (row) => (
                <div>
                    <div style={{ fontWeight: 500, color: "#0f172a" }}>
                        {row.propertyTitle || "General Advisory"}
                    </div>
                    <div style={{ fontSize: 12, color: "#64748b" }}>
                        {row.locality || "Pune"} {row.budget ? `• ${row.budget}` : ""}
                    </div>
                </div>
            ),
        },
        {
            key: "followUp",
            label: "Follow-up",
            render: (row) => (
                <div style={{ fontSize: 12.5 }}>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: 4, fontWeight: 600, color: "#334155" }}>
                        <Calendar size={12} /> {row.followUpDate || "Not scheduled"}
                    </div>
                    {row.notes && (
                        <div style={{ fontSize: 11.5, color: "#64748b", maxWidth: 220, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                            {row.notes}
                        </div>
                    )}
                </div>
            ),
        },
        {
            key: "status",
            label: "Pipeline Stage",
            render: (row) => (
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <StatusBadge status={row.status || "New"} />
                    <select
                        className="admin-select"
                        style={{ padding: "4px 8px", fontSize: 12, width: "auto" }}
                        value={row.status || "New"}
                        onChange={(e) => handleQuickStatusChange(row.id, e.target.value)}
                    >
                        {LEAD_STATUSES.map((st) => (
                            <option key={st} value={st}>
                                {st}
                            </option>
                        ))}
                    </select>
                </div>
            ),
        },
        {
            key: "actions",
            label: "Actions",
            render: (row) => (
                <div style={{ display: "flex", gap: 6 }}>
                    <button
                        type="button"
                        className="admin-btn admin-btn--outline admin-btn--sm"
                        onClick={() => setEditingLead({ ...row })}
                        title="Edit Notes & Follow-up"
                    >
                        <Pencil size={13} /> Follow-up
                    </button>
                    <button
                        type="button"
                        className="admin-btn admin-btn--danger admin-btn--sm"
                        onClick={() => setDeleteTarget(row)}
                    >
                        <Trash2 size={13} />
                    </button>
                </div>
            ),
        },
    ];

    return (
        <div>
            <div className="admin-page-header">
                <div>
                    <h1 className="admin-page-title">CRM &amp; Lead Management</h1>
                    <p className="admin-page-subtitle">
                        Track property enquiries, general contact requests, site visit schedules, and advisor follow-up notes.
                    </p>
                </div>
            </div>

            <div className="admin-tabs">
                {LEAD_TABS.map((tab) => (
                    <button
                        key={tab.key}
                        type="button"
                        className={`admin-tab ${activeTab === tab.key ? "admin-tab--active" : ""}`}
                        onClick={() => setActiveTab(tab.key)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            <DataTable
                columns={columns}
                rows={filteredLeads}
                loading={loading}
                searchValue={search}
                onSearchChange={setSearch}
                searchPlaceholder="Search leads by name, phone, property, or locality..."
                emptyTitle="No leads matching this filter"
                emptyDescription="New website enquiries will appear here automatically."
            />

            <AdminModal
                open={Boolean(editingLead)}
                onClose={() => setEditingLead(null)}
                title={editingLead ? `Lead Follow-up: ${editingLead.name}` : "Lead Follow-up"}
                footer={
                    <>
                        <button type="button" className="admin-btn admin-btn--outline" onClick={() => setEditingLead(null)}>
                            Cancel
                        </button>
                        <button type="button" className="admin-btn admin-btn--gold" onClick={handleSaveModal} disabled={saving}>
                            {saving ? "Saving..." : "Save Follow-up"}
                        </button>
                    </>
                }
            >
                {editingLead && (
                    <form onSubmit={handleSaveModal}>
                        <div style={{ padding: 14, borderRadius: 10, background: "#f8fafc", border: "1px solid #e2e8f0", marginBottom: 16 }}>
                            <div style={{ fontWeight: 700, marginBottom: 4 }}>{editingLead.propertyTitle || "General Enquiry"}</div>
                            <div style={{ fontSize: 13, color: "#475569", display: "flex", gap: 6, alignItems: "flex-start" }}>
                                <MessageSquare size={14} style={{ flexShrink: 0, marginTop: 2 }} />
                                <span>{editingLead.message || "No message provided."}</span>
                            </div>
                        </div>

                        <div className="admin-form-grid">
                            <div className="admin-field">
                                <label className="admin-label">Pipeline Status</label>
                                <select
                                    className="admin-select"
                                    value={editingLead.status || "New"}
                                    onChange={(e) => setEditingLead((p) => ({ ...p, status: e.target.value }))}
                                >
                                    {LEAD_STATUSES.map((st) => (
                                        <option key={st} value={st}>
                                            {st}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="admin-field">
                                <label className="admin-label">Next Follow-up Date</label>
                                <input
                                    type="date"
                                    className="admin-input"
                                    value={editingLead.followUpDate || ""}
                                    onChange={(e) => setEditingLead((p) => ({ ...p, followUpDate: e.target.value }))}
                                />
                            </div>
                        </div>

                        <div className="admin-field">
                            <label className="admin-label">Advisor Notes</label>
                            <textarea
                                className="admin-textarea"
                                value={editingLead.notes || ""}
                                onChange={(e) => setEditingLead((p) => ({ ...p, notes: e.target.value }))}
                                placeholder="Record site visit feedback, preferred floor/facing, or loan discussion..."
                            />
                        </div>
                    </form>
                )}
            </AdminModal>

            <ConfirmModal
                open={Boolean(deleteTarget)}
                onClose={() => setDeleteTarget(null)}
                onConfirm={handleDelete}
                loading={deleting}
                title="Delete Lead"
                message={`Remove enquiry from "${deleteTarget?.name}"?`}
                confirmText="Delete Lead"
                confirmTone="danger"
            />
        </div>
    );
}

