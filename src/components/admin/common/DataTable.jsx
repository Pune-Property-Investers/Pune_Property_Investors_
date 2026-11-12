"use client";

import { Search } from "lucide-react";
import EmptyState from "./EmptyState";

export default function DataTable({
    columns,
    rows,
    loading = false,
    searchValue = "",
    onSearchChange,
    searchPlaceholder = "Search...",
    toolbarRight,
    emptyTitle,
    emptyDescription,
    emptyAction,
    rowKey = "id",
}) {
    return (
        <div className="admin-card">
            {(onSearchChange || toolbarRight) && (
                <div className="admin-table-toolbar">
                    {onSearchChange ? (
                        <div className="admin-topbar__search" style={{ maxWidth: 320 }}>
                            <Search size={15} className="admin-topbar__search-icon" />
                            <input
                                type="text"
                                className="admin-topbar__search-input"
                                value={searchValue}
                                onChange={(e) => onSearchChange(e.target.value)}
                                placeholder={searchPlaceholder}
                            />
                        </div>
                    ) : (
                        <div />
                    )}
                    {toolbarRight && (
                        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                            {toolbarRight}
                        </div>
                    )}
                </div>
            )}

            {loading ? (
                <div style={{ padding: 40, textAlign: "center", color: "#64748b", fontSize: 13.5 }}>
                    Loading records...
                </div>
            ) : !rows?.length ? (
                <EmptyState
                    title={emptyTitle}
                    description={emptyDescription}
                    action={emptyAction}
                />
            ) : (
                <div className="admin-table-wrap">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                {columns.map((col) => (
                                    <th key={col.key} style={col.thStyle}>
                                        {col.label}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((row, idx) => (
                                <tr key={row[rowKey] ?? idx}>
                                    {columns.map((col) => (
                                        <td key={col.key} style={col.tdStyle}>
                                            {col.render ? col.render(row) : row[col.key]}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

