"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Upload, Link as LinkIcon, Copy, Trash2, Image as ImageIcon, Film, FileText } from "lucide-react";
import { uploadService } from "../../../services/upload.service";
import { useToast } from "../../../context/ToastContext";
import AdminModal from "../common/AdminModal";
import ConfirmModal from "../common/ConfirmModal";
import EmptyState from "../common/EmptyState";
import { resolveAssetUrl } from "../content/ImageUploader";

const MEDIA_TABS = [
    { key: "all", label: "All Media" },
    { key: "image", label: "Images" },
    { key: "video", label: "Videos" },
    { key: "document", label: "Documents" },
];

export default function MediaLibrary() {
    const { showToast } = useToast();
    const fileInputRef = useRef(null);
    const [media, setMedia] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("all");
    const [search, setSearch] = useState("");
    const [uploading, setUploading] = useState(false);

    const [urlModalOpen, setUrlModalOpen] = useState(false);
    const [externalForm, setExternalForm] = useState({ name: "", url: "", type: "image" });
    const [deleteTarget, setDeleteTarget] = useState(null);

    const loadMedia = async () => {
        setLoading(true);
        try {
            const list = await uploadService.listMedia();
            setMedia(Array.isArray(list) ? list : []);
        } catch (err) {
            showToast(err.message || "Failed to load media library", "error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadMedia();
    }, []);

    const filtered = useMemo(() => {
        return media.filter((m) => {
            if (activeTab !== "all" && m.type !== activeTab) return false;
            if (search.trim()) {
                const q = search.toLowerCase();
                const hay = [m.name, m.url, m.type].filter(Boolean).join(" ").toLowerCase();
                if (!hay.includes(q)) return false;
            }
            return true;
        });
    }, [media, activeTab, search]);

    const handleFileUpload = async (e) => {
        const files = Array.from(e.target.files || []);
        if (files.length === 0) return;
        setUploading(true);
        try {
            const uploadedItems = [];
            for (const file of files) {
                const item = await uploadService.uploadFile(file);
                uploadedItems.push(item);
            }
            setMedia((prev) => [...uploadedItems, ...prev]);
            showToast(`Uploaded ${uploadedItems.length} file(s)`, "success");
        } catch (err) {
            showToast(err.message || "Upload failed", "error");
        } finally {
            setUploading(false);
            e.target.value = "";
        }
    };

    const handleAddExternal = async (e) => {
        e?.preventDefault();
        if (!externalForm.name.trim() || !externalForm.url.trim()) {
            showToast("Name and URL are required", "warning");
            return;
        }
        try {
            const item = await uploadService.addExternalMedia(externalForm);
            setMedia((prev) => [item, ...prev]);
            showToast("External media added", "success");
            setUrlModalOpen(false);
            setExternalForm({ name: "", url: "", type: "image" });
        } catch (err) {
            showToast(err.message || "Failed to add external media", "error");
        }
    };

    const handleCopyUrl = async (url) => {
        try {
            await navigator.clipboard.writeText(url);
            showToast("Asset URL copied to clipboard", "success");
        } catch {
            showToast("Could not copy URL automatically", "warning");
        }
    };

    const handleDelete = async () => {
        if (!deleteTarget) return;
        try {
            await uploadService.removeMedia(deleteTarget.id);
            setMedia((prev) => prev.filter((m) => String(m.id) !== String(deleteTarget.id)));
            showToast("Media item removed", "success");
            setDeleteTarget(null);
        } catch (err) {
            showToast(err.message || "Failed to delete media", "error");
        }
    };

    return (
        <div>
            <div className="admin-page-header">
                <div>
                    <h1 className="admin-page-title">Media Library</h1>
                    <p className="admin-page-subtitle">
                        Upload property photography, Gumlet/YouTube video embeds, developer logos, and RERA PDF brochures.
                    </p>
                </div>
                <div className="admin-page-actions">
                    <input
                        ref={fileInputRef}
                        type="file"
                        multiple
                        accept="image/*,video/*,.pdf,.doc,.docx"
                        style={{ display: "none" }}
                        onChange={handleFileUpload}
                    />
                    <button
                        type="button"
                        className="admin-btn admin-btn--outline"
                        onClick={() => setUrlModalOpen(true)}
                    >
                        <LinkIcon size={15} /> Add External URL
                    </button>
                    <button
                        type="button"
                        className="admin-btn admin-btn--gold"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={uploading}
                    >
                        <Upload size={15} /> {uploading ? "Uploading..." : "Upload Media"}
                    </button>
                </div>
            </div>

            <div className="admin-tabs">
                {MEDIA_TABS.map((tab) => (
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

            <div className="admin-card">
                <div className="admin-table-toolbar">
                    <input
                        className="admin-input"
                        style={{ maxWidth: 340 }}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search media assets by name or URL..."
                    />
                    <span style={{ fontSize: 12.5, color: "#64748b" }}>{filtered.length} asset(s)</span>
                </div>

                {loading ? (
                    <div className="admin-card__body" style={{ color: "#64748b" }}>Loading media assets...</div>
                ) : filtered.length === 0 ? (
                    <EmptyState
                        title="No media assets found"
                        description="Upload an image, video, or brochure PDF, or register an external URL."
                        action={
                            <button type="button" className="admin-btn admin-btn--primary" onClick={() => fileInputRef.current?.click()}>
                                <Upload size={14} /> Upload First Asset
                            </button>
                        }
                    />
                ) : (
                    <div
                        style={{
                            padding: 18,
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                            gap: 16,
                        }}
                    >
                        {filtered.map((item) => (
                            <div
                                key={item.id}
                                style={{
                                    border: "1px solid #e2e8f0",
                                    borderRadius: 12,
                                    overflow: "hidden",
                                    background: "#fff",
                                    display: "flex",
                                    flexDirection: "column",
                                }}
                            >
                                <div
                                    style={{
                                        height: 140,
                                        background: "#f1f5f9",
                                        display: "grid",
                                        placeItems: "center",
                                        overflow: "hidden",
                                    }}
                                >
                                    {item.type === "image" ? (
                                        <img
                                            src={resolveAssetUrl(item.url)}
                                            alt={item.name}
                                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                        />
                                    ) : item.type === "video" ? (
                                        <Film size={32} color="#64748b" />
                                    ) : (
                                        <FileText size={32} color="#a77a48" />
                                    )}
                                </div>

                                <div style={{ padding: 12, flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                                    <div>
                                        <div style={{ fontWeight: 600, fontSize: 13.5, color: "#0f172a", marginBottom: 4 }}>
                                            {item.name}
                                        </div>
                                        <div style={{ fontSize: 11.5, color: "#64748b", marginBottom: 10 }}>
                                            {item.type.toUpperCase()} • {item.size || "—"} • {item.uploadedAt || ""}
                                        </div>
                                    </div>

                                    <div style={{ display: "flex", gap: 6 }}>
                                        <button
                                            type="button"
                                            className="admin-btn admin-btn--outline admin-btn--sm"
                                            style={{ flex: 1 }}
                                            onClick={() => handleCopyUrl(item.url)}
                                        >
                                            <Copy size={12} /> Copy URL
                                        </button>
                                        <button
                                            type="button"
                                            className="admin-btn admin-btn--danger admin-btn--sm"
                                            onClick={() => setDeleteTarget(item)}
                                        >
                                            <Trash2 size={12} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <AdminModal
                open={urlModalOpen}
                onClose={() => setUrlModalOpen(false)}
                title="Add External Media URL"
                size="sm"
                footer={
                    <>
                        <button type="button" className="admin-btn admin-btn--outline" onClick={() => setUrlModalOpen(false)}>
                            Cancel
                        </button>
                        <button type="button" className="admin-btn admin-btn--gold" onClick={handleAddExternal}>
                            Add Asset
                        </button>
                    </>
                }
            >
                <form onSubmit={handleAddExternal}>
                    <div className="admin-field">
                        <label className="admin-label">Asset Name *</label>
                        <input
                            className="admin-input"
                            value={externalForm.name}
                            onChange={(e) => setExternalForm((p) => ({ ...p, name: e.target.value }))}
                            placeholder="e.g. Kharadi Walkthrough Reel"
                            required
                        />
                    </div>
                    <div className="admin-field">
                        <label className="admin-label">Media Type</label>
                        <select
                            className="admin-select"
                            value={externalForm.type}
                            onChange={(e) => setExternalForm((p) => ({ ...p, type: e.target.value }))}
                        >
                            <option value="image">Image</option>
                            <option value="video">Video</option>
                            <option value="document">Document (PDF)</option>
                        </select>
                    </div>
                    <div className="admin-field">
                        <label className="admin-label">Asset URL *</label>
                        <input
                            className="admin-input"
                            value={externalForm.url}
                            onChange={(e) => setExternalForm((p) => ({ ...p, url: e.target.value }))}
                            placeholder="https://..."
                            required
                        />
                    </div>
                </form>
            </AdminModal>

            <ConfirmModal
                open={Boolean(deleteTarget)}
                onClose={() => setDeleteTarget(null)}
                onConfirm={handleDelete}
                title="Delete Media Asset"
                message={`Remove "${deleteTarget?.name}" from the Media Library?`}
                confirmText="Delete Asset"
                confirmTone="danger"
            />
        </div>
    );
}

