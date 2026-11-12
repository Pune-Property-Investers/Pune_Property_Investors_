"use client";

import { useEffect, useMemo, useState } from "react";
import { Plus, Pencil, Trash2, ArrowLeft, BookOpen } from "lucide-react";
import { articleService } from "../../../services/article.service";
import { useToast } from "../../../context/ToastContext";
import DataTable from "../common/DataTable";
import StatusBadge from "../common/StatusBadge";
import ConfirmModal from "../common/ConfirmModal";
import ContentEditor from "./ContentEditor";
import ImageUploader, { resolveAssetUrl } from "./ImageUploader";
import RichTextEditor from "./RichTextEditor";
import SEOEditor, { slugifyText } from "./SEOEditor";

const EMPTY_ARTICLE = {
    type: "blog",
    title: "",
    slug: "",
    category: "Market Insights",
    author: "Pune Property Research Team",
    image: "",
    excerpt: "",
    content: "<p>Write your article content here...</p>",
    status: "Draft",
    publishDate: new Date().toISOString().slice(0, 10),
    seo: { title: "", description: "", slug: "" },
};

const ARTICLE_TABS = [
    { key: "all", label: "All Blogs & Magazine" },
    { key: "blog", label: "Blogs" },
    { key: "magazine", label: "Magazine" },
    { key: "draft", label: "Drafts" },
];

export default function ArticlesManager() {
    const { showToast } = useToast();
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("all");
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
                const data = await articleService.list();
                setArticles(Array.isArray(data) ? data : []);
            } catch (err) {
                showToast(err.message || "Failed to load articles", "error");
            } finally {
                setLoading(false);
            }
        }
        load();
    }, []);

    const filtered = useMemo(() => {
        return articles.filter((a) => {
            if (activeTab === "blog" && a.type !== "blog") return false;
            if (activeTab === "magazine" && a.type !== "magazine") return false;
            if (activeTab === "draft" && a.status !== "Draft") return false;
            if (search.trim()) {
                const q = search.toLowerCase();
                const hay = [a.title, a.category, a.author, a.excerpt].filter(Boolean).join(" ").toLowerCase();
                if (!hay.includes(q)) return false;
            }
            return true;
        });
    }, [articles, activeTab, search]);

    const openNew = () => {
        const fresh = { ...EMPTY_ARTICLE, id: null };
        setEditingItem(fresh);
        setOriginalItem(fresh);
    };

    const openEdit = (item) => {
        const cloned = {
            ...EMPTY_ARTICLE,
            ...item,
            seo: item.seo || { title: item.title, description: item.excerpt || "", slug: item.slug || "" },
        };
        setEditingItem(cloned);
        setOriginalItem(cloned);
    };

    const isDirty = useMemo(() => {
        if (!editingItem || !originalItem) return false;
        return JSON.stringify(editingItem) !== JSON.stringify(originalItem);
    }, [editingItem, originalItem]);

    const persistArticle = async (targetStatus) => {
        if (!editingItem?.title?.trim()) {
            showToast("Article title is required", "warning");
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
                saved = await articleService.update(editingItem.id, payload);
                setArticles((prev) => prev.map((a) => (String(a.id) === String(editingItem.id) ? saved : a)));
            } else {
                saved = await articleService.create(payload);
                setArticles((prev) => [saved, ...prev]);
            }
            setEditingItem(saved);
            setOriginalItem(saved);
            showToast(isPublish ? "Article published" : "Draft saved", "success");
        } catch (err) {
            showToast(err.message || "Failed to save article", "error");
        } finally {
            setSaving(false);
            setPublishing(false);
        }
    };

    const handleDelete = async () => {
        if (!deleteTarget) return;
        setDeleting(true);
        try {
            await articleService.remove(deleteTarget.id);
            setArticles((prev) => prev.filter((a) => String(a.id) !== String(deleteTarget.id)));
            showToast("Article deleted", "success");
            setDeleteTarget(null);
        } catch (err) {
            showToast(err.message || "Failed to delete article", "error");
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
                        <ArrowLeft size={14} /> Back to Blogs &amp; Magazine
                    </button>
                </div>

                <ContentEditor
                    title={editingItem.id ? `Edit: ${editingItem.title || "Article"}` : "Create New Blog / Magazine Issue"}
                    subtitle="Edit copy, cover image, and SEO metadata with instant live article preview."
                    previewMode="article"
                    previewPayload={editingItem}
                    isDirty={isDirty}
                    hasUnpublishedChanges={editingItem.status !== "Published"}
                    status={editingItem.status || "Draft"}
                    updatedAt={editingItem.updatedAt}
                    saving={saving}
                    publishing={publishing}
                    onSaveDraft={() => persistArticle("Draft")}
                    onDiscard={() => setEditingItem(originalItem)}
                    onPublish={() => persistArticle("Published")}
                >
                    <div className="admin-field">
                        <label className="admin-label">Headline / Title *</label>
                        <input
                            className="admin-input"
                            value={editingItem.title}
                            onChange={(e) => setEditingItem((p) => ({ ...p, title: e.target.value }))}
                            placeholder="e.g. Top 7 High-Growth Localities in Pune"
                        />
                    </div>

                    <div className="admin-form-grid">
                        <div className="admin-field">
                            <label className="admin-label">Publication Type</label>
                            <select
                                className="admin-select"
                                value={editingItem.type}
                                onChange={(e) => setEditingItem((p) => ({ ...p, type: e.target.value }))}
                            >
                                <option value="blog">Blog Article</option>
                                <option value="magazine">Magazine Feature</option>
                            </select>
                        </div>

                        <div className="admin-field">
                            <label className="admin-label">Category</label>
                            <input
                                className="admin-input"
                                value={editingItem.category}
                                onChange={(e) => setEditingItem((p) => ({ ...p, category: e.target.value }))}
                                placeholder="Locality Guide, Buying Guide..."
                            />
                        </div>

                        <div className="admin-field">
                            <label className="admin-label">Author</label>
                            <input
                                className="admin-input"
                                value={editingItem.author}
                                onChange={(e) => setEditingItem((p) => ({ ...p, author: e.target.value }))}
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
                        label="Cover Image"
                        value={editingItem.image}
                        onChange={(val) => setEditingItem((p) => ({ ...p, image: val }))}
                    />

                    <div className="admin-field">
                        <label className="admin-label">Summary / Excerpt</label>
                        <textarea
                            className="admin-textarea"
                            value={editingItem.excerpt}
                            onChange={(e) => setEditingItem((p) => ({ ...p, excerpt: e.target.value }))}
                            placeholder="Short teaser shown in blog cards and article header..."
                        />
                    </div>

                    <div className="admin-field">
                        <label className="admin-label">Article Body</label>
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
            label: "Article",
            render: (row) => (
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    {row.image ? (
                        <img src={resolveAssetUrl(row.image)} alt={row.title} className="admin-thumb" />
                    ) : (
                        <div className="admin-thumb" style={{ display: "grid", placeItems: "center", color: "#94a3b8" }}>
                            <BookOpen size={16} />
                        </div>
                    )}
                    <div>
                        <div style={{ fontWeight: 600, color: "#0f172a" }}>{row.title}</div>
                        <div style={{ fontSize: 12, color: "#64748b" }}>
                            {row.type === "magazine" ? "Magazine" : "Blog"} • {row.category}
                        </div>
                    </div>
                </div>
            ),
        },
        {
            key: "author",
            label: "Author & Date",
            render: (row) => (
                <div>
                    <div style={{ fontWeight: 500 }}>{row.author || "PPI Editorial"}</div>
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
                    <h1 className="admin-page-title">Blogs &amp; Magazine</h1>
                    <p className="admin-page-subtitle">
                        Author market guides, buying checklists, and quarterly Pune property magazine issues with live preview.
                    </p>
                </div>
                <div className="admin-page-actions">
                    <button type="button" className="admin-btn admin-btn--gold" onClick={openNew}>
                        <Plus size={16} /> New Article
                    </button>
                </div>
            </div>

            <div className="admin-tabs">
                {ARTICLE_TABS.map((tab) => (
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
                rows={filtered}
                loading={loading}
                searchValue={search}
                onSearchChange={setSearch}
                searchPlaceholder="Search blogs & magazine issues..."
                emptyTitle="No articles found"
                emptyDescription="Create your first blog post or magazine issue."
                emptyAction={
                    <button type="button" className="admin-btn admin-btn--primary" onClick={openNew}>
                        <Plus size={15} /> Create Article
                    </button>
                }
            />

            <ConfirmModal
                open={Boolean(deleteTarget)}
                onClose={() => setDeleteTarget(null)}
                onConfirm={handleDelete}
                loading={deleting}
                title="Delete Article"
                message={`Delete "${deleteTarget?.title}"?`}
                confirmText="Delete"
                confirmTone="danger"
            />
        </div>
    );
}

