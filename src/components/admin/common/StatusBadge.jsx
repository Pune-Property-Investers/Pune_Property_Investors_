"use client";

const VARIANT_MAP = {
    published: "green",
    ready: "green",
    "ready to move": "green",
    open: "green",
    shortlisted: "green",
    hired: "green",
    closed: "green",
    active: "green",
    visible: "green",
    draft: "amber",
    "under construction": "amber",
    "follow-up": "amber",
    contacted: "blue",
    "site visit scheduled": "blue",
    new: "blue",
    "in review": "blue",
    featured: "blue",
    rejected: "red",
    hidden: "slate",
    inactive: "slate",
    archived: "slate",
};

export default function StatusBadge({ status }) {
    const label = status || "Unknown";
    const tone = VARIANT_MAP[String(label).toLowerCase()] || "slate";
    return <span className={`admin-badge admin-badge--${tone}`}>{label}</span>;
}

