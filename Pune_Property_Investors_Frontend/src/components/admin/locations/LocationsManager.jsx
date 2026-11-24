"use client";

import { useEffect, useMemo, useState } from "react";
import { Plus, Pencil, Trash2, MapPin, Star } from "lucide-react";
import { locationService } from "../../../services/location.service";
import { useToast } from "../../../context/ToastContext";
import DataTable from "../common/DataTable";
import AdminModal from "../common/AdminModal";
import ConfirmModal from "../common/ConfirmModal";
import SectionSyncBar from "../common/SectionSyncBar";
import ImageUploader, { resolveAssetUrl } from "../content/ImageUploader";

const EMPTY_LOCATION = {
    name: "",
    city: "Pune",
    zone: "West Pune",
    areaType: "Locality",
    subtitle: "",
    description: "",
    avgRate: "₹8,500 / sq.ft",
    listingsCount: "0 Properties",
    image: "",
    isFeatured: false,
};

const ZONE_TABS = [
    { key: "all", label: "All Locations" },
    { key: "West Pune", label: "West Pune" },
    { key: "East Pune", label: "East Pune" },
    { key: "Central", label: "Central Pune" },
];

export default function LocationsManager() {
    const { showToast } = useToast();
    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("all");
    const [search, setSearch] = useState("");

    const [modalOpen, setModalOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [form, setForm] = useState(EMPTY_LOCATION);
    const [saving, setSaving] = useState(false);

    const [deleteTarget, setDeleteTarget] = useState(null);
    const [deleting, setDeleting] = useState(false);

    const load = async () => {
        setLoading(true);
        try {
            const list = await locationService.list();
            setLocations(Array.isArray(list) ? list : []);
        } catch (err) {
            showToast(err.message || "Failed to load locations", "error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        load();
    }, []);

    const filteredLocations = useMemo(() => {
        return locations.filter((loc) => {
            const zone = loc.zone || loc.region || "";
            if (activeTab !== "all" && !zone.toLowerCase().includes(activeTab.toLowerCase())) {
                return false;
            }
            if (search.trim()) {
                const q = search.toLowerCase();
                const hay = [loc.name, loc.city, zone, loc.subtitle].filter(Boolean).join(" ").toLowerCase();
                if (!hay.includes(q)) return false;
            }
            return true;
        });
    }, [locations, activeTab, search]);

    const openCreate = () => {
        setEditingId(null);
        setForm({ ...EMPTY_LOCATION });
        setModalOpen(true);
    };

    const openEdit = (loc) => {
        setEditingId(loc.id);
        setForm({
            ...EMPTY_LOCATION,
            ...loc,
            zone: loc.zone || loc.region || "West Pune",
            city: loc.city || "Pune",
            areaType: loc.areaType || "Locality",
            isFeatured: Boolean(loc.isFeatured ?? loc.featured),
        });
        setModalOpen(true);
    };

    const handleSave = async (e) => {
        e?.preventDefault();
        if (!form.name.trim()) {
            showToast("Location name is required", "warning");
            return;
        }
        setSaving(true);
        try {
            const payload = {
                ...form,
                searchLocation: form.searchLocation || form.name,
                featured: Boolean(form.isFeatured),
            };
            if (editingId) {
                const updated = await locationService.update(editingId, payload);
                setLocations((prev) => prev.map((l) => (String(l.id) === String(editingId) ? updated : l)));
                showToast("Location updated", "success");
            } else {
                const created = await locationService.create(payload);
                setLocations((prev) => [created, ...prev]);
                showToast("Location added", "success");
            }
            setModalOpen(false);
        } catch (err) {
            showToast(err.message || "Failed to save location", "error");
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async () => {
        if (!deleteTarget) return;
        setDeleting(true);
        try {
            await locationService.remove(deleteTarget.id);
            setLocations((prev) => prev.filter((l) => String(l.id) !== String(deleteTarget.id)));
            showToast("Location deleted", "success");
            setDeleteTarget(null);
        } catch (err) {
            showToast(err.message || "Failed to delete location", "error");
        } finally {
            setDeleting(false);
        }
    };

    const columns = [
        {
            key: "name",
            label: "Location",
            render: (row) => (
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    {row.image ? (
                        <img src={resolveAssetUrl(row.image)} alt={row.name} className="admin-thumb" />
                    ) : (
                        <div className="admin-thumb" style={{ display: "grid", placeItems: "center", color: "#94a3b8" }}>
                            <MapPin size={16} />
                        </div>
                    )}
                    <div>
                        <div style={{ fontWeight: 600, color: "#0f172a" }}>{row.name}</div>
                        <div style={{ fontSize: 12, color: "#64748b" }}>
                            {row.city || "Pune"} • {row.areaType || "Locality"}
                        </div>
                    </div>
                </div>
            ),
        },
        {
            key: "zone",
            label: "Corridor / Zone",
            render: (row) => (
                <span className="admin-badge admin-badge--slate">{row.zone || row.region || "Pune"}</span>
            ),
        },
        {
            key: "avgRate",
            label: "Avg Rate & Listings",
            render: (row) => (
                <div>
                    <div style={{ fontWeight: 700, color: "#0f172a" }}>{row.avgRate || "—"}</div>
                    <div style={{ fontSize: 12, color: "#64748b" }}>{row.listingsCount || "0 Properties"}</div>
                </div>
            ),
        },
        {
            key: "featured",
            label: "Highlight",
            render: (row) =>
                row.isFeatured || row.featured ? (
                    <span className="admin-badge admin-badge--amber">
                        <Star size={11} fill="currentColor" /> Featured
                    </span>
                ) : (
                    <span style={{ color: "#94a3b8", fontSize: 12 }}>Standard</span>
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
                    <h1 className="admin-page-title">Location Management</h1>
                    <p className="admin-page-subtitle">
                        Manage Pune cities, localities, corridors, average sq.ft. rates, and browse-by-location cards.
                    </p>
                </div>
                <div className="admin-page-actions">
                    <SectionSyncBar sectionKey="locations" label="Locations" onRetrieved={load} />
                    <button type="button" className="admin-btn admin-btn--gold" onClick={openCreate}>
                        <Plus size={16} /> Add Location
                    </button>
                </div>
            </div>

            <div className="admin-tabs">
                {ZONE_TABS.map((tab) => (
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
                rows={filteredLocations}
                loading={loading}
                searchValue={search}
                onSearchChange={setSearch}
                searchPlaceholder="Search localities, zones, or cities..."
                emptyTitle="No locations found"
                emptyDescription="Add a locality or adjust your zone filter."
                emptyAction={
                    <button type="button" className="admin-btn admin-btn--primary" onClick={openCreate}>
                        <Plus size={15} /> Add Location
                    </button>
                }
            />

            <AdminModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                title={editingId ? `Edit Location: ${form.name}` : "Add Location"}
                footer={
                    <>
                        <button type="button" className="admin-btn admin-btn--outline" onClick={() => setModalOpen(false)}>
                            Cancel
                        </button>
                        <button type="button" className="admin-btn admin-btn--gold" onClick={handleSave} disabled={saving}>
                            {saving ? "Saving..." : editingId ? "Save Changes" : "Add Location"}
                        </button>
                    </>
                }
            >
                <form onSubmit={handleSave}>
                    <div className="admin-form-grid">
                        <div className="admin-field">
                            <label className="admin-label">Locality / Area Name *</label>
                            <input
                                className="admin-input"
                                value={form.name}
                                onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                                placeholder="e.g. Baner"
                                required
                            />
                        </div>

                        <div className="admin-field">
                            <label className="admin-label">City</label>
                            <input
                                className="admin-input"
                                value={form.city}
                                onChange={(e) => setForm((p) => ({ ...p, city: e.target.value }))}
                                placeholder="Pune"
                            />
                        </div>

                        <div className="admin-field">
                            <label className="admin-label">Zone / Corridor</label>
                            <select
                                className="admin-select"
                                value={form.zone}
                                onChange={(e) => setForm((p) => ({ ...p, zone: e.target.value }))}
                            >
                                <option value="West Pune">West Pune</option>
                                <option value="East Pune">East Pune</option>
                                <option value="Central">Central Pune</option>
                                <option value="South Pune">South Pune</option>
                                <option value="North Pune">North Pune</option>
                            </select>
                        </div>

                        <div className="admin-field">
                            <label className="admin-label">Area Classification</label>
                            <select
                                className="admin-select"
                                value={form.areaType}
                                onChange={(e) => setForm((p) => ({ ...p, areaType: e.target.value }))}
                            >
                                <option value="City">City</option>
                                <option value="Locality">Locality</option>
                                <option value="Area">Area / Micro-market</option>
                            </select>
                        </div>

                        <div className="admin-field">
                            <label className="admin-label">Average Rate</label>
                            <input
                                className="admin-input"
                                value={form.avgRate}
                                onChange={(e) => setForm((p) => ({ ...p, avgRate: e.target.value }))}
                                placeholder="₹9,800 / sq.ft"
                            />
                        </div>

                        <div className="admin-field">
                            <label className="admin-label">Listings Count Label</label>
                            <input
                                className="admin-input"
                                value={form.listingsCount}
                                onChange={(e) => setForm((p) => ({ ...p, listingsCount: e.target.value }))}
                                placeholder="12 Properties"
                            />
                        </div>

                        <div className="admin-field admin-field--full">
                            <label className="admin-label">Headline / Subtitle</label>
                            <input
                                className="admin-input"
                                value={form.subtitle}
                                onChange={(e) => setForm((p) => ({ ...p, subtitle: e.target.value }))}
                                placeholder="High Street, Lifestyle & Western Corridor"
                            />
                        </div>
                    </div>

                    <div style={{ margin: "4px 0 14px" }}>
                        <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 600 }}>
                            <input
                                type="checkbox"
                                checked={Boolean(form.isFeatured)}
                                onChange={(e) => setForm((p) => ({ ...p, isFeatured: e.target.checked }))}
                            />
                            Feature this location on Homepage
                        </label>
                    </div>

                    <ImageUploader
                        label="Location Cover Image"
                        value={form.image}
                        onChange={(val) => setForm((p) => ({ ...p, image: val }))}
                    />

                    <div className="admin-field">
                        <label className="admin-label">Micro-market Notes</label>
                        <textarea
                            className="admin-textarea"
                            value={form.description}
                            onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
                            placeholder="Connectivity, IT hubs, metro access, and appreciation outlook..."
                        />
                    </div>
                </form>
            </AdminModal>

            <ConfirmModal
                open={Boolean(deleteTarget)}
                onClose={() => setDeleteTarget(null)}
                onConfirm={handleDelete}
                loading={deleting}
                title="Delete Location"
                message={`Delete "${deleteTarget?.name}" from locations?`}
                confirmText="Delete Location"
                confirmTone="danger"
            />
        </div>
    );
}

