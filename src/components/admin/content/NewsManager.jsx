"use client";

import { useEffect, useMemo, useState } from "react";
import { Plus, Pencil, Trash2, ArrowLeft, Newspaper } from "lucide-react";
import { articleService } from "../../../services/article.service";
import { useToast } from "../../../context/ToastContext";
import DataTable from "../common/DataTable";
import StatusBadge from "../common/StatusBadge";
import ConfirmModal from "../common/ConfirmModal";
import ContentEditor from "./ContentEditor";
import ImageUploader, { resolveAssetUrl } from "./ImageUploader";
import RichTextEditor from "./RichTextEditor";
import SEOEditor, { slugifyText } from "./SEOEditor";

const EMPTY_NEWS = {
    title: "",
    slug: "",
    category: "Pune Infrastructure",
    source: "PPI News Desk",
    image: "",
    summary: "",
    content: "<p>Write news update details...</p>",
    status: "Draft",
    publishDate: new Date().toISOString().slice(0, 10),
    seo: { title: "", description: "", slug: "" },
};

export default function NewsManager() {
    const { showToast } = useToast();
    const [newsItems, setNewsItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    const [editingItem, setEditingItem] = useState(null);
    const [originalItem, setOriginalItem] = useState(null);
    const [saving, setSaving] = useState(false);
    const [publishing, setPublishing] = useState(false);

    const [deleteTarget, setDeleteTarget] = useState(null);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        async function load() {
            setLoading(true);
            try {
                const data = await articleService.listNews();
                setNewsItems(Array.isArray(data) ? data : []);
            } catch (err) {
                showToast(err.message || "Failed to load news", "error");
            } finally {
                setLoading(false);
            }
        }
        load();
    }, []);

    const filtered = useMemo(() => {
        if (!search.trim()) return newsItems;
        const q = search.toLowerCase();
        return newsItems.filter((n) =>
            [n.title, n.category, n.source, n.summary].filter(Boolean).join(" ").toLowerCase().includes(q)
        );
    }, [newsItems, search]);

    const openNew = () => {
        const fresh = { ...EMPTY_NEWS, id: null };
        setEditingItem(fresh);
        setOriginalItem(fresh);
    };

    const openEdit = (item) => {
        const cloned = {
            ...EMPTY_NEWS,
            ...item,
            seo: item.seo || { title: item.title, description: item.summary || "", slug: item.slug || "" },
        };
        setEditingItem(cloned);
        setOriginalItem(cloned);
    };

    const isDirty = useMemo(() => {
        if (!editingItem || !originalItem) return false;
        return JSON.stringify(editingItem) !== JSON.stringify(originalItem);
    }, [editingItem, originalItem]);

    const persistNews = async (targetStatus) => {
        if (!editingItem?.title?.trim()) {
            showToast("News headline is required", "warning");
            return;
        }
        const isPublish = targetStatus === "Published";
        isPublish ? setPublishing(true) : setSaving(true);
        try {
            const payload = {
                ...editingItem,
                slug: editingItem.slug || slugifyText(editingItem.title),
                status: targetStatus,
            };
            let saved;
            if (editingItem.id) {
                saved = await articleService.updateNews(editingItem.id, payload);
                setNewsItems((prev) => prev.map((n) => (String(n.id) === String(editingItem.id) ? saved : n)));
            } else {
                saved = await articleService.createNews(payload);
                setNewsItems((prev) => [saved, ...prev]);
            }
            setEditingItem(saved);
            setOriginalItem(saved);
            showToast(isPublish ? "News story published" : "News draft saved", "success");
        } catch (err) {
            showToast(err.message || "Failed to save news", "error");
        } finally {
            setSaving(false);
            setPublishing(false);
        }
    };

    const handleDelete = async () => {
        if (!deleteTarget) return;
        setDeleting(true);
        try {
            await articleService.removeNews(deleteTarget.id);
            setNewsItems((prev) => prev.filter((n) => String(n.id) !== String(deleteTarget.id)));
            showToast("News item deleted", "success");
            setDeleteTarget(null);
        } catch (err) {
            showToast(err.message || "Failed to delete news", "error");
        } finally {
            setDeleting(false);
        }
    };

    if (editingItem) {
        return (
            <div>
                <div style={{ marginBottom: 12 }}>
                    <button
                        type="button"
                        className="admin-btn admin-btn--outline admin-btn--sm"
                        onClick={() => setEditingItem(null)}
                    >
                        <ArrowLeft size={14} /> Back to Real Estate News
                    </button>
                </div>

                <ContentEditor
                    title={editingItem.id ? `Edit News: ${editingItem.title}` : "Publish Real Estate News"}
                    subtitle="Edit news updates, policy alerts, and infrastructure stories with live preview."
                    previewMode="news"
                    previewPayload={{
                        ...editingItem,
                        author: editingItem.source || "PPI News Desk",
                        excerpt: editingItem.summary,
                    }}
                    isDirty={isDirty}
                    hasUnpublishedChanges={editingItem.status !== "Published"}
                    status={editingItem.status || "Draft"}
                    updatedAt={editingItem.updatedAt}
                    saving={saving}
                    publishing={publishing}
                    onSaveDraft={() => persistNews("Draft")}
                    onDiscard={() => setEditingItem(originalItem)}
                    onPublish={() => persistNews("Published")}
                >
                    <div className="admin-field">
                        <label className="admin-label">Headline *</label>
                        <input
                            className="admin-input"
                            value={editingItem.title}
                            onChange={(e) => setEditingItem((p) => ({ ...p, title: e.target.value }))}
                            placeholder="e.g. Pune Metro Line 3 Trial Runs Boost Hinjewadi Demand"
                        />
                    </div>

                    <div className="admin-form-grid">
                        <div className="admin-field">
                            <label className="admin-label">Category</label>
                            <input
                                className="admin-input"
                                value={editingItem.category}
                                onChange={(e) => setEditingItem((p) => ({ ...p, category: e.target.value }))}
                            />
                        </div>
                        <div className="admin-field">
                            <label className="admin-label">Source / Desk</label>
                            <input
                                className="admin-input"
                                value={editingItem.source}
                                onChange={(e) => setEditingItem((p) => ({ ...p, source: e.target.value }))}
                            />
                        </div>
                        <div className="admin-field">
                            <label className="admin-label">Publish Date</label>
                            <input
                                type="date"
                                className="admin-input"
                                value={editingItem.publishDate || ""}
                                onChange={(e) => setEditingItem((p) => ({ ...p, publishDate: e.target.value }))}
                            />
                        </div>
                    </div>

                    <ImageUploader
                        label="News Banner Image"
                        value={editingItem.image}
                        onChange={(val) => setEditingItem((p) => ({ ...p, image: val }))}
                    />

                    <div className="admin-field">
                        <label className="admin-label">Summary</label>
                        <textarea
                            className="admin-textarea"
                            value={editingItem.summary}
                            onChange={(e) => setEditingItem((p) => ({ ...p, summary: e.target.value }))}
                        />
                    </div>

                    <div className="admin-field">
                        <label className="admin-label">Full News Story</label>
                        <RichTextEditor
                            value={editingItem.content}
                            onChange={(val) => setEditingItem((p) => ({ ...p, content: val }))}
                        />
                    </div>

                    <div style={{ marginTop: 18, paddingTop: 14, borderTop: "1px solid #e2e8f0" }}>
                        <SEOEditor
                            seo={editingItem.seo || {}}
                            sourceTitle={editingItem.title}
                            onChange={(nextSeo) =>
                                setEditingItem((p) => ({
                                    ...p,
                                    slug: nextSeo.slug || p.slug,
                                    seo: nextSeo,
                                }))
                            }
                        />
                    </div>
                </ContentEditor>
            </div>
        );
    }

    const columns = [
        {
            key: "title",
            label: "News Story",
            render: (row) => (
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    {row.image ? (
                        <img src={resolveAssetUrl(row.image)} alt={row.title} className="admin-thumb" />
                    ) : (
                        <div className="admin-thumb" style={{ display: "grid", placeItems: "center", color: "#94a3b8" }}>
                            <Newspaper size={16} />
                        </div>
                    )}
                    <div>
                        <div style={{ fontWeight: 600, color: "#0f172a" }}>{row.title}</div>
                        <div style={{ fontSize: 12, color: "#64748b" }}>{row.category}</div>
                    </div>
                </div>
            ),
        },
        {
            key: "source",
            label: "Source & Date",
            render: (row) => (
                <div>
                    <div style={{ fontWeight: 500 }}>{row.source || "PPI News Desk"}</div>
                    <div style={{ fontSize: 12, color: "#64748b" }}>{row.publishDate || "—"}</div>
                </div>
            ),
        },
        {
            key: "status",
            label: "Status",
            render: (row) => <StatusBadge status={row.status || "Draft"} />,
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
                    <h1 className="admin-page-title">Real Estate News</h1>
                    <p className="admin-page-subtitle">
                        Publish Pune infrastructure updates, MahaRERA notices, and market news with live preview.
                    </p>
                </div>
                <div className="admin-page-actions">
                    <button type="button" className="admin-btn admin-btn--gold" onClick={openNew}>
                        <Plus size={16} /> Add News Story
                    </button>
                </div>
            </div>

            <DataTable
                columns={columns}
                rows={filtered}
                loading={loading}
                searchValue={search}
                onSearchChange={setSearch}
                searchPlaceholder="Search news headlines or categories..."
                emptyTitle="No news items found"
                emptyDescription="Publish a Pune real estate news story."
                emptyAction={
                    <button type="button" className="admin-btn admin-btn--primary" onClick={openNew}>
                        <Plus size={15} /> Add News Story
                    </button>
                }
            />

            <ConfirmModal
                open={Boolean(deleteTarget)}
                onClose={() => setDeleteTarget(null)}
                onConfirm={handleDelete}
                loading={deleting}
                title="Delete News Story"
                message={`Delete "${deleteTarget?.title}"?`}
                confirmText="Delete"
                confirmTone="danger"
            />
        </div>
    );
}

