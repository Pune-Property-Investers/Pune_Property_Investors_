"use client";

import StatusBadge from "../common/StatusBadge";

export default function DraftStatus({ isDirty, hasUnpublishedChanges, status = "Published", updatedAt }) {
    return (
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            <StatusBadge status={isDirty ? "Unsaved Edits" : status} />
            {hasUnpublishedChanges && !isDirty && (
                <span className="admin-badge admin-badge--amber">Draft Ahead of Live</span>
            )}
            {updatedAt && (
                <span style={{ fontSize: 11.5, color: "#64748b" }}>
                    Last saved: {new Date(updatedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </span>
            )}
        </div>
    );
}

