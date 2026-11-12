"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, ArrowUp, ArrowDown, Eye, EyeOff, Film, ArrowLeft } from "lucide-react";
import { contentService } from "../../../services/content.service";
import { useToast } from "../../../context/ToastContext";
import DataTable from "../common/DataTable";
import ConfirmModal from "../common/ConfirmModal";
import SectionSyncBar from "../common/SectionSyncBar";
import VideoUploader from "./VideoUploader";
import ImageUploader, { resolveAssetUrl } from "./ImageUploader";
import LivePagePreview from "../preview/LivePagePreview";

const EMPTY_SHORT = {
    title: "",
    developer: "",
    location: "Pune",
    youtubeUrl: "",
    thumbnail: "",
    description: "",
    visible: true,
};

export default function ShortsManager() {
    const { showToast } = useToast();
    const [shorts, setShorts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [editing, setEditing] = useState(null);
    const [saving, setSaving] = useState(false);
    const [deleteTarget, setDeleteTarget] = useState(null);

    async function load() {
        setLoading(true);
        try {
            const list = await contentService.listShorts();
            setShorts(Array.isArray(list) ? list : []);
        } catch (err) {
            showToast(err.message || "Failed to load shorts", "error");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        load();
    }, []);

    const persistList = async (nextList, message = "Shorts feed updated") => {
        const normalized = nextList.map((item, idx) => ({ ...item, order: idx + 1 }));
        setShorts(normalized);
        try {
            await contentService.saveShorts(normalized);
            showToast(message, "success");
        } catch (err) {
            showToast(err.message || "Failed to save shorts", "error");
        }
    };

    const handleMove = (id, dir) => {
        const idx = shorts.findIndex((s) => String(s.id) === String(id));
        if (idx === -1) return;
        const targetIdx = dir === "up" ? idx - 1 : idx + 1;
        if (targetIdx < 0 || targetIdx >= shorts.length) return;
        const copy = [...shorts];
        const tmp = copy[idx];
        copy[idx] = copy[targetIdx];
        copy[targetIdx] = tmp;
        persistList(copy, "Reordered video shorts");
    };

    const handleToggleVisibility = (id) => {
        const copy = shorts.map((s) =>
            String(s.id) === String(id) ? { ...s, visible: s.visible === false ? true : false } : s
        );
        persistList(copy, "Visibility updated");
    };

    const handleSaveEditor = async (e) => {
        e?.preventDefault();
        if (!editing?.title?.trim()) {
            showToast("Short title is required", "warning");
            return;
        }
        setSaving(true);
        try {
            let nextList;
            if (editing.id) {
                nextList = shorts.map((s) => (String(s.id) === String(editing.id) ? editing : s));
            } else {
                const nextId = shorts.reduce((m, s) => Math.max(m, Number(s.id) || 0), 0) + 1;
                nextList = [{ ...editing, id: nextId }, ...shorts];
            }
            await persistList(nextList, editing.id ? "Short updated" : "Short added");
            setEditing(null);
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async () => {
        if (!deleteTarget) return;
        const nextList = shorts.filter((s) => String(s.id) !== String(deleteTarget.id));
        await persistList(nextList, "Short removed");
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
                        <ArrowLeft size={14} /> Back to Shorts Feed
                    </button>
                </div>

                <div className="admin-split-editor">
                    <div className="admin-editor-pane">
                        <div className="admin-card__header">
                            <h2 className="admin-card__title">
                                {editing.id ? `Edit Short: ${editing.title}` : "Add Property Short / Reel"}
                            </h2>
                        </div>
                        <form className="admin-editor-pane__scroll" onSubmit={handleSaveEditor}>
                            <div className="admin-field">
                                <label className="admin-label">Title *</label>
                                <input
                                    className="admin-input"
                                    value={editing.title}
                                    onChange={(e) => setEditing((p) => ({ ...p, title: e.target.value }))}
                                    placeholder="e.g. VTP Aurelia 3 BHK Sample Flat Tour"
                                />
                            </div>
                            <div className="admin-form-grid">
                                <div className="admin-field">
                                    <label className="admin-label">Developer</label>
                                    <input
                                        className="admin-input"
                                        value={editing.developer || ""}
                                        onChange={(e) => setEditing((p) => ({ ...p, developer: e.target.value }))}
                                    />
                                </div>
                                <div className="admin-field">
                                    <label className="admin-label">Location</label>
                                    <input
                                        className="admin-input"
                                        value={editing.location || ""}
                                        onChange={(e) => setEditing((p) => ({ ...p, location: e.target.value }))}
                                    />
                                </div>
                            </div>

                            <VideoUploader
                                label="YouTube Shorts / Gumlet / MP4 URL"
                                value={editing.youtubeUrl || editing.videoUrl || ""}
                                onChange={(val) => setEditing((p) => ({ ...p, youtubeUrl: val, videoUrl: val }))}
                            />

                            <ImageUploader
                                label="Fallback Thumbnail"
                                value={editing.thumbnail || ""}
                                onChange={(val) => setEditing((p) => ({ ...p, thumbnail: val }))}
                            />

                            <div className="admin-field">
                                <label className="admin-label">Caption / Description</label>
                                <textarea
                                    className="admin-textarea"
                                    value={editing.description || ""}
                                    onChange={(e) => setEditing((p) => ({ ...p, description: e.target.value }))}
                                />
                            </div>

                            <div style={{ marginBottom: 16 }}>
                                <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 600 }}>
                                    <input
                                        type="checkbox"
                                        checked={editing.visible !== false}
                                        onChange={(e) => setEditing((p) => ({ ...p, visible: e.target.checked }))}
                                    />
                                    Visible on Public Shorts Page
                                </label>
                            </div>

                            <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
                                <button type="button" className="admin-btn admin-btn--outline" onClick={() => setEditing(null)}>
                                    Cancel
                                </button>
                                <button type="submit" className="admin-btn admin-btn--gold" disabled={saving}>
                                    {saving ? "Saving..." : "Save Short"}
                                </button>
                            </div>
                        </form>
                    </div>

                    <LivePagePreview mode="short" payload={editing} title="9:16 Vertical Short Preview" />
                </div>
            </div>
        );
    }

    const filtered = shorts.filter((s) => {
        if (!search.trim()) return true;
        const q = search.toLowerCase();
        return [s.title, s.developer, s.location].filter(Boolean).join(" ").toLowerCase().includes(q);
    });

    const columns = [
        {
            key: "title",
            label: "Short Video",
            render: (row) => (
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    {row.thumbnail ? (
                        <img src={resolveAssetUrl(row.thumbnail)} alt={row.title} className="admin-thumb" />
                    ) : (
                        <div className="admin-thumb" style={{ display: "grid", placeItems: "center", color: "#94a3b8" }}>
                            <Film size={16} />
                        </div>
                    )}
                    <div>
                        <div style={{ fontWeight: 600, color: "#0f172a" }}>{row.title}</div>
                        <div style={{ fontSize: 12, color: "#64748b" }}>
                            {row.developer} • {row.location}
                        </div>
                    </div>
                </div>
            ),
        },
        {
            key: "order",
            label: "Order",
            render: (row, idx) => (
                <div style={{ display: "flex", gap: 4 }}>
                    <button
                        type="button"
                        className="admin-btn admin-btn--outline admin-btn--sm"
                        onClick={() => handleMove(row.id, "up")}
                        disabled={idx === 0}
                        title="Move Up"
                    >
                        <ArrowUp size={13} />
                    </button>
                    <button
                        type="button"
                        className="admin-btn admin-btn--outline admin-btn--sm"
                        onClick={() => handleMove(row.id, "down")}
                        disabled={idx === filtered.length - 1}
                        title="Move Down"
                    >
                        <ArrowDown size={13} />
                    </button>
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
                        onClick={() => setEditing({ ...EMPTY_SHORT, ...row })}
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
                    <h1 className="admin-page-title">Shorts &amp; Video Reels</h1>
                    <p className="admin-page-subtitle">
                        Curate vertical property walkthroughs, Gumlet reels, and YouTube Shorts with live 9:16 preview.
                    </p>
                </div>
                <div className="admin-page-actions">
                    <SectionSyncBar sectionKey="shorts" label="Shorts" onRetrieved={load} />
                    <button type="button" className="admin-btn admin-btn--gold" onClick={() => setEditing({ ...EMPTY_SHORT })}>
                        <Plus size={16} /> Add Short Video
                    </button>
                </div>
            </div>

            <DataTable
                columns={columns}
                rows={filtered}
                loading={loading}
                searchValue={search}
                onSearchChange={setSearch}
                searchPlaceholder="Search shorts by title, developer, location..."
                emptyTitle="No video shorts yet"
                emptyDescription="Add a vertical video tour to engage mobile and desktop visitors."
                emptyAction={
                    <button type="button" className="admin-btn admin-btn--primary" onClick={() => setEditing({ ...EMPTY_SHORT })}>
                        <Plus size={15} /> Add Short
                    </button>
                }
            />

            <ConfirmModal
                open={Boolean(deleteTarget)}
                onClose={() => setDeleteTarget(null)}
                onConfirm={handleDelete}
                title="Delete Video Short"
                message={`Remove "${deleteTarget?.title}" from the Shorts feed?`}
                confirmText="Delete"
                confirmTone="danger"
            />
        </div>
    );
}

