"use client";

import { ArrowUp, ArrowDown, Eye, EyeOff, GripVertical, Plus, Trash2 } from "lucide-react";

export default function SectionManager({
    sections = [],
    activeSectionId,
    onSelectSection,
    onToggleVisibility,
    onMoveSection,
    onAddSection,
    onDeleteSection,
}) {
    const sorted = [...sections].sort((a, b) => (a.order || 0) - (b.order || 0));

    return (
        <div>
            {onAddSection && (
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "10px 12px",
                        background: "#f1f5f9",
                        border: "1px solid #e2e8f0",
                        borderRadius: 10,
                        marginBottom: 12,
                    }}
                >
                    <span style={{ fontSize: 13, fontWeight: 700, color: "#1e293b" }}>
                        Sections &amp; Containers ({sorted.length})
                    </span>
                    <button
                        type="button"
                        className="admin-btn admin-btn--primary admin-btn--sm"
                        onClick={onAddSection}
                    >
                        <Plus size={13} /> Add Container / Section
                    </button>
                </div>
            )}
            {sorted.map((section, idx) => {
                const isActive = section.id === activeSectionId;
                const isCustom = section.type === "custom-containers" || section.type === "custom-container" || section.id?.startsWith("custom-");
                return (
                    <div
                        key={section.id}
                        className={`admin-section-item ${isActive ? "admin-section-item--active" : ""}`}
                        onClick={() => onSelectSection?.(section.id)}
                    >
                        <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 0, flex: 1 }}>
                            <GripVertical size={14} color="#94a3b8" />
                            <div style={{ minWidth: 0 }}>
                                <div
                                    style={{
                                        fontSize: 13,
                                        fontWeight: 600,
                                        color: section.enabled ? "#0f172a" : "#94a3b8",
                                        whiteSpace: "nowrap",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                    }}
                                >
                                    {section.label}
                                </div>
                                <div style={{ fontSize: 11, color: "#64748b" }}>
                                    Order #{idx + 1} • {section.enabled ? "Visible" : "Hidden"}
                                    {isCustom && " • Custom Container"}
                                </div>
                            </div>
                        </div>

                        <div
                            style={{ display: "flex", alignItems: "center", gap: 4 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                type="button"
                                className="admin-icon-btn"
                                style={{ width: 28, height: 28 }}
                                disabled={idx === 0}
                                onClick={() => onMoveSection?.(section.id, -1)}
                                title="Move Up"
                            >
                                <ArrowUp size={13} />
                            </button>
                            <button
                                type="button"
                                className="admin-icon-btn"
                                style={{ width: 28, height: 28 }}
                                disabled={idx === sorted.length - 1}
                                onClick={() => onMoveSection?.(section.id, 1)}
                                title="Move Down"
                            >
                                <ArrowDown size={13} />
                            </button>
                            <button
                                type="button"
                                className="admin-icon-btn"
                                style={{
                                    width: 28,
                                    height: 28,
                                    color: section.enabled ? "#059669" : "#94a3b8",
                                }}
                                onClick={() => onToggleVisibility?.(section.id)}
                                title={section.enabled ? "Hide Section" : "Show Section"}
                            >
                                {section.enabled ? <Eye size={13} /> : <EyeOff size={13} />}
                            </button>
                            {isCustom && onDeleteSection && (
                                <button
                                    type="button"
                                    className="admin-icon-btn"
                                    style={{
                                        width: 28,
                                        height: 28,
                                        color: "#ef4444",
                                    }}
                                    onClick={() => onDeleteSection(section.id)}
                                    title="Delete Container Section"
                                >
                                    <Trash2 size={13} />
                                </button>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

