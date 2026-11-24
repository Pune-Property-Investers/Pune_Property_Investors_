"use client";

import { useEffect, useMemo, useState } from "react";
import {
    Phone,
    Mail,
    Calendar,
    Pencil,
    Trash2,
    MessageSquare,
    Download,
    FileText,
    RotateCcw,
} from "lucide-react";
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

const PROPERTY_CATEGORY_TABS = [
    { key: "all", label: "All Categories" },
    { key: "flats", label: "Flats" },
    { key: "apartments", label: "Apartments" },
    { key: "villas", label: "Villas" },
];

const BHK_OPTIONS = ["1 BHK", "2 BHK", "3 BHK", "4 BHK", "4+ BHK / Penthouse"];

const KNOWN_BUILDERS = [
    "Godrej",
    "Lodha",
    "VTP",
    "Kolte Patil",
    "Kohinoor",
    "Mantra",
    "Shapoorji",
    "Sobha",
    "Panchshil",
    "Nyati",
    "Kasturi",
    "Gera",
];

function extractBuilder(lead) {
    if (lead?.builder) return lead.builder;
    const text = `${lead?.propertyTitle || ""} ${lead?.message || ""}`.toLowerCase();
    const found = KNOWN_BUILDERS.find((b) => text.includes(b.toLowerCase()));
    return found || "";
}

function extractBhk(lead) {
    if (lead?.bhk) return lead.bhk;
    const text = `${lead?.budget || ""} ${lead?.propertyTitle || ""} ${lead?.message || ""} ${lead?.notes || ""}`;
    if (/penthouse|4\+\s*bhk|5\s*bhk/i.test(text)) return "4+ BHK / Penthouse";
    const match = text.match(/\b([1-4])\s*BHK\b/i);
    return match ? `${match[1]} BHK` : "";
}

function extractPropertyCategory(lead) {
    if (lead?.propertyType) return lead.propertyType;
    const text = `${lead?.propertyTitle || ""} ${lead?.message || ""} ${lead?.budget || ""}`.toLowerCase();
    if (/\b(villa|villas|bungalow|townhouse)\b/.test(text)) return "Villas";
    if (/\b(apartment|apartments|suite|suites|condo|condos|residences?)\b/.test(text)) return "Apartments";
    if (/\b(flat|flats|[1-4]\s*bhk)\b/.test(text)) return "Flats";
    return "";
}

function escapeCsvCell(value) {
    const str = String(value ?? "").replace(/\r?\n/g, " ");
    if (/[",]/.test(str)) {
        return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
}

function escapeHtml(value) {
    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}

function triggerFileDownload(blob, filename) {
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

export default function LeadsManager() {
    const { showToast } = useToast();
    const [leads, setLeads] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("all");
    const [categoryTab, setCategoryTab] = useState("all");
    const [locationFilter, setLocationFilter] = useState("all");
    const [bhkFilter, setBhkFilter] = useState("all");
    const [builderFilter, setBuilderFilter] = useState("all");
    const [exportLocation, setExportLocation] = useState("all");
    const [search, setSearch] = useState("");

    const [editingLead, setEditingLead] = useState(null);
    const [saving, setSaving] = useState(false);
    const [deleteTarget, setDeleteTarget] = useState(null);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        async function load(silent = false) {
            if (!silent) setLoading(true);
            try {
                const list = await leadService.list();
                setLeads(Array.isArray(list) ? list : []);
            } catch (err) {
                if (!silent) showToast(err.message || "Failed to load leads", "error");
            } finally {
                if (!silent) setLoading(false);
            }
        }
        load();

        const handleLeadsUpdated = () => load(true);
        const handleStorage = (e) => {
            if (!e.key || e.key === "ppi_admin_cms_v1") {
                load(true);
            }
        };

        window.addEventListener("ppi:leads-updated", handleLeadsUpdated);
        window.addEventListener("storage", handleStorage);
        return () => {
            window.removeEventListener("ppi:leads-updated", handleLeadsUpdated);
            window.removeEventListener("storage", handleStorage);
        };
    }, []);

    const locationOptions = useMemo(() => {
        const set = new Set();
        leads.forEach((l) => {
            if (l.locality?.trim()) set.add(l.locality.trim());
        });
        return Array.from(set).sort((a, b) => a.localeCompare(b));
    }, [leads]);

    const builderOptions = useMemo(() => {
        const set = new Set();
        leads.forEach((l) => {
            const b = extractBuilder(l);
            if (b) set.add(b);
        });
        return Array.from(set).sort((a, b) => a.localeCompare(b));
    }, [leads]);

    const filteredLeads = useMemo(() => {
        return leads.filter((l) => {
            if (activeTab === "New" && l.status !== "New") return false;
            if (activeTab === "contact" && l.type !== "contact") return false;
            if (activeTab === "property" && l.type !== "property") return false;

            if (categoryTab !== "all") {
                const cat = extractPropertyCategory(l).toLowerCase();
                if (cat !== categoryTab) return false;
            }

            if (locationFilter !== "all") {
                if ((l.locality || "").trim().toLowerCase() !== locationFilter.toLowerCase()) {
                    return false;
                }
            }

            if (bhkFilter !== "all") {
                if (extractBhk(l) !== bhkFilter) return false;
            }

            if (builderFilter !== "all") {
                if (extractBuilder(l).toLowerCase() !== builderFilter.toLowerCase()) return false;
            }

            if (search.trim()) {
                const q = search.toLowerCase();
                const hay = [
                    l.name,
                    l.phone,
                    l.email,
                    l.propertyTitle,
                    l.locality,
                    l.budget,
                    l.message,
                    extractBuilder(l),
                    extractBhk(l),
                ]
                    .filter(Boolean)
                    .join(" ")
                    .toLowerCase();
                if (!hay.includes(q)) return false;
            }
            return true;
        });
    }, [leads, activeTab, categoryTab, locationFilter, bhkFilter, builderFilter, search]);

    const hasActiveFilters =
        activeTab !== "all" ||
        categoryTab !== "all" ||
        locationFilter !== "all" ||
        bhkFilter !== "all" ||
        builderFilter !== "all" ||
        Boolean(search.trim());

    const resetAllFilters = () => {
        setActiveTab("all");
        setCategoryTab("all");
        setLocationFilter("all");
        setBhkFilter("all");
        setBuilderFilter("all");
        setSearch("");
    };

    const handleDownloadCsv = (rowsToExport, label = "all") => {
        if (!rowsToExport.length) {
            showToast("No leads available to download for this selection", "warning");
            return;
        }
        const headers = [
            "ID",
            "Enquiry Type",
            "Name",
            "Phone",
            "Email",
            "Property / Interest",
            "Builder",
            "BHK",
            "Category",
            "Location",
            "Budget",
            "Message",
            "Status",
            "Follow-up Date",
            "Advisor Notes",
            "Created At",
        ];
        const lines = [
            headers.map(escapeCsvCell).join(","),
            ...rowsToExport.map((l) =>
                [
                    l.id,
                    l.type || "contact",
                    l.name,
                    l.phone,
                    l.email || "",
                    l.propertyTitle || "General Advisory",
                    extractBuilder(l),
                    extractBhk(l),
                    extractPropertyCategory(l),
                    l.locality || "Pune",
                    l.budget || "",
                    l.message || "",
                    l.status || "New",
                    l.followUpDate || "",
                    l.notes || "",
                    l.createdAt || "",
                ]
                    .map(escapeCsvCell)
                    .join(",")
            ),
        ];
        const dateSlug = new Date().toISOString().slice(0, 10);
        const safeLabel = label.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "all";
        const filename = `ppi-leads-${safeLabel}-${dateSlug}.csv`;
        const blob = new Blob([`\uFEFF${lines.join("\r\n")}`], {
            type: "text/csv;charset=utf-8;",
        });
        triggerFileDownload(blob, filename);
        showToast(`Downloaded ${rowsToExport.length} lead(s) to ${filename}`, "success");
    };

    const handleDownloadLocationCsv = () => {
        const targetLoc = exportLocation !== "all" ? exportLocation : locationFilter;
        if (targetLoc === "all") {
            showToast("Select a location to download location-wise CSV", "warning");
            return;
        }
        const locRows = leads.filter(
            (l) => (l.locality || "").trim().toLowerCase() === targetLoc.toLowerCase()
        );
        handleDownloadCsv(locRows, `location-${targetLoc}`);
    };

    const handleDownloadFormSheet = (rowsToExport) => {
        if (!rowsToExport.length) {
            showToast("No leads available to export", "warning");
            return;
        }
        const cards = rowsToExport
            .map(
                (l, idx) => `
            <div class="lead-card">
                <div class="lead-head">
                    <strong>#${idx + 1} — ${escapeHtml(l.name)}</strong>
                    <span class="badge">${escapeHtml(l.status || "New")}</span>
                </div>
                <div class="grid">
                    <div><b>Phone:</b> ${escapeHtml(l.phone)}</div>
                    <div><b>Email:</b> ${escapeHtml(l.email || "—")}</div>
                    <div><b>Property / Interest:</b> ${escapeHtml(l.propertyTitle || "General Advisory")}</div>
                    <div><b>Location:</b> ${escapeHtml(l.locality || "Pune")}</div>
                    <div><b>BHK:</b> ${escapeHtml(extractBhk(l) || "—")}</div>
                    <div><b>Builder:</b> ${escapeHtml(extractBuilder(l) || "—")}</div>
                    <div><b>Category:</b> ${escapeHtml(extractPropertyCategory(l) || "—")}</div>
                    <div><b>Budget:</b> ${escapeHtml(l.budget || "—")}</div>
                    <div><b>Follow-up Date:</b> ${escapeHtml(l.followUpDate || "Not scheduled")}</div>
                </div>
                <p><b>Enquiry Message:</b> ${escapeHtml(l.message || "—")}</p>
                <p><b>Advisor Notes:</b> ${escapeHtml(l.notes || "—")}</p>
            </div>`
            )
            .join("\n");

        const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>PPI Leads Enquiry Form Report</title>
<style>
body { font-family: Arial, sans-serif; color: #0f172a; margin: 24px; background: #f8fafc; }
h1 { margin: 0 0 4px; font-size: 20px; }
.meta { color: #475569; font-size: 12px; margin-bottom: 18px; }
.lead-card { background: #fff; border: 1px solid #cbd5e1; border-radius: 8px; padding: 14px 16px; margin-bottom: 12px; page-break-inside: avoid; }
.lead-head { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px; margin-bottom: 10px; }
.badge { background: #fef3c7; color: #92400e; padding: 2px 8px; border-radius: 999px; font-size: 11px; font-weight: 700; }
.grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 6px 12px; font-size: 12.5px; margin-bottom: 8px; }
p { margin: 4px 0; font-size: 12.5px; }
</style>
</head>
<body>
<h1>Pune Property Investors — Lead Enquiry Form Report</h1>
<div class="meta">Generated on ${new Date().toLocaleString()} • Total Leads: ${rowsToExport.length}</div>
${cards}
</body>
</html>`;
        const dateSlug = new Date().toISOString().slice(0, 10);
        const blob = new Blob([html], { type: "text/html;charset=utf-8;" });
        triggerFileDownload(blob, `ppi-leads-form-report-${dateSlug}.html`);
        showToast(`Downloaded enquiry form report (${rowsToExport.length} leads)`, "success");
    };

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
                        Track property enquiries, filter by BHK/location/builder/category, and export leads as CSV or form reports.
                    </p>
                </div>
                <div className="admin-page-actions" style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    <button
                        type="button"
                        className="admin-btn admin-btn--gold admin-btn--sm"
                        onClick={() => handleDownloadCsv(leads, "all")}
                    >
                        <Download size={14} /> Download All CSV ({leads.length})
                    </button>
                    <button
                        type="button"
                        className="admin-btn admin-btn--outline admin-btn--sm"
                        onClick={() => handleDownloadCsv(filteredLeads, "filtered")}
                    >
                        <Download size={14} /> Download Filtered CSV ({filteredLeads.length})
                    </button>
                    <button
                        type="button"
                        className="admin-btn admin-btn--outline admin-btn--sm"
                        onClick={() => handleDownloadFormSheet(filteredLeads)}
                    >
                        <FileText size={14} /> Download Form Report
                    </button>
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

            <div className="admin-tabs" style={{ marginTop: -8 }}>
                {PROPERTY_CATEGORY_TABS.map((tab) => (
                    <button
                        key={tab.key}
                        type="button"
                        className={`admin-tab ${categoryTab === tab.key ? "admin-tab--active" : ""}`}
                        onClick={() => setCategoryTab(tab.key)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            <div
                className="admin-card"
                style={{
                    padding: "12px 14px",
                    marginBottom: 14,
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                    gap: 10,
                }}
            >
                <select
                    className="admin-select"
                    style={{ width: "auto", minWidth: 155, padding: "6px 10px", fontSize: 13 }}
                    value={locationFilter}
                    onChange={(e) => {
                        setLocationFilter(e.target.value);
                        if (e.target.value !== "all") setExportLocation(e.target.value);
                    }}
                    aria-label="Filter by Location"
                >
                    <option value="all">All Locations</option>
                    {locationOptions.map((loc) => (
                        <option key={loc} value={loc}>
                            {loc}
                        </option>
                    ))}
                </select>

                <select
                    className="admin-select"
                    style={{ width: "auto", minWidth: 145, padding: "6px 10px", fontSize: 13 }}
                    value={bhkFilter}
                    onChange={(e) => setBhkFilter(e.target.value)}
                    aria-label="Filter by BHK"
                >
                    <option value="all">All BHK</option>
                    {BHK_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                            {opt}
                        </option>
                    ))}
                </select>

                <select
                    className="admin-select"
                    style={{ width: "auto", minWidth: 155, padding: "6px 10px", fontSize: 13 }}
                    value={builderFilter}
                    onChange={(e) => setBuilderFilter(e.target.value)}
                    aria-label="Filter by Builder"
                >
                    <option value="all">All Builders</option>
                    {builderOptions.map((b) => (
                        <option key={b} value={b}>
                            {b}
                        </option>
                    ))}
                </select>

                {hasActiveFilters && (
                    <button
                        type="button"
                        className="admin-btn admin-btn--outline admin-btn--sm"
                        onClick={resetAllFilters}
                    >
                        <RotateCcw size={13} /> Reset Filters
                    </button>
                )}

                <div
                    style={{
                        marginLeft: "auto",
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        flexWrap: "wrap",
                    }}
                >
                    <select
                        className="admin-select"
                        style={{ width: "auto", minWidth: 155, padding: "6px 10px", fontSize: 13 }}
                        value={exportLocation}
                        onChange={(e) => setExportLocation(e.target.value)}
                        aria-label="Select Location to Download CSV"
                    >
                        <option value="all">Pick Location CSV...</option>
                        {locationOptions.map((loc) => (
                            <option key={loc} value={loc}>
                                {loc}
                            </option>
                        ))}
                    </select>
                    <button
                        type="button"
                        className="admin-btn admin-btn--primary admin-btn--sm"
                        onClick={handleDownloadLocationCsv}
                    >
                        <Download size={13} /> Location CSV
                    </button>
                </div>
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

