"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { resolveAssetUrl } from "../admin/content/ImageUploader";

function extractYtId(url) {
    if (!url) return "";
    const m = String(url).match(/(?:v=|\/embed\/|youtu\.be\/|\/shorts\/)([a-zA-Z0-9_-]{11})/);
    return m ? m[1] : "";
}

export default function CustomContainersRenderer({ containers, items, title, eyebrow }) {
    const list = Array.isArray(containers) && containers.length > 0 
        ? containers 
        : (Array.isArray(items) && items.length > 0 ? items : []);

    if (list.length === 0) return null;

    return (
        <section className="custom-containers-section" style={{ width: "100%", padding: "20px 0 28px" }}>
            <div
                style={{
                    width: "min(94%, 1380px)",
                    margin: "0 auto",
                    padding: "0 12px",
                }}
            >
                {(eyebrow || title) && (
                    <div style={{ textAlign: "center", marginBottom: 20 }}>
                        {eyebrow && (
                            <span
                                style={{
                                    fontSize: 11,
                                    fontWeight: 700,
                                    letterSpacing: "0.12em",
                                    textTransform: "uppercase",
                                    color: "#a77a48",
                                    display: "block",
                                    marginBottom: 6,
                                }}
                            >
                                {eyebrow}
                            </span>
                        )}
                        {title && (
                            <h2
                                style={{
                                    fontFamily: "var(--font-serif), 'Playfair Display', Georgia, serif",
                                    fontSize: "clamp(22px, 3vw, 32px)",
                                    fontWeight: 700,
                                    color: "#0f172a",
                                    margin: 0,
                                }}
                            >
                                {title}
                            </h2>
                        )}
                    </div>
                )}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                        gap: 20,
                    }}
                >
                    {list.map((item, idx) => {
                        const ytId = extractYtId(item.videoUrl);
                        const imgSrc = item.image ? resolveAssetUrl(item.image) : "";
                        return (
                            <div
                                key={item.id || idx}
                                style={{
                                    background: "#ffffff",
                                    border: "1px solid #e2e8f0",
                                    borderRadius: 16,
                                    overflow: "hidden",
                                    boxShadow: "0 6px 20px rgba(15, 23, 42, 0.06)",
                                    display: "flex",
                                    flexDirection: "column",
                                    transition: "transform 0.2s ease, box-shadow 0.2s ease",
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
                                    <div style={{ width: "100%", height: 200, overflow: "hidden", background: "#f1f5f9" }}>
                                        <img
                                            src={imgSrc}
                                            alt={item.title || "Container image"}
                                            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                                        />
                                    </div>
                                ) : null}

                                <div style={{ padding: 18, flex: 1, display: "flex", flexDirection: "column", gap: 10 }}>
                                    {item.badge && (
                                        <span
                                            style={{
                                                alignSelf: "flex-start",
                                                fontSize: 10.5,
                                                fontWeight: 700,
                                                letterSpacing: "0.06em",
                                                textTransform: "uppercase",
                                                color: "#b45309",
                                                background: "#fef3c7",
                                                padding: "3.5px 10px",
                                                borderRadius: 999,
                                            }}
                                        >
                                            {item.badge}
                                        </span>
                                    )}
                                    {item.title && (
                                        <h3 style={{ margin: 0, fontSize: 17, fontWeight: 700, color: "#0f172a", lineHeight: 1.35 }}>
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
                                            href={item.buttonUrl || "/buy"}
                                            style={{
                                                marginTop: 6,
                                                display: "inline-flex",
                                                alignItems: "center",
                                                gap: 6,
                                                fontSize: 13,
                                                fontWeight: 600,
                                                color: "#a77a48",
                                                textDecoration: "none",
                                                transition: "color 0.2s ease",
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
            </div>
        </section>
    );
}

