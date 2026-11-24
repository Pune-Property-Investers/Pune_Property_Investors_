"use client";

import { useEffect, useState } from "react";
import { Save, RotateCcw, Shield, Globe, User, Building, Search, FileText, CheckCircle2, Tag, Layers } from "lucide-react";
import { settingsService } from "../../../services/settings.service";
import { authService } from "../../../services/auth.service";
import { resetMockStore, DEFAULT_PAGES_SEO } from "../../../services/mockStore";
import { useAdminAuth } from "../../../context/AdminAuthContext";
import { useToast } from "../../../context/ToastContext";
import ConfirmModal from "../common/ConfirmModal";
import SectionSyncBar from "../common/SectionSyncBar";

const SETTINGS_TABS = [
    { key: "website", label: "Website Settings", icon: Building },
    { key: "seo", label: "SEO Settings & Page Keywords", icon: Globe },
    { key: "profile", label: "Admin Profile", icon: User },
    { key: "password", label: "Change Password", icon: Shield },
];

export default function SettingsManager() {
    const { showToast } = useToast();
    const { user, setUser } = useAdminAuth();
    const [activeTab, setActiveTab] = useState("website");
    const [seoSubTab, setSeoSubTab] = useState("pages"); // "global" | "pages"
    const [selectedPageKey, setSelectedPageKey] = useState("home");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [website, setWebsite] = useState({});
    const [seo, setSeo] = useState({});
    const [pagesSeo, setPagesSeo] = useState(DEFAULT_PAGES_SEO || {});
    const [profile, setProfile] = useState({});
    const [passwords, setPasswords] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });
    const [resetModalOpen, setResetModalOpen] = useState(false);

    async function load() {
        setLoading(true);
        try {
            const data = await settingsService.getSettings();
            setWebsite(data.website || {});
            setSeo(data.seo || {});
            setPagesSeo(data.pagesSeo && Object.keys(data.pagesSeo).length > 0 ? data.pagesSeo : DEFAULT_PAGES_SEO);
            setProfile({
                ...(data.profile || {}),
                ...(user ? { name: user.name || data.profile?.name, email: user.email || data.profile?.email } : {}),
            });
        } catch (err) {
            showToast(err.message || "Failed to load settings", "error");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        load();
    }, []);

    const handleSaveSection = async (sectionKey, payload, label) => {
        setSaving(true);
        try {
            const updated = await settingsService.updateSection(sectionKey, payload);
            if (sectionKey === "profile") {
                setUser((prev) => ({ ...(prev || {}), ...updated }));
            }
            showToast(`${label} saved successfully`, "success");
        } catch (err) {
            showToast(err.message || "Failed to update settings", "error");
        } finally {
            setSaving(false);
        }
    };

    const handleSaveSinglePageSeo = async (pageKey) => {
        const pageData = pagesSeo[pageKey];
        if (!pageData) return;
        setSaving(true);
        try {
            await settingsService.updatePageSeo(pageKey, pageData);
            showToast(`SEO settings for ${pageData.pageName || pageKey} saved`, "success");
        } catch (err) {
            showToast(err.message || "Failed to save page SEO", "error");
        } finally {
            setSaving(false);
        }
    };

    const handleSaveAllPagesSeo = async () => {
        setSaving(true);
        try {
            await settingsService.updateSection("pagesSeo", pagesSeo);
            showToast("All page SEO metadata and keywords saved successfully", "success");
        } catch (err) {
            showToast(err.message || "Failed to save pages SEO", "error");
        } finally {
            setSaving(false);
        }
    };

    const updateCurrentPageField = (field, value) => {
        setPagesSeo((prev) => ({
            ...prev,
            [selectedPageKey]: {
                ...(prev[selectedPageKey] || {}),
                [field]: value,
            },
        }));
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        if (passwords.newPassword !== passwords.confirmPassword) {
            showToast("New password and confirmation do not match", "warning");
            return;
        }
        if (passwords.newPassword.length < 8) {
            showToast("New password must be at least 8 characters", "warning");
            return;
        }
        setSaving(true);
        try {
            await authService.changePassword({
                currentPassword: passwords.currentPassword,
                newPassword: passwords.newPassword,
            });
            setPasswords({ currentPassword: "", newPassword: "", confirmPassword: "" });
            showToast("Password changed successfully", "success");
        } catch (err) {
            showToast(err.message || "Failed to change password", "error");
        } finally {
            setSaving(false);
        }
    };

    const handleResetDemo = () => {
        resetMockStore();
        setResetModalOpen(false);
        showToast("Demo CMS data restored to defaults", "success");
        if (typeof window !== "undefined") {
            window.location.reload();
        }
    };

    if (loading) {
        return (
            <div className="admin-card">
                <div className="admin-card__body" style={{ color: "#64748b", padding: 36 }}>
                    Loading settings...
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className="admin-page-header">
                <div>
                    <h1 className="admin-page-title">Settings</h1>
                    <p className="admin-page-subtitle">
                        Configure global contact info, social links, default SEO meta tags, admin profile, and account security.
                    </p>
                </div>
                <div className="admin-page-actions">
                    <SectionSyncBar sectionKey="settings" label="Settings" onRetrieved={load} />
                    <button
                        type="button"
                        className="admin-btn admin-btn--outline"
                        onClick={() => setResetModalOpen(true)}
                    >
                        <RotateCcw size={14} /> Reset Demo Store
                    </button>
                </div>
            </div>

            <div className="admin-tabs">
                {SETTINGS_TABS.map((tab) => {
                    const Icon = tab.icon;
                    return (
                        <button
                            key={tab.key}
                            type="button"
                            className={`admin-tab ${activeTab === tab.key ? "admin-tab--active" : ""}`}
                            onClick={() => setActiveTab(tab.key)}
                            style={{ display: "inline-flex", alignItems: "center", gap: 6 }}
                        >
                            <Icon size={14} /> {tab.label}
                        </button>
                    );
                })}
            </div>

            <div className="admin-card">
                <div className="admin-card__body">
                    {activeTab === "website" && (
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleSaveSection("website", website, "Website settings");
                            }}
                        >
                            <div className="admin-form-grid">
                                <div className="admin-field">
                                    <label className="admin-label">Website Name</label>
                                    <input
                                        className="admin-input"
                                        value={website.siteName || ""}
                                        onChange={(e) => setWebsite((p) => ({ ...p, siteName: e.target.value }))}
                                    />
                                </div>
                                <div className="admin-field">
                                    <label className="admin-label">Brand Tagline</label>
                                    <input
                                        className="admin-input"
                                        value={website.tagline || ""}
                                        onChange={(e) => setWebsite((p) => ({ ...p, tagline: e.target.value }))}
                                    />
                                </div>
                                <div className="admin-field">
                                    <label className="admin-label">Primary Phone</label>
                                    <input
                                        className="admin-input"
                                        value={website.phone || ""}
                                        onChange={(e) => setWebsite((p) => ({ ...p, phone: e.target.value }))}
                                    />
                                </div>
                                <div className="admin-field">
                                    <label className="admin-label">WhatsApp Number (with country code)</label>
                                    <input
                                        className="admin-input"
                                        value={website.whatsappNumber || ""}
                                        onChange={(e) => setWebsite((p) => ({ ...p, whatsappNumber: e.target.value }))}
                                    />
                                </div>
                                <div className="admin-field">
                                    <label className="admin-label">Support / Sales Email</label>
                                    <input
                                        type="email"
                                        className="admin-input"
                                        value={website.email || ""}
                                        onChange={(e) => setWebsite((p) => ({ ...p, email: e.target.value }))}
                                    />
                                </div>
                                <div className="admin-field">
                                    <label className="admin-label">Office Address</label>
                                    <input
                                        className="admin-input"
                                        value={website.officeAddress || ""}
                                        onChange={(e) => setWebsite((p) => ({ ...p, officeAddress: e.target.value }))}
                                    />
                                </div>
                                <div className="admin-field admin-field--full">
                                    <label className="admin-label">MahaRERA Disclosure Note</label>
                                    <input
                                        className="admin-input"
                                        value={website.reraDisclosure || ""}
                                        onChange={(e) => setWebsite((p) => ({ ...p, reraDisclosure: e.target.value }))}
                                    />
                                </div>
                                <div className="admin-field">
                                    <label className="admin-label">Instagram URL</label>
                                    <input
                                        className="admin-input"
                                        value={website.instagramUrl || ""}
                                        onChange={(e) => setWebsite((p) => ({ ...p, instagramUrl: e.target.value }))}
                                    />
                                </div>
                                <div className="admin-field">
                                    <label className="admin-label">YouTube URL</label>
                                    <input
                                        className="admin-input"
                                        value={website.youtubeUrl || ""}
                                        onChange={(e) => setWebsite((p) => ({ ...p, youtubeUrl: e.target.value }))}
                                    />
                                </div>
                            </div>
                            <button type="submit" className="admin-btn admin-btn--gold" disabled={saving}>
                                <Save size={15} /> {saving ? "Saving..." : "Save Website Settings"}
                            </button>
                        </form>
                    )}

                    {activeTab === "seo" && (
                        <div>
                            {/* SEO Sub-navigation */}
                            <div style={{ display: "flex", gap: 10, marginBottom: 24, borderBottom: "1px solid rgba(255,255,255,0.08)", paddingBottom: 12 }}>
                                <button
                                    type="button"
                                    className={`admin-btn ${seoSubTab === "pages" ? "admin-btn--gold" : "admin-btn--outline"}`}
                                    onClick={() => setSeoSubTab("pages")}
                                    style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: "0.85rem", padding: "6px 14px" }}
                                >
                                    <Layers size={14} /> Page-by-Page SEO & Keywords ({Object.keys(pagesSeo).length} Pages)
                                </button>
                                <button
                                    type="button"
                                    className={`admin-btn ${seoSubTab === "global" ? "admin-btn--gold" : "admin-btn--outline"}`}
                                    onClick={() => setSeoSubTab("global")}
                                    style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: "0.85rem", padding: "6px 14px" }}
                                >
                                    <Globe size={14} /> Global Default Meta Tags
                                </button>
                            </div>

                            {seoSubTab === "pages" && (
                                <div>
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                                        <div>
                                            <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: "#f8fafc", margin: 0 }}>
                                                Page SEO & Target Keywords Manager
                                            </h3>
                                            <p style={{ fontSize: "0.85rem", color: "#94a3b8", margin: "4px 0 0" }}>
                                                Configure unique metadata, search snippets, and ranking keywords for every public page on your portal.
                                            </p>
                                        </div>
                                        <button
                                            type="button"
                                            className="admin-btn admin-btn--gold"
                                            onClick={handleSaveAllPagesSeo}
                                            disabled={saving}
                                            style={{ display: "inline-flex", alignItems: "center", gap: 6 }}
                                        >
                                            <Save size={14} /> {saving ? "Saving All..." : "Save All 16 Pages SEO"}
                                        </button>
                                    </div>

                                    {/* Page Selection Bar */}
                                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24, background: "rgba(15,23,42,0.6)", padding: 12, borderRadius: 8, border: "1px solid rgba(255,255,255,0.06)" }}>
                                        {Object.entries(pagesSeo).map(([key, page]) => {
                                            const isSelected = selectedPageKey === key;
                                            return (
                                                <button
                                                    key={key}
                                                    type="button"
                                                    onClick={() => setSelectedPageKey(key)}
                                                    style={{
                                                        background: isSelected ? "#eab308" : "rgba(30,41,59,0.7)",
                                                        color: isSelected ? "#0f172a" : "#cbd5e1",
                                                        border: isSelected ? "1px solid #ca8a04" : "1px solid rgba(255,255,255,0.08)",
                                                        borderRadius: 6,
                                                        padding: "6px 12px",
                                                        fontSize: "0.82rem",
                                                        fontWeight: isSelected ? 600 : 500,
                                                        cursor: "pointer",
                                                        display: "inline-flex",
                                                        alignItems: "center",
                                                        gap: 6,
                                                        transition: "all 0.15s ease"
                                                    }}
                                                >
                                                    <span>{page.pageName || key}</span>
                                                    <span style={{ fontSize: "0.72rem", opacity: 0.8, background: isSelected ? "rgba(0,0,0,0.15)" : "rgba(255,255,255,0.1)", padding: "1px 6px", borderRadius: 4 }}>
                                                        {page.route}
                                                    </span>
                                                </button>
                                            );
                                        })}
                                    </div>

                                    {/* Selected Page Editor */}
                                    {pagesSeo[selectedPageKey] && (
                                        <div style={{ background: "rgba(30,41,59,0.4)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, padding: 24 }}>
                                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                                                <div>
                                                    <div style={{ display: "inline-block", background: "rgba(234,179,8,0.15)", color: "#facc15", fontSize: "0.75rem", fontWeight: 600, padding: "2px 8px", borderRadius: 4, marginBottom: 6 }}>
                                                        ROUTE: {pagesSeo[selectedPageKey].route}
                                                    </div>
                                                    <h4 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#f8fafc", margin: 0 }}>
                                                        {pagesSeo[selectedPageKey].pageName} SEO Configuration
                                                    </h4>
                                                </div>
                                                <button
                                                    type="button"
                                                    className="admin-btn admin-btn--gold"
                                                    onClick={() => handleSaveSinglePageSeo(selectedPageKey)}
                                                    disabled={saving}
                                                    style={{ display: "inline-flex", alignItems: "center", gap: 6 }}
                                                >
                                                    <Save size={14} /> {saving ? "Saving..." : `Save ${pagesSeo[selectedPageKey].pageName} SEO`}
                                                </button>
                                            </div>

                                            {/* Live Google Search Result Preview */}
                                            <div style={{ background: "#0f172a", border: "1px solid #334155", borderRadius: 8, padding: "16px 20px", marginBottom: 24 }}>
                                                <div style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "#94a3b8", marginBottom: 8, fontWeight: 600 }}>
                                                    Google Search Snippet Preview
                                                </div>
                                                <div style={{ fontSize: "0.82rem", color: "#94a3b8", display: "flex", alignItems: "center", gap: 6 }}>
                                                    <span>https://punepropertyinvestor.com</span>
                                                    <span>›</span>
                                                    <span style={{ color: "#38bdf8" }}>
                                                        {pagesSeo[selectedPageKey].route === "/" ? "" : pagesSeo[selectedPageKey].route.replace(/^\//, "")}
                                                    </span>
                                                </div>
                                                <div style={{ color: "#60a5fa", fontSize: "1.18rem", fontWeight: 600, marginTop: 4, lineHeight: 1.3 }}>
                                                    {pagesSeo[selectedPageKey].title || "Default Page Title | Pune Property Investors"}
                                                </div>
                                                <div style={{ color: "#cbd5e1", fontSize: "0.88rem", lineHeight: 1.45, marginTop: 6 }}>
                                                    {pagesSeo[selectedPageKey].description || "Meta description will preview here as search engines display it..."}
                                                </div>
                                            </div>

                                            {/* Form Fields */}
                                            <div className="admin-field">
                                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                    <label className="admin-label">Page SEO Title</label>
                                                    <span style={{ fontSize: "0.78rem", color: (pagesSeo[selectedPageKey].title || "").length > 60 ? "#f87171" : "#94a3b8" }}>
                                                        {(pagesSeo[selectedPageKey].title || "").length} / 60 characters recommended
                                                    </span>
                                                </div>
                                                <input
                                                    className="admin-input"
                                                    value={pagesSeo[selectedPageKey].title || ""}
                                                    onChange={(e) => updateCurrentPageField("title", e.target.value)}
                                                    placeholder="Enter high-ranking page title..."
                                                />
                                            </div>

                                            <div className="admin-field">
                                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                    <label className="admin-label">Meta Description</label>
                                                    <span style={{ fontSize: "0.78rem", color: (pagesSeo[selectedPageKey].description || "").length > 160 ? "#f87171" : "#94a3b8" }}>
                                                        {(pagesSeo[selectedPageKey].description || "").length} / 160 characters recommended
                                                    </span>
                                                </div>
                                                <textarea
                                                    className="admin-textarea"
                                                    rows={3}
                                                    value={pagesSeo[selectedPageKey].description || ""}
                                                    onChange={(e) => updateCurrentPageField("description", e.target.value)}
                                                    placeholder="Engaging summary with call-to-action for search engine results..."
                                                />
                                            </div>

                                            <div className="admin-field">
                                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                    <label className="admin-label">Target Keywords (Comma Separated)</label>
                                                    <span style={{ fontSize: "0.78rem", color: "#94a3b8" }}>
                                                        Specific high-intent search terms for this page
                                                    </span>
                                                </div>
                                                <input
                                                    className="admin-input"
                                                    value={pagesSeo[selectedPageKey].keywords || ""}
                                                    onChange={(e) => updateCurrentPageField("keywords", e.target.value)}
                                                    placeholder="e.g. Luxury flats Pune, 3 BHK Kharadi, RERA registered apartments..."
                                                />
                                                {/* Keyword Badges */}
                                                {pagesSeo[selectedPageKey].keywords && (
                                                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 10 }}>
                                                        {pagesSeo[selectedPageKey].keywords.split(",").map((kw, i) => {
                                                            const trimmed = kw.trim();
                                                            if (!trimmed) return null;
                                                            return (
                                                                <span
                                                                    key={i}
                                                                    style={{
                                                                        background: "rgba(59,130,246,0.15)",
                                                                        color: "#93c5fd",
                                                                        border: "1px solid rgba(59,130,246,0.3)",
                                                                        borderRadius: 4,
                                                                        padding: "2px 8px",
                                                                        fontSize: "0.75rem",
                                                                        display: "inline-flex",
                                                                        alignItems: "center",
                                                                        gap: 4
                                                                    }}
                                                                >
                                                                    <Tag size={10} /> {trimmed}
                                                                </span>
                                                            );
                                                        })}
                                                    </div>
                                                )}
                                            </div>

                                            <div className="admin-form-grid">
                                                <div className="admin-field">
                                                    <label className="admin-label">Canonical Path</label>
                                                    <input
                                                        className="admin-input"
                                                        value={pagesSeo[selectedPageKey].canonical || ""}
                                                        onChange={(e) => updateCurrentPageField("canonical", e.target.value)}
                                                        placeholder="/page-path"
                                                    />
                                                </div>
                                                <div className="admin-field">
                                                    <label className="admin-label">Robots Indexing Directive</label>
                                                    <select
                                                        className="admin-input"
                                                        value={pagesSeo[selectedPageKey].robots || "index, follow"}
                                                        onChange={(e) => updateCurrentPageField("robots", e.target.value)}
                                                    >
                                                        <option value="index, follow">index, follow (Standard Public Page)</option>
                                                        <option value="noindex, follow">noindex, follow (Legal / Utility Page)</option>
                                                        <option value="noindex, nofollow">noindex, nofollow (Private / Admin)</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
                                                <button
                                                    type="button"
                                                    className="admin-btn admin-btn--gold"
                                                    onClick={() => handleSaveSinglePageSeo(selectedPageKey)}
                                                    disabled={saving}
                                                    style={{ display: "inline-flex", alignItems: "center", gap: 6 }}
                                                >
                                                    <Save size={14} /> {saving ? "Saving..." : `Save ${pagesSeo[selectedPageKey].pageName} SEO`}
                                                </button>
                                                <button
                                                    type="button"
                                                    className="admin-btn admin-btn--outline"
                                                    onClick={handleSaveAllPagesSeo}
                                                    disabled={saving}
                                                >
                                                    Save All 16 Pages
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                            {seoSubTab === "global" && (
                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        handleSaveSection("seo", seo, "Global SEO settings");
                                    }}
                                >
                                    <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: "#f8fafc", margin: "0 0 16px" }}>
                                        Global Default Meta Tags
                                    </h3>
                                    <div className="admin-field">
                                        <label className="admin-label">Default Site Title</label>
                                        <input
                                            className="admin-input"
                                            value={seo.defaultTitle || ""}
                                            onChange={(e) => setSeo((p) => ({ ...p, defaultTitle: e.target.value }))}
                                        />
                                    </div>
                                    <div className="admin-field">
                                        <label className="admin-label">Title Template</label>
                                        <input
                                            className="admin-input"
                                            value={seo.titleTemplate || ""}
                                            onChange={(e) => setSeo((p) => ({ ...p, titleTemplate: e.target.value }))}
                                        />
                                    </div>
                                    <div className="admin-field">
                                        <label className="admin-label">Default Meta Description</label>
                                        <textarea
                                            className="admin-textarea"
                                            value={seo.defaultDescription || ""}
                                            onChange={(e) => setSeo((p) => ({ ...p, defaultDescription: e.target.value }))}
                                        />
                                    </div>
                                    <div className="admin-form-grid">
                                        <div className="admin-field">
                                            <label className="admin-label">Global Target Keywords</label>
                                            <input
                                                className="admin-input"
                                                value={seo.keywords || ""}
                                                onChange={(e) => setSeo((p) => ({ ...p, keywords: e.target.value }))}
                                            />
                                        </div>
                                        <div className="admin-field">
                                            <label className="admin-label">Canonical Base URL</label>
                                            <input
                                                className="admin-input"
                                                value={seo.canonicalUrl || ""}
                                                onChange={(e) => setSeo((p) => ({ ...p, canonicalUrl: e.target.value }))}
                                            />
                                        </div>
                                    </div>
                                    <button type="submit" className="admin-btn admin-btn--gold" disabled={saving}>
                                        <Save size={15} /> {saving ? "Saving..." : "Save Global SEO Settings"}
                                    </button>
                                </form>
                            )}
                        </div>
                    )}

                    {activeTab === "profile" && (
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleSaveSection("profile", profile, "Admin profile");
                            }}
                            style={{ maxWidth: 540 }}
                        >
                            <div className="admin-field">
                                <label className="admin-label">Full Name</label>
                                <input
                                    className="admin-input"
                                    value={profile.name || ""}
                                    onChange={(e) => setProfile((p) => ({ ...p, name: e.target.value }))}
                                />
                            </div>
                            <div className="admin-field">
                                <label className="admin-label">Email Address</label>
                                <input
                                    type="email"
                                    className="admin-input"
                                    value={profile.email || ""}
                                    onChange={(e) => setProfile((p) => ({ ...p, email: e.target.value }))}
                                />
                            </div>
                            <div className="admin-field">
                                <label className="admin-label">Phone Number</label>
                                <input
                                    className="admin-input"
                                    value={profile.phone || ""}
                                    onChange={(e) => setProfile((p) => ({ ...p, phone: e.target.value }))}
                                />
                            </div>
                            <div className="admin-field">
                                <label className="admin-label">Role</label>
                                <input className="admin-input" value={profile.role || "Super Admin"} disabled />
                            </div>
                            <button type="submit" className="admin-btn admin-btn--gold" disabled={saving}>
                                <Save size={15} /> {saving ? "Saving..." : "Update Profile"}
                            </button>
                        </form>
                    )}

                    {activeTab === "password" && (
                        <form onSubmit={handlePasswordSubmit} style={{ maxWidth: 460 }}>
                            <div className="admin-field">
                                <label className="admin-label">Current Password</label>
                                <input
                                    type="password"
                                    className="admin-input"
                                    value={passwords.currentPassword}
                                    onChange={(e) => setPasswords((p) => ({ ...p, currentPassword: e.target.value }))}
                                    required
                                />
                            </div>
                            <div className="admin-field">
                                <label className="admin-label">New Password (min 8 chars)</label>
                                <input
                                    type="password"
                                    className="admin-input"
                                    value={passwords.newPassword}
                                    onChange={(e) => setPasswords((p) => ({ ...p, newPassword: e.target.value }))}
                                    required
                                />
                            </div>
                            <div className="admin-field">
                                <label className="admin-label">Confirm New Password</label>
                                <input
                                    type="password"
                                    className="admin-input"
                                    value={passwords.confirmPassword}
                                    onChange={(e) => setPasswords((p) => ({ ...p, confirmPassword: e.target.value }))}
                                    required
                                />
                            </div>
                            <button type="submit" className="admin-btn admin-btn--gold" disabled={saving}>
                                <Shield size={15} /> {saving ? "Updating..." : "Change Password"}
                            </button>
                        </form>
                    )}
                </div>
            </div>

            <ConfirmModal
                open={resetModalOpen}
                onClose={() => setResetModalOpen(false)}
                onConfirm={handleResetDemo}
                title="Reset Local Demo CMS Store"
                message="Restore all properties, projects, CMS homepage sections, leads, and articles in local demo storage back to their initial seeded state?"
                confirmText="Reset Demo Data"
                confirmTone="danger"
            />
        </div>
    );
}

