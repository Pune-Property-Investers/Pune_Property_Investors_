"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Eye, EyeOff, Megaphone, ArrowLeft } from "lucide-react";
import { contentService } from "../../../services/content.service";
import { useToast } from "../../../context/ToastContext";
import DataTable from "../common/DataTable";
import ConfirmModal from "../common/ConfirmModal";
import SectionSyncBar from "../common/SectionSyncBar";
import ImageUploader, { resolveAssetUrl } from "./ImageUploader";
import VideoUploader from "./VideoUploader";
import LivePagePreview from "../preview/LivePagePreview";
import { extractYouTubeVideoId } from "../../../lib/youtube";

const EMPTY_AD = {
    eyebrow: "FEATURED LAUNCH",
    title: "",
    description: "",
    placement: "Sidebar Sticky",
    image: "",
    videoUrl: "",
    buttonText: "Explore Offer",
    buttonUrl: "/contact",
    visible: true,
};

export default function AdsManager() {
    const { showToast } = useToast();
    const [ads, setAds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [editing, setEditing] = useState(null);
    const [saving, setSaving] = useState(false);
    const [deleteTarget, setDeleteTarget] = useState(null);

    async function load() {
        setLoading(true);
        try {
            const list = await contentService.listAds();
            setAds(Array.isArray(list) ? list : []);
        } catch (err) {
            showToast(err.message || "Failed to load advertisements", "error");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        load();
    }, []);

    const persistList = async (nextList, message = "Advertisements updated") => {
        setAds(nextList);
        try {
            await contentService.saveAds(nextList);
            showToast(message, "success");
        } catch (err) {
            showToast(err.message || "Failed to save advertisements", "error");
        }
    };

    const handleToggleVisibility = (id) => {
        const next = ads.map((a) =>
            String(a.id) === String(id) ? { ...a, visible: a.visible === false ? true : false } : a
        );
        persistList(next, "Advertisement visibility updated");
    };

    const startEditing = (row) => {
        const videoUrl =
            row.videoUrl || (row.videoId ? `https://www.youtube.com/watch?v=${row.videoId}` : "");
        setEditing({
            ...EMPTY_AD,
            ...row,
            videoUrl,
            buttonUrl: row.buttonUrl || row.link || EMPTY_AD.buttonUrl,
        });
    };

    const handleVideoUrlChange = (val) => {
        const nextVideoId = extractYouTubeVideoId(val);
        setEditing((p) => {
            const isAutoYtThumb =
                !p.image || p.image.startsWith("https://img.youtube.com/vi/");
            const nextImage = nextVideoId
                ? isAutoYtThumb
                    ? `https://img.youtube.com/vi/${nextVideoId}/hqdefault.jpg`
                    : p.image
                : isAutoYtThumb
                    ? ""
                    : p.image;
            return {
                ...p,
                videoUrl: val,
                videoId: nextVideoId,
                type: val?.trim() ? "video" : "image",
                image: nextImage,
            };
        });
    };

    const handleSave = async (e) => {
        e?.preventDefault();
        if (!editing?.title?.trim()) {
            showToast("Advertisement title is required", "warning");
            return;
        }
        setSaving(true);
        try {
            const nextVideoId = extractYouTubeVideoId(editing.videoUrl);
            const normalizedEditing = {
                ...editing,
                videoId: nextVideoId,
                type: editing.videoUrl?.trim() ? "video" : "image",
                link: editing.buttonUrl || editing.link || "",
            };
            let nextList;
            if (normalizedEditing.id) {
                nextList = ads.map((a) =>
                    String(a.id) === String(normalizedEditing.id) ? normalizedEditing : a
                );
            } else {
                const nextId = ads.reduce((m, a) => Math.max(m, Number(a.id) || 0), 0) + 1;
                nextList = [{ ...normalizedEditing, id: nextId }, ...ads];
            }
            await persistList(
                nextList,
                normalizedEditing.id ? "Advertisement updated" : "Advertisement created"
            );
            setEditing(null);
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async () => {
        if (!deleteTarget) return;
        const nextList = ads.filter((a) => String(a.id) !== String(deleteTarget.id));
        await persistList(nextList, "Advertisement deleted");
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
                        <ArrowLeft size={14} /> Back to Advertisements
                    </button>
                </div>

                <div className="admin-split-editor">
                    <div className="admin-editor-pane">
                        <div className="admin-card__header">
                            <h2 className="admin-card__title">
                                {editing.id ? `Edit Ad: ${editing.title}` : "Create Advertisement Banner"}
                            </h2>
                        </div>
                        <form className="admin-editor-pane__scroll" onSubmit={handleSave}>
                            <div className="admin-form-grid">
                                <div className="admin-field">
                                    <label className="admin-label">Eyebrow / Tag</label>
                                    <input
                                        className="admin-input"
                                        value={editing.eyebrow || ""}
                                        onChange={(e) => setEditing((p) => ({ ...p, eyebrow: e.target.value }))}
                                        placeholder="SPONSORED or NEW LAUNCH"
                                    />
                                </div>
                                <div className="admin-field">
                                    <label className="admin-label">Placement Slot</label>
                                    <select
                                        className="admin-select"
                                        value={editing.placement || "Sidebar Sticky"}
                                        onChange={(e) => setEditing((p) => ({ ...p, placement: e.target.value }))}
                                    >
                                        <option value="Sidebar Sticky">Homepage Sidebar Sticky</option>
                                        <option value="Inline Banner">Inline Feed Banner</option>
                                        <option value="Property Detail">Property Detail Promo</option>
                                    </select>
                                </div>
                            </div>

                            <div className="admin-field">
                                <label className="admin-label">Headline *</label>
                                <input
                                    className="admin-input"
                                    value={editing.title}
                                    onChange={(e) => setEditing((p) => ({ ...p, title: e.target.value }))}
                                    placeholder="e.g. Zero Stamp Duty Offer — Kharadi Launch"
                                />
                            </div>

                            <div className="admin-field">
                                <label className="admin-label">Ad Copy</label>
                                <textarea
                                    className="admin-textarea"
                                    value={editing.description || ""}
                                    onChange={(e) => setEditing((p) => ({ ...p, description: e.target.value }))}
                                />
                            </div>

                            <VideoUploader
                                label="Video URL"
                                value={editing.videoUrl || ""}
                                onChange={handleVideoUrlChange}
                            />

                            <div className="admin-form-grid">
                                <div className="admin-field">
                                    <label className="admin-label">CTA Button Text</label>
                                    <input
                                        className="admin-input"
                                        value={editing.buttonText || ""}
                                        onChange={(e) => setEditing((p) => ({ ...p, buttonText: e.target.value }))}
                                    />
                                </div>
                                <div className="admin-field">
                                    <label className="admin-label">CTA Link URL</label>
                                    <input
                                        className="admin-input"
                                        value={editing.buttonUrl || ""}
                                        onChange={(e) => setEditing((p) => ({ ...p, buttonUrl: e.target.value }))}
                                    />
                                </div>
                            </div>

                            <div style={{ marginBottom: 16 }}>
                                <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 600 }}>
                                    <input
                                        type="checkbox"
                                        checked={editing.visible !== false}
                                        onChange={(e) => setEditing((p) => ({ ...p, visible: e.target.checked }))}
                                    />
                                    Active on Public Website
                                </label>
                            </div>

                            <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
                                <button type="button" className="admin-btn admin-btn--outline" onClick={() => setEditing(null)}>
                                    Cancel
                                </button>
                                <button type="submit" className="admin-btn admin-btn--gold" disabled={saving}>
                                    {saving ? "Saving..." : "Save Advertisement"}
                                </button>
                            </div>
                        </form>
                    </div>

                    <LivePagePreview mode="advertisement" payload={editing} title="Advertisement Card Preview" />
                </div>
            </div>
        );
    }

    const filtered = ads.filter((a) => {
        if (!search.trim()) return true;
        const q = search.toLowerCase();
        return [a.title, a.description, a.placement, a.eyebrow].filter(Boolean).join(" ").toLowerCase().includes(q);
    });

    const columns = [
        {
            key: "title",
            label: "Advertisement",
            render: (row) => (
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    {row.image ? (
                        <img src={resolveAssetUrl(row.image)} alt={row.title} className="admin-thumb" />
                    ) : (
                        <div className="admin-thumb" style={{ display: "grid", placeItems: "center", color: "#94a3b8" }}>
                            <Megaphone size={16} />
                        </div>
                    )}
                    <div>
                        <div style={{ fontWeight: 600, color: "#0f172a" }}>{row.title}</div>
                        <div style={{ fontSize: 12, color: "#64748b" }}>{row.eyebrow || "SPONSORED"}</div>
                    </div>
                </div>
            ),
        },
        {
            key: "placement",
            label: "Placement",
            render: (row) => <span className="admin-badge admin-badge--blue">{row.placement || "Sidebar Sticky"}</span>,
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
                    {row.visible !== false ? "Active" : "Paused"}
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
                        onClick={() => startEditing(row)}
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
                    <h1 className="admin-page-title">Advertisements &amp; Promos</h1>
                    <p className="admin-page-subtitle">
                        Manage homepage sidebar video promos, developer launch banners, and CTA links with live preview.
                    </p>
                </div>
                <div className="admin-page-actions">
                    <SectionSyncBar sectionKey="advertisements" label="Advertisements" onRetrieved={load} />
                    <button type="button" className="admin-btn admin-btn--gold" onClick={() => setEditing({ ...EMPTY_AD })}>
                        <Plus size={16} /> Add Advertisement
                    </button>
                </div>
            </div>

            <DataTable
                columns={columns}
                rows={filtered}
                loading={loading}
                searchValue={search}
                onSearchChange={setSearch}
                searchPlaceholder="Search advertisements by title or placement..."
                emptyTitle="No advertisements configured"
                emptyDescription="Create a sidebar promo or developer launch banner."
                emptyAction={
                    <button type="button" className="admin-btn admin-btn--primary" onClick={() => setEditing({ ...EMPTY_AD })}>
                        <Plus size={15} /> Create Ad
                    </button>
                }
            />

            <ConfirmModal
                open={Boolean(deleteTarget)}
                onClose={() => setDeleteTarget(null)}
                onConfirm={handleDelete}
                title="Delete Advertisement"
                message={`Delete "${deleteTarget?.title}"?`}
                confirmText="Delete"
                confirmTone="danger"
            />
        </div>
    );
}

