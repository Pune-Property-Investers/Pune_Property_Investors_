"use client";

import { useState, useRef } from "react";
import { Upload, Image as ImageIcon, X, FolderOpen } from "lucide-react";
import { uploadService } from "../../../services/upload.service";
import { useToast } from "../../../context/ToastContext";
import AdminModal from "../common/AdminModal";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export function resolveAssetUrl(url) {
    if (!url) return "";
    if (url.startsWith("http") || url.startsWith("data:") || url.startsWith("blob:")) {
        return url;
    }
    return `${basePath}${url.startsWith("/") ? url : `/${url}`}`;
}

export default function ImageUploader({
    label = "Image",
    value = "",
    onChange,
    accept = "image/*",
    helperText,
}) {
    const { showToast } = useToast();
    const inputRef = useRef(null);
    const [uploading, setUploading] = useState(false);
    const [libraryOpen, setLibraryOpen] = useState(false);
    const [mediaItems, setMediaItems] = useState([]);

    const handleFileSelect = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setUploading(true);
        try {
            const uploaded = await uploadService.uploadFile(file, "image");
            onChange?.(uploaded.url);
            showToast(`Uploaded "${file.name}"`, "success");
        } catch (err) {
            showToast(err?.message || "Image upload failed", "error");
        } finally {
            setUploading(false);
            if (inputRef.current) inputRef.current.value = "";
        }
    };

    const openLibrary = async () => {
        setLibraryOpen(true);
        const items = await uploadService.listMedia("image");
        setMediaItems(items);
    };

    return (
        <div className="admin-field">
            <label className="admin-label">
                <span>{label}</span>
                {value && (
                    <button
                        type="button"
                        onClick={() => onChange?.("")}
                        style={{
                            border: "none",
                            background: "transparent",
                            color: "#dc2626",
                            fontSize: 11.5,
                            cursor: "pointer",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 3,
                        }}
                    >
                        <X size={12} /> Remove
                    </button>
                )}
            </label>

            <div
                style={{
                    border: "1px dashed #cbd5e1",
                    borderRadius: 10,
                    padding: 12,
                    background: "#f8fafc",
                }}
            >
                {value ? (
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
                        <img
                            src={resolveAssetUrl(value)}
                            alt="Preview"
                            style={{
                                width: 72,
                                height: 54,
                                objectFit: "cover",
                                borderRadius: 6,
                                border: "1px solid #e2e8f0",
                                background: "#fff",
                            }}
                        />
                        <div style={{ minWidth: 0, flex: 1 }}>
                            <div
                                style={{
                                    fontSize: 12,
                                    color: "#334155",
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                }}
                            >
                                {value}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                            color: "#64748b",
                            fontSize: 12.5,
                            marginBottom: 10,
                        }}
                    >
                        <ImageIcon size={16} />
                        <span>No image selected</span>
                    </div>
                )}

                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 8 }}>
                    <input
                        ref={inputRef}
                        type="file"
                        accept={accept}
                        onChange={handleFileSelect}
                        style={{ display: "none" }}
                    />
                    <button
                        type="button"
                        className="admin-btn admin-btn--outline admin-btn--sm"
                        onClick={() => inputRef.current?.click()}
                        disabled={uploading}
                    >
                        <Upload size={13} />
                        <span>{uploading ? "Uploading..." : "Upload File"}</span>
                    </button>
                    <button
                        type="button"
                        className="admin-btn admin-btn--outline admin-btn--sm"
                        onClick={openLibrary}
                    >
                        <FolderOpen size={13} />
                        <span>Media Library</span>
                    </button>
                </div>

                <input
                    type="text"
                    className="admin-input"
                    value={value || ""}
                    onChange={(e) => onChange?.(e.target.value)}
                    placeholder="Or paste image URL (https://... or /images/...)"
                    style={{ fontSize: 12.5 }}
                />
                {helperText && (
                    <div style={{ fontSize: 11.5, color: "#64748b", marginTop: 4 }}>
                        {helperText}
                    </div>
                )}
            </div>

            <AdminModal
                open={libraryOpen}
                onClose={() => setLibraryOpen(false)}
                title="Select Image from Media Library"
            >
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
                        gap: 12,
                    }}
                >
                    {mediaItems.map((item) => (
                        <button
                            key={item.id}
                            type="button"
                            onClick={() => {
                                onChange?.(item.url);
                                setLibraryOpen(false);
                            }}
                            style={{
                                border: "1px solid #e2e8f0",
                                borderRadius: 8,
                                padding: 6,
                                background: "#fff",
                                cursor: "pointer",
                                textAlign: "left",
                            }}
                        >
                            <img
                                src={resolveAssetUrl(item.url)}
                                alt={item.name}
                                style={{
                                    width: "100%",
                                    height: 90,
                                    objectFit: "cover",
                                    borderRadius: 6,
                                    marginBottom: 6,
                                }}
                            />
                            <div
                                style={{
                                    fontSize: 11.5,
                                    fontWeight: 600,
                                    color: "#0f172a",
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                }}
                            >
                                {item.name}
                            </div>
                        </button>
                    ))}
                </div>
            </AdminModal>
        </div>
    );
}

