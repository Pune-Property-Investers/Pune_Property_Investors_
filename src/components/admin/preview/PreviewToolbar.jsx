"use client";

import { Monitor, Tablet, Smartphone, RefreshCw, Maximize2, Minimize2 } from "lucide-react";

export const PREVIEW_DEVICES = [
    { key: "desktop", label: "Desktop", width: "100%", icon: Monitor },
    { key: "tablet", label: "Tablet", width: "768px", icon: Tablet },
    { key: "mobile", label: "Mobile", width: "390px", icon: Smartphone },
];

export default function PreviewToolbar({
    device = "desktop",
    onDeviceChange,
    previewOnly = false,
    onTogglePreviewOnly,
    onRefresh,
    title = "Live Public Preview",
}) {
    return (
        <div className="admin-preview-toolbar">
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span
                    style={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        background: "#10b981",
                        display: "inline-block",
                    }}
                />
                <span style={{ fontSize: 12.5, fontWeight: 700, color: "#0f172a" }}>{title}</span>
            </div>

            <div className="admin-preview-devices" role="group" aria-label="Preview viewport size">
                {PREVIEW_DEVICES.map((d) => {
                    const Icon = d.icon;
                    return (
                        <button
                            key={d.key}
                            type="button"
                            className={`admin-preview-device-btn ${
                                device === d.key ? "admin-preview-device-btn--active" : ""
                            }`}
                            onClick={() => onDeviceChange?.(d.key)}
                        >
                            <Icon size={13} />
                            <span>{d.label}</span>
                        </button>
                    );
                })}
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                {onRefresh && (
                    <button
                        type="button"
                        className="admin-icon-btn"
                        style={{ width: 30, height: 30 }}
                        onClick={onRefresh}
                        title="Reload Preview"
                    >
                        <RefreshCw size={13} />
                    </button>
                )}
                {onTogglePreviewOnly && (
                    <button
                        type="button"
                        className="admin-icon-btn"
                        style={{ width: 30, height: 30 }}
                        onClick={onTogglePreviewOnly}
                        title={previewOnly ? "Show Editor" : "Preview Only Full Width"}
                    >
                        {previewOnly ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
                    </button>
                )}
            </div>
        </div>
    );
}

