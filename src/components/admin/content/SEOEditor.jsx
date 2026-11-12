"use client";

export function slugifyText(str = "") {
    return String(str)
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}

export default function SEOEditor({ seo = {}, onChange, sourceTitle = "" }) {
    const title = seo.title || "";
    const description = seo.description || "";
    const slug = seo.slug || "";

    const update = (key, val) => {
        onChange?.({
            ...seo,
            [key]: val,
        });
    };

    return (
        <div style={{ border: "1px solid #e2e8f0", borderRadius: 10, padding: 14, background: "#f8fafc" }}>
            <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 12, color: "#0f172a" }}>
                SEO &amp; URL Settings
            </div>

            <div className="admin-field">
                <label className="admin-label">
                    <span>SEO Title</span>
                    <span style={{ fontSize: 11, color: title.length > 65 ? "#dc2626" : "#64748b" }}>
                        {title.length}/65 chars
                    </span>
                </label>
                <input
                    type="text"
                    className="admin-input"
                    value={title}
                    onChange={(e) => update("title", e.target.value)}
                    placeholder="Page SEO meta title"
                />
            </div>

            <div className="admin-field">
                <label className="admin-label">
                    <span>Meta Description</span>
                    <span style={{ fontSize: 11, color: description.length > 160 ? "#dc2626" : "#64748b" }}>
                        {description.length}/160 chars
                    </span>
                </label>
                <textarea
                    className="admin-textarea"
                    style={{ minHeight: 70 }}
                    value={description}
                    onChange={(e) => update("description", e.target.value)}
                    placeholder="Search engine description snippet..."
                />
            </div>

            <div className="admin-field" style={{ marginBottom: 12 }}>
                <label className="admin-label">
                    <span>URL Slug</span>
                    {sourceTitle && (
                        <button
                            type="button"
                            onClick={() => update("slug", slugifyText(sourceTitle))}
                            style={{
                                border: "none",
                                background: "transparent",
                                color: "#a77a48",
                                fontSize: 11.5,
                                fontWeight: 600,
                                cursor: "pointer",
                            }}
                        >
                            Generate from title
                        </button>
                    )}
                </label>
                <input
                    type="text"
                    className="admin-input"
                    value={slug}
                    onChange={(e) => update("slug", e.target.value)}
                    placeholder="page-url-slug"
                />
            </div>

            {/* Google SERP Preview */}
            <div
                style={{
                    background: "#ffffff",
                    border: "1px solid #e2e8f0",
                    borderRadius: 8,
                    padding: 12,
                }}
            >
                <div style={{ fontSize: 11, color: "#059669", marginBottom: 2 }}>
                    https://punepropertyinvestor.com/{slug.replace(/^\/+/, "")}
                </div>
                <div style={{ fontSize: 14, fontWeight: 600, color: "#1d4ed8", marginBottom: 3 }}>
                    {title || sourceTitle || "Pune Property Investors"}
                </div>
                <div style={{ fontSize: 12, color: "#475569", lineHeight: 1.4 }}>
                    {description || "Add a meta description to preview how this page appears in Google Search."}
                </div>
            </div>
        </div>
    );
}

