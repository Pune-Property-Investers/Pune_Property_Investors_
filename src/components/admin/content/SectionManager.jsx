"use client";

import { ArrowUp, ArrowDown, Eye, EyeOff, GripVertical } from "lucide-react";

export default function SectionManager({
    sections = [],
    activeSectionId,
    onSelectSection,
    onToggleVisibility,
    onMoveSection,
}) {
    const sorted = [...sections].sort((a, b) => (a.order || 0) - (b.order || 0));

    return (
        <div>
            {sorted.map((section, idx) => {
                const isActive = section.id === activeSectionId;
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
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

