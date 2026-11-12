"use client";

import { useEffect, useMemo, useState } from "react";
import { Plus, Pencil, Trash2, Star, Eye, X, Building2 } from "lucide-react";
import { propertyService } from "../../../services/property.service";
import { useToast } from "../../../context/ToastContext";
import DataTable from "../common/DataTable";
import StatusBadge from "../common/StatusBadge";
import AdminModal from "../common/AdminModal";
import ConfirmModal from "../common/ConfirmModal";
import SectionSyncBar from "../common/SectionSyncBar";
import ImageUploader, { resolveAssetUrl } from "../content/ImageUploader";
import RichTextEditor from "../content/RichTextEditor";
import LivePagePreview from "../preview/LivePagePreview";

const EMPTY_PROPERTY = {
    title: "",
    projectName: "",
    location: "Kharadi, Pune",
    locality: "Kharadi",
    city: "Pune",
    propertyType: "Apartment",
    purpose: "Buy",
    bhk: 2,
    bedrooms: 2,
    bathrooms: 2,
    area: 950,
    areaUnit: "sq.ft.",
    price: 8500000,
    priceLabel: "₹85 Lakh",
    possession: "Ready to Move",
    furnishing: "Semi-Furnished",
    reraId: "",
    featured: false,
    verified: true,
    status: "Published",
    image: "",
    images: [],
    floorPlans: [],
    amenities: ["Parking", "Lift", "Security"],
    description: "",
};

const PURPOSE_TABS = [
    { key: "all", label: "All Properties" },
    { key: "Buy", label: "Buy" },
    { key: "Rent", label: "Rent" },
    { key: "Commercial", label: "Commercial" },
    { key: "featured", label: "Featured" },
    { key: "draft", label: "Drafts" },
];

export default function PropertiesManager() {
    const { showToast } = useToast();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("all");
    const [search, setSearch] = useState("");

    const [modalOpen, setModalOpen] = useState(false);
    const [showPreviewPane, setShowPreviewPane] = useState(true);
    const [editingId, setEditingId] = useState(null);
    const [form, setForm] = useState(EMPTY_PROPERTY);
    const [amenityInput, setAmenityInput] = useState("");
    const [galleryInput, setGalleryInput] = useState("");
    const [saving, setSaving] = useState(false);

    const [deleteTarget, setDeleteTarget] = useState(null);
    const [deleting, setDeleting] = useState(false);

    const loadProperties = async () => {
        setLoading(true);
        try {
            const data = await propertyService.list();
            setItems(Array.isArray(data) ? data : []);
        } catch (err) {
            showToast(err.message || "Failed to load properties", "error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadProperties();
    }, []);

    const filteredItems = useMemo(() => {
        return items.filter((item) => {
            if (activeTab === "Buy" && item.purpose !== "Buy") return false;
            if (activeTab === "Rent" && item.purpose !== "Rent") return false;
            if (activeTab === "Commercial" && item.purpose !== "Commercial" && item.propertyType !== "Commercial") return false;
            if (activeTab === "featured" && !item.featured) return false;
            if (activeTab === "draft" && (item.status || "Published") !== "Draft") return false;

            if (search.trim()) {
                const q = search.toLowerCase();
                const hay = [item.title, item.projectName, item.location, item.locality, item.propertyType]
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
        setForm({ ...EMPTY_PROPERTY });
        setAmenityInput("");
        setGalleryInput("");
        setModalOpen(true);
    };

    const openEditModal = (item) => {
        setEditingId(item.id);
        setForm({
            ...EMPTY_PROPERTY,
            ...item,
            images: Array.isArray(item.images) ? item.images : item.image ? [item.image] : [],
            floorPlans: Array.isArray(item.floorPlans) ? item.floorPlans : [],
            amenities: Array.isArray(item.amenities) ? item.amenities : [],
            status: item.status || "Published",
        });
        setAmenityInput("");
        setGalleryInput("");
        setModalOpen(true);
    };

    const handleField = (key, value) => {
        setForm((prev) => ({ ...prev, [key]: value }));
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
        handleField(
            "amenities",
            form.amenities.filter((_, i) => i !== idx)
        );
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
        if (form.image === form.images[idx]) {
            handleField("image", next[0] || "");
        }
    };

    const addFloorPlan = () => {
        handleField("floorPlans", [
            ...form.floorPlans,
            { label: `${form.bhk || 2} BHK Layout`, area: `${form.area || 950} sq.ft.`, image: "" },
        ]);
    };

    const updateFloorPlan = (idx, key, val) => {
        const next = form.floorPlans.map((fp, i) => (i === idx ? { ...fp, [key]: val } : fp));
        handleField("floorPlans", next);
    };

    const removeFloorPlan = (idx) => {
        handleField(
            "floorPlans",
            form.floorPlans.filter((_, i) => i !== idx)
        );
    };

    const handleSave = async (e) => {
        e?.preventDefault();
        if (!form.title.trim()) {
            showToast("Property title is required", "warning");
            return;
        }
        setSaving(true);
        try {
            const payload = {
                ...form,
                bhk: Number(form.bhk) || 0,
                bedrooms: Number(form.bedrooms) || Number(form.bhk) || 0,
                bathrooms: Number(form.bathrooms) || 1,
                area: Number(form.area) || 0,
                price: Number(form.price) || 0,
                images: form.images.length > 0 ? form.images : form.image ? [form.image] : [],
            };
            if (editingId) {
                const updated = await propertyService.update(editingId, payload);
                setItems((prev) => prev.map((it) => (String(it.id) === String(editingId) ? updated : it)));
                showToast("Property updated successfully", "success");
            } else {
                const created = await propertyService.create(payload);
                setItems((prev) => [created, ...prev]);
                showToast("Property created successfully", "success");
            }
            setModalOpen(false);
        } catch (err) {
            showToast(err.message || "Failed to save property", "error");
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async () => {
        if (!deleteTarget) return;
        setDeleting(true);
        try {
            await propertyService.remove(deleteTarget.id);
            setItems((prev) => prev.filter((it) => String(it.id) !== String(deleteTarget.id)));
            showToast("Property deleted", "success");
            setDeleteTarget(null);
        } catch (err) {
            showToast(err.message || "Failed to delete property", "error");
        } finally {
            setDeleting(false);
        }
    };

    const columns = [
        {
            key: "title",
            label: "Property",
            render: (row) => (
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    {row.image ? (
                        <img src={resolveAssetUrl(row.image)} alt={row.title} className="admin-thumb" />
                    ) : (
                        <div className="admin-thumb" style={{ display: "grid", placeItems: "center", color: "#94a3b8" }}>
                            <Building2 size={16} />
                        </div>
                    )}
                    <div>
                        <div style={{ fontWeight: 600, color: "#0f172a" }}>{row.title}</div>
                        <div style={{ fontSize: 12, color: "#64748b" }}>
                            {row.projectName || "Independent"} • {row.purpose || "Buy"}
                        </div>
                    </div>
                </div>
            ),
        },
        {
            key: "location",
            label: "Location & Type",
            render: (row) => (
                <div>
                    <div style={{ fontWeight: 500 }}>{row.location || `${row.locality || ""}, ${row.city || "Pune"}`}</div>
                    <div style={{ fontSize: 12, color: "#64748b" }}>
                        {row.propertyType} • {row.bhk ? `${row.bhk} BHK` : "Custom"} • {row.area} {row.areaUnit || "sq.ft."}
                    </div>
                </div>
            ),
        },
        {
            key: "priceLabel",
            label: "Price",
            render: (row) => (
                <div>
                    <div style={{ fontWeight: 700, color: "#0f172a" }}>{row.priceLabel || `₹${row.price}`}</div>
                    <div style={{ fontSize: 11.5, color: "#64748b" }}>{row.possession || "Ready to Move"}</div>
                </div>
            ),
        },
        {
            key: "status",
            label: "Status",
            render: (row) => (
                <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                    <StatusBadge status={row.status || "Published"} />
                    {row.featured && (
                        <span className="admin-badge admin-badge--amber">
                            <Star size={11} fill="currentColor" /> Featured
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
                        title="Edit & Live Preview"
                    >
                        <Pencil size={13} /> Edit
                    </button>
                    <button
                        type="button"
                        className="admin-btn admin-btn--danger admin-btn--sm"
                        onClick={() => setDeleteTarget(row)}
                        title="Delete property"
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
                    <h1 className="admin-page-title">Property Management</h1>
                    <p className="admin-page-subtitle">
                        Manage buy, rent, and commercial listings with gallery images, floor plans, and live card preview.
                    </p>
                </div>
                <div className="admin-page-actions">
                    <SectionSyncBar sectionKey="properties" label="Properties" onRetrieved={loadProperties} />
                    <button type="button" className="admin-btn admin-btn--gold" onClick={openCreateModal}>
                        <Plus size={16} /> Add Property
                    </button>
                </div>
            </div>

            <div className="admin-tabs">
                {PURPOSE_TABS.map((tab) => (
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
                searchPlaceholder="Search properties by title, project, locality..."
                emptyTitle="No properties found"
                emptyDescription="Try clearing your filter or add a new property listing."
                emptyAction={
                    <button type="button" className="admin-btn admin-btn--primary" onClick={openCreateModal}>
                        <Plus size={15} /> Add First Property
                    </button>
                }
            />

            <AdminModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                title={editingId ? `Edit Property: ${form.title}` : "Add New Property"}
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
                            {saving ? "Saving..." : editingId ? "Save Changes" : "Create Property"}
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
                                <label className="admin-label">Property Title *</label>
                                <input
                                    className="admin-input"
                                    value={form.title}
                                    onChange={(e) => handleField("title", e.target.value)}
                                    placeholder="e.g. Premium 3 BHK Apartment in Kharadi"
                                    required
                                />
                            </div>

                            <div className="admin-field">
                                <label className="admin-label">Project / Society Name</label>
                                <input
                                    className="admin-input"
                                    value={form.projectName}
                                    onChange={(e) => handleField("projectName", e.target.value)}
                                    placeholder="e.g. Godrej Evergreen"
                                />
                            </div>

                            <div className="admin-field">
                                <label className="admin-label">Purpose</label>
                                <select
                                    className="admin-select"
                                    value={form.purpose}
                                    onChange={(e) => handleField("purpose", e.target.value)}
                                >
                                    <option value="Buy">Buy</option>
                                    <option value="Rent">Rent</option>
                                    <option value="Commercial">Commercial</option>
                                </select>
                            </div>

                            <div className="admin-field">
                                <label className="admin-label">Property Type</label>
                                <select
                                    className="admin-select"
                                    value={form.propertyType}
                                    onChange={(e) => handleField("propertyType", e.target.value)}
                                >
                                    <option value="Apartment">Apartment</option>
                                    <option value="Villa">Villa</option>
                                    <option value="Penthouse">Penthouse</option>
                                    <option value="Plot">Plot</option>
                                    <option value="Office Space">Office Space</option>
                                    <option value="Retail">Retail</option>
                                </select>
                            </div>

                            <div className="admin-field">
                                <label className="admin-label">Publication Status</label>
                                <select
                                    className="admin-select"
                                    value={form.status}
                                    onChange={(e) => handleField("status", e.target.value)}
                                >
                                    <option value="Published">Published</option>
                                    <option value="Draft">Draft</option>
                                </select>
                            </div>

                            <div className="admin-field">
                                <label className="admin-label">Locality</label>
                                <input
                                    className="admin-input"
                                    value={form.locality}
                                    onChange={(e) => {
                                        const val = e.target.value;
                                        handleField("locality", val);
                                        handleField("location", `${val}${form.city ? `, ${form.city}` : ""}`);
                                    }}
                                    placeholder="Kharadi"
                                />
                            </div>

                            <div className="admin-field">
                                <label className="admin-label">Display Location</label>
                                <input
                                    className="admin-input"
                                    value={form.location}
                                    onChange={(e) => handleField("location", e.target.value)}
                                    placeholder="Kharadi, Pune"
                                />
                            </div>

                            <div className="admin-field">
                                <label className="admin-label">Price Label (Displayed)</label>
                                <input
                                    className="admin-input"
                                    value={form.priceLabel}
                                    onChange={(e) => handleField("priceLabel", e.target.value)}
                                    placeholder="₹85 Lakh or ₹1.2 Crore"
                                />
                            </div>

                            <div className="admin-field">
                                <label className="admin-label">Numeric Price (INR)</label>
                                <input
                                    type="number"
                                    className="admin-input"
                                    value={form.price}
                                    onChange={(e) => handleField("price", e.target.value)}
                                />
                            </div>

                            <div className="admin-field">
                                <label className="admin-label">BHK / Units</label>
                                <input
                                    type="number"
                                    className="admin-input"
                                    value={form.bhk}
                                    onChange={(e) => handleField("bhk", e.target.value)}
                                />
                            </div>

                            <div className="admin-field">
                                <label className="admin-label">Bathrooms</label>
                                <input
                                    type="number"
                                    className="admin-input"
                                    value={form.bathrooms}
                                    onChange={(e) => handleField("bathrooms", e.target.value)}
                                />
                            </div>

                            <div className="admin-field">
                                <label className="admin-label">Carpet / Built-up Area</label>
                                <input
                                    type="number"
                                    className="admin-input"
                                    value={form.area}
                                    onChange={(e) => handleField("area", e.target.value)}
                                />
                            </div>

                            <div className="admin-field">
                                <label className="admin-label">Possession</label>
                                <select
                                    className="admin-select"
                                    value={form.possession}
                                    onChange={(e) => handleField("possession", e.target.value)}
                                >
                                    <option value="Ready to Move">Ready to Move</option>
                                    <option value="Under Construction">Under Construction</option>
                                    <option value="New Launch">New Launch</option>
                                </select>
                            </div>

                            <div className="admin-field">
                                <label className="admin-label">Furnishing</label>
                                <select
                                    className="admin-select"
                                    value={form.furnishing}
                                    onChange={(e) => handleField("furnishing", e.target.value)}
                                >
                                    <option value="Unfurnished">Unfurnished</option>
                                    <option value="Semi-Furnished">Semi-Furnished</option>
                                    <option value="Fully Furnished">Fully Furnished</option>
                                </select>
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
                        </div>

                        <div style={{ display: "flex", gap: 18, margin: "4px 0 16px" }}>
                            <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 600 }}>
                                <input
                                    type="checkbox"
                                    checked={Boolean(form.featured)}
                                    onChange={(e) => handleField("featured", e.target.checked)}
                                />
                                Featured Listing
                            </label>
                            <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 600 }}>
                                <input
                                    type="checkbox"
                                    checked={Boolean(form.verified)}
                                    onChange={(e) => handleField("verified", e.target.checked)}
                                />
                                RERA Verified
                            </label>
                        </div>

                        <ImageUploader
                            label="Primary Cover Image"
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
                                    placeholder="Paste image URL and click Add"
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
                                                alt={`Gallery ${idx + 1}`}
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
                            <label className="admin-label">Amenities</label>
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
                                    placeholder="e.g. Swimming Pool, Clubhouse"
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
                                        title="Click to remove"
                                    >
                                        {am} <X size={11} />
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="admin-field">
                            <label className="admin-label">
                                <span>Floor Plans</span>
                                <button
                                    type="button"
                                    className="admin-btn admin-btn--outline admin-btn--sm"
                                    onClick={addFloorPlan}
                                >
                                    + Add Floor Plan
                                </button>
                            </label>
                            {form.floorPlans.map((fp, idx) => (
                                <div
                                    key={idx}
                                    style={{
                                        display: "grid",
                                        gridTemplateColumns: "1fr 1fr auto",
                                        gap: 8,
                                        marginBottom: 8,
                                        alignItems: "center",
                                    }}
                                >
                                    <input
                                        className="admin-input"
                                        value={fp.label}
                                        onChange={(e) => updateFloorPlan(idx, "label", e.target.value)}
                                        placeholder="Plan Name (e.g. 2 BHK Type A)"
                                    />
                                    <input
                                        className="admin-input"
                                        value={fp.area}
                                        onChange={(e) => updateFloorPlan(idx, "area", e.target.value)}
                                        placeholder="Area (e.g. 950 sq.ft.)"
                                    />
                                    <button
                                        type="button"
                                        className="admin-btn admin-btn--danger admin-btn--sm"
                                        onClick={() => removeFloorPlan(idx)}
                                    >
                                        <Trash2 size={13} />
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div className="admin-field">
                            <label className="admin-label">Description</label>
                            <RichTextEditor
                                value={form.description}
                                onChange={(val) => handleField("description", val)}
                                placeholder="Write property highlights, nearby landmarks, and investment thesis..."
                            />
                        </div>
                    </form>

                    {showPreviewPane && (
                        <div style={{ position: "sticky", top: 0 }}>
                            <LivePagePreview
                                mode="property"
                                payload={form}
                                previewOnly={false}
                                title="Property Live Preview"
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
                title="Delete Property"
                message={`Are you sure you want to delete "${deleteTarget?.title}"? This action cannot be undone.`}
                confirmText="Delete Property"
                confirmTone="danger"
            />
        </div>
    );
}

