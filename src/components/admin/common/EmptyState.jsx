"use client";

import { Inbox } from "lucide-react";

export default function EmptyState({
    title = "No records found",
    description = "Try adjusting your search filter or add a new item.",
    action,
}) {
    return (
        <div style={{ padding: "48px 20px", textAlign: "center", color: "#64748b" }}>
            <div
                style={{
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    background: "#f1f5f9",
                    display: "inline-grid",
                    placeItems: "center",
                    marginBottom: 12,
                    color: "#94a3b8",
                }}
            >
                <Inbox size={22} />
            </div>
            <h3 style={{ margin: "0 0 6px", fontSize: 15, color: "#0f172a" }}>{title}</h3>
            <p style={{ margin: "0 0 16px", fontSize: 13 }}>{description}</p>
            {action}
        </div>
    );
}

