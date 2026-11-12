"use client";

import { useEffect, useMemo, useState } from "react";
import { Plus, Pencil, Trash2, Star, Eye, X, FolderKanban, Flame, Sparkles } from "lucide-react";
import { projectService } from "../../../services/project.service";
import { developerService } from "../../../services/developer.service";
import { locationService } from "../../../services/location.service";
import { useToast } from "../../../context/ToastContext";
import DataTable from "../common/DataTable";
import StatusBadge from "../common/StatusBadge";
import AdminModal from "../common/AdminModal";
import ConfirmModal from "../common/ConfirmModal";
import ImageUploader, { resolveAssetUrl } from "../content/ImageUploader";
import RichTextEditor from "../content/RichTextEditor";
import LivePagePreview from "../preview/LivePagePreview";

const EMPTY_PROJECT = {
    name: "",
    developer: "",
    logo: "",
    location: "",
    price: "",
    propertyType: "Residential",
    configuration: "2, 3 BHK Apartment",
    subtitle: "",
    area: "950 - 1,650 sq.ft.",
    status: "New Launch",
    possession: "Dec 2027",
    reraId: "",
    image: "",
    images: [],
    floorPlans: [],
    brochureUrl: "",
    badge: "Featured",
    publicationStatus: "Published",
    featured: true,
    trending: false,
    newLaunch: true,
    description: "",
    amenities: ["Clubhouse", "Swimming Pool", "24x7 Security"],
};

const PROJECT_TABS = [
    { key: "all", label: "All Projects" },
    { key: "featured", label: "Featured" },
    { key: "new-launch", label: "New Launches" },
    { key: "trending", label: "Trending" },
];

export default function ProjectsManager() {
    const { showToast } = useToast();
    const [items, setItems] = useState([]);
    const [developers, setDevelopers] = useState([]);
    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("all");
    const [search, setSearch] = useState("");

    const [modalOpen, setModalOpen] = useState(false);
    const [showPreviewPane, setShowPreviewPane] = useState(true);
    const [editingId, setEditingId] = useState(null);
    const [form, setForm] = useState(EMPTY_PROJECT);
    const [amenityInput, setAmenityInput] = useState("");
    const [galleryInput, setGalleryInput] = useState("");
    const [saving, setSaving] = useState(false);

    const [deleteTarget, setDeleteTarget] = useState(null);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        async function loadAll() {
            setLoading(true);
            try {
                const [projList, devList, locList] = await Promise.all([
                    projectService.list(),
                    developerService.list(),
                    locationService.list(),
                ]);
                setItems(Array.isArray(projList) ? projList : []);
                setDevelopers(Array.isArray(devList) ? devList : []);
                setLocations(Array.isArray(locList) ? locList : []);
            } catch (err) {
                showToast(err.message || "Failed to load projects", "error");
            } finally {
                setLoading(false);
            }
        }
        loadAll();
    }, []);

    const filteredItems = useMemo(() => {
        return items.filter((item) => {
            const isNewLaunch =
                item.newLaunch ||
                (item.status || "").toLowerCase().includes("new") ||
                (item.badge || "").toLowerCase().includes("new");
            const isFeatured = item.featured ?? (item.badge || "").toLowerCase() === "featured";
            const isTrending = item.trending || (item.badge || "").toLowerCase().includes("trend");

            if (activeTab === "featured" && !isFeatured) return false;
            if (activeTab === "new-launch" && !isNewLaunch) return false;
            if (activeTab === "trending" && !isTrending) return false;

            if (search.trim()) {
                const q = search.toLowerCase();
                const hay = [item.name, item.developer, item.location, item.configuration]
                    .filter(Boolean)
                    .join(" ")
                    .toLowerCase();
                if (!hay.includes(q)) return false;
            }
            return true;
        });
    }, [items, activeTab, search]);

    const openCreateModal = () => {
        setEditingId(null);
        setForm({
            ...EMPTY_PROJECT,
            developer: developers[0]?.name || "",
            logo: developers[0]?.logo || "",
            location: locations[0]?.name ? `${locations[0].name}, Pune` : "Kharadi, Pune",
        });
        setAmenityInput("");
        setGalleryInput("");
        setModalOpen(true);
    };

    const openEditModal = (item) => {
        setEditingId(item.id);
        setForm({
            ...EMPTY_PROJECT,
            ...item,
            images: Array.isArray(item.images) ? item.images : item.image ? [item.image] : [],
            floorPlans: Array.isArray(item.floorPlans) ? item.floorPlans : [],
            amenities: Array.isArray(item.amenities) ? item.amenities : [],
            publicationStatus: item.publicationStatus || "Published",
            featured: item.featured ?? (item.badge || "").toLowerCase() === "featured",
            newLaunch: item.newLaunch ?? (item.status || "").toLowerCase().includes("new"),
            trending: Boolean(item.trending),
        });
        setAmenityInput("");
        setGalleryInput("");
        setModalOpen(true);
    };

    const handleField = (key, value) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    const handleDeveloperChange = (devName) => {
        const match = developers.find((d) => d.name === devName);
        setForm((prev) => ({
            ...prev,
            developer: devName,
            logo: match?.logo || prev.logo,
            domain: match?.domain || prev.domain,
        }));
    };

    const addAmenity = () => {
        const val = amenityInput.trim();
        if (!val) return;
        if (!form.amenities.includes(val)) {
            handleField("amenities", [...form.amenities, val]);
        }
        setAmenityInput("");
    };

    const removeAmenity = (idx) => {
        handleField("amenities", form.amenities.filter((_, i) => i !== idx));
    };

    const addGalleryImage = () => {
        const val = galleryInput.trim();
        if (!val) return;
        if (!form.images.includes(val)) {
            const next = [...form.images, val];
            handleField("images", next);
            if (!form.image) handleField("image", val);
        }
        setGalleryInput("");
    };

    const removeGalleryImage = (idx) => {
        const next = form.images.filter((_, i) => i !== idx);
        handleField("images", next);
    };

    const handleSave = async (e) => {
        e?.preventDefault();
        if (!form.name.trim()) {
            showToast("Project name is required", "warning");
            return;
        }
        setSaving(true);
        try {
            const payload = {
                ...form,
                subtitle: form.subtitle || `${form.configuration}, ${form.location}`,
                badge: form.featured ? "Featured" : form.newLaunch ? "New Launch" : form.trending ? "Trending" : "",
                images: form.images.length > 0 ? form.images : form.image ? [form.image] : [],
            };
            if (editingId) {
                const updated = await projectService.update(editingId, payload);
                setItems((prev) => prev.map((it) => (String(it.id) === String(editingId) ? updated : it)));
                showToast("Project updated", "success");
            } else {
                const created = await projectService.create(payload);
                setItems((prev) => [created, ...prev]);
                showToast("Project created", "success");
            }
            setModalOpen(false);
        } catch (err) {
            showToast(err.message || "Failed to save project", "error");
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async () => {
        if (!deleteTarget) return;
        setDeleting(true);
        try {
            await projectService.remove(deleteTarget.id);
            setItems((prev) => prev.filter((it) => String(it.id) !== String(deleteTarget.id)));
            showToast("Project deleted", "success");
            setDeleteTarget(null);
        } catch (err) {
            showToast(err.message || "Failed to delete project", "error");
        } finally {
            setDeleting(false);
        }
    };

    const columns = [
        {
            key: "name",
            label: "Project",
            render: (row) => (
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    {row.image ? (
                        <img src={resolveAssetUrl(row.image)} alt={row.name} className="admin-thumb" />
                    ) : (
                        <div className="admin-thumb" style={{ display: "grid", placeItems: "center", color: "#94a3b8" }}>
                            <FolderKanban size={16} />
                        </div>
                    )}
                    <div>
                        <div style={{ fontWeight: 600, color: "#0f172a" }}>{row.name}</div>
                        <div style={{ fontSize: 12, color: "#64748b" }}>{row.developer}</div>
                    </div>
                </div>
            ),
        },
        {
            key: "location",
            label: "Location & Config",
            render: (row) => (
                <div>
                    <div style={{ fontWeight: 500 }}>{row.location}</div>
                    <div style={{ fontSize: 12, color: "#64748b" }}>
                        {row.configuration} • {row.area}
                    </div>
                </div>
            ),
        },
        {
            key: "price",
            label: "Pricing",
            render: (row) => (
                <div>
                    <div style={{ fontWeight: 700, color: "#0f172a" }}>{row.price}</div>
                    <div style={{ fontSize: 11.5, color: "#64748b" }}>{row.status || "New Launch"}</div>
                </div>
            ),
        },
        {
            key: "flags",
            label: "Highlights",
            render: (row) => (
                <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                    <StatusBadge status={row.publicationStatus || "Published"} />
                    {(row.featured || row.badge === "Featured") && (
                        <span className="admin-badge admin-badge--amber">
                            <Star size={11} fill="currentColor" /> Featured
                        </span>
                    )}
                    {row.newLaunch && (
                        <span className="admin-badge admin-badge--blue">
                            <Sparkles size={11} /> New Launch
                        </span>
                    )}
                    {row.trending && (
                        <span className="admin-badge admin-badge--red">
                            <Flame size={11} /> Trending
                        </span>
                    )}
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
                        onClick={() => openEditModal(row)}
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
                    <h1 className="admin-page-title">Project Management</h1>
                    <p className="admin-page-subtitle">
                        Manage developer townships, new launches, trending projects, brochures, and live card previews.
                    </p>
                </div>
                <div className="admin-page-actions">
                    <button type="button" className="admin-btn admin-btn--gold" onClick={openCreateModal}>
                        <Plus size={16} /> Add Project
                    </button>
                </div>
            </div>

            <div className="admin-tabs">
                {PROJECT_TABS.map((tab) => (
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
                rows={filteredItems}
                loading={loading}
                searchValue={search}
                onSearchChange={setSearch}
                searchPlaceholder="Search projects by name, developer, location..."
                emptyTitle="No projects match this filter"
                emptyDescription="Add a new project or switch tabs to see all developer projects."
                emptyAction={
                    <button type="button" className="admin-btn admin-btn--primary" onClick={openCreateModal}>
                        <Plus size={15} /> Add Project
                    </button>
                }
            />

            <AdminModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                title={editingId ? `Edit Project: ${form.name}` : "Add New Project"}
                size="xl"
                footer={
                    <>
                        <button
                            type="button"
                            className="admin-btn admin-btn--outline"
                            onClick={() => setShowPreviewPane((s) => !s)}
                        >
                            <Eye size={14} /> {showPreviewPane ? "Hide Live Preview" : "Show Live Preview"}
                        </button>
                        <button
                            type="button"
                            className="admin-btn admin-btn--outline"
                            onClick={() => setModalOpen(false)}
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            className="admin-btn admin-btn--gold"
                            onClick={handleSave}
                            disabled={saving}
                        >
                            {saving ? "Saving..." : editingId ? "Save Changes" : "Create Project"}
                        </button>
                    </>
                }
            >
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: showPreviewPane ? "1.1fr 0.9fr" : "1fr",
                        gap: 20,
                        alignItems: "start",
                    }}
                >
                    <form onSubmit={handleSave}>
                        <div className="admin-form-grid">
                            <div className="admin-field admin-field--full">
                                <label className="admin-label">Project Name *</label>
                                <input
                                    className="admin-input"
                                    value={form.name}
                                    onChange={(e) => handleField("name", e.target.value)}
                                    placeholder="e.g. Godrej Evergreen"
                                    required
                                />
                            </div>

                            <div className="admin-field">
                                <label className="admin-label">Developer</label>
                                <select
                                    className="admin-select"
                                    value={form.developer}
                                    onChange={(e) => handleDeveloperChange(e.target.value)}
                                >
                                    <option value="">Select Developer</option>
                                    {developers.map((dev) => (
                                        <option key={dev.id} value={dev.name}>
                                            {dev.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="admin-field">
                                <label className="admin-label">Location</label>
                                <input
                                    className="admin-input"
                                    list="ppi-location-suggestions"
                                    value={form.location}
                                    onChange={(e) => handleField("location", e.target.value)}
                                    placeholder="e.g. Hinjewadi Phase 1, Pune"
                                />
                                <datalist id="ppi-location-suggestions">
                                    {locations.map((loc) => (
                                        <option key={loc.id} value={`${loc.name}, ${loc.city || "Pune"}`} />
                                    ))}
                                </datalist>
                            </div>

                            <div className="admin-field">
                                <label className="admin-label">Price Range</label>
                                <input
                                    className="admin-input"
                                    value={form.price}
                                    onChange={(e) => handleField("price", e.target.value)}
                                    placeholder="e.g. ₹ 1.28 - 2.80 Cr"
                                />
                            </div>

                            <div className="admin-field">
                                <label className="admin-label">Configuration</label>
                                <input
                                    className="admin-input"
                                    value={form.configuration}
                                    onChange={(e) => handleField("configuration", e.target.value)}
                                    placeholder="2, 3 & 4 BHK Residences"
                                />
                            </div>

                            <div className="admin-field">
                                <label className="admin-label">Area Range</label>
                                <input
                                    className="admin-input"
                                    value={form.area}
                                    onChange={(e) => handleField("area", e.target.value)}
                                    placeholder="850 - 1,850 sq.ft."
                                />
                            </div>

                            <div className="admin-field">
                                <label className="admin-label">Project Status</label>
                                <select
                                    className="admin-select"
                                    value={form.status}
                                    onChange={(e) => handleField("status", e.target.value)}
                                >
                                    <option value="New Launch">New Launch</option>
                                    <option value="Under Construction">Under Construction</option>
                                    <option value="Ready to Move">Ready to Move</option>
                                </select>
                            </div>

                            <div className="admin-field">
                                <label className="admin-label">Possession Timeline</label>
                                <input
                                    className="admin-input"
                                    value={form.possession}
                                    onChange={(e) => handleField("possession", e.target.value)}
                                    placeholder="Dec 2027 or Ready"
                                />
                            </div>

                            <div className="admin-field">
                                <label className="admin-label">RERA ID</label>
                                <input
                                    className="admin-input"
                                    value={form.reraId}
                                    onChange={(e) => handleField("reraId", e.target.value)}
                                    placeholder="P521000..."
                                />
                            </div>

                            <div className="admin-field">
                                <label className="admin-label">Publication Status</label>
                                <select
                                    className="admin-select"
                                    value={form.publicationStatus}
                                    onChange={(e) => handleField("publicationStatus", e.target.value)}
                                >
                                    <option value="Published">Published</option>
                                    <option value="Draft">Draft</option>
                                </select>
                            </div>

                            <div className="admin-field">
                                <label className="admin-label">Brochure PDF URL</label>
                                <input
                                    className="admin-input"
                                    value={form.brochureUrl}
                                    onChange={(e) => handleField("brochureUrl", e.target.value)}
                                    placeholder="https://.../brochure.pdf"
                                />
                            </div>
                        </div>

                        <div style={{ display: "flex", flexWrap: "wrap", gap: 18, margin: "4px 0 16px" }}>
                            <label style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 13, fontWeight: 600 }}>
                                <input
                                    type="checkbox"
                                    checked={Boolean(form.featured)}
                                    onChange={(e) => handleField("featured", e.target.checked)}
                                />
                                Featured Project
                            </label>
                            <label style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 13, fontWeight: 600 }}>
                                <input
                                    type="checkbox"
                                    checked={Boolean(form.newLaunch)}
                                    onChange={(e) => handleField("newLaunch", e.target.checked)}
                                />
                                New Launch
                            </label>
                            <label style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 13, fontWeight: 600 }}>
                                <input
                                    type="checkbox"
                                    checked={Boolean(form.trending)}
                                    onChange={(e) => handleField("trending", e.target.checked)}
                                />
                                Trending Project
                            </label>
                        </div>

                        <ImageUploader
                            label="Project Hero / Card Image"
                            value={form.image}
                            onChange={(val) => handleField("image", val)}
                        />

                        <div className="admin-field">
                            <label className="admin-label">Gallery Images</label>
                            <div style={{ display: "flex", gap: 8 }}>
                                <input
                                    className="admin-input"
                                    value={galleryInput}
                                    onChange={(e) => setGalleryInput(e.target.value)}
                                    placeholder="Paste image URL"
                                />
                                <button type="button" className="admin-btn admin-btn--outline" onClick={addGalleryImage}>
                                    Add
                                </button>
                            </div>
                            {form.images.length > 0 && (
                                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 8 }}>
                                    {form.images.map((imgUrl, idx) => (
                                        <div
                                            key={idx}
                                            style={{
                                                position: "relative",
                                                width: 68,
                                                height: 52,
                                                borderRadius: 8,
                                                overflow: "hidden",
                                                border: "1px solid #cbd5e1",
                                            }}
                                        >
                                            <img
                                                src={resolveAssetUrl(imgUrl)}
                                                alt={`Project ${idx + 1}`}
                                                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removeGalleryImage(idx)}
                                                style={{
                                                    position: "absolute",
                                                    top: 2,
                                                    right: 2,
                                                    width: 18,
                                                    height: 18,
                                                    borderRadius: "50%",
                                                    background: "rgba(15,23,42,0.8)",
                                                    color: "#fff",
                                                    border: "none",
                                                    display: "grid",
                                                    placeItems: "center",
                                                    cursor: "pointer",
                                                }}
                                            >
                                                <X size={11} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="admin-field">
                            <label className="admin-label">Highlights &amp; Amenities</label>
                            <div style={{ display: "flex", gap: 8 }}>
                                <input
                                    className="admin-input"
                                    value={amenityInput}
                                    onChange={(e) => setAmenityInput(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            e.preventDefault();
                                            addAmenity();
                                        }
                                    }}
                                    placeholder="e.g. Olympic Infinity Pool"
                                />
                                <button type="button" className="admin-btn admin-btn--outline" onClick={addAmenity}>
                                    Add
                                </button>
                            </div>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 }}>
                                {form.amenities.map((am, idx) => (
                                    <span
                                        key={idx}
                                        className="admin-badge admin-badge--slate"
                                        style={{ cursor: "pointer" }}
                                        onClick={() => removeAmenity(idx)}
                                    >
                                        {am} <X size={11} />
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="admin-field">
                            <label className="admin-label">Project Description</label>
                            <RichTextEditor
                                value={form.description}
                                onChange={(val) => handleField("description", val)}
                                placeholder="Describe architecture, connectivity, and investment appeal..."
                            />
                        </div>
                    </form>

                    {showPreviewPane && (
                        <div style={{ position: "sticky", top: 0 }}>
                            <LivePagePreview
                                mode="project"
                                payload={form}
                                previewOnly={false}
                                title="Project Live Preview"
                            />
                        </div>
                    )}
                </div>
            </AdminModal>

            <ConfirmModal
                open={Boolean(deleteTarget)}
                onClose={() => setDeleteTarget(null)}
                onConfirm={handleDelete}
                loading={deleting}
                title="Delete Project"
                message={`Are you sure you want to delete "${deleteTarget?.name}"?`}
                confirmText="Delete Project"
                confirmTone="danger"
            />
        </div>
    );
}

