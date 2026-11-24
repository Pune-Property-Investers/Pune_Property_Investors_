"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Star, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { contentService } from "../../../services/content.service";
import { useToast } from "../../../context/ToastContext";
import DataTable from "../common/DataTable";
import ConfirmModal from "../common/ConfirmModal";
import SectionSyncBar from "../common/SectionSyncBar";
import ImageUploader, { resolveAssetUrl } from "./ImageUploader";
import LivePagePreview from "../preview/LivePagePreview";

const EMPTY_TESTIMONIAL = {
    name: "",
    designation: "Homebuyer",
    location: "Pune",
    rating: 5,
    photo: "",
    text: "",
    visible: true,
};

export default function TestimonialsManager() {
    const { showToast } = useToast();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [editing, setEditing] = useState(null);
    const [saving, setSaving] = useState(false);
    const [deleteTarget, setDeleteTarget] = useState(null);

    async function load() {
        setLoading(true);
        try {
            const list = await contentService.listTestimonials();
            setItems(Array.isArray(list) ? list : []);
        } catch (err) {
            showToast(err.message || "Failed to load testimonials", "error");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        load();
    }, []);

    const persistList = async (nextList, message = "Testimonials updated") => {
        setItems(nextList);
        try {
            await contentService.saveTestimonials(nextList);
            showToast(message, "success");
        } catch (err) {
            showToast(err.message || "Failed to save testimonials", "error");
        }
    };

    const handleToggleVisibility = (id) => {
        const next = items.map((t) =>
            String(t.id) === String(id) ? { ...t, visible: t.visible === false ? true : false } : t
        );
        persistList(next, "Visibility updated");
    };

    const handleSave = async (e) => {
        e?.preventDefault();
        if (!editing?.name?.trim() || !editing?.text?.trim()) {
            showToast("Client name and review text are required", "warning");
            return;
        }
        setSaving(true);
        try {
            let nextList;
            if (editing.id) {
                nextList = items.map((t) => (String(t.id) === String(editing.id) ? editing : t));
            } else {
                const nextId = items.reduce((m, t) => Math.max(m, Number(t.id) || 0), 0) + 1;
                nextList = [{ ...editing, id: nextId }, ...items];
            }
            await persistList(nextList, editing.id ? "Testimonial updated" : "Testimonial added");
            setEditing(null);
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async () => {
        if (!deleteTarget) return;
        const nextList = items.filter((t) => String(t.id) !== String(deleteTarget.id));
        await persistList(nextList, "Testimonial deleted");
        setDeleteTarget(null);
    };

    if (editing) {
        return (
            <div>
                <div style={{ marginBottom: 12 }}>
                    <button
                        type="button"
                        className="admin-btn admin-btn--outline admin-btn--sm"
                        onClick={() => setEditing(null)}
                    >
                        <ArrowLeft size={14} /> Back to Testimonials
                    </button>
                </div>

                <div className="admin-split-editor">
                    <div className="admin-editor-pane">
                        <div className="admin-card__header">
                            <h2 className="admin-card__title">
                                {editing.id ? `Edit Review: ${editing.name}` : "Add Client Testimonial"}
                            </h2>
                        </div>
                        <form className="admin-editor-pane__scroll" onSubmit={handleSave}>
                            <div className="admin-field">
                                <label className="admin-label">Client Name *</label>
                                <input
                                    className="admin-input"
                                    value={editing.name}
                                    onChange={(e) => setEditing((p) => ({ ...p, name: e.target.value }))}
                                    placeholder="e.g. Rohan & Sneha Deshmukh"
                                />
                            </div>
                            <div className="admin-form-grid">
                                <div className="admin-field">
                                    <label className="admin-label">Designation / Role</label>
                                    <input
                                        className="admin-input"
                                        value={editing.designation || ""}
                                        onChange={(e) => setEditing((p) => ({ ...p, designation: e.target.value }))}
                                        placeholder="Homebuyer, NRI Investor"
                                    />
                                </div>
                                <div className="admin-field">
                                    <label className="admin-label">Location</label>
                                    <input
                                        className="admin-input"
                                        value={editing.location || ""}
                                        onChange={(e) => setEditing((p) => ({ ...p, location: e.target.value }))}
                                        placeholder="Kharadi, Pune"
                                    />
                                </div>
                            </div>

                            <div className="admin-field">
                                <label className="admin-label">Star Rating (1–5)</label>
                                <div style={{ display: "flex", gap: 6 }}>
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            type="button"
                                            className="admin-btn admin-btn--outline admin-btn--sm"
                                            style={{
                                                color: star <= Number(editing.rating) ? "#d97706" : "#94a3b8",
                                                borderColor: star <= Number(editing.rating) ? "#f59e0b" : "#cbd5e1",
                                            }}
                                            onClick={() => setEditing((p) => ({ ...p, rating: star }))}
                                        >
                                            <Star size={14} fill={star <= Number(editing.rating) ? "currentColor" : "none"} />
                                            {star}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <ImageUploader
                                label="Client Avatar / Photo"
                                value={editing.photo || ""}
                                onChange={(val) => setEditing((p) => ({ ...p, photo: val }))}
                            />

                            <div className="admin-field">
                                <label className="admin-label">Review Text *</label>
                                <textarea
                                    className="admin-textarea"
                                    value={editing.text}
                                    onChange={(e) => setEditing((p) => ({ ...p, text: e.target.value }))}
                                    placeholder="Write the client's testimonial quote..."
                                />
                            </div>

                            <div style={{ marginBottom: 16 }}>
                                <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 600 }}>
                                    <input
                                        type="checkbox"
                                        checked={editing.visible !== false}
                                        onChange={(e) => setEditing((p) => ({ ...p, visible: e.target.checked }))}
                                    />
                                    Show on Website
                                </label>
                            </div>

                            <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
                                <button type="button" className="admin-btn admin-btn--outline" onClick={() => setEditing(null)}>
                                    Cancel
                                </button>
                                <button type="submit" className="admin-btn admin-btn--gold" disabled={saving}>
                                    {saving ? "Saving..." : "Save Testimonial"}
                                </button>
                            </div>
                        </form>
                    </div>

                    <LivePagePreview mode="testimonial" payload={editing} title="Testimonial Card Preview" />
                </div>
            </div>
        );
    }

    const filtered = items.filter((t) => {
        if (!search.trim()) return true;
        const q = search.toLowerCase();
        return [t.name, t.designation, t.location, t.text].filter(Boolean).join(" ").toLowerCase().includes(q);
    });

    const columns = [
        {
            key: "name",
            label: "Client",
            render: (row) => (
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    {row.photo ? (
                        <img
                            src={resolveAssetUrl(row.photo)}
                            alt={row.name}
                            style={{ width: 38, height: 38, borderRadius: "50%", objectFit: "cover" }}
                        />
                    ) : (
                        <div className="admin-avatar">{(row.name || "C").charAt(0).toUpperCase()}</div>
                    )}
                    <div>
                        <div style={{ fontWeight: 600 }}>{row.name}</div>
                        <div style={{ fontSize: 12, color: "#64748b" }}>
                            {row.designation || row.role || "Homebuyer"} • {row.location || "Pune"}
                        </div>
                    </div>
                </div>
            ),
        },
        {
            key: "rating",
            label: "Rating",
            render: (row) => (
                <span style={{ color: "#d97706", fontWeight: 700, display: "inline-flex", alignItems: "center", gap: 4 }}>
                    <Star size={14} fill="currentColor" /> {row.rating || 5} / 5
                </span>
            ),
        },
        {
            key: "text",
            label: "Review Excerpt",
            render: (row) => (
                <div style={{ maxWidth: 320, fontSize: 12.5, color: "#475569", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    "{row.text}"
                </div>
            ),
        },
        {
            key: "visible",
            label: "Visibility",
            render: (row) => (
                <button
                    type="button"
                    className={`admin-badge ${row.visible !== false ? "admin-badge--green" : "admin-badge--slate"}`}
                    style={{ border: "none", cursor: "pointer" }}
                    onClick={() => handleToggleVisibility(row.id)}
                >
                    {row.visible !== false ? <Eye size={12} /> : <EyeOff size={12} />}
                    {row.visible !== false ? "Visible" : "Hidden"}
                </button>
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
                        onClick={() => setEditing({ ...EMPTY_TESTIMONIAL, ...row })}
                    >
                        <Pencil size={13} /> Edit &amp; Preview
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
                    <h1 className="admin-page-title">Customer Testimonials</h1>
                    <p className="admin-page-subtitle">
                        Manage verified buyer reviews, star ratings, photos, and live testimonial card previews.
                    </p>
                </div>
                <div className="admin-page-actions">
                    <SectionSyncBar sectionKey="testimonials" label="Testimonials" onRetrieved={load} />
                    <button type="button" className="admin-btn admin-btn--gold" onClick={() => setEditing({ ...EMPTY_TESTIMONIAL })}>
                        <Plus size={16} /> Add Testimonial
                    </button>
                </div>
            </div>

            <DataTable
                columns={columns}
                rows={filtered}
                loading={loading}
                searchValue={search}
                onSearchChange={setSearch}
                searchPlaceholder="Search client testimonials..."
                emptyTitle="No testimonials yet"
                emptyDescription="Add a verified homebuyer review."
                emptyAction={
                    <button type="button" className="admin-btn admin-btn--primary" onClick={() => setEditing({ ...EMPTY_TESTIMONIAL })}>
                        <Plus size={15} /> Add Testimonial
                    </button>
                }
            />

            <ConfirmModal
                open={Boolean(deleteTarget)}
                onClose={() => setDeleteTarget(null)}
                onConfirm={handleDelete}
                title="Delete Testimonial"
                message={`Delete testimonial from "${deleteTarget?.name}"?`}
                confirmText="Delete"
                confirmTone="danger"
            />
        </div>
    );
}

