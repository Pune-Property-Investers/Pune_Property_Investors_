"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { resolveAssetUrl } from "../admin/content/ImageUploader";

function extractYtId(url) {
    if (!url) return "";
    const m = String(url).match(/(?:v=|\/embed\/|youtu\.be\/|\/shorts\/)([a-zA-Z0-9_-]{11})/);
    return m ? m[1] : "";
}

export default function CustomContainersRenderer({ containers }) {
    if (!Array.isArray(containers) || containers.length === 0) return null;

    return (
        <div
            style={{
                maxWidth: 1240,
                margin: "20px auto 0",
                padding: "0 16px 24px",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                gap: 16,
            }}
        >
            {containers.map((item, idx) => {
                const ytId = extractYtId(item.videoUrl);
                const imgSrc = item.image ? resolveAssetUrl(item.image) : "";
                return (
                    <div
                        key={item.id || idx}
                        style={{
                            background: "#ffffff",
                            border: "1px solid #e2e8f0",
                            borderRadius: 14,
                            overflow: "hidden",
                            boxShadow: "0 4px 14px rgba(15, 23, 42, 0.06)",
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        {ytId ? (
                            <div style={{ position: "relative", paddingTop: "56.25%", background: "#0f172a" }}>
                                <iframe
                                    src={`https://www.youtube-nocookie.com/embed/${ytId}?rel=0`}
                                    title={item.title || `Container ${idx + 1}`}
                                    style={{
                                        position: "absolute",
                                        inset: 0,
                                        width: "100%",
                                        height: "100%",
                                        border: "none",
                                    }}
                                    allowFullScreen
                                />
                            </div>
                        ) : imgSrc ? (
                            <img
                                src={imgSrc}
                                alt={item.title || "Container image"}
                                style={{ width: "100%", height: 180, objectFit: "cover", display: "block" }}
                            />
                        ) : null}

                        <div style={{ padding: 16, flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
                            {item.badge && (
                                <span
                                    style={{
                                        alignSelf: "flex-start",
                                        fontSize: 11,
                                        fontWeight: 700,
                                        letterSpacing: "0.04em",
                                        textTransform: "uppercase",
                                        color: "#b45309",
                                        background: "#fef3c7",
                                        padding: "3px 8px",
                                        borderRadius: 999,
                                    }}
                                >
                                    {item.badge}
                                </span>
                            )}
                            {item.title && (
                                <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: "#0f172a" }}>
                                    {item.title}
                                </h3>
                            )}
                            {item.description && (
                                <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.55, color: "#475569", flex: 1 }}>
                                    {item.description}
                                </p>
                            )}
                            {item.buttonText && (
                                <Link
                                    href={item.buttonUrl || "/contact"}
                                    style={{
                                        marginTop: 6,
                                        display: "inline-flex",
                                        alignItems: "center",
                                        gap: 6,
                                        fontSize: 13,
                                        fontWeight: 600,
                                        color: "#1d4ed8",
                                        textDecoration: "none",
                                    }}
                                >
                                    {item.buttonText} <ArrowRight size={14} />
                                </Link>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

