"use client";

import { useEffect, useState } from "react";
import { Sparkles, Eye, EyeOff, Trash2, Save, Tag, ArrowRight, X } from "lucide-react";
import { contentService } from "../../../services/content.service";
import { DEFAULT_FESTIVAL_POPUP } from "../../../services/mockStore";
import { useToast } from "../../../context/ToastContext";
import ImageUploader, { resolveAssetUrl } from "./ImageUploader";
import ConfirmModal from "../common/ConfirmModal";

const POSITION_OPTIONS = [
    { value: "center", label: "Center Screen Modal" },
    { value: "bottom-right", label: "Bottom Right Floating" },
    { value: "bottom-left", label: "Bottom Left Floating" },
    { value: "top-banner", label: "Top Floating Banner" },
    { value: "bottom-banner", label: "Bottom Floating Banner" },
];

const PAGE_OPTIONS = [
    { value: "all", label: "All Public Pages" },
    { value: "home", label: "Home Page Only (/)" },
    { value: "properties", label: "Properties & Buy Pages" },
    { value: "projects", label: "Projects & New Launches" },
];

export default function FestivalPopupManager() {
    const { showToast } = useToast();
    const [popup, setPopup] = useState({ ...DEFAULT_FESTIVAL_POPUP });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [confirmClear, setConfirmClear] = useState(false);

    useEffect(() => {
        async function load() {
            setLoading(true);
            try {
                const data = await contentService.getFestivalPopup();
                if (data) {
                    setPopup({ ...DEFAULT_FESTIVAL_POPUP, ...data });
                }
            } catch (err) {
                showToast(err.message || "Failed to load festival popup settings", "error");
            } finally {
                setLoading(false);
            }
        }
        load();
    }, []);

    const persistPopup = async (nextPopup, message) => {
        setSaving(true);
        try {
            const saved = await contentService.saveFestivalPopup(nextPopup);
            setPopup({ ...DEFAULT_FESTIVAL_POPUP, ...saved });
            showToast(message, "success");
        } catch (err) {
            showToast(err.message || "Failed to save festival popup", "error");
        } finally {
            setSaving(false);
        }
    };

    const handleSave = async (e) => {
        e?.preventDefault();
        if (popup.enabled && !popup.title?.trim()) {
            showToast("Offer title is required when popup is enabled", "warning");
            return;
        }
        await persistPopup(
            popup,
            popup.enabled
                ? "Festival offer popup is now LIVE on the website"
                : "Festival offer popup saved (currently OFF)"
        );
    };

    const handleToggleEnabled = async () => {
        const nextEnabled = !popup.enabled;
        if (nextEnabled && !popup.title?.trim()) {
            showToast("Please add an offer title before turning the popup ON", "warning");
            return;
        }
        await persistPopup(
            { ...popup, enabled: nextEnabled },
            nextEnabled ? "Festival offer popup turned ON" : "Festival offer popup turned OFF"
        );
    };

    const handleClearOffer = async () => {
        const cleared = {
            ...DEFAULT_FESTIVAL_POPUP,
            enabled: false,
            badge: "",
            title: "",
            subtitle: "",
            description: "",
            offerCode: "",
            image: "",
        };
        await persistPopup(cleared, "Festival offer removed and popup turned OFF");
        setConfirmClear(false);
    };

    if (loading) {
        return <div className="admin-card" style={{ padding: 24 }}>Loading festival offer popup...</div>;
    }

    return (
        <div>
            <div className="admin-page-header">
                <div>
                    <h1 className="admin-page-title">Festival Offer Popup</h1>
                    <p className="admin-page-subtitle">
                        Turn on a seasonal festival offer popup when needed, choose its screen position and target pages, or remove it when no offer is active.
                    </p>
                </div>
                <div className="admin-page-actions" style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    <button
                        type="button"
                        className={`admin-btn admin-btn--sm ${popup.enabled ? "admin-btn--outline" : "admin-btn--primary"}`}
                        onClick={handleToggleEnabled}
                        disabled={saving}
                    >
                        {popup.enabled ? <EyeOff size={14} /> : <Eye size={14} />}
                        {popup.enabled ? "Turn Off Popup" : "Turn On Popup"}
                    </button>
                    <button
                        type="button"
                        className="admin-btn admin-btn--danger admin-btn--sm"
                        onClick={() => setConfirmClear(true)}
                        disabled={saving}
                    >
                        <Trash2 size={14} /> Remove Offer
                    </button>
                </div>
            </div>

            <div className="admin-split-editor">
                <div className="admin-editor-pane">
                    <div className="admin-card__header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <h2 className="admin-card__title">Popup Configuration</h2>
                        <span className={`admin-badge ${popup.enabled ? "admin-badge--green" : "admin-badge--slate"}`}>
                            {popup.enabled ? "Live on Website" : "Inactive / Hidden"}
                        </span>
                    </div>

                    <form className="admin-editor-pane__scroll" onSubmit={handleSave}>
                        <div style={{ marginBottom: 16, padding: 12, borderRadius: 10, background: "#f8fafc", border: "1px solid #e2e8f0" }}>
                            <label style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13.5, fontWeight: 600, cursor: "pointer" }}>
                                <input
                                    type="checkbox"
                                    checked={Boolean(popup.enabled)}
                                    onChange={(e) => setPopup((p) => ({ ...p, enabled: e.target.checked }))}
                                />
                                Enable Festival Offer Popup on Public Website
                            </label>
                        </div>

                        <div className="admin-form-grid">
                            <div className="admin-field">
                                <label className="admin-label">Popup Screen Position</label>
                                <select
                                    className="admin-select"
                                    value={popup.position || "center"}
                                    onChange={(e) => setPopup((p) => ({ ...p, position: e.target.value }))}
                                >
                                    {POSITION_OPTIONS.map((opt) => (
                                        <option key={opt.value} value={opt.value}>
                                            {opt.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="admin-field">
                                <label className="admin-label">Show On (Place / Pages)</label>
                                <select
                                    className="admin-select"
                                    value={popup.pages || "all"}
                                    onChange={(e) => setPopup((p) => ({ ...p, pages: e.target.value }))}
                                >
                                    {PAGE_OPTIONS.map((opt) => (
                                        <option key={opt.value} value={opt.value}>
                                            {opt.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="admin-form-grid">
                            <div className="admin-field">
                                <label className="admin-label">Offer Badge / Tag</label>
                                <input
                                    className="admin-input"
                                    value={popup.badge || ""}
                                    onChange={(e) => setPopup((p) => ({ ...p, badge: e.target.value }))}
                                    placeholder="e.g. DIWALI SPECIAL OFFER"
                                />
                            </div>

                            {/* <div className="admin-field">
                                <label className="admin-label">Promo / Offer Code (Optional)</label>
                                <input
                                    className="admin-input"
                                    value={popup.offerCode || ""}
                                    onChange={(e) => setPopup((p) => ({ ...p, offerCode: e.target.value }))}
                                    placeholder="e.g. FESTIVE2026"
                                />
                            </div> */}
                        </div>

                        <div className="admin-field">
                            <label className="admin-label">Offer Headline *</label>
                            <input
                                className="admin-input"
                                value={popup.title || ""}
                                onChange={(e) => setPopup((p) => ({ ...p, title: e.target.value }))}
                                placeholder="e.g. Diwali & New Year Homebuyer Bonanza"
                            />
                        </div>

                        <div className="admin-field">
                            <label className="admin-label">Highlight Subtitle</label>
                            <input
                                className="admin-input"
                                value={popup.subtitle || ""}
                                onChange={(e) => setPopup((p) => ({ ...p, subtitle: e.target.value }))}
                                placeholder="e.g. Zero Stamp Duty + Gold Coin on Booking"
                            />
                        </div>

                        <div className="admin-field">
                            <label className="admin-label">Offer Description</label>
                            <textarea
                                className="admin-textarea"
                                value={popup.description || ""}
                                onChange={(e) => setPopup((p) => ({ ...p, description: e.target.value }))}
                                placeholder="Describe the festival benefits, validity, or special terms..."
                            />
                        </div>

                        <ImageUploader
                            label="Festival Banner Image (Optional)"
                            value={popup.image || ""}
                            onChange={(val) => setPopup((p) => ({ ...p, image: val }))}
                        />

                        <div className="admin-form-grid">
                            <div className="admin-field">
                                <label className="admin-label">CTA Button Text</label>
                                <input
                                    className="admin-input"
                                    value={popup.buttonText || ""}
                                    onChange={(e) => setPopup((p) => ({ ...p, buttonText: e.target.value }))}
                                    placeholder="Claim Festive Offer"
                                />
                            </div>

                            <div className="admin-field">
                                <label className="admin-label">CTA Link URL</label>
                                <input
                                    className="admin-input"
                                    value={popup.buttonUrl || ""}
                                    onChange={(e) => setPopup((p) => ({ ...p, buttonUrl: e.target.value }))}
                                    placeholder="/contact"
                                />
                            </div>
                        </div>

                        <div className="admin-form-grid">
                            <div className="admin-field">
                                <label className="admin-label">Appear Delay (Seconds)</label>
                                <input
                                    type="number"
                                    min={0}
                                    max={30}
                                    className="admin-input"
                                    value={popup.delaySeconds ?? 1}
                                    onChange={(e) =>
                                        setPopup((p) => ({ ...p, delaySeconds: Math.max(0, Number(e.target.value) || 0) }))
                                    }
                                />
                            </div>

                            <div className="admin-field" style={{ display: "flex", alignItems: "flex-end", paddingBottom: 10 }}>
                                <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                                    <input
                                        type="checkbox"
                                        checked={Boolean(popup.showOncePerSession)}
                                        onChange={(e) =>
                                            setPopup((p) => ({ ...p, showOncePerSession: e.target.checked }))
                                        }
                                    />
                                    Show once per browser session
                                </label>
                            </div>
                        </div>

                        <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 8 }}>
                            <button type="submit" className="admin-btn admin-btn--gold" disabled={saving}>
                                <Save size={15} /> {saving ? "Saving..." : "Save Festival Popup"}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Live Preview Pane */}
                <div className="admin-card" style={{ padding: 18, alignSelf: "start" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                        <h3 className="admin-card__title" style={{ margin: 0 }}>Live Popup Preview</h3>
                        <span className="admin-badge admin-badge--blue">
                            {POSITION_OPTIONS.find((o) => o.value === popup.position)?.label || "Center Screen Modal"}
                        </span>
                    </div>

                    <div
                        style={{
                            position: "relative",
                            borderRadius: 14,
                            padding: 20,
                            background: "linear-gradient(155deg, #271e2b 0%, #17121b 100%)",
                            border: "1px solid rgba(217, 180, 119, 0.45)",
                            color: "#f8f4ef",
                            opacity: popup.enabled ? 1 : 0.6,
                        }}
                    >
                        <span
                            style={{
                                position: "absolute",
                                top: 12,
                                right: 12,
                                width: 28,
                                height: 28,
                                borderRadius: "50%",
                                border: "1px solid rgba(255,255,255,0.2)",
                                display: "grid",
                                placeItems: "center",
                                color: "#fff",
                            }}
                        >
                            <X size={14} />
                        </span>

                        {popup.image && (
                            <img
                                src={resolveAssetUrl(popup.image)}
                                alt={popup.title || "Festival Banner"}
                                style={{
                                    width: "100%",
                                    height: 150,
                                    objectFit: "cover",
                                    borderRadius: 10,
                                    marginBottom: 14,
                                }}
                            />
                        )}

                        {popup.badge && (
                            <div
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: 6,
                                    padding: "4px 10px",
                                    borderRadius: 999,
                                    background: "rgba(217, 180, 119, 0.16)",
                                    border: "1px solid rgba(217, 180, 119, 0.45)",
                                    color: "#e6c68d",
                                    fontSize: 11,
                                    fontWeight: 700,
                                    marginBottom: 10,
                                }}
                            >
                                <Sparkles size={12} /> {popup.badge}
                            </div>
                        )}

                        <h4 style={{ margin: "0 0 6px", fontSize: 19, color: "#fff" }}>
                            {popup.title || "Festival Offer Headline"}
                        </h4>

                        {popup.subtitle && (
                            <div style={{ color: "#e6c68d", fontSize: 13.5, fontWeight: 600, marginBottom: 8 }}>
                                {popup.subtitle}
                            </div>
                        )}

                        {popup.description && (
                            <p style={{ margin: "0 0 14px", fontSize: 13, color: "#cfc6d1", lineHeight: 1.6 }}>
                                {popup.description}
                            </p>
                        )}

                        {popup.offerCode && (
                            <div
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: 6,
                                    padding: "5px 10px",
                                    borderRadius: 8,
                                    border: "1px dashed rgba(217,180,119,0.6)",
                                    fontSize: 12,
                                    color: "#e6c68d",
                                    marginBottom: 14,
                                }}
                            >
                                <Tag size={12} /> Code: <strong style={{ color: "#fff" }}>{popup.offerCode}</strong>
                            </div>
                        )}

                        {popup.buttonText && (
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: 8,
                                    padding: "10px 16px",
                                    borderRadius: 10,
                                    background: "linear-gradient(135deg, #e2c18c 0%, #c69752 100%)",
                                    color: "#1f1722",
                                    fontSize: 13,
                                    fontWeight: 700,
                                }}
                            >
                                <span>{popup.buttonText}</span>
                                <ArrowRight size={14} />
                            </div>
                        )}
                    </div>

                    <p style={{ fontSize: 12, color: "#64748b", marginTop: 12, marginBottom: 0 }}>
                        Target place: <strong>{PAGE_OPTIONS.find((o) => o.value === popup.pages)?.label}</strong>
                    </p>
                </div>
            </div>

            <ConfirmModal
                open={confirmClear}
                onClose={() => setConfirmClear(false)}
                onConfirm={handleClearOffer}
                title="Remove Festival Offer"
                message="This will clear the festival offer details and hide the popup from the public website immediately."
                confirmText="Remove Offer"
                confirmTone="danger"
            />
        </div>
    );
}

