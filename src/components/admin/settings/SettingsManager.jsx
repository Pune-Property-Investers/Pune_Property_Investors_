"use client";

import { useEffect, useState } from "react";
import { Save, RotateCcw, Shield, Globe, User, Building } from "lucide-react";
import { settingsService } from "../../../services/settings.service";
import { authService } from "../../../services/auth.service";
import { resetMockStore } from "../../../services/mockStore";
import { useAdminAuth } from "../../../context/AdminAuthContext";
import { useToast } from "../../../context/ToastContext";
import ConfirmModal from "../common/ConfirmModal";

const SETTINGS_TABS = [
    { key: "website", label: "Website Settings", icon: Building },
    { key: "seo", label: "SEO Settings", icon: Globe },
    { key: "profile", label: "Admin Profile", icon: User },
    { key: "password", label: "Change Password", icon: Shield },
];

export default function SettingsManager() {
    const { showToast } = useToast();
    const { user, setUser } = useAdminAuth();
    const [activeTab, setActiveTab] = useState("website");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [website, setWebsite] = useState({});
    const [seo, setSeo] = useState({});
    const [profile, setProfile] = useState({});
    const [passwords, setPasswords] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });
    const [resetModalOpen, setResetModalOpen] = useState(false);

    useEffect(() => {
        async function load() {
            setLoading(true);
            try {
                const data = await settingsService.getSettings();
                setWebsite(data.website || {});
                setSeo(data.seo || {});
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
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleSaveSection("seo", seo, "Global SEO settings");
                            }}
                        >
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
                                    <label className="admin-label">Target Keywords</label>
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
                                <Save size={15} /> {saving ? "Saving..." : "Save SEO Settings"}
                            </button>
                        </form>
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

