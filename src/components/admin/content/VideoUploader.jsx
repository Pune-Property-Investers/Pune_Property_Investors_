"use client";

import { Video } from "lucide-react";

export function detectVideoProvider(url = "") {
    if (!url) return null;
    if (url.includes("gumlet.io")) return "Gumlet";
    if (url.includes("youtube.com") || url.includes("youtu.be")) return "YouTube";
    return "Video URL";
}

export default function VideoUploader({
    label = "Video URL (Gumlet / YouTube)",
    value = "",
    onChange,
    placeholder = "https://play.gumlet.io/embed/... or https://www.youtube.com/shorts/...",
}) {
    const provider = detectVideoProvider(value);

    return (
        <div className="admin-field">
            <label className="admin-label">
                <span>{label}</span>
                {provider && <span className="admin-badge admin-badge--blue">{provider}</span>}
            </label>
            <div style={{ position: "relative" }}>
                <Video
                    size={15}
                    style={{
                        position: "absolute",
                        left: 11,
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: "#94a3b8",
                    }}
                />
                <input
                    type="text"
                    className="admin-input"
                    style={{ paddingLeft: 34 }}
                    value={value || ""}
                    onChange={(e) => onChange?.(e.target.value)}
                    placeholder={placeholder}
                />
            </div>
        </div>
    );
}

