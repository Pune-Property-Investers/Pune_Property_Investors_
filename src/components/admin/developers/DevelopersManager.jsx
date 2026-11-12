"use client";

import { useEffect, useMemo, useState } from "react";
import { Plus, Pencil, Trash2, Building2, Globe, Phone, Mail } from "lucide-react";
import { developerService } from "../../../services/developer.service";
import { projectService } from "../../../services/project.service";
import { useToast } from "../../../context/ToastContext";
import DataTable from "../common/DataTable";
import AdminModal from "../common/AdminModal";
import ConfirmModal from "../common/ConfirmModal";
import ImageUploader, { resolveAssetUrl } from "../content/ImageUploader";

const EMPTY_DEVELOPER = {
    name: "",
    logo: "",
    domain: "",
    website: "",
    phone: "",
    email: "",
    description: "",
};

export default function DevelopersManager() {
    const { showToast } = useToast();
    const [developers, setDevelopers] = useState([]);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    const [modalOpen, setModalOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [form, setForm] = useState(EMPTY_DEVELOPER);
    const [saving, setSaving] = useState(false);

    const [deleteTarget, setDeleteTarget] = useState(null);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        async function load() {
            setLoading(true);
            try {
                const [devList, projList] = await Promise.all([
                    developerService.list(),
                    projectService.list(),
                ]);
                setDevelopers(Array.isArray(devList) ? devList : []);
                setProjects(Array.isArray(projList) ? projList : []);
            } catch (err) {
                showToast(err.message || "Failed to load developers", "error");
            } finally {
                setLoading(false);
            }
        }
        load();
    }, []);

    const projectCountByDeveloper = useMemo(() => {
        const map = {};
        projects.forEach((p) => {
            const key = (p.developer || "").trim().toLowerCase();
            if (key) map[key] = (map[key] || 0) + 1;
        });
        return map;
    }, [projects]);

    const filteredDevelopers = useMemo(() => {
        if (!search.trim()) return developers;
        const q = search.toLowerCase();
        return developers.filter((d) =>
            [d.name, d.domain, d.email, d.description].filter(Boolean).join(" ").toLowerCase().includes(q)
        );
    }, [developers, search]);

    const openCreate = () => {
        setEditingId(null);
        setForm({ ...EMPTY_DEVELOPER });
        setModalOpen(true);
    };

    const openEdit = (dev) => {
        setEditingId(dev.id);
        setForm({ ...EMPTY_DEVELOPER, ...dev, logo: dev.logo || dev.logoUrl || "" });
        setModalOpen(true);
    };

    const handleSave = async (e) => {
        e?.preventDefault();
        if (!form.name.trim()) {
            showToast("Developer name is required", "warning");
            return;
        }
        setSaving(true);
        try {
            const payload = { ...form, logoUrl: form.logo || form.logoUrl || "" };
            if (editingId) {
                const updated = await developerService.update(editingId, payload);
                setDevelopers((prev) => prev.map((d) => (String(d.id) === String(editingId) ? updated : d)));
                showToast("Developer updated", "success");
            } else {
                const created = await developerService.create(payload);
                setDevelopers((prev) => [created, ...prev]);
                showToast("Developer added", "success");
            }
            setModalOpen(false);
        } catch (err) {
            showToast(err.message || "Failed to save developer", "error");
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async () => {
        if (!deleteTarget) return;
        setDeleting(true);
        try {
            await developerService.remove(deleteTarget.id);
            setDevelopers((prev) => prev.filter((d) => String(d.id) !== String(deleteTarget.id)));
            showToast("Developer removed", "success");
            setDeleteTarget(null);
        } catch (err) {
            showToast(err.message || "Failed to delete developer", "error");
        } finally {
            setDeleting(false);
        }
    };

    const columns = [
        {
            key: "name",
            label: "Developer",
            render: (row) => (
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    {(row.logo || row.logoUrl) ? (
                        <img
                            src={resolveAssetUrl(row.logo || row.logoUrl)}
                            alt={row.name}
                            className="admin-thumb"
                            style={{ objectFit: "contain", background: "#fff", padding: 3 }}
                        />
                    ) : (
                        <div className="admin-thumb" style={{ display: "grid", placeItems: "center", color: "#94a3b8" }}>
                            <Building2 size={16} />
                        </div>
                    )}
                    <div>
                        <div style={{ fontWeight: 600, color: "#0f172a" }}>{row.name}</div>
                        <div style={{ fontSize: 12, color: "#64748b" }}>{row.domain || row.website || "—"}</div>
                    </div>
                </div>
            ),
        },
        {
            key: "contact",
            label: "Contact Details",
            render: (row) => (
                <div style={{ fontSize: 12.5, color: "#475569", display: "flex", flexDirection: "column", gap: 2 }}>
                    {row.phone && (
                        <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
                            <Phone size={12} /> {row.phone}
                        </span>
                    )}
                    {row.email && (
                        <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
                            <Mail size={12} /> {row.email}
                        </span>
                    )}
                    {!row.phone && !row.email && <span style={{ color: "#94a3b8" }}>No contact info</span>}
                </div>
            ),
        },
        {
            key: "projectsCount",
            label: "Associated Projects",
            render: (row) => {
                const count = projectCountByDeveloper[(row.name || "").trim().toLowerCase()] || 0;
                return (
                    <span className={`admin-badge ${count > 0 ? "admin-badge--blue" : "admin-badge--slate"}`}>
                        {count} {count === 1 ? "Project" : "Projects"}
                    </span>
                );
            },
        },
        {
            key: "actions",
            label: "Actions",
            render: (row) => (
                <div style={{ display: "flex", gap: 6 }}>
                    <button
                        type="button"
                        className="admin-btn admin-btn--outline admin-btn--sm"
                        onClick={() => openEdit(row)}
                    >
                        <Pencil size={13} /> Edit
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
                    <h1 className="admin-page-title">Developer Management</h1>
                    <p className="admin-page-subtitle">
                        Manage real-estate builder partners, brand logos, contact details, and linked project counts.
                    </p>
                </div>
                <div className="admin-page-actions">
                    <button type="button" className="admin-btn admin-btn--gold" onClick={openCreate}>
                        <Plus size={16} /> Add Developer
                    </button>
                </div>
            </div>

            <DataTable
                columns={columns}
                rows={filteredDevelopers}
                loading={loading}
                searchValue={search}
                onSearchChange={setSearch}
                searchPlaceholder="Search developers by name or domain..."
                emptyTitle="No developers found"
                emptyDescription="Add a builder partner to link with projects."
                emptyAction={
                    <button type="button" className="admin-btn admin-btn--primary" onClick={openCreate}>
                        <Plus size={15} /> Add Developer
                    </button>
                }
            />

            <AdminModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                title={editingId ? `Edit Developer: ${form.name}` : "Add Developer"}
                footer={
                    <>
                        <button type="button" className="admin-btn admin-btn--outline" onClick={() => setModalOpen(false)}>
                            Cancel
                        </button>
                        <button type="button" className="admin-btn admin-btn--gold" onClick={handleSave} disabled={saving}>
                            {saving ? "Saving..." : editingId ? "Save Changes" : "Add Developer"}
                        </button>
                    </>
                }
            >
                <form onSubmit={handleSave}>
                    <div className="admin-form-grid">
                        <div className="admin-field admin-field--full">
                            <label className="admin-label">Developer Name *</label>
                            <input
                                className="admin-input"
                                value={form.name}
                                onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                                placeholder="e.g. Godrej Properties"
                                required
                            />
                        </div>

                        <div className="admin-field">
                            <label className="admin-label">Domain</label>
                            <input
                                className="admin-input"
                                value={form.domain}
                                onChange={(e) => setForm((p) => ({ ...p, domain: e.target.value }))}
                                placeholder="godrejproperties.com"
                            />
                        </div>

                        <div className="admin-field">
                            <label className="admin-label">Website URL</label>
                            <input
                                className="admin-input"
                                value={form.website}
                                onChange={(e) => setForm((p) => ({ ...p, website: e.target.value }))}
                                placeholder="https://www.godrejproperties.com"
                            />
                        </div>

                        <div className="admin-field">
                            <label className="admin-label">Contact Phone</label>
                            <input
                                className="admin-input"
                                value={form.phone}
                                onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
                                placeholder="+91 98..."
                            />
                        </div>

                        <div className="admin-field">
                            <label className="admin-label">Contact Email</label>
                            <input
                                type="email"
                                className="admin-input"
                                value={form.email}
                                onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                                placeholder="partner@developer.com"
                            />
                        </div>
                    </div>

                    <ImageUploader
                        label="Developer Logo"
                        value={form.logo}
                        onChange={(val) => setForm((p) => ({ ...p, logo: val }))}
                    />

                    <div className="admin-field">
                        <label className="admin-label">About Developer</label>
                        <textarea
                            className="admin-textarea"
                            value={form.description}
                            onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
                            placeholder="Brief builder profile, track record, and flagship Pune developments..."
                        />
                    </div>
                </form>
            </AdminModal>

            <ConfirmModal
                open={Boolean(deleteTarget)}
                onClose={() => setDeleteTarget(null)}
                onConfirm={handleDelete}
                loading={deleting}
                title="Delete Developer"
                message={`Remove "${deleteTarget?.name}" from the developer directory?`}
                confirmText="Delete Developer"
                confirmTone="danger"
            />
        </div>
    );
}
